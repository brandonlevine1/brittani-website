import AnthropicBedrock from '@anthropic-ai/bedrock-sdk';
import { readdir, writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import {
  pickNextState,
  pickNextType1Category,
  pickNextType2Topic,
  pickNextType3Topic,
} from './blog-topics.js';
import { buildType1Prompt, buildType2Prompt, buildType3Prompt } from './blog-prompts.js';
import { generateImage } from './blog-images.js';

const BLOG_DIR = join(process.cwd(), 'src/content/blog');
const CURRENT_YEAR = new Date().getFullYear();

async function getExistingPosts() {
  try {
    const files = await readdir(BLOG_DIR);
    return files.filter(f => f.endsWith('.md'));
  } catch {
    return [];
  }
}

async function callClaude(prompt) {
  const client = new AnthropicBedrock({
    awsRegion: process.env.AWS_REGION || 'us-east-1',
  });
  const response = await client.messages.create({
    model: 'us.anthropic.claude-opus-4-6-v1',
    max_tokens: 8192,
    messages: [{ role: 'user', content: prompt }],
  });
  return response.content[0].text;
}

function calculateReadTime(markdown) {
  const body = markdown.replace(/^---[\s\S]*?---/, '').trim();
  const wordCount = body.split(/\s+/).length;
  return `${Math.ceil(wordCount / 238)} min read`;
}

function cleanMarkdown(content) {
  let cleaned = content.replace(/^```(?:markdown|md)?\n/, '').replace(/\n```$/, '');
  const readTime = calculateReadTime(cleaned);
  cleaned = cleaned.replace('readTime: "CALCULATE_AFTER"', `readTime: "${readTime}"`);
  return cleaned;
}

async function tryGenerateImage(slug, type, state) {
  if (!process.env.GEMINI_API_KEY) {
    console.log(`[Image] Skipped (no GEMINI_API_KEY): ${slug}`);
    return;
  }
  try {
    await generateImage(slug, type, state);
  } catch (err) {
    console.warn(`[Image] Failed for ${slug}, continuing without image: ${err.message}`);
  }
}

async function generateType1(existingPosts) {
  const state = pickNextState(existingPosts);
  const category = pickNextType1Category(state, existingPosts);
  const slug = `${state}-${category.slug}-${CURRENT_YEAR}`;
  console.log(`[Type 1] Generating: ${state} — ${category.label}`);

  const prompt = buildType1Prompt(state, category);
  const markdown = await callClaude(prompt);

  await tryGenerateImage(slug, 'regulatory', state);

  return { filename: `${slug}.md`, content: cleanMarkdown(markdown) };
}

async function generateType2(existingPosts) {
  const topic = pickNextType2Topic(existingPosts);
  console.log(`[Type 2] Generating: ${topic.title}`);

  const prompt = buildType2Prompt(topic);
  const markdown = await callClaude(prompt);

  await tryGenerateImage(topic.slug, 'operational', null);

  return { filename: `${topic.slug}.md`, content: cleanMarkdown(markdown) };
}

async function generateType3(existingPosts) {
  const topic = pickNextType3Topic(existingPosts);
  console.log(`[Type 3] Generating: ${topic.title}`);

  const prompt = buildType3Prompt(topic);
  const markdown = await callClaude(prompt);

  await tryGenerateImage(topic.slug, 'opinion', null);

  return { filename: `${topic.slug}.md`, content: cleanMarkdown(markdown) };
}

const POSTS_PER_TYPE = parseInt(process.env.POSTS_PER_TYPE || '5', 10);

async function main() {
  console.log(`Starting daily blog generation (${POSTS_PER_TYPE} per type, ${POSTS_PER_TYPE * 3} total)...`);

  const existingPosts = await getExistingPosts();
  console.log(`Found ${existingPosts.length} existing posts.`);

  await mkdir(BLOG_DIR, { recursive: true });

  const generatedFiles = [];
  const trackingPosts = [...existingPosts];

  for (let i = 0; i < POSTS_PER_TYPE; i++) {
    const batch = await Promise.all([
      generateType1(trackingPosts),
      generateType2(trackingPosts),
      generateType3(trackingPosts),
    ]);

    for (const { filename, content } of batch) {
      const filepath = join(BLOG_DIR, filename);
      await writeFile(filepath, content, 'utf-8');
      console.log(`Written: ${filepath}`);
      generatedFiles.push(filename);
      trackingPosts.push(filename);
    }
  }

  console.log(`\nGeneration complete. Files created:`);
  generatedFiles.forEach(f => console.log(`  - ${f}`));
  return generatedFiles;
}

main().catch(err => {
  console.error('Blog generation failed:', err);
  process.exit(1);
});

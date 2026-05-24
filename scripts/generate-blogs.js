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
    max_tokens: 4096,
    messages: [{ role: 'user', content: prompt }],
  });
  return response.content[0].text;
}

async function generateType1(existingPosts) {
  const state = pickNextState(existingPosts);
  const category = pickNextType1Category(state, existingPosts);
  console.log(`[Type 1] Generating: ${state} — ${category.label}`);

  const prompt = buildType1Prompt(state, category);
  const markdown = await callClaude(prompt);
  const filename = `${state}-${category.slug}-${CURRENT_YEAR}.md`;
  return { filename, content: markdown };
}

async function generateType2(existingPosts) {
  const topic = pickNextType2Topic(existingPosts);
  console.log(`[Type 2] Generating: ${topic.title}`);

  const prompt = buildType2Prompt(topic);
  const markdown = await callClaude(prompt);
  const filename = `${topic.slug}.md`;
  return { filename, content: markdown };
}

async function generateType3(existingPosts) {
  const topic = pickNextType3Topic(existingPosts);
  console.log(`[Type 3] Generating: ${topic.title}`);

  const prompt = buildType3Prompt(topic);
  const markdown = await callClaude(prompt);
  const filename = `${topic.slug}.md`;
  return { filename, content: markdown };
}

async function main() {
  console.log('Starting daily blog generation...');

  const existingPosts = await getExistingPosts();
  console.log(`Found ${existingPosts.length} existing posts.`);

  await mkdir(BLOG_DIR, { recursive: true });

  const results = await Promise.all([
    generateType1(existingPosts),
    generateType2(existingPosts),
    generateType3(existingPosts),
  ]);

  const generatedFiles = [];
  for (const { filename, content } of results) {
    const filepath = join(BLOG_DIR, filename);
    const cleaned = content.replace(/^```(?:markdown|md)?\n/, '').replace(/\n```$/, '');
    await writeFile(filepath, cleaned, 'utf-8');
    console.log(`Written: ${filepath}`);
    generatedFiles.push(filename);
  }

  console.log(`\nGeneration complete. Files created:`);
  generatedFiles.forEach(f => console.log(`  - ${f}`));
  return generatedFiles;
}

main().catch(err => {
  console.error('Blog generation failed:', err);
  process.exit(1);
});

import AnthropicBedrock from '@anthropic-ai/bedrock-sdk';
import yaml from 'js-yaml';
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

function validateFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return false;
  try {
    yaml.load(match[1]);
    return true;
  } catch {
    return false;
  }
}

function extractImagePrompt(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;
  try {
    const fm = yaml.load(match[1]);
    return fm.imagePrompt || null;
  } catch {
    return null;
  }
}

function stripImagePromptFromFrontmatter(content) {
  return content.replace(/^(---\n[\s\S]*?)imagePrompt:.*\n([\s\S]*?---)/, '$1$2');
}

function cleanMarkdown(content) {
  let cleaned = content.replace(/^```(?:markdown|md)?\n/, '').replace(/\n```$/, '');
  const readTime = calculateReadTime(cleaned);
  cleaned = cleaned.replace('readTime: "CALCULATE_AFTER"', `readTime: "${readTime}"`);

  if (!validateFrontmatter(cleaned)) {
    console.warn('[Frontmatter] Invalid YAML detected, attempting repair...');
    cleaned = cleaned.replace(/^---\n([\s\S]*?)\n---/, (full, fm) => {
      const fixed = fm.replace(/^(\w+): "(.*)"/gm, (_, key, val) => {
        const escaped = val.replace(/(?<!\\)"/g, '\\"');
        return `${key}: "${escaped}"`;
      });
      return `---\n${fixed}\n---`;
    });
    if (!validateFrontmatter(cleaned)) {
      return null;
    }
  }

  return cleaned;
}

async function tryGenerateImage(slug, type, state, customPrompt) {
  if (!process.env.GEMINI_API_KEY) {
    console.log(`[Image] Skipped (no GEMINI_API_KEY): ${slug}`);
    return;
  }
  try {
    await generateImage(slug, type, state, customPrompt);
  } catch (err) {
    console.warn(`[Image] Failed for ${slug}, continuing without image: ${err.message}`);
  }
}

async function generateWithRetry(generatorFn, existingPosts, label) {
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const result = await generatorFn(existingPosts);
      if (result) return result;
      if (attempt === 1) {
        console.warn(`[${label}] Frontmatter invalid, retrying...`);
      }
    } catch (err) {
      if (attempt === 1) {
        console.warn(`[${label}] Attempt 1 failed: ${err.message}. Retrying...`);
      } else {
        console.error(`[${label}] Attempt 2 failed: ${err.message}. Skipping.`);
      }
    }
  }
  return null;
}

async function _generateType1(existingPosts) {
  const state = pickNextState(existingPosts);
  const category = pickNextType1Category(state, existingPosts);
  const slug = `${state}-${category.slug}-${CURRENT_YEAR}`;
  console.log(`[Type 1] Generating: ${state} — ${category.label}`);

  const prompt = buildType1Prompt(state, category, existingPosts);
  const markdown = await callClaude(prompt);
  const content = cleanMarkdown(markdown);
  if (!content) return null;

  const imagePrompt = extractImagePrompt(content);
  await tryGenerateImage(slug, 'regulatory', state, imagePrompt);
  const finalContent = stripImagePromptFromFrontmatter(content);

  return { filename: `${slug}.md`, content: finalContent };
}

async function _generateType2(existingPosts) {
  const topic = pickNextType2Topic(existingPosts);
  console.log(`[Type 2] Generating: ${topic.title}`);

  const prompt = buildType2Prompt(topic, existingPosts);
  const markdown = await callClaude(prompt);
  const content = cleanMarkdown(markdown);
  if (!content) return null;

  const imagePrompt = extractImagePrompt(content);
  await tryGenerateImage(topic.slug, 'operational', null, imagePrompt);
  const finalContent = stripImagePromptFromFrontmatter(content);

  return { filename: `${topic.slug}.md`, content: finalContent };
}

async function _generateType3(existingPosts) {
  const topic = pickNextType3Topic(existingPosts);
  console.log(`[Type 3] Generating: ${topic.title}`);

  const prompt = buildType3Prompt(topic, existingPosts);
  const markdown = await callClaude(prompt);
  const content = cleanMarkdown(markdown);
  if (!content) return null;

  const imagePrompt = extractImagePrompt(content);
  await tryGenerateImage(topic.slug, 'opinion', null, imagePrompt);
  const finalContent = stripImagePromptFromFrontmatter(content);

  return { filename: `${topic.slug}.md`, content: finalContent };
}

const POSTS_PER_TYPE = parseInt(process.env.POSTS_PER_TYPE || '5', 10);

async function main() {
  console.log(`Starting daily blog generation (${POSTS_PER_TYPE} per type, ${POSTS_PER_TYPE * 3} total)...`);

  const existingPosts = await getExistingPosts();
  console.log(`Found ${existingPosts.length} existing posts.`);

  await mkdir(BLOG_DIR, { recursive: true });

  const generatedFiles = [];
  const skipped = [];
  const trackingPosts = [...existingPosts];

  for (let i = 0; i < POSTS_PER_TYPE; i++) {
    const batch = await Promise.all([
      generateWithRetry(_generateType1, trackingPosts, `Type1-batch${i + 1}`),
      generateWithRetry(_generateType2, trackingPosts, `Type2-batch${i + 1}`),
      generateWithRetry(_generateType3, trackingPosts, `Type3-batch${i + 1}`),
    ]);

    for (const result of batch) {
      if (!result) {
        skipped.push(`batch${i + 1}`);
        continue;
      }
      const { filename, content } = result;
      const filepath = join(BLOG_DIR, filename);
      await writeFile(filepath, content, 'utf-8');
      console.log(`Written: ${filepath}`);
      generatedFiles.push(filename);
      trackingPosts.push(filename);
    }
  }

  console.log(`\nGeneration complete. ${generatedFiles.length} posts created, ${skipped.length} skipped.`);
  generatedFiles.forEach(f => console.log(`  - ${f}`));

  if (generatedFiles.length === 0) {
    console.error('No posts were generated successfully.');
    process.exit(1);
  }

  return generatedFiles;
}

main().catch(err => {
  console.error('Blog generation failed:', err);
  process.exit(1);
});

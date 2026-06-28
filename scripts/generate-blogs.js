import AnthropicBedrock from '@anthropic-ai/bedrock-sdk';
import yaml from 'js-yaml';
import { readdir, writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { planRun } from './blog-topics.js';
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

function describeSlot(slot) {
  if (slot.type === 1) return `[Type 1] ${slot.state} — ${slot.category.label}`;
  if (slot.type === 2) return `[Type 2] ${slot.topic.title}`;
  return `[Type 3] ${slot.topic.title}`;
}

function buildPromptForSlot(slot, existingPosts) {
  if (slot.type === 1) return buildType1Prompt(slot.state, slot.category, existingPosts);
  if (slot.type === 2) return buildType2Prompt(slot.topic, existingPosts);
  return buildType3Prompt(slot.topic, existingPosts);
}

async function _generateSlot(slot, existingPosts) {
  const prompt = buildPromptForSlot(slot, existingPosts);
  const markdown = await callClaude(prompt);
  const content = cleanMarkdown(markdown);
  if (!content) return null;

  const imagePrompt = extractImagePrompt(content);
  await tryGenerateImage(slot.slug, slot.kind, slot.state || null, imagePrompt);
  const finalContent = stripImagePromptFromFrontmatter(content);

  return { filename: `${slot.slug}.md`, content: finalContent };
}

async function generateSlotWithRetry(slot, existingPosts) {
  const label = describeSlot(slot);
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const result = await _generateSlot(slot, existingPosts);
      if (result) return result;
      if (attempt === 1) {
        console.warn(`${label}: invalid frontmatter, retrying...`);
      }
    } catch (err) {
      if (attempt === 1) {
        console.warn(`${label}: attempt 1 failed: ${err.message}. Retrying...`);
      } else {
        console.error(`${label}: attempt 2 failed: ${err.message}. Skipping.`);
      }
    }
  }
  return null;
}

const POSTS_PER_TYPE = parseInt(process.env.POSTS_PER_TYPE || '5', 10);
const CONCURRENCY = parseInt(process.env.GEN_CONCURRENCY || '3', 10);

async function main() {
  console.log(`Starting daily blog generation (${POSTS_PER_TYPE} per type, ${POSTS_PER_TYPE * 3} target)...`);

  const existingPosts = await getExistingPosts();
  console.log(`Found ${existingPosts.length} existing posts.`);

  await mkdir(BLOG_DIR, { recursive: true });

  // Plan the whole run up front so every slug is reserved exactly once —
  // no duplicates within the run, and never an overwrite of an existing post.
  const plan = planRun(existingPosts, {
    postsPerType: POSTS_PER_TYPE,
    currentYear: CURRENT_YEAR,
  });
  console.log(`Planned ${plan.length} posts:`);
  plan.forEach(slot => console.log(`  ${describeSlot(slot)} -> ${slot.slug}`));

  const generatedFiles = [];
  let skipped = 0;

  // Generate in concurrency-limited chunks (default 3) to respect Bedrock limits.
  for (let i = 0; i < plan.length; i += CONCURRENCY) {
    const chunk = plan.slice(i, i + CONCURRENCY);
    const results = await Promise.all(
      chunk.map(slot => generateSlotWithRetry(slot, existingPosts))
    );

    for (const result of results) {
      if (!result) {
        skipped++;
        continue;
      }
      const { filename, content } = result;
      const filepath = join(BLOG_DIR, filename);
      await writeFile(filepath, content, 'utf-8');
      console.log(`Written: ${filepath}`);
      generatedFiles.push(filename);
    }
  }

  console.log(`\nGeneration complete. ${generatedFiles.length} posts created, ${skipped} skipped.`);
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

# Blog Branding, Formatting & SEO Overhaul — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the Britanni blog from AI-looking output to professional editorial content with DALL-E 3 images, full SEO meta/schema coverage, and a formatting system that produces consistent, human-quality posts.

**Architecture:** Seven tasks: (1) update content schema, (2) add author bios + state architecture data, (3) rewrite prompt templates with editorial rules, (4) build DALL-E 3 image pipeline, (5) update generate-blogs.js to integrate images + calculated read time, (6) rebuild the blog post page layout with new components (TOC, related posts, author bio, meta tags), (7) update CSS for editorial prose styling.

**Tech Stack:** Astro 5, Tailwind v4, OpenAI SDK (DALL-E 3), `@anthropic-ai/bedrock-sdk`, `sharp` (WebP conversion)

---

## File Structure

```
scripts/
  blog-topics.js              — Update: add AUTHOR_BIOS, STATE_ARCHITECTURE
  blog-prompts.js             — Rewrite: editorial rules, keyword enforcement, new frontmatter
  blog-images.js              — Create: DALL-E 3 image generation with brand prompt formula
  generate-blogs.js           — Update: integrate images, calculate readTime, new post-processing

src/
  content.config.ts           — Update: add new schema fields
  styles/global.css           — Update: editorial prose overrides
  layouts/BaseLayout.astro    — Update: support article OG type + extra meta slots
  components/blog/
    TableOfContents.astro     — Create: auto-generated from headings
    RelatedPosts.astro        — Create: 3 related posts by tag/state
    AuthorBio.astro           — Create: author name + credentials
    BlogMeta.astro            — Create: article meta tags in <head>
  pages/blog/[...slug].astro  — Rewrite: new layout with all components

.github/workflows/daily-blogs.yml — Update: add OPENAI_API_KEY, image step
package.json                  — Update: add openai, sharp dependencies
```

---

### Task 1: Update Content Schema

**Files:**
- Modify: `src/content.config.ts`

- [ ] **Step 1: Update the blog collection schema**

Replace the contents of `src/content.config.ts` with:

```typescript
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.string(),
    modifiedDate: z.string().optional(),
    author: z.string(),
    authorBio: z.string().optional(),
    readTime: z.string(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    tags: z.array(z.string()).optional(),
    keywords: z.array(z.string()).optional(),
    type: z.enum(['regulatory', 'operational', 'opinion']).optional(),
  }),
});

export const collections = { blog };
```

- [ ] **Step 2: Verify existing posts still build**

Run: `cd /Users/brandonlevine/Desktop/AI-Assistant/britanni-ai-website && npm run build`
Expected: Build succeeds (new fields are all optional, so old posts still pass)

- [ ] **Step 3: Commit**

```bash
git add src/content.config.ts
git commit -m "feat: extend blog schema with image, keywords, type, authorBio fields"
```

---

### Task 2: Add Author Bios & State Architecture Data

**Files:**
- Modify: `scripts/blog-topics.js`

- [ ] **Step 1: Add AUTHOR_BIOS and STATE_ARCHITECTURE exports**

Add the following after the `AUTHORS` array in `scripts/blog-topics.js`:

```javascript
export const AUTHOR_BIOS = {
  'Brandon Levine': 'Co-founder at Britanni AI. Previously managed transaction operations for a 200-agent brokerage in South Florida.',
  'Jack Brighenti': 'Co-founder at Britanni AI. Licensed broker with 12 years of experience in residential transactions.',
  'Brittany Brighenti': 'Co-founder at Britanni AI. Managed 3,000+ transactions as a senior TC before building Britanni.',
};

export const STATE_ARCHITECTURE = {
  'california': 'Spanish colonial home with stucco walls and terracotta roof tiles',
  'texas': 'Hill Country limestone ranch home with a wide front porch',
  'florida': 'Mediterranean revival home with palm trees and coastal landscaping',
  'new-york': 'Classic brownstone townhouse with mature trees lining the street',
  'pennsylvania': 'Colonial brick home with black shutters and stone pathway',
  'illinois': 'Chicago bungalow with Prairie-style details and a manicured lawn',
  'ohio': 'Colonial revival home with a craftsman front porch',
  'georgia': 'Southern colonial with wraparound porch and white columns',
  'north-carolina': 'Cape Cod home with stone accents and mountain backdrop',
  'michigan': 'Tudor-style home with brick and timber details',
  'new-jersey': 'Colonial with cedar shake siding and a circular driveway',
  'virginia': 'Red brick colonial with dormer windows and boxwood hedges',
  'washington': 'Pacific Northwest craftsman with natural wood siding',
  'arizona': 'Desert modern home with clean stucco lines and desert landscaping',
  'tennessee': 'Craftsman farmhouse with a metal roof and stone chimney',
  'massachusetts': 'New England colonial with clapboard siding and fall foliage',
  'colorado': 'Mountain modern home with large windows and timber framing',
};

export const DEFAULT_ARCHITECTURE = 'Craftsman style home in an established neighborhood with mature landscaping';
```

- [ ] **Step 2: Run tests to confirm nothing broke**

Run: `cd /Users/brandonlevine/Desktop/AI-Assistant/britanni-ai-website && npm test`
Expected: All existing tests pass

- [ ] **Step 3: Commit**

```bash
git add scripts/blog-topics.js
git commit -m "feat: add author bios and state architecture mapping for image generation"
```

---

### Task 3: Rewrite Prompt Templates

**Files:**
- Rewrite: `scripts/blog-prompts.js`

- [ ] **Step 1: Replace blog-prompts.js with editorial-formatted templates**

```javascript
import { STATE_DISPLAY_NAMES, AUTHORS, AUTHOR_BIOS } from './blog-topics.js';

const CURRENT_YEAR = new Date().getFullYear();
const TODAY = new Date().toISOString().split('T')[0];

function pickAuthor() {
  const name = AUTHORS[Math.floor(Math.random() * AUTHORS.length)];
  return { name, bio: AUTHOR_BIOS[name] };
}

const FORMATTING_RULES = `
FORMATTING RULES (strict — violating these means the post will be rejected):
- Maximum 3 sentences per paragraph. No exceptions.
- No emojis anywhere in the post.
- No colored callout boxes, gradient cards, "KEY TAKEAWAY", "PRO TIP", or "IMPORTANT" labels.
- No bullet-point-heavy sections that read like a list dump.
- Blockquotes: use sparingly (max 1-2 per post), only for direct legal citations or expert quotes. Format as standard markdown blockquotes.
- Bold the first sentence of 2-3 key paragraphs throughout the post (for skimmers scanning the page).
- One H2 heading every 300-400 words (aim for 5-8 H2s total).
- Include 2-3 internal links as markdown: [descriptive anchor text](/blog/related-slug)
- Include 1 external authority link to a state RE commission, NAR, or official statute source.
- CTA: do NOT create a separate closing section or banner. Instead, weave one natural mention of Britanni AI + a link to /pricing into the final 2 paragraphs of the article body.
- Do not start any sentence with "In today's" or "As a real estate professional" or "Whether you're" or "Let's dive in"
- Do not summarize what you just said. No recap paragraphs. No "In conclusion" sections.
- Do not use the words: comprehensive, landscape, navigate, delve, realm, crucial, leverage, utilize, streamline, empower
- Write like a sharp industry journalist, not a marketing copywriter.`;

export function buildType1Prompt(state, category) {
  const stateName = STATE_DISPLAY_NAMES[state];
  const author = pickAuthor();
  const primaryKeyword = `${stateName} ${category.label.toLowerCase()} ${CURRENT_YEAR}`;

  return `Write a blog post for real estate agents about ${category.label} in ${stateName}.

Primary keyword: "${primaryKeyword}"
Word count: 1,500-2,000 words
Audience: Licensed real estate agents and their brokers in ${stateName}

CONTENT REQUIREMENTS:
- Cite specific state statutes, forms, or regulatory bodies by name
- Include the specific form numbers agents use in ${stateName}
- Explain what happens if an agent fails to comply (liability, deal cancellation, fines)
- Include a section on common mistakes agents make (3-5 specific errors)
- Include a section addressing what brokers need to audit or enforce
- The primary keyword "${primaryKeyword}" must appear in: the title, the first 100 words, at least one H2 heading, and the final paragraph

${FORMATTING_RULES}

Output ONLY the markdown file with frontmatter. Use this exact frontmatter:
---
title: "[Title naturally including ${stateName} and the topic]"
description: "[150-160 chars, includes primary keyword, ends with value prop]"
publishDate: "${TODAY}"
modifiedDate: "${TODAY}"
author: "${author.name}"
authorBio: "${author.bio}"
readTime: "CALCULATE_AFTER"
image: "/images/blog/${state}-${category.slug}-${CURRENT_YEAR}.webp"
imageAlt: "[Descriptive scene including '${primaryKeyword}' naturally]"
tags: ["${category.slug}", "${state}", "compliance"]
keywords: ["${primaryKeyword}", "${stateName.toLowerCase()} real estate compliance", "${category.label.toLowerCase()}"]
type: "regulatory"
---`;
}

export function buildType2Prompt(topic) {
  const author = pickAuthor();
  const primaryKeyword = topic.title.toLowerCase().replace(/[^a-z0-9 ]/g, '').trim();

  return `Write an operational how-to blog post for real estate agents: "${topic.title}"

Primary keyword: "${primaryKeyword}"
Word count: 2,000-2,500 words
Audience: Agents managing 5-15 active deals + brokers managing agent teams

CONTENT REQUIREMENTS:
- Open with the pain point. Quantify it: time wasted, error rates, liability exposure, dollar amounts.
- Provide a concrete, step-by-step system with specific actionable advice.
- Include specific numbers, time comparisons, or cost data where possible.
- The primary keyword must appear in: the first 100 words, at least one H2, and the final paragraph.
- Weave one natural mention of Britanni AI + /pricing link into the final 2 paragraphs. Do not create a separate CTA section.

${FORMATTING_RULES}

Output ONLY the markdown file with frontmatter. Use this exact frontmatter:
---
title: "${topic.title}"
description: "[150-160 chars with primary keyword]"
publishDate: "${TODAY}"
modifiedDate: "${TODAY}"
author: "${author.name}"
authorBio: "${author.bio}"
readTime: "CALCULATE_AFTER"
image: "/images/blog/${topic.slug}.webp"
imageAlt: "[Descriptive scene of an agent workspace related to ${topic.slug}]"
tags: ["operations", "guide"]
keywords: ["${primaryKeyword}", "real estate transaction management", "agent productivity"]
type: "operational"
---`;
}

export function buildType3Prompt(topic) {
  const author = pickAuthor();

  return `Write an opinion/analysis blog post: "${topic.title}"

Word count: 1,000-1,500 words
Audience: Brokers, team leads, and senior agents who follow industry trends
Byline: ${author.name}

CONTENT REQUIREMENTS:
- Take a clear stance in the first paragraph. No throat-clearing.
- Support with data, specific examples, or logical argument.
- Reference specific industry events, regulations, or data sources by name.
- Acknowledge the strongest counterargument, then address it directly.
- End with an actionable takeaway. Weave a brief mention of brittani.ai into the final paragraph naturally.

${FORMATTING_RULES}

Output ONLY the markdown file with frontmatter. Use this exact frontmatter:
---
title: "${topic.title}"
description: "[150-160 chars, opinionated angle]"
publishDate: "${TODAY}"
modifiedDate: "${TODAY}"
author: "${author.name}"
authorBio: "${author.bio}"
readTime: "CALCULATE_AFTER"
image: "/images/blog/${topic.slug}.webp"
imageAlt: "[Abstract architectural detail related to the industry topic]"
tags: ["industry", "opinion"]
keywords: ["real estate industry trends", "broker operations", "transaction coordination"]
type: "opinion"
---`;
}
```

- [ ] **Step 2: Run tests to confirm imports still work**

Run: `cd /Users/brandonlevine/Desktop/AI-Assistant/britanni-ai-website && npm test`
Expected: All tests pass (tests import from blog-topics.js, not blog-prompts.js directly)

- [ ] **Step 3: Commit**

```bash
git add scripts/blog-prompts.js
git commit -m "feat: rewrite prompt templates with editorial formatting rules and keyword enforcement"
```

---

### Task 4: DALL-E 3 Image Generation Script

**Files:**
- Create: `scripts/blog-images.js`

- [ ] **Step 1: Install OpenAI SDK and sharp**

Run: `cd /Users/brandonlevine/Desktop/AI-Assistant/britanni-ai-website && npm install --save-dev openai sharp`

- [ ] **Step 2: Create the image generation module**

```javascript
import OpenAI from 'openai';
import sharp from 'sharp';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { STATE_ARCHITECTURE, DEFAULT_ARCHITECTURE } from './blog-topics.js';

const IMAGE_DIR = join(process.cwd(), 'public/images/blog');

const STYLE_PREFIX = 'Editorial real estate photography, natural warm lighting, shot on Canon EOS R5 with 35mm f/1.8 lens, shallow depth of field, muted earth tones with subtle blue accent, clean composition, architectural digest style, no text overlay, no people facing camera';

const NEGATIVE_SUFFIX = 'Do not include: cartoon, illustration, 3d render, AI art, stock photo poses, text, watermark, logo, neon, gradient, oversaturated, HDR, fisheye, people smiling at camera';

function buildImagePrompt(type, state, topicSlug) {
  let subject;

  if (type === 'regulatory' && state) {
    const arch = STATE_ARCHITECTURE[state] || DEFAULT_ARCHITECTURE;
    subject = `${arch}, golden hour afternoon light, a few documents visible on the front porch railing slightly out of focus`;
  } else if (type === 'operational') {
    subject = `Real estate agent's clean organized desk with a laptop showing a calendar view, neat stack of contracts beside it, morning light from a large window, minimalist modern office`;
  } else {
    subject = `Modern glass and steel office building exterior detail, blue sky reflected in windows, clean geometric lines, minimalist urban architecture`;
  }

  return `${STYLE_PREFIX}, ${subject}. ${NEGATIVE_SUFFIX}`;
}

export async function generateImage(slug, type, state) {
  const client = new OpenAI();
  const prompt = buildImagePrompt(type, state, slug);

  console.log(`[Image] Generating: ${slug}`);

  const response = await client.images.generate({
    model: 'dall-e-3',
    prompt,
    n: 1,
    size: '1792x1024',
    quality: 'standard',
    response_format: 'b64_json',
  });

  const imageData = Buffer.from(response.data[0].b64_json, 'base64');

  await mkdir(IMAGE_DIR, { recursive: true });

  const webpBuffer = await sharp(imageData).webp({ quality: 85 }).toBuffer();
  const filepath = join(IMAGE_DIR, `${slug}.webp`);
  await writeFile(filepath, webpBuffer);

  console.log(`[Image] Saved: ${filepath}`);
  return `/images/blog/${slug}.webp`;
}
```

- [ ] **Step 3: Commit**

```bash
git add scripts/blog-images.js package.json package-lock.json
git commit -m "feat: add DALL-E 3 image generation with brand style prefix and WebP conversion"
```

---

### Task 5: Update generate-blogs.js

**Files:**
- Modify: `scripts/generate-blogs.js`

- [ ] **Step 1: Rewrite generate-blogs.js to integrate images and calculate read time**

```javascript
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

async function generateType1(existingPosts) {
  const state = pickNextState(existingPosts);
  const category = pickNextType1Category(state, existingPosts);
  const slug = `${state}-${category.slug}-${CURRENT_YEAR}`;
  console.log(`[Type 1] Generating: ${state} — ${category.label}`);

  const prompt = buildType1Prompt(state, category);
  const markdown = await callClaude(prompt);

  await generateImage(slug, 'regulatory', state);

  return { filename: `${slug}.md`, content: cleanMarkdown(markdown) };
}

async function generateType2(existingPosts) {
  const topic = pickNextType2Topic(existingPosts);
  console.log(`[Type 2] Generating: ${topic.title}`);

  const prompt = buildType2Prompt(topic);
  const markdown = await callClaude(prompt);

  await generateImage(topic.slug, 'operational', null);

  return { filename: `${topic.slug}.md`, content: cleanMarkdown(markdown) };
}

async function generateType3(existingPosts) {
  const topic = pickNextType3Topic(existingPosts);
  console.log(`[Type 3] Generating: ${topic.title}`);

  const prompt = buildType3Prompt(topic);
  const markdown = await callClaude(prompt);

  await generateImage(topic.slug, 'opinion', null);

  return { filename: `${topic.slug}.md`, content: cleanMarkdown(markdown) };
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
    await writeFile(filepath, content, 'utf-8');
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
```

- [ ] **Step 2: Update the GitHub Actions workflow to include OPENAI_API_KEY**

In `.github/workflows/daily-blogs.yml`, update the "Generate blog posts" step env:

```yaml
      - name: Generate blog posts
        env:
          AWS_REGION: us-east-1
          OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
        run: npm run generate-blogs
```

Also add the images directory to the git add step:

```yaml
          git add src/content/blog/ public/images/blog/
```

- [ ] **Step 3: Commit**

```bash
git add scripts/generate-blogs.js .github/workflows/daily-blogs.yml
git commit -m "feat: integrate image generation and calculated read time into blog pipeline"
```

---

### Task 6: Blog Post Layout & Components

**Files:**
- Create: `src/components/blog/TableOfContents.astro`
- Create: `src/components/blog/RelatedPosts.astro`
- Create: `src/components/blog/AuthorBio.astro`
- Rewrite: `src/pages/blog/[...slug].astro`

- [ ] **Step 1: Create TableOfContents component**

```astro
---
// src/components/blog/TableOfContents.astro
interface Props {
  headings: { depth: number; slug: string; text: string }[];
}

const { headings } = Astro.props;
const h2s = headings.filter(h => h.depth === 2);
---

{h2s.length >= 4 && (
  <nav class="border-l-2 border-slate-100 pl-4 mb-10">
    <p class="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">In this article</p>
    <ul class="space-y-2">
      {h2s.map(h => (
        <li>
          <a href={`#${h.slug}`} class="text-sm text-slate-500 hover:text-blue-600 transition-colors">
            {h.text}
          </a>
        </li>
      ))}
    </ul>
  </nav>
)}
```

- [ ] **Step 2: Create AuthorBio component**

```astro
---
// src/components/blog/AuthorBio.astro
interface Props {
  name: string;
  bio?: string;
}

const { name, bio } = Astro.props;
const initials = name.split(' ').map(n => n[0]).join('');
---

<div class="border-t border-slate-100 pt-8 mt-12">
  <div class="flex items-start gap-3">
    <div class="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-sm font-semibold text-slate-500 flex-shrink-0">
      {initials}
    </div>
    <div>
      <p class="text-sm font-semibold text-slate-900">{name}</p>
      {bio && <p class="text-sm text-slate-500 mt-0.5">{bio}</p>}
    </div>
  </div>
</div>
```

- [ ] **Step 3: Create RelatedPosts component**

```astro
---
// src/components/blog/RelatedPosts.astro
import { getCollection } from 'astro:content';

interface Props {
  currentId: string;
  tags: string[];
}

const { currentId, tags } = Astro.props;
const allPosts = await getCollection('blog');

const related = allPosts
  .filter(p => p.id !== currentId)
  .map(p => {
    const sharedTags = (p.data.tags || []).filter(t => tags.includes(t)).length;
    return { ...p, relevance: sharedTags };
  })
  .sort((a, b) => b.relevance - a.relevance || new Date(b.data.publishDate).getTime() - new Date(a.data.publishDate).getTime())
  .slice(0, 3);
---

{related.length > 0 && (
  <div class="mt-12 pt-8 border-t border-slate-100">
    <h3 class="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4">Related articles</h3>
    <div class="space-y-4">
      {related.map(post => (
        <a href={`/blog/${post.id}`} class="block group">
          <p class="text-base font-medium text-slate-900 group-hover:text-blue-600 transition-colors">{post.data.title}</p>
          <p class="text-sm text-slate-500 mt-0.5">{post.data.author} · {new Date(post.data.publishDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
        </a>
      ))}
    </div>
  </div>
)}
```

- [ ] **Step 4: Rewrite the blog post page**

Replace `src/pages/blog/[...slug].astro` with:

```astro
---
import PageLayout from '../../layouts/PageLayout.astro';
import CTABanner from '../../components/global/CTABanner.astro';
import Disclaimer from '../../components/blog/Disclaimer.astro';
import TableOfContents from '../../components/blog/TableOfContents.astro';
import AuthorBio from '../../components/blog/AuthorBio.astro';
import RelatedPosts from '../../components/blog/RelatedPosts.astro';
import { getCollection, render } from 'astro:content';

export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map((post) => ({
    params: { slug: post.id },
    props: { post },
  }));
}

const { post } = Astro.props;
const { Content, headings } = await render(post);

const COMPLIANCE_TAGS = ['compliance', 'seller-disclosure-requirements', 'buyer-contingency-deadlines', 'earnest-money-rules', 'building-code-updates', 'hoa-condo-requirements', 'title-and-closing-procedures', 'escrow-regulations', 'property-condition-disclosures'];
const showDisclaimer = (post.data.tags || []).some((t: string) => COMPLIANCE_TAGS.includes(t));

const primaryTag = (post.data.tags || [])[0] || '';
const categoryLabel = primaryTag.split('-').map((w: string) => w[0]?.toUpperCase() + w.slice(1)).join(' ');

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": post.data.title,
  "description": post.data.description,
  "image": post.data.image ? `https://brittani.ai${post.data.image}` : undefined,
  "author": {
    "@type": "Person",
    "name": post.data.author,
  },
  "publisher": {
    "@type": "Organization",
    "name": "Britanni AI",
    "logo": { "@type": "ImageObject", "url": "https://brittani.ai/favicon.svg" }
  },
  "datePublished": post.data.publishDate,
  "dateModified": post.data.modifiedDate || post.data.publishDate,
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": `https://brittani.ai/blog/${post.id}`
  }
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://brittani.ai" },
    { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://brittani.ai/blog" },
    { "@type": "ListItem", "position": 3, "name": post.data.title, "item": `https://brittani.ai/blog/${post.id}` }
  ]
};

const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": ["article h1", "article .prose > p:first-of-type"]
  }
};

const ogImage = post.data.image ? `https://brittani.ai${post.data.image}` : 'https://brittani.ai/og-image.jpg';
---

<PageLayout
  title={`${post.data.title} | Britanni AI Blog`}
  description={post.data.description}
  canonical={`https://brittani.ai/blog/${post.id}`}
  ogImage={ogImage}
  jsonLd={[articleSchema, breadcrumbSchema, speakableSchema]}
>
  <Fragment slot="head">
    <meta name="author" content={post.data.author} />
    <meta name="keywords" content={(post.data.keywords || post.data.tags || []).join(', ')} />
    <meta name="robots" content="index, follow" />
    <meta property="og:type" content="article" />
    <meta property="article:published_time" content={post.data.publishDate} />
    <meta property="article:modified_time" content={post.data.modifiedDate || post.data.publishDate} />
    <meta property="article:author" content={post.data.author} />
    {(post.data.tags || []).map((tag: string) => (
      <meta property="article:tag" content={tag} />
    ))}
    {post.data.image && (
      <>
        <meta property="og:image:width" content="1792" />
        <meta property="og:image:height" content="1024" />
        <meta property="og:image:alt" content={post.data.imageAlt || post.data.title} />
      </>
    )}
  </Fragment>

  <article class="py-12 md:py-20">
    <div class="max-w-[680px] mx-auto px-6 md:px-8">
      <!-- Breadcrumb -->
      <nav class="text-sm text-slate-400 mb-6">
        <a href="/blog" class="hover:text-blue-600 transition-colors">Blog</a>
        <span class="mx-2">/</span>
        <span class="text-slate-500">{categoryLabel}</span>
      </nav>

      <!-- Header -->
      <header class="mb-8">
        <h1 class="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
          {post.data.title}
        </h1>
        <p class="mt-4 text-lg text-slate-500 leading-relaxed">
          {post.data.description}
        </p>
        <div class="flex items-center gap-3 mt-6">
          <div class="w-9 h-9 bg-slate-100 rounded-full flex items-center justify-center text-xs font-semibold text-slate-500">
            {post.data.author.split(' ').map((n: string) => n[0]).join('')}
          </div>
          <div>
            <p class="text-sm font-medium text-slate-900">{post.data.author}</p>
            <p class="text-xs text-slate-400">
              Updated {new Date(post.data.modifiedDate || post.data.publishDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} · {post.data.readTime}
            </p>
          </div>
        </div>
      </header>

      <!-- Hero Image -->
      {post.data.image && (
        <figure class="mb-10">
          <img
            src={post.data.image}
            alt={post.data.imageAlt || post.data.title}
            width="1792"
            height="1024"
            class="w-full rounded aspect-[16/9] object-cover"
            loading="eager"
          />
        </figure>
      )}

      <!-- Table of Contents -->
      <TableOfContents headings={headings} />

      <!-- Article Body -->
      <div class="prose prose-slate max-w-none">
        <Content />
      </div>

      <!-- Disclaimer -->
      {showDisclaimer && <Disclaimer />}

      <!-- Author Bio -->
      <AuthorBio name={post.data.author} bio={post.data.authorBio} />

      <!-- Related Posts -->
      <RelatedPosts currentId={post.id} tags={post.data.tags || []} />
    </div>
  </article>

  <CTABanner
    headline="Ready to Automate Your Transaction Coordination?"
    subheadline="Try Britanni AI free for 14 days. No credit card required."
    primaryCta="Start Free Trial"
    secondaryCta="Book a Demo"
  />
</PageLayout>
```

- [ ] **Step 5: Update BaseLayout to support head slot**

In `src/layouts/BaseLayout.astro`, add a `<slot name="head" />` inside the `<head>` tag, after the JSON-LD scripts:

Add before `</head>`:
```astro
    <slot name="head" />
```

And in `src/layouts/PageLayout.astro`, pass it through. Update to:
```astro
---
import BaseLayout from './BaseLayout.astro';
import Header from '../components/global/Header.astro';
import Footer from '../components/global/Footer.astro';

interface Props {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  noindex?: boolean;
  jsonLd?: object | object[];
}

const props = Astro.props;
---

<BaseLayout {...props}>
  <Fragment slot="head"><slot name="head" /></Fragment>
  <Header />
  <main id="main-content">
    <slot />
  </main>
  <Footer />
</BaseLayout>
```

- [ ] **Step 6: Verify build passes**

Run: `cd /Users/brandonlevine/Desktop/AI-Assistant/britanni-ai-website && npm run build`
Expected: Build succeeds

- [ ] **Step 7: Commit**

```bash
git add src/components/blog/TableOfContents.astro src/components/blog/AuthorBio.astro src/components/blog/RelatedPosts.astro src/pages/blog/\[...slug\].astro src/layouts/BaseLayout.astro src/layouts/PageLayout.astro
git commit -m "feat: rebuild blog post layout with TOC, related posts, author bio, and full SEO meta"
```

---

### Task 7: Editorial Prose CSS

**Files:**
- Modify: `src/styles/global.css`

- [ ] **Step 1: Add editorial prose overrides to global.css**

Append to the end of `src/styles/global.css`:

```css
@layer components {
  .prose {
    font-size: 1.125rem;
    line-height: 1.75;
    color: #334155;
  }

  @media (max-width: 768px) {
    .prose {
      font-size: 1rem;
    }
  }

  .prose p {
    margin-bottom: 1.5rem;
  }

  .prose h2 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #0f172a;
    margin-top: 3rem;
    margin-bottom: 1rem;
    letter-spacing: -0.015em;
  }

  .prose h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #1e293b;
    margin-top: 2rem;
    margin-bottom: 0.75rem;
  }

  .prose blockquote {
    border-left: 2px solid #e2e8f0;
    padding-left: 1.25rem;
    font-style: italic;
    color: #64748b;
    margin: 1.75rem 0;
  }

  .prose blockquote p {
    margin-bottom: 0;
  }

  .prose a {
    color: #2563eb;
    text-decoration: none;
  }

  .prose a:hover {
    text-decoration: underline;
  }

  .prose img {
    width: 100%;
    border-radius: 4px;
    margin-bottom: 0.5rem;
  }

  .prose figcaption {
    font-size: 0.8125rem;
    color: #94a3b8;
    font-style: italic;
    text-align: center;
    margin-bottom: 1.75rem;
  }

  .prose strong {
    color: #0f172a;
    font-weight: 600;
  }

  .prose hr {
    border: none;
    border-top: 1px solid #f1f5f9;
    margin: 2rem 0;
  }

  .prose table {
    width: 100%;
    font-size: 0.875rem;
    border-collapse: collapse;
    margin: 1.5rem 0;
  }

  .prose th, .prose td {
    padding: 0.75rem;
    border-bottom: 1px solid #f1f5f9;
    text-align: left;
  }

  .prose th {
    font-weight: 600;
    color: #0f172a;
  }
}
```

- [ ] **Step 2: Verify build**

Run: `cd /Users/brandonlevine/Desktop/AI-Assistant/britanni-ai-website && npm run build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add src/styles/global.css
git commit -m "feat: add editorial prose CSS for blog posts"
```

---

## Post-Implementation

### Secrets to Add

After pushing, add this repo secret:
```bash
gh secret set OPENAI_API_KEY --repo brandonlevine1/brittani-website
```

### Testing End-to-End

Run locally:
```bash
export OPENAI_API_KEY="your-key"
export AWS_REGION="us-east-1"
npm run generate-blogs
npm run dev
# Visit http://localhost:4321/blog to check formatting
```

### Existing Posts

Old posts missing the new fields (`image`, `imageAlt`, `keywords`, `type`, `authorBio`, `modifiedDate`) will still render — all new fields are optional in the schema. They just won't have hero images or the enhanced meta tags until regenerated.

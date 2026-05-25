# Blog Branding, Formatting & SEO System — Design Spec

## Overview

A comprehensive overhaul of the Britanni AI blog that delivers: brand-native editorial formatting, automated image generation via DALL-E 3, full SEO meta/schema coverage, keyword enforcement in AI prompts, and a consistent template that produces professional posts indistinguishable from human-written editorial content.

**Problems this solves:**
- Generated posts look AI-written (gradient boxes, emojis, colored labels, wall-of-text paragraphs)
- No images (hero or mid-article), no per-post OG images for social sharing
- Missing SEO meta tags (`article:published_time`, `article:author`, per-post `og:image`)
- No table of contents, no related posts, no keyword enforcement
- Inconsistent formatting across posts

---

## 1. Editorial Brand Guidelines

### Voice & Formatting Rules

| Rule | Enforcement |
|------|-------------|
| Max 3 sentences per paragraph | Prompt template instruction |
| No emojis anywhere | Prompt negative instruction |
| No colored callout boxes, gradient cards, or "KEY REQUIREMENT" labels | Prompt negative instruction |
| Blockquotes: thin gray left border + italic. Used sparingly for legal citations or expert quotes. | Prompt instruction + CSS |
| Bold the first sentence of important paragraphs (for skimmers) | Prompt instruction |
| H2 every 300–400 words (5–8 per post) | Prompt instruction |
| One external authority link per post (state RE commission, NAR, statute database) | Prompt instruction |
| 2–3 internal links to other Britanni blog posts | Prompt instruction (reference existing posts) |
| Single CTA per post — quiet gray box after value delivery, not a banner | Prompt instruction + layout component |
| Author: real founder name with credentials, not "Britanni AI Team" | Prompt template change |

### Typography & Layout (CSS)

```
Body: Inter, 16px on mobile, 18px on desktop
Line height: 1.75
Max content width: 680px (optimal 60–70 chars per line)
Paragraph spacing: 24px margin-bottom
H2: 24px, font-weight 700, color slate-900, 48px margin-top
Blockquote: 2px solid slate-200 left border, italic, slate-500 color
Links: blue-600, underline on hover only
Images: full content width, 4px border-radius, 8px margin-bottom for captions
Captions: 13px, slate-400, italic, centered
```

### What Makes It NOT Look AI-Generated

- No decoration for emphasis — emphasis comes from writing quality
- Blockquotes are newspaper-style (thin border, italic), not "info boxes"
- CTA is a simple gray card with a text link, not a button
- Author has a real name, real credentials, real headshot placeholder
- Images are photographic, not abstract/illustrative
- No "In this article we will explore..." openers
- No summary paragraphs that restate what was just said

---

## 2. Image Generation Pipeline

### Model

DALL-E 3 via OpenAI API. Called during the GitHub Action blog generation step.

### Brand Prompt Formula

Every image prompt is assembled from three parts:

```
FULL_PROMPT = STYLE_PREFIX + SUBJECT + ", " + NEGATIVE_SUFFIX
```

#### STYLE_PREFIX (never changes)

```
Editorial real estate photography, natural warm lighting, shot on Canon EOS R5 with 35mm f/1.8 lens, shallow depth of field, muted earth tones with subtle blue accent, clean composition, architectural digest style, 16:9 aspect ratio, no text overlay, no people facing camera
```

#### SUBJECT (determined by post type + state + topic)

**State regulatory posts:**
```
[State architecture style] home exterior, [topic-relevant detail], [time of day]
```

**Operational how-to posts:**
```
Real estate agent's [workspace element], [organizational detail], natural light from window
```

**Opinion/industry posts:**
```
[Abstract architectural detail], clean geometric lines, minimalist
```

#### NEGATIVE_SUFFIX (always appended)

```
Do not include: cartoon, illustration, 3d render, AI art, stock photo poses, text, watermark, logo, neon, gradient, oversaturated, HDR, fisheye, people smiling at camera
```

### State Architecture Mapping

| State | Architecture Style |
|-------|-------------------|
| California | Spanish colonial, mid-century modern, stucco with terracotta |
| Texas | Hill Country limestone, ranch-style, modern farmhouse |
| Florida | Mediterranean revival, coastal, Key West style with palms |
| New York | Brownstone, colonial, Tudor with mature trees |
| Pennsylvania | Colonial brick, Victorian, stone farmhouse |
| Illinois | Chicago bungalow, Prairie style, Victorian painted lady |
| Ohio | Colonial revival, Cape Cod, craftsman |
| Georgia | Southern colonial, antebellum, craftsman with wraparound porch |
| North Carolina | Colonial, Cape Cod, mountain lodge with stone |
| Michigan | Tudor, craftsman bungalow, colonial brick |
| (default for unlisted states) | Craftsman style home, established neighborhood, mature landscaping |

### Image Specifications

- **Dimensions:** 1792×1024 (DALL-E 3's closest to 16:9)
- **Format:** PNG, converted to WebP after generation for web delivery
- **File location:** `public/images/blog/[post-slug].webp`
- **Also used as:** OG image for that post's social sharing
- **Count per post:** 1 hero image (mid-article images deferred to future enhancement)
- **Alt text:** Generated by Claude in the blog prompt — must describe the scene and include the primary keyword naturally

### Cost

- DALL-E 3 at 1792×1024: $0.12/image
- 3 posts/day × 1 image each = $0.36/day = **~$10.80/month**

---

## 3. SEO Meta & Schema Implementation

### Meta Tags (add to BaseLayout for blog posts)

```html
<meta name="author" content="{author}">
<meta name="keywords" content="{primary keyword}, {secondary keywords from tags}">
<meta name="robots" content="index, follow">
<meta property="og:type" content="article">
<meta property="article:published_time" content="{publishDate}">
<meta property="article:modified_time" content="{modifiedDate || publishDate}">
<meta property="article:author" content="{author}">
<meta property="article:section" content="{primary tag}">
<meta property="article:tag" content="{each tag}">
<meta property="og:image" content="https://brittani.ai/images/blog/{slug}.webp">
<meta property="og:image:width" content="1792">
<meta property="og:image:height" content="1024">
<meta property="og:image:alt" content="{image alt text}">
```

### Schema Markup (per post type)

**All posts:** `Article` + `BreadcrumbList` (already have this — enhance `Article` with `image` field)

**How-to posts (Type 2):** Add `HowTo` schema when post contains numbered steps:
```json
{
  "@type": "HowTo",
  "name": "{title}",
  "step": [
    { "@type": "HowToStep", "name": "Step title", "text": "Step description" }
  ]
}
```

**Posts with FAQ-style sections:** Add `FAQPage` schema:
```json
{
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "...", "acceptedAnswer": { "@type": "Answer", "text": "..." } }
  ]
}
```

**Speakable (all posts):**
```json
{
  "@type": "WebPage",
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": ["article h1", "article > div > p:first-of-type"]
  }
}
```

### Content Schema Updates

Update `content.config.ts` to add fields:

```typescript
const blog = defineCollection({
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
```

---

## 4. Template Components

### Table of Contents (auto-generated)

For posts over 1,500 words, render a TOC from H2 headings:
- Positioned after the hero image, before the body content
- Simple list: linked H2 text as anchor links
- Styled minimally: `text-sm`, `text-slate-500`, `border-l-2 border-slate-100 pl-4`
- Uses `id` slugs auto-generated from heading text

### Related Posts (bottom of article)

After the author bio, show 3 related posts:
- Match by: same primary tag first, then same state, then most recent
- Card format: title + author + date (no images to keep it clean)
- Heading: "Related articles" — not "You might also like" (too AI-sounding)

### Author Bio Block

At the end of every post:
```
[Avatar placeholder] {Author Name}
{One-line bio with credentials}
```

Author bios stored in `scripts/blog-topics.js`:
- Brandon Levine: "Co-founder at Britanni AI. Previously managed transaction operations for a 200-agent brokerage in South Florida."
- Jack Brighenti: "Co-founder at Britanni AI. Licensed broker with 12 years of experience in residential transactions."
- Brittany Brighenti: "Co-founder at Britanni AI. Managed 3,000+ transactions as a senior TC before building Britanni."

### Reading Time (calculated, not guessed)

Calculate from actual word count at build time: `Math.ceil(wordCount / 238)` minutes. Do not let the AI guess "8 min read" — compute it from the generated content.

---

## 5. Updated Prompt Templates

### Word Count Targets

| Post Type | Word Count | H2 Count | Images |
|-----------|-----------|----------|--------|
| State regulatory (Type 1) | 1,500–2,000 | 5–7 | Hero |
| Operational how-to (Type 2) | 2,000–2,500 | 6–8 | Hero |
| Opinion/industry (Type 3) | 1,000–1,500 | 4–5 | Hero |

### Keyword Strategy (enforced in prompts)

Primary keyword must appear in:
1. Title (naturally)
2. First 100 words of body
3. At least one H2 subheading
4. Last paragraph (before CTA)
5. Meta description
6. Image alt text

### Prompt Additions (appended to all post type prompts)

```
FORMATTING RULES (strict):
- Maximum 3 sentences per paragraph. No exceptions.
- No emojis. No colored boxes. No "KEY TAKEAWAY" or "PRO TIP" labels.
- No gradient backgrounds, no callout formatting.
- Blockquotes: use sparingly, only for direct legal citations or expert quotes.
- Bold the first sentence of 2-3 key paragraphs for skimmers.
- One H2 heading every 300-400 words.
- Include 2-3 internal links as markdown: [anchor text](/blog/related-slug)
- Include 1 external authority link (state RE commission, NAR, or statute source)
- CTA: do NOT use a closing section. Instead, weave one natural mention of Britanni + link to /pricing in the final 2 paragraphs.
- Do not start any sentence with "In today's" or "As a real estate professional" or "Whether you're"
- Do not summarize what you just said. No recap paragraphs.
- Do not use the word "comprehensive" or "landscape" or "navigate"

FRONTMATTER (use this exact format):
---
title: "..."
description: "... (150-160 chars, includes primary keyword)"
publishDate: "{date}"
modifiedDate: "{date}"
author: "{author name}"
authorBio: "{author bio}"
readTime: "{calculated after generation}"
image: "/images/blog/{slug}.webp"
imageAlt: "{descriptive alt text including primary keyword}"
tags: ["{tag1}", "{tag2}", "{tag3}"]
keywords: ["{primary keyword}", "{secondary keyword 1}", "{secondary keyword 2}"]
type: "{regulatory|operational|opinion}"
---
```

---

## 6. Blog Post Page Layout (updated [...slug].astro)

```
┌─────────────────────────────────────────┐
│ Breadcrumb: Blog / {State or Category}  │
├─────────────────────────────────────────┤
│ H1: Title                               │
│ Subtitle: description                   │
│ Author avatar + name + date + read time │
├─────────────────────────────────────────┤
│ Hero Image (full content width)         │
│ Caption (if applicable)                 │
├─────────────────────────────────────────┤
│ Table of Contents (if > 1500 words)     │
├─────────────────────────────────────────┤
│ Article body                            │
│ (short paragraphs, H2s, blockquotes,    │
│  inline CTA near end)                   │
├─────────────────────────────────────────┤
│ Legal disclaimer (if compliance-tagged) │
├─────────────────────────────────────────┤
│ Author bio                              │
├─────────────────────────────────────────┤
│ Related articles (3 cards)              │
├─────────────────────────────────────────┤
│ CTA Banner (existing component)         │
└─────────────────────────────────────────┘
```

---

## 7. New Secrets Required

| Secret | Repo | Purpose |
|--------|------|---------|
| `OPENAI_API_KEY` | `brandonlevine1/brittani-website` | DALL-E 3 image generation |

---

## 8. File Changes Summary

| File | Action |
|------|--------|
| `scripts/blog-prompts.js` | Rewrite — new formatting rules, keyword enforcement, word counts |
| `scripts/blog-topics.js` | Update — add author bios, state architecture mapping |
| `scripts/blog-images.js` | Create — DALL-E 3 integration with brand prompt formula |
| `scripts/generate-blogs.js` | Update — integrate image generation, calculate read time, new frontmatter |
| `src/content.config.ts` | Update — add new schema fields |
| `src/pages/blog/[...slug].astro` | Rewrite — new layout with TOC, related posts, author bio, meta tags |
| `src/components/blog/TableOfContents.astro` | Create |
| `src/components/blog/RelatedPosts.astro` | Create |
| `src/components/blog/AuthorBio.astro` | Create |
| `src/components/blog/BlogMeta.astro` | Create — handles all OG/article meta tags |
| `src/layouts/BaseLayout.astro` | Update — support article-type OG tags |
| `src/styles/global.css` | Update — prose overrides for editorial style |
| `.github/workflows/daily-blogs.yml` | Update — add OPENAI_API_KEY secret, image generation step |
| `package.json` | Update — add `openai` dependency |

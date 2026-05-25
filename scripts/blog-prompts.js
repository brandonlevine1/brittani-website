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

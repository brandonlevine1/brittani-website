import { STATE_DISPLAY_NAMES, AUTHORS } from './blog-topics.js';

const CURRENT_YEAR = new Date().getFullYear();

export function buildType1Prompt(state, category) {
  const stateName = STATE_DISPLAY_NAMES[state];
  return `Write a blog post for real estate agents about ${category.label} in ${stateName}.

Target keyword: "${stateName} ${category.label.toLowerCase()} ${CURRENT_YEAR}"
Word count: 1,200-1,800 words
Audience: Licensed real estate agents and their brokers in ${stateName}

Requirements:
- Cite specific state statutes, forms, or regulatory bodies by name
- Include the specific form numbers agents use in ${stateName}
- Explain what happens if an agent fails to comply (liability, deal cancellation, fines)
- Include a "Common Mistakes" section with 3-5 specific errors agents make
- Include a "What Brokers Should Know" section (2-3 paragraphs)
- End with a single paragraph mentioning Britanni AI's relevant automation feature and link to /pricing for a free trial
- Tone: authoritative, practical, direct. No generic filler or obvious statements.
- Do NOT start with "In today's..." or any similar cliche opener

Output ONLY the complete markdown file with frontmatter. Use this exact frontmatter format:
---
title: "[Full title with state name and year]"
description: "[One-sentence meta description under 160 chars, includes state name]"
publishDate: "${new Date().toISOString().split('T')[0]}"
author: "Britanni AI Team"
readTime: "[X] min read"
tags: ["${category.slug}", "${state}", "compliance"]
---

[Full article body in markdown with ## headings]`;
}

export function buildType2Prompt(topic) {
  const author = AUTHORS[Math.floor(Math.random() * AUTHORS.length)];
  return `Write an operational how-to blog post for real estate agents about: "${topic.title}"

Target keyword: "${topic.title.toLowerCase().replace(/[^a-z0-9 ]/g, '').trim()}"
Word count: 1,000-1,500 words
Audience: Agents managing 5-15 active deals + brokers managing agent teams

Requirements:
- Lead with the pain point (quantify it: time wasted, error rates, liability exposure)
- Provide a concrete, step-by-step solution with specific actionable advice
- Include specific numbers or comparisons where possible
- Bridge naturally to how Britanni AI automates this workflow (1-2 paragraphs near the end)
- End with a single specific CTA linking to /pricing for a free trial
- Tone: helpful, experienced, solution-oriented
- Do NOT start with "In today's..." or any similar cliche opener
- Use ## headings to break up sections

Output ONLY the complete markdown file with frontmatter. Use this exact frontmatter format:
---
title: "${topic.title}"
description: "[One-sentence meta description under 160 chars]"
publishDate: "${new Date().toISOString().split('T')[0]}"
author: "${author}"
readTime: "[X] min read"
tags: ["operations", "guide"]
---

[Full article body in markdown with ## headings]`;
}

export function buildType3Prompt(topic) {
  const author = AUTHORS[Math.floor(Math.random() * AUTHORS.length)];
  return `Write an opinion/analysis blog post about: "${topic.title}"

Word count: 800-1,200 words
Audience: Brokers, team leads, and senior agents who follow industry trends

Requirements:
- Take a clear stance in the first paragraph — no burying the thesis
- Support with data, specific examples, or logical argument
- Reference specific industry events, regulations, or data sources
- Acknowledge the strongest counterargument, then address it
- End with an actionable takeaway for the reader
- Final line: soft CTA — "See how we're building for this at brittani.ai" or similar
- Tone: confident, informed, slightly contrarian where warranted
- Do NOT start with "In today's..." or any similar cliche opener
- Byline this to ${author}

Output ONLY the complete markdown file with frontmatter. Use this exact frontmatter format:
---
title: "${topic.title}"
description: "[One-sentence meta description under 160 chars]"
publishDate: "${new Date().toISOString().split('T')[0]}"
author: "${author}"
readTime: "[X] min read"
tags: ["industry", "opinion"]
---

[Full article body in markdown with ## headings]`;
}

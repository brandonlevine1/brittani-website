import { STATE_DISPLAY_NAMES, AUTHORS, AUTHOR_BIOS } from './blog-topics.js';

const CURRENT_YEAR = new Date().getFullYear();
const TODAY = new Date().toISOString().split('T')[0];

function pickAuthor() {
  const name = AUTHORS[Math.floor(Math.random() * AUTHORS.length)];
  return { name, bio: AUTHOR_BIOS[name] };
}

function formatExistingPosts(slugs) {
  if (!slugs || slugs.length === 0) return '(none yet)';
  const sample = slugs.slice(-40).map(s => s.replace('.md', ''));
  return sample.join(', ');
}

const FORMATTING_RULES = `
YAML FRONTMATTER RULES (critical — invalid YAML breaks the build):
- If a frontmatter value contains a colon, quote, or special character, wrap it in double quotes and escape inner quotes with backslash: \\"
- Example: title: "Stop Calling It \\"AI\\" If It's Just a Template Library"
- Never use unescaped double quotes inside a double-quoted YAML value.
- Ensure consistent 0-space indentation for all top-level frontmatter keys.

FORMATTING RULES (strict — violating these means the post will be rejected):
- Maximum 3 sentences per paragraph. No exceptions.
- No emojis anywhere in the post.
- No colored callout boxes, gradient cards, "KEY TAKEAWAY", "PRO TIP", or "IMPORTANT" labels.
- No bullet-point-heavy sections that read like a list dump.
- Blockquotes: use sparingly (max 1-2 per post), only for direct legal citations or expert quotes. Format as standard markdown blockquotes.
- Bold the first sentence of 2-3 key paragraphs throughout the post (for skimmers scanning the page).
- Include 1-2 markdown comparison tables where data lends itself to side-by-side format (e.g., buyer vs. seller responsibilities, deadline comparisons, fee breakdowns, state requirement differences). Keep tables to 3-5 columns max and 4-8 rows. Tables improve featured snippet eligibility — use them where a reader would otherwise skim past a paragraph of numbers or comparisons.
- One H2 heading every 300-400 words (aim for 5-8 H2s total).
- Include 2-3 internal links to OTHER posts on our blog. You MUST only link to slugs from the EXISTING_POSTS list provided below the formatting rules. Pick the most relevant ones.
  Format: [descriptive anchor text](/blog/slug-from-existing-posts)
- Include 1 external authority link to a state RE commission, NAR, or official statute source.
- CTA: do NOT create a separate closing section or banner. Instead, weave one natural mention of Britanni AI + a link to /pricing into the final 2 paragraphs of the article body.
- Do not start any sentence with "In today's" or "As a real estate professional" or "Whether you're" or "Let's dive in"
- Do not summarize what you just said. No recap paragraphs. No "In conclusion" sections.
- Do not use the words: comprehensive, landscape, navigate, delve, realm, crucial, leverage, utilize, streamline, empower
- Write like a sharp industry journalist, not a marketing copywriter.

FAQ SECTION:
- Include a "faq" field in the frontmatter as a YAML array with 3-4 question/answer pairs.
- Questions should be phrased exactly how a real estate agent would type them into Google (natural language, often starting with "Do I need to...", "What happens if...", "How long...", "Who is responsible for...").
- Answers should be 1-3 sentences, direct, factual, and specific to the article's state/topic. No fluff.
- These will be used for FAQ rich snippets in search results — make them genuinely useful standalone answers.
- Format in frontmatter as:
  faq:
    - q: "The question?"
      a: "The direct answer."
    - q: "Another question?"
      a: "Another answer."`;


export function buildType1Prompt(state, category, existingPostSlugs = []) {
  const stateName = STATE_DISPLAY_NAMES[state];
  const author = pickAuthor();
  const primaryKeyword = `${stateName} ${category.label.toLowerCase()} ${CURRENT_YEAR}`;
  const internalLinks = formatExistingPosts(existingPostSlugs);

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

EXISTING_POSTS (use these for internal links — pick 2-3 most relevant):
${internalLinks}

IMAGE PROMPT FIELD:
Include an "imagePrompt" field in the frontmatter — a one-sentence visual scene description for a hero image. Make it unique to THIS specific article's content and state. Think editorially: what single image would a real estate magazine use for this story? Reference specific landmarks, architecture, landscapes, or legal imagery relevant to ${stateName} and the topic. Avoid generic desk/document shots. Examples: a closing table in a wood-paneled ${stateName} attorney's office, an aerial view of a specific neighborhood style, a state capitol building detail, escrow documents beside state-specific architectural elements.

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
imagePrompt: "[One-sentence visual scene description unique to this article — specific, editorial, evocative]"
tags: ["${category.slug}", "${state}", "compliance"]
keywords: ["${primaryKeyword}", "${stateName.toLowerCase()} real estate compliance", "${category.label.toLowerCase()}"]
type: "regulatory"
faq:
  - q: "[Question an agent would Google about ${category.label.toLowerCase()} in ${stateName}]"
    a: "[Direct 1-3 sentence answer]"
  - q: "[Another natural question]"
    a: "[Direct answer]"
  - q: "[Third question]"
    a: "[Direct answer]"
---`;
}

export function buildType2Prompt(topic, existingPostSlugs = []) {
  const author = pickAuthor();
  const primaryKeyword = topic.title.toLowerCase().replace(/[^a-z0-9 ]/g, '').trim();
  const internalLinks = formatExistingPosts(existingPostSlugs);

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

EXISTING_POSTS (use these for internal links — pick 2-3 most relevant):
${internalLinks}

IMAGE PROMPT FIELD:
Include an "imagePrompt" field in the frontmatter — a one-sentence visual scene description for a hero image. Make it unique to THIS specific article. Think editorially: what single image would a real estate trade magazine use for this story? Be specific and evocative — a particular workspace setup, a moment in a transaction, a visual metaphor. Avoid generic laptop-on-desk shots.

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
imagePrompt: "[One-sentence visual scene description unique to this article — specific, editorial, evocative]"
tags: ["operations", "guide"]
keywords: ["${primaryKeyword}", "real estate transaction management", "agent productivity"]
type: "operational"
faq:
  - q: "[Question an agent would Google about this operational topic]"
    a: "[Direct 1-3 sentence answer]"
  - q: "[Another natural question]"
    a: "[Direct answer]"
  - q: "[Third question]"
    a: "[Direct answer]"
---`;
}

export function buildType3Prompt(topic, existingPostSlugs = []) {
  const author = pickAuthor();
  const internalLinks = formatExistingPosts(existingPostSlugs);

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

EXISTING_POSTS (use these for internal links — pick 2-3 most relevant):
${internalLinks}

IMAGE PROMPT FIELD:
Include an "imagePrompt" field in the frontmatter — a one-sentence visual scene description for a hero image. Make it unique to THIS specific article's argument or thesis. Think editorially: what single image would convey this opinion piece's tone? It can be metaphorical, architectural, or documentary-style. Be specific and evocative. Avoid generic office/building shots.

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
imagePrompt: "[One-sentence visual scene description unique to this article — specific, editorial, evocative]"
tags: ["industry", "opinion"]
keywords: ["real estate industry trends", "broker operations", "transaction coordination"]
type: "opinion"
faq:
  - q: "[Question a broker or senior agent would ask about this topic]"
    a: "[Direct 1-3 sentence answer]"
  - q: "[Another natural question]"
    a: "[Direct answer]"
  - q: "[Third question]"
    a: "[Direct answer]"
---`;
}

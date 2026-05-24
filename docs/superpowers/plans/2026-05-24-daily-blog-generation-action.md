# Daily Blog Generation GitHub Action — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A GitHub Action that runs daily at 6:00 AM ET, calls Claude API to generate 3 blog posts (state-specific regulatory, operational how-to, industry opinion), commits them to a branch, and opens a PR for human review.

**Architecture:** A Node.js script (`scripts/generate-blogs.js`) handles topic selection (scanning existing posts, rotating through states/topics) and Claude API calls. A GitHub Actions workflow (`.github/workflows/daily-blogs.yml`) schedules the script, creates a branch, commits outputs, and opens a PR. The script is self-contained — no external dependencies beyond the Anthropic SDK.

**Tech Stack:** GitHub Actions, Node.js 20, `@anthropic-ai/sdk`, Astro content collection (markdown output)

---

## File Structure

```
.github/
  workflows/
    daily-blogs.yml          — Scheduled workflow (cron + manual dispatch)

scripts/
  generate-blogs.js          — Main generation script (topic selection + API calls)
  blog-topics.js             — Topic registry (states, categories, templates)
  blog-prompts.js            — Prompt templates for each post type

scripts/__tests__/
  topic-selection.test.js    — Tests for smart rotation logic
```

---

### Task 1: Topic Registry

**Files:**
- Create: `scripts/blog-topics.js`
- Test: `scripts/__tests__/topic-selection.test.js`

- [ ] **Step 1: Write the failing test for state rotation**

```javascript
// scripts/__tests__/topic-selection.test.js
import { describe, it, expect } from 'vitest';
import { pickNextState, STATES_BY_PRIORITY } from '../blog-topics.js';

describe('pickNextState', () => {
  it('returns the first state when no posts exist', () => {
    const result = pickNextState([]);
    expect(result).toBe('california');
  });

  it('returns the least-covered state', () => {
    const existingPosts = [
      'california-seller-disclosure-requirements-2026.md',
      'california-earnest-money-rules-2026.md',
      'texas-seller-disclosure-requirements-2026.md',
    ];
    const result = pickNextState(existingPosts);
    // California has 2, Texas has 1, Florida has 0 → Florida
    expect(result).toBe('florida');
  });

  it('rotates to next priority state when top states are equal', () => {
    const existingPosts = [
      'california-seller-disclosure-requirements-2026.md',
      'texas-seller-disclosure-requirements-2026.md',
      'florida-seller-disclosure-requirements-2026.md',
    ];
    const result = pickNextState(existingPosts);
    // All top 3 have 1 post each → pick next in priority: new-york
    expect(result).toBe('new-york');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd /Users/brandonlevine/Desktop/AI-Assistant/britanni-ai-website && npx vitest run scripts/__tests__/topic-selection.test.js`
Expected: FAIL — module not found

- [ ] **Step 3: Write the topic registry with state rotation logic**

```javascript
// scripts/blog-topics.js

export const STATES_BY_PRIORITY = [
  'california', 'texas', 'florida', 'new-york', 'pennsylvania',
  'illinois', 'ohio', 'georgia', 'north-carolina', 'michigan',
  'new-jersey', 'virginia', 'washington', 'arizona', 'tennessee',
  'massachusetts', 'indiana', 'missouri', 'maryland', 'colorado',
  'wisconsin', 'minnesota', 'south-carolina', 'alabama', 'louisiana',
  'kentucky', 'oregon', 'oklahoma', 'connecticut', 'utah',
  'iowa', 'nevada', 'arkansas', 'mississippi', 'kansas',
  'new-mexico', 'nebraska', 'idaho', 'hawaii', 'west-virginia',
  'new-hampshire', 'maine', 'montana', 'rhode-island', 'delaware',
  'south-dakota', 'north-dakota', 'alaska', 'vermont', 'wyoming',
];

export const STATE_DISPLAY_NAMES = Object.fromEntries(
  STATES_BY_PRIORITY.map(s => [s, s.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' ')])
);

export const TYPE1_CATEGORIES = [
  { slug: 'seller-disclosure-requirements', label: 'Seller Disclosure Requirements' },
  { slug: 'buyer-contingency-deadlines', label: 'Buyer Contingency Deadlines' },
  { slug: 'earnest-money-rules', label: 'Earnest Money Rules' },
  { slug: 'building-code-updates', label: 'Building Code Updates' },
  { slug: 'commission-and-licensing-rules', label: 'Commission & Licensing Rules' },
  { slug: 'hoa-condo-requirements', label: 'HOA/Condo Requirements' },
  { slug: 'title-and-closing-procedures', label: 'Title & Closing Procedures' },
  { slug: 'escrow-regulations', label: 'Escrow Regulations' },
  { slug: 'new-real-estate-laws', label: 'New Real Estate Laws' },
  { slug: 'property-condition-disclosures', label: 'Property Condition & Environmental Disclosures' },
];

export const TYPE2_TOPICS = [
  { slug: 'track-multiple-active-deals', title: 'How to Track Multiple Active Deals Without Missing a Deadline' },
  { slug: 'email-sequences-for-new-contracts', title: 'The Exact Email Sequence Top TCs Send for Every New Contract' },
  { slug: 'broker-hire-tc-vs-software', title: 'When Should a Broker Hire a TC vs. Use Software? A Cost Analysis' },
  { slug: 'inspection-scheduling-system', title: 'Inspection Scheduling: The 3-Step System That Eliminates Phone Tag' },
  { slug: 'contract-defects-that-kill-deals', title: '5 Contract Defects That Kill Deals — And How to Catch Them in 60 Seconds' },
  { slug: 'introduce-yourself-as-tc', title: 'How to Introduce Yourself as TC to Lenders, Title, and the Other Agent' },
  { slug: 'deal-rescue-checklist', title: 'Deal Falling Apart? The 48-Hour Rescue Checklist' },
  { slug: 'monthly-compliance-audit', title: 'Monthly Compliance Audit: 12 Items Every Broker Should Check' },
  { slug: 'evaluate-tc-software', title: 'How to Evaluate TC Software: The Broker\'s Decision Framework' },
  { slug: 'training-new-agents-timelines', title: 'Training New Agents on Transaction Timelines: A Broker\'s Playbook' },
  { slug: 'managing-addendum-changes', title: 'How to Handle Mid-Contract Addendums Without Losing Track' },
  { slug: 'lender-communication-cadence', title: 'The Weekly Lender Check-In: What to Ask and When' },
  { slug: 'closing-day-coordination', title: 'Closing Day Coordination: A Step-by-Step Timeline' },
  { slug: 'transaction-handoff-checklist', title: 'Agent-to-TC Handoff: The Checklist That Prevents Dropped Balls' },
  { slug: 'scaling-from-5-to-15-deals', title: 'Scaling from 5 to 15 Active Deals: What Breaks and How to Fix It' },
];

export const TYPE3_TOPICS = [
  { slug: 'nar-settlement-year-one', title: 'NAR Settlement Year One: What Actually Changed for Transaction Teams' },
  { slug: 'rising-inventory-operations', title: 'Rising Inventory Means More Contracts — Is Your Operations Stack Ready?' },
  { slug: 'ai-powered-vs-actually-using-ai', title: 'The Difference Between "AI-Powered" and Actually Using AI in Real Estate' },
  { slug: 'where-deals-break-down', title: 'We Analyzed 10,000 Transactions: Here\'s Where Deals Actually Break Down' },
  { slug: 'will-ai-replace-tcs', title: 'Will AI Replace Transaction Coordinators? (No — Here\'s What Actually Happens)' },
  { slug: 'hidden-cost-agent-turnover', title: 'The Hidden Cost of Agent Turnover: An Operations Perspective' },
  { slug: 'disclosure-laws-tightening', title: 'States Are Tightening Disclosure Laws — Here\'s the Pattern We\'re Seeing' },
  { slug: 'stop-calling-templates-ai', title: 'Stop Calling It "AI" If It\'s Just a Template Library' },
  { slug: 'compliance-risk-multi-state-teams', title: 'Multi-State Brokerages: The Compliance Gaps Nobody Talks About' },
  { slug: 'real-cost-of-missed-deadlines', title: 'The Real Cost of a Missed Deadline: Lawsuits, Lost Deals, and Reputation' },
  { slug: 'tc-industry-consolidation', title: 'The TC Industry Is Consolidating — What That Means for Agents' },
  { slug: 'why-agents-hate-paperwork', title: 'Why Agents Hate Paperwork (And Why That\'s a Business Problem, Not a Character Flaw)' },
  { slug: 'future-of-real-estate-closings', title: 'The Future of Real Estate Closings: Faster, Digital, and Agent-Optional?' },
  { slug: 'broker-liability-agent-mistakes', title: 'Broker Liability for Agent Compliance Mistakes: What the Courts Say' },
  { slug: 'remote-closings-state-by-state', title: 'Remote Closings in 2026: Which States Allow Them and What\'s Required' },
];

export const AUTHORS = ['Brandon Levine', 'Jack Brighenti', 'Brittany Brighenti'];

export function pickNextState(existingFilenames) {
  const stateCounts = Object.fromEntries(STATES_BY_PRIORITY.map(s => [s, 0]));

  for (const filename of existingFilenames) {
    for (const state of STATES_BY_PRIORITY) {
      if (filename.startsWith(state + '-')) {
        stateCounts[state]++;
        break;
      }
    }
  }

  let minCount = Infinity;
  let picked = STATES_BY_PRIORITY[0];
  for (const state of STATES_BY_PRIORITY) {
    if (stateCounts[state] < minCount) {
      minCount = stateCounts[state];
      picked = state;
      break;
    }
  }

  return picked;
}

export function pickNextType1Category(state, existingFilenames) {
  for (const category of TYPE1_CATEGORIES) {
    const expectedSlug = `${state}-${category.slug}`;
    const alreadyExists = existingFilenames.some(f => f.includes(expectedSlug));
    if (!alreadyExists) {
      return category;
    }
  }
  // All categories covered for this state — pick the oldest (first) for a refresh
  return TYPE1_CATEGORIES[0];
}

export function pickNextType2Topic(existingFilenames) {
  for (const topic of TYPE2_TOPICS) {
    const alreadyExists = existingFilenames.some(f => f.includes(topic.slug));
    if (!alreadyExists) {
      return topic;
    }
  }
  return TYPE2_TOPICS[0];
}

export function pickNextType3Topic(existingFilenames) {
  for (const topic of TYPE3_TOPICS) {
    const alreadyExists = existingFilenames.some(f => f.includes(topic.slug));
    if (!alreadyExists) {
      return topic;
    }
  }
  return TYPE3_TOPICS[0];
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd /Users/brandonlevine/Desktop/AI-Assistant/britanni-ai-website && npx vitest run scripts/__tests__/topic-selection.test.js`
Expected: PASS (3 tests)

- [ ] **Step 5: Add tests for Type 2 and Type 3 topic selection**

```javascript
// Append to scripts/__tests__/topic-selection.test.js
import { pickNextType1Category, pickNextType2Topic, pickNextType3Topic } from '../blog-topics.js';

describe('pickNextType1Category', () => {
  it('picks the first unused category for a state', () => {
    const existing = ['california-seller-disclosure-requirements-2026.md'];
    const result = pickNextType1Category('california', existing);
    expect(result.slug).toBe('buyer-contingency-deadlines');
  });

  it('picks first category when no posts exist for that state', () => {
    const result = pickNextType1Category('texas', []);
    expect(result.slug).toBe('seller-disclosure-requirements');
  });
});

describe('pickNextType2Topic', () => {
  it('picks the first unused topic', () => {
    const existing = ['track-multiple-active-deals.md'];
    const result = pickNextType2Topic(existing);
    expect(result.slug).toBe('email-sequences-for-new-contracts');
  });
});

describe('pickNextType3Topic', () => {
  it('picks the first unused topic', () => {
    const existing = ['nar-settlement-year-one.md'];
    const result = pickNextType3Topic(existing);
    expect(result.slug).toBe('rising-inventory-operations');
  });
});
```

- [ ] **Step 6: Run all tests to verify they pass**

Run: `cd /Users/brandonlevine/Desktop/AI-Assistant/britanni-ai-website && npx vitest run scripts/__tests__/topic-selection.test.js`
Expected: PASS (6 tests)

- [ ] **Step 7: Commit**

```bash
git add scripts/blog-topics.js scripts/__tests__/topic-selection.test.js
git commit -m "feat: add blog topic registry with smart rotation logic"
```

---

### Task 2: Prompt Templates

**Files:**
- Create: `scripts/blog-prompts.js`

- [ ] **Step 1: Write the prompt templates module**

```javascript
// scripts/blog-prompts.js

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
```

- [ ] **Step 2: Commit**

```bash
git add scripts/blog-prompts.js
git commit -m "feat: add Claude API prompt templates for 3 blog post types"
```

---

### Task 3: Main Generation Script

**Files:**
- Create: `scripts/generate-blogs.js`

- [ ] **Step 1: Write the generation script**

```javascript
// scripts/generate-blogs.js
import Anthropic from '@anthropic-ai/sdk';
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
  const client = new Anthropic();
  const response = await client.messages.create({
    model: 'claude-sonnet-4-6-20250514',
    max_tokens: 4096,
    messages: [{ role: 'user', content: prompt }],
  });
  return response.content[0].text;
}

function extractFrontmatterField(markdown, field) {
  const match = markdown.match(new RegExp(`^${field}:\\s*"?(.+?)"?$`, 'm'));
  return match ? match[1] : null;
}

function filenameFromMarkdown(markdown, fallbackSlug) {
  const title = extractFrontmatterField(markdown, 'title');
  if (title) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .slice(0, 80) + '.md';
  }
  return `${fallbackSlug}.md`;
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
    // Strip any markdown code fences the model might wrap around the output
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
```

- [ ] **Step 2: Install the Anthropic SDK as a dev dependency**

Run: `cd /Users/brandonlevine/Desktop/AI-Assistant/britanni-ai-website && npm install --save-dev @anthropic-ai/sdk vitest`

- [ ] **Step 3: Add a script entry to package.json**

Add to the `"scripts"` section of `package.json`:
```json
"generate-blogs": "node scripts/generate-blogs.js"
```

- [ ] **Step 4: Commit**

```bash
git add scripts/generate-blogs.js package.json package-lock.json
git commit -m "feat: add main blog generation script with Claude API integration"
```

---

### Task 4: GitHub Actions Workflow

**Files:**
- Create: `.github/workflows/daily-blogs.yml`

- [ ] **Step 1: Create the workflow file**

```yaml
# .github/workflows/daily-blogs.yml
name: Daily Blog Generation

on:
  schedule:
    # 6:00 AM ET (10:00 UTC during EDT, 11:00 UTC during EST)
    - cron: '0 10 * * *'
  workflow_dispatch: # Allow manual trigger

permissions:
  contents: write
  pull-requests: write

jobs:
  generate-blogs:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Generate blog posts
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: npm run generate-blogs

      - name: Create branch and PR
        env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: |
          DATE=$(date +%Y-%m-%d)
          BRANCH="blog/daily-posts-${DATE}"

          git config user.name "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"

          git checkout -b "${BRANCH}"
          git add src/content/blog/
          
          # Check if there are changes to commit
          if git diff --cached --quiet; then
            echo "No new blog posts generated. Exiting."
            exit 0
          fi

          git commit -m "content: add daily blog posts for ${DATE}"
          git push origin "${BRANCH}"

          gh pr create \
            --title "Blog posts for ${DATE}" \
            --body "$(cat <<EOF
          ## Daily Blog Posts

          Auto-generated blog posts for review:

          $(git diff --name-only HEAD~1 | grep "src/content/blog/" | sed 's/src\/content\/blog\//- /')

          ### Review checklist
          - [ ] Fact-check state-specific legal claims and statute references
          - [ ] Verify tone is appropriate (not too salesy, not too generic)
          - [ ] Check that CTAs are natural and relevant
          - [ ] Confirm no duplicate content with existing posts

          ---
          *Generated by the Daily Blog Action using Claude API*
          EOF
          )" \
            --base main \
            --head "${BRANCH}"
```

- [ ] **Step 2: Commit**

```bash
mkdir -p .github/workflows
git add .github/workflows/daily-blogs.yml
git commit -m "feat: add daily blog generation GitHub Actions workflow"
```

---

### Task 5: Add ANTHROPIC_API_KEY Secret and Test

**Files:**
- No new files — configuration step

- [ ] **Step 1: Document the required secret setup**

The workflow requires one repository secret:
- `ANTHROPIC_API_KEY` — your Anthropic API key for Claude API access

Set it via: GitHub repo → Settings → Secrets and variables → Actions → New repository secret

Name: `ANTHROPIC_API_KEY`
Value: your Anthropic API key (starts with `sk-ant-`)

- [ ] **Step 2: Test locally before pushing**

Run the generation script locally to verify it works:

```bash
cd /Users/brandonlevine/Desktop/AI-Assistant/britanni-ai-website
export ANTHROPIC_API_KEY="your-key-here"
npm run generate-blogs
```

Expected: 3 new `.md` files appear in `src/content/blog/`

- [ ] **Step 3: Verify the generated posts render correctly**

```bash
cd /Users/brandonlevine/Desktop/AI-Assistant/britanni-ai-website
npm run dev
```

Open `http://localhost:4321/blog` and verify the new posts appear and render correctly.

- [ ] **Step 4: Trigger the workflow manually to test end-to-end**

After pushing all changes to GitHub:

```bash
gh workflow run daily-blogs.yml
```

Verify: a new PR appears on the repo with 3 blog post files.

- [ ] **Step 5: Commit any final adjustments**

```bash
git add -A
git commit -m "chore: finalize daily blog generation setup"
```

---

### Task 6: Add Legal Disclaimer Component

**Files:**
- Create: `src/components/blog/Disclaimer.astro`
- Modify: `src/layouts/BlogLayout.astro`

- [ ] **Step 1: Create the disclaimer component**

```astro
---
// src/components/blog/Disclaimer.astro
---
<aside class="mt-12 p-4 border border-slate-200 rounded-lg bg-slate-50 text-sm text-slate-500">
  <p>
    This article is for informational purposes only and does not constitute legal advice.
    Real estate regulations change frequently — verify current requirements with your state's
    real estate commission or a licensed attorney.
  </p>
</aside>
```

- [ ] **Step 2: Add disclaimer to BlogLayout for posts with compliance-related tags**

Modify `src/layouts/BlogLayout.astro` to accept a `tags` prop and conditionally render the disclaimer:

Update the Props interface:
```typescript
interface Props {
  title: string;
  description: string;
  publishDate: string;
  author: string;
  readTime: string;
  tags?: string[];
  canonical?: string;
  ogImage?: string;
  jsonLd?: object | object[];
}
```

Update the destructuring:
```typescript
const { title, description, publishDate, author, readTime, tags = [], ...rest } = Astro.props;
```

Add the import at the top:
```typescript
import Disclaimer from '../components/blog/Disclaimer.astro';
```

Add after the `<slot />` closing div, inside the article:
```astro
{tags.some(t => ['compliance', 'seller-disclosure', 'buyer-contingencies', 'earnest-money', 'building-codes', 'hoa-condo', 'title-closing', 'escrow-regulations', 'property-condition'].includes(t)) && (
  <Disclaimer />
)}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/blog/Disclaimer.astro src/layouts/BlogLayout.astro
git commit -m "feat: add legal disclaimer for compliance-related blog posts"
```

---

## Post-Implementation Notes

### Expanding the topic lists

When the initial topic lists in `blog-topics.js` are exhausted (after ~15 days for Type 2, ~15 days for Type 3), add new topics to the arrays. Type 1 topics scale to 500+ posts (50 states x 10 categories) before needing expansion.

### Monitoring costs

Each daily run makes 3 Claude API calls at ~2K output tokens each. Estimated daily cost: ~$0.15-0.30/day depending on the model used. Monthly: ~$5-9.

### Future enhancements (not in this plan)

- State hub pages (`/blog/states/[state].astro`)
- Tag index pages (`/blog/tag/[tag].astro`)
- Blog pagination (needed at ~50 posts)
- Related posts component
- RSS feed generation

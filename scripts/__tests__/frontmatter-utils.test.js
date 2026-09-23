import { describe, it, expect } from 'vitest';
import yaml from 'js-yaml';
import {
  validateFrontmatter,
  repairFrontmatter,
  extractFrontmatterBlock,
  stripImageFieldsFromFrontmatter,
  cleanMarkdown,
} from '../frontmatter-utils.js';

const wrap = fm => `---\n${fm}\n---\n\nBody text.`;

describe('repairFrontmatter', () => {
  it('fixes unescaped quotes in top-level values', () => {
    const content = wrap('title: "Stop Calling It "AI" If It Is Not"\ntags: ["a"]');
    expect(validateFrontmatter(content)).toBe(false);
    const repaired = repairFrontmatter(content);
    expect(validateFrontmatter(repaired)).toBe(true);
    expect(yaml.load(extractFrontmatterBlock(repaired)).title).toBe('Stop Calling It "AI" If It Is Not');
  });

  it('fixes unescaped quotes in nested faq list items (the real-world failure)', () => {
    const content = wrap(
      [
        'title: "Safe Title"',
        'faq:',
        '  - q: "What does "as-is" mean in a contract?"',
        '    a: "It means the seller makes no repairs — "as-is" is binding."',
        '  - q: "Another question?"',
        '    a: "A clean answer."',
      ].join('\n')
    );
    expect(validateFrontmatter(content)).toBe(false);
    const repaired = repairFrontmatter(content);
    expect(validateFrontmatter(repaired)).toBe(true);
    const parsed = yaml.load(extractFrontmatterBlock(repaired));
    expect(parsed.faq[0].q).toBe('What does "as-is" mean in a contract?');
    expect(parsed.faq[1].a).toBe('A clean answer.');
  });

  it('fixes unquoted values containing a colon', () => {
    const content = wrap('title: Earnest Money: What Agents Get Wrong\nauthor: "Jane"');
    expect(validateFrontmatter(content)).toBe(false);
    const repaired = repairFrontmatter(content);
    expect(validateFrontmatter(repaired)).toBe(true);
    expect(yaml.load(extractFrontmatterBlock(repaired)).title).toBe('Earnest Money: What Agents Get Wrong');
  });

  it('leaves already-valid frontmatter unchanged', () => {
    const fm = 'title: "Clean \\"escaped\\" title"\ntags: ["a", "b"]\nfaq:\n  - q: "Q?"\n    a: "A."';
    const content = wrap(fm);
    expect(validateFrontmatter(content)).toBe(true);
    expect(repairFrontmatter(content)).toBe(content);
  });
});

describe('cleanMarkdown', () => {
  it('recovers valid frontmatter preceded by blank lines (2026-09-23 CI failure)', () => {
    const raw = '\n\n---\ntitle: "Valid Title"\nreadTime: "CALCULATE_AFTER"\ntags: ["a"]\n---\n\n' + 'Body word '.repeat(300);
    const cleaned = cleanMarkdown(raw);
    expect(cleaned).not.toBeNull();
    expect(cleaned.startsWith('---\n')).toBe(true);
    expect(validateFrontmatter(cleaned)).toBe(true);
    expect(cleaned).toContain('readTime: "3 min read"');
  });

  it('strips a code fence around the whole document', () => {
    const raw = '```markdown\n---\ntitle: "T"\nreadTime: "CALCULATE_AFTER"\n---\n\nBody.\n```';
    const cleaned = cleanMarkdown(raw);
    expect(cleaned).not.toBeNull();
    expect(cleaned.startsWith('---\n')).toBe(true);
    expect(cleaned).not.toContain('```');
  });

  it('returns null for unrecoverable frontmatter', () => {
    const raw = 'no frontmatter here at all, just prose.';
    expect(cleanMarkdown(raw)).toBeNull();
  });

  it('repairs bad quoting after normalizing leading whitespace', () => {
    const raw = '\n---\ntitle: "A "quoted" mess"\nreadTime: "CALCULATE_AFTER"\n---\n\nBody.';
    const cleaned = cleanMarkdown(raw);
    expect(cleaned).not.toBeNull();
    expect(yaml.load(extractFrontmatterBlock(cleaned)).title).toBe('A "quoted" mess');
  });
});

describe('stripImageFieldsFromFrontmatter', () => {
  it('removes image and imageAlt from frontmatter only', () => {
    const content = `---\ntitle: "T"\nimage: "/images/blog/x.webp"\nimageAlt: "alt"\ntags: ["a"]\n---\n\nimage: "/keep/in/body.webp"\n`;
    const stripped = stripImageFieldsFromFrontmatter(content);
    expect(extractFrontmatterBlock(stripped)).not.toContain('image:');
    expect(stripped).toContain('image: "/keep/in/body.webp"');
    expect(validateFrontmatter(stripped)).toBe(true);
  });
});

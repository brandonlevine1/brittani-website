import yaml from 'js-yaml';

export function extractFrontmatterBlock(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  return match ? match[1] : null;
}

export function calculateReadTime(markdown) {
  const body = markdown.replace(/^---[\s\S]*?---/, '').trim();
  const wordCount = body.split(/\s+/).length;
  return `${Math.ceil(wordCount / 238)} min read`;
}

// Normalizes raw model output into a publishable markdown file.
// Returns null if the frontmatter is unrecoverable.
export function cleanMarkdown(content) {
  // Claude sometimes emits leading blank lines or a code fence before the
  // frontmatter. Frontmatter must start at byte 0 for Astro (and for every
  // regex below), so strip all of that first.
  let cleaned = content
    .replace(/^\s*```(?:markdown|md)?\n/, '')
    .replace(/\n```\s*$/, '')
    .replace(/^\s+/, '');

  const readTime = calculateReadTime(cleaned);
  cleaned = cleaned.replace('readTime: "CALCULATE_AFTER"', `readTime: "${readTime}"`);

  if (!validateFrontmatter(cleaned)) {
    console.warn('[Frontmatter] Invalid YAML detected, attempting repair...');
    cleaned = repairFrontmatter(cleaned);
    if (!validateFrontmatter(cleaned)) {
      const fm = extractFrontmatterBlock(cleaned);
      console.warn(`[Frontmatter] Repair failed. Frontmatter was:\n${(fm || cleaned).slice(0, 1500)}`);
      return null;
    }
    console.warn('[Frontmatter] Repair succeeded.');
  }

  return cleaned;
}

export function validateFrontmatter(content) {
  const fm = extractFrontmatterBlock(content);
  if (fm === null) return false;
  try {
    yaml.load(fm);
    return true;
  } catch {
    return false;
  }
}

// Repairs the two failure modes Claude actually produces:
//   1. Unescaped double quotes inside a double-quoted value —
//      including nested/indented lines like the faq `- q:` / `a:` items
//      (the old repair only handled top-level keys, which is why most
//      posts started failing once faq quotes went bad).
//   2. Unquoted scalar values containing ": " (yaml treats as nested map).
export function repairFrontmatter(content) {
  return content.replace(/^---\n([\s\S]*?)\n---/, (full, fm) => {
    const fixed = fm
      .split('\n')
      .map(line => {
        // Case 1: key: "value with "bad" quotes"  (any indentation, list items too)
        const quoted = line.match(/^(\s*(?:- )?[\w-]+: ")(.*)("\s*)$/);
        if (quoted) {
          const inner = quoted[2]
            .replace(/\\"/g, '\u0000') // protect already-escaped quotes
            .replace(/"/g, '\\"')
            .replace(/\u0000/g, '\\"');
          return `${quoted[1]}${inner}${quoted[3]}`;
        }
        // Case 2: key: unquoted value containing a colon
        const unquoted = line.match(/^(\s*(?:- )?[\w-]+): (?!["'[|>-])(.*: .*)$/);
        if (unquoted) {
          const escaped = unquoted[2].replace(/"/g, '\\"');
          return `${unquoted[1]}: "${escaped}"`;
        }
        return line;
      })
      .join('\n');
    return `---\n${fixed}\n---`;
  });
}

export function extractImagePrompt(content) {
  const fm = extractFrontmatterBlock(content);
  if (fm === null) return null;
  try {
    const parsed = yaml.load(fm);
    return parsed.imagePrompt || null;
  } catch {
    return null;
  }
}

export function stripImagePromptFromFrontmatter(content) {
  return content.replace(/^(---\n[\s\S]*?)imagePrompt:.*\n([\s\S]*?---)/, '$1$2');
}

// If image generation failed, the frontmatter must not reference a webp that
// was never written — otherwise the site renders broken <img> and og:image tags.
export function stripImageFieldsFromFrontmatter(content) {
  return content.replace(/^---\n([\s\S]*?)\n---/, (full, fm) => {
    const cleaned = fm
      .split('\n')
      .filter(line => !/^(image|imageAlt):/.test(line))
      .join('\n');
    return `---\n${cleaned}\n---`;
  });
}

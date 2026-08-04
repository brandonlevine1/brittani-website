import { readdir, readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import yaml from 'js-yaml';
import { generateImage } from './blog-images.js';

const BLOG_DIR = join(process.cwd(), 'src/content/blog');
const PUBLIC_DIR = join(process.cwd(), 'public');

// Safety valve so a single run can't burn through the whole image budget.
const LIMIT = parseInt(process.env.BACKFILL_LIMIT || '60', 10);
const DELAY_MS = parseInt(process.env.BACKFILL_DELAY_MS || '2000', 10);

const sleep = ms => new Promise(r => setTimeout(r, ms));

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;
  try {
    return yaml.load(match[1]);
  } catch {
    return null;
  }
}

function insertImageFields(content, slug, alt) {
  // Place image fields right after readTime (falls back to after title).
  const escapedAlt = alt.replace(/"/g, '\\"');
  const lines = `image: "/images/blog/${slug}.webp"\nimageAlt: "${escapedAlt}"`;
  if (/^readTime:.*$/m.test(content)) {
    return content.replace(/^(readTime:.*)$/m, `$1\n${lines}`);
  }
  return content.replace(/^(title:.*)$/m, `$1\n${lines}`);
}

async function fileExists(path) {
  try {
    await readFile(path);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  const files = (await readdir(BLOG_DIR)).filter(f => f.endsWith('.md'));
  console.log(`Scanning ${files.length} posts for missing images (limit ${LIMIT} generations)...`);

  let generated = 0;
  let failed = 0;

  for (const file of files) {
    if (generated >= LIMIT) {
      console.log(`Reached limit of ${LIMIT} generations; run again to continue.`);
      break;
    }

    const slug = file.replace(/\.md$/, '');
    const filepath = join(BLOG_DIR, file);
    const content = await readFile(filepath, 'utf-8');
    const fm = parseFrontmatter(content);
    if (!fm) {
      console.warn(`[Skip] ${slug}: unparseable frontmatter`);
      continue;
    }

    const hasImageRef = typeof fm.image === 'string' && fm.image.length > 0;
    if (hasImageRef && (await fileExists(join(PUBLIC_DIR, fm.image)))) {
      continue; // image already on disk
    }

    const prompt = fm.imageAlt || fm.title;
    try {
      await generateImage(slug, null, null, prompt);
      generated++;
      if (!hasImageRef) {
        const alt = fm.imageAlt || fm.title;
        await writeFile(filepath, insertImageFields(content, slug, alt), 'utf-8');
        console.log(`[Frontmatter] Added image fields: ${slug}`);
      }
    } catch (err) {
      failed++;
      console.warn(`[Image] Backfill failed for ${slug}: ${err.message}`);
      // Credit/quota errors will fail for every post — stop early instead of hammering the API.
      if (/RESOURCE_EXHAUSTED|429/.test(err.message) || failed >= 5) {
        console.error('Aborting backfill: image API appears unavailable (check Gemini billing/credits).');
        break;
      }
    }
    await sleep(DELAY_MS);
  }

  console.log(`\nBackfill complete. ${generated} images generated, ${failed} failures.`);
  if (generated === 0 && failed > 0) process.exit(1);
}

main().catch(err => {
  console.error('Backfill failed:', err);
  process.exit(1);
});

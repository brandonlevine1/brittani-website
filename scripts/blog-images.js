import { GoogleGenAI } from '@google/genai';
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

  return `Generate a photograph: ${STYLE_PREFIX}, ${subject}. ${NEGATIVE_SUFFIX}`;
}

export async function generateImage(slug, type, state) {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const prompt = buildImagePrompt(type, state, slug);

  console.log(`[Image] Generating: ${slug}`);

  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash-exp',
    contents: prompt,
    config: {
      responseModalities: ['image', 'text'],
    },
  });

  const imagePart = response.candidates[0].content.parts.find(p => p.inlineData);
  if (!imagePart) {
    throw new Error('No image returned from Gemini');
  }

  const imageData = Buffer.from(imagePart.inlineData.data, 'base64');

  await mkdir(IMAGE_DIR, { recursive: true });

  const webpBuffer = await sharp(imageData).webp({ quality: 85 }).toBuffer();
  const filepath = join(IMAGE_DIR, `${slug}.webp`);
  await writeFile(filepath, webpBuffer);

  console.log(`[Image] Saved: ${filepath}`);
  return `/images/blog/${slug}.webp`;
}

import { GoogleGenAI } from '@google/genai';
import sharp from 'sharp';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

const IMAGE_DIR = join(process.cwd(), 'public/images/blog');

const STYLE_PREFIX = 'Editorial real estate photography, natural warm lighting, shot on Canon EOS R5 with 35mm f/1.8 lens, shallow depth of field, muted earth tones with subtle blue accent, clean composition, architectural digest style, no text overlay, no people facing camera';

const NEGATIVE_SUFFIX = 'Do not include: cartoon, illustration, 3d render, AI art, stock photo poses, text, watermark, logo, neon, gradient, oversaturated, HDR, fisheye, people smiling at camera';

export async function generateImage(slug, type, state, customPrompt) {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  let subject;
  if (customPrompt) {
    subject = customPrompt;
  } else {
    subject = 'Modern real estate office with natural light and clean architectural lines';
  }

  const prompt = `${STYLE_PREFIX}, ${subject}. ${NEGATIVE_SUFFIX}`;

  console.log(`[Image] Generating: ${slug}`);

  const response = await ai.models.generateImages({
    model: 'imagen-4.0-generate-001',
    prompt,
    config: {
      numberOfImages: 1,
      aspectRatio: '16:9',
    },
  });

  const imageData = Buffer.from(response.generatedImages[0].image.imageBytes, 'base64');

  await mkdir(IMAGE_DIR, { recursive: true });

  const webpBuffer = await sharp(imageData).webp({ quality: 85 }).toBuffer();
  const filepath = join(IMAGE_DIR, `${slug}.webp`);
  await writeFile(filepath, webpBuffer);

  console.log(`[Image] Saved: ${filepath}`);
  return `/images/blog/${slug}.webp`;
}

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

  // imagen-4.0-generate-001 was shut down by Google on 2026-08-17.
  // Its replacement (gemini-3.1-flash-image) uses generateContent and
  // returns the image as an inlineData part instead of generatedImages.
  const response = await ai.models.generateContent({
    model: 'gemini-3.1-flash-image',
    contents: prompt,
    config: {
      responseModalities: ['IMAGE'],
      imageConfig: {
        aspectRatio: '16:9',
      },
    },
  });

  const parts = response.candidates?.[0]?.content?.parts || [];
  const imagePart = parts.find(p => p.inlineData?.data);
  if (!imagePart) {
    throw new Error(`No image returned for ${slug} (response had ${parts.length} parts)`);
  }
  const imageData = Buffer.from(imagePart.inlineData.data, 'base64');

  await mkdir(IMAGE_DIR, { recursive: true });

  const webpBuffer = await sharp(imageData).webp({ quality: 85 }).toBuffer();
  const filepath = join(IMAGE_DIR, `${slug}.webp`);
  await writeFile(filepath, webpBuffer);

  console.log(`[Image] Saved: ${filepath}`);
  return `/images/blog/${slug}.webp`;
}

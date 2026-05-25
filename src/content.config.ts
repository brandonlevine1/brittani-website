import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.string(),
    modifiedDate: z.string().optional(),
    author: z.string(),
    authorBio: z.string().optional(),
    readTime: z.string(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    tags: z.array(z.string()).optional(),
    keywords: z.array(z.string()).optional(),
    type: z.enum(['regulatory', 'operational', 'opinion']).optional(),
  }),
});

export const collections = { blog };

import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const writing = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().default(false),
    placeholder: z.boolean().default(true),
    pillar: z.enum([
      'enterprise-cursor-ai-rollout',
      'ax-as-product',
      'quality-bars',
      'paved-roads-codegen-load',
      'measuring-ai-productivity',
    ]),
    tags: z.array(z.string()).default([]),
  }),
});

const talks = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/talks' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().default(false),
    placeholder: z.boolean().default(true),
    venue: z.string().optional(),
    externalUrl: z.url().optional(),
  }),
});

const archive = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/archive' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    kind: z.enum(['project', 'talk']),
    venue: z.string().optional(),
    externalUrl: z.url().optional(),
  }),
});

export const collections = { writing, talks, archive };

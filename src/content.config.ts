import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const pieces = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/pieces' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    kind: z.enum(['writing', 'talk']),
    draft: z.boolean().default(false),
    placeholder: z.boolean().default(false),
    venue: z.string().optional(),
    externalUrl: z.url().optional(),
    proofTheme: z
      .enum(['agent-experience', 'cursor-enterprise', 'syntax-fm', 'other'])
      .optional(),
    pillar: z
      .enum([
        'enterprise-ai-coding-rollout',
        'agent-experience-as-product',
        'quality-bars-agent-era',
        'platform-dx-ai-doesnt-break',
        'measuring-ai-developer-productivity',
      ])
      .optional(),
    tags: z.array(z.string()).default([]),
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

export const collections = { pieces, archive };

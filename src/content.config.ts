import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Status alur editorial: draft (tidak pernah terbit) → review (hanya staging) → published.
const status = z.enum(['draft', 'review', 'published']);
const date = z.coerce.date();

const editorial = {
  title: z.string().min(10),
  description: z.string().min(140).max(160),
  status,
  author: z.string(),
  reviewer: z.string(),
  publishedAt: date,
  reviewedAt: date,
  heroImage: z.string().optional(),
  heroAlt: z.string().min(1),
  imageCredit: z.string().min(1),
};

const journal = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/journal' }),
  schema: z
    .object({
      ...editorial,
      stage: z.enum(['1', '2', '3', '4', '5', '6', 'news']),
      category: z.enum(['edukasi', 'news', 'checklist']),
      tags: z.array(z.string()).min(1),
      readingMinutes: z.number().int().positive(),
    })
    .refine((d) => d.status !== 'published' || !d.reviewer.includes('[VERIFIKASI'), {
      message: 'Artikel published wajib punya reviewer tim Nora yang tercatat.',
    }),
});

const venue = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/venue' }),
  schema: z.object({
    ...editorial,
    disclosure: z.enum(['editorial', 'collaboration']),
    city: z.string(),
    style: z.string(),
    capacity: z.string(),
    priceRange: z.string(),
    priceCheckedAt: z.string(),
    permissionRef: z.string().min(1),
  }),
});

const photography = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/photography' }),
  schema: z.object({
    ...editorial,
    disclosure: z.enum(['editorial', 'collaboration']),
    city: z.string(),
    style: z.enum(['candid', 'editorial', 'dokumenter', 'tradisional']),
    permissionRef: z.string().min(1),
  }),
});

const palette = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/palette' }),
  schema: z.object({
    ...editorial,
    mood: z.string(),
    // Swatch adalah konten editorial, bukan token UI.
    swatches: z
      .array(
        z.object({
          name: z.string(),
          hex: z.string().regex(/^#[0-9a-fA-F]{6}$/),
          role: z.enum(['utama', 'pendamping', 'aksen', 'netral', 'metalik']),
        }),
      )
      .length(5),
  }),
});

const concept = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/concept' }),
  schema: z.object({
    ...editorial,
    summary: z.string(),
    sources: z.array(z.url()).default([]),
  }),
});

export const collections = { journal, venue, photography, palette, concept };

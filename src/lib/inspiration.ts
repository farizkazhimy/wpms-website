import type { CollectionEntry } from 'astro:content';
import { dict } from '~/i18n';

// Segmen URL (Bahasa Indonesia) → koleksi konten.
export const categories = [
  { slug: 'venue', collection: 'venue', label: dict.inspiration.categories.venue },
  { slug: 'palette', collection: 'palette', label: dict.inspiration.categories.palette },
  { slug: 'fotografi', collection: 'photography', label: dict.inspiration.categories.photography },
  { slug: 'konsep', collection: 'concept', label: dict.inspiration.categories.concept },
] as const;

export type CategorySlug = (typeof categories)[number]['slug'];
export type InspirationEntry =
  | CollectionEntry<'venue'>
  | CollectionEntry<'palette'>
  | CollectionEntry<'photography'>
  | CollectionEntry<'concept'>;

export const profileHref = (category: CategorySlug, id: string) => `/inspirasi/${category}/${id}/`;
export const categoryHref = (category: CategorySlug) => `/inspirasi/${category}/`;

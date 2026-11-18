import { getCollection, type CollectionKey } from 'astro:content';

/** Konten draft tidak pernah tampil. Konten review hanya tampil di dev atau staging (PUBLIC_SHOW_REVIEW=true). */
export const showReview = import.meta.env.DEV || import.meta.env.PUBLIC_SHOW_REVIEW === 'true';

export function isVisible(status: 'draft' | 'review' | 'published'): boolean {
  if (status === 'published') return true;
  return status === 'review' && showReview;
}

export async function getVisible<C extends CollectionKey>(collection: C) {
  const entries = await getCollection(collection, ({ data }) =>
    isVisible((data as { status: 'draft' | 'review' | 'published' }).status),
  );
  return entries.sort(
    (a, b) =>
      (b.data as { publishedAt: Date }).publishedAt.getTime() -
      (a.data as { publishedAt: Date }).publishedAt.getTime(),
  );
}

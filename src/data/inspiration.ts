// Kategori Inspirasi di Home. Swatch palette adalah konten editorial, bukan token UI.
export type InspirationCategory = {
  key: 'venue' | 'palette' | 'photography' | 'concept';
  href: string;
  swatches?: string[];
};

export const inspirationCategories: InspirationCategory[] = [
  { key: 'venue', href: '/inspirasi/venue/' },
  {
    key: 'palette',
    href: '/inspirasi/palette/',
    swatches: ['#D9A5A0', '#E9C9C1', '#F4E7DA', '#C9A65A', '#7C5A55'],
  },
  { key: 'photography', href: '/inspirasi/fotografi/' },
  { key: 'concept', href: '/inspirasi/konsep/' },
];

// Identitas situs. Nama produk, tagline, kontak, dan sosmed tidak boleh di-hardcode di komponen.
export const site = {
  productName: 'WePromys',
  productFullName: 'WePromys (Wedding Project Management System)',
  descriptor: 'Wedding Project Management System',
  tagline: 'every promise, delivered',
  owner: 'Nora Wedding Organizer',
  // URL login aplikasi. Kosong = tombol Masuk disembunyikan sampai aplikasi live (tracker no. 6).
  appLoginUrl: '',
  routes: {
    home: '/',
    product: '/produk',
    forWo: '/untuk-wo',
    journal: '/journal',
    inspiration: '/inspirasi',
    about: '/tentang',
    demo: '/demo',
    pilot: '/demo?jalur=pilot',
    privacy: '/kebijakan-privasi',
    terms: '/syarat-penggunaan',
    editorial: '/kebijakan-editorial',
  },
  // Handle sosmed menunggu OD-030; tautan kosong tidak ditampilkan sebagai link aktif.
  social: [
    { name: 'Instagram', url: '' },
    { name: 'LinkedIn', url: '' },
    { name: 'TikTok', url: '' },
    { name: 'Threads', url: '' },
  ],
  copyrightYear: 2026,
} as const;

export type Site = typeof site;

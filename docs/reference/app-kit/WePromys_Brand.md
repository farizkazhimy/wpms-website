# Brand WePromys — aturan pakai untuk developer

Sumber: PRD v0.4.7 Section 2.6 (RL-077) dan WPMS Design System `brand.md`. Brand Guideline lengkap (WPMS-BG-v0.1): https://claude.ai/artifact/F9mEsgWWGQhsDy4nz9Z35s

## Nama

- Tulis **WePromys** (W dan P kapital). Hindari Wepromys, WEPROMYS, We Promys.
- Sebutan pertama: "WePromys (Wedding Project Management System)".
- **WPMS** hanya kode internal (ID dokumen, repo, Design System).
- Descriptor: "WEDDING PROJECT MANAGEMENT SYSTEM". Tagline: "every promise, delivered". Keduanya tidak tampil bersamaan.

## Logo

- `wepromys-logo.svg` / `.png` di folder ini adalah wordmark resmi (latar terang). Variasi lain (reverse, descriptor, tagline, small, mono, simbol, app icon) ada di grup aset **Logos** pada WPMS Design System.
- Wordmark: "We" Outfit Light `#B8924A`, "Promys" Outfit Bold `#8A1F7C`, huruf "o" = cincin dengan berlian champagne `#C9A65A`.
- Selalu pakai file vektor. Jangan mengetik ulang wordmark dengan font, mengubah warna, memisahkan berlian, atau menarik/memutar logo.
- Clear space minimal setinggi huruf kecil. Ukuran minimum wordmark 96px (layar); di bawah tinggi 20px pakai varian small.

## Penempatan

| Tempat | Aset |
| --- | --- |
| Sidebar aplikasi | Logo tenant (kiri atas) + logo WePromys di app shell |
| Halaman login | Lockup descriptor |
| Favicon / ikon PWA | App icon |
| Client Portal & dokumen generate | Logo tenant; WePromys hanya "Powered by WePromys" di footer |
| Email platform | Logo WePromys, lebar 140px |

## White-label

Nama produk, logo, nama perusahaan, dan teks hukum dikelola sebagai **konfigurasi** (platform/tenant), tidak di-hardcode di kode.

## Catatan terbuka

- OD-030: pengecekan merek DJKI, domain, dan akun media sosial belum dilakukan.
- BG-01: kontras "We" `#B8924A` 2,9:1 di latar putih perlu review desainer.

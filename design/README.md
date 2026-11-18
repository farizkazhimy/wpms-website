# WPMS Design System v0.2 — penerapan di website

Sumber: artifact "WPMS Design System" (v0.2, 14 Nov 2026; revisi font display 18 Nov 2026). `tokens.json` di folder ini adalah salinan
apa adanya; jangan diedit manual. Bila Design System berubah, salin ulang lalu jalankan `scripts/build-tokens.mjs`.

Website adalah konteks marketing, jadi intensitas brand lebih tinggi daripada aplikasi internal,
tetapi tidak ada nilai warna/font/spasi baru.

## Warna

| Token | Nilai | Pemakaian di website |
| --- | --- | --- |
| `surface-page` | #FAF7F9 | Latar halaman, section selang-seling |
| `surface` | #FFFFFF | Kartu artikel, kartu fitur, form |
| `surface-sunken` | #F3EEF2 | Blok kutipan, kotak "Untuk WO", area filter |
| `ink` / `ink-muted` | #2B1F2A / #6A5D68 | Teks isi / metadata, tanggal, kredit foto |
| `primary` | #8A1F7C | CTA, link, menu aktif, section Pilot, footer |
| `primary-hover` | #6E1863 | Hover tombol dan link |
| `primary-soft` | #F8ECF5 | Chip tag, kategori terpilih |
| `champagne` | #C9A65A | Ornamen garis, ikon dekoratif. Bukan teks |
| `champagne-soft` | #F3E9D2 | Latar hero jalur pasangan, kartu Palette |

## Rekomendasi per area konten wedding

| Area | Rekomendasi visual |
| --- | --- |
| Hero Home (jalur WO) | Latar `surface-page`, judul DM Serif Display `display-xl`*, CTA `primary` 48px, mockup app shell |
| Hero Journal / Inspirasi | Latar `champagne-soft`, garis ornamen `champagne`, judul DM Serif Display |
| Panduan tahap wedding | Komponen StageTimeline: 6 tahap, nodus `primary`, tahap aktif `primary-soft`, label `caption` |
| Artikel | Isi `body-lg`* (17/28), lebar 68ch, daftar isi sticky di desktop, kotak "Untuk WO" `surface-sunken` |
| Venue & Fotografi | VendorCard: foto 4:3, label disclosure sebagai chip `radius-pill`, kota/kapasitas `caption` |
| Wedding Palette | PaletteSwatch: 5 swatch HEX (konten), nama warna + HEX `caption`, contoh dekor/busana/undangan |
| Konsep wedding | Kartu besar 16:9 dengan overlay `overlay`, judul `on-primary` |
| Newsletter / Pilot | CTABanner latar `primary`, teks `on-primary`, tombol putih dengan teks `primary` |

\* token usulan, menunggu OD-WEB-04.

## Tipografi
- Display: **DM Serif Display 400** (pengganti Fraunces, keputusan PO RL-193, PRD v0.4.7) untuk `display-lg` 36/44,
  `display-md` 28/36; usulan `display-xl` 48/56 (hero desktop, fluid).
  Alasan: huruf J Fraunces turun di bawah garis dasar, angka DM Serif sejajar satu baris
  (penting untuk hitung mundur D-87, tanggal, nominal). Hanya tersedia ketebalan 400.
  Status: berlaku di aplikasi dan website.
- UI/isi: Plus Jakarta Sans `heading-lg` 22/30, `heading-md` 18/26, `heading-sm` 15/22, `body` 14/22,
  `label` 13/18, `caption` 12/16; usulan `body-lg` 17/28 untuk isi artikel.
- Self-host subset Latin (woff2).

## Komponen
- Dari DS: Button (`w-btn`), FormField, Tabs, Alert, StatCard — dipakai sama persis.
- Baru (usulan DS v0.3): ArticleCard, VendorCard, PaletteSwatch, StageTimeline, CTABanner, Breadcrumb.

## Aksesibilitas
Semua pasangan teks token sudah ≥4.5:1. Jangan menaruh teks di atas `champagne` atau `primary-bright`.
Teks di atas foto wajib memakai `overlay`.

## Catatan selaras aplikasi (PRD v0.4.7)
- Lebar konten aplikasi maks. 1920px (PR #23) hanya untuk app shell; website tetap container 1200px dan diuji 360–1440px.
- Mockup aplikasi di website memakai label Bahasa Inggris (RL-191) dan pemetaan tone status Design System.
- Dokumen hasil generate memakai token `document-*` yang netral (RL-109); tidak dipakai di website.

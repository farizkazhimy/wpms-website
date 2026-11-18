# WePromys Website

Situs marketing dan konten WePromys (Wedding Project Management System): landing produk untuk
Wedding Organizer (jalur A) dan Journal & Inspirasi wedding untuk calon pengantin (jalur B).

Acuan utama:
- WPMS-WEB-v0.1 (Website Plan) — scope, sitemap, fase, acceptance checklist
- WPMS Design System v0.2 — salinan token di `design/tokens.json`, ringkasan di `design/README.md`
- WPMS-BG-v0.1 (Brand Guideline) dan PRD WPMS v0.4.7 (18 Nov 2026)
- Ringkasan sisi aplikasi (landing kit dari prototype): `docs/reference/app-kit/`
- Kalender konten launch: `docs/content-plan.md`; fase dan prompt: `docs/roadmap.md`

## Stack (WEB-D02)
Astro + MDX + Content Collections (skema Zod) + Tailwind CSS. Tema Tailwind dibangkitkan dari
`design/tokens.json` lewat `scripts/build-tokens.mjs`. Gambar via astro:assets, pencarian Pagefind.

## Aturan desain
- Warna, font, spasi, radius, shadow hanya dari `design/tokens.json`. Jangan menulis HEX/px baru di komponen.
  Pengecualian: swatch di konten Palette adalah konten, bukan token UI.
- `primary` untuk satu CTA utama per section, link, menu aktif. Teks di atasnya `on-primary`.
- `champagne` hanya ornamen (garis, ikon dekoratif, hitung mundur), tidak untuk teks atau status.
- Warna status (success/warning/danger/info) hanya untuk pesan form, bukan dekorasi.
- Proporsi halaman: ±60% latar terang, 30% primary, 10% champagne.
- DM Serif Display (400, satu-satunya ketebalan) untuk display: hero, judul artikel, nama kategori,
  angka hitung mundur. Hierarki judul diatur lewat ukuran, bukan ketebalan; jangan set font-weight lain
  (mencegah faux bold). Menggantikan Fraunces; diputuskan Product Owner (PRD RL-193).
  Plus Jakarta Sans untuk UI dan isi.
  Outfit hanya di logo SVG, jangan dimuat sebagai webfont. JetBrains Mono tidak dipakai di website.
- Token usulan `display-xl` (48/56) dan `body-lg` (17/28) menunggu OD-WEB-04; definisikan di satu tempat
  (`src/styles/tokens.proposed.css`) agar mudah dihapus bila ditolak.
- Ikon Lucide stroke 1.75, ukuran 16/20/24. Tanpa emoji. Tanpa tanda seru di UI.
- Fokus: outline 2px `primary-bright`, offset 2px, pada semua elemen interaktif.
- Logo dari `public/brand/`; descriptor dan tagline tidak tampil bersamaan; clear space setinggi cincin.
- Responsif 360px sampai 1440px, grid 4px, kartu `radius-lg` + `shadow-sm` + border `border`.

## Aturan konten
- Copy website berbahasa Indonesia. Bila menyebut atau menampilkan aplikasi (mockup, screenshot, nama fitur),
  ikuti aplikasi (PRD RL-191): nama modul dan label status dalam Bahasa Inggris, misalnya Payments, Guests,
  Calendar, Active, Done, In Progress, Attending; tombol dan deskripsi tetap Bahasa Indonesia.
- Hitung mundur di mockup header Project ditulis `D-87` (FR-DSH-007); di Client Portal "87 hari lagi" (FR-CLP-005).
- Pilot Release 1: Nora + 1–2 tenant mitra, Q1 2027; go-live komersial akhir Q2 2027 (PRD 5.4, 11.2).
  Jangan menjanjikan kuota atau tanggal lain.
- Nama produk ditulis WePromys. Nama, tagline, kontak, sosmed dari `src/config/site.ts`.
- Semua teks UI dari `src/i18n/id.json`; jangan hardcode string di komponen.
- Jangan menjanjikan fitur di luar Release 1, fitur AI, marketplace, booking vendor, pricing publik, atau self-signup.
- Draft konten selalu `status: review` dan menandai setiap fakta yang perlu dicek dengan `[VERIFIKASI]`.
- Harga ditulis kisaran + tanggal cek, contoh "Rp 80 sampai 120 juta (dicek Nov 2026)".
- Profil vendor wajib `disclosure: editorial | collaboration` dan kredit foto.
- Jangan menulis testimoni, ulasan, atau kutipan atas nama orang nyata. Jangan mengarang nama vendor,
  alamat, atau kontak; gunakan placeholder `[VERIFIKASI: ...]`.
- Klaim regulasi atau adat wajib mencantumkan sumber.

## Alur kerja
1. Mulai setiap tugas di plan mode; usulkan langkah sebelum mengubah file.
2. Kerjakan di branch `feat/<fase>-<nama>`, commit kecil dan deskriptif.
3. Sebelum menyerahkan: `npm run build`, `npm run check`, `npm run lint`, `npm run test:a11y` harus lulus.
4. Sertakan tangkapan layar desktop (1440) dan mobile (360) di pull request.

## Perintah
- `npm run dev | build | lint | check | test:a11y`
- Slash command proyek: `/new-article`, `/new-vendor`, `/new-palette`, `/qa-page`
- Subagent: `content-reviewer`, `a11y-auditor`, `design-guard`

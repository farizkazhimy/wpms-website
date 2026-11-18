---
description: QA satu rute — build, a11y, Lighthouse, kepatuhan design system
argument-hint: <rute, misal /journal/memilih-fotografer-wedding>
---
Lakukan QA untuk rute: $ARGUMENTS

1. `npm run build` dan `npm run check`; hentikan bila gagal dan laporkan error.
2. Jalankan preview, ambil screenshot 1440px dan 360px.
3. Jalankan axe (test:a11y) dan Lighthouse (mobile) untuk rute tersebut.
4. Panggil subagent `design-guard` untuk file komponen/halaman yang dipakai rute ini.
5. Laporkan tabel: Performance, Accessibility, Best Practices, SEO, temuan axe (kritis/serius),
   pelanggaran token. Target: semua skor ≥90, nol temuan kritis.

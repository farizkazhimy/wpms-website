---
description: Buat draft artikel Journal (MDX) dari brief, status review
argument-hint: tahap=<1-6|news> topik='<judul kerja>'
---
Buat draft artikel Journal WePromys untuk: $ARGUMENTS

1. Baca CLAUDE.md, docs/content-plan.md, dan skema `journal` di src/content.config.ts.
2. Buat `src/content/journal/<slug>.mdx` dengan frontmatter lengkap:
   title, description (140–160 karakter), stage, category, tags, status: review,
   author: Claude (draft), reviewer: "[VERIFIKASI: editor Nora]", publishedAt, reviewedAt,
   heroImage, heroAlt, imageCredit.
3. Struktur: pengantar singkat, H2 per langkah, checklist praktis, FAQ 3–5 butir,
   blok `<ForWO />` di akhir yang menautkan ke /produk.
4. Nada hangat, profesional, menenangkan. Boleh "Anda". Tanpa emoji, tanpa klaim superlatif.
5. Tandai setiap fakta (harga, regulasi, adat, nama tempat) dengan `[VERIFIKASI]`. Harga = kisaran + bulan cek.
6. Jangan mengarang testimoni, nama vendor, alamat, atau kontak.
7. Setelah selesai, jalankan subagent `content-reviewer` pada file itu dan laporkan temuannya.

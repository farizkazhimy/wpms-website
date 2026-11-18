---
description: Buat profil kurasi Inspirasi (venue, fotografi, konsep)
argument-hint: kategori=<venue|photography|concept> nama='<nama vendor/konsep>'
---
Buat profil kurasi Inspirasi untuk: $ARGUMENTS

1. Baca CLAUDE.md dan skema koleksi terkait di src/content.config.ts.
2. Buat `src/content/<kategori>/<slug>.mdx` dengan status: review dan field wajib:
   disclosure (editorial | collaboration), kota, gaya, kapasitas (venue), kisaran harga + bulan cek,
   kontak resmi, galeri dengan alt text dan imageCredit, permissionRef (bukti izin tertulis).
3. Semua data faktual diberi `[VERIFIKASI]`. Jangan mengisi alamat, kontak, atau harga dari tebakan.
4. Tanpa rating, tanpa tombol booking, tanpa harga pasti (bukan marketplace, PRD 5.3).
5. Jalankan subagent `content-reviewer` dan laporkan hasilnya.

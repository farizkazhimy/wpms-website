---
description: Buat konten Wedding Palette dengan swatch HEX
argument-hint: nama='<nama palette>' suasana='<deskripsi>'
---
Buat konten Wedding Palette untuk: $ARGUMENTS

1. Buat `src/content/palette/<slug>.mdx` status: review.
2. Frontmatter `swatches`: 5 warna { name, hex, role: utama|pendamping|aksen|netral|metalik }.
   Swatch ini konten, bukan token UI; jangan dipakai di komponen.
3. Isi: suasana dan musim yang cocok, penerapan pada dekor, busana keluarga, undangan, bunga.
4. Cek kontras: bila HEX dipakai sebagai latar teks di contoh undangan, pastikan ≥4.5:1 dan sebutkan rasionya.
5. Jalankan subagent `content-reviewer`.

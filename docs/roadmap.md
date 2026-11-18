# Roadmap & proses Claude Code — WePromys Website

Ringkasan eksekusi dari WPMS-WEB-v0.1 Section 9–10. Target: siap launch 6 minggu sejak kick-off.
Gate G1 (akhir minggu 1): merek, domain, hosting. Gate G2 (akhir minggu 5): QA lulus, konten di-approve.

## Pola kerja per tugas
1. **Brief** — PM menulis tujuan, acceptance criteria, file referensi (template di bawah).
2. **Plan** — Claude Code di plan mode (Shift+Tab) membaca CLAUDE.md, mengusulkan langkah; PM approve.
3. **Build** — branch `feat/<fase>-<nama>`, commit kecil.
4. **QA** — build, check, lint, test:a11y, Lighthouse; subagent `design-guard` dan `a11y-auditor`.
5. **Review** — PR dengan screenshot 1440 & 360; reviewer teknis + PM approve.
6. **Deploy** — merge ke main memicu deploy; preview URL untuk stakeholder.

## Fase

| Minggu | Fase | Output | Prompt awal ke Claude Code |
| --- | --- | --- | --- |
| 1 | F0 Setup | Astro + MDX + Tailwind, Content Collections, CI | "Inisialisasi Astro + MDX + Tailwind sesuai struktur di docs/roadmap.md. Tambahkan CI build, lint, check." |
| 1 | F1 Token & brand | build-tokens.mjs, tema Tailwind, logo, font self-host, /styleguide | "Baca design/tokens.json, buat scripts/build-tokens.mjs yang menghasilkan tema Tailwind + CSS variables. Tanpa warna baru. Buat /styleguide." |
| 2 | F2 Komponen | Button, FormField, Tabs, Alert, ArticleCard, VendorCard, PaletteSwatch, StageTimeline, CTABanner, Breadcrumb | "Buat VendorCard sesuai design/README.md. Hanya kelas dari token. Sertakan hover, focus, mobile. Tambah contoh di /styleguide." |
| 3 | F3 Landing | Home, Produk, Untuk WO, Ajukan Demo, Tentang | "Bangun Home sesuai urutan WPMS-WEB 5.1. Teks dari src/i18n/id.json. CTA Ajukan Demo. Jangan janjikan fitur Release 2/AI." |
| 4 | F4 Template konten | Indeks Journal & Inspirasi, layout artikel/profil, filter, Pagefind | "Buat koleksi journal, venue, palette, photography, concept dengan skema Zod. Draft tidak ter-render di produksi." |
| 2–5 | F5 Konten | 12 artikel + 16 profil (status review) | "/new-article tahap=3 topik='Memilih fotografer wedding'" |
| 5 | F6 QA & SEO | Sitemap, robots, schema.org, OG, audit | "Jalankan /qa-page untuk semua template. Perbaiki temuan kritis. Laporkan skor." |
| 6 | F7 Launch | Domain, analitik, form produksi, legal | Setelah OD-030 dan legal disetujui |

## Struktur repositori target

```text
CLAUDE.md
design/tokens.json          # salinan WPMS Design System v0.2
scripts/build-tokens.mjs    # tokens.json -> tailwind theme + CSS variables
public/brand/               # logo SVG, favicon, OG image (Logo Kit v0.1)
src/
  config/site.ts
  i18n/id.json
  components/
  layouts/                  # BaseLayout, ArticleLayout, ProfileLayout
  content/{journal,venue,palette,photography,concept}/*.mdx
  content.config.ts
  pages/
.claude/{commands,agents}/
```

## Template brief tugas (untuk PM)

```markdown
**Fase/Tugas:** F2 — VendorCard
**Tujuan:** kartu profil venue/fotografer untuk indeks Inspirasi
**Acceptance criteria:**
- [ ] Hanya token dari design/tokens.json
- [ ] Chip disclosure (Kurasi editorial / Kolaborasi)
- [ ] Responsif 360–1440, fokus keyboard terlihat
- [ ] Contoh di /styleguide, lulus test:a11y
**Referensi:** design/README.md, WPMS-WEB-v0.1 Section 5.2
```

## Open decisions yang memblokir
OD-WEB-01 domain, OD-WEB-02 hosting, OD-WEB-07 editor konten (minggu 1); OD-WEB-03 form/newsletter,
OD-WEB-04 token `display-xl`, `body-lg`, dan 6 komponen baru (minggu 2; font display sudah diputuskan PO lewat RL-193); OD-WEB-05 kebijakan kolaborasi berbayar (minggu 3).

## Status (18 Nov 2026)

| Fase | Status | Catatan |
| --- | --- | --- |
| F0 Setup | Selesai | Astro 7.4.5, MDX, Tailwind 4.3.4, Content Collections, CI GitHub Actions |
| F1 Token & brand | Selesai | Tema dari tokens.json, font self-host, logo, `/styleguide` |
| F2 Komponen | Selesai | 15 komponen; check-design dan axe lulus |
| F3 Landing | Home selesai | Halaman Produk, Untuk WO, Ajukan Demo, Tentang menyusul (belum ada mockup) |
| F4 Template konten | Berikutnya | Journal, Artikel, Inspirasi sesuai mockup 02–04 |

Catatan desain: di mobile (< 768px) label kategori Inspirasi memakai scrim `ink` 80% karena token
`overlay` (48%) hanya memberi kontras ±3,4:1 untuk teks 18px. Usulan untuk Design System v0.3.

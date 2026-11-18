# WePromys Website

Website publik WePromys: landing produk untuk Wedding Organizer serta Journal & Inspirasi wedding
untuk calon pengantin. Astro + MDX + Tailwind CSS v4, token dari WPMS Design System.

Status: F0–F3 selesai (setup, token, komponen, Home). Berikutnya F4 template konten.

## Menjalankan

```bash
npm install
npm run dev          # http://localhost:4321 (konten status review ikut tampil di dev)
npm run build        # build produksi ke dist/
npm run check        # astro check + pengawal Design System (scripts/check-design.mjs)
npm run lint         # prettier
npm run test:a11y    # axe-core di 1440px dan 360px, gagal bila ada temuan serious/critical
```

Staging: set `PUBLIC_SHOW_REVIEW=true` agar konten berstatus `review` tampil. Produksi: `false`.
Halaman `/styleguide` menampilkan semua token dan komponen (noindex).

## Struktur

- `design/tokens.json` → `scripts/build-tokens.mjs` → `src/styles/tokens.generated.css` (tema Tailwind)
- `src/styles/tokens.proposed.css`: token usulan `display-xl`, `body-lg` (OD-WEB-04)
- `src/config/site.ts`: nama produk, rute, sosmed; `src/i18n/id.json`: semua teks UI
- `src/content.config.ts`: skema Journal, Venue, Fotografi, Palette, Konsep
- `src/components/`: Button, Badge, FormField, Alert, Tabs, ArticleCard, VendorCard, PaletteSwatch,
  StageTimeline, CTABanner, Breadcrumb, CategoryCard, AppMockup, SiteHeader, SiteFooter

## Dokumen

- Aturan proyek untuk Claude Code: [CLAUDE.md](CLAUDE.md)
- Design system & penerapan: [design/README.md](design/README.md)
- Roadmap, fase, dan template brief: [docs/roadmap.md](docs/roadmap.md)
- Rencana konten launch: [docs/content-plan.md](docs/content-plan.md)

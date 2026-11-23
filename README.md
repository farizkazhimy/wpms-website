# WePromys Website

Website publik WePromys: landing produk untuk Wedding Organizer serta Journal & Inspirasi wedding
untuk calon pengantin. Astro + MDX + Tailwind CSS v4, token dari WPMS Design System.

Status: F0–F4 selesai (setup, token, komponen, Home, Journal, Artikel, Inspirasi). Berikutnya F5 konten dan halaman Produk/Untuk WO/Demo.

## Menjalankan

```bash
npm install
npm run dev          # http://localhost:4321 (konten status review ikut tampil di dev)
npm run build        # build produksi ke dist/
npm run check        # astro check + pengawal Design System (scripts/check-design.mjs)
npm run lint         # prettier
npm run test:a11y    # axe-core di semua halaman dist/, 1440px dan 360px; gagal bila serious/critical
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

## Deploy (Vercel)

1. Vercel → Add New Project → Import `farizkazhimy/wpms-website` (preset Astro terdeteksi; `vercel.json` sudah ada).
2. Environment Variables:
   - `PUBLIC_SHOW_REVIEW=true` untuk staging/uji (konten `review` tampil, semua halaman otomatis `noindex`).
     Produksi: `false`.
   - `SITE_URL=https://<domain-vercel-atau-final>` (domain final menunggu OD-WEB-01).
   - `PUBLIC_DEMO_FORM_ACTION`: URL web app Google Apps Script untuk form demo dan newsletter.
     Setup: [integrations/google-apps-script/README.md](integrations/google-apps-script/README.md).
     Isi setelah Kebijakan Privasi final.
3. Setiap push ke `main` men-deploy production; setiap PR mendapat Preview URL.

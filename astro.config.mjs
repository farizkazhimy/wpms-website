// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Domain final menunggu OD-WEB-01; isi SITE_URL di environment hosting.
const site = process.env.SITE_URL || 'https://staging.example.com';

export default defineConfig({
  site,
  integrations: [mdx(), sitemap({ filter: (page) => !page.includes('/styleguide') })],
  vite: { plugins: [tailwindcss()] },
});

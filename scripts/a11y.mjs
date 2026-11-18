// Audit aksesibilitas (axe-core) pada build produksi, di 1440px dan 360px.
// Gagal bila ada temuan serious/critical. SCREENSHOT_DIR=... untuk menyimpan tangkapan layar.
import { createRequire } from 'node:module';
import { spawn, spawnSync } from 'node:child_process';
import { mkdirSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const require = createRequire(import.meta.url);
let chromium;
try {
  ({ chromium } = require('playwright'));
} catch {
  ({ chromium } = createRequire('/opt/node-tools/')('playwright'));
}
const axePath = require.resolve('axe-core/axe.min.js');

const routes = [];
const collect = (dir) => {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) collect(p);
    else if (name === 'index.html')
      routes.push('/' + relative('dist', dir).replace(/\\/g, '/') + (dir === 'dist' ? '' : '/'));
  }
};
collect('dist');
routes.sort();
const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 360, height: 780 },
];
const port = 4329;
const shots = process.env.SCREENSHOT_DIR;
if (shots) mkdirSync(shots, { recursive: true });

const server = spawn('npx', ['astro', 'preview', '--port', String(port)], { stdio: 'pipe' });
await new Promise((resolve, reject) => {
  const t = setTimeout(() => reject(new Error('preview tidak menyala')), 30000);
  server.stdout.on(
    'data',
    (d) => d.toString().includes(String(port)) && (clearTimeout(t), resolve()),
  );
});

const browser = await chromium.launch();
let failures = 0;
try {
  for (const vp of viewports) {
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
    for (const route of routes) {
      await page.goto(`http://localhost:${port}${route}`, { waitUntil: 'networkidle' });
      await page.addScriptTag({ path: axePath });
      const result = await page.evaluate(() =>
        window.axe.run(document, {
          runOnly: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa', 'best-practice'],
        }),
      );
      const bad = result.violations.filter((v) => ['serious', 'critical'].includes(v.impact));
      const minor = result.violations.length - bad.length;
      console.log(`${vp.name} ${route}: ${bad.length} serious/critical, ${minor} minor/moderate`);
      for (const v of result.violations) {
        console.log(`  [${v.impact}] ${v.id}: ${v.help} (${v.nodes.length} node)`);
        for (const n of v.nodes.slice(0, 3)) console.log(`      ${n.target.join(' ')}`);
      }
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth > window.innerWidth,
      );
      if (overflow) console.log(`  [serious] horizontal-scroll: halaman lebih lebar dari viewport`);
      failures += bad.length + (overflow ? 1 : 0);
      if (shots) {
        const file = `${shots}/${vp.name}${route.replace(/\//g, '_')}.png`;
        await page.screenshot({ path: file, fullPage: true });
      }
    }
    await page.close();
  }
} finally {
  await browser.close();
  server.kill();
  // Astro 7 menjalankan preview sebagai daemon; hentikan agar port bebas.
  spawnSync('npx', ['astro', 'preview', 'stop'], { stdio: 'ignore' });
}
if (failures) {
  console.error(`test:a11y gagal: ${failures} temuan serious/critical`);
  process.exit(1);
}
console.log('test:a11y lulus');

// Pengawal Design System: gagal bila komponen/halaman memakai nilai di luar token.
// Konten (src/content, src/data) dikecualikan: swatch Palette adalah konten editorial.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const roots = ['src/components', 'src/layouts', 'src/pages', 'src/styles'];
const skip = new Set(['src/styles/tokens.generated.css']);
const rules = [
  {
    re: /#[0-9a-fA-F]{3,8}\b(?![^<]*<\/code>)/g,
    msg: 'warna HEX literal, pakai token warna',
    css: true,
  },
  { re: /\brgba?\(/g, msg: 'rgb()/rgba() literal, pakai token warna', css: true },
  { re: /\[[0-9.]+(px|rem)\]/g, msg: 'ukuran arbitrer px/rem, pakai token spasi/teks' },
  { re: /Fraunces|Outfit/g, msg: 'font di luar Design System (display = DM Serif Display)' },
  {
    re: /font-(medium|semibold|bold)[^"']*font-display|font-display[^"']*font-(medium|semibold|bold)/g,
    msg: 'DM Serif Display hanya 400',
  },
];

const files = [];
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.(astro|css|ts|mjs)$/.test(p) && !skip.has(p)) files.push(p);
  }
};
roots.forEach(walk);

let problems = 0;
for (const file of files) {
  const lines = readFileSync(file, 'utf8').split('\n');
  lines.forEach((text, i) => {
    if (text.includes('design-guard: allow')) return;
    for (const r of rules) {
      if (file === 'src/pages/styleguide.astro' && r.css) continue; // menampilkan nilai token
      r.re.lastIndex = 0;
      if (r.re.test(text)) {
        problems++;
        console.error(`${file}:${i + 1}  ${r.msg}\n    ${text.trim()}`);
      }
    }
  });
}

// Tanpa tanda seru di teks UI (Design System: bahasa & konten).
const id = readFileSync('src/i18n/id.json', 'utf8');
if (id.includes('!')) {
  problems++;
  console.error('src/i18n/id.json  ada tanda seru di teks UI');
}

if (problems) {
  console.error(`\ncheck-design: ${problems} pelanggaran`);
  process.exit(1);
}
console.log(`check-design: ${files.length} file bersih`);

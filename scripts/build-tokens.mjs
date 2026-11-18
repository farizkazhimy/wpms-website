// Membangkitkan tema Tailwind v4 + CSS variables dari design/tokens.json (WPMS Design System).
// Satu sumber kebenaran: jangan menulis nilai warna/font/spasi di tempat lain.
import { readFileSync, writeFileSync } from 'node:fs';

const tokens = JSON.parse(readFileSync(new URL('../design/tokens.json', import.meta.url), 'utf8'));
const out = [];
const line = (s) => out.push(s);

line(
  '/* Dibangkitkan oleh scripts/build-tokens.mjs dari design/tokens.json. Jangan diedit manual. */',
);
line('@theme {');
// Matikan nilai bawaan Tailwind agar hanya token Design System yang bisa dipakai.
line('  --color-*: initial;');
line('  --font-*: initial;');
line('  --text-*: initial;');
line('  --radius-*: initial;');
line('  --shadow-*: initial;');
line('  --color-transparent: transparent;');
line('  --color-current: currentColor;');

for (const t of tokens.color.tokens) {
  if (t.name.startsWith('document-')) continue; // khusus dokumen PDF aplikasi (RL-109)
  line(`  --color-${t.name}: ${t.value};`);
}
for (const [name, value] of Object.entries(tokens.type.families)) {
  line(`  --font-${name}: ${value};`);
}
for (const group of tokens.type.groups) {
  for (const s of group.styles) {
    line(`  --text-${s.name}: ${s.fontSize};`);
    line(`  --text-${s.name}--line-height: ${s.lineHeight};`);
    line(`  --text-${s.name}--font-weight: ${s.fontWeight};`);
    if (s.letterSpacing) line(`  --text-${s.name}--letter-spacing: ${s.letterSpacing};`);
  }
}
line('  --spacing: 4px; /* grid 4px */');
for (const t of tokens.spacing.tokens) line(`  --spacing-${t.name}: ${t.value};`);
for (const t of tokens.radius.tokens)
  line(`  --radius-${t.name.replace('radius-', '')}: ${t.value};`);
for (const t of tokens.shadow.tokens)
  line(`  --shadow-${t.name.replace('shadow-', '')}: ${t.value};`);
line('}');

const target = new URL('../src/styles/tokens.generated.css', import.meta.url);
writeFileSync(target, out.join('\n') + '\n');
console.log(`tokens: ${out.length - 3} baris ditulis ke src/styles/tokens.generated.css`);

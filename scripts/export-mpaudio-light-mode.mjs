#!/usr/bin/env node
/**
 * Exporte les 3 visuels prototype Mpaudio pour le ScrollStack #light-mode.
 * Usage : FIGMA_ACCESS_TOKEN=xxx node scripts/export-mpaudio-light-mode.mjs
 * Token : Figma → Settings → Security → Personal access tokens
 */
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const FILE_KEY = 'xiW7wAfkwbF4kkQ5tFW0vE';
const OUT_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), '../src/assets/mpaudio/light-mode');
const SLIDES = [
  { id: '509:3500', file: 'presentation-accueil.png', label: 'Banner accueil' },
  { id: '509:3524', file: 'presentation-amplis-slider.png', label: 'Slider amplis' },
  { id: '509:4232', file: 'presentation-single-product.png', label: 'Fiche produit' },
];

const token = process.env.FIGMA_ACCESS_TOKEN;
if (!token) {
  console.error('Définir FIGMA_ACCESS_TOKEN (token personnel Figma).');
  process.exit(1);
}

const ids = SLIDES.map((s) => s.id).join(',');
const apiUrl = `https://api.figma.com/v1/images/${FILE_KEY}?ids=${encodeURIComponent(ids)}&format=png&scale=2`;

const res = await fetch(apiUrl, { headers: { 'X-Figma-Token': token } });
if (!res.ok) {
  console.error('Figma API', res.status, await res.text());
  process.exit(1);
}

const { images, err } = await res.json();
if (err) {
  console.error('Figma API error:', err);
  process.exit(1);
}

await mkdir(OUT_DIR, { recursive: true });

for (const slide of SLIDES) {
  const url = images[slide.id];
  if (!url) {
    console.error('Pas d’URL pour', slide.id, slide.label);
    process.exit(1);
  }
  const imgRes = await fetch(url);
  if (!imgRes.ok) {
    console.error('Téléchargement échoué', slide.file, imgRes.status);
    process.exit(1);
  }
  const buf = Buffer.from(await imgRes.arrayBuffer());
  await writeFile(path.join(OUT_DIR, slide.file), buf);
  console.log('✓', slide.file, `(${slide.label})`);
}

console.log('Exports terminés →', OUT_DIR);

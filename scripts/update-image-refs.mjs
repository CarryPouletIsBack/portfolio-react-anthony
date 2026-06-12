#!/usr/bin/env node
/**
 * Met à jour les références .png/.jpg → .webp pour les fichiers déjà convertis.
 * Usage : node scripts/update-image-refs.mjs [--dry-run]
 */
import { readdir, readFile, writeFile, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const dryRun = process.argv.includes('--dry-run');
const RASTER_EXT = /\.(png|jpe?g)$/i;
const SKIP_DIRS = new Set(['node_modules', 'dist', '.git', 'tmp']);

/** @type {Map<string, string>} */
const replacements = new Map();

async function exists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function collectWebpMappings(dir, prefix) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await collectWebpMappings(full, prefix);
      continue;
    }
    if (!entry.name.endsWith('.webp')) continue;
    const base = entry.name.replace(/\.webp$/i, '');
    for (const ext of ['.png', '.jpg', '.jpeg']) {
      const oldName = `${base}${ext}`;
      const oldFull = path.join(dir, oldName);
      if (await exists(oldFull)) continue;
      const rel = path.relative(path.join(ROOT, prefix), full).replace(/\\/g, '/');
      const oldRel = path.relative(path.join(ROOT, prefix), oldFull).replace(/\\/g, '/');
      if (prefix === 'public/images') {
        replacements.set(`/images/${oldRel}`, `/images/${rel}`);
      } else if (prefix === 'src/assets') {
        replacements.set(`../assets/${oldRel}`, `../assets/${rel}`);
      }
    }
  }
}

async function scanSourceFiles(dir, files = []) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await scanSourceFiles(full, files);
    } else if (/\.(ts|tsx|js|jsx|css|html|md)$/.test(entry.name)) {
      files.push(full);
    }
  }
  return files;
}

async function main() {
  await collectWebpMappings(path.join(ROOT, 'public/images'), 'public/images');
  await collectWebpMappings(path.join(ROOT, 'src/assets'), 'src/assets');

  const sorted = [...replacements.entries()].sort((a, b) => b[0].length - a[0].length);
  console.log(`${sorted.length} remplacement(s) à appliquer\n`);

  const files = await scanSourceFiles(ROOT);
  let updated = 0;
  for (const file of files) {
    if (file.includes('scripts/update-image-refs.mjs') || file.includes('scripts/optimize-images.mjs')) continue;
    let content = await readFile(file, 'utf8');
    let changed = false;
    for (const [from, to] of sorted) {
      if (content.includes(from)) {
        content = content.split(from).join(to);
        changed = true;
      }
    }
    if (changed) {
      if (!dryRun) await writeFile(file, content);
      console.log(`↻ ${path.relative(ROOT, file)}`);
      updated += 1;
    }
  }
  console.log(`\n${updated} fichier(s) mis à jour`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

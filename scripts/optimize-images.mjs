#!/usr/bin/env node
/**
 * Optimise les images raster du portfolio : redimensionnement + WebP.
 * Usage : node scripts/optimize-images.mjs [--dry-run] [--max=2560] [--quality=86]
 */
import sharp from 'sharp';
import { readdir, stat, unlink, readFile, writeFile, rename } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const TARGET_DIRS = ['public/images', 'src/assets'];
const SKIP_DIR_NAMES = new Set(['tmp', 'node_modules', '.git']);
const RASTER_EXT = /\.(png|jpe?g)$/i;

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const maxDim = Number(args.find((a) => a.startsWith('--max='))?.split('=')[1] ?? 2560);
const quality = Number(args.find((a) => a.startsWith('--quality='))?.split('=')[1] ?? 86);
const minSavingRatio = 0.05;

/** @type {{ from: string; to: string; before: number; after: number }[]} */
const conversions = [];

async function walk(dir, files = []) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (SKIP_DIR_NAMES.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(full, files);
    } else if (RASTER_EXT.test(entry.name)) {
      files.push(full);
    }
  }
  return files;
}

async function optimizeFile(filePath) {
  const rel = path.relative(ROOT, filePath);
  const before = (await stat(filePath)).size;
  const meta = await sharp(filePath).metadata();
  const needsResize =
    (meta.width ?? 0) > maxDim || (meta.height ?? 0) > maxDim;

  const outPath = filePath.replace(RASTER_EXT, '.webp');
  if (outPath === filePath) return;

  const tmpPath = `${outPath}.tmp`;

  let pipeline = sharp(filePath, { failOn: 'none' });
  if (needsResize) {
    pipeline = pipeline.resize(maxDim, maxDim, {
      fit: 'inside',
      withoutEnlargement: true,
    });
  }

  if (dryRun) {
    const afterEstimate = Math.round(before * (needsResize ? 0.25 : 0.35));
    conversions.push({ from: rel, to: path.relative(ROOT, outPath), before, after: afterEstimate });
    console.log(`[dry-run] ${rel} → ${path.relative(ROOT, outPath)} (~${formatBytes(before)} → ~${formatBytes(afterEstimate)})`);
    return;
  }

  await pipeline
    .webp({ quality, effort: 6, smartSubsample: true })
    .toFile(tmpPath);

  const after = (await stat(tmpPath)).size;
  const saving = 1 - after / before;

  if (saving < minSavingRatio && !needsResize) {
    await unlink(tmpPath);
    console.log(`⊘ ${rel} — gain insuffisant (${formatBytes(before)}), conservé`);
    return;
  }

  if (path.extname(filePath).toLowerCase() !== '.webp') {
    await unlink(filePath);
  }
  await rename(tmpPath, outPath);

  conversions.push({ from: rel, to: path.relative(ROOT, outPath), before, after });
  const pct = Math.round(saving * 100);
  console.log(`✓ ${rel} → ${path.relative(ROOT, outPath)} (${formatBytes(before)} → ${formatBytes(after)}, -${pct}%)`);
}

async function updateReferences() {
  const exts = ['ts', 'tsx', 'js', 'jsx', 'css', 'html', 'md'];
  const filesToScan = [];

  async function scanDir(dir) {
    const entries = await readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (SKIP_DIR_NAMES.has(entry.name) || entry.name === 'node_modules' || entry.name === 'dist') continue;
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        await scanDir(full);
      } else if (exts.some((e) => entry.name.endsWith(`.${e}`))) {
        filesToScan.push(full);
      }
    }
  }

  await scanDir(ROOT);

  /** @type {Map<string, string>} */
  const replacements = new Map();
  for (const { from, to } of conversions) {
    const fromNorm = from.replace(/\\/g, '/');
    const toNorm = to.replace(/\\/g, '/');
    const fromBase = fromNorm.replace(RASTER_EXT, '');
    const oldExt = path.extname(fromNorm);
    const webpName = `${path.basename(fromBase)}.webp`;

    replacements.set(`${fromBase}${oldExt}`, `${fromBase}.webp`);
    replacements.set(fromNorm, toNorm);

    if (fromNorm.startsWith('public/images/')) {
      replacements.set(`/images/${path.basename(fromNorm)}`, `/images/${webpName}`);
    }
    if (fromNorm.startsWith('src/assets/')) {
      const rel = fromNorm.slice('src/assets/'.length);
      replacements.set(`../assets/${rel}`, `../assets/${rel.replace(RASTER_EXT, '.webp')}`);
    }
  }

  let updatedFiles = 0;
  for (const file of filesToScan) {
    if (file.includes('scripts/optimize-images.mjs')) continue;
    let content = await readFile(file, 'utf8');
    let changed = false;
    for (const [from, to] of replacements) {
      if (content.includes(from)) {
        content = content.split(from).join(to);
        changed = true;
      }
    }
    if (changed) {
      if (!dryRun) await writeFile(file, content);
      updatedFiles += 1;
      console.log(`↻ refs ${path.relative(ROOT, file)}`);
    }
  }
  console.log(`\nRéférences mises à jour : ${updatedFiles} fichier(s)`);
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

async function main() {
  console.log(`Optimisation images (max=${maxDim}px, quality=${quality}, dry-run=${dryRun})\n`);

  const allFiles = [];
  for (const dir of TARGET_DIRS) {
    await walk(path.join(ROOT, dir), allFiles);
  }

  allFiles.sort();
  for (const file of allFiles) {
    await optimizeFile(file);
  }

  if (conversions.length === 0) {
    console.log('\nAucune image convertie.');
    return;
  }

  const totalBefore = conversions.reduce((s, c) => s + c.before, 0);
  const totalAfter = conversions.reduce((s, c) => s + c.after, 0);
  console.log(
    `\nTotal : ${formatBytes(totalBefore)} → ${formatBytes(totalAfter)} (-${Math.round((1 - totalAfter / totalBefore) * 100)}%)`
  );

  if (!dryRun && conversions.length > 0) {
    await updateReferences();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

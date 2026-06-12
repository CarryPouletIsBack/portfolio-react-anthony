#!/usr/bin/env node
/**
 * Vérifie que chaque référence image dans le code pointe vers un fichier existant.
 * Usage : node scripts/verify-image-refs.mjs
 */
import { readdir, readFile, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const SKIP_DIRS = new Set(['node_modules', 'dist', '.git', 'tmp']);

const REF_PATTERNS = [
  /from\s+['"]([^'"]+\.(?:png|jpe?g|webp|svg))['"]/g,
  /(?:src|href|imageSrc|posterSrc|coverImage|cover|avatarUrl|image)\s*[:=]\s*['"]([^'"]+\.(?:png|jpe?g|webp|svg))['"]/g,
  /url\(\s*['"]?([^'")]+\.(?:png|jpe?g|webp|svg))['"]?\s*\)/g,
  /[`'"](\/(?:images|single-project|assets)\/[^'"`]+\.(?:png|jpe?g|webp|svg))[`'"]/g,
];

async function exists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function scanDir(dir, files = []) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await scanDir(full, files);
    else if (/\.(ts|tsx|js|jsx|css|html|md)$/.test(entry.name)) files.push(full);
  }
  return files;
}

function resolveRef(ref, sourceFile) {
  if (ref.startsWith('/')) {
    return path.join(ROOT, 'public', ref.slice(1));
  }
  if (ref.startsWith('../') || ref.startsWith('./')) {
    return path.normalize(path.join(path.dirname(sourceFile), ref));
  }
  return null;
}

async function main() {
  const files = await scanDir(ROOT);
  /** @type {{ ref: string; file: string; resolved: string }[]} */
  const missing = [];
  const seen = new Set();

  for (const file of files) {
    if (file.includes('scripts/verify-image-refs.mjs')) continue;
    const content = await readFile(file, 'utf8');
    for (const pattern of REF_PATTERNS) {
      pattern.lastIndex = 0;
      let match;
      while ((match = pattern.exec(content)) !== null) {
        const ref = match[1];
        if (!ref || ref.includes('${')) continue;
        const key = `${file}::${ref}`;
        if (seen.has(key)) continue;
        seen.add(key);

        const resolved = resolveRef(ref, file);
        if (!resolved) continue;
        if (!(await exists(resolved))) {
          missing.push({ ref, file: path.relative(ROOT, file), resolved: path.relative(ROOT, resolved) });
        }
      }
    }
  }

  if (missing.length === 0) {
    console.log('✓ Toutes les références image sont valides.');
    return;
  }

  console.error(`✗ ${missing.length} référence(s) cassée(s) :\n`);
  for (const m of missing) {
    console.error(`  ${m.ref}`);
    console.error(`    → ${m.file} (attendu: ${m.resolved})\n`);
  }
  process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

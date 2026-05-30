/**
 * Ultra_terrestre_224.gpx → GeoJSON LineString simplifié pour la cover UTOI.
 * Usage: node scripts/simplify-utoi-gpx.mjs
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const inputPath = join(root, 'src/assets/utoi/Ultra_terrestre_224.gpx');
const outputPath = join(root, 'src/data/utoi/ultra-terrestre-224.geo.json');

const TARGET_MAX = 2000;
const MIN_STEP_METERS = 60;

function parseTrkpts(gpxText) {
  const coords = [];
  const re = /<trkpt\s+lat="([^"]+)"\s+lon="([^"]+)"/g;
  let m;
  while ((m = re.exec(gpxText)) !== null) {
    const lat = Number(m[1]);
    const lon = Number(m[2]);
    if (Number.isFinite(lat) && Number.isFinite(lon)) {
      coords.push([lon, lat]);
    }
  }
  return coords;
}

function haversineMeters(a, b) {
  const R = 6371000;
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(b[1] - a[1]);
  const dLon = toRad(b[0] - a[0]);
  const lat1 = toRad(a[1]);
  const lat2 = toRad(b[1]);
  const h =
    Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.min(1, Math.sqrt(h)));
}

/** Garde un point tous les ~MIN_STEP_METERS (parcours long). */
function decimateByDistance(coords, minMeters) {
  if (coords.length <= 2) return coords;
  const out = [coords[0]];
  let last = coords[0];
  for (let i = 1; i < coords.length - 1; i++) {
    const p = coords[i];
    if (haversineMeters(last, p) >= minMeters) {
      out.push(p);
      last = p;
    }
  }
  out.push(coords[coords.length - 1]);
  return out;
}

function perpendicularDistance(point, lineStart, lineEnd) {
  const [x, y] = point;
  const [x1, y1] = lineStart;
  const [x2, y2] = lineEnd;
  const dx = x2 - x1;
  const dy = y2 - y1;
  if (dx === 0 && dy === 0) {
    return Math.hypot(x - x1, y - y1);
  }
  const t = Math.max(0, Math.min(1, ((x - x1) * dx + (y - y1) * dy) / (dx * dx + dy * dy)));
  const projX = x1 + t * dx;
  const projY = y1 + t * dy;
  return Math.hypot(x - projX, y - projY);
}

function douglasPeucker(coords, epsilon) {
  if (coords.length <= 2) return coords;
  let maxDist = 0;
  let maxIndex = 0;
  const end = coords.length - 1;
  for (let i = 1; i < end; i++) {
    const d = perpendicularDistance(coords[i], coords[0], coords[end]);
    if (d > maxDist) {
      maxDist = d;
      maxIndex = i;
    }
  }
  if (maxDist <= epsilon) return [coords[0], coords[end]];
  const left = douglasPeucker(coords.slice(0, maxIndex + 1), epsilon);
  const right = douglasPeucker(coords.slice(maxIndex), epsilon);
  return [...left.slice(0, -1), ...right];
}

function simplify(coords) {
  let step = MIN_STEP_METERS;
  let simplified = decimateByDistance(coords, step);
  while (simplified.length > TARGET_MAX && step < 500) {
    step += 25;
    simplified = decimateByDistance(coords, step);
  }
  if (simplified.length > TARGET_MAX * 1.5) {
    const eps = 0.00008;
    simplified = douglasPeucker(simplified, eps);
  }
  if (simplified.length > TARGET_MAX) {
    const stride = Math.ceil(simplified.length / TARGET_MAX);
    simplified = simplified.filter((_, i) => i % stride === 0 || i === simplified.length - 1);
  }
  return simplified;
}

const gpx = readFileSync(inputPath, 'utf8');
const raw = parseTrkpts(gpx);
console.log(`Points bruts: ${raw.length}`);

const line = simplify(raw);
console.log(`Points simplifiés: ${line.length}`);

const feature = {
  type: 'Feature',
  properties: {
    name: 'Ultra terrestre 224',
    source: 'Ultra_terrestre_224.gpx',
  },
  geometry: {
    type: 'LineString',
    coordinates: line,
  },
};

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, JSON.stringify(feature), 'utf8');
console.log(`Écrit: ${outputPath} (${(JSON.stringify(feature).length / 1024).toFixed(1)} Ko)`);

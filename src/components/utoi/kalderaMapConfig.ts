/** Config carte alignée sur Kaldera / trackali.com (SegmentMapMapbox3D). */
export const KALDERA_MAPBOX_STYLE = 'mapbox://styles/mapbox/dark-v11';
export const KALDERA_MAPBOX_DEM_SOURCE = 'mapbox-dem';
export const KALDERA_CONTOURS_SOURCE = 'utoi-contours';
export const KALDERA_CONTOUR_LAYER = 'utoi-contour-lines';

export const KALDERA_TERRAIN_DEM_URL = 'mapbox://mapbox.mapbox-terrain-dem-v1';
export const KALDERA_CONTOURS_URL = 'mapbox://mapbox.mapbox-terrain-v2';

export const KALDERA_TERRAIN_EXAGGERATION = 1.2;
export const KALDERA_MAP_PITCH = 65;
export const KALDERA_MAP_MIN_ZOOM = 8;
export const KALDERA_MAP_MAX_ZOOM = 15;
export const KALDERA_MAP_MAX_PITCH = 85;

/** Îlet des Salazes (cirque de Cilaos) — vue 3D rapprochée, pitch horizon. */
export const SALAZES_ILET_CENTER = {
  longitude: 55.44924,
  latitude: -21.11256,
} as const;

export const SALAZES_ILET_BOUNDS: [[number, number], [number, number]] = [
  [55.434, -21.122],
  [55.464, -21.102],
];

export const SALAZES_ILET_FIT = {
  padding: 28,
  maxZoom: 14.85,
  pitch: KALDERA_MAP_PITCH,
  bearing: 38,
} as const;

export const KALDERA_FOG = {
  color: '#0a0e14',
  'high-color': '#060a10',
  'space-color': '#020408',
  'horizon-blend': 0.2,
} as const;

export const KALDERA_CONTOUR_PAINT = {
  'line-color': '#5ee7f7',
  'line-width': 0.8,
  'line-opacity': 0.85,
} as const;

/** Tracé actif (segment) sur trackali */
export const KALDERA_TRAIL_COLOR = '#bfc900';
export const KALDERA_TRAIL_OUTLINE_COLOR = '#1f2937';
export const KALDERA_TRAIL_WIDTH = 5;
export const KALDERA_TRAIL_OUTLINE_WIDTH = 7;

export const KALDERA_MAP_BG = '#0a0e14';

export function getKalderaMapboxToken(): string {
  return import.meta.env.VITE_MAPBOX_ACCESS_TOKEN?.trim() ?? '';
}

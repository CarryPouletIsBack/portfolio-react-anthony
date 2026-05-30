/** Config carte alignée sur Kaldera / trackali.com (SegmentMapMapbox3D). */
export const KALDERA_MAPBOX_STYLE = 'mapbox://styles/mapbox/dark-v11';
export const KALDERA_MAPBOX_DEM_SOURCE = 'mapbox-dem';
export const KALDERA_TERRAIN_EXAGGERATION = 1.2;
export const KALDERA_MAP_PITCH = 65;
export const KALDERA_MAP_MIN_ZOOM = 8;
export const KALDERA_MAP_MAX_ZOOM = 15;
export const KALDERA_MAP_MAX_PITCH = 85;

export function getKalderaMapboxToken(): string {
  return import.meta.env.VITE_MAPBOX_ACCESS_TOKEN?.trim() ?? '';
}

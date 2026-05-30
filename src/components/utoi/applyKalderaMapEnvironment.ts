import type { Map as MapboxMap } from 'mapbox-gl';
import {
  KALDERA_CONTOUR_LAYER,
  KALDERA_CONTOUR_PAINT,
  KALDERA_CONTOURS_SOURCE,
  KALDERA_CONTOURS_URL,
  KALDERA_FOG,
  KALDERA_MAPBOX_DEM_SOURCE,
  KALDERA_TERRAIN_DEM_URL,
  KALDERA_TERRAIN_EXAGGERATION,
} from './kalderaMapConfig';

/** Relief 3D + brouillard bleuté + courbes de niveau (comme trackali.com). */
export function applyKalderaMapEnvironment(map: MapboxMap) {
  if (!map.getSource(KALDERA_MAPBOX_DEM_SOURCE)) {
    map.addSource(KALDERA_MAPBOX_DEM_SOURCE, {
      type: 'raster-dem',
      url: KALDERA_TERRAIN_DEM_URL,
      tileSize: 512,
      maxzoom: 12,
    });
  }

  map.setTerrain({
    source: KALDERA_MAPBOX_DEM_SOURCE,
    exaggeration: KALDERA_TERRAIN_EXAGGERATION,
  });

  if (typeof map.setFog === 'function') {
    map.setFog({ ...KALDERA_FOG });
  }

  if (!map.getSource(KALDERA_CONTOURS_SOURCE)) {
    map.addSource(KALDERA_CONTOURS_SOURCE, {
      type: 'vector',
      url: KALDERA_CONTOURS_URL,
    });
  }

  if (!map.getLayer(KALDERA_CONTOUR_LAYER)) {
    map.addLayer({
      id: KALDERA_CONTOUR_LAYER,
      type: 'line',
      source: KALDERA_CONTOURS_SOURCE,
      'source-layer': 'contour',
      paint: { ...KALDERA_CONTOUR_PAINT },
    });
  }
}

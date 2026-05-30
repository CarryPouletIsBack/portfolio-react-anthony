/** Enveloppe WGS84 de La Réunion — limites pan carte cover UTOI. */
export const REUNION_ISLAND_BBOX = {
  west: 55.18,
  south: -21.39,
  east: 55.92,
  north: -20.85,
} as const;

const MAP_BOUNDS_MARGIN = { lon: 0.09, lat: 0.07 } as const;

export const REUNION_MAP_MAX_BOUNDS: [[number, number], [number, number]] = [
  [
    REUNION_ISLAND_BBOX.west - MAP_BOUNDS_MARGIN.lon,
    REUNION_ISLAND_BBOX.south - MAP_BOUNDS_MARGIN.lat,
  ],
  [
    REUNION_ISLAND_BBOX.east + MAP_BOUNDS_MARGIN.lon,
    REUNION_ISLAND_BBOX.north + MAP_BOUNDS_MARGIN.lat,
  ],
];

export const REUNION_HOME_MIN_ZOOM = 8.45;

export const REUNION_HOME_INITIAL_VIEW = {
  longitude: 55.45,
  latitude: -21.15,
  zoom: 8.6,
  pitch: 0,
  bearing: 0,
} as const;

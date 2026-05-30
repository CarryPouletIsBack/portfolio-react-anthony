import { useCallback, useRef, useState } from 'react';
import Map, {
  AttributionControl,
  Layer,
  NavigationControl,
  Source,
  type MapRef,
} from 'react-map-gl/mapbox';
import type { Map as MapboxMap } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import {
  REUNION_HOME_INITIAL_VIEW,
  REUNION_HOME_MIN_ZOOM,
  REUNION_MAP_MAX_BOUNDS,
} from '../../constants/reunionIsland';
import trailFeatureData from '../../data/utoi/ultra-terrestre-224.geo.json';
import {
  getKalderaMapboxToken,
  KALDERA_MAP_MAX_PITCH,
  KALDERA_MAP_MAX_ZOOM,
  KALDERA_MAP_MIN_ZOOM,
  KALDERA_MAP_PITCH,
  KALDERA_MAPBOX_DEM_SOURCE,
  KALDERA_MAPBOX_STYLE,
  KALDERA_TERRAIN_EXAGGERATION,
} from './kalderaMapConfig';
import './UtoidCoverMap.css';

const CAMERA_ANIM_MS = 720;
const TRAIL_COLOR = '#f97316';
const TRAIL_CASING_COLOR = 'rgba(255, 255, 255, 0.9)';

type TrailFeature = {
  type: 'Feature';
  geometry: { type: 'LineString'; coordinates: [number, number][] };
  properties?: Record<string, unknown>;
};

const trailFeature = trailFeatureData as TrailFeature;
const mapboxToken = getKalderaMapboxToken();

function bboxFromCoords(coords: [number, number][]): [[number, number], [number, number]] | null {
  if (coords.length < 2) return null;
  let minLng = Infinity;
  let minLat = Infinity;
  let maxLng = -Infinity;
  let maxLat = -Infinity;
  for (const [lng, lat] of coords) {
    minLng = Math.min(minLng, lng);
    maxLng = Math.max(maxLng, lng);
    minLat = Math.min(minLat, lat);
    maxLat = Math.max(maxLat, lat);
  }
  if (!Number.isFinite(minLng)) return null;
  return [
    [minLng, minLat],
    [maxLng, maxLat],
  ];
}

function applyKaldera3DEnvironment(map: MapboxMap) {
  if (!map.getSource(KALDERA_MAPBOX_DEM_SOURCE)) {
    map.addSource(KALDERA_MAPBOX_DEM_SOURCE, {
      type: 'raster-dem',
      url: 'mapbox://mapbox.mapbox-terrain-dem',
      tileSize: 512,
      maxzoom: 14,
    });
  }
  map.setTerrain({
    source: KALDERA_MAPBOX_DEM_SOURCE,
    exaggeration: KALDERA_TERRAIN_EXAGGERATION,
  });
}

const UtoidCoverMap = () => {
  const mapRef = useRef<MapRef>(null);
  const entranceDoneRef = useRef(false);
  const userCameraLockedRef = useRef(false);
  const [userCameraLocked, setUserCameraLocked] = useState(false);

  const fitTrailBounds = useCallback((map: MapboxMap) => {
    const coords = trailFeature.geometry?.coordinates;
    if (!coords || coords.length < 2) return;
    const bounds = bboxFromCoords(coords as [number, number][]);
    if (!bounds) return;
    map.fitBounds(bounds, {
      padding: 72,
      duration: CAMERA_ANIM_MS,
      maxZoom: KALDERA_MAP_MAX_ZOOM,
      essential: true,
    });
  }, []);

  const runEntranceAnimation = useCallback(
    (map: MapboxMap) => {
      if (entranceDoneRef.current) return;
      entranceDoneRef.current = true;

      map.jumpTo({
        center: [REUNION_HOME_INITIAL_VIEW.longitude, REUNION_HOME_INITIAL_VIEW.latitude],
        zoom: REUNION_HOME_INITIAL_VIEW.zoom,
        pitch: 0,
        bearing: 0,
      });

      window.setTimeout(() => {
        try {
          applyKaldera3DEnvironment(map);
        } catch {
          /* relief optionnel */
        }
        map.easeTo({
          pitch: KALDERA_MAP_PITCH,
          duration: 520,
          essential: true,
        });
        window.setTimeout(() => {
          if (!userCameraLockedRef.current) fitTrailBounds(map);
        }, 560);
      }, 400);
    },
    [fitTrailBounds]
  );

  const handleMapLoad = useCallback(() => {
    const map = mapRef.current?.getMap();
    if (!map) return;
    const start = () => runEntranceAnimation(map);
    if (map.isStyleLoaded()) start();
    else map.once('style.load', start);
  }, [runEntranceAnimation]);

  const handleRecenter = useCallback(() => {
    const map = mapRef.current?.getMap();
    if (!map) return;
    userCameraLockedRef.current = false;
    setUserCameraLocked(false);
    try {
      map.stop();
    } catch {
      /* ignore */
    }
    fitTrailBounds(map);
  }, [fitTrailBounds]);

  const markUserInteraction = useCallback(() => {
    userCameraLockedRef.current = true;
    setUserCameraLocked(true);
  }, []);

  if (!mapboxToken) {
    return (
      <div className="utoi-cover-map utoi-cover-map--missing-token">
        <p>Carte Kaldera : définir <code>VITE_MAPBOX_ACCESS_TOKEN</code> dans <code>.env</code>.</p>
      </div>
    );
  }

  return (
    <div className="utoi-cover-map">
      <Map
        ref={mapRef}
        mapboxAccessToken={mapboxToken}
        initialViewState={REUNION_HOME_INITIAL_VIEW}
        mapStyle={KALDERA_MAPBOX_STYLE}
        style={{ width: '100%', height: '100%' }}
        minZoom={Math.max(REUNION_HOME_MIN_ZOOM, KALDERA_MAP_MIN_ZOOM)}
        maxZoom={KALDERA_MAP_MAX_ZOOM}
        maxBounds={REUNION_MAP_MAX_BOUNDS}
        maxPitch={KALDERA_MAP_MAX_PITCH}
        renderWorldCopies={false}
        antialias
        attributionControl={false}
        onLoad={handleMapLoad}
        onMoveEnd={(e) => {
          if (e.originalEvent) markUserInteraction();
        }}
        onZoomEnd={(e) => {
          if (e.originalEvent) markUserInteraction();
        }}
        onDragEnd={(e) => {
          if (e.originalEvent) markUserInteraction();
        }}
        cursor="grab"
      >
        <Source id="utoi-trail" type="geojson" data={trailFeature}>
          <Layer
            id="utoi-trail-casing"
            type="line"
            layout={{ 'line-join': 'round', 'line-cap': 'round' }}
            paint={{
              'line-color': TRAIL_CASING_COLOR,
              'line-width': 6,
              'line-opacity': 0.95,
            }}
          />
          <Layer
            id="utoi-trail-line"
            type="line"
            layout={{ 'line-join': 'round', 'line-cap': 'round' }}
            paint={{
              'line-color': TRAIL_COLOR,
              'line-width': 4.5,
              'line-opacity': 1,
            }}
          />
        </Source>
        <NavigationControl position="bottom-right" showCompass visualizePitch />
        <AttributionControl compact />
      </Map>
      {userCameraLocked ? (
        <button
          type="button"
          className="utoi-cover-map__recenter"
          onClick={handleRecenter}
          aria-label="Recentrer sur le parcours"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            <circle cx="12" cy="12" r="3" />
          </svg>
          Parcours
        </button>
      ) : null}
    </div>
  );
};

export default UtoidCoverMap;

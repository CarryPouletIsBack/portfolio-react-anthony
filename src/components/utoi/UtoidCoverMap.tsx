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
import { REUNION_HOME_MIN_ZOOM, REUNION_MAP_MAX_BOUNDS } from '../../constants/reunionIsland';
import trailFeatureData from '../../data/utoi/ultra-terrestre-224.geo.json';
import { applyKalderaMapEnvironment } from './applyKalderaMapEnvironment';
import {
  getKalderaMapboxToken,
  KALDERA_MAP_MAX_PITCH,
  KALDERA_MAP_MAX_ZOOM,
  KALDERA_MAP_MIN_ZOOM,
  KALDERA_MAPBOX_STYLE,
  KALDERA_TRAIL_COLOR,
  KALDERA_TRAIL_OUTLINE_COLOR,
  KALDERA_TRAIL_OUTLINE_WIDTH,
  KALDERA_TRAIL_WIDTH,
  MAFATE_CIRQUE_BOUNDS,
  MAFATE_CIRQUE_FIT,
} from './kalderaMapConfig';
import './UtoidCoverMap.css';

type TrailFeature = {
  type: 'Feature';
  geometry: { type: 'LineString'; coordinates: [number, number][] };
  properties?: Record<string, unknown>;
};

const trailFeature = trailFeatureData as TrailFeature;
const mapboxToken = getKalderaMapboxToken();

function fitMafateCirqueView(map: MapboxMap) {
  map.fitBounds(MAFATE_CIRQUE_BOUNDS, {
    padding: MAFATE_CIRQUE_FIT.padding,
    maxZoom: MAFATE_CIRQUE_FIT.maxZoom,
    pitch: MAFATE_CIRQUE_FIT.pitch,
    bearing: MAFATE_CIRQUE_FIT.bearing,
    duration: 0,
    essential: true,
  });
}

const UtoidCoverMap = () => {
  const mapRef = useRef<MapRef>(null);
  const userCameraLockedRef = useRef(false);
  const [userCameraLocked, setUserCameraLocked] = useState(false);

  const handleMapLoad = useCallback(() => {
    const map = mapRef.current?.getMap();
    if (!map) return;

    const setup = () => {
      try {
        applyKalderaMapEnvironment(map);
      } catch {
        /* style pas prêt */
      }
      fitMafateCirqueView(map);
    };

    if (map.isStyleLoaded()) setup();
    else map.once('style.load', setup);
  }, []);

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
    fitMafateCirqueView(map);
  }, []);

  const markUserInteraction = useCallback(() => {
    userCameraLockedRef.current = true;
    setUserCameraLocked(true);
  }, []);

  if (!mapboxToken) {
    return (
      <div className="utoi-cover-map utoi-cover-map--missing-token">
        <p>
          Carte Kaldera : définir <code>VITE_MAPBOX_ACCESS_TOKEN</code> dans <code>.env</code>.
        </p>
      </div>
    );
  }

  return (
    <div className="utoi-cover-map">
      <Map
        ref={mapRef}
        mapboxAccessToken={mapboxToken}
        initialViewState={{
          longitude: 55.415,
          latitude: -21.085,
          zoom: MAFATE_CIRQUE_FIT.maxZoom,
          pitch: MAFATE_CIRQUE_FIT.pitch,
          bearing: MAFATE_CIRQUE_FIT.bearing,
        }}
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
            id="utoi-trail-outline"
            type="line"
            layout={{ 'line-join': 'round', 'line-cap': 'round' }}
            paint={{
              'line-color': KALDERA_TRAIL_OUTLINE_COLOR,
              'line-width': KALDERA_TRAIL_OUTLINE_WIDTH,
            }}
          />
          <Layer
            id="utoi-trail-line"
            type="line"
            layout={{ 'line-join': 'round', 'line-cap': 'round' }}
            paint={{
              'line-color': KALDERA_TRAIL_COLOR,
              'line-width': KALDERA_TRAIL_WIDTH,
            }}
          />
        </Source>
        <NavigationControl position="bottom-left" showCompass visualizePitch />
        <AttributionControl compact />
      </Map>
      {userCameraLocked ? (
        <button
          type="button"
          className="utoi-cover-map__recenter"
          onClick={handleRecenter}
          aria-label="Recentrer sur le cirque de Mafate"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            <circle cx="12" cy="12" r="3" />
          </svg>
          Mafate
        </button>
      ) : null}
    </div>
  );
};

export default UtoidCoverMap;

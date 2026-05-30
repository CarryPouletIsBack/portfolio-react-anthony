import { useCallback, useRef } from 'react';
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
  SALAZES_ILET_BOUNDS,
  SALAZES_ILET_CENTER,
  SALAZES_ILET_FIT,
} from './kalderaMapConfig';
import './UtoidCoverMap.css';

type TrailFeature = {
  type: 'Feature';
  geometry: { type: 'LineString'; coordinates: [number, number][] };
  properties?: Record<string, unknown>;
};

const trailFeature = trailFeatureData as TrailFeature;
const mapboxToken = getKalderaMapboxToken();

function fitSalazesIletView(map: MapboxMap) {
  map.fitBounds(SALAZES_ILET_BOUNDS, {
    padding: SALAZES_ILET_FIT.padding,
    maxZoom: SALAZES_ILET_FIT.maxZoom,
    pitch: SALAZES_ILET_FIT.pitch,
    bearing: SALAZES_ILET_FIT.bearing,
    duration: 0,
    essential: true,
  });
}

const UtoidCoverMap = () => {
  const mapRef = useRef<MapRef>(null);

  const handleMapLoad = useCallback(() => {
    const map = mapRef.current?.getMap();
    if (!map) return;

    const setup = () => {
      try {
        applyKalderaMapEnvironment(map);
      } catch {
        /* style pas prêt */
      }
      fitSalazesIletView(map);
    };

    if (map.isStyleLoaded()) setup();
    else map.once('style.load', setup);
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
          longitude: SALAZES_ILET_CENTER.longitude,
          latitude: SALAZES_ILET_CENTER.latitude,
          zoom: SALAZES_ILET_FIT.maxZoom,
          pitch: SALAZES_ILET_FIT.pitch,
          bearing: SALAZES_ILET_FIT.bearing,
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
    </div>
  );
};

export default UtoidCoverMap;

import { useEffect } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, CircleMarker, useMap } from 'react-leaflet';
import L from 'leaflet';

// Fix default icon issue with Vite bundling
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({ iconUrl: '', shadowUrl: '', iconRetinaUrl: '' });

const CARTO_TILES = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';
const CARTO_ATTR = '&copy; <a href="https://openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>';

// Custom teardrop pin icon using divIcon
export function makePin(color, size = 28) {
  return L.divIcon({
    className: '',
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size],
    html: `<svg width="${size}" height="${size + 6}" viewBox="0 0 28 34" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 0C6.268 0 0 6.268 0 14C0 21.732 14 34 14 34C14 34 28 21.732 28 14C28 6.268 21.732 0 14 0Z" fill="${color}" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.25))"/>
      <circle cx="14" cy="13" r="5.5" fill="white" opacity="0.9"/>
    </svg>`,
  });
}

export const copperPin = makePin('#C2773A');
export const mossPin   = makePin('#7A9E8A');
export const bluePin   = makePin('#4A90E2', 22);

// Auto-fit to bounds helper
function FitBounds({ positions }) {
  const map = useMap();
  useEffect(() => {
    if (positions && positions.length > 1) {
      map.fitBounds(L.latLngBounds(positions), { padding: [32, 32] });
    }
  }, [map, positions]);
  return null;
}

// Base map wrapper — children are Leaflet layers
export default function RailMap({
  center,
  zoom = 10,
  style,
  children,
  fitPositions,
  zoomControl = false,
}) {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      zoomControl={zoomControl}
      scrollWheelZoom={false}
      style={{ width: '100%', height: '100%', ...style }}
    >
      <TileLayer url={CARTO_TILES} attribution={CARTO_ATTR} maxZoom={19} />
      {fitPositions && <FitBounds positions={fitPositions} />}
      {children}
    </MapContainer>
  );
}

export { Polyline, Marker, CircleMarker };

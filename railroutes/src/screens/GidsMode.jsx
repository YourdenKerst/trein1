import { useState } from 'react';
import RailMap, { Polyline, Marker, copperPin, mossPin } from '../components/RailMap';
import { guidePinsMap, routes } from '../data/mapData';
import { ChevronLeft, Play, MapPin } from 'lucide-react';

export default function GidsMode({ onBack, activeRoute }) {
  const route = activeRoute || routes[0];
  const pins = guidePinsMap[route.id] || guidePinsMap[routes[0].id];
  const walkingRoute = pins.map(p => p.coords);

  const [activePin, setActivePin] = useState(pins[0]);
  const [playing, setPlaying] = useState(false);

  // Reset activePin when route changes
  const currentPins = guidePinsMap[route.id] || guidePinsMap[routes[0].id];
  if (activePin && !currentPins.find(p => p.id === activePin.id)) {
    setActivePin(currentPins[0]);
  }

  return (
    <div className="screen" style={{ background: 'var(--parchment)', position: 'relative' }}>
      {/* Header overlay */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 1000, pointerEvents: 'none' }}>
        {/* status bar space */}
        <div style={{ height: 44, background: 'linear-gradient(180deg, rgba(245,237,227,0.97) 0%, rgba(245,237,227,0.9) 80%, transparent 100%)', pointerEvents: 'auto' }}>
          <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px' }}>
            <span style={{ fontFamily: 'DM Sans', fontWeight: 500, fontSize: 15, color: 'var(--dark-text)' }}>9:41</span>
            <div style={{ display: 'flex', gap: 5, alignItems: 'center', fontSize: 12, color: 'var(--dark-text)' }}>
              <svg width="17" height="12" viewBox="0 0 17 12" fill="currentColor">
                <rect x="0" y="3" width="3" height="9" rx="1" opacity="0.4"/>
                <rect x="4.5" y="2" width="3" height="10" rx="1" opacity="0.6"/>
                <rect x="9" y="0" width="3" height="12" rx="1"/>
                <rect x="13.5" y="0" width="3" height="12" rx="1"/>
              </svg>
            </div>
          </div>
        </div>
        <div style={{ padding: '4px 16px 12px', background: 'linear-gradient(180deg, rgba(245,237,227,0.95) 0%, rgba(245,237,227,0.75) 70%, transparent 100%)', pointerEvents: 'auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--light-text)', fontFamily: 'DM Sans', fontSize: 14 }}>
              <ChevronLeft size={18} />
            </button>
            <div>
              <p className="label" style={{ marginBottom: 1 }}>GIDS · {route.region.toUpperCase()}</p>
              <h2 className="section-title" style={{ fontSize: 19 }}>Je bent in {route.guideCity}</h2>
            </div>
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(74,124,94,0.12)', border: '1px solid rgba(74,124,94,0.25)', borderRadius: 100, padding: '5px 10px' }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#4A7C5E', boxShadow: '0 0 0 2px rgba(74,124,94,0.3)' }} />
              <span style={{ fontFamily: 'DM Sans', fontSize: 11, color: '#4A7C5E', fontWeight: 500 }}>Live</span>
            </div>
          </div>
        </div>
      </div>

      {/* Full-screen map */}
      <div style={{ flex: 1, position: 'relative' }}>
        <RailMap key={route.id} center={route.guideCenter} zoom={route.guideZoom} zoomControl={false}>
          {/* Walking route */}
          <Polyline
            positions={walkingRoute}
            pathOptions={{ color: route.color || '#C2773A', weight: 3.5, opacity: 0.8, dashArray: '8 6', lineCap: 'round', lineJoin: 'round' }}
          />
          {/* Pins */}
          {currentPins.map(pin => (
            <Marker
              key={pin.id}
              position={pin.coords}
              icon={pin.type === 'moss' ? mossPin : copperPin}
              eventHandlers={{ click: () => setActivePin(pin) }}
            />
          ))}
        </RailMap>

        {/* Legend */}
        <div style={{ position: 'absolute', top: 140, right: 12, background: 'rgba(255,255,255,0.92)', borderRadius: 10, padding: '10px 12px', zIndex: 1000, border: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--copper)' }} />
              <span className="caption" style={{ fontSize: 10 }}>Highlight</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--moss)' }} />
              <span className="caption" style={{ fontSize: 10 }}>Obscuur plekje</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom sheet */}
      <div className="slide-up" style={{ background: 'white', borderRadius: '22px 22px 0 0', padding: '0 0 16px', boxShadow: '0 -4px 20px rgba(0,0,0,0.1)', flexShrink: 0, maxHeight: 240 }}>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '10px 0 4px' }}>
          <div style={{ width: 36, height: 4, borderRadius: 10, background: 'var(--border)' }} />
        </div>
        <div style={{ padding: '0 16px' }}>
          {activePin && (
            <>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 8 }}>
                <div style={{ flex: 1 }}>
                  {activePin.obscure && (
                    <div style={{ marginBottom: 6 }}>
                      <span className="badge badge-moss">Lokale tip</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                    <MapPin size={12} color={activePin.type === 'moss' ? 'var(--moss)' : (route.color || 'var(--copper)')} />
                    <span className="label" style={{ color: activePin.type === 'moss' ? 'var(--success)' : (route.color || 'var(--copper)') }}>
                      {currentPins.indexOf(activePin) + 1} van {currentPins.length}
                    </span>
                  </div>
                  <h3 className="card-title" style={{ fontSize: 17 }}>{activePin.label}</h3>
                </div>
                <button style={{ width: 38, height: 38, borderRadius: '50%', background: route.color || 'var(--copper)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
                  onClick={() => setPlaying(p => !p)}>
                  <Play size={14} fill="white" color="white" />
                </button>
              </div>
              <p className="body-text" style={{ fontSize: 13, marginBottom: 12, lineHeight: 1.55 }}>{activePin.desc}</p>
              {playing && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: `${route.color || '#C2773A'}12`, borderRadius: 10, padding: '8px 12px' }}>
                  <div style={{ flex: 1, height: 3, background: 'var(--border)', borderRadius: 10 }}>
                    <div style={{ width: '42%', height: '100%', background: route.color || 'var(--copper)', borderRadius: 10 }} />
                  </div>
                  <span className="caption">0:52 / 1:28</span>
                </div>
              )}
              {/* Pagination dots */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 10 }}>
                {currentPins.map(p => (
                  <div key={p.id} onClick={() => setActivePin(p)} style={{ width: activePin.id === p.id ? 18 : 6, height: 6, borderRadius: 10, background: activePin.id === p.id ? (route.color || 'var(--copper)') : 'var(--border)', transition: 'all 0.2s', cursor: 'pointer' }} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

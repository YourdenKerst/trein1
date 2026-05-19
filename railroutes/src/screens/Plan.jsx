import { useState } from 'react';
import { ArrowLeftRight, ChevronLeft, Moon, Sun, Train, Clock, Zap, ChevronDown, ChevronUp } from 'lucide-react';
import StatusBar from '../components/StatusBar';
import LocationImage from '../components/LocationImage';
import RailMap, { Polyline, CircleMarker } from '../components/RailMap';
import { findCity, generateRoutes } from '../utils/routeEngine';

const QUICK = [
  { from: 'Amsterdam', to: 'Parijs' },
  { from: 'Amsterdam', to: 'Rome' },
  { from: 'Amsterdam', to: 'Barcelona' },
  { from: 'Berlijn', to: 'Venetië' },
  { from: 'Amsterdam', to: 'Wenen' },
];

export default function Plan() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [phase, setPhase] = useState('search');
  const [routes, setRoutes] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [expandedStop, setExpandedStop] = useState(null);
  const [stopMode, setStopMode] = useState({});
  const [error, setError] = useState(null);

  const handleSearch = () => {
    const fc = findCity(from);
    const tc = findCity(to);
    if (!fc || !tc) {
      setError('Stad niet herkend. Probeer bijv. Amsterdam, Parijs of Rome.');
      return;
    }
    if (fc.id === tc.id) {
      setError('Kies twee verschillende steden.');
      return;
    }
    setError(null);
    const r = generateRoutes(fc, tc);
    setRoutes(r);
    setSelectedId(r[0].id);
    setPhase('results');
    setExpandedStop(null);
    setStopMode({});
  };

  const reset = () => {
    setPhase('search');
    setRoutes([]);
    setSelectedId(null);
    setError(null);
    setExpandedStop(null);
  };

  const selectedRoute = routes.find(r => r.id === selectedId) || null;
  const allPoints = routes.flatMap(r => r.coords);
  const fromCoords = routes[0]?.coords[0];
  const toCoords = routes[0] ? routes[0].coords[routes[0].coords.length - 1] : null;

  return (
    <div className="screen" style={{ background: '#f2f2f2' }}>
      {/* Header */}
      <div style={{ background: 'var(--color-base)', flexShrink: 0 }}>
        <StatusBar dark />
        <div style={{ padding: '0 16px 14px' }}>
          {phase === 'results' && (
            <button onClick={reset} style={{
              display: 'flex', alignItems: 'center', gap: 5,
              background: 'rgba(255,255,255,0.08)', border: 'none', borderRadius: 100,
              padding: '4px 10px 4px 7px', color: 'rgba(255,255,255,0.7)',
              cursor: 'pointer', marginBottom: 8, fontFamily: 'var(--font-body)', fontSize: 12,
            }}>
              <ChevronLeft size={14} /> Terug
            </button>
          )}
          <p style={{ fontSize: 9, fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(20,163,114,0.65)', marginBottom: 4, fontFamily: 'var(--font-body)' }}>
            INTERRAIL
          </p>
          {phase === 'search' ? (
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 800, color: 'white', letterSpacing: '-0.5px' }}>
              Plan je reis
            </h1>
          ) : (
            <div>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: 'white', letterSpacing: '-0.3px' }}>
                {from} → {to}
              </h1>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'rgba(255,255,255,0.38)', marginTop: 2 }}>
                {routes.length} routes beschikbaar
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ── SEARCH ── */}
      {phase === 'search' && (
        <div className="screen-scroll">
          <div style={{ padding: '18px 16px' }}>
            {/* Input card */}
            <div style={{ background: 'white', borderRadius: 10, border: '1px solid rgba(0,0,0,0.07)', marginBottom: 14, position: 'relative' }}>
              <div style={{ padding: '11px 14px 9px', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                <p style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-secondary)', marginBottom: 4, fontFamily: 'var(--font-body)' }}>VAN</p>
                <input
                  value={from}
                  onChange={e => { setFrom(e.target.value); setError(null); }}
                  onKeyDown={e => e.key === 'Enter' && handleSearch()}
                  placeholder="Vertrekstad…"
                  autoComplete="off"
                  style={{ width: '100%', border: 'none', background: 'transparent', fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 700, color: '#111', outline: 'none', letterSpacing: '-0.2px', paddingRight: 36 }}
                />
              </div>
              {/* Swap */}
              <button onClick={() => { setFrom(to); setTo(from); }} style={{
                position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                width: 26, height: 26, borderRadius: '50%', background: 'var(--color-base)',
                border: '2px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: 'white', zIndex: 1, boxShadow: '0 1px 4px rgba(0,0,0,0.18)',
              }}>
                <ArrowLeftRight size={10} />
              </button>
              <div style={{ padding: '11px 14px 9px' }}>
                <p style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-secondary)', marginBottom: 4, fontFamily: 'var(--font-body)' }}>NAAR</p>
                <input
                  value={to}
                  onChange={e => { setTo(e.target.value); setError(null); }}
                  onKeyDown={e => e.key === 'Enter' && handleSearch()}
                  placeholder="Bestemming…"
                  autoComplete="off"
                  style={{ width: '100%', border: 'none', background: 'transparent', fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 700, color: '#111', outline: 'none', letterSpacing: '-0.2px', paddingRight: 36 }}
                />
              </div>
            </div>

            {error && (
              <p style={{ fontSize: 12, color: 'var(--color-accent)', marginBottom: 10, fontFamily: 'var(--font-body)' }}>{error}</p>
            )}

            <button onClick={handleSearch} style={{
              width: '100%', padding: '12px', borderRadius: 8,
              background: (from.trim() && to.trim()) ? 'var(--color-accent)' : '#d0d0d0',
              color: 'white', border: 'none', cursor: 'pointer',
              fontFamily: 'var(--font-display)', fontSize: 11, fontWeight: 600,
              letterSpacing: '0.08em', textTransform: 'uppercase',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
              marginBottom: 24, transition: 'background 0.2s',
            }}>
              <Train size={13} /> Zoek routes
            </button>

            <p style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#aaa', marginBottom: 8, fontFamily: 'var(--font-body)' }}>
              POPULAIR
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              {QUICK.map((r, i) => (
                <button key={i} onClick={() => { setFrom(r.from); setTo(r.to); setError(null); }} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '10px 12px', background: 'white', border: '1px solid rgba(0,0,0,0.06)',
                  borderRadius: 8, cursor: 'pointer', textAlign: 'left',
                }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 600, color: '#111', letterSpacing: '-0.1px' }}>
                    {r.from} <span style={{ color: '#ccc', fontWeight: 400 }}>→</span> {r.to}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── RESULTS ── */}
      {phase === 'results' && allPoints.length > 0 && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

          {/* Map */}
          <div style={{ height: 220, flexShrink: 0, position: 'relative' }}>
            <RailMap key={`${from}-${to}`} center={[50, 10]} zoom={5} fitPositions={allPoints} zoomControl={false}>
              {routes.filter(r => r.id !== selectedId).map(r => (
                <Polyline key={r.id} positions={r.coords}
                  pathOptions={{ color: r.colorRaw, weight: 3, opacity: 0.25, lineCap: 'round' }}
                  eventHandlers={{ click: () => setSelectedId(r.id) }}
                />
              ))}
              {selectedRoute && (
                <Polyline key={selectedId + '-sel'} positions={selectedRoute.coords}
                  pathOptions={{ color: selectedRoute.colorRaw, weight: 5, opacity: 1, lineCap: 'round' }}
                />
              )}
              {fromCoords && (
                <CircleMarker center={fromCoords} radius={6}
                  pathOptions={{ fillColor: '#0a3d2e', color: 'white', weight: 2, fillOpacity: 1 }} />
              )}
              {toCoords && (
                <CircleMarker center={toCoords} radius={6}
                  pathOptions={{ fillColor: '#e8412a', color: 'white', weight: 2, fillOpacity: 1 }} />
              )}
            </RailMap>

            {/* Legend */}
            <div style={{ position: 'absolute', top: 8, right: 8, zIndex: 1000, display: 'flex', flexDirection: 'column', gap: 4 }}>
              {routes.map(r => (
                <button key={r.id} onClick={() => setSelectedId(r.id)} style={{
                  display: 'flex', alignItems: 'center', gap: 5,
                  background: selectedId === r.id ? 'rgba(255,255,255,0.98)' : 'rgba(255,255,255,0.8)',
                  borderRadius: 5, padding: '3px 8px 3px 5px',
                  border: `1px solid ${selectedId === r.id ? r.colorRaw : 'rgba(0,0,0,0.09)'}`,
                  cursor: 'pointer',
                }}>
                  <div style={{ width: 14, height: selectedId === r.id ? 3 : 2, background: r.colorRaw, borderRadius: 2 }} />
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: selectedId === r.id ? 600 : 400, color: selectedId === r.id ? r.colorRaw : '#555' }}>
                    {r.label}
                  </span>
                </button>
              ))}
            </div>

            {/* City chips */}
            <div style={{ position: 'absolute', bottom: 7, left: 8, zIndex: 1000, display: 'flex', gap: 5 }}>
              <span style={{ background: 'rgba(10,61,46,0.88)', color: 'white', fontSize: 9, fontWeight: 600, padding: '2px 6px', borderRadius: 3, fontFamily: 'var(--font-body)', letterSpacing: '0.05em' }}>
                {from.toUpperCase()}
              </span>
              <span style={{ background: 'rgba(232,65,42,0.88)', color: 'white', fontSize: 9, fontWeight: 600, padding: '2px 6px', borderRadius: 3, fontFamily: 'var(--font-body)', letterSpacing: '0.05em' }}>
                {to.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Bottom sheet */}
          <div style={{ flex: 1, background: 'white', borderRadius: '14px 14px 0 0', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 -2px 10px rgba(0,0,0,0.06)' }}>
            <div style={{ display: 'flex', justifyContent: 'center', padding: '9px 0 0', flexShrink: 0 }}>
              <div style={{ width: 28, height: 3, borderRadius: 10, background: '#e8e8e8' }} />
            </div>

            {/* Route tabs */}
            <div style={{ display: 'flex', gap: 5, padding: '8px 12px 10px', flexShrink: 0 }}>
              {routes.map(r => (
                <button key={r.id} onClick={() => setSelectedId(r.id)} style={{
                  flex: 1, padding: '7px 4px', borderRadius: 5,
                  border: `1px solid ${selectedId === r.id ? r.colorRaw : '#e8e8e8'}`,
                  background: selectedId === r.id ? `${r.colorRaw}0f` : 'transparent',
                  color: selectedId === r.id ? r.colorRaw : '#bbb',
                  fontFamily: 'var(--font-display)', fontSize: 10, fontWeight: 600,
                  cursor: 'pointer', transition: 'all 0.12s',
                }}>
                  {r.label}
                </button>
              ))}
            </div>

            {/* Route detail */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '0 12px 28px' }}>
              {!selectedRoute ? (
                <p style={{ textAlign: 'center', color: '#ccc', fontSize: 13, paddingTop: 24, fontFamily: 'var(--font-body)' }}>
                  Selecteer een route
                </p>
              ) : !selectedRoute.isScenic ? (
                <DirectDetail route={selectedRoute} from={from} to={to} />
              ) : (
                <ScenicDetail
                  route={selectedRoute}
                  expandedStop={expandedStop}
                  onToggle={key => setExpandedStop(p => p === key ? null : key)}
                  stopMode={stopMode}
                  onSetMode={(key, mode) => setStopMode(m => ({ ...m, [key]: mode }))}
                  from={from}
                  to={to}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Direct route detail ──────────────────────────────────────────────────────
function DirectDetail({ route, from, to }) {
  const stops = [from, ...route.intermediateStops, to];
  return (
    <div>
      <div style={{ display: 'flex', gap: 12, marginBottom: 14 }}>
        <Chip icon={<Clock size={10} color="#999" />} label={route.duration} />
        <Chip icon={<Train size={10} color="#999" />} label={`${route.transfers} overstap${route.transfers !== 1 ? 'pen' : ''}`} />
        <Chip icon={<Zap size={10} color={route.colorRaw} />} label="Snelste" accent={route.colorRaw} />
      </div>

      {/* Stop chain */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 4, marginBottom: 18, padding: '10px 12px', background: '#fafafa', borderRadius: 8, border: '1px solid #f0f0f0' }}>
        {stops.map((s, i) => (
          <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{
              fontSize: 12, fontFamily: 'var(--font-display)',
              fontWeight: i === 0 || i === stops.length - 1 ? 700 : 400,
              color: i === 0 ? '#0a3d2e' : i === stops.length - 1 ? '#e8412a' : '#666',
            }}>{s}</span>
            {i < stops.length - 1 && <span style={{ color: '#ddd', fontSize: 10 }}>›</span>}
          </span>
        ))}
      </div>

      <SelectBtn color={route.colorRaw} />
    </div>
  );
}

// ─── Scenic route detail ──────────────────────────────────────────────────────
function ScenicDetail({ route, expandedStop, onToggle, stopMode, onSetMode, from, to }) {
  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
        <div>
          <p style={{ fontSize: 11, color: '#888', fontFamily: 'var(--font-body)', marginBottom: 3 }}>{route.theme}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 3 }}>
            <CityLabel label={from} />
            {route.waypoints.map((s, i) => (
              <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <span style={{ color: '#ddd', fontSize: 9 }}>›</span>
                <CityLabel label={s.label} color={s.overnight ? route.colorRaw : undefined} />
                {s.overnight && <span style={{ fontSize: 9 }}>🌙</span>}
              </span>
            ))}
            <span style={{ color: '#ddd', fontSize: 9 }}>›</span>
            <CityLabel label={to} />
          </div>
        </div>
        <span style={{ fontSize: 10, color: route.colorRaw, fontWeight: 600, fontFamily: 'var(--font-body)', flexShrink: 0, background: `${route.colorRaw}0f`, padding: '3px 7px', borderRadius: 4 }}>
          {route.extraTime}
        </span>
      </div>

      {/* Waypoints */}
      {route.waypoints.map((stop, i) => {
        const key = `${route.id}-${i}`;
        const isExp = expandedStop === key;
        const mode = stopMode[key] || 'nacht';
        return (
          <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', paddingBottom: 10 }}>
            {/* Timeline dot */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 12, flexShrink: 0, paddingTop: 4 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: stop.overnight ? route.colorRaw : '#ddd', flexShrink: 0 }} />
              {i < route.waypoints.length - 1 && (
                <div style={{ width: 1, flex: 1, minHeight: 18, background: '#ececec', marginTop: 3 }} />
              )}
            </div>

            {/* Content */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 3 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#111', fontFamily: 'var(--font-display)' }}>{stop.label}</span>
                    <span style={{ fontSize: 12 }}>{stop.flag}</span>
                  </div>
                  <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', background: `${route.colorRaw}0f`, color: route.colorRaw, borderRadius: 3, padding: '1px 5px', fontFamily: 'var(--font-body)' }}>
                    {stop.tag}
                  </span>
                </div>
                {stop.overnight && (
                  <button onClick={() => onToggle(key)} style={{
                    display: 'flex', alignItems: 'center', gap: 3,
                    background: isExp ? route.colorRaw : `${route.colorRaw}0f`,
                    color: isExp ? 'white' : route.colorRaw,
                    border: 'none', borderRadius: 5, padding: '5px 8px',
                    cursor: 'pointer', fontSize: 10, fontWeight: 500,
                    fontFamily: 'var(--font-body)', flexShrink: 0,
                  }}>
                    <Moon size={9} /> Stop {isExp ? <ChevronUp size={9} /> : <ChevronDown size={9} />}
                  </button>
                )}
              </div>

              {/* Expanded overnight card */}
              {stop.overnight && isExp && (
                <div style={{ marginTop: 8, background: '#fafafa', borderRadius: 8, border: '1px solid #efefef', overflow: 'hidden' }}>
                  <LocationImage wikiTitle={stop.wikiTitle} height={75} style={{ borderRadius: 0 }} />
                  <div style={{ padding: '10px 12px' }}>
                    <p style={{ fontSize: 12, lineHeight: 1.6, color: '#666', marginBottom: 10, fontFamily: 'var(--font-body)' }}>
                      {stop.overnightDesc}
                    </p>
                    <div style={{ display: 'flex', background: '#f0f0f0', borderRadius: 5, padding: 2, gap: 2, marginBottom: 10 }}>
                      {['dag', 'nacht'].map(m => (
                        <button key={m} onClick={() => onSetMode(key, m)} style={{
                          flex: 1, padding: '6px', borderRadius: 4,
                          background: mode === m ? route.colorRaw : 'transparent',
                          color: mode === m ? 'white' : '#888',
                          border: 'none', cursor: 'pointer',
                          fontSize: 11, fontWeight: 500, fontFamily: 'var(--font-body)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3,
                        }}>
                          {m === 'dag' ? <Sun size={9} /> : <Moon size={9} />}
                          {m === 'dag' ? 'Dagstop' : 'Overnacht'}
                        </button>
                      ))}
                    </div>
                    <button style={{ width: '100%', padding: '9px', borderRadius: 6, background: route.colorRaw, color: 'white', border: 'none', fontSize: 10, fontWeight: 600, fontFamily: 'var(--font-display)', letterSpacing: '0.06em', textTransform: 'uppercase', cursor: 'pointer' }}>
                      Toevoegen
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}

      <SelectBtn color={route.colorRaw} />
    </div>
  );
}

// ─── Micro components ─────────────────────────────────────────────────────────
function Chip({ icon, label, accent }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      {icon}
      <span style={{ fontSize: 11, color: accent || '#666', fontFamily: 'var(--font-body)', fontWeight: accent ? 500 : 400 }}>
        {label}
      </span>
    </div>
  );
}

function CityLabel({ label, color }) {
  return (
    <span style={{ fontSize: 10, fontWeight: color ? 700 : 500, color: color || '#444', fontFamily: 'var(--font-display)' }}>
      {label}
    </span>
  );
}

function SelectBtn({ color }) {
  return (
    <button style={{ width: '100%', padding: '11px', borderRadius: 7, background: color, color: 'white', border: 'none', fontFamily: 'var(--font-display)', fontSize: 11, fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', cursor: 'pointer', marginTop: 6 }}>
      Selecteer route
    </button>
  );
}

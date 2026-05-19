import { useState } from 'react';
import RailMap, { CircleMarker } from '../components/RailMap';
import LocationImage from '../components/LocationImage';
import { heatspots } from '../data/mapData';
import { Filter } from 'lucide-react';

const heatColors = {
  low:  { fill: 'rgba(122,158,138,0.35)', stroke: 'rgba(122,158,138,0.55)' },
  mid:  { fill: 'rgba(122,158,138,0.55)', stroke: 'rgba(122,158,138,0.75)' },
  high: { fill: 'rgba(194,119,58,0.55)',  stroke: 'rgba(194,119,58,0.75)'  },
  max:  { fill: 'rgba(44,36,21,0.70)',    stroke: 'rgba(194,119,58,0.85)'  },
};

const categories = ['Alles', 'Kastelen', 'Kunst', 'Natuur', 'Religie'];

export default function Heatmap() {
  const [period, setPeriod] = useState('all');
  const [activeSpot, setActiveSpot] = useState(null);
  const [category, setCategory] = useState('Alles');

  const visibleSpots = category === 'Alles'
    ? heatspots
    : heatspots.filter(s => s.top.some(t => t.toLowerCase().includes(category.toLowerCase())));

  return (
    <div className="screen" style={{ position: 'relative' }}>
      {/* Filters overlay */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 1000, padding: '10px 16px 12px' }}>
        {/* status bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 44 }}>
          <span style={{ fontFamily: 'DM Sans', fontWeight: 500, fontSize: 15, color: 'var(--dark-text)' }}>9:41</span>
        </div>

        <div style={{ background: 'rgba(245,237,227,0.94)', borderRadius: 14, padding: '10px 12px', backdropFilter: 'blur(10px)', border: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <p className="label">HEATMAP</p>
            <button style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'white', border: '1.5px solid var(--border)', borderRadius: 100, padding: '5px 12px', cursor: 'pointer' }}>
              <Filter size={12} color="var(--light-text)" />
              <span className="caption">Filter</span>
            </button>
          </div>

          {/* Category pills */}
          <div style={{ display: 'flex', gap: 7, overflowX: 'auto', marginBottom: 8 }}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setCategory(cat)} style={{ padding: '5px 12px', borderRadius: 100, border: `1.5px solid ${category === cat ? 'var(--copper)' : 'var(--border)'}`, background: category === cat ? 'var(--copper)' : 'white', color: category === cat ? 'white' : 'var(--dark-text)', fontFamily: 'DM Sans', fontSize: 12, fontWeight: category === cat ? 500 : 300, whiteSpace: 'nowrap', cursor: 'pointer', flexShrink: 0 }}>
                {cat}
              </button>
            ))}
          </div>

          {/* Period toggle */}
          <div style={{ display: 'flex', gap: 4 }}>
            {['week', 'jaar', 'all'].map(p => (
              <button key={p} onClick={() => setPeriod(p)} style={{ padding: '5px 12px', borderRadius: 100, border: `1.5px solid ${period === p ? 'var(--night)' : 'var(--border)'}`, background: period === p ? 'var(--night)' : 'transparent', color: period === p ? 'white' : 'var(--light-text)', fontFamily: 'DM Sans', fontSize: 11, cursor: 'pointer' }}>
                {p === 'week' ? 'Deze week' : p === 'jaar' ? 'Dit jaar' : 'All-time'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Full map — Europe-wide view */}
      <div style={{ flex: 1, position: 'relative' }} onClick={() => setActiveSpot(null)}>
        <RailMap center={[48.5, 9.0]} zoom={4} zoomControl={false}>
          {visibleSpots.map(spot => {
            const c = heatColors[spot.intensity];
            return (
              <CircleMarker
                key={spot.id}
                center={spot.coords}
                radius={spot.size / 2500}
                pathOptions={{ fillColor: c.fill, fillOpacity: 1, color: c.stroke, weight: 2 }}
                eventHandlers={{ click: e => { e.originalEvent.stopPropagation(); setActiveSpot(spot); } }}
              />
            );
          })}
        </RailMap>

        {/* Legend */}
        <div style={{ position: 'absolute', bottom: 20, left: 14, background: 'rgba(255,255,255,0.92)', borderRadius: 12, padding: '10px 14px', zIndex: 1000, border: '1px solid var(--border)' }}>
          <p className="caption" style={{ marginBottom: 8, fontWeight: 500 }}>Populariteit</p>
          {[
            { color: heatColors.max.fill,  label: 'Erg populair' },
            { color: heatColors.high.fill, label: 'Populair' },
            { color: heatColors.mid.fill,  label: 'Gemiddeld' },
            { color: heatColors.low.fill,  label: 'Weinig bezocht' },
          ].map(({ color, label }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 4 }}>
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: color, border: '1px solid rgba(0,0,0,0.1)' }} />
              <span className="caption" style={{ fontSize: 10 }}>{label}</span>
            </div>
          ))}
        </div>

        {/* Spot count */}
        <div style={{ position: 'absolute', bottom: 20, right: 14, background: 'rgba(255,255,255,0.92)', borderRadius: 12, padding: '8px 12px', zIndex: 1000, border: '1px solid var(--border)' }}>
          <span className="caption" style={{ fontWeight: 500 }}>{visibleSpots.length} hotspots</span>
        </div>
      </div>

      {/* Active spot popup */}
      {activeSpot && (
        <div className="slide-up" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'white', borderRadius: '22px 22px 0 0', padding: '16px 16px 24px', boxShadow: '0 -4px 24px rgba(0,0,0,0.12)', zIndex: 1100 }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
            <div style={{ width: 36, height: 4, borderRadius: 10, background: 'var(--border)' }} />
          </div>
          <LocationImage wikiTitle={activeSpot.wikiTitle} height={120} style={{ borderRadius: 10, marginBottom: 12 }} />
          <p className="label" style={{ marginBottom: 6 }}>HOTSPOT</p>
          <h3 className="card-title" style={{ fontSize: 18, marginBottom: 4 }}>{activeSpot.label}</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 14 }}>
            <span style={{ fontSize: 13, color: 'var(--light-text)', fontFamily: 'DM Sans' }}>
              ❤️ {activeSpot.votes} reizigers
            </span>
          </div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            {activeSpot.top.map(t => <span key={t} className="tag-moss">{t}</span>)}
          </div>
          <button className="btn-primary" style={{ fontSize: 14, padding: '13px' }}>
            Toevoegen aan route
          </button>
        </div>
      )}
    </div>
  );
}

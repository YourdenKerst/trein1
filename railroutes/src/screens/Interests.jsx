import { useState } from 'react';
import StatusBar from '../components/StatusBar';
import { ChevronLeft } from 'lucide-react';

const interests = [
  'Kastelen', 'Middeleeuwen', 'Tweede Wereldoorlog', 'Kunst & musea',
  'Religie & kerken', 'Industrieel erfgoed', 'Gastronomie',
  'Natuur & landschap', 'Lokale legendes', 'Obscure plekjes',
  'Romeinse tijd', 'Abdijen & kloosters',
];

export default function Interests({ onNext, onBack }) {
  const [selected, setSelected] = useState(['Kastelen', 'Middeleeuwen']);

  const toggle = (item) => {
    setSelected(prev =>
      prev.includes(item) ? prev.filter(x => x !== item) : [...prev, item]
    );
  };

  return (
    <div className="screen" style={{ background: 'var(--parchment)' }}>
      <StatusBar light />

      <div className="screen-scroll" style={{ padding: '0 0 100px' }}>
        {/* Header */}
        <div style={{ padding: '8px 20px 24px', display: 'flex', flexDirection: 'column', gap: 6 }}>
          <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--light-text)', fontFamily: 'DM Sans', fontSize: 14, padding: '4px 0', alignSelf: 'flex-start' }}>
            <ChevronLeft size={18} /> Terug
          </button>
          <div style={{ height: 8 }} />
          <p className="label">1 / 3</p>
          <h1 className="display-title" style={{ fontSize: 26 }}>
            Wat fascineert<br />
            <span style={{ fontStyle: 'italic' }}>jou het meest?</span>
          </h1>
          <p className="body-text" style={{ marginTop: 4 }}>
            Kies minimaal 2 interesses.
          </p>
        </div>

        {/* Pills grid */}
        <div style={{ padding: '0 20px', display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'flex-start' }}>
          {interests.map(item => (
            <button
              key={item}
              className={`pill ${selected.includes(item) ? 'active' : ''}`}
              onClick={() => toggle(item)}
            >
              {selected.includes(item) && <span style={{ marginRight: 5, fontSize: 11 }}>✓</span>}
              {item}
            </button>
          ))}
        </div>

        {/* Selection count */}
        <div style={{ padding: '20px 20px 0', display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 24, height: 24, borderRadius: '50%', background: selected.length >= 2 ? 'var(--copper)' : 'var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.3s' }}>
            <span style={{ fontSize: 11, color: 'white', fontWeight: 600 }}>{selected.length}</span>
          </div>
          <span className="caption">
            {selected.length < 2 ? `Nog ${2 - selected.length}` : `${selected.length} geselecteerd`}
          </span>
        </div>
      </div>

      {/* Sticky CTA */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px 20px 24px', background: 'linear-gradient(0deg, var(--parchment) 70%, transparent)' }}>
        <button
          className="btn-primary"
          disabled={selected.length < 2}
          onClick={onNext}
          style={{ opacity: selected.length < 2 ? 0.45 : 1 }}
        >
          Volgende
        </button>
      </div>
    </div>
  );
}

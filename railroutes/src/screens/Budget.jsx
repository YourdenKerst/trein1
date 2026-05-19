import { useState } from 'react';
import StatusBar from '../components/StatusBar';
import { ChevronLeft } from 'lucide-react';

export default function Budget({ onNext, onBack }) {
  const [budget, setBudget] = useState(1);
  const [duration, setDuration] = useState('dag');
  const [travel, setTravel] = useState('trein');

  const budgetLabels = ['Beperkt · €20–50', 'Comfortabel · €50–120', 'Luxe · €120+'];
  const budgetDescriptions = ['Picknick op het perron', 'Lunch en een museum', 'Diner en een boutique hotel'];

  const sliderPercent = (budget / 2) * 100;

  return (
    <div className="screen" style={{ background: 'var(--parchment)' }}>
      <StatusBar light />

      <div className="screen-scroll" style={{ padding: '0 20px 120px' }}>
        <div style={{ paddingTop: 8, paddingBottom: 24, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--light-text)', fontFamily: 'DM Sans', fontSize: 14, padding: '4px 0', alignSelf: 'flex-start' }}>
            <ChevronLeft size={18} /> Terug
          </button>
          <div style={{ height: 8 }} />
          <p className="label">2 / 3</p>
          <h1 className="display-title" style={{ fontSize: 26 }}>
            Budget &<br />
            <span style={{ fontStyle: 'italic' }}>reisvoorkeur</span>
          </h1>
        </div>

        {/* Budget slider */}
        <div className="card" style={{ padding: '20px', marginBottom: 16 }}>
          <p className="label" style={{ marginBottom: 16 }}>DAGBUDGET</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 18 }}>
            <span className="card-title">{budgetLabels[budget]}</span>
          </div>
          {/* Custom slider */}
          <div style={{ position: 'relative', height: 28, display: 'flex', alignItems: 'center' }}>
            <div style={{ position: 'absolute', left: 0, right: 0, height: 6, background: 'var(--border)', borderRadius: 10 }}>
              <div style={{ width: `${sliderPercent}%`, height: '100%', background: 'var(--copper)', borderRadius: 10, transition: 'width 0.2s' }} />
            </div>
            <input type="range" min={0} max={2} value={budget} onChange={e => setBudget(+e.target.value)}
              style={{ position: 'absolute', left: 0, right: 0, width: '100%', opacity: 0, cursor: 'pointer', height: 28 }} />
            <div style={{ position: 'absolute', left: `calc(${sliderPercent}% - 11px)`, width: 22, height: 22, borderRadius: '50%', background: 'var(--copper)', boxShadow: '0 2px 8px rgba(194,119,58,0.45)', transition: 'left 0.2s', pointerEvents: 'none' }} />
          </div>

          {/* Markers */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
            {['Beperkt', 'Comfortabel', 'Luxe'].map((l, i) => (
              <span key={i} className="caption" style={{ color: budget === i ? 'var(--copper)' : 'var(--slate)', fontWeight: budget === i ? 500 : 300, transition: 'color 0.2s' }}>{l}</span>
            ))}
          </div>
        </div>

        {/* Duration toggle */}
        <div className="card" style={{ padding: '20px', marginBottom: 16 }}>
          <p className="label" style={{ marginBottom: 14 }}>REISDUUR</p>
          <div className="toggle-group">
            {['dag', 'weekend', 'meerdere'].map(opt => (
              <button key={opt} className={`toggle-option ${duration === opt ? 'active' : ''}`} onClick={() => setDuration(opt)}>
                {opt === 'dag' ? 'Dagtrip' : opt === 'weekend' ? 'Weekend' : 'Meerdere dagen'}
              </button>
            ))}
          </div>
        </div>

        {/* Travel type toggle */}
        <div className="card" style={{ padding: '20px' }}>
          <p className="label" style={{ marginBottom: 14 }}>VOORTBEWEGEN</p>
          <div className="toggle-group">
            {[
              { id: 'trein', label: '🚂 Trein' },
              { id: 'wandelen', label: '🚶 + Wandelen' },
              { id: 'fiets', label: '🚲 + Fiets' },
            ].map(({ id, label }) => (
              <button key={id} className={`toggle-option ${travel === id ? 'active' : ''}`} onClick={() => setTravel(id)}>
                {label}
              </button>
            ))}
          </div>
        </div>

      </div>

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px 20px 24px', background: 'linear-gradient(0deg, var(--parchment) 70%, transparent)' }}>
        <button className="btn-primary" onClick={onNext}>
          Start
        </button>
      </div>
    </div>
  );
}

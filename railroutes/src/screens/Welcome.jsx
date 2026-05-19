import StatusBar from '../components/StatusBar';

export default function Welcome({ onNext }) {
  return (
    <div className="screen" style={{ background: 'var(--night)' }}>
      <StatusBar dark />

      {/* Hero illustration */}
      <div style={{ position: 'relative', height: 260, overflow: 'hidden', flexShrink: 0 }}>
        {/* Atmospheric night scene */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #061f17 0%, #0a3d2e 60%, #0f6b4e 100%)' }} />

        {/* Stars */}
        {[...Array(18)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: i % 3 === 0 ? 2 : 1.5,
            height: i % 3 === 0 ? 2 : 1.5,
            background: 'rgba(255,255,255,' + (0.4 + (i % 5) * 0.1) + ')',
            borderRadius: '50%',
            left: `${(i * 37 + 11) % 90 + 5}%`,
            top: `${(i * 19 + 7) % 60 + 5}%`,
          }} />
        ))}

        {/* Moon */}
        <div style={{ position: 'absolute', top: 24, right: 52, width: 28, height: 28, borderRadius: '50%', background: 'radial-gradient(circle at 40% 40%, #f5e8d0, #ddc8a0)', boxShadow: '0 0 18px rgba(220,200,150,0.4)' }} />

        {/* Landscape hills */}
        <svg style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }} viewBox="0 0 390 100" preserveAspectRatio="none">
          <path d="M0 100 Q60 50 120 65 Q180 80 240 45 Q300 20 390 55 L390 100Z" fill="#061f17" />
          <path d="M0 100 Q80 70 160 80 Q220 88 280 72 Q330 60 390 75 L390 100Z" fill="#0a3d2e" />
        </svg>

        {/* Train silhouette */}
        <svg style={{ position: 'absolute', bottom: 28, left: '15%' }} width="140" height="46" viewBox="0 0 140 46">
          {/* Train body */}
          <rect x="5" y="12" width="120" height="28" rx="5" fill="#e8412a" opacity="0.9"/>
          {/* Windows */}
          <rect x="16" y="18" width="14" height="10" rx="2" fill="rgba(220,255,240,0.85)"/>
          <rect x="38" y="18" width="14" height="10" rx="2" fill="rgba(220,255,240,0.85)"/>
          <rect x="60" y="18" width="14" height="10" rx="2" fill="rgba(220,255,240,0.65)"/>
          <rect x="82" y="18" width="14" height="10" rx="2" fill="rgba(220,255,240,0.4)"/>
          {/* Front */}
          <path d="M125 12 L130 14 L130 38 L125 40Z" fill="#c2311e"/>
          {/* Headlight */}
          <circle cx="131" cy="30" r="4" fill="rgba(220,255,240,0.9)"/>
          <path d="M135 30 L148 28 L148 32Z" fill="rgba(220,255,240,0.4)"/>
          {/* Wheels */}
          <circle cx="24" cy="40" r="6" fill="#061f17" stroke="#e8412a" strokeWidth="2"/>
          <circle cx="56" cy="40" r="6" fill="#061f17" stroke="#e8412a" strokeWidth="2"/>
          <circle cx="88" cy="40" r="6" fill="#061f17" stroke="#e8412a" strokeWidth="2"/>
          <circle cx="112" cy="40" r="6" fill="#061f17" stroke="#e8412a" strokeWidth="2"/>
          {/* Track */}
          <line x1="0" y1="46" x2="140" y2="46" stroke="#14a372" strokeWidth="2"/>
        </svg>

        {/* Steam */}
        <div style={{ position: 'absolute', bottom: 66, left: '39%', display: 'flex', gap: 4 }}>
          {[10, 14, 11].map((h, i) => (
            <div key={i} style={{ width: 6, height: h, borderRadius: 10, background: 'rgba(255,255,255,0.12)' }} />
          ))}
        </div>

        {/* Light cone from headlight */}
        <div style={{
          position: 'absolute', bottom: 38, left: '52%',
          width: 80, height: 16,
          background: 'linear-gradient(90deg, rgba(255,240,180,0.3) 0%, transparent 100%)',
          clipPath: 'polygon(0 50%, 100% 0%, 100% 100%)',
          transformOrigin: 'left center',
        }} />
      </div>

      {/* Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '32px 28px 28px', gap: 16 }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <div style={{ width: 28, height: 28, background: 'var(--copper)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="white">
              <path d="M2 8 Q8 2 14 8 Q8 14 2 8Z" opacity="0.5"/>
              <path d="M1 8 L15 8M8 1 L8 15" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
              <circle cx="8" cy="8" r="3" fill="white"/>
            </svg>
          </div>
          <span className="label" style={{ color: 'var(--copper)', letterSpacing: '0.2em', fontSize: 12 }}>RAILROUTES</span>
        </div>

        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 28, lineHeight: 1.1, letterSpacing: '-0.5px', color: 'white' }}>
          Jouw verhaal begint op het perron
        </h1>

        <p style={{ fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: 15, lineHeight: 1.65, color: 'rgba(255,255,255,0.6)', maxWidth: 290 }}>
          Treinreizen op maat, langs historische plekken die bij jou passen.
        </p>

        <div style={{ flex: 1 }} />

        {/* CTA */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <button className="btn-primary" onClick={onNext}>
            Sta locatie toe
          </button>
          <div style={{ textAlign: 'center' }}>
            <button className="btn-ghost">Handmatig invoeren</button>
          </div>
        </div>

        {/* Tagline */}
        <p className="caption" style={{ color: 'rgba(255,255,255,0.28)', textAlign: 'center', letterSpacing: '0.08em' }}>
          Historische reizen · op maat
        </p>
      </div>
    </div>
  );
}

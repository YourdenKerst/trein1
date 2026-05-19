import { useState } from 'react';
import { MapPin, Bell, Volume2 } from 'lucide-react';

const tips = [
  {
    id: 1,
    distance: 'Over 12 minuten',
    title: 'Kasteel Ammersoyen',
    subtitle: 'Rechts van de trein',
    body: 'Kijk rechts bij de bocht bij Ammerzoden. Tussen de bomen door verschijnen vier middeleeuwse torens — Kasteel Ammersoyen, zeven eeuwen oud.',
    tag: 'Kastelen · 14e eeuw',
    emoji: '🏰',
  },
  {
    id: 2,
    distance: 'Nu voorbij',
    title: 'Oude spoorbrug Ravenstein',
    subtitle: 'Direct rechts',
    body: 'Deze gietijzeren brug uit 1879 werd in WOII opgeblazen en herbouwd. De originele fundering staat er nog.',
    tag: 'Industrieel erfgoed · 1879',
    emoji: '🌉',
  },
  {
    id: 3,
    distance: 'Over 28 minuten',
    title: 'Vestingstad Grave',
    subtitle: 'Links van de trein',
    body: 'Grave heeft een van de best bewaard gebleven vestingstelsels van Nederland — aarden wallen aangelegd door prins Maurits.',
    tag: 'Vesting · 17e eeuw',
    emoji: '⚔️',
  },
];

export default function TreinModus() {
  const [currentTip, setCurrentTip] = useState(0);
  const [notif, setNotif] = useState(true);

  const tip = tips[currentTip];

  const prev = () => setCurrentTip(i => (i - 1 + tips.length) % tips.length);
  const next = () => setCurrentTip(i => (i + 1) % tips.length);

  return (
    <div className="screen" style={{ background: 'var(--night)', overflow: 'hidden' }}>
      {/* Status bar - dark */}
      <div className="status-bar dark">
        <span className="time">9:41</span>
        <div className="icons">
          <svg width="17" height="12" viewBox="0 0 17 12" fill="rgba(255,255,255,0.8)">
            <rect x="0" y="3" width="3" height="9" rx="1" opacity="0.4"/>
            <rect x="4.5" y="2" width="3" height="10" rx="1" opacity="0.6"/>
            <rect x="9" y="0" width="3" height="12" rx="1"/>
            <rect x="13.5" y="0" width="3" height="12" rx="1"/>
          </svg>
          <svg width="25" height="12" viewBox="0 0 25 12" fill="rgba(255,255,255,0.8)">
            <rect x="0" y="1" width="21" height="10" rx="3" stroke="rgba(255,255,255,0.8)" strokeWidth="1.2" fill="none" opacity="0.35"/>
            <rect x="1.5" y="2.5" width="16" height="7" rx="2" fill="rgba(255,255,255,0.8)"/>
            <path d="M22.5 4.5v3a1.5 1.5 0 000-3z" fill="rgba(255,255,255,0.4)"/>
          </svg>
        </div>
      </div>

      {/* Mode indicator */}
      <div style={{ padding: '8px 20px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#4A7C5E', boxShadow: '0 0 0 3px rgba(74,124,94,0.25)' }} />
          <p className="label" style={{ color: 'rgba(255,255,255,0.45)', letterSpacing: '0.12em' }}>IN-TREIN MODUS</p>
        </div>
        <button onClick={() => setNotif(n => !n)} style={{ display: 'flex', alignItems: 'center', gap: 5, background: notif ? 'rgba(194,119,58,0.15)' : 'rgba(255,255,255,0.07)', border: `1px solid ${notif ? 'rgba(194,119,58,0.3)' : 'rgba(255,255,255,0.12)'}`, borderRadius: 100, padding: '5px 10px', cursor: 'pointer', color: notif ? 'var(--copper)' : 'rgba(255,255,255,0.4)' }}>
          <Bell size={12} />
          <span style={{ fontFamily: 'DM Sans', fontSize: 11 }}>{notif ? 'Aan' : 'Uit'}</span>
        </button>
      </div>

      {/* Live route map strip */}
      <div style={{ margin: '12px 20px', height: 60, position: 'relative', borderRadius: 12, overflow: 'hidden', background: '#1e180d', border: '1px solid rgba(255,255,255,0.08)' }}>
        {/* Stations */}
        <div style={{ position: 'absolute', top: '50%', left: '8%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'rgba(255,255,255,0.6)', border: '2px solid rgba(255,255,255,0.3)' }} />
          <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)', fontFamily: 'DM Sans', whiteSpace: 'nowrap' }}>Nijmegen</span>
        </div>
        <div style={{ position: 'absolute', top: '50%', left: '35%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.35)' }} />
          <span style={{ fontSize: 7, color: 'rgba(255,255,255,0.3)', fontFamily: 'DM Sans', whiteSpace: 'nowrap' }}>Ammerzoden</span>
        </div>
        <div style={{ position: 'absolute', top: '50%', left: '60%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(194,119,58,0.6)', border: '2px solid rgba(194,119,58,0.3)' }} />
          <span style={{ fontSize: 7, color: 'rgba(255,255,255,0.3)', fontFamily: 'DM Sans', whiteSpace: 'nowrap' }}>Grave</span>
        </div>
        <div style={{ position: 'absolute', top: '50%', left: '85%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.2)' }} />
          <span style={{ fontSize: 7, color: 'rgba(255,255,255,0.25)', fontFamily: 'DM Sans', whiteSpace: 'nowrap' }}>Venlo</span>
        </div>

        {/* Track line */}
        <div style={{ position: 'absolute', top: '50%', left: '8%', right: '8%', height: 3, background: 'rgba(255,255,255,0.1)', transform: 'translateY(-50%)', borderRadius: 2 }}>
          <div style={{ width: '28%', height: '100%', background: 'var(--copper)', borderRadius: 2 }} />
        </div>

        {/* Moving train */}
        <div style={{ position: 'absolute', top: '50%', left: '28%', transform: 'translate(-50%, -50%)', zIndex: 5 }}>
          <div style={{ fontSize: 16 }}>🚂</div>
        </div>
      </div>

      {/* Swipeable tip card */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '0 20px' }}>
        {/* Notification banner */}
        <div style={{ background: 'rgba(194,119,58,0.12)', border: '1px solid rgba(194,119,58,0.22)', borderRadius: 12, padding: '10px 14px', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 18 }}>{tip.emoji}</span>
          <div style={{ flex: 1 }}>
            <p style={{ fontFamily: 'DM Sans', fontSize: 13, fontWeight: 500, color: 'var(--copper)' }}>{tip.distance}</p>
            <p style={{ fontFamily: 'DM Sans', fontSize: 12, color: 'rgba(255,255,255,0.55)', fontWeight: 300 }}>{tip.title} — {tip.subtitle}</p>
          </div>
        </div>

        {/* Main tip card */}
        <div style={{ flex: 1, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: '22px 20px', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
          {/* Subtle texture */}
          <div style={{ position: 'absolute', top: -40, right: -40, width: 120, height: 120, borderRadius: '50%', background: 'rgba(194,119,58,0.06)' }} />

          <div style={{ marginBottom: 16 }}>
            <p className="label" style={{ color: 'var(--copper)', marginBottom: 8 }}>{tip.tag.toUpperCase()}</p>
            <h2 style={{ fontFamily: 'Playfair Display', fontStyle: 'italic', fontSize: 24, color: 'white', fontWeight: 400, marginBottom: 6, lineHeight: 1.25 }}>
              {tip.title}
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <MapPin size={12} color="rgba(255,255,255,0.4)" />
              <span style={{ fontFamily: 'DM Sans', fontSize: 12, color: 'rgba(255,255,255,0.4)', fontWeight: 300 }}>{tip.subtitle}</span>
            </div>
          </div>

          <p style={{ fontFamily: 'DM Sans', fontSize: 15, color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, fontWeight: 300, flex: 1 }}>
            {tip.body}
          </p>

          <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
            <button style={{ flex: 1, background: 'var(--copper)', border: 'none', borderRadius: 12, padding: '13px', cursor: 'pointer', fontFamily: 'DM Sans', fontWeight: 500, fontSize: 14, color: 'white' }}>
              Meer lezen
            </button>
            <button style={{ width: 46, height: 46, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Volume2 size={16} color="rgba(255,255,255,0.5)" />
            </button>
          </div>
        </div>

        {/* Swipe dots + arrows */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, padding: '14px 0 8px' }}>
          <button onClick={prev} style={{ background: 'rgba(255,255,255,0.08)', border: 'none', borderRadius: '50%', width: 32, height: 32, cursor: 'pointer', color: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>‹</button>
          <div style={{ display: 'flex', gap: 7 }}>
            {tips.map((_, i) => (
              <div key={i} onClick={() => setCurrentTip(i)} style={{ width: currentTip === i ? 20 : 6, height: 6, borderRadius: 10, background: currentTip === i ? 'var(--copper)' : 'rgba(255,255,255,0.2)', transition: 'all 0.25s', cursor: 'pointer' }} />
            ))}
          </div>
          <button onClick={next} style={{ background: 'rgba(255,255,255,0.08)', border: 'none', borderRadius: '50%', width: 32, height: 32, cursor: 'pointer', color: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>›</button>
        </div>
      </div>
    </div>
  );
}

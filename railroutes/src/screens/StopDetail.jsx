import { useState } from 'react';
import StatusBar from '../components/StatusBar';
import { useWikiImage } from '../hooks/useWikiImage';
import { ChevronLeft, Heart, Bookmark, ExternalLink, Play, Headphones } from 'lucide-react';

export default function StopDetail({ stop, onBack }) {
  const [tab, setTab] = useState('lezen');
  const [voted, setVoted] = useState(false);
  const [saved, setSaved] = useState(false);
  const [votes, setVotes] = useState(stop?.votes || 312);
  const [voteAnim, setVoteAnim] = useState(false);

  const handleVote = () => {
    setVoted(v => !v);
    setVotes(v => voted ? v - 1 : v + 1);
    if (!voted) { setVoteAnim(true); setTimeout(() => setVoteAnim(false), 600); }
  };

  const stopData = stop || { name: 'Kasteel Ammersoyen', location: 'Ammerzoden', tags: ['Kastelen', 'Middeleeuwen'], wikiTitle: 'Kasteel Ammersoyen' };
  const heroUrl = useWikiImage(stopData.wikiTitle);

  return (
    <div className="screen" style={{ background: 'var(--parchment)' }}>
      {/* Hero image area */}
      <div style={{ position: 'relative', height: 220, flexShrink: 0 }}>
        {/* Real photo or gradient fallback */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, #061f17 0%, #0a3d2e 40%, #0f6b4e 100%)' }}>
          {heroUrl && (
            <img src={heroUrl} alt={stopData.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          )}
          {/* Scrim so text stays readable over photo */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, rgba(26,18,8,0.55) 0%, transparent 50%)' }} />
        </div>

        {/* Status bar overlay */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
          <div style={{ height: 44, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px' }}>
            <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(0,0,0,0.35)', border: 'none', borderRadius: 100, padding: '7px 12px 7px 8px', cursor: 'pointer', color: 'white', fontFamily: 'DM Sans', fontSize: 13 }}>
              <ChevronLeft size={16} /> Terug
            </button>
            <button onClick={() => setSaved(s => !s)} style={{ background: 'rgba(0,0,0,0.35)', border: 'none', borderRadius: 100, padding: '8px', cursor: 'pointer', color: saved ? 'var(--copper)' : 'white', display: 'flex' }}>
              <Bookmark size={16} fill={saved ? 'currentColor' : 'none'} />
            </button>
          </div>
        </div>

        {/* Bottom fade + stop number */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 80, background: 'linear-gradient(0deg, rgba(245,237,227,1) 0%, transparent 100%)' }} />
        <div style={{ position: 'absolute', bottom: 12, left: 16 }}>
          <span className="badge badge-copper">Stop 1 van 4</span>
        </div>
      </div>

      {/* Content */}
      <div className="screen-scroll">
        <div style={{ padding: '0 16px' }}>
          {/* Title area */}
          <div style={{ paddingBottom: 14 }}>
            <p className="label" style={{ marginBottom: 4 }}>{stopData.location?.toUpperCase() || 'AMMERZODEN'}</p>
            <h1 className="display-title" style={{ fontSize: 26, marginBottom: 8 }}>{stopData.name}</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
              {(stopData.tags || ['Kastelen', 'Middeleeuwen']).map(t => <span key={t} className="tag-moss">{t}</span>)}
            </div>

            {/* Upvote + share row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <button className={`upvote-btn ${voted ? 'voted' : ''} ${voteAnim ? 'pulse-anim' : ''}`} onClick={handleVote}>
                <Heart size={14} fill={voted ? 'currentColor' : 'none'} />
                {votes} likes
              </button>
            </div>
          </div>

          <div className="divider" style={{ marginBottom: 0 }} />

          {/* Media tabs */}
          <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid var(--border)' }}>
            {['lezen', 'kijken', 'luisteren'].map(t => (
              <button key={t} onClick={() => setTab(t)} style={{
                flex: 1, padding: '13px 4px 11px', background: 'none', border: 'none', cursor: 'pointer',
                fontFamily: 'DM Sans', fontSize: 13, fontWeight: tab === t ? 500 : 300,
                color: tab === t ? 'var(--dark-text)' : 'var(--slate)',
                borderBottom: `2px solid ${tab === t ? 'var(--copper)' : 'transparent'}`,
                textTransform: 'capitalize', transition: 'all 0.2s',
              }}>
                {t === 'lezen' ? 'Lezen' : t === 'kijken' ? 'Kijken' : 'Luisteren'}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div style={{ paddingTop: 16, paddingBottom: 32 }}>
            {tab === 'lezen' && (
              <div className="fade-in">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                  <h2 className="section-title" style={{ fontSize: 18 }}>Het kasteel dat de tijd weerstond</h2>
                  <span className="caption" style={{ flexShrink: 0 }}>± 4 min</span>
                </div>
                <div className="body-text" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <p>In een bocht van de Maas, net ten zuiden van het dorp Ammerzoden, verrijst een kasteel dat in zeven eeuwen nauwelijks is veranderd. Kasteel Ammersoyen werd rond 1350 gebouwd als verdedigingswerk, maar het was ook een statement: hier woonden mensen die macht hadden.</p>
                  <p>Vier ronde torens bewaken de hoeken van het vierkante bouwwerk. Wie de ophaalbrug passeert en de binnenplaats betreedt, stapt letterlijk de Middeleeuwen binnen. De gracht is er nog. De mergelstenen muren ook. Zelfs de oorspronkelijke indeling van de vertrekken is grotendeels bewaard gebleven.</p>
                  <p style={{ fontStyle: 'italic', color: 'var(--light-text)', borderLeft: '3px solid var(--copper)', paddingLeft: 14 }}>
                    "Weinig plekken in Nederland geven zo'n direct gevoel van contact met de middeleeuwen als dit kasteel."
                  </p>
                  <p>Bijzonder is de combinatie van bewoning en openbaar toegankelijkheid. Het kasteel is al decennialang bewoond én te bezoeken — een zeldzame situatie die zorgt voor een levende sfeer die musea vaak missen.</p>
                </div>
              </div>
            )}
            {tab === 'kijken' && (
              <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { title: 'Kastelen van Nederland — Ammersoyen', src: 'NTR Historie · 24 min', thumb: '🏰' },
                  { title: 'Middeleeuws leven in Gelderland', src: 'VPRO Documentaires · 45 min', thumb: '⚔️' },
                  { title: 'Foto-essay: Langs de Maas', src: 'NatGeo NL · Fotoessay', thumb: '📸' },
                ].map((item, i) => (
                  <div key={i} className="card" style={{ padding: '14px', display: 'flex', gap: 12, alignItems: 'center', cursor: 'pointer' }}>
                    <div style={{ width: 52, height: 52, borderRadius: 12, background: 'var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>
                      {item.thumb}
                    </div>
                    <div style={{ flex: 1 }}>
                      <h3 className="card-title" style={{ fontSize: 14, marginBottom: 3 }}>{item.title}</h3>
                      <p className="caption">{item.src}</p>
                    </div>
                    <ExternalLink size={14} color="var(--copper)" />
                  </div>
                ))}
              </div>
            )}
            {tab === 'luisteren' && (
              <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {/* Featured audio */}
                <div style={{ background: 'var(--night)', borderRadius: 16, padding: '18px', color: 'white' }}>
                  <p className="label" style={{ color: 'var(--copper)', marginBottom: 8 }}>AUDIOGIDS</p>
                  <h3 style={{ fontFamily: 'Playfair Display', fontStyle: 'italic', fontSize: 18, marginBottom: 6, fontWeight: 400 }}>Stem van de stenen</h3>
                  <p style={{ fontFamily: 'DM Sans', fontSize: 13, color: 'rgba(255,255,255,0.55)', fontWeight: 300, marginBottom: 16 }}>12 min · NL</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                    <button style={{ width: 42, height: 42, borderRadius: '50%', background: 'var(--copper)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                      <Play size={16} fill="white" color="white" />
                    </button>
                    <div style={{ flex: 1 }}>
                      <div style={{ height: 3, background: 'rgba(255,255,255,0.15)', borderRadius: 10, marginBottom: 6 }}>
                        <div style={{ width: '35%', height: '100%', background: 'var(--copper)', borderRadius: 10 }} />
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontFamily: 'DM Sans' }}>4:12</span>
                        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontFamily: 'DM Sans' }}>12:00</span>
                      </div>
                    </div>
                  </div>
                </div>

                {[
                  { title: 'Podcast: Verborgen Kastelen', sub: 'Geschiedenis van Nederland · Afl. 14', dur: '38 min' },
                  { title: 'Spotify: Middeleeuwen Playlist', sub: 'Historische achtergrondmuziek', dur: '1u 12m' },
                ].map((item, i) => (
                  <div key={i} className="card" style={{ padding: '14px', display: 'flex', gap: 12, alignItems: 'center', cursor: 'pointer' }}>
                    <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'rgba(194,119,58,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Headphones size={18} color="var(--copper)" />
                    </div>
                    <div style={{ flex: 1 }}>
                      <h3 className="card-title" style={{ fontSize: 14, marginBottom: 2 }}>{item.title}</h3>
                      <p className="caption">{item.sub}</p>
                    </div>
                    <span className="caption" style={{ flexShrink: 0 }}>{item.dur}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import StatusBar from '../components/StatusBar';
import { MessageCircle, Star, Plus } from 'lucide-react';

const guides = [
  { id: 1, name: 'Anneke van der Berg', region: 'Nederland', spec: 'WO2-geschiedenis & kastelen Gelderland', rating: 4.9, reviews: 47, initials: 'A', available: true, price: '€45/uur', flag: '🇳🇱' },
  { id: 2, name: 'Heinrich Bauer', region: 'Duitsland', spec: 'Rijnkasteelen & wijncultuur Rheingau', rating: 4.8, reviews: 62, initials: 'H', available: true, price: '€55/uur', flag: '🇩🇪' },
  { id: 3, name: 'Marie-Claire Dupont', region: 'Frankrijk', spec: 'Gotische kathedralen Île-de-France', rating: 5.0, reviews: 38, initials: 'M', available: true, price: '€60/uur', flag: '🇫🇷' },
  { id: 4, name: 'Lorenzo Ricci', region: 'Italië', spec: 'Etruskisch erfgoed & middeleeuwse steden Toscane', rating: 4.9, reviews: 54, initials: 'L', available: false, price: '€65/uur', flag: '🇮🇹' },
  { id: 5, name: 'Sophia Huber', region: 'Oostenrijk', spec: 'Mozart, barok en Alpenkultur Salzburg', rating: 4.7, reviews: 29, initials: 'S', available: true, price: '€50/uur', flag: '🇦🇹' },
  { id: 6, name: 'Jules Vermeersch', region: 'België', spec: 'Vlaamse Primitieven & middeleeuwse kanaalsteden', rating: 4.8, reviews: 41, initials: 'J', available: false, price: '€45/uur', flag: '🇧🇪' },
];

const posts = [
  { id: 1, user: 'Miriam K.', route: 'De Stille Oorlogslijn', flag: '🇳🇱', text: 'Kasteel Ammersoyen in de ochtendmist — absoluut adembenemend. Neem de eerste trein!', time: '2u geleden', likes: 24, initials: 'M' },
  { id: 2, user: 'Stefan W.', route: 'De Rijnpoort', flag: '🇩🇪', text: 'De Loreley bij zonsondergang, met een glas Riesling in de hand. Dit is Europa op zijn best.', time: '4u geleden', likes: 51, initials: 'S' },
  { id: 3, user: 'Isabelle F.', route: 'La Route des Cathédrales', flag: '🇫🇷', text: 'De crypte onder Chartres is het best bewaarde geheim van de kathedraal. Vraag de gids ernaar!', time: '6u geleden', likes: 38, initials: 'I' },
  { id: 4, user: 'Marco B.', route: "Il Treno dell'Arte", flag: '🇮🇹', text: "Bagnoregio bij daglicht is magisch, maar laat in de middag — als de dagjesmensen weg zijn — is het onwerkelijk stil.", time: 'gisteren', likes: 67, initials: 'M' },
  { id: 5, user: 'Anna H.', route: 'Der Alpenexpress', flag: '🇦🇹', text: 'Hallstatt is inderdaad zo mooi als op alle foto\'s. De Chinese kopie heeft geen weerspiegeling in het meer.', time: 'gisteren', likes: 43, initials: 'A' },
  { id: 6, user: 'Thomas D.', route: 'De Bourgondische Lijn', flag: '🇧🇪', text: 'Het Begijnhof in Brugge vroeg in de ochtend, met enkel de nonnen en de merels. Vergeet de drukte van de Markt.', time: '2 dagen', likes: 29, initials: 'T' },
];

const avatarColors = ['#C2773A', '#7A9E8A', '#6B8EB0', '#B04A3A', '#8A7AB0', '#7A5C35'];

export default function Community() {
  const [tab, setTab] = useState('verslagen');
  const [liked, setLiked] = useState([]);

  return (
    <div className="screen" style={{ background: 'var(--parchment)' }}>
      <StatusBar light />

      <div className="screen-scroll">
        <div style={{ padding: '8px 16px 0' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 14 }}>
            <div>
              <p className="label" style={{ marginBottom: 3 }}>COMMUNITY</p>
              <h1 className="section-title" style={{ fontSize: 22 }}>Reizigers & Gidsen</h1>
            </div>
            <button style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'var(--copper)', border: 'none', borderRadius: 100, padding: '7px 14px', cursor: 'pointer', color: 'white', fontFamily: 'DM Sans', fontSize: 12, fontWeight: 500 }}>
              <Plus size={13} /> Deel
            </button>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: 0, borderBottom: '1.5px solid var(--border)', marginBottom: 16 }}>
            {['verslagen', 'gidsen', 'chatten'].map(t => (
              <button key={t} onClick={() => setTab(t)} style={{
                flex: 1, padding: '11px 4px 9px', background: 'none', border: 'none', cursor: 'pointer',
                fontFamily: 'DM Sans', fontSize: 13, fontWeight: tab === t ? 500 : 300,
                color: tab === t ? 'var(--dark-text)' : 'var(--slate)',
                borderBottom: `2.5px solid ${tab === t ? 'var(--copper)' : 'transparent'}`,
                textTransform: 'capitalize', transition: 'all 0.2s',
              }}>
                {t === 'verslagen' ? 'Verslagen' : t === 'gidsen' ? 'Gidsen' : 'Chatten'}
              </button>
            ))}
          </div>

          {/* Travel reports */}
          {tab === 'verslagen' && (
            <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {posts.map((post, i) => (
                <div key={post.id} className="card" style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 10 }}>
                    <div className="avatar" style={{ width: 38, height: 38, background: avatarColors[i % avatarColors.length], fontSize: 16, color: 'white', fontFamily: 'Playfair Display', fontStyle: 'italic' }}>
                      {post.initials}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                        <span className="card-title" style={{ fontSize: 14 }}>{post.user}</span>
                        <span className="caption">·</span>
                        <span className="caption">{post.time}</span>
                      </div>
                      <span className="tag-moss" style={{ fontSize: 10, marginTop: 2 }}>{post.flag} {post.route}</span>
                    </div>
                  </div>
                  <p className="body-text" style={{ fontSize: 13, marginBottom: 12 }}>{post.text}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <button
                      className={`upvote-btn ${liked.includes(post.id) ? 'voted' : ''}`}
                      style={{ padding: '5px 12px', fontSize: 12 }}
                      onClick={() => setLiked(prev => prev.includes(post.id) ? prev.filter(x => x !== post.id) : [...prev, post.id])}>
                      ❤️ {post.likes + (liked.includes(post.id) ? 1 : 0)}
                    </button>
                    <button style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--slate)' }}>
                      <MessageCircle size={13} />
                      <span style={{ fontFamily: 'DM Sans', fontSize: 12 }}>Reageer</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Local guides */}
          {tab === 'gidsen' && (
            <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {guides.map((guide, i) => (
                <div key={guide.id} className="card" style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 12 }}>
                    <div className="avatar" style={{ width: 52, height: 52, background: avatarColors[i % avatarColors.length], fontSize: 22, color: 'white', fontFamily: 'Playfair Display', fontStyle: 'italic' }}>
                      {guide.initials}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                        <h3 className="card-title" style={{ fontSize: 15 }}>{guide.flag} {guide.name}</h3>
                        <span className="badge badge-copper">Lokale held</span>
                      </div>
                      <p className="body-text" style={{ fontSize: 12, marginBottom: 4 }}>{guide.spec}</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                          <span className="stars">{'★'.repeat(Math.floor(guide.rating))}</span>
                          <span style={{ fontFamily: 'DM Sans', fontSize: 12, fontWeight: 500, color: 'var(--dark-text)' }}>{guide.rating}</span>
                        </div>
                        <span className="caption">({guide.reviews} reviews)</span>
                        <span className="caption">·</span>
                        <span className="caption">{guide.region}</span>
                      </div>
                    </div>
                  </div>

                  <div className="divider" style={{ marginBottom: 12 }} />

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 7, height: 7, borderRadius: '50%', background: guide.available ? '#4A7C5E' : 'var(--slate)' }} />
                      <span className="caption">{guide.available ? 'Beschikbaar' : 'Tijdelijk bezet'}</span>
                      <span className="caption">·</span>
                      <span style={{ fontFamily: 'DM Sans', fontSize: 12, fontWeight: 500, color: 'var(--dark-text)' }}>{guide.price}</span>
                    </div>
                    <button className="btn-outline" style={{ padding: '7px 14px', fontSize: 12 }}>
                      <MessageCircle size={12} style={{ display: 'inline', marginRight: 5, verticalAlign: 'middle' }} />
                      Stuur bericht
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Chat channels */}
          {tab === 'chatten' && (
            <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { channel: '#stille-oorlogslijn', flag: '🇳🇱', members: 23, last: 'Tom: Kasteel Ammersoyen morgen open?', time: '5 min' },
                { channel: '#de-rijnpoort', flag: '🇩🇪', members: 38, last: 'Klaus: De Drosselgasse is druk dit weekend', time: '22 min' },
                { channel: '#route-des-cathedrales', flag: '🇫🇷', members: 31, last: 'Claire: Chartres laat in de middag is magisch', time: '1u' },
                { channel: '#il-treno-dellarte', flag: '🇮🇹', members: 45, last: 'Marco: Bagnoregio vroeg in de ochtend — ga!', time: '2u' },
                { channel: '#alpenexpress', flag: '🇦🇹', members: 27, last: 'Anna: Hallstatt bootje: kom vroeg, vol na 10u', time: '3u' },
                { channel: '#bourgondische-lijn', flag: '🇧🇪', members: 41, last: 'Sofie: Aanrader: de bakkerij bij stop 3 👌', time: 'gisteren' },
              ].map((ch, i) => (
                <div key={i} className="card" style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
                  <div style={{ width: 42, height: 42, borderRadius: 12, background: 'rgba(194,119,58,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontSize: 20 }}>{ch.flag}</span>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 3 }}>
                      <h3 className="card-title" style={{ fontSize: 14 }}>{ch.channel}</h3>
                      <span className="caption" style={{ flexShrink: 0 }}>{ch.time}</span>
                    </div>
                    <p className="body-text" style={{ fontSize: 12, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ch.last}</p>
                  </div>
                  <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'var(--copper)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontSize: 9, color: 'white', fontWeight: 600 }}>{ch.members}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ height: 20 }} />
      </div>
    </div>
  );
}

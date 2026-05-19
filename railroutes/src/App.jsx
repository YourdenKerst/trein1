import { useState } from 'react';
import BottomNav from './components/BottomNav';
import Welcome from './screens/Welcome';
import Interests from './screens/Interests';
import Budget from './screens/Budget';
import Plan from './screens/Plan';
import StopDetail from './screens/StopDetail';
import GidsMode from './screens/GidsMode';
import Heatmap from './screens/Heatmap';
import Community from './screens/Community';
import TreinModus from './screens/TreinModus';
import { routes } from './data/mapData';

const ONBOARDING = ['welcome', 'interests', 'budget'];

export default function App() {
  const [screen, setScreen] = useState('welcome');
  const [navTab, setNavTab] = useState('plan');
  const [selectedStop, setSelectedStop] = useState(null);
  const [activeRoute, setActiveRoute] = useState(routes[0]);

  const inApp = !ONBOARDING.includes(screen);

  const handleNavSelect = (tab) => {
    setNavTab(tab);
    setSelectedStop(null);
    if (tab === 'plan') setScreen('plan');
    else if (tab === 'heatmap') setScreen('heatmap');
    else if (tab === 'community') setScreen('community');
    else if (tab === 'trip') setScreen('trein');
    else if (tab === 'discover') setScreen('gids');
  };

  const renderScreen = () => {
    switch (screen) {
      case 'welcome': return <Welcome onNext={() => setScreen('interests')} />;
      case 'interests': return <Interests onNext={() => setScreen('budget')} onBack={() => setScreen('welcome')} />;
      case 'budget': return <Budget onNext={() => { setScreen('plan'); }} onBack={() => setScreen('interests')} />;
      case 'plan':
        if (selectedStop) return <StopDetail stop={selectedStop} onBack={() => setSelectedStop(null)} />;
        return <Plan onStopSelect={(stop) => setSelectedStop(stop)} activeRoute={activeRoute} onRouteChange={setActiveRoute} />;
      case 'heatmap': return <Heatmap onBack={() => setScreen('plan')} />;
      case 'community': return <Community />;
      case 'trein': return <TreinModus />;
      case 'gids': return <GidsMode onBack={() => setScreen('plan')} activeRoute={activeRoute} />;
      default: return <Plan />;
    }
  };

  const demoScreens = [
    { id: 'welcome', label: 'Welcome' },
    { id: 'interests', label: 'Interesses' },
    { id: 'budget', label: 'Budget' },
    { id: 'plan', label: 'Plan' },
    { id: 'stopdetail', label: 'Stop' },
    { id: 'gids', label: 'Gids' },
    { id: 'heatmap', label: 'Heatmap' },
    { id: 'community', label: 'Community' },
    { id: 'trein', label: 'In-Trein' },
  ];

  const jumpTo = (id) => {
    setSelectedStop(null);
    if (id === 'stopdetail') {
      setScreen('plan');
      setSelectedStop({ id: 1, name: 'Kasteel Ammersoyen', location: 'Ammerzoden', tags: ['Kastelen', 'Middeleeuwen'], votes: 312 });
    } else {
      setScreen(id);
      if (['plan','heatmap','community','trein','gids'].includes(id)) {
        const tabMap = { plan:'plan', heatmap:'heatmap', community:'community', trein:'trip', gids:'discover' };
        setNavTab(tabMap[id] || 'plan');
      }
    }
  };

  return (
    <div className="app-shell" style={{ flexDirection: 'column', gap: 16 }}>
      {/* Demo navigator */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'center', maxWidth: 500 }}>
        {demoScreens.map(s => (
          <button key={s.id} onClick={() => jumpTo(s.id)} style={{
            padding: '5px 12px', borderRadius: 100,
            background: screen === s.id || (s.id === 'stopdetail' && selectedStop) ? '#e8412a' : 'rgba(20,163,114,0.1)',
            color: screen === s.id || (s.id === 'stopdetail' && selectedStop) ? 'white' : 'rgba(255,255,255,0.55)',
            border: 'none', cursor: 'pointer',
            fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 400,
            transition: 'all 0.2s',
          }}>
            {s.label}
          </button>
        ))}
      </div>
      <div className="phone-frame">
        <div className="screen" style={{ flex: 1 }}>
          {renderScreen()}
        </div>
        {inApp && !selectedStop && (
          <BottomNav
            active={navTab}
            onSelect={handleNavSelect}
          />
        )}
        {inApp && selectedStop && (
          <BottomNav
            active={navTab}
            onSelect={handleNavSelect}
          />
        )}
      </div>
    </div>
  );
}

import { Map, Compass, Train, Users, Navigation } from 'lucide-react';

const tabs = [
  { id: 'plan', label: 'Plannen', Icon: Map },
  { id: 'discover', label: 'Ontdekken', Icon: Compass },
  { id: 'trip', label: 'Reis', Icon: Train },
  { id: 'community', label: 'Community', Icon: Users },
  { id: 'heatmap', label: 'Kaart', Icon: Navigation },
];

export default function BottomNav({ active, onSelect }) {
  return (
    <nav className="bottom-nav">
      {tabs.map(({ id, label, Icon }) => (
        <button key={id} className={`nav-item ${active === id ? 'active' : ''}`} onClick={() => onSelect(id)}>
          <Icon size={20} strokeWidth={active === id ? 2 : 1.5} />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  );
}

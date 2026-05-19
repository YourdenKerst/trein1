export default function StatusBar({ dark = false }) {
  return (
    <div className={`status-bar ${dark ? 'dark' : 'light'}`}>
      <span className="time">9:41</span>
      <div className="icons">
        <svg width="17" height="12" viewBox="0 0 17 12" fill="currentColor">
          <rect x="0" y="3" width="3" height="9" rx="1" opacity="0.4"/>
          <rect x="4.5" y="2" width="3" height="10" rx="1" opacity="0.6"/>
          <rect x="9" y="0" width="3" height="12" rx="1"/>
          <rect x="13.5" y="0" width="3" height="12" rx="1"/>
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor">
          <path d="M8 2.4C10.5 2.4 12.7 3.5 14.2 5.2L15.5 3.9C13.7 1.9 11 .7 8 .7S2.3 1.9.5 3.9l1.3 1.3C3.3 3.5 5.5 2.4 8 2.4z" opacity="0.4"/>
          <path d="M8 5C9.8 5 11.4 5.8 12.6 7L13.9 5.7C12.4 4.2 10.3 3.3 8 3.3S3.6 4.2 2.1 5.7L3.4 7C4.6 5.8 6.2 5 8 5z" opacity="0.7"/>
          <circle cx="8" cy="10" r="1.5"/>
        </svg>
        <svg width="25" height="12" viewBox="0 0 25 12" fill="currentColor">
          <rect x="0" y="1" width="21" height="10" rx="3" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.35"/>
          <rect x="1.5" y="2.5" width="16" height="7" rx="2" fill="currentColor"/>
          <path d="M22.5 4.5v3a1.5 1.5 0 000-3z" fill="currentColor" opacity="0.4"/>
        </svg>
      </div>
    </div>
  );
}

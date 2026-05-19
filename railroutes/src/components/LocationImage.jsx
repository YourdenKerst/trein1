import { useWikiImage } from '../hooks/useWikiImage';

export default function LocationImage({ wikiTitle, height = 180, style = {} }) {
  const url = useWikiImage(wikiTitle);

  if (!url) {
    return (
      <div style={{
        height,
        background: 'linear-gradient(135deg, #2C1F0E 0%, #5a4025 50%, #7a5c35 100%)',
        borderRadius: 14,
        ...style,
      }} />
    );
  }

  return (
    <img
      src={url}
      alt={wikiTitle}
      style={{
        width: '100%',
        height,
        objectFit: 'cover',
        borderRadius: 14,
        display: 'block',
        ...style,
      }}
    />
  );
}

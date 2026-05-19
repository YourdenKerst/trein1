import { CITIES } from '../data/cities';

// ─── Transit nodes (superset of cities — includes intermediate hubs) ──────────
const NODES = [
  { id: 'amsterdam',   label: 'Amsterdam',   coords: [52.379,  4.900] },
  { id: 'rotterdam',   label: 'Rotterdam',   coords: [51.925,  4.478] },
  { id: 'antwerp',     label: 'Antwerpen',   coords: [51.221,  4.400] },
  { id: 'brussels',    label: 'Brussel',     coords: [50.846,  4.352] },
  { id: 'dusseldorf',  label: 'Düsseldorf',  coords: [51.225,  6.782] },
  { id: 'cologne',     label: 'Köln',        coords: [50.938,  6.960] },
  { id: 'luxembourg',  label: 'Luxemburg',   coords: [49.611,  6.131] },
  { id: 'paris',       label: 'Parijs',      coords: [48.853,  2.350] },
  { id: 'frankfurt',   label: 'Frankfurt',   coords: [50.110,  8.682] },
  { id: 'strasbourg',  label: 'Straatsburg', coords: [48.583,  7.745] },
  { id: 'rudesheim',   label: 'Rüdesheim',   coords: [49.979,  7.925] },
  { id: 'mannheim',    label: 'Mannheim',    coords: [49.487,  8.466] },
  { id: 'stuttgart',   label: 'Stuttgart',   coords: [48.775,  9.183] },
  { id: 'nuremberg',   label: 'Neurenberg',  coords: [49.452, 11.077] },
  { id: 'basel',       label: 'Basel',       coords: [47.557,  7.593] },
  { id: 'zurich',      label: 'Zürich',      coords: [47.377,  8.541] },
  { id: 'bern',        label: 'Bern',        coords: [46.948,  7.448] },
  { id: 'geneva',      label: 'Genève',      coords: [46.204,  6.143] },
  { id: 'lyon',        label: 'Lyon',        coords: [45.748,  4.842] },
  { id: 'marseille',   label: 'Marseille',   coords: [43.297,  5.381] },
  { id: 'nice',        label: 'Nice',        coords: [43.710,  7.262] },
  { id: 'barcelona',   label: 'Barcelona',   coords: [41.386,  2.170] },
  { id: 'zaragoza',    label: 'Zaragoza',    coords: [41.648, -0.890] },
  { id: 'madrid',      label: 'Madrid',      coords: [40.416, -3.703] },
  { id: 'bordeaux',    label: 'Bordeaux',    coords: [44.837, -0.580] },
  { id: 'seville',     label: 'Sevilla',     coords: [37.389, -5.984] },
  { id: 'lisbon',      label: 'Lissabon',    coords: [38.717, -9.139] },
  { id: 'porto',       label: 'Porto',       coords: [41.149, -8.610] },
  { id: 'munich',      label: 'München',     coords: [48.137, 11.575] },
  { id: 'innsbruck',   label: 'Innsbruck',   coords: [47.269, 11.393] },
  { id: 'verona',      label: 'Verona',      coords: [45.438, 10.992] },
  { id: 'milan',       label: 'Milaan',      coords: [45.464,  9.190] },
  { id: 'genoa',       label: 'Genua',       coords: [44.405,  8.946] },
  { id: 'bologna',     label: 'Bologna',     coords: [44.494, 11.343] },
  { id: 'venice',      label: 'Venetië',     coords: [45.440, 12.330] },
  { id: 'florence',    label: 'Florence',    coords: [43.769, 11.256] },
  { id: 'rome',        label: 'Rome',        coords: [41.896, 12.483] },
  { id: 'naples',      label: 'Napels',      coords: [40.853, 14.268] },
  { id: 'salzburg',    label: 'Salzburg',    coords: [47.800, 13.046] },
  { id: 'vienna',      label: 'Wenen',       coords: [48.208, 16.374] },
  { id: 'bratislava',  label: 'Bratislava',  coords: [48.148, 17.108] },
  { id: 'budapest',    label: 'Boedapest',   coords: [47.497, 19.040] },
  { id: 'zagreb',      label: 'Zagreb',      coords: [45.815, 15.982] },
  { id: 'belgrade',    label: 'Belgrado',    coords: [44.787, 20.457] },
  { id: 'sofia',       label: 'Sofia',       coords: [42.698, 23.321] },
  { id: 'thessaloniki', label: 'Thessaloniki', coords: [40.629, 22.947] },
  { id: 'athens',      label: 'Athene',      coords: [37.984, 23.728] },
  { id: 'prague',      label: 'Praag',       coords: [50.088, 14.421] },
  { id: 'berlin',      label: 'Berlijn',     coords: [52.517, 13.389] },
  { id: 'hamburg',     label: 'Hamburg',     coords: [53.575, 10.016] },
  { id: 'copenhagen',  label: 'Kopenhagen',  coords: [55.676, 12.568] },
  { id: 'stockholm',   label: 'Stockholm',   coords: [59.333, 18.065] },
  { id: 'oslo',        label: 'Oslo',        coords: [59.913, 10.740] },
  { id: 'warsaw',      label: 'Warschau',    coords: [52.229, 21.012] },
  { id: 'krakow',      label: 'Krakau',      coords: [50.060, 19.940] },
  { id: 'bucharest',   label: 'Boekarest',   coords: [44.432, 26.104] },
];

// ─── Scenic corridor variants ─────────────────────────────────────────────────
const SCENIC_VARIANTS = [
  {
    id: 'rhine',
    label: '🏰 Rijndal',
    color: '#14a372',
    theme: 'Kastelen & wijn',
    corridor: { minLat: 46, maxLat: 52, minLon: 4.5, maxLon: 11 },
    waypoints: [
      { label: 'Köln',      flag: '🇩🇪', tag: 'Gotische dom',  coords: [50.938,  6.960], overnight: false, wikiTitle: 'Cologne Cathedral' },
      { label: 'Rüdesheim', flag: '🇩🇪', tag: 'Wijnstreek',    coords: [49.979,  7.925], overnight: true,  wikiTitle: 'Rüdesheim am Rhein', overnightDesc: 'Overnacht aan de Rijn. Verken de Drosselgasse en proef lokale wijnen.' },
      { label: 'Basel',     flag: '🇨🇭', tag: 'Grensstad',     coords: [47.557,  7.593], overnight: false, wikiTitle: 'Basel' },
    ],
    extraTime: '+ 1 dag',
  },
  {
    id: 'alps',
    label: '⛰️ Alpen',
    color: '#2196d4',
    theme: 'Natuur & bergen',
    corridor: { minLat: 44, maxLat: 51, minLon: 8, maxLon: 17 },
    waypoints: [
      { label: 'München',   flag: '🇩🇪', tag: 'Beierse cultuur',  coords: [48.137, 11.575], overnight: false, wikiTitle: 'Munich' },
      { label: 'Innsbruck', flag: '🇦🇹', tag: 'Alpenhoofdstad',   coords: [47.269, 11.393], overnight: true,  wikiTitle: 'Innsbruck', overnightDesc: 'Wandel door de Altstadt en neem de Nordkettenbahn omhoog.' },
      { label: 'Verona',    flag: '🇮🇹', tag: 'Romeo & Julia',    coords: [45.438, 10.992], overnight: false, wikiTitle: 'Verona' },
    ],
    extraTime: '+ 1 dag',
  },
  {
    id: 'cote-azur',
    label: '🌊 Côte d\'Azur',
    color: '#e07b39',
    theme: 'Zon & cultuur',
    corridor: { minLat: 38, maxLat: 46, minLon: -1, maxLon: 9 },
    waypoints: [
      { label: 'Marseille', flag: '🇫🇷', tag: 'Havenstad', coords: [43.297, 5.381], overnight: false, wikiTitle: 'Marseille' },
      { label: 'Nice',      flag: '🇫🇷', tag: 'Rivièra',   coords: [43.710, 7.262], overnight: true,  wikiTitle: 'Nice', overnightDesc: 'Overnacht aan de promenade. Dagtrip naar Monaco of Eze.' },
    ],
    extraTime: '+ 1 dag',
  },
  {
    id: 'tuscany',
    label: '🍷 Toscane',
    color: '#8A4A35',
    theme: 'Kunst & gastronomie',
    corridor: { minLat: 40, maxLat: 46, minLon: 9, maxLon: 15 },
    waypoints: [
      { label: 'Florence', flag: '🇮🇹', tag: 'Renaissance',     coords: [43.769, 11.256], overnight: true,  wikiTitle: 'Florence', overnightDesc: 'Een dag in Florence. Uffizi in de ochtend, Oltrarno in de avond.' },
      { label: 'Siena',    flag: '🇮🇹', tag: 'Middeleeuwse stad', coords: [43.318, 11.330], overnight: false, wikiTitle: 'Siena' },
    ],
    extraTime: '+ 1 dag',
  },
  {
    id: 'danube',
    label: '🏛️ Donau',
    color: '#4A6B8A',
    theme: 'Keizerlijke steden',
    corridor: { minLat: 44, maxLat: 53, minLon: 13, maxLon: 23 },
    waypoints: [
      { label: 'Wenen',      flag: '🇦🇹', tag: 'Keizerlijke hofstad', coords: [48.208, 16.374], overnight: true,  wikiTitle: 'Vienna', overnightDesc: 'Een dag in Wenen. Belvedere in de ochtend, Naschmarkt in de middag.' },
      { label: 'Bratislava', flag: '🇸🇰', tag: 'Slotstad',           coords: [48.148, 17.108], overnight: false, wikiTitle: 'Bratislava' },
    ],
    extraTime: '+ 1 dag',
  },
  {
    id: 'north',
    label: '🌊 Scandinavië',
    color: '#4A7C8E',
    theme: 'Fjorden & design',
    corridor: { minLat: 53, maxLat: 65, minLon: 4, maxLon: 28 },
    waypoints: [
      { label: 'Hamburg',    flag: '🇩🇪', tag: 'Havenstad',  coords: [53.575, 10.016], overnight: false, wikiTitle: 'Hamburg' },
      { label: 'Kopenhagen', flag: '🇩🇰', tag: 'Designstad', coords: [55.676, 12.568], overnight: true,  wikiTitle: 'Copenhagen', overnightDesc: 'Overnacht in Kopenhagen. Nyhavn in de avond, Tivoli de volgende dag.' },
    ],
    extraTime: '+ 1 dag',
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function distToSegment(p, a, b) {
  const dx = b[0] - a[0], dy = b[1] - a[1];
  const len2 = dx * dx + dy * dy;
  if (len2 === 0) return Math.hypot(p[0] - a[0], p[1] - a[1]);
  const t = Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / len2));
  return Math.hypot(p[0] - a[0] - t * dx, p[1] - a[1] - t * dy);
}

function projectionT(p, a, b) {
  const dx = b[0] - a[0], dy = b[1] - a[1];
  const len2 = dx * dx + dy * dy;
  if (len2 === 0) return 0;
  return ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / len2;
}

function estimateDuration(a, b) {
  const latKm = Math.abs(b[0] - a[0]) * 111;
  const lonKm = Math.abs(b[1] - a[1]) * 111 * Math.cos(((a[0] + b[0]) / 2) * Math.PI / 180);
  const dist = Math.hypot(latKm, lonKm);
  const hours = Math.max(1, Math.round(dist / 120));
  if (hours <= 1) return '± 1u';
  if (hours < 24) return `± ${hours}u`;
  return `± ${Math.ceil(hours / 8)} dagen`;
}

// ─── Public API ───────────────────────────────────────────────────────────────

export function findCity(query) {
  const q = (query || '').toLowerCase().trim();
  if (!q) return null;
  for (const c of CITIES) {
    if (c.names.some(n => n === q)) return c;
  }
  for (const c of CITIES) {
    if (c.names.some(n => n.startsWith(q) || q.startsWith(n))) return c;
  }
  for (const c of CITIES) {
    if (c.names.some(n => n.includes(q) || q.includes(n))) return c;
  }
  return null;
}

function buildDirectPath(from, to) {
  const CORRIDOR = 2.8;
  const candidates = NODES.filter(n => {
    if (n.id === from.id || n.id === to.id) return false;
    const d = distToSegment(n.coords, from.coords, to.coords);
    const t = projectionT(n.coords, from.coords, to.coords);
    return d < CORRIDOR && t > 0.05 && t < 0.95;
  });

  candidates.sort((a, b) =>
    projectionT(a.coords, from.coords, to.coords) -
    projectionT(b.coords, from.coords, to.coords)
  );

  // Deduplicate: skip nodes too close to each other
  const selected = [];
  for (const c of candidates) {
    if (selected.length >= 5) break;
    const tooClose = selected.some(s =>
      Math.hypot(s.coords[0] - c.coords[0], s.coords[1] - c.coords[1]) < 1.5
    );
    if (!tooClose) selected.push(c);
  }

  return {
    coords: [from.coords, ...selected.map(n => n.coords), to.coords],
    intermediateStops: selected.map(n => n.label),
    transfers: selected.length,
    duration: estimateDuration(from.coords, to.coords),
  };
}

function bboxOverlapsCorridor(from, to, c) {
  const minLat = Math.min(from.coords[0], to.coords[0]);
  const maxLat = Math.max(from.coords[0], to.coords[0]);
  const minLon = Math.min(from.coords[1], to.coords[1]);
  const maxLon = Math.max(from.coords[1], to.coords[1]);
  return maxLat > c.minLat && minLat < c.maxLat && maxLon > c.minLon && minLon < c.maxLon;
}

function buildScenicPath(from, to, variant) {
  // Only include waypoints that lie geographically between from and to
  const relevant = variant.waypoints.filter(w => {
    const t = projectionT(w.coords, from.coords, to.coords);
    return t > -0.3 && t < 1.3;
  });
  const wps = relevant.length > 0 ? relevant : variant.waypoints;
  return {
    coords: [from.coords, ...wps.map(w => w.coords), to.coords],
    waypoints: wps,
  };
}

export function generateRoutes(from, to) {
  const direct = buildDirectPath(from, to);

  const applicable = SCENIC_VARIANTS.filter(v =>
    bboxOverlapsCorridor(from, to, v.corridor)
  ).slice(0, 2);

  const routes = [
    {
      id: 'direct',
      label: '⚡ Direct',
      colorRaw: '#e8412a',
      isScenic: false,
      coords: direct.coords,
      transfers: direct.transfers,
      duration: direct.duration,
      intermediateStops: direct.intermediateStops,
    },
  ];

  for (const variant of applicable) {
    const scenic = buildScenicPath(from, to, variant);
    routes.push({
      id: variant.id,
      label: variant.label,
      colorRaw: variant.color,
      isScenic: true,
      theme: variant.theme,
      coords: scenic.coords,
      extraTime: variant.extraTime,
      waypoints: scenic.waypoints,
    });
  }

  return routes;
}

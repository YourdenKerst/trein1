// Dutch Interrail departure stations (station IDs from interrail/juliuste format)
export const dutchStations = [
  { id: '8400058', name: 'Amsterdam Centraal', short: 'Amsterdam', coords: [52.3791, 4.9003] },
  { id: '8400621', name: 'Utrecht Centraal',   short: 'Utrecht',   coords: [52.0894, 5.1077] },
  { id: '8400530', name: 'Rotterdam Centraal', short: 'Rotterdam', coords: [51.9248, 4.4699] },
  { id: '8400282', name: 'Den Haag Centraal',  short: 'Den Haag',  coords: [52.0801, 4.3248] },
  { id: '8400206', name: 'Eindhoven',          short: 'Eindhoven', coords: [51.4432, 5.4813] },
  { id: '8400428', name: 'Nijmegen',           short: 'Nijmegen',  coords: [51.8453, 5.8523] },
];

// Interrail connection info per route (realistic journey data)
export const routeConnections = {
  oorlog: {
    from: 'Nijmegen',
    stationId: '8400428',
    duration: '± 45 min',
    changes: 0,
    trains: ['Sprinter → Nijmegen'],
    tip: 'Rechtstreeks naar Nijmegen, dan bus 77 naar Ammerzoden. Geen reservering nodig.',
  },
  rijn: {
    from: 'Utrecht',
    stationId: '8400621',
    duration: '± 2u 30 min',
    changes: 1,
    trains: ['IC → Köln Hbf', 'RE → Rüdesheim'],
    tip: 'Intercity naar Köln (2u), dan regionaal langs de Rijn. Prachtig panorama!',
  },
  kathedralen: {
    from: 'Rotterdam',
    stationId: '8400530',
    duration: '± 3u',
    changes: 1,
    trains: ['Thalys → Paris Montparnasse', 'TER → Chartres'],
    tip: 'Thalys naar Parijs (2u15), dan TER naar Chartres (1u). Reservering vereist voor Thalys.',
  },
  toscane: {
    from: 'Amsterdam',
    stationId: '8400058',
    duration: '± 11u',
    changes: 2,
    trains: ['ICE → München Hbf', 'EC → Firenze SMN'],
    tip: 'ICE naar München (6u), EuroCity naar Florence (5u). Of neem de nachttrein — word wakker in Italië.',
  },
  alpen: {
    from: 'Amsterdam',
    stationId: '8400058',
    duration: '± 6u 30 min',
    changes: 1,
    trains: ['ICE → München Hbf', 'RailJet → Innsbruck'],
    tip: 'ICE naar München (6u), RailJet naar Innsbruck (2u). Snijdt spectaculair door de Alpen.',
  },
  bourgondisch: {
    from: 'Amsterdam',
    stationId: '8400058',
    duration: '± 2u',
    changes: 1,
    trains: ['Thalys → Brussel-Zuid', 'IC → Brugge'],
    tip: 'Thalys naar Brussel (1u45), IC naar Brugge (1u). Makkellijkste Europese dagtrip vanuit NL.',
  },
};

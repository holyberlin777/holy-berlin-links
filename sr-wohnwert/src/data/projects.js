/**
 * Projekte (Entwicklungen) – Reihenfolge = Reihenfolge im Slider und in der Karte.
 *
 * image      → Schlüssel aus der Bild-Pipeline (src/data/generated/images.js)
 * gallery    → weitere Bilder für die Detailansicht (erstes Bild = Titelbild)
 * credit     → Kennzeichnung des Bildtyps (Visualisierung / Foto)
 * ratio      → Seitenverhältnis (Breite ÷ Höhe) der Karte im Slider
 * position   → Bildausschnitt (object-position)
 * geo        → [Breitengrad, Längengrad] für die Karte; ohne geo → "außerhalb der Karte"
 * pin        → optionaler Versatz [x, y] auf der Karte, wenn sich Standorte überlagern
 */
import { NBSP } from './site.js'

const m2 = (n) => `${n}${NBSP}m²`

export const projects = [
  {
    id: 'wassergaerten-wendenschloss',
    name: 'Wassergärten Wendenschloss',
    place: 'Berlin-Köpenick',
    region: 'Berlin',
    type: 'Neubau · Wohnen am Wasser',
    teaser: 'Wohnen, wo die Hauptstadt am grünsten ist.',
    summary:
      '36 moderne Familiendomizile – 32 Doppelhaushälften und 4 Einfamilienhäuser in exklusiver Wasserlage. Eigene Bootsliegeplätze am Grundstück, ein eigener Strand direkt am Grundstück, ein eigener Garten und Wasserblick von jedem Haus.',
    facts: [
      ['Einheiten', '36 Häuser (32 DHH · 4 EFH)'],
      ['Lage', 'Wasserlage mit Bootsliegeplätzen'],
      ['Highlight', 'Eigener Strand direkt am Grundstück'],
      ['Fertigstellung', '2025'],
    ],
    image: 'wassergaerten',
    gallery: [{ key: 'wassergaerten', credit: 'Foto' }],
    credit: 'Foto',
    ratio: 0.75,
    position: '50% 55%',
    geo: [52.429, 13.5788], // Wendenschloßstraße 294, Köpenick
  },
  {
    id: 'rosenfelder-ring',
    name: 'Rosenfelder Ring',
    place: 'Berlin-Lichtenberg',
    region: 'Berlin',
    type: 'Neubau · Appartements',
    teaser: `46 moderne Appartements auf ${m2('1.970')} Grundstück.`,
    summary: `Auf dem ${m2('1.970')} großen Grundstück entstehen 46 moderne Appartements – vom Einzimmer-Appartement bis zur Dreizimmerwohnung.`,
    facts: [
      ['Grundstück', m2('1.970')],
      ['Einheiten', '46 Appartements'],
      ['Aufteilung', '25 × 1 Zimmer · 16 × 2 Zimmer · 5 × 3 Zimmer'],
      ['Gesamt-BGF', m2('3.545')],
      ['Geplanter Start', 'Mai 2026'],
      ['Fertigstellung', 'I. Quartal 2028'],
    ],
    image: 'hero',
    gallery: [{ key: 'hero', credit: 'Visualisierung' }],
    credit: 'Visualisierung',
    ratio: 1.2,
    position: '58% 50%',
    geo: [52.5122, 13.5125],
  },
  {
    id: 'kelchstrasse',
    name: 'Kelchstraße',
    place: 'Berlin-Steglitz',
    region: 'Berlin',
    type: 'Neubau · Boardinghaus',
    teaser: `Boardinghaus mit 184 Zimmern auf ${m2('5.267')} Grundstück.`,
    summary: `Auf dem ${m2('5.267')} großen Grundstück in der Kelchstraße entsteht ein Boardinghaus mit insgesamt 184 Zimmern.`,
    facts: [
      ['Grundstück', m2('5.267')],
      ['Einheiten', '184 Zimmer'],
      ['Gesamt-BGF', m2('9.220')],
      ['Geplanter Start', 'I. Quartal 2026'],
      ['Fertigstellung', 'III. Quartal 2028'],
    ],
    image: 'kelchstrasse',
    gallery: [{ key: 'kelchstrasse', credit: 'Visualisierung' }],
    credit: 'Visualisierung',
    ratio: 1.3,
    position: '45% 40%',
    geo: [52.4495, 13.3581],
  },
  {
    id: 'winckelmannstrasse-49',
    name: `Winckelmannstraße${NBSP}49`,
    place: 'Berlin-Johannisthal',
    region: 'Berlin',
    type: 'Grundstücksentwicklung',
    teaser: 'Optimale Lage am Wissenschaftsstandort Adlershof.',
    summary:
      'Das Grundstück Winckelmannstraße zeichnet sich durch eine optimale Lage in unmittelbarer Nachbarschaft zum Campus und zum Wissenschaftsstandort Adlershof aus. Alle Einrichtungen sind fußläufig erreichbar. Der Kiez um die Winckelmannstraße hat eine perfekte Wohnqualität.',
    facts: [
      ['Lage', 'Nähe Campus & Wissenschaftsstandort Adlershof'],
      ['Infrastruktur', 'Alle Einrichtungen fußläufig erreichbar'],
      ['Quartier', 'Kiez mit perfekter Wohnqualität'],
    ],
    image: 'winckelmann',
    gallery: [{ key: 'winckelmann', credit: 'Visualisierung' }],
    credit: 'Visualisierung',
    ratio: 1.25,
    position: '36% 50%',
    geo: [52.4414, 13.5064],
  },
  {
    id: 'klistostrasse-12',
    name: `Klistostraße${NBSP}12`,
    place: 'Berlin-Zehlendorf',
    region: 'Berlin',
    type: 'Neubau · Eigentumswohnungen',
    teaser: '5 moderne und zeitlose Eigentumswohnungen.',
    summary:
      'In Zehlendorf entstehen 5 moderne und zeitlose Eigentumswohnungen in tradiertem Wohnumfeld. Großzügige Grundrisse, Stellplätze und ausreichend Platz für E-Bikes sorgen für ein angenehmes Wohnambiente.',
    facts: [
      ['Einheiten', '5 Eigentumswohnungen'],
      ['Grundrisse', 'Großzügig geschnitten'],
      ['Ausstattung', 'Stellplätze und Platz für E-Bikes'],
      ['Umfeld', 'Tradiertes Wohnumfeld in Zehlendorf'],
    ],
    image: 'klisto-1',
    gallery: [
      { key: 'klisto-1', credit: 'Visualisierung' },
      { key: 'klisto-2', credit: 'Visualisierung' },
      { key: 'klisto-3', credit: 'Visualisierung' },
      { key: 'klisto-4', credit: 'Visualisierung' },
    ],
    credit: 'Visualisierung',
    ratio: 0.8,
    position: '50% 50%',
    geo: [52.4195, 13.2544],
  },
  {
    id: 'ruhlsdorfer-platz-3',
    name: `Ruhlsdorfer Platz${NBSP}3`,
    place: 'Teltow',
    region: 'Brandenburg',
    type: 'Neubau · Apartments',
    teaser: '60 moderne Apartments mitten in Teltow.',
    summary:
      'Im belebten Teltow entstehen 60 moderne Apartments für Studenten, Singles und kleine Familien – mitten am Ruhlsdorfer Platz.',
    facts: [
      ['Einheiten', '60 Apartments'],
      ['Zielgruppe', 'Studenten, Singles, kleine Familien'],
      ['Lage', 'Ruhlsdorfer Platz, Teltow'],
    ],
    image: 'ruhlsdorf-1',
    gallery: [
      { key: 'ruhlsdorf-1', credit: 'Visualisierung' },
      { key: 'ruhlsdorf-2', credit: 'Visualisierung' },
      { key: 'ruhlsdorf-3', credit: 'Axonometrie' },
    ],
    credit: 'Visualisierung',
    ratio: 0.8,
    position: '50% 50%',
    geo: [52.4008, 13.2696],
    pin: [-7, 6],
  },
  {
    id: 'lichterfelder-allee-3-4',
    name: `Lichterfelder Allee${NBSP}3–4`,
    place: 'Teltow',
    region: 'Brandenburg',
    type: 'Neubau · Eckgebäude',
    teaser: 'Familienfreundlich, modern, optimiert.',
    summary:
      'Genau gegenüber dem Ruhlsdorfer Platz realisieren wir ein weiteres Eckgebäude im städtebaulichen Kontext – familienfreundlich, modern, optimiert.',
    facts: [
      ['Typ', 'Eckgebäude im städtebaulichen Kontext'],
      ['Ausrichtung', 'Familienfreundlich, modern, optimiert'],
      ['Fertigstellung', '2026'],
    ],
    image: 'lichterfelde',
    gallery: [{ key: 'lichterfelde', credit: 'Visualisierung' }],
    credit: 'Visualisierung',
    ratio: 0.85,
    position: '50% 45%',
    geo: [52.4011, 13.2699],
    pin: [8, -7],
  },
  {
    id: 'turiner-strasse-49',
    name: `Turiner Straße${NBSP}49`,
    place: 'Berlin-Wedding',
    region: 'Berlin',
    type: 'Grundstücksentwicklung',
    teaser: 'Gefragte Lage am Schillerpark.',
    summary:
      'Das Grundstück Turiner Straße zeichnet sich durch seine sehr gefragte Lage aus – in unmittelbarer Nachbarschaft zum Schillerpark und zur Berliner Hochschule für Technik sowie zu mehreren Wasser- und Grünflächen im Umfeld.',
    facts: [
      ['Lage', 'Nähe Schillerpark & Berliner Hochschule für Technik'],
      ['Umfeld', 'Mehrere Wasser- und Grünflächen'],
    ],
    image: 'turiner',
    gallery: [{ key: 'turiner', credit: 'Visualisierung' }],
    credit: 'Visualisierung',
    ratio: 1.25,
    position: '30% 50%',
    geo: [52.5519, 13.3547],
  },
  {
    id: 'porta-westfalica',
    name: 'Porta Westfalica',
    place: 'Porta Westfalica',
    region: 'Nordrhein-Westfalen',
    type: 'Sanierung · Bezahlbarer Wohnraum',
    teaser: '56 bezahlbare Wohnungen mit Landesförderung.',
    summary:
      'Sanierung eines Plattenbaus aus den 70er Jahren. Hier entstehen 56 bezahlbare Wohnungen, die mit Fördermitteln des Landes Nordrhein-Westfalen fertiggestellt werden.',
    facts: [
      ['Adresse', 'Georg-Rost-Straße 2, 32547 Porta Westfalica'],
      ['Bestand', 'Plattenbau aus den 1970er Jahren'],
      ['Einheiten', '56 bezahlbare Wohnungen'],
      ['Förderung', 'Land Nordrhein-Westfalen'],
      ['Geplanter Start', 'IV. Quartal 2025'],
      ['Fertigstellung', 'I. Quartal 2028'],
    ],
    image: 'porta',
    gallery: [{ key: 'porta', credit: 'Visualisierung' }],
    credit: 'Visualisierung',
    ratio: 0.75,
    position: '50% 50%',
    offmap: 'Nordrhein-Westfalen',
  },
  {
    id: 'erndtebrueck-kuhlmann-haeuser',
    name: 'Erndtebrück – Kuhlmann Häuser',
    shortName: 'Erndtebrück',
    place: 'Erndtebrück',
    region: 'Nordrhein-Westfalen',
    type: 'Sanierung · Bezahlbarer Wohnraum',
    teaser: '10 Mehrfamilienhäuser, 60 bezahlbare Wohnungen.',
    summary:
      'Sanierung von 10 Mehrfamilienhäusern aus dem Ensemble der Kuhlmann Häuser. Hier entstehen 60 bezahlbare Wohnungen, die mit Fördermitteln des Landes Nordrhein-Westfalen fertiggestellt werden.',
    facts: [
      ['Adresse', '57339 Erndtebrück'],
      ['Objekte', '10 Mehrfamilienhäuser (Ensemble Kuhlmann Häuser)'],
      ['Einheiten', '60 bezahlbare Wohnungen'],
      ['Förderung', 'Land Nordrhein-Westfalen'],
      ['Geplanter Start', 'I. Quartal 2026'],
      ['Fertigstellung', 'I. Quartal 2028'],
    ],
    image: 'erndtebrueck',
    gallery: [{ key: 'erndtebrueck', credit: 'Foto · Bestand' }],
    credit: 'Foto · Bestand',
    ratio: 1.25,
    position: '60% 55%',
    offmap: 'Nordrhein-Westfalen',
  },
]

/** Schlüsselzahlen – werden aus den Projektdaten und der Gruppe berechnet */
export const unitCount = 36 + 46 + 56 + 184 + 5 + 60 + 60 // Wassergärten, Rosenfelder Ring, Porta Westfalica, Kelchstraße, Klistostraße, Ruhlsdorfer Platz, Erndtebrück

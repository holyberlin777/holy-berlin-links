/**
 * Referenzen "Sanieren & Bauen" – Bau- und Sanierungsleistungen.
 *
 * images   → ein bis vier Bilder, werden je nach Anzahl als Collage angeordnet
 * projectId → verweist auf ein Entwicklungsprojekt (öffnet dessen Detailansicht)
 */
import { NBSP } from './site.js'

export const references = [
  {
    id: 'albrechtstrasse',
    name: 'Albrechtstraße',
    place: 'Berlin-Steglitz',
    kind: 'Schlüsselfertiges Bauen',
    text: `Schlüsselfertige Herstellung von 25 Wohnungen im Eigentum – in allen Gewerken.`,
    scope: ['Alle Gewerke', '25 Eigentumswohnungen'],
    images: [
      { key: 'bau-albrecht-1', credit: 'Visualisierung', position: '50% 40%' },
      { key: 'bau-albrecht-2', credit: 'Visualisierung', position: '50% 50%' },
      { key: 'bau-albrecht-3', credit: 'Visualisierung', position: '50% 55%' },
    ],
  },
  {
    id: 'stadler-berlin',
    name: `Zweirad-Center Stadler${NBSP}Berlin`,
    place: 'Berlin-Steglitz',
    kind: 'Ausbau & Brandschutz',
    text: 'Neubau der Unternehmenszentrale – Trockenbau, Brandschutz und Malerarbeiten.',
    scope: ['Trockenbau', 'Brandschutz', 'Malerarbeiten'],
    images: [{ key: 'bau-stadler-b', credit: 'Foto', position: '50% 50%' }],
  },
  {
    id: 'stadler-regensburg',
    name: `Zweirad-Center Stadler${NBSP}Regensburg`,
    place: 'Regensburg',
    kind: 'Ausbau & Brandschutz',
    text: 'Neubau der Unternehmenszentrale – Trockenbau, Brandschutz und Malerarbeiten.',
    scope: ['Trockenbau', 'Brandschutz', 'Malerarbeiten'],
    images: [
      { key: 'bau-stadler-r-1', credit: 'Foto · Baufortschritt', position: '50% 50%' },
      { key: 'bau-stadler-r-2', credit: 'Foto · Baufortschritt', position: '50% 55%' },
      { key: 'bau-stadler-r-3', credit: 'Foto · Baufortschritt', position: '50% 50%' },
      { key: 'bau-stadler-r-4', credit: 'Foto · Baufortschritt', position: '50% 50%' },
    ],
  },
  {
    id: 'sanierung-porta-westfalica',
    name: 'Porta Westfalica',
    place: 'Nordrhein-Westfalen',
    kind: 'Energetische Sanierung',
    text: 'Energetische Sanierung eines Wohnquartiers aus den 70er Jahren – mit Fördermitteln des Landes Nordrhein-Westfalen.',
    scope: ['Energetische Sanierung', 'Bezahlbarer Wohnraum'],
    projectId: 'porta-westfalica',
    images: [{ key: 'porta', credit: 'Visualisierung', position: '50% 50%' }],
  },
  {
    id: 'sanierung-erndtebrueck',
    name: 'Erndtebrück',
    place: 'Nordrhein-Westfalen',
    kind: 'Energetische Sanierung',
    text: 'Energetische Sanierung des Ensembles der Kuhlmann Häuser – mit Fördermitteln des Landes Nordrhein-Westfalen.',
    scope: ['Energetische Sanierung', 'Bezahlbarer Wohnraum'],
    projectId: 'erndtebrueck-kuhlmann-haeuser',
    images: [{ key: 'erndtebrueck', credit: 'Foto · Bestand', position: '60% 55%' }],
  },
]

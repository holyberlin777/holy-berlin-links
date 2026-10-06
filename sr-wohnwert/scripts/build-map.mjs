/**
 * Karten-Pipeline
 * ---------------
 * Wandelt die Berliner Bezirksgrenzen (GeoJSON, Geoportal Berlin / ALKIS,
 * Lizenz: Datenlizenz Deutschland – Zero – Version 2.0) in schlanke SVG-Pfade um.
 * Es werden keine Kartenkacheln oder externen Dienste geladen – die Karte ist
 * komplett statisch und DSGVO-unkritisch.
 *
 * Aufruf:  npm run assets
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const INPUT = path.join(ROOT, 'assets-src', 'bezirke.geojson')
const OUTPUT = path.join(ROOT, 'src', 'data', 'generated', 'map.js')

// Ausschnitt: Berlin plus Umland (Potsdam im Westen, Schönefeld im Süden)
const BBOX = { lon0: 13.03, lon1: 13.78, latTop: 52.7, latBottom: 52.33 }
const WIDTH = 1000
const K = Math.cos((52.5 * Math.PI) / 180) // Längengrad-Verkürzung auf Höhe von Berlin
const SCALE = WIDTH / ((BBOX.lon1 - BBOX.lon0) * K)
const HEIGHT = Math.round((BBOX.latTop - BBOX.latBottom) * SCALE)
const TOLERANCE = 0.7 // Vereinfachung in SVG-Einheiten (≈ 35 m)

const project = ([lon, lat]) => [(lon - BBOX.lon0) * K * SCALE, (BBOX.latTop - lat) * SCALE]

/** Douglas-Peucker (iterativ) */
function simplify(points, tolerance) {
  if (points.length <= 3) return points
  const sqTol = tolerance * tolerance
  const keep = new Uint8Array(points.length)
  keep[0] = keep[points.length - 1] = 1
  const stack = [[0, points.length - 1]]
  while (stack.length) {
    const [first, last] = stack.pop()
    let maxSq = 0
    let index = -1
    const [ax, ay] = points[first]
    const [bx, by] = points[last]
    const dx = bx - ax
    const dy = by - ay
    const lenSq = dx * dx + dy * dy
    for (let i = first + 1; i < last; i++) {
      const [px, py] = points[i]
      let sq
      if (lenSq === 0) sq = (px - ax) ** 2 + (py - ay) ** 2
      else {
        const t = Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / lenSq))
        sq = (px - (ax + t * dx)) ** 2 + (py - (ay + t * dy)) ** 2
      }
      if (sq > maxSq) {
        maxSq = sq
        index = i
      }
    }
    if (maxSq > sqTol && index !== -1) {
      keep[index] = 1
      stack.push([first, index], [index, last])
    }
  }
  return points.filter((_, i) => keep[i])
}

const ringArea = (ring) => {
  let a = 0
  for (let i = 0, n = ring.length; i < n; i++) {
    const [x1, y1] = ring[i]
    const [x2, y2] = ring[(i + 1) % n]
    a += x1 * y2 - x2 * y1
  }
  return a / 2
}

const ringCentroid = (ring) => {
  let cx = 0
  let cy = 0
  let a = 0
  for (let i = 0, n = ring.length; i < n; i++) {
    const [x1, y1] = ring[i]
    const [x2, y2] = ring[(i + 1) % n]
    const f = x1 * y2 - x2 * y1
    a += f
    cx += (x1 + x2) * f
    cy += (y1 + y2) * f
  }
  a /= 2
  return a === 0 ? ring[0] : [cx / (6 * a), cy / (6 * a)]
}

/** Ring → SVG-Pfad mit relativen Koordinaten (1 Nachkommastelle) */
function ringToPath(ring) {
  const r = (n) => Math.round(n * 10) / 10
  let [x, y] = ring[0].map(r)
  let d = `M${x} ${y}`
  let px = x
  let py = y
  for (let i = 1; i < ring.length; i++) {
    const nx = r(ring[i][0])
    const ny = r(ring[i][1])
    const dx = r(nx - px)
    const dy = r(ny - py)
    if (dx === 0 && dy === 0) continue
    d += dy === 0 ? `h${dx}` : dx === 0 ? `v${dy}` : `l${dx} ${dy}`
    px = nx
    py = ny
  }
  return d + 'z'
}

const slug = (s) =>
  s
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

async function main() {
  const geo = JSON.parse(await fs.readFile(INPUT, 'utf8'))
  const districts = []
  let pointsIn = 0
  let pointsOut = 0

  for (const feature of geo.features) {
    const name = feature.properties.namgem || feature.properties.name
    const polygons = feature.geometry.type === 'MultiPolygon' ? feature.geometry.coordinates : [feature.geometry.coordinates]
    let d = ''
    let biggest = { area: 0, ring: null }
    for (const polygon of polygons) {
      polygon.forEach((ring, ringIndex) => {
        pointsIn += ring.length
        let pts = simplify(ring.map(project), TOLERANCE)
        if (pts.length > 1 && pts[0][0] === pts[pts.length - 1][0] && pts[0][1] === pts[pts.length - 1][1]) pts = pts.slice(0, -1)
        if (pts.length < 3) return
        const area = Math.abs(ringArea(pts))
        if (area < 6) return // Mini-Splitter (z. B. Wasserflächen-Reste) weglassen
        pointsOut += pts.length
        d += ringToPath(pts)
        if (ringIndex === 0 && area > biggest.area) biggest = { area, ring: pts }
      })
    }
    const [cx, cy] = ringCentroid(biggest.ring)
    districts.push({ id: slug(name), name, d, cx: Math.round(cx), cy: Math.round(cy) })
  }

  const data = {
    width: WIDTH,
    height: HEIGHT,
    projection: { lon0: BBOX.lon0, latTop: BBOX.latTop, k: K, scale: SCALE },
    districts,
  }
  const banner = '// Automatisch erzeugt von scripts/build-map.mjs – nicht von Hand bearbeiten.\n// Quelle: Geoportal Berlin / ALKIS Berlin Bezirke, Datenlizenz Deutschland – Zero – Version 2.0.\n'
  await fs.writeFile(OUTPUT, `${banner}export default ${JSON.stringify(data)}\n`)
  const size = (await fs.stat(OUTPUT)).size
  console.log(`Karte ${WIDTH}×${HEIGHT}, ${districts.length} Bezirke, ${pointsIn} → ${pointsOut} Punkte, ${(size / 1024).toFixed(1)} KB`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

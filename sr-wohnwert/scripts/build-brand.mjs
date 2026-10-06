/**
 * Marken-Assets: Favicons, App-Icons und das Social-Media-Vorschaubild (Open Graph).
 * Aufruf:  node scripts/build-brand.mjs
 */
import sharp from 'sharp'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const PUBLIC = path.join(ROOT, 'public')
const NAVY = '#080d26'

const emblemSvg = await fs.readFile(path.join(PUBLIC, 'brand', 'emblem.svg'), 'utf8')
const emblemPath = emblemSvg.match(/ d="([^"]+)"/)[1]
const [ex, ey, ew, eh] = emblemSvg.match(/viewBox="([^"]+)"/)[1].split(' ').map(Number)

/** Emblem mittig auf einer Fläche (size × size), "fill" = Anteil der Höhe */
function iconSvg(size, { fill = 0.62, radius = 0, background = NAVY } = {}) {
  const h = size * fill
  const scale = h / eh
  const w = ew * scale
  const tx = (size - w) / 2 - ex * scale
  const ty = (size - h) / 2 - ey * scale
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
<rect width="${size}" height="${size}" rx="${radius}" fill="${background}"/>
<g transform="translate(${tx.toFixed(2)} ${ty.toFixed(2)}) scale(${scale.toFixed(4)})"><path fill="#b8a068" fill-rule="evenodd" d="${emblemPath}"/></g>
</svg>`
}

const png = (svg, size, file) =>
  sharp(Buffer.from(svg), { density: 300 }).resize(size, size).png({ compressionLevel: 9 }).toFile(path.join(PUBLIC, file))

/** ICO-Datei mit eingebettetem PNG (16/32 px) */
async function writeIco(file, sizes) {
  const images = await Promise.all(
    sizes.map((s) => sharp(Buffer.from(iconSvg(64, { radius: 12 })), { density: 600 }).resize(s, s).png().toBuffer())
  )
  const header = Buffer.alloc(6)
  header.writeUInt16LE(0, 0)
  header.writeUInt16LE(1, 2)
  header.writeUInt16LE(images.length, 4)
  let offset = 6 + images.length * 16
  const entries = images.map((img, i) => {
    const entry = Buffer.alloc(16)
    entry.writeUInt8(sizes[i] === 256 ? 0 : sizes[i], 0)
    entry.writeUInt8(sizes[i] === 256 ? 0 : sizes[i], 1)
    entry.writeUInt16LE(1, 4)
    entry.writeUInt16LE(32, 6)
    entry.writeUInt32LE(img.length, 8)
    entry.writeUInt32LE(offset, 12)
    offset += img.length
    return entry
  })
  await fs.writeFile(path.join(PUBLIC, file), Buffer.concat([header, ...entries, ...images]))
}

async function main() {
  await fs.writeFile(path.join(PUBLIC, 'favicon.svg'), iconSvg(64, { radius: 14, fill: 0.66 }))
  await png(iconSvg(64, { radius: 14, fill: 0.66 }), 32, 'favicon-32.png')
  await png(iconSvg(180, { fill: 0.6 }), 180, 'apple-touch-icon.png')
  await png(iconSvg(192, { fill: 0.6 }), 192, 'icon-192.png')
  await png(iconSvg(512, { fill: 0.6 }), 512, 'icon-512.png')
  await png(iconSvg(512, { fill: 0.42 }), 512, 'icon-maskable-512.png')
  await writeIco('favicon.ico', [16, 32, 48])

  // Open-Graph-Bild 1200 × 630: Hero-Motiv, Marineblau-Verlauf, Logo und Claim
  const hero = path.join(ROOT, 'assets-src', 'hero-rosenfelder-ring.jpeg')
  const logo = await sharp(path.join(PUBLIC, 'brand', 'logo-light.svg'), { density: 300 }).resize({ width: 330 }).png().toBuffer()
  const overlay = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
<defs>
<linearGradient id="g" x1="0" x2="1" y1="0" y2="0"><stop offset="0" stop-color="${NAVY}" stop-opacity=".96"/><stop offset=".55" stop-color="${NAVY}" stop-opacity=".78"/><stop offset="1" stop-color="${NAVY}" stop-opacity=".12"/></linearGradient>
<linearGradient id="b" x1="0" x2="0" y1="0" y2="1"><stop offset=".55" stop-color="${NAVY}" stop-opacity="0"/><stop offset="1" stop-color="${NAVY}" stop-opacity=".7"/></linearGradient>
</defs>
<rect width="1200" height="630" fill="url(#g)"/><rect width="1200" height="630" fill="url(#b)"/>
<rect x="72" y="292" width="64" height="2" fill="#cdb982"/>
<text x="72" y="388" font-family="Georgia, 'Times New Roman', serif" font-size="68" fill="#fcfbf8" letter-spacing="-1">Aus Werten entsteht</text>
<text x="72" y="468" font-family="Georgia, 'Times New Roman', serif" font-size="68" font-style="italic" fill="#cdb982" letter-spacing="-1">Zukunft.</text>
<text x="72" y="568" font-family="Helvetica, Arial, sans-serif" font-size="20" fill="#cfd3e6" letter-spacing="4">IMMOBILIEN · INVEST · JOINT VENTURE</text>
</svg>`
  await sharp(hero)
    .resize(1200, 630, { fit: 'cover', position: 'right' })
    .composite([{ input: Buffer.from(overlay) }, { input: logo, left: 72, top: 64 }])
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(path.join(PUBLIC, 'og-image.jpg'))

  await fs.writeFile(
    path.join(PUBLIC, 'site.webmanifest'),
    JSON.stringify(
      {
        name: 'S & R Wohnwert',
        short_name: 'S & R Wohnwert',
        description: 'Immobilienentwicklung, Beteiligungen & Invest in der Metropolregion Berlin.',
        lang: 'de',
        start_url: '/',
        display: 'browser',
        background_color: NAVY,
        theme_color: NAVY,
        icons: [
          { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: '/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      null,
      2
    ) + '\n'
  )
  console.log('Marken-Assets erzeugt: favicon.svg/.ico, favicon-32, apple-touch-icon, icon-192/512, og-image.jpg, site.webmanifest')
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})

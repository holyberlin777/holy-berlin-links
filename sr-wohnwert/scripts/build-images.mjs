/**
 * Bild-Pipeline
 * -------------
 * Wandelt die Original-Bilder aus /assets-src in moderne, performante Formate um
 * (AVIF + WebP, mehrere Breiten) und schreibt ein Manifest, das die Templates nutzen.
 *
 * Aufruf:  npm run assets
 *
 * Collagen (mehrere Motive in einem Bild) werden hier in Einzelbilder zerlegt,
 * damit sie in Galerien sauber dargestellt werden können.
 */
import sharp from 'sharp'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const SRC = path.join(ROOT, 'assets-src')
const OUT = path.join(ROOT, 'public', 'img')
const MANIFEST = path.join(ROOT, 'src', 'data', 'generated', 'images.js')

const QUALITY = { avif: 55, webp: 80 }

// Collagen: 1080 × 1350, 2 × 2 bzw. 2 × 1 Felder. 2 px Rand wird abgeschnitten (Trennlinien).
const q = (col, row, w = 540, h = 675) => [col * 540 + 2, row * 675 + 2, w - 4, h - 4]

/** key → Quelle, optionaler Ausschnitt [left, top, width, height], Zielbreiten */
const jobs = [
  { key: 'hero', src: 'hero-rosenfelder-ring.jpeg', widths: [800, 1280, 1920, 2560] },

  { key: 'wassergaerten', src: 'wassergaerten-wendenschloss.jpg', widths: [480] },
  { key: 'porta', src: 'porta-westfalica.png', widths: [768] },
  { key: 'kelchstrasse', src: 'kelchstrasse.jpg', widths: [844] },

  // Klistostraße – Innenraum-Collage (oben links Bad, oben rechts Schlafen, unten links Küche, unten rechts Terrasse)
  { key: 'klisto-1', src: 'klistostrasse.jpg', crop: q(1, 0), widths: [536] },
  { key: 'klisto-2', src: 'klistostrasse.jpg', crop: q(1, 1), widths: [536] },
  { key: 'klisto-3', src: 'klistostrasse.jpg', crop: q(0, 1), widths: [536] },
  { key: 'klisto-4', src: 'klistostrasse.jpg', crop: q(0, 0), widths: [536] },

  { key: 'winckelmann', src: 'winckelmannstrasse.jpg', widths: [800, 1280, 1666] },

  // Ruhlsdorfer Platz – Fassade, Eingang, Axonometrie
  { key: 'ruhlsdorf-1', src: 'ruhlsdorfer-platz.jpg', crop: q(0, 0), widths: [536] },
  { key: 'ruhlsdorf-2', src: 'ruhlsdorfer-platz.jpg', crop: q(1, 0), widths: [536] },
  { key: 'ruhlsdorf-3', src: 'ruhlsdorfer-platz.jpg', crop: [2, 677, 1076, 671], widths: [800, 1076] },

  { key: 'lichterfelde', src: 'lichterfelder-allee.jpg', widths: [700, 1400] },
  { key: 'erndtebrueck', src: 'erndtebrueck.jpg', widths: [800, 1400] },
  { key: 'turiner', src: 'turiner-strasse.jpg', widths: [800, 1280, 1666] },

  // Albrechtstraße – Collage (Felder mit Fremd-Wasserzeichen werden ausgelassen / beschnitten)
  { key: 'bau-albrecht-1', src: 'bau-albrechtstrasse.jpg', crop: q(0, 0), widths: [536] },
  { key: 'bau-albrecht-2', src: 'bau-albrechtstrasse.jpg', crop: [2, 677, 506, 671], widths: [506] },
  { key: 'bau-albrecht-3', src: 'bau-albrechtstrasse.jpg', crop: q(1, 1), widths: [536] },

  { key: 'bau-stadler-b', src: 'bau-stadler-berlin.avif', widths: [919] },

  // Stadler Regensburg – vier Baufortschrittsfotos
  { key: 'bau-stadler-r-1', src: 'bau-stadler-regensburg.jpg', crop: q(1, 0), widths: [536] },
  { key: 'bau-stadler-r-2', src: 'bau-stadler-regensburg.jpg', crop: q(0, 0), widths: [536] },
  { key: 'bau-stadler-r-3', src: 'bau-stadler-regensburg.jpg', crop: q(0, 1), widths: [536] },
  { key: 'bau-stadler-r-4', src: 'bau-stadler-regensburg.jpg', crop: q(1, 1), widths: [536] },
]

const hex = (n) => n.toString(16).padStart(2, '0')

async function main() {
  await fs.rm(OUT, { recursive: true, force: true })
  await fs.mkdir(OUT, { recursive: true })
  await fs.mkdir(path.dirname(MANIFEST), { recursive: true })

  const manifest = {}
  for (const job of jobs) {
    const input = path.join(SRC, job.src)
    let base = sharp(input, { failOn: 'none' }).rotate()
    if (job.crop) {
      const [left, top, width, height] = job.crop
      base = base.extract({ left, top, width, height })
    }
    // Zuschnitt einmal materialisieren, damit mehrere Breiten sauber davon abgeleitet werden
    const cropped = await base.toBuffer({ resolveWithObject: true })
    const { width: fullW, height: fullH } = cropped.info
    const widths = [...new Set(job.widths.map((w) => Math.min(w, fullW)))].sort((a, b) => a - b)

    // Durchschnittsfarbe (1 × 1 px) als Platzhalter, bis das Bild geladen ist
    const avg = await sharp(cropped.data).resize(1, 1, { fit: 'cover' }).removeAlpha().raw().toBuffer()
    const color = `#${hex(avg[0])}${hex(avg[1])}${hex(avg[2])}`

    for (const w of widths) {
      const pipeline = () => sharp(cropped.data).resize({ width: w, withoutEnlargement: true, kernel: 'lanczos3' })
      await pipeline().avif({ quality: QUALITY.avif, effort: 5 }).toFile(path.join(OUT, `${job.key}-${w}.avif`))
      await pipeline().webp({ quality: QUALITY.webp, effort: 5 }).toFile(path.join(OUT, `${job.key}-${w}.webp`))
    }

    manifest[job.key] = {
      width: widths[widths.length - 1],
      height: Math.round((fullH / fullW) * widths[widths.length - 1]),
      widths,
      color,
    }
    process.stdout.write(`✓ ${job.key.padEnd(18)} ${widths.join(', ')}  ${color}\n`)
  }

  const banner = '// Automatisch erzeugt von scripts/build-images.mjs – nicht von Hand bearbeiten.\n'
  await fs.writeFile(MANIFEST, `${banner}export default ${JSON.stringify(manifest, null, 2)}\n`)

  const files = await fs.readdir(OUT)
  let total = 0
  for (const f of files) total += (await fs.stat(path.join(OUT, f))).size
  console.log(`\n${files.length} Dateien, ${(total / 1024 / 1024).toFixed(1)} MB → public/img`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

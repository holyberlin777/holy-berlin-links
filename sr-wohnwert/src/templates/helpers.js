import images from '../data/generated/images.js'

/** HTML-Escaping für Texte und Attribute */
export const esc = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

/** Nur Zeilen mit Inhalt zusammenfügen */
export const join = (list, sep = '') => list.filter(Boolean).join(sep)

/**
 * Responsives <picture> mit AVIF + WebP.
 * @param {string} key  Schlüssel aus der Bild-Pipeline
 * @param {object} opts alt, sizes, eager, position, className, fit
 */
export function picture(key, { alt = '', sizes = '100vw', eager = false, position = '', className = '' } = {}) {
  const img = images[key]
  if (!img) throw new Error(`Unbekanntes Bild "${key}" – bitte "npm run assets" ausführen.`)
  const srcset = (ext) => img.widths.map((w) => `/img/${key}-${w}.${ext} ${w}w`).join(', ')
  const fallback = img.widths.includes(1280) ? 1280 : img.widths[img.widths.length - 1]
  const style = `background-color:${img.color}${position ? `;object-position:${position}` : ''}`
  return `<picture>
<source type="image/avif" srcset="${srcset('avif')}" sizes="${sizes}">
<source type="image/webp" srcset="${srcset('webp')}" sizes="${sizes}">
<img${className ? ` class="${className}"` : ''} src="/img/${key}-${fallback}.webp" width="${img.width}" height="${img.height}" alt="${esc(alt)}" ${
    eager ? 'fetchpriority="high"' : 'loading="lazy"'
  } decoding="async" style="${style}">
</picture>`
}

/** Inline-SVG-Icons (dekorativ) */
const icons = {
  arrowRight: '<path d="M4 12h15m0 0-6-6m6 6-6 6" />',
  arrowLeft: '<path d="M20 12H5m0 0 6-6m-6 6 6 6" />',
  arrowUpRight: '<path d="M7 17 17 7m0 0H8m9 0v9" />',
  arrowDown: '<path d="M12 4v15m0 0 6-6m-6 6-6-6" />',
  arrowUp: '<path d="M12 20V5m0 0-6 6m6-6 6 6" />',
  close: '<path d="M6 6l12 12M18 6 6 18" />',
  plus: '<path d="M12 5v14M5 12h14" />',
  check: '<path d="m5 12.5 4.5 4.5L19 7.5" />',
  phone:
    '<path d="M5 4h3.5l1.7 4.2-2.1 1.3a11 11 0 0 0 5.4 5.4l1.3-2.1L19 14.5V18a1 1 0 0 1-1 1A13 13 0 0 1 4 5a1 1 0 0 1 1-1Z" />',
  mail: '<rect x="3.5" y="5.5" width="17" height="13" rx="1" /><path d="m4 7 8 6 8-6" />',
  pin: '<path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" /><circle cx="12" cy="10" r="2.3" />',
  clock: '<circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" />',
  instagram:
    '<rect x="3.5" y="3.5" width="17" height="17" rx="4.5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r=".6" fill="currentColor" />',
}

export function icon(name, className = 'icon') {
  const body = icons[name]
  if (!body) throw new Error(`Unbekanntes Icon "${name}"`)
  return `<svg class="${className}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${body}</svg>`
}

/** Text in einzelne Wörter zerlegen (für Scroll-Hervorhebung) */
export const words = (text) =>
  text
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => `<span class="w">${esc(w)}</span>`)
    .join(' ')

/** Telefonnummer für tel:-Links */
export const tel = (n) => `tel:${n}`

/** Umgebungs-Flags und kleine DOM-Helfer */

const mq = (query) => window.matchMedia(query).matches

export const reduceMotion = mq('(prefers-reduced-motion: reduce)')
export const finePointer = mq('(hover: hover) and (pointer: fine)')
export const isHome = document.documentElement.dataset.page === 'home'

export const $ = (selector, root = document) => root.querySelector(selector)
export const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector))

/** Führt eine Initialisierung aus, ohne dass ein Fehler die übrigen Module stoppt */
export function safe(name, fn) {
  try {
    return fn()
  } catch (error) {
    console.error(`[${name}]`, error)
    return undefined
  }
}

export const clamp = (value, min, max) => Math.min(max, Math.max(min, value))

/** Wartet, bis die Schriften geladen sind (mit Zeitlimit, damit nie etwas blockiert) */
export function fontsReady(timeout = 2500) {
  const ready = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()
  return Promise.race([ready, new Promise((resolve) => setTimeout(resolve, timeout))])
}

/**
 * Scrollen: weiches Scrollen (Lenis) + Kopplung an GSAP ScrollTrigger.
 * Bei "Bewegung reduzieren" wird auf natives Scrollen zurückgegriffen.
 */
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { reduceMotion, $, $$ } from './env.js'

gsap.registerPlugin(ScrollTrigger)

let lenis = null
let lastY = window.scrollY
const listeners = new Set()
const root = document.documentElement

const emit = (state) => listeners.forEach((fn) => fn(state))

export function initScroll() {
  if (import.meta.env.DEV) window.__ST = ScrollTrigger
  if (!reduceMotion) {
    lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.95,
    })
    lenis.on('scroll', (e) => {
      ScrollTrigger.update()
      emit({ scroll: e.scroll, direction: e.direction, velocity: e.velocity })
    })
    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)
    if (import.meta.env.DEV) window.__lenis = lenis
  } else {
    window.addEventListener(
      'scroll',
      () => {
        const y = window.scrollY
        emit({ scroll: y, direction: y >= lastY ? 1 : -1, velocity: y - lastY })
        lastY = y
      },
      { passive: true }
    )
  }
  initAnchors()
}

/** Abonniert Scroll-Ereignisse (Lenis oder nativ) */
export function onScroll(fn) {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

export const getScroll = () => (lenis ? lenis.scroll : window.scrollY)

/** Scroll sperren (Menü, Dialog) */
export function lockScroll() {
  root.classList.add('is-locked')
  lenis?.stop()
}
export function unlockScroll() {
  root.classList.remove('is-locked')
  lenis?.start()
}

/** Weich zu einem Element oder einer Position scrollen */
export function scrollToTarget(target, { offset = 0, immediate = false, duration = 1.6 } = {}) {
  const el = typeof target === 'string' ? $(target) : target
  if (!el && typeof target !== 'number') return
  if (lenis) {
    lenis.scrollTo(el ?? target, {
      offset,
      immediate,
      duration,
      easing: (t) => (t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2),
      force: true,
    })
  } else if (el) {
    el.scrollIntoView({ behavior: 'auto', block: 'start' })
  } else {
    window.scrollTo(0, target)
  }
}

/** Ankerlinks (#abschnitt) weich ansteuern */
function initAnchors() {
  document.addEventListener('click', (event) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    const link = event.target.closest('a[href]')
    if (!link || link.hasAttribute('data-project') || link.hasAttribute('data-dialog-close')) return
    const url = new URL(link.href, location.href)
    if (url.origin !== location.origin || url.pathname !== location.pathname || !url.hash) return
    const id = decodeURIComponent(url.hash.slice(1))
    if (!id) return
    const target = document.getElementById(id)
    if (!target) return
    event.preventDefault()
    scrollToTarget(target)
    history.pushState(null, '', url.hash)
  })

  $$('[data-to-top]').forEach((button) =>
    button.addEventListener('click', () => {
      scrollToTarget(0, { duration: 1.8 })
      history.replaceState(null, '', location.pathname)
    })
  )
}

export { ScrollTrigger }

/**
 * Intro-Sequenz: Das Emblem "baut sich" Stockwerk für Stockwerk auf,
 * danach hebt sich der Vorhang und gibt die Startseite frei.
 * Läuft nur beim ersten Aufruf der Startseite (siehe Inline-Skript im <head>).
 */
import { gsap } from 'gsap'
import { $ } from './env.js'

const root = document.documentElement

/** Gibt ein Promise zurück, das aufgelöst wird, sobald der Vorhang sich hebt */
export function playPreloader() {
  const el = $('[data-preloader]')
  if (!el || !root.classList.contains('is-loading')) return Promise.resolve(false)

  const emblem = $('[data-preloader-emblem] img', el)
  const word = $('[data-preloader-word]', el)
  const bar = $('[data-preloader-bar]', el)
  const heroImg = $('.hero__media img')

  // Das große Hero-Bild vorab dekodieren, damit der Vorhang nicht auf ein leeres Bild fällt
  const heroReady = heroImg && heroImg.decode ? heroImg.decode().catch(() => {}) : Promise.resolve()
  const minimum = new Promise((resolve) => setTimeout(resolve, 1600))
  const ceiling = new Promise((resolve) => setTimeout(resolve, 3800))

  return new Promise((resolve) => {
    const intro = gsap.timeline()
    intro
      .to(bar, { scaleX: 1, duration: 1.45, ease: 'power2.inOut' }, 0)
      .to(emblem, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.15, ease: 'steps(9)' }, 0.1)
      .to(word, { y: 0, duration: 1, ease: 'expo.out' }, 0.75)

    Promise.race([Promise.all([minimum, heroReady]), ceiling]).then(() => {
      const exit = gsap.timeline({
        onComplete: () => {
          root.classList.remove('is-loading')
          gsap.set(el, { clearProps: 'all' })
          el.style.display = 'none'
        },
      })
      exit
        .to([emblem, word.parentElement, bar.parentElement], { y: -30, opacity: 0, duration: 0.6, ease: 'power3.in', stagger: 0.05 }, 0)
        .to(el, { clipPath: 'inset(0% 0% 100% 0%)', duration: 1.15, ease: 'expo.inOut' }, 0.45)
        .add(() => resolve(true), 0.75)
    })
  })
}

/**
 * Hero: Einblend-Animation (nach dem Preloader) und Parallax beim Scrollen.
 */
import { gsap } from 'gsap'
import { $, $$, reduceMotion } from './env.js'
import { ScrollTrigger } from './scroll.js'

export function initHero() {
  const hero = $('[data-hero]')
  if (!hero) return { play: () => {} }

  const media = $('[data-hero-media]', hero)
  const image = $('img', media)
  const lines = $$('.hero__title .line__in', hero)
  const items = $$('[data-hero-in]', hero)
  const inner = $('.hero__inner', hero)
  const header = $('[data-header]')

  if (!reduceMotion) {
    // Parallax: Bild wandert langsamer als der Inhalt, Text blendet beim Scrollen aus
    gsap.to(media, {
      yPercent: 13,
      ease: 'none',
      scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
    })
    gsap.to(inner, {
      yPercent: -9,
      opacity: 0.0,
      ease: 'none',
      scrollTrigger: { trigger: hero, start: '18% top', end: '78% top', scrub: true },
    })
    gsap.to($('.hero__shade', hero), {
      opacity: 0.75,
      ease: 'none',
      scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
    })

    // Leichte Mausbewegung: Bild folgt dem Zeiger minimal
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      const moveX = gsap.quickTo(image, 'x', { duration: 1.6, ease: 'power3.out' })
      const moveY = gsap.quickTo(image, 'y', { duration: 1.6, ease: 'power3.out' })
      hero.addEventListener('pointermove', (event) => {
        const rect = hero.getBoundingClientRect()
        moveX(-((event.clientX - rect.left) / rect.width - 0.5) * 26)
        moveY(-((event.clientY - rect.top) / rect.height - 0.5) * 16)
      })
    }
  }

  const play = () => {
    header?.removeAttribute('data-pre')
    if (reduceMotion) return
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
    tl.fromTo(image, { scale: 1.22 }, { scale: 1.02, duration: 2.8, ease: 'power3.out' }, 0)
      .to(lines, { y: 0, yPercent: 0, duration: 1.5, stagger: 0.14 }, 0.1)
      .to(items, { opacity: 1, y: 0, duration: 1.2, stagger: 0.1, ease: 'power3.out' }, 0.55)
  }

  return { play }
}

/** Refresh, sobald Bilder und Schriften die Höhen endgültig festgelegt haben */
export function refreshOnLoad() {
  const refresh = () => ScrollTrigger.refresh()
  if (document.readyState === 'complete') requestAnimationFrame(refresh)
  else window.addEventListener('load', () => requestAnimationFrame(refresh), { once: true })
}

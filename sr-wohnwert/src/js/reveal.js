/**
 * Scroll-Animationen: Einblenden, Zeilen-Reveal für Überschriften,
 * wortweise Hervorhebung beim Scrollen und Parallax.
 */
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { $$, reduceMotion } from './env.js'
import { ScrollTrigger } from './scroll.js'

gsap.registerPlugin(SplitText)

/** Allgemeines Einblenden: [data-reveal] (Elemente in derselben Zeile werden gestaffelt) */
export function initReveals() {
  const targets = $$('[data-reveal]')
  if (!targets.length) return
  if (reduceMotion) {
    gsap.set(targets, { clearProps: 'all' })
    return
  }
  ScrollTrigger.batch(targets, {
    start: 'top 90%',
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        duration: 1.15,
        ease: 'power3.out',
        stagger: 0.1,
        overwrite: true,
      }),
  })
}

/** Überschriften: zeilenweise unter einer Maske hervorgleiten */
export function initSplitHeadings() {
  const headings = $$('[data-split]')
  headings.forEach((el) => {
    if (reduceMotion) {
      el.classList.add('is-split')
      return
    }
    SplitText.create(el, {
      type: 'lines',
      mask: 'lines',
      linesClass: 'split-line',
      autoSplit: true,
      onSplit(self) {
        // Unterlängen (g, y, j) nicht abschneiden
        self.masks.forEach((mask) => {
          mask.style.paddingBottom = '0.14em'
          mask.style.marginBottom = '-0.14em'
        })
        el.classList.add('is-split')
        return gsap.from(self.lines, {
          yPercent: 112,
          duration: 1.25,
          ease: 'expo.out',
          stagger: 0.1,
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        })
      },
    })
  })
}

/** Fließtext, dessen Wörter beim Scrollen nach und nach aufleuchten */
export function initScrubText() {
  $$('[data-scrub]').forEach((el) => {
    const words = $$('.w', el)
    if (!words.length) return
    if (reduceMotion) {
      gsap.set(words, { opacity: 1 })
      return
    }
    gsap.to(words, {
      opacity: 1,
      ease: 'none',
      stagger: 0.12,
      duration: 1.4,
      scrollTrigger: { trigger: el, start: 'top 82%', end: 'bottom 48%', scrub: 0.6 },
    })
  })
}

/** Parallax für Hintergrundbilder: [data-parallax] mit [data-parallax-speed] */
export function initParallax() {
  if (reduceMotion) return
  $$('[data-parallax]').forEach((el) => {
    const speed = parseFloat(el.dataset.parallaxSpeed || '0.15') * 100
    gsap.fromTo(
      el,
      { yPercent: -speed },
      {
        yPercent: speed,
        ease: 'none',
        scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
      }
    )
  })
}

/** Kennzahlen hochzählen */
export function initCounters() {
  const format = new Intl.NumberFormat('de-DE', { maximumFractionDigits: 0 })
  $$('[data-counter]').forEach((el) => {
    const target = parseFloat(el.dataset.counter)
    const suffix = el.dataset.suffix || ''
    const render = (value) => {
      el.innerHTML = `${format.format(Math.round(value))}${suffix ? `<span class="kpi__suffix">${suffix}</span>` : ''}`
    }
    if (reduceMotion) return render(target)
    const state = { value: 0 }
    render(0)
    ScrollTrigger.create({
      trigger: el,
      start: 'top 92%',
      once: true,
      onEnter: () =>
        gsap.to(state, {
          value: target,
          duration: 2.4,
          ease: 'power3.out',
          onUpdate: () => render(state.value),
        }),
    })
  })
}

/** Gestapelte Karten: die darunterliegende Karte tritt zurück, wenn die nächste darüber gleitet */
export function initStack() {
  const cards = $$('[data-stack-card]')
  if (cards.length < 2 || reduceMotion) return
  const mm = gsap.matchMedia()
  mm.add('(min-width: 901px)', () => {
    cards.forEach((card, i) => {
      const next = cards[i + 1]
      if (!next) return
      gsap.to(card, {
        scale: 0.93 - Math.min(0.02, (cards.length - i) * 0.004),
        '--dim': 0.5,
        ease: 'none',
        scrollTrigger: {
          trigger: next,
          start: 'top 92%',
          end: 'top 20%',
          scrub: true,
        },
      })
    })
  })
}

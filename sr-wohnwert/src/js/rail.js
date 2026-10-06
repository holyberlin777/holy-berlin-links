/**
 * Projekt-Slider: horizontal scrollbar (Touch, Trackpad, Tastatur), mit der Maus ziehbar,
 * Pfeil-Buttons, Fortschrittsbalken und leichtem Parallax-Effekt der Bilder.
 */
import { gsap } from 'gsap'
import { $, $$, clamp, reduceMotion, finePointer } from './env.js'
import { ScrollTrigger } from './scroll.js'

export function initRail() {
  const rail = $('[data-rail]')
  if (!rail) return
  const viewport = $('[data-rail-viewport]', rail)
  const items = $$('.rail__item', rail)
  const images = $$('[data-pcard-img]', rail)
  const prev = $('[data-rail-prev]', rail)
  const next = $('[data-rail-next]', rail)
  const bar = $('[data-rail-progress]', rail)
  const current = $('[data-rail-current]', rail)

  let ticking = false
  let tween = null

  const max = () => viewport.scrollWidth - viewport.clientWidth
  const starts = () => items.map((item) => item.offsetLeft - parseFloat(getComputedStyle(viewport).paddingLeft))

  /* ----- Fortschritt, Zähler, Parallax ------------------------------------ */
  const update = () => {
    ticking = false
    const m = max()
    const p = m > 0 ? clamp(viewport.scrollLeft / m, 0, 1) : 0
    if (bar) bar.style.transform = `scaleX(${Math.max(0.06, p).toFixed(4)})`

    const left = viewport.scrollLeft
    const s = starts()
    let index = 0
    s.forEach((start, i) => {
      if (start <= left + 40) index = i
    })
    if (p > 0.985) index = items.length - 1
    if (current) current.textContent = String(index + 1).padStart(2, '0')

    if (prev) prev.disabled = left < 6
    if (next) next.disabled = left > m - 6

    if (!reduceMotion) {
      const half = window.innerWidth / 2
      images.forEach((img) => {
        const rect = img.parentElement.getBoundingClientRect()
        if (rect.right < -100 || rect.left > window.innerWidth + 100) return
        const delta = clamp(((rect.left + rect.width / 2 - half) / half) * 0.5, -1, 1)
        img.style.transform = `translate3d(${(-delta * rect.width * 0.07).toFixed(1)}px,0,0)`
      })
    }
  }
  const request = () => {
    if (ticking) return
    ticking = true
    requestAnimationFrame(update)
  }
  viewport.addEventListener('scroll', request, { passive: true })
  window.addEventListener('resize', request)

  /* ----- Buttons ----------------------------------------------------------- */
  const goTo = (left) => {
    tween?.kill()
    const target = clamp(left, 0, max())
    if (reduceMotion) {
      viewport.scrollLeft = target
      return
    }
    viewport.style.scrollSnapType = 'none'
    tween = gsap.to(viewport, {
      scrollLeft: target,
      duration: 1.05,
      ease: 'power3.inOut',
      onComplete: () => (viewport.style.scrollSnapType = ''),
    })
  }
  const step = (dir) => {
    const s = starts()
    const left = viewport.scrollLeft
    if (dir > 0) goTo(s.find((start) => start > left + 8) ?? max())
    else goTo([...s].reverse().find((start) => start < left - 8) ?? 0)
  }
  prev?.addEventListener('click', () => step(-1))
  next?.addEventListener('click', () => step(1))

  /* ----- Ziehen mit der Maus ---------------------------------------------- */
  if (finePointer) {
    let down = false
    let moved = false
    let startX = 0
    let startLeft = 0
    let lastX = 0
    let velocity = 0

    viewport.addEventListener('pointerdown', (event) => {
      if (event.pointerType !== 'mouse' || event.button !== 0) return
      tween?.kill()
      down = true
      moved = false
      startX = lastX = event.clientX
      startLeft = viewport.scrollLeft
      velocity = 0
    })
    window.addEventListener('pointermove', (event) => {
      if (!down) return
      const dx = event.clientX - startX
      if (!moved && Math.abs(dx) > 5) {
        moved = true
        viewport.classList.add('is-dragging')
      }
      if (!moved) return
      velocity = event.clientX - lastX
      lastX = event.clientX
      viewport.scrollLeft = startLeft - dx
    })
    const end = () => {
      if (!down) return
      down = false
      viewport.classList.remove('is-dragging')
      if (moved && !reduceMotion && Math.abs(velocity) > 2) {
        tween = gsap.to(viewport, {
          scrollLeft: clamp(viewport.scrollLeft - velocity * 16, 0, max()),
          duration: 1.2,
          ease: 'power3.out',
        })
      }
    }
    window.addEventListener('pointerup', end)
    window.addEventListener('pointercancel', end)
    // Nach einem Zieh-Vorgang keinen Klick auslösen
    viewport.addEventListener(
      'click',
      (event) => {
        if (moved) {
          event.preventDefault()
          event.stopPropagation()
          moved = false
        }
      },
      true
    )
    viewport.addEventListener('dragstart', (event) => event.preventDefault())
  }

  /* ----- Einblenden beim Erscheinen --------------------------------------- */
  if (!reduceMotion) {
    gsap.from(items, {
      opacity: 0,
      x: 140,
      duration: 1.3,
      ease: 'power3.out',
      stagger: 0.09,
      scrollTrigger: { trigger: rail, start: 'top 82%', once: true },
      clearProps: 'transform,opacity',
      onComplete: request,
    })
  }

  update()
  ScrollTrigger.addEventListener('refresh', request)
}

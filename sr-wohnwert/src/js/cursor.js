/**
 * Eigener Cursor-Ring (nur Geräte mit Maus): wächst bei Links, zeigt Beschriftungen
 * wie "Ansehen" oder "Ziehen" über interaktiven Bereichen.
 */
import { gsap } from 'gsap'
import { $, finePointer, reduceMotion } from './env.js'

export function initCursor() {
  const cursor = $('[data-cursor-el]')
  if (!cursor || !finePointer || reduceMotion) return
  const dot = $('.cursor__dot', cursor)
  const ring = $('.cursor__ring', cursor)
  const label = $('.cursor__label', cursor)

  const dotX = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power3.out' })
  const dotY = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power3.out' })
  const ringX = gsap.quickTo(ring, 'x', { duration: 0.55, ease: 'power3.out' })
  const ringY = gsap.quickTo(ring, 'y', { duration: 0.55, ease: 'power3.out' })

  let visible = false
  window.addEventListener(
    'pointermove',
    (event) => {
      if (event.pointerType !== 'mouse') return
      if (!visible) {
        visible = true
        gsap.set([dot, ring], { x: event.clientX, y: event.clientY })
        cursor.classList.add('is-visible')
      }
      dotX(event.clientX)
      dotY(event.clientY)
      ringX(event.clientX)
      ringY(event.clientY)
    },
    { passive: true }
  )
  document.addEventListener('pointerleave', () => cursor.classList.remove('is-visible'))
  document.addEventListener('pointerenter', () => visible && cursor.classList.add('is-visible'))

  const interactive = 'a, button, input, textarea, select, label, summary, [role="button"], .pin'
  document.addEventListener('pointerover', (event) => {
    const target = event.target
    if (!(target instanceof Element)) return
    const labelled = target.closest('[data-cursor]')
    const text = labelled?.dataset.cursor
    label.textContent = text || ''
    cursor.classList.toggle('has-label', Boolean(text))
    cursor.classList.toggle('is-link', !text && Boolean(target.closest(interactive)))
  })
  document.addEventListener('pointerdown', () => gsap.to(ring, { scale: 0.88, duration: 0.25, ease: 'power2.out' }))
  document.addEventListener('pointerup', () => gsap.to(ring, { scale: 1, duration: 0.5, ease: 'back.out(3)' }))
}

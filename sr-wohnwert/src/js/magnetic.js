/**
 * Magnetische Buttons: folgen dem Mauszeiger leicht, wenn er sich nähert.
 */
import { gsap } from 'gsap'
import { $$, finePointer, reduceMotion } from './env.js'

export function initMagnetic() {
  if (!finePointer || reduceMotion) return
  $$('[data-magnetic]').forEach((el) => {
    const x = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3.out' })
    const y = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3.out' })
    el.addEventListener('pointermove', (event) => {
      const rect = el.getBoundingClientRect()
      x((event.clientX - (rect.left + rect.width / 2)) * 0.28)
      y((event.clientY - (rect.top + rect.height / 2)) * 0.4)
    })
    el.addEventListener('pointerleave', () => {
      x(0)
      y(0)
    })
  })
}

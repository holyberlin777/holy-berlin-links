/**
 * Projekt-Detailansicht (natives <dialog>): Bildergalerie, Eckdaten, Vor-/Zurück-Navigation.
 * Der Inhalt jedes Projekts liegt als <template> im HTML (siehe src/templates/home.js).
 */
import { gsap } from 'gsap'
import { $, $$, reduceMotion } from './env.js'
import { lockScroll, unlockScroll, scrollToTarget } from './scroll.js'

let dialog
let panel
let backdrop
let content
let lastTrigger = null
let closing = false

export function initDialog() {
  dialog = $('[data-dialog]')
  if (!dialog) return
  panel = $('.pdialog__panel', dialog)
  backdrop = $('.pdialog__backdrop', dialog)
  content = $('[data-dialog-content]', dialog)

  // Öffnen: jedes Element mit data-project (Karten, Karte, Liste, Navigation im Dialog)
  document.addEventListener('click', (event) => {
    const trigger = event.target.closest('[data-project]')
    if (!trigger) return
    event.preventDefault()
    openProject(trigger.dataset.project, { trigger })
  })

  // Schließen und Galerie
  dialog.addEventListener('click', (event) => {
    const closer = event.target.closest('[data-dialog-close]')
    if (closer) {
      event.preventDefault()
      const href = closer.getAttribute('href')
      closeProject().then(() => {
        if (href && href.startsWith('#')) scrollToTarget(href)
      })
      return
    }
    const thumb = event.target.closest('[data-thumb]')
    if (thumb) showSlide(Number(thumb.dataset.thumb))
  })

  // ESC läuft über die eigene Schließ-Animation
  dialog.addEventListener('cancel', (event) => {
    event.preventDefault()
    closeProject()
  })

  // Pfeiltasten wechseln das Projekt
  dialog.addEventListener('keydown', (event) => {
    if (event.target.closest('input, textarea')) return
    if (event.key === 'ArrowRight') $('.pd__nav button:last-child', dialog)?.click()
    if (event.key === 'ArrowLeft') $('.pd__nav button:first-child', dialog)?.click()
  })
}

function showSlide(index) {
  $$('.pd__slide', content).forEach((slide, i) => slide.classList.toggle('is-active', i === index))
  $$('.pd__thumb', content).forEach((thumb, i) => thumb.classList.toggle('is-active', i === index))
}

export function openProject(id, { trigger } = {}) {
  if (!dialog || closing) return
  const template = $(`template[data-project-tpl="${CSS.escape(id)}"]`)
  if (!template) return

  const alreadyOpen = dialog.open
  if (!alreadyOpen) lastTrigger = trigger ?? document.activeElement

  content.replaceChildren(template.content.cloneNode(true))
  panel.scrollTop = 0

  if (!alreadyOpen) {
    dialog.showModal()
    lockScroll()
    if (!reduceMotion) animateIn()
    $('.pdialog__close', dialog)?.focus({ preventScroll: true })
  } else if (!reduceMotion) {
    animateSwitch()
  }
}

function animateIn() {
  const info = $$('.pd__info > *', content)
  const image = $('.pd__slide.is-active img', content)
  gsap
    .timeline({ defaults: { ease: 'expo.out' } })
    .fromTo(backdrop, { opacity: 0 }, { opacity: 1, duration: 0.7, ease: 'power2.out' }, 0)
    .fromTo(
      panel,
      { clipPath: 'inset(100% 0% 0% 0%)' },
      { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.05, clearProps: 'clipPath' },
      0
    )
    .fromTo(image, { scale: 1.18 }, { scale: 1, duration: 1.8 }, 0.1)
    .fromTo(info, { y: 36, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.06, clearProps: 'transform,opacity' }, 0.4)
}

function animateSwitch() {
  const info = $$('.pd__info > *', content)
  const image = $('.pd__slide.is-active img', content)
  gsap
    .timeline({ defaults: { ease: 'expo.out' } })
    .fromTo(image, { scale: 1.1, opacity: 0.2 }, { scale: 1, opacity: 1, duration: 1.2 }, 0)
    .fromTo(info, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.04, clearProps: 'transform,opacity' }, 0.05)
}

export function closeProject() {
  return new Promise((resolve) => {
    if (!dialog || !dialog.open || closing) return resolve()
    closing = true
    const done = () => {
      dialog.close()
      gsap.set([backdrop, panel], { clearProps: 'all' })
      content.replaceChildren()
      closing = false
      unlockScroll()
      if (lastTrigger && lastTrigger.isConnected) lastTrigger.focus?.({ preventScroll: true })
      resolve()
    }
    if (reduceMotion) return done()
    gsap
      .timeline({ onComplete: done })
      .to(panel, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.8, ease: 'expo.inOut' }, 0)
      .to(backdrop, { opacity: 0, duration: 0.65, ease: 'power2.inOut' }, 0.15)
  })
}

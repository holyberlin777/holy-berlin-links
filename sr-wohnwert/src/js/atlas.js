/**
 * Standortkarte: Pins, Vorschau-Karte und Liste sind miteinander verknüpft.
 * Am Desktop öffnet ein Klick die Projektdetails, auf Touch-Geräten zeigt der erste Tipp die Vorschau.
 */
import { gsap } from 'gsap'
import { $, $$, reduceMotion } from './env.js'
import { openProject } from './dialog.js'

const SVG_NS = 'http://www.w3.org/2000/svg'

/** Liest die Position aus transform="translate(x y)" */
function positionOf(el) {
  const match = /translate\(([-\d.]+)[ ,]+([-\d.]+)\)/.exec(el.getAttribute('transform') || '')
  return match ? [Number(match[1]), Number(match[2])] : [0, 0]
}

/** Sanft gebogene Linie zwischen zwei Punkten */
function curve([x1, y1], [x2, y2]) {
  const dx = x2 - x1
  const dy = y2 - y1
  const cx = (x1 + x2) / 2 - dy * 0.18
  const cy = (y1 + y2) / 2 + dx * 0.18
  return `M${x1.toFixed(1)} ${y1.toFixed(1)}Q${cx.toFixed(1)} ${cy.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`
}

export function initAtlas() {
  const atlas = $('[data-atlas]')
  if (!atlas) return
  const map = $('[data-map]', atlas)
  const pins = $$('[data-pin]', atlas)

  // Verbindungslinie Hauptsitz → aktives Projekt
  const hq = $('.hq', map)
  const link = document.createElementNS(SVG_NS, 'path')
  link.setAttribute('class', 'map__link')
  link.setAttribute('aria-hidden', 'true')
  $('.map__pins', map)?.before(link)
  let linkTween = null
  const showLink = (pin) => {
    if (!hq || !pin) return
    link.setAttribute('d', curve(positionOf(hq), positionOf(pin)))
    const length = link.getTotalLength()
    linkTween?.kill()
    if (reduceMotion) {
      gsap.set(link, { opacity: 1, strokeDasharray: 'none', strokeDashoffset: 0 })
      return
    }
    linkTween = gsap.fromTo(
      link,
      { opacity: 1, strokeDasharray: length, strokeDashoffset: length },
      { strokeDashoffset: 0, duration: 0.9, ease: 'power3.out' }
    )
  }
  const hideLink = () => {
    linkTween?.kill()
    linkTween = gsap.to(link, { opacity: 0, duration: 0.35, ease: 'power2.out' })
  }
  const rows = $$('[data-atlas-item]', atlas)
  const previews = $$('[data-preview]', atlas)
  const canHover = window.matchMedia('(hover: hover)').matches
  let active = null
  let clearTimer = null

  const setActive = (id) => {
    active = id
    const activePin = pins.find((pin) => pin.dataset.pin === id)
    if (activePin) showLink(activePin)
    else hideLink()
    map.classList.toggle('has-active', Boolean(id))
    pins.forEach((pin) => pin.classList.toggle('is-active', pin.dataset.pin === id))
    rows.forEach((row) => row.classList.toggle('is-active', row.dataset.atlasItem === id))
    previews.forEach((card) => {
      const on = card.dataset.preview === id
      card.classList.toggle('is-active', on)
      card.setAttribute('aria-hidden', String(!on))
      $('button', card)?.setAttribute('tabindex', on ? '0' : '-1')
    })
  }
  const hold = (id) => {
    clearTimeout(clearTimer)
    setActive(id)
  }
  const release = () => {
    clearTimeout(clearTimer)
    clearTimer = setTimeout(() => setActive(null), 160)
  }

  pins.forEach((pin) => {
    const id = pin.dataset.pin
    pin.addEventListener('pointerenter', () => canHover && hold(id))
    pin.addEventListener('pointerleave', () => canHover && release())
    pin.addEventListener('focus', () => hold(id))
    pin.addEventListener('blur', release)
    pin.addEventListener('click', () => {
      if (canHover) openProject(id, { trigger: pin })
      else hold(id)
    })
    pin.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        openProject(id, { trigger: pin })
      }
    })
  })

  rows.forEach((row) => {
    const id = row.dataset.atlasItem
    row.addEventListener('pointerenter', () => canHover && hold(id))
    row.addEventListener('pointerleave', () => canHover && release())
    row.addEventListener('focus', () => hold(id))
    row.addEventListener('blur', release)
  })

  // Vorschau-Karte: beim Hineinfahren nicht ausblenden
  $('[data-atlas-preview]', atlas)?.addEventListener('pointerenter', () => clearTimeout(clearTimer))

  // Klick ins Leere (Touch) blendet die Vorschau aus
  map.addEventListener('click', (event) => {
    if (!event.target.closest('[data-pin]') && !event.target.closest('.apreview')) setActive(null)
  })

  /* ----- Einblend-Animation ----------------------------------------------- */
  if (!reduceMotion) {
    const dots = $$('.pin__dot, .pin__nr', map)
    const districts = $$('.map__fills path', map)
    const halo = $('.map__halo', map)
    gsap.set(districts, { opacity: 0 })
    gsap.set(halo, { opacity: 0 })
    gsap.set(dots, { opacity: 0, scale: 0, transformOrigin: '50% 50%' })
    gsap.set($$('.hq, .map__places, .map__labels', map), { opacity: 0 })

    const tl = gsap.timeline({
      scrollTrigger: { trigger: map, start: 'top 78%', once: true },
      defaults: { ease: 'power3.out' },
    })
    tl.to(districts, { opacity: 1, duration: 1.1, stagger: { each: 0.05, from: 'center' } }, 0)
      .to(halo, { opacity: 1, duration: 1.4 }, 0.2)
      .to($$('.map__labels, .map__places', map), { opacity: 1, duration: 1 }, 0.7)
      .to($('.hq', map), { opacity: 1, duration: 0.9 }, 0.9)
      .to(
        dots,
        { opacity: 1, scale: 1, duration: 0.9, ease: 'back.out(2.4)', stagger: 0.035, clearProps: 'transform,opacity' },
        1.0
      )
  }
}

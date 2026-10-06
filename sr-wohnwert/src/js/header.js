/**
 * Header (blendet beim Scrollen ein/aus), Lesefortschritt, aktive Navigation
 * und das Vollbild-Menü.
 */
import { gsap } from 'gsap'
import { $, $$, reduceMotion, isHome } from './env.js'
import { onScroll, getScroll, lockScroll, unlockScroll, scrollToTarget, ScrollTrigger } from './scroll.js'

const root = document.documentElement
let menuOpen = false

export function initHeader() {
  const header = $('[data-header]')
  if (!header) return
  const progress = $('[data-progress]', header)

  const update = ({ scroll, direction }) => {
    const y = scroll ?? getScroll()
    header.classList.toggle('is-scrolled', y > 24)
    // Beim Runterscrollen ausblenden, beim Hochscrollen wieder einblenden
    const hide = !menuOpen && direction === 1 && y > window.innerHeight * 0.6
    header.classList.toggle('is-hidden', hide)
    if (direction === -1 || y < 80) header.classList.remove('is-hidden')

    if (progress) {
      const max = document.documentElement.scrollHeight - window.innerHeight
      progress.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`
    }
  }
  onScroll(update)
  update({ scroll: getScroll(), direction: 0 })

  if (isHome) initCurrentSection()
  initMenu(header)
}

/** Hebt in der Navigation den Abschnitt hervor, der gerade im Bild ist */
function initCurrentSection() {
  const links = $$('.nav__list a[href^="#"]')
  // Abschnitte ohne eigenen Menüpunkt gehören inhaltlich zu einem anderen Punkt
  const parent = { standorte: 'projekte', gruppe: 'unternehmen' }
  $$('main > section[id]').forEach((section) => {
    const target = parent[section.id] ?? section.id
    ScrollTrigger.create({
      trigger: section,
      start: 'top 55%',
      end: 'bottom 55%',
      onToggle: (self) => {
        if (!self.isActive) return
        links.forEach((a) => a.classList.toggle('is-current', a.getAttribute('href') === `#${target}`))
      },
    })
  })
}

function initMenu(header) {
  const menu = $('[data-menu]')
  const burger = $('[data-burger]')
  if (!menu || !burger) return

  const items = $$('.menu__nav li a', menu)
  const aside = $('.menu__aside', menu)
  const label = $('.burger__label', burger)
  let tween = null

  const open = () => {
    if (menuOpen) return
    menuOpen = true
    menu.hidden = false
    burger.setAttribute('aria-expanded', 'true')
    burger.setAttribute('aria-label', 'Menü schließen')
    if (label) label.textContent = 'Schließen'
    header.classList.remove('is-hidden')
    lockScroll()
    tween?.kill()
    if (reduceMotion) return
    tween = gsap
      .timeline()
      .fromTo(menu, { clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.9, ease: 'expo.inOut' })
      .fromTo(items, { yPercent: 110 }, { yPercent: 0, duration: 1.1, ease: 'expo.out', stagger: 0.055 }, 0.35)
      .fromTo(aside, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, 0.7)
  }

  const close = (afterClose) => {
    if (!menuOpen) return afterClose?.()
    menuOpen = false
    burger.setAttribute('aria-expanded', 'false')
    burger.setAttribute('aria-label', 'Menü öffnen')
    if (label) label.textContent = 'Menü'
    tween?.kill()
    const finish = () => {
      menu.hidden = true
      gsap.set([menu, items, aside], { clearProps: 'all' })
      unlockScroll()
      afterClose?.()
    }
    if (reduceMotion) return finish()
    tween = gsap.to(menu, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.7, ease: 'expo.inOut', onComplete: finish })
  }

  burger.addEventListener('click', () => (menuOpen ? close() : open()))
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuOpen) {
      close()
      burger.focus()
    }
  })

  // Link im Menü: erst schließen, dann zum Abschnitt scrollen
  menu.addEventListener('click', (event) => {
    const link = event.target.closest('a[href]')
    if (!link) return
    const url = new URL(link.href, location.href)
    const samePage = url.pathname === location.pathname && url.hash
    if (samePage) {
      event.preventDefault()
      close(() => {
        const target = document.getElementById(decodeURIComponent(url.hash.slice(1)))
        if (target) {
          scrollToTarget(target, { immediate: false })
          history.pushState(null, '', url.hash)
        }
      })
    }
  })

  // Beim Wechsel auf Desktop-Breite Menü zurücksetzen
  window.matchMedia('(min-width: 1081px)').addEventListener('change', (e) => {
    if (e.matches && menuOpen) close()
  })

  root.addEventListener('menu:close', () => close())
}

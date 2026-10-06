import './js/dev-raf.js'
import './styles/index.css'

import { isHome, safe, fontsReady, $ } from './js/env.js'
import { initScroll, scrollToTarget, ScrollTrigger } from './js/scroll.js'
import { playPreloader } from './js/preloader.js'
import { initHeader } from './js/header.js'
import { initHero, refreshOnLoad } from './js/hero.js'
import { initReveals, initSplitHeadings, initScrubText, initParallax, initCounters, initStack } from './js/reveal.js'
import { initRail } from './js/rail.js'
import { initAtlas } from './js/atlas.js'
import { initDialog } from './js/dialog.js'
import { initCursor } from './js/cursor.js'
import { initMagnetic } from './js/magnetic.js'
import { initForm } from './js/form.js'
import { initHours } from './js/hours.js'

async function boot() {
  const root = document.documentElement
  const animated = root.classList.contains('js-anim')

  // Der Header fährt auf der Startseite erst nach dem Intro ein
  if (isHome && animated) $('[data-header]')?.setAttribute('data-pre', '')

  safe('scroll', initScroll)
  safe('header', initHeader)
  safe('dialog', initDialog)
  safe('form', initForm)
  safe('hours', initHours)
  safe('cursor', initCursor)
  safe('magnetic', initMagnetic)

  if (isHome) {
    // Schriften abwarten, damit Zeilenumbrüche für die Text-Animationen stimmen
    await fontsReady()
    const hero = safe('hero', initHero)
    safe('split', initSplitHeadings)
    safe('reveal', initReveals)
    safe('scrub', initScrubText)
    safe('parallax', initParallax)
    safe('counters', initCounters)
    safe('rail', initRail)
    safe('atlas', initAtlas)
    safe('stack', initStack)
    refreshOnLoad()

    // Ab hier läuft das Skript – die Notfall-Sicherung im <head> greift nicht mehr ein
    window.__srReady = true

    await playPreloader()
    hero?.play()

    // Direktlink auf einen Abschnitt (z. B. von Impressum zurück zu /#kontakt)
    if (location.hash.length > 1) {
      const target = document.getElementById(decodeURIComponent(location.hash.slice(1)))
      if (target) requestAnimationFrame(() => scrollToTarget(target, { immediate: true }))
    }
  }

  window.__srReady = true
  ScrollTrigger.refresh()
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true })
else boot()

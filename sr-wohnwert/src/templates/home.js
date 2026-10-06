import {
  site,
  intro,
  services,
  statement,
  projectsIntro,
  atlasIntro,
  build,
  group,
  team,
  contact,
  NBSP,
} from '../data/site.js'
import { projects, unitCount } from '../data/projects.js'
import { references } from '../data/references.js'
import mapData from '../data/generated/map.js'
import { esc, picture, icon, words, tel } from './helpers.js'
import { header, footer, documentShell } from './layout.js'

const NS = (p) => esc(p.shortName || p.name)
const byId = Object.fromEntries(projects.map((p) => [p.id, p]))
const nr = (i) => String(i + 1).padStart(2, '0')
const alt = (credit, name, place) => `${credit}: ${name.replace(/\u00a0/g, ' ')}, ${place}`

/* -------------------------------------------------------------------------- */
/*  Hero                                                                      */
/* -------------------------------------------------------------------------- */
function hero() {
  const featured = byId['rosenfelder-ring']
  return `<section class="hero" id="top" data-hero>
  <div class="hero__media" data-hero-media>
    ${picture('hero', { alt: 'Visualisierung eines modernen Wohngebäudes mit begrünten Terrassen im Sonnenlicht', sizes: '100vw', eager: true, position: '62% 50%' })}
  </div>
  <div class="hero__shade" aria-hidden="true"></div>
  <div class="hero__grain" aria-hidden="true"></div>

  <div class="container hero__inner">
    <p class="eyebrow eyebrow--light hero__eyebrow" data-hero-in>${esc(site.eyebrow)}</p>
    <h1 class="hero__title">
      <span class="line"><span class="line__in">Aus Werten</span></span>
      <span class="line"><span class="line__in">entsteht <em>Zukunft.</em></span></span>
    </h1>
    <p class="hero__lead" data-hero-in>Wir entwickeln, errichten und erwerben Wohn- und Gewerbeimmobilien in der Metropolregion Berlin – nachhaltig in Architektur und Wertentwicklung.</p>
    <div class="hero__cta" data-hero-in>
      <a class="btn btn--gold" href="#kontakt" data-magnetic><span>Jetzt informieren</span>${icon('arrowRight')}</a>
      <a class="btn btn--ghost" href="#projekte" data-magnetic><span>Projekte entdecken</span></a>
    </div>
  </div>

  <a class="hero__feature" href="#projekt-${featured.id}" data-project="${featured.id}" data-hero-in aria-haspopup="dialog" data-cursor="Ansehen">
    <span class="hero__feature-label">Projekt im Fokus</span>
    <strong class="hero__feature-name">${esc(featured.name)}</strong>
    <span class="hero__feature-meta">${esc(featured.place)} · 46${NBSP}Appartements · Fertigstellung I.${NBSP}Quartal${NBSP}2028</span>
    <span class="hero__feature-arrow">${icon('arrowUpRight')}</span>
  </a>
  <p class="hero__credit" data-hero-in>Visualisierung · ${esc(featured.name)}, ${esc(featured.place)}</p>

  <a class="hero__scroll" href="#unternehmen" data-hero-in aria-label="Zum Inhalt scrollen">
    <span class="hero__scroll-line"><i></i></span>
    <span>Scrollen</span>
  </a>
</section>`
}

/* -------------------------------------------------------------------------- */
/*  Unternehmen (Intro + Kennzahlen)                                          */
/* -------------------------------------------------------------------------- */
function introSection() {
  const companies = group.clusters.reduce((n, c) => n + c.companies.length, 0)
  const regions = new Set(projects.map((p) => p.region)).size
  const kpis = [
    { value: projects.length, suffix: '', label: 'aktuelle und geplante Projekte' },
    { value: Math.floor(unitCount / 10) * 10, suffix: '+', label: `Wohn-${NBSP}&${NBSP}Boarding-Einheiten in unseren Projekten` },
    { value: regions, suffix: '', label: 'Bundesländer: Berlin, Brandenburg, NRW' },
    { value: companies, suffix: '', label: 'verbundene Unternehmen in der Gruppe' },
  ]
  return `<section class="section section--light intro" id="unternehmen">
  <div class="container">
    <div class="intro__head">
      <h2 class="eyebrow" data-reveal>${esc(intro.eyebrow)}</h2>
      <p class="intro__statement" data-scrub>${words(intro.statement)}</p>
    </div>

    <div class="intro__detail">
      <p class="intro__body" data-reveal>${esc(intro.body)}</p>
      <ul class="pillars" data-stagger>
        ${intro.pillars
          .map(
            (p, i) => `<li class="pillar" data-reveal>
          <span class="pillar__nr">${nr(i)}</span>
          <h3 class="pillar__title">${esc(p.title)}</h3>
          <p>${esc(p.text)}</p>
        </li>`
          )
          .join('\n        ')}
      </ul>
    </div>

    <dl class="kpis" data-stagger>
      ${kpis
        .map(
          (k) => `<div class="kpi" data-reveal>
        <dt>${esc(k.label)}</dt>
        <dd><span class="kpi__value" data-counter="${k.value}" data-suffix="${k.suffix}">${k.value}${k.suffix}</span></dd>
      </div>`
        )
        .join('\n      ')}
    </dl>
  </div>
</section>`
}

/* -------------------------------------------------------------------------- */
/*  Leistungen                                                                */
/* -------------------------------------------------------------------------- */
function servicesSection() {
  return `<section class="section section--ivory services" id="leistungen">
  <div class="container">
    <header class="section-head">
      <p class="eyebrow" data-reveal>${esc(services.eyebrow)}</p>
      <h2 class="display" data-split>${esc(services.title)}</h2>
      <p class="lead" data-reveal>${esc(services.lead)}</p>
    </header>

    <ul class="service-grid" data-stagger>
      ${services.items
        .map(
          (s) => `<li class="service" data-reveal>
        <span class="service__nr">${s.nr}</span>
        <h3 class="service__title">${esc(s.title)}</h3>
        <p class="service__text">${esc(s.text)}</p>
        <ul class="service__points">
          ${s.points.map((p) => `<li>${esc(p)}</li>`).join('\n          ')}
        </ul>
        <a class="link-arrow" href="${s.href}"${s.topic ? ` data-prefill-topic="${s.topic}"` : ''}>${esc(s.cta)}${icon('arrowRight', 'icon icon--sm')}</a>
      </li>`
        )
        .join('\n      ')}
    </ul>

    <div class="owner" data-reveal>
      <div class="owner__text">
        <p class="eyebrow eyebrow--light">${esc(services.owner.eyebrow)}</p>
        <h3 class="owner__title">${esc(services.owner.title)}</h3>
        <p>${esc(services.owner.text)}</p>
      </div>
      <a class="btn btn--gold" href="#kontakt" data-prefill-topic="ankauf" data-magnetic><span>${esc(services.owner.cta)}</span>${icon('arrowRight')}</a>
    </div>
  </div>
</section>`
}

/* -------------------------------------------------------------------------- */
/*  Statement-Band                                                            */
/* -------------------------------------------------------------------------- */
function bandSection() {
  return `<section class="band" aria-label="${esc(statement.text)}">
  <div class="band__media" data-parallax data-parallax-speed="0.18">
    ${picture(statement.image, { alt: '', sizes: '100vw', position: '50% 38%' })}
  </div>
  <div class="band__shade" aria-hidden="true"></div>
  <div class="container band__inner">
    <p class="band__text" data-split>${esc(statement.text)}</p>
  </div>
</section>`
}

/* -------------------------------------------------------------------------- */
/*  Projekte (Slider)                                                         */
/* -------------------------------------------------------------------------- */
function projectCard(p, i) {
  return `<li class="rail__item" style="--ratio:${p.ratio}">
  <article class="pcard" data-pcard>
    <div class="pcard__media" data-cursor="Ansehen">
      <div class="pcard__img" data-pcard-img>${picture(p.image, {
        alt: alt(p.credit, p.name, p.place),
        sizes: '(max-width: 700px) 80vw, 720px',
        position: p.position,
      })}</div>
      <span class="pcard__nr">${nr(i)}</span>
      <span class="pcard__credit">${esc(p.credit)}</span>
    </div>
    <div class="pcard__body">
      <h3 class="pcard__title"><a class="pcard__link" href="#projekt-${p.id}" data-project="${p.id}" aria-haspopup="dialog">${esc(p.name)}</a></h3>
      <p class="pcard__meta"><span>${esc(p.place)}</span><span>${esc(p.type)}</span></p>
    </div>
  </article>
</li>`
}

function projectsSection() {
  return `<section class="section section--dark projects" id="projekte">
  <div class="container">
    <header class="section-head section-head--split">
      <div>
        <p class="eyebrow eyebrow--light" data-reveal>${esc(projectsIntro.eyebrow)}</p>
        <h2 class="display display--light" data-split>${esc(projectsIntro.title)}</h2>
      </div>
      <p class="lead lead--light" data-reveal>${esc(projectsIntro.lead)}</p>
    </header>
  </div>

  <div class="rail" data-rail>
    <div class="rail__viewport" data-rail-viewport data-cursor="Ziehen" tabindex="0" role="region" aria-label="Projekte – seitlich scrollen">
      <ul class="rail__track" data-rail-track>
        ${projects.map(projectCard).join('\n        ')}
      </ul>
    </div>
    <div class="container rail__controls">
      <div class="rail__progress" aria-hidden="true"><i data-rail-progress></i></div>
      <p class="rail__count" aria-hidden="true"><span data-rail-current>01</span><span class="rail__count-sep">/</span><span>${String(projects.length).padStart(2, '0')}</span></p>
      <div class="rail__buttons">
        <button class="round-btn" type="button" data-rail-prev aria-label="Vorheriges Projekt">${icon('arrowLeft')}</button>
        <button class="round-btn" type="button" data-rail-next aria-label="Nächstes Projekt">${icon('arrowRight')}</button>
      </div>
    </div>
  </div>
</section>`
}

/* -------------------------------------------------------------------------- */
/*  Karte / Standorte                                                         */
/* -------------------------------------------------------------------------- */
const geoToXY = ([lat, lon]) => {
  const { lon0, latTop, k, scale } = mapData.projection
  return [(lon - lon0) * k * scale, (latTop - lat) * scale]
}
const fmt = (n) => Math.round(n * 10) / 10

function mapSvg() {
  const labels = mapData.districts
    .map((d) => {
      const parts = d.name.split('-')
      const lines = parts.length > 1 ? [`${parts[0]}-`, parts.slice(1).join('-')] : [d.name]
      return `<text class="map__label" x="${d.cx}" y="${d.cy - (lines.length - 1) * 5}" text-anchor="middle">${lines
        .map((l, i) => `<tspan x="${d.cx}" dy="${i === 0 ? 0 : 11}">${esc(l)}</tspan>`)
        .join('')}</text>`
    })
    .join('\n      ')

  const pinned = projects.filter((p) => p.geo)
  const pins = pinned
    .map((p) => {
      const [x, y] = geoToXY(p.geo)
      const [dx, dy] = p.pin || [0, 0]
      const index = projects.indexOf(p)
      return `<g class="pin" data-pin="${p.id}" transform="translate(${fmt(x + dx)} ${fmt(y + dy)})" tabindex="0" role="button" aria-label="${esc(p.name.replace(/\u00a0/g, ' '))}, ${esc(p.place)}">
        <circle class="pin__hit" r="22"/>
        <circle class="pin__pulse" r="13"/>
        <circle class="pin__dot" r="9.5"/>
        <text class="pin__nr" y="3.4" text-anchor="middle">${nr(index)}</text>
      </g>`
    })
    .join('\n      ')

  const [hx, hy] = geoToXY([52.3975, 13.4419])
  const places = [
    { name: 'Potsdam', geo: [52.3906, 13.0645], dx: 10, dy: 4, anchor: 'start' },
    { name: 'Flughafen BER', geo: [52.3667, 13.5033], dx: 9, dy: 4, anchor: 'start' },
  ]
    .map((pl) => {
      const [x, y] = geoToXY(pl.geo)
      return `<g class="place" transform="translate(${fmt(x)} ${fmt(y)})"><circle r="2.6"/><text x="${pl.dx}" y="${pl.dy}" text-anchor="${pl.anchor}">${esc(pl.name)}</text></g>`
    })
    .join('\n      ')

  return `<svg class="map" viewBox="0 0 ${mapData.width} ${mapData.height}" role="group" aria-label="Karte der Projektstandorte in Berlin und Umland" data-map>
    <defs>
      <pattern id="map-dots" width="22" height="22" patternUnits="userSpaceOnUse"><circle cx="1.2" cy="1.2" r="1.1" class="map__dot-bg"/></pattern>
      <radialGradient id="map-fade" cx="50%" cy="50%" r="62%"><stop offset="55%" stop-color="#fff" stop-opacity="1"/><stop offset="100%" stop-color="#fff" stop-opacity="0"/></radialGradient>
      <mask id="map-mask"><rect width="${mapData.width}" height="${mapData.height}" fill="url(#map-fade)"/></mask>
    </defs>
    <rect class="map__grid" width="${mapData.width}" height="${mapData.height}" fill="url(#map-dots)" mask="url(#map-mask)"/>
    <g class="map__shape">
      <g class="map__halo">${mapData.districts.map((d) => `<path d="${d.d}"/>`).join('')}</g>
      <g class="map__fills">${mapData.districts.map((d) => `<path data-district="${d.id}" d="${d.d}"><title>${esc(d.name)}</title></path>`).join('')}</g>
    </g>
    <g class="map__labels" aria-hidden="true">
      ${labels}
    </g>
    <g class="map__places" aria-hidden="true">
      ${places}
    </g>
    <g class="hq" transform="translate(${fmt(hx)} ${fmt(hy)})" aria-label="Hauptsitz Schönefeld">
      <circle class="hq__ring" r="11"/>
      <rect class="hq__mark" x="-4" y="-4" width="8" height="8" transform="rotate(45)"/>
      <text class="hq__text" x="16" y="4">Hauptsitz Schönefeld</text>
    </g>
    <g class="map__pins">
      ${pins}
    </g>
  </svg>`
}

function atlasSection() {
  const offmap = projects.filter((p) => p.offmap)
  return `<section class="section section--dark atlas" id="standorte" data-atlas>
  <div class="container atlas__layout">
    <header class="section-head atlas__head">
      <p class="eyebrow eyebrow--light" data-reveal>${esc(atlasIntro.eyebrow)}</p>
      <h2 class="display display--light display--md" data-split>${esc(atlasIntro.title)}</h2>
      <p class="lead lead--light" data-reveal>${esc(atlasIntro.lead)}</p>
    </header>
    <div class="atlas__side">
      <ol class="atlas__list" data-reveal>
        ${projects
          .map(
            (p, i) => `<li><button class="atlas__item" type="button" data-atlas-item="${p.id}" data-project="${p.id}" aria-haspopup="dialog">
          <span class="atlas__nr">${nr(i)}</span>
          <span class="atlas__name">${NS(p)}</span>
          <span class="atlas__place">${esc(p.offmap ? p.region : p.place)}</span>
        </button></li>`
          )
          .join('\n        ')}
      </ol>
    </div>

    <div class="atlas__stage">
      <div class="atlas__map" data-atlas-map>
        ${mapSvg()}
        <div class="atlas__preview" data-atlas-preview aria-live="polite">
          ${projects
            .map(
              (p) => `<article class="apreview" data-preview="${p.id}" aria-hidden="true">
            <div class="apreview__img">${picture(p.image, { alt: '', sizes: '240px', position: p.position })}</div>
            <div class="apreview__body">
              <p class="apreview__place">${esc(p.place)}${p.offmap ? '' : ''}</p>
              <p class="apreview__name">${esc(p.name)}</p>
              <p class="apreview__type">${esc(p.type)}</p>
              <button class="link-arrow link-arrow--light" type="button" data-project="${p.id}" aria-haspopup="dialog" tabindex="-1">Details${icon('arrowRight', 'icon icon--sm')}</button>
            </div>
          </article>`
            )
            .join('\n          ')}
        </div>
      </div>
      <div class="atlas__off">
        <p class="atlas__off-label">${icon('arrowLeft', 'icon icon--sm')} Außerhalb des Kartenausschnitts · Nordrhein-Westfalen</p>
        <ul>
          ${offmap
            .map(
              (p) => `<li><button class="chip" type="button" data-atlas-item="${p.id}" data-project="${p.id}" aria-haspopup="dialog"><span>${nr(projects.indexOf(p))}</span>${NS(p)}</button></li>`
            )
            .join('\n          ')}
        </ul>
      </div>
      <p class="atlas__caption">${esc(atlasIntro.caption)}</p>
    </div>
  </div>
</section>`
}

/* -------------------------------------------------------------------------- */
/*  Sanieren & Bauen                                                          */
/* -------------------------------------------------------------------------- */
function referenceCard(r, i) {
  const linked = r.projectId ? byId[r.projectId] : null
  const media = r.images
    .map(
      (img, idx) => `<figure class="stack__fig" data-parallax-fig>
        ${picture(img.key, { alt: `${img.credit}: ${r.name.replace(/\u00a0/g, ' ')}, ${r.place}`, sizes: r.images.length > 1 ? '(max-width: 900px) 46vw, 340px' : '(max-width: 900px) 92vw, 680px', position: img.position })}
        ${idx === 0 ? `<figcaption>${esc(img.credit)}</figcaption>` : ''}
      </figure>`
    )
    .join('\n      ')
  return `<li class="stack__card" style="--i:${i}" data-stack-card>
  <div class="stack__media stack__media--${r.images.length}">
      ${media}
  </div>
  <div class="stack__body">
    <p class="stack__kind"><span>${nr(i)}</span>${esc(r.kind)}</p>
    <h3 class="stack__title">${esc(r.name)}</h3>
    <p class="stack__place">${icon('pin', 'icon icon--sm')}${esc(r.place)}</p>
    <p class="stack__text">${esc(r.text)}</p>
    <ul class="tags">${r.scope.map((s) => `<li>${esc(s)}</li>`).join('')}</ul>
    ${linked ? `<button class="link-arrow" type="button" data-project="${linked.id}" aria-haspopup="dialog">Zum Projekt${icon('arrowRight', 'icon icon--sm')}</button>` : ''}
  </div>
</li>`
}

function buildSection() {
  return `<section class="section section--light build" id="sanieren-bauen" data-stack>
  <div class="container">
    <header class="section-head section-head--split">
      <div>
        <p class="eyebrow" data-reveal>${esc(build.eyebrow)}</p>
        <h2 class="display" data-split>${esc(build.title)}</h2>
      </div>
      <div>
        <p class="lead" data-reveal>${esc(build.lead)}</p>
        <ul class="tags tags--lg" data-reveal>${build.capabilities.map((c) => `<li>${esc(c)}</li>`).join('')}</ul>
      </div>
    </header>

    <ol class="stack">
      ${references.map(referenceCard).join('\n      ')}
    </ol>
  </div>
</section>`
}

/* -------------------------------------------------------------------------- */
/*  Unternehmensgruppe                                                        */
/* -------------------------------------------------------------------------- */
function groupSection() {
  return `<section class="section section--ivory group" id="gruppe">
  <div class="container">
    <header class="section-head section-head--center">
      <p class="eyebrow" data-reveal>${esc(group.eyebrow)}</p>
      <h2 class="display" data-split>${esc(group.title)}</h2>
      <p class="lead" data-reveal>${esc(group.lead)}</p>
    </header>

    <div class="group__hub" data-reveal aria-hidden="true">
      <img src="/brand/emblem.svg" alt="" width="40" height="62" loading="lazy">
      <span>S${NBSP}&amp;${NBSP}R Wohnwert</span>
    </div>

    <div class="group__grid" data-stagger>
      ${group.clusters
        .map(
          (c) => `<article class="cluster" data-reveal>
        <header class="cluster__head">
          <span class="cluster__count">${String(c.companies.length).padStart(2, '0')}</span>
          <h3 class="cluster__title">${esc(c.title)}</h3>
        </header>
        <ul class="cluster__list">
          ${c.companies
            .map((co) =>
              co.url
                ? `<li><a class="company company--link" href="${co.url}" target="_blank" rel="noopener noreferrer"><span>${esc(co.name)}</span>${icon('arrowUpRight', 'icon icon--sm')}</a></li>`
                : `<li><span class="company"><span>${esc(co.name)}</span></span></li>`
            )
            .join('\n          ')}
        </ul>
      </article>`
        )
        .join('\n      ')}
    </div>
  </div>
</section>`
}

/* -------------------------------------------------------------------------- */
/*  Team                                                                      */
/* -------------------------------------------------------------------------- */
function teamSection() {
  return `<section class="section section--light team" id="team">
  <div class="container">
    <div class="team__top">
      <div>
        <p class="eyebrow" data-reveal>${esc(team.eyebrow)}</p>
        <h2 class="display display--md" data-split>${esc(team.title)}</h2>
      </div>
      <div class="team__intro">
        <p class="lead" data-reveal>${esc(team.lead)}</p>
        <ul class="tags tags--lg" data-reveal>${team.disciplines.map((d) => `<li>${esc(d)}</li>`).join('')}</ul>
      </div>
    </div>

    <p class="team__subtitle" data-reveal>${esc(team.subtitle)}</p>
    <ol class="values" data-stagger>
      ${team.values
        .map(
          (v, i) => `<li class="value" data-reveal>
        <span class="value__nr">${nr(i)}</span>
        <h3 class="value__title">${esc(v.title)}</h3>
        <p>${esc(v.text)}</p>
      </li>`
        )
        .join('\n      ')}
    </ol>

    <div class="team__foot" data-reveal>
      <p>${esc(team.note)}</p>
      <div class="director">
        <span class="director__mono" aria-hidden="true">VÖ</span>
        <div>
          <p class="director__name">${esc(site.legal.managingDirector)}</p>
          <p class="director__role">Geschäftsführung</p>
        </div>
      </div>
    </div>
  </div>
</section>`
}

/* -------------------------------------------------------------------------- */
/*  Kontakt                                                                   */
/* -------------------------------------------------------------------------- */
function contactSection() {
  const osm = 'https://www.openstreetmap.org/?mlat=52.3975&mlon=13.4419#map=16/52.3975/13.4419'
  return `<section class="section section--dark contact" id="kontakt">
  <div class="container contact__layout">
    <div class="contact__info">
      <p class="eyebrow eyebrow--light" data-reveal>${esc(contact.eyebrow)}</p>
      <h2 class="display display--light display--lg" data-split>${esc(contact.title)}<br><em>${esc(contact.titleAccent)}</em></h2>

      <ul class="contact__list" data-stagger>
        <li data-reveal>
          <span class="contact__icon">${icon('pin')}</span>
          <div>
            <h3>Adresse</h3>
            <address>${esc(site.legalName)}<br>${site.address.street}<br>${site.address.zip}${NBSP}${site.address.city}</address>
            <a class="link-arrow link-arrow--light" href="${osm}" target="_blank" rel="noopener noreferrer">Route auf OpenStreetMap${icon('arrowUpRight', 'icon icon--sm')}</a>
          </div>
        </li>
        <li data-reveal>
          <span class="contact__icon">${icon('phone')}</span>
          <div>
            <h3>Telefon &amp; E-Mail</h3>
            <p><a href="${tel(site.phone.tel)}">${site.phone.display}</a><br><a href="mailto:${site.email}">${site.email}</a></p>
          </div>
        </li>
        <li data-reveal>
          <span class="contact__icon">${icon('mail')}</span>
          <div>
            <h3>Ankauf${NBSP}&amp;${NBSP}Grundstücke</h3>
            <p><a href="mailto:${site.emailAnkauf}">${site.emailAnkauf}</a><br><a href="${tel(site.mobile.tel)}">${site.mobile.display}</a></p>
          </div>
        </li>
        <li data-reveal>
          <span class="contact__icon">${icon('clock')}</span>
          <div>
            <h3>Geschäftszeiten <span class="status" data-hours hidden><i></i><span data-hours-text></span></span></h3>
            <ul class="hours">
              ${site.hours.map((h) => `<li><span>${esc(h.days)}</span><span>${esc(h.time)}</span></li>`).join('\n              ')}
            </ul>
          </div>
        </li>
      </ul>
    </div>

    <div class="contact__card" data-reveal>
      <form class="form" data-form action="/api/contact.php" method="post" novalidate>
        <fieldset class="form__topics">
          <legend class="form__legend">Ihr Anliegen</legend>
          <div class="chips">
            ${contact.topics
              .map(
                (t, i) => `<label class="chip-radio"><input type="radio" name="topic" value="${t.value}"${i === 0 ? ' checked' : ''}><span>${esc(t.label)}</span></label>`
              )
              .join('\n            ')}
          </div>
        </fieldset>

        <div class="form__row">
          <div class="field">
            <input id="f-name" name="name" type="text" autocomplete="name" placeholder=" " required maxlength="120">
            <label for="f-name">Name</label>
            <span class="field__line" aria-hidden="true"></span>
          </div>
          <div class="field">
            <input id="f-email" name="email" type="email" autocomplete="email" placeholder=" " required maxlength="160">
            <label for="f-email">E-Mail</label>
            <span class="field__line" aria-hidden="true"></span>
          </div>
        </div>
        <div class="field">
          <input id="f-phone" name="phone" type="tel" autocomplete="tel" placeholder=" " maxlength="60">
          <label for="f-phone">Telefon <small>(optional)</small></label>
          <span class="field__line" aria-hidden="true"></span>
        </div>
        <div class="field field--area">
          <textarea id="f-message" name="message" rows="4" placeholder=" " required maxlength="4000"></textarea>
          <label for="f-message">Ihre Nachricht</label>
          <span class="field__line" aria-hidden="true"></span>
        </div>

        <div class="hp" aria-hidden="true"><label>Bitte leer lassen<input type="text" name="website" tabindex="-1" autocomplete="off"></label></div>
        <input type="hidden" name="ts" value="">

        <label class="check">
          <input type="checkbox" name="consent" required>
          <span class="check__box" aria-hidden="true">${icon('check')}</span>
          <span class="check__text">Ich habe die <a href="/datenschutz/" target="_blank" rel="noopener">Datenschutzerklärung</a> gelesen und stimme der Verarbeitung meiner Angaben zur Bearbeitung meiner Anfrage zu.</span>
        </label>

        <div class="form__actions">
          <button class="btn btn--gold" type="submit" data-magnetic><span>Nachricht senden</span>${icon('arrowRight')}</button>
          <p class="form__status" role="status" aria-live="polite" data-form-status></p>
        </div>
      </form>

      <div class="form__success" data-form-success hidden>
        <span class="form__success-icon">${icon('check')}</span>
        <h3>Vielen Dank für Ihre Nachricht.</h3>
        <p>Wir haben Ihre Anfrage erhalten und melden uns zeitnah bei Ihnen.</p>
      </div>
    </div>
  </div>
</section>`
}

/* -------------------------------------------------------------------------- */
/*  Projekt-Detailansicht (Dialog + Vorlagen)                                 */
/* -------------------------------------------------------------------------- */
function dialogShell() {
  return `<dialog class="pdialog" id="project-dialog" aria-labelledby="pd-title" data-dialog>
  <div class="pdialog__backdrop" data-dialog-close></div>
  <div class="pdialog__panel" data-lenis-prevent>
    <button class="pdialog__close" type="button" data-dialog-close aria-label="Schließen">${icon('close')}</button>
    <div class="pdialog__content" data-dialog-content></div>
  </div>
</dialog>`
}

function projectTemplate(p, i) {
  const prev = projects[(i - 1 + projects.length) % projects.length]
  const next = projects[(i + 1) % projects.length]
  const images = p.gallery
  return `<template data-project-tpl="${p.id}">
  <div class="pd">
    <div class="pd__gallery">
      <div class="pd__stage">
        ${images
          .map(
            (g, idx) => `<figure class="pd__slide${idx === 0 ? ' is-active' : ''}" data-slide="${idx}">
          ${picture(g.key, { alt: alt(g.credit, p.name, p.place), sizes: '(max-width: 900px) 96vw, 760px', position: idx === 0 ? p.position : '50% 50%' })}
          <figcaption>${esc(g.credit)}</figcaption>
        </figure>`
          )
          .join('\n        ')}
      </div>
      ${
        images.length > 1
          ? `<ul class="pd__thumbs" aria-label="Bildauswahl">
        ${images
          .map(
            (g, idx) => `<li><button type="button" class="pd__thumb${idx === 0 ? ' is-active' : ''}" data-thumb="${idx}" aria-label="Bild ${idx + 1} von ${images.length}">${picture(g.key, { alt: '', sizes: '96px' })}</button></li>`
          )
          .join('\n        ')}
      </ul>`
          : ''
      }
    </div>
    <div class="pd__info">
      <p class="eyebrow eyebrow--light pd__eyebrow">${nr(i)} · ${esc(p.place)}</p>
      <h2 class="pd__title" id="pd-title">${esc(p.name)}</h2>
      <p class="pd__type">${esc(p.type)}</p>
      <p class="pd__lead">${esc(p.teaser)}</p>
      <p class="pd__text">${esc(p.summary)}</p>
      <dl class="pd__facts">
        ${p.facts.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('\n        ')}
      </dl>
      <div class="pd__actions">
        <a class="btn btn--gold" href="#kontakt" data-dialog-close data-prefill-topic="projekt" data-prefill-text="Ich interessiere mich für das Projekt „${esc(p.name.replace(/\u00a0/g, ' '))}“ (${esc(p.place)}) und bitte um weitere Informationen.">
          <span>Projekt anfragen</span>${icon('arrowRight')}
        </a>
      </div>
      <nav class="pd__nav" aria-label="Weitere Projekte">
        <button type="button" data-project="${prev.id}">${icon('arrowLeft', 'icon icon--sm')}<span><small>Vorheriges</small>${NS(prev)}</span></button>
        <button type="button" data-project="${next.id}"><span><small>Nächstes</small>${NS(next)}</span>${icon('arrowRight', 'icon icon--sm')}</button>
      </nav>
    </div>
  </div>
</template>`
}

/* -------------------------------------------------------------------------- */
/*  Seite                                                                     */
/* -------------------------------------------------------------------------- */
export function homePage() {
  const body = `<div class="preloader" data-preloader aria-hidden="true">
  <div class="preloader__inner">
    <div class="preloader__emblem" data-preloader-emblem><img src="/brand/emblem.svg" alt="" width="62" height="97"></div>
    <p class="preloader__word"><span data-preloader-word>S&amp;R Wohnwert</span></p>
    <div class="preloader__bar"><i data-preloader-bar></i></div>
  </div>
</div>

${header({ home: true })}

<main id="main">
${hero()}
${introSection()}
${servicesSection()}
${bandSection()}
${projectsSection()}
${atlasSection()}
${buildSection()}
${groupSection()}
${teamSection()}
${contactSection()}
</main>

${footer({ home: true })}

${dialogShell()}
<div hidden data-project-templates>
${projects.map(projectTemplate).join('\n')}
</div>`

  return documentShell({
    page: 'home',
    title: site.title,
    description: site.description,
    path: '/',
    body,
    schema: true,
  })
}

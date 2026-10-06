import { site, NBSP } from '../data/site.js'
import { esc, icon, tel } from './helpers.js'

const FONT_PRELOADS = [
  '/fonts/instrument-serif-400.woff2',
  '/fonts/inter-variable.woff2',
]

/** Strukturierte Daten (schema.org) – hilft Suchmaschinen bei der Einordnung */
function jsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${site.url}/#organization`,
        name: site.legalName,
        alternateName: 'S & R Wohnwert',
        url: site.url,
        logo: `${site.url}/brand/logo.svg`,
        description: site.description,
        email: site.email,
        telephone: site.phone.tel,
        address: {
          '@type': 'PostalAddress',
          streetAddress: site.address.street,
          postalCode: site.address.zip,
          addressLocality: site.address.city,
          addressCountry: 'DE',
        },
        areaServed: 'Metropolregion Berlin',
        sameAs: [site.social.instagram],
      },
      {
        '@type': 'WebSite',
        '@id': `${site.url}/#website`,
        url: site.url,
        name: site.name.replace(/\u00a0/g, ' '),
        inLanguage: 'de-DE',
        publisher: { '@id': `${site.url}/#organization` },
      },
    ],
  }
  return `<script type="application/ld+json">${JSON.stringify(data)}</script>`
}

/** Komplettes HTML-Dokument */
export function documentShell({ page, title, description, path = '/', body, noindex = false, schema = false }) {
  const canonical = `${site.url}${path}`
  const ogImage = `${site.url}/og-image.jpg`
  return `<!doctype html>
<html lang="de" class="no-js" data-page="${page}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${canonical}">
<meta name="robots" content="${noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'}">
<meta name="theme-color" content="#080d26">
<meta name="format-detection" content="telephone=no">

<meta property="og:type" content="website">
<meta property="og:locale" content="${site.locale}">
<meta property="og:site_name" content="S &amp; R Wohnwert">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${ogImage}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">

<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
${FONT_PRELOADS.map((href) => `<link rel="preload" href="${href}" as="font" type="font/woff2" crossorigin>`).join('\n')}

<script>
(function () {
  var d = document.documentElement;
  d.classList.remove('no-js'); d.classList.add('js');
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduce) d.classList.add('js-anim');
  var internal = document.referrer && document.referrer.indexOf(location.origin) === 0;
  var nav = window.performance && performance.getEntriesByType && performance.getEntriesByType('navigation')[0];
  var fresh = !nav || nav.type === 'navigate';
  if (d.getAttribute('data-page') === 'home' && !reduce && !internal && !location.hash && fresh) d.classList.add('is-loading');
  setTimeout(function () { if (!window.__srReady) d.classList.remove('is-loading', 'js-anim'); }, 7000);
})();
</script>
${schema ? jsonLd() : ''}
</head>
<body>
${body}
<script type="module" src="/src/main.js"></script>
</body>
</html>
`
}

/** Header + Vollbild-Menü */
export function header({ home = false } = {}) {
  const base = home ? '' : '/'
  const link = (item) => `<a href="${base}${item.href}">${esc(item.label)}</a>`
  const all = [...site.nav, ...site.menuExtra, { label: 'Kontakt', href: '#kontakt' }]
  return `<a class="skip-link" href="#main">Zum Inhalt springen</a>

<header class="site-header" data-header>
  <div class="site-header__inner">
    <a class="logo" href="/" aria-label="S &amp; R Wohnwert – zur Startseite">
      <img src="/brand/logo-light.svg" alt="S &amp; R Wohnwert" width="104" height="40">
    </a>
    <nav class="nav" aria-label="Hauptnavigation">
      <ul class="nav__list">
        ${site.nav.map((item) => `<li>${link(item)}</li>`).join('\n        ')}
      </ul>
    </nav>
    <a class="btn btn--outline btn--sm nav__cta" href="${base}#kontakt" data-magnetic>Kontakt</a>
    <button class="burger" type="button" aria-expanded="false" aria-controls="menu" data-burger>
      <span class="burger__label">Menü</span>
      <span class="burger__lines" aria-hidden="true"><i></i><i></i></span>
    </button>
  </div>
  <div class="site-header__progress" aria-hidden="true"><i data-progress></i></div>
</header>

<div class="menu" id="menu" data-menu hidden>
  <div class="menu__inner">
    <nav class="menu__nav" aria-label="Menü">
      <ol>
        ${all
          .map(
            (item, i) => `<li><a href="${base}${item.href}"><span class="menu__nr">${String(i + 1).padStart(2, '0')}</span><span class="menu__text">${esc(item.label)}</span></a></li>`
          )
          .join('\n        ')}
      </ol>
    </nav>
    <div class="menu__aside">
      <p class="menu__claim">${esc(site.claim)}</p>
      <address class="menu__contact">
        <a href="${tel(site.phone.tel)}">${icon('phone')}${site.phone.display}</a>
        <a href="mailto:${site.email}">${icon('mail')}${site.email}</a>
        <span>${icon('pin')}${site.address.street}, ${site.address.zip}${NBSP}${site.address.city}</span>
      </address>
    </div>
  </div>
</div>`
}

/** Footer (auf allen Seiten) */
export function footer({ home = false } = {}) {
  const base = home ? '' : '/'
  const year = new Date().getFullYear()
  return `<footer class="site-footer" data-footer>
  <div class="container">
    <div class="site-footer__top">
      <a class="site-footer__logo" href="/" aria-label="S &amp; R Wohnwert – zur Startseite">
        <img src="/brand/logo-light.svg" alt="S &amp; R Wohnwert" width="156" height="60" loading="lazy">
      </a>
      <p class="site-footer__claim">${esc(site.claim.replace('Zukunft.', ''))}<em>Zukunft.</em></p>
    </div>

    <div class="site-footer__grid">
      <div class="site-footer__col">
        <h2 class="site-footer__title">Navigation</h2>
        <ul>
          ${[...site.nav, ...site.menuExtra, { label: 'Kontakt', href: '#kontakt' }]
            .map((item) => `<li><a href="${base}${item.href}">${esc(item.label)}</a></li>`)
            .join('\n          ')}
        </ul>
      </div>
      <div class="site-footer__col">
        <h2 class="site-footer__title">Kontakt</h2>
        <address>
          <p>${esc(site.legalName)}<br>${site.address.street}<br>${site.address.zip}${NBSP}${site.address.city}</p>
          <p><a href="${tel(site.phone.tel)}">${site.phone.display}</a><br><a href="mailto:${site.email}">${site.email}</a></p>
        </address>
      </div>
      <div class="site-footer__col">
        <h2 class="site-footer__title">Erreichbarkeit</h2>
        <ul class="site-footer__hours">
          ${site.hours.map((h) => `<li><span>${esc(h.days)}</span><span>${esc(h.time)}</span></li>`).join('\n          ')}
        </ul>
      </div>
      <div class="site-footer__col">
        <h2 class="site-footer__title">Folgen Sie uns</h2>
        <ul>
          <li><a class="link-arrow" href="${site.social.instagram}" target="_blank" rel="noopener noreferrer">${icon('instagram')}Instagram${icon('arrowUpRight', 'icon icon--sm')}</a></li>
        </ul>
      </div>
    </div>

    <div class="site-footer__bottom">
      <p>© ${year} ${esc(site.legalName)} · ${site.legal.registerCourt}, ${site.legal.registerNumber}</p>
      <ul>
        <li><a href="/impressum/">Impressum</a></li>
        <li><a href="/datenschutz/">Datenschutz</a></li>
        <li><button type="button" class="to-top" data-to-top>Nach oben ${icon('arrowUp', 'icon icon--sm')}</button></li>
      </ul>
    </div>
  </div>
</footer>

<div class="cursor" data-cursor-el aria-hidden="true"><span class="cursor__dot"></span><span class="cursor__ring"><span class="cursor__label"></span></span></div>`
}

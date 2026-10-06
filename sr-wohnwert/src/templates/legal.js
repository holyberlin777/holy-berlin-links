import { site, NBSP } from '../data/site.js'
import { esc, icon, tel } from './helpers.js'
import { header, footer, documentShell } from './layout.js'

const PRIVACY_DATE = 'Oktober 2026'
const L = site.legal
const addr = `${site.address.street}<br>${site.address.zip}${NBSP}${site.address.city}`

function legalPage({ page, title, description, path, heading, intro, content, toc = [] }) {
  const body = `${header({ home: false })}
<main id="main" class="legal">
  <div class="legal__hero">
    <div class="container">
      <p class="eyebrow eyebrow--light">Rechtliches</p>
      <h1 class="legal__title">${esc(heading)}</h1>
      ${intro ? `<p class="legal__intro">${intro}</p>` : ''}
    </div>
  </div>
  <div class="container legal__layout">
    ${
      toc.length
        ? `<nav class="legal__toc" aria-label="Inhaltsverzeichnis"><p class="legal__toc-title">Inhalt</p><ol>${toc
            .map(([id, label]) => `<li><a href="#${id}">${esc(label)}</a></li>`)
            .join('')}</ol></nav>`
        : '<span></span>'
    }
    <div class="legal__content prose">
${content}
    </div>
  </div>
</main>
${footer({ home: false })}`
  return documentShell({ page, title, description, path, body, noindex: false })
}

/* -------------------------------------------------------------------------- */
/*  Impressum                                                                 */
/* -------------------------------------------------------------------------- */
export function impressumPage() {
  const content = `
<h2>Angaben gemäß § 5 DDG</h2>
<p><strong>${esc(site.legalName)}</strong><br>${addr}</p>

<h2>Vertreten durch</h2>
<p>Geschäftsführer: ${esc(L.managingDirector)}</p>

<h2>Kontakt</h2>
<p>Telefon: <a href="${tel(site.phone.tel)}">${site.phone.display}</a><br>E-Mail: <a href="mailto:${site.email}">${site.email}</a></p>

<h2>Registereintrag</h2>
<p>Eintragung im Handelsregister.<br>Registergericht: ${esc(L.registerCourt)}<br>Registernummer: ${esc(L.registerNumber)}</p>
${
  L.vatId
    ? `<h2>Umsatzsteuer-Identifikationsnummer</h2>
<p>Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz: ${esc(L.vatId)}</p>`
    : ''
}

<h2>Erlaubnis und zuständige Aufsichtsbehörde</h2>
<p>${esc(L.supervisory.permit)}.</p>
<p>Zuständige Behörde:<br>${esc(L.supervisory.name)}<br>${esc(L.supervisory.unit)}<br>${esc(L.supervisory.street)}, ${esc(L.supervisory.city)}</p>

<h2>Haftung für Inhalte</h2>
<p>Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.</p>

<h2>Haftung für Links</h2>
<p>Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.</p>

<h2>Urheberrecht</h2>
<p>Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.</p>

<h2>Bildmaterial und Visualisierungen</h2>
<p>Bei den auf dieser Website gezeigten Darstellungen von Bauvorhaben handelt es sich, soweit gekennzeichnet, um Visualisierungen. Abweichungen von der späteren Ausführung sind möglich. Bildmaterial: ${esc(site.legalName)} und Projektpartner.</p>

<h2>Kartengrundlage</h2>
<p>Die Standortkarte basiert auf den Bezirksgrenzen des Geoportals Berlin (ALKIS Berlin Bezirke), bereitgestellt unter der Datenlizenz Deutschland – Zero – Version 2.0. Die Karte wird ohne externe Kartendienste direkt von dieser Website ausgeliefert.</p>
`
  return legalPage({
    page: 'impressum',
    title: `Impressum · ${site.legalName}`,
    description: `Impressum der ${site.legalName}, ${site.address.street}, ${site.address.zip} ${site.address.city}.`,
    path: '/impressum/',
    heading: 'Impressum',
    content,
  })
}

/* -------------------------------------------------------------------------- */
/*  Datenschutz                                                               */
/* -------------------------------------------------------------------------- */
export function datenschutzPage() {
  const toc = [
    ['verantwortlicher', 'Verantwortlicher'],
    ['ueberblick', 'Überblick'],
    ['hosting', 'Hosting und Server-Logfiles'],
    ['kontakt', 'Kontaktaufnahme'],
    ['speicherung', 'Cookies und lokale Speicherung'],
    ['externe-links', 'Externe Links und Instagram'],
    ['sicherheit', 'Datensicherheit'],
    ['rechte', 'Ihre Rechte'],
    ['aenderungen', 'Aktualität dieser Erklärung'],
  ]
  const content = `
<h2 id="verantwortlicher">Verantwortlicher</h2>
<p>Verantwortlich für die Datenverarbeitung auf dieser Website im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:</p>
<p><strong>${esc(site.legalName)}</strong><br>${addr}<br>Vertreten durch: ${esc(L.managingDirector)} (Geschäftsführer)<br>Telefon: <a href="${tel(site.phone.tel)}">${site.phone.display}</a><br>E-Mail: <a href="mailto:${site.email}">${site.email}</a></p>
<p>Weitere Angaben finden Sie in unserem <a href="/impressum/">Impressum</a>.</p>

<h2 id="ueberblick">Überblick</h2>
<p>Der Schutz Ihrer personenbezogenen Daten ist uns wichtig. Wir verarbeiten personenbezogene Daten nur, soweit dies zur Bereitstellung dieser Website und zur Bearbeitung Ihrer Anfragen erforderlich ist.</p>
<p>Diese Website verzichtet bewusst auf Analyse- und Tracking-Werkzeuge, auf Werbe-Cookies und auf die Einbindung von Inhalten externer Anbieter: Schriftarten, Bilder und die Standortkarte werden direkt von unserem Server ausgeliefert. Beim Aufruf der Seite werden daher keine Daten an Dritte wie Schriftenanbieter, Kartendienste oder Werbenetzwerke übertragen.</p>

<h2 id="hosting">Hosting und Server-Logfiles</h2>
<p>Diese Website wird bei einem externen Hosting-Anbieter betrieben. Beim Aufruf unserer Seiten verarbeitet der Webserver technisch notwendige Verbindungsdaten (sogenannte Server-Logfiles). Dazu gehören insbesondere:</p>
<ul>
<li>IP-Adresse des anfragenden Geräts,</li>
<li>Datum und Uhrzeit der Anfrage,</li>
<li>aufgerufene Seite bzw. Datei und übertragene Datenmenge,</li>
<li>Referrer-URL (zuvor besuchte Seite), Browsertyp und -version sowie Betriebssystem.</li>
</ul>
<p>Die Verarbeitung ist erforderlich, um die Website auszuliefern, ihre Stabilität und Sicherheit zu gewährleisten und Missbrauch abzuwehren. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einem sicheren und effizienten Betrieb). Die Logfiles werden für höchstens 30 Tage gespeichert und anschließend gelöscht oder anonymisiert; Daten, die zu Beweiszwecken aufbewahrt werden müssen, sind bis zur Klärung des jeweiligen Vorfalls ausgenommen. Mit dem Hosting-Anbieter besteht ein Vertrag zur Auftragsverarbeitung gemäß Art. 28 DSGVO.</p>

<h2 id="kontakt">Kontaktaufnahme</h2>
<p>Wenn Sie uns über das Kontaktformular, per E-Mail oder telefonisch kontaktieren, verarbeiten wir die von Ihnen mitgeteilten Daten – bei Nutzung des Formulars Name, E-Mail-Adresse, Ihr Anliegen, Ihre Nachricht sowie, wenn Sie diese angeben, Ihre Telefonnummer – ausschließlich zur Bearbeitung Ihrer Anfrage und für mögliche Anschlussfragen.</p>
<p>Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit Ihre Anfrage mit der Durchführung vorvertraglicher Maßnahmen oder eines Vertrags zusammenhängt, im Übrigen Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Beantwortung von Anfragen). Mit dem Absenden des Formulars bestätigen Sie, die Datenschutzerklärung zur Kenntnis genommen zu haben.</p>
<p>Die Formulardaten werden per E-Mail an uns übermittelt und nicht in einer Datenbank auf der Website gespeichert. Wir löschen Ihre Anfrage, sobald sie abschließend bearbeitet ist und keine gesetzlichen Aufbewahrungspflichten (insbesondere nach Handels- und Steuerrecht) entgegenstehen.</p>
<p><strong>Schutz vor Missbrauch:</strong> Das Formular enthält ein für Menschen unsichtbares Feld und eine Zeitprüfung, um automatisierte Spam-Anfragen zu erkennen. Zusätzlich wird kurzzeitig ein nicht rückrechenbarer Hashwert Ihrer IP-Adresse in einer temporären Datei auf dem Server gespeichert, um die Anzahl von Anfragen pro Gerät zu begrenzen; die Datei wird automatisch bereinigt (Art. 6 Abs. 1 lit. f DSGVO).</p>

<h2 id="speicherung">Cookies und lokale Speicherung</h2>
<p>Diese Website setzt keine Cookies und speichert keine Informationen in Ihrem Endgerät (z. B. im Local Storage). Eine Einwilligungsabfrage („Cookie-Banner“) ist daher nicht erforderlich.</p>

<h2 id="externe-links">Externe Links und Instagram</h2>
<p>Unsere Website enthält Links zu externen Seiten, etwa zu den Webseiten verbundener Unternehmen, zu OpenStreetMap (Routenplanung) und zu unserem Instagram-Profil. Es handelt sich ausschließlich um Verlinkungen: Daten werden erst übertragen, wenn Sie einen Link anklicken. Ab diesem Zeitpunkt gelten die Datenschutzbestimmungen des jeweiligen Anbieters, auf die wir keinen Einfluss haben.</p>
<p>Unser Instagram-Profil wird von Meta Platforms Ireland Limited, Merrion Road, Dublin 4, Irland betrieben. Informationen zur Datenverarbeitung finden Sie in der Datenschutzrichtlinie von Instagram.</p>

<h2 id="sicherheit">Datensicherheit</h2>
<p>Diese Website nutzt eine SSL-/TLS-Verschlüsselung. Sie erkennen verschlüsselte Verbindungen an dem Präfix „https://“ in der Adresszeile Ihres Browsers. Wir treffen angemessene technische und organisatorische Maßnahmen, um Ihre Daten vor Verlust, Missbrauch und unbefugtem Zugriff zu schützen.</p>

<h2 id="rechte">Ihre Rechte</h2>
<p>Ihnen stehen gegenüber uns als Verantwortlichem folgende Rechte zu:</p>
<ul>
<li><strong>Auskunft</strong> über die zu Ihrer Person gespeicherten Daten (Art. 15 DSGVO),</li>
<li><strong>Berichtigung</strong> unrichtiger Daten (Art. 16 DSGVO),</li>
<li><strong>Löschung</strong> Ihrer Daten (Art. 17 DSGVO),</li>
<li><strong>Einschränkung</strong> der Verarbeitung (Art. 18 DSGVO),</li>
<li><strong>Datenübertragbarkeit</strong> (Art. 20 DSGVO),</li>
<li><strong>Widerspruch</strong> gegen Verarbeitungen, die auf Art. 6 Abs. 1 lit. e oder f DSGVO beruhen (Art. 21 DSGVO),</li>
<li><strong>Widerruf</strong> einer erteilten Einwilligung mit Wirkung für die Zukunft (Art. 7 Abs. 3 DSGVO).</li>
</ul>
<p>Zur Ausübung Ihrer Rechte genügt eine formlose Mitteilung an <a href="mailto:${site.email}">${site.email}</a>.</p>
<p>Außerdem haben Sie das Recht, sich bei einer Datenschutzaufsichtsbehörde zu beschweren. Für uns zuständig ist die Landesbeauftragte für den Datenschutz und für das Recht auf Akteneinsicht des Landes Brandenburg, Stahnsdorfer Damm 77, 14532 Kleinmachnow, <a href="https://www.lda.brandenburg.de" target="_blank" rel="noopener noreferrer">www.lda.brandenburg.de</a>.</p>
<p>Die Bereitstellung Ihrer Daten ist weder gesetzlich noch vertraglich vorgeschrieben; ohne die Angaben im Kontaktformular können wir Ihre Anfrage jedoch nicht bearbeiten. Eine automatisierte Entscheidungsfindung einschließlich Profiling findet nicht statt.</p>

<h2 id="aenderungen">Aktualität dieser Erklärung</h2>
<p>Stand: ${PRIVACY_DATE}. Wir passen diese Datenschutzerklärung an, sobald Änderungen an der Website oder rechtliche Vorgaben dies erforderlich machen.</p>
`
  return legalPage({
    page: 'datenschutz',
    title: `Datenschutzerklärung · ${site.legalName}`,
    description: `Datenschutzerklärung der ${site.legalName}: keine Tracking-Tools, keine Cookies, keine Drittanbieter-Inhalte.`,
    path: '/datenschutz/',
    heading: 'Datenschutzerklärung',
    intro: 'Kurz gesagt: kein Tracking, keine Cookies, keine eingebundenen Dienste von Drittanbietern.',
    content,
    toc,
  })
}

/* -------------------------------------------------------------------------- */
/*  404                                                                       */
/* -------------------------------------------------------------------------- */
export function notFoundPage() {
  const body = `${header({ home: false })}
<main id="main" class="notfound">
  <div class="container notfound__inner">
    <p class="notfound__code" aria-hidden="true">404</p>
    <h1 class="notfound__title">Diese Seite gibt es <em>nicht.</em></h1>
    <p class="notfound__text">Der gesuchte Inhalt wurde verschoben oder existiert nicht mehr. Hier geht es weiter:</p>
    <div class="notfound__actions">
      <a class="btn btn--gold" href="/"><span>Zur Startseite</span>${icon('arrowRight')}</a>
      <a class="btn btn--ghost" href="/#projekte"><span>Projekte ansehen</span></a>
    </div>
  </div>
</main>
${footer({ home: false })}`
  return documentShell({
    page: 'notfound',
    title: `Seite nicht gefunden · ${site.legalName}`,
    description: 'Die angeforderte Seite wurde nicht gefunden.',
    path: '/404.html',
    body,
    noindex: true,
  })
}

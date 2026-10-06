/**
 * Zentrale Stammdaten und Texte der Website.
 * Änderungen hier wirken sich auf alle Seiten aus (Kontakt, Impressum, Footer, SEO …).
 */

export const NBSP = '\u00a0'

export const site = {
  name: `S${NBSP}&${NBSP}R Wohnwert`,
  legalName: 'S&R Wohnwert GmbH',
  url: 'https://sr-wohnwert.de',
  locale: 'de_DE',

  claim: 'Aus Werten entsteht Zukunft.',
  eyebrow: 'Immobilien · Invest · Joint Venture',
  title: 'S & R Wohnwert · Immobilienentwicklung & Invest in Berlin',
  description:
    'Projektentwicklung, Ankauf und Sanierung von Wohn- und Gewerbeimmobilien in der Metropolregion Berlin – nachhaltig in Architektur und Wertentwicklung.',

  // Sitz laut Impressum / Handelsregister
  address: { street: 'Karl-Marx-Straße 147 a', zip: '12529', city: 'Schönefeld' },
  phone: { display: `+49${NBSP}(0)3379${NBSP}3100622`, tel: '+4933793100622' },
  mobile: { display: `+49${NBSP}(0)179${NBSP}44${NBSP}24${NBSP}524`, tel: '+491794424524' },
  email: 'info@sr-wohnwert.de',
  emailAnkauf: 'ankauf@sr-wohnwert.de',

  hours: [
    { days: 'Montag – Donnerstag', time: '09:00 – 17:30' },
    { days: 'Freitag', time: '09:00 – 17:00' },
    { days: `Samstag, Sonntag${NBSP}&${NBSP}Feiertage`, time: 'geschlossen' },
  ],

  social: { instagram: 'https://www.instagram.com/sr_wohnwert_gmbh/' },

  legal: {
    managingDirector: 'Vural Özkara',
    registerCourt: 'Amtsgericht Cottbus',
    registerNumber: 'HRB 19185 CB',
    // Optional – nur eintragen, wenn vorhanden (wird dann automatisch im Impressum angezeigt):
    vatId: '',
    supervisory: {
      name: 'Landeshauptstadt Potsdam, Fachbereich Ordnung und Sicherheit, Bereich Allgemeine Ordnungsangelegenheiten',
      unit: 'Arbeitsgruppe Gewerbeangelegenheiten',
      street: 'Friedrich-Ebert-Straße 79/81',
      city: '14469 Potsdam',
      permit: 'Gewerbeerlaubnis gemäß § 34c GewO erteilt',
    },
  },

  // Bis zu 8 Einträge, die ersten 5 erscheinen in der Desktop-Navigation
  nav: [
    { label: 'Unternehmen', href: '#unternehmen' },
    { label: 'Leistungen', href: '#leistungen' },
    { label: 'Projekte', href: '#projekte' },
    { label: `Sanieren${NBSP}&${NBSP}Bauen`, href: '#sanieren-bauen' },
    { label: 'Team', href: '#team' },
  ],
  menuExtra: [
    { label: 'Standorte', href: '#standorte' },
    { label: 'Unternehmensgruppe', href: '#gruppe' },
  ],
}

export const intro = {
  eyebrow: 'Das Unternehmen',
  statement:
    'Die S & R Wohnwert GmbH ist eine junge Gesellschaft, die dennoch über eine langjährige Tradition und viel Erfahrung in der Immobilienwirtschaft verfügt.',
  body: 'Tätigkeitsschwerpunkt des vor allem in der Metropolregion Berlin operierenden Unternehmens sind das Projektmanagement, die Errichtung und der Ankauf von Wohn- und Gewerbeimmobilien sowie deren Entwicklung zum Zwecke der Wertsteigerung und langfristigen Vermietung beziehungsweise des Betreibens eigener Immobilien.',
  pillars: [
    {
      title: 'Immobilienentwicklung',
      text: 'Projektmanagement und Errichtung von Wohn- und Gewerbeimmobilien.',
    },
    {
      title: 'Beteiligungen',
      text: 'Joint Ventures und Beteiligungsmodelle gemeinsam mit namhaften Partnerunternehmen.',
    },
    {
      title: 'Invest',
      text: 'Ankauf und Entwicklung zum Zwecke der Wertsteigerung und langfristigen Vermietung.',
    },
  ],
}

export const services = {
  eyebrow: 'Leistungen',
  title: 'Von der Grundstücksidee bis zur Wertentwicklung.',
  lead: 'Unser Beteiligungsmodell ermöglicht schnelles Handeln, zügige Ausführung und hervorragende Qualität.',
  items: [
    {
      nr: '01',
      title: 'Projektentwicklung',
      text: `Grundstücks- und Projektentwicklung für Mehrfamilienhäuser, Stadtquartiere, Apartmentanlagen und Mikroapartments – verlässlich gesteuert vom ersten Konzept bis zur Fertigstellung.`,
      points: ['Grundstücksentwicklung', 'Projektsteuerung', 'Stadtquartiere & Apartmentanlagen'],
      href: '#projekte',
      cta: 'Projekte ansehen',
    },
    {
      nr: '02',
      title: `Beteiligung${NBSP}&${NBSP}Joint Venture`,
      text: 'Wir beteiligen uns gemeinsam mit namhaften Partnerunternehmen an der Erstellung und Umsetzung von Projekten – mit klaren Strukturen und kurzen Entscheidungswegen.',
      points: ['Joint Ventures', 'Beteiligungsmodelle', 'Starke Partnerunternehmen'],
      href: '#gruppe',
      cta: 'Unser Netzwerk',
    },
    {
      nr: '03',
      title: `Ankauf${NBSP}&${NBSP}Invest`,
      text: 'Ankauf von Wohn- und Gewerbeimmobilien sowie deren Entwicklung zum Zwecke der Wertsteigerung und der langfristigen Vermietung beziehungsweise des Betreibens eigener Immobilien.',
      points: ['Ankauf von Grundstücken & Bestand', 'Wertsteigerung', 'Langfristige Vermietung'],
      href: '#kontakt',
      cta: 'Ankauf anfragen',
      topic: 'ankauf',
    },
    {
      nr: '04',
      title: `Sanieren${NBSP}&${NBSP}Bauen`,
      text: 'Schlüsselfertige Herstellung aller Gewerke, energetische Sanierung ganzer Wohnanlagen sowie Ausbauleistungen wie Trockenbau, Brandschutz und Malerarbeiten.',
      points: ['Schlüsselfertiges Bauen', 'Energetische Sanierung', 'Trockenbau, Brandschutz, Malerarbeiten'],
      href: '#sanieren-bauen',
      cta: 'Referenzen ansehen',
    },
  ],
  owner: {
    eyebrow: 'Für Grundstückseigentümer',
    title: 'Sie besitzen ein Grundstück oder eine Immobilie?',
    text: 'Wir ermöglichen Grundstückseigentümern die Realisierung ihres Bauvorhabens – schnell, partnerschaftlich und mit hervorragender Qualität.',
    cta: 'Jetzt informieren',
  },
}

export const statement = {
  text: 'Nachhaltig in Architektur und Wertentwicklung.',
  image: 'lichterfelde',
}

export const projectsIntro = {
  eyebrow: 'Projekte',
  title: 'Aktuelle und geplante Projekte.',
  lead: 'Hier sehen Sie alle aktuellen und geplanten Projekte der S & R Wohnwert – Schwerpunkt Berlin und Umland, ergänzt um Sanierungsprojekte in Nordrhein-Westfalen.',
}

export const atlasIntro = {
  eyebrow: 'Standorte',
  title: 'Unsere Projekte auf der Karte.',
  lead: 'Berlin, Teltow und Nordrhein-Westfalen – wählen Sie einen Standort, um die Details zum Projekt zu sehen.',
  caption: 'Schematische Darstellung. Kartengrundlage: Geoportal Berlin / ALKIS (Datenlizenz Deutschland – Zero).',
}

export const build = {
  eyebrow: `Sanieren${NBSP}&${NBSP}Bauen`,
  title: 'Wir errichten und sanieren – in allen Gewerken.',
  lead: 'Neben eigenen Entwicklungen übernehmen wir Bau- und Sanierungsleistungen: von der schlüsselfertigen Herstellung über energetische Sanierungen bis zum Ausbau.',
  capabilities: [
    'Schlüsselfertige Herstellung (alle Gewerke)',
    'Energetische Sanierung',
    'Trockenbau',
    'Brandschutz',
    'Malerarbeiten',
  ],
}

export const group = {
  eyebrow: 'Unternehmensgruppe',
  title: 'S & R Wohnwert Group – gemeinsam sind wir stark.',
  lead: 'Verbundene Unternehmen aus Planung, Bau und Immobilienwirtschaft.',
  clusters: [
    {
      title: 'Planung & Architektur',
      companies: [
        { name: 'Patzschke Planungsgesellschaft mbH', url: 'http://www.patzschke-architektur.de/' },
        { name: 'Patzschke Schwebel Planungsgesellschaft mbH', url: 'http://www.patzschke-schwebel.de/' },
        { name: 'Patzschke & Josenhans Architectural Visualization', url: 'http://www.edelviz.de/' },
        { name: 'pss generalplanung gmbh', url: 'http://www.pss-gp.de/' },
      ],
    },
    {
      title: 'Bau & Ausführung',
      companies: [
        { name: 'Concern Bau & invest ag' },
        { name: 'Juve bau gmbh' },
        { name: 'SBG general gmbh' },
        { name: 'PSN Designbau GmbH', url: 'http://www.psn.berlin/' },
      ],
    },
    {
      title: 'Immobilien & Invest',
      companies: [{ name: 'DVC Immobilien GmbH' }, { name: 'informica-real estate ag' }],
    },
  ],
}

export const team = {
  eyebrow: 'Team',
  title: 'Expertise, Innovation und Engagement – Wegweiser für die Zukunft Ihrer Projekte.',
  lead: 'Unser Team besteht aus Experten in Grundstücks- und Projektentwicklung, Projektsteuerung, Sanierung und Bau.',
  subtitle: 'Experten für Beteiligungsgesellschaft, Immobilien und Projektentwicklung',
  values: [
    {
      title: 'Expertise',
      text: 'Unser Team vereint umfassende Expertise in den Bereichen Beteiligungsmodelle, Immobilien und Projektentwicklung. Mit einer tiefen Marktkenntnis und einer klaren strategischen Ausrichtung steht das Team für herausragende Ergebnisse.',
    },
    {
      title: 'Innovation',
      text: 'Durch kontinuierliche Weiterbildung und einen offenen Austausch von Wissen und Ideen gewährleisten wir, dass alle Projekte auf dem neuesten Stand der Technik und Markttrends basieren.',
    },
    {
      title: 'Engagement',
      text: 'Durch enge Zusammenarbeit mit Partnern entwickeln wir maßgeschneiderte Lösungen, die den individuellen Bedürfnissen und Zielen entsprechen – mit klarem Fokus auf langfristige Werte.',
    },
  ],
  disciplines: ['Grundstücksentwicklung', 'Projektentwicklung', 'Projektsteuerung', 'Sanierung', 'Bau'],
  note: 'Die Expertise erstreckt sich über die gesamte Wertschöpfungskette der Immobilien- und Projektentwicklung.',
}

export const contact = {
  eyebrow: 'Kontakt',
  title: 'Sie haben Fragen?',
  titleAccent: 'Wir helfen Ihnen gerne.',
  topics: [
    { value: 'projekt', label: 'Projektanfrage' },
    { value: 'ankauf', label: 'Ankauf / Grundstück' },
    { value: 'beteiligung', label: 'Beteiligung / Joint Venture' },
    { value: 'bauen', label: `Sanieren${NBSP}&${NBSP}Bauen` },
    { value: 'sonstiges', label: 'Sonstiges' },
  ],
}

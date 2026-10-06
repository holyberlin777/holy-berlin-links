import { homePage } from './home.js'
import { impressumPage, datenschutzPage, notFoundPage } from './legal.js'

const pages = {
  home: homePage,
  impressum: impressumPage,
  datenschutz: datenschutzPage,
  notfound: notFoundPage,
}

/** Liefert das komplette HTML einer Seite anhand ihres Namens. */
export function renderPage(name) {
  const render = pages[name]
  if (!render) throw new Error(`Unbekannte Seite: ${name}`)
  return render()
}

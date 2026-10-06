import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

/**
 * HTML-Templates
 * Die Seiten werden aus den Daten (src/data) und Templates (src/templates) zu
 * statischem HTML gerendert – im Dev-Server bei jeder Anfrage, im Build einmalig.
 * Dadurch ist der komplette Inhalt ohne JavaScript für Suchmaschinen sichtbar.
 */
function srTemplates() {
  let server = null
  let root = process.cwd()

  async function loadRenderer() {
    if (server) {
      // Dev: Module bei Änderungen automatisch neu laden
      const mod = await server.ssrLoadModule('/src/templates/render.js')
      return mod.renderPage
    }
    const mod = await import(pathToFileURL(resolve(root, 'src/templates/render.js')).href)
    return mod.renderPage
  }

  return {
    name: 'sr-templates',
    configResolved(config) {
      root = config.root
    },
    configureServer(s) {
      server = s
    },
    transformIndexHtml: {
      order: 'pre',
      async handler(html) {
        const match = html.match(/<!--@page:([\w-]+)-->/)
        if (!match) return html
        const renderPage = await loadRenderer()
        return renderPage(match[1])
      },
    },
    handleHotUpdate({ file, server: s }) {
      if (file.includes('/src/templates/') || file.includes('/src/data/')) {
        s.moduleGraph.invalidateAll()
        s.ws.send({ type: 'full-reload' })
        return []
      }
    },
  }
}

export default defineConfig({
  plugins: [srTemplates()],
  server: { host: '127.0.0.1', port: 5180, strictPort: true },
  preview: { host: '127.0.0.1', port: 5181, strictPort: true },
  build: {
    target: 'es2022',
    cssTarget: 'safari15',
    assetsInlineLimit: 0,
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        impressum: resolve(import.meta.dirname, 'impressum/index.html'),
        datenschutz: resolve(import.meta.dirname, 'datenschutz/index.html'),
        notfound: resolve(import.meta.dirname, '404.html'),
      },
    },
  },
})

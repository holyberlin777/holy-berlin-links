# HOLY BERLIN – Link-in-Bio Seite

Eine schnelle, moderne „Link in Bio"-Seite für **HOLY BERLIN** – gebaut mit React, Vite, TypeScript und Tailwind CSS. Alle Inhalte (Name, Beschreibung, Logo, Live-Status und Links) werden aus **einer einzigen Datei** gesteuert: [`src/config/siteConfig.ts`](src/config/siteConfig.ts). Du musst dafür keinen React-Code verstehen oder anfassen.

Diese Anleitung ist für Einsteiger geschrieben – Schritt für Schritt, ohne Vorwissen vorauszusetzen.

---

## Inhaltsverzeichnis

1. [Projekt installieren](#1-projekt-installieren)
2. [Lokal starten](#2-lokal-starten)
3. [Name ändern](#3-name-ändern)
4. [Beschreibung ändern](#4-beschreibung-ändern)
5. [Logo ersetzen](#5-logo-ersetzen)
6. [Links finden](#6-links-finden)
7. [Neuen Link hinzufügen](#7-neuen-link-hinzufügen)
8. [Link löschen](#8-link-löschen)
9. [Live-Status ändern](#9-live-status-ändern)
10. [Farben ändern](#10-farben-ändern)
11. [Projekt bauen (Production Build)](#11-projekt-bauen-production-build)
12. [Veröffentlichen (Deployment)](#12-veröffentlichen-deployment)
13. [Verfügbare Icons](#13-verfügbare-icons)
14. [Projektstruktur](#14-projektstruktur)
15. [Fehlerbehebung](#15-fehlerbehebung)

---

## 1. Projekt installieren

**Voraussetzung:** [Node.js](https://nodejs.org) Version **20.19 oder neuer** (empfohlen: die aktuelle LTS-Version). Prüfen kannst du das im Terminal mit:

```bash
node --version
```

Wenn Node.js installiert ist, öffne das Projekt im Terminal und installiere die Abhängigkeiten einmalig:

```bash
npm install
```

Das lädt alle benötigten Pakete (React, Vite, Tailwind, Icons, …) in den Ordner `node_modules` herunter.

---

## 2. Lokal starten

```bash
npm run dev
```

Danach zeigt dir das Terminal eine Adresse an, meistens:

```
http://localhost:5173
```

Öffne diese Adresse in deinem Browser. Änderungen an Dateien (z. B. in `siteConfig.ts`) erscheinen sofort im Browser, ohne dass du etwas neu starten musst.

Zum Beenden: `Strg + C` (bzw. `Cmd + C` auf dem Mac) im Terminal drücken.

---

## 3. Name ändern

Öffne [`src/config/siteConfig.ts`](src/config/siteConfig.ts) und ändere das Feld `name`:

```ts
export const siteConfig: SiteConfig = {
  name: "HOLY BERLIN", // ← hier deinen Namen eintragen
  ...
```

Der Name erscheint automatisch als Überschrift, im Footer (`© 2026 DEIN NAME`) und im Seitentitel.

---

## 4. Beschreibung ändern

Direkt unter `name` findest du `description`:

```ts
description: "Fußball, Gaming & Community ⚽🎮",
```

Einfach den Text ersetzen – Emojis funktionieren problemlos.

---

## 5. Logo ersetzen

1. Lege deine Bilddatei in den Ordner [`public/`](public) ab, z. B. `public/logo.png`.
2. Trage den Pfad in `siteConfig.ts` ein:

```ts
logo: "/logo.png",
```

**Wichtig:** Der Pfad beginnt immer mit `/` und entspricht dem Dateinamen in `public/`.

Falls die Datei fehlt oder nicht geladen werden kann, stürzt die Seite **nicht ab** – stattdessen erscheint automatisch ein Platzhalter mit dem ersten Buchstaben deines Namens.

---

## 6. Links finden

Alle Links liegen im `links`-Array derselben Datei, [`src/config/siteConfig.ts`](src/config/siteConfig.ts):

```ts
links: [
  {
    title: "Twitch",
    description: "Live bei unseren Streams dabei sein",
    url: "https://twitch.tv/holyberlin",
    icon: "twitch",
  },
  // weitere Links …
],
```

- `title` – Name des Buttons
- `description` – optionaler Zusatztext (kann auch weggelassen werden)
- `url` – das Linkziel (öffnet automatisch in einem neuen Tab)
- `icon` – welches Icon angezeigt wird (Liste siehe [Kapitel 13](#13-verfügbare-icons))

---

## 7. Neuen Link hinzufügen

Füge dem `links`-Array einfach einen neuen Eintrag hinzu – **ein neuer Button erscheint automatisch** auf der Website, ganz ohne React-Code:

```ts
links: [
  // ...bestehende Links,
  {
    title: "Discord",
    description: "Unser Community Server",
    url: "https://discord.gg/MEINLINK",
    icon: "discord",
  },
],
```

Achte auf das Komma nach dem vorherigen Eintrag.

---

## 8. Link löschen

Entferne einfach das komplette `{ ... }`-Objekt des gewünschten Links aus dem `links`-Array (inklusive der umgebenden geschweiften Klammern und dem Komma). Der Button verschwindet sofort von der Seite.

Wenn das Array leer ist (`links: []`), zeigt die Seite automatisch einen freundlichen Hinweis statt eines leeren Bereichs an.

---

## 9. Live-Status ändern

```ts
isLive: true,   // zeigt "🔴 LIVE AUF TWITCH" gut sichtbar unter dem Namen an
isLive: false,  // kein Live-Hinweis
```

Den angezeigten Text und das Linkziel kannst du über `liveLabel` und `liveUrl` anpassen:

```ts
isLive: true,
liveLabel: "🔴 LIVE AUF TWITCH",
liveUrl: "https://twitch.tv/holyberlin",
```

`liveUrl` ist optional – ohne Angabe wird einfach nur das Badge angezeigt, ohne Link.

---

## 10. Farben ändern

Alle Markenfarben sind zentral in [`src/index.css`](src/index.css) im `@theme`-Block definiert:

```css
@theme {
  --color-brand-bg: #08090b;        /* Haupt-Hintergrund (fast schwarz) */
  --color-brand-surface: #141519;   /* Karten-Hintergrund */
  --color-brand-orange: #ff6a1a;    /* Akzentfarbe Orange */
  --color-brand-blue: #3dc9ff;      /* Akzentfarbe Hellblau */
  --color-brand-green: #34e3a1;     /* Akzentfarbe Grün */
  ...
}
```

Ändere einfach die Hex-Werte – die neuen Farben werden automatisch überall dort verwendet, wo die Klassen `bg-brand-orange`, `text-brand-blue` usw. genutzt werden (z. B. Hover-Effekte, Live-Badge, Hintergrund-Glow).

> Dieses Projekt nutzt **Tailwind CSS v4**. Farben werden direkt in CSS über `@theme` definiert – es gibt keine separate `tailwind.config.js`-Datei.

---

## 11. Projekt bauen (Production Build)

```bash
npm run build
```

Dieser Befehl prüft zuerst alle TypeScript-Typen (`tsc -b`) und erstellt danach eine optimierte, produktionsreife Version im Ordner `dist/`. Schlägt die Typprüfung fehl, bricht der Build ab – so landen keine Fehler versehentlich online.

Zum lokalen Testen des fertigen Builds (wie er später online aussieht):

```bash
npm run preview
```

### Weitere nützliche Befehle

| Befehl              | Zweck                                             |
| ------------------- | -------------------------------------------------- |
| `npm run dev`       | Lokalen Entwicklungsserver starten                 |
| `npm run build`     | Typprüfung + Production-Build nach `dist/`         |
| `npm run preview`   | Production-Build lokal testen                      |
| `npm run lint`      | Code auf Probleme prüfen (ESLint)                  |
| `npm run typecheck` | Nur die TypeScript-Typen prüfen, ohne zu bauen     |

---

## 12. Veröffentlichen (Deployment)

Die Seite ist eine rein statische Website (`dist/`-Ordner) – sie läuft auf jedem Anbieter, der statische Dateien ausliefern kann.

### Vercel (empfohlen)

1. Lade das Projekt in ein GitHub-Repository hoch (oder nutze `vercel` direkt per CLI).
2. Gehe auf [vercel.com](https://vercel.com) → **Add New Project** → dein Repository auswählen.
3. Vercel erkennt Vite automatisch:
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Auf **Deploy** klicken – fertig. Du erhältst eine Live-URL, die du z. B. in deine TikTok-Bio eintragen kannst.

Alternativ per CLI:

```bash
npm install -g vercel
vercel
```

### Netlify

1. Projekt auf GitHub hochladen.
2. Auf [netlify.com](https://netlify.com) → **Add new site** → **Import an existing project**.
3. Einstellungen:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. **Deploy site** klicken.

### GitHub Pages

GitHub Pages liefert Projekt-Seiten standardmäßig unter einem Unterpfad aus (`https://DEIN-NAME.github.io/REPO-NAME/`). Damit alle Pfade korrekt funktionieren, musst du das einmal in [`vite.config.ts`](vite.config.ts) eintragen:

```ts
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/REPO-NAME/", // ← Namen deines GitHub-Repos eintragen
});
```

Danach:

```bash
npm run build
```

Und den Inhalt von `dist/` auf den `gh-pages`-Branch veröffentlichen (z. B. mit dem Paket [`gh-pages`](https://www.npmjs.com/package/gh-pages) oder über GitHub Actions). Nutzt du eine eigene Domain mit GitHub Pages, kannst du `base: "/"` belassen.

---

## 13. Verfügbare Icons

Trage einen dieser Werte beim Feld `icon` ein:

`twitch` · `tiktok` · `youtube` · `instagram` · `whatsapp` · `discord` · `x` (bzw. `twitter`) · `facebook` · `telegram` · `snapchat` · `threads` · `spotify` · `kick`

Ein unbekannter oder leerer Icon-Name führt **nicht** zu einem Fehler – es wird automatisch ein neutrales Link-Icon angezeigt.

**Neue Plattform ergänzen:** Öffne [`src/utils/icons.tsx`](src/utils/icons.tsx), importiere das passende Icon aus [`react-icons`](https://react-icons.github.io/react-icons/) (z. B. aus `react-icons/fa6` oder `react-icons/si`) und füge einen weiteren `case` in der `switch`-Anweisung hinzu.

---

## 14. Projektstruktur

```
├── public/                  Statische Dateien (Logo, Favicon, Social-Preview-Bild)
│   ├── favicon.svg
│   ├── logo.svg
│   ├── og-image.svg
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── Background.tsx   Dekorativer Hintergrund (Grid + Glow)
│   │   ├── Footer.tsx       Dezenter Footer
│   │   ├── Header.tsx       Logo, Name, Live-Badge, Beschreibung
│   │   ├── LinkCard.tsx     Ein einzelner Link-Button
│   │   ├── LiveBadge.tsx    LIVE-Hinweis
│   │   ├── ShareButton.tsx  Teilen-Button (Web Share API / Zwischenablage)
│   │   └── SocialIcons.tsx  Kompakte Icon-Reihe unter der Beschreibung
│   ├── config/
│   │   └── siteConfig.ts    ★ Zentrale Konfiguration – hier änderst du Inhalte
│   ├── utils/
│   │   ├── assets.ts        Löst Logo-Pfade deploy-sicher auf
│   │   └── icons.tsx        Ordnet icon-Namen den Icon-Komponenten zu
│   ├── App.tsx               Setzt die Komponenten zusammen
│   ├── index.css             Tailwind-Import, Farben, Animationen
│   └── main.tsx               Einstiegspunkt der React-App
├── index.html                 HTML-Grundgerüst, SEO-/OpenGraph-Tags
└── vite.config.ts              Build-Konfiguration
```

---

## 15. Fehlerbehebung

**Die Seite zeigt nach `npm run dev` eine leere Seite / Fehler im Terminal**
→ Lösche `node_modules` und installiere neu: `rm -rf node_modules package-lock.json && npm install`

**Mein Logo wird nicht angezeigt**
→ Prüfe, ob der Dateiname in `siteConfig.ts` (Feld `logo`) exakt mit dem Dateinamen in `public/` übereinstimmt (Groß-/Kleinschreibung zählt).

**`npm run build` schlägt fehl**
→ Die Fehlermeldung zeigt meist Datei und Zeile mit dem Problem. Häufigste Ursache: ein fehlendes Komma oder Anführungszeichen in `siteConfig.ts`.

**Nach dem Deployment funktionieren Logo/Favicon nicht (nur bei GitHub Pages)**
→ `base` in `vite.config.ts` auf deinen Repo-Namen setzen, siehe [Kapitel 12](#12-veröffentlichen-deployment).

---

Viel Erfolg mit HOLY BERLIN! ⚽🎮

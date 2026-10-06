# S & R Wohnwert – neue Website

Statische, schnelle Website für die **S & R Wohnwert GmbH** (Immobilienentwicklung, Beteiligungen & Invest in der Metropolregion Berlin).
Aufgebaut mit Vite, GSAP (Animationen) und Lenis (weiches Scrollen). Keine Cookies, kein Tracking, keine externen Dienste: Schriften, Bilder und Karte liegen alle auf dem eigenen Server.

## Schnellstart

Node.js liegt in diesem Rechner bereits als portable Version unter `../.node-runtime`.

```bash
cd "/Users/Shared/claude link tree/sr-wohnwert"
export PATH="/Users/Shared/claude link tree/.node-runtime/node/bin:$PATH"

npm run dev        # Entwicklungsserver: http://localhost:5180
npm run build      # fertige Website nach ./dist schreiben
npm run preview    # gebaute Website lokal ansehen: http://localhost:5181
npm run assets     # Bilder, Karte und Favicons neu erzeugen (siehe unten)
```

## Inhalte ändern

Alle Texte und Daten liegen zentral in `src/data/` – dort ändern, dann `npm run build`.

| Datei | Inhalt |
| --- | --- |
| `src/data/site.js` | Firmendaten, Kontakt, Geschäftszeiten, Navigation, alle Texte der Abschnitte (Intro, Leistungen, Gruppe, Team, Kontakt) |
| `src/data/projects.js` | Die Projekte (Slider, Karte, Detailansicht) |
| `src/data/references.js` | „Sanieren & Bauen“ (gestapelte Karten) |

**Neues Projekt hinzufügen:** in `projects.js` einen Eintrag kopieren und anpassen (`id`, `name`, `place`, `summary`, `facts`, `geo` = Breiten-/Längengrad für die Karte). Das Bild unter `assets-src/` ablegen, in `scripts/build-images.mjs` eine Zeile ergänzen und `npm run assets` ausführen.

**Impressum / Datenschutz:** `src/templates/legal.js`. Eine USt-IdNr. trägt man in `site.js` unter `legal.vatId` ein, sie erscheint dann automatisch im Impressum.

## Bilder

Die Original-Bilder liegen unter `assets-src/` (von der bisherigen Website übernommen). `npm run assets` erzeugt daraus AVIF- und WebP-Varianten in mehreren Größen (`public/img/`) und zerlegt Collagen in Einzelbilder. Je größer und schärfer die Originale, desto besser das Ergebnis.

## Kontaktformular

Das Formular sendet per `fetch` an `/api/contact.php` (liegt in `public/api/`). Einstellungen (Empfänger, Absender, Limits) stehen als Konstanten am Anfang der Datei.

- Funktioniert auf jedem Hosting mit PHP ab 7.4 und aktivierter `mail()`-Funktion.
- Schutz vor Spam: unsichtbares Feld, Zeitprüfung, höchstens 5 Anfragen pro Gerät und Stunde, Herkunftsprüfung.
- Ohne JavaScript funktioniert es ebenfalls (Weiterleitung auf `/?sent=1`). Schlägt der Versand fehl, bietet die Seite einen Link zum E-Mail-Programm an.
- **Nach dem Upload einmal eine Testnachricht senden.** Ob `mail()` Nachrichten zustellt, hängt vom Hoster ab. Falls nicht: Absenderadresse `MAIL_FROM` auf ein existierendes Postfach der Domain setzen oder beim Hoster nachfragen.

## Veröffentlichen (Ersatz der WordPress-Seite)

1. `npm run build` ausführen. Der Ordner `dist/` enthält die komplette Website (inklusive `.htaccess` und `api/contact.php`).
2. **Sicherung der alten Seite anlegen** (Dateien + Datenbank), bevor etwas überschrieben wird.
3. Inhalt von `dist/` per FTP in das Hauptverzeichnis der Domain hochladen. Die WordPress-Dateien (`wp-*`, `index.php`, alte `.htaccess`) dürfen erst entfernt werden, wenn die neue Seite geprüft ist.
4. Die mitgelieferte `.htaccess` leitet automatisch auf **https** und auf **ohne www** um und leitet die alten Adressen (`/projekte/`, `/sanieren-bauen/`, `/team/`, `/kontakt/`) auf die neuen Abschnitte weiter. Sie setzt außerdem Zwischenspeicher- und Sicherheits-Header.
5. In der Google Search Console die neue `sitemap.xml` einreichen.

Läuft die Domain nicht auf Apache, müssen die Weiterleitungen und Header in der jeweiligen Server-Konfiguration nachgebaut werden. Die Website selbst läuft auf jedem Webserver, der statische Dateien ausliefert.

## Vor dem Livegang prüfen

- [ ] **Kontaktdaten bestätigen.** Die alte Seite nannte widersprüchliche Angaben: Startseite/Impressum = Schönefeld, Tel. 03379 3100622, info@ · Kontaktseite = Potsdam, Mobil 0179 44 24 524, ankauf@. Verwendet wurden Schönefeld als Sitz sowie Mobilnummer und `ankauf@` für „Ankauf & Grundstücke“. Die Potsdamer Adresse wurde nicht übernommen.
- [ ] **Rechtstexte prüfen lassen.** Die alte Datenschutzerklärung (Stand 2022) nannte „S&R Wohnwert UG“ in Potsdam und Dienste, die die neue Seite nicht mehr nutzt (Google Analytics, Fonts, Maps, mehrere soziale Netzwerke). Sie wurde passend zur neuen Seite neu formuliert. Das Impressum verweist jetzt auf § 5 DDG (statt TMG) und enthält Telefon und E-Mail. Name des Hosting-Anbieters und ggf. USt-IdNr. ergänzen; Gesamtprüfung durch Rechtsanwalt oder Datenschutzbeauftragten empfohlen.
- [ ] **Zahlen abstimmen.** Porta Westfalica: 56 Wohnungen (Projektseite) vs. 58 Wohneinheiten (Sanierungsseite); Erndtebrück: 60 vs. 40. Die neue Seite nutzt die Zahlen der Projektseite. Die Kennzahl „440+ Einheiten“ ist aus den Projektdaten berechnet.
- [ ] **Wassergärten Wendenschloss.** Die alte Seite nennt „Fertigstellung 2025“, öffentliche Verkaufsunterlagen nennen Ende 2023 bis 1. Quartal 2024. Bitte das richtige Jahr bestätigen. Öffentlich bekannte Eckdaten (Wohnfläche ca. 132–150 m², KfW-55-Standard, Luft-Wärmepumpe, eigener Bootssteg) wurden nicht übernommen, können aber nach Freigabe ergänzt werden.
- [ ] **Bildmaterial.** Wassergärten (480 × 640 px) und Kelchstraße (844 × 475 px) sind niedrig aufgelöst – bessere Originale verbessern die Wirkung deutlich. Das Rendering der Kelchstraße enthält den Schriftzug „The Monteure Dream“. Die Kennzeichnung der Bilder als „Visualisierung“ bzw. „Foto“ ist eine Einschätzung und sollte geprüft werden.
- [ ] **Team.** Die alte Seite nannte keine Personen. Angezeigt wird nur die Geschäftsführung laut Impressum; Fotos und Kurzprofile können ergänzt werden.
- [ ] **Logo.** Das Logo wurde aus der 500-px-PNG-Datei der alten Seite vektorisiert (`public/brand/`). Liegt das Original als Vektordatei (SVG/AI/PDF) vor, sollte es eingesetzt werden.
- [ ] **Unternehmensgruppe.** Nur fünf Unternehmen haben eine eigene Website verlinkt; die übrigen verwiesen auf der alten Seite fälschlich auf patzschke-architektur.de und sind jetzt ohne Link. Die Gruppierung (Planung / Bau / Immobilien) ist aus den Firmennamen abgeleitet.
- [ ] Newsletter wurde nicht übernommen (benötigt einen Dienst mit Double-Opt-in). Der tote Facebook-Link wurde entfernt.

## Technik

- **Performance:** ca. 60 KB JavaScript und 12 KB CSS (gzip), Bilder als AVIF/WebP mit `srcset`, Schriften lokal und vorgeladen, kein Layout-Springen.
- **Barrierefreiheit:** Skip-Link, Tastaturbedienung (Menü, Slider, Karte, Detailansicht mit Fokusführung), `prefers-reduced-motion` schaltet alle Animationen und das weiche Scrollen ab.
- **Browser:** aktuelle Versionen von Chrome, Edge, Firefox, Safari (Desktop und iOS). Neuere Funktionen (z. B. Seitenübergänge) sind reine Zusätze.
- **Ordnerstruktur:** `src/templates` (HTML-Vorlagen) · `src/styles` (CSS) · `src/js` (Interaktionen) · `src/data` (Inhalte) · `scripts` (Bild-/Kartenerzeugung) · `public` (Dateien, die unverändert ausgeliefert werden).

## Lizenzen

- Schriften: *Instrument Serif* und *Inter*, SIL Open Font License 1.1 (siehe `public/fonts/`), lokal eingebunden.
- Animationen: [GSAP](https://gsap.com/standard-license) (Standard-Lizenz, kostenlos auch für kommerzielle Nutzung), Scrollen: [Lenis](https://github.com/darkroomengineering/lenis) (MIT).
- Kartengrundlage: Geoportal Berlin / ALKIS Berlin Bezirke, Datenlizenz Deutschland – Zero – Version 2.0.

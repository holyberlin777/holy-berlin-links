/**
 * Zeigt live an, ob das Büro gerade erreichbar ist (Zeitzone Berlin, inkl. Feiertage).
 * Geschäftszeiten: Mo–Do 09:00–17:30, Fr 09:00–17:00.
 */
import { $ } from './env.js'

const HOURS = { 1: [540, 1050], 2: [540, 1050], 3: [540, 1050], 4: [540, 1050], 5: [540, 1020] } // Minuten ab Mitternacht
const WEEKDAYS = { Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6, Sun: 7 }

/** Ostersonntag (Gauß'sche Osterformel) */
function easter(year) {
  const a = year % 19
  const b = Math.floor(year / 100)
  const c = year % 100
  const d = Math.floor(b / 4)
  const e = b % 4
  const f = Math.floor((b + 8) / 25)
  const g = Math.floor((b - f + 1) / 3)
  const h = (19 * a + b - d - g + 15) % 30
  const i = Math.floor(c / 4)
  const k = c % 4
  const l = (32 + 2 * e + 2 * i - h - k) % 7
  const m = Math.floor((a + 11 * h + 22 * l) / 451)
  const month = Math.floor((h + l - 7 * m + 114) / 31)
  const day = ((h + l - 7 * m + 114) % 31) + 1
  return new Date(Date.UTC(year, month - 1, day))
}

/** Gesetzliche Feiertage in Berlin als "MM-DD" */
function holidays(year) {
  const key = (date) => `${String(date.getUTCMonth() + 1).padStart(2, '0')}-${String(date.getUTCDate()).padStart(2, '0')}`
  const base = easter(year)
  const shift = (days) => key(new Date(base.getTime() + days * 86400000))
  return new Set(['01-01', '03-08', '05-01', '10-03', '12-25', '12-26', shift(-2), shift(1), shift(39), shift(50)])
}

function berlinNow(now = new Date()) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Berlin',
    weekday: 'short',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  })
    .formatToParts(now)
    .reduce((acc, part) => ({ ...acc, [part.type]: part.value }), {})
  return {
    weekday: WEEKDAYS[parts.weekday],
    year: Number(parts.year),
    monthDay: `${parts.month}-${parts.day}`,
    minutes: Number(parts.hour) * 60 + Number(parts.minute),
  }
}

export function isOpen(now = new Date()) {
  const t = berlinNow(now)
  const range = HOURS[t.weekday]
  if (!range || holidays(t.year).has(t.monthDay)) return false
  return t.minutes >= range[0] && t.minutes < range[1]
}

export function initHours() {
  const badge = $('[data-hours]')
  if (!badge) return
  const text = $('[data-hours-text]', badge)
  const update = () => {
    const open = isOpen()
    badge.classList.toggle('is-closed', !open)
    text.textContent = open ? 'Jetzt erreichbar' : 'Derzeit geschlossen'
    badge.hidden = false
  }
  update()
  setInterval(update, 60000)
}

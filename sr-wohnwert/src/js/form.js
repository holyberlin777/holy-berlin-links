/**
 * Kontaktformular: Vorbelegung, Validierung, Versand per fetch (mit Mailto-Ausweichlösung).
 */
import { gsap } from 'gsap'
import { $, $$, reduceMotion } from './env.js'
import { scrollToTarget } from './scroll.js'

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const FALLBACK_MAIL = 'info@sr-wohnwert.de'

export function initForm() {
  const form = $('[data-form]')
  if (!form) return
  const status = $('[data-form-status]', form)
  const success = $('[data-form-success]')
  const message = form.elements.namedItem('message')
  form.elements.namedItem('ts').value = String(Date.now())

  const setStatus = (text, isError = false) => {
    status.replaceChildren()
    status.classList.toggle('is-error', isError)
    if (text) status.append(text)
  }

  /* ----- Vorbelegung durch Links (z. B. "Projekt anfragen") ---------------- */
  document.addEventListener('click', (event) => {
    const link = event.target.closest('[data-prefill-topic]')
    if (!link) return
    const radio = form.querySelector(`input[name="topic"][value="${link.dataset.prefillTopic}"]`)
    if (radio) radio.checked = true
    const text = link.dataset.prefillText
    if (text && (!message.value.trim() || message.dataset.prefilled === 'true')) {
      message.value = text
      message.dataset.prefilled = 'true'
    }
  })
  message.addEventListener('input', () => (message.dataset.prefilled = 'false'))

  /* ----- Validierung -------------------------------------------------------- */
  const wrapper = (input) => input.closest('.field') || input.closest('.check')
  const rules = [
    ['name', (v) => v.trim().length >= 2],
    ['email', (v) => EMAIL.test(v.trim())],
    ['message', (v) => v.trim().length >= 10],
  ]
  const validate = () => {
    let firstInvalid = null
    rules.forEach(([name, isValid]) => {
      const input = form.elements.namedItem(name)
      const ok = isValid(input.value)
      wrapper(input).classList.toggle('is-invalid', !ok)
      if (!ok && !firstInvalid) firstInvalid = input
    })
    const consent = form.elements.namedItem('consent')
    wrapper(consent).classList.toggle('is-invalid', !consent.checked)
    if (!consent.checked && !firstInvalid) firstInvalid = consent
    return firstInvalid
  }
  form.addEventListener('input', (event) => wrapper(event.target)?.classList.remove('is-invalid'))
  form.addEventListener('change', (event) => wrapper(event.target)?.classList.remove('is-invalid'))

  /* ----- Versand ------------------------------------------------------------ */
  const mailtoHref = () => {
    const topic = form.querySelector('input[name="topic"]:checked')?.nextElementSibling?.textContent ?? 'Anfrage'
    const body = `${form.elements.namedItem('message').value}\n\n${form.elements.namedItem('name').value}\n${form.elements.namedItem('phone').value}`
    return `mailto:${FALLBACK_MAIL}?subject=${encodeURIComponent(`Anfrage über die Website: ${topic}`)}&body=${encodeURIComponent(body)}`
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault()
    setStatus('')
    const invalid = validate()
    if (invalid) {
      setStatus('Bitte prüfen Sie die markierten Felder.', true)
      invalid.focus()
      return
    }
    form.classList.add('is-sending')
    setStatus('Wird gesendet …')
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      })
      const data = await response.json().catch(() => ({}))
      if (!response.ok || !data.ok) throw new Error(data.error || `HTTP ${response.status}`)
      setStatus('')
      showSuccess()
    } catch (error) {
      console.warn('[form]', error)
      status.replaceChildren(
        'Das Senden hat leider nicht geklappt. Bitte versuchen Sie es erneut oder schreiben Sie uns direkt: '
      )
      const link = document.createElement('a')
      link.href = mailtoHref()
      link.textContent = 'E-Mail-Programm öffnen'
      link.style.textDecoration = 'underline'
      status.append(link)
      status.classList.add('is-error')
    } finally {
      form.classList.remove('is-sending')
    }
  })

  /* ----- Erfolgsmeldung ----------------------------------------------------- */
  function showSuccess(immediate = false) {
    form.hidden = true
    success.hidden = false
    if (immediate || reduceMotion) return
    const icon = $('.form__success-icon', success)
    gsap
      .timeline({ defaults: { ease: 'expo.out' } })
      .from(icon, { scale: 0, rotate: -40, duration: 1 })
      .from($$('h3, p', success), { y: 24, opacity: 0, duration: 0.9, stagger: 0.1 }, 0.15)
  }

  // Rückkehr nach Versand ohne JavaScript (PHP leitet auf ?sent=1 um)
  if (new URLSearchParams(location.search).get('sent') === '1') {
    showSuccess(true)
    requestAnimationFrame(() => scrollToTarget('#kontakt', { immediate: true }))
  }

  if (import.meta.env.DEV) window.__showFormSuccess = () => showSuccess()
}

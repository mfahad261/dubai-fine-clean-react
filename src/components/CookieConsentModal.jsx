/**
 * CookieConsentModal — the "Manage Preferences" dialog.
 * ---------------------------------------------------------------------------
 * WHERE IT APPEARS: opened from the banner's "Manage Preferences" link, or
 *                   from the "Cookie settings" link in the footer at any
 *                   time afterwards.
 * WHAT IT DOES:     Per-category toggles — Necessary is locked on — with
 *                   Save Preferences / Accept All to confirm. Traps focus,
 *                   closes on Escape or a scrim click, and restores the
 *                   previously focused element on close.
 */
import { useEffect, useRef, useState } from 'react'
import { useCookieConsent } from '../context/CookieConsentContext.jsx'
import Icon from './Icon.jsx'
import Button from './Button.jsx'
import './CookieConsent.css'

const CATEGORIES = [
  { key: 'analytics', name: 'Analytics', d: "Helps us see which pages get used, so we can fix what's broken and improve the rest." },
  { key: 'marketing', name: 'Marketing', d: 'Lets us show relevant offers and measure whether our ads are actually working.' },
]

export default function CookieConsentModal() {
  const { consent, prefsOpen, closePreferences, acceptAll, savePreferences } = useCookieConsent()
  const [draft, setDraft] = useState({ analytics: false, marketing: false })
  const modalRef = useRef(null)
  const lastFocused = useRef(null)

  // reseed the toggles from whatever is currently saved every time the modal
  // opens, so a stale draft from an earlier visit never lingers
  useEffect(() => {
    if (prefsOpen) setDraft({ analytics: !!consent?.analytics, marketing: !!consent?.marketing })
  }, [prefsOpen, consent])

  // focus trap + Escape-to-close + body scroll lock while open
  useEffect(() => {
    if (!prefsOpen) return
    lastFocused.current = document.activeElement
    const modal = modalRef.current
    const focusables = () => Array.from(
      modal.querySelectorAll('button:not(:disabled), [href], input:not(:disabled), [tabindex]:not([tabindex="-1"])'),
    )
    focusables()[0]?.focus()

    const onKeyDown = (e) => {
      if (e.key === 'Escape') { closePreferences(); return }
      if (e.key !== 'Tab') return
      const els = focusables()
      if (!els.length) return
      const first = els[0]
      const last = els[els.length - 1]
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', onKeyDown)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = prevOverflow
      lastFocused.current?.focus?.()
    }
  }, [prefsOpen, closePreferences])

  if (!prefsOpen) return null

  const toggle = (key) => setDraft((d) => ({ ...d, [key]: !d[key] }))

  return (
    <div
      className="cookieScrim"
      onMouseDown={(e) => { if (e.target === e.currentTarget) closePreferences() }}
    >
      <div className="cookieModal" role="dialog" aria-modal="true" aria-labelledby="cookiePrefsTitle" ref={modalRef}>
        <button type="button" className="cClose" onClick={closePreferences} aria-label="Close">
          <Icon name="close" size={16} />
        </button>

        <h2 id="cookiePrefsTitle">Cookie preferences</h2>
        <p>Necessary cookies keep the site working and are always on. Everything else is your choice.</p>

        <div className="cPref">
          <div>
            <h3>Necessary</h3>
            <p>Required for core features like page navigation and the contact form. Can't be switched off.</p>
          </div>
          <button
            type="button"
            className="cSwitch on"
            role="switch"
            aria-checked="true"
            aria-label="Necessary cookies, always on"
            disabled
          />
        </div>

        {CATEGORIES.map((c) => (
          <div className="cPref" key={c.key}>
            <div>
              <h3>{c.name}</h3>
              <p>{c.d}</p>
            </div>
            <button
              type="button"
              className={`cSwitch ${draft[c.key] ? 'on' : ''}`}
              role="switch"
              aria-checked={draft[c.key]}
              aria-label={c.name}
              onClick={() => toggle(c.key)}
            />
          </div>
        ))}

        <div className="cActions">
          <Button variant="o" arrow={false} onClick={() => savePreferences(draft)}>Save Preferences</Button>
          <Button variant="b" arrow={false} onClick={acceptAll}>Accept All</Button>
        </div>
      </div>
    </div>
  )
}

/**
 * CookieConsentContext — PROVIDER + HOOK
 * ---------------------------------------------------------------------------
 * Holds the visitor's cookie choice (localStorage key "cookie-consent" —
 * category flags plus a timestamp), decides whether the banner or the
 * preferences modal should be showing, and is the one place that flips
 * analytics/marketing scripts on.
 *
 * Wrap the app in <CookieConsentProvider> once — it renders the banner and
 * modal itself, so nothing else needs to be added to App.jsx. Anything that
 * wants to reopen preferences later (the footer's "Cookie settings" link)
 * just calls useCookieConsent().openPreferences().
 */
import { createContext, useContext, useEffect, useState } from 'react'
import { loadAnalytics, loadMarketing } from '../lib/consentScripts.js'
import CookieConsentBanner from '../components/CookieConsentBanner.jsx'
import CookieConsentModal from '../components/CookieConsentModal.jsx'

const STORAGE_KEY = 'cookie-consent'
const CookieConsentContext = createContext(null)

function readStoredConsent() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    return parsed && typeof parsed === 'object' ? parsed : null
  } catch {
    return null
  }
}

export function CookieConsentProvider({ children }) {
  const [consent, setConsent] = useState(readStoredConsent)
  const [bannerVisible, setBannerVisible] = useState(false)
  const [prefsOpen, setPrefsOpen] = useState(false)

  // Delay the mount-to-visible flip a beat so the banner actually slides and
  // fades in rather than appearing already in place on first paint.
  useEffect(() => {
    if (consent) return
    const t = setTimeout(() => setBannerVisible(true), 500)
    return () => clearTimeout(t)
  }, [consent])

  // Fires whenever a category is granted — on the first choice, or later via
  // "Cookie settings" — and is safe to call repeatedly; each loader guards
  // itself against double-injecting its script, so opting in later needs no
  // page reload.
  useEffect(() => {
    if (consent?.analytics) loadAnalytics()
    if (consent?.marketing) loadMarketing()
  }, [consent?.analytics, consent?.marketing])

  const persist = (categories) => {
    const value = {
      necessary: true,
      analytics: !!categories.analytics,
      marketing: !!categories.marketing,
      timestamp: new Date().toISOString(),
    }
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(value)) } catch {}
    setConsent(value)
    setBannerVisible(false)
    setPrefsOpen(false)
  }

  const value = {
    consent,
    bannerVisible,
    prefsOpen,
    acceptAll: () => persist({ analytics: true, marketing: true }),
    rejectNonEssential: () => persist({ analytics: false, marketing: false }),
    savePreferences: (categories) => persist(categories),
    openPreferences: () => setPrefsOpen(true),
    closePreferences: () => setPrefsOpen(false),
  }

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
      <CookieConsentBanner />
      <CookieConsentModal />
    </CookieConsentContext.Provider>
  )
}

export function useCookieConsent() {
  const ctx = useContext(CookieConsentContext)
  if (!ctx) throw new Error('useCookieConsent must be used within a CookieConsentProvider')
  return ctx
}

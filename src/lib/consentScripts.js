/**
 * consentScripts — lazy loaders for anything gated behind cookie consent.
 * ---------------------------------------------------------------------------
 * Nothing here runs until CookieConsentContext calls it after a visitor
 * opts in — on first choice, or later after reopening "Cookie settings" and
 * switching a category on, with no page reload either way. Each loader
 * guards itself so accepting twice never double-injects a script.
 *
 * No tracking IDs are wired up yet — this site runs no analytics or
 * marketing tags today. Drop real IDs into .env as VITE_GA_ID /
 * VITE_META_PIXEL_ID and these start firing for real with no other code
 * to touch.
 */

let analyticsLoaded = false
let marketingLoaded = false

export function loadAnalytics() {
  if (analyticsLoaded) return
  const id = import.meta.env.VITE_GA_ID
  if (!id) return
  analyticsLoaded = true

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() { window.dataLayer.push(arguments) }
  window.gtag('js', new Date())
  window.gtag('config', id)
}

export function loadMarketing() {
  if (marketingLoaded) return
  const id = import.meta.env.VITE_META_PIXEL_ID
  if (!id) return
  marketingLoaded = true

  const script = document.createElement('script')
  script.async = true
  script.src = 'https://connect.facebook.net/en_US/fbevents.js'
  script.onload = () => {
    window.fbq?.('init', id)
    window.fbq?.('track', 'PageView')
  }
  document.head.appendChild(script)
}

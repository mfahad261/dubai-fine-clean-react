/**
 * Seo — sets everything the browser tab and the crawlers see, per route.
 * ---------------------------------------------------------------------------
 * WHERE IT APPEARS: once at the top of every page component.
 * WHAT IT DOES:     title, description, canonical, Open Graph / Twitter cards,
 *                   the JSON-LD blocks, the address-bar theme colour, and the
 *                   tab icon — which is re-tinted to the section's accent so
 *                   AC duct cleaning and water tanks are distinguishable at a
 *                   glance in a row of pinned tabs.
 * NOTES:            PageTransition keeps only one route mounted at a time, so
 *                   two <Seo>s never fight over the head. The update lands as
 *                   the curtain lifts, which is also when the user expects the
 *                   tab to change.
 *
 *                   The tags themselves come from lib/headSpec.js, which the
 *                   build-time prerender also uses — so the static HTML a
 *                   crawler receives and the page a browser renders carry the
 *                   same title, canonical and schema.
 */
import { useEffect } from 'react'
import { setTitle, setName, setProperty, setCanonical, setJsonLd } from '../lib/head.js'
import { faviconFor, setFavicon } from '../lib/favicon.js'
import { headSpec, collectHead } from '../lib/headSpec.js'

const isServer = typeof window === 'undefined'

export default function Seo(props) {
  // Server render (scripts/prerender.mjs): effects never run there, so hand
  // the spec over directly and let the prerender write it into the HTML.
  if (isServer) collectHead(headSpec(props))

  // JSON-LD arrives as a fresh array literal on every render, so the props
  // object can't be a dependency — serialising it gives a value that only
  // changes when the content does.
  const key = JSON.stringify(props)

  useEffect(() => {
    const spec = headSpec({ ...JSON.parse(key), pathname: window.location.pathname })

    setTitle(spec.title)
    setName('description', spec.description)
    setCanonical(spec.url)
    setName('robots', spec.robots)
    setName('theme-color', spec.themeColor)
    Object.entries(spec.og).forEach(([k, v]) => setProperty(k, v))
    Object.entries(spec.twitter).forEach(([k, v]) => setName(k, v))
    setFavicon(faviconFor(spec.accent))
    setJsonLd(spec.jsonLd)
  }, [key])

  return null
}

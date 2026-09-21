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
 */
import { useEffect } from 'react'
import { SITE, absolute } from '../data/seo.js'
import { setTitle, setName, setProperty, setCanonical, setJsonLd } from '../lib/head.js'
import { faviconFor, setFavicon } from '../lib/favicon.js'
import { organisation } from '../lib/structuredData.js'

export default function Seo({
  title,
  description,
  path = '/',
  accent,
  image = SITE.ogImage,
  imageAlt = SITE.ogImageAlt,
  type = 'website',
  noindex = false,
  jsonLd = [],
}) {
  // JSON-LD arrives as a fresh array literal on every render, so it can't be a
  // dependency — serialising it gives a value that only changes when the
  // content does.
  const jsonLdKey = JSON.stringify(jsonLd)

  useEffect(() => {
    // A noindex page has no canonical of its own — /404 isn't a real URL, and
    // leaving the homepage's canonical in place would tell Google the visitor
    // is looking at the homepage. Point it at whatever they actually typed.
    const url = noindex ? absolute(window.location.pathname) : absolute(path)
    const img = image.startsWith('http') ? image : absolute(image)

    setTitle(title)
    setName('description', description)
    setCanonical(url)
    setName('robots', noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large')
    setName('theme-color', accent || SITE.themeColor)

    setProperty('og:type', type)
    setProperty('og:site_name', SITE.name)
    setProperty('og:locale', SITE.locale)
    setProperty('og:title', title)
    setProperty('og:description', description)
    setProperty('og:url', url)
    setProperty('og:image', img)
    setProperty('og:image:alt', imageAlt)

    setName('twitter:card', 'summary_large_image')
    setName('twitter:title', title)
    setName('twitter:description', description)
    setName('twitter:image', img)

    setFavicon(faviconFor(accent))

    // The organisation block rides along on every page so the @id the other
    // blocks point at always resolves.
    setJsonLd([organisation(), ...JSON.parse(jsonLdKey)])
  }, [title, description, path, accent, image, imageAlt, type, noindex, jsonLdKey])

  return null
}

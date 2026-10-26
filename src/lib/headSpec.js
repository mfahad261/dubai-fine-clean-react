/**
 * headSpec — what a page's <head> should say, as plain data.
 * ---------------------------------------------------------------------------
 * One function, two consumers:
 *
 *   components/Seo.jsx       applies it to document.head in the browser.
 *   scripts/prerender.mjs    serialises it into each route's static HTML at
 *                            build time, so crawlers that never run JavaScript
 *                            (Bing, social scrapers, most AI retrieval bots)
 *                            get the page's own title, canonical and schema
 *                            instead of the homepage's.
 *
 * Keeping both paths on the same function is the point: the raw HTML and the
 * rendered page can never disagree about the canonical again.
 *
 * During a server render Seo.jsx hands its spec to `collectHead`, and the
 * prerender script reads it back with `takeHead` after each route.
 */
import { SITE, absolute } from '../data/seo.js'
import { organisation, website } from './structuredData.js'

/** The default share image's real pixel size (public/og-cover.jpg). */
const DEFAULT_OG = { width: 2000, height: 1144 }

export function headSpec({
  title,
  description,
  path = '/',
  pathname,
  accent,
  image = SITE.ogImage,
  imageAlt = SITE.ogImageAlt,
  type = 'website',
  noindex = false,
  jsonLd = [],
}) {
  // A noindex page has no canonical of its own — /404 isn't a real URL, and
  // pointing at the homepage would tell Google the visitor is on the homepage.
  const url = noindex ? absolute(pathname || path) : absolute(path)
  const img = image.startsWith('http') ? image : absolute(image)
  const isDefaultImage = image === SITE.ogImage

  return {
    title,
    description,
    url,
    accent,
    robots: noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large',
    themeColor: accent || SITE.themeColor,
    og: {
      'og:type': type,
      'og:site_name': SITE.name,
      'og:locale': SITE.locale,
      'og:title': title,
      'og:description': description,
      'og:url': url,
      'og:image': img,
      'og:image:alt': imageAlt,
      // Only the default cover has known dimensions; a wrong size is worse
      // than none, so category photographs go without.
      'og:image:width': isDefaultImage ? String(DEFAULT_OG.width) : '',
      'og:image:height': isDefaultImage ? String(DEFAULT_OG.height) : '',
    },
    twitter: {
      'twitter:card': 'summary_large_image',
      'twitter:title': title,
      'twitter:description': description,
      'twitter:image': img,
      'twitter:image:alt': imageAlt,
    },
    // The organisation and website blocks ride along on every page so the
    // @ids the other blocks point at always resolve.
    jsonLd: [organisation(), website(), ...jsonLd].filter(Boolean),
  }
}

/* ------------------------------------------------------------- SSR handoff */
let collected = null

/** Called by Seo.jsx while rendering on the server. */
export function collectHead(spec) {
  collected = spec
}

/** Returns (and clears) whatever the last server render collected. */
export function takeHead() {
  const spec = collected
  collected = null
  return spec
}

/**
 * favicon — mints the tab icon, tinted to whichever section you're on.
 * ---------------------------------------------------------------------------
 * The emblem is redrawn as an inline data: URI rather than swapping between
 * a folder of pre-baked files, so a new service category needs no new asset —
 * it just passes its accent colour and gets a matching icon.
 *
 * Only the green parts (the ring, the lower wave and the small sparkle) take
 * the accent. The Burj silhouette stays brand blue, so the mark reads as the
 * same logo at 16px whatever page you're on.
 */
import { MARK_PATHS, MARK_VIEWBOX, BRAND_GREEN, BRAND_BLUE } from './logoMark.js'

const cache = new Map()

/**
 * @param {string} [accent] hex colour for the ring — the section's accent.
 * @returns {string} a `data:image/svg+xml,...` URI suitable for <link rel=icon>
 */
export function faviconFor(accent) {
  const ring = accent || BRAND_GREEN
  const hit = cache.get(ring)
  if (hit) return hit

  const body = MARK_PATHS
    .map((p) => `<path fill="${p.green ? ring : BRAND_BLUE}" d="${p.d}"/>`)
    .join('')
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${MARK_VIEWBOX}">${body}</svg>`
  const uri = `data:image/svg+xml,${encodeURIComponent(svg)}`

  cache.set(ring, uri)
  return uri
}

/**
 * Points the SVG icon link at `href`.
 *
 * The link element is replaced rather than mutated: Chromium has never
 * reliably repainted the tab on a plain href assignment, and a favicon that
 * changes on some navigations but not others looks broken. Browsers without
 * SVG favicon support ignore this link entirely and use the PNG fallback in
 * index.html, which is why that one is left alone.
 */
export function setFavicon(href) {
  if (typeof document === 'undefined') return
  const current = document.querySelector('link[rel="icon"][type="image/svg+xml"]')
  if (!current || current.getAttribute('href') === href) return

  const next = current.cloneNode(false)
  next.setAttribute('href', href)
  current.replaceWith(next)
}

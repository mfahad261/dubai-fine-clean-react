/**
 * head — the small amount of document.head plumbing the app needs.
 * ---------------------------------------------------------------------------
 * A hand-rolled replacement for react-helmet. The site has five routes and one
 * <Seo> mounted at a time, so a full head-management library would be three
 * times the code it saves.
 *
 * Tags are UPDATED IN PLACE, never removed and re-added. index.html already
 * ships a complete default set for crawlers that don't run JavaScript; this
 * overwrites those same elements rather than duplicating them.
 */

const head = () => document.head

/** Finds a tag by selector, creating it (with `attrs`) the first time. */
function tag(selector, create) {
  let el = head().querySelector(selector)
  if (!el) {
    el = create()
    el.setAttribute('data-seo', '')
    head().appendChild(el)
  }
  return el
}

const meta = (attr, value) =>
  tag(`meta[${attr}="${value}"]`, () => {
    const el = document.createElement('meta')
    el.setAttribute(attr, value)
    return el
  })

/** Sets a meta tag's content, or removes the tag when `content` is falsy. */
function setMeta(attr, value, content) {
  const existing = head().querySelector(`meta[${attr}="${value}"]`)
  if (!content) {
    if (existing && existing.hasAttribute('data-seo')) existing.remove()
    else if (existing) existing.setAttribute('content', '')
    return
  }
  meta(attr, value).setAttribute('content', content)
}

export const setName = (name, content) => setMeta('name', name, content)
export const setProperty = (prop, content) => setMeta('property', prop, content)

export function setTitle(title) {
  if (title && document.title !== title) document.title = title
}

export function setCanonical(href) {
  const el = tag('link[rel="canonical"]', () => {
    const l = document.createElement('link')
    l.rel = 'canonical'
    return l
  })
  el.setAttribute('href', href)
}

/**
 * Replaces every JSON-LD block this app owns with `blocks`.
 *
 * Structured data is the one case where in-place editing is worse than a
 * swap: a stale Service block left behind on the About page is a schema
 * error, and there is no cost to rewriting a handful of script tags.
 */
export function setJsonLd(blocks) {
  head().querySelectorAll('script[data-seo-jsonld]').forEach((el) => el.remove())
  for (const block of blocks) {
    if (!block) continue
    const el = document.createElement('script')
    el.type = 'application/ld+json'
    el.setAttribute('data-seo-jsonld', '')
    el.textContent = JSON.stringify(block)
    head().appendChild(el)
  }
}

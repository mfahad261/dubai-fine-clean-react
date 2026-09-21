/**
 * structuredData — the JSON-LD blocks Google reads.
 * ---------------------------------------------------------------------------
 * Everything here is built from data the site already publishes on the page.
 * That is not a style preference: Google penalises structured data that makes
 * claims the visitor cannot see, so if a field isn't on the page it isn't
 * here either. Two deliberate omissions —
 *
 *   aggregateRating — the site shows "4.9 average" but no verified review
 *                     count, and inventing one is exactly what gets rich
 *                     results revoked. Add it once real review data exists.
 *   geo / openingHours — no coordinates or published hours anywhere in the
 *                     content, so they'd be guesses. Fill in BUSINESS first.
 */
import { BUSINESS, FAQS } from '../data/content.js'
import { SITE, absolute } from '../data/seo.js'

const ORG_ID = `${SITE.url}/#organization`

/** The business itself — emitted on every page, so Google can merge the graph. */
export function organisation() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': ORG_ID,
    name: BUSINESS.name,
    url: SITE.url,
    logo: absolute('/favicon.svg'),
    image: absolute(SITE.ogImage),
    telephone: BUSINESS.phone,
    foundingDate: String(BUSINESS.since),
    // No priceRange on purpose — the site publishes no figures anywhere, and
    // schema that contradicts the page is worse than schema that omits.
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${BUSINESS.addressLine1}, Business Bay`,
      addressLocality: 'Dubai',
      addressRegion: 'Dubai',
      addressCountry: 'AE',
    },
    areaServed: { '@type': 'City', name: 'Dubai', containedInPlace: { '@type': 'Country', name: 'United Arab Emirates' } },
    knowsAbout: [
      'Deep cleaning', 'Villa cleaning', 'Office cleaning', 'Post-construction cleaning',
      'Carpet and upholstery cleaning', 'Marble polishing', 'AC duct cleaning',
      'Water tank cleaning', 'Sanitisation and disinfection',
    ],
  }
}

/** The breadcrumb trail for a page, as `[['Home','/'], ['Services','/services']]`. */
export function breadcrumbs(trail) {
  if (!trail || trail.length < 2) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map(([name, path], i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name,
      item: absolute(path),
    })),
  }
}

/** One service category, with its individual services as an offer catalogue. */
export function serviceCategory(cat, description) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: cat.name,
    description,
    serviceType: cat.name,
    provider: { '@id': ORG_ID },
    areaServed: { '@type': 'City', name: 'Dubai' },
    url: absolute(`/services/${cat.id}`),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: cat.name,
      itemListElement: cat.items.map((s) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: s.n, description: s.d },
      })),
    },
  }
}

/**
 * The FAQ block. Emitted on the home page only — the same eight questions
 * appear on four routes, and repeating a FAQPage across them reads to Google
 * as duplicate structured data rather than four helpful pages.
 */
export function faqPage() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

/** /contact — tells Google this is the page that reaches a human. */
export function contactPage() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    url: absolute('/contact'),
    name: `Contact ${BUSINESS.name}`,
    mainEntity: {
      '@id': ORG_ID,
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: BUSINESS.phone,
        contactType: 'customer service',
        areaServed: 'AE',
        availableLanguage: 'English',
      },
    },
  }
}

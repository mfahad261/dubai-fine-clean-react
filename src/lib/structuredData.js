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
 *   geo / sameAs     — no coordinates or social profiles are published. Add
 *                     BUSINESS.geo / BUSINESS.profiles (e.g. the Google
 *                     Business Profile URL) and they are picked up below.
 */
import { BUSINESS, FAQS, COVERAGE_AREAS } from '../data/content.js'
import { SITE, PAGES, absolute } from '../data/seo.js'

const ORG_ID = `${SITE.url}/#organization`
const SITE_ID = `${SITE.url}/#website`

/** The 41 communities listed on the home and contact pages, as schema Places. */
const areasServed = () => [
  { '@type': 'City', name: 'Dubai', containedInPlace: { '@type': 'Country', name: 'United Arab Emirates' } },
  ...COVERAGE_AREAS.map((name) => ({
    '@type': 'Place',
    name: `${name}, Dubai`,
    containedInPlace: { '@type': 'City', name: 'Dubai' },
  })),
]

/** The business itself — emitted on every page, so Google can merge the graph. */
export function organisation() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': ORG_ID,
    name: BUSINESS.name,
    alternateName: 'DubaiFineClean',
    url: SITE.url,
    // A square raster: Google's logo guidelines don't accept SVG.
    logo: {
      '@type': 'ImageObject',
      url: absolute('/apple-touch-icon.png'),
      width: 180,
      height: 180,
    },
    image: absolute(SITE.ogImage),
    description: PAGES.home.description,
    slogan: 'Trained crews, a written checklist, a quote agreed before we start.',
    telephone: BUSINESS.phone,
    foundingDate: String(BUSINESS.since),
    // Stated on /contact: "7 days a week, 8am – 10pm".
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: BUSINESS.opens,
      closes: BUSINESS.closes,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: BUSINESS.phone,
      contactType: 'customer service',
      areaServed: 'AE',
      availableLanguage: 'English',
    },
    ...(BUSINESS.email ? { email: BUSINESS.email } : {}),
    ...(BUSINESS.geo ? { geo: { '@type': 'GeoCoordinates', ...BUSINESS.geo } } : {}),
    ...(BUSINESS.mapUrl ? { hasMap: BUSINESS.mapUrl } : {}),
    ...(BUSINESS.profiles?.length ? { sameAs: BUSINESS.profiles } : {}),
    // No priceRange on purpose — the site publishes no figures anywhere, and
    // schema that contradicts the page is worse than schema that omits.
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS.street,
      addressLocality: 'Dubai',
      addressRegion: 'Dubai',
      addressCountry: 'AE',
    },
    areaServed: areasServed(),
    knowsAbout: [
      'Deep cleaning', 'Villa cleaning', 'Office cleaning', 'Post-construction cleaning',
      'Carpet and upholstery cleaning', 'Marble polishing', 'AC duct cleaning',
      'Water tank cleaning', 'Window and glass cleaning', 'Façade cleaning',
    ],
  }
}

/** The site itself, published by the business. */
export function website() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': SITE_ID,
    url: SITE.url,
    name: SITE.name,
    inLanguage: 'en-AE',
    publisher: { '@id': ORG_ID },
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
    ...(cat.img ? { image: absolute(cat.img) } : {}),
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

/** /services — the eight categories, in catalogue order. */
export function serviceList(cats) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Cleaning services in Dubai',
    numberOfItems: cats.length,
    itemListElement: cats.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      url: absolute(`/services/${c.id}`),
    })),
  }
}

/** /deep-cleaning — the division as one Service, its groups as catalogues. */
export function deepCleaningService(groups, description) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Deep Cleaning',
    serviceType: 'Deep cleaning',
    description,
    provider: { '@id': ORG_ID },
    areaServed: { '@type': 'City', name: 'Dubai' },
    url: absolute('/deep-cleaning'),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Deep cleaning services',
      itemListElement: groups.map((g) => ({
        '@type': 'OfferCatalog',
        name: g.name,
        itemListElement: g.items.map((s) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: s.n, ...(s.d ? { description: s.d } : {}) },
        })),
      })),
    },
  }
}

/** /about — names the page as the business's profile. */
export function aboutPage() {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    url: absolute('/about'),
    name: PAGES.about.title,
    description: PAGES.about.description,
    isPartOf: { '@id': SITE_ID },
    about: { '@id': ORG_ID },
  }
}

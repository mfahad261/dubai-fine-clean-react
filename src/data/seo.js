/**
 * seo — DATA
 * ---------------------------------------------------------------------------
 * Every page's title, description and sitemap weighting, in one place.
 *
 * IMPORTANT: this file must stay free of asset imports (no `.jpg`, no `.css`).
 * vite.config.js imports it directly at build time to write dist/sitemap.xml,
 * and plain Node cannot resolve an image import. Keep it pure data.
 */

export const SITE = {
  url: 'https://dubaifineclean.com',
  name: 'Dubai Fine Clean',
  locale: 'en_AE',
  /** Used for og:image when a page doesn't name its own. Lives in public/. */
  ogImage: '/og-cover.jpg',
  ogImageAlt: 'The Dubai skyline at dusk — Dubai Fine Clean',
  /** Falls back to the emblem's own green when a page has no accent. */
  themeColor: '#0B63D8',
}

/** Trims a description to something a search result will actually show. */
const clamp = (s, n = 158) => (s.length <= n ? s : `${s.slice(0, n - 1).trimEnd()}…`)

export const PAGES = {
  home: {
    path: '/',
    title: 'Dubai Fine Clean — Professional Cleaning Services in Dubai',
    description:
      'Deep cleaning, AC duct care, water tanks and façade access across Dubai. Insured teams, eco-certified products and a written quote first. Since 2016.',
  },
  services: {
    path: '/services',
    title: 'Cleaning Services in Dubai | Dubai Fine Clean',
    description:
      'Residential, commercial, post-construction, carpet and stone, AC ducts, water tanks, windows and façades. Scope and crew size listed for every job.',
  },
  deep: {
    path: '/deep-cleaning',
    title: 'Deep Cleaning Services in Dubai — Villas, Homes & Offices',
    description:
      'Whole-property deep cleaning to a written checklist: kitchens, bathrooms, upholstery, glass and façades. Free survey and a fixed written quote.',
  },
  about: {
    path: '/about',
    title: 'About Dubai Fine Clean — Cleaning Company in Business Bay',
    description:
      'Forty-plus trained cleaners working across Dubai since 2016. Municipality-compliant, fully insured, and run to the same operating rules as on day one.',
  },
  contact: {
    path: '/contact',
    title: 'Contact Dubai Fine Clean — Request a Cleaning Quote',
    description:
      'Tell us the property and we will quote it in writing today. Call, WhatsApp or send the enquiry form — Empire Heights A, Business Bay, Dubai. Open seven days.',
  },
  notFound: {
    path: '/404',
    title: 'Page not found | Dubai Fine Clean',
    description: 'That page has moved or never existed. Browse our cleaning services instead.',
    noindex: true,
  },
}

/**
 * Per-category SEO copy for /services/:categoryId.
 *
 * The keys ARE the routable category ids — this object is what the sitemap
 * generator walks, so it must mirror `CATS` in data/services.js. Services.jsx
 * warns in development if the two ever drift apart.
 */
export const SERVICE_SEO = {
  residential: {
    title: 'Residential Deep Cleaning in Dubai — Villas & Apartments',
    description:
      'Villa and apartment deep cleans to a written checklist: kitchen degrease, bathroom descale, inside wardrobes. Move-in, move-out and weekly plans.',
  },
  commercial: {
    title: 'Office & Commercial Cleaning in Dubai — Nightly Contracts',
    description:
      'Offices, retail, restaurants and warehouses cleaned outside trading hours. Nightly contracts with a fixed assigned team and consumables managed for you.',
  },
  construction: {
    title: 'Post-Construction Cleaning in Dubai — Handover Standard',
    description:
      'Three-stage post-construction cleaning: debris clearance, HEPA fine-dust extraction, then a full detail clean to snag and handover standard.',
  },
  surfaces: {
    title: 'Carpet, Upholstery & Marble Cleaning in Dubai',
    description:
      'Hot-water extraction for sofas, carpets, rugs and mattresses; diamond honing and crystallisation for marble. Fibre and finish tested first.',
  },
  air: {
    title: 'AC Duct & Coil Cleaning in Dubai — Negative-Air Extraction',
    description:
      'Duct and coil cleaning with negative-air machinery and before/after camera footage. Filter replacement, drain sanitisation and air quality reports.',
  },
  water: {
    title: 'Water Tank Cleaning in Dubai — Dubai Municipality Compliant',
    description:
      'Ground and overhead tanks drained, scrubbed, disinfected and refilled to Dubai Municipality standard, with a compliance certificate issued on completion.',
  },
  windows: {
    title: 'Window & Glass Cleaning in Dubai — Streak-Free, Inside & Out',
    description:
      'Interior and exterior window cleaning across Dubai with water-fed poles and ladder access. Frames, tracks, sills and hard-water stain removal included.',
  },
  facade: {
    title: 'Façade Cleaning in Dubai — Villa Pressure Wash & Rope Access',
    description:
      'Building façade cleaning for villas and towers: pressure washing, cladding and curtain wall, certified rope access. Permits and RAMS handled for you.',
  },
}

/**
 * Every indexable URL, with its sitemap weighting. Consumed by the app for
 * canonical links and by vite.config.js to emit dist/sitemap.xml.
 */
export const SITEMAP = [
  { path: PAGES.home.path, changefreq: 'weekly', priority: '1.0' },
  { path: PAGES.services.path, changefreq: 'weekly', priority: '0.9' },
  { path: PAGES.deep.path, changefreq: 'weekly', priority: '0.9' },
  ...Object.keys(SERVICE_SEO).map((id) => ({
    path: `/services/${id}`,
    changefreq: 'monthly',
    priority: '0.8',
  })),
  { path: PAGES.contact.path, changefreq: 'monthly', priority: '0.7' },
  { path: PAGES.about.path, changefreq: 'monthly', priority: '0.6' },
]

/**
 * Absolute URL for a site-relative path — canonical tags need the full form.
 * The homepage keeps its trailing slash, which is the form Google treats as
 * canonical for a root URL.
 */
export const absolute = (p = '/') => `${SITE.url}${p}`

/**
 * Falls back to a sensible title/description when a category has no bespoke
 * entry above — so adding an eighth category never ships an untitled page.
 */
export const serviceMeta = (cat) => {
  const bespoke = SERVICE_SEO[cat.id]
  if (bespoke) return bespoke
  return {
    title: `${cat.name} in Dubai | ${SITE.name}`,
    description: clamp(cat.lede),
  }
}

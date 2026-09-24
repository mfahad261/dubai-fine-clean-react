/**
 * Services — PAGE
 * ---------------------------------------------------------------------------
 * The "Our Services" catalogue — eight categories, filterable. /services/:categoryId opens pre-filtered, so a single category can be linked or bookmarked.
 */
import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CATS, getCategory } from '../data/services.js'
import { PAGES, SERVICE_SEO, serviceMeta } from '../data/seo.js'
import { breadcrumbs, serviceCategory } from '../lib/structuredData.js'
import { scrollToElement } from '../hooks/useSmoothScroll.js'
import Seo from '../components/Seo.jsx'
import NotFound from './NotFound.jsx'
import ServicesHero from '../components/ServicesHero.jsx'
import ServiceFilters from '../components/ServiceFilters.jsx'
import ServiceCatalogue from '../components/ServiceCatalogue.jsx'
import Button from '../components/Button.jsx'
import Reveal from '../components/Reveal.jsx'
import ScrollToTopButton from '../components/ScrollToTopButton.jsx'
import '../style/Services.css'

export default function Services() {
  const { categoryId } = useParams()
  const navigate = useNavigate()

  // The URL is the source of truth, so a mega-menu link, a shared link and
  // the filter buttons all land on exactly the same view.
  const initial = categoryId && getCategory(categoryId) ? categoryId : 'all'
  const [active, setActive] = useState(initial)

  useEffect(() => { setActive(initial) }, [initial])

  const filtered = useMemo(
    () => (active === 'all' ? CATS : CATS.filter((c) => c.id === active)),
    [active],
  )

  // Title, description, canonical, tab icon and Service schema all follow the
  // selected category — so /services/water is a page about water tanks to a
  // crawler, not a second copy of the catalogue.
  const cat = active === 'all' ? null : getCategory(active)
  const seo = useMemo(() => {
    if (!cat) {
      return {
        ...PAGES.services,
        accent: '#0B63D8',
        jsonLd: [breadcrumbs([['Home', '/'], ['Services', '/services']])],
      }
    }
    const meta = serviceMeta(cat)
    return {
      title: meta.title,
      description: meta.description,
      path: `/services/${cat.id}`,
      accent: cat.acc,
      // Share cards get the category's own photograph rather than the generic
      // skyline — a WhatsApp link to /services/water should look like a water
      // tank, which is most of why anyone clicks it.
      image: cat.img,
      imageAlt: `${cat.name} — Dubai Fine Clean`,
      jsonLd: [
        breadcrumbs([['Home', '/'], ['Services', '/services'], [cat.name, `/services/${cat.id}`]]),
        serviceCategory(cat, meta.description),
      ],
    }
  }, [cat])

  // A category added to services.js without SEO copy still renders — it just
  // falls back to its own catalogue text and misses the sitemap. Say so
  // loudly in development rather than letting it ship untitled.
  useEffect(() => {
    if (!import.meta.env.DEV) return
    const missing = CATS.filter((c) => !SERVICE_SEO[c.id]).map((c) => c.id)
    if (missing.length) {
      console.warn(`[seo] categories missing from SERVICE_SEO (and from sitemap.xml): ${missing.join(', ')}`)
    }
  }, [])

  const change = (id) => {
    setActive(id)
    navigate(id === 'all' ? '/services' : `/services/${id}`, { replace: true })
    // let the filter paint before scrolling to the first visible category
    requestAnimationFrame(() => {
      scrollToElement(document.querySelector('.catalogue .cat'), -70)
    })
  }

  // /services/whatever used to quietly show the unfiltered catalogue. The
  // server already answers 404 for a category it doesn't recognise (it reads
  // the same list out of sitemap.xml), so the page has to agree with it.
  if (categoryId && !getCategory(categoryId)) return <NotFound />

  return (
    <>
      <Seo {...seo} />
      <ServicesHero />
      <ServiceFilters active={active} onChange={change} />
      <ServiceCatalogue categories={filtered} />

      <section className="svcNote">
        <div className="wrap">
          <Reveal as="p">
            Scope shown is for standard-condition properties in Dubai. Heavily soiled units, occupied
            sites, height access and out-of-hours work are surveyed first. Every job is quoted in
            writing before we start, and the figure does not change once the team is on site.
          </Reveal>
          <Reveal style={{ marginTop: 28 }}>
            <Button variant="b" to="/contact">Request your quote</Button>
          </Reveal>
        </div>
      </section>
      <ScrollToTopButton />
    </>
  )
}

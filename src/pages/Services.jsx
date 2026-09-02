/**
 * Services — PAGE
 * ---------------------------------------------------------------------------
 * The "Our Services" catalogue — six categories, filterable. /services/:categoryId opens pre-filtered, so a single category can be linked or bookmarked.
 */
import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CATS, getCategory } from '../data/services.js'
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

  const change = (id) => {
    setActive(id)
    navigate(id === 'all' ? '/services' : `/services/${id}`, { replace: true })
    // let the filter paint before scrolling to the first visible category
    requestAnimationFrame(() => {
      const el = document.querySelector('.catalogue .cat')
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 70, behavior: 'smooth' })
    })
  }

  return (
    <>
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

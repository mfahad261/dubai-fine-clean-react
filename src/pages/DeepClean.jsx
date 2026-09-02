/**
 * DeepClean — PAGE
 * ---------------------------------------------------------------------------
 * The Deep Cleaning division — 24 services in five groups. Separate from Services because the client runs it as a separate part of the business, with its own menu on their site.
 */
import { DEEP_GROUPS } from '../data/deepCleaning.js'
import DeepCleanHero from '../components/DeepCleanHero.jsx'
import DeepCleanIndex from '../components/DeepCleanIndex.jsx'
import CTASection from '../components/CTASection.jsx'
import FAQSection from '../components/FAQSection.jsx'
import ScrollToTopButton from '../components/ScrollToTopButton.jsx'
import Reveal from '../components/Reveal.jsx'
import '../style/DeepClean.css'

export default function DeepClean() {
  return (
    <>
      <DeepCleanHero />
      <div id="groups">
        {DEEP_GROUPS.map((g) => <DeepCleanIndex group={g} key={g.id} />)}
      </div>
      <section className="dcNote">
        <div className="wrap">
          <Reveal as="p">
            Every deep clean is quoted in writing after a free survey — we do not publish figures,
            because condition, access and occupancy change the job more than floor area does.
            Materials, machinery and transport are included in the quote unless stated otherwise,
            and the figure does not move once the team is on site.
          </Reveal>
        </div>
      </section>
      <FAQSection />
      <CTASection />
      <ScrollToTopButton />
    </>
  )
}

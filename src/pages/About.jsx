/**
 * About — PAGE
 * ---------------------------------------------------------------------------
 * Company story, mission and vision, operating rules, real team photography and the closing feature shot.
 */
import { IMG } from '../data/images.js'
import Eyebrow from '../components/Eyebrow.jsx'
import Reveal from '../components/Reveal.jsx'
import SplitText from '../components/SplitText.jsx'
import SupervisorCard from '../components/SupervisorCard.jsx'
import MissionVision from '../components/MissionVision.jsx'
import NonNegotiables from '../components/NonNegotiables.jsx'
import TeamStrip from '../components/TeamStrip.jsx'
import OurStory from '../components/OurStory.jsx'
import StatsBand from '../components/StatsBand.jsx'
import FAQSection from '../components/FAQSection.jsx'
import FeatureShot from '../components/FeatureShot.jsx'
import CTASection from '../components/CTASection.jsx'
import ScrollToTopButton from '../components/ScrollToTopButton.jsx'
import '../style/About.css'

export default function About() {
  return (
    <>
      <section className="abHero">
        <div className="wrap">
          <Reveal><Eyebrow tone="green">About us</Eyebrow></Reveal>
          <SplitText as="h1" className="ed" lines={['Nine years of', <>getting it <i>right.</i></>]} />
          <Reveal delay={160}>
            <p className="lede">
              Dubai Fine Clean began with two staff and one van in Business Bay. Today more than forty
              trained cleaners work across the Emirate — and the operating rules have not changed since
              the first job.
            </p>
          </Reveal>
          <Reveal image as="div" className="abImg" delay={120}>
            <div style={{ backgroundImage: `url(${IMG.team003})` }} />
          </Reveal>
        </div>
      </section>

      <SupervisorCard />
      <MissionVision />
      <NonNegotiables />
      <StatsBand />
      <OurStory />
      <TeamStrip />
      <FeatureShot />
      <FAQSection />
      <CTASection />
      <ScrollToTopButton />
    </>
  )
}

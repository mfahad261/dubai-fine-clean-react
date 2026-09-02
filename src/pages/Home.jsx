/**
 * Home — PAGE
 * ---------------------------------------------------------------------------
 * Sequence, top to bottom:
 *   hero (two clips, scroll-driven)
 *   scope estimator
 *   credentials marquee
 *   service cards
 *   the two divisions, as oversized headings
 *   why us
 *   our own footage ("no stock")
 *   stats
 *   benefits
 *   coverage + reviews
 *   FAQ + closing CTA
 */
import Hero from '../components/Hero.jsx'
import QuoteCalculator from '../components/QuoteCalculator.jsx'
import LogosMarquee from '../components/LogosMarquee.jsx'
import BentoServices from '../components/BentoServices.jsx'
import SplitFeature from '../components/SplitFeature.jsx'
import VideoDuo from '../components/VideoDuo.jsx'
import WhyUs from '../components/WhyUs.jsx'
import StatsBand from '../components/StatsBand.jsx'
import BenefitsGrid from '../components/BenefitsGrid.jsx'
import ReviewsSection from '../components/ReviewsSection.jsx'
import FAQSection from '../components/FAQSection.jsx'
import CTASection from '../components/CTASection.jsx'
import ChapterSeparator from '../components/ChapterSeparator.jsx'
import CoverageMap from '../components/CoverageMap.jsx'
import ScrollToTopButton from '../components/ScrollToTopButton.jsx'

export default function Home() {
  return (
    <>
      <Hero />
      <QuoteCalculator />
      <LogosMarquee />

      <ChapterSeparator no="01" label="Every service, one place" />
      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap"><BentoServices /></div>
      </section>

      <SplitFeature />

      <ChapterSeparator no="02" label="Why choose us" />
      <WhyUs />

      <ChapterSeparator no="03" label="Caught on the job" />
      <VideoDuo />

      <StatsBand />

      <ChapterSeparator no="04" label="What you get" />
      <BenefitsGrid />

      <ChapterSeparator no="05" label="Coverage & trust" />
      <CoverageMap />
      <ReviewsSection />

      <ChapterSeparator no="06" label="Common questions" />
      <FAQSection />

      <CTASection />
      <ScrollToTopButton />
    </>
  )
}

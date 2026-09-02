/**
 * Contact — PAGE
 * ---------------------------------------------------------------------------
 * Enquiry form, contact details, location and the coverage list.
 */
import Eyebrow from '../components/Eyebrow.jsx'
import Reveal from '../components/Reveal.jsx'
import SplitText from '../components/SplitText.jsx'
import ContactForm from '../components/ContactForm.jsx'
import ContactInfoCard from '../components/ContactInfoCard.jsx'
import LocationMap from '../components/LocationMap.jsx'
import CoverageMap from '../components/CoverageMap.jsx'
import FAQSection from '../components/FAQSection.jsx'
import ScrollToTopButton from '../components/ScrollToTopButton.jsx'
import '../style/Contact.css'

export default function Contact() {
  return (
    <>
      <section className="ctHero">
        <div className="wrap">
          <Reveal><Eyebrow>Get in touch</Eyebrow></Reveal>
          <SplitText as="h1" className="ed" lines={['Tell us the space.', <>We'll quote it <i>today.</i></>]} />
          <div className="ctGrid">
            <ContactForm />
            <div className="ctSide">
              <ContactInfoCard />
              <LocationMap />
            </div>
          </div>
        </div>
      </section>
      <CoverageMap />
      <FAQSection />
      <ScrollToTopButton />
    </>
  )
}

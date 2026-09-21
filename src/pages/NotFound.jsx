/**
 * NotFound — PAGE
 * ---------------------------------------------------------------------------
 * Every unknown URL used to render the homepage. That is a "soft 404": Google
 * indexes /servicse, /contact-us and every stray link as another copy of the
 * front page, and the visitor never learns they mistyped. This page says so,
 * carries `noindex`, and offers the routes they were probably after.
 */
import { Link } from 'react-router-dom'
import { CATS } from '../data/services.js'
import { PAGES } from '../data/seo.js'
import Seo from '../components/Seo.jsx'
import Eyebrow from '../components/Eyebrow.jsx'
import Reveal from '../components/Reveal.jsx'
import Button from '../components/Button.jsx'
import '../style/NotFound.css'

export default function NotFound() {
  return (
    <>
      <Seo {...PAGES.notFound} accent="#54677F" />
      <section className="nfHero">
        <div className="wrap">
          <Reveal><Eyebrow>Error 404</Eyebrow></Reveal>
          <Reveal delay={80} as="h1" className="nfCode">404</Reveal>
          <Reveal delay={140}>
            <h2 className="nfTitle">This page isn&apos;t here.</h2>
            <p className="lede nfLede">
              The link may be out of date, or the address mistyped. Everything we clean is
              one of these — or call us and we&apos;ll point you at the right one.
            </p>
          </Reveal>

          <Reveal delay={200}>
            <div className="nfActions">
              <Button variant="b" to="/">Back to home</Button>
              <Button variant="o" to="/contact">Get a quote</Button>
            </div>
          </Reveal>

          <Reveal delay={260}>
            <nav className="nfLinks" aria-label="Popular pages">
              <Link to="/services">All services</Link>
              <Link to="/deep-cleaning">Deep cleaning</Link>
              {CATS.map((c) => (
                <Link key={c.id} to={`/services/${c.id}`} style={{ '--acc': c.acc }}>{c.name}</Link>
              ))}
              <Link to="/about">About us</Link>
            </nav>
          </Reveal>
        </div>
      </section>
    </>
  )
}

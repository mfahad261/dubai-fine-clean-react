/**
 * ServicesHero — banner at the top of /services.
 * ---------------------------------------------------------------------------
 * WHERE IT APPEARS: /services only.
 * WHAT IT DOES:     Sets the tone with the client's own footage running behind
 *                   a deep navy wash, then counts up the catalogue totals.
 * NOTE:             No prices — the "AED" stat that used to sit here has been
 *                   replaced, since the site no longer publishes figures.
 */
import { VIDEOS } from '../data/videos.js'
import { CATS, totalServiceCount } from '../data/services.js'
import { deepServiceCount } from '../data/deepCleaning.js'
import { useInViewVideo } from '../hooks/useInViewVideo.js'
import { useCountUp } from '../hooks/useCountUp.js'
import Eyebrow from './Eyebrow.jsx'
import Reveal from './Reveal.jsx'
import './ServicesHero.css'

function Counter({ value, label }) {
  const [ref, display] = useCountUp(value)
  return (
    <div ref={ref}>
      <div className="n">{display}</div>
      <div className="l">{label}</div>
    </div>
  )
}

export default function ServicesHero() {
  const videoRef = useInViewVideo()

  return (
    <section className="svcHero">
      {/* Real footage behind the colour wash. Deliberately NOT the same clip as
          the home hero — reusing one video across the site is the fastest way to
          make it feel thin. */}
      <video
        ref={videoRef}
        className="svcHeroVideo"
        src={VIDEOS.glassDetail.src}
        poster={VIDEOS.glassDetail.poster}
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      />
      <span className="svcHeroWash" />
      <span className="svcHeroGrid" aria-hidden="true" />

      <div className="wrap inner">
        <Reveal><Eyebrow>Services &amp; scope</Eyebrow></Reveal>
        <Reveal delay={70}>
          <h1 className="ed">Everything we clean,<br />and what it <i>involves.</i></h1>
        </Reveal>
        <Reveal delay={140}>
          <div className="svcCount">
            <Counter value={String(totalServiceCount + deepServiceCount)} label="Services" />
            <Counter value={String(CATS.length)} label="Categories" />
            <div><div className="n">24h</div><div className="l">Re-clean guarantee</div></div>
            <div><div className="n">7</div><div className="l">Days a week</div></div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

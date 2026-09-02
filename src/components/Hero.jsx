/**
 * Hero — the home page opening sequence.
 * ---------------------------------------------------------------------------
 * WHERE IT APPEARS: top of the home page, nowhere else.
 *
 * THE SEQUENCE (one scroll value, 0 → 1):
 *   phase 1  the villa clip fills the screen, the name sits over it
 *   phase 2  it CONTRACTS INTO A CARD — corners round, a hairline appears,
 *            it lifts off the background on a shadow
 *   phase 3  the façade card slides in beside it, and the copy takes the
 *            left column the video has just vacated
 *
 * Both clips end up as cards, staggered vertically rather than sitting in a
 * rigid row, because a slight offset reads as composed and a matched pair
 * reads as a template.
 *
 * NO-OVERLAP GUARANTEE — fixed fractions, not hope:
 *   copy   5vw → 33vw   (capped at 360px)
 *   villa  38vw → 76vw
 *   façade 79vw → 95vw
 *
 * A NOTE ON THE REFS: each animated element sits inside a positioning wrapper.
 * The wrapper owns `position`/`translate` for centring; the inner element owns
 * the scroll transform. Without that split the two transforms fight and the
 * element jumps.
 */
import { useEffect, useRef } from 'react'
import { VIDEOS } from '../data/videos.js'
import { TEAM_PHOTOS } from '../data/images.js'
import { BUSINESS } from '../data/content.js'
import { useScrollProgress } from '../hooks/useScrollProgress.js'
import { useInViewVideo } from '../hooks/useInViewVideo.js'
import Button from './Button.jsx'
import Icon from './Icon.jsx'
import './Hero.css'

const clamp = (v, a = 0, b = 1) => (v < a ? a : v > b ? b : v)
const seg = (p, from, to) => {
  const t = clamp((p - from) / (to - from))
  return t * t * (3 - 2 * t)
}

const MARQUEE = 'Villas · Apartments · Offices · Facades · Post-construction · '

export default function Hero() {
  const [runwayRef, p] = useScrollProgress()
  const wideRef = useInViewVideo()
  const tallRef = useInViewVideo()

  const stageRef = useRef(null)
  const mediaRef = useRef(null)
  const introRef = useRef(null)
  const copyRef = useRef(null)
  const cardRef = useRef(null)
  const mqRef = useRef(null)

  useEffect(() => {
    const shrink = seg(p, 0.06, 0.52)   // villa clip becomes a card
    const card = seg(p, 0.34, 0.68)     // façade card arrives
    const reveal = seg(p, 0.40, 0.74)   // copy takes the left column

    // one variable drives the whole geometry
    if (stageRef.current) stageRef.current.style.setProperty('--inset', String(shrink))
    if (mediaRef.current) mediaRef.current.style.transform = `scale(${1.12 - shrink * 0.12})`

    if (introRef.current) {
      const out = seg(p, 0.05, 0.3)
      introRef.current.style.opacity = String(1 - out)
      introRef.current.style.transform = `translateY(${-out * 38}px)`
    }
    if (copyRef.current) {
      copyRef.current.style.opacity = String(reveal)
      copyRef.current.style.transform = `translateY(${(1 - reveal) * 28}px)`
    }
    if (cardRef.current) {
      cardRef.current.style.opacity = String(card)
      cardRef.current.style.transform = `translateX(${(1 - card) * 44}px) scale(${0.93 + card * 0.07})`
    }
    if (mqRef.current) mqRef.current.style.transform = `translate3d(${-p * 120 - 5}%,0,0)`
  }, [p])

  return (
    <div className="heroScroll" ref={runwayRef}>
      <div className="heroStage" ref={stageRef}>
        <div className="heroTopo" aria-hidden="true" style={{ transform: `translateY(${p * -44}px)` }}>
          <svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
            {Array.from({ length: 8 }, (_, i) => (
              <path key={i} d={`M-60 ${150 + i * 82} C 220 ${90 + i * 82}, 420 ${240 + i * 82}, 660 ${170 + i * 82} S 1040 ${70 + i * 82}, 1260 ${160 + i * 82}`} />
            ))}
          </svg>
        </div>

        <div className="heroMarquee" aria-hidden="true">
          <div className="hmTrack" ref={mqRef}>{MARQUEE.repeat(6)}</div>
        </div>

        {/* ---- CARD 1: the villa clip, contracts out of full bleed ---- */}
        <figure className="heroCardA">
          <video
            ref={(n) => { wideRef.current = n; mediaRef.current = n }}
            src={VIDEOS.villaInterior.src}
            poster={VIDEOS.villaInterior.poster}
            muted loop playsInline preload="metadata" aria-hidden="true"
          />
          <span className="heroWash" />

          <figcaption className="heroIntro" ref={introRef}>
            <span className="hiTag">Dubai · Business Bay · since {BUSINESS.since}</span>
            <h1 className="hiName">Dubai<br />Fine Clean</h1>
            <span className="hiHint"><span className="l" />Scroll to explore</span>
          </figcaption>

          <span className="hcaTag">
            <span className="hcaNo">02</span>
            <span className="hcaTx">Villa deep clean<em>Dubai Hills</em></span>
          </span>
        </figure>

        {/* ---- CARD 2: the façade clip ---- */}
        <div className="heroCardBWrap">
          <figure className="heroCardB" ref={cardRef}>
            <video
              ref={tallRef}
              src={VIDEOS.ropeAccess.src}
              poster={VIDEOS.ropeAccess.poster}
              muted loop playsInline preload="none" aria-hidden="true"
            />
            <figcaption>
              <span className="hcbNo">01</span>
              <span className="hcbTx">Façade access<em>Certified rope technicians</em></span>
            </figcaption>
          </figure>
        </div>

        {/* ---- the copy, in the column the video vacates ---- */}
        <div className="heroCopyWrap">
          <div className="heroCopy" ref={copyRef}>
            <h2 className="heroH2">The clean<br />Dubai <i>trusts.</i></h2>
            <p className="heroLede">
              Deep cleaning, surface care and AC hygiene for villas, apartments and offices —
              trained crews, a written checklist, a quote agreed before we start.
            </p>
            <div className="heroBtns">
              <Button variant="b" to="/contact" magnetic>Get a free quote</Button>
              <a className="heroCall" href={BUSINESS.phoneHref}>
                <Icon name="phone" size={15} filled />{BUSINESS.phone}
              </a>
            </div>
            <div className="heroFacts">
              <div className="hFact">
                <div className="hFaces">
                  {TEAM_PHOTOS.slice(0, 3).map((t) => (
                    <img key={t.caption} src={t.src} alt="" width="27" height="27" loading="lazy" />
                  ))}
                </div>
                <span><b>40+</b>trained staff</span>
              </div>
              <div className="hFact accent"><span><b>24h</b>re-clean guarantee</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

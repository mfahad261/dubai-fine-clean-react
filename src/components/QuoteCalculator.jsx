/**
 * QuoteCalculator — the "what will this involve?" widget.
 * ---------------------------------------------------------------------------
 * WHERE IT APPEARS: home page, overlapping the bottom of the hero.
 * WHAT IT DOES:     Lets a visitor pick service / property / size and shows
 *                   the SCOPE — hours on site, crew size, visit pattern.
 *                   No prices anywhere: the client quotes in writing after a
 *                   survey, so a figure here would only ever be wrong.
 * HOW IT CONNECTS:  Maths lives in hooks/useQuoteCalculator.js; the options
 *                   come from data/content.js.
 */
import { useQuoteCalculator } from '../hooks/useQuoteCalculator.js'
import { QUOTE_SERVICES, QUOTE_PROPERTY_TYPES, QUOTE_SIZES, QUOTE_AREAS } from '../data/content.js'
import Reveal from './Reveal.jsx'
import Button from './Button.jsx'
import Icon from './Icon.jsx'
import './QuoteCalculator.css'

export default function QuoteCalculator() {
  const { service, setService, type, setType, size, setSize, result } = useQuoteCalculator()

  return (
    <div className="quoteWrap">
      <div className="wrap" style={{ padding: 0 }}>
        <Reveal as="div" className="quoteBox">
          <div className="qFields">
            <div className="fld">
              <label htmlFor="qService">Service</label>
              <select id="qService" value={service} onChange={(e) => setService(e.target.value)}>
                {Object.entries(QUOTE_SERVICES).map(([k, s]) => (
                  <option key={k} value={k}>{s.label}</option>
                ))}
              </select>
            </div>
            <div className="fld">
              <label htmlFor="qType">Property</label>
              <select id="qType" value={type} onChange={(e) => setType(e.target.value)}>
                {Object.entries(QUOTE_PROPERTY_TYPES).map(([k, t]) => (
                  <option key={k} value={k}>{t.label}</option>
                ))}
              </select>
            </div>
            <div className="fld">
              <label htmlFor="qSize">Size</label>
              <select id="qSize" value={size} onChange={(e) => setSize(parseFloat(e.target.value))}>
                {QUOTE_SIZES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </div>
            <div className="fld">
              <label htmlFor="qArea">Community</label>
              <select id="qArea" defaultValue={QUOTE_AREAS[0]}>
                {QUOTE_AREAS.map((a) => <option key={a}>{a}</option>)}
              </select>
            </div>
          </div>

          <div className="qResult">
            <span className="k">Estimated scope</span>
            <div className="qStats">
              <div><b>{result.hours}</b><span>hours on site</span></div>
              <div><b>{result.crew}</b><span>staff attending</span></div>
            </div>
            <div className="qVisit"><Icon name="clock" size={13} />{result.visits}</div>
            <Button variant="b" to="/contact" className="qCta">Get your written quote</Button>
          </div>
        </Reveal>

        <Reveal as="div" className="qNote" delay={100}>
          Scope is indicative. Your fixed written quote is confirmed after a quick call or a free
          site survey — and it does not change once the team is on site.
        </Reveal>
      </div>
    </div>
  )
}

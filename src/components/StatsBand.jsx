/**
 * StatsBand — The dark band of headline numbers.
 * ---------------------------------------------------------------------------
 * WHERE IT APPEARS: home and /about.
 * WHAT IT DOES:     The dark band of headline numbers.
 * NOTES:            Figures come from STATS in data/content.js.
 */
import { STATS } from '../data/content.js'
import StatCounter from './StatCounter.jsx'
import Reveal from './Reveal.jsx'
import './StatsBand.css'

export default function StatsBand() {
  return (
    <section style={{ padding: '0 0 110px' }}>
      <div className="wrap">
        <Reveal as="div" className="stats">
          <div className="statsRow">
            {STATS.map((s) => <StatCounter key={s.l} value={s.n} suffix={s.suffix} label={s.l} />)}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

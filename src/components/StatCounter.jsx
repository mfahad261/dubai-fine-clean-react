/**
 * StatCounter — One statistic that counts up when scrolled into view.
 * ---------------------------------------------------------------------------
 * WHERE IT APPEARS: inside StatsBand.
 * WHAT IT DOES:     One statistic that counts up when scrolled into view.
 */
import { useCountUp } from '../hooks/useCountUp.js'

export default function StatCounter({ value, suffix, label }) {
  const [ref, display] = useCountUp(value)
  return (
    <div ref={ref}>
      <div className="statN">{display}<em>{suffix}</em></div>
      <div className="statL">{label}</div>
    </div>
  )
}

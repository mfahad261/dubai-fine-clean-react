/**
 * useQuoteCalculator — scope estimator behind the home-page widget.
 * ---------------------------------------------------------------------------
 * Returns how long a job takes and how many staff attend, given a service,
 * property type and size. It returns NO price: the client issues a fixed
 * written quote after a survey, so any number published here would be a
 * guess the customer could hold them to.
 */
import { useMemo, useState } from 'react'
import { QUOTE_SERVICES, QUOTE_PROPERTY_TYPES } from '../data/content.js'

export function useQuoteCalculator() {
  const [service, setService] = useState('deep')
  const [type, setType] = useState('apt')
  const [size, setSize] = useState(1.9)

  const result = useMemo(() => {
    const q = QUOTE_SERVICES[service] || QUOTE_SERVICES.deep
    const m = parseFloat(size) || 1
    const tm = QUOTE_PROPERTY_TYPES[type]?.mult || 1

    // base hours describe a 2-bed (m = 1.9) — normalise against that so the
    // estimate stays consistent with the scope printed in the catalogue
    const k = Math.sqrt((m * tm) / 1.9)
    const h0 = Math.max(1, Math.round(q.hrs[0] * k))
    const h1 = Math.max(h0 + 1, Math.round(q.hrs[1] * k))
    const c0 = q.crew[0]
    const c1 = Math.min(8, Math.round(q.crew[1] * (m > 2.5 ? 1.4 : 1)))

    return {
      label: q.label,
      hours: `${h0}–${h1}`,
      crew: c0 === c1 ? `${c0}` : `${c0}–${c1}`,
      visits: service === 'regular' ? 'Weekly or fortnightly' : 'One visit',
    }
  }, [service, type, size])

  return { service, setService, type, setType, size, setSize, result }
}

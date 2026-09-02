/**
 * rateLimit — a small in-memory throttle.
 * ---------------------------------------------------------------------------
 * Stops one person (or one script) hammering the endpoint and burning through
 * the daily Gmail sending allowance in a minute.
 *
 * DELIBERATELY IN MEMORY: this is a contact form on a marketing site, not a
 * login endpoint. Counters resetting on restart is fine, and it avoids adding
 * Redis to a project that otherwise needs no database. If this ever runs on
 * several instances at once, swap this for a shared store — each instance
 * currently keeps its own count.
 */
const hits = new Map()

export function rateLimit({ windowMs = 10 * 60_000, max = 5 } = {}) {
  return (req, res, next) => {
    const now = Date.now()
    const key = req.ip || req.headers['x-forwarded-for'] || 'unknown'

    const record = hits.get(key) || { count: 0, start: now }
    if (now - record.start > windowMs) {
      record.count = 0
      record.start = now
    }
    record.count += 1
    hits.set(key, record)

    // Opportunistic cleanup so the map can't grow without bound.
    if (hits.size > 5000) {
      for (const [k, v] of hits) if (now - v.start > windowMs) hits.delete(k)
    }

    if (record.count > max) {
      const waitMin = Math.ceil((windowMs - (now - record.start)) / 60_000)
      return res.status(429).json({
        ok: false,
        error: `Too many enquiries from this connection. Please try again in ${waitMin} minute${waitMin === 1 ? '' : 's'}, or call us on +971 56 916 9761.`,
      })
    }
    next()
  }
}

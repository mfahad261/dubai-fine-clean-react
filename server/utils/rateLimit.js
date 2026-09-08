/**
 * rateLimit — a small in-memory throttle.
 * ---------------------------------------------------------------------------
 * Stops one person (or one script) hammering the endpoint and burning through
 * the mailbox's hourly sending allowance in a minute. Hitting Hostinger's cap
 * blocks *all* outbound mail from the domain for an hour, real enquiries
 * included, which is why this matters more than it looks.
 *
 * NOT MIDDLEWARE, DELIBERATELY: the controller validates first and only counts
 * submissions that are actually about to send an email, so this exposes a
 * plain check it can call at the right moment.
 *
 * DELIBERATELY IN MEMORY: this is a contact form on a marketing site, not a
 * login endpoint. Counters resetting on restart is fine, and it avoids adding
 * a database to a project that otherwise needs none.
 */
const hits = new Map();

/**
 * Records a hit and reports whether the caller is over the limit.
 * @returns {{ allowed: boolean, waitMinutes: number }}
 */
function checkRate(key, { windowMs = 10 * 60 * 1000, max = 5 } = {}) {
  const now = Date.now();
  const id = key || 'unknown';

  const record = hits.get(id) || { count: 0, start: now };
  if (now - record.start > windowMs) {
    record.count = 0;
    record.start = now;
  }
  record.count += 1;
  hits.set(id, record);

  // Opportunistic cleanup so the map can't grow without bound.
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (now - v.start > windowMs) hits.delete(k);
  }

  if (record.count > max) {
    return {
      allowed: false,
      waitMinutes: Math.max(1, Math.ceil((windowMs - (now - record.start)) / 60000)),
    };
  }
  return { allowed: true, waitMinutes: 0 };
}

/** The message the customer sees. Always ends with a way to reach a human. */
function rateLimitMessage(waitMinutes) {
  return `Too many enquiries from this connection. Please try again in ${waitMinutes} `
    + `minute${waitMinutes === 1 ? '' : 's'}, or call us on +971 56 916 9761.`;
}

module.exports = { checkRate, rateLimitMessage };

/**
 * errorHandler — the last line of defence.
 * ---------------------------------------------------------------------------
 * Anything that throws without being caught ends up here. Two rules:
 *
 *   1. The full error goes to the server log, where you can read it.
 *   2. The browser gets a plain sentence and the phone number — never a stack
 *      trace, which leaks file paths and helps nobody standing in a villa
 *      trying to book a clean.
 */
const errorHandler = (err, req, res, _next) => {
  console.error('❌ Unhandled error:', err);

  // A CORS rejection is not a server fault — say so with the right status.
  const status = err.status || (/not allowed/i.test(err.message) ? 403 : 500);

  res.status(status).json({
    ok: false,
    success: false,
    error: 'Something went wrong. Please call or WhatsApp us on +971 56 916 9761.',
  });
};

module.exports = errorHandler;

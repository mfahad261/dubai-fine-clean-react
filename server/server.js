/**
 * server — the Express app behind Dubai Fine Clean.
 * ---------------------------------------------------------------------------
 * Run it:      npm run server          (API only, for local development)
 * Run both:    npm run dev:all         (Vite + this, side by side)
 * Production:  npm run build && npm start
 * Check email: npm run mail:check
 *
 * IT SERVES THE SITE TOO. In production this one process handles both the API
 * and the built React app out of /dist, which is why React Router works on a
 * refresh: the catch-all below hands any unknown path to index.html instead of
 * letting Express 404 it. That is the whole deployment — one Node app, no
 * .htaccess, no PHP, no second host.
 *
 * In development it runs API-only; Vite serves the site on :5173 and proxies
 * /api here (see vite.config.js), so the browser sees one origin.
 */
const path = require('path');
const fs = require('fs');
const express = require('express');
const cors = require('cors');

require('dotenv').config({ path: path.join(__dirname, '.env') });

const emailRoutes = require('./routes/emailRoutes');
const errorHandler = require('./middleware/errorHandler');
const { verifyTransporter } = require('./config/emailConfig');

const app = express();
const PORT = process.env.PORT || 5175;

/* ------------------------------------------------------------------- CORS */
// Only the site itself may post to the API. In development Vite proxies the
// request so it arrives same-origin; in production the site is served by this
// very process, so it's same-origin again. The list matters for the in-between
// cases — a staging domain, or the site temporarily hosted elsewhere.
const allowed = (process.env.SITE_ORIGIN
  || 'http://localhost:5173,http://localhost:5174,https://dubaifineclean.com,https://www.dubaifineclean.com'
).split(',').map((s) => s.trim()).filter(Boolean);

// MOUNTED ON /api ONLY, deliberately. Applied to the whole app it also guards
// the site's own CSS and JS, and Vite marks those tags `crossorigin` — so the
// browser requests them in CORS mode, sends an Origin header for the port the
// site is being served from, and this check 403s the stylesheet. The page then
// loads with no styling and no JavaScript. Static files need no CORS; only the
// API does.
app.use('/api', cors({
  origin(origin, cb) {
    // No origin = curl, health checks, same-origin requests. Allow those.
    if (!origin || allowed.includes(origin)) return cb(null, true);
    cb(new Error(`Origin ${origin} is not allowed`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));

// A contact form has no business posting a megabyte.
app.use(express.json({ limit: '32kb' }));
app.use(express.urlencoded({ extended: true, limit: '32kb' }));

/* ------------------------------------------------------------------ routes */
app.get('/api/health', async (_req, res) => {
  let mail = 'unknown';
  try {
    await verifyTransporter();
    mail = 'ok';
  } catch (err) {
    mail = `not configured — ${err.message.split('\n')[0]}`;
  }
  res.json({ ok: true, mail, time: new Date().toISOString() });
});

app.use('/api', emailRoutes);

/* -------------------------------------------------------------- the site */
const distPath = path.join(__dirname, '..', 'dist');

if (fs.existsSync(distPath)) {
  console.log('✅ dist found — serving the site from this process');
  app.use(express.static(distPath));

  // React Router owns every non-API path. Without this, refreshing /contact
  // would 404, because there is no folder on disk called "contact".
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    return res.sendFile(path.join(distPath, 'index.html'));
  });
} else {
  console.log('ℹ️  no dist folder — API-only mode (normal during development)');
}

// Unknown /api/* paths should read as missing endpoints, not as the homepage.
app.use('/api', (_req, res) => res.status(404).json({ ok: false, error: 'Unknown endpoint' }));

app.use(errorHandler);

/* ------------------------------------------------------------------- boot */
app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n  Dubai Fine Clean`);
  console.log(`  listening on   http://localhost:${PORT}`);
  console.log(`  health check   http://localhost:${PORT}/api/health`);
  console.log(`  allowed origins: ${allowed.join(', ')}\n`);

  verifyTransporter()
    .then(() => console.log(`✅ Email ready — sending as ${process.env.EMAIL_USER}`))
    .then(() => console.log(`   Enquiries go to ${process.env.RECEIVER_EMAIL || process.env.EMAIL_USER}\n`))
    .catch((err) => {
      console.warn(`⚠️  Email NOT working — ${err.message}`);
      console.warn('   The site still runs; the form will show its fallback phone number.');
      console.warn('   See SETUP-EMAIL.md\n');
    });
});

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
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import emailRoutes from './routes/emailRoutes.js';
import errorHandler from './middleware/errorHandler.js';
import { verifyTransporter } from './config/emailConfig.js';

// ES modules have no __dirname. Both the .env path and the dist/ path below
// must resolve against this file, not the working directory — `npm start`
// from the repo root and `node server.js` from inside server/ have to behave
// identically.
const here = path.dirname(fileURLToPath(import.meta.url));

dotenv.config({ path: path.join(here, '.env') });

const app = express();
const PORT = process.env.PORT || 5175;

// Hostinger (and any other host) terminates TLS in front of this process, so
// req.secure and req.ip only tell the truth once Express is told to read the
// X-Forwarded-* headers its proxy sets.
app.set('trust proxy', 1);
app.disable('x-powered-by');

/* --------------------------------------------------------- security headers */
// Applied before anything else, so they land on the API, the site and errors
// alike. No dependency: these are eight header writes, and `helmet` would be
// another package to keep patched for the same result.
const CSP = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'self'",
  "form-action 'self'",
  // Vite inlines a module-preload polyfill into index.html, and the JSON-LD
  // blocks are inline too, so 'unsafe-inline' is unavoidable here. The value
  // that remains is the host allow-list: injected script from anywhere else
  // still will not run. googletagmanager / facebook are listed because
  // lib/consentScripts.js loads them once a visitor opts in.
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://connect.facebook.net",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com data:",
  "img-src 'self' data: blob: https:",
  "media-src 'self'",
  "connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com https://connect.facebook.net",
].join('; ');

app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=(), payment=()');
  res.setHeader('X-DNS-Prefetch-Control', 'off');

  // Escape hatch: set CSP=off in .env if a future third-party embed needs a
  // host that isn't listed above and the site has to keep working meanwhile.
  if (process.env.CSP !== 'off') {
    // upgrade-insecure-requests only when we're already on HTTPS. Asserted on
    // a plain-http host — a staging box, an IP address during a migration —
    // it rewrites every asset URL to https and takes the whole site down.
    res.setHeader('Content-Security-Policy', req.secure ? `${CSP}; upgrade-insecure-requests` : CSP);
  }

  // Only meaningful over HTTPS, and sending it over plain HTTP is ignored
  // anyway — but asserting it locally would lock localhost to https for a
  // year in your own browser, which is a genuinely painful mistake to undo.
  if (req.secure) {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  }
  next();
});

/* ------------------------------------------------------------------- CORS */
// Only the site itself may post to the API. In development Vite proxies the
// request so it arrives same-origin; in production the site is served by this
// very process, so it's same-origin again. The list matters for the in-between
// cases — a staging domain, or the site temporarily hosted elsewhere.
const allowed = (process.env.SITE_ORIGIN
  || 'http://localhost:5173,http://localhost:5174,https://dubaifineclean.com,https://www.dubaifineclean.com'
).split(',').map((s) => s.trim()).filter(Boolean);

/**
 * Is this request coming from the very page this server just served?
 *
 * Browsers attach an Origin header to every POST, same-origin included, so a
 * plain allow-list rejects the site's own form whenever the deployed hostname
 * isn't in SITE_ORIGIN — a Hostinger preview domain, www vs bare, a staging
 * subdomain, a different port. Since one process serves both the site and the
 * API, "same host as the request" is by definition our own page, and trusting
 * it means the form works on whatever domain this ends up on.
 */
function isSameOrigin(req) {
  const origin = req.headers.origin;
  if (!origin || !req.headers.host) return false;
  try {
    return new URL(origin).host === req.headers.host;
  } catch {
    return false;               // a malformed Origin is not our page
  }
}

// MOUNTED ON /api ONLY, deliberately. Applied to the whole app it also guards
// the site's own CSS and JS, and Vite marks those tags `crossorigin` — so the
// browser requests them in CORS mode, sends an Origin header for the port the
// site is being served from, and this check 403s the stylesheet. The page then
// loads with no styling and no JavaScript. Static files need no CORS; only the
// API does.
app.use('/api', cors((req, done) => {
  const origin = req.headers.origin;

  // No origin = curl, uptime checks, server-to-server. Allow those.
  const permitted = !origin || isSameOrigin(req) || allowed.includes(origin);

  if (!permitted) return done(new Error(`Origin ${origin} is not allowed`));

  done(null, {
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
  });
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
const distPath = path.join(here, '..', 'dist');

// Vite fingerprints the files it builds — `index-B7xK2p9q.js`. A fingerprinted
// name can never change contents, so it is safe to cache it forever; anything
// without a fingerprint (favicon.svg, robots.txt, og-cover.jpg) has to stay
// re-checkable or a logo change would take a year to reach returning visitors.
const FINGERPRINTED = /-[A-Za-z0-9_-]{8,}\.[a-z0-9]+$/;

/**
 * The paths React Router actually has a page for, read out of the sitemap the
 * build just wrote.
 *
 * Without this every unknown URL answers 200 with the app shell, and Google
 * files /servicse and /contact-us as real pages that happen to look identical
 * to each other — a "soft 404". Reading the sitemap rather than restating the
 * route list here means the two can never disagree: both come from
 * src/data/seo.js.
 */
function knownPaths() {
  try {
    const xml = fs.readFileSync(path.join(distPath, 'sitemap.xml'), 'utf8');
    const locs = xml.match(/<loc>([^<]+)<\/loc>/g) || [];
    return new Set(locs.map((l) => new URL(l.replace(/<\/?loc>/g, '')).pathname.replace(/\/$/, '') || '/'));
  } catch {
    return null;                // no sitemap: fall back to answering 200
  }
}

if (fs.existsSync(distPath)) {
  console.log('✅ dist found — serving the site from this process');

  app.use(express.static(distPath, {
    index: false,               // the catch-all below owns index.html
    setHeaders(res, filePath) {
      const name = path.basename(filePath);
      if (FINGERPRINTED.test(name)) {
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      } else if (name.endsWith('.html')) {
        res.setHeader('Cache-Control', 'no-cache');
      } else {
        // A day in the browser, revalidated after that.
        res.setHeader('Cache-Control', 'public, max-age=86400, must-revalidate');
      }
    },
  }));

  const routes = knownPaths();
  console.log(routes ? `   ${routes.size} routes recognised from sitemap.xml` : '   no sitemap.xml — every path will answer 200');

  // React Router owns every non-API path. Without this, refreshing /contact
  // would 404, because there is no folder on disk called "contact".
  //
  // The shell must never be cached: it carries the <script src> pointing at
  // the current build, and a stale copy asks the browser for JavaScript that
  // the last deploy deleted — a white page that only a hard refresh fixes.
  //
  // Unknown paths get the same shell (so the app renders its own 404 page)
  // but with a 404 status, which is what crawlers read.
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    const clean = req.path.replace(/\/$/, '') || '/';
    const found = !routes || routes.has(clean);
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    return res.status(found ? 200 : 404).sendFile(path.join(distPath, 'index.html'));
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

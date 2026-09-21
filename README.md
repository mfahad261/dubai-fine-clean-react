# Dubai Fine Clean — React / Vite

A premium, animated marketing site for Dubai Fine Clean, built with React + Vite
and React Router. Ported from a static HTML/CSS/JS prototype into a proper
component architecture.

## Run it

```
npm install
npm run dev        # site only, http://localhost:5173
npm run dev:all    # site + the contact-form API together
```

`npm run dev` is enough for design work. Use `dev:all` whenever you're touching
the contact form, or it will have no backend to post to.

## Build and run for real

```
npm run build      # produces dist/
npm start          # serves dist/ AND the API from one Node process
```

## The contact form

The form emails the enquiry to the business and a confirmation to the customer.
It needs the `info@dubaifineclean.com` mailbox password in `server/.env` before
it will send anything — **see [SETUP-EMAIL.md](SETUP-EMAIL.md)**.

Check it's working at any time:

```
npm run mail:check
```

## SEO, titles and the tab icon

Every page's title, description and sitemap weighting lives in
**`src/data/seo.js`** — nowhere else. Each page renders one `<Seo>`
(`src/components/Seo.jsx`) which sets the title, description, canonical,
Open Graph / Twitter tags, the JSON-LD blocks, the address-bar colour and the
favicon, then cleans up after itself on the next route.

The favicon is the brand emblem redrawn at runtime with the current section's
accent colour (`src/lib/favicon.js`), so `/services/water` shows a teal ring
and `/services/air` a blue one — the same logo, distinguishable in a row of
pinned tabs. `public/favicon.svg` is the untinted original, and the PNGs are
the fallback for browsers with no SVG favicon support.

**`public/sitemap.xml`** is generated from `SITEMAP` in `seo.js` — by
`npm run sitemap`, and automatically at the start of every build and dev boot
(the plugin in `vite.config.js`), so it can never drift from the routes the app
serves. Add a service category with its SEO copy and it appears in the sitemap
on the next build. Don't hand-edit it; `server.js` reads that same file back to
know which URLs deserve a 200 and which get a real 404.

To point the site at a different domain, change `SITE.url` in `seo.js` and the
`Sitemap:` line in `public/robots.txt`.

## The logo files

`Logo Design/` is the brand kit as supplied (`.ai`, `.eps`, `.pdf`, `.svg`).
The web-ready set in `src/assets/logo/` is derived from
`Logo Design/Logo White/Logo Design White.svg` — the transparent full-colour
master — cropped to the actual ink so `width`/`height` on an `<img>` is the
true aspect ratio:

| File | Aspect | Used by |
| --- | --- | --- |
| `logo-mark.svg` | 377 × 422 | the header brand mark |
| `logo-full.svg` | 678 × 641 | anything on a light background |
| `logo-white.svg` | 678 × 641 | the footer and the preloader (both navy) |
| `public/favicon.svg` | square | browser tab, manifest, `LocalBusiness` logo |

Use `logo-white.svg` on dark backgrounds. The full-colour wordmark is `#084e8d`
blue, which on the `#0E1B2E` footer is very nearly invisible.

All five are generated — re-run `npm run logos` if the artwork is ever
re-exported, and don't hand-edit them.

## Structure

- `src/data/` — all content (services catalogue, benefits, reviews, FAQs, quote
  pricing engine, business info) lives here, not hardcoded in JSX. Swap in the
  client's real copy/prices by editing these files only.
- `src/data/images.js` — every image import in one place. Drop the client's own
  photography into `src/assets/...` and repoint the path here.
- `src/hooks/` — reusable behaviour: scroll-reveal, pinned nav, the quote
  calculator, the before/after slider drag, animated counters.
- `src/components/` — presentational pieces, each with a paired `.css` file.
- `src/pages/` — route-level screens wired up in `App.jsx` via React Router.
- `src/lib/` — non-visual helpers: the head/meta writer, the favicon builder,
  the JSON-LD builders, the consent-gated script loaders.
- `server/` — the Express backend: one endpoint (`POST /api/contact`) that
  sends the two emails, plus the static serving of `dist/` in production. It is
  the entire deployment — no PHP, no `.htaccess`, no second host. It also sets
  the security headers and the cache policy (fingerprinted assets forever,
  `index.html` never).

## Real business details baked in

Phone: +971 56 916 9761 · WhatsApp: wa.me/971569169761
Empire Heights A, 16F-A-04, Business Bay, Dubai

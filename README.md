# Dubai Fine Clean — React / Vite

A premium, animated marketing site for Dubai Fine Clean, built with React + Vite
and React Router. Ported from a static HTML/CSS/JS prototype into a proper
component architecture.

## Run it

```
npm install
npm run dev
```

## Build

```
npm run build
```

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

## Real business details baked in

Phone: +971 56 916 9761 · WhatsApp: wa.me/971569169761
Empire Heights A, 16F-A-04, Business Bay, Dubai

/**
 * entry-server — renders one route to an HTML string, at build time only.
 * ---------------------------------------------------------------------------
 * Built by `vite build --ssr` and driven by scripts/prerender.mjs, which writes
 * the result into a static HTML file per route. It never runs on the live
 * server and never ships to the browser.
 *
 * The browser still boots with createRoot (src/main.jsx), which replaces this
 * markup with the live app — so nothing here has to hydrate cleanly, and the
 * page looks and behaves exactly as it did. What changes is what a crawler
 * that doesn't run JavaScript receives: the real page instead of an empty
 * <div id="root">.
 */
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import App from './App.jsx'
import { takeHead } from './lib/headSpec.js'

export function render(url) {
  takeHead() // drop anything left over from the previous route
  const html = renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
  )
  return { html, head: takeHead() }
}

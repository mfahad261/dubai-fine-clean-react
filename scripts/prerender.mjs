/**
 * prerender — writes a static HTML file for every route, after the build.
 * ---------------------------------------------------------------------------
 *   npm run build        (runs this as its last step)
 *
 * Why: the site is a single-page app. Without this, every URL answers with
 * the same index.html — the homepage's title, description and canonical, and
 * an empty <div id="root">. Google eventually renders the JavaScript, but Bing,
 * WhatsApp/Facebook link previews and most AI answer engines read only the
 * raw HTML, so to them the site was one page repeated thirteen times, each
 * claiming the homepage as its canonical.
 *
 * What it does, per route in SITEMAP (src/data/seo.js) plus the 404 page:
 *   1. renders the app on the server (dist-ssr/entry-server.js)
 *   2. swaps the default head block in dist/index.html for that route's own
 *      title, description, canonical, robots, OG/Twitter tags and JSON-LD
 *   3. puts the rendered markup inside <div id="root">
 *   4. writes dist/.pages/<route>.html — server/server.js serves it.
 *
 * The folder is dot-prefixed on purpose: express.static ignores dotfiles, so
 * these files are only reachable through their clean URLs, never as a second
 * copy at /.pages/about.html.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { SITEMAP } from '../src/data/seo.js'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const DIST = path.join(ROOT, 'dist')
const OUT = path.join(DIST, '.pages')
const SSR_ENTRY = path.join(ROOT, 'dist-ssr', 'entry-server.js')

const START = '<!--seo:start-->'
const END = '<!--seo:end-->'

const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/** JSON-LD inside <script>: escape "<" so a "</script>" in copy can't end the tag. */
const ld = (block) => JSON.stringify(block).replace(/</g, '\\u003c')

function headHtml(spec) {
  // The 404 file answers every unknown URL, so it has no address of its own to
  // declare — a noindex page goes without a canonical rather than a made-up one.
  const indexable = !spec.robots.includes('noindex')
  const lines = [
    `<title>${esc(spec.title)}</title>`,
    `<meta name="description" content="${esc(spec.description)}" />`,
    ...(indexable ? [`<link rel="canonical" href="${esc(spec.url)}" />`] : []),
    `<meta name="robots" content="${esc(spec.robots)}" />`,
    `<meta name="theme-color" content="${esc(spec.themeColor)}" />`,
    ...Object.entries(spec.og).filter(([k, v]) => v && (indexable || k !== 'og:url')).map(([k, v]) => `<meta property="${k}" content="${esc(v)}" />`),
    ...Object.entries(spec.twitter).filter(([, v]) => v).map(([k, v]) => `<meta name="${k}" content="${esc(v)}" />`),
    ...spec.jsonLd.map((b) => `<script type="application/ld+json" data-seo-jsonld>${ld(b)}</script>`),
  ]
  return lines.map((l) => `    ${l}`).join('\n')
}

/** "/" -> index.html, "/services/air" -> services/air.html */
const fileFor = (route) => (route === '/' ? 'index.html' : `${route.replace(/^\//, '')}.html`)

async function main() {
  const template = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8')
  if (!template.includes(START) || !template.includes(END)) {
    throw new Error(`dist/index.html is missing the ${START} … ${END} markers`)
  }
  if (!template.includes('<div id="root"></div>')) {
    throw new Error('dist/index.html has no empty <div id="root"></div> to fill')
  }

  const { render } = await import(pathToFileURL(SSR_ENTRY).href)

  const routes = [
    ...SITEMAP.map((r) => ({ url: r.path, file: fileFor(r.path) })),
    // Served with a 404 status for every unknown URL; carries noindex.
    { url: '/__not-found__', file: '404.html' },
  ]

  fs.rmSync(OUT, { recursive: true, force: true })

  for (const { url, file } of routes) {
    const { html, head } = render(url)
    if (!head) throw new Error(`${url}: no <Seo> rendered, so there is no head to write`)

    const page = template
      .replace(new RegExp(`${START}[\\s\\S]*?${END}`), `${START}\n${headHtml(head)}\n    ${END}`)
      .replace('<div id="root"></div>', `<div id="root">${html}</div>`)

    const dest = path.join(OUT, file)
    fs.mkdirSync(path.dirname(dest), { recursive: true })
    fs.writeFileSync(dest, page, 'utf8')
    console.log(`  prerendered ${url.padEnd(26)} -> dist/.pages/${file}  (${Math.round(page.length / 1024)} KB)`)
  }

  // The SSR bundle was only needed for this step.
  fs.rmSync(path.join(ROOT, 'dist-ssr'), { recursive: true, force: true })
}

main().catch((err) => {
  console.error('prerender failed:', err)
  process.exit(1)
})

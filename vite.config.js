import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { writeSitemap } from './scripts/build-sitemap.mjs'

/**
 * Refreshes public/sitemap.xml before each build (and on boot in dev), so the
 * committed file can never drift from the routes the app actually serves. Add
 * a service category to data/seo.js and it appears in the sitemap next build —
 * nobody has to remember to hand-edit XML.
 *
 * It writes into public/ rather than emitting straight into dist/ so the file
 * is a real one you can open and commit; Vite copies public/ into the build,
 * and the dev server already serves it at /sitemap.xml.
 */
function sitemap() {
  return {
    name: 'dfc-sitemap',
    // buildStart runs before Vite copies publicDir, so the fresh file ships.
    buildStart() {
      writeSitemap({ quiet: true })
    },
    configureServer() {
      writeSitemap({ quiet: true })
    },
  }
}

export default defineConfig({
  plugins: [react(), sitemap()],

  build: {
    // Safari 14 / iOS 14 are still a real slice of Dubai traffic.
    target: 'es2019',
    cssTarget: 'chrome80',
    sourcemap: false,
    // The site is photograph- and video-heavy; inlining anything larger than
    // 4 KB only bloats the JS that has to parse before first paint.
    assetsInlineLimit: 4096,
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        // React, ReactDOM, the scheduler and the router ship as ONE chunk on
        // purpose. Split further and Rollup can order the chunks so react-dom
        // initialises before react does. Everything else in node_modules
        // (lenis) goes to a second long-cached chunk.
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined
          if (/[\\/]node_modules[\\/](react|react-dom|scheduler|react-router|react-router-dom)[\\/]/.test(id)) {
            return 'react'
          }
          return 'vendor'
        },
      },
    },
  },

  server: {
    // Sends /api/* to the Express server during development, so the browser
    // sees one origin and there are no CORS surprises while you're building.
    // In production this proxy is irrelevant — server/server.js serves the
    // built site and the API from the same process, so they're already one
    // origin. Keep this port in step with PORT in server/.env.
    proxy: {
      '/api': {
        target: 'http://localhost:5175',
        changeOrigin: true,
      },
    },
  },
})

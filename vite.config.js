import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
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

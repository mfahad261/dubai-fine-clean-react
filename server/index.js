/**
 * server — the Express app behind the contact form.
 * ---------------------------------------------------------------------------
 * Run it:      npm run server
 * Run both:    npm run dev:all   (site + server together)
 * Check email: npm run mail:check
 *
 * The whole backend is one endpoint. It is kept separate from the site build
 * so the front end can still be deployed as static files anywhere, with this
 * pointed at from a different host if that's easier.
 */
import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import contactRoute from './routes/contact.js'
import { verifyTransport } from './lib/mailer.js'

const app = express()
const PORT = Number(process.env.PORT || 5175)

// Only the site itself may post here. In development Vite proxies the request
// so it arrives same-origin; in production set SITE_ORIGIN to the real domain.
const allowed = (process.env.SITE_ORIGIN || 'http://localhost:5173,http://localhost:5174')
  .split(',').map((s) => s.trim()).filter(Boolean)

app.use(cors({
  origin(origin, cb) {
    // No origin = curl, health checks, same-origin requests. Allow those.
    if (!origin || allowed.includes(origin)) return cb(null, true)
    cb(new Error(`Origin ${origin} is not allowed`))
  },
}))

// A contact form has no business posting a megabyte.
app.use(express.json({ limit: '32kb' }))

app.get('/api/health', async (_req, res) => {
  let mail = 'unknown'
  try {
    await verifyTransport()
    mail = 'ok'
  } catch (err) {
    mail = `not configured — ${err.message.split('\n')[0]}`
  }
  res.json({ ok: true, mail, time: new Date().toISOString() })
})

app.use('/api', contactRoute)

// Anything unexpected must not leak a stack trace to the browser.
app.use((err, _req, res, _next) => {
  console.error('[server]', err.message)
  res.status(500).json({ ok: false, error: 'Something went wrong. Please call us on +971 56 916 9761.' })
})

app.listen(PORT, () => {
  console.log(`\n  Dubai Fine Clean API`)
  console.log(`  listening on http://localhost:${PORT}`)
  console.log(`  health check  http://localhost:${PORT}/api/health`)
  console.log(`  allowed origins: ${allowed.join(', ')}\n`)
  if (!process.env.SMTP_USER) {
    console.warn('  ⚠  No SMTP_USER set — email will fail until you create .env')
    console.warn('     See SETUP-EMAIL.md\n')
  }
})

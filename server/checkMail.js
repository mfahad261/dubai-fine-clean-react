/**
 * mail:check — confirms the SMTP credentials work, without sending anything.
 * Run this first when setting up; it tells you whether the app password is
 * right before you start wondering why the form is silent.
 */
import 'dotenv/config'
import { verifyTransport } from './lib/mailer.js'

try {
  await verifyTransport()
  console.log('\n  ✓ Email is configured correctly.')
  console.log(`    Sending as: ${process.env.SMTP_USER}`)
  console.log(`    Enquiries go to: ${process.env.MAIL_TO || process.env.SMTP_USER}\n`)
  process.exit(0)
} catch (err) {
  console.error('\n  ✗ Email is NOT working.\n')
  console.error(`    ${err.message}\n`)
  if (/Invalid login|Username and Password not accepted|BadCredentials/i.test(err.message)) {
    console.error('    That usually means the app password is wrong, or you used your normal')
    console.error('    Google password instead of a 16-character app password.')
    console.error('    See SETUP-EMAIL.md, step 2.\n')
  }
  process.exit(1)
}

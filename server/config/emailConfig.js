/**
 * emailConfig — the Hostinger SMTP transporter.
 * ---------------------------------------------------------------------------
 * One transporter, shared by everything that sends mail. Nodemailer pools the
 * connection, so creating it once here rather than per request is both faster
 * and kinder to Hostinger's connection limits.
 *
 * Every value comes from server/.env — no address, host or password is written
 * into the code. See SETUP-EMAIL.md for where those values come from.
 */
const path = require('path');
const nodemailer = require('nodemailer');

require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const {
  EMAIL_HOST = 'smtp.hostinger.com',
  EMAIL_PORT = '465',
  EMAIL_USER,
  EMAIL_PASS,
} = process.env;

const port = parseInt(EMAIL_PORT, 10);

const transporter = nodemailer.createTransport({
  host: EMAIL_HOST,
  port,
  secure: port === 465,          // 465 = implicit TLS, 587 = STARTTLS

  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },

  // Same as the previous site's working setup. The connection is still
  // encrypted; this only skips certificate checking, which some Hostinger
  // accounts need.
  tls: { rejectUnauthorized: false },

  // Don't let a hung SMTP connection hold a customer's request open forever.
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 20000,
});

/**
 * Confirms the credentials actually work. Called on boot for a clear log line,
 * and by `npm run mail:check` on its own.
 */
async function verifyTransporter() {
  if (!EMAIL_USER || !EMAIL_PASS) {
    throw new Error(
      'Email is not configured. Copy server/.env.example to server/.env and fill in '
      + 'EMAIL_USER and EMAIL_PASS. See SETUP-EMAIL.md.',
    );
  }
  await transporter.verify();
  return true;
}

// Exported as a plain object, NOT as `module.exports = transporter`. Hanging
// extra properties off the nodemailer instance gives it a reference back to
// itself, and the option-merging inside .verify() then recurses until the
// stack blows — with the unhelpful message "Maximum call stack size exceeded".
module.exports = { transporter, verifyTransporter };

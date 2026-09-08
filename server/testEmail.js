/**
 * testEmail — proves the mailbox works, before a real customer tries it.
 * ---------------------------------------------------------------------------
 *   npm run mail:check          verify the login only, send nothing
 *   npm run mail:check -- send  also send a real test enquiry to the inbox
 *
 * NOTE: the credentials come from server/.env. Never paste a password into
 * this file — anything written here can end up in git, in a screenshot, or in
 * a chat window, and a mailbox password that leaks gets used to send spam in
 * your domain's name within hours.
 */
const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '.env') });

const { transporter, verifyTransporter } = require('./config/emailConfig');
const { businessEmail } = require('./utils/templates');

const shouldSend = process.argv.includes('send');

async function main() {
  console.log('\n  Checking the Hostinger mailbox…\n');
  console.log(`  host   ${process.env.EMAIL_HOST || '(not set)'}:${process.env.EMAIL_PORT || '(not set)'}`);
  console.log(`  user   ${process.env.EMAIL_USER || '(not set)'}`);
  console.log(`  pass   ${process.env.EMAIL_PASS ? `set (${process.env.EMAIL_PASS.length} characters)` : 'NOT SET'}`);
  console.log(`  to     ${process.env.RECEIVER_EMAIL || process.env.EMAIL_USER || '(not set)'}\n`);

  await verifyTransporter();
  console.log('  ✅ Logged in successfully — the credentials are correct.\n');

  if (!shouldSend) {
    console.log('  Nothing was sent. Run `npm run mail:check -- send` to send a real test.\n');
    return;
  }

  // A realistic enquiry, so the test exercises the same template a real
  // submission would — not a bare "hello" that proves less.
  const sample = {
    name: 'Self test',
    mobile: '+971 50 000 0000',
    email: process.env.EMAIL_USER,
    community: 'Business Bay',
    type: 'Apartment',
    size: '2 bedrooms',
    notes: 'Automatic test from `npm run mail:check -- send`. If this is in the '
      + 'inbox, the contact form will work.',
    services: ['Deep clean', 'Move-in clean'],
  };

  const mail = businessEmail(sample);
  const to = process.env.RECEIVER_EMAIL || process.env.EMAIL_USER;

  const result = await transporter.sendMail({
    from: `"Dubai Fine Clean" <${process.env.EMAIL_USER}>`,
    to,
    subject: `[TEST] ${mail.subject}`,
    html: mail.html,
    text: mail.text,
  });

  console.log(`  ✅ Test email sent to ${to}`);
  console.log(`     message id: ${result.messageId}`);
  console.log('     Check the inbox — and the spam folder, just in case.\n');
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('\n  ❌ Email is NOT working.\n');
    console.error(`     ${err.message}\n`);

    if (/Invalid login|Username and Password not accepted|BadCredentials|535/i.test(err.message)) {
      console.error('     That usually means EMAIL_USER is not the FULL address');
      console.error('     (info@dubaifineclean.com, not just "info"), or EMAIL_PASS');
      console.error('     does not match the password set in hPanel → Emails.\n');
    } else if (/ENOTFOUND|ETIMEDOUT|ECONNREFUSED|EAI_AGAIN/i.test(err.message)) {
      console.error('     The mail server could not be reached. Check EMAIL_HOST is');
      console.error('     smtp.hostinger.com and that your network is not blocking');
      console.error('     port 465 — some office and hotel wifi does.\n');
    }

    console.error('     Full walkthrough: SETUP-EMAIL.md\n');
    process.exit(1);
  });

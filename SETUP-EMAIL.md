# Getting the contact form sending email

Fifteen minutes, start to finish. You need a Gmail account and nothing else.

**Do not send me the password.** It goes in a file on your own machine. If it
ever appears in a chat, an email, or a screenshot, treat it as burned and
generate a new one — it takes thirty seconds.

---

## What happens when someone submits the form

Two emails go out:

1. **To you** — the enquiry itself: name, number, property, what they need.
   Hitting *reply* answers the customer directly, because Reply-To is set to
   their address.
2. **To them** — a confirmation saying it arrived and you'll be in touch,
   with your phone number and a WhatsApp button.

If the customer leaves the email field blank, only email 1 is sent. If email 2
fails for any reason, the form still reports success — because the enquiry
*did* reach you, and telling them it failed would only make them send it twice.

---

## Step 1 — Turn on 2-Step Verification

Google will not issue an app password without it.

1. Go to **https://myaccount.google.com/security**
2. Find **2-Step Verification** → turn it on, follow the prompts

Already on? Skip to step 2.

---

## Step 2 — Create an app password

This is a 16-character password that only this website can use. It is **not**
your Google password, and it can be revoked on its own without changing
anything else.

1. Go to **https://myaccount.google.com/apppasswords**
   (if that page says it's unavailable, 2-Step Verification isn't fully on yet)
2. Under **App name**, type: `Dubai Fine Clean website`
3. Click **Create**
4. Google shows you 16 characters in four groups, like `abcd efgh ijkl mnop`

**Copy it now** — Google will not show it again. Losing it isn't a disaster;
you just delete that entry and make another.

---

## Step 3 — Create your `.env` file

In the project folder there's a file called **`.env.example`**.

1. Make a copy of it in the same folder
2. Rename the copy to exactly **`.env`** — no `.txt`, no other name
3. Open it in VS Code and fill it in:

```
SMTP_USER=youraccount@gmail.com
SMTP_PASS=abcd efgh ijkl mnop
MAIL_TO=where-enquiries-should-land@gmail.com
MAIL_FROM="Dubai Fine Clean" <youraccount@gmail.com>
SITE_ORIGIN=http://localhost:5173
PORT=5175
```

- `SMTP_USER` — the Gmail account doing the sending
- `SMTP_PASS` — the 16 characters from step 2 (spaces are fine)
- `MAIL_TO` — where enquiries arrive. Leave it blank to use `SMTP_USER`
- `MAIL_FROM` — what the customer sees in their inbox

`.env` is already in `.gitignore`, so it can never be committed by accident.

---

## Step 4 — Check it works

```
npm install
npm run mail:check
```

You want:

```
  ✓ Email is configured correctly.
```

If instead you get **"Invalid login"** or **"Username and Password not
accepted"**, it's almost always one of these:

| What went wrong | Fix |
|---|---|
| Used your normal Google password | Go back to step 2 — it must be the 16-character app password |
| Copied it with a character missing | Delete the app password in Google, create a fresh one |
| 2-Step Verification isn't actually on | Finish step 1 properly |
| Typo in the email address | Check `SMTP_USER` |

---

## Step 5 — Run it

Two things need to run: the website and the email server.

```
npm run dev:all
```

That starts both at once. Or in two terminals:

```
npm run dev       # the website  → http://localhost:5173
npm run server    # the email API → http://localhost:5175
```

Go to **http://localhost:5173/contact**, fill the form in with your own email
address, and submit. Both emails should arrive within a few seconds.

**Check the spam folder the first time.** Gmail is often suspicious of the very
first automated message from an account. Mark it *Not spam* and later ones
behave.

---

## When you go live

Three things change:

1. **`SITE_ORIGIN`** — add the real domain, so only your own site can use the
   endpoint:
   ```
   SITE_ORIGIN=https://dubaifineclean.com,https://www.dubaifineclean.com
   ```
2. **The API must be running.** The website is static files, but the email
   endpoint is a Node server. Either:
   - keep `npm run server` alive on a VPS with `pm2`, **or**
   - deploy to Vercel or Netlify, which will use `api/contact.js` instead —
     it's already written, does the same job, and needs no server to babysit.
     Put the same values from `.env` into the host's environment-variables
     screen.
3. **Consider moving off Gmail.** See below.

---

## About Gmail, honestly

You picked Gmail and it will work. Two things worth knowing:

**Deliverability.** Gmail wasn't built for automated sending. Confirmation
emails to customers land in spam noticeably more often than with a dedicated
service. For an enquiry confirmation that's a real cost — the customer wonders
whether it went through.

**Volume.** Roughly 500 messages a day. Each enquiry sends two, so about 250
enquiries daily. Nowhere near a problem now; worth remembering if the business
grows.

**Switching later needs no code changes.** The provider is read entirely from
`.env`. Moving to Resend, for example, is three lines:

```
SMTP_HOST=smtp.resend.com
SMTP_PORT=465
SMTP_USER=resend
SMTP_PASS=your_resend_api_key
```

Brevo and SendGrid are the same shape — the values are in `.env.example`.

---

## What protects the form

- **Honeypot** — a hidden field people never see and bots usually fill. Anything
  arriving with it set is silently discarded, and the bot is told it succeeded so
  it doesn't retry another way.
- **Rate limit** — five submissions per connection per ten minutes, so nobody
  can drain your daily allowance in a minute.
- **Server-side validation** — every rule is enforced on the server, not just in
  the browser. Anyone can post to this endpoint with one command; the form's own
  checks protect nobody.
- **Escaped output** — a name like `<script>…</script>` is displayed as text in
  your inbox rather than running as code.
- **Header sanitising** — newlines are stripped from anything used in an email
  header, which is how header-injection attacks smuggle in extra recipients.
- **Size cap** — requests over 32 KB are rejected outright.

---

## Files, and what each does

```
server/
  index.js             the Express app — start with `npm run server`
  checkMail.js         `npm run mail:check` — tests credentials, sends nothing
  routes/contact.js    POST /api/contact — the endpoint itself
  lib/mailer.js        SMTP connection, provider read from .env
  lib/templates.js     the two emails, HTML and plain text
  lib/validate.js      input rules, HTML escaping, header sanitising
  lib/rateLimit.js     the per-connection throttle

api/
  contact.js           the same logic for Vercel/Netlify. Use this OR the
                       server above — never both at once.

.env                   your secrets. Never committed.
.env.example           the template to copy.
```

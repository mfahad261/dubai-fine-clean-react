# Getting the contact form sending email

About twenty minutes, start to finish. You need your Hostinger login and
nothing else.

**Do not send the mailbox password to anyone.** It goes in a file on your own
machine. If it ever appears in a chat, an email, or a screenshot, treat it as
burned and change it in hPanel — it takes thirty seconds.

---

## What happens when someone submits the form

Two emails go out:

1. **To you** — the enquiry itself: name, number, property, community, what
   they need. Hitting *reply* answers the customer directly, because Reply-To
   is set to their address.
2. **To them** — a confirmation saying it arrived and you'll be in touch, with
   your phone number and a WhatsApp button.

The email field is **required** on the form, precisely so email 2 can always be
sent. If email 2 fails anyway — they typo'd the address, their mail server
rejects it — the form still reports success, because the enquiry *did* reach
you, and telling them it failed would only make them send it twice.

---

## Step 1 — Create the mailbox

1. Log in to **hPanel** → **Emails**
2. Pick **dubaifineclean.com** → **Manage**
3. **Create email account**
   - Address: `info`  (so the full address is `info@dubaifineclean.com`)
   - Password: generate a strong one and **save it in your password manager**
4. Click **Create**

Give it two or three minutes to become active before testing.

### Check the sending details

Still on that page, open **Configuration settings** → **Manual configuration**.
You should see:

| Setting          | Value                  |
| ---------------- | ---------------------- |
| SMTP host        | `smtp.hostinger.com`   |
| SMTP port        | `465`                  |
| Encryption       | SSL                    |
| Username         | `info@dubaifineclean.com` |

If your plan uses **Titan Email** instead, the host is `smtp.titan.email` —
same port, same everything else. Use whatever that page actually shows.

---

## Step 2 — Put the password in `server/.env`

There is already a file at **`server/.env`**. Open it in a text editor and put
the mailbox password after `EMAIL_PASS=`, **wrapped in double quotes**:

```
EMAIL_PASS="YourMailboxPasswordHere"
```

**The quotes matter.** In a `.env` file a `#` starts a comment, so an unquoted
`EMAIL_PASS=abc#123` is silently read as just `abc` — and the login then fails
with a `535` that looks exactly like a wrong password. Quoting also protects
spaces and any other punctuation. It costs nothing when the password is plain,
so always use them.

That's the only line you need to change. If the file is missing, copy
`server/.env.example` to `server/.env` and fill in the same field.

**`server/.env` is git-ignored** — it will never be committed, and it is the
only place the password exists.

---

## Step 3 — Prove it works

```
npm install
npm run mail:check
```

That logs in to the mailbox without sending anything. You want:

```
✅ Logged in successfully — the credentials are correct.
```

Then send yourself a real test:

```
npm run mail:check -- send
```

Check `info@dubaifineclean.com` — **including the spam folder**. A brand-new
domain's first few emails often land there until the domain builds a
reputation. See "Staying out of spam" below.

### If it fails

| Message | What it means |
| --- | --- |
| `Invalid login` / `535` | The password is wrong, or `EMAIL_USER` isn't the **full** address. It must be `info@dubaifineclean.com`, not `info`. |
| `ENOTFOUND` / `ETIMEDOUT` | Can't reach the mail server. Check `EMAIL_HOST`. Some office, hotel and cafe wifi blocks port 465 — try a phone hotspot. |
| `Mailbox not found` | The account isn't active yet. Wait a few minutes. |

---

## Step 4 — Try the real form

```
npm run dev:all
```

That runs the site on **http://localhost:5173** and the API on **:5175** side
by side. Open the site, go to **/contact**, and submit a real enquiry using
your own email address as the customer.

You should get **two** emails: the enquiry, and the confirmation.

---

## Step 5 — Deploy to Hostinger

This is a **Node.js app**, not a static site. One process serves both the
website and the form.

1. In hPanel, make sure the plan has **Node.js** available
   (Hostinger Cloud/VPS, or the Node.js app option on Business plans)
2. Build the site: `npm run build`
3. Upload the project — you need `dist/`, `server/`, `package.json` and
   `package-lock.json`. You do **not** need `src/`, `public/` or `node_modules`.
4. On the server, run `npm install --omit=dev`
5. Set the Node app's **startup file** to `server/server.js`
6. Recreate `server/.env` on the server with the same values, and add:
   ```
   NODE_ENV=production
   ```
   Leave `PORT` out — Hostinger assigns it.
7. Start the app

Visit `https://dubaifineclean.com/api/health`. You want:

```json
{ "ok": true, "mail": "ok" }
```

If `mail` says anything else, the password on the server is wrong.

> **Why no `.htaccess`?** Because `server/server.js` serves the built site
> itself and hands every unknown path to `index.html`. That's what makes
> refreshing `/contact` work instead of 404ing. There's nothing for Apache to
> do.

---

## Staying out of spam

Do these once, in hPanel → **Emails** → **DNS settings** (or **Advanced** →
**DNS zone editor**). They tell the world that Hostinger is allowed to send
email for your domain — without them, Gmail treats your confirmations as
suspicious.

- **SPF** — Hostinger adds this automatically when you create the mailbox.
  Confirm a TXT record exists containing `v=spf1 include:_spf.mail.hostinger.com ~all`
- **DKIM** — enable it on the Emails page if it isn't already. This is the one
  that matters most.
- **DMARC** — add a TXT record named `_dmarc` with value
  `v=DMARC1; p=none; rua=mailto:info@dubaifineclean.com`

Then send a test to a Gmail address and check it arrives in the inbox. If it
lands in spam, open it and click **Not spam** — and check DKIM is actually on.

---

## Changing where enquiries land

In `server/.env`:

```
RECEIVER_EMAIL=whoever@wherever.com
```

Leave it blank to send them to `EMAIL_USER`. Restart the app after changing it.

**Do not** change `EMAIL_USER` to a Gmail address to "send from Gmail" — the
password there is the Hostinger mailbox password, and Gmail won't accept it.
Sending stays on `info@dubaifineclean.com`; only the destination changes.

---

## Where everything lives

```
server/
├── server.js                       the Express app; also serves the built site
├── .env                            the password (git-ignored)
├── .env.example                    the template
├── testEmail.js                    npm run mail:check
├── config/emailConfig.js           the SMTP connection
├── controllers/emailController.js  what happens on submit — the two emails
├── routes/emailRoutes.js           POST /api/contact
├── middleware/errorHandler.js      turns crashes into a polite message
└── utils/
    ├── validate.js                 server-side checks; never trust the browser
    ├── templates.js                the HTML of both emails
    └── rateLimit.js                stops one bot burning the sending quota
```

The form itself is `src/components/ContactForm.jsx`.

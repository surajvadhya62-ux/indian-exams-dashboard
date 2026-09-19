# Setting up Google Sign-In — one-time, about 5 minutes

**Who this is for:** you, the owner. No coding involved — this is entirely
clicking through Google's own website, the same way you'd register for any
online service.

**What this actually does:** the site already lets a visitor "sign in" by
typing a name and email into a form — nothing checks that email is real. This
adds a genuine "Sign in with Google" button next to that form, so a visitor
can click once and have their real Google name, email and photo filled in
automatically. There is still no server behind this site (see HANDOFF.md §1)
— it's the same local browser vault as before, just identified properly.

---

## Step 1 — Open Google Cloud Console

Go to **console.cloud.google.com** and sign in with whichever Google account
you want this tied to (your own is fine — it doesn't have to be a special
"business" account).

## Step 2 — Create a project

If you don't already have one, click the project dropdown at the top of the
page → **New Project**. Name it something like `IndiaExams Dashboard`. Click
**Create** and wait a few seconds for it to finish.

## Step 3 — Set up the "consent screen"

This is the one-line description Google shows a visitor before they sign in.
In the left sidebar: **APIs & Services → OAuth consent screen**.

- User type: **External** (this lets anyone with a Google account sign in,
  not just people inside an organisation you own)
- App name: `IndiaExams` (or whatever you'd like visitors to see)
- User support email: your email
- Developer contact email: your email
- Leave everything else on its default and click through to **Save and
  Continue** on each remaining screen. You do not need to add scopes or test
  users for this — the app only asks for name/email/photo, which needs no
  special approval.

## Step 4 — Create the Client ID

Left sidebar: **APIs & Services → Credentials → + Create Credentials → OAuth
client ID**.

- Application type: **Web application**
- Name: `IndiaExams site` (just a label for you)
- **Authorized JavaScript origins** — add both of these, one per line:
  - `https://surajvadhya62-ux.github.io` (the live site)
  - `http://localhost:5173` (so it also works when testing on your own Mac)
- Leave "Authorized redirect URIs" empty — this flow doesn't use one.
- Click **Create**.

A box pops up with your **Client ID** — a long string ending in
`.apps.googleusercontent.com`. Copy it.

## Step 5 — Paste it in

Open `src/config/googleAuth.js` and replace the placeholder line with your
real Client ID:

```js
export const GOOGLE_CLIENT_ID = 'paste-your-real-id-here.apps.googleusercontent.com'
```

Save, commit, and push (or hand the Client ID to Claude and it'll do this
step). Once it's live, the "Sign in with Google" button appears on the
sign-in screen automatically — nothing else needs to change.

## If something looks wrong later

- **Button doesn't appear at all:** the placeholder is probably still in
  `googleAuth.js` — the button intentionally hides itself until a real
  Client ID is set (see the comment in that file).
- **Button appears but clicking it does nothing / shows an error about
  "origin":** the site's exact URL doesn't match what you typed in Step 4.
  Re-check for a typo, and that there's no trailing slash after
  `.github.io`.
- **This isn't a password reset flow.** There's no password stored anywhere
  for this to reset — signing in again with the same Google account always
  works.

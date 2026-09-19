// Google Sign-In integration.
//
// This site has no backend — bookmarks and the study vault (AuthModal.jsx) live
// only in the browser's localStorage. Google Sign-In here does exactly the same
// job the existing name/email form already did: identify who is using this
// browser, so their name, email and photo can be shown and their vault
// exported/restored under their own identity. It is NOT used to protect any
// server-side data, because there is none. The ID token Google returns is
// decoded directly in the browser rather than cryptographically verified
// against a backend — that verification step exists to stop someone forging a
// login to a *protected resource*, and there is no protected resource here to
// forge access to. Decoding it client-side is the correct, honest scope for
// what this site actually needs it for; don't "upgrade" this into pretending
// there's a security boundary that doesn't exist.

import { GOOGLE_CLIENT_ID } from '../config/googleAuth'

const GSI_SCRIPT_SRC = 'https://accounts.google.com/gsi/client'

let scriptLoadPromise = null
let hasInitialized = false
let latestOnCredential = null

export function isGoogleSignInConfigured() {
  return Boolean(GOOGLE_CLIENT_ID) && !GOOGLE_CLIENT_ID.includes('YOUR_CLIENT_ID')
}

function loadGoogleScript() {
  if (scriptLoadPromise) return scriptLoadPromise

  scriptLoadPromise = new Promise((resolve, reject) => {
    if (window.google?.accounts?.id) {
      resolve(window.google)
      return
    }

    const existing = document.querySelector(`script[src="${GSI_SCRIPT_SRC}"]`)
    const script = existing || document.createElement('script')

    if (!existing) {
      script.src = GSI_SCRIPT_SRC
      script.async = true
      script.defer = true
      document.head.appendChild(script)
    }

    script.addEventListener('load', () => {
      if (window.google?.accounts?.id) resolve(window.google)
      else reject(new Error('Google Identity Services script loaded but window.google.accounts.id is missing'))
    })
    script.addEventListener('error', () => reject(new Error('Failed to load Google Identity Services script')))
  })

  return scriptLoadPromise
}

/**
 * Decode the ID token Google returns into the plain fields this app already
 * uses for a user profile. Not cryptographically verified — see the file
 * header for why that's the right call here, not an oversight.
 */
export function decodeGoogleCredential(credential) {
  const payloadB64 = credential.split('.')[1]
  const json = decodeURIComponent(
    atob(payloadB64.replace(/-/g, '+').replace(/_/g, '/'))
      .split('')
      .map((c) => '%' + c.charCodeAt(0).toString(16).padStart(2, '0'))
      .join('')
  )
  const payload = JSON.parse(json)

  return {
    id: `usr_google_${payload.sub}`,
    name: payload.name || payload.email?.split('@')[0] || 'Aspirant',
    email: payload.email,
    picture: payload.picture || null,
    targetExam: 'UPSC Civil Services Examination (UPSC CSE)',
    targetYear: '2025-2026',
    joinedAt: new Date().toISOString(),
    authProvider: 'google',
  }
}

/**
 * Initializes Google Identity Services and renders the standard "Sign in with
 * Google" button into `container`. Calls `onCredential(decodedProfile)` once
 * the person signs in. Calls `onUnavailable(reason)` instead of rendering
 * anything if no Client ID has been configured yet, or the script fails to
 * load (e.g. offline, or blocked by the browser) — never throws.
 */
export async function renderGoogleSignInButton(container, { onCredential, onUnavailable, theme = 'outline' } = {}) {
  if (!container) return

  if (!isGoogleSignInConfigured()) {
    onUnavailable?.('not_configured')
    return
  }

  try {
    const google = await loadGoogleScript()

    // initialize() is a global, one-time registration — calling it again
    // on every mount (e.g. the auth modal closing and reopening) logs
    // Google's own "called multiple times" warning and re-registers a
    // callback pointing at a stale render's closures. The indirection
    // through `latestOnCredential` lets renderButton() below still be
    // called fresh every time (it has to be — the container element
    // itself is a new DOM node each mount) while initialize() itself
    // only ever runs once per page load.
    latestOnCredential = onCredential
    if (!hasInitialized) {
      google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: (response) => latestOnCredential?.(decodeGoogleCredential(response.credential)),
        auto_select: false,
      })
      hasInitialized = true
    }

    google.accounts.id.renderButton(container, {
      type: 'standard',
      theme,
      size: 'large',
      shape: 'pill',
      text: 'signin_with',
      logo_alignment: 'left',
      width: 320,
    })
  } catch (err) {
    console.warn('Google Sign-In unavailable:', err)
    onUnavailable?.('load_failed')
  }
}

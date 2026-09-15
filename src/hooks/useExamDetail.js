import { useEffect, useState } from 'react'

/**
 * Fetches a per-exam dossier from public/exam-details/<id>.json, on demand,
 * when a component first asks for it — rather than exams.json growing to
 * carry this data as part of the bundle.
 *
 * Status values:
 *   'loading'   - fetch in flight
 *   'ready'     - detail file found and parsed
 *   'not_found' - no file yet for this exam (the expected, common state for
 *                 every exam that hasn't been researched yet — not an error)
 *   'error'     - a genuine network failure, distinct from not_found so the
 *                 UI can say "couldn't load" rather than "not authored"
 *
 * A missing file does NOT reliably 404: both the Vite dev server and this
 * project's Netlify config (`/* -> /index.html`, status 200) rewrite any
 * unmatched path to the app shell rather than returning a real 404. So a
 * missing detail file comes back as a 200 whose body is index.html, not
 * JSON — that's treated as 'not_found' too (detected by checking the
 * response looks like JSON before trusting it), not as an 'error'.
 *
 * Cached per exam id for the life of the page, so reopening the same
 * exam's modal in one session never re-fetches.
 */

const cache = new Map() // id -> { status: 'ready' | 'not_found', detail }

export function useExamDetail(id) {
  const cached = cache.get(id)
  const [state, setState] = useState(() =>
    cached ? { status: cached.status, detail: cached.detail } : { status: 'loading', detail: null }
  )

  useEffect(() => {
    if (!id) return
    const existing = cache.get(id)
    if (existing) {
      setState({ status: existing.status, detail: existing.detail })
      return
    }

    let cancelled = false
    setState({ status: 'loading', detail: null })

    const url = `${import.meta.env.BASE_URL}exam-details/${id}.json`

    fetch(url)
      .then(async (res) => {
        if (res.status === 404) return { notFound: true }
        if (!res.ok) throw new Error(`Unexpected status ${res.status}`)

        // A SPA catch-all rewrite (Netlify's `/* -> /index.html`, or Vite
        // dev's history fallback) answers a missing file with a 200 whose
        // body is the app's HTML shell, not JSON. Checking the
        // content-type catches the common case cheaply; actually trying
        // to parse catches it even if a server ever mislabels the type.
        const contentType = res.headers.get('content-type') || ''
        if (!contentType.includes('json')) return { notFound: true }

        try {
          return await res.json()
        } catch {
          return { notFound: true }
        }
      })
      .then((data) => {
        if (cancelled) return
        if (data && data.notFound) {
          cache.set(id, { status: 'not_found', detail: null })
          setState({ status: 'not_found', detail: null })
        } else {
          cache.set(id, { status: 'ready', detail: data })
          setState({ status: 'ready', detail: data })
        }
      })
      .catch(() => {
        if (cancelled) return
        // A real network failure (offline, DNS, CORS) rejects the fetch
        // promise itself and lands here — not cached, so a transient
        // failure can be retried by simply reopening the modal.
        setState({ status: 'error', detail: null })
      })

    return () => { cancelled = true }
  }, [id])

  return state
}

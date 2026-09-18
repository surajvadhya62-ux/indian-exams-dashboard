#!/usr/bin/env node

/**
 * portal-watch.mjs
 *
 * Watches the notice boards of the conducting authorities in sources-config.json and reports
 * what is NEW since the last run.
 *
 * Deliberately does no interpretation: it records the set of notice links each portal is
 * displaying, diffs that against the previous run, and writes the additions to a review log.
 * Deciding whether a new notice represents a genuinely new exam is left to a human (or, later,
 * to a model reading this log) — nothing here writes to exams.json.
 *
 * Usage:
 *   node scripts/automation/portal-watch.mjs            # watch all reachable portals
 *   node scripts/automation/portal-watch.mjs --only upsc,uppsc
 *   node scripts/automation/portal-watch.mjs --baseline # record current state, report nothing
 */

import fs from 'node:fs'
import path from 'node:path'
import https from 'node:https'
import http from 'node:http'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT_DIR = path.resolve(__dirname, '../..')
const SOURCES_CONFIG_PATH = path.join(__dirname, 'sources-config.json')
const SNAPSHOT_DIR = path.join(ROOT_DIR, 'data-sourcing/portal-snapshots')
const CHANGE_LOG_PATH = path.join(ROOT_DIR, 'data-sourcing/PORTAL-CHANGE-LOG.md')

const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
const CONNECT_TIMEOUT_MS = 25000
const CONCURRENCY = 4
const BLANK_TEXT_THRESHOLD = 500

// These portals serve an incomplete certificate chain — the site is genuine, the chain is
// misconfigured. We accept it for these hosts only, and only ever to READ a public page.
const CERT_RELAXED_HOSTS = new Set(['www.ibps.in', 'ibps.in', 'apsc.nic.in', 'hppsc.hp.gov.in'])

const NOTICE_KEYWORDS =
  /(recruit|notification|notice|advert|advt|examination|exam\b|vacan|apply|application|admit card|result|corrigend|syllabus|interview|cut ?off|merit|appointment|post\b|selection)/i

const NAV_NOISE = /^(home|about|about us|contact|contact us|sitemap|feedback|login|sign in|rti|faq|help|search|screen reader|skip to main content|privacy policy|terms|disclaimer|archive|gallery|photo gallery|tenders?)$/i

// ---------------------------------------------------------------- fetching

function relaxedGet(url, redirectsLeft = 3) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url)
    const lib = parsed.protocol === 'http:' ? http : https
    const req = lib.request(
      {
        hostname: parsed.hostname,
        port: parsed.port || (parsed.protocol === 'http:' ? 80 : 443),
        path: parsed.pathname + parsed.search,
        method: 'GET',
        headers: { 'User-Agent': UA, 'Accept-Language': 'en-IN,en;q=0.9' },
        rejectUnauthorized: false,
        timeout: CONNECT_TIMEOUT_MS
      },
      (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location && redirectsLeft > 0) {
          res.resume()
          return resolve(relaxedGet(new URL(res.headers.location, url).href, redirectsLeft - 1))
        }
        let body = ''
        res.setEncoding('utf8')
        res.on('data', (c) => (body += c))
        res.on('end', () => resolve({ status: res.statusCode, html: body, finalUrl: url }))
      }
    )
    req.on('timeout', () => req.destroy(new Error('Connect timeout')))
    req.on('error', reject)
    req.end()
  })
}

async function fetchPortal(url) {
  const host = new URL(url).hostname
  if (CERT_RELAXED_HOSTS.has(host)) return relaxedGet(url)

  const res = await fetch(url, {
    headers: { 'User-Agent': UA, 'Accept-Language': 'en-IN,en;q=0.9' },
    signal: AbortSignal.timeout(CONNECT_TIMEOUT_MS),
    redirect: 'follow'
  })
  return { status: res.status, html: await res.text(), finalUrl: res.url || url }
}

// ---------------------------------------------------------------- extraction

function stripTags(s) {
  return s
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&quot;/gi, '"')
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * Pull out the links that look like notice-board entries. Comparing the SET of notice links is
 * far more stable than diffing raw page text, which changes on every load thanks to visitor
 * counters, rotating banners and timestamps.
 */
function extractNotices(html, baseUrl) {
  const notices = new Map()
  const anchorRe = /<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi
  let placeholderCount = 0
  let m
  while ((m = anchorRe.exec(html)) !== null) {
    const rawHref = m[1].trim()
    const text = stripTags(m[2])

    if (!text || text.length < 15 || text.length > 300) continue
    // Unrendered framework bindings, e.g. {{'AllNoticeAdvert_HM' | translate }} — the page is a
    // client-rendered shell and we are looking at its template, not its content.
    if (/\{\{|\}\}/.test(text)) {
      placeholderCount++
      continue
    }
    if (NAV_NOISE.test(text)) continue
    if (/^(javascript:|mailto:|tel:|#)/i.test(rawHref)) continue
    if (!NOTICE_KEYWORDS.test(text) && text.length < 45) continue

    let href
    try {
      href = new URL(rawHref, baseUrl).href
    } catch {
      continue
    }
    notices.set(`${text}||${href}`, { text, href })
  }
  return {
    notices: [...notices.values()].sort((a, b) => a.text.localeCompare(b.text)),
    placeholderCount
  }
}

// ---------------------------------------------------------------- snapshots

function slug(s) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function readSnapshot(id) {
  const p = path.join(SNAPSHOT_DIR, `${id}.json`)
  if (!fs.existsSync(p)) return null
  try {
    return JSON.parse(fs.readFileSync(p, 'utf-8'))
  } catch {
    return null
  }
}

function writeSnapshot(id, data) {
  fs.mkdirSync(SNAPSHOT_DIR, { recursive: true })
  fs.writeFileSync(path.join(SNAPSHOT_DIR, `${id}.json`), JSON.stringify(data, null, 2) + '\n', 'utf-8')
}

// ---------------------------------------------------------------- per-portal work

async function watchPortal(target) {
  const started = Date.now()
  try {
    const { status, html, finalUrl } = await fetchPortal(target.url)
    const ms = Date.now() - started

    if (status >= 400) {
      return { ...target, outcome: 'HTTP_ERROR', detail: `Server returned ${status}`, ms, added: [] }
    }

    const text = stripTags(html)
    if (text.length < BLANK_TEXT_THRESHOLD) {
      return {
        ...target,
        outcome: 'BLANK_SHELL',
        detail: 'Responded OK but served no readable text (JavaScript-rendered)',
        ms,
        added: []
      }
    }

    const { notices, placeholderCount } = extractNotices(html, finalUrl)

    // A handful of unrendered bindings is conclusive: we are reading the template of a
    // client-rendered app, so whatever we extracted is not the real notice board.
    if (placeholderCount >= 3) {
      return {
        ...target,
        outcome: 'JS_RENDERED',
        detail: `Notice board is built in the browser (${placeholderCount} unrendered placeholders) — needs a browser engine`,
        ms,
        added: []
      }
    }

    const previous = readSnapshot(target.id)
    const previousKeys = new Set((previous?.notices || []).map((n) => `${n.text}||${n.href}`))
    const added = previous ? notices.filter((n) => !previousKeys.has(`${n.text}||${n.href}`)) : []

    writeSnapshot(target.id, {
      id: target.id,
      label: target.label,
      url: target.url,
      last_checked: new Date().toISOString(),
      notice_count: notices.length,
      notices
    })

    return {
      ...target,
      outcome: previous ? 'OK' : 'BASELINE',
      detail: previous ? `${notices.length} notices on board` : `Baseline recorded (${notices.length} notices)`,
      ms,
      added
    }
  } catch (err) {
    const code = err.cause?.code || err.name || 'ERROR'
    return {
      ...target,
      outcome: 'UNREACHABLE',
      detail: `${code}: ${(err.cause?.message || err.message || '').slice(0, 100)}`,
      ms: Date.now() - started,
      added: []
    }
  }
}

async function runPool(targets, worker) {
  const results = []
  let cursor = 0
  await Promise.all(
    Array.from({ length: Math.min(CONCURRENCY, targets.length) }, async () => {
      while (cursor < targets.length) {
        const result = await worker(targets[cursor++])
        const flag = result.added.length ? `  *** ${result.added.length} NEW ***` : ''
        console.log(`${result.outcome.padEnd(12)} ${result.label}${flag}`)
        results.push(result)
      }
    })
  )
  return results
}

// ---------------------------------------------------------------- reporting

function prependChangeLog(entry) {
  const previous = fs.existsSync(CHANGE_LOG_PATH) ? fs.readFileSync(CHANGE_LOG_PATH, 'utf-8') : ''
  const header = '# Portal Change Log\n\nNewest run first. Each entry lists notices that appeared since the previous check.\nNothing here has been verified or added to the exam database — this is a review queue.\n'
  const body = previous.startsWith('# Portal Change Log') ? previous.slice(previous.indexOf('\n---\n') + 1) : previous
  fs.writeFileSync(CHANGE_LOG_PATH, `${header}\n---\n\n${entry}\n${body}`, 'utf-8')
}

function buildEntry(results) {
  const now = new Date()
  const withChanges = results.filter((r) => r.added.length > 0)
  const baselines = results.filter((r) => r.outcome === 'BASELINE')
  const failures = results.filter((r) =>
    ['UNREACHABLE', 'BLANK_SHELL', 'HTTP_ERROR', 'JS_RENDERED'].includes(r.outcome)
  )
  const totalNew = withChanges.reduce((n, r) => n + r.added.length, 0)

  const lines = []
  lines.push(`## ${now.toISOString().split('T')[0]} — ${now.toLocaleTimeString('en-IN')}`)
  lines.push('')
  lines.push(
    `**${totalNew} new notice(s)** across ${withChanges.length} authority(ies). ` +
      `Checked ${results.length}; ${failures.length} could not be read.`
  )
  lines.push('')

  if (withChanges.length) {
    lines.push('### New notices to review')
    lines.push('')
    for (const r of withChanges.sort((a, b) => b.added.length - a.added.length)) {
      lines.push(`**${r.label}**`)
      lines.push('')
      for (const n of r.added) lines.push(`- [${n.text}](${n.href})`)
      lines.push('')
    }
  } else if (!baselines.length) {
    lines.push('_No new notices since the previous check._')
    lines.push('')
  }

  if (baselines.length) {
    lines.push(`### Baseline recorded (first check — changes reported from next run)`)
    lines.push('')
    for (const r of baselines) lines.push(`- ${r.label} — ${r.detail}`)
    lines.push('')
  }

  if (failures.length) {
    lines.push('### Could not be read')
    lines.push('')
    for (const r of failures) lines.push(`- **${r.label}** — ${r.detail}`)
    lines.push('')
  }

  return lines.join('\n')
}

// ---------------------------------------------------------------- entry point

function loadTargets() {
  const config = JSON.parse(fs.readFileSync(SOURCES_CONFIG_PATH, 'utf-8'))
  const targets = []
  for (const a of config.axes.authorities_by_jurisdiction.central || []) {
    targets.push({ id: slug(a.id || a.name), label: `${a.name} (${(a.id || '').toUpperCase()})`, url: a.url })
  }
  for (const s of config.axes.authorities_by_jurisdiction.states || []) {
    targets.push({ id: slug(`${s.state}-${s.psc || 'psc'}`), label: `${s.state} — ${s.psc || 'PSC'}`, url: s.url })
  }
  return targets
}

async function main() {
  const args = process.argv.slice(2)
  const onlyArg = args.indexOf('--only')
  let targets = loadTargets()

  if (onlyArg !== -1 && args[onlyArg + 1]) {
    const wanted = args[onlyArg + 1].split(',').map((s) => s.trim().toLowerCase())
    targets = targets.filter((t) => wanted.some((w) => t.id.includes(w) || t.label.toLowerCase().includes(w)))
  }

  console.log(`Checking ${targets.length} authority notice boards...\n`)
  const results = await runPool(targets, watchPortal)

  const entry = buildEntry(results)
  prependChangeLog(entry)

  const totalNew = results.reduce((n, r) => n + r.added.length, 0)
  const readable = results.filter((r) => ['OK', 'BASELINE'].includes(r.outcome)).length
  console.log(`\n${'='.repeat(60)}`)
  console.log(`  ${totalNew} new notice(s) found across ${readable} readable portal(s).`)
  console.log(`  Review them in: data-sourcing/PORTAL-CHANGE-LOG.md`)
  console.log(`${'='.repeat(60)}\n`)
}

main().catch((err) => {
  console.error('portal-watch failed:', err)
  process.exit(1)
})

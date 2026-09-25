#!/usr/bin/env node

/**
 * refresh-news.mjs
 *
 * Rebuilds `public/news/all.json` (the stored list behind the Updates feed) and
 * `public/news/latest.json` (the newest few, for the ticker on every page) from
 * real Google News headlines. Runs daily on GitHub Actions
 * (.github/workflows/refresh-news.yml). Unlike the government portals, Google
 * News serves overseas traffic normally, so Actions is fine here (contrast
 * HANDOFF.md §0 item 3).
 *
 * Why this exists: until 2026-09-25 the stored list (then src/data/news.json,
 * bundled into the page) was a hand-built set of 353 items, none traceable to
 * a real article — 340 linked only to the india.gov.in home page, many were
 * dated days after they were written, and they carried invented "gazette"
 * reference numbers. Nothing refreshed it, so the Updates total never moved.
 * This script replaces that list with real headlines, each linking to the
 * actual article.
 *
 * Why public/ rather than src/data/: the relevant searches return ~100 stories
 * a day. Bundled into the JavaScript, a week of them would be downloaded by
 * every visitor before the first screen; as separate files they load only
 * where they're shown.
 *
 * Rules:
 *   - A headline is kept only if it names an exam or conducting authority in
 *     exams.json / authorities.json (via src/utils/newsMatch.js). That filters
 *     out unrelated stories the broad searches pull in.
 *   - Stories are kept for ARCHIVE_DAYS, newest first. Anything without a real
 *     publication date is dropped.
 *   - Nothing here is described as official or verified. The site labels these
 *     as news reports and tells the reader to confirm on the official website.
 *   - If every search fails, the script exits non-zero so the Actions run shows
 *     as failed (and GitHub emails the owner) instead of silently publishing
 *     an empty or stale feed.
 *
 * Usage:
 *   node scripts/automation/refresh-news.mjs --dry-run   (report only, writes nothing)
 *   node scripts/automation/refresh-news.mjs
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { buildMatcher, detectTypeCode, storyId } from '../../src/utils/newsMatch.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT_DIR = path.resolve(__dirname, '../..')
const NEWS_DIR = path.join(ROOT_DIR, 'public/news')
const NEWS_PATH = path.join(NEWS_DIR, 'all.json')
const LATEST_PATH = path.join(NEWS_DIR, 'latest.json')
const EXAMS_PATH = path.join(ROOT_DIR, 'src/data/exams.json')
const AUTHORITIES_PATH = path.join(ROOT_DIR, 'src/data/authorities.json')

// A week keeps the list current; the total rises and falls with real news
// volume. ARCHIVE_MAX is only a safety net against a runaway search.
const ARCHIVE_DAYS = 7
const ARCHIVE_MAX = 2000
const LATEST_COUNT = 10
const DRY_RUN = process.argv.includes('--dry-run')

// Each search returns up to ~100 recent headlines; together they cover the
// major central bodies, banking, defence, admissions and the state PSCs.
const SEARCHES = [
  'UPSC exam OR result OR notification',
  'SSC exam OR "admit card" OR result OR notification',
  'IBPS OR SBI OR RBI OR NABARD OR LIC exam OR result OR recruitment',
  'RRB railway recruitment OR exam OR result',
  'NTA NEET OR JEE OR CUET OR "UGC NET" OR "CSIR NET"',
  'GATE OR CAT OR CLAT OR NIFT exam',
  'NDA OR CDS OR AFCAT OR Agniveer exam OR recruitment',
  'PSC exam OR result OR "admit card" OR notification',
  'police constable recruitment exam OR result',
  'teacher recruitment exam TET OR result',
  '"admit card" released exam 2026',
  '"answer key" exam 2026',
]

const feedUrl = (q) =>
  `https://news.google.com/rss/search?q=${encodeURIComponent(`${q} when:7d`)}&hl=en-IN&gl=IN&ceid=IN:en`

function decodeEntities(s) {
  return s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .trim()
}

function parseFeed(xml) {
  const items = xml.match(/<item>[\s\S]*?<\/item>/g) || []
  return items.map(block => {
    const tag = (name) => {
      const m = block.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`))
      return m ? decodeEntities(m[1]) : ''
    }
    let title = tag('title')
    const source = tag('source')
    // Google News appends " - Publisher" to every title
    if (source && title.endsWith(` - ${source}`)) title = title.slice(0, -(source.length + 3)).trim()
    return { title, link: tag('link'), pubDate: tag('pubDate'), source }
  }).filter(i => i.title && i.link && i.pubDate)
}

async function fetchSearch(q) {
  const res = await fetch(feedUrl(q), {
    headers: { 'User-Agent': 'Mozilla/5.0 (IndiaExams news refresh)' },
    signal: AbortSignal.timeout(15000),
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return parseFeed(await res.text())
}

// Kept lean — this file is downloaded by visitors. The reader-facing summary
// and tag are derived in the UI from source, date and type_code.
function toStory(raw, match) {
  const published = new Date(raw.pubDate)
  return {
    id: storyId(raw.link, raw.title),
    exam_id: match.exam_id,
    exam_acronym: match.exam_acronym,
    title: raw.title,
    source: raw.source || 'News report',
    authority_full: match.authority_full,
    date: published.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Asia/Kolkata' }),
    published_at: published.toISOString(),
    type_code: detectTypeCode(raw.title).code,
    category: match.category,
    link: raw.link,
    portal_url: match.portal_url,
  }
}

// One story per line: compact enough to download, still readable in a git diff
const serialize = (list) => `[\n${list.map(s => JSON.stringify(s)).join(',\n')}\n]\n`

async function main() {
  const exams = JSON.parse(fs.readFileSync(EXAMS_PATH, 'utf-8'))
  const authorities = JSON.parse(fs.readFileSync(AUTHORITIES_PATH, 'utf-8'))
  const existing = fs.existsSync(NEWS_PATH) ? JSON.parse(fs.readFileSync(NEWS_PATH, 'utf-8')) : []
  const match = buildMatcher(exams, authorities)

  let ok = 0
  let fetched = 0
  let unmatched = 0
  const incoming = []
  for (const q of SEARCHES) {
    try {
      const items = await fetchSearch(q)
      ok += 1
      fetched += items.length
      for (const raw of items) {
        const m = match(raw.title)
        if (m) incoming.push(toStory(raw, m))
        else unmatched += 1
      }
    } catch (err) {
      console.warn(`⚠ Search failed (${q}): ${err.message}`)
    }
  }

  if (ok === 0) {
    console.error('✗ Every news search failed — leaving the stored news untouched.')
    process.exit(1)
  }

  // Merge: keep what we already had, add new ones. The same headline
  // syndicated under several links is kept once (newest first wins).
  const cutoff = Date.now() - ARCHIVE_DAYS * 86400000
  const byId = new Map()
  const seenTitles = new Set()
  const candidates = [...incoming, ...existing]
    .filter(s => s.published_at && !Number.isNaN(Date.parse(s.published_at)))
    .filter(s => Date.parse(s.published_at) >= cutoff && Date.parse(s.published_at) <= Date.now() + 3600000)
    .sort((a, b) => Date.parse(b.published_at) - Date.parse(a.published_at))
  for (const s of candidates) {
    const titleKey = s.title.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
    if (byId.has(s.id) || seenTitles.has(titleKey)) continue
    byId.set(s.id, s)
    seenTitles.add(titleKey)
  }
  const next = [...byId.values()].slice(0, ARCHIVE_MAX)

  const beforeIds = new Set(existing.map(s => s.id))
  const added = next.filter(s => !beforeIds.has(s.id)).length
  const dropped = existing.filter(s => !byId.has(s.id)).length

  console.log(`Searches: ${ok}/${SEARCHES.length} succeeded · ${fetched} headlines fetched · ${unmatched} not about a tracked exam or authority`)
  console.log(`news/all.json: ${existing.length} → ${next.length} stories (${added} new, ${dropped} aged out or duplicate)`)

  if (DRY_RUN) {
    console.log('Dry run — nothing written. Newest 5:')
    next.slice(0, 5).forEach(s => console.log(`  ${s.date} · ${s.exam_acronym} · ${s.title}`))
    return
  }
  const out = serialize(next)
  if (fs.existsSync(NEWS_PATH) && fs.readFileSync(NEWS_PATH, 'utf-8') === out) {
    console.log('No change.')
    return
  }
  fs.mkdirSync(NEWS_DIR, { recursive: true })
  fs.writeFileSync(NEWS_PATH, out)
  fs.writeFileSync(LATEST_PATH, serialize(next.slice(0, LATEST_COUNT)))
  console.log(`✓ Wrote public/news/all.json (${next.length}) and latest.json (${Math.min(LATEST_COUNT, next.length)})`)
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})

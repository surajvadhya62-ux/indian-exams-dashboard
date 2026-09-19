#!/usr/bin/env node

/**
 * discover-exams.mjs
 *
 * Aggregator-based exam discovery (HANDOFF.md §10 step 5 / INCLUSION-POLICY.md §7).
 *
 * Scrapes two public aggregators for recruitment/exam titles, checks each one against
 * the 499 exams already in the database, and appends anything that doesn't match to
 * data-sourcing/DISCOVERY-QUEUE.md as a lead.
 *
 * THE RULE THAT MATTERS, same as sync-exams.mjs --scan and the news scanner it replaced
 * (see data-sourcing/AUDIT-2026-09-19-news-scraped-benchmarks.md — the last time a
 * scraper had write access, 18 unvouched rows reached 15 live exam pages before anyone
 * noticed): this script NEVER writes to exams.json or any dossier. It only appends to
 * the queue file. A candidate becomes a real exam by a human running
 * `sync-exams.mjs --add` after checking it against INCLUSION-POLICY.md's six-condition
 * test — this script has no opinion on whether a candidate actually belongs; it only
 * knows the candidate isn't already in the database under a name or acronym it recognises.
 *
 * Sources, and why only these two for now:
 *   - Sarkari Result (sarkariresult.com/) — its homepage is a clean, static, dated list
 *     of exam/recruitment postings ("UP Primary Teacher 2026 Apply Online", "SSC 10+2
 *     CHSL Apply Online"). Reliable to scrape, and the titles are already exam-shaped.
 *   - Employment News (employmentnews.gov.in/NewEmp/Home.aspx) — carries a small,
 *     genuinely server-rendered table of recently notified vacancies (organisation,
 *     post, category, date). Kept separate and labelled, because most of its rows are
 *     one-off single-post hiring by an individual PSU or institute ("Accountant &
 *     Others" at one PSU) — likely to fail INCLUSION-POLICY.md criterion D (recurrence)
 *     or A (a common competitive gateway, not one org's internal hire). Flagged in the
 *     queue as needing that specific check, not filtered out here — the judgement call
 *     belongs to a human against the policy, not to this script's heuristics.
 *
 * National Career Service (ncs.gov.in) was evaluated and deliberately left out: its
 * homepage is dominated by private-sector job-market data (Apna, Swiggy, staffing
 * agencies), not government exam notices. Its actually useful section, if one exists,
 * is behind a specific search/filter flow this script does not yet drive. Left as a
 * follow-up, not attempted half-way.
 *
 * MATCHING, AND ITS DELIBERATE BIAS: a candidate is treated as "already known" when
 * EITHER (a) every token of some existing exam's acronym (e.g. "SSC CHSL" -> ssc, chsl)
 * appears in the candidate's tokens, OR (b) at least two of that exam's own name tokens
 * do. Both checks are deliberately conservative in the direction of under-matching
 * rather than over-matching: an earlier, single-shared-word version of (b) would have
 * matched "UP Primary Teacher" against every exam whose name contains "Teacher" (aptet,
 * ctet, htet, ...), silently discarding a real lead — see NAME_OVERLAP_THRESHOLD below
 * for why 2, not 1. The cost of staying conservative is the opposite failure — a
 * genuinely already-known exam sometimes lands in the queue anyway — which costs a human
 * ten seconds to dismiss. A silently dropped new exam costs nothing visible and is never
 * found. See the project's own standing lesson on this trade-off: a blank is a visible
 * prompt, a wrong or missing entry is invisible.
 *
 * Usage:
 *   node scripts/automation/discover-exams.mjs --dry-run
 *   node scripts/automation/discover-exams.mjs
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT_DIR = path.resolve(__dirname, '../..')
const EXAMS_JSON_PATH = path.join(ROOT_DIR, 'src/data/exams.json')
const QUEUE_PATH = path.join(ROOT_DIR, 'data-sourcing/DISCOVERY-QUEUE.md')
const SEEN_LOG_PATH = path.join(__dirname, 'discovery-seen.json') // gitignored, like exam-updates-found.json

const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
const TIMEOUT_MS = 20000

// Words that carry no identifying signal on their own — stripped before tokenising so
// they can never by themselves cause a false "already known" match, and never clutter
// a candidate's displayed title either.
const NOISE_WORDS = new Set([
  'apply', 'online', 'result', 'results', 'notification', 'exam', 'admit', 'card',
  'out', 'latest', 'form', 'dates', 'date', 'released', 'check', 'download', 'merit',
  'list', 'cutoff', 'answer', 'key', 'syllabus', 'admission', 'vacancy', 'vacancies',
  'posts', 'post', 'jobs', 'job', 'new', 'apply2026', '2026', '2025', '2027',
])

function loadJSON(p, fallback = null) {
  try {
    return JSON.parse(fs.readFileSync(p, 'utf-8'))
  } catch {
    return fallback
  }
}

function saveJSON(p, data) {
  fs.writeFileSync(p, JSON.stringify(data, null, 2) + '\n', 'utf-8')
}

// Not an exam at all — administrative services (a document reissue, a general jobseeker
// registry, a scholarship disbursal) that Sarkari Result lists alongside real postings.
// This list is evidence-based, not speculative: every pattern here was an actual false
// candidate seen in a real run of this script (2026-09-19), not a guess at what might
// show up. Expect to add to it as future runs surface new categories — that's the
// project's own "measured, not assumed" standard applied to this script's own output.
const NON_EXAM_PATTERNS = [
  /certificate download/i,
  /migration certificate/i,
  /self enumeration/i,
  /rojgar panjiyan/i,
  /e dossier/i,
  /scholarship/i, // a disbursal scheme, not an exam or recruitment
]

function looksLikeNonExam(title) {
  return NON_EXAM_PATTERNS.some((p) => p.test(title))
}

function tokenize(text) {
  return (text.toLowerCase().match(/[a-z0-9]+/g) || []).filter(
    (t) => t.length >= 2 && !NOISE_WORDS.has(t)
  )
}

/**
 * Builds one token-set per exam, from its acronym AND its full name. The acronym check
 * is the strict, high-precision one described above. The name check is a second,
 * separate pass added after a real run of this script (2026-09-19) showed the acronym
 * check alone isn't enough: `upsssc-junior-assistant` is in the database with acronym
 * "UPSSSC JA", but Sarkari Result's own headline spelled it "Junior Assistant" rather
 * than "JA" — so the acronym-containment check missed a genuinely already-known exam.
 */
// A third matching check — "trust a single, genuinely distinctive all-caps acronym
// word on its own" — was tried and reverted during the 2026-09-19 review batch. It
// fixed one real miss ("UKPSC Pre" not being recognised as the already-known `ukpsc`
// exam, acronym "UKPSC PCS", because the candidate never says "PCS") but broke twice
// trying to get there safely:
//   1. Picking the longest acronym WORD by character count matched `bihar-pcs-j`'s
//      "Bihar" (a state name, not an abbreviation) and silently swallowed the genuine
//      "Bihar STET" candidate. Fixed by only considering words actually written in
//      capitals in the source text.
//   2. Even restricted to real capitals, "UPSSSC" is the longest such word in FIVE
//      different already-tracked exams (one per post), RSMSSB in six — so requiring
//      the word to belong to only one exam in the CURRENT database seemed like a fix,
//      until `nielit-scientist-b` (acronym "NIELIT Scientist") showed the deeper
//      problem: it made "NIELIT CCC" — a completely different, genuinely new exam
//      from the same body — look already-known too. A conducting body's own
//      abbreviation identifies the ORGANISATION, not a specific exam, and nothing in
//      this data reliably says whether a given body runs one flagship exam (UKPSC
//      effectively does) or several unrelated ones (NIELIT does). No rule tried could
//      tell those apart from the acronym string alone.
// Left as two checks, not three: a rare miss like UKPSC costs a human ten seconds to
// notice already-exists; a body-name false match costs a real new exam silently
// disappearing, which is worse and much harder to notice. See the file-level comment
// for why that asymmetry is the standing design principle here.
function buildKnownExamSets(exams) {
  const sets = []
  for (const exam of exams) {
    const acronymTokens = exam.acronym ? tokenize(exam.acronym) : []
    const nameTokens = exam.name ? tokenize(exam.name) : []
    const validAcronym = acronymTokens.length > 0 && acronymTokens.join('').length >= 3
    sets.push({
      id: exam.id,
      acronymTokens: validAcronym ? new Set(acronymTokens) : null,
      // Only tokens of length >= 3 count toward the name-overlap threshold below — a
      // coincidental match on two short tokens (e.g. state abbreviations) shouldn't be
      // able to satisfy it on its own.
      nameTokens: new Set(nameTokens.filter((t) => t.length >= 3)),
    })
  }
  return sets
}

// How many of an exam's own (length>=3) name tokens must appear in a candidate's title
// before the candidate is treated as that exam under a different phrasing. Deliberately
// >1: a single shared word ("teacher", "police", "constable") recurs across dozens of
// genuinely distinct state exams and would falsely suppress a real lead on its own — see
// the long comment at the top of this file. Two independent shared words is a much
// stronger signal and is what actually caught the UPSSSC JA case above.
const NAME_OVERLAP_THRESHOLD = 2

function matchesKnownExam(candidateTokens, knownSets) {
  const asSet = new Set(candidateTokens)
  for (const known of knownSets) {
    if (known.acronymTokens) {
      let allPresent = true
      for (const t of known.acronymTokens) {
        if (!asSet.has(t)) { allPresent = false; break }
      }
      if (allPresent) return known
    }
    let overlap = 0
    for (const t of known.nameTokens) {
      if (asSet.has(t)) overlap++
    }
    if (overlap >= NAME_OVERLAP_THRESHOLD) return known
  }
  return null
}

function candidateKey(source, title) {
  return `${source}|${tokenize(title).sort().join('-')}`
}

async function fetchText(url) {
  const res = await fetch(url, {
    headers: { 'User-Agent': UA, 'Accept-Language': 'en-IN,en;q=0.9' },
    signal: AbortSignal.timeout(TIMEOUT_MS),
    redirect: 'follow',
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.text()
}

/**
 * Sarkari Result's homepage lists dated posting pages, e.g.
 * href="https://www.sarkariresult.com/2026/up-primary-teacher-.../" — that year-numbered
 * path is what distinguishes an actual posting link from the site's own nav chrome
 * ("Latest job", "Terms And Conditions", ...), which points at un-dated paths.
 */
function extractSarkariResultCandidates(html) {
  const linkPattern = /<a\s[^>]*href="(https:\/\/www\.sarkariresult\.com\/(?:20\d\d|[a-z-]+)\/[a-z0-9-]+\/)"[^>]*>([^<]{6,150})<\/a>/gi
  const out = []
  let m
  while ((m = linkPattern.exec(html))) {
    const [, url, rawTitle] = m
    const title = rawTitle.replace(/&amp;/g, '&').trim()
    out.push({ source: 'Sarkari Result', title, url })
  }
  return out
}

/**
 * Employment News's homepage renders a small ASP.NET repeater of recently notified
 * vacancies: organisation (Label3), post title (Label4), category (Label5, e.g.
 * "Recruitment" vs "Deputation"), notified date (Label6). Only "Recruitment" rows are
 * open-market by definition — "Deputation" is internal-transfer-only and fails
 * INCLUSION-POLICY.md criterion B outright, so it's excluded here, not just flagged.
 */
function extractEmploymentNewsCandidates(html) {
  const orgs = [...html.matchAll(/RepDetails_Label3_\d+"[^>]*>([^<]*)</g)].map((m) => m[1].trim())
  const posts = [...html.matchAll(/RepDetails_Label4_\d+"[^>]*>([^<]*)</g)].map((m) => m[1].trim())
  const cats = [...html.matchAll(/RepDetails_Label5_\d+"[^>]*>([^<]*)</g)].map((m) => m[1].trim())

  const out = []
  const n = Math.min(orgs.length, posts.length, cats.length)
  for (let i = 0; i < n; i++) {
    if (!/recruitment/i.test(cats[i])) continue
    const decode = (s) => s.replace(/&amp;/g, '&')
    out.push({
      source: 'Employment News',
      title: `${decode(orgs[i])} — ${decode(posts[i])}`,
      url: 'https://employmentnews.gov.in/NewEmp/Home.aspx',
      needsRecurrenceCheck: true,
    })
  }
  return out
}

function appendToQueue(candidates) {
  const header = `# Discovery queue — candidate exams not yet in the database

Titles found on public aggregators by \`discover-exams.mjs\`, newest first.

**Nothing here is an exam yet.** This is a lead: a title that doesn't match any acronym
already in \`src/data/exams.json\`. Before adding it, check it against every condition in
\`data-sourcing/INCLUSION-POLICY.md\` §2 — in particular:

- **Recurrence (criterion D).** A one-off hiring drive by a single institute or PSU does
  not belong, no matter how large. This is the most common way an Employment News row
  fails — see the "needs recurrence check" note on those rows below.
- **A real match can still slip through.** This script's matching is deliberately
  conservative (see the comment at the top of discover-exams.mjs) — it only suppresses a
  candidate when an existing exam's acronym is fully present in the title, or at least
  two of the exam's own name words are. That means some rows below may already be in the
  database under different wording than either of those. Check \`src/data/exams.json\`
  yourself before treating a row as confirmed-new.

If a candidate turns out to genuinely belong, use \`sync-exams.mjs --add\` — it will set
\`record_tier: "registry"\` automatically, so the new entry honestly shows as a stub until
a full dossier is built for it. If a candidate is rejected, delete the row and record it
in \`data-sourcing/EXCLUSIONS.md\` with the reason, per policy §2.

---
`

  const stamp = new Date().toISOString().split('T')[0]
  const rows = candidates.map((c) => {
    const flag = c.needsRecurrenceCheck ? ' ⚠️ needs recurrence check (criterion D)' : ''
    return (
      `## ${c.title} — via ${c.source}${flag}\n\n` +
      `- **Seen:** ${stamp}\n` +
      `- **Link:** ${c.url}\n` +
      `- **Status:** unreviewed\n` +
      `- **Key:** \`${candidateKey(c.source, c.title)}\`\n`
    )
  }).join('\n')

  if (!fs.existsSync(QUEUE_PATH)) {
    fs.writeFileSync(QUEUE_PATH, `${header}\n${rows}`, 'utf-8')
    return
  }

  const existing = fs.readFileSync(QUEUE_PATH, 'utf-8')
  const splitAt = existing.indexOf('---\n')
  const head = splitAt === -1 ? existing : existing.slice(0, splitAt + 4)
  const body = splitAt === -1 ? '' : existing.slice(splitAt + 4)
  fs.writeFileSync(QUEUE_PATH, `${head}\n${rows}${body}`, 'utf-8')
}

async function main() {
  const isDryRun = process.argv.includes('--dry-run')
  const exams = loadJSON(EXAMS_JSON_PATH, [])
  const knownSets = buildKnownExamSets(exams)
  const seen = new Set(loadJSON(SEEN_LOG_PATH, []))

  const sources = [
    { name: 'Sarkari Result', url: 'https://www.sarkariresult.com/', extract: extractSarkariResultCandidates },
    { name: 'Employment News', url: 'https://employmentnews.gov.in/NewEmp/Home.aspx', extract: extractEmploymentNewsCandidates },
  ]

  const allCandidates = []
  for (const src of sources) {
    try {
      const html = await fetchText(src.url)
      const found = src.extract(html)
      console.log(`  ${src.name}: fetched ${found.length} raw title(s)`)
      allCandidates.push(...found)
    } catch (err) {
      console.log(`  ${src.name}: FAILED to fetch (${err.message}) — skipped, not treated as "nothing found"`)
    }
  }

  const newCandidates = []
  const alreadyKnown = []
  const alreadyQueued = []
  const notAnExam = []

  for (const c of allCandidates) {
    if (looksLikeNonExam(c.title)) {
      notAnExam.push(c)
      continue
    }
    const tokens = tokenize(c.title)
    const match = matchesKnownExam(tokens, knownSets)
    if (match) {
      alreadyKnown.push({ ...c, matchedId: match.id })
      continue
    }
    const key = candidateKey(c.source, c.title)
    if (seen.has(key)) {
      alreadyQueued.push(c)
      continue
    }
    newCandidates.push(c)
  }

  console.log(`\nTotal raw titles: ${allCandidates.length}`)
  console.log(`  not an exam at all, by pattern (skipped)    : ${notAnExam.length}`)
  console.log(`  matched an existing exam's acronym (skipped): ${alreadyKnown.length}`)
  console.log(`  already queued in an earlier run (skipped)  : ${alreadyQueued.length}`)
  console.log(`  new candidates                              : ${newCandidates.length}`)

  if (newCandidates.length === 0) {
    console.log('\nNothing new to queue.')
    return
  }

  if (isDryRun) {
    console.log('\n[DRY RUN] Would append to data-sourcing/DISCOVERY-QUEUE.md:')
    newCandidates.forEach((c) => console.log(`  - [${c.source}] ${c.title}`))
    return
  }

  appendToQueue(newCandidates)
  for (const c of newCandidates) seen.add(candidateKey(c.source, c.title))
  saveJSON(SEEN_LOG_PATH, [...seen])
  console.log(`\n✓ Queued ${newCandidates.length} candidate(s) in data-sourcing/DISCOVERY-QUEUE.md`)
  console.log('  Nothing was written to exams.json or any dossier — these are leads, not data.')
}

main().catch((err) => {
  console.error('discover-exams.mjs failed:', err)
  process.exit(1)
})

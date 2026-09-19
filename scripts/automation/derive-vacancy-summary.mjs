#!/usr/bin/env node

/**
 * derive-vacancy-summary.mjs
 *
 * Recalculates `exams.json` → `vacancies` and `provenance.vacancies` from the dossiers in
 * public/exam-details/.
 *
 * The summary figure is a CALCULATED field. Nobody edits it by hand. Vacancy data is entered
 * once, in the dossier, against the notification it came from; this script rolls it up so the
 * two layers cannot drift apart (the drift is what HANDOFF.md §2 describes, and it has already
 * cost one wasted cycle).
 *
 * The rule, in full:
 *
 *   1. Only `confidence: "verified"` rows count. Anything weaker is already withheld from
 *      students by src/utils/provenance.js, and a rollup must not launder it into a chart.
 *   2. A verified row also has to CITE A DOCUMENT. A bare homepage is not a citation — it
 *      points at no particular notification and cannot be checked. As of 2026-09-19, 191 of
 *      537 verified rows failed this test, and two of those (Spices Board, Tea Board) turned
 *      out to have no notification behind them at all. Publishing that set into charts and
 *      PDFs would repeat the mistake this project keeps having to undo.
 *   3. Rows marked `exclude_from_rollup: true` are skipped. That flag is for figures that are
 *      real but must not be added to their neighbours — two hiring routes that may fill the
 *      same posts, or a drive partly cancelled after publication.
 *   4. Of what survives, take the most recent year and sum it. Summing is the accounting-
 *      native answer: an exam hiring across several post categories in one cycle is offering
 *      their total. Taking the largest single row instead would understate every such exam.
 *   5. If nothing survives, publish nothing. `vacancies` is set to null and the provenance
 *      confidence to something below `verified`, so the field stays off the page. An exam
 *      showing blank is a visible prompt to go and source it; an exam showing an unchecked
 *      number is an invisible liability.
 *
 * Usage:
 *   node scripts/automation/derive-vacancy-summary.mjs --dry-run   (report only, writes nothing)
 *   node scripts/automation/derive-vacancy-summary.mjs
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT_DIR = path.resolve(__dirname, '../..')
const EXAMS_JSON_PATH = path.join(ROOT_DIR, 'src/data/exams.json')
const DETAILS_DIR = path.join(ROOT_DIR, 'public/exam-details')

const TODAY = new Date().toISOString().split('T')[0]

// Landing pages that name an organisation but not a notification.
const GENERIC_PATHS = /^(careers?|en\/careers?|recruitment|recruitments|default\.aspx|home(\/notice)?|index\.php|page|advertisements?|vacancies|jobs)$/i
// Query strings that only steer a menu, rather than identifying a document.
const MENU_QUERY = /^(menuName|lang|ln)=/i

/**
 * True when the URL points at a specific document or notification record, rather than at an
 * organisation's front door. Deliberately strict: the cost of a false "yes" is an unchecked
 * figure on a student's screen, the cost of a false "no" is a blank that someone fills in later.
 */
function citesDocument(url) {
  if (!url) return false
  let parsed
  try {
    parsed = new URL(url)
  } catch {
    return false
  }
  const cleanPath = parsed.pathname.replace(/^\/|\/$/g, '')
  const query = parsed.search.replace(/^\?/, '')
  const hasRealQuery = query.length > 0 && !MENU_QUERY.test(query)

  if (cleanPath === '') return hasRealQuery
  if (GENERIC_PATHS.test(cleanPath)) return hasRealQuery
  return true
}

function loadJSON(p) {
  return JSON.parse(fs.readFileSync(p, 'utf-8'))
}

function qualifyingRows(dossier) {
  const rows = dossier?.competition_benchmarks?.years
  if (!Array.isArray(rows)) return { eligible: [], skipped: [] }

  const eligible = []
  const skipped = []
  for (const row of rows) {
    if (row?.confidence !== 'verified') continue
    if (typeof row.vacancies !== 'number' || !Number.isFinite(row.vacancies)) continue
    if (row.exclude_from_rollup === true) {
      skipped.push({ row, reason: 'excluded from rollup by flag' })
      continue
    }
    if (!citesDocument(row.source_url)) {
      skipped.push({ row, reason: 'verified but cites no document' })
      continue
    }
    eligible.push(row)
  }
  return { eligible, skipped }
}

function deriveFor(exam) {
  const dossierPath = path.join(DETAILS_DIR, `${exam.id}.json`)
  if (!fs.existsSync(dossierPath)) return { value: null, rows: [], skipped: [] }

  const { eligible, skipped } = qualifyingRows(loadJSON(dossierPath))
  if (eligible.length === 0) return { value: null, rows: [], skipped }

  const latestYear = Math.max(...eligible.map(r => r.year))
  const rows = eligible.filter(r => r.year === latestYear)
  const total = rows.reduce((sum, r) => sum + r.vacancies, 0)
  return { value: total, year: latestYear, rows, skipped }
}

/**
 * Admission (A) and qualification (Q) track exams have no recruitment vacancies. What their
 * dossiers hold is a different quantity — college seats, or nothing at all — and a seat is not
 * a job. Rolling those into a vacancies total would put 1,20,000 KCET seats beside a few
 * hundred real posts and make every aggregate meaningless. See INCLUSION-POLICY.md §3 for the
 * track definitions.
 */
function carriesVacancies(exam) {
  return exam?.track !== 'A' && exam?.track !== 'Q'
}

function buildProvenance(exam, derived) {
  if (!carriesVacancies(exam)) {
    return {
      source_url: null,
      source_date: null,
      verified_on: null,
      derived_on: TODAY,
      confidence: 'not_applicable',
      note: `Not applicable: this is a track ${exam.track} exam (admission or qualification), which does not carry recruitment vacancies of its own. Derived field — see scripts/automation/derive-vacancy-summary.mjs.`
    }
  }

  if (derived.value === null) {
    return {
      source_url: null,
      source_date: null,
      verified_on: null,
      derived_on: TODAY,
      confidence: 'unverified',
      note: 'No verified, document-cited vacancy row exists in this exam\'s dossier yet, so no figure is published. Derived field — do not edit by hand; enter the figure in the dossier against its notification and re-run scripts/automation/derive-vacancy-summary.mjs.'
    }
  }

  const { rows, year } = derived
  const breakdown = rows.length === 1
    ? `${rows[0].vacancies.toLocaleString('en-IN')} from a single verified row`
    : `${rows.map(r => r.vacancies.toLocaleString('en-IN')).join(' + ')} across ${rows.length} verified rows`

  return {
    source_url: rows[0].source_url,
    source_date: rows[0].as_of || null,
    verified_on: TODAY,
    derived_on: TODAY,
    confidence: 'verified',
    note: `Derived from the dossier: ${year} cycle, ${breakdown}. Derived field — do not edit by hand; correct the dossier and re-run scripts/automation/derive-vacancy-summary.mjs.`
  }
}

function main() {
  const isDryRun = process.argv.includes('--dry-run')
  const exams = loadJSON(EXAMS_JSON_PATH)

  let published = 0
  let cleared = 0
  let unchanged = 0
  const blocked = []
  const changes = []

  for (const exam of exams) {
    const derived = carriesVacancies(exam)
      ? deriveFor(exam)
      : { value: null, rows: [], skipped: [] }
    const newValue = derived.value === null ? null : `${derived.value.toLocaleString('en-IN')} Posts`
    const oldValue = exam.vacancies ?? null
    const oldConfidence = exam?.provenance?.vacancies?.confidence ?? null

    for (const s of derived.skipped) {
      if (s.reason === 'verified but cites no document') {
        blocked.push({ id: exam.id, year: s.row.year, vacancies: s.row.vacancies, url: s.row.source_url })
      }
    }

    const provenance = buildProvenance(exam, derived)
    const changedValue = oldValue !== newValue
    const changedConfidence = oldConfidence !== provenance.confidence

    if (changedValue || changedConfidence) {
      changes.push({
        id: exam.id,
        from: oldValue, fromConf: oldConfidence,
        to: newValue, toConf: provenance.confidence
      })
    } else {
      unchanged++
    }

    if (derived.value === null) cleared++
    else published++

    if (!isDryRun) {
      exam.vacancies = newValue
      exam.provenance = { ...(exam.provenance || {}), vacancies: provenance }
    }
  }

  if (!isDryRun) {
    fs.writeFileSync(EXAMS_JSON_PATH, JSON.stringify(exams, null, 2) + '\n', 'utf-8')
  }

  const label = isDryRun ? '[DRY RUN] ' : ''
  console.log(`\n${label}Vacancy summary derived from ${exams.length} dossiers\n`)
  console.log(`  published a verified figure : ${published}`)
  console.log(`  no figure published         : ${cleared}`)
  console.log(`  records changed             : ${changes.length}`)
  console.log(`  records unchanged           : ${unchanged}`)
  console.log(`\n  blocked — verified in the dossier but citing no document: ${blocked.length}`)
  console.log('  (each of these is an exam whose figure will appear once its citation names a document)')

  if (process.argv.includes('--list-blocked')) {
    console.log('')
    for (const b of blocked) {
      console.log(`    ${b.id.padEnd(34)} ${b.year}  ${String(b.vacancies).padStart(7)}  ${b.url}`)
    }
  }
  console.log('')
}

main()

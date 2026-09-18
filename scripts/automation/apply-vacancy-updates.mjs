#!/usr/bin/env node
// Applies vacancy figures from data-sourcing/vacancy-updates.csv into src/data/exams.json.
//
// This is the human checkpoint the inclusion policy requires (INCLUSION-POLICY.md §5):
// a figure only ever reaches the site once someone has compared it to the conducting
// body's own notification. This script does not decide that — the "confidence" column
// in the CSV does, and only a row already marked "verified" can set the site-visible
// figure. A "reported" row (pulled by a tool, not yet checked) is recorded with its
// source so it is ready to verify, but stays off the page — see src/utils/provenance.js.
//
// Usage:
//   npm run apply-vacancy-updates            apply valid rows, remove them from the CSV
//   npm run apply-vacancy-updates -- --dry-run   show what would happen, change nothing
//
// A row is rejected, and left in the CSV for correction, when:
//   - its id does not match an exam in exams.json
//   - the exam's track is not "R" (recruitment) — a vacancy figure is a category error
//     for an admission or qualification exam (policy §1)
//   - confidence is anything other than "verified" or "reported"
//   - source_url or source_date is missing, or source_date is not YYYY-MM-DD
//   - it would silently downgrade an existing "verified" figure to "reported" — that
//     needs a person's explicit decision, so the script refuses and explains why
//
// A row whose figure and confidence both already match what's recorded is treated as a
// no-op refresh: it does not get "conflict"-flagged, and its source_date/verified_on are
// updated to the new evidence.

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '../..')
const EXAMS_PATH = path.join(ROOT, 'src/data/exams.json')
const CSV_PATH = path.join(ROOT, 'data-sourcing/vacancy-updates.csv')
const LOG_PATH = path.join(ROOT, 'data-sourcing/vacancy-update-log.md')

const DRY_RUN = process.argv.includes('--dry-run')
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/

// --- minimal CSV parsing: quoted fields, embedded commas, embedded quotes ("") ---
function parseCsvLine(line) {
  const fields = []
  let cur = ''
  let inQuotes = false
  for (let i = 0; i < line.length; i++) {
    const c = line[i]
    if (inQuotes) {
      if (c === '"') {
        if (line[i + 1] === '"') { cur += '"'; i++ } else { inQuotes = false }
      } else {
        cur += c
      }
    } else if (c === '"') {
      inQuotes = true
    } else if (c === ',') {
      fields.push(cur); cur = ''
    } else {
      cur += c
    }
  }
  fields.push(cur)
  return fields.map((f) => f.trim())
}

function csvField(value) {
  if (value == null) return ''
  const s = String(value)
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
}

function readCsv(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8')
  const lines = raw.split(/\r?\n/)
  const commentLines = []
  let headerIdx = -1
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (line.trim() === '' || line.trimStart().startsWith('#')) {
      commentLines.push(line)
      continue
    }
    headerIdx = i
    break
  }
  if (headerIdx === -1) return { commentLines, header: null, rows: [] }

  const header = parseCsvLine(lines[headerIdx]).map((h) => h.toLowerCase())
  const rows = []
  for (let i = headerIdx + 1; i < lines.length; i++) {
    const line = lines[i]
    if (line.trim() === '') continue
    const fields = parseCsvLine(line)
    const row = {}
    header.forEach((h, idx) => { row[h] = (fields[idx] || '').trim() })
    rows.push({ raw: line, fields: row })
  }
  return { commentLines, header, rows }
}

function writeCsv(filePath, commentLines, header, rows) {
  const out = [
    ...commentLines,
    header.join(','),
    ...rows.map((r) => header.map((h) => csvField(r.fields[h])).join(','))
  ].join('\n')
  fs.writeFileSync(filePath, out.endsWith('\n') ? out : out + '\n')
}

// --- load exams ---
const examsRaw = fs.readFileSync(EXAMS_PATH, 'utf8')
const exams = JSON.parse(examsRaw)
const byId = new Map(exams.map((e) => [e.id, e]))

const { commentLines, header, rows } = readCsv(CSV_PATH)

if (!header) {
  console.log('No header row found in vacancy-updates.csv — nothing to do.')
  process.exit(0)
}

const REQUIRED_COLUMNS = ['id', 'vacancies', 'source_url', 'source_date', 'confidence']
const missingCols = REQUIRED_COLUMNS.filter((c) => !header.includes(c))
if (missingCols.length) {
  console.error(`vacancy-updates.csv is missing column(s): ${missingCols.join(', ')}`)
  process.exit(1)
}

if (rows.length === 0) {
  console.log('vacancy-updates.csv has no data rows. Nothing to apply.')
  process.exit(0)
}

const today = new Date().toISOString().slice(0, 10)
const applied = []
const rejected = []
const unresolved = [] // stays in the CSV

for (const { raw, fields: row } of rows) {
  const { id, vacancies, source_url, source_date, confidence, note = '' } = row
  const label = id || '(blank id)'

  const fail = (reason) => {
    rejected.push({ id: label, reason })
    unresolved.push({ raw, fields: row })
  }

  if (!id) { fail('id is blank'); continue }
  const exam = byId.get(id)
  if (!exam) { fail(`no exam with id "${id}" in exams.json`); continue }

  if (exam.track !== 'R') {
    fail(`"${id}" has track "${exam.track}", not "R" — a vacancy figure does not apply to an ` +
      `admission or qualification exam (INCLUSION-POLICY.md §1)`)
    continue
  }

  if (!['verified', 'reported'].includes(confidence)) {
    fail(`confidence must be "verified" or "reported", got "${confidence || '(blank)'}"`)
    continue
  }
  if (!vacancies) { fail('vacancies is blank'); continue }
  if (!source_url) { fail('source_url is blank'); continue }
  if (!DATE_RE.test(source_date)) { fail(`source_date "${source_date}" is not YYYY-MM-DD`); continue }

  const existingProv = exam.provenance?.vacancies || {}
  const isDowngrade = existingProv.confidence === 'verified' && confidence === 'reported'
  if (isDowngrade) {
    fail(
      `would downgrade an already-verified figure ("${exam.vacancies}", verified ${existingProv.verified_on || 'unknown date'}) ` +
      `to "reported" — if the old figure is actually superseded, change this row's confidence to "verified" once you have checked the new source yourself`
    )
    continue
  }

  const changed = exam.vacancies !== vacancies || existingProv.confidence !== confidence
  exam.vacancies = vacancies
  exam.provenance = exam.provenance || {}
  exam.provenance.vacancies = {
    source_url,
    source_date,
    verified_on: confidence === 'verified' ? today : null,
    confidence,
    note: note || existingProv.note || ''
  }

  applied.push({ id, vacancies, confidence, source_url, source_date, note, changed })
}

// --- report ---
console.log(`Rows read: ${rows.length}`)
console.log(`  applied:  ${applied.length}`)
console.log(`  rejected: ${rejected.length}`)
if (applied.length) {
  console.log('\nApplied:')
  for (const a of applied) {
    console.log(`  [${a.confidence.padEnd(8)}] ${a.id.padEnd(28)} ${a.vacancies}`)
  }
}
if (rejected.length) {
  console.log('\nRejected (left in vacancy-updates.csv — fix and rerun):')
  for (const r of rejected) {
    console.log(`  ${r.id.padEnd(28)} ${r.reason}`)
  }
}

if (DRY_RUN) {
  console.log('\n--dry-run: no files were changed.')
  process.exit(0)
}

if (applied.length === 0) {
  console.log('\nNothing applied. exams.json and the CSV are unchanged.')
  process.exit(rejected.length ? 1 : 0)
}

// --- write exams.json, matching its existing \uXXXX escaping convention ---
const out = JSON.stringify(exams, null, 2).replace(
  /[-￿]/g,
  (c) => '\\u' + c.charCodeAt(0).toString(16).padStart(4, '0')
)
fs.writeFileSync(EXAMS_PATH, out + (examsRaw.endsWith('\n') ? '\n' : ''))

// --- rewrite the CSV: only unresolved (rejected) rows remain ---
writeCsv(CSV_PATH, commentLines, header, unresolved)

// --- append to the log ---
const timestamp = new Date().toLocaleString('en-IN', {
  timeZone: 'Asia/Kolkata', dateStyle: 'long', timeStyle: 'short'
})
const logLines = [
  `## ${today} — ${timestamp}`,
  '',
  `**${applied.length} figure(s) applied**, ${rejected.length} rejected.`,
  ''
]
for (const a of applied) {
  logLines.push(
    `- **${a.id}** → \`${a.vacancies}\` [${a.confidence}] — ${a.source_url} (${a.source_date})` +
    (a.note ? `\n  ${a.note}` : '')
  )
}
if (rejected.length) {
  logLines.push('', '### Rejected this run')
  for (const r of rejected) logLines.push(`- **${r.id}** — ${r.reason}`)
}
logLines.push('', '---', '')

let existingLog = ''
if (fs.existsSync(LOG_PATH)) {
  existingLog = fs.readFileSync(LOG_PATH, 'utf8')
} else {
  existingLog =
    '# Vacancy Update Log\n\n' +
    'Newest run first. Every applied figure is recorded here with its source. ' +
    'Only rows marked "verified" are shown on the live site — see src/utils/provenance.js.\n\n---\n\n'
}
const [preamble, ...rest] = existingLog.split('---\n\n')
fs.writeFileSync(LOG_PATH, preamble + '---\n\n' + logLines.join('\n') + '\n' + rest.join('---\n\n'))

console.log(`\nWrote ${applied.length} update(s) to exams.json and vacancy-update-log.md.`)
console.log(`Removed ${applied.length} applied row(s) from vacancy-updates.csv; ${rejected.length} left for correction.`)

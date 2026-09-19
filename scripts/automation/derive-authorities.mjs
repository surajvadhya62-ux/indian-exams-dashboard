#!/usr/bin/env node

/**
 * derive-authorities.mjs
 *
 * Recalculates `src/data/authorities.json` — the list of distinct conducting bodies,
 * with which exams sit under each — from `src/data/exams.json`.
 *
 * This was a hand-generated, one-time snapshot (342 entries) that was never regenerated
 * as exams were added. It quietly went stale the moment a single new exam introduced a
 * conducting body that wasn't already in it — which is exactly what happened on
 * 2026-09-19/20: 10 new exams were added (see HANDOFF.md §10a), several under
 * authorities the snapshot had never seen, and nothing regenerated the file or the many
 * places across the UI that had "342" typed into them as a literal (Header.jsx,
 * StatsOverview.jsx, App.jsx's subtitle, WalkthroughTour.jsx, Feedback.jsx,
 * UpdatesFeed.jsx). Same shape of mistake as `exams.json.vacancies` before
 * derive-vacancy-summary.mjs existed (HANDOFF.md §2): a summary hand-maintained
 * separately from the source data will drift, and it did.
 *
 * The fix, same pattern as the other derive-*.mjs scripts in this directory: this file
 * is now CALCULATED from exams.json, never hand-edited. Re-run this whenever exams.json
 * changes. Everywhere the UI needs a live count of authorities, it should read
 * `authorities.json`'s length (or, where the richer per-authority object isn't needed,
 * derive the same number on the fly from `new Set(exams.map(e => e.conducting_body))` —
 * both are equivalent by construction once this script has run).
 *
 * Grouping rule: one entry per distinct `conducting_body` string. A body's `domain`,
 * `jurisdiction`, `state` and `website` are taken from the first exam (in exams.json's
 * own order) filed under it — matching the convention the original snapshot already
 * used (verified against its UPSC entry, a body that conducts exams across several
 * domains: its `domain` field is the domain of upsc-cse, the first UPSC exam in the
 * file, not a generic label). One improvement over the original snapshot: `website`
 * previously defaulted to the same generic "https://www.india.gov.in" for all 342
 * entries — every exam record already carries its own real `official_website`, so this
 * version uses that instead. Strictly more useful, never fabricated: it's the real
 * exam's own citation, just reused at the authority level.
 *
 * Before running this, fix any conducting_body spelling inconsistency in exams.json
 * itself (e.g. "MPESB" vs "MP ESB" vs a fully spelled-out name for the same real body) —
 * this script has no way to know two strings mean the same authority, and will happily
 * count them as two. Caught and fixed once already: see the exams.json diff alongside
 * this script's introduction.
 *
 * Usage:
 *   node scripts/automation/derive-authorities.mjs --dry-run   (report only, writes nothing)
 *   node scripts/automation/derive-authorities.mjs
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT_DIR = path.resolve(__dirname, '../..')
const EXAMS_JSON_PATH = path.join(ROOT_DIR, 'src/data/exams.json')
const AUTHORITIES_JSON_PATH = path.join(ROOT_DIR, 'src/data/authorities.json')

function loadJSON(p) {
  return JSON.parse(fs.readFileSync(p, 'utf-8'))
}

function slugify(name) {
  // '&' is treated as a word boundary (falls through to the generic
  // non-alphanumeric collapse below), not deleted outright — deleting it
  // fused adjacent tokens together (e.g. "J&K" -> "jk"), which produced a
  // different id than the pre-existing file's for the same real authority
  // and made every such entry look "renamed" in a diff. Only truly inert
  // punctuation (parens) is stripped outright.
  return name
    .toLowerCase()
    .replace(/[()]/g, '')
    .replace(/\//g, ' ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function deriveAuthorities(exams) {
  const byBody = new Map()

  for (const exam of exams) {
    const name = exam.conducting_body
    if (!name) continue
    if (!byBody.has(name)) {
      byBody.set(name, {
        id: slugify(name),
        name,
        domain: exam.domain,
        jurisdiction: exam.jurisdiction,
        state: exam.state,
        website: exam.official_website || null,
        exam_ids: [],
        exam_acronyms: [],
      })
    }
    const entry = byBody.get(name)
    entry.exam_ids.push(exam.id)
    entry.exam_acronyms.push(exam.acronym || exam.name)
  }

  return [...byBody.values()].sort((a, b) => a.name.localeCompare(b.name))
}

function main() {
  const isDryRun = process.argv.includes('--dry-run')
  const exams = loadJSON(EXAMS_JSON_PATH)
  const before = fs.existsSync(AUTHORITIES_JSON_PATH) ? loadJSON(AUTHORITIES_JSON_PATH) : []

  const after = deriveAuthorities(exams)

  const beforeIds = new Set(before.map(a => a.id))
  const afterIds = new Set(after.map(a => a.id))
  const added = after.filter(a => !beforeIds.has(a.id))
  const removed = before.filter(a => !afterIds.has(a.id))

  const label = isDryRun ? '[DRY RUN] ' : ''
  console.log(`\n${label}Authorities derived from ${exams.length} exams\n`)
  console.log(`  before : ${before.length}`)
  console.log(`  after  : ${after.length}`)
  console.log(`  added  : ${added.length}`)
  console.log(`  removed: ${removed.length}`)

  if (added.length) {
    console.log('\n  New authorities:')
    for (const a of added) console.log(`    + ${a.name}  (${a.exam_acronyms.join(', ')})`)
  }
  if (removed.length) {
    console.log('\n  Authorities no longer present:')
    for (const a of removed) console.log(`    - ${a.name}`)
  }

  if (!isDryRun) {
    fs.writeFileSync(AUTHORITIES_JSON_PATH, JSON.stringify(after, null, 2) + '\n', 'utf-8')
    console.log(`\n✓ Wrote ${AUTHORITIES_JSON_PATH.replace(ROOT_DIR + '/', '')}`)
  }
  console.log('')
}

main()

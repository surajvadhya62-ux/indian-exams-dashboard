#!/usr/bin/env node

/**
 * derive-record-tier.mjs
 *
 * Recalculates `exams.json` → `record_tier` from the dossiers in public/exam-details/.
 *
 * `record_tier` is a CALCULATED field, by the same design as `vacancies`
 * (scripts/automation/derive-vacancy-summary.mjs). Nobody edits it by hand — the moment
 * a hand-set flag can drift from what the dossier actually contains, it will, and this
 * project has already paid for that mistake once (HANDOFF.md §2). The decision behind
 * this field is written up in full at data-sourcing/DECISION-2026-09-19-record-tier.md.
 *
 * The rule, in full:
 *
 *   1. No dossier file at public/exam-details/<id>.json → "registry".
 *   2. A dossier file exists, but no section in it has status "available" → "registry".
 *      This is a stub in substance no matter how many keys the file has — it's exactly
 *      what sync-exams.mjs --add now produces for a newly discovered exam (every section
 *      written as not_available with an honest note), so a freshly added exam labels
 *      itself correctly with no extra step.
 *   3. Otherwise → "dossier".
 *
 * This does NOT grade partially-filled dossiers into a third tier. A dossier with some
 * sections available and some not is still "dossier" — the two-tier split is the policy
 * decision (INCLUSION-POLICY.md §4); per-section honesty on a partial dossier is already
 * handled by each tab's own "not yet compiled" message.
 *
 * Usage:
 *   node scripts/automation/derive-record-tier.mjs --dry-run   (report only, writes nothing)
 *   node scripts/automation/derive-record-tier.mjs
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT_DIR = path.resolve(__dirname, '../..')
const EXAMS_JSON_PATH = path.join(ROOT_DIR, 'src/data/exams.json')
const DETAILS_DIR = path.join(ROOT_DIR, 'public/exam-details')

const SECTION_KEYS = [
  'career_ladder',
  'exam_scheme',
  'financial_package',
  'competition_benchmarks',
  'official_downloads',
]

function loadJSON(p) {
  return JSON.parse(fs.readFileSync(p, 'utf-8'))
}

function deriveTierFor(examId) {
  const dossierPath = path.join(DETAILS_DIR, `${examId}.json`)
  if (!fs.existsSync(dossierPath)) return 'registry'

  const dossier = loadJSON(dossierPath)
  const hasAvailableSection = SECTION_KEYS.some(
    (key) => dossier?.[key]?.status === 'available'
  )
  return hasAvailableSection ? 'dossier' : 'registry'
}

function main() {
  const isDryRun = process.argv.includes('--dry-run')
  const exams = loadJSON(EXAMS_JSON_PATH)

  let toDossier = 0
  let toRegistry = 0
  let unchanged = 0
  const changes = []

  for (const exam of exams) {
    const newTier = deriveTierFor(exam.id)
    const oldTier = exam.record_tier ?? null

    if (oldTier !== newTier) {
      changes.push({ id: exam.id, from: oldTier, to: newTier })
    } else {
      unchanged++
    }

    if (newTier === 'dossier') toDossier++
    else toRegistry++

    if (!isDryRun) {
      exam.record_tier = newTier
    }
  }

  if (!isDryRun) {
    fs.writeFileSync(EXAMS_JSON_PATH, JSON.stringify(exams, null, 2) + '\n', 'utf-8')
  }

  const label = isDryRun ? '[DRY RUN] ' : ''
  console.log(`\n${label}Record tier derived from ${exams.length} dossiers\n`)
  console.log(`  dossier  : ${toDossier}`)
  console.log(`  registry : ${toRegistry}`)
  console.log(`  changed  : ${changes.length}`)
  console.log(`  unchanged: ${unchanged}`)

  if (changes.length) {
    console.log('')
    for (const c of changes) {
      console.log(`    ${c.id.padEnd(34)} ${String(c.from).padEnd(10)} -> ${c.to}`)
    }
  }
  console.log('')
}

main()

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
 *   2. A dossier file exists, but none of the PROFILE_SECTION_KEYS has status
 *      "available" → "registry". This is a stub in substance no matter how many keys
 *      the file has.
 *   3. Otherwise → "dossier".
 *
 * This does NOT grade partially-filled dossiers into a third tier. A dossier with some
 * sections available and some not is still "dossier" — the two-tier split is the policy
 * decision (INCLUSION-POLICY.md §4); per-section honesty on a partial dossier is already
 * handled by each tab's own "not yet compiled" message.
 *
 * **`official_downloads` is deliberately excluded from PROFILE_SECTION_KEYS — this was a
 * real bug, found and fixed 2026-09-19 (the same day this script was written).** The
 * original version checked all five section keys including `official_downloads`, on the
 * assumption (stated in DECISION-2026-09-19-record-tier.md) that `sync-exams.mjs --add`
 * always writes every section `not_available` for a fresh exam. That was true only when no
 * website was known — but `--add` now *requires* `--website` (HANDOFF.md §2a), so
 * `createDetailDossierTemplate()` in sync-exams.mjs always marks `official_downloads:
 * { status: "available" }` for every new exam (it holds the one discovery source link).
 * The result: every exam added via `--add` was silently classified "dossier" tier on its
 * very first run, never "registry" — the opposite of the documented intent, and the exact
 * kind of one-section-holds-a-link-so-it-counts-as-done trap this project's other stub
 * labelling was built to avoid. Caught by testing the 10 exams added 2026-09-19 from the
 * discovery queue (§10a) before trusting the output. Verified the fix reclassifies exactly
 * those 10 to "registry" and none of the pre-existing 499 dossiers.
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

// Sections that constitute actual dossier depth. `official_downloads` is NOT included —
// see the file header comment for why: every exam added via sync-exams.mjs --add carries
// an `official_downloads` section marked "available" (it holds the discovery source link),
// which would make a bare stub indistinguishable from a real dossier.
const PROFILE_SECTION_KEYS = [
  'career_ladder',
  'exam_scheme',
  'financial_package',
  'competition_benchmarks',
]

function loadJSON(p) {
  return JSON.parse(fs.readFileSync(p, 'utf-8'))
}

function deriveTierFor(examId) {
  const dossierPath = path.join(DETAILS_DIR, `${examId}.json`)
  if (!fs.existsSync(dossierPath)) return 'registry'

  const dossier = loadJSON(dossierPath)
  const hasAvailableSection = PROFILE_SECTION_KEYS.some(
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

#!/usr/bin/env node
/**
 * Automated validation gate for exam dossiers (public/exam-details/<id>.json).
 * Enforces schema integrity, enum validity, citation attribution, and tier rules.
 *
 * Usage:
 *   node scripts/data-sourcing/validate-details.mjs [file-or-dir]
 * Example:
 *   node scripts/data-sourcing/validate-details.mjs public/exam-details/upsc-cse.json
 *   node scripts/data-sourcing/validate-details.mjs
 */

import { readFileSync, readdirSync, statSync } from 'node:fs'
import { basename, join, resolve } from 'node:path'

const EXAMS_FILE = 'src/data/exams.json'
const QUEUE_FILE = 'data-sourcing/work-queue.json'
const DETAILS_DIR = 'public/exam-details'

const exams = JSON.parse(readFileSync(EXAMS_FILE, 'utf8'))
const examsById = new Map(exams.map((e) => [e.id, e]))

let queueById = new Map()
try {
  const queue = JSON.parse(readFileSync(QUEUE_FILE, 'utf8'))
  for (const unit of queue.units || []) {
    for (const exam of unit.exams || []) {
      queueById.set(exam.id, { unit_id: unit.unit_id, ...exam })
    }
  }
} catch {
  // Queue might not be present or might be unparsed
}

const ALLOWED_TOP_KEYS = new Set([
  'id',
  'schema_version',
  'last_reviewed',
  'career_ladder',
  'exam_scheme',
  'financial_package',
  'competition_benchmarks',
  'official_downloads',
])

const VALID_STATUSES = new Set(['available', 'not_available'])
const VALID_CONFIDENCES = new Set(['verified', 'reported', 'estimate'])
const VALID_LINK_TYPES = new Set(['notification', 'syllabus', 'pyq', 'other'])

// Registry-minimum fields per INCLUSION-POLICY.md §4 — every exams.json record
// must carry these regardless of whether it has a full dossier behind it.
const REGISTRY_REQUIRED_FIELDS = [
  'id',
  'name',
  'conducting_body',
  'track',
  'min_qualification',
  'frequency',
  'official_website',
]
const VALID_TRACKS = new Set(['R', 'A', 'Q'])
const VALID_RECORD_TIERS = new Set(['registry', 'dossier'])

/**
 * Validates a single exams.json record against the registry minimum and,
 * where `record_tier` is present, its consistency with the dossier folder.
 *
 * This is the check that closes the gap `npm run validate` used to have:
 * the per-file loop below only ever looked at files that already exist in
 * public/exam-details/, so a record sitting in exams.json with nothing
 * behind it was invisible to validation entirely. See
 * data-sourcing/DECISION-2026-09-19-record-tier.md §4.
 */
export function validateRegistryRecord(exam, dossierIds) {
  const errors = []
  const id = exam.id || '(missing id)'

  for (const field of REGISTRY_REQUIRED_FIELDS) {
    const value = exam[field]
    if (value === undefined || value === null || (typeof value === 'string' && !value.trim())) {
      errors.push(`exams.json record "${id}": missing registry-minimum field "${field}"`)
    }
  }

  if (exam.track !== undefined && !VALID_TRACKS.has(exam.track)) {
    errors.push(`exams.json record "${id}": invalid "track" ("${exam.track}"), must be R | A | Q`)
  }

  if (exam.record_tier === undefined) {
    errors.push(`exams.json record "${id}": missing "record_tier" — run "npm run derive-tiers"`)
  } else if (!VALID_RECORD_TIERS.has(exam.record_tier)) {
    errors.push(`exams.json record "${id}": invalid "record_tier" ("${exam.record_tier}"), must be "registry" | "dossier"`)
  } else if (exam.record_tier === 'dossier' && !dossierIds.has(id)) {
    errors.push(`exams.json record "${id}": record_tier is "dossier" but no file exists at public/exam-details/${id}.json`)
  }

  return errors
}

const REQUIRED_DA_PERCENT = 58
const REQUIRED_DA_AS_OF = '2025-07-01'

export function validateDossier(filePath, rawContent) {
  const errors = []
  const warnings = []
  const filename = basename(filePath)
  const expectedId = filename.replace(/\.json$/, '')

  let doc
  try {
    doc = JSON.parse(rawContent)
  } catch (err) {
    return {
      id: expectedId,
      filePath,
      errors: [`Invalid JSON syntax: ${err.message}`],
      warnings: [],
    }
  }

  // 1. Basic Identity
  if (!doc.id) {
    errors.push('Missing top-level "id"')
  } else if (doc.id !== expectedId) {
    errors.push(`Top-level "id" ("${doc.id}") does not match filename ("${expectedId}")`)
  }

  const examMeta = examsById.get(expectedId)
  if (!examMeta) {
    errors.push(`Exam id "${expectedId}" is not present in ${EXAMS_FILE}`)
  }

  if (doc.schema_version !== 1) {
    errors.push(`"schema_version" must be 1, found: ${doc.schema_version}`)
  }

  if (!doc.last_reviewed || !/^\d{4}-\d{2}-\d{2}$/.test(doc.last_reviewed)) {
    errors.push(`"last_reviewed" must be a valid ISO date YYYY-MM-DD, found: "${doc.last_reviewed}"`)
  }

  // Check for unknown top-level keys
  for (const key of Object.keys(doc)) {
    if (!ALLOWED_TOP_KEYS.has(key)) {
      errors.push(`Unknown top-level key "${key}"`)
    }
  }

  const isEntrance = examMeta?.exam_type === 'entrance'

  // 2. Entrance Exam Rule: career_ladder and financial_package must be completely omitted
  if (isEntrance) {
    if ('career_ladder' in doc) {
      errors.push('Entrance exam must OMIT "career_ladder" key entirely (do not include even as not_available)')
    }
    if ('financial_package' in doc) {
      errors.push('Entrance exam must OMIT "financial_package" key entirely (do not include even as not_available)')
    }
  }

  // Helper to validate section header (status & note)
  function checkSectionMeta(sectionName, sectionObj, isRequired) {
    if (!sectionObj) {
      if (isRequired) {
        errors.push(`Section "${sectionName}" is required but missing`)
      }
      return false
    }
    if (typeof sectionObj !== 'object' || Array.isArray(sectionObj)) {
      errors.push(`Section "${sectionName}" must be an object`)
      return false
    }
    if (!VALID_STATUSES.has(sectionObj.status)) {
      errors.push(`Section "${sectionName}.status" must be "available" | "not_available", found: "${sectionObj.status}"`)
    }
    if (sectionObj.status === 'not_available') {
      if (!sectionObj.note || typeof sectionObj.note !== 'string' || !sectionObj.note.trim()) {
        errors.push(`Section "${sectionName}" is marked "not_available" but has no explanatory "note"`)
      }
      return false
    }
    return true
  }

  const queueEntry = queueById.get(expectedId)
  const reqSections = new Set(queueEntry?.sections_required || [])

  // 3. Career Ladder (Job exams only)
  if (!isEntrance && 'career_ladder' in doc) {
    if (checkSectionMeta('career_ladder', doc.career_ladder, reqSections.has('career_ladder'))) {
      if (!Array.isArray(doc.career_ladder.steps)) {
        errors.push('career_ladder.steps must be an array')
      } else {
        doc.career_ladder.steps.forEach((step, idx) => {
          const loc = `career_ladder.steps[${idx}]`
          if (!step.designation) errors.push(`${loc}: missing "designation"`)
          if (!step.pay_level) errors.push(`${loc}: missing "pay_level"`)
          if (!VALID_CONFIDENCES.has(step.confidence)) {
            errors.push(`${loc}: invalid confidence "${step.confidence}"`)
          }
          if (!step.as_of) errors.push(`${loc}: missing "as_of"`)
          if (!step.source_url) errors.push(`${loc}: missing "source_url"`)
          if (!step.source_label) errors.push(`${loc}: missing "source_label"`)
        })
      }
    }
  }

  // 4. Exam Scheme
  if ('exam_scheme' in doc) {
    if (checkSectionMeta('exam_scheme', doc.exam_scheme, reqSections.has('exam_scheme'))) {
      if (!Array.isArray(doc.exam_scheme.stages)) {
        errors.push('exam_scheme.stages must be an array')
      } else {
        doc.exam_scheme.stages.forEach((stage, sIdx) => {
          const loc = `exam_scheme.stages[${sIdx}]`
          if (!stage.stage_name) errors.push(`${loc}: missing "stage_name"`)
          if (typeof stage.stage_order !== 'number') errors.push(`${loc}: stage_order must be a number`)
          if (!VALID_CONFIDENCES.has(stage.confidence)) {
            errors.push(`${loc}: invalid confidence "${stage.confidence}"`)
          }
          if (!stage.as_of) errors.push(`${loc}: missing "as_of"`)
          if (!stage.source_url) errors.push(`${loc}: missing "source_url"`)
          if (!stage.source_label) errors.push(`${loc}: missing "source_label"`)

          if (!Array.isArray(stage.papers)) {
            errors.push(`${loc}: papers must be an array`)
          } else {
            stage.papers.forEach((paper, pIdx) => {
              const pLoc = `${loc}.papers[${pIdx}]`
              if (!paper.paper_name) errors.push(`${pLoc}: missing "paper_name"`)
              if (typeof paper.qualifying_only !== 'boolean') {
                errors.push(`${pLoc}: qualifying_only must be a boolean`)
              }
            })
          }
        })
      }
    }
  }

  // 5. Financial Package (Job exams only)
  if (!isEntrance && 'financial_package' in doc) {
    if (checkSectionMeta('financial_package', doc.financial_package, reqSections.has('financial_package'))) {
      const fp = doc.financial_package
      if (!fp.pay_level) errors.push('financial_package: missing "pay_level"')
      if (typeof fp.entry_basic_pay !== 'number') errors.push('financial_package: entry_basic_pay must be a number')
      if (!VALID_CONFIDENCES.has(fp.pay_confidence)) {
        errors.push(`financial_package: invalid pay_confidence "${fp.pay_confidence}"`)
      }
      if (!fp.pay_as_of) errors.push('financial_package: missing "pay_as_of"')
      if (!fp.pay_source_url) errors.push('financial_package: missing "pay_source_url"')
      if (!fp.pay_source_label) errors.push('financial_package: missing "pay_source_label"')

      // Project constant enforcement (§5.2)
      if (fp.da_percent_as_of_review !== REQUIRED_DA_PERCENT) {
        errors.push(`financial_package: da_percent_as_of_review must be exactly ${REQUIRED_DA_PERCENT}, found: ${fp.da_percent_as_of_review}`)
      }
      if (fp.da_as_of !== REQUIRED_DA_AS_OF) {
        errors.push(`financial_package: da_as_of must be exactly "${REQUIRED_DA_AS_OF}", found: "${fp.da_as_of}"`)
      }

      if (!fp.gross_range_estimate || typeof fp.gross_range_estimate.min !== 'number' || typeof fp.gross_range_estimate.max !== 'number') {
        errors.push('financial_package: gross_range_estimate must have numeric min and max')
      }
      if (!fp.in_hand_range_estimate || typeof fp.in_hand_range_estimate.min !== 'number' || typeof fp.in_hand_range_estimate.max !== 'number') {
        errors.push('financial_package: in_hand_range_estimate must have numeric min and max')
      }
      if (!VALID_CONFIDENCES.has(fp.estimate_confidence)) {
        errors.push(`financial_package: invalid estimate_confidence "${fp.estimate_confidence}"`)
      }
      if (!Array.isArray(fp.official_perks)) {
        errors.push('financial_package: official_perks must be an array')
      }
      if (!VALID_CONFIDENCES.has(fp.perks_confidence)) {
        errors.push(`financial_package: invalid perks_confidence "${fp.perks_confidence}"`)
      }
    }
  }

  // 6. Competition Benchmarks
  if ('competition_benchmarks' in doc) {
    if (checkSectionMeta('competition_benchmarks', doc.competition_benchmarks, reqSections.has('competition_benchmarks'))) {
      if (!Array.isArray(doc.competition_benchmarks.years)) {
        errors.push('competition_benchmarks.years must be an array')
      } else {
        doc.competition_benchmarks.years.forEach((yr, idx) => {
          const loc = `competition_benchmarks.years[${idx}]`
          if (typeof yr.year !== 'number') errors.push(`${loc}: missing or non-numeric "year"`)
          if (!VALID_CONFIDENCES.has(yr.confidence)) {
            errors.push(`${loc}: invalid confidence "${yr.confidence}"`)
          }
          if (!yr.as_of) errors.push(`${loc}: missing "as_of"`)
          if (yr.confidence === 'verified' && !yr.source_url) {
            errors.push(`${loc}: verified benchmark must have non-empty "source_url"`)
          }
        })
      }
    }
  }

  // 7. Official Downloads
  if ('official_downloads' in doc) {
    if (checkSectionMeta('official_downloads', doc.official_downloads, reqSections.has('official_downloads'))) {
      if (!Array.isArray(doc.official_downloads.links)) {
        errors.push('official_downloads.links must be an array')
      } else {
        doc.official_downloads.links.forEach((lnk, idx) => {
          const loc = `official_downloads.links[${idx}]`
          if (!lnk.label) errors.push(`${loc}: missing "label"`)
          if (!lnk.url) errors.push(`${loc}: missing "url"`)
          if (!VALID_LINK_TYPES.has(lnk.type)) {
            errors.push(`${loc}: invalid type "${lnk.type}" (must be notification|syllabus|pyq|other)`)
          }
          if (!VALID_CONFIDENCES.has(lnk.confidence)) {
            errors.push(`${loc}: invalid confidence "${lnk.confidence}"`)
          }
          if (!lnk.as_of) errors.push(`${loc}: missing "as_of"`)
        })
      }
    }
  }

  // 8. Verify all required sections for the assigned tier are present
  for (const sec of reqSections) {
    if (!(sec in doc)) {
      errors.push(`Required section "${sec}" is missing from dossier`)
    }
  }

  return {
    id: expectedId,
    filePath,
    errors,
    warnings,
  }
}

function run() {
  const target = process.argv[2] || DETAILS_DIR
  let files = []

  try {
    const st = statSync(target)
    if (st.isDirectory()) {
      files = readdirSync(target)
        .filter((f) => f.endsWith('.json'))
        .map((f) => join(target, f))
    } else {
      files = [target]
    }
  } catch (err) {
    console.error(`Error opening path "${target}": ${err.message}`)
    process.exit(1)
  }

  console.log(`Validating ${files.length} dossier file(s)...`)
  let totalErrors = 0
  let totalWarnings = 0

  for (const file of files) {
    const raw = readFileSync(file, 'utf8')
    const res = validateDossier(file, raw)
    if (res.errors.length === 0 && res.warnings.length === 0) {
      console.log(`  ✓ ${basename(file)} [PASS]`)
    } else {
      console.log(`  ✗ ${basename(file)} [FAIL]`)
      res.errors.forEach((e) => console.log(`      ERROR: ${e}`))
      res.warnings.forEach((w) => console.log(`      WARN:  ${w}`))
      totalErrors += res.errors.length
      totalWarnings += res.warnings.length
    }
  }

  console.log()
  console.log(`Summary (dossier files): ${files.length} checked, ${totalErrors} error(s), ${totalWarnings} warning(s)`)

  // Only run the registry-wide pass when validating the whole details
  // directory — a single-file invocation (e.g. checking one exam mid-batch)
  // has no reason to also re-check the other 498 exams.json records.
  if (!process.argv[2]) {
    console.log()
    console.log(`Validating exams.json registry (${exams.length} record(s))...`)

    const dossierIds = new Set(
      readdirSync(DETAILS_DIR)
        .filter((f) => f.endsWith('.json'))
        .map((f) => f.replace(/\.json$/, ''))
    )

    const idCounts = new Map()
    for (const exam of exams) {
      idCounts.set(exam.id, (idCounts.get(exam.id) || 0) + 1)
    }

    let registryErrors = 0
    for (const exam of exams) {
      const errs = validateRegistryRecord(exam, dossierIds)
      if (idCounts.get(exam.id) > 1) {
        errs.push(`exams.json record "${exam.id}": duplicate id (appears ${idCounts.get(exam.id)} times)`)
      }
      errs.forEach((e) => console.log(`  ERROR: ${e}`))
      registryErrors += errs.length
    }

    console.log()
    console.log(`Summary (registry): ${exams.length} checked, ${registryErrors} error(s)`)
    totalErrors += registryErrors
  }

  if (totalErrors > 0) {
    process.exit(1)
  }
}

if (process.argv[1] && resolve(process.argv[1]) === resolve(new URL(import.meta.url).pathname)) {
  run()
}

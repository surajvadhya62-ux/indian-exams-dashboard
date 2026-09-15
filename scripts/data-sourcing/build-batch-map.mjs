#!/usr/bin/env node
/**
 * One-time (re-run only when exams.json gains new records) generator that
 * applies data-sourcing/batch-rules.json to every exam in src/data/exams.json
 * and produces the frozen data-sourcing/batches.json mapping.
 *
 * Stability guarantee: an id that already has a batch_id in the existing
 * batches.json is never reassigned, even if the rules change — it only
 * ever gets appended to `unassigned` for a fresh, small human review pass.
 *
 * Usage: node scripts/data-sourcing/build-batch-map.mjs
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..', '..')

const exams = JSON.parse(readFileSync(join(ROOT, 'src/data/exams.json'), 'utf-8'))
const rulesDoc = JSON.parse(readFileSync(join(ROOT, 'data-sourcing/batch-rules.json'), 'utf-8'))
const batchesPath = join(ROOT, 'data-sourcing/batches.json')
const existing = existsSync(batchesPath) ? JSON.parse(readFileSync(batchesPath, 'utf-8')) : null

// id -> batch_id, from any prior frozen mapping — never reassigned
const frozen = new Map()
if (existing) {
  for (const [batchId, b] of Object.entries(existing.batches || {})) {
    for (const id of b.exam_ids || []) frozen.set(id, batchId)
  }
}

function matches(exam, rule) {
  const m = rule.match
  if (m.jurisdiction && exam.jurisdiction !== m.jurisdiction) return false
  if (m.conducting_body_in && !m.conducting_body_in.includes(exam.conducting_body)) return false
  if (m.conducting_body_matches_any) {
    const hay = exam.conducting_body.toLowerCase()
    if (!m.conducting_body_matches_any.some((s) => hay.includes(s.toLowerCase()))) return false
  }
  return true
}

const batches = {}
for (const rule of rulesDoc.rules) {
  batches[rule.batch_id] = { label: rule.label, exam_ids: [] }
}
const unassigned = []

for (const exam of exams) {
  if (frozen.has(exam.id)) {
    const bid = frozen.get(exam.id)
    if (!batches[bid]) batches[bid] = { label: existing.batches[bid]?.label || bid, exam_ids: [] }
    batches[bid].exam_ids.push(exam.id)
    continue
  }
  let matched = null
  for (const rule of rulesDoc.rules) {
    if (matches(exam, rule)) { matched = rule.batch_id; break }
  }
  if (matched) batches[matched].exam_ids.push(exam.id)
  else unassigned.push(exam.id)
}

// sub-batch state-jurisdiction bodies (batch-4, batch-5, batch-7) by their
// `state` field, purely for session-pacing — provenance/batch_id unchanged
const subBatched = {}
for (const [batchId, b] of Object.entries(batches)) {
  if (!['batch-4-state-psc', 'batch-5-subordinate-police-boards', 'batch-7-state-other'].includes(batchId)) {
    subBatched[batchId] = b
    continue
  }
  const byState = {}
  for (const id of b.exam_ids) {
    const exam = exams.find((e) => e.id === id)
    const state = exam.state || 'Unknown'
    const subId = `${batchId}--${state.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
    if (!byState[subId]) byState[subId] = { label: `${b.label} — ${state}`, parent_batch: batchId, exam_ids: [] }
    byState[subId].exam_ids.push(id)
  }
  Object.assign(subBatched, byState)
}

const totalAssigned = Object.values(subBatched).reduce((n, b) => n + b.exam_ids.length, 0)

const out = {
  generated_at: '2026-09-11',
  source_description: rulesDoc.description,
  totals: { exams: exams.length, assigned: totalAssigned, unassigned: unassigned.length },
  batches: subBatched,
  unassigned,
}

writeFileSync(batchesPath, JSON.stringify(out, null, 2) + '\n')

console.log(`Total exams: ${exams.length}`)
console.log(`Assigned: ${totalAssigned}`)
console.log(`Unassigned: ${unassigned.length}`)
console.log()
console.log('Per top-level batch:')
const topLevel = {}
for (const [id, b] of Object.entries(subBatched)) {
  const top = b.parent_batch || id
  topLevel[top] = (topLevel[top] || 0) + b.exam_ids.length
}
for (const [id, n] of Object.entries(topLevel).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${String(n).padStart(4)}  ${id}`)
}

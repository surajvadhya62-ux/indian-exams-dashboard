/**
 * Generates data-sourcing/work-queue.json — the fully enumerated, ordered
 * research queue handed to an external researcher.
 *
 * Re-run after exams.json or batches.json changes:
 *   node scripts/data-sourcing/build-work-queue.mjs
 *
 * Units are sized by research weight rather than raw exam count, because a
 * Tier A dossier is several times the work of a Tier C one. A unit is one
 * researcher session.
 */

import { readFileSync, writeFileSync } from 'node:fs'

const exams = JSON.parse(readFileSync('src/data/exams.json', 'utf8'))
const batches = JSON.parse(readFileSync('data-sourcing/batches.json', 'utf8'))
const progress = JSON.parse(readFileSync('data-sourcing/progress.json', 'utf8'))

const byId = new Map(exams.map((e) => [e.id, e]))

const TIER_BY_POPULARITY = { very_high: 'A', high: 'B', medium: 'C', low: 'C' }

// Popularity alone under-serves the flagship recruiters: UPSC IFS and CAPF AC
// are not tagged `very_high`, but shipping them as links-only would leave a
// visible quality hole on the most prestigious exams on the site. Floor the
// premier central bodies so they always get full or near-full depth.
const TIER_FLOOR_BY_BATCH = {
  'batch-1-central-commissions': 'A',
  'batch-2-ssc-railways': 'B',
  'batch-3-banking-insurance': 'B',
}
const RANK = { A: 0, B: 1, C: 2 }
const applyFloor = (tier, batchId) => {
  const floor = TIER_FLOOR_BY_BATCH[batchId]
  return floor && RANK[floor] < RANK[tier] ? floor : tier
}
const WEIGHT = { A: 1, B: 8 / 15, C: 8 / 25 }
const UNIT_CAP = 8 // weighted, ≈8 Tier A / 15 Tier B / 25 Tier C per session

const JOB_SECTIONS = [
  'career_ladder',
  'exam_scheme',
  'financial_package',
  'competition_benchmarks',
  'official_downloads',
]
// Entrance exams have no recruitment ladder or salary — those keys are
// omitted entirely, per RESEARCH-GUIDE.md.
const ENTRANCE_SECTIONS = ['exam_scheme', 'competition_benchmarks', 'official_downloads']

function sectionsFor(exam, tier) {
  const base = exam.exam_type === 'entrance' ? ENTRANCE_SECTIONS : JOB_SECTIONS
  if (tier === 'A') return { required: base, best_effort: [] }
  if (tier === 'B') {
    return {
      required: base.filter((s) => s === 'exam_scheme' || s === 'official_downloads'),
      best_effort: base.filter((s) => s !== 'exam_scheme' && s !== 'official_downloads'),
    }
  }
  return {
    required: ['official_downloads'],
    best_effort: base.filter((s) => s !== 'official_downloads'),
  }
}

/* ---------- batch-6 is 195 exams across 153 bodies: split thematically ---------- */

const B6_GROUPS = [
  ['6a-national-entrance-tests', 'National entrance tests (NTA & academic admissions)',
    /^(NTA|CBSE|Council of Architecture|Consortium of NLUs|NLU Delhi|NID|NIFT|FDDI|AIMA|AIMS|AMU|JMI|CUSAT|IMU|TISS|CMI|JBIMS|NIBM|Madras School of Economics|IGIDR|NCERT|KVS|Navodaya)/i],
  ['6b-defence-direct-entry', 'Defence, paramilitary & strategic direct entry',
    /(Indian Army|Indian Navy|Indian Air Force|^IAF|Indian Coast Guard|DRDO|RAC \/ DRDO|AFMC|Military Engineer|NIA|Ministry of Home Affairs)/i],
  ['6c-research-premier-institutes', 'Premier institutes & national research bodies',
    /(IIT|IISc|IIM|IISER|NISER|TIFR|ISI Kolkata|JEST|HBCSE|NBHM|C-DAC|ISRO|BARC|NPCIL|NIELIT)/i],
  ['6d-medical-health', 'Medical & health services bodies',
    /(AIIMS|PGIMER|JIPMER|NBE|NBEMS|ESIC|CGHS|DGHS)/i],
  ['6e-judiciary-regulators-professional', 'Judiciary, regulators & professional bodies',
    /(Supreme Court|High Court|Bar Council|ICAI|ICSI|ICMAI|Bureau of Indian Standards|FSSAI|IFSCA|Comptroller and Auditor General|Geological Survey|ASRB|ICAR|ICFRE)/i],
  ['6f-central-psus', 'Central PSUs & statutory corporations',
    /.*/], // catch-all: the remaining ~70 PSU recruiters
]

function b6Group(exam) {
  const body = exam.conducting_body || ''
  for (const [id, label, re] of B6_GROUPS) if (re.test(body)) return { id, label }
  return { id: '6f-central-psus', label: 'Central PSUs & statutory corporations' }
}

/* ---------- assemble logical groups in execution order ---------- */

const PRIORITY_STATES = ['uttar-pradesh', 'bihar', 'maharashtra', 'tamil-nadu', 'rajasthan', 'madhya-pradesh']

function stateOf(batchKey) {
  const i = batchKey.indexOf('--')
  return i === -1 ? null : batchKey.slice(i + 2)
}

function orderedStateKeys(prefix) {
  const keys = Object.keys(batches.batches).filter((k) => k.startsWith(prefix + '--'))
  return keys.sort((a, b) => {
    const sa = PRIORITY_STATES.indexOf(stateOf(a))
    const sb = PRIORITY_STATES.indexOf(stateOf(b))
    if (sa !== -1 || sb !== -1) return (sa === -1 ? 99 : sa) - (sb === -1 ? 99 : sb)
    return a.localeCompare(b)
  })
}

const groups = []

for (const key of ['batch-1-central-commissions', 'batch-2-ssc-railways', 'batch-3-banking-insurance']) {
  groups.push({ batch_id: key, label: batches.batches[key].label, exam_ids: batches.batches[key].exam_ids })
}

for (const key of orderedStateKeys('batch-4-state-psc')) {
  groups.push({ batch_id: key, label: batches.batches[key].label, exam_ids: batches.batches[key].exam_ids })
}
for (const key of orderedStateKeys('batch-5-subordinate-police-boards')) {
  groups.push({ batch_id: key, label: batches.batches[key].label, exam_ids: batches.batches[key].exam_ids })
}

const b6 = batches.batches['batch-6-central-psu-defence-institute']
const b6Buckets = new Map()
for (const id of b6.exam_ids) {
  const g = b6Group(byId.get(id))
  if (!b6Buckets.has(g.id)) b6Buckets.set(g.id, { batch_id: `batch-${g.id}`, label: g.label, exam_ids: [] })
  b6Buckets.get(g.id).exam_ids.push(id)
}
for (const [, v] of [...b6Buckets].sort((a, b) => a[0].localeCompare(b[0]))) groups.push(v)

for (const key of orderedStateKeys('batch-7-state-other')) {
  groups.push({ batch_id: key, label: batches.batches[key].label, exam_ids: batches.batches[key].exam_ids })
}

for (const key of Object.keys(batches.batches)) {
  if (!groups.some((g) => g.batch_id === key) && !key.startsWith('batch-6-central')) {
    const b = batches.batches[key]
    if (b.exam_ids.length) groups.push({ batch_id: key, label: b.label, exam_ids: b.exam_ids })
  }
}

/* ---------- split groups into weight-capped units ---------- */

const units = []
let order = 0

for (const g of groups) {
  const pending = g.exam_ids.filter((id) => progress.exams[id]?.overall_status !== 'verified')
  if (!pending.length) continue

  const entries = pending.map((id) => {
    const e = byId.get(id)
    const tier = applyFloor(TIER_BY_POPULARITY[e.popularity] || 'C', g.batch_id)
    const { required, best_effort } = sectionsFor(e, tier)
    return {
      id,
      name: e.name,
      exam_type: e.exam_type,
      jurisdiction: e.jurisdiction,
      state: e.state,
      conducting_body: e.conducting_body,
      official_website: e.official_website,
      popularity: e.popularity,
      tier,
      sections_required: required,
      sections_best_effort: best_effort,
      omit_sections: e.exam_type === 'entrance' ? ['career_ladder', 'financial_package'] : [],
    }
  })
  entries.sort((a, b) => a.tier.localeCompare(b.tier))

  let cur = []
  let w = 0
  const flush = () => {
    if (!cur.length) return
    order += 1
    const mix = { A: 0, B: 0, C: 0 }
    cur.forEach((x) => (mix[x.tier] += 1))
    units.push({
      unit_id: `u${String(order).padStart(3, '0')}`,
      order,
      batch_id: g.batch_id,
      label: g.label,
      exam_count: cur.length,
      tier_mix: mix,
      status: 'not_started',
      exams: cur,
    })
    cur = []
    w = 0
  }
  for (const e of entries) {
    if (w + WEIGHT[e.tier] > UNIT_CAP && cur.length) flush()
    cur.push(e)
    w += WEIGHT[e.tier]
  }
  flush()
}

/* ---------- duplicate detection: same exam entered more than once ----------
 * High precision over high recall: only flags records from the SAME
 * conducting body whose acronym or target-role tokens are a subset of the
 * other's. That catches "NDA" vs "NDA & NA" and "ONGC GT" vs "ONGC
 * Graduate Trainee", while leaving genuinely distinct siblings alone
 * (JEE Main vs Advanced, NEET UG vs PG — neither is a subset of the other).
 */

const tokens = (s) =>
  new Set(
    (s || '')
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter(Boolean)
  )
const isSubset = (a, b) => a.size > 0 && a.size < b.size && [...a].every((t) => b.has(t))
const sameSet = (a, b) => a.size > 0 && a.size === b.size && [...a].every((t) => b.has(t))

const review_flags = []
for (let i = 0; i < exams.length; i++) {
  for (let j = i + 1; j < exams.length; j++) {
    const x = exams[i]
    const y = exams[j]
    if (!x.conducting_body || x.conducting_body !== y.conducting_body) continue

    const ax = tokens(x.acronym)
    const ay = tokens(y.acronym)
    const rx = tokens(x.target_role)
    const ry = tokens(y.target_role)

    const acronymDup = sameSet(ax, ay) || isSubset(ax, ay) || isSubset(ay, ax)
    const roleDup = sameSet(rx, ry) || isSubset(rx, ry) || isSubset(ry, rx)
    if (!acronymDup && !roleDup) continue

    review_flags.push({
      issue: 'possible_duplicate_exam_records',
      matched_on: acronymDup && roleDup ? 'acronym+target_role' : acronymDup ? 'acronym' : 'target_role',
      detail:
        'Same conducting body, and one record\'s acronym/target-role is a subset of the other\'s. Resolve (merge, or differentiate the records) BEFORE research — otherwise near-identical dossiers get produced, or differences get invented to justify keeping both.',
      records: [x, y].map((e) => ({
        id: e.id,
        name: e.name,
        acronym: e.acronym,
        target_role: e.target_role,
        conducting_body: e.conducting_body,
      })),
    })
  }
}

/* ---------- write ---------- */

const totals = {
  exams_total: exams.length,
  already_verified: exams.filter((e) => progress.exams[e.id]?.overall_status === 'verified').length,
  exams_queued: units.reduce((n, u) => n + u.exam_count, 0),
  units: units.length,
  tier_totals: units.reduce(
    (acc, u) => ({ A: acc.A + u.tier_mix.A, B: acc.B + u.tier_mix.B, C: acc.C + u.tier_mix.C }),
    { A: 0, B: 0, C: 0 }
  ),
}

writeFileSync(
  'data-sourcing/work-queue.json',
  JSON.stringify(
    {
      schema_version: 1,
      generated_at: new Date().toISOString().slice(0, 10),
      generated_by: 'scripts/data-sourcing/build-work-queue.mjs',
      how_to_use:
        'One unit = one researcher session. Work units in ascending `order`. Each exam carries its own tier and the exact sections required of it. Do not merge units — unit size is calibrated to the point where citation discipline starts to degrade.',
      tier_policy: {
        A: 'popularity very_high — every applicable section researched and cited',
        B: 'popularity high — exam_scheme + official_downloads required; others best-effort, not_available if not readily published',
        C: 'popularity medium/low — official_downloads required; others best-effort, not_available if not readily published',
      },
      fixed_constants: { da_percent_as_of_review: 58, da_as_of: '2025-07-01' },
      totals,
      review_flags,
      units,
    },
    null,
    2
  ) + '\n'
)

console.log(`units: ${totals.units}  queued: ${totals.exams_queued}  verified: ${totals.already_verified}`)
console.log(`tiers: A=${totals.tier_totals.A} B=${totals.tier_totals.B} C=${totals.tier_totals.C}`)
console.log(`duplicate-name flags: ${review_flags.length}`)

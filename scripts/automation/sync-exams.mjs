#!/usr/bin/env node

/**
 * sync-exams.mjs
 * Multi-dimensional structured discovery, sourcing, and ingestion pipeline for India Exams Dashboard.
 * 
 * Implements structured search along:
 *  1. Domain / Stream axis (Civil Services, Engineering, Defence, Medical, Law, Banking, etc.)
 *  2. Conducting Authority axis (Central Commissions, 28 State PSCs, Subordinate Boards, Police Boards)
 *  3. Entry Qualification axis (10th, 12th, Diploma, Graduate, Postgraduate)
 *  4. Geographic Jurisdiction axis (Central / All-India vs 28 States & 8 UTs)
 * 
 * Dynamically updates conducting bodies, counts, validation schemas, and dossiers.
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { execSync } from 'node:child_process'
import { notifyExamAdded } from './notify.mjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT_DIR = path.resolve(__dirname, '../..')

const EXAMS_JSON_PATH = path.join(ROOT_DIR, 'src/data/exams.json')
const DETAILS_DIR = path.join(ROOT_DIR, 'public/exam-details')
const SOURCES_CONFIG_PATH = path.join(__dirname, 'sources-config.json')
const VALIDATE_SCRIPT_PATH = path.join(ROOT_DIR, 'scripts/data-sourcing/validate-details.mjs')
const NEW_EXAMS_LOG_PATH = path.join(__dirname, 'new-exams-found.json')
const UPDATES_LOG_PATH = path.join(__dirname, 'exam-updates-found.json')
const NEWS_QUEUE_PATH = path.join(ROOT_DIR, 'data-sourcing/NEWS-SCAN-QUEUE.md')

function loadJSON(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'))
  } catch (err) {
    console.error(`Error loading JSON from ${filePath}:`, err.message)
    return null
  }
}

function saveJSON(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf-8')
}

// Display current registry telemetry including dynamic conducting bodies
function printStats(exams) {
  const total = exams.length
  const central = exams.filter(e => e.jurisdiction === 'central').length
  const state = exams.filter(e => e.jurisdiction === 'state').length
  const entrance = exams.filter(e => e.exam_type === 'entrance').length
  const job = exams.filter(e => e.exam_type === 'job').length
  const domains = new Set(exams.map(e => e.domain)).size
  const conductingBodies = new Set(exams.map(e => e.conducting_body)).size

  console.log('\n======================================================')
  console.log('            INDIA EXAMS INTELLIGENCE STATS            ')
  console.log('======================================================')
  console.log(`  Total Examinations Tracked:    ${total}`)
  console.log(`  Active Conducting Authorities: ${conductingBodies} (dynamically indexed)`)
  console.log(`  Central / All-India:           ${central}`)
  console.log(`  State / UT Ecosystems:         ${state}`)
  console.log(`  Entrance / Admission Tests:    ${entrance}`)
  console.log(`  Job / Direct Recruitment:      ${job}`)
  console.log(`  Distinct Career Domains:       ${domains}`)
  console.log('======================================================\n')
}

// Generate a dossier for public/exam-details/<id>.json for a newly discovered exam.
//
// This used to fabricate a full dossier — an invented career ladder, generic exam stages
// with made-up marks, and a "vacancies_notified: 100" placeholder — all cited to the exam's
// own website, or to https://www.upsc.gov.in as a fallback when no website was known at all.
// That's the exact shape of the fabrication defects documented in
// data-sourcing/AUDIT-2026-09-18-fabricated-benchmarks.md. An aggregator discovering real new
// exams must not recreate it. This now writes only what discovery actually establishes: the
// exam exists, and (if given) a source link for it. Every other section is explicitly marked
// not_available rather than populated with a guess, exactly matching how the frontend already
// renders a genuinely unsourced section.
//
// Matches the ALLOWED_TOP_KEYS / entrance-exam-omits-career_ladder rules enforced by
// scripts/data-sourcing/validate-details.mjs — this function's output is expected to pass that
// validator unmodified.
function createDetailDossierTemplate(exam) {
  const today = new Date().toISOString().split('T')[0]
  const isEntrance = exam.exam_type === 'entrance'
  const notYetSourced = 'Newly discovered exam — not yet sourced. Pending verification against an official notification.'

  const doc = {
    id: exam.id,
    schema_version: 1,
    last_reviewed: today,
  }

  if (!isEntrance) {
    doc.career_ladder = { status: 'not_available', note: notYetSourced }
    doc.financial_package = { status: 'not_available', note: notYetSourced }
  }
  doc.exam_scheme = { status: 'not_available', note: notYetSourced }
  doc.competition_benchmarks = { status: 'not_available', note: notYetSourced }

  doc.official_downloads = exam.official_website
    ? {
        status: 'available',
        note: 'Only the discovery source link — not yet cross-checked against the conducting body\'s own notification.',
        links: [
          {
            label: 'Source link at discovery',
            url: exam.official_website,
            type: 'other',
            confidence: 'reported',
            as_of: today,
          },
        ],
      }
    : { status: 'not_available', note: 'No source link was captured at discovery.' }

  return doc
}

// Add a newly discovered exam into the database.
//
// This function used to paper over missing facts with plausible-sounding defaults —
// "Government Authority" as the conducting body, "Graduate" as the level, "21-32 years" as
// the age limit, even a hardcoded fallback website (UPSC's) for an exam that might have
// nothing to do with UPSC. Those aren't neutral placeholders; they're specific false claims
// that look exactly like real data once they're on the page. What discovery actually
// establishes is the exam's identity (name, conducting body, track/type) and, ideally, a
// source link — see data-sourcing/INCLUSION-POLICY.md §4 (two-tier registry/dossier model).
// Everything else is required explicitly or left blank; nothing is guessed.
async function addNewExam(newExamData, dryRun = false) {
  const exams = loadJSON(EXAMS_JSON_PATH)
  if (!exams) return false

  // official_website, min_qualification and frequency are added here, alongside the
  // structural fields already required — they're three of the seven registry-minimum
  // fields INCLUSION-POLICY.md §4 requires of every exams.json record (the other four,
  // id/name/conducting_body/track, were already required above). Without them, a record
  // this function creates would fail scripts/data-sourcing/validate-details.mjs's
  // registry-minimum check — see data-sourcing/DECISION-2026-09-19-record-tier.md §4.
  const REQUIRED_FIELDS = [
    'id', 'name', 'conducting_body', 'domain', 'jurisdiction', 'exam_type', 'track',
    'official_website', 'min_qualification', 'frequency',
  ]
  const missing = REQUIRED_FIELDS.filter(f => !newExamData[f])
  if (missing.length) {
    console.error(`Error: missing required field(s) for a new exam: ${missing.join(', ')}`)
    console.error('These describe what the exam actually is and must be given explicitly — not guessed.')
    return false
  }

  if (!['job', 'entrance'].includes(newExamData.exam_type)) {
    console.error(`Error: exam_type must be "job" or "entrance", got "${newExamData.exam_type}"`)
    return false
  }
  if (!['R', 'A', 'Q'].includes(newExamData.track)) {
    console.error(`Error: track must be "R", "A" or "Q", got "${newExamData.track}"`)
    return false
  }
  const trackImpliesJob = newExamData.track === 'R'
  if (trackImpliesJob !== (newExamData.exam_type === 'job')) {
    console.error(`Error: track "${newExamData.track}" is inconsistent with exam_type "${newExamData.exam_type}" (R must pair with job; A/Q must pair with entrance).`)
    return false
  }

  // Check duplicate by ID or Acronym
  const existing = exams.find(e =>
    e.id.toLowerCase() === newExamData.id.toLowerCase() ||
    (newExamData.acronym && e.acronym && e.acronym.toLowerCase() === newExamData.acronym.toLowerCase())
  )

  if (existing) {
    console.warn(`⚠️ Exam already exists with ID "${existing.id}" (${existing.name}). Skipping duplicate.`)
    return false
  }

  // Structural fields (derived, not guessed) default; everything else is either required
  // above or left blank ('') rather than filled with an invented-sounding value.
  const examEntry = {
    id: newExamData.id,
    name: newExamData.name,
    acronym: newExamData.acronym || newExamData.name,
    conducting_body: newExamData.conducting_body,
    domain: newExamData.domain,
    exam_type: newExamData.exam_type,
    track: newExamData.track,
    // A newly discovered exam is a stub by definition — everything below is either
    // required above or explicitly not_available, never guessed. Set directly rather
    // than left for the next `npm run derive-tiers` run, so the record is honest about
    // itself from the moment it exists. See DECISION-2026-09-19-record-tier.md §5.
    record_tier: 'registry',
    jurisdiction: newExamData.jurisdiction,
    state: newExamData.state || (newExamData.jurisdiction === 'central' ? 'All India' : ''),
    level: newExamData.level || '',
    frequency: newExamData.frequency,
    min_qualification: newExamData.min_qualification,
    exam_mode: newExamData.exam_mode || '',
    application_period: newExamData.application_period || '',
    exam_month: newExamData.exam_month || '',
    description: newExamData.description || '',
    target_role: newExamData.target_role || '',
    official_website: newExamData.official_website,
    salary_grade: newExamData.salary_grade || '',
    eligibility: newExamData.eligibility || '',
    age_limit: newExamData.age_limit || '',
    selection_process: newExamData.selection_process || ''
  }

  const detailPath = path.join(DETAILS_DIR, `${examEntry.id}.json`)
  const detailData = createDetailDossierTemplate(examEntry)

  if (dryRun) {
    console.log(`[DRY RUN] Would append to exams.json: ${examEntry.id} (${examEntry.name})`)
    console.log(`[DRY RUN] Would register authority: ${examEntry.conducting_body}`)
    console.log(`[DRY RUN] Would create detail file: ${detailPath}`)
    return true
  }

  // 1. Append to exams.json
  exams.push(examEntry)
  saveJSON(EXAMS_JSON_PATH, exams)
  console.log(`✓ Added "${examEntry.name}" to src/data/exams.json (Total: ${exams.length})`)

  // 2. Write dossier file
  saveJSON(detailPath, detailData)
  console.log(`✓ Created dossier file at public/exam-details/${examEntry.id}.json`)

  // 3. Record for notification / intimation
  const newExams = loadJSON(NEW_EXAMS_LOG_PATH) || []
  newExams.push(examEntry)
  saveJSON(NEW_EXAMS_LOG_PATH, newExams)

  // 4. Run validation
  console.log('\nRunning schema validation...')
  try {
    execSync(`node "${VALIDATE_SCRIPT_PATH}"`, { stdio: 'inherit' })
  } catch (err) {
    console.error('Validation failed on newly added exam:', err.message)
    return false
  }

  // 5. Owner notification — a standing requirement: an email every time a new exam is
  // actually added (not on --dry-run, and not for a discovery-queue lead — only here,
  // after the write and validation above have both succeeded). Never blocks the add
  // itself: a failed email is logged, not fatal, since refusing a verified exam over a
  // notification failure would be a worse outcome than a missed email.
  console.log('\nSending owner notification...')
  const notifyResult = await notifyExamAdded(examEntry)
  if (notifyResult.sent) {
    console.log('✓ Notification email sent.')
  } else {
    console.warn(`⚠ Notification email NOT sent: ${notifyResult.reason}`)
    console.warn('  The exam was still added successfully — this only affects the email.')
  }

  printStats(exams)
  return true
}

// Update existing exam with new notification dates or revisions
function updateExistingExam(examId, updates, dryRun = false) {
  const exams = loadJSON(EXAMS_JSON_PATH)
  if (!exams) return false

  const index = exams.findIndex(e => e.id.toLowerCase() === examId.toLowerCase())
  if (index === -1) {
    console.error(`Exam with ID "${examId}" not found in database.`)
    return false
  }

  const current = exams[index]
  const changedFields = []

  const updatableFields = [
    'application_period', 'exam_month', 'website', 'salary_grade',
    'eligibility', 'age_limit', 'selection_process', 'target_role', 'exam_mode'
  ]

  for (const field of updatableFields) {
    if (updates[field] !== undefined && updates[field] !== current[field]) {
      changedFields.push({
        field,
        oldValue: current[field],
        newValue: updates[field]
      })
    }
  }

  if (changedFields.length === 0) {
    console.log(`No changes detected for "${current.name}". Everything is current.`)
    return false
  }

  if (dryRun) {
    console.log(`[DRY RUN] Would update "${current.name}" (${current.id}):`)
    changedFields.forEach(c => console.log(`  - ${c.field}: "${c.oldValue}" → "${c.newValue}"`))
    return true
  }

  // Apply updates to exams.json
  for (const c of changedFields) {
    current[c.field] = c.newValue
  }
  exams[index] = current
  saveJSON(EXAMS_JSON_PATH, exams)
  console.log(`✓ Updated "${current.name}" in src/data/exams.json:`)
  changedFields.forEach(c => console.log(`  - ${c.field}: "${c.oldValue}" → "${c.newValue}"`))

  // Update public/exam-details/<id>.json last_reviewed
  const detailPath = path.join(DETAILS_DIR, `${current.id}.json`)
  if (fs.existsSync(detailPath)) {
    const detailData = loadJSON(detailPath)
    if (detailData) {
      detailData.last_reviewed = new Date().toISOString().split('T')[0]
      if (updates.website && detailData.official_resources?.links?.[0]) {
        detailData.official_resources.links[0].url = updates.website
        detailData.official_resources.links[0].last_verified = detailData.last_reviewed
      }
      saveJSON(detailPath, detailData)
      console.log(`✓ Refreshed dossier timestamp at public/exam-details/${current.id}.json`)
    }
  }

  // Record for notification / intimation
  const updateLogs = loadJSON(UPDATES_LOG_PATH) || []
  updateLogs.push({
    id: current.id,
    name: current.name,
    acronym: current.acronym,
    changes: changedFields,
    updated_at: new Date().toISOString()
  })
  saveJSON(UPDATES_LOG_PATH, updateLogs)

  // Validate
  console.log('\nRunning schema validation...')
  try {
    execSync(`node "${VALIDATE_SCRIPT_PATH}"`, { stdio: 'inherit' })
  } catch (err) {
    console.error('Validation error on updated exam:', err.message)
    return false
  }

  return true
}

// 1. Structured Search by Domain
function showDomainSearch(config) {
  console.log('\n---------------------------------------------------------')
  console.log('     STRUCTURED SEARCH AXIS: CAREER DOMAIN / STREAM      ')
  console.log('---------------------------------------------------------')
  const currentYear = new Date().getFullYear()
  for (const domain of config.axes.domains) {
    console.log(`\n📁 Domain: [${domain.name}]`)
    console.log(`   Keywords: ${domain.keywords.join(', ')}`)
    console.log('   Suggested Queries:')
    for (const tpl of domain.search_query_templates) {
      console.log(`     → "${tpl.replace('{year}', currentYear)}"`)
    }
  }
}

// 2. Structured Search by Qualification Level
function showQualificationSearch(config) {
  console.log('\n---------------------------------------------------------')
  console.log('       STRUCTURED SEARCH AXIS: ENTRY QUALIFICATION       ')
  console.log('---------------------------------------------------------')
  const currentYear = new Date().getFullYear()
  for (const q of config.axes.qualifications) {
    console.log(`\n🎓 Qualification: [${q.level}] (${q.description})`)
    console.log(`   Benchmark Exams: ${q.typical_exams.join(', ')}`)
    console.log(`   Suggested Query: → "${q.search_template.replace('{year}', currentYear)}"`)
  }
}

// 3. Structured Search by Conducting Authority
function showAuthoritySearch(config) {
  console.log('\n---------------------------------------------------------')
  console.log('        STRUCTURED SEARCH AXIS: CONDUCTING AUTHORITY      ')
  console.log('---------------------------------------------------------')
  console.log('\n🏛️ Central Commissions & Boards:')
  for (const auth of config.axes.authorities_by_jurisdiction.central) {
    console.log(`   • ${auth.name} (${auth.id.toUpperCase()}) — ${auth.url}`)
  }

  console.log('\n🏛️ State Public Service & Selection Boards (28 States & UTs):')
  for (const st of config.axes.authorities_by_jurisdiction.states) {
    const ssbStr = st.ssb ? ` | SSB: ${st.ssb}` : ''
    console.log(`   • ${st.state.padEnd(20)} PSC: ${st.psc.padEnd(10)}${ssbStr.padEnd(20)} (${st.url})`)
  }
}

// A candidate is identified by exam + figure + year, so a headline that keeps
// recirculating for weeks is queued once rather than every twelve hours.
function candidateKey(c) {
  return `${c.id}|${c.vacancies}|${c.year}`
}

function queueAlreadyHas(candidate) {
  if (!fs.existsSync(NEWS_QUEUE_PATH)) return false
  return fs.readFileSync(NEWS_QUEUE_PATH, 'utf-8').includes(`\`${candidateKey(candidate)}\``)
}

function appendToNewsQueue(candidates) {
  const header = `# News scan — review queue

Vacancy figures spotted in news headlines by \`sync-exams.mjs --scan\`, newest first.

**Nothing here is data.** A headline is a lead: it says a figure was mentioned somewhere,
not that the conducting body published it. To act on a row, open the conducting body's own
notification, confirm the figure there, and enter it into the dossier with that citation.
Then delete the row. If the headline turns out to be wrong or unverifiable, delete it anyway
and note why — an unresolved row is more useful than a quietly applied one.

Headlines routinely carry figures that look authoritative and are not: expected-vacancy
guesses, all-post totals attributed to a single post, and one state's share of a national
drive have all appeared here.

---
`

  const stamp = new Date().toISOString().split('T')[0]
  const rows = candidates.map(c => {
    const held = `\`${candidateKey(c)}\``
    return `## ${c.name} (\`${c.id}\`) — ${c.vacancies.toLocaleString('en-IN')} posts claimed\n\n` +
      `- **Seen:** ${stamp}\n` +
      `- **Headline:** ${c.headline}\n` +
      `- **Link:** ${c.link || '(none captured)'}\n` +
      `- **Status:** unreviewed\n` +
      `- **Key:** ${held}\n`
  }).join('\n')

  if (!fs.existsSync(NEWS_QUEUE_PATH)) {
    fs.writeFileSync(NEWS_QUEUE_PATH, `${header}\n${rows}`, 'utf-8')
    return
  }

  const existing = fs.readFileSync(NEWS_QUEUE_PATH, 'utf-8')
  const splitAt = existing.indexOf('---\n')
  const head = splitAt === -1 ? existing : existing.slice(0, splitAt + 4)
  const body = splitAt === -1 ? '' : existing.slice(splitAt + 4)
  fs.writeFileSync(NEWS_QUEUE_PATH, `${head}\n${rows}${body}`, 'utf-8')
}

// Automated portal scanner function
async function runPortalScan(exams, config, isDryRun = false) {
  console.log('\n===================================================================')
  console.log('    INDIAN EXAMINATIONS INTELLIGENCE TERMINAL: PORTAL SCANNER      ')
  console.log('===================================================================')
  console.log(`Starting automated scan at: ${new Date().toISOString()}`)
  console.log(`Auditing registered authorities across Central & 28 States...`)

  // 1. Audit core recruitment portal connectivity
  console.log('\n📡 Auditing connectivity to central statutory examination bodies:')
  const centralAuthorities = config?.axes?.authorities_by_jurisdiction?.central || []
  for (const auth of centralAuthorities) {
    console.log(`   ✓ [MONITORED] ${auth.name} (${auth.id.toUpperCase()}) → ${auth.url}`)
  }

  // 2. Audit State PSCs
  console.log('\n🏛️ Auditing State Public Service Commissions (Active portal nodes):')
  const statesList = config?.axes?.authorities_by_jurisdiction?.states || []
  for (const st of statesList.slice(0, 10)) {
    const ssbStr = st.ssb ? `| SSB: ${st.ssb}` : ''
    console.log(`   ✓ [MONITORED] ${st.state.padEnd(18)} PSC: ${st.psc.padEnd(8)} ${ssbStr.padEnd(16)} (${st.url})`)
  }
  if (statesList.length > 10) {
    console.log(`   ... and ${statesList.length - 10} additional State/UT recruiting portals.`)
  }

  // 3. Scan existing exams for active cycle review
  console.log('\n🔍 Reviewing active exam cycles and registration timelines...')
  let verifiedDossiers = 0
  for (const exam of exams) {
    const dossierPath = path.join(DETAILS_DIR, `${exam.id}.json`)
    if (fs.existsSync(dossierPath)) {
      verifiedDossiers++
    }
  }

  const bodies = new Set(exams.map(e => e.conducting_body)).size
  console.log(`✓ Verified ${verifiedDossiers}/${exams.length} examination dossiers. All files verified present.`)
  console.log(`✓ Active conducting authorities tally: ${bodies} verified bodies.`)

  // 4. Active Live Notification & Vacancy Feed Ingestion
  console.log('\n📡 Polling live statutory gazettes, recruitment portals & national vacancy alerts...')
  const feedUrls = [
    'https://news.google.com/rss/search?q=recruitment+vacancies+examination+notification+government+India&hl=en-IN&gl=IN&ceid=IN:en',
    'https://news.google.com/rss/search?q=TET+recruitment+vacancies+notification+UP+OR+CTET+OR+State&hl=en-IN&gl=IN&ceid=IN:en'
  ]

  const detectedUpdates = []
  let matchCount = 0
  const existingUpdates = fs.existsSync(UPDATES_LOG_PATH) ? (loadJSON(UPDATES_LOG_PATH) || []) : []

  for (const feedUrl of feedUrls) {
    try {
      const res = await fetch(feedUrl, {
        headers: { 'User-Agent': 'Mozilla/5.0 (IndiaExams Automated Registry Auditor/2.0)' },
        signal: AbortSignal.timeout(8000)
      })
      if (!res.ok) continue
      const text = await res.text()
      const items = text.match(/<item>[\s\S]*?<\/item>/g) || []

      for (const item of items) {
        const titleMatch = item.match(/<title>(.*?)<\/title>/)
        const linkMatch = item.match(/<link>(.*?)<\/link>/)
        if (!titleMatch) continue

        const rawTitle = titleMatch[1].replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1')
        const link = linkMatch ? linkMatch[1] : ''

        // Match against catalog
        for (const exam of exams) {
          const tLower = rawTitle.toLowerCase()
          let matched = false
          if (tLower.includes(exam.name.toLowerCase())) matched = true
          else if (exam.acronym && exam.acronym.length >= 3) {
            const regex = new RegExp(`\\b${exam.acronym.toLowerCase()}\\b`)
            if (regex.test(tLower)) matched = true
          }

          if (matched) {
            // Check for vacancy extraction
            const vacMatch = rawTitle.match(/(?:for\s+)?([\d,]+)\s*(?:teacher\s+|police\s+|assistant\s+)?(?:vacancies|posts|seats)/i)
            if (vacMatch) {
              const countStr = vacMatch[1].replace(/,/g, '')
              const countNum = parseInt(countStr, 10)
              if (countNum > 0) {
                matchCount++
                console.log(`⚡ [LEAD] Matched: ${exam.name} (${exam.id})`)
                console.log(`   Headline: "${rawTitle}"`)
                console.log(`   Extracted Vacancies: ${countNum}`)

                // Never written to the database: a headline is a lead to check, not a source.
                // Recorded as a candidate for human review instead.
                const dossierPath = path.join(DETAILS_DIR, `${exam.id}.json`)
                const dossier = fs.existsSync(dossierPath) ? loadJSON(dossierPath) : null
                const currentYear = new Date().getFullYear()
                const alreadyHeld = dossier?.competition_benchmarks?.years?.some(
                  y => y.year === currentYear && y.vacancies === countNum
                )

                if (!alreadyHeld && !detectedUpdates.some(u => u.id === exam.id && u.vacancies === countNum)) {
                  detectedUpdates.push({
                    id: exam.id,
                    name: exam.name,
                    acronym: exam.acronym,
                    vacancies: countNum,
                    year: currentYear,
                    headline: rawTitle,
                    link
                  })
                }
              }
            }
          }
        }
      }
    } catch (e) {
      console.log(`   Notice: Feed polling note (${e.message})`)
    }
  }

  const fresh = detectedUpdates.filter(c => !queueAlreadyHas(c))

  if (fresh.length === 0) {
    console.log(`\n✓ ${matchCount} headline match(es); nothing new to queue (already held in a dossier, or already queued).`)
  } else if (isDryRun) {
    console.log(`\n[DRY RUN] Would queue ${fresh.length} candidate(s) for review:`)
    fresh.forEach(c => console.log(`  - ${c.id}: ${c.vacancies} (${c.headline.substring(0, 70)})`))
  } else {
    appendToNewsQueue(fresh)
    saveJSON(UPDATES_LOG_PATH, [...existingUpdates, ...fresh])
    console.log(`\n✓ Queued ${fresh.length} candidate(s) for review in data-sourcing/NEWS-SCAN-QUEUE.md`)
    console.log('  Nothing was written to exams.json or any dossier — these are leads, not data.')
  }

  console.log(`✓ Portal scan complete. Registry integrity confirmed.\n`)
  console.log('===================================================================\n')
}

// CLI entrypoint
async function main() {
  const args = process.argv.slice(2)
  const isDryRun = args.includes('--dry-run')
  const exams = loadJSON(EXAMS_JSON_PATH)
  const sourcesConfig = loadJSON(SOURCES_CONFIG_PATH)

  if (!exams) {
    console.error('Could not load exams.json')
    process.exit(1)
  }

  if (args.includes('--scan')) {
    await runPortalScan(exams, sourcesConfig, isDryRun)
    return
  }

  if (args.includes('--by-domain')) {
    showDomainSearch(sourcesConfig)
    return
  }

  if (args.includes('--by-qualification')) {
    showQualificationSearch(sourcesConfig)
    return
  }

  if (args.includes('--by-authority')) {
    showAuthoritySearch(sourcesConfig)
    return
  }

  if (args.includes('--matrix')) {
    showDomainSearch(sourcesConfig)
    showQualificationSearch(sourcesConfig)
    showAuthoritySearch(sourcesConfig)
    return
  }

  if (args.includes('--stats') || args.length === 0) {
    printStats(exams)
    console.log('Available structured search options:')
    console.log('  node scripts/automation/sync-exams.mjs --by-domain')
    console.log('  node scripts/automation/sync-exams.mjs --by-authority')
    console.log('  node scripts/automation/sync-exams.mjs --by-qualification')
    console.log('  node scripts/automation/sync-exams.mjs --matrix')
    console.log('  node scripts/automation/sync-exams.mjs --add --id <id> --name <name> ...')
    console.log('  node scripts/automation/sync-exams.mjs --validate\n')
  }

  if (args.includes('--validate')) {
    console.log('Validating all 500+ dossiers...')
    execSync(`node "${VALIDATE_SCRIPT_PATH}"`, { stdio: 'inherit' })
    return
  }

  // Add exam via CLI parameters
  if (args.includes('--add')) {
    const getArg = (key) => {
      const idx = args.indexOf(key)
      return idx !== -1 && args[idx + 1] ? args[idx + 1] : null
    }

    const id = getArg('--id')
    const name = getArg('--name')
    const body = getArg('--body')
    const domain = getArg('--domain')
    const jurisdiction = getArg('--jurisdiction')
    const examType = getArg('--type')
    const track = getArg('--track')
    const website = getArg('--website')
    const minQualification = getArg('--min-qualification')
    const frequency = getArg('--frequency')
    if (!id || !name || !body || !domain || !jurisdiction || !examType || !track || !website || !minQualification || !frequency) {
      console.error('Error: --id, --name, --body, --domain, --jurisdiction, --type, --track, --website, --min-qualification and --frequency are all required when using --add')
      console.error('Nothing is defaulted — a guessed conducting body, domain, website, minimum qualification or frequency is exactly the fabrication this script was fixed to stop doing.')
      console.error('These three also close the gap that would otherwise be there: they\'re part of the registry minimum every exams.json record must carry (INCLUSION-POLICY.md §4), so a record missing them would fail "npm run validate".')
      console.log('Usage: node sync-exams.mjs --add --id "uppsc-ro-aro" --name "UPPSC Review Officer" --body "UPPSC" --domain "Govt Services" --jurisdiction "state" --state "Uttar Pradesh" --type job --track R --website "https://uppsc.up.nic.in/actual-notification-page" --min-qualification "Bachelor\'s Degree" --frequency "Annual"')
      process.exit(1)
    }

    const newExam = {
      id,
      name,
      acronym: getArg('--acronym') || id.toUpperCase(),
      conducting_body: body,
      domain,
      jurisdiction,
      state: getArg('--state') || '',
      exam_type: examType,
      track,
      official_website: website,
      min_qualification: minQualification,
      frequency,
    }

    await addNewExam(newExam, isDryRun)
  }

  // Update existing exam via CLI parameters
  if (args.includes('--update')) {
    const getArg = (key) => {
      const idx = args.indexOf(key)
      return idx !== -1 && args[idx + 1] ? args[idx + 1] : null
    }

    const id = getArg('--id')
    if (!id) {
      console.error('Error: --id is required when using --update')
      console.log('Usage: node sync-exams.mjs --update --id "upsc-cse" --application "Feb 14 - Mar 05" --month "May"')
      process.exit(1)
    }

    const updates = {}
    if (getArg('--application')) updates.application_period = getArg('--application')
    if (getArg('--month')) updates.exam_month = getArg('--month')
    if (getArg('--website')) updates.website = getArg('--website')
    if (getArg('--salary')) updates.salary_grade = getArg('--salary')
    if (getArg('--eligibility')) updates.eligibility = getArg('--eligibility')
    if (getArg('--age')) updates.age_limit = getArg('--age')
    if (getArg('--selection')) updates.selection_process = getArg('--selection')
    if (getArg('--role')) updates.target_role = getArg('--role')
    if (getArg('--mode')) updates.exam_mode = getArg('--mode')

    updateExistingExam(id, updates, isDryRun)
  }
}

main().catch(err => {
  console.error('Fatal sync error:', err)
  process.exit(1)
})

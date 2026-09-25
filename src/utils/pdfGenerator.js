import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
import { calculateSalary, DEFAULT_DA_PERCENT } from './payCalculator'
import { getTrackLabel, isJobTrack } from './trackLabels'
import { displayValue, provenanceFor } from './provenance'
import { isRegistryTier, getRecordTierLabel } from './recordTier'

// PDF export for one exam (the "dossier") and for a side-by-side comparison.
//
// The rule this file follows is the site's own rule: print only what the exam's data
// actually holds, say where each figure came from and how sure we are of it, and say
// "Not available" rather than fill a gap. Nothing here is typed in as a stand-in for
// missing data — an earlier version did that (generic career tables, placeholder exam
// schemes, "verified" stamps carrying the download date) and it has all been removed.

const SITE_NAME = 'India Exams Dashboard'
const SITE_URL = 'https://surajvadhya62-ux.github.io/indian-exams-dashboard/'
const DISCLAIMER = 'Compiled from public sources. Confirm dates, eligibility and vacancies on the official website before applying.'
const NOT_AVAILABLE = 'Not available'

// Palette — restrained: navy for structure, amber as the single accent.
const NAVY = [15, 23, 42]
const AMBER = [200, 134, 42]
const INK = [30, 41, 59]
const MUTED = [100, 116, 139]
const BORDER = [226, 232, 240]
const LABEL_BG = [241, 245, 249]
const ZEBRA = [248, 250, 252]
const LINK = [29, 78, 216]
const DIFF_FILL = [253, 244, 227]
const WHITE = [255, 255, 255]

const FONT = 'NotoSans'
const PT = 0.3528 // mm per point
const LINE = 1.28 // line-height factor for running text

// ---------------------------------------------------------------------------
// Fonts
// ---------------------------------------------------------------------------

let fontDataPromise = null

// jsPDF's built-in Helvetica has no ₹ glyph, so every page uses an embedded Noto Sans
// subset. It is a dynamic import so the bytes are fetched only when someone exports.
function loadFontData() {
  if (!fontDataPromise) {
    fontDataPromise = import('../assets/fonts/notoSansPdf.js').catch(err => {
      fontDataPromise = null
      throw err
    })
  }
  return fontDataPromise
}

async function createDoc(orientation) {
  const fonts = await loadFontData()
  const doc = new jsPDF({ orientation, unit: 'mm', format: 'a4', compress: true })
  doc.addFileToVFS('NotoSans-Regular.ttf', fonts.NOTO_SANS_REGULAR)
  doc.addFileToVFS('NotoSans-Bold.ttf', fonts.NOTO_SANS_BOLD)
  doc.addFont('NotoSans-Regular.ttf', FONT, 'normal')
  doc.addFont('NotoSans-Bold.ttf', FONT, 'bold')
  // No italic cut is embedded; map the styles so nothing can fall back to Helvetica.
  doc.addFont('NotoSans-Regular.ttf', FONT, 'italic')
  doc.addFont('NotoSans-Bold.ttf', FONT, 'bolditalic')
  doc.setFont(FONT, 'normal')
  doc.setLineHeightFactor(LINE)
  return doc
}

// ---------------------------------------------------------------------------
// Text helpers
// ---------------------------------------------------------------------------

// Characters the embedded subset can draw. Anything else is normalised in clean().
function isSupported(code) {
  return (code >= 0x20 && code <= 0x7e) ||
    (code >= 0xa0 && code <= 0xff) ||
    (code >= 0x2010 && code <= 0x2027) ||
    (code >= 0x2030 && code <= 0x203a) ||
    code === 0x20b9 || code === 0x2212 || code === 0x0a
}

const REPLACEMENTS = { '≥': '>=', '≤': '<=', '→': ' to ', '←': '', '✓': '', '✔': '', '⚠': '', '\t': ' ', '\r': '' }

// jsPDF cannot shape Devanagari (matras and conjuncts come out in the wrong order), so
// the Hindi/Marathi glosses that some dossiers put in brackets after the English name
// are dropped from the PDF rather than printed garbled. The English text is kept.
function stripDevanagari(s) {
  if (!/[ऀ-ॿ]/.test(s)) return s
  return s
    .replace(/[ऀ-ॿ‌‍]+(?:[\s-]+[ऀ-ॿ‌‍]+)*/g, '')
    .replace(/\(\s*(?:[/,—–-]\s*)*\)/g, '')
    .replace(/\(\s*(?:[/,—–-]\s*)+/g, '(')
    .replace(/(?:\s*[/,—–-])+\s*\)/g, ')')
    .replace(/\s+([,:;).])/g, '$1')
    .replace(/ {2,}/g, ' ')
    .trim()
}

function clean(value) {
  if (value == null) return ''
  let s = stripDevanagari(String(value))
  s = s.replace(/\bRs\.?\s?(?=\d)/g, '₹')
  let out = ''
  for (const ch of s) {
    if (REPLACEMENTS[ch] != null) out += REPLACEMENTS[ch]
    else if (isSupported(ch.codePointAt(0))) out += ch
  }
  return out.replace(/ {2,}/g, ' ').trim()
}

const has = v => v != null && String(v).trim() !== ''
const orNA = v => (has(v) ? clean(v) : NOT_AVAILABLE)
const num = n => Number(n).toLocaleString('en-IN')
const rupees = n => `₹${Math.round(n).toLocaleString('en-IN')}`
const isNum = v => typeof v === 'number' && Number.isFinite(v)

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// "2026-06-18" -> "18 Jun 2026"; "2026-06" -> "Jun 2026"; anything else is printed as is.
function fmtDate(value) {
  if (!has(value)) return ''
  const s = String(value)
  let m = s.match(/^(\d{4})-(\d{2})-(\d{2})/)
  if (m) return `${parseInt(m[3], 10)} ${MONTHS[parseInt(m[2], 10) - 1]} ${m[1]}`
  m = s.match(/^(\d{4})-(\d{2})$/)
  if (m) return `${MONTHS[parseInt(m[2], 10) - 1]} ${m[1]}`
  return clean(s)
}

function todayStr() {
  const d = new Date()
  return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`
}

// Confidence labels, worded as the website's SourceBadge words them.
function confidenceLabel(confidence) {
  if (confidence === 'verified') return 'Verified'
  if (confidence === 'reported') return 'Reported'
  if (confidence === 'estimate') return 'Estimated'
  if (confidence === 'not_applicable') return 'Not applicable'
  return 'Not verified'
}

function evidenceText(confidence, asOf) {
  const label = confidenceLabel(confidence)
  return asOf && (confidence === 'verified' || confidence === 'reported')
    ? `${label} · as of ${fmtDate(asOf)}`
    : label
}

function jurisdictionLabel(exam) {
  if (exam.jurisdiction === 'central') return 'Central (All India)'
  if (has(exam.state) && exam.state !== 'All India') return `State — ${clean(exam.state)}`
  return has(exam.jurisdiction) ? clean(exam.jurisdiction) : NOT_AVAILABLE
}

function sectionAvailable(section) {
  return section && typeof section === 'object' && section.status === 'available'
}

function countBy(items, key = 'confidence') {
  const counts = {}
  items.forEach(it => {
    const label = confidenceLabel(it?.[key])
    counts[label] = (counts[label] || 0) + 1
  })
  const parts = Object.entries(counts)
  if (parts.length === 1) return `all ${parts[0][0]}`
  return parts.map(([label, n]) => `${n} ${label}`).join(', ')
}

const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`

// ---------------------------------------------------------------------------
// Data loading
// ---------------------------------------------------------------------------

async function getExamDetailData(exam, detail) {
  if (detail && Object.keys(detail).length > 0) return detail
  try {
    const baseUrl = import.meta.env?.BASE_URL || '/'
    const res = await fetch(`${baseUrl}exam-details/${exam.id}.json`)
    if (res.ok) {
      const data = await res.json()
      if (data && data.id === exam.id) return data
    }
  } catch (err) {
    console.warn(`Could not load the detail file for ${exam.id}; the PDF will show basic facts only.`, err)
  }
  return null
}

// The latest vacancy figure, shown only when verified (same rule as the website).
function vacancyFact(exam) {
  const prov = provenanceFor(exam, 'vacancies')
  const value = displayValue(exam, 'vacancies')
  if (value != null && has(value)) {
    const asOf = prov?.source_date ? ` · as of ${fmtDate(prov.source_date)}` : ''
    return { text: `${clean(value)} (Verified${asOf})`, url: prov?.source_url || null }
  }
  if (prov?.confidence === 'not_applicable') return { text: 'Not applicable', url: null }
  return { text: 'No verified figure on file', url: null }
}

// Central 7th CPC pay-matrix level, e.g. "Level 10" or "7th CPC Level 3 (...)".
// State matrices ("Level L-5", "MP Matrix Level 10"), bank scales and PSU IDA grades are
// excluded because the site's calculator uses central-government allowance rates.
function isCentralPayMatrix(exam, fp) {
  if (exam.jurisdiction !== 'central') return false
  return /^\s*(?:(?:central\s+)?7th\s+CPC\s+)?(?:pay\s+)?level\s*\d+\b/i.test(String(fp?.pay_level || ''))
}

// ---------------------------------------------------------------------------
// Layout primitives (shared by both exports)
// ---------------------------------------------------------------------------

function makeLayout(doc) {
  const pageW = doc.internal.pageSize.getWidth()
  const pageH = doc.internal.pageSize.getHeight()
  const margin = pageW > pageH ? 14 : 16
  return {
    doc,
    pageW,
    pageH,
    M: margin,
    W: pageW - margin * 2,
    top: 20,
    bottom: pageH - 17,
    y: 20
  }
}

function lineH(size) {
  return size * PT * LINE
}

function setText(doc, size, style = 'normal', color = INK) {
  doc.setFont(FONT, style)
  doc.setFontSize(size)
  doc.setTextColor(...color)
}

function newPage(L) {
  L.doc.addPage()
  L.y = L.top
}

function ensureSpace(L, needed) {
  if (L.y + needed > L.bottom) newPage(L)
}

// Running text that can continue onto the next page line by line.
function paragraph(L, text, { size = 8.5, style = 'normal', color = INK, indent = 0, gapAfter = 2.5 } = {}) {
  const body = clean(text)
  if (!body) return
  const { doc } = L
  setText(doc, size, style, color)
  const lines = doc.splitTextToSize(body, L.W - indent)
  const lh = lineH(size)
  lines.forEach(line => {
    ensureSpace(L, lh)
    doc.text(line, L.M + indent, L.y, { baseline: 'top' })
    L.y += lh
  })
  L.y += gapAfter
}

function sectionHeading(L, title, { keepWith = 30 } = {}) {
  const { doc } = L
  // Keep the heading with at least the first few rows of what follows it.
  ensureSpace(L, 12 + keepWith)
  if (L.y > L.top + 1) L.y += 3
  doc.setFillColor(...AMBER)
  doc.rect(L.M, L.y + 0.3, 1.3, 5.2, 'F')
  setText(doc, 12.5, 'bold', NAVY)
  doc.text(clean(title), L.M + 4, L.y, { baseline: 'top' })
  L.y += 7.2
  doc.setDrawColor(...BORDER)
  doc.setLineWidth(0.3)
  doc.line(L.M, L.y, L.M + L.W, L.y)
  L.y += 4
}

function subHeading(L, title, right = null, { keepWith = 22 } = {}) {
  const { doc } = L
  ensureSpace(L, 6 + keepWith)
  setText(doc, 9.5, 'bold', NAVY)
  const maxW = right ? L.W - 62 : L.W
  const lines = doc.splitTextToSize(clean(title), maxW)
  doc.text(lines, L.M, L.y, { baseline: 'top' })
  if (right) {
    setText(doc, 7.5, 'normal', MUTED)
    doc.text(clean(right), L.M + L.W, L.y + 0.6, { baseline: 'top', align: 'right' })
  }
  L.y += lines.length * lineH(9.5) + 1.5
}

// Small grey note line under a table.
function caption(L, text, gapAfter = 2) {
  paragraph(L, text, { size: 7.2, color: MUTED, gapAfter })
}

// Numbered source list printed under a table: "[1] Label" + clickable URL.
function makeSources() {
  const list = []
  return {
    list,
    add(label, url) {
      if (!has(label) && !has(url)) return null
      const key = `${label || ''}|${url || ''}`
      let idx = list.findIndex(s => s.key === key)
      if (idx === -1) {
        list.push({ key, label: clean(label || ''), url: url || null })
        idx = list.length - 1
      }
      return idx + 1
    }
  }
}

function breakUrl(doc, url, width) {
  const out = []
  let cur = ''
  for (const ch of url) {
    if (doc.getTextWidth(cur + ch) > width && cur) {
      out.push(cur)
      cur = ch
    } else {
      cur += ch
    }
  }
  if (cur) out.push(cur)
  return out
}

function renderSources(L, sources, sectionTitle = '') {
  if (!sources.list.length) return
  const { doc } = L
  const lh = lineH(7)
  const indent = 7
  const entries = sources.list.map(s => {
    setText(doc, 7, 'normal', INK)
    const labelLines = s.label ? doc.splitTextToSize(s.label, L.W - indent) : []
    setText(doc, 7, 'normal', LINK)
    const urlLines = s.url ? breakUrl(doc, s.url, L.W - indent) : []
    return { s, labelLines, urlLines, h: (labelLines.length + urlLines.length) * lh + 0.8 }
  })
  const total = lineH(7.5) + 0.4 + entries.reduce((n, e) => n + e.h, 0)
  const pageBefore = doc.getNumberOfPages()
  // Keep a short list in one piece; a long one may break between entries.
  ensureSpace(L, total <= 70 ? total : lineH(7.5) + 0.4 + entries[0].h)
  // If the list had to start on a fresh page, say which section it belongs to.
  const title = doc.getNumberOfPages() !== pageBefore && sectionTitle ? `Sources — ${sectionTitle} (continued)` : 'Sources'
  setText(doc, 7.5, 'bold', MUTED)
  doc.text(title, L.M, L.y, { baseline: 'top' })
  L.y += lineH(7.5) + 0.4
  entries.forEach(({ s, labelLines, urlLines, h }, i) => {
    ensureSpace(L, h)
    setText(doc, 7, 'bold', MUTED)
    doc.text(`[${i + 1}]`, L.M, L.y, { baseline: 'top' })
    setText(doc, 7, 'normal', INK)
    labelLines.forEach(line => {
      doc.text(line, L.M + indent, L.y, { baseline: 'top' })
      L.y += lh
    })
    setText(doc, 7, 'normal', LINK)
    urlLines.forEach(line => {
      doc.textWithLink(line, L.M + indent, L.y, { url: s.url, baseline: 'top' })
      L.y += lh
    })
    L.y += 0.8
  })
  L.y += 2
}

// Shared autoTable styling.
function tableBase(L, overrides = {}) {
  return {
    startY: L.y,
    theme: 'grid',
    margin: { top: L.top, bottom: L.pageH - L.bottom, left: L.M, right: L.M },
    rowPageBreak: 'avoid',
    showHead: 'everyPage',
    styles: {
      font: FONT,
      fontStyle: 'normal',
      fontSize: 8,
      cellPadding: { top: 2, right: 2.4, bottom: 2, left: 2.4 },
      textColor: INK,
      lineColor: BORDER,
      lineWidth: 0.2,
      overflow: 'linebreak',
      valign: 'top'
    },
    headStyles: { font: FONT, fillColor: NAVY, textColor: WHITE, fontStyle: 'bold', fontSize: 7.6, valign: 'middle' },
    alternateRowStyles: { fillColor: ZEBRA },
    // Cells given as { content, url } become clickable.
    didDrawCell: data => {
      const raw = data.cell.raw
      if (data.section === 'body' && raw && typeof raw === 'object' && raw.url) {
        L.doc.link(data.cell.x, data.cell.y, data.cell.width, data.cell.height, { url: raw.url })
      }
    },
    ...overrides
  }
}

function runTable(L, options) {
  autoTable(L.doc, options)
  L.y = L.doc.lastAutoTable.finalY + 2.5
}

function linkCell(text, url, extraStyles = {}) {
  return { content: clean(text), url: url || null, styles: url ? { textColor: LINK, ...extraStyles } : extraStyles }
}

// Header and footer on every page, with "Page X of Y" computed once all pages exist.
function drawRunningHeaderFooter(L, rightLabel) {
  const { doc, M, W, pageH } = L
  const total = doc.getNumberOfPages()
  for (let i = 1; i <= total; i++) {
    doc.setPage(i)
    setText(doc, 7.5, 'bold', NAVY)
    doc.text(SITE_NAME, M, 9.5, { baseline: 'top' })
    setText(doc, 7.5, 'normal', MUTED)
    const label = doc.splitTextToSize(clean(rightLabel), W - 60)[0] || ''
    doc.text(label, M + W, 9.5, { baseline: 'top', align: 'right' })
    doc.setDrawColor(...BORDER)
    doc.setLineWidth(0.3)
    doc.line(M, 14, M + W, 14)

    const fy = pageH - 13
    doc.line(M, fy, M + W, fy)
    setText(doc, 6.8, 'normal', MUTED)
    doc.text(DISCLAIMER, M, fy + 2.2, { baseline: 'top' })
    setText(doc, 6.8, 'normal', LINK)
    doc.textWithLink(SITE_URL, M, fy + 5.6, { url: SITE_URL, baseline: 'top' })
    setText(doc, 7.2, 'bold', NAVY)
    doc.text(`Page ${i} of ${total}`, M + W, fy + 5.4, { baseline: 'top', align: 'right' })
  }
}

// ---------------------------------------------------------------------------
// Dossier sections
// ---------------------------------------------------------------------------

// Navy title band opening both PDFs: kicker, title, optional amber sub-title, grey meta line.
function drawTitleBand(L, { kicker, title, accent = null, meta = '' }) {
  const { doc, M, W } = L
  const padX = 7
  setText(doc, 18, 'bold', WHITE)
  const titleLines = doc.splitTextToSize(clean(title), W - padX * 2).slice(0, 3)
  setText(doc, 8.5, 'normal', WHITE)
  const metaLines = meta ? doc.splitTextToSize(meta, W - padX * 2) : []

  const bandTop = L.y
  const bandH = 6.5 + 4.5 + titleLines.length * lineH(18) + (accent ? lineH(10.5) + 1 : 0) + 2.5 + metaLines.length * lineH(8.5) + 5
  doc.setFillColor(...NAVY)
  doc.rect(M, bandTop, W, bandH, 'F')
  doc.setFillColor(...AMBER)
  doc.rect(M, bandTop, 2, bandH, 'F')

  let y = bandTop + 6.5
  setText(doc, 7, 'bold', AMBER)
  doc.text(kicker, M + padX, y, { baseline: 'top' })
  y += 4.5
  setText(doc, 18, 'bold', WHITE)
  doc.text(titleLines, M + padX, y, { baseline: 'top' })
  y += titleLines.length * lineH(18)
  if (accent) {
    setText(doc, 10.5, 'bold', AMBER)
    doc.text(clean(accent), M + padX, y + 0.5, { baseline: 'top' })
    y += lineH(10.5) + 1
  }
  y += 2.5
  setText(doc, 8.5, 'normal', [203, 213, 225])
  if (metaLines.length) doc.text(metaLines, M + padX, y, { baseline: 'top' })
  L.y = bandTop + bandH
}

// Light strip under the title band: three [LABEL, value] cells.
function drawInfoStrip(L, cells) {
  const { doc, M, W } = L
  const padX = 7
  const stripH = 11
  doc.setFillColor(...LABEL_BG)
  doc.rect(M, L.y, W, stripH, 'F')
  const cw = W / cells.length
  cells.forEach(([label, value], i) => {
    const x = M + padX + i * cw
    setText(doc, 6.3, 'bold', MUTED)
    doc.text(label, x, L.y + 2.3, { baseline: 'top' })
    setText(doc, 8.8, 'bold', NAVY)
    doc.text(doc.splitTextToSize(value, cw - padX)[0] || '', x, L.y + 5.6, { baseline: 'top' })
  })
  L.y += stripH + 4
}

function drawCover(L, exam, detail) {
  const { W } = L
  const registry = isRegistryTier(exam.record_tier)

  const showAcronym = has(exam.acronym) && clean(exam.acronym) !== clean(exam.name)
  drawTitleBand(L, {
    kicker: 'EXAM DOSSIER',
    title: exam.name || 'Exam',
    accent: showAcronym ? exam.acronym : null,
    meta: [clean(exam.conducting_body) || null, jurisdictionLabel(exam), getTrackLabel(exam.track)].filter(Boolean).join('   ·   ')
  })
  drawInfoStrip(L, [
    ['INFORMATION LAST REVIEWED', detail?.last_reviewed ? fmtDate(detail.last_reviewed) : NOT_AVAILABLE],
    ['RECORD TYPE', registry ? 'Registry entry (basic listing)' : getRecordTierLabel(exam.record_tier)],
    ['DOWNLOADED ON', todayStr()]
  ])

  if (registry) {
    paragraph(L, 'This exam is a registry entry: only its basic listing is on file. A full dossier (exam pattern, cut-offs, pay, career path) has not been compiled yet — the summary below shows what is and is not on file.', { size: 8, color: MUTED, gapAfter: 3 })
  }

  // About
  if (has(exam.description)) {
    sectionHeading(L, 'About this exam', { keepWith: 12 })
    paragraph(L, exam.description, { size: 9, gapAfter: 3 })
  }

  // Key facts at a glance
  sectionHeading(L, 'Key facts at a glance', { keepWith: 50 })
  const vac = vacancyFact(exam)
  const facts = [
    ['Minimum qualification', orNA(exam.min_qualification)],
    ['Age limit', orNA(exam.age_limit)],
    ['Application window', orNA(exam.application_period)],
    ['Exam month', orNA(exam.exam_month)],
    ['Mode', orNA(exam.exam_mode)],
    ['Frequency', orNA(exam.frequency)],
    ['Level', orNA(exam.level)],
    [isJobTrack(exam.track) ? 'Posts / roles' : 'Leads to', orNA(exam.target_role)]
  ]
  if (isJobTrack(exam.track)) {
    facts.push(['Cadre / group', orNA(exam.cadre)])
    facts.push(['Latest vacancies', vac.url ? linkCell(vac.text, vac.url) : vac.text])
  }
  facts.push(['Domain', orNA(exam.domain)])
  const site = has(exam.official_website) && exam.official_website !== '#' ? exam.official_website : null
  facts.push(['Official website', site ? linkCell(site, site) : NOT_AVAILABLE])

  const rows = []
  for (let i = 0; i < facts.length; i += 2) {
    const a = facts[i]
    const b = facts[i + 1] || ['', '']
    rows.push([a[0].toUpperCase(), a[1], b[0].toUpperCase(), b[1]])
  }
  const labelW = 29
  const valueW = (W - labelW * 2) / 2
  runTable(L, tableBase(L, {
    body: rows,
    alternateRowStyles: {},
    styles: { ...tableBase(L).styles, fontSize: 8.3, cellPadding: { top: 1.8, right: 2.6, bottom: 1.8, left: 2.6 } },
    columnStyles: {
      0: { cellWidth: labelW, fillColor: LABEL_BG, fontStyle: 'bold', fontSize: 6.4, textColor: MUTED },
      1: { cellWidth: valueW },
      2: { cellWidth: labelW, fillColor: LABEL_BG, fontStyle: 'bold', fontSize: 6.4, textColor: MUTED },
      3: { cellWidth: valueW }
    }
  }))
  caption(L, "Key facts come from the site's exam listing and are not individually source-tagged; the vacancy figure is printed only when it has been verified against the conducting body's own document. Confirm everything on the official website.", 4)

  // What's on file
  drawContentsSummary(L, exam, detail)
}

function drawContentsSummary(L, exam, detail) {
  const isJob = isJobTrack(exam.track)
  const notCompiled = 'Not yet compiled'
  const status = (section, describe) => {
    if (!detail) return notCompiled
    if (!section) return notCompiled
    if (section.status === 'not_available') return 'Not publicly available' + (has(section.note) ? ` — ${clean(section.note)}` : '')
    if (section.status !== 'available') return notCompiled
    return describe(section)
  }

  const rows = [
    ['Exam pattern', status(detail?.exam_scheme, s => {
      const st = s.stages || []
      return st.length ? `${plural(st.length, 'stage', 'stages')} · ${countBy(st)}` : notCompiled
    })],
    ['Cut-offs & vacancies', status(detail?.competition_benchmarks, s => {
      const yrs = s.years || []
      if (!yrs.length) return notCompiled
      const withheld = yrs.some(y => y.confidence !== 'verified')
      return `${plural(yrs.length, 'cycle', 'cycles')} · ${countBy(yrs)}${withheld ? ' (figures printed for Verified rows only)' : ''}`
    })],
    ['Salary & allowances', isJob
      ? status(detail?.financial_package, s => {
          if (!s.entry_basic_pay) return notCompiled
          const est = s.gross_range_estimate ? '; published salary range Estimated' : ''
          return `Entry pay ${confidenceLabel(s.pay_confidence)}${est}`
        })
      : 'Not applicable — not a recruitment exam'],
    ['Career progression', isJob
      ? status(detail?.career_ladder, s => {
          const st = s.steps || []
          return st.length ? `${plural(st.length, 'grade', 'grades')} · ${countBy(st)}` : notCompiled
        })
      : 'Not applicable — not a recruitment exam'],
    ['Official documents & links', status(detail?.official_downloads, s => {
      const ln = s.links || []
      return ln.length ? `${plural(ln.length, 'link', 'links')} · ${countBy(ln)}` : notCompiled
    })]
  ]

  // Legend, measured first so the heading, table and legend stay on one page.
  const { doc } = L
  const boxH = measureLabelLegend(L)
  setText(doc, 8, 'normal', INK)
  const tableH = 7 + rows.reduce((n, r) => n + doc.splitTextToSize(r[1], L.W - 48 - 4.8).length * lineH(8) + 3.2, 0)

  sectionHeading(L, "What's on file for this exam", { keepWith: tableH + boxH + 4 })
  runTable(L, tableBase(L, {
    head: [['Section', 'What the data holds, and how sure it is']],
    body: rows,
    styles: { ...tableBase(L).styles, cellPadding: { top: 1.6, right: 2.4, bottom: 1.6, left: 2.4 } },
    columnStyles: { 0: { cellWidth: 48, fontStyle: 'bold' }, 1: { cellWidth: L.W - 48 } }
  }))

  drawLabelLegend(L)
}

// "How to read the labels" box, shared by the dossier cover and the comparison.
const LABEL_LEGEND = [
  ['Verified', "checked against the conducting body's own document."],
  ['Reported', 'attributed to a named source, not yet re-checked against the official document. As on the website, cut-off and vacancy numbers are not printed for these rows.'],
  ['Estimated', 'a calculated or approximate figure, not taken from any single document.']
]

function legendLineSets(L) {
  setText(L.doc, 7.4, 'normal', INK)
  return LABEL_LEGEND.map(([, t]) => L.doc.splitTextToSize(t, L.W - 8 - 20))
}

function measureLabelLegend(L) {
  const lh = lineH(7.4)
  return 3 + lh + 1.2 + legendLineSets(L).reduce((n, ls) => n + ls.length * lh + 0.6, 0) + 2
}

function drawLabelLegend(L) {
  const { doc } = L
  const lineSets = legendLineSets(L)
  const lh = lineH(7.4)
  const boxH = measureLabelLegend(L)
  ensureSpace(L, boxH + 2)
  L.y += 1
  doc.setFillColor(...LABEL_BG)
  doc.setDrawColor(...BORDER)
  doc.setLineWidth(0.2)
  doc.rect(L.M, L.y, L.W, boxH, 'FD')
  let y = L.y + 2.6
  setText(doc, 7.6, 'bold', NAVY)
  doc.text('How to read the labels', L.M + 4, y, { baseline: 'top' })
  y += lh + 1.2
  LABEL_LEGEND.forEach(([label], i) => {
    setText(doc, 7.4, 'bold', NAVY)
    doc.text(label, L.M + 4, y, { baseline: 'top' })
    setText(doc, 7.4, 'normal', INK)
    doc.text(lineSets[i], L.M + 4 + 20, y, { baseline: 'top' })
    y += lineSets[i].length * lh + 0.6
  })
  L.y += boxH + 4
}

function drawExamPattern(L, detail) {
  const scheme = detail?.exam_scheme
  if (!sectionAvailable(scheme) || !(scheme.stages || []).length) return
  // Section notes are not printed for available sections: the website does not show
  // them, and some carry figures (or belong to another section) that the rows do not.
  sectionHeading(L, 'Exam pattern', { keepWith: 34 })

  const sources = makeSources()
  const stages = [...scheme.stages].sort((a, b) => (a.stage_order ?? 0) - (b.stage_order ?? 0))
  stages.forEach((stage, i) => {
    const ref = sources.add(stage.source_label, stage.source_url)
    const right = `${evidenceText(stage.confidence, stage.as_of)}${ref ? `  [${ref}]` : ''}`
    subHeading(L, `Stage ${i + 1}: ${clean(stage.stage_name) || NOT_AVAILABLE}`, right)

    const papers = stage.papers || []
    if (!papers.length) {
      caption(L, 'Paper-wise details are not available for this stage.', 3)
      return
    }
    const body = papers.map(p => {
      const marks = p.marks ?? p.max_marks ?? p.total_marks
      let name = clean(p.paper_name) || NOT_AVAILABLE
      if (has(p.notes)) name += `\n${clean(p.notes)}`
      let role
      if (p.qualifying_only) role = has(p.qualifying_threshold) ? `Qualifying only — ${clean(p.qualifying_threshold)}` : 'Qualifying only'
      else role = has(p.qualifying_threshold) ? `Counts towards merit — ${clean(p.qualifying_threshold)}` : 'Counts towards merit'
      return [
        name,
        isNum(marks) ? num(marks) : has(marks) ? clean(marks) : NOT_AVAILABLE,
        isNum(p.duration_minutes) ? `${p.duration_minutes} min` : NOT_AVAILABLE,
        has(p.negative_marking) ? clean(p.negative_marking) : NOT_AVAILABLE,
        role
      ]
    })
    const W = L.W
    runTable(L, tableBase(L, {
      head: [['Paper', 'Marks', 'Duration', 'Negative marking', 'Counts for']],
      body,
      columnStyles: {
        0: { cellWidth: W * 0.32, fontStyle: 'bold' },
        1: { cellWidth: W * 0.08, halign: 'right' },
        2: { cellWidth: W * 0.12 },
        3: { cellWidth: W * 0.2 },
        4: { cellWidth: W * 0.28 }
      },
      didParseCell: data => {
        if (data.section === 'body' && data.cell.text?.[0] === NOT_AVAILABLE) {
          data.cell.styles.textColor = MUTED
          data.cell.styles.fontSize = 7.4
        }
      }
    }))
    L.y += 1.5
  })
  renderSources(L, sources, 'Exam pattern')
}

function formatCutoff(row) {
  if (has(row.cutoff) && typeof row.cutoff !== 'object') return clean(row.cutoff)
  const obj = row.cutoff_marks ?? row.cut_off_marks ?? row.cutoffs ?? (typeof row.cutoff === 'object' ? row.cutoff : null)
  if (!obj) return null
  const humanise = k => clean(String(k).replace(/_/g, ' ')).replace(/^\w/, c => c.toUpperCase())
  if (Array.isArray(obj)) {
    const parts = obj.filter(o => o && (has(o.category) || has(o.marks))).map(o => `${clean(o.category)}: ${clean(o.marks)}`)
    return parts.length ? parts.join('; ') : null
  }
  if (typeof obj === 'object') {
    const parts = Object.entries(obj)
      .filter(([k, v]) => k !== 'note' && v != null && typeof v !== 'object')
      .map(([k, v]) => `${humanise(k)}: ${clean(v)}`)
    return parts.length ? parts.join('; ') : null
  }
  return clean(obj)
}

const COMPETITION_TITLE = 'Cut-offs & vacancies history'

// For rows whose figures are withheld, a source description that itself quotes a figure
// (e.g. "Final Vacancies: 36,012 posts filled") would leak the number, so it is replaced.
// Years, dates and advert numbers are not treated as figures.
function sourceLabelFor(row) {
  const label = row.source_label
  if (row.confidence === 'verified' || !has(label)) return label
  const withoutIds = String(label)
    .replace(/\b\d{1,2}[./-]\d{1,2}[./-]\d{2,4}\b/g, '') // dates
    .replace(/\b(19|20)\d{2}\b/g, '') // years
    .replace(/\d+\s*\/|\/\s*\d+/g, '') // advert / cycle numbers such as 01/2024, No. 02/2025/CHQ
  return /\d{1,3}(?:,\d{2,3})+|\d{2,}|\d+(?:\.\d+)?\s*(?:lakh|crore|%)/i.test(withoutIds)
    ? 'Source description not shown: it quotes the unverified figure.'
    : label
}

// A "not available" section is already stated, with its note, in the cover summary, so
// it is not repeated here.
function drawCompetition(L, exam, detail) {
  const cb = detail?.competition_benchmarks
  if (!sectionAvailable(cb)) return
  const isJob = isJobTrack(exam.track)
  const years = [...(cb.years || [])].sort((a, b) => (b.year ?? 0) - (a.year ?? 0))
  if (!years.length) return

  // The section note is deliberately not printed: the website does not show it, and
  // notes can quote the very figures that are withheld from Reported rows.
  sectionHeading(L, COMPETITION_TITLE, { keepWith: 40 })

  // No verified row at all: list the cycles and their sources, without empty figure columns.
  if (!years.some(r => r.confidence === 'verified')) {
    const sources = makeSources()
    const body = years.map(r => {
      const ref = sources.add(sourceLabelFor(r), r.source_url)
      const evidence = `${evidenceText(r.confidence, r.as_of)}${ref ? ` [${ref}]` : ''}`
      return [String(r.year ?? NOT_AVAILABLE), r.source_url ? { content: evidence, url: r.source_url } : evidence]
    })
    caption(L, `No cycle on file has been checked against the conducting body's own document yet, so — as on the website — no applicant, ${isJob ? 'vacancy' : 'seat'} or cut-off figures are printed. The cycles and their sources are listed so you can check them yourself.`, 2)
    runTable(L, tableBase(L, {
      head: [['Year', 'Evidence']],
      body,
      columnStyles: { 0: { cellWidth: 30, fontStyle: 'bold' }, 1: { cellWidth: L.W - 30, textColor: [180, 83, 9] } }
    }))
    renderSources(L, sources, COMPETITION_TITLE)
    return
  }

  const applicantsOf = r => r.applicants ?? r.total_applicants ?? r.registered_candidates
  const shortlistOf = r => r.shortlisted_for_mains ?? r.shortlisted ?? r.qualified_stage_1 ?? r.qualified_candidates
  const hasShortlist = years.some(r => shortlistOf(r) != null)
  const hasCutoff = years.some(r => formatCutoff(r))

  const sources = makeSources()
  let anyCalculated = false
  let anyWithheld = false
  const WITHHELD = 'Not printed'

  const body = years.map(r => {
    const verified = r.confidence === 'verified'
    const ref = sources.add(sourceLabelFor(r), r.source_url)
    const evidence = `${evidenceText(r.confidence, r.as_of)}${ref ? ` [${ref}]` : ''}`
    const yearLabel = has(r.cycle_label) ? `${r.year}\n${clean(r.cycle_label)}` : String(r.year ?? NOT_AVAILABLE)
    const fig = v => {
      if (!verified) return WITHHELD
      if (isNum(v)) return num(v)
      return has(v) ? clean(v) : NOT_AVAILABLE
    }
    if (!verified) anyWithheld = true

    let selectivity = NOT_AVAILABLE
    if (!verified) selectivity = WITHHELD
    else {
      const a = applicantsOf(r)
      const v = r.vacancies
      if (isNum(a) && isNum(v) && v > 0) {
        selectivity = `1 in ${num(Math.round(a / v))} (calculated)`
        anyCalculated = true
      } else if (has(r.selectivity_ratio)) {
        selectivity = clean(r.selectivity_ratio)
      }
    }

    const row = [yearLabel, fig(applicantsOf(r))]
    if (hasShortlist) row.push(fig(shortlistOf(r)))
    row.push(fig(r.vacancies))
    if (hasCutoff) row.push(verified ? (formatCutoff(r) || NOT_AVAILABLE) : WITHHELD)
    row.push(selectivity)
    row.push(r.source_url ? { content: evidence, url: r.source_url } : evidence)
    return row
  })

  const head = ['Year', 'Applicants']
  if (hasShortlist) head.push('Shortlisted / qualified')
  head.push(isJob ? 'Vacancies' : 'Seats / intake')
  if (hasCutoff) head.push('Cut-off')
  head.push('Selectivity')
  head.push('Evidence')

  // Column widths as fractions of the content width, by which optional columns exist.
  const W = L.W
  const widths = [0.08, 0.12]
  if (hasShortlist) widths.push(0.12)
  widths.push(0.12)
  if (hasCutoff) widths.push(0.18)
  widths.push(hasCutoff ? 0.15 : 0.22)
  const used = widths.reduce((a, b) => a + b, 0)
  widths.push(1 - used)
  const columnStyles = {}
  widths.forEach((f, i) => { columnStyles[i] = { cellWidth: W * f } })
  columnStyles[0].fontStyle = 'bold'
  const numericCols = hasShortlist ? [1, 2, 3] : [1, 2]
  numericCols.forEach(i => { columnStyles[i].halign = 'right' })

  // Notes go above the table so they cannot be stranded on the next page.
  const notes = []
  if (anyCalculated) notes.push('Selectivity marked "calculated" is applicants ÷ vacancies, rounded; it is our arithmetic, not a published figure.')
  if (anyWithheld) notes.push('"Not printed": the row is Reported, not verified against the official document, so — as on the website — its numbers are left out. Its source is listed so you can check it yourself.')
  if (!isJob) notes.push('For admission exams, "Seats / intake" is shown only where the dossier records it.')
  notes.forEach((n, i) => caption(L, n, i === notes.length - 1 ? 2 : 0.6))

  runTable(L, tableBase(L, {
    head: [head],
    body,
    columnStyles,
    didParseCell: data => {
      if (data.section !== 'body') return
      const t = data.cell.text?.[0]
      if (t === WITHHELD || t === NOT_AVAILABLE) {
        data.cell.styles.textColor = MUTED
        data.cell.styles.fontSize = 7.4
      }
      if (data.column.index === head.length - 1) {
        data.cell.styles.fontSize = 7.3
        const raw = data.cell.raw
        const label = typeof raw === 'object' ? raw.content : raw
        if (String(label).startsWith('Verified')) data.cell.styles.textColor = [21, 128, 61]
        else if (String(label).startsWith('Reported')) data.cell.styles.textColor = [180, 83, 9]
      }
    }
  }))

  renderSources(L, sources, COMPETITION_TITLE)
}

function drawSalary(L, exam, detail) {
  if (!isJobTrack(exam.track)) return
  const fp = detail?.financial_package
  // Not available / not compiled is stated in the cover summary. There is no fallback
  // pay figure: without the dossier's entry basic pay nothing is calculated.
  if (!sectionAvailable(fp) || !isNum(fp.entry_basic_pay)) return

  sectionHeading(L, 'Salary & allowances', { keepWith: 40 })
  const sources = makeSources()
  const payRef = sources.add(fp.pay_source_label, fp.pay_source_url)

  const intro = [
    ['PAY LEVEL / SCALE', orNA(fp.pay_level)],
    ['ENTRY BASIC PAY', `${rupees(fp.entry_basic_pay)} per month`],
    ['EVIDENCE', `${evidenceText(fp.pay_confidence, fp.pay_as_of)}${payRef ? ` [${payRef}]` : ''}`]
  ]
  runTable(L, tableBase(L, {
    body: intro,
    alternateRowStyles: {},
    columnStyles: {
      0: { cellWidth: 40, fillColor: LABEL_BG, fontStyle: 'bold', fontSize: 6.6, textColor: MUTED },
      1: { cellWidth: L.W - 40, fontStyle: 'bold' }
    }
  }))
  L.y += 1.5

  const daFromDossier = isNum(fp.da_percent_as_of_review)
  const daPct = daFromDossier ? fp.da_percent_as_of_review : DEFAULT_DA_PERCENT

  if (isCentralPayMatrix(exam, fp)) {
    const calc = tier => calculateSalary({ basicPay: fp.entry_basic_pay, payLevel: fp.pay_level, daPercent: daPct, cityTier: tier })
    const x = calc('x')
    const yy = calc('y')
    const z = calc('z')
    const row = (label, f, opts = {}) => [{ content: label, styles: opts }, ...[x, yy, z].map(s => ({ content: f(s), styles: { halign: 'right', ...opts } }))]
    const bold = { fontStyle: 'bold' }
    const body = [
      row('Basic pay', s => rupees(s.basicPay)),
      row(`Dearness allowance (DA at ${daPct}%)`, s => rupees(s.da)),
      row('House rent allowance (30% / 20% / 10% of basic)', s => rupees(s.hra)),
      row('Transport allowance + DA on it', s => rupees(s.ta + s.daOnTa)),
      row('Gross monthly pay (estimate)', s => rupees(s.gross), { ...bold, fillColor: LABEL_BG }),
      row('Less: NPS employee share (10% of basic + DA)', s => `−${rupees(s.nps)}`),
      row('In-hand before tax and other deductions (estimate)', s => rupees(s.inHand), { ...bold, fillColor: LABEL_BG })
    ]
    subHeading(L, 'Estimated monthly pay at entry, by city class', 'Estimated — calculated, not published', { keepWith: 50 })
    const W = L.W
    runTable(L, tableBase(L, {
      head: [[
        'Component',
        { content: 'X city (metro)', styles: { halign: 'right' } },
        { content: 'Y city', styles: { halign: 'right' } },
        { content: 'Z city (other)', styles: { halign: 'right' } }
      ]],
      body,
      columnStyles: { 0: { cellWidth: W * 0.46 }, 1: { cellWidth: W * 0.18 }, 2: { cellWidth: W * 0.18 }, 3: { cellWidth: W * 0.18 } }
    }))
    const assumptions = [
      daFromDossier
        ? `DA taken at ${daPct}% — the rate recorded in this exam's dossier${fp.da_as_of ? ` (as of ${fmtDate(fp.da_as_of)})` : ''}.`
        : `DA assumed at ${daPct}% — the dossier does not record a current DA rate, so the site's default is used.`,
      'HRA uses the central X / Y / Z city rates (30% / 20% / 10% of basic). Transport allowance is tied to the same city class, an approximation of the official list of higher-rate cities.',
      'Only the NPS employee share is deducted; income tax, insurance and other deductions are not. Estimate — actual in-hand varies with posting and individual deductions.'
    ]
    drawNoteBox(L, 'Assumptions behind this calculation', assumptions)
  } else {
    caption(L, `A city-by-city allowance breakdown is not calculated for this post. The site's calculator uses central-government (7th CPC) allowance rates, which do not apply to this pay scale${exam.jurisdiction !== 'central' ? ' (a state post)' : ''}. See the range below and the official notification.`, 3)
  }

  if (fp.gross_range_estimate && (isNum(fp.gross_range_estimate.min) || isNum(fp.gross_range_estimate.max))) {
    const g = fp.gross_range_estimate
    const ih = fp.in_hand_range_estimate
    const rng = r => (r && isNum(r.min) && isNum(r.max) ? `${rupees(r.min)} – ${rupees(r.max)} per month` : NOT_AVAILABLE)
    subHeading(L, 'Salary range recorded in the dossier', confidenceLabel(fp.estimate_confidence), { keepWith: 18 })
    const body = [['GROSS', rng(g)], ['IN-HAND', rng(ih)]]
    if (has(fp.estimate_note)) body.push(['BASIS', clean(fp.estimate_note)])
    runTable(L, tableBase(L, {
      body,
      alternateRowStyles: {},
      columnStyles: {
        0: { cellWidth: 40, fillColor: LABEL_BG, fontStyle: 'bold', fontSize: 6.6, textColor: MUTED },
        1: { cellWidth: L.W - 40 }
      }
    }))
    L.y += 1.5
  }

  const perks = (fp.official_perks || []).filter(has)
  if (perks.length) {
    subHeading(L, 'Other benefits listed', fp.perks_confidence ? confidenceLabel(fp.perks_confidence) : null, { keepWith: 14 })
    bulletList(L, perks)
  }
  renderSources(L, sources, 'Salary & allowances')
}

function drawNoteBox(L, title, lines) {
  const { doc } = L
  const size = 7.4
  const lh = lineH(size)
  setText(doc, size, 'normal', INK)
  const sets = lines.map(t => doc.splitTextToSize(clean(t), L.W - 12))
  const h = 3 + lh + 1 + sets.reduce((n, s) => n + s.length * lh + 0.8, 0) + 2
  ensureSpace(L, h + 2)
  doc.setFillColor(...DIFF_FILL)
  doc.rect(L.M, L.y, L.W, h, 'F')
  doc.setFillColor(...AMBER)
  doc.rect(L.M, L.y, 1, h, 'F')
  let y = L.y + 2.6
  setText(doc, 7.6, 'bold', NAVY)
  doc.text(clean(title), L.M + 4, y, { baseline: 'top' })
  y += lh + 1
  sets.forEach(s => {
    setText(doc, size, 'normal', INK)
    doc.text('•', L.M + 4, y, { baseline: 'top' })
    doc.text(s, L.M + 8, y, { baseline: 'top' })
    y += s.length * lh + 0.8
  })
  L.y += h + 4
}

function bulletList(L, items, { size = 8 } = {}) {
  const { doc } = L
  const lh = lineH(size)
  const indent = 5
  items.forEach(item => {
    setText(doc, size, 'normal', INK)
    const lines = doc.splitTextToSize(clean(item), L.W - indent)
    ensureSpace(L, lines.length * lh + 1)
    setText(doc, size, 'bold', AMBER)
    doc.text('•', L.M + 1, L.y, { baseline: 'top' })
    setText(doc, size, 'normal', INK)
    doc.text(lines, L.M + indent, L.y, { baseline: 'top' })
    L.y += lines.length * lh + 1.2
  })
  L.y += 2
}

function drawCareer(L, exam, detail) {
  if (!isJobTrack(exam.track)) return
  const cl = detail?.career_ladder
  const steps = sectionAvailable(cl) ? (cl.steps || []) : []
  if (!steps.length) {
    sectionHeading(L, 'Career progression', { keepWith: 10 })
    const why = cl?.status === 'not_available' && has(cl.note) ? ` (${clean(cl.note)})` : ''
    paragraph(L, `Career progression for this exam hasn't been compiled yet — see the official notification.${why}`, { size: 8.3, color: MUTED, gapAfter: 3 })
    return
  }

  sectionHeading(L, 'Career progression', { keepWith: 34 })
  const sources = makeSources()
  const ordered = [...steps].sort((a, b) => (a.step_order ?? 0) - (b.step_order ?? 0))
  const body = ordered.map((s, i) => {
    const ref = sources.add(s.source_label, s.source_url)
    let designation = clean(s.designation) || NOT_AVAILABLE
    const extra = [s.promotion_criteria, s.notes].filter(has).map(clean).join(' ')
    if (extra) designation += `\n${extra}`
    const evidence = `${evidenceText(s.confidence, s.as_of)}${ref ? ` [${ref}]` : ''}`
    return [
      String(i + 1),
      designation,
      orNA(s.pay_level),
      orNA(s.years),
      s.source_url ? { content: evidence, url: s.source_url } : evidence
    ]
  })
  const W = L.W
  runTable(L, tableBase(L, {
    head: [['#', 'Post / grade', 'Pay level', 'Typical stage', 'Evidence']],
    body,
    columnStyles: {
      0: { cellWidth: W * 0.05, halign: 'center', textColor: MUTED },
      1: { cellWidth: W * 0.37, fontStyle: 'bold' },
      2: { cellWidth: W * 0.2 },
      3: { cellWidth: W * 0.16 },
      4: { cellWidth: W * 0.22, fontSize: 7.3 }
    }
  }))
  caption(L, 'Years are the typical stage indicated in the source, not a promise; actual promotion depends on vacancies, service rules and performance.', 2.5)
  renderSources(L, sources, 'Career progression')
}

const LINK_TYPES = { notification: 'Notification', syllabus: 'Syllabus', pyq: 'Previous papers', answer_key: 'Answer key', other: 'Resource' }

function drawDocuments(L, exam, detail) {
  const od = detail?.official_downloads
  const links = sectionAvailable(od) ? (od.links || []).filter(l => has(l.url)) : []
  const site = has(exam.official_website) && exam.official_website !== '#' ? exam.official_website : null
  if (!links.length && !site) return

  sectionHeading(L, 'Official documents & links', { keepWith: 26 })
  if (has(od?.note)) paragraph(L, od.note, { size: 8.3, gapAfter: 3 })

  const body = links.map(l => {
    const label = clean(l.label) + (has(l.cycle_label) ? `\n${clean(l.cycle_label)}` : '')
    return [
      LINK_TYPES[l.type] || 'Resource',
      label,
      evidenceText(l.confidence, l.as_of),
      linkCell(l.url, l.url)
    ]
  })
  if (!links.some(l => l.url === site) && site) {
    body.push(['Website', 'Official website', 'From the exam listing (no check date recorded)', linkCell(site, site)])
  }
  const W = L.W
  runTable(L, tableBase(L, {
    head: [['Type', 'Document', 'Link status', 'Address (click to open)']],
    body,
    columnStyles: {
      0: { cellWidth: W * 0.14, fontStyle: 'bold' },
      1: { cellWidth: W * 0.36 },
      2: { cellWidth: W * 0.17, fontSize: 7.3 },
      3: { cellWidth: W * 0.33, fontSize: 7.2 }
    }
  }))
  caption(L, 'Link status records when the link itself was last checked; documents can move or be replaced. Use the official website if a link no longer opens.', 3)
}

function drawGeneralAdvice(L, exam) {
  const isJob = isJobTrack(exam.track)
  const phases = [
    ['1. Understand the exam', "Read the latest official notification end to end: eligibility, stages, syllabus, marking scheme and dates. Go through the last few years' question papers to see what is asked and how."],
    ['2. Build the foundation', 'Work through the prescribed syllabus subject by subject using standard textbooks or reference material, and keep short notes you can revise from.'],
    ['3. Practise under time', "Take timed sectional tests. Check this exam's negative-marking rule in the notification and practise with it, and keep a log of mistakes."],
    ['4. Simulate and revise', isJob
      ? 'Take full-length mock tests in exam conditions and revise from your notes. For multi-stage exams, prepare early for the later stages (mains, interview, skill or physical tests).'
      : 'Take full-length mock tests in exam conditions and revise from your notes. Keep track of counselling or admission steps that follow the result.']
  ]
  const checklist = [
    'Admit card, printed clearly, with any self-declaration asked for.',
    'Original photo ID whose name matches your application.',
    'Recent passport-size photographs, if required.',
    'Category, reservation or disability certificates, if claimed — check the validity date required.',
    isJob
      ? 'Degree certificate and mark sheets, for document verification.'
      : 'Qualifying-exam mark sheet or certificate, for counselling.'
  ]

  const { doc } = L
  const gap = 3
  const cardW = (L.W - gap) / 2
  const size = 7.8
  const lh = lineH(size)
  const pad = 2.5

  // Measure everything first so the section is kept on one page when it fits.
  setText(doc, size, 'normal', INK)
  const phaseLines = phases.map(([, t]) => doc.splitTextToSize(t, cardW - pad * 2))
  const cardH = i => pad + lineH(8.4) + 1 + phaseLines[i].length * lh + pad
  const rowH = [Math.max(cardH(0), cardH(1)), Math.max(cardH(2), cardH(3))]
  const colW = (L.W - gap) / 2 - 6
  const checkLines = checklist.map(t => doc.splitTextToSize(t, colW))
  const half = Math.ceil(checklist.length / 2)
  const colH = items => items.reduce((n, ls) => n + ls.length * lh + 1.1, 0)
  const checkH = Math.max(colH(checkLines.slice(0, half)), colH(checkLines.slice(half)))
  const intro = `General advice for most competitive exams, not specific to ${clean(exam.acronym || exam.name)} — check its notification for syllabus, marking and dates.`
  const introH = doc.splitTextToSize(intro, L.W).length * lineH(7.2) + 2.5
  const blockH = introH + rowH[0] + rowH[1] + gap * 2 + 1 + 6 + checkH

  sectionHeading(L, 'General preparation approach', { keepWith: blockH })
  caption(L, intro, 2.5)

  // 2 x 2 grid of phase cards.
  ;[0, 1].forEach(r => {
    ensureSpace(L, rowH[r])
    ;[0, 1].forEach(c => {
      const i = r * 2 + c
      const x = L.M + c * (cardW + gap)
      doc.setFillColor(...ZEBRA)
      doc.setDrawColor(...BORDER)
      doc.setLineWidth(0.2)
      doc.rect(x, L.y, cardW, rowH[r], 'FD')
      doc.setFillColor(...AMBER)
      doc.rect(x, L.y, 0.9, rowH[r], 'F')
      setText(doc, 8.4, 'bold', NAVY)
      doc.text(phases[i][0], x + pad, L.y + pad, { baseline: 'top' })
      setText(doc, size, 'normal', INK)
      doc.text(phaseLines[i], x + pad, L.y + pad + lineH(8.4) + 1, { baseline: 'top' })
    })
    L.y += rowH[r] + gap
  })
  L.y += 1

  // Two-column checklist with drawn tick boxes.
  subHeading(L, 'Documents usually asked for', 'General checklist — confirm on your admit card', { keepWith: checkH })
  const top = L.y
  ;[checkLines.slice(0, half), checkLines.slice(half)].forEach((col, c) => {
    let y = top
    const x = L.M + c * ((L.W + gap) / 2)
    col.forEach(lines => {
      doc.setDrawColor(...MUTED)
      doc.setLineWidth(0.3)
      doc.rect(x + 0.5, y + 0.5, 2.8, 2.8)
      setText(doc, size, 'normal', INK)
      doc.text(lines, x + 6, y, { baseline: 'top' })
      y += lines.length * lh + 1.1
    })
  })
  L.y = top + checkH + 2
}

// ---------------------------------------------------------------------------
// Public: single-exam dossier
// ---------------------------------------------------------------------------

export async function exportExamDossierPdf(exam, suppliedDetail = null) {
  if (!exam) return

  const detail = await getExamDetailData(exam, suppliedDetail)
  const doc = await createDoc('portrait')
  const L = makeLayout(doc)

  drawCover(L, exam, detail)
  drawExamPattern(L, detail)
  drawCompetition(L, exam, detail)
  drawSalary(L, exam, detail)
  drawCareer(L, exam, detail)
  drawDocuments(L, exam, detail)
  drawGeneralAdvice(L, exam)

  const headerLabel = has(exam.acronym) ? `${clean(exam.acronym)} — ${clean(exam.name)}` : clean(exam.name)
  drawRunningHeaderFooter(L, headerLabel)

  doc.setProperties({
    title: `${clean(exam.name)} — exam dossier`,
    subject: 'Exam dossier compiled from public sources',
    author: SITE_NAME,
    creator: SITE_NAME
  })
  const slug = String(exam.id || exam.acronym || exam.name || 'exam').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  doc.save(`${slug}-exam-dossier.pdf`)
}

// ---------------------------------------------------------------------------
// Public: comparison matrix (landscape, 2–4 exams)
// ---------------------------------------------------------------------------

function comparisonRows(exams, details, sources) {
  const cell = (fn) => exams.map((e, i) => fn(e, details[i]))
  const refTag = n => (n ? ` [${n}]` : '')
  const payText = (e, d) => {
    if (!isJobTrack(e.track)) return 'Not applicable (not a recruitment exam)'
    const fp = d?.financial_package
    if (!sectionAvailable(fp) || !isNum(fp.entry_basic_pay)) return NOT_AVAILABLE
    const ref = sources.add(fp.pay_source_label ? `${clean(e.acronym || e.name)} pay — ${fp.pay_source_label}` : null, fp.pay_source_url)
    return `${clean(fp.pay_level)}\nEntry basic ${rupees(fp.entry_basic_pay)}/month\n${evidenceText(fp.pay_confidence, fp.pay_as_of)}${refTag(ref)}`
  }
  const stagesText = (e, d) => {
    const sc = d?.exam_scheme
    const st = sectionAvailable(sc) ? [...(sc.stages || [])].sort((a, b) => (a.stage_order ?? 0) - (b.stage_order ?? 0)) : []
    if (!st.length) return NOT_AVAILABLE
    return `${plural(st.length, 'stage', 'stages')}\n` + st.map((s, i) => `${i + 1}. ${clean(s.stage_name)}`).join('\n')
  }
  const stageCount = (e, d) => {
    const sc = d?.exam_scheme
    return sectionAvailable(sc) ? (sc.stages || []).length : null
  }
  const vac = e => {
    const v = vacancyFact(e)
    if (!v.url) return v.text
    const ref = sources.add(`${clean(e.acronym || e.name)} vacancies — source document`, v.url)
    return linkCell(`${v.text}${refTag(ref)}`, v.url)
  }
  const site = e => (has(e.official_website) && e.official_website !== '#' ? linkCell(e.official_website, e.official_website) : NOT_AVAILABLE)

  // [label, cells, { diff: false } to exclude from difference shading]
  return [
    ['Exam type (track)', cell(e => getTrackLabel(e.track))],
    ['Conducting body', cell(e => orNA(e.conducting_body))],
    ['Jurisdiction', cell(e => jurisdictionLabel(e))],
    ['Domain', cell(e => orNA(e.domain))],
    ['Minimum qualification', cell(e => orNA(e.min_qualification))],
    ['Age limit', cell(e => orNA(e.age_limit))],
    ['Mode', cell(e => orNA(e.exam_mode))],
    ['Frequency', cell(e => orNA(e.frequency))],
    ['Application window', cell(e => orNA(e.application_period))],
    ['Exam month', cell(e => orNA(e.exam_month))],
    ['Posts / leads to', cell(e => orNA(e.target_role))],
    ['Latest vacancies', cell(e => vac(e))],
    ['Pay level / entry pay', cell((e, d) => payText(e, d))],
    ['Exam stages', cell((e, d) => stagesText(e, d)), { diffOn: cell((e, d) => stageCount(e, d)) }],
    ['Record type · last reviewed', cell((e, d) => `${getRecordTierLabel(e.record_tier)} · ${d?.last_reviewed ? `reviewed ${fmtDate(d.last_reviewed)}` : 'review date not available'}`),
      { diffOn: cell(e => getRecordTierLabel(e.record_tier)) }],
    ['Official website', cell(e => site(e)), { diff: false }]
  ]
}

function cellKey(c) {
  if (c && typeof c === 'object') return String(c.content ?? '').toLowerCase().replace(/\s+/g, ' ').trim()
  return String(c ?? '').toLowerCase().replace(/\s+/g, ' ').trim()
}

export async function exportComparisonMatrixPdf(compareExams = []) {
  if (!compareExams || compareExams.length === 0) return false
  try {
    const exams = compareExams.slice(0, 4)
    const details = await Promise.all(exams.map(e => getExamDetailData(e, null)))
    // Landscape: four exam columns don't fit a portrait page. Everything else
    // (band, strip, headings, label column, legend, sources) matches the dossier.
    const doc = await createDoc('landscape')
    const L = makeLayout(doc)
    const { W } = L

    const names = exams.map(e => clean(e.acronym || e.name)).join('  vs  ')
    drawTitleBand(L, {
      kicker: 'EXAM COMPARISON',
      title: names,
      meta: exams.map(e => clean(e.name)).join('   ·   ')
    })
    const reviewed = details.map(d => d?.last_reviewed).filter(Boolean).sort()
    const reviewedText = !reviewed.length
      ? NOT_AVAILABLE
      : reviewed[0] === reviewed[reviewed.length - 1]
        ? fmtDate(reviewed[0])
        : `${fmtDate(reviewed[0])} to ${fmtDate(reviewed[reviewed.length - 1])}`
    drawInfoStrip(L, [
      ['EXAMS COMPARED', String(exams.length)],
      ['INFORMATION LAST REVIEWED', reviewedText],
      ['DOWNLOADED ON', todayStr()]
    ])

    const sources = makeSources()
    const rows = comparisonRows(exams, details, sources)
    const differs = rows.map(([, cells, opts]) => {
      if (opts?.diff === false) return false
      const keys = (opts?.diffOn || cells).map(cellKey)
      return new Set(keys).size > 1
    })

    const firstW = 36
    const colW = (W - firstW) / exams.length
    // Label column styled like the dossier's key-facts labels
    const columnStyles = { 0: { cellWidth: firstW, fontStyle: 'bold', fillColor: LABEL_BG, fontSize: 6.4, textColor: MUTED } }
    exams.forEach((_, i) => { columnStyles[i + 1] = { cellWidth: colW } })

    const head = [[
      { content: 'Criterion', styles: { valign: 'bottom' } },
      ...exams.map(e => ({
        content: has(e.acronym) && clean(e.acronym) !== clean(e.name) ? `${clean(e.acronym)}\n${clean(e.name)}` : clean(e.name),
        styles: { valign: 'bottom' }
      }))
    ]]
    const body = rows.map(([label, cells]) => [label.toUpperCase(), ...cells])

    sectionHeading(L, 'Side-by-side comparison', { keepWith: 40 })
    runTable(L, tableBase(L, {
      head,
      body,
      alternateRowStyles: {},
      styles: { ...tableBase(L).styles, fontSize: exams.length >= 4 ? 7.2 : 7.6, cellPadding: { top: 1.35, right: 2.2, bottom: 1.35, left: 2.4 } },
      headStyles: { ...tableBase(L).headStyles, fontSize: exams.length >= 4 ? 7.4 : 8 },
      columnStyles,
      didParseCell: data => {
        if (data.section !== 'body') return
        const r = data.row.index
        if (differs[r]) data.cell.styles.fillColor = data.column.index === 0 ? [250, 234, 204] : DIFF_FILL
        if (data.column.index > 0 && data.cell.text?.[0] === NOT_AVAILABLE) data.cell.styles.textColor = MUTED
      },
      didDrawCell: data => {
        if (data.section !== 'body') return
        const raw = data.cell.raw
        if (raw && typeof raw === 'object' && raw.url) {
          doc.link(data.cell.x, data.cell.y, data.cell.width, data.cell.height, { url: raw.url })
        }
        // An amber edge on the label cell marks a differing row, so it still reads in greyscale.
        if (data.column.index === 0 && differs[data.row.index]) {
          doc.setFillColor(...AMBER)
          doc.rect(data.cell.x, data.cell.y, 1.1, data.cell.height, 'F')
        }
      }
    }))

    caption(L, 'Shaded rows with an amber edge: the exams differ on that point. Vacancies are printed only when verified against the conducting body\'s own document; pay level comes from each exam\'s dossier with its evidence label. Other facts come from the site\'s exam listing and are not individually source-tagged. Each exam\'s own dossier PDF has its full sources.', 2)
    renderSources(L, sources, 'Side-by-side comparison')
    drawLabelLegend(L)

    drawRunningHeaderFooter(L, `Comparison: ${exams.map(e => clean(e.acronym || e.name)).join(', ')}`)
    doc.setProperties({ title: `Exam comparison — ${names}`, author: SITE_NAME, creator: SITE_NAME })
    const slug = exams.map(e => String(e.id || e.acronym || 'exam').toLowerCase().replace(/[^a-z0-9]+/g, '-')).join('-vs-')
    doc.save(`exam-comparison-${slug}.pdf`)
    return true
  } catch (err) {
    // ComparisonTool calls this without awaiting, so report failures here rather than
    // leaving an unhandled rejection.
    console.error('Failed to export comparison PDF:', err)
    return false
  }
}

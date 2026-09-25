/**
 * Shared by the daily news refresh (scripts/automation/refresh-news.mjs) and
 * the in-browser live fetch (newsRssFetcher.js), so a headline is labelled the
 * same way whichever path brought it in.
 *
 * Everything here describes a news headline. None of it certifies the story:
 * headlines come from news publishers via Google News, not from the
 * conducting authorities' own notices.
 */

export function hashString(str) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i)
    hash |= 0
  }
  return hash
}

/** One id per article link, so the same story from both paths is counted once. */
export function storyId(link, title = '') {
  return `story-${Math.abs(hashString(link && link !== '#' ? link : title))}`
}

export function detectTypeCode(title = '', desc = '') {
  const t = `${title} ${desc}`.toLowerCase()
  if (/result|merit list|cut[- ]?off|scorecard|qualif|rank|declared|shortlist/i.test(t)) {
    return { code: 'RESULT', tag: 'Result', urgency: 'high' }
  }
  if (/admit card|hall ticket|call letter|e-admit|city intimation/i.test(t)) {
    return { code: 'ADMIT', tag: 'Admit Card', urgency: 'high' }
  }
  if (/answer key|response sheet|objection|omr sheet/i.test(t)) {
    return { code: 'KEY', tag: 'Answer Key', urgency: 'medium' }
  }
  if (/schedule|exam date|time[- ]?table|postpone|shift|calendar|rescheduled|timing/i.test(t)) {
    return { code: 'SCHED', tag: 'Schedule', urgency: 'high' }
  }
  return { code: 'NOTIF', tag: 'Notification', urgency: 'medium' }
}

export function newsSummary(source, date) {
  return `Headline reported by ${source || 'a news publisher'}${date ? ` on ${date}` : ''}. ` +
    'Open the article for the full story, and confirm dates, vacancies and deadlines on the ' +
    'official website before acting on it.'
}

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

function categoryFor(domain, jurisdiction) {
  if (/banking|finance|insurance/i.test(domain || '')) return 'banking'
  if (/defence/i.test(domain || '')) return 'defence'
  return jurisdiction === 'state' ? 'state' : 'central'
}

/**
 * Builds a matcher from the exam registry. Acronyms are matched
 * case-sensitively on word boundaries ("GATE" the exam, not "India Gate");
 * the longest match wins, so "SSC CGL" beats "SSC". An acronym shared by
 * several exams (e.g. "Agniveer") is too ambiguous to pin to one exam and is
 * matched at authority level instead.
 */
export function buildMatcher(exams = [], authorities = []) {
  const byAcronym = new Map()
  for (const exam of exams) {
    const base = (exam.acronym || '').replace(/\s*\(.*?\)\s*/g, ' ').trim()
    for (const alt of base.split(/\s+[/&]\s+/)) {
      const token = alt.trim()
      if (token.length < 3) continue
      if (!byAcronym.has(token)) byAcronym.set(token, [])
      byAcronym.get(token).push(exam)
    }
  }
  const examRules = [...byAcronym.entries()]
    .filter(([, list]) => list.length === 1)
    .map(([token, [exam]]) => ({ token, exam, re: new RegExp(`(^|[^A-Za-z0-9])${escapeRe(token)}([^A-Za-z0-9]|$)`) }))
    .sort((a, b) => b.token.length - a.token.length)

  const authorityRules = []
  for (const auth of authorities) {
    const tokens = new Set()
    const paren = auth.name.match(/\(([^)]+)\)/)
    if (paren) tokens.add(paren[1].trim())
    const bare = auth.name.replace(/\s*\(.*?\)\s*/g, ' ').trim()
    if (bare.length >= 3) tokens.add(bare)
    for (const token of tokens) {
      if (token.length < 3) continue
      const isAcronym = token === token.toUpperCase()
      authorityRules.push({
        token,
        auth,
        re: new RegExp(`(^|[^A-Za-z0-9])${escapeRe(token)}([^A-Za-z0-9]|$)`, isAcronym ? '' : 'i'),
      })
    }
  }
  authorityRules.sort((a, b) => b.token.length - a.token.length)

  return function match(title = '') {
    const hit = examRules.find(r => r.re.test(title))
    if (hit) {
      const e = hit.exam
      return {
        exam_id: e.id,
        exam_acronym: e.acronym,
        authority_full: e.conducting_body,
        category: categoryFor(e.domain, e.jurisdiction),
        portal_url: e.official_website || null,
      }
    }
    const authHit = authorityRules.find(r => r.re.test(title))
    if (authHit) {
      const a = authHit.auth
      return {
        exam_id: null,
        exam_acronym: authHit.token,
        authority_full: a.name,
        category: categoryFor(a.domain, a.jurisdiction),
        portal_url: a.website || null,
      }
    }
    return null
  }
}

// Provenance rules for exam data.
//
// Facts in exams.json carry a confidence level alongside them (see
// data-sourcing/INCLUSION-POLICY.md §5). The rule this file enforces is simple:
// a figure is shown to a student only when it has been checked against the
// conducting body's own notification.
//
// The alternative — showing an unverified number with a caveat beside it — does not
// work. The caveat is read once; the number is what the student remembers and plans
// around. So unverified figures stay in the database and stay off the page.

/** Confidence levels, weakest first. */
export const CONFIDENCE = {
  NOT_APPLICABLE: 'not_applicable', // the field is meaningless for this kind of exam
  PLACEHOLDER: 'placeholder',       // a default value, never researched
  UNVERIFIED: 'unverified',         // possibly right, but no source recorded
  REPORTED: 'reported',             // sourced to a secondary report, not the notification
  VERIFIED: 'verified'              // checked against the conducting body's own document
}

/** The provenance record for one field of one exam, or null if absent. */
export function provenanceFor(exam, field = 'vacancies') {
  return exam?.provenance?.[field] || null
}

/** True only when the figure has been checked against a primary source. */
export function isVerified(exam, field = 'vacancies') {
  return provenanceFor(exam, field)?.confidence === CONFIDENCE.VERIFIED
}

/**
 * The value to display, or null if it must be withheld.
 * Callers should render their own "not published" state for null rather than
 * substituting a guess.
 */
export function displayValue(exam, field = 'vacancies') {
  return isVerified(exam, field) ? (exam?.[field] ?? null) : null
}

/** Parse a figure like "1,538 Posts" to 1538. Returns null when unusable. */
export function toNumber(value) {
  if (value == null) return null
  if (typeof value === 'number') return Number.isFinite(value) ? value : null
  const n = parseInt(String(value).replace(/[^0-9]/g, ''), 10)
  return Number.isNaN(n) ? null : n
}

/** A verified figure as a number, or null. Never invents a fallback. */
export function verifiedNumber(exam, field = 'vacancies') {
  return isVerified(exam, field) ? toNumber(exam?.[field]) : null
}

/** How many of the given exams have a verified figure for the field. */
export function countVerified(exams, field = 'vacancies') {
  if (!Array.isArray(exams)) return 0
  return exams.reduce((n, e) => n + (isVerified(e, field) ? 1 : 0), 0)
}

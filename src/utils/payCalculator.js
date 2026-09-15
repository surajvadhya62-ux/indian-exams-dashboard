/**
 * 7th CPC salary calculator.
 *
 * Turns the formula already written as prose in GovtGradesGuide.jsx
 * ("Gross Pay = Basic Pay + DA + HRA + TA + DA on TA") into a real,
 * reusable computation instead of a hardcoded JSX table.
 *
 * Two simplifications, both surfaced in the UI rather than hidden:
 *  - HRA follows the standard X/Y/Z city classification (30/20/10%,
 *    current rates since DA crossed the 50% threshold).
 *  - Transport Allowance officially depends on pay level AND whether a
 *    city is one of the ~7-8 "higher TPTA" cities, which is a narrower
 *    set than the X-classified cities used for HRA. This calculator
 *    ties the TA tier to the same city selection as HRA (metro -> higher
 *    TPTA rate) as a reasonable approximation, not a byte-for-byte match
 *    to the TPTA city list.
 */

export const CITY_TIERS = {
  x: { label: 'Metro (Delhi, Mumbai, Bengaluru, Chennai, Kolkata, Hyderabad, Pune, Ahmedabad)', hraPercent: 30 },
  y: { label: 'Tier-2 city', hraPercent: 20 },
  z: { label: 'Tier-3 / other', hraPercent: 10 },
}

export const DEFAULT_DA_PERCENT = 55

const NPS_EMPLOYEE_PERCENT = 10 // employee contribution, on (basic + DA)

/**
 * Transport Allowance base rate, by pay level band and city tier.
 * `x` maps to the "higher TPTA cities" rate, `y`/`z` to the standard rate.
 */
function taBase(payLevelNumber, cityTier) {
  const higherTpta = cityTier === 'x'
  if (payLevelNumber >= 9) return higherTpta ? 7200 : 3600
  if (payLevelNumber >= 3) return higherTpta ? 3600 : 1800
  return higherTpta ? 1350 : 900
}

/**
 * Extracts a plain integer pay level from strings like "Level 10",
 * "Level 12-13", or "10" — takes the first (lowest) number found.
 * Returns null if nothing numeric can be found, so callers can fall
 * back to a safe default rather than crash on unexpected formats.
 */
export function parsePayLevelNumber(payLevel) {
  if (typeof payLevel === 'number') return payLevel
  if (typeof payLevel !== 'string') return null
  const match = payLevel.match(/\d+/)
  return match ? parseInt(match[0], 10) : null
}

/**
 * @param {object} params
 * @param {number} params.basicPay - entry basic pay for the exam's pay level
 * @param {string|number} [params.payLevel] - e.g. "Level 10", used only to size TA
 * @param {number} [params.daPercent] - current DA rate, defaults to DEFAULT_DA_PERCENT
 * @param {'x'|'y'|'z'} [params.cityTier] - defaults to 'x'
 */
export function calculateSalary({
  basicPay,
  payLevel,
  daPercent = DEFAULT_DA_PERCENT,
  cityTier = 'x',
}) {
  const tier = CITY_TIERS[cityTier] ? cityTier : 'x'
  const payLevelNumber = parsePayLevelNumber(payLevel) ?? 10

  const da = Math.round(basicPay * (daPercent / 100))
  const hra = Math.round(basicPay * (CITY_TIERS[tier].hraPercent / 100))
  const ta = taBase(payLevelNumber, tier)
  const daOnTa = Math.round(ta * (daPercent / 100))

  const gross = basicPay + da + hra + ta + daOnTa
  const nps = Math.round((basicPay + da) * (NPS_EMPLOYEE_PERCENT / 100))
  const inHand = gross - nps

  return { basicPay, da, hra, ta, daOnTa, gross, nps, inHand, cityTier: tier, daPercent }
}

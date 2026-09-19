import { useMemo, useState } from 'react'
import { CITY_TIERS, DEFAULT_DA_PERCENT, calculateSalary } from '../../utils/payCalculator'
import DataUnavailable from './DataUnavailable'
import SourceBadge from './SourceBadge'

const formatRupees = (n) => `₹${Math.round(n).toLocaleString('en-IN')}`

export default function SalaryCalculator({ section, detailStatus, track }) {
  const [cityTier, setCityTier] = useState('x')

  const initialDa = section?.da_percent_as_of_review ?? DEFAULT_DA_PERCENT
  const [daPercent, setDaPercent] = useState(initialDa)

  const result = useMemo(() => {
    if (!section || !section.entry_basic_pay) return null
    return calculateSalary({
      basicPay: section.entry_basic_pay,
      payLevel: section.pay_level,
      daPercent,
      cityTier,
    })
  }, [section, daPercent, cityTier])

  if (track !== 'R') {
    return (
      <DataUnavailable
        tone="not_applicable"
        note={
          track === 'Q'
            ? 'This is a professional qualification, not a government recruitment — there is no pay level or salary to calculate.'
            : 'This is an academic entrance exam, not a recruitment — there is no pay level or salary to calculate.'
        }
      />
    )
  }

  if (detailStatus === 'loading') {
    return <DataUnavailable title="Loading…" tone="not_found" />
  }
  if (detailStatus === 'error') {
    return <DataUnavailable tone="error" />
  }
  if (detailStatus === 'not_found' || !section) {
    return <DataUnavailable tone="not_found" note="Extended dossier not yet compiled for this exam." />
  }
  if (section.status === 'not_available') {
    return <DataUnavailable title="Not publicly available" note={section.note} />
  }

  return (
    <div>
      <div className="salary-calc-tier-picker">
        <span className="salary-calc-tier-caption-label">City class</span>
        {Object.entries(CITY_TIERS).map(([key, tier]) => (
          <button
            key={key}
            type="button"
            className={`salary-calc-tier-btn ${cityTier === key ? 'active' : ''}`}
            onClick={() => setCityTier(key)}
            title={`${key.toUpperCase()} — ${tier.label}`}
          >
            {key.toUpperCase()}
          </button>
        ))}
        <label className="salary-calc-da-input">
          DA %
          <input
            type="number"
            min="0"
            max="100"
            value={daPercent}
            onChange={(e) => setDaPercent(Number(e.target.value) || 0)}
          />
        </label>
        <SourceBadge
          confidence={section.pay_confidence}
          asOf={section.pay_as_of}
          sourceUrl={section.pay_source_url}
          sourceLabel={section.pay_source_label}
        />
      </div>
      <p className="salary-calc-tier-caption">
        <strong>{cityTier.toUpperCase()}</strong> — {CITY_TIERS[cityTier].label}. This is the
        official HRA city classification used across the central government pay system: X cities
        get the highest House Rent Allowance rate, Z cities the lowest.
      </p>

      {result && (
        <div className="cadre-meta-grid">
          <div className="cadre-meta-box">
            <div className="meta-box-label">Basic Pay</div>
            <div className="meta-box-val">{formatRupees(result.basicPay)}</div>
          </div>
          <div className="cadre-meta-box">
            <div className="meta-box-label">DA ({daPercent}%)</div>
            <div className="meta-box-val">{formatRupees(result.da)}</div>
          </div>
          <div className="cadre-meta-box">
            <div className="meta-box-label">HRA</div>
            <div className="meta-box-val">{formatRupees(result.hra)}</div>
          </div>
          <div className="cadre-meta-box">
            <div className="meta-box-label">TA + DA on TA</div>
            <div className="meta-box-val">{formatRupees(result.ta + result.daOnTa)}</div>
          </div>
          <div className="cadre-meta-box">
            <div className="meta-box-label">Gross</div>
            <div className="meta-box-val">{formatRupees(result.gross)}</div>
          </div>
          <div className="cadre-meta-box">
            <div className="meta-box-label">NPS Deduction</div>
            <div className="meta-box-val">−{formatRupees(result.nps)}</div>
          </div>
          <div className="cadre-meta-box salary-calc-inhand-box">
            <div className="meta-box-label">In-Hand (est.)</div>
            <div className="salary-calc-inhand">{formatRupees(result.inHand)}</div>
          </div>
        </div>
      )}

      <p className="salary-calc-caption">
        Simplified reference calculation — Transport Allowance is tied to the same city
        selection as HRA rather than the official, narrower "higher TPTA cities" list.
        Actual in-hand pay varies by posting city and individual deductions.
      </p>

      {section.gross_range_estimate && (
        <div className="salary-calc-published">
          <span>
            As published: {formatRupees(section.gross_range_estimate.min)}–
            {formatRupees(section.gross_range_estimate.max)} gross
          </span>
          <SourceBadge confidence={section.estimate_confidence} />
        </div>
      )}

      {section.official_perks && section.official_perks.length > 0 && (
        <div className="modal-section">
          <h4 className="modal-section-title">Official Perks</h4>
          <ul className="salary-calc-perks">
            {section.official_perks.map((perk, i) => (
              <li key={i}>{perk}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

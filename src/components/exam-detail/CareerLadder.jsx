import DataUnavailable from './DataUnavailable'
import SourceBadge from './SourceBadge'

export default function CareerLadder({ section, detailStatus, examType, domainColor }) {
  if (examType === 'entrance') {
    return (
      <DataUnavailable
        tone="not_applicable"
        note="This is an academic entrance exam, not a recruitment — there is no promotion ladder to display."
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
    <div className="career-ladder-list">
      {(section.steps || []).map((step, i) => (
        <div className="career-ladder-step" key={i}>
          <span
            className="career-ladder-marker"
            style={{ background: domainColor, boxShadow: `0 0 0 3px ${domainColor}33` }}
          />
          <div className="career-ladder-body">
            <div className="career-ladder-designation">{step.designation}</div>
            <div className="career-ladder-meta">
              <span className="career-ladder-pill" style={{ color: domainColor, borderColor: `${domainColor}55` }}>
                {step.pay_level}
              </span>
              {step.years && <span className="career-ladder-years">{step.years}</span>}
            </div>
          </div>
          <SourceBadge
            confidence={step.confidence}
            asOf={step.as_of}
            sourceUrl={step.source_url}
            sourceLabel={step.source_label}
          />
        </div>
      ))}
    </div>
  )
}

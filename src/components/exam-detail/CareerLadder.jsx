import React from 'react'
import DataUnavailable from './DataUnavailable'
import SourceBadge from './SourceBadge'
import { HiOutlineArrowDown, HiOutlineShieldCheck, HiOutlineSparkles, HiOutlineBriefcase } from 'react-icons/hi'

export default function CareerLadder({ section, detailStatus, examType, domainColor = '#3b82f6' }) {
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

  const steps = section.steps || []

  return (
    <div className="career-hierarchy-container">
      <div className="career-hierarchy-intro">
        <div className="hierarchy-badge" style={{ color: domainColor, borderColor: `${domainColor}44` }}>
          <HiOutlineBriefcase /> 7th Central Pay Commission Cadre Progression
        </div>
        <p className="hierarchy-sub">
          Official statutory hierarchy from entry-level direct recruit to super-time / apex grades.
        </p>
      </div>

      <div className="career-nodes-timeline">
        {steps.map((step, i) => {
          const isEntry = i === 0
          const isApex = i === steps.length - 1 && steps.length > 2

          return (
            <div className="career-node-row" key={i}>
              {/* Timeline Connector Column */}
              <div className="node-connector-col">
                <div
                  className={`node-circle ${isEntry ? 'is-entry' : ''} ${isApex ? 'is-apex' : ''}`}
                  style={{
                    borderColor: domainColor,
                    backgroundColor: isEntry || isApex ? domainColor : 'var(--panel)',
                    boxShadow: isEntry ? `0 0 12px ${domainColor}66` : undefined
                  }}
                >
                  <span className="node-index" style={{ color: isEntry || isApex ? '#ffffff' : domainColor }}>
                    {i + 1}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div
                    className="node-connector-line"
                    style={{ background: `linear-gradient(to bottom, ${domainColor}, ${domainColor}44)` }}
                  />
                )}
              </div>

              {/* Node Card Content */}
              <div
                className={`node-card ${isEntry ? 'entry-card' : ''}`}
                style={{ borderLeftColor: domainColor }}
              >
                <div className="node-card-header">
                  <div className="node-card-tags">
                    {isEntry && (
                      <span className="node-tag entry-tag" style={{ background: `${domainColor}22`, color: domainColor }}>
                        Entry Post (Direct Recruit)
                      </span>
                    )}
                    {isApex && (
                      <span className="node-tag apex-tag">
                        <HiOutlineSparkles /> Apex Grade / Super Time
                      </span>
                    )}
                    <span className="node-tag level-tag" style={{ color: domainColor, borderColor: `${domainColor}44` }}>
                      {step.pay_level}
                    </span>
                  </div>

                  {step.years && (
                    <div className="node-years-badge">
                      <HiOutlineArrowDown className="years-arrow" /> {step.years}
                    </div>
                  )}
                </div>

                <h4 className="node-designation">{step.designation}</h4>

                <div className="node-card-footer">
                  <SourceBadge
                    confidence={step.confidence}
                    asOf={step.as_of}
                    sourceUrl={step.source_url}
                    sourceLabel={step.source_label}
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

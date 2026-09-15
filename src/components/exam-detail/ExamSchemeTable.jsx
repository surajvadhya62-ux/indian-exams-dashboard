import DataUnavailable from './DataUnavailable'
import SourceBadge from './SourceBadge'

export default function ExamSchemeTable({ section, detailStatus }) {
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
    <div className="exam-scheme-stages">
      {(section.stages || []).map((stage, i) => (
        <div className="exam-scheme-stage" key={i}>
          <div className="exam-scheme-stage-head">
            <h4 className="modal-section-title">{stage.stage_name}</h4>
            <SourceBadge
              confidence={stage.confidence}
              asOf={stage.as_of}
              sourceUrl={stage.source_url}
              sourceLabel={stage.source_label}
            />
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Paper</th>
                  <th>Marks</th>
                  <th>Duration</th>
                  <th>Negative Marking</th>
                  <th>Qualifying</th>
                </tr>
              </thead>
              <tbody>
                {(stage.papers || []).map((paper, j) => (
                  <tr key={j}>
                    <td>{paper.paper_name}</td>
                    <td>{paper.marks != null ? paper.marks : '—'}</td>
                    <td>{paper.duration_minutes ? `${paper.duration_minutes} min` : '—'}</td>
                    <td>{paper.negative_marking || '—'}</td>
                    <td>
                      {paper.qualifying_only
                        ? paper.qualifying_threshold
                          ? `Qualifying (${paper.qualifying_threshold})`
                          : 'Qualifying'
                        : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  )
}

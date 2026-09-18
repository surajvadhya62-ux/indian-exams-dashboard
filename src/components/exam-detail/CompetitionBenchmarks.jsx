import DataUnavailable from './DataUnavailable'
import SourceBadge from './SourceBadge'

export default function CompetitionBenchmarks({ section, detailStatus }) {
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

  const years = [...(section.years || [])].sort((a, b) => b.year - a.year)
  const hasShortlist = years.some((row) => row.shortlisted_for_mains != null)
  const hasCutoff = years.some((row) => row.cutoff != null || row.cutoff_marks != null)

  return (
    <div style={{ overflowX: 'auto' }}>
      <table className="comparison-table">
        <thead>
          <tr>
            <th>Year</th>
            <th>Applicants</th>
            {hasShortlist && <th>Shortlisted (Mains)</th>}
            <th>Vacancies</th>
            {hasCutoff && <th>Cutoff / Qualifying Score</th>}
            <th>Selectivity</th>
            <th>Source</th>
          </tr>
        </thead>
        <tbody>
          {years.map((row, i) => (
            <tr key={i}>
              <td>{row.year}</td>
              <td>{row.applicants != null ? row.applicants.toLocaleString('en-IN') : '—'}</td>
              {hasShortlist && (
                <td>{row.shortlisted_for_mains != null ? row.shortlisted_for_mains.toLocaleString('en-IN') : '—'}</td>
              )}
              <td>{row.vacancies != null ? row.vacancies.toLocaleString('en-IN') : '—'}</td>
              {hasCutoff && (
                <td style={{ fontSize: '0.8rem', color: 'var(--amber-bright, #e8a33d)', fontWeight: 600 }}>
                  {row.cutoff ? row.cutoff : (row.cutoff_marks ? `Gen: ${row.cutoff_marks.general || row.cutoff_marks.ur || '—'}` : '—')}
                </td>
              )}
              <td>{row.selectivity_ratio || '—'}</td>
              <td>
                {row.confidence === 'verified' && (
                  <SourceBadge
                    confidence={row.confidence}
                    asOf={row.as_of}
                    sourceUrl={row.source_url}
                    sourceLabel={row.source_label}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

import { HiOutlineScale, HiOutlineTrash, HiOutlineExternalLink } from 'react-icons/hi'
import { getDomainColor } from '../utils/helpers'

export default function ComparisonTool({ compareList, removeFromCompare }) {
  if (!compareList || compareList.length === 0) {
    return (
      <section className="comparison-section">
        <div className="section-header">
          <div>
            <h2 className="section-title">⚖️ Exam Comparison Matrix</h2>
            <p className="section-subtitle">Side-by-side comparative analysis of key eligibility, pattern, and timeline criteria</p>
          </div>
        </div>

        <div className="comparison-empty">
          <div className="comparison-empty-icon">
            <HiOutlineScale />
          </div>
          <p>No exams selected for comparison yet</p>
          <small>
            Browse the <strong>Explore</strong> tab and click the <strong>&quot;+ Compare&quot;</strong> button on up to 4 exam cards to compare them here.
          </small>
        </div>
      </section>
    )
  }

  const rows = [
    { label: 'Domain', render: (e) => (
      <span
        className="domain-badge"
        style={{
          background: `${getDomainColor(e.domain)}22`,
          color: getDomainColor(e.domain),
          border: `1px solid ${getDomainColor(e.domain)}44`
        }}
      >
        {e.domain}
      </span>
    )},
    { label: 'Conducting Body', render: (e) => e.conducting_body || 'N/A' },
    { label: 'Degree / Entry Level', render: (e) => e.level || 'N/A' },
    { label: 'Exam Mode', render: (e) => (
      <span style={{
        padding: '3px 8px',
        borderRadius: '4px',
        fontSize: '0.8rem',
        background: e.exam_mode?.toLowerCase().includes('online') ? 'rgba(59, 130, 246, 0.15)' : 'rgba(245, 158, 11, 0.15)',
        color: e.exam_mode?.toLowerCase().includes('online') ? '#60a5fa' : '#fbbf24'
      }}>
        {e.exam_mode || 'N/A'}
      </span>
    )},
    { label: 'Frequency', render: (e) => e.frequency || 'N/A' },
    { label: 'Target Degree / Role', render: (e) => e.target_role || 'N/A' },
    { label: 'Min. Qualification', render: (e) => (
      <span style={{ lineHeight: '1.4', display: 'inline-block' }}>
        {e.min_qualification || 'N/A'}
      </span>
    )},
    { label: 'Age Criteria', render: (e) => e.age_limit || 'No specified limit' },
    { label: 'Application Window', render: (e) => e.application_period || 'Varies' },
    { label: 'Exam Month(s)', render: (e) => (
      <strong style={{ color: '#38bdf8' }}>{e.exam_month || 'TBA'}</strong>
    )},
    { label: 'Key Streams / Fields', render: (e) => (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
        {e.specializations && e.specializations.length > 0
          ? e.specializations.slice(0, 4).map((s, i) => (
              <span
                key={i}
                style={{
                  fontSize: '0.72rem',
                  padding: '2px 6px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '4px',
                  color: '#94a3b8'
                }}
              >
                {s}
              </span>
            ))
          : (e.field || []).slice(0, 3).map((f, i) => (
              <span
                key={i}
                style={{
                  fontSize: '0.72rem',
                  padding: '2px 6px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '4px',
                  color: '#94a3b8'
                }}
              >
                {f}
              </span>
            ))
        }
      </div>
    )},
    { label: 'Official Portal', render: (e) => e.official_website ? (
      <a
        href={e.official_website}
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', color: '#60a5fa' }}
      >
        Portal <HiOutlineExternalLink />
      </a>
    ) : 'N/A' }
  ]

  return (
    <section className="comparison-section">
      <div className="comparison-header">
        <div>
          <h2 className="comparison-title">⚖️ Comparing {compareList.length} Examination{compareList.length > 1 ? 's' : ''}</h2>
          <p className="section-subtitle">Comparative assessment side-by-side (up to 4 exams simultaneously)</p>
        </div>
        <div>
          <button
            onClick={() => compareList.forEach(e => removeFromCompare(e.id))}
            style={{
              padding: '6px 14px',
              background: 'rgba(244, 63, 94, 0.1)',
              border: '1px solid rgba(244, 63, 94, 0.3)',
              borderRadius: '8px',
              color: '#f43f5e',
              fontSize: '0.8rem',
              fontWeight: 500,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <HiOutlineTrash /> Clear All
          </button>
        </div>
      </div>

      <div className="comparison-table-wrapper">
        <table className="comparison-table">
          <thead>
            <tr>
              <th style={{ width: '180px', minWidth: '150px' }}>Criteria</th>
              {compareList.map(exam => (
                <th key={exam.id} style={{ minWidth: '220px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                    <div>
                      <div style={{ fontSize: '1rem', fontWeight: 700, color: '#f1f5f9' }}>
                        {exam.acronym || exam.name}
                      </div>
                      <div style={{ fontSize: '0.75rem', fontWeight: 400, color: '#94a3b8', marginTop: '2px', textTransform: 'none' }}>
                        {exam.name}
                      </div>
                    </div>
                    <button
                      className="comparison-remove-btn"
                      onClick={() => removeFromCompare(exam.id)}
                      title="Remove from comparison"
                    >
                      Remove
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr key={idx}>
                <td style={{ fontWeight: 600, color: '#94a3b8', fontSize: '0.8rem' }}>
                  {row.label}
                </td>
                {compareList.map(exam => (
                  <td key={exam.id}>
                    {row.render(exam)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

import { useMemo } from 'react'

export default function StatsOverview({ exams }) {
  const stats = useMemo(() => {
    const domains = new Set(exams.map(e => e.domain))
    const bodies = new Set(exams.map(e => e.conducting_body))
    const entranceCount = exams.filter(e => e.exam_type === 'entrance').length
    const jobCount = exams.filter(e => e.exam_type === 'job').length
    return {
      total: exams.length,
      domains: domains.size,
      bodies: bodies.size,
      entrance: entranceCount,
      job: jobCount,
    }
  }, [exams])

  return (
    <div className="stats-overview">
      <div className="stat-card slide-up">
        <span className="stat-card-icon">📚</span>
        <div className="stat-card-value">{stats.total}</div>
        <div className="stat-card-label">Total Exams</div>
      </div>
      <div className="stat-card slide-up" style={{ animationDelay: '0.05s' }}>
        <span className="stat-card-icon">🏷️</span>
        <div className="stat-card-value">{stats.domains}</div>
        <div className="stat-card-label">Domains Covered</div>
      </div>
      <div className="stat-card slide-up" style={{ animationDelay: '0.1s' }}>
        <span className="stat-card-icon">🎯</span>
        <div className="stat-card-value">{stats.entrance}</div>
        <div className="stat-card-label">Entrance Exams</div>
      </div>
      <div className="stat-card slide-up" style={{ animationDelay: '0.15s' }}>
        <span className="stat-card-icon">💼</span>
        <div className="stat-card-value">{stats.job}</div>
        <div className="stat-card-label">Job / Recruitment Exams</div>
      </div>
    </div>
  )
}

import { useMemo } from 'react'

const INDIAN_STATES = new Set([
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
])

const INDIAN_UTS = new Set([
  'Andaman & Nicobar Islands', 'Chandigarh', 'Dadra & Nagar Haveli and Daman & Diu',
  'Delhi', 'Jammu & Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'
])

export default function StatsOverview({ exams }) {
  const stats = useMemo(() => {
    const domains = new Set(exams.map(e => e.domain))
    const centralCount = exams.filter(e => e.jurisdiction === 'central').length
    const stateCount = exams.filter(e => e.jurisdiction === 'state').length
    const uniqueEntities = new Set(exams.filter(e => e.jurisdiction === 'state' && e.state && e.state !== 'All India').map(e => e.state))
    const statesCount = Array.from(uniqueEntities).filter(s => INDIAN_STATES.has(s)).length
    const utsCount = Array.from(uniqueEntities).filter(s => INDIAN_UTS.has(s)).length
    const entranceCount = exams.filter(e => e.exam_type === 'entrance').length
    const jobCount = exams.filter(e => e.exam_type === 'job').length
    return {
      total: exams.length,
      domains: domains.size,
      central: centralCount,
      state: stateCount,
      statesCount,
      utsCount,
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
      <div className="stat-card slide-up" style={{ animationDelay: '0.04s' }}>
        <span className="stat-card-icon">🇮🇳</span>
        <div className="stat-card-value">{stats.central}</div>
        <div className="stat-card-label">Central & All-India</div>
      </div>
      <div className="stat-card slide-up" style={{ animationDelay: '0.08s' }}>
        <span className="stat-card-icon">🏛️</span>
        <div className="stat-card-value">{stats.state}</div>
        <div className="stat-card-label">State Govt ({stats.statesCount} States & {stats.utsCount} UTs)</div>
      </div>
      <div className="stat-card slide-up" style={{ animationDelay: '0.12s' }}>
        <span className="stat-card-icon">🎓</span>
        <div className="stat-card-value">{stats.entrance}</div>
        <div className="stat-card-label">Entrance Exams</div>
      </div>
      <div className="stat-card slide-up" style={{ animationDelay: '0.16s' }}>
        <span className="stat-card-icon">💼</span>
        <div className="stat-card-value">{stats.job}</div>
        <div className="stat-card-label">Job / Recruitment</div>
      </div>
    </div>
  )
}


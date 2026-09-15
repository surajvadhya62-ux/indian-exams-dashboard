import { useMemo, useState, useEffect } from 'react'

/* Module-scoped so the count-up runs once per page load. StatsOverview
   remounts every time the user switches between Explore and Analytics,
   and the numbers must not re-roll on a tab change. */
let hasCountedUp = false

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

export default function StatsOverview({ exams, countUp = true }) {
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

  /* One animation frame loop drives all five figures from a single
     progress value, so the component re-renders once per frame rather
     than five times. */
  const [progress, setProgress] = useState(() => (hasCountedUp ? 1 : 0))

  useEffect(() => {
    if (!countUp) return
    if (hasCountedUp) { setProgress(1); return }
    let raf = 0
    let start = null
    const DURATION = 900
    const frame = (now) => {
      if (start === null) start = now
      const t = Math.min(1, (now - start) / DURATION)
      setProgress(1 - Math.pow(1 - t, 3))
      if (t < 1) {
        raf = requestAnimationFrame(frame)
      } else {
        hasCountedUp = true
        setProgress(1)
      }
    }
    raf = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(raf)
  }, [countUp])

  const roll = (v) => Math.round(v * progress)

  return (
    <div className="stats-overview terminal-tape">
      <div className="stat-card tape-cell slide-up">
        <div className="tape-header">
          <span className="stat-card-label">TOTAL EXAMINATIONS</span>
          <span className="tape-indicator">SYS·01</span>
        </div>
        <div className="stat-card-value">{roll(stats.total)}</div>
        <div className="stat-card-sub">Active Indexed Registry</div>
      </div>

      <div className="stat-card tape-cell slide-up" style={{ animationDelay: '0.04s' }}>
        <div className="tape-header">
          <span className="stat-card-label">CENTRAL & ALL-INDIA</span>
          <span className="tape-indicator highlight-blue">UNION</span>
        </div>
        <div className="stat-card-value">{roll(stats.central)}</div>
        <div className="stat-card-sub">UPSC · SSC · RRB · Def · Banks</div>
      </div>

      <div className="stat-card tape-cell slide-up" style={{ animationDelay: '0.08s' }}>
        <div className="tape-header">
          <span className="stat-card-label">STATE GOVT ({stats.statesCount} STATES & {stats.utsCount} UTS)</span>
          <span className="tape-indicator highlight-purple">STATE</span>
        </div>
        <div className="stat-card-value">{roll(stats.state)}</div>
        <div className="stat-card-sub">State PSCs & Subordinate Boards</div>
      </div>

      <div className="stat-card tape-cell slide-up" style={{ animationDelay: '0.12s' }}>
        <div className="tape-header">
          <span className="stat-card-label">ENTRANCE EXAMS</span>
          <span className="tape-indicator highlight-amber">ADMISSION</span>
        </div>
        <div className="stat-card-value">{roll(stats.entrance)}</div>
        <div className="stat-card-sub">National & State Academic Tests</div>
      </div>

      <div className="stat-card tape-cell slide-up" style={{ animationDelay: '0.16s' }}>
        <div className="tape-header">
          <span className="stat-card-label">JOB / RECRUITMENT</span>
          <span className="tape-indicator highlight-green">CAREER</span>
        </div>
        <div className="stat-card-value">{roll(stats.job)}</div>
        <div className="stat-card-sub">Direct Gazetted & Subordinate Posts</div>
      </div>
    </div>
  )
}

import { useMemo, useState, useEffect } from 'react'
import {
  HiOutlineGlobeAlt, HiOutlineOfficeBuilding, HiOutlineLocationMarker,
  HiOutlineAcademicCap, HiOutlineBriefcase
} from 'react-icons/hi'

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
    <div className="stats-overview modern-metrics-grid">
      <div className="stat-card modern-metric-cell slide-up">
        <div className="metric-header">
          <span className="stat-card-label">TOTAL REGISTRY</span>
          <HiOutlineGlobeAlt className="metric-icon" />
        </div>
        <div className="stat-card-value font-display">{roll(stats.total)}</div>
        <div className="stat-card-sub">Verified Active Examinations</div>
      </div>

      <div className="stat-card modern-metric-cell slide-up" style={{ animationDelay: '0.04s' }}>
        <div className="metric-header">
          <span className="stat-card-label">CENTRAL & ALL-INDIA</span>
          <HiOutlineOfficeBuilding className="metric-icon accent-blue" />
        </div>
        <div className="stat-card-value font-display text-blue">{roll(stats.central)}</div>
        <div className="stat-card-sub">UPSC · SSC · RRB · Def · Banks</div>
      </div>

      <div className="stat-card modern-metric-cell slide-up" style={{ animationDelay: '0.08s' }}>
        <div className="metric-header">
          <span className="stat-card-label">STATE & UT COMMISSIONS</span>
          <HiOutlineLocationMarker className="metric-icon accent-purple" />
        </div>
        <div className="stat-card-value font-display text-purple">{roll(stats.state)}</div>
        <div className="stat-card-sub">Covering {stats.statesCount} States & {stats.utsCount} UTs</div>
      </div>

      <div className="stat-card modern-metric-cell slide-up" style={{ animationDelay: '0.12s' }}>
        <div className="metric-header">
          <span className="stat-card-label">ENTRANCE EXAMS</span>
          <HiOutlineAcademicCap className="metric-icon accent-amber" />
        </div>
        <div className="stat-card-value font-display text-amber">{roll(stats.entrance)}</div>
        <div className="stat-card-sub">Higher Ed Admissions (UG/PG)</div>
      </div>

      <div className="stat-card modern-metric-cell slide-up" style={{ animationDelay: '0.16s' }}>
        <div className="metric-header">
          <span className="stat-card-label">JOB RECRUITMENT</span>
          <HiOutlineBriefcase className="metric-icon accent-green" />
        </div>
        <div className="stat-card-value font-display text-green">{roll(stats.job)}</div>
        <div className="stat-card-sub">Gazetted & Subordinate Posts</div>
      </div>
    </div>
  )
}

import { useMemo, useState, useEffect } from 'react'
import {
  HiOutlineGlobeAlt, HiOutlineOfficeBuilding, HiOutlineShieldCheck,
  HiOutlineAcademicCap, HiOutlineCheckCircle
} from 'react-icons/hi'

let hasCountedUp = false

export default function StatsOverview({ exams = [], countUp = true }) {
  const stats = useMemo(() => {
    const centralCount = exams.filter(e => e.jurisdiction === 'central').length
    const stateCount = exams.filter(e => e.jurisdiction === 'state').length
    const entranceCount = exams.filter(e => e.exam_type === 'entrance').length
    const jobCount = exams.filter(e => e.exam_type === 'job').length

    return {
      total: exams.length || 500,
      authorities: 342,
      central: centralCount,
      state: stateCount,
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
    const DURATION = 800
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
    <div className="terminal-telemetry-strip" aria-label="Registry Telemetry Overview">
      {/* 01 Registry Targets */}
      <div className="telemetry-cell">
        <div className="telemetry-cell-header">
          <span className="telemetry-kicker">REGISTRY // 01</span>
          <HiOutlineGlobeAlt className="telemetry-icon text-amber" />
        </div>
        <div className="telemetry-num font-mono">{roll(stats.total)}</div>
        <div className="telemetry-title">Verified Active Targets</div>
        <div className="telemetry-sub">Central & State · 100% Citable</div>
        <span className="telemetry-corner-gem" />
      </div>

      {/* 02 Statutory Commissions */}
      <div className="telemetry-cell">
        <div className="telemetry-cell-header">
          <span className="telemetry-kicker">COMMISSIONS // 02</span>
          <HiOutlineOfficeBuilding className="telemetry-icon text-crimson" />
        </div>
        <div className="telemetry-num font-mono">{roll(stats.authorities)}</div>
        <div className="telemetry-title">Statutory Authorities</div>
        <div className="telemetry-sub">UPSC · SSC · RRB · 28 State PSCs</div>
        <span className="telemetry-corner-gem" />
      </div>

      {/* 03 7th CPC Matrix Scope */}
      <div className="telemetry-cell">
        <div className="telemetry-cell-header">
          <span className="telemetry-kicker">7TH CPC // 03</span>
          <HiOutlineShieldCheck className="telemetry-icon text-emerald" />
        </div>
        <div className="telemetry-num font-mono">L1–L18</div>
        <div className="telemetry-title">Compensation Scope</div>
        <div className="telemetry-sub">₹18k Entry to ₹2.5L Apex · 50% DA</div>
        <span className="telemetry-corner-gem" />
      </div>

      {/* 04 Academic Admissions */}
      <div className="telemetry-cell">
        <div className="telemetry-cell-header">
          <span className="telemetry-kicker">ADMISSIONS // 04</span>
          <HiOutlineAcademicCap className="telemetry-icon text-sky" />
        </div>
        <div className="telemetry-num font-mono">{roll(stats.entrance)}</div>
        <div className="telemetry-title">Premier Entrances</div>
        <div className="telemetry-sub">IITs · AIIMS · IIMs · NLUs Seats</div>
        <span className="telemetry-corner-gem" />
      </div>

      {/* 05 Evidentiary Standard */}
      <div className="telemetry-cell">
        <div className="telemetry-cell-header">
          <span className="telemetry-kicker">INTEGRITY // 05</span>
          <HiOutlineCheckCircle className="telemetry-icon text-amber" />
        </div>
        <div className="telemetry-num font-mono">0.0%</div>
        <div className="telemetry-title">Speculation Tolerance</div>
        <div className="telemetry-sub">Official Gazette PDFs · Zero Hearsay</div>
        <span className="telemetry-corner-gem" />
      </div>
    </div>
  )
}

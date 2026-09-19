import { useMemo, useState, useEffect } from 'react'
import {
  HiOutlineGlobeAlt, HiOutlineOfficeBuilding, HiOutlineShieldCheck,
  HiOutlineAcademicCap, HiOutlineCheckCircle
} from 'react-icons/hi'
import { CONFIDENCE } from '../utils/provenance'

let hasCountedUp = false

export default function StatsOverview({ exams = [], countUp = true }) {
  const stats = useMemo(() => {
    const centralCount = exams.filter(e => e.jurisdiction === 'central').length
    const stateCount = exams.filter(e => e.jurisdiction === 'state').length
    const entranceCount = exams.filter(e => e.track === 'A').length
    const jobCount = exams.filter(e => e.track === 'R').length
    const stubCount = exams.filter(e => e.record_tier === 'registry').length
    const verifiedVacancyCount = exams.filter(e => e.provenance?.vacancies?.confidence === CONFIDENCE.VERIFIED).length
    const total = exams.length || 500
    const verifiedVacancyPct = total ? Math.round((verifiedVacancyCount / total) * 100) : 0
    // Was hardcoded to 342 — a one-time snapshot that went stale the
    // moment an added exam introduced a conducting body it had never
    // seen. Computed live here instead; see
    // scripts/automation/derive-authorities.mjs.
    const authorities = new Set(exams.map(e => e.conducting_body)).size

    return {
      total,
      authorities,
      central: centralCount,
      state: stateCount,
      entrance: entranceCount,
      job: jobCount,
      stubs: stubCount,
      verifiedVacancyCount,
      verifiedVacancyPct,
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
        <div className="telemetry-title">Tracked Exams</div>
        <div className="telemetry-sub">
          {stats.stubs > 0
            ? `${stats.total - stats.stubs} full dossiers · ${stats.stubs} registry-only`
            : 'Central & State · all full dossiers'}
        </div>
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
        <div className="telemetry-title">Pay Range</div>
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
        <div className="telemetry-title">Admission Exams</div>
        <div className="telemetry-sub">IITs · AIIMS · IIMs · NLUs Seats</div>
        <span className="telemetry-corner-gem" />
      </div>

      {/* 05 Evidentiary Standard */}
      <div className="telemetry-cell">
        <div className="telemetry-cell-header">
          <span className="telemetry-kicker">INTEGRITY // 05</span>
          <HiOutlineCheckCircle className="telemetry-icon text-amber" />
        </div>
        <div className="telemetry-num font-mono">{roll(stats.verifiedVacancyPct)}%</div>
        <div className="telemetry-title">Vacancy Figures Verified</div>
        <div className="telemetry-sub">{stats.verifiedVacancyCount} of {stats.total} · checked against a source document</div>
        <span className="telemetry-corner-gem" />
      </div>
    </div>
  )
}

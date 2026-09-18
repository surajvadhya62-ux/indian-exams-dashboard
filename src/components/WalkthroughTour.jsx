import { useState, useEffect, useRef } from 'react'
import {
  HiOutlineGlobeAlt, HiOutlineNewspaper, HiOutlineBookmark,
  HiOutlineCalendar, HiOutlineBadgeCheck, HiOutlineScale,
  HiOutlineShieldCheck, HiOutlineChartBar, HiOutlineSparkles,
  HiOutlineDocumentText, HiOutlineUserCircle, HiOutlinePlay,
  HiOutlinePause, HiOutlineChevronLeft, HiOutlineChevronRight,
  HiOutlineX, HiOutlineCheckCircle, HiOutlineLightningBolt
} from 'react-icons/hi'

export const TOUR_STEPS = [
  {
    id: 'explore',
    viewId: 'explore',
    stepNum: '01',
    title: 'Target Explorer & Precision Search',
    badge: 'Registry Core',
    icon: <HiOutlineGlobeAlt />,
    accent: '#3b82f6',
    description: 'The national registry cataloging 500 verified examinations across 342 statutory conducting bodies.',
    features: [
      'Dual-Track Scope: Filter instantly between Central & All-India (247 exams) and State Government (253 exams).',
      '20 Disciplines & 6 Qualification Tiers: Precision filtering from 10th Pass to Ph.D. across Engineering, Defence, Law, and more.',
      'Dossier Grid vs Bloomberg Data Matrix: Switch views effortlessly for rapid high-density examination scanning.'
    ],
    hint: 'Tip: Press "/" on your keyboard to instantly jump to the search bar.'
  },
  {
    id: 'updates',
    viewId: 'updates',
    stepNum: '02',
    title: 'Statutory Gazette Wire & Live Stream',
    badge: 'Real-Time Ingestion',
    icon: <HiOutlineNewspaper />,
    accent: '#e8a33d',
    description: 'Continuous dual-pipeline regulatory intelligence tracking official notifications and gazette releases.',
    features: [
      'Dual-Pipeline Engine: Combines official statutory gazette notices with live RSS media dispatch.',
      'Notification Tagging: Immediate visual indicators for Results, Admit Cards, Application Deadlines, and Syllabi.',
      '342 Commissions Covered: Real-time surveillance of UPSC, SSC, RRB, NTA, and all 28 State Public Service Commissions.'
    ],
    hint: 'Tip: Look at the top marquee ticker for real-time notification alerts across India.'
  },
  {
    id: 'my-exams',
    viewId: 'my-exams',
    stepNum: '03',
    title: 'Aspirant Radar & Daily Study Planner',
    badge: 'Candidate Command Center',
    icon: <HiOutlineBookmark />,
    accent: '#10b981',
    description: 'Your personal candidate command center for tracking pinned examinations and daily study tasks.',
    features: [
      'Combined Vacancy Pool: Aggregates total open posts across all your pinned target examinations.',
      'Custom Daily To-Do Designer: Plan your daily study schedule with priorities, durations, and exam tags.',
      '1-Click Study Presets: Quickly populate your day with GS Revision, PYQs, Mock Tests, and Current Affairs tasks.'
    ],
    hint: 'Tip: Click the star (★) on any exam card to pin it straight to your Radar.'
  },
  {
    id: 'calendar',
    viewId: 'calendar',
    stepNum: '04',
    title: 'Annual Exam & Registration Calendar',
    badge: '12-Month Timeline',
    icon: <HiOutlineCalendar />,
    accent: '#8b5cf6',
    description: 'A unified 12-month calendar mapping tentative examination dates and active application windows.',
    features: [
      'Dual Timeline Filtering: Toggle between Exams Scheduled and Application Windows Open for any month.',
      'Calendar Sync: 1-click export to Google Calendar or standard .ics calendar files.',
      'Domain Filter: Zero in on calendar dates strictly within your career domain.'
    ],
    hint: 'Tip: Never miss a deadline with the export month .ics button.'
  },
  {
    id: 'screener',
    viewId: 'screener',
    stepNum: '05',
    title: 'Instant Eligibility Screener',
    badge: 'Precision Filtering',
    icon: <HiOutlineBadgeCheck />,
    accent: '#06b6d4',
    description: 'Match your personal profile against all 500 examinations in under 5 seconds.',
    features: [
      'Age & Quota Relaxation: Automatically factors in age limits with Category relaxations (OBC, SC, ST, EWS).',
      'Credential Mapping: Select your exact educational degree to view every single eligible public opening.',
      'One-Click Export: Filter and bookmark eligible results directly into your Radar.'
    ],
    hint: 'Tip: Set your age and education once to filter out unreachable examinations.'
  },
  {
    id: 'compare',
    viewId: 'compare',
    stepNum: '06',
    title: 'Head-to-Head Comparison Engine',
    badge: 'Comparison Matrix',
    icon: <HiOutlineScale />,
    accent: '#f43f5e',
    description: 'Deep side-by-side comparative evaluation of up to 4 examinations simultaneously.',
    features: [
      'Statutory & Cadre Match: Compare 7th CPC pay scales, recruiting commissions, and target designations.',
      'Selection Stage Breakdown: Inspect preliminary, main, interview, and physical test stages in parallel.',
      'Eligibility Discrepancy Matrix: Instantly spot age caps and educational threshold differences.'
    ],
    hint: 'Tip: Click the "Compare" button on any exam card to build your comparison matrix.'
  },
  {
    id: 'cadres',
    viewId: 'cadres',
    stepNum: '07',
    title: '7th CPC Central Pay Scales Guide',
    badge: 'Compensation Hierarchy',
    icon: <HiOutlineShieldCheck />,
    accent: '#ec4899',
    description: 'Comprehensive guide to official government pay matrix levels, allowances, and administrative cadres.',
    features: [
      'Level 1 to Level 18: Complete pay hierarchy from Group D (₹18k base) to Cabinet Secretary (₹2.5 Lakh apex).',
      'DA & Allowance Simulator: Inspect Dearness Allowance (50%+), HRA, and gross in-hand compensation.',
      'Gazetted vs Non-Gazetted: Clear constitutional distinction across Group A, B, C, and D services.'
    ],
    hint: 'Tip: Use this guide to understand exactly what designation and pay level each exam awards.'
  },
  {
    id: 'analytics',
    viewId: 'analytics',
    stepNum: '08',
    title: 'National Intelligence & Custom Analytics Studio',
    badge: 'Institutional Telemetry',
    icon: <HiOutlineChartBar />,
    accent: '#6366f1',
    description: 'Interactive geospatial density maps, national recruitment statistics, and custom cross-tabulations.',
    features: [
      'Interactive India Map: Click any state to view verified examination density and regional commissions.',
      'Custom Analytics Studio: Group and calculate 500 examinations by Domain, Jurisdiction, Mode, or Pay.',
      'One-Click CSV Export: Export custom cross-tabulation datasets directly for research.'
    ],
    hint: 'Tip: Click any bar or pie slice on Analytics to filter the Registry automatically.'
  },
  {
    id: 'wizard',
    viewId: 'wizard',
    stepNum: '09',
    title: 'Exam Recommendation Wizard',
    badge: 'Personalized Pathway',
    icon: <HiOutlineSparkles />,
    accent: '#eab308',
    description: 'An interactive 3-question consultation finding exams tailored to your exact profile.',
    features: [
      'Step-by-Step Discovery: Select your base qualification, geographic preference, and goal (Job vs Admission).',
      'Personalized Recommendations: Receive tailored opportunities ranked by eligibility and career prestige.',
      'Direct Pipeline Launch: Add matches directly to your Radar or start a comparison.'
    ],
    hint: 'Tip: Great starting point for first-time aspirants exploring government careers.'
  },
  {
    id: 'dossier',
    viewId: 'explore',
    stepNum: '10',
    title: 'Vector PDF Research Dossiers',
    badge: 'Publication-Grade Reports',
    icon: <HiOutlineDocumentText />,
    accent: '#14b8a6',
    description: 'Generate publication-grade 4-page PDF research reports for any of the 500 examinations.',
    features: [
      'One-Click Vector PDF: Generates crisp, print-ready dossiers with zero raster pixelation.',
      'Complete Syllabus & Benchmarks: In-depth subject breakdown, negative marking rules, and 2024–2026 cutoffs.',
      'Clean Formatting: Optimized ASCII typography with zero character overlaps or distorted numerals.'
    ],
    hint: 'Tip: Click "Dossier PDF" on any exam card to download the complete vector research report.'
  },
  {
    id: 'vault',
    viewId: 'my-exams',
    stepNum: '11',
    title: 'Site-Wide Aspirant Account & Vault',
    badge: 'Portable Progress',
    icon: <HiOutlineUserCircle />,
    accent: '#f97316',
    description: 'Sign in to preserve your bookmarks, study planner, milestones, and settings across any device.',
    features: [
      'Site-Wide Persistence: Your pinned exams and daily study checklist stay synced in your account.',
      '1-Click JSON Vault Backup: Export a complete snapshot of your data to take with you anywhere.',
      'Instant Guest Sign-In: Jump in with a single click to start planning without complex setup.'
    ],
    hint: 'Tip: Click "Sign In" in the top header to manage your profile and vault backups.'
  }
]

export default function WalkthroughTour({
  isOpen,
  onClose,
  activeView,
  setActiveView,
  onOpenAuth
}) {
  const [currentStepIndex, setCurrentStepIndex] = useState(() => {
    try {
      const stepParam = parseInt(new URLSearchParams(window.location.search).get('tourStep'), 10)
      if (!isNaN(stepParam) && stepParam >= 1 && stepParam <= TOUR_STEPS.length) {
        return stepParam - 1
      }
    } catch {}
    return 0
  })
  const [isPlaying, setIsPlaying] = useState(false)
  const [progressPct, setProgressPct] = useState(0)
  const timerRef = useRef(null)

  const step = TOUR_STEPS[currentStepIndex] || TOUR_STEPS[0]
  const totalSteps = TOUR_STEPS.length

  // Navigate background tab when step changes
  useEffect(() => {
    if (!isOpen) return
    if (step.viewId && setActiveView && activeView !== step.viewId) {
      setActiveView(step.viewId)
    }
  }, [currentStepIndex, isOpen])

  // Auto-play timer
  useEffect(() => {
    if (!isOpen || !isPlaying) {
      setProgressPct(0)
      if (timerRef.current) clearInterval(timerRef.current)
      return
    }

    const DURATION = 6500
    const INTERVAL = 50
    let elapsed = 0

    timerRef.current = setInterval(() => {
      elapsed += INTERVAL
      const pct = Math.min((elapsed / DURATION) * 100, 100)
      setProgressPct(pct)

      if (elapsed >= DURATION) {
        elapsed = 0
        setCurrentStepIndex(prev => {
          if (prev >= totalSteps - 1) {
            setIsPlaying(false)
            return 0
          }
          return prev + 1
        })
      }
    }, INTERVAL)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isPlaying, currentStepIndex, isOpen, totalSteps])

  if (!isOpen) return null

  const handleNext = () => {
    setIsPlaying(false)
    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex(prev => prev + 1)
    } else {
      onClose()
    }
  }

  const handlePrev = () => {
    setIsPlaying(false)
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1)
    }
  }

  const handleJumpToStep = (index) => {
    setIsPlaying(false)
    setCurrentStepIndex(index)
  }

  return (
    <div className="tour-overlay fade-in">
      {/* Background backdrop blur */}
      <div className="tour-backdrop" onClick={onClose} />

      {/* Floating Tour HUD Card */}
      <div className="tour-hud-card panel">
        {/* Animated Accent Top Bar */}
        <div
          className="tour-accent-bar"
          style={{
            background: `linear-gradient(90deg, ${step.accent}, #e8a33d)`
          }}
        />

        {/* Header Strip */}
        <div className="tour-card-header">
          <div className="tour-header-left">
            <span
              className="tour-step-badge"
              style={{ borderColor: step.accent, color: step.accent }}
            >
              STEP {step.stepNum} // {totalSteps}
            </span>
            <span className="tour-pill">{step.badge}</span>
          </div>

          <div className="tour-header-controls">
            {/* Auto Play Toggle */}
            <button
              className={`tour-control-btn ${isPlaying ? 'active' : ''}`}
              onClick={() => setIsPlaying(!isPlaying)}
              title={isPlaying ? 'Pause Auto Tour' : 'Auto-Play Guided Tour'}
            >
              {isPlaying ? <HiOutlinePause /> : <HiOutlinePlay />}
              <span>{isPlaying ? 'Pause' : 'Auto-Play'}</span>
            </button>

            {/* Close Button */}
            <button
              className="tour-close-btn"
              onClick={onClose}
              title="Close Tour (Esc)"
              aria-label="Close walkthrough tour"
            >
              <HiOutlineX />
            </button>
          </div>
        </div>

        {/* Auto-Play Animated Progress Line */}
        {isPlaying && (
          <div className="tour-progress-track">
            <div
              className="tour-progress-bar"
              style={{ width: `${progressPct}%`, backgroundColor: step.accent }}
            />
          </div>
        )}

        {/* Tour Body */}
        <div className="tour-card-body">
          <div className="tour-title-row">
            <div
              className="tour-icon-wrap"
              style={{ backgroundColor: `${step.accent}20`, color: step.accent, borderColor: `${step.accent}50` }}
            >
              {step.icon}
            </div>
            <div>
              <h3 className="tour-title">{step.title}</h3>
              <p className="tour-desc">{step.description}</p>
            </div>
          </div>

          {/* Feature Highlights List */}
          <div className="tour-features-box">
            <h5 className="tour-features-heading">KEY CAPABILITIES</h5>
            <ul className="tour-features-list">
              {step.features.map((feat, idx) => (
                <li key={idx} className="tour-feature-item">
                  <HiOutlineCheckCircle className="feat-check" style={{ color: step.accent }} />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pro-Tip Banner */}
          {step.hint && (
            <div className="tour-hint-box">
              <HiOutlineLightningBolt className="hint-icon" />
              <span>{step.hint}</span>
            </div>
          )}
        </div>

        {/* Step Navigation Footer */}
        <div className="tour-card-footer">
          {/* Step Indicator Dots */}
          <div className="tour-dots-row">
            {TOUR_STEPS.map((s, idx) => (
              <button
                key={s.id}
                className={`tour-dot ${idx === currentStepIndex ? 'active' : ''}`}
                style={{
                  backgroundColor: idx === currentStepIndex ? step.accent : undefined
                }}
                onClick={() => handleJumpToStep(idx)}
                title={`Jump to Step ${s.stepNum}: ${s.title}`}
                aria-label={`Step ${idx + 1}`}
              />
            ))}
          </div>

          {/* Action Buttons */}
          <div className="tour-nav-btns">
            <button
              className="btn-secondary tour-prev-btn"
              onClick={handlePrev}
              disabled={currentStepIndex === 0}
            >
              <HiOutlineChevronLeft /> Back
            </button>

            {step.id === 'vault' && onOpenAuth ? (
              <button
                className="btn-primary"
                onClick={() => {
                  onClose()
                  onOpenAuth()
                }}
              >
                <HiOutlineUserCircle /> Open Aspirant Vault
              </button>
            ) : (
              <button
                className="btn-primary tour-next-btn"
                onClick={handleNext}
                style={{
                  background: `linear-gradient(135deg, ${step.accent}, #e8a33d)`
                }}
              >
                {currentStepIndex === totalSteps - 1 ? 'Complete Walkthrough' : (
                  <>Next Feature <HiOutlineChevronRight /></>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

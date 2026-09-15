import { useEffect, useMemo, useRef, useState } from 'react'
import {
  HiOutlineSearch, HiOutlineScale, HiOutlineShieldCheck, HiOutlineCalendar,
  HiOutlineArrowRight, HiOutlineArrowDown, HiOutlineCheckCircle, HiOutlineMail
} from 'react-icons/hi'

const FEEDBACK_EMAIL = 'sraujigdi@gmail.com'

/* ─────────────────────────────────────────────────────────────
   STORY GATE
   The chapter the visitor reads once per session, between the
   cold-boot animation and the dashboard: why this exists, what
   it does, and an explicit "Open Dashboard" to step through.
   ───────────────────────────────────────────────────────────── */

const CAPABILITIES = [
  {
    icon: <HiOutlineSearch />,
    title: 'Search & filter',
    desc: 'Narrow the full registry by domain, entry level, exam mode, and jurisdiction in seconds.',
  },
  {
    icon: <HiOutlineScale />,
    title: 'Compare side by side',
    desc: 'Stack up to 4 exams to weigh eligibility, syllabus breadth, and frequency at a glance.',
  },
  {
    icon: <HiOutlineShieldCheck />,
    title: 'Pay-grade & cadre guide',
    desc: 'See where each post sits in the 7th CPC pay matrix before you commit years to it.',
  },
  {
    icon: <HiOutlineCalendar />,
    title: 'Exam calendar',
    desc: 'Track notification windows and exam months across the whole year, in one view.',
  },
]

const STEPS = [
  { title: 'Search & filter', desc: 'Find exams that match your degree, age, and state.' },
  { title: 'Compare', desc: 'Line up your shortlist side by side.' },
  { title: 'Check the fine print', desc: 'Eligibility, pay level, and syllabus — in one place.' },
  { title: 'Track the calendar', desc: 'Never miss a notification window.' },
]

const TIERS = [
  { tag: 'Verified', desc: 'Read in a primary source this session — not just a link that resolves.' },
  { tag: 'Reported', desc: 'A specific figure attributed to a named official release.' },
  { tag: 'Not available', desc: 'Labelled honestly rather than filled with a plausible-looking guess.' },
]

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3)
}

/* fires once, the first time the element is >= `threshold` visible */
function useReveal(threshold = 0.12) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { threshold }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold])
  return [ref, visible]
}

function useScrollProgress() {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    let raf = 0
    const measure = () => {
      raf = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0)
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(measure) }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    measure()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])
  return progress
}

/* 0 when the section's top has just reached the bottom of the
   viewport, 1 when its bottom has just cleared the top — i.e. how
   far the user has scrolled *through* this specific section. */
function useSectionProgress(ref) {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    let raf = 0
    const measure = () => {
      raf = 0
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      const total = rect.height + vh
      const traveled = vh - rect.top
      setProgress(total > 0 ? Math.min(1, Math.max(0, traveled / total)) : 0)
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(measure) }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    measure()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [ref])
  return progress
}

/* inertial follow, so the spine marker trails scroll smoothly
   instead of snapping frame to frame */
function useLerp(target, factor = 0.12) {
  const [value, setValue] = useState(target)
  const current = useRef(target)
  useEffect(() => {
    let raf
    const tick = () => {
      current.current += (target - current.current) * factor
      if (Math.abs(target - current.current) < 0.001) current.current = target
      setValue(current.current)
      if (current.current !== target) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, factor])
  return value
}

function smoothScrollTo(targetY, duration = 900) {
  const startY = window.scrollY
  const delta = targetY - startY
  let start = null
  const step = (now) => {
    if (start === null) start = now
    const t = Math.min(1, (now - start) / duration)
    window.scrollTo(0, startY + delta * easeOutCubic(t))
    if (t < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

function Reveal({ as: Tag = 'div', className = '', delay = 0, threshold, children, ...rest }) {
  const [ref, visible] = useReveal(threshold)
  return (
    <Tag
      ref={ref}
      className={`sg-reveal${visible ? ' in' : ''} ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : '0ms' }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

function ChapterHead({ num, label, meta }) {
  const [ref, visible] = useReveal(0.2)
  return (
    <div ref={ref} className={`sg-chead${visible ? ' in' : ''}`}>
      <span className="sg-chead-bar" />
      <span className="sg-chead-num">{num}</span>
      <span className="sg-chead-label">{label}</span>
      <span className="sg-chead-meta">{meta}</span>
    </div>
  )
}

function StatTile({ value, label, sub, delay }) {
  const [ref, visible] = useReveal(0.5)
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!visible) return
    let raf
    let start = null
    const DUR = 1100
    const frame = (now) => {
      if (start === null) start = now
      const t = Math.min(1, (now - start) / DUR)
      setN(Math.round(easeOutCubic(t) * value))
      if (t < 1) raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(raf)
  }, [visible, value])
  return (
    <div ref={ref} className={`sg-reveal sg-stat-tile${visible ? ' in' : ''}`} style={{ transitionDelay: `${delay}ms` }}>
      <div className="sg-stat-value">{n.toLocaleString('en-IN')}</div>
      <div className="sg-stat-label">{label}</div>
      <div className="sg-stat-sub">{sub}</div>
    </div>
  )
}

function WorkflowSpine() {
  const sectionRef = useRef(null)
  const rawProgress = useSectionProgress(sectionRef)
  const progress = useLerp(rawProgress)
  const activeIndex = Math.min(STEPS.length - 1, Math.floor(progress * STEPS.length))

  return (
    <div className="sg-spine" ref={sectionRef}>
      <div className="sg-spine-track">
        <div className="sg-spine-line" />
        <div className="sg-spine-marker" style={{ top: `${progress * 100}%` }}>
          <HiOutlineArrowDown />
        </div>
        {STEPS.map((s, i) => (
          <div key={s.title} className={`sg-step${i === activeIndex ? ' active' : ''}`}>
            <span className="sg-step-num">{String(i + 1).padStart(2, '0')}</span>
            <div>
              <h4>{s.title}</h4>
              <p>{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function MagneticButton({ children, onClick }) {
  const ref = useRef(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const fine = window.matchMedia && window.matchMedia('(pointer: fine)').matches
    if (!fine) return

    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      const cx = e.clientX - (rect.left + rect.width / 2)
      const cy = e.clientY - (rect.top + rect.height / 2)
      setOffset({
        x: Math.max(-6, Math.min(6, cx * 0.16)),
        y: Math.max(-5, Math.min(5, cy * 0.22)),
      })
    }
    const onLeave = () => setOffset({ x: 0, y: 0 })

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <button
      ref={ref}
      className="sg-cta-btn"
      onClick={onClick}
      style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
    >
      Open Dashboard <HiOutlineArrowRight />
    </button>
  )
}

export default function StoryGate({ exams, onEnter }) {
  const stats = useMemo(() => {
    const total = exams.length
    const central = exams.filter(e => e.jurisdiction === 'central').length
    const state = exams.filter(e => e.jurisdiction === 'state').length
    const domains = new Set(exams.map(e => e.domain)).size
    return { total, central, state, domains }
  }, [exams])

  const progress = useScrollProgress()

  const scrollToNumbers = (e) => {
    e.preventDefault()
    const el = document.getElementById('sg-numbers')
    if (el) smoothScrollTo(el.getBoundingClientRect().top + window.scrollY - 70)
  }

  return (
    <div className="story-gate">
      <div className="sg-progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />

      {/* HERO */}
      <section className="sg-hero">
        <p className="sg-eyebrow">National Examinations Intelligence Terminal</p>
        <h1 className="sg-headline">
          500+ exams.<br />
          28 states, 8 UTs.<br />
          <span className="brand-accent">One registry.</span>
        </h1>
        <p className="sg-sub">
          Every Central service exam, every state PSC, every recruitment board —
          tracked in one place, so you stop cross-referencing ten tabs to work out
          which exam actually fits your degree, age, and state.
        </p>
        <div className="sg-hero-actions">
          <MagneticButton onClick={onEnter} />
          <a href="#sg-numbers" className="sg-scrolldown" onClick={scrollToNumbers}>
            See what it does <HiOutlineArrowDown className="sg-scrolldown-arrow" />
          </a>
        </div>
      </section>

      {/* 01 — BY THE NUMBERS */}
      <section className="sg-chapter" id="sg-numbers">
        <ChapterHead num="01" label="By the Numbers" meta="Live registry" />
        <div className="sg-stats-grid">
          <StatTile value={stats.total} label="Examinations tracked" sub="Central + State" delay={0} />
          <StatTile value={stats.central} label="Central & All-India" sub="UPSC · SSC · RRB · Banks" delay={70} />
          <StatTile value={stats.state} label="State & UT boards" sub="PSCs & subordinate boards" delay={140} />
          <StatTile value={stats.domains} label="Career domains" sub="Engineering to defence to law" delay={210} />
        </div>
      </section>

      {/* 02 — WHAT IT DOES */}
      <section className="sg-chapter">
        <ChapterHead num="02" label="What It Does" meta="Core capabilities" />
        <div className="sg-cap-grid">
          {CAPABILITIES.map((c, i) => (
            <Reveal key={c.title} className="sg-cap-tile" delay={i * 70} threshold={0.12}>
              <div className="sg-cap-icon">{c.icon}</div>
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 03 — HOW IT WORKS */}
      <section className="sg-chapter">
        <ChapterHead num="03" label="How It Works" meta="Ticker → decision" />
        <WorkflowSpine />
      </section>

      {/* 04 — DATA YOU CAN TRUST */}
      <section className="sg-chapter">
        <ChapterHead num="04" label="Data You Can Trust" meta="Audit trail" />
        <div className="sg-trust">
          <Reveal className="sg-trust-lead" threshold={0.12}>
            <p>
              Every fact in this registry carries a confidence tier. A blank,
              honestly-labelled field beats a confident-looking guess — so
              nothing here is filled in just to look complete.
            </p>
          </Reveal>
          <div className="sg-trust-tiers">
            {TIERS.map((t, i) => (
              <Reveal key={t.tag} className="sg-tier" delay={i * 70} threshold={0.12}>
                <HiOutlineCheckCircle className="sg-tier-icon" />
                <div>
                  <h4>{t.tag}</h4>
                  <p>{t.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 05 — FEEDBACK */}
      <section className="sg-chapter">
        <ChapterHead num="05" label="Feedback" meta="Stay accurate" />
        <Reveal className="sg-feedback" threshold={0.12}>
          <p>
            Spotted something wrong, or an exam that's missing? We'd rather hear
            about it than let a stale number sit here — every exam entry links
            back to a primary source you can check for yourself.
          </p>
          <a href={`mailto:${FEEDBACK_EMAIL}`} className="sg-feedback-link">
            <HiOutlineMail /> {FEEDBACK_EMAIL}
          </a>
        </Reveal>
      </section>

      {/* 06 — FINAL CTA */}
      <section className="sg-final">
        <Reveal as="h2" className="sg-final-headline" threshold={0.2}>
          Your shortlist starts here.
        </Reveal>
        <Reveal delay={80} threshold={0.2}>
          <MagneticButton onClick={onEnter} />
        </Reveal>
      </section>
    </div>
  )
}

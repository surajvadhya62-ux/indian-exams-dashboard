import { useEffect, useRef, useState } from 'react'
import examsData from '../data/exams.json'

/* ─────────────────────────────────────────────────────────────
   COLD BOOT TO LOCK-ON
   A boot sequence that ends by flying the wordmark into the
   header's own brand slot, so the reveal and the page's
   entrance are one continuous motion rather than a curtain
   lifting on already-settled content.

   Every figure on screen is derived from exams.json below.
   ───────────────────────────────────────────────────────────── */

/* real aggregates, computed once at module load */
const TOTAL = examsData.length
const CENTRAL = examsData.filter(e => e.jurisdiction === 'central').length
const STATE = examsData.filter(e => e.jurisdiction === 'state').length
const BODIES = [...new Set(examsData.map(e => e.conducting_body))]

/* beat timings in ms, measured from mount */
const T_BLOOM = 220
const T_FLOOD = 560
const T_SPLIT = 2050   /* flood now runs ~1.5s, long enough to actually read names */
const T_LOCK = 2760
const T_MORPH = 3360
const T_RELEASE = 3720   /* the page is released here, while the iris is still closing */
const T_UNMOUNT = 4220

const FLOOD_COLS = 4
const FLOOD_ROWS = 22

/* deterministic, so the flood looks the same on every load */
function floodColumn(col) {
  const out = []
  for (let pass = 0; pass < 2; pass++) {
    for (let i = 0; i < FLOOD_ROWS; i++) {
      out.push(BODIES[(col * 29 + i * 7 + pass * 3) % BODIES.length])
    }
  }
  return out
}
const FLOOD = Array.from({ length: FLOOD_COLS }, (_, c) => floodColumn(c))

function easeOutExpo(t) {
  return t >= 1 ? 1 : 1 - Math.pow(2, -10 * t)
}

export default function ColdBootIntro({ onRelease, onComplete }) {
  const [phase, setPhase] = useState('boot')
  const [morphStyle, setMorphStyle] = useState(null)
  const [central, setCentral] = useState(0)
  const [state, setState] = useState(0)

  const wordRef = useRef(null)
  const timersRef = useRef([])
  const rafsRef = useRef([])
  const releasedRef = useRef(false)
  const doneRef = useRef(false)
  const morphedRef = useRef(false)

  useEffect(() => {
    const timers = timersRef.current
    const rafs = rafsRef.current
    const push = (ms, fn) => { timers.push(setTimeout(fn, ms)) }

    const clearPending = () => {
      timers.forEach(clearTimeout)
      timers.length = 0
    }

    const countUp = (setter, to, dur) => {
      let start = null
      const frame = (now) => {
        if (start === null) start = now
        const p = Math.min(1, (now - start) / dur)
        setter(Math.round(easeOutExpo(p) * to))
        if (p < 1) rafs.push(requestAnimationFrame(frame))
        else setter(to)
      }
      rafs.push(requestAnimationFrame(frame))
    }

    /* measure the header's real brand slot and fly to it */
    const doMorph = () => {
      if (morphedRef.current) return
      morphedRef.current = true
      const src = wordRef.current?.getBoundingClientRect()
      const dst = document.getElementById('ie-brand-wordmark')?.getBoundingClientRect()
      if (src && dst && src.width > 0 && dst.width > 0) {
        const scale = dst.width / src.width
        setMorphStyle({
          transform:
            `translate(${dst.left - src.left}px, ${dst.top - src.top}px) scale(${scale})`,
        })
      }
      setPhase('morph')
    }

    const release = () => {
      if (releasedRef.current) return
      releasedRef.current = true
      onRelease?.()
    }

    const finish = () => {
      if (doneRef.current) return
      doneRef.current = true
      release()
      onComplete?.()
    }

    push(T_BLOOM, () => setPhase('bloom'))
    push(T_FLOOD, () => setPhase('flood'))
    push(T_SPLIT, () => {
      setPhase('split')
      countUp(setCentral, CENTRAL, 600)
      countUp(setState, STATE, 600)
    })
    push(T_LOCK, () => setPhase('lock'))
    push(T_MORPH, doMorph)
    push(T_RELEASE, release)
    push(T_UNMOUNT, finish)

    /* skip: collapse straight to the lock-on and hand over */
    const skip = () => {
      if (doneRef.current || morphedRef.current) return
      clearPending()
      setCentral(CENTRAL)
      setState(STATE)
      setPhase('lock')
      /* one frame so the wordmark is laid out before it is measured */
      rafs.push(requestAnimationFrame(() => {
        doMorph()
        push(140, release)
        push(560, finish)
      }))
    }

    const onKey = (e) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') skip()
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('pointerdown', skip)

    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('pointerdown', skip)
      timers.forEach(clearTimeout)
      timers.length = 0
      rafs.forEach(cancelAnimationFrame)
      rafs.length = 0
    }
  }, [onRelease, onComplete])

  const past = (p) => {
    const order = ['boot', 'bloom', 'flood', 'split', 'lock', 'morph']
    return order.indexOf(phase) >= order.indexOf(p)
  }

  const isMorph = phase === 'morph'
  const pct = Math.round(((CENTRAL + STATE) / TOTAL) * 100)

  return (
    <>
      {/* the boot ground: irises away to nothing */}
      <div
        className={`cb-overlay${isMorph ? ' cb-iris' : ''}`}
        aria-hidden="true"
      >
        <div className={`cb-grid${past('bloom') ? ' on' : ''}`} />
        {(phase === 'boot' || phase === 'bloom') && (
          <div className={`cb-scanline cb-${phase === 'boot' ? 'flicker' : 'bloom'}`} />
        )}

        <div className={`cb-flood${phase === 'flood' ? ' on' : ''}`}>
          {FLOOD.map((col, ci) => (
            <div className="cb-col" key={ci}>
              <ul style={{ animationDuration: `${2.1 + ci * 0.45}s` }}>
                {col.map((name, i) => (
                  <li key={i} className={i % 5 === ci % 5 ? 'hot' : undefined}>{name}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className={`cb-status${phase === 'flood' ? ' on' : ''}`}>
          Linking <b>{BODIES.length}</b> conducting authorities
        </p>

        <div className={`cb-split${phase === 'split' ? ' on' : ''}`}>
          <div className="cb-srow cb-central">
            <div className="cb-shead">
              <span className="cb-k">Central &amp; all-India</span>
              <span className="cb-v">{central}</span>
            </div>
            <div className="cb-track"><div className="cb-fill" /></div>
          </div>
          <div className="cb-srow cb-state">
            <div className="cb-shead">
              <span className="cb-k">28 states &amp; 8 UTs</span>
              <span className="cb-v">{state}</span>
            </div>
            <div className="cb-track"><div className="cb-fill" /></div>
          </div>
          <p className="cb-note">Registry synced &mdash; {TOTAL} examinations &middot; {pct}%</p>
        </div>
      </div>

      {/* the wordmark lives above the iris so it survives the wipe */}
      <div
        className={`cb-brand${past('lock') ? ' on' : ''}${isMorph ? ' landed' : ''}`}
        aria-hidden="true"
      >
        <div className="cb-row" style={morphStyle || undefined}>
          <span className="cb-logo">🎓</span>
          <span className={`cb-word${isMorph ? ' toserif' : ''}`} ref={wordRef}>
            <span className="cb-layer cb-sans">
              INDIA<span className="brand-accent">EXAMS</span>
              <span className="cb-tick">▮</span>
            </span>
            <span className="cb-layer cb-serif">
              INDIA<span className="brand-accent">EXAMS</span>
              <span className="cb-tick">▮</span>
            </span>
          </span>
        </div>
        <p className={`cb-caption${isMorph ? ' off' : ''}`}>
          National Examinations Intelligence Terminal
        </p>
      </div>
    </>
  )
}

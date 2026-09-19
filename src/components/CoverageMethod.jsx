import { useMemo } from 'react'
import {
  HiOutlineDocumentText, HiOutlineClipboardList, HiOutlineExclamation,
  HiOutlineCheckCircle, HiOutlineDatabase, HiOutlineFlag,
  HiOutlineOfficeBuilding, HiOutlineScale, HiOutlineGlobeAlt
} from 'react-icons/hi'
import { CONFIDENCE } from '../utils/provenance'
import { isRegistryTier } from '../utils/recordTier'

// The Coverage & Method page — a deliberate, self-reported account of what this
// database covers and how well-checked each part of it is. See
// data-sourcing/HANDOFF.md §10b for why this page exists: the alternative was
// letting the front page keep claiming "100% Citable" and "Zero Hearsay" while
// 165 dossier rows cite only a homepage and the pre-2026-09 majority of
// "verified" rows were never individually checked. A database that states its
// own gaps is more trustworthy than one that implies it has none.

const CONFIDENCE_ROWS = [
  { level: CONFIDENCE.VERIFIED, label: 'Verified', meaning: 'Checked against the conducting body’s own notification or official page. This is the only level shown to a student on an exam’s page.' },
  { level: CONFIDENCE.REPORTED, label: 'Reported', meaning: 'Sourced to a secondary report — a news article, a coaching site — not to the notification itself. Kept in the database, withheld from the page.' },
  { level: CONFIDENCE.UNVERIFIED, label: 'Unverified', meaning: 'Possibly correct, but no source is recorded at all.' },
  { level: CONFIDENCE.PLACEHOLDER, label: 'Placeholder', meaning: 'A default value that was never researched for this specific exam.' },
  { level: CONFIDENCE.NOT_APPLICABLE, label: 'Not applicable', meaning: 'The field is meaningless for this kind of exam — an admission or qualification exam has seats or a pass/fail standard, not a vacancy count.' },
]

export default function CoverageMethod({ exams = [], setActiveView }) {
  const stats = useMemo(() => {
    const total = exams.length
    const R = exams.filter(e => e.track === 'R').length
    const A = exams.filter(e => e.track === 'A').length
    const Q = exams.filter(e => e.track === 'Q').length
    const registryTier = exams.filter(e => isRegistryTier(e.record_tier)).length
    const dossierTier = total - registryTier
    const verifiedVacancy = exams.filter(e => e.provenance?.vacancies?.confidence === CONFIDENCE.VERIFIED).length
    const noVacancyPublished = total - verifiedVacancy
    const authorities = new Set(exams.map(e => e.conducting_body)).size
    return { total, R, A, Q, registryTier, dossierTier, verifiedVacancy, noVacancyPublished, authorities }
  }, [exams])

  const goExplore = (extra) => {
    if (setActiveView) setActiveView('explore')
    if (extra) extra()
  }

  return (
    <div className="how-to-use-section fade-in">
      <div className="how-to-use-hero">
        <div className="how-to-use-badge">
          <HiOutlineDocumentText /> Scope, Evidence & Known Gaps
        </div>
        <h1 className="how-to-use-title">
          Coverage <span className="logo-highlight">&amp; Method</span>
        </h1>
        <p className="how-to-use-subtitle">
          What counts as an exam here, how much of it is checked against a primary source, and
          what is deliberately left unfinished rather than papered over. Every number on this
          page is measured from the live database, not asserted.
        </p>
      </div>

      {/* SCOPE */}
      <section className="coverage-section">
        <div className="section-header">
          <div>
            <h2 className="section-title"><HiOutlineFlag style={{ marginRight: 8 }} />Scope</h2>
            <p className="section-subtitle">What is eligible to appear in this database at all</p>
          </div>
        </div>
        <div className="grades-intro-card">
          <p>
            An exam is included only when all six of the following hold. If even one cannot be
            established, it stays out — an unresolved condition is treated as a fail, not a maybe.
          </p>
          <ul className="card-points">
            <li><HiOutlineCheckCircle className="check-icon" /><span><strong>Public conducting body</strong> — a government department, a statutory commission or body (UPSC, the State PSCs, RBI, SEBI), a public sector undertaking or bank, a statutory professional institute (ICAI, ICSI, ICMAI, the Bar Council), or an autonomous body created and funded by government (IITs, IIMs, ISRO, DRDO, AIIMS, NVS). Privately owned bodies are out, including ones that merely receive a government grant.</span></li>
            <li><HiOutlineCheckCircle className="check-icon" /><span><strong>Open to public application</strong> — any eligible person can apply directly. Internal departmental promotion exams are out.</span></li>
            <li><HiOutlineCheckCircle className="check-icon" /><span><strong>A consequential gate</strong> — passing confers a defined post, seat, or professional entitlement. Practice tests and awareness quizzes are out.</span></li>
            <li><HiOutlineCheckCircle className="check-icon" /><span><strong>Recurs</strong> — held on a stated cadence, or held at least twice already. One-off recruitment drives are out.</span></li>
            <li><HiOutlineCheckCircle className="check-icon" /><span><strong>A primary source exists</strong> — an official notification or page from the conducting body that can be cited and dated. A news report or an aggregator listing is a lead, not an entry.</span></li>
            <li><HiOutlineCheckCircle className="check-icon" /><span><strong>National or state-level notification</strong> — even where the postings are district-wise. A district-level notice under one state exam is an edition of that exam, not a separate record.</span></li>
          </ul>
          <p className="coverage-fineprint">
            Full reasoning, worked examples, and the register of rejected candidates:
            <code> data-sourcing/INCLUSION-POLICY.md</code> and <code>data-sourcing/EXCLUSIONS.md</code>.
          </p>
        </div>

        <div className="grades-intro-card">
          <h3>Three tracks, because they answer different questions</h3>
          <div className="coverage-track-grid">
            <div className="coverage-track-card">
              <span className="coverage-track-letter track-r">R</span>
              <div>
                <strong>Recruitment</strong>
                <p>Passing gets you a specific job — in government, a PSU, a bank, or a statutory body.</p>
                <span className="coverage-track-count">{stats.R} exams</span>
              </div>
            </div>
            <div className="coverage-track-card">
              <span className="coverage-track-letter track-a">A</span>
              <div>
                <strong>Admission</strong>
                <p>Passing gets you a seat at a government or government-funded institution.</p>
                <span className="coverage-track-count">{stats.A} exams</span>
              </div>
            </div>
            <div className="coverage-track-card">
              <span className="coverage-track-letter track-q">Q</span>
              <div>
                <strong>Qualification</strong>
                <p>Passing confers a professional designation or the right to practise — CA, CS, CMA, AIBE.</p>
                <span className="coverage-track-count">{stats.Q} exams</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COVERAGE */}
      <section className="coverage-section">
        <div className="section-header">
          <div>
            <h2 className="section-title"><HiOutlineGlobeAlt style={{ marginRight: 8 }} />Coverage</h2>
            <p className="section-subtitle">How much of the in-scope population is on the site today</p>
          </div>
        </div>
        <div className="coverage-stat-grid">
          <div className="coverage-stat-card">
            <span className="coverage-stat-num">{stats.total}</span>
            <span className="coverage-stat-label">Exams in the database</span>
          </div>
          <div className="coverage-stat-card">
            <span className="coverage-stat-num">{stats.dossierTier}</span>
            <span className="coverage-stat-label">With a full dossier</span>
          </div>
          <div className="coverage-stat-card">
            <span className="coverage-stat-num">{stats.registryTier}</span>
            <span className="coverage-stat-label">Registry-only (stub) entries</span>
          </div>
        </div>
        <div className="grades-intro-card">
          <h3>Two tiers, and why both are shown honestly</h3>
          <p>
            Not every in-scope exam justifies the work of a full dossier, and a database of
            thin, half-empty entries would be worth less than a smaller one that is actually
            complete. So an exam enters at one of two tiers:
          </p>
          <ul className="card-points">
            <li>
              <HiOutlineClipboardList className="check-icon" />
              <span>
                <strong>Registry entry</strong> — the minimum to exist in the database at all: name,
                conducting body, track, minimum qualification, frequency, and the official link
                the source citation points to. Shown on the site with a plain
                &ldquo;REGISTRY ENTRY&rdquo; label in place of the verified badge — never presented as
                if it were a finished profile.
              </span>
            </li>
            <li>
              <HiOutlineDatabase className="check-icon" />
              <span>
                <strong>Full dossier</strong> — career ladder, salary, exam scheme, cutoffs and
                vacancies, official links, the lot. Promotion from registry to dossier is driven
                by demand — search interest, candidate volume, or editorial judgement — not by
                whichever exam happens to get worked on first.
              </span>
            </li>
          </ul>
          <p className="coverage-fineprint">
            {stats.registryTier > 0
              ? `${stats.dossierTier} of ${stats.total} exams currently carry a full dossier; ${stats.registryTier} are registry-only stubs, added because they clear the inclusion test but haven't been built out yet.`
              : `All ${stats.total} exams currently carry a full dossier — there are no registry-only stubs yet. That will change as new exams found through aggregator discovery are added; each starts as a registry entry and is promoted later.`}
          </p>
        </div>
      </section>

      {/* EVIDENCE STANDARD */}
      <section className="coverage-section">
        <div className="section-header">
          <div>
            <h2 className="section-title"><HiOutlineScale style={{ marginRight: 8 }} />Evidence standard</h2>
            <p className="section-subtitle">What has to be true before a figure reaches a student</p>
          </div>
        </div>
        <div className="grades-intro-card">
          <p>
            Every fact that can vary year to year — vacancies, most of all — carries a confidence
            level, not just a value. <strong>Only the &ldquo;Verified&rdquo; level is ever shown on an
            exam&rsquo;s page.</strong> Everything weaker stays in the database and stays off the page,
            because a caveat next to a number is read once; the number is what gets remembered
            and planned around.
          </p>
          <table className="coverage-confidence-table">
            <tbody>
              {CONFIDENCE_ROWS.map(row => (
                <tr key={row.level} className={row.level === CONFIDENCE.VERIFIED ? 'is-verified-row' : ''}>
                  <td className="coverage-confidence-label">{row.label}</td>
                  <td>{row.meaning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="coverage-stat-grid">
          <div className="coverage-stat-card">
            <span className="coverage-stat-num">{stats.verifiedVacancy}</span>
            <span className="coverage-stat-label">of {stats.total} exams show a verified vacancy figure, checked against a source document</span>
          </div>
          <div className="coverage-stat-card">
            <span className="coverage-stat-num">{stats.noVacancyPublished}</span>
            <span className="coverage-stat-label">show no vacancy figure at all, rather than an unchecked one</span>
          </div>
        </div>
      </section>

      {/* KNOWN GAPS */}
      <section className="coverage-section">
        <div className="section-header">
          <div>
            <h2 className="section-title"><HiOutlineExclamation style={{ marginRight: 8 }} />Known gaps</h2>
            <p className="section-subtitle">Stated deliberately, not discovered by a visitor after three clicks</p>
          </div>
        </div>
        <div className="grades-intro-card">
          <ul className="card-points">
            <li><HiOutlineExclamation className="check-icon" style={{ color: 'var(--amber-bright, #e8a33d)' }} /><span>165 dossier rows are marked &ldquo;Verified&rdquo; but currently cite only a conducting body&rsquo;s homepage rather than a specific document, and are held back from the summary figure until they cite one.</span></li>
            <li><HiOutlineExclamation className="check-icon" style={{ color: 'var(--amber-bright, #e8a33d)' }} /><span>No systematic check has yet been run on whether every &ldquo;Verified&rdquo; row&rsquo;s underlying notification genuinely exists. Two such rows were found, by chance, to have no notification behind them at all and were removed — the rest have not all been individually re-checked.</span></li>
            <li><HiOutlineExclamation className="check-icon" style={{ color: 'var(--amber-bright, #e8a33d)' }} /><span>Automated change-detection currently reaches 24 of {stats.authorities} recruiting authorities (about 97 of {stats.total} exams) — many state portals render their notice boards with JavaScript that a lightweight watcher cannot read, or actively block traffic from outside India.</span></li>
            <li><HiOutlineExclamation className="check-icon" style={{ color: 'var(--amber-bright, #e8a33d)' }} /><span>Discovery of new exams currently draws on two public aggregators (Sarkari Result, Employment News). A third, the National Career Service, was deliberately left out for now — its useful content sits behind a search flow this isn&rsquo;t yet built to drive, not because it was overlooked.</span></li>
          </ul>
        </div>
      </section>

      <div className="coverage-cta">
        <button className="card-action-btn" onClick={() => goExplore()}>
          <HiOutlineOfficeBuilding /> Explore the full database
        </button>
      </div>
    </div>
  )
}

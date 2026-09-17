import { useState, useEffect, useMemo } from 'react'
import { getDomainColor } from '../utils/helpers'
import { useExamDetail } from '../hooks/useExamDetail'
import {
  HiOutlineExternalLink, HiX, HiChevronLeft, HiChevronRight,
  HiOutlineArrowRight
} from 'react-icons/hi'
import CareerLadder from './exam-detail/CareerLadder'
import ExamSchemeTable from './exam-detail/ExamSchemeTable'
import SalaryCalculator from './exam-detail/SalaryCalculator'
import CompetitionBenchmarks from './exam-detail/CompetitionBenchmarks'
import ResourceLinks from './exam-detail/ResourceLinks'
import SectionStatusBadge from './exam-detail/SectionStatusBadge'

export default function ExamDetail({ exam, onClose, allExams = [], onSelectExam }) {
  const color = getDomainColor(exam.domain)
  const isJob = exam.exam_type === 'job'

  const tabs = useMemo(() => {
    const list = [
      { id: 'overview', label: 'Overview & Scope' },
      { id: 'career', label: 'Career Progression' },
      { id: 'scheme', label: 'Exam Pattern & Scheme' },
    ]
    // Only show 7th CPC Salary tab for job recruitment exams
    if (isJob) {
      list.push({ id: 'salary', label: '7th CPC Salary & Perks' })
    }
    list.push(
      { id: 'competition', label: 'Cut-offs & Vacancies' },
      { id: 'resources', label: 'Official Resources' }
    )
    return list
  }, [isJob])

  const [activeTab, setActiveTab] = useState('overview')
  const { status: detailStatus, detail } = useExamDetail(exam.id)

  // Escape key listener to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  // Prev / Next Exam navigation
  const currentIndex = useMemo(() => {
    return allExams.findIndex(e => e.id === exam.id)
  }, [allExams, exam.id])

  const prevExam = currentIndex > 0 ? allExams[currentIndex - 1] : null
  const nextExam = currentIndex >= 0 && currentIndex < allExams.length - 1 ? allExams[currentIndex + 1] : null

  // Similar exams (same domain or level, excluding current)
  const similarExams = useMemo(() => {
    if (!allExams.length) return []
    return allExams
      .filter(e => e.id !== exam.id && (e.domain === exam.domain || e.level === exam.level))
      .slice(0, 3)
  }, [allExams, exam.id, exam.domain, exam.level])

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content slide-up" onClick={e => e.stopPropagation()}>
        <div className="modal-top-actions">
          {allExams.length > 0 && onSelectExam && (
            <div className="modal-nav-pair">
              <button
                className="modal-nav-arrow"
                disabled={!prevExam}
                onClick={() => prevExam && onSelectExam(prevExam)}
                title={prevExam ? `Previous: ${prevExam.acronym || prevExam.name}` : 'No previous exam'}
              >
                <HiChevronLeft /> Prev
              </button>
              <button
                className="modal-nav-arrow"
                disabled={!nextExam}
                onClick={() => nextExam && onSelectExam(nextExam)}
                title={nextExam ? `Next: ${nextExam.acronym || nextExam.name}` : 'No next exam'}
              >
                Next <HiChevronRight />
              </button>
            </div>
          )}
          <button className="modal-close" onClick={onClose} aria-label="Close modal"><HiX /></button>
        </div>

        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, flexWrap: 'wrap' }}>
            <span className="domain-badge" style={{
              background: `${color}20`, color, border: `1px solid ${color}40`
            }}>
              {exam.domain}
            </span>
            <span className="domain-badge" style={{
              background: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              {isJob ? '💼 Job / Recruitment' : '🎓 Entrance Exam'}
            </span>
            <span className="domain-badge" style={{
              background: exam.jurisdiction === 'central' ? 'rgba(59, 130, 246, 0.15)' : 'rgba(168, 85, 247, 0.15)',
              color: exam.jurisdiction === 'central' ? '#60a5fa' : '#c084fc',
              border: `1px solid ${exam.jurisdiction === 'central' ? 'rgba(59, 130, 246, 0.3)' : 'rgba(168, 85, 247, 0.3)'}`
            }}>
              {exam.jurisdiction === 'central' ? '🇮🇳 Central & All-India' : `🏛️ State: ${exam.state}`}
            </span>
          </div>
          <h2 className="modal-title">{exam.name}</h2>
          <p className="modal-subtitle">{exam.acronym}</p>
        </div>

        <div className="dossier-tab-bar">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`dossier-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              style={activeTab === tab.id ? { '--tab-accent': color } : undefined}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="dossier-tab-content fade-in">
            <div className="modal-section">
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.7 }}>
                {exam.description}
              </p>
            </div>

            <div className="modal-section">
              <h4 className="modal-section-title">Key Parameters</h4>
              <div className="modal-detail-grid">
                <div className="modal-detail-item">
                  <div className="modal-detail-label">Scope & Jurisdiction</div>
                  <div className="modal-detail-value">
                    {exam.jurisdiction === 'central' ? '🇮🇳 Central / All-India' : `🏛️ State Govt (${exam.state})`}
                  </div>
                </div>
                {exam.cadre && (
                  <div className="modal-detail-item">
                    <div className="modal-detail-label">Cadre / Service Level</div>
                    <div className="modal-detail-value">{exam.cadre}</div>
                  </div>
                )}
                <div className="modal-detail-item">
                  <div className="modal-detail-label">Conducting Commission</div>
                  <div className="modal-detail-value">{exam.conducting_body}</div>
                </div>
                <div className="modal-detail-item">
                  <div className="modal-detail-label">Level</div>
                  <div className="modal-detail-value">{exam.level}</div>
                </div>
                <div className="modal-detail-item">
                  <div className="modal-detail-label">Exam Mode</div>
                  <div className="modal-detail-value">{exam.exam_mode}</div>
                </div>
                <div className="modal-detail-item">
                  <div className="modal-detail-label">Frequency</div>
                  <div className="modal-detail-value">{exam.frequency}</div>
                </div>
                <div className="modal-detail-item">
                  <div className="modal-detail-label">Exam Month</div>
                  <div className="modal-detail-value">{exam.exam_month}</div>
                </div>
                <div className="modal-detail-item">
                  <div className="modal-detail-label">Application Period</div>
                  <div className="modal-detail-value">{exam.application_period}</div>
                </div>
              </div>
            </div>

            <div className="modal-section">
              <h4 className="modal-section-title">Eligibility Requirements</h4>
              <div className="modal-detail-grid">
                <div className="modal-detail-item">
                  <div className="modal-detail-label">Minimum Qualification</div>
                  <div className="modal-detail-value">{exam.min_qualification}</div>
                </div>
                <div className="modal-detail-item">
                  <div className="modal-detail-label">Age Limit</div>
                  <div className="modal-detail-value">{exam.age_limit}</div>
                </div>
              </div>
            </div>

            {exam.official_website && exam.official_website !== '#' && (
              <div className="modal-section" style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <a
                  href={exam.official_website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="modal-official-portal-btn"
                >
                  Visit Official Examination Portal <HiOutlineExternalLink />
                </a>
              </div>
            )}

            {/* Similar Examinations */}
            {similarExams.length > 0 && (
              <div className="modal-section similar-exams-section">
                <h4 className="modal-section-title">Similar Examinations You May Consider</h4>
                <div className="similar-exams-grid">
                  {similarExams.map(sim => {
                    const simColor = getDomainColor(sim.domain)
                    return (
                      <div
                        key={sim.id}
                        className="similar-exam-card"
                        style={{ borderLeft: `3px solid ${simColor}` }}
                        onClick={() => onSelectExam && onSelectExam(sim)}
                      >
                        <div className="sim-header">
                          <span className="sim-title">{sim.name}</span>
                          <span className="sim-acronym">{sim.acronym}</span>
                        </div>
                        <div className="sim-meta">
                          <span>{sim.domain}</span> · <span>{sim.level}</span>
                        </div>
                        <div className="sim-action">
                          Switch to this dossier <HiOutlineArrowRight />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'career' && (
          <div className="dossier-tab-content fade-in">
            <div style={{ marginBottom: '1rem' }}>
              <SectionStatusBadge section={detail?.career_ladder} />
            </div>
            <CareerLadder
              section={detail?.career_ladder}
              detailStatus={detailStatus}
              examType={exam.exam_type}
              domainColor={color}
            />
          </div>
        )}

        {activeTab === 'scheme' && (
          <div className="dossier-tab-content fade-in">
            <div style={{ marginBottom: '1rem' }}>
              <SectionStatusBadge section={detail?.exam_scheme} />
            </div>
            <ExamSchemeTable section={detail?.exam_scheme} detailStatus={detailStatus} />
          </div>
        )}

        {activeTab === 'salary' && isJob && (
          <div className="dossier-tab-content fade-in">
            <div style={{ marginBottom: '1rem' }}>
              <SectionStatusBadge section={detail?.financial_package} />
            </div>
            <SalaryCalculator
              section={detail?.financial_package}
              detailStatus={detailStatus}
              examType={exam.exam_type}
            />
          </div>
        )}

        {activeTab === 'competition' && (
          <div className="dossier-tab-content fade-in">
            <div style={{ marginBottom: '1rem' }}>
              <SectionStatusBadge section={detail?.competition_benchmarks} />
            </div>
            <CompetitionBenchmarks section={detail?.competition_benchmarks} detailStatus={detailStatus} />
          </div>
        )}

        {activeTab === 'resources' && (
          <div className="dossier-tab-content fade-in">
            <div style={{ marginBottom: '1rem' }}>
              <SectionStatusBadge section={detail?.official_downloads} />
            </div>
            <ResourceLinks
              section={detail?.official_downloads}
              detailStatus={detailStatus}
              fallbackUrl={exam.official_website}
            />
          </div>
        )}

        {detail?.last_reviewed && activeTab !== 'overview' && (
          <p className="dossier-review-stamp">Dossier verified & sourced {detail.last_reviewed}</p>
        )}
      </div>
    </div>
  )
}

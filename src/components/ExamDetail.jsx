import { useState, useEffect, useMemo } from 'react'
import { getDomainColor } from '../utils/helpers'
import { useExamDetail } from '../hooks/useExamDetail'
import {
  HiOutlineExternalLink, HiX, HiChevronLeft, HiChevronRight,
  HiOutlineArrowRight, HiOutlineCalendar, HiOutlineDownload,
  HiOutlineShare, HiOutlineClipboardCopy, HiCheck, HiOutlineMail
} from 'react-icons/hi'
import { downloadExamIcs, getGoogleCalendarUrl } from '../utils/calendarSync'
import { exportExamDossierPdf } from '../utils/pdfGenerator'
import CareerLadder from './exam-detail/CareerLadder'
import ExamSchemeTable from './exam-detail/ExamSchemeTable'
import SalaryCalculator from './exam-detail/SalaryCalculator'
import CompetitionBenchmarks from './exam-detail/CompetitionBenchmarks'
import ResourceLinks from './exam-detail/ResourceLinks'
import SectionStatusBadge from './exam-detail/SectionStatusBadge'
import { SkeletonModal } from './Skeletons'

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
  const [showShareModal, setShowShareModal] = useState(false)
  const [copiedLink, setCopiedLink] = useState(false)
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false)
  const { status: detailStatus, detail } = useExamDetail(exam.id)

  const handleDownloadPdf = async () => {
    if (isGeneratingPdf) return
    setIsGeneratingPdf(true)
    try {
      await exportExamDossierPdf(exam, detail)
    } catch (err) {
      console.error('Failed to generate PDF dossier:', err)
    } finally {
      setIsGeneratingPdf(false)
    }
  }

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

  // Deep-link share URL
  const shareUrl = useMemo(() => {
    if (typeof window === 'undefined') return `#exam/${exam.id}`
    const base = window.location.origin + window.location.pathname
    return `${base}#exam/${exam.id}`
  }, [exam.id])

  const shareTitle = `${exam.name} (${exam.acronym}) — IndiaExams`
  const shareText = `Explore complete eligibility, syllabus pattern, career progression & 7th CPC salary for ${exam.name} (${exam.acronym}) on IndiaExams:`

  const copyShareLink = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopiedLink(true)
      setTimeout(() => setCopiedLink(false), 2500)
    })
  }

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl
        })
      } catch {
        // User cancelled or share failed
      }
    } else {
      copyShareLink()
    }
  }

  // Social share URLs
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
  const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`
  const mailtoUrl = `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(`${shareText}\n\n${shareUrl}`)}`

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content slide-up" onClick={e => e.stopPropagation()}>
        {/* Mobile Drag Handle Indicator */}
        <div className="modal-drag-indicator" aria-hidden="true" />

        <div className="modal-top-actions">
          {allExams.length > 0 && onSelectExam && (
            <div className="modal-nav-pair">
              <button
                className="modal-nav-arrow"
                disabled={!prevExam}
                onClick={() => prevExam && onSelectExam(prevExam)}
                title={prevExam ? `Previous: ${prevExam.acronym || prevExam.name}` : 'No previous exam'}
              >
                <HiChevronLeft /> <span className="modal-nav-text">Prev</span>
              </button>
              <button
                className="modal-nav-arrow"
                disabled={!nextExam}
                onClick={() => nextExam && onSelectExam(nextExam)}
                title={nextExam ? `Next: ${nextExam.acronym || nextExam.name}` : 'No next exam'}
              >
                <span className="modal-nav-text">Next</span> <HiChevronRight />
              </button>
            </div>
          )}

          <div className="modal-top-right-group">
            {/* One-Stop PDF Dossier Download */}
            <button
              className="modal-pdf-dossier-btn"
              onClick={handleDownloadPdf}
              disabled={isGeneratingPdf}
              title="Download 4-page official research dossier (PDF)"
              aria-label="Download 4-page official research dossier (PDF)"
            >
              <HiOutlineDownload />
              <span>{isGeneratingPdf ? 'Compiling PDF...' : 'Dossier PDF'}</span>
            </button>

            {/* Share Trigger */}
            <button
              className={`modal-share-trigger-btn ${showShareModal ? 'active' : ''}`}
              onClick={() => setShowShareModal(prev => !prev)}
              title="Share this examination"
              aria-label="Share this examination"
            >
              <HiOutlineShare /> <span className="modal-share-label">Share</span>
            </button>

            <button className="modal-close" onClick={onClose} aria-label="Close modal">
              <HiX />
            </button>
          </div>
        </div>

        {/* Share Dropdown / Popover */}
        {showShareModal && (
          <div className="modal-share-popover fade-in">
            <div className="share-popover-header">
              <span className="share-popover-title">Share Examination Dossier</span>
              <button className="share-close-x" onClick={() => setShowShareModal(false)}>✕</button>
            </div>

            <div className="share-link-input-row">
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="share-link-input"
                onClick={e => e.target.select()}
              />
              <button className="share-copy-btn" onClick={copyShareLink}>
                {copiedLink ? <><HiCheck /> Copied</> : <><HiOutlineClipboardCopy /> Copy</>}
              </button>
            </div>

            <div className="share-social-grid">
              {typeof navigator !== 'undefined' && navigator.share && (
                <button className="share-social-btn native-share" onClick={handleNativeShare}>
                  <HiOutlineShare /> Device Share
                </button>
              )}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="share-social-btn whatsapp"
                title="Share on WhatsApp"
              >
                <span className="social-icon">💬</span> WhatsApp
              </a>
              <a
                href={twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="share-social-btn twitter"
                title="Share on X (Twitter)"
              >
                <span className="social-icon">𝕏</span> X / Twitter
              </a>
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="share-social-btn linkedin"
                title="Share on LinkedIn"
              >
                <span className="social-icon">💼</span> LinkedIn
              </a>
              <a
                href={telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="share-social-btn telegram"
                title="Share on Telegram"
              >
                <span className="social-icon">✈️</span> Telegram
              </a>
              <a
                href={mailtoUrl}
                className="share-social-btn email"
                title="Share via Email"
              >
                <HiOutlineMail /> Email
              </a>
            </div>
          </div>
        )}

        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, flexWrap: 'wrap' }}>
            <span className="domain-badge domain-primary-badge" style={{
              background: `${color}20`, color, border: `1px solid ${color}40`
            }}>
              {exam.domain}
            </span>
            <span className="domain-badge domain-type-badge">
              {isJob ? '💼 Job / Recruitment' : '🎓 Entrance Exam'}
            </span>
            <span className={`domain-badge domain-scope-badge ${exam.jurisdiction === 'central' ? 'scope-central-badge' : 'scope-state-badge'}`}>
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

        {/* Tab 1: Overview */}
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

            {/* Schedule & Calendar Sync + Share Dossier */}
            <div className="modal-section modal-cal-sync-section">
              <h4 className="modal-section-title">Schedule, Sync & Share</h4>
              <div className="modal-cal-actions">
                <a
                  href={getGoogleCalendarUrl(exam)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="modal-sync-btn gcal"
                  title="Add this exam schedule to Google Calendar"
                >
                  <HiOutlineCalendar /> Google Calendar
                </a>
                <button
                  className="modal-sync-btn ics"
                  onClick={() => downloadExamIcs(exam)}
                  title="Download .ics calendar event file"
                >
                  <HiOutlineDownload /> iCal (.ics)
                </button>
                <button
                  className="modal-sync-btn share-btn"
                  onClick={copyShareLink}
                  title="Copy permanent shareable link"
                >
                  {copiedLink ? <><HiCheck /> Copied Link!</> : <><HiOutlineShare /> Copy Share URL</>}
                </button>
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

            {/* One-Stop Institutional Dossier Download Banner */}
            <div className="modal-dossier-download-banner">
              <div className="dossier-download-text">
                <span className="dossier-download-title">STATUTORY ONE-STOP RESEARCH DOSSIER (PDF)</span>
                <span className="dossier-download-desc">
                  Download the complete 4-page institutional vector PDF containing statutory mandates, 7th CPC compensation matrices across X/Y/Z cities, complete marking schemes, and official gazette citations.
                </span>
              </div>
              <button
                className="modal-pdf-dossier-btn dossier-download-cta"
                onClick={handleDownloadPdf}
                disabled={isGeneratingPdf}
              >
                <HiOutlineDownload />
                <span>{isGeneratingPdf ? 'Compiling Vector Dossier...' : 'DOWNLOAD 4-PAGE DOSSIER (PDF)'}</span>
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Career Ladder */}
        {activeTab === 'career' && (
          <div className="dossier-tab-content fade-in">
            {detailStatus === 'loading' ? (
              <SkeletonModal />
            ) : (
              <>
                <div style={{ marginBottom: '1rem' }}>
                  <SectionStatusBadge section={detail?.career_ladder} />
                </div>
                <CareerLadder
                  section={detail?.career_ladder}
                  detailStatus={detailStatus}
                  examType={exam.exam_type}
                  domainColor={color}
                />
              </>
            )}
          </div>
        )}

        {/* Tab 3: Scheme & Pattern */}
        {activeTab === 'scheme' && (
          <div className="dossier-tab-content fade-in">
            {detailStatus === 'loading' ? (
              <SkeletonModal />
            ) : (
              <>
                <div style={{ marginBottom: '1rem' }}>
                  <SectionStatusBadge section={detail?.exam_scheme} />
                </div>
                <ExamSchemeTable section={detail?.exam_scheme} detailStatus={detailStatus} />
              </>
            )}
          </div>
        )}

        {/* Tab 4: Salary & Perks */}
        {activeTab === 'salary' && isJob && (
          <div className="dossier-tab-content fade-in">
            {detailStatus === 'loading' ? (
              <SkeletonModal />
            ) : (
              <>
                <div style={{ marginBottom: '1rem' }}>
                  <SectionStatusBadge section={detail?.financial_package} />
                </div>
                <SalaryCalculator
                  section={detail?.financial_package}
                  detailStatus={detailStatus}
                  examType={exam.exam_type}
                />
              </>
            )}
          </div>
        )}

        {/* Tab 5: Benchmarks */}
        {activeTab === 'competition' && (
          <div className="dossier-tab-content fade-in">
            {detailStatus === 'loading' ? (
              <SkeletonModal />
            ) : (
              <>
                <div style={{ marginBottom: '1rem' }}>
                  <SectionStatusBadge section={detail?.competition_benchmarks} />
                </div>
                <CompetitionBenchmarks section={detail?.competition_benchmarks} detailStatus={detailStatus} />
              </>
            )}
          </div>
        )}

        {/* Tab 6: Resources */}
        {activeTab === 'resources' && (
          <div className="dossier-tab-content fade-in">
            {detailStatus === 'loading' ? (
              <SkeletonModal />
            ) : (
              <>
                <div style={{ marginBottom: '1rem' }}>
                  <SectionStatusBadge section={detail?.official_downloads} />
                </div>
                <ResourceLinks
                  section={detail?.official_downloads}
                  detailStatus={detailStatus}
                  fallbackUrl={exam.official_website}
                />
              </>
            )}
          </div>
        )}

        {detail?.last_reviewed && activeTab !== 'overview' && (
          <p className="dossier-review-stamp">Dossier verified & sourced {detail.last_reviewed}</p>
        )}
      </div>
    </div>
  )
}

import { useState } from 'react'
import { getDomainColor } from '../utils/helpers'
import { useExamDetail } from '../hooks/useExamDetail'
import { HiOutlineExternalLink, HiX } from 'react-icons/hi'
import CareerLadder from './exam-detail/CareerLadder'
import ExamSchemeTable from './exam-detail/ExamSchemeTable'
import SalaryCalculator from './exam-detail/SalaryCalculator'
import CompetitionBenchmarks from './exam-detail/CompetitionBenchmarks'
import ResourceLinks from './exam-detail/ResourceLinks'
import SectionStatusBadge from './exam-detail/SectionStatusBadge'

const TABS = [
  { id: 'overview', label: 'Overview & Scope' },
  { id: 'career', label: 'Career Progression' },
  { id: 'scheme', label: 'Exam Pattern & Scheme' },
  { id: 'salary', label: '7th CPC Salary & Perks' },
  { id: 'competition', label: 'Cut-offs & Vacancies' },
  { id: 'resources', label: 'Official Resources' },
]

export default function ExamDetail({ exam, onClose }) {
  const color = getDomainColor(exam.domain)
  const [activeTab, setActiveTab] = useState('overview')
  const { status: detailStatus, detail } = useExamDetail(exam.id)

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}><HiX /></button>

        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8, flexWrap: 'wrap' }}>
            <span className="domain-badge" style={{
              background: `${color}20`, color, border: `1px solid ${color}40`
            }}>
              {exam.domain}
            </span>
            <span className="domain-badge" style={{
              background: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              {exam.exam_type === 'entrance' ? '🎓 Entrance' : '💼 Job/Recruitment'}
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
          {TABS.map(tab => (
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
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7 }}>
                {exam.description}
              </p>
            </div>

            <div className="modal-section">
              <h4 className="modal-section-title">Key Details</h4>
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
                  <div className="modal-detail-label">Conducting Body</div>
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
              <h4 className="modal-section-title">Eligibility</h4>
              <div className="modal-detail-grid">
                <div className="modal-detail-item">
                  <div className="modal-detail-label">Min. Qualification</div>
                  <div className="modal-detail-value">{exam.min_qualification}</div>
                </div>
                <div className="modal-detail-item">
                  <div className="modal-detail-label">Age Limit</div>
                  <div className="modal-detail-value">{exam.age_limit}</div>
                </div>
              </div>
            </div>

            <div className="modal-section">
              <h4 className="modal-section-title">Target Role</h4>
              <div className="modal-detail-item" style={{ background: 'var(--bg-glass)', border: '1px solid var(--border-glass)', borderRadius: 12, padding: 12 }}>
                <div className="modal-detail-value">{exam.target_role}</div>
              </div>
            </div>

            {exam.field && exam.field.length > 0 && (
              <div className="modal-section">
                <h4 className="modal-section-title">Fields</h4>
                <div className="modal-field-list">
                  {exam.field.map(f => <span key={f} className="modal-field-tag">{f}</span>)}
                </div>
              </div>
            )}

            {exam.specializations && exam.specializations.length > 0 && (
              <div className="modal-section">
                <h4 className="modal-section-title">Specializations</h4>
                <div className="modal-field-list">
                  {exam.specializations.map(s => (
                    <span key={s} className="modal-field-tag" style={{
                      background: 'rgba(20, 184, 166, 0.1)',
                      borderColor: 'rgba(20, 184, 166, 0.2)',
                      color: '#14b8a6',
                    }}>{s}</span>
                  ))}
                </div>
              </div>
            )}

            {exam.official_website && exam.official_website !== '#' && (
              <div className="modal-section" style={{ marginTop: '1.5rem' }}>
                <a
                  href={exam.official_website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="modal-website-btn"
                >
                  <HiOutlineExternalLink />
                  Visit Official Website
                </a>
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

        {activeTab === 'salary' && (
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
          <p className="dossier-review-stamp">Dossier last reviewed {detail.last_reviewed}</p>
        )}
      </div>
    </div>
  )
}

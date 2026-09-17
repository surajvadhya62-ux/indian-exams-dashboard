import { useState } from 'react'
import {
  HiOutlineChatAlt2, HiStar, HiOutlineStar, HiCheckCircle,
  HiOutlineMail, HiOutlineClipboardCopy, HiOutlineShieldCheck,
  HiOutlineExternalLink, HiOutlineQuestionMarkCircle, HiOutlineArrowLeft
} from 'react-icons/hi'

export default function Feedback({ exams = [], onBackToExplore }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    category: 'correction',
    rating: 5,
    examId: '',
    message: ''
  })

  const [submitted, setSubmitted] = useState(false)
  const [submissionReceipt, setSubmissionReceipt] = useState(null)
  const [copiedReceipt, setCopiedReceipt] = useState(false)

  const categories = [
    { id: 'correction', label: '📝 Data Correction / Update (Dates, Pattern, Pay Scale)' },
    { id: 'missing', label: '➕ Suggest a Missing Examination' },
    { id: 'feature', label: '💡 Feature Request / Redesign Suggestion' },
    { id: 'ui', label: '🎨 UI & Usability Experience' },
    { id: 'general', label: '💬 General Inquiry / Appreciation' }
  ]

  const ratingLabels = {
    1: 'Needs Major Improvement',
    2: 'Fair — Room for Growth',
    3: 'Good & Informative',
    4: 'Very Good — Highly Useful',
    5: 'Outstanding National Asset'
  }

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.fullName || !formData.email || !formData.message) return

    const refNumber = `IE-FB-${Math.floor(10000 + Math.random() * 90000)}`
    const receipt = {
      refNumber,
      timestamp: new Date().toISOString(),
      ...formData
    }

    try {
      const existing = JSON.parse(localStorage.getItem('indiaexams_user_feedbacks') || '[]')
      existing.unshift(receipt)
      localStorage.setItem('indiaexams_user_feedbacks', JSON.stringify(existing.slice(0, 50)))
    } catch (err) {
      console.error('Failed saving to localStorage:', err)
    }

    setSubmissionReceipt(receipt)
    setSubmitted(true)
  }

  // Construct Email URL parameters
  const emailSubject = encodeURIComponent(
    `[IndiaExams Feedback] ${categories.find(c => c.id === formData.category)?.label.split(' ')[1] || 'Feedback'} - ${formData.fullName}`
  )

  const emailBody = encodeURIComponent(
    `Name: ${formData.fullName}\n` +
    `Email: ${formData.email}\n` +
    `Category: ${formData.category}\n` +
    `Rating: ${formData.rating} / 5\n` +
    `Target Exam: ${formData.examId || 'Not specified'}\n\n` +
    `Feedback Message:\n${formData.message}\n\n` +
    `Sent from IndiaExams Aspirant Terminal`
  )

  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=aspirant-support@indiaexams.gov.mock&su=${emailSubject}&body=${emailBody}`
  const outlookUrl = `https://outlook.live.com/mail/0/deeplink/compose?to=aspirant-support@indiaexams.gov.mock&subject=${emailSubject}&body=${emailBody}`
  const mailtoUrl = `mailto:aspirant-support@indiaexams.gov.mock?subject=${emailSubject}&body=${emailBody}`

  const copyReceipt = () => {
    if (!submissionReceipt) return
    const text = `IndiaExams Feedback Receipt\nRef: ${submissionReceipt.refNumber}\nDate: ${new Date(submissionReceipt.timestamp).toLocaleString()}\nName: ${submissionReceipt.fullName}\nCategory: ${submissionReceipt.category}`
    navigator.clipboard.writeText(text).then(() => {
      setCopiedReceipt(true)
      setTimeout(() => setCopiedReceipt(false), 2500)
    })
  }

  return (
    <div className="feedback-container fade-in">
      <div className="feedback-header">
        {onBackToExplore && (
          <button className="feedback-back-btn" onClick={onBackToExplore}>
            <HiOutlineArrowLeft /> Return to Registry
          </button>
        )}
        <div className="feedback-title-badge">
          <HiOutlineChatAlt2 /> ASPIRANT SUPPORT & INTELLIGENCE DESK
        </div>
        <h1 className="feedback-title">Share Your Feedback & Insights</h1>
        <p className="feedback-subtitle">
          Help refine the 500+ Indian Examinations Directory. Your reports, official notification updates,
          and suggestions directly maintain the veracity of this national public resource.
        </p>
      </div>

      <div className="feedback-grid-layout">
        {/* Main Form Column */}
        <div className="feedback-card panel">
          {submitted ? (
            <div className="feedback-success-box fade-in">
              <div className="success-icon-wrap">
                <HiCheckCircle className="success-check-icon" />
              </div>
              <h3 className="success-title">Feedback Logged Successfully</h3>
              <p className="success-sub">
                Thank you, <strong>{submissionReceipt?.fullName}</strong>. Your feedback has been registered and queued for editorial verification.
              </p>

              <div className="receipt-box">
                <div className="receipt-row">
                  <span className="receipt-label">Reference ID:</span>
                  <span className="receipt-val mono-val">{submissionReceipt?.refNumber}</span>
                </div>
                <div className="receipt-row">
                  <span className="receipt-label">Category:</span>
                  <span className="receipt-val">{submissionReceipt?.category}</span>
                </div>
                <div className="receipt-row">
                  <span className="receipt-label">Timestamp:</span>
                  <span className="receipt-val">{new Date(submissionReceipt?.timestamp).toLocaleTimeString()} · {new Date(submissionReceipt?.timestamp).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="receipt-actions">
                <button className="btn-secondary" onClick={copyReceipt}>
                  <HiOutlineClipboardCopy /> {copiedReceipt ? '✓ Copied Reference' : 'Copy Receipt'}
                </button>
                <button
                  className="btn-primary"
                  onClick={() => {
                    setSubmitted(false)
                    setFormData({
                      fullName: '',
                      email: '',
                      category: 'correction',
                      rating: 5,
                      examId: '',
                      message: ''
                    })
                  }}
                >
                  Submit Another Response
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="feedback-form">
              {/* Name & Email Row */}
              <div className="form-row-pair">
                <div className="form-group">
                  <label htmlFor="fb-fullname" className="form-label">
                    Full Name <span className="req-star">*</span>
                  </label>
                  <input
                    id="fb-fullname"
                    type="text"
                    required
                    className="form-input"
                    placeholder="e.g., Ananya Sharma"
                    value={formData.fullName}
                    onChange={e => handleChange('fullName', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="fb-email" className="form-label">
                    Email Address <span className="req-star">*</span>
                  </label>
                  <input
                    id="fb-email"
                    type="email"
                    required
                    className="form-input"
                    placeholder="e.g., ananya@example.com"
                    value={formData.email}
                    onChange={e => handleChange('email', e.target.value)}
                  />
                </div>
              </div>

              {/* Category */}
              <div className="form-group">
                <label htmlFor="fb-category" className="form-label">
                  Feedback Category <span className="req-star">*</span>
                </label>
                <select
                  id="fb-category"
                  className="form-select"
                  value={formData.category}
                  onChange={e => handleChange('category', e.target.value)}
                >
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.label}</option>
                  ))}
                </select>
              </div>

              {/* Optional Target Exam */}
              <div className="form-group">
                <label htmlFor="fb-exam" className="form-label">
                  Related Examination (Optional)
                </label>
                <input
                  id="fb-exam"
                  type="text"
                  className="form-input"
                  placeholder="e.g., UPSC CSE, JEE Main, SSC CGL, UPPSC PCS..."
                  value={formData.examId}
                  onChange={e => handleChange('examId', e.target.value)}
                  list="exams-datalist"
                />
                <datalist id="exams-datalist">
                  {exams.slice(0, 100).map(e => (
                    <option key={e.id} value={`${e.name} (${e.acronym})`} />
                  ))}
                </datalist>
              </div>

              {/* Star Rating */}
              <div className="form-group">
                <label className="form-label">
                  Dashboard Utility Rating <span className="req-star">*</span>
                </label>
                <div className="star-rating-bar">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      className={`star-btn ${star <= formData.rating ? 'active' : ''}`}
                      onClick={() => handleChange('rating', star)}
                      title={`${star} Star - ${ratingLabels[star]}`}
                      aria-label={`${star} Stars`}
                    >
                      {star <= formData.rating ? <HiStar /> : <HiOutlineStar />}
                    </button>
                  ))}
                  <span className="rating-label-text">
                    {ratingLabels[formData.rating]}
                  </span>
                </div>
              </div>

              {/* Feedback Message */}
              <div className="form-group">
                <label htmlFor="fb-message" className="form-label">
                  Detailed Feedback or Sourced Correction <span className="req-star">*</span>
                </label>
                <textarea
                  id="fb-message"
                  required
                  rows={5}
                  className="form-textarea"
                  placeholder="Please describe the correction or idea in detail. If correcting an exam date or pay scale, please include official gazette/notification links or references..."
                  value={formData.message}
                  onChange={e => handleChange('message', e.target.value)}
                />
                <div className="form-char-count">
                  {formData.message.length} characters
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="form-actions-row">
                <button type="submit" className="btn-primary form-submit-btn">
                  Submit Feedback Direct
                </button>

                <div className="email-client-options">
                  <span className="email-options-label">Or send via email:</span>
                  <a
                    href={gmailUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="email-client-chip"
                    title="Draft in Gmail"
                  >
                    <HiOutlineMail /> Gmail
                  </a>
                  <a
                    href={outlookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="email-client-chip"
                    title="Draft in Outlook"
                  >
                    <HiOutlineMail /> Outlook
                  </a>
                  <a
                    href={mailtoUrl}
                    className="email-client-chip"
                    title="Open default email app"
                  >
                    <HiOutlineExternalLink /> Mail Client
                  </a>
                </div>
              </div>
            </form>
          )}
        </div>

        {/* Sidebar / FAQ Column */}
        <div className="feedback-sidebar">
          {/* Trust Banner */}
          <div className="trust-card panel">
            <div className="trust-header">
              <HiOutlineShieldCheck className="trust-shield-icon" />
              <h4>Editorial Integrity & Confidentiality</h4>
            </div>
            <p className="trust-text">
              IndiaExams is an independent, non-commercial public interest directory for Indian aspirants.
              All submissions are handled confidentially and are reviewed against official gazettes before inclusion.
            </p>
            <div className="trust-stats-row">
              <div className="trust-stat">
                <span className="trust-num">500</span>
                <span className="trust-sub">Exams Verified</span>
              </div>
              <div className="trust-stat">
                <span className="trust-num">28</span>
                <span className="trust-sub">States Covered</span>
              </div>
              <div className="trust-stat">
                <span className="trust-num">100%</span>
                <span className="trust-sub">Free & Open</span>
              </div>
            </div>
          </div>

          {/* Quick FAQ Tiles */}
          <div className="faq-card panel">
            <h4 className="faq-header">
              <HiOutlineQuestionMarkCircle /> Frequently Asked Questions
            </h4>

            <div className="faq-item">
              <h5 className="faq-q">How are examinations verified?</h5>
              <p className="faq-a">
                Data is harvested and cross-verified against official notifications from UPSC, SSC, NTA,
                State PSCs, and public service recruitment boards.
              </p>
            </div>

            <div className="faq-item">
              <h5 className="faq-q">Found an outdated exam month?</h5>
              <p className="faq-a">
                Examination dates shift yearly according to recruitment calendars. Select "Data Correction"
                above and provide the revised notification link.
              </p>
            </div>

            <div className="faq-item">
              <h5 className="faq-q">Can coaching institutes sponsor exams?</h5>
              <p className="faq-a">
                No. IndiaExams does not accept advertising, promoted placements, or sponsored listings.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

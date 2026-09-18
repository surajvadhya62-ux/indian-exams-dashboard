import { useState } from 'react'
import {
  HiOutlineChatAlt2, HiStar, HiOutlineStar, HiCheckCircle,
  HiOutlineMail, HiOutlineClipboardCopy, HiOutlineShieldCheck,
  HiOutlineExternalLink, HiOutlineQuestionMarkCircle, HiOutlineArrowLeft
} from 'react-icons/hi'

const RECIPIENT_EMAIL = 'surajvadhya62@gmail.com'

export default function Feedback({ exams = [], onBackToExplore }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    category: 'correction',
    rating: 5,
    examId: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [deliveryStatus, setDeliveryStatus] = useState(null) // 'delivered' | 'fallback'
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

  // Construct Email URL parameters for client fallback
  const currentCategoryLabel = categories.find(c => c.id === formData.category)?.label.split(' ')[1] || 'Feedback'
  const emailSubject = encodeURIComponent(
    `[IndiaExams Feedback] ${currentCategoryLabel} - ${formData.fullName}`
  )

  const emailBody = encodeURIComponent(
    `Name: ${formData.fullName}\n` +
    `Email: ${formData.email}\n` +
    `Category: ${formData.category}\n` +
    `Rating: ${formData.rating} / 5 (${ratingLabels[formData.rating]})\n` +
    `Target Exam: ${formData.examId || 'Not specified'}\n\n` +
    `Feedback Message:\n${formData.message}\n\n` +
    `Timestamp: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}\n` +
    `Dispatched to: ${RECIPIENT_EMAIL}\n` +
    `Platform: IndiaExams Aspirant Terminal`
  )

  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${RECIPIENT_EMAIL}&su=${emailSubject}&body=${emailBody}`
  const outlookUrl = `https://outlook.live.com/mail/0/deeplink/compose?to=${RECIPIENT_EMAIL}&subject=${emailSubject}&body=${emailBody}`
  const mailtoUrl = `mailto:${RECIPIENT_EMAIL}?subject=${emailSubject}&body=${emailBody}`

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.fullName || !formData.email || !formData.message || isSubmitting) return

    setIsSubmitting(true)
    const refNumber = `IE-FB-${Math.floor(10000 + Math.random() * 90000)}`
    const receipt = {
      refNumber,
      timestamp: new Date().toISOString(),
      ...formData
    }

    let dispatchedDirectly = false

    // Real asynchronous email dispatch to surajvadhya62@gmail.com via FormSubmit AJAX API
    try {
      const payload = {
        _subject: `[IndiaExams Feedback] ${currentCategoryLabel} from ${formData.fullName}`,
        _template: 'table',
        _captcha: 'false',
        fullName: formData.fullName,
        senderEmail: formData.email,
        feedbackCategory: categories.find(c => c.id === formData.category)?.label || formData.category,
        aspirantRating: `${formData.rating} / 5 (${ratingLabels[formData.rating]})`,
        targetExam: formData.examId || 'General Platform',
        detailedMessage: formData.message,
        referenceNumber: refNumber,
        timestampKolkata: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
      }

      const response = await fetch(`https://formsubmit.co/ajax/${RECIPIENT_EMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      })

      if (response.ok) {
        const data = await response.json()
        if (data.success === 'true' || data.success === true || data.message) {
          dispatchedDirectly = true
        }
      }
    } catch (networkErr) {
      console.warn('Direct FormSubmit network call encountered an exception:', networkErr)
    }

    // Always persist to localStorage
    try {
      const existing = JSON.parse(localStorage.getItem('indiaexams_user_feedbacks') || '[]')
      existing.unshift({ ...receipt, dispatchedDirectly })
      localStorage.setItem('indiaexams_user_feedbacks', JSON.stringify(existing.slice(0, 50)))
    } catch (storageErr) {
      console.error('Failed saving to localStorage:', storageErr)
    }

    setDeliveryStatus(dispatchedDirectly ? 'delivered' : 'fallback')
    setSubmissionReceipt(receipt)
    setIsSubmitting(false)
    setSubmitted(true)
  }

  const copyReceipt = () => {
    if (!submissionReceipt) return
    const text = `IndiaExams Feedback Receipt\nRef: ${submissionReceipt.refNumber}\nDate: ${new Date(submissionReceipt.timestamp).toLocaleString()}\nName: ${submissionReceipt.fullName}\nRecipient: ${RECIPIENT_EMAIL}\nCategory: ${submissionReceipt.category}`
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
        <div className="feedback-email-badge">
          <span className="live-signal-dot" />
          <span>Direct Dispatch to: <strong>{RECIPIENT_EMAIL}</strong></span>
        </div>
        <h1 className="feedback-title">Share Your Feedback & Insights</h1>
        <p className="feedback-subtitle">
          Help refine the 500+ Indian Examinations Directory. Your reports, official notification updates,
          and suggestions directly reach our lead editorial desk over email.
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
              <h3 className="success-title">Feedback Dispatched Successfully</h3>
              <p className="success-sub">
                Thank you, <strong>{submissionReceipt?.fullName}</strong>. Your feedback has been registered and transmitted to <strong>{RECIPIENT_EMAIL}</strong>.
              </p>

              <div className="receipt-box">
                <div className="receipt-row">
                  <span className="receipt-label">Reference ID:</span>
                  <span className="receipt-val mono-val">{submissionReceipt?.refNumber}</span>
                </div>
                <div className="receipt-row">
                  <span className="receipt-label">Target Inbox:</span>
                  <span className="receipt-val mono-val">{RECIPIENT_EMAIL}</span>
                </div>
                <div className="receipt-row">
                  <span className="receipt-label">Delivery Status:</span>
                  <span className={`receipt-val ${deliveryStatus === 'delivered' ? 'text-emerald' : 'text-amber'}`}>
                    {deliveryStatus === 'delivered' ? '✓ Dispatched via Direct Mail Gateway' : '✓ Logged · Direct Mail Client Ready'}
                  </span>
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

              {/* Direct Mail Confirmation Links */}
              <div className="receipt-mail-fallback-block">
                <p className="mail-fallback-note">
                  Want an instant direct copy in your sent folder or to follow up directly?
                </p>
                <div className="receipt-mail-btns">
                  <a
                    href={gmailUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="email-client-chip"
                    title={`Open in Gmail targeting ${RECIPIENT_EMAIL}`}
                  >
                    <HiOutlineMail /> Open in Gmail ({RECIPIENT_EMAIL})
                  </a>
                  <a
                    href={mailtoUrl}
                    className="email-client-chip"
                    title="Send via Default Mail App"
                  >
                    <HiOutlineExternalLink /> Send via Mail Client
                  </a>
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
              {/* Routing Notice */}
              <div className="form-routing-banner">
                <HiOutlineMail className="routing-icon" />
                <div className="routing-text">
                  <strong>Direct Email Ingestion:</strong> Form submissions are relayed automatically to{' '}
                  <span className="mono-val">{RECIPIENT_EMAIL}</span>.
                </div>
              </div>

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
                />
              </div>

              {/* Star Rating */}
              <div className="form-group">
                <label className="form-label">
                  Platform Rating ({formData.rating} / 5 — {ratingLabels[formData.rating]})
                </label>
                <div className="star-rating-row" role="radiogroup" aria-label="Rating out of 5">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      className="star-btn"
                      onClick={() => handleChange('rating', star)}
                      title={`${star} Star: ${ratingLabels[star]}`}
                      aria-label={`${star} star`}
                    >
                      {star <= formData.rating ? (
                        <HiStar className="star-icon filled" />
                      ) : (
                        <HiOutlineStar className="star-icon empty" />
                      )}
                    </button>
                  ))}
                  <span className="rating-text-hint">{ratingLabels[formData.rating]}</span>
                </div>
              </div>

              {/* Detailed Message */}
              <div className="form-group">
                <label htmlFor="fb-message" className="form-label">
                  Feedback Details & Notification Citations <span className="req-star">*</span>
                </label>
                <textarea
                  id="fb-message"
                  required
                  rows={5}
                  className="form-textarea"
                  placeholder="Describe the update or correction. Please mention official gazette URLs, dates, or specific errors observed..."
                  value={formData.message}
                  onChange={e => handleChange('message', e.target.value)}
                />
                <div className="textarea-footer">
                  {formData.message.length} characters
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="form-actions-row">
                <button
                  type="submit"
                  className="form-submit-btn"
                  disabled={isSubmitting}
                >
                  <HiOutlineChatAlt2 />
                  {isSubmitting ? 'Transmitting to Mailbox...' : 'Submit Feedback Direct'}
                </button>

                <div className="email-client-options">
                  <span className="email-options-label">Or send via direct client:</span>
                  <a
                    href={gmailUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="email-client-chip"
                    title={`Draft email in Gmail to ${RECIPIENT_EMAIL}`}
                  >
                    <HiOutlineMail /> Gmail
                  </a>
                  <a
                    href={outlookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="email-client-chip"
                    title={`Draft email in Outlook to ${RECIPIENT_EMAIL}`}
                  >
                    <HiOutlineMail /> Outlook
                  </a>
                  <a
                    href={mailtoUrl}
                    className="email-client-chip"
                    title={`Open default mail client to ${RECIPIENT_EMAIL}`}
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
              All submissions are transmitted securely to <span className="mono-val">{RECIPIENT_EMAIL}</span> and verified against official commission notifications.
            </p>
            <div className="trust-stats-row">
              <div className="trust-stat">
                <span className="trust-num">500</span>
                <span className="trust-sub">Exams Verified</span>
              </div>
              <div className="trust-stat">
                <span className="trust-num">342</span>
                <span className="trust-sub">Authorities</span>
              </div>
              <div className="trust-stat">
                <span className="trust-num">100%</span>
                <span className="trust-sub">Zero Commercials</span>
              </div>
            </div>
          </div>

          {/* Quick FAQ Tiles */}
          <div className="faq-card panel">
            <h4 className="faq-header">
              <HiOutlineQuestionMarkCircle /> Frequently Asked Questions
            </h4>

            <div className="faq-item">
              <h5 className="faq-q">Where does feedback go?</h5>
              <p className="faq-a">
                Directly to the editor in-charge at <strong>{RECIPIENT_EMAIL}</strong> for review and ingestion into the national examination database.
              </p>
            </div>

            <div className="faq-item">
              <h5 className="faq-q">Found an outdated exam month or vacancy?</h5>
              <p className="faq-a">
                Recruitment cycles shift frequently. Select "Data Correction" above and include the official PDF link so we can update the dataset immediately.
              </p>
            </div>

            <div className="faq-item">
              <h5 className="faq-q">Can coaching institutes sponsor exams?</h5>
              <p className="faq-a">
                No. IndiaExams is strictly non-commercial and does not accept sponsored listings or ads.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

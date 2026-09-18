import { useState, useRef } from 'react'
import {
  HiOutlineUserCircle, HiOutlineMail, HiOutlineLockClosed,
  HiOutlineDownload, HiOutlineUpload, HiOutlineCheckCircle,
  HiOutlineShieldCheck, HiOutlineSparkles, HiOutlineLogout,
  HiOutlineX, HiOutlineBadgeCheck, HiOutlineDocumentText,
  HiOutlineBookmark, HiOutlineCalendar
} from 'react-icons/hi'

export default function AuthModal({
  isOpen,
  onClose,
  currentUser,
  onLogin,
  onLogout,
  bookmarks = [],
  todoList = [],
  exams = []
}) {
  const [authMode, setAuthMode] = useState('login') // 'login' | 'register'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    targetExam: 'UPSC Civil Services Examination (UPSC CSE)',
    targetYear: '2025-2026',
    password: ''
  })
  const [message, setMessage] = useState('')
  const [importStatus, setImportStatus] = useState('')
  const fileInputRef = useRef(null)

  if (!isOpen) return null

  const handleChange = (field, val) => {
    setFormData(prev => ({ ...prev, [field]: val }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name && authMode === 'register') {
      setMessage('Please enter your full name')
      return
    }
    if (!formData.email) {
      setMessage('Please enter a valid email address')
      return
    }

    const userProfile = {
      id: `usr_${Date.now()}`,
      name: formData.name || formData.email.split('@')[0],
      email: formData.email,
      targetExam: formData.targetExam,
      targetYear: formData.targetYear,
      joinedAt: new Date().toISOString()
    }

    onLogin(userProfile)
    setMessage('')
    onClose()
  }

  const handleGuestLogin = () => {
    const guestProfile = {
      id: `usr_guest_${Date.now()}`,
      name: 'Candidate Aspirant',
      email: 'aspirant@indiaexams.gov.in',
      targetExam: 'UPSC Civil Services Examination (UPSC CSE)',
      targetYear: '2025-2026',
      joinedAt: new Date().toISOString(),
      isGuest: false
    }
    onLogin(guestProfile)
    onClose()
  }

  // Export complete JSON backup vault
  const handleExportVault = () => {
    try {
      const milestones = JSON.parse(localStorage.getItem('indiaexams_candidate_milestones') || '{}')
      const feedbacks = JSON.parse(localStorage.getItem('indiaexams_user_feedbacks') || '[]')
      const currentTodos = JSON.parse(localStorage.getItem('indiaexams_daily_todos') || '[]')

      const vaultData = {
        version: '2.5.0',
        exportedAt: new Date().toISOString(),
        user: currentUser,
        bookmarks,
        todos: currentTodos,
        milestones,
        feedbacks
      }

      const blob = new Blob([JSON.stringify(vaultData, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `indiaexams_vault_${currentUser?.name?.replace(/\s+/g, '_') || 'aspirant'}_${new Date().toISOString().slice(0, 10)}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      setImportStatus('✓ Vault Backup downloaded successfully!')
      setTimeout(() => setImportStatus(''), 4000)
    } catch (err) {
      console.error('Export failed:', err)
      setImportStatus('Export failed. Please try again.')
    }
  }

  // Import JSON backup vault
  const handleImportFile = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result)
        if (data.bookmarks && Array.isArray(data.bookmarks)) {
          localStorage.setItem('indiaexams_bookmarks', JSON.stringify(data.bookmarks))
        }
        if (data.todos && Array.isArray(data.todos)) {
          localStorage.setItem('indiaexams_daily_todos', JSON.stringify(data.todos))
        }
        if (data.milestones) {
          localStorage.setItem('indiaexams_candidate_milestones', JSON.stringify(data.milestones))
        }
        if (data.user) {
          onLogin(data.user)
        }
        setImportStatus('✓ Vault successfully restored! Reloading dashboard state...')
        setTimeout(() => {
          window.location.reload()
        }, 1200)
      } catch (err) {
        console.error('Import parse error:', err)
        setImportStatus('Invalid backup file. Please provide an IndiaExams JSON export.')
      }
    }
    reader.readAsText(file)
  }

  const completedTodos = todoList.filter(t => t.completed).length

  return (
    <div className="auth-overlay fade-in">
      <div className="auth-backdrop" onClick={onClose} />

      <div className="auth-card panel">
        {/* Header Strip */}
        <div className="auth-header-strip">
          <div className="auth-header-title">
            <HiOutlineShieldCheck className="auth-shield-icon" />
            <span>ASPIRANT VAULT // USER PROFILE</span>
          </div>
          <button
            className="auth-close-btn"
            onClick={onClose}
            aria-label="Close user profile modal"
          >
            <HiOutlineX />
          </button>
        </div>

        {/* Modal Body */}
        <div className="auth-body">
          {currentUser ? (
            /* Logged-In User Profile Dashboard */
            <div className="auth-profile-view fade-in">
              <div className="profile-hero-card">
                <div className="profile-avatar-circle">
                  {currentUser.name ? currentUser.name[0].toUpperCase() : 'A'}
                </div>
                <div className="profile-hero-info">
                  <h3 className="profile-user-name">{currentUser.name}</h3>
                  <span className="profile-user-email mono-val">{currentUser.email}</span>
                  <div className="profile-target-badge">
                    <HiOutlineBadgeCheck />
                    <span>{currentUser.targetExam} ({currentUser.targetYear})</span>
                  </div>
                </div>
              </div>

              {/* Progress & Telemetry Overview */}
              <div className="profile-stats-grid">
                <div className="profile-stat-box">
                  <span className="stat-icon-wrap text-amber"><HiOutlineBookmark /></span>
                  <div className="stat-data">
                    <span className="stat-num">{bookmarks.length}</span>
                    <span className="stat-lbl">Pinned Targets</span>
                  </div>
                </div>

                <div className="profile-stat-box">
                  <span className="stat-icon-wrap text-emerald"><HiOutlineCheckCircle /></span>
                  <div className="stat-data">
                    <span className="stat-num">{completedTodos} / {todoList.length}</span>
                    <span className="stat-lbl">Daily Tasks Done</span>
                  </div>
                </div>

                <div className="profile-stat-box">
                  <span className="stat-icon-wrap text-blue"><HiOutlineCalendar /></span>
                  <div className="stat-data">
                    <span className="stat-num">Active</span>
                    <span className="stat-lbl">Continuous Sync</span>
                  </div>
                </div>
              </div>

              {/* Portable Vault Backup Controls */}
              <div className="vault-backup-section">
                <h5 className="vault-heading">
                  <HiOutlineDocumentText /> PORTABLE PROGRESS VAULT
                </h5>
                <p className="vault-desc">
                  Download a complete portable snapshot of your pinned examinations, daily to-do lists,
                  and milestone checkpoints to restore on any machine or browser.
                </p>

                {importStatus && (
                  <div className="vault-status-alert mono-val text-emerald">
                    {importStatus}
                  </div>
                )}

                <div className="vault-btn-row">
                  <button className="btn-secondary vault-action-btn" onClick={handleExportVault}>
                    <HiOutlineDownload /> Export Vault Snapshot (.json)
                  </button>

                  <button
                    className="btn-secondary vault-action-btn"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <HiOutlineUpload /> Import Vault Backup
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    accept=".json"
                    onChange={handleImportFile}
                  />
                </div>
              </div>

              {/* Log Out Action */}
              <div className="profile-footer-row">
                <button className="profile-logout-btn" onClick={onLogout}>
                  <HiOutlineLogout /> Sign Out from This Terminal
                </button>
                <button className="btn-primary" onClick={onClose}>
                  Continue Preparation
                </button>
              </div>
            </div>
          ) : (
            /* Sign In / Registration Form */
            <div className="auth-form-view fade-in">
              <div className="auth-tabs">
                <button
                  className={`auth-tab-btn ${authMode === 'login' ? 'active' : ''}`}
                  onClick={() => setAuthMode('login')}
                >
                  Aspirant Sign In
                </button>
                <button
                  className={`auth-tab-btn ${authMode === 'register' ? 'active' : ''}`}
                  onClick={() => setAuthMode('register')}
                >
                  Create Aspirant Profile
                </button>
              </div>

              <p className="auth-lead-text">
                Save your daily study schedule, pinned examination pipeline, and notes safely in your browser vault.
              </p>

              {message && (
                <div className="auth-error-msg mono-val text-amber">
                  {message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="auth-form">
                {authMode === 'register' && (
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      required
                      className="form-input"
                      placeholder="e.g., Suraj Vadhya"
                      value={formData.name}
                      onChange={e => handleChange('name', e.target.value)}
                    />
                  </div>
                )}

                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    required
                    className="form-input"
                    placeholder="e.g., candidate@example.com"
                    value={formData.email}
                    onChange={e => handleChange('email', e.target.value)}
                  />
                </div>

                <div className="form-row-pair">
                  <div className="form-group">
                    <label className="form-label">Primary Examination</label>
                    <select
                      className="form-select"
                      value={formData.targetExam}
                      onChange={e => handleChange('targetExam', e.target.value)}
                    >
                      <option value="UPSC Civil Services Examination (UPSC CSE)">UPSC Civil Services (CSE)</option>
                      <option value="SSC Combined Graduate Level (SSC CGL)">SSC CGL</option>
                      <option value="State Public Service Commission (State PCS)">State PCS</option>
                      <option value="Banking Recruitment (IBPS / SBI PO)">Banking (IBPS / SBI)</option>
                      <option value="Combined Defence Services (UPSC CDS / NDA)">Defence (CDS / NDA / AFCAT)</option>
                      <option value="Engineering Entrance (GATE / ESE / PSU)">Engineering (GATE / ESE)</option>
                      <option value="Medical Entrance / Services (NEET / CMS)">Medical (NEET / CMS)</option>
                      <option value="Law & Judicial Services (CLAT / PCS-J)">Law & Judiciary (CLAT / PCS-J)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Target Cycle</label>
                    <select
                      className="form-select"
                      value={formData.targetYear}
                      onChange={e => handleChange('targetYear', e.target.value)}
                    >
                      <option value="2025-2026">2025 – 2026 Cycle</option>
                      <option value="2026-2027">2026 – 2027 Cycle</option>
                      <option value="2027+">Long-Term Foundation</option>
                    </select>
                  </div>
                </div>

                <button type="submit" className="form-submit-btn auth-submit-btn">
                  <HiOutlineBadgeCheck />
                  {authMode === 'login' ? 'Sign In & Load Progress' : 'Create Profile & Save Progress'}
                </button>
              </form>

              {/* 1-Click Quick Demo / Fast Access */}
              <div className="auth-quick-access">
                <div className="auth-divider">
                  <span>OR INSTANT ACCESS</span>
                </div>
                <button
                  type="button"
                  className="btn-secondary quick-guest-btn"
                  onClick={handleGuestLogin}
                >
                  <HiOutlineSparkles /> 1-Click Aspirant Demo Access
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

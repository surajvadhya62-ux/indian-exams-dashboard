import { useState } from 'react'
import {
  HiOutlineShieldCheck, HiOutlineOfficeBuilding, HiOutlineCurrencyRupee,
  HiOutlineUserGroup, HiOutlineAcademicCap, HiOutlineCheckCircle,
  HiOutlineChevronRight, HiOutlineSearch
} from 'react-icons/hi'

export default function GovtGradesGuide({ setActiveView, setSearchQuery }) {
  const [activeTab, setActiveTab] = useState('central') // 'central', 'banking', 'defence', 'psu', 'cpc'

  const handleExploreExams = (query) => {
    if (setSearchQuery && setActiveView) {
      setSearchQuery(query)
      setActiveView('explore')
    }
  }

  return (
    <section className="grades-section">
      <div className="section-header">
        <div>
          <h2 className="section-title">🏛️ Indian Government Cadres, Grades & Pay Matrix Guide</h2>
          <p className="section-subtitle">
            Comprehensive breakdown of Class/Group hierarchies (A, B, C), 7th Pay Commission levels, regulatory scales, defence ranks, and gazetted status
          </p>
        </div>
      </div>

      {/* Navigation sub-tabs */}
      <div className="grades-tab-bar">
        <button
          className={`grades-tab-btn ${activeTab === 'central' ? 'active' : ''}`}
          onClick={() => setActiveTab('central')}
        >
          <HiOutlineOfficeBuilding /> Central & State Services (Groups A, B, C & D)
        </button>
        <button
          className={`grades-tab-btn ${activeTab === 'banking' ? 'active' : ''}`}
          onClick={() => setActiveTab('banking')}
        >
          <HiOutlineCurrencyRupee /> Banking & Regulatory Scales (RBI, SEBI, PO)
        </button>
        <button
          className={`grades-tab-btn ${activeTab === 'defence' ? 'active' : ''}`}
          onClick={() => setActiveTab('defence')}
        >
          <HiOutlineShieldCheck /> Armed Forces Ranks (Army, Navy, Air Force)
        </button>
        <button
          className={`grades-tab-btn ${activeTab === 'psu' ? 'active' : ''}`}
          onClick={() => setActiveTab('psu')}
        >
          <HiOutlineUserGroup /> PSU Executive Grades (E1 to E9)
        </button>
        <button
          className={`grades-tab-btn ${activeTab === 'cpc' ? 'active' : ''}`}
          onClick={() => setActiveTab('cpc')}
        >
          <HiOutlineAcademicCap /> 7th CPC Pay Matrix & Gazetted Status
        </button>
      </div>

      {/* TAB 1: Central & State Services */}
      {activeTab === 'central' && (
        <div className="grades-tab-content fade-in">
          <div className="grades-intro-card">
            <h3>Structure of Central Civil & Subordinate Services (Groups A, B, C & D)</h3>
            <p>
              Government of India classifies civilian posts into four foundational tiers: <strong>Group A</strong>, <strong>Group B</strong>, <strong>Group C</strong>, and <strong>Group D / Grade D</strong> (the historic support cadre placed in 7th CPC Pay Level 1). The classification determines appointment authority, disciplinary control, gazetted status, and pay scale under the 7th Central Pay Commission (CPC).
            </p>
          </div>

          <div className="cadres-container">
            {/* GROUP A */}
            <div className="cadre-card group-a">
              <div className="cadre-badge-header">
                <span className="cadre-rank-badge gold">Group 'A' / Class I</span>
                <span className="cadre-gazetted-badge">Gazetted Officer</span>
              </div>
              <h3 className="cadre-title">Senior Leadership, Administrative & Policymaking Cadre</h3>
              <p className="cadre-desc">
                The apex executive authority of the Government of India. Appointments are issued under the seal and signature of the <strong>President of India</strong> (or State Governor for State PSCs). These officers formulate policy, exercise statutory magistrate powers, head districts, and command government departments.
              </p>

              <div className="cadre-meta-grid">
                <div className="cadre-meta-box">
                  <span className="meta-box-label">7th CPC Pay Level</span>
                  <span className="meta-box-val">Level 10 to Level 14+</span>
                </div>
                <div className="cadre-meta-box">
                  <span className="meta-box-label">Entry Basic Pay</span>
                  <span className="meta-box-val">₹56,100 / month</span>
                </div>
                <div className="cadre-meta-box">
                  <span className="meta-box-label">Gross Monthly In-Hand</span>
                  <span className="meta-box-val">₹90,000 – ₹1,25,000+</span>
                </div>
                <div className="cadre-meta-box">
                  <span className="meta-box-label">Appointing Authority</span>
                  <span className="meta-box-val">President of India</span>
                </div>
              </div>

              <div className="cadre-roles">
                <strong>Key Designations:</strong>
                <p>Assistant Collector, Sub-Divisional Magistrate (SDM), Assistant Commissioner of Police / DSP, Assistant Commissioner of Income Tax / GST, Assistant Director, Scientist 'C' (ISRO/DRDO), Medical Officer (UPSC CMS), Executive Engineer (IES).</p>
              </div>

              <div className="cadre-exams">
                <strong>Key Recruiting Examinations:</strong>
                <div className="cadre-exam-tags">
                  <span className="clickable-tag" onClick={() => handleExploreExams('UPSC')}>UPSC CSE</span>
                  <span className="clickable-tag" onClick={() => handleExploreExams('IES')}>UPSC IES/ESE</span>
                  <span className="clickable-tag" onClick={() => handleExploreExams('Geo-Scientist')}>UPSC Geo-Scientist</span>
                  <span className="clickable-tag" onClick={() => handleExploreExams('CMS')}>UPSC CMS</span>
                  <span className="clickable-tag" onClick={() => handleExploreExams('ISRO')}>ISRO Scientist</span>
                  <span className="clickable-tag" onClick={() => handleExploreExams('DRDO')}>DRDO Scientist</span>
                  <span className="clickable-tag" onClick={() => handleExploreExams('PSC')}>State PSC Group 1</span>
                </div>
              </div>
            </div>

            {/* GROUP B */}
            <div className="cadre-card group-b">
              <div className="cadre-badge-header">
                <span className="cadre-rank-badge silver">Group 'B' / Class II</span>
                <span className="cadre-gazetted-badge">Gazetted & Non-Gazetted</span>
              </div>
              <h3 className="cadre-title">Middle-Management, Supervisory & Investigative Cadre</h3>
              <p className="cadre-desc">
                Crucial middle-management officers responsible for field investigation, tax enforcement, audit verification, intelligence operations, and ministry supervision. Split into <strong>Gazetted</strong> (Level 8-9) and <strong>Non-Gazetted</strong> (Level 6-7).
              </p>

              <div className="cadre-meta-grid">
                <div className="cadre-meta-box">
                  <span className="meta-box-label">7th CPC Pay Level</span>
                  <span className="meta-box-val">Level 6 to Level 8</span>
                </div>
                <div className="cadre-meta-box">
                  <span className="meta-box-label">Entry Basic Pay</span>
                  <span className="meta-box-val">₹35,400 to ₹47,600 / month</span>
                </div>
                <div className="cadre-meta-box">
                  <span className="meta-box-label">Gross Monthly In-Hand</span>
                  <span className="meta-box-val">₹60,000 – ₹85,000</span>
                </div>
                <div className="cadre-meta-box">
                  <span className="meta-box-label">Recruiting Agencies</span>
                  <span className="meta-box-val">SSC, MHA, State PSCs</span>
                </div>
              </div>

              <div className="cadre-roles">
                <strong>Key Designations:</strong>
                <p>Assistant Audit Officer (AAO - Gazetted), Assistant Accounts Officer, Income Tax Inspector (ITI), Central Excise Inspector (GST), Preventive Officer, Examiner, Sub-Inspector in CBI / NIA, Assistant Section Officer (ASO in CSS, MEA, AFHQ), Junior Engineer (CPWD/MES), IB ACIO.</p>
              </div>

              <div className="cadre-exams">
                <strong>Key Recruiting Examinations:</strong>
                <div className="cadre-exam-tags">
                  <span className="clickable-tag" onClick={() => handleExploreExams('SSC CGL')}>SSC CGL</span>
                  <span className="clickable-tag" onClick={() => handleExploreExams('AAO')}>SSC CGL AAO</span>
                  <span className="clickable-tag" onClick={() => handleExploreExams('SSC JE')}>SSC JE</span>
                  <span className="clickable-tag" onClick={() => handleExploreExams('IB ACIO')}>IB ACIO</span>
                  <span className="clickable-tag" onClick={() => handleExploreExams('CAPF')}>UPSC CAPF AC</span>
                  <span className="clickable-tag" onClick={() => handleExploreExams('CPO')}>SSC CPO (SI)</span>
                </div>
              </div>
            </div>

            {/* GROUP C */}
            <div className="cadre-card group-c">
              <div className="cadre-badge-header">
                <span className="cadre-rank-badge bronze">Group 'C' / Subordinate</span>
                <span className="cadre-gazetted-badge non">Non-Gazetted Staff</span>
              </div>
              <h3 className="cadre-title">Operational, Clerical, Technical & Frontline Cadre</h3>
              <p className="cadre-desc">
                The administrative and technical backbone carrying out clerical operations, citizen service delivery, data entry, armed constabulary security, and rail operations. Group D posts (peons, trackmen) are now merged into Group C Pay Level 1.
              </p>

              <div className="cadre-meta-grid">
                <div className="cadre-meta-box">
                  <span className="meta-box-label">7th CPC Pay Level</span>
                  <span className="meta-box-val">Level 1 to Level 5</span>
                </div>
                <div className="cadre-meta-box">
                  <span className="meta-box-label">Entry Basic Pay</span>
                  <span className="meta-box-val">₹18,000 to ₹29,200 / month</span>
                </div>
                <div className="cadre-meta-box">
                  <span className="meta-box-label">Gross Monthly In-Hand</span>
                  <span className="meta-box-val">₹30,000 – ₹50,000</span>
                </div>
                <div className="cadre-meta-box">
                  <span className="meta-box-label">Minimum Qualification</span>
                  <span className="meta-box-val">10th / 12th / Graduate</span>
                </div>
              </div>

              <div className="cadre-roles">
                <strong>Key Designations:</strong>
                <p>Postal Assistant / Sorting Assistant, Data Entry Operator (DEO), Lower Division Clerk (LDC), Junior Secretariat Assistant, Station Master, Train Clerk, Goods Guard, GD Constable, Multi-Tasking Staff (MTS), Railway Assistant Loco Pilot (ALP).</p>
              </div>

              <div className="cadre-exams">
                <strong>Key Recruiting Examinations:</strong>
                <div className="cadre-exam-tags">
                  <span className="clickable-tag" onClick={() => handleExploreExams('CHSL')}>SSC CHSL</span>
                  <span className="clickable-tag" onClick={() => handleExploreExams('MTS')}>SSC MTS</span>
                  <span className="clickable-tag" onClick={() => handleExploreExams('GD')}>SSC GD Constable</span>
                  <span className="clickable-tag" onClick={() => handleExploreExams('NTPC')}>RRB NTPC</span>
                  <span className="clickable-tag" onClick={() => handleExploreExams('ALP')}>RRB ALP</span>
                  <span className="clickable-tag" onClick={() => handleExploreExams('EPFO SSA')}>EPFO SSA</span>
                </div>
              </div>
            </div>

            {/* GROUP D */}
            <div className="cadre-card group-d">
              <div className="cadre-badge-header">
                <span className="cadre-rank-badge purple">Group 'D' / Grade D</span>
                <span className="cadre-gazetted-badge non">Non-Gazetted Support Staff</span>
              </div>
              <h3 className="cadre-title">Foundational Operational, Track Maintenance & Auxiliary Support Cadre</h3>
              <p className="cadre-desc">
                Historically classified as <strong>Class IV / Grade D</strong>, this cadre is the essential operational foundation for Indian Railways, central ministries, and state judiciary. While the 6th and 7th Central Pay Commissions officially redesignated these posts into <strong>Pay Level 1</strong> (PB-1 with Grade Pay ₹1,800) under the Group C umbrella, the designation <strong>&quot;Group D&quot;</strong> remains the universal official recruitment title used across <strong>Indian Railways (RRC CEN Level 1)</strong>, State High Courts, and Subordinate Selection Boards (regularly receiving over 1 to 2 crore applicants).
              </p>

              <div className="cadre-meta-grid">
                <div className="cadre-meta-box">
                  <span className="meta-box-label">7th CPC Pay Level</span>
                  <span className="meta-box-val">Level 1 (GP ₹1,800)</span>
                </div>
                <div className="cadre-meta-box">
                  <span className="meta-box-label">Entry Basic Pay</span>
                  <span className="meta-box-val">₹18,000 / month</span>
                </div>
                <div className="cadre-meta-box">
                  <span className="meta-box-label">Gross Monthly In-Hand</span>
                  <span className="meta-box-val">₹28,000 – ₹36,000</span>
                </div>
                <div className="cadre-meta-box">
                  <span className="meta-box-label">Minimum Qualification</span>
                  <span className="meta-box-val">10th Pass (Matric) / ITI</span>
                </div>
              </div>

              <div className="cadre-roles">
                <strong>Key Designations:</strong>
                <p>Track Maintainer Grade IV (Civil Engineering), Railway Pointsman, Helper / Khallasi (Mechanical, Electrical, Signal & Telecom workshops), Hospital Attendant, Peon / Daftary, Chowkidar / Watchman, Safaiwala, Gateman, Process Server, Messenger, Office Attendant.</p>
              </div>

              <div style={{ marginTop: '10px', marginBottom: '14px', padding: '10px 14px', background: 'rgba(168, 85, 247, 0.08)', borderRadius: '8px', borderLeft: '3px solid #a855f7' }}>
                <strong style={{ color: '#c084fc', fontSize: '0.82rem' }}>Note on SSC Stenographer Grade 'D':</strong>
                <p style={{ margin: '4px 0 0 0', fontSize: '0.82rem', color: '#cbd5e1', lineHeight: '1.6' }}>
                  Unlike Railway/Ministry Level 1 Group D, <strong>SSC Stenographer Grade &apos;D&apos;</strong> is a specialized ministerial transcription and personal secretarial post placed higher in <strong>7th CPC Pay Level 4 (Grade Pay ₹2,400)</strong> with an entry basic pay of ₹25,500/month (Gross ₹42,000–₹50,000).
                </p>
              </div>

              <div className="cadre-exams">
                <strong>Key Recruiting Examinations:</strong>
                <div className="cadre-exam-tags">
                  <span className="clickable-tag" onClick={() => handleExploreExams('Group D')}>RRB Group D (RRC CEN)</span>
                  <span className="clickable-tag" onClick={() => handleExploreExams('Stenographer')}>SSC Stenographer Grade D</span>
                  <span className="clickable-tag" onClick={() => handleExploreExams('MTS')}>SSC MTS / Havaldar</span>
                  <span className="clickable-tag" onClick={() => handleExploreExams('Railway')}>Railway RRC Level 1</span>
                  <span className="clickable-tag" onClick={() => handleExploreExams('Court')}>High Court Group D</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Banking & Regulatory Scales */}
      {activeTab === 'banking' && (
        <div className="grades-tab-content fade-in">
          <div className="grades-intro-card">
            <h3>Banking & Regulatory Officer Scales (Scale I to VII)</h3>
            <p>
              Financial institutions operate under a distinct salary and promotional hierarchy governed by bipartite settlements and IBA (Indian Banks&apos; Association) scales or autonomous statutory pay commissions (RBI, SEBI, NABARD, SIDBI).
            </p>
          </div>

          <div className="comparison-table-wrapper" style={{ marginBottom: '2rem' }}>
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Scale / Grade</th>
                  <th>Designation</th>
                  <th>Key Responsibilities</th>
                  <th>Direct Recruitment Exam</th>
                  <th>Approx. Total CTC / In-Hand</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong style={{ color: '#fbbf24' }}>RBI Grade B</strong></td>
                  <td>Manager (Grade B)</td>
                  <td>Monetary policy, currency management, banking supervision</td>
                  <td>RBI Grade B (General / DEPR / DSIM)</td>
                  <td>₹1.25L – ₹1.40L / month + Accommodation</td>
                </tr>
                <tr>
                  <td><strong style={{ color: '#60a5fa' }}>Grade A (Regulators)</strong></td>
                  <td>Assistant Manager (Grade A)</td>
                  <td>Securities regulation, MSME finance, pension regulation, trade credit</td>
                  <td>SEBI Grade A, NABARD Grade A, SIDBI Grade A, PFRDA, IFSCA, NHB</td>
                  <td>₹1.05L – ₹1.25L / month + Perks</td>
                </tr>
                <tr>
                  <td><strong>Scale I (JMGS I)</strong></td>
                  <td>Probationary Officer (PO) / Assistant Manager</td>
                  <td>Branch operations, loan disbursement, customer servicing, audit</td>
                  <td>SBI PO, IBPS PO, IBPS RRB Scale I</td>
                  <td>₹65,000 – ₹75,000 / month</td>
                </tr>
                <tr>
                  <td><strong>Scale II (MMGS II)</strong></td>
                  <td>Manager / Specialist Officer</td>
                  <td>Credit appraisal, treasury trading, corporate loan syndication, IT security</td>
                  <td>SBI Specialist Cadre Officer, IBPS SO, IBPS RRB Scale II</td>
                  <td>₹80,000 – ₹95,000 / month</td>
                </tr>
                <tr>
                  <td><strong>Scale III (MMGS III)</strong></td>
                  <td>Senior Manager / Branch Head</td>
                  <td>Heading medium/large branches, regional credit processing centers</td>
                  <td>Promotional & Specialist Lateral Entry</td>
                  <td>₹1.00L – ₹1.15L / month</td>
                </tr>
                <tr>
                  <td><strong>Scale IV & V (SMGS)</strong></td>
                  <td>Chief Manager / AGM</td>
                  <td>Zonal department head, circle head, risk oversight</td>
                  <td>Internal promotion</td>
                  <td>₹1.25L – ₹1.60L / month</td>
                </tr>
                <tr>
                  <td><strong>Scale VI & VII (TEGS)</strong></td>
                  <td>DGM / General Manager</td>
                  <td>Executive policy, head office functional head</td>
                  <td>Internal promotion</td>
                  <td>₹1.75L – ₹2.20L / month</td>
                </tr>
                <tr>
                  <td><strong>Clerical Cadre</strong></td>
                  <td>Junior Associate / Assistant</td>
                  <td>Cash desk, customer support, document checking, account opening</td>
                  <td>SBI Clerk, IBPS Clerk, RBI Assistant, NABARD DA</td>
                  <td>₹35,000 – ₹45,000 / month</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: Defence Forces Ranks */}
      {activeTab === 'defence' && (
        <div className="grades-tab-content fade-in">
          <div className="grades-intro-card">
            <h3>Indian Armed Forces Officer Ranks & CPC Level Equivalency</h3>
            <p>
              Commissioned officers in the <strong>Indian Army</strong>, <strong>Indian Navy</strong>, and <strong>Indian Air Force</strong> receive compensation under the 7th CPC Defence Pay Matrix along with Military Service Pay (MSP) of ₹15,500/month, free medical (ECHS), ration, and field allowances.
            </p>
          </div>

          <div className="comparison-table-wrapper" style={{ marginBottom: '2rem' }}>
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>7th CPC Level</th>
                  <th>Indian Army</th>
                  <th>Indian Navy</th>
                  <th>Indian Air Force</th>
                  <th>Recruiting Commission Exam</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong style={{ color: '#10b981' }}>Level 10 (₹56,100)</strong></td>
                  <td>Lieutenant</td>
                  <td>Sub Lieutenant</td>
                  <td>Flying Officer</td>
                  <td>UPSC NDA, UPSC CDS, AFCAT</td>
                </tr>
                <tr>
                  <td><strong>Level 10B (₹61,300)</strong></td>
                  <td>Captain</td>
                  <td>Lieutenant</td>
                  <td>Flight Lieutenant</td>
                  <td>Promotion after 2 years</td>
                </tr>
                <tr>
                  <td><strong>Level 11 (₹69,400)</strong></td>
                  <td>Major</td>
                  <td>Lt Commander</td>
                  <td>Squadron Leader</td>
                  <td>Promotion after 6 years</td>
                </tr>
                <tr>
                  <td><strong>Level 12A (₹1,21,200)</strong></td>
                  <td>Lieutenant Colonel</td>
                  <td>Commander</td>
                  <td>Wing Commander</td>
                  <td>Promotion after 13 years</td>
                </tr>
                <tr>
                  <td><strong style={{ color: '#fbbf24' }}>Level 13 (₹1,30,600)</strong></td>
                  <td>Colonel (Selection)</td>
                  <td>Captain (Selection)</td>
                  <td>Group Captain</td>
                  <td>Selection Board promotion</td>
                </tr>
                <tr>
                  <td><strong>Level 13A (₹1,39,600)</strong></td>
                  <td>Brigadier</td>
                  <td>Commodore</td>
                  <td>Air Commodore</td>
                  <td>Selection Board promotion</td>
                </tr>
                <tr>
                  <td><strong>Level 14 (₹1,44,200)</strong></td>
                  <td>Major General</td>
                  <td>Rear Admiral</td>
                  <td>Air Vice Marshal</td>
                  <td>Selection Board promotion</td>
                </tr>
                <tr>
                  <td><strong>Level 15 & 16 (₹1,82,200)</strong></td>
                  <td>Lieutenant General / Army Cdr</td>
                  <td>Vice Admiral / FOC-in-C</td>
                  <td>Air Marshal / AOC-in-C</td>
                  <td>Apex Selection</td>
                </tr>
                <tr>
                  <td><strong style={{ color: '#f43f5e' }}>Level 17 (₹2,50,000)</strong></td>
                  <td>General (Chief of Army Staff)</td>
                  <td>Admiral (Chief of Naval Staff)</td>
                  <td>Air Chief Marshal (CAS)</td>
                  <td>Chief of Staff / CDS</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: PSU Executive Grades */}
      {activeTab === 'psu' && (
        <div className="grades-tab-content fade-in">
          <div className="grades-intro-card">
            <h3>Public Sector Undertakings (PSUs) Executive Hierarchy (E1 to E9)</h3>
            <p>
              Central Public Sector Enterprises (CPSEs) like Maharatna and Navratna companies (ONGC, IOCL, BHEL, NTPC, GAIL, SAIL, PGCIL, BEL, HAL) follow the Industrial Dearness Allowance (IDA) pattern. Most engineers, geoscientists, and finance specialists enter at E1 or E2 grade.
            </p>
          </div>

          <div className="comparison-table-wrapper" style={{ marginBottom: '2rem' }}>
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Executive Grade</th>
                  <th>Designation</th>
                  <th>Basic Pay Scale (IDA)</th>
                  <th>Entry Gateway</th>
                  <th>Approx. Annual CTC</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong style={{ color: '#3b82f6' }}>E1 Grade</strong></td>
                  <td>Executive Trainee / Assistant Engineer / Accounts Officer</td>
                  <td>₹40,000 – ₹1,40,000</td>
                  <td>GATE Score / Direct PSU CBT Exam</td>
                  <td>₹12 – ₹16 LPA</td>
                </tr>
                <tr>
                  <td><strong style={{ color: '#60a5fa' }}>E2 Grade</strong></td>
                  <td>Assistant Manager / Engineer</td>
                  <td>₹50,000 – ₹1,60,000</td>
                  <td>GATE / Campus / Experienced</td>
                  <td>₹15 – ₹20 LPA</td>
                </tr>
                <tr>
                  <td><strong>E3 Grade</strong></td>
                  <td>Deputy Manager</td>
                  <td>₹60,000 – ₹1,80,000</td>
                  <td>Promotion (3-4 years)</td>
                  <td>₹18 – ₹24 LPA</td>
                </tr>
                <tr>
                  <td><strong>E4 Grade</strong></td>
                  <td>Manager</td>
                  <td>₹70,000 – ₹2,00,000</td>
                  <td>Promotion</td>
                  <td>₹22 – ₹28 LPA</td>
                </tr>
                <tr>
                  <td><strong>E5 Grade</strong></td>
                  <td>Senior Manager</td>
                  <td>₹80,000 – ₹2,20,000</td>
                  <td>Promotion</td>
                  <td>₹26 – ₹34 LPA</td>
                </tr>
                <tr>
                  <td><strong>E6 Grade</strong></td>
                  <td>Chief Manager / Deputy General Manager (DGM)</td>
                  <td>₹90,000 – ₹2,40,000</td>
                  <td>Promotion</td>
                  <td>₹30 – ₹40 LPA</td>
                </tr>
                <tr>
                  <td><strong>E7 & E8 Grade</strong></td>
                  <td>General Manager (GM) / Executive Director (ED)</td>
                  <td>₹1,20,000 – ₹2,80,000</td>
                  <td>Senior Selection Board</td>
                  <td>₹45 – ₹60+ LPA</td>
                </tr>
                <tr>
                  <td><strong style={{ color: '#f43f5e' }}>Board Level</strong></td>
                  <td>Director / Chairman & Managing Director (CMD)</td>
                  <td>₹1,80,000 – ₹3,40,000</td>
                  <td>Public Enterprises Selection Board (PESB)</td>
                  <td>Apex Board Level</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: 7th CPC & Gazetted Status Explained */}
      {activeTab === 'cpc' && (
        <div className="grades-tab-content fade-in">
          <div className="grades-faq-grid">
            <div className="grades-faq-card">
              <h3 style={{ color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <HiOutlineCheckCircle /> What Does &quot;Gazetted Officer&quot; Mean?
              </h3>
              <p style={{ color: '#cbd5e1', lineHeight: '1.7', fontSize: '0.9rem' }}>
                A <strong>Gazetted Officer</strong> is an executive or judicial representative of the Government of India or a State Government whose appointment, transfer, or promotion is officially published in <em>The Gazette of India</em> (or the official State Government Gazette).
              </p>
              <div style={{ marginTop: '12px', padding: '10px 14px', background: 'rgba(245, 158, 11, 0.08)', borderRadius: '8px', borderLeft: '3px solid #f59e0b' }}>
                <strong style={{ color: '#fbbf24', fontSize: '0.85rem' }}>Key Privileges & Powers:</strong>
                <ul style={{ margin: '6px 0 0 16px', fontSize: '0.83rem', color: '#cbd5e1' }}>
                  <li>Authorized by law to verify and attest official documents, passport verification forms, and affidavits.</li>
                  <li>Holds executive, financial sanctioning, or administrative authority under the Constitution of India.</li>
                  <li>Can only be dismissed or suspended by order of the President of India or State Governor.</li>
                </ul>
              </div>
            </div>

            <div className="grades-faq-card">
              <h3 style={{ color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <HiOutlineCurrencyRupee /> How Does 7th CPC Pay Calculation Work?
              </h3>
              <p style={{ color: '#cbd5e1', lineHeight: '1.7', fontSize: '0.9rem' }}>
                Monthly gross salary in central government service is computed using the following statutory formula:
              </p>
              <div style={{ marginTop: '12px', background: 'rgba(0,0,0,0.3)', padding: '12px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '0.85rem', color: '#60a5fa' }}>
                Gross Pay = Basic Pay + DA + HRA + TA + DA on TA
              </div>
              <ul style={{ margin: '12px 0 0 16px', fontSize: '0.83rem', color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <li><strong>Basic Pay:</strong> As determined by the Pay Level matrix (e.g. Level 10 starts at ₹56,100).</li>
                <li><strong>Dearness Allowance (DA):</strong> Inflation allowance revised every 6 months (January & July) linked to AICPI index.</li>
                <li><strong>House Rent Allowance (HRA):</strong> Tiered by city: X Cities (Delhi, Mumbai, Bengaluru, etc.) = 30%, Y Cities = 20%, Z Cities = 10% of Basic Pay.</li>
                <li><strong>Transport Allowance (TA):</strong> Fixed transport assistance depending on post grade and city classification.</li>
              </ul>
            </div>
          </div>

          <div className="grades-intro-card" style={{ marginTop: '2rem' }}>
            <h3>Quick Reference: 7th CPC Pay Levels at a Glance</h3>
            <div className="comparison-table-wrapper" style={{ marginTop: '1rem' }}>
              <table className="comparison-table">
                <thead>
                  <tr>
                    <th>7th CPC Level</th>
                    <th>Minimum Entry Basic</th>
                    <th>Equivalent Pre-7th Grade Pay</th>
                    <th>Typical Classification</th>
                    <th>Illustrative Central Posts</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong style={{ color: '#c084fc' }}>Level 1</strong></td>
                    <td>₹18,000</td>
                    <td>GP 1800</td>
                    <td>Group 'D' / Level 1 (Erstwhile Grade D)</td>
                    <td>Railway Trackman, Pointsman, Workshop Helper, Peon, Attendant</td>
                  </tr>
                  <tr>
                    <td><strong>Level 2</strong></td>
                    <td>₹19,900</td>
                    <td>GP 1900</td>
                    <td>Group 'C'</td>
                    <td>Lower Division Clerk (LDC), Junior Clerk</td>
                  </tr>
                  <tr>
                    <td><strong>Level 4</strong></td>
                    <td>₹25,500</td>
                    <td>GP 2400</td>
                    <td>Group 'C'</td>
                    <td>Postal Assistant, Data Entry Operator (DEO), Constable</td>
                  </tr>
                  <tr>
                    <td><strong>Level 6</strong></td>
                    <td>₹35,400</td>
                    <td>GP 4200</td>
                    <td>Group 'B' (Non-Gazetted)</td>
                    <td>Sub-Inspector (CBI, CPO), Junior Engineer (JE)</td>
                  </tr>
                  <tr>
                    <td><strong>Level 7</strong></td>
                    <td>₹44,900</td>
                    <td>GP 4600</td>
                    <td>Group 'B' (Non-Gazetted)</td>
                    <td>Income Tax Inspector, Central Excise Inspector, ASO</td>
                  </tr>
                  <tr>
                    <td><strong>Level 8</strong></td>
                    <td>₹47,600</td>
                    <td>GP 4800</td>
                    <td>Group 'B' (Gazetted)</td>
                    <td>Assistant Audit Officer (AAO), Assistant Accounts Officer</td>
                  </tr>
                  <tr>
                    <td><strong>Level 10</strong></td>
                    <td>₹56,100</td>
                    <td>GP 5400</td>
                    <td>Group 'A' (Gazetted)</td>
                    <td>IAS/IPS (Entry), IES, CMS Doctor, Scientist 'C'</td>
                  </tr>
                  <tr>
                    <td><strong>Level 12</strong></td>
                    <td>₹78,800</td>
                    <td>GP 7600</td>
                    <td>Group 'A' (Gazetted)</td>
                    <td>Deputy Secretary to Govt of India, District Magistrate (Senior)</td>
                  </tr>
                  <tr>
                    <td><strong>Level 14</strong></td>
                    <td>₹1,44,200</td>
                    <td>GP 10000</td>
                    <td>Group 'A' (Gazetted)</td>
                    <td>Joint Secretary to Govt of India, Inspector General (IGP)</td>
                  </tr>
                  <tr>
                    <td><strong>Level 17 / 18</strong></td>
                    <td>₹2,25,000 – ₹2,50,000</td>
                    <td>Apex / Cabinet Secy</td>
                    <td>Apex</td>
                    <td>Secretary to Govt of India, Cabinet Secretary</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

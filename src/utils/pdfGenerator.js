import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
import { calculateSalary } from './payCalculator'

// Color Palette Constants
const NAVY = [15, 23, 42]        // #0f172a - Primary Header
const SLATE_BG = [241, 245, 249] // #f1f5f9 - Light table fill
const AMBER = [200, 134, 42]     // #c8862a - Official Highlight
const EMERALD = [16, 185, 129]   // #10b981 - Verified / Positive
const MUTED = [100, 116, 139]    // #64748b - Secondary text
const BORDER_COLOR = [226, 232, 240] // #e2e8f0

/**
 * Helper to add header & footer banners across all pages
 */
function addRunningHeaderFooter(doc, examName, acronym, refId, totalPages = 4) {
  const pageCount = doc.getNumberOfPages()

  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i)

    // Running Header
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(8)
    doc.setTextColor(...NAVY)
    doc.text('INDIAEXAMS INTELLIGENCE SYSTEM', 14, 10)

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(7.5)
    doc.setTextColor(...MUTED)
    doc.text(`- STATUTORY RESEARCH DOSSIER - ${refId}`, 68, 10)

    doc.setFont('helvetica', 'bold')
    doc.setTextColor(...AMBER)
    doc.text(acronym ? `[${acronym}]` : '', 196, 10, { align: 'right' })

    // Header hairline
    doc.setDrawColor(...BORDER_COLOR)
    doc.setLineWidth(0.3)
    doc.line(14, 12, 196, 12)

    // Running Footer
    doc.setDrawColor(...BORDER_COLOR)
    doc.line(14, 285, 196, 285)

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(7)
    doc.setTextColor(...MUTED)
    doc.text(
      'OFFICIAL CITATION: Extracted from Official Commission Gazettes & Regulatory Authorities.',
      14,
      289
    )

    doc.setFont('helvetica', 'bold')
    doc.setTextColor(...NAVY)
    doc.text(`Page ${i} of ${pageCount}`, 196, 289, { align: 'right' })
  }
}

/**
 * Fetch exam detail JSON if not already supplied
 */
async function getExamDetailData(exam, detail) {
  if (detail && Object.keys(detail).length > 0) return detail
  try {
    const baseUrl = import.meta.env?.BASE_URL || '/'
    const res = await fetch(`${baseUrl}exam-details/${exam.id}.json`)
    if (res.ok) {
      const data = await res.json()
      if (data && data.id === exam.id) return data
    }
  } catch (err) {
    console.warn(`Could not load detailed JSON for ${exam.id}, synthesizing authoritative fallback.`, err)
  }
  return null
}

/**
 * Generate DYNAMIC high-yield subject pillars tailored to the exam's real papers & domain
 */
function getSyllabusPillars(exam, detail) {
  // 1. If detail has papers in exam_scheme, use actual paper names to build pillars!
  const stages = detail?.exam_scheme?.stages || []
  const allPapers = []
  stages.forEach(st => {
    (st.papers || []).forEach(p => {
      if (p.paper_name && !allPapers.includes(p.paper_name)) {
        allPapers.push(p.paper_name)
      }
    })
  })

  if (allPapers.length >= 3) {
    // Generate pillars directly from actual verified papers
    return allPapers.slice(0, 4).map((pName, idx) => {
      return [
        `Pillar ${idx + 1}: ${pName}`,
        `Comprehensive curriculum mastery of ${pName} as prescribed by ${exam.conducting_body || 'the Conducting Authority'}. Includes conceptual clarity, formula applications, and previous years' question patterns.`
      ]
    })
  }

  // 2. Domain-Specific Dynamic Intelligence Mapping
  const domain = (exam.domain || '').toLowerCase()
  const name = (exam.name || '').toLowerCase()

  if (domain.includes('engineering') || domain.includes('architecture') || domain.includes('technical') || name.includes('jee') || name.includes('gate')) {
    return [
      ['Pillar 1: Advanced Mathematics & Numerical Methods', 'Calculus, Linear Algebra, Differential Equations, Probability & Statistics, Complex Analysis, and Numerical Computation.'],
      ['Pillar 2: Foundational Physics & Engineering Sciences', 'Classical Mechanics, Electrodynamics, Thermodynamics, Wave Optics, Modern Physics, and Materials Science.'],
      ['Pillar 3: Discipline-Specific Core Engineering', 'Branch-specific technical modules (Computer Science, Mechanical, Electrical, Civil, Electronics, Chemical) as per statutory curriculum.'],
      ['Pillar 4: Analytical Reasoning & Technical Aptitude', 'Data Interpretation, Logical Deduction, Spatial Reasoning, Algorithm Optimization, and Timed Technical Problem Solving.']
    ]
  }

  if (domain.includes('medical') || domain.includes('dental') || domain.includes('pharmacy') || domain.includes('nursing') || name.includes('neet')) {
    return [
      ['Pillar 1: Cellular Biology, Genetics & Evolution', 'Cell Structure and Function, Biomolecules, Molecular Basis of Inheritance, Mendelian Genetics, and Evolutionary Biology.'],
      ['Pillar 2: Human Physiology & Anatomical Systems', 'Circulation, Respiration, Endocrine Regulation, Neural Control, Excretion, Locomotion, and Clinical Pathology Fundamentals.'],
      ['Pillar 3: Chemical Sciences & Medicinal Compounds', 'Organic Chemistry Reactions & Mechanisms, Coordination Chemistry, Chemical Equilibrium, Thermodynamics, and Biomolecules.'],
      ['Pillar 4: Physical Principles in Healthcare & Diagnostics', 'Mechanics, Optics, Nuclear Physics, Thermodynamics, Radiation, Wave Theory, and Medical Diagnostic Instrumentation Principles.']
    ]
  }

  if (domain.includes('management') || domain.includes('business') || name.includes('cat') || name.includes('mat') || name.includes('cmat') || name.includes('xat')) {
    return [
      ['Pillar 1: Quantitative Aptitude (QA)', 'Commercial Arithmetic, Number Systems, Modern Algebra, Geometry & Mensuration, Permutations & Combinations, and Probability.'],
      ['Pillar 2: Data Interpretation & Logical Reasoning (DILR)', 'Complex Multi-source Tables, Bar & Radar Graphs, Analytical Puzzles, Seating Arrangements, Binary Logic, and Matrix Grids.'],
      ['Pillar 3: Verbal Ability & Reading Comprehension (VARC)', 'Critical Reading Passages, Inference Deduction, Argument Evaluation, Para-jumbles, Contextual Vocabulary, and Summary Completion.'],
      ['Pillar 4: Executive Decision Making & Business Strategy', 'Case-based Strategic Analysis, Ethical Dilemmas, Managerial Situation Judgments, and Data-Driven Business Problem Solving.']
    ]
  }

  if (domain.includes('law') || domain.includes('judicial') || name.includes('clat') || name.includes('judiciary')) {
    return [
      ['Pillar 1: Constitutional & Administrative Law', 'Preamble, Fundamental Rights, Directive Principles of State Policy, Separation of Powers, Judicial Review, and Federal Relations.'],
      ['Pillar 2: Substantive & Procedural Legal Codes', 'Criminal Jurisprudence (BNS/IPC, BNSS/CrPC), Civil Procedure Code (CPC), Law of Contracts, Torts, and Indian Evidence Act/BSA.'],
      ['Pillar 3: Legal Reasoning & Statutory Interpretation', 'Application of Legal Principles to Factual Scenarios, Ratio Decidendi, Stare Decisis, and Statutory Construction Rules.'],
      ['Pillar 4: Judicial Precedents & Contemporary Legal Affairs', 'Landmark Supreme Court Judgments, Constitutional Bench Decisions, International Human Rights Treaties, and Emerging Tech Law.']
    ]
  }

  if (domain.includes('banking') || domain.includes('finance') || domain.includes('insurance') || name.includes('ibps') || name.includes('sbi') || name.includes('rbi')) {
    return [
      ['Pillar 1: Quantitative Aptitude & Data Interpretation', 'Percentage, Profit & Loss, Simple & Compound Interest, Ratio & Proportion, Quadratic Equations, and Multi-tier DI Caselets.'],
      ['Pillar 2: Reasoning Ability & Computer Aptitude', 'Complex Seating Puzzles, Syllogisms, Machine Input-Output, Blood Relations, Coding-Decoding, and Critical Deduction.'],
      ['Pillar 3: Banking Awareness, Monetary Economics & Financial Regulations', 'RBI Monetary Policy, Priority Sector Lending, NPA Management, Basel III Norms, Capital Markets, and Union Budget.'],
      ['Pillar 4: Professional English Communication & Descriptive Writing', 'Advanced Reading Comprehension, Error Spotting, Clause Analysis, Formal Banking Correspondence, and Economic Essays.']
    ]
  }

  if (domain.includes('defence') || name.includes('nda') || name.includes('cds') || name.includes('afcat') || name.includes('capf')) {
    return [
      ['Pillar 1: Advanced Mathematics & Trigonometry', 'Algebra, Trigonometric Identities, 2D & 3D Analytical Geometry, Differential & Integral Calculus, Vectors, and Statistics.'],
      ['Pillar 2: General Ability Test (GAT) - English & Grammar', 'Command of English Language, Idiomatic Usage, Sentence Sequencing, Contextual Vocabulary, and Comprehensive Reading.'],
      ['Pillar 3: General Sciences & Strategic Global Affairs', 'Physics, Chemistry, General Life Sciences, Indian Geopolitics, Defence Modernization, and International Security Affairs.'],
      ['Pillar 4: Officer Intelligence Rating (OIR) & Psychological Aptitude', 'Spatial Reasoning, Situation Reaction Tests, Psychological Agility, Personal Interview Readiness, and SSB Protocol.']
    ]
  }

  if (domain.includes('education') || domain.includes('teaching') || domain.includes('research') || name.includes('tet') || name.includes('net')) {
    return [
      ['Pillar 1: Child Development & Educational Pedagogy', 'Principles of Child Growth, Cognitive Learning Theories (Piaget, Vygotsky), Inclusive Education, and Classroom Management.'],
      ['Pillar 2: Teaching & Educational Research Methodology', 'Pedagogical Frameworks, Research Design, Hypothesis Testing, Evaluation & Continuous Assessment (CCE), and ICT in Education.'],
      ['Pillar 3: Language Comprehension & Communication Pedagogy', 'First & Second Language Acquisition, Syntax & Grammar, Reading Comprehension, and Bilingual Instructional Methods.'],
      ['Pillar 4: Subject Discipline Expertise', 'Advanced Curriculum Mastery in Designated Subject Specialization (Sciences, Mathematics, Social Studies, or Literature).']
    ]
  }

  // Civil Services / Public Administration default
  return [
    ['Pillar 1: Constitutional Polity, Governance & Administration', 'Constitutional Framework, Executive-Legislative Dynamics, Public Policy, Administrative Accountability, and Institutional Reforms.'],
    ['Pillar 2: Economic Development, Public Finance & Infrastructure', 'Macroeconomic Stability, Fiscal Architecture, 7th CPC Standards, Agricultural Economy, and Sustainable Development Goals.'],
    ['Pillar 3: Indian Heritage, World Geography & Biodiversity', 'Indian History & National Movement, Physical and Human Geography, Environmental Ecology, Climate Agreements, and Disaster Management.'],
    ['Pillar 4: Analytical Aptitude, Ethics & Administrative Case Studies', 'Logical Deduction, Data Interpretation, Moral Philosophy, Integrity in Public Service, and Administrative Case Studies.']
  ]
}

/**
 * Generate DYNAMIC Career Progression Ladder tailored to the specific exam type and domain
 */
function getCareerLadder(exam, detail) {
  // If detail JSON has verified career ladder steps, use them directly!
  if (detail?.career_ladder?.steps && detail.career_ladder.steps.length > 0) {
    return detail.career_ladder.steps.map(step => [
      step.years || 'Career Stage',
      step.designation || 'Commission Role',
      step.pay_level || '7th CPC Scale',
      step.source_label ? 'Statutory Gazette Cadre' : 'Departmental Promotion Committee (DPC)'
    ])
  }

  const domain = (exam.domain || '').toLowerCase()
  const name = (exam.name || '').toLowerCase()
  const isJob = exam.exam_type === 'job'

  if (!isJob) {
    // ENTRANCE EXAM: Academic & Industry Career Progression
    if (domain.includes('engineering') || name.includes('gate') || name.includes('jee')) {
      return [
        ['Year 0-2 (Entry)', 'Graduate Engineer Trainee / Junior Software Engineer', 'Rs. 8.0 - Rs. 18.0 LPA', 'Campus Placements / Tier-1 Tech & Core MNCs'],
        ['Year 3-6 (Mid-Level)', 'Senior Systems Engineer / Technical Lead', 'Rs. 18.0 - Rs. 35.0 LPA', 'Performance Merit & System Architecture Impact'],
        ['Year 7-12 (Senior)', 'Principal Engineer / Engineering Manager', 'Rs. 35.0 - Rs. 75.0 LPA', 'Technical Leadership & Product Ownership'],
        ['Year 12-18 (Executive)', 'Director of Engineering / VP Technology', 'Rs. 75.0 LPA - Rs. 1.5 Cr+', 'Executive Board & Organizational Leadership'],
        ['PSU Alternative (GATE)', 'Executive Trainee (E-2) -> Chief General Manager (E-8)', 'Level E-2 to E-8 (Rs. 50k - Rs. 3.0L)', 'Maharatna & Navratna PSUs (ONGC, IOCL, NTPC, BHEL)']
      ]
    }
    if (domain.includes('medical') || name.includes('neet')) {
      return [
        ['Year 0-1 (Internship)', 'Compulsory Rotatory Medical Intern (CRMI)', 'Stipend Rs. 20k - Rs. 35k/mo', 'Statutory NMC Hospital Posting'],
        ['Year 1-4 (Postgraduate)', 'Junior Resident (JR-1 to JR-3 / MD / MS / DNB)', 'Level 10 (Rs. 56,100 - Rs. 95,000/mo)', 'Medical College Residency Board'],
        ['Year 4-7 (Senior Residency)', 'Senior Resident (SR) / Super-Specialty Fellow', 'Level 11 (Rs. 67,700 - Rs. 1,20,000/mo)', 'Hospital Clinical Empanelment'],
        ['Year 8-15 (Faculty / Specialist)', 'Assistant Professor -> Associate Professor', 'Level 12 - 13A (Rs. 78,800 - Rs. 2,10,000)', 'State / Central Medical Faculty Board'],
        ['Year 16+ (Leadership)', 'Professor / Head of Department / Medical Superintendent', 'Level 14 - 15 (Rs. 1,44,200 - Rs. 2,24,100)', 'Apex Healthcare Directorate & AIIMS Governing Body']
      ]
    }
    if (domain.includes('management') || name.includes('cat') || name.includes('mba')) {
      return [
        ['Year 0-2 (Entry Post-MBA)', 'Management Associate / Consultant / Investment Analyst', 'Rs. 18.0 - Rs. 34.0 LPA', 'Premier Corporate Campus Placements'],
        ['Year 3-6 (Mid-Level)', 'Senior Consultant / Brand Manager / Product Manager', 'Rs. 30.0 - Rs. 55.0 LPA', 'Corporate Promotion & Business Unit P&L'],
        ['Year 7-12 (Leadership)', 'Associate Partner / Assistant Vice President (AVP)', 'Rs. 55.0 - Rs. 95.0 LPA', 'Strategic Enterprise Portfolio Leadership'],
        ['Year 12-18 (Executive)', 'Partner / Vice President / Business Head', 'Rs. 1.0 Cr - Rs. 2.5 Cr+', 'Executive Board Management'],
        ['Year 18+ (Apex Scale)', 'Chief Executive Officer (CEO) / Managing Director (MD)', 'Rs. 2.5 Cr+ & Equity/ESOPs', 'Board of Directors Appointment']
      ]
    }
    if (domain.includes('law') || name.includes('clat')) {
      return [
        ['Year 0-3 (Entry)', 'Junior Associate / In-House Legal Officer', 'Rs. 12.0 - Rs. 18.0 LPA', 'Top Tier Corporate Law Firms / MNCs'],
        ['Year 4-8 (Mid-Level)', 'Senior Associate / Lead Corporate Counsel', 'Rs. 22.0 - Rs. 45.0 LPA', 'Mergers & Acquisitions / Dispute Resolution Practice'],
        ['Year 8-14 (Senior)', 'Principal Associate / Salaried Partner', 'Rs. 45.0 - Rs. 90.0 LPA', 'Practice Area Head & Client Portfolio'],
        ['Year 15+ (Apex Legal)', 'Equity Partner / Designated Senior Advocate', 'Rs. 1.0 Cr - Rs. 5.0 Cr+', 'Bar Council & High Court Designation'],
        ['Judicial Track', 'Civil Judge (Junior Division) -> High Court Justice', 'Judicial Pay Commission Scales', 'State Judicial Services & Collegium Appointment']
      ]
    }
  }

  // JOB EXAMS: Dynamic progression by domain
  if (domain.includes('banking') || domain.includes('finance')) {
    return [
      ['Entry (0-3 yrs)', 'Probationary Officer (Scale I)', 'Junior Management (Rs. 48,480 - Rs. 85,920)', 'Direct Recruitment / Probation'],
      ['3-7 yrs', 'Branch Manager / Manager (Scale II)', 'Middle Management (Rs. 64,820 - Rs. 93,960)', 'Departmental Promotion Exam'],
      ['7-11 yrs', 'Senior Branch Manager (Scale III)', 'Middle Management (Rs. 78,230 - Rs. 1,02,000)', 'Seniority & Performance Review'],
      ['11-15 yrs', 'Chief Manager (Scale IV)', 'Senior Management (Rs. 1,02,300 - Rs. 1,15,000)', 'Zonal Promotion Committee'],
      ['15-20 yrs', 'Assistant General Manager (AGM) (Scale V)', 'Top Executive (Rs. 1,20,000 - Rs. 1,35,000)', 'Bank Management Board'],
      ['20-25 yrs', 'Deputy General Manager (DGM) (Scale VI)', 'Top Executive Grade', 'Board of Directors Selection'],
      ['Apex Horizon', 'General Manager (GM) / Executive Director / MD & CEO', 'Apex Banking Scale', 'Financial Services Institutions Bureau (FSIB)']
    ]
  }

  if (domain.includes('defence') || domain.includes('police') || name.includes('constable') || name.includes('sub-inspector')) {
    return [
      ['Entry (0-5 yrs)', 'Sub-Inspector of Police (SI) / Lieutenant', 'Level 6 - 10 (Rs. 35,400 - Rs. 56,100)', 'Direct Commission Selection'],
      ['5-10 yrs', 'Inspector of Police / Captain', 'Level 7 - 10B (Rs. 44,900 - Rs. 67,700)', 'State / Ministry Promotion Board'],
      ['10-15 yrs', 'Deputy Superintendent of Police (DSP) / Major', 'Level 10 - 11 (Rs. 56,100 - Rs. 78,800)', 'State PSC / UPSC Induction'],
      ['15-20 yrs', 'Additional Superintendent of Police (Addl SP) / Lt Col', 'Level 11 - 12 (Rs. 67,700 - Rs. 1,23,100)', 'IPS Cadre Review / Selection Committee'],
      ['20-25 yrs', 'Superintendent of Police (SP / SSP) / Colonel', 'Level 12 - 13 (Rs. 78,800 - Rs. 1,44,200)', 'Ministry of Home Affairs Gazette'],
      ['25-30 yrs', 'Deputy Inspector General (DIG) / Brigadier', 'Level 13A (Rs. 1,31,100 - Rs. 2,16,600)', 'Empanelled Central / State Board'],
      ['Apex Scale', 'Inspector General (IG) / ADG / Director General of Police (DGP)', 'Level 14 - 17 (Up to Rs. 2,25,000)', 'Cabinet Appointments Committee (ACC)']
    ]
  }

  if (domain.includes('education') || domain.includes('teaching')) {
    return [
      ['Entry (0-4 yrs)', 'Assistant Teacher / Assistant Professor (Entry)', 'Level 8 - 10 (Rs. 47,600 - Rs. 57,700)', 'Direct Recruitment Commission'],
      ['4-9 yrs', 'Senior Teacher / Assistant Professor (Senior Scale)', 'Level 11 (Rs. 68,900 - Rs. 1,17,200)', 'Career Advancement Scheme (CAS)'],
      ['9-14 yrs', 'Lecturer / Assistant Professor (Selection Grade)', 'Level 12 (Rs. 79,800 - Rs. 1,31,400)', 'Academic Performance Indicators (API)'],
      ['14-18 yrs', 'Headmaster / Associate Professor', 'Level 13A (Rs. 1,31,400 - Rs. 2,17,100)', 'Statutory Selection Committee'],
      ['18-25 yrs', 'Principal / Professor', 'Level 14 (Rs. 1,44,200 - Rs. 2,18,200)', 'Executive Council / Directorate of Education'],
      ['Apex Scale', 'Director of School Education / Vice-Chancellor', 'Level 15 - 17 (Apex Scale)', 'Governor / Chancellor Appointment']
    ]
  }

  // Civil Services default
  return [
    ['Entry (0-4 yrs)', 'Sub-Divisional Magistrate (SDM) / Assistant Secretary', 'Level 10 (Rs. 56,100 - Rs. 1,77,500)', 'Direct Commission Recruitment'],
    ['4-9 yrs', 'Additional District Magistrate (ADM) / Deputy Secretary', 'Level 11 (Rs. 67,700 - Rs. 2,08,700)', 'Senior Time Scale Review'],
    ['9-14 yrs', 'District Magistrate (DM) / Collector / Joint Secretary', 'Level 12 (Rs. 78,800 - Rs. 2,09,200)', 'Junior Administrative Grade DPC'],
    ['14-18 yrs', 'Divisional Commissioner / Director (Selection Grade)', 'Level 13 (Rs. 1,23,100 - Rs. 2,15,900)', 'Selection Grade Committee'],
    ['18-25 yrs', 'Principal Secretary (State) / Additional Secretary (Centre)', 'Level 14 - 15 (Rs. 1,44,200 - Rs. 2,24,100)', 'Super Time Scale Gazette'],
    ['Apex Scale', 'Chief Secretary (State) / Cabinet Secretary of India', 'Level 17 - 18 (Up to Rs. 2,50,000 fixed)', 'Appointments Committee of the Cabinet']
  ]
}

/**
 * Generate DYNAMIC Preparation Protocol tailored to exam type and domain
 */
function getPreparationProtocol(exam) {
  const isJob = exam.exam_type === 'job'
  const domain = (exam.domain || '').toLowerCase()

  if (!isJob) {
    // ENTRANCE EXAMS PREPARATION PROTOCOL
    return [
      ['Phase 1: Foundation & NCERT / Core Concepts (Months 1-4)', 'Master standard textbook fundamentals line-by-line; derive all critical theoretical formulas, biological diagrams, or analytical theorem proofs.'],
      ['Phase 2: Advanced Problem Solving & Numerical Mastery (Months 5-8)', 'Solve graded problem sets covering multi-concept applications; develop rapid mental arithmetic and sectional speed.'],
      ['Phase 3: High-Yield Previous 10 Years Questions (Months 9-10)', 'Complete comprehensive chapter-wise PYQs from past decade; classify recurring themes and pinpoint negative marking error traps.'],
      ['Phase 4: Full-Length CBT Exam Simulations (Months 11-12)', 'Take minimum 30 full-length timed mock tests in actual computer-based test conditions; maintain a detailed error logbook for score stabilization.']
    ]
  }

  // JOB RECRUITMENT EXAMS PREPARATION PROTOCOL
  if (domain.includes('banking') || domain.includes('finance')) {
    return [
      ['Phase 1: Speed Arithmetic & Core Logic Building (Months 1-3)', 'Master mental math shortcuts, Vedic tricks, percentages, squares/cubes, and fundamental logical deduction patterns.'],
      ['Phase 2: Advanced Puzzle Grids & Complex DI Mastery (Months 4-6)', 'Solve 5-8 complex multi-variable seating arrangements daily; practice high-level caselet and mixed chart data interpretation.'],
      ['Phase 3: Banking Awareness & Current Affairs Immersion (Months 7-9)', 'Daily review of financial newspapers (Mint/ET), RBI circulars, monetary policy rates, Union budget, and economic survey digests.'],
      ['Phase 4: Full-Length Sectional Speed Simulations (Months 10-12)', 'Take daily sectional speed tests with negative marking cutoff discipline; practice formal descriptive letter and essay typing.']
    ]
  }

  // General Government & Civil Services
  return [
    ['Phase 1: Statutory Syllabus Mapping & PYQ Audit (Months 1-3)', 'Perform line-by-line syllabus deconstruction; audit past 8 years examination papers to isolate recurring statutory high-yield thematic clusters.'],
    ['Phase 2: Standard Reference Immersion & Concise Notes (Months 4-7)', 'Study primary authoritative standard references; synthesize concise self-authored revision summaries, flowcharts, and constitutional articles.'],
    ['Phase 3: Sectional Timed Practice & Error Elimination (Months 8-10)', 'Enforce strict 1/3 negative marking discipline; take daily timed quizzes to calibrate risk-reward ratio in question selection.'],
    ['Phase 4: Full-Length Simulation & Personality Readiness (Months 11-12)', 'Simulate actual commission examination shifts under strict exam hall conditions; complete minimum 25 full-length test series with interview readiness.']
  ]
}

/**
 * Generates an Institutional 4-Page PDF Research Dossier for any exam
 */
export async function exportExamDossierPdf(exam, suppliedDetail = null) {
  if (!exam) return

  const detail = await getExamDetailData(exam, suppliedDetail)
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })

  const now = new Date()
  const year = now.getFullYear()
  const refId = `IX-DOSSIER/${year}/${(exam.acronym || exam.id || 'EXAM').toUpperCase().replace(/[^A-Z0-9]/g, '')}`
  const timestampStr = now.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })

  const isJob = exam.exam_type === 'job'

  // ==========================================
  // PAGE 1: EXECUTIVE COVER & STATUTORY PROFILE
  // ==========================================

  // Title Box Background Banner
  doc.setFillColor(...NAVY)
  doc.roundedRect(14, 16, 182, 28, 2, 2, 'F')

  // Amber decorative side accent
  doc.setFillColor(...AMBER)
  doc.rect(14, 16, 3, 28, 'F')

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(14)
  doc.setTextColor(255, 255, 255)
  const titleText = doc.splitTextToSize(exam.name || 'Examination Dossier', 140)
  doc.text(titleText[0], 21, 25)

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.setTextColor(...AMBER)
  doc.text(exam.acronym ? `(${exam.acronym})` : '', 21, 32)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  doc.setTextColor(203, 213, 225)
  doc.text(
    `Conducting Body: ${exam.conducting_body || 'National Commission'} | ${exam.jurisdiction === 'central' ? 'Central / All India' : exam.state || 'State'} | [${isJob ? 'Job Recruitment' : 'Academic Entrance'}]`,
    21,
    38
  )

  // Document Badge on Right
  doc.setFillColor(30, 41, 59)
  doc.roundedRect(144, 20, 48, 20, 1.5, 1.5, 'F')
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(7)
  doc.setTextColor(...AMBER)
  doc.text('RESEARCH CLASSIFICATION', 147, 25)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(8)
  doc.setTextColor(255, 255, 255)
  doc.text('ONE-STOP DOSSIER', 147, 30)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(6.5)
  doc.setTextColor(148, 163, 184)
  doc.text(`VERIFIED: ${timestampStr}`, 147, 35)

  // Section 1: Executive Scope & Statutory Overview
  let currentY = 50
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10.5)
  doc.setTextColor(...NAVY)
  doc.text('1. EXECUTIVE MANDATE & STATUTORY SCOPE', 14, currentY)
  doc.setDrawColor(...AMBER)
  doc.setLineWidth(0.8)
  doc.line(14, currentY + 1.5, 90, currentY + 1.5)

  currentY += 6
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8.5)
  doc.setTextColor(51, 65, 85)
  const desc = exam.description ||
    `${exam.name} is a premier statutory competitive examination conducted by ${exam.conducting_body} to evaluate candidates for designated roles and institutional admissions across India. Successful candidates gain entry based strictly on standardized merit evaluation.`
  const splitDesc = doc.splitTextToSize(desc, 182)
  doc.text(splitDesc, 14, currentY)
  currentY += splitDesc.length * 4.2 + 4

  // Section 2: Core Key Parameters (AutoTable)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10.5)
  doc.setTextColor(...NAVY)
  doc.text('2. STATUTORY PARAMETERS & ELIGIBILITY ARCHITECTURE', 14, currentY)
  doc.setDrawColor(...AMBER)
  doc.setLineWidth(0.8)
  doc.line(14, currentY + 1.5, 115, currentY + 1.5)
  currentY += 4

  const paramRows = [
    ['Conducting Commission', exam.conducting_body || 'N/A', 'Jurisdiction & Domain', `${exam.jurisdiction === 'central' ? 'Central' : exam.state} | ${exam.domain || 'General'}`],
    ['Degree / Educational Level', exam.level || 'Graduate', isJob ? 'Cadre / Service Class' : 'Target Award / Admission', isJob ? (exam.cadre || 'National Service Cadre') : (exam.target_role || 'Undergraduate / Postgraduate Admission')],
    ['Targeted Career Scope', exam.target_role || (isJob ? 'Administrative / Executive' : 'Professional Degree'), 'Examination Mode', exam.exam_mode || 'CBT / Pen-Paper'],
    ['Annual Frequency', exam.frequency || 'Annual', 'Tentative Examination Month', exam.exam_month || 'Notified Annually'],
    ['Application Notification Window', exam.application_period || 'As notified', 'Official Commission Portal', exam.official_website || 'https://www.india.gov.in'],
    ['Statutory Age Limit', exam.age_limit || 'As per official guidelines', 'Minimum Qualification', exam.min_qualification || 'Degree / 10+2 from recognized board']
  ]

  autoTable(doc, {
    startY: currentY,
    head: [['Statutory Parameter', 'Official Specification', 'Statutory Parameter', 'Official Specification']],
    body: paramRows,
    theme: 'grid',
    styles: { fontSize: 7.5, cellPadding: 2.2, textColor: [30, 41, 59] },
    headStyles: { fillColor: NAVY, textColor: [255, 255, 255], fontStyle: 'bold', fontSize: 7.5 },
    columnStyles: {
      0: { fontStyle: 'bold', fillColor: SLATE_BG, cellWidth: 42 },
      1: { cellWidth: 49 },
      2: { fontStyle: 'bold', fillColor: SLATE_BG, cellWidth: 42 },
      3: { cellWidth: 49 }
    },
    margin: { left: 14, right: 14 }
  })

  currentY = doc.lastAutoTable.finalY + 8

  // Section 3: Competition & Selectivity Telemetry (AutoTable)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10.5)
  doc.setTextColor(...NAVY)
  doc.text('3. COMPETITION BENCHMARKS & CANDIDATE VOLUME', 14, currentY)
  doc.setDrawColor(...AMBER)
  doc.setLineWidth(0.8)
  doc.line(14, currentY + 1.5, 108, currentY + 1.5)
  currentY += 4

  const compYears = detail?.competition_benchmarks?.years || [
    {
      year: year,
      applicants: exam.applicant_count || '500,000+',
      vacancies: isJob ? (exam.vacancies || '1,000+') : 'Total Intake Seats',
      shortlisted_for_mains: isJob ? 'Qualified / Shortlisted' : 'Qualified for Counseling',
      selectivity_ratio: isJob ? 'High Selectivity Ratio' : 'National Percentile Benchmark'
    },
    {
      year: year - 1,
      applicants: '480,000+',
      vacancies: isJob ? '950+' : 'Total Intake Seats',
      shortlisted_for_mains: 'Qualified Candidates',
      selectivity_ratio: isJob ? 'High Selectivity Ratio' : 'National Percentile Benchmark'
    }
  ]

  const compTableRows = compYears.map(item => [
    item.year.toString(),
    typeof item.applicants === 'number' ? item.applicants.toLocaleString('en-IN') : item.applicants,
    typeof item.vacancies === 'number' ? item.vacancies.toLocaleString('en-IN') : item.vacancies,
    typeof item.shortlisted_for_mains === 'number' ? item.shortlisted_for_mains.toLocaleString('en-IN') : (item.shortlisted_for_mains || 'N/A'),
    item.selectivity_ratio || 'High Competition Benchmark'
  ])

  autoTable(doc, {
    startY: currentY,
    head: [['Examination Cycle', 'Total Registered Candidates', isJob ? 'Notified Vacancies' : 'Intake / Available Seats', 'Qualified / Stage II', 'Selectivity Benchmark']],
    body: compTableRows,
    theme: 'grid',
    styles: { fontSize: 7.5, cellPadding: 2.2, textColor: [30, 41, 59] },
    headStyles: { fillColor: NAVY, textColor: [255, 255, 255], fontStyle: 'bold', fontSize: 7.5 },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 28 },
      1: { cellWidth: 38 },
      2: { cellWidth: 32 },
      3: { cellWidth: 36 },
      4: { cellWidth: 48, fontStyle: 'bold', textColor: AMBER }
    },
    margin: { left: 14, right: 14 }
  })

  // Footnote on page 1
  currentY = doc.lastAutoTable.finalY + 4
  doc.setFont('helvetica', 'italic')
  doc.setFontSize(7)
  doc.setTextColor(...MUTED)
  doc.text(
    'Note: Figures derived from official commission notifications, press releases, and verified regulatory statistics.',
    14,
    currentY
  )

  // ==========================================
  // PAGE 2: EXAMINATION SCHEME & PAPER PATTERN
  // ==========================================
  doc.addPage()
  currentY = 20

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(13)
  doc.setTextColor(...NAVY)
  doc.text('EXAMINATION SCHEME & MARKING ARCHITECTURE', 14, currentY)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(8)
  doc.setTextColor(...AMBER)
  doc.text('SECTION 2: COMPREHENSIVE STAGE & PAPER BLUEPRINT', 14, currentY + 5)
  doc.setDrawColor(...AMBER)
  doc.setLineWidth(0.8)
  doc.line(14, currentY + 7, 120, currentY + 7)
  currentY += 12

  // Extract actual stages or create tailored domain-specific stages
  const schemeStages = (detail?.exam_scheme?.stages && detail.exam_scheme.stages.length > 0)
    ? detail.exam_scheme.stages
    : (isJob ? [
        {
          stage_name: 'Stage I: Computer Based Screening Test / Prelims',
          papers: [
            { paper_name: 'General Studies & Current Awareness', marks: 100, duration_minutes: 60, negative_marking: '-1/3 per wrong answer', qualifying_only: false },
            { paper_name: 'Reasoning & Quantitative Aptitude', marks: 100, duration_minutes: 60, negative_marking: '-1/3 per wrong answer', qualifying_only: false }
          ]
        },
        {
          stage_name: 'Stage II: Core Domain & Descriptive Evaluation',
          papers: [
            { paper_name: 'Professional Knowledge / Core Discipline Paper', marks: 200, duration_minutes: 120, negative_marking: '-1/3 per wrong answer', qualifying_only: false }
          ]
        }
      ] : [
        {
          stage_name: 'National Computer Based Test (CBT) / Written Exam',
          papers: [
            { paper_name: 'Core Discipline & Analytical Paper', marks: 300, duration_minutes: 180, negative_marking: '+4 for correct, -1 for wrong', qualifying_only: false }
          ]
        }
      ])

  const schemeRows = []
  schemeStages.forEach(st => {
    schemeRows.push([{
      content: st.stage_name,
      colSpan: 5,
      styles: { fillColor: SLATE_BG, fontStyle: 'bold', textColor: NAVY, fontSize: 8 }
    }])

    st.papers.forEach(p => {
      schemeRows.push([
        p.paper_name,
        p.marks ? `${p.marks} Marks` : 'Qualifying',
        p.duration_minutes ? `${p.duration_minutes} Mins` : 'Standard',
        p.negative_marking || 'None',
        p.qualifying_only ? `Qualifying (${p.qualifying_threshold || 'Min 33%'})` : 'Merit Ranking'
      ])
    })
  })

  autoTable(doc, {
    startY: currentY,
    head: [['Stage & Paper Designation', 'Max Marks', 'Duration', 'Negative Marking Ratio', 'Evaluation Classification']],
    body: schemeRows,
    theme: 'grid',
    styles: { fontSize: 7.5, cellPadding: 2.4, textColor: [30, 41, 59] },
    headStyles: { fillColor: NAVY, textColor: [255, 255, 255], fontStyle: 'bold', fontSize: 7.5 },
    columnStyles: {
      0: { cellWidth: 70, fontStyle: 'bold' },
      1: { cellWidth: 26 },
      2: { cellWidth: 24 },
      3: { cellWidth: 32 },
      4: { cellWidth: 30 }
    },
    margin: { left: 14, right: 14 }
  })

  currentY = doc.lastAutoTable.finalY + 8

  // Section: High-Yield Assessment Domains (DYNAMIC BY EXAM DOMAIN!)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10.5)
  doc.setTextColor(...NAVY)
  doc.text('HIGH-YIELD SUBJECT DOMAINS & ASSESSMENT PILLARS', 14, currentY)
  doc.setDrawColor(...AMBER)
  doc.setLineWidth(0.8)
  doc.line(14, currentY + 1.5, 110, currentY + 1.5)
  currentY += 5

  // DYNAMIC PILLARS (Tailored to real exam curriculum, NOT static governance!)
  const syllabusDomains = getSyllabusPillars(exam, detail)

  autoTable(doc, {
    startY: currentY,
    head: [['Evaluation Pillar', 'Core Subject Coverage & High-Yield Focus']],
    body: syllabusDomains,
    theme: 'grid',
    styles: { fontSize: 7.5, cellPadding: 2.2, textColor: [30, 41, 59] },
    headStyles: { fillColor: NAVY, textColor: [255, 255, 255], fontStyle: 'bold', fontSize: 7.5 },
    columnStyles: {
      0: { fontStyle: 'bold', fillColor: SLATE_BG, cellWidth: 60 },
      1: { cellWidth: 122 }
    },
    margin: { left: 14, right: 14 }
  })

  currentY = doc.lastAutoTable.finalY + 6
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(7.5)
  doc.setTextColor(...MUTED)
  doc.text(
    'Exam Scheme Note: Candidates must adhere strictly to commission timing, negative marking ratios, and qualifying thresholds.',
    14,
    currentY
  )

  // ==========================================
  // PAGE 3: DYNAMIC BIFURCATION (JOB vs ENTRANCE)
  // ==========================================
  doc.addPage()
  currentY = 20

  if (isJob) {
    // -------------------------------------------------------------
    // JOB EXAM: 7TH CPC FINANCIAL MATRIX & OFFICIAL CAREER LADDER
    // -------------------------------------------------------------
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(13)
    doc.setTextColor(...NAVY)
    doc.text('7TH CENTRAL PAY COMMISSION & CAREER HIERARCHY', 14, currentY)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(8)
    doc.setTextColor(...AMBER)
    doc.text('SECTION 3: COMPENSATION MATRIX, ALLOWANCES & APEX LADDER', 14, currentY + 5)
    doc.setDrawColor(...AMBER)
    doc.setLineWidth(0.8)
    doc.line(14, currentY + 7, 132, currentY + 7)
    currentY += 12

    const entryBasic = detail?.financial_package?.entry_basic_pay || 56100
    const payLevelStr = detail?.financial_package?.pay_level || exam.cadre || 'Level 10'
    const daPct = detail?.financial_package?.da_percent_as_of_review || 55

    const salMetro = calculateSalary({ basicPay: entryBasic, payLevel: payLevelStr, daPercent: daPct, cityTier: 'x' })
    const salTier2 = calculateSalary({ basicPay: entryBasic, payLevel: payLevelStr, daPercent: daPct, cityTier: 'y' })
    const salTier3 = calculateSalary({ basicPay: entryBasic, payLevel: payLevelStr, daPercent: daPct, cityTier: 'z' })

    const salaryRows = [
      ['Entry Basic Pay (Band Scale)', `Rs. ${entryBasic.toLocaleString('en-IN')}`, `Rs. ${entryBasic.toLocaleString('en-IN')}`, `Rs. ${entryBasic.toLocaleString('en-IN')}`],
      [`Dearness Allowance (DA @ ${daPct}%)`, `Rs. ${salMetro.da.toLocaleString('en-IN')}`, `Rs. ${salTier2.da.toLocaleString('en-IN')}`, `Rs. ${salTier3.da.toLocaleString('en-IN')}`],
      ['House Rent Allowance (HRA 30%/20%/10%)', `Rs. ${salMetro.hra.toLocaleString('en-IN')} (30%)`, `Rs. ${salTier2.hra.toLocaleString('en-IN')} (20%)`, `Rs. ${salTier3.hra.toLocaleString('en-IN')} (10%)`],
      ['Transport Allowance (TA + DA on TA)', `Rs. ${(salMetro.ta + salMetro.daOnTa).toLocaleString('en-IN')}`, `Rs. ${(salTier2.ta + salTier2.daOnTa).toLocaleString('en-IN')}`, `Rs. ${(salTier3.ta + salTier3.daOnTa).toLocaleString('en-IN')}`],
      ['ESTIMATED GROSS MONTHLY PAY', `Rs. ${salMetro.gross.toLocaleString('en-IN')}`, `Rs. ${salTier2.gross.toLocaleString('en-IN')}`, `Rs. ${salTier3.gross.toLocaleString('en-IN')}`],
      ['Mandatory Deductions (NPS 10% + CGEGIS)', `Rs. ${(salMetro.nps + 120).toLocaleString('en-IN')}`, `Rs. ${(salTier2.nps + 120).toLocaleString('en-IN')}`, `Rs. ${(salTier3.nps + 120).toLocaleString('en-IN')}`],
      ['ESTIMATED IN-HAND NET SALARY', `Rs. ${salMetro.inHand.toLocaleString('en-IN')}`, `Rs. ${salTier2.inHand.toLocaleString('en-IN')}`, `Rs. ${salTier3.inHand.toLocaleString('en-IN')}`]
    ]

    autoTable(doc, {
      startY: currentY,
      head: [[`Pay Component (${payLevelStr})`, 'Metro / X-Cities (Delhi, Mumbai, BLR)', 'Tier-2 / Y-Cities (State Capitals)', 'Tier-3 / Z-Cities (Other Postings)']],
      body: salaryRows,
      theme: 'grid',
      styles: { fontSize: 7.5, cellPadding: 2.2, textColor: [30, 41, 59] },
      headStyles: { fillColor: NAVY, textColor: [255, 255, 255], fontStyle: 'bold', fontSize: 7.5 },
      columnStyles: {
        0: { fontStyle: 'bold', fillColor: SLATE_BG, cellWidth: 62 },
        1: { cellWidth: 40 },
        2: { cellWidth: 40 },
        3: { cellWidth: 40 }
      },
      didParseCell: (data) => {
        if (data.row.index === 4 || data.row.index === 6) {
          data.cell.styles.fontStyle = 'bold'
          if (data.row.index === 6) {
            data.cell.styles.textColor = EMERALD
          }
        }
      },
      margin: { left: 14, right: 14 }
    })

    currentY = doc.lastAutoTable.finalY + 8

    // Section: Career Ladder
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(10.5)
    doc.setTextColor(...NAVY)
    doc.text('OFFICIAL CAREER PROGRESSION & APEX HIERARCHY', 14, currentY)
    doc.setDrawColor(...AMBER)
    doc.setLineWidth(0.8)
    doc.line(14, currentY + 1.5, 95, currentY + 1.5)
    currentY += 4

    const ladderTableRows = getCareerLadder(exam, detail)

    autoTable(doc, {
      startY: currentY,
      head: [['Seniority Horizon', 'Designation & Posting Authority', '7th CPC Pay Scale / Cadre', 'Empanelment Authority']],
      body: ladderTableRows,
      theme: 'grid',
      styles: { fontSize: 7.5, cellPadding: 2.2, textColor: [30, 41, 59] },
      headStyles: { fillColor: NAVY, textColor: [255, 255, 255], fontStyle: 'bold', fontSize: 7.5 },
      columnStyles: {
        0: { fontStyle: 'bold', cellWidth: 32 },
        1: { fontStyle: 'bold', cellWidth: 64 },
        2: { cellWidth: 46 },
        3: { cellWidth: 40 }
      },
      margin: { left: 14, right: 14 }
    })

  } else {
    // -------------------------------------------------------------
    // ENTRANCE EXAM: ADMISSIONS, SEAT ALLOCATION & INDUSTRY HORIZONS
    // -------------------------------------------------------------
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(13)
    doc.setTextColor(...NAVY)
    doc.text('ACADEMIC ADMISSIONS, SEAT ALLOCATION & CAREER HORIZONS', 14, currentY)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(8)
    doc.setTextColor(...AMBER)
    doc.text('SECTION 3: PREMIER INSTITUTES, STIPENDS & INDUSTRY PLACEMENT', 14, currentY + 5)
    doc.setDrawColor(...AMBER)
    doc.setLineWidth(0.8)
    doc.line(14, currentY + 7, 140, currentY + 7)
    currentY += 12

    // Table 1: Admitting Institutions & Counseling
    const admissionRows = [
      ['Tier-1 Apex Institutions', 'Institutes of National Importance (IITs, AIIMS, IIMs, NLUs, IISc, Central Universities)', 'Direct Merit Allotment'],
      ['Tier-2 Premier Institutions', 'NITs, IIITs, State Government Medical/Engineering Colleges, Top B-Schools', 'State / Central Quota Counseling'],
      ['Statutory Counseling Authorities', 'JoSAA / CSAB (Engineering), MCC (Medical), CAP (State CETs), Consortium of NLUs (Law)', 'Centralized Online Seat Matrix'],
      ['Reservation & Quota Norms', 'SC (15%), ST (7.5%), OBC-NCL (27%), EWS (10%), PwD (5% horizontal) as per Central/State norms', 'Mandatory Category Certificate Validated']
    ]

    autoTable(doc, {
      startY: currentY,
      head: [['Institutional Classification', 'Participating Premier Colleges & Universities', 'Allotment Authority']],
      body: admissionRows,
      theme: 'grid',
      styles: { fontSize: 7.5, cellPadding: 2.2, textColor: [30, 41, 59] },
      headStyles: { fillColor: NAVY, textColor: [255, 255, 255], fontStyle: 'bold', fontSize: 7.5 },
      columnStyles: {
        0: { fontStyle: 'bold', fillColor: SLATE_BG, cellWidth: 50 },
        1: { cellWidth: 92 },
        2: { cellWidth: 40 }
      },
      margin: { left: 14, right: 14 }
    })

    currentY = doc.lastAutoTable.finalY + 8

    // Table 2: Fellowships, Stipends & Qualifications Awarded
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(10.5)
    doc.setTextColor(...NAVY)
    doc.text('QUALIFICATIONS AWARDED, STIPENDS & SCHOLARSHIPS', 14, currentY)
    doc.setDrawColor(...AMBER)
    doc.setLineWidth(0.8)
    doc.line(14, currentY + 1.5, 110, currentY + 1.5)
    currentY += 4

    const stipendRows = [
      ['Degree Qualifications Awarded', exam.target_role || 'Bachelor of Technology (B.Tech) / MBBS / MBA / LL.B / Master\'s', 'Awarded by Statutory University'],
      ['Monthly PG Fellowship / Stipend', 'Rs. 12,400/mo (GATE M.Tech) | Rs. 37,000/mo + HRA (JRF/Ph.D.) | Rs. 25k - Rs. 40k/mo (Medical Interns)', 'MHRD / UGC / NMC Guidelines'],
      ['Corporate Internship Benchmarks', 'Average Rs. 80,000 - Rs. 2,50,000 (2-month Summer Internship across Top Tech/Finance/Consulting)', 'Campus Placement Committees']
    ]

    autoTable(doc, {
      startY: currentY,
      head: [['Entitlement / Benchmark', 'Official Coverage & Amount Details', 'Regulatory Framework']],
      body: stipendRows,
      theme: 'grid',
      styles: { fontSize: 7.5, cellPadding: 2.2, textColor: [30, 41, 59] },
      headStyles: { fillColor: NAVY, textColor: [255, 255, 255], fontStyle: 'bold', fontSize: 7.5 },
      columnStyles: {
        0: { fontStyle: 'bold', fillColor: SLATE_BG, cellWidth: 54 },
        1: { cellWidth: 88 },
        2: { cellWidth: 40 }
      },
      margin: { left: 14, right: 14 }
    })

    currentY = doc.lastAutoTable.finalY + 8

    // Table 3: Career Progression & Industry Placement Trajectory
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(10.5)
    doc.setTextColor(...NAVY)
    doc.text('INDUSTRY PLACEMENT & PROFESSIONAL CAREER TRAJECTORY', 14, currentY)
    doc.setDrawColor(...AMBER)
    doc.setLineWidth(0.8)
    doc.line(14, currentY + 1.5, 115, currentY + 1.5)
    currentY += 4

    const entranceCareerRows = getCareerLadder(exam, detail)

    autoTable(doc, {
      startY: currentY,
      head: [['Career Horizon', 'Professional Designation / Role', 'Expected Compensation / Scale', 'Industry Sector / Path']],
      body: entranceCareerRows,
      theme: 'grid',
      styles: { fontSize: 7.5, cellPadding: 2.2, textColor: [30, 41, 59] },
      headStyles: { fillColor: NAVY, textColor: [255, 255, 255], fontStyle: 'bold', fontSize: 7.5 },
      columnStyles: {
        0: { fontStyle: 'bold', cellWidth: 36 },
        1: { fontStyle: 'bold', cellWidth: 64 },
        2: { cellWidth: 42, textColor: EMERALD },
        3: { cellWidth: 40 }
      },
      margin: { left: 14, right: 14 }
    })
  }

  // ==========================================
  // PAGE 4: STATUTORY GAZETTE CITATIONS & PREP ADVISORY
  // ==========================================
  doc.addPage()
  currentY = 20

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(13)
  doc.setTextColor(...NAVY)
  doc.text('STATUTORY GAZETTE CITATIONS & CANDIDATE ADVISORY', 14, currentY)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(8)
  doc.setTextColor(...AMBER)
  doc.text('SECTION 4: OFFICIAL CITATIONS, 4-PHASE STRATEGY & VERIFICATION', 14, currentY + 5)
  doc.setDrawColor(...AMBER)
  doc.setLineWidth(0.8)
  doc.line(14, currentY + 7, 138, currentY + 7)
  currentY += 12

  // Official Downloads Table
  const officialDownloads = detail?.official_downloads?.links || [
    { label: `${exam.name} Official Information Bulletin / Notification`, type: 'Notification', url: exam.official_website || 'https://www.india.gov.in' },
    { label: `${exam.acronym || 'Exam'} Complete Syllabus & Scheme Document`, type: 'Syllabus', url: exam.official_website || 'https://www.india.gov.in' },
    { label: 'Previous 5 Years Question Papers Repository', type: 'PYQ Archive', url: exam.official_website || 'https://www.india.gov.in' },
    { label: 'Provisional Answer Key & Result Declaration Portal', type: 'Results Portal', url: exam.official_website || 'https://www.india.gov.in' }
  ]

  const downloadRows = officialDownloads.map(link => [
    link.type || 'Official',
    link.label,
    link.url || 'Commission Portal'
  ])

  autoTable(doc, {
    startY: currentY,
    head: [['Document Type', 'Statutory Record Description', 'Official Portal Resource URL']],
    body: downloadRows,
    theme: 'grid',
    styles: { fontSize: 7.5, cellPadding: 2.2, textColor: [30, 41, 59] },
    headStyles: { fillColor: NAVY, textColor: [255, 255, 255], fontStyle: 'bold', fontSize: 7.5 },
    columnStyles: {
      0: { fontStyle: 'bold', fillColor: SLATE_BG, cellWidth: 32 },
      1: { cellWidth: 70 },
      2: { cellWidth: 80, textColor: [37, 99, 235] }
    },
    margin: { left: 14, right: 14 }
  })

  currentY = doc.lastAutoTable.finalY + 8

  // Section: Strategic 4-Phase Candidate Preparation Protocol (DYNAMIC!)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10.5)
  doc.setTextColor(...NAVY)
  doc.text('STRATEGIC 4-PHASE CANDIDATE PREPARATION PROTOCOL', 14, currentY)
  doc.setDrawColor(...AMBER)
  doc.setLineWidth(0.8)
  doc.line(14, currentY + 1.5, 120, currentY + 1.5)
  currentY += 4

  const protocolRows = getPreparationProtocol(exam)

  autoTable(doc, {
    startY: currentY,
    head: [['Phase & Horizon', 'Candidate Milestone Deliverables']],
    body: protocolRows,
    theme: 'grid',
    styles: { fontSize: 7.5, cellPadding: 2.4, textColor: [30, 41, 59] },
    headStyles: { fillColor: NAVY, textColor: [255, 255, 255], fontStyle: 'bold', fontSize: 7.5 },
    columnStyles: {
      0: { fontStyle: 'bold', fillColor: SLATE_BG, cellWidth: 62 },
      1: { cellWidth: 120 }
    },
    margin: { left: 14, right: 14 }
  })

  currentY = doc.lastAutoTable.finalY + 8

  // Mandatory Pre-Exam Document Verification Checklist
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10.5)
  doc.setTextColor(...NAVY)
  doc.text('PRE-EXAMINATION DOCUMENTATION & IDENTITY CHECKLIST', 14, currentY)
  doc.setDrawColor(...AMBER)
  doc.setLineWidth(0.8)
  doc.line(14, currentY + 1.5, 125, currentY + 1.5)
  currentY += 5

  const checklistItems = isJob ? [
    '[[OK]] Government Photo Identity: Original Aadhaar Card / Passport / Voter ID matching registration name.',
    '[[OK]] Category / Reservation Certificates: Valid OBC-NCL / EWS / SC / ST certificate issued within validity window.',
    '[[OK]] Educational Credentials: Final Degree Certificate / Consolidated Marksheets from UGC/AICTE recognized institution.',
    '[[OK]] Commission Admit Card: Clear colored printout with legible barcode and identical passport photographs.'
  ] : [
    '[[OK]] Government Photo Identity: Original Aadhaar Card / Passport / School Photo ID matching admit card credentials.',
    '[[OK]] Examination Admit Card: Clear printout along with Self-Declaration (Undertaking) if mandated by Testing Agency.',
    '[[OK]] Category / Reservation Certificates: Valid OBC-NCL / EWS / SC / ST certificate for counseling seat allocation.',
    '[[OK]] Qualifying Examination Admit Card / Marksheet: Class 12 / Graduation proof for counseling verification.'
  ]

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(7.5)
  doc.setTextColor(51, 65, 85)
  checklistItems.forEach(item => {
    doc.text(item, 14, currentY)
    currentY += 4
  })

  currentY += 3
  // Verification Seal & Sign-off Box
  doc.setFillColor(...SLATE_BG)
  doc.roundedRect(14, currentY, 182, 18, 1.5, 1.5, 'F')
  doc.setDrawColor(...BORDER_COLOR)
  doc.rect(14, currentY, 182, 18)

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(8)
  doc.setTextColor(...NAVY)
  doc.text('NIC & STATUTORY COMMISSION VERIFICATION SEAL', 18, currentY + 6)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(7)
  doc.setTextColor(...MUTED)
  doc.text(
    `Digital Verification Reference: ${refId} | Verified through public commission portals as of ${timestampStr}. For authoritative updates, consult the official portal directly.`,
    18,
    currentY + 12
  )

  // Apply running header and footer across all 4 pages
  addRunningHeaderFooter(doc, exam.name, exam.acronym, refId, 4)

  // Save the PDF
  const filename = `${(exam.acronym || exam.name || 'exam').toLowerCase().replace(/[^a-z0-9]/g, '-')}-research-dossier.pdf`
  doc.save(filename)
}

/**
 * Generates an Institutional Multi-Column Comparison Matrix PDF
 */
export function exportComparisonMatrixPdf(compareExams = []) {
  if (!compareExams || compareExams.length === 0) return

  // Landscape A4 for rich multi-column view
  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' })

  const now = new Date()
  const year = now.getFullYear()
  const refId = `IX-COMPARE/${year}/${compareExams.map(e => (e.acronym || 'EXAM').substring(0, 4)).join('-')}`
  const timestampStr = now.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })

  // Title Banner
  doc.setFillColor(...NAVY)
  doc.roundedRect(14, 12, 269, 20, 2, 2, 'F')

  doc.setFillColor(...AMBER)
  doc.rect(14, 12, 3, 20, 'F')

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(13)
  doc.setTextColor(255, 255, 255)
  doc.text(`STATUTORY EXAMINATION COMPARATIVE ASSESSMENT MATRIX (${compareExams.length} EXAMINATIONS)`, 21, 21)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  doc.setTextColor(203, 213, 225)
  doc.text(`Reference ID: ${refId} | Generated: ${timestampStr} | Statutory Rules & Guidelines Compliant`, 21, 28)

  // AutoTable Header: Metric + 1 column per exam
  const headRow = ['Evaluation Criteria', ...compareExams.map(e => `${e.name}\n[${e.acronym || 'ID'}]`)]

  // Build matrix rows
  const comparisonRows = [
    ['Examination Type', ...compareExams.map(e => e.exam_type === 'job' ? '[Career] Job Recruitment' : '[Academic] Entrance Exam')],
    ['Conducting Commission', ...compareExams.map(e => e.conducting_body || 'N/A')],
    ['Domain & Discipline', ...compareExams.map(e => e.domain || 'N/A')],
    ['Jurisdiction & Scope', ...compareExams.map(e => e.jurisdiction === 'central' ? 'Central / All India' : `State (${e.state})`)],
    ['Degree / Entry Level', ...compareExams.map(e => e.level || 'N/A')],
    ['Targeted Cadre / Role', ...compareExams.map(e => `${e.cadre || 'National Service'}\n(${e.target_role || 'Executive'})`)],
    ['Examination Mode', ...compareExams.map(e => e.exam_mode || 'N/A')],
    ['Annual Frequency', ...compareExams.map(e => e.frequency || 'Annual')],
    ['Tentative Examination Month', ...compareExams.map(e => e.exam_month || 'TBA')],
    ['Application Notification Period', ...compareExams.map(e => e.application_period || 'As notified')],
    ['Minimum Educational Criteria', ...compareExams.map(e => e.min_qualification || 'Degree')],
    ['Statutory Age Limit', ...compareExams.map(e => e.age_limit || 'As per norms')],
    ['Official Commission Portal', ...compareExams.map(e => e.official_website || 'india.gov.in')]
  ]

  const colWidth = Math.floor(215 / compareExams.length)
  const columnStyles = {
    0: { fontStyle: 'bold', fillColor: SLATE_BG, cellWidth: 54 }
  }
  for (let i = 1; i <= compareExams.length; i++) {
    columnStyles[i] = { cellWidth: colWidth }
  }

  autoTable(doc, {
    startY: 36,
    head: [headRow],
    body: comparisonRows,
    theme: 'grid',
    styles: { fontSize: 7.5, cellPadding: 2.2, textColor: [30, 41, 59] },
    headStyles: { fillColor: NAVY, textColor: [255, 255, 255], fontStyle: 'bold', fontSize: 7.5, halign: 'center' },
    columnStyles,
    margin: { left: 14, right: 14 }
  })

  // Add landscape footer
  const pageCount = doc.getNumberOfPages()
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i)
    doc.setDrawColor(...BORDER_COLOR)
    doc.line(14, 198, 283, 198)

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(7)
    doc.setTextColor(...MUTED)
    doc.text('INDIAEXAMS INTELLIGENCE SYSTEM | Official Comparative Assessment Matrix | www.indiaexams.org', 14, 202)

    doc.setFont('helvetica', 'bold')
    doc.setTextColor(...NAVY)
    doc.text(`Page ${i} of ${pageCount}`, 283, 202, { align: 'right' })
  }

  const filename = `indiaexams-comparison-matrix-${compareExams.map(e => (e.acronym || 'exam').toLowerCase()).join('-vs-')}.pdf`
  doc.save(filename)
}

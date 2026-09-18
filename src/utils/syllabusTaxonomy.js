/**
 * IndiaExams — Standard Syllabus Taxonomy & Cross-Exam Fungibility Engine
 *
 * Provides a standardized ontology of Indian competitive and entrance examination
 * subjects, granular topic modules, curated profiles for benchmark national and state exams,
 * domain-specific routing for all 20 domains (Civil Services, Defence, Banking, Engineering,
 * Medical, Law, Design, Architecture, Hospitality, Agriculture, Maritime, etc.),
 * and a barrier-aware overlap calculation algorithm that prevents cross-domain hallucinations.
 */

// 1. Standard Subject & Topic Ontology
export const SYLLABUS_MODULES = {
  // General Studies & Awareness
  'gs-polity': { id: 'gs-polity', name: 'Indian Polity & Constitution', category: 'General Studies', shortCat: 'GS', weight: 1.2 },
  'gs-history-modern': { id: 'gs-history-modern', name: 'Modern Indian History & National Movement', category: 'General Studies', shortCat: 'GS', weight: 1.1 },
  'gs-history-ancient-med': { id: 'gs-history-ancient-med', name: 'Ancient & Medieval Indian History', category: 'General Studies', shortCat: 'GS', weight: 0.9 },
  'gs-art-culture': { id: 'gs-art-culture', name: 'Indian Art, Culture & Heritage', category: 'General Studies', shortCat: 'GS', weight: 0.8 },
  'gs-geography': { id: 'gs-geography', name: 'Indian & World Physical/Economic Geography', category: 'General Studies', shortCat: 'GS', weight: 1.1 },
  'gs-economy': { id: 'gs-economy', name: 'Indian Economy, Budget & Planning', category: 'General Studies', shortCat: 'GS', weight: 1.2 },
  'gs-environment': { id: 'gs-environment', name: 'Environment, Ecology & Climate Change', category: 'General Studies', shortCat: 'GS', weight: 1.0 },
  'gs-science-tech': { id: 'gs-science-tech', name: 'General Science & Everyday Technology', category: 'General Studies', shortCat: 'GS', weight: 1.0 },
  'gs-current-affairs': { id: 'gs-current-affairs', name: 'National & International Current Affairs', category: 'General Studies', shortCat: 'GS', weight: 1.2 },
  'gs-world-history': { id: 'gs-world-history', name: 'World History & International Relations', category: 'General Studies', shortCat: 'GS', weight: 0.8 },

  // Quantitative Aptitude & Mathematics
  'qa-arithmetic': { id: 'qa-arithmetic', name: 'Commercial Arithmetic (Profit/Loss, Ratio, Time & Work, CI/SI)', category: 'Quantitative Aptitude', shortCat: 'Quant', weight: 1.2 },
  'qa-adv-math': { id: 'qa-adv-math', name: 'Advanced Mathematics (Algebra, Geometry, Trigonometry, Mensuration)', category: 'Quantitative Aptitude', shortCat: 'Quant', weight: 1.2 },
  'qa-data-interpretation': { id: 'qa-data-interpretation', name: 'Data Interpretation (Charts, Tables, Graphs, Caselets)', category: 'Quantitative Aptitude', shortCat: 'Quant', weight: 1.1 },
  'qa-higher-math': { id: 'qa-higher-math', name: 'Higher Mathematics (Calculus, Linear Algebra, Coordinate Geometry, Vectors)', category: 'Quantitative Aptitude', shortCat: 'Quant', weight: 1.6, isSpecializedCore: true },

  // Reasoning & Logic
  'lr-verbal': { id: 'lr-verbal', name: 'Verbal & Deductive Reasoning (Syllogisms, Blood Relations, Directions)', category: 'Reasoning & Logic', shortCat: 'Reasoning', weight: 1.1 },
  'lr-analytical': { id: 'lr-analytical', name: 'Analytical Reasoning & Seating Puzzles', category: 'Reasoning & Logic', shortCat: 'Reasoning', weight: 1.2 },
  'lr-nonverbal': { id: 'lr-nonverbal', name: 'Non-Verbal Reasoning (Pattern Completion, Paper Folding, Mirror)', category: 'Reasoning & Logic', shortCat: 'Reasoning', weight: 0.9 },
  'lr-critical': { id: 'lr-critical', name: 'Critical Reasoning (Statement & Assumption, Cause & Effect)', category: 'Reasoning & Logic', shortCat: 'Reasoning', weight: 1.0 },

  // English & Verbal Ability
  'eng-comprehension': { id: 'eng-comprehension', name: 'Reading Comprehension & Inferences', category: 'English & Language', shortCat: 'English', weight: 1.1 },
  'eng-grammar': { id: 'eng-grammar', name: 'Grammar, Error Spotting & Sentence Correction', category: 'English & Language', shortCat: 'English', weight: 1.1 },
  'eng-vocabulary': { id: 'eng-vocabulary', name: 'Vocabulary, Idioms, Phrasal Verbs & Cloze Test', category: 'English & Language', shortCat: 'English', weight: 1.0 },
  'eng-descriptive': { id: 'eng-descriptive', name: 'Descriptive English (Essay, Précis, Letter & Report Writing)', category: 'English & Language', shortCat: 'English', weight: 1.2 },

  // Ethics, Governance & Public Administration
  'ethics-integrity': { id: 'ethics-integrity', name: 'Ethics, Integrity & Aptitude (Case Studies, Moral Philosophy)', category: 'Ethics & Governance', shortCat: 'Ethics', weight: 1.2 },
  'gov-public-admin': { id: 'gov-public-admin', name: 'Governance, Public Policy & Social Justice', category: 'Ethics & Governance', shortCat: 'Ethics', weight: 1.1 },
  'gov-internal-security': { id: 'gov-internal-security', name: 'Internal Security, Border Management & Cyber Threats', category: 'Ethics & Governance', shortCat: 'Ethics', weight: 0.9 },

  // State & Regional Knowledge
  'state-gk': { id: 'state-gk', name: 'State-Specific General Knowledge (History, Geography, Culture, Welfare Schemes)', category: 'State & Regional', shortCat: 'State GK', weight: 1.3 },
  'state-language': { id: 'state-language', name: 'State Regional Language Proficiency', category: 'State & Regional', shortCat: 'State GK', weight: 1.0 },

  // Banking, Finance & Corporate Knowledge
  'bf-banking-awareness': { id: 'bf-banking-awareness', name: 'Banking Awareness, RBI Monetary Policy & Financial Systems', category: 'Finance & Commerce', shortCat: 'Commerce', weight: 1.2 },
  'bf-accounting': { id: 'bf-accounting', name: 'Financial & Cost Accounting / Corporate Auditing', category: 'Finance & Commerce', shortCat: 'Commerce', weight: 1.8, isSpecializedCore: true },
  'bf-corporate-law': { id: 'bf-corporate-law', name: 'Companies Act, Securities Law & Economic Regulations', category: 'Finance & Commerce', shortCat: 'Commerce', weight: 1.8, isSpecializedCore: true },
  'bf-economics': { id: 'bf-economics', name: 'Micro & Macroeconomics, International Trade', category: 'Finance & Commerce', shortCat: 'Commerce', weight: 1.2 },

  // Law & Legal Studies
  'law-constitutional': { id: 'law-constitutional', name: 'Constitutional & Administrative Law', category: 'Law & Legal', shortCat: 'Law', weight: 1.3 },
  'law-criminal': { id: 'law-criminal', name: 'Criminal Laws (Bharatiya Nyaya Sanhita / IPC & BNSS / CrPC)', category: 'Law & Legal', shortCat: 'Law', weight: 2.2, isSpecializedCore: true },
  'law-civil-contracts': { id: 'law-civil-contracts', name: 'Civil Procedure Code, Law of Contracts & Specific Relief', category: 'Law & Legal', shortCat: 'Law', weight: 2.2, isSpecializedCore: true },
  'law-legal-aptitude': { id: 'law-legal-aptitude', name: 'Legal Reasoning, Maxims & Judicial Case Law', category: 'Law & Legal', shortCat: 'Law', weight: 1.1 },

  // Core Engineering Disciplines
  'engg-civil': { id: 'engg-civil', name: 'Civil Engineering Core (Structures, Geotech, Fluid, Highway)', category: 'Engineering Core', shortCat: 'Technical', weight: 2.2, isSpecializedCore: true },
  'engg-mechanical': { id: 'engg-mechanical', name: 'Mechanical Engineering Core (Thermodynamics, Mechanics, Manufacturing)', category: 'Engineering Core', shortCat: 'Technical', weight: 2.2, isSpecializedCore: true },
  'engg-electrical': { id: 'engg-electrical', name: 'Electrical Engineering Core (Power Systems, Control, Machines)', category: 'Engineering Core', shortCat: 'Technical', weight: 2.2, isSpecializedCore: true },
  'engg-electronics': { id: 'engg-electronics', name: 'Electronics & Communication (Signals, Digital Circuits, Comm Systems)', category: 'Engineering Core', shortCat: 'Technical', weight: 2.2, isSpecializedCore: true },
  'engg-computer-science': { id: 'engg-computer-science', name: 'Computer Science Core (Data Structures, Algorithms, OS, DBMS, Networks)', category: 'Engineering Core', shortCat: 'Technical', weight: 2.2, isSpecializedCore: true },
  'engg-math': { id: 'engg-math', name: 'Engineering Mathematics (Differential Equations, Complex Variables)', category: 'Engineering Core', shortCat: 'Technical', weight: 1.4, isSpecializedCore: true },

  // Medical & Natural Sciences
  'sci-physics': { id: 'sci-physics', name: 'Physics (Mechanics, Electromagnetism, Modern Physics, Optics)', category: 'Medical & Natural Sciences', shortCat: 'Science', weight: 1.6, isSpecializedCore: true },
  'sci-chemistry': { id: 'sci-chemistry', name: 'Chemistry (Organic, Inorganic, Physical Chemistry)', category: 'Medical & Natural Sciences', shortCat: 'Science', weight: 1.6, isSpecializedCore: true },
  'sci-biology': { id: 'sci-biology', name: 'Biology (Botany, Zoology, Genetics, Human Physiology)', category: 'Medical & Natural Sciences', shortCat: 'Science', weight: 1.8, isSpecializedCore: true },
  'med-clinical': { id: 'med-clinical', name: 'Clinical Medicine, Surgery, Pathology, Pharmacology, Obstetrics', category: 'Medical & Natural Sciences', shortCat: 'Science', weight: 2.5, isSpecializedCore: true },

  // Design & Creative Arts (Specialized Non-Transferable Studio Skills)
  'des-drawing': { id: 'des-drawing', name: 'Freehand Sketching, Perspective Drawing & Proportion', category: 'Design & Creative Arts', shortCat: 'Design', weight: 2.5, isSpecializedCore: true },
  'des-visual-spatial': { id: 'des-visual-spatial', name: 'Visual Perception, 2D/3D Spatial Observation & Color Theory', category: 'Design & Creative Arts', shortCat: 'Design', weight: 1.8, isSpecializedCore: true },
  'des-creative-thinking': { id: 'des-creative-thinking', name: 'Design Problem Solving, Material Prototyping & Studio Test', category: 'Design & Creative Arts', shortCat: 'Design', weight: 2.0, isSpecializedCore: true },

  // Architecture Core
  'arch-drawing': { id: 'arch-drawing', name: 'Architectural Drawing, 3D Geometric Perspective & Composition', category: 'Architecture', shortCat: 'Arch', weight: 2.5, isSpecializedCore: true },
  'arch-spatial': { id: 'arch-spatial', name: '3D Spatial Cognition, Architectural History & Building Materials', category: 'Architecture', shortCat: 'Arch', weight: 1.8, isSpecializedCore: true },

  // Agriculture Core
  'agri-core': { id: 'agri-core', name: 'Agricultural Science (Agronomy, Soil Science, Horticulture, Plant Breeding)', category: 'Agriculture Sciences', shortCat: 'Agri', weight: 2.2, isSpecializedCore: true },

  // Hospitality & Service Sector Core
  'hosp-service-apt': { id: 'hosp-service-apt', name: 'Service Sector Aptitude, Hospitality Management & Culinary Protocol', category: 'Hospitality', shortCat: 'Hosp', weight: 2.0, isSpecializedCore: true },

  // Maritime Core
  'mar-nautical-tech': { id: 'mar-nautical-tech', name: 'Nautical Science, Marine Navigation & Seamanship Engineering', category: 'Maritime Sciences', shortCat: 'Maritime', weight: 2.2, isSpecializedCore: true },

  // Computer Literacy & General IT
  'it-computer-knowledge': { id: 'it-computer-knowledge', name: 'Computer Knowledge & Office Software Fundamentals', category: 'Computer Literacy', shortCat: 'IT/Comp', weight: 0.9 },

  // Pedagogy & Teaching
  'ped-child-dev': { id: 'ped-child-dev', name: 'Child Development & Learning Psychology', category: 'Teaching & Pedagogy', shortCat: 'Pedagogy', weight: 2.0, isSpecializedCore: true },
  'ped-teaching-apt': { id: 'ped-teaching-apt', name: 'Teaching Methodology, Classroom Evaluation & Inclusive Pedagogy', category: 'Teaching & Pedagogy', shortCat: 'Pedagogy', weight: 2.0, isSpecializedCore: true },

  // Defence & Special
  'def-military-apt': { id: 'def-military-apt', name: 'Military Aptitude, Officer Intelligence Rating (OIR) & Spatial Judgement', category: 'Defence & Security', shortCat: 'Defence', weight: 1.1 },
  'mgmt-business-aware': { id: 'mgmt-business-aware', name: 'Business Environment, Case Analysis & Managerial Decision Making', category: 'Management', shortCat: 'Management', weight: 1.2 }
}

// 2. Curated Granular Profiles for Benchmark National & State Examinations
export const CURATED_EXAM_PROFILES = {
  // Civil Services & Administrative
  'upsc-cse': [
    'gs-polity', 'gs-history-modern', 'gs-history-ancient-med', 'gs-art-culture',
    'gs-geography', 'gs-economy', 'gs-environment', 'gs-science-tech',
    'gs-current-affairs', 'gs-world-history', 'ethics-integrity', 'gov-public-admin',
    'gov-internal-security', 'eng-descriptive', 'eng-comprehension', 'qa-arithmetic',
    'qa-data-interpretation', 'lr-verbal', 'lr-analytical'
  ],
  'uppsc-pcs': [
    'gs-polity', 'gs-history-modern', 'gs-history-ancient-med', 'gs-art-culture',
    'gs-geography', 'gs-economy', 'gs-environment', 'gs-science-tech',
    'gs-current-affairs', 'ethics-integrity', 'gov-public-admin', 'eng-descriptive',
    'eng-comprehension', 'qa-arithmetic', 'lr-verbal', 'state-gk', 'state-language'
  ],
  'bpsc': [
    'gs-polity', 'gs-history-modern', 'gs-history-ancient-med', 'gs-art-culture',
    'gs-geography', 'gs-economy', 'gs-environment', 'gs-science-tech',
    'gs-current-affairs', 'state-gk', 'eng-comprehension', 'qa-arithmetic',
    'qa-data-interpretation', 'lr-verbal'
  ],
  'mppsc': [
    'gs-polity', 'gs-history-modern', 'gs-history-ancient-med', 'gs-art-culture',
    'gs-geography', 'gs-economy', 'gs-environment', 'gs-science-tech',
    'gs-current-affairs', 'state-gk', 'ethics-integrity', 'eng-comprehension',
    'qa-arithmetic', 'lr-verbal'
  ],
  'rpsc-ras': [
    'gs-polity', 'gs-history-modern', 'gs-history-ancient-med', 'gs-art-culture',
    'gs-geography', 'gs-economy', 'gs-environment', 'gs-science-tech',
    'gs-current-affairs', 'state-gk', 'ethics-integrity', 'eng-grammar',
    'eng-comprehension', 'qa-arithmetic', 'lr-analytical'
  ],
  'wbcs': [
    'gs-polity', 'gs-history-modern', 'gs-history-ancient-med', 'gs-art-culture',
    'gs-geography', 'gs-economy', 'gs-science-tech', 'gs-current-affairs',
    'state-gk', 'eng-grammar', 'eng-comprehension', 'qa-arithmetic', 'lr-verbal'
  ],

  // Staff Selection Commission (SSC) & Railways (RRB)
  'ssc-cgl': [
    'qa-arithmetic', 'qa-adv-math', 'qa-data-interpretation',
    'lr-verbal', 'lr-analytical', 'lr-nonverbal',
    'eng-comprehension', 'eng-grammar', 'eng-vocabulary',
    'gs-polity', 'gs-history-modern', 'gs-geography', 'gs-economy',
    'gs-science-tech', 'gs-current-affairs', 'it-computer-knowledge'
  ],
  'ssc-chsl': [
    'qa-arithmetic', 'qa-adv-math', 'lr-verbal', 'lr-nonverbal',
    'eng-comprehension', 'eng-grammar', 'eng-vocabulary',
    'gs-polity', 'gs-history-modern', 'gs-geography', 'gs-current-affairs',
    'it-computer-knowledge'
  ],
  'ssc-cpo': [
    'qa-arithmetic', 'qa-adv-math', 'lr-verbal', 'lr-analytical', 'lr-nonverbal',
    'eng-comprehension', 'eng-grammar', 'eng-vocabulary',
    'gs-polity', 'gs-history-modern', 'gs-geography', 'gs-science-tech',
    'gs-current-affairs'
  ],
  'rrb-ntpc': [
    'qa-arithmetic', 'qa-adv-math', 'qa-data-interpretation',
    'lr-verbal', 'lr-analytical', 'lr-nonverbal',
    'gs-science-tech', 'gs-history-modern', 'gs-geography', 'gs-polity',
    'gs-economy', 'gs-current-affairs', 'it-computer-knowledge'
  ],

  // Banking & Financial Regulatory
  'ibps-po': [
    'qa-arithmetic', 'qa-data-interpretation', 'lr-verbal', 'lr-analytical', 'lr-critical',
    'eng-comprehension', 'eng-grammar', 'eng-vocabulary', 'eng-descriptive',
    'bf-banking-awareness', 'gs-economy', 'gs-current-affairs', 'it-computer-knowledge'
  ],
  'sbi-po': [
    'qa-arithmetic', 'qa-data-interpretation', 'lr-verbal', 'lr-analytical', 'lr-critical',
    'eng-comprehension', 'eng-grammar', 'eng-vocabulary', 'eng-descriptive',
    'bf-banking-awareness', 'gs-economy', 'gs-current-affairs', 'it-computer-knowledge'
  ],
  'ibps-clerk': [
    'qa-arithmetic', 'qa-data-interpretation', 'lr-verbal', 'lr-analytical',
    'eng-comprehension', 'eng-grammar', 'eng-vocabulary',
    'bf-banking-awareness', 'gs-current-affairs'
  ],
  'rbi-grade-b': [
    'bf-economics', 'bf-banking-awareness', 'gs-economy', 'gs-current-affairs',
    'gov-public-admin', 'eng-descriptive', 'eng-comprehension',
    'qa-arithmetic', 'qa-data-interpretation', 'lr-analytical', 'lr-critical',
    'mgmt-business-aware'
  ],
  'sebi-grade-a': [
    'bf-corporate-law', 'bf-accounting', 'bf-economics', 'bf-banking-awareness',
    'qa-arithmetic', 'qa-data-interpretation', 'lr-analytical',
    'eng-comprehension', 'eng-descriptive', 'mgmt-business-aware'
  ],
  'nabard-grade-a': [
    'gs-economy', 'gs-environment', 'bf-banking-awareness', 'agri-core',
    'qa-arithmetic', 'qa-data-interpretation', 'lr-analytical',
    'eng-comprehension', 'eng-descriptive', 'it-computer-knowledge'
  ],

  // Specialized Central Services & Defence
  'epfo-apfc': [
    'gs-polity', 'gs-history-modern', 'gs-economy', 'gs-environment',
    'gs-science-tech', 'gs-current-affairs', 'bf-accounting',
    'gov-public-admin', 'eng-comprehension', 'eng-grammar',
    'qa-arithmetic', 'qa-data-interpretation', 'lr-verbal'
  ],
  'ib-acio': [
    'gs-current-affairs', 'gs-polity', 'gs-history-modern', 'gs-geography',
    'gs-science-tech', 'qa-arithmetic', 'qa-adv-math', 'lr-verbal', 'lr-analytical',
    'eng-comprehension', 'eng-grammar', 'eng-descriptive', 'gov-internal-security'
  ],
  'capf-ac': [
    'gs-polity', 'gs-history-modern', 'gs-geography', 'gs-economy',
    'gs-science-tech', 'gs-current-affairs', 'gov-internal-security',
    'eng-descriptive', 'eng-comprehension', 'qa-arithmetic', 'lr-verbal'
  ],
  'cds': [
    'eng-comprehension', 'eng-grammar', 'eng-vocabulary',
    'gs-polity', 'gs-history-modern', 'gs-geography', 'gs-science-tech',
    'gs-current-affairs', 'qa-arithmetic', 'qa-adv-math'
  ],
  'nda': [
    'qa-higher-math', 'qa-adv-math', 'eng-comprehension', 'eng-grammar',
    'eng-vocabulary', 'sci-physics', 'sci-chemistry', 'gs-geography',
    'gs-history-modern', 'gs-current-affairs'
  ],
  'afcat': [
    'eng-comprehension', 'eng-grammar', 'eng-vocabulary',
    'gs-history-modern', 'gs-geography', 'gs-science-tech', 'gs-current-affairs',
    'qa-arithmetic', 'lr-verbal', 'lr-nonverbal', 'def-military-apt'
  ],

  // Engineering Core
  'gate': [
    'engg-math', 'engg-computer-science', 'qa-arithmetic', 'lr-verbal', 'eng-comprehension'
  ],
  'ies-ese': [
    'engg-math', 'engg-civil', 'engg-mechanical', 'engg-electrical',
    'gs-current-affairs', 'gs-environment', 'ethics-integrity',
    'qa-arithmetic', 'it-computer-knowledge'
  ],
  'isro-scientist': [
    'engg-computer-science', 'engg-electronics', 'engg-mechanical', 'engg-math',
    'qa-arithmetic', 'lr-verbal'
  ],
  'ssc-je': [
    'engg-civil', 'engg-mechanical', 'engg-electrical',
    'lr-verbal', 'lr-analytical', 'gs-current-affairs', 'gs-science-tech'
  ],

  // Higher Secondary Entrance (Engineering & Medical)
  'jee-main': [
    'sci-physics', 'sci-chemistry', 'qa-higher-math'
  ],
  'jee-advanced': [
    'sci-physics', 'sci-chemistry', 'qa-higher-math'
  ],
  'neet-ug': [
    'sci-physics', 'sci-chemistry', 'sci-biology'
  ],
  'neet-pg': [
    'med-clinical', 'sci-biology'
  ],
  'aiims-norcet': [
    'med-clinical', 'sci-biology', 'gs-current-affairs', 'qa-arithmetic', 'lr-verbal'
  ],

  // Law & Judiciary
  'clat': [
    'eng-comprehension', 'gs-current-affairs', 'law-legal-aptitude',
    'lr-critical', 'qa-data-interpretation'
  ],
  'ailet': [
    'eng-comprehension', 'gs-current-affairs', 'lr-critical', 'law-legal-aptitude'
  ],
  'delhi-djs': [
    'law-constitutional', 'law-criminal', 'law-civil-contracts', 'law-legal-aptitude',
    'eng-comprehension', 'eng-descriptive', 'gs-current-affairs'
  ],
  'up-pcs-j': [
    'law-constitutional', 'law-criminal', 'law-civil-contracts', 'law-legal-aptitude',
    'gs-polity', 'gs-history-modern', 'gs-current-affairs', 'state-gk', 'eng-descriptive'
  ],

  // Design & Architecture (Specialized Studio Skills)
  'nid-dat': [
    'des-drawing', 'des-visual-spatial', 'des-creative-thinking', 'lr-nonverbal', 'eng-comprehension'
  ],
  'nift': [
    'des-drawing', 'des-visual-spatial', 'des-creative-thinking', 'qa-arithmetic', 'eng-comprehension', 'gs-current-affairs'
  ],
  'uceed': [
    'des-drawing', 'des-visual-spatial', 'des-creative-thinking', 'lr-analytical', 'eng-comprehension'
  ],
  'ceed': [
    'des-drawing', 'des-visual-spatial', 'des-creative-thinking', 'lr-analytical', 'eng-comprehension'
  ],
  'fddi-aist': [
    'des-visual-spatial', 'des-creative-thinking', 'qa-arithmetic', 'lr-verbal', 'eng-comprehension'
  ],
  'nata': [
    'arch-drawing', 'arch-spatial', 'qa-higher-math', 'sci-physics'
  ],
  'jee-main-arch': [
    'arch-drawing', 'arch-spatial', 'qa-higher-math'
  ],

  // Hospitality & Maritime
  'nchm-jee': [
    'hosp-service-apt', 'eng-comprehension', 'qa-arithmetic', 'lr-verbal', 'gs-current-affairs'
  ],
  'imu-cet': [
    'mar-nautical-tech', 'sci-physics', 'sci-chemistry', 'qa-higher-math', 'eng-comprehension'
  ],

  // Management & Pedagogy
  'cat': [
    'qa-arithmetic', 'qa-adv-math', 'qa-data-interpretation',
    'lr-analytical', 'lr-critical', 'eng-comprehension', 'eng-vocabulary'
  ],
  'cmat': [
    'qa-arithmetic', 'qa-data-interpretation', 'lr-verbal', 'lr-analytical',
    'eng-comprehension', 'eng-grammar', 'gs-current-affairs', 'mgmt-business-aware'
  ],
  'ctet': [
    'ped-child-dev', 'ped-teaching-apt', 'eng-comprehension', 'eng-grammar',
    'qa-arithmetic', 'gs-environment'
  ],
  'ugc-net': [
    'ped-teaching-apt', 'lr-verbal', 'qa-data-interpretation', 'eng-comprehension',
    'it-computer-knowledge', 'gs-environment', 'gs-current-affairs'
  ]
}

// 3. Domain-Specific Heuristic Footprint Extraction
export function getExamSyllabusProfile(exam) {
  if (!exam) return []

  // Check direct curated map first
  if (CURATED_EXAM_PROFILES[exam.id]) {
    return CURATED_EXAM_PROFILES[exam.id]
  }

  const tags = new Set()
  const d = (exam.domain || '').toLowerCase()
  const fieldStr = (exam.field || []).join(' ').toLowerCase()
  const nameStr = (exam.name || '').toLowerCase()
  const descStr = (exam.description || '').toLowerCase()
  const specStr = (exam.specializations || []).join(' ').toLowerCase()
  const combined = `${nameStr} ${d} ${fieldStr} ${descStr} ${specStr}`

  // State-specific exams
  if (exam.jurisdiction === 'state' && exam.state && exam.state !== 'All India') {
    tags.add('state-gk')
  }

  // Domain-specific classifications:
  if (d.includes('design')) {
    tags.add('des-drawing')
    tags.add('des-visual-spatial')
    tags.add('des-creative-thinking')
    tags.add('lr-nonverbal')
    tags.add('eng-comprehension')
  } else if (d.includes('architecture')) {
    tags.add('arch-drawing')
    tags.add('arch-spatial')
    tags.add('qa-higher-math')
    tags.add('sci-physics')
  } else if (d.includes('hospitality')) {
    tags.add('hosp-service-apt')
    tags.add('eng-comprehension')
    tags.add('qa-arithmetic')
    tags.add('lr-verbal')
    tags.add('gs-current-affairs')
  } else if (d.includes('maritime')) {
    tags.add('mar-nautical-tech')
    tags.add('sci-physics')
    tags.add('qa-higher-math')
    tags.add('eng-comprehension')
  } else if (d.includes('agriculture')) {
    tags.add('agri-core')
    tags.add('sci-biology')
    tags.add('sci-chemistry')
    tags.add('gs-current-affairs')
  } else if (d.includes('medical') || combined.includes('doctor') || combined.includes('nurse') || combined.includes('surgeon') || combined.includes('mbbs') || combined.includes('neet')) {
    tags.add('sci-biology')
    tags.add('sci-chemistry')
    tags.add('sci-physics')
    if (combined.includes('pg') || combined.includes('officer') || combined.includes('surgeon') || combined.includes('norcet') || combined.includes('nurse')) {
      tags.add('med-clinical')
    }
  } else if (d.includes('law') || combined.includes('judge') || combined.includes('judicial') || combined.includes('legal') || combined.includes('clat')) {
    tags.add('law-constitutional')
    tags.add('law-criminal')
    tags.add('law-civil-contracts')
    tags.add('law-legal-aptitude')
    tags.add('eng-comprehension')
    tags.add('gs-current-affairs')
  } else if (d.includes('engineering') || combined.includes('engineer') || combined.includes('gate') || combined.includes('b.tech') || combined.includes('polytechnic')) {
    tags.add('engg-math')
    tags.add('qa-arithmetic')
    tags.add('lr-verbal')
    tags.add('gs-science-tech')
    if (combined.includes('civil')) tags.add('engg-civil')
    else if (combined.includes('mechanical')) tags.add('engg-mechanical')
    else if (combined.includes('electrical')) tags.add('engg-electrical')
    else if (combined.includes('electronics') || combined.includes('telecom')) tags.add('engg-electronics')
    else if (combined.includes('computer') || combined.includes('software') || combined.includes('it')) tags.add('engg-computer-science')
    else tags.add('engg-civil') // default general engg core
  } else if (d.includes('banking') || d.includes('finance') || d.includes('insurance')) {
    tags.add('qa-arithmetic')
    tags.add('qa-data-interpretation')
    tags.add('lr-analytical')
    tags.add('lr-verbal')
    tags.add('eng-comprehension')
    tags.add('eng-grammar')
    tags.add('bf-banking-awareness')
    tags.add('gs-economy')
    tags.add('gs-current-affairs')
    if (combined.includes('officer') || combined.includes('assistant') || combined.includes('manager') || combined.includes('clerk')) {
      tags.add('it-computer-knowledge')
    }
    if (combined.includes('ca') || combined.includes('cma') || combined.includes('accountant') || combined.includes('auditor')) {
      tags.add('bf-accounting')
      tags.add('bf-corporate-law')
    }
  } else if (d.includes('defence') || d.includes('police') || combined.includes('army') || combined.includes('navy') || combined.includes('air force') || combined.includes('constable') || combined.includes('sub-inspector')) {
    tags.add('gs-current-affairs')
    tags.add('gs-polity')
    tags.add('gs-history-modern')
    tags.add('gs-geography')
    tags.add('qa-arithmetic')
    tags.add('lr-verbal')
    tags.add('eng-comprehension')
    tags.add('def-military-apt')
  } else if (d.includes('management') || combined.includes('mba') || combined.includes('cat') || combined.includes('mat')) {
    tags.add('qa-arithmetic')
    tags.add('qa-data-interpretation')
    tags.add('lr-analytical')
    tags.add('lr-critical')
    tags.add('eng-comprehension')
    tags.add('eng-vocabulary')
    tags.add('mgmt-business-aware')
  } else if (d.includes('education') || combined.includes('tet') || combined.includes('teacher') || combined.includes('lecturer') || combined.includes('net')) {
    tags.add('ped-child-dev')
    tags.add('ped-teaching-apt')
    tags.add('eng-comprehension')
    tags.add('qa-arithmetic')
    tags.add('gs-current-affairs')
  } else if (d.includes('government') || d.includes('civil service') || d.includes('general')) {
    tags.add('gs-polity')
    tags.add('gs-history-modern')
    tags.add('gs-geography')
    tags.add('gs-economy')
    tags.add('gs-current-affairs')
    tags.add('qa-arithmetic')
    tags.add('lr-verbal')
    tags.add('eng-comprehension')
    if (combined.includes('cgl') || combined.includes('clerk') || combined.includes('ssc') || combined.includes('ntpc')) {
      tags.add('qa-adv-math')
      tags.add('eng-grammar')
      tags.add('it-computer-knowledge')
    }
  } else {
    // Standard baseline
    tags.add('gs-current-affairs')
    tags.add('gs-polity')
    tags.add('qa-arithmetic')
    tags.add('lr-verbal')
    tags.add('eng-comprehension')
  }

  return Array.from(tags)
}

// 4. Overlap Calculation Engine with Domain-Barrier Verification
export function calculateSyllabusOverlap(examA, examB) {
  if (!examA || !examB) return null

  const modulesA = getExamSyllabusProfile(examA)
  const modulesB = getExamSyllabusProfile(examB)

  const setA = new Set(modulesA)
  const setB = new Set(modulesB)

  // Shared modules (intersection)
  const sharedIds = modulesA.filter(id => setB.has(id))

  // Modules in A that are NOT in B (what you don't need to study for B)
  const missingInBIds = modulesA.filter(id => !setB.has(id))

  // Modules required for B that are NOT in A (the incremental delta required!)
  const extraRequiredForBIds = modulesB.filter(id => !setA.has(id))

  // Identify unfulfilled specialized core skills (Freehand drawing, Clinical medicine, Pure Engineering, Law codes)
  const missingSpecializedCores = extraRequiredForBIds.filter(id => {
    return SYLLABUS_MODULES[id]?.isSpecializedCore
  })

  // Directional weighted coverage: How much of Exam B's requirement is met by A?
  let sharedWeight = 0
  let totalWeightB = 0
  modulesB.forEach(id => {
    const mod = SYLLABUS_MODULES[id]
    const w = mod ? mod.weight : 1.0
    totalWeightB += w
    if (setA.has(id)) {
      sharedWeight += w
    }
  })

  let directionalCoverage = totalWeightB > 0 ? (sharedWeight / totalWeightB) : 0

  // 1. Specialized Core Domain Barrier Penalty:
  // If Target B requires specialized modules that Primary A lacks,
  // each missing core skill fundamentally prevents clearing Target B without learning that entire discipline.
  if (missingSpecializedCores.length > 0) {
    directionalCoverage = directionalCoverage * Math.pow(0.38, missingSpecializedCores.length)
  }

  // 2. Career Track Divergence Penalty:
  // If one is a job recruitment exam (e.g. UPSC, SSC, IBPS) and the other is an undergraduate entrance test (e.g. NID, NATA, JEE)
  if (examA.exam_type && examB.exam_type && examA.exam_type !== examB.exam_type) {
    // If domains are also completely different, apply strong divergence penalty
    if (examA.domain !== examB.domain) {
      directionalCoverage = directionalCoverage * 0.75
    }
  }

  // 3. Jaccard Breadth Normalization:
  // Prevent tiny-syllabus exams from registering 100% overlap against massive-syllabus exams of divergent fields
  const unionCount = new Set([...modulesA, ...modulesB]).size
  const jaccardScore = unionCount > 0 ? (sharedIds.length / unionCount) : 0
  const compositeScore = (0.75 * directionalCoverage) + (0.25 * jaccardScore)

  const rawPercent = Math.round(compositeScore * 100)
  const overlapPercentage = Math.min(Math.max(rawPercent, 2), 100)

  // Fungibility categorization & strategic verdict
  let fungibilityRating = 'divergent'
  let verdict = 'Divergent Preparation Path'
  let verdictClass = 'rating-low'
  let tacticalAdvice = 'Contrasting core subjects or non-transferable technical skills. Attempting both carries a high risk of preparation dilution.'
  let estimatedDeltaHours = extraRequiredForBIds.length * 35

  if (missingSpecializedCores.length > 0) {
    const coreNames = missingSpecializedCores.map(id => SYLLABUS_MODULES[id]?.name || id).slice(0, 2).join(' & ')
    tacticalAdvice = `Requires distinct core specialization in ${coreNames}. Preparation effort is largely non-transferable from ${examA.acronym || examA.name}.`
    estimatedDeltaHours = Math.max(extraRequiredForBIds.length * 40, 120)
  }

  if (overlapPercentage >= 78) {
    fungibilityRating = 'high'
    verdict = 'Natural Secondary Target (Minimal Delta)'
    verdictClass = 'rating-high'
    tacticalAdvice = `Excellent preparation synergy. Over 75% of ${examB.acronym || examB.name} is automatically covered by your primary study roadmap. Plan 2-3 weeks of targeted revision for the minor delta modules.`
    estimatedDeltaHours = Math.max(extraRequiredForBIds.length * 15, 20)
  } else if (overlapPercentage >= 50) {
    fungibilityRating = 'moderate'
    verdict = 'Strategic Pivot Target (Manageable Delta)'
    verdictClass = 'rating-medium'
    tacticalAdvice = `Good foundational overlap. Success requires allocating 20–30% of your weekly study schedule to the specific delta subjects identified below.`
    estimatedDeltaHours = Math.max(extraRequiredForBIds.length * 25, 45)
  }

  // Category-wise module counts for visual progress bars
  const categories = ['General Studies', 'Quantitative Aptitude', 'Reasoning & Logic', 'English & Language', 'State & Regional', 'Technical & Specialized']
  const catBreakdown = categories.map(cat => {
    const countA = modulesA.filter(id => {
      const m = SYLLABUS_MODULES[id]
      if (!m) return false
      if (cat === 'Technical & Specialized') {
        return m.category !== 'General Studies' && m.category !== 'Quantitative Aptitude' && m.category !== 'Reasoning & Logic' && m.category !== 'English & Language' && m.category !== 'State & Regional'
      }
      return m.category === cat
    }).length

    const countB = modulesB.filter(id => {
      const m = SYLLABUS_MODULES[id]
      if (!m) return false
      if (cat === 'Technical & Specialized') {
        return m.category !== 'General Studies' && m.category !== 'Quantitative Aptitude' && m.category !== 'Reasoning & Logic' && m.category !== 'English & Language' && m.category !== 'State & Regional'
      }
      return m.category === cat
    }).length

    const sharedCount = sharedIds.filter(id => {
      const m = SYLLABUS_MODULES[id]
      if (!m) return false
      if (cat === 'Technical & Specialized') {
        return m.category !== 'General Studies' && m.category !== 'Quantitative Aptitude' && m.category !== 'Reasoning & Logic' && m.category !== 'English & Language' && m.category !== 'State & Regional'
      }
      return m.category === cat
    }).length

    return {
      category: cat,
      countA,
      countB,
      sharedCount,
      percentage: countB > 0 ? Math.round((sharedCount / countB) * 100) : (countA > 0 ? 0 : 100)
    }
  })

  return {
    primaryExam: examA,
    comparatorExam: examB,
    overlapPercentage,
    fungibilityRating,
    verdict,
    verdictClass,
    tacticalAdvice,
    estimatedDeltaHours,
    missingSpecializedCores: missingSpecializedCores.map(id => SYLLABUS_MODULES[id] || { id, name: id, category: 'Specialized' }),
    sharedModules: sharedIds.map(id => SYLLABUS_MODULES[id] || { id, name: id, category: 'General' }),
    missingInB: missingInBIds.map(id => SYLLABUS_MODULES[id] || { id, name: id, category: 'General' }),
    extraRequiredForB: extraRequiredForBIds.map(id => SYLLABUS_MODULES[id] || { id, name: id, category: 'General' }),
    categoryBreakdown: catBreakdown
  }
}

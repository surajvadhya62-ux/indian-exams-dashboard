import {
  HiOutlineGlobeAlt, HiOutlineSearch, HiOutlineChartBar,
  HiOutlineScale, HiOutlineShieldCheck, HiOutlineCalendar,
  HiOutlineArrowRight, HiOutlineSparkles, HiOutlineCheckCircle
} from 'react-icons/hi'

export default function HowToUse({ setActiveView, setFilters, setSearchQuery, totalExams }) {
  const steps = [
    {
      step: '01',
      title: 'Exam Recommendation Wizard',
      icon: <HiOutlineSparkles style={{ color: 'var(--amber-bright, #e8a33d)' }} />,
      badge: 'Interactive Pathway',
      description: 'Find matching exams tailored to your exact profile in seconds:',
      points: [
        'Answer 3 quick questions: your qualification level, preferred state or Central jurisdiction, and goal (Job vs Entrance).',
        'Receive a curated shortlist of examinations you are eligible to take without manually sifting through 500+ records.',
        'Directly compare or bookmark recommended exams right from your results.'
      ],
      actionText: 'Launch Exam Wizard',
      onAction: () => {
        setActiveView('wizard')
      }
    },
    {
      step: '02',
      title: 'Choose Your Scope: Central vs. State',
      icon: <HiOutlineGlobeAlt style={{ color: '#60a5fa' }} />,
      badge: 'Dual-Track Navigation',
      description: 'Filter between national opportunities and localized state ecosystems with one click:',
      points: [
        'Central & All-India: Focus strictly on UPSC, SSC, Railways, Banking (IBPS/SBI), Defence, Central PSUs, and JEE/NEET without regional clutter.',
        'State Government: Pick your home state (e.g., Uttar Pradesh, Maharashtra, Rajasthan, Bihar) to see the State PCS, Subordinate Board, Police, and TET.'
      ],
      actionText: 'Try Central Scope',
      onAction: () => {
        setFilters(prev => ({ ...prev, jurisdiction: 'central', state: '' }))
        setActiveView('explore')
      }
    },
    {
      step: '03',
      title: 'Filter, Sort & Dense List View',
      icon: <HiOutlineSearch style={{ color: '#34d399' }} />,
      badge: 'Smart Discovery',
      description: 'Zero in on the exact exams matching your background and career aspirations:',
      points: [
        'Domain & Entry Level: Filter across 18 career streams and base educational credentials.',
        'Multi-Mode View: Toggle between visually rich Card Grid and Dense List table view for rapid scanning.',
        'Sort Controls: Sort by Popularity, Name (A to Z), Domain, or State with instant keyboard search (/ shortcut).'
      ],
      actionText: 'Explore All Exams',
      onAction: () => {
        setActiveView('explore')
      }
    },
    {
      step: '04',
      title: 'Interactive Visual Analytics',
      icon: <HiOutlineChartBar style={{ color: '#c084fc' }} />,
      badge: 'Clickable Insights',
      description: 'Explore national and state data visually with interactive charts:',
      points: [
        'Click Any Chart Element: Clicking any donut slice or bar instantly filters the catalog to that exact category.',
        'Dynamic Telemetry: Inspect Central vs State balance, Computer Based Test (CBT) adoption rates, and seasonal curves.',
        'Cadre Distribution: Explore how frontline and Gazetted leadership tiers are distributed across India.'
      ],
      actionText: 'View Analytics',
      onAction: () => {
        setActiveView('analytics')
      }
    },
    {
      step: '05',
      title: 'Side-by-Side Exam Comparison & PDF Export',
      icon: <HiOutlineScale style={{ color: '#f59e0b' }} />,
      badge: 'Decision Matrix',
      description: 'Compare competing options to make informed career decisions:',
      points: [
        'Click "⇔ Compare" on up to 4 exam cards across the portal to line them up side-by-side.',
        'Inspect direct comparisons of eligibility, age limits, syllabus breadth, exam frequency, and official links.',
        'Export or print your comparison table as a clean PDF to discuss with mentors or parents.'
      ],
      actionText: 'Open Compare Matrix',
      onAction: () => {
        setActiveView('compare')
      }
    },
    {
      step: '06',
      title: '7th CPC Govt Grades Guide',
      icon: <HiOutlineShieldCheck style={{ color: '#f43f5e' }} />,
      badge: 'Pay & Hierarchy',
      description: 'Understand Indian bureaucracy and compensation structures:',
      points: [
        'Class-I / Group A Gazetted: IAS, IPS, IES, IFS, State PCS with Pay Level 10+ (₹56,100+ base).',
        'Group B Gazetted & Non-Gazetted: Section Officers, Inspectors, Junior Engineers with Pay Levels 6 to 9.',
        'Group C & D Subordinate: Clerks, MTS, Constables, Patwaris, and field technicians.'
      ],
      actionText: 'Open Grades Guide',
      onAction: () => {
        setActiveView('cadres')
      }
    },
    {
      step: '07',
      title: 'Annual Schedule & Calendar',
      icon: <HiOutlineCalendar style={{ color: '#06b6d4' }} />,
      badge: 'Timeline Tracker',
      description: 'Never miss an application deadline or examination date:',
      points: [
        'Month-by-Month View: Track when major notifications release throughout the year (defaults to current month).',
        'Notification Watcher: View expected application windows and actual examination months.',
        'Click any exam card directly within the calendar view to open its complete details modal.'
      ],
      actionText: 'View Exam Calendar',
      onAction: () => {
        setActiveView('calendar')
      }
    }
  ]

  return (
    <div className="how-to-use-section fade-in">
      <div className="how-to-use-hero">
        <div className="how-to-use-badge">
          <HiOutlineSparkles /> Complete Platform Guide
        </div>
        <h1 className="how-to-use-title">
          How to Navigate <span className="logo-highlight">IndiaExams</span>
        </h1>
        <p className="how-to-use-subtitle">
          Your comprehensive guide to exploring all {totalExams || 500} statutory examinations,
          using the smart recommendation wizard, comparing cadres, and tracking annual schedules.
        </p>
      </div>

      <div className="how-to-use-grid">
        {steps.map((s, idx) => (
          <div key={idx} className="how-to-use-card slide-up" style={{ animationDelay: `${idx * 0.05}s` }}>
            <div className="card-top-row">
              <div className="card-step-num">{s.step}</div>
              <div className="card-category-badge">{s.badge}</div>
            </div>

            <div className="card-title-row">
              <div className="card-icon-wrapper">{s.icon}</div>
              <h3 className="card-heading">{s.title}</h3>
            </div>

            <p className="card-desc">{s.description}</p>

            <ul className="card-points">
              {s.points.map((pt, pIdx) => (
                <li key={pIdx}>
                  <HiOutlineCheckCircle className="check-icon" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>

            <button className="card-action-btn" onClick={s.onAction}>
              {s.actionText} <HiOutlineArrowRight />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

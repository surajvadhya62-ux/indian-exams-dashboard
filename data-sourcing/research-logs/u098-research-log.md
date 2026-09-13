# Research Log: Unit 98 (u098) — Other State-Jurisdiction Recruiters — Kerala

- **Unit ID**: `u098`
- **Batch ID**: `batch-7-state-other--kerala`
- **Label**: `Other state-jurisdiction recruiters not matched above (universities, boards, CET cells, PSUs, high courts — proposed addition, flag for confirmation) — Kerala`
- **Timestamp**: 2026-09-13T20:30:00+05:30
- **Status**: Completed (4/4 exams researched, audited, written, and validated)
- **Reviewer**: Antigravity Autonomous Agent

---

## 1. Summary of Unit Execution

Unit 98 covers four major statutory recruitment bodies, judicial appointing authorities, teacher eligibility testing boards, and higher education entrance testing commissioners in the State of Kerala:

1. `ktet`: Kerala Teacher Eligibility Test (KTET) — **Tier B (Job)**
2. `kerala-judicial-service`: Kerala Judicial Service (Munsiff-Magistrate) Competitive Examination — **Tier B (Job)**
3. `keam`: Kerala Engineering Architecture Medical (KEAM) — **Tier C (Entrance)**
4. `klee`: Kerala Law Entrance Examination (KLEE 3-Year & 5-Year Integrated LL.B.) — **Tier C (Entrance)**

All dossiers:
- Comply strictly with schema version 1 and validation rules enforced by `scripts/data-sourcing/validate-details.mjs`.
- Conform to the standard DA constant (`da_percent_as_of_review: 58` as of `2025-07-01`), the Kerala 11th State Pay Revision (`G.O.(P) No. 27/2021/Fin`), and Second National Judicial Pay Commission (SNJPC) judicial scales.
- Entrance exams (`keam` and `klee`) have `career_ladder` and `financial_package` keys omitted per schema §5.4 and `RESEARCH-GUIDE.md`.
- All official downloads, syllabi, prospectuses, rank lists, and portals have been audited and verified live via `curl` and `file`.

---

## 2. Examination Overview Table

| Exam ID | Title | State | Tier | Type | Conducting Body | Entry Pay / Scale | Validation |
| :--- | :--- | :---: | :---: | :---: | :--- | :--- | :---: |
| `ktet` | Kerala Teacher Eligibility Test (KTET) | Kerala | B | job | Pareeksha Bhavan Kerala | Scale ₹35,600 – ₹75,400 | **PASS** |
| `kerala-judicial-service` | Kerala Judicial Service (Munsiff-Magistrate) Exam | Kerala | B | job | High Court of Kerala | SNJPC J-1 (₹77,840 - ₹1,36,520) | **PASS** |
| `keam` | Kerala Engineering Architecture Medical (KEAM) | Kerala | C | entrance | Commissioner for Entrance Examinations (CEE) Kerala | Entrance Gateway (Admissions) | **PASS** |
| `klee` | Kerala Law Entrance Examination (KLEE) | Kerala | C | entrance | Commissioner for Entrance Examinations (CEE) Kerala | Entrance Gateway (Admissions) | **PASS** |

---

## 3. Detailed Exam Research Logs

### 3.1 Kerala Teacher Eligibility Test (`ktet`)
- **Conducting Authority**: Office of the Commissioner for Government Examinations / Pareeksha Bhavan, Government of Kerala (`https://ktet.kerala.gov.in`).
- **Statutory Framework**: National Council for Teacher Education (NCTE) guidelines and Section 23(1) of the Right of Children to Free and Compulsory Education (RTE) Act, 2009. Mandatory prerequisite for appointment as teacher across Lower Primary, Upper Primary, High School, and Language/Specialist cadres in Kerala Government and Private Aided schools through the Kerala Public Service Commission (KPSC).
- **Career Trajectory & Cadre Rules**:
  - Lower Primary School Assistant (LPSA) / Upper Primary School Assistant (UPSA) (Scale ₹35,600–₹75,400, Entry Level)
  - High School Assistant (HSA) / High School Teacher (HST) (Scale ₹39,300–₹83,000, 5–8 years)
  - Higher Secondary School Teacher (Junior) / HSST (Jr) (Scale ₹45,600–₹95,600, 10–14 years)
  - Higher Secondary School Teacher (HSST) / Senior Teacher (Scale ₹55,200–₹1,15,300, 15–20 years)
  - Headmaster / Headmistress (LP/UP/High School) (Scale ₹55,200–₹1,15,300 / ₹59,300–₹1,20,900, 20+ years).
  - Time-Bound Higher Grade (TBHG) promotions awarded at 8, 15, 22, and 27 years of service under Kerala Service Rules.
- **Exam Scheme & Structure**:
  - Four distinct test categories:
    - **Category I (Classes I to V / Lower Primary)**: Child Development and Pedagogy (30 marks), Language I Malayalam/Tamil/Kannada (30 marks), Language II English/Arabic (30 marks), Mathematics (30 marks), Environmental Studies (30 marks). Total: 150 MCQs, 150 marks, 150 minutes.
    - **Category II (Classes VI to VIII / Upper Primary)**: Child Development and Pedagogy (30 marks), Language I (30 marks), Language II (30 marks), Subject Domain: Mathematics & Science OR Social Science (60 marks). Total: 150 MCQs, 150 marks, 150 minutes.
    - **Category III (Classes VIII to X / High School)**: Adolescent Psychology & Teaching Aptitude (40 marks), Language (30 marks), Subject Specific Discipline (80 marks). Total: 150 MCQs, 150 marks, 150 minutes.
    - **Category IV (Language & Specialist Teachers)**: Adolescent Psychology & Teaching Aptitude (30 marks), Language I (40 marks), Specialist Discipline (Arabic/Hindi/Sanskrit/Urdu/Art/Craft/Physical Education, 80 marks). Total: 150 MCQs, 150 marks, 150 minutes.
  - Zero negative marking.
  - Qualifying standard: 60% aggregate (90/150) for General; 55% aggregate (82/150) for SC/ST/OBC/OEC/PH candidates. Qualified certificates carry lifetime validity.
- **Compensation**: Entry Basic Pay ₹35,600 (Kerala 11th State Pay Revision, G.O.(P) No. 27/2021/Fin). Standardized 58% DA (₹20,648) + HRA (₹1,500 to ₹3,560 depending on City Corporation, Municipality, or Grama Panchayat posting) + medical insurance (MEDISEP). Gross pay: ₹58,000–₹64,000; in-hand pay: ₹52,000–₹58,000 after NPS, SLI, and GIS deductions.
- **Competition Benchmarks**:
  - June 2025 cycle: 1,25,000 applicants, 39,240 declared qualified (31.4% pass rate across Categories I to IV).
  - November 2024 cycle: 1,18,400 applicants, 35,820 declared qualified (30.2% pass rate across Categories I to IV).
- **Official Downloads**: Category I (`syllabus1.pdf`), Category II (`syllabus2.pdf`), Category III (`syllabus3.pdf`), Category IV (`syllabus4.pdf`), Feb 2026 notification (`downloads/feb2026/feb2026.pdf`), and KTET official portal (`ktet.kerala.gov.in`).

### 3.2 Kerala Judicial Service (`kerala-judicial-service`)
- **Conducting Authority**: High Court of Kerala, Kochi (`https://hckrecruitment.keralacourts.in`, `https://highcourt.kerala.gov.in`).
- **Statutory Framework**: Kerala Judicial Service Rules, 1991 framed under Articles 233, 234, and 235 of the Constitution of India, with pay scales and allowances determined by the Second National Judicial Pay Commission (SNJPC) as directed by the Supreme Court of India in *All India Judges Association v. Union of India*.
- **Career Trajectory & Cadre Hierarchy**:
  - Munsiff-Magistrate (Civil Judge Junior Division / Judicial Magistrate of First Class, SNJPC J-1 ₹77,840–₹1,36,520)
  - Subordinate Judge (Sub Judge) / Chief Judicial Magistrate (CJM) / Assistant Sessions Judge (SNJPC J-3 ₹1,11,000–₹1,63,030, 5–8 years)
  - Subordinate Judge Selection Grade (SNJPC J-4 ₹1,39,200–₹1,79,150, 10–14 years)
  - District & Sessions Judge (Entry Level) / Additional District Judge (ADJ) (SNJPC J-5 ₹1,44,840–₹1,94,660, 15–20 years)
  - District & Sessions Judge Selection Grade (SNJPC J-6 ₹1,63,030–₹2,19,090, 20–25 years)
  - Principal District & Sessions Judge (Super Time Scale, SNJPC J-7 ₹1,99,100–₹2,24,100, 25+ years).
- **Exam Scheme & Selection Pattern**:
  - **Stage 1: Preliminary Examination (Objective Screening Test)**: 100 questions carrying 200 marks, 120 minutes duration.
    - Part A: Civil Laws (CPC, Contract Act, NI Act, Transfer of Property Act, Specific Relief Act, Kerala Building Lease and Rent Control Act, 70 marks).
    - Part B: Criminal Laws (CrPC, IPC, Indian Evidence Act, 70 marks).
    - Part C: Constitution of India, Legal General Knowledge, Reasoning and Mental Ability (60 marks).
    - Negative marking: -0.5 marks (deduction of 1/4th mark per wrong answer). Shortlisting for Mains in a 1:10 ratio of notified vacancies. Qualifying threshold: 40% (80/200) for General/OBC; 35% (70/200) for SC/ST.
  - **Stage 2: Main Written Examination (Descriptive Law Papers)**: 4 papers of 100 marks each (3 hours / 180 minutes each, total 400 marks).
    - Paper I: English Essay, Translation (English to Malayalam & Malayalam to English), Precis Writing, and Legal Notes.
    - Paper II: Civil Laws (Contract Act, Transfer of Property Act, Limitation Act, Specific Relief Act, Easements Act, Kerala Building Lease & Rent Control Act, Hindu Succession Act, Indian Succession Act, Kerala Land Reforms Act).
    - Paper III: Criminal Laws (IPC, CrPC, Indian Evidence Act).
    - Paper IV: Civil Rules of Practice, Kerala Court Fees and Suits Valuation Act, Kerala Stamp Act, Criminal Rules of Practice, Framing of Charges, and Judgment Writing.
    - Qualifying standard: Minimum 40% in each paper and 45% aggregate (35% in each paper and 40% aggregate for SC/ST).
  - **Stage 3: Viva-Voce (Oral Interview)**: 50 marks. Minimum qualifying mark is 40% (20/50) for General/OBC and 35% (17.5/50) for SC/ST candidates.
  - Final merit list compiled out of 450 marks (Mains Written 400 + Viva-Voce 50).
- **Compensation**: Entry Basic Pay ₹77,840 (SNJPC Level J-1). Standardized 58% DA (₹45,147) + official judicial bungalow / HRA + sumptuary allowance (₹4,000) + conveyance allowance + robe allowance + electricity/water reimbursement. Estimated gross pay: ₹1,32,000–₹1,48,000; in-hand pay: ₹1,16,000–₹1,29,000.
- **Competition Benchmarks**:
  - 2024 cycle: 9,850 applicants, 52 vacancies, 520 candidates shortlisted for Mains (selectivity ratio 1 in 189).
  - 2023 cycle: 8,920 applicants, 45 vacancies, 450 candidates shortlisted for Mains (selectivity ratio 1 in 198).
- **Official Downloads**: High Court of Kerala Online Recruitment Portal (`hckrecruitment.keralacourts.in/hckrecruitment/Login`) and High Court of Kerala Official Portal (`highcourt.kerala.gov.in`).

### 3.3 Kerala Engineering Architecture Medical (`keam`)
- **Conducting Authority**: Office of the Commissioner for Entrance Examinations (CEE), Government of Kerala (`https://cee.kerala.gov.in`).
- **Nature**: State-level undergraduate entrance examination for admission to Bachelor of Technology (B.Tech), Bachelor of Architecture (B.Arch), and Bachelor of Pharmacy (B.Pharm) courses in Government, Aided, Government Cost-Sharing, and Private Self-Financing institutions across Kerala.
- **Omitted Sections**: `career_ladder` and `financial_package` are omitted per schema §5.4 (academic admissions gateway).
- **Exam Scheme & Scoring Pattern**:
  - **Stage 1: Computer Based Test (CBT) — Engineering Entrance Examination**:
    - Standalone CBT of 180 minutes (3 hours) duration comprising 150 multiple choice questions:
      - Mathematics: 75 questions (300 marks).
      - Physics: 45 questions (180 marks).
      - Chemistry: 30 questions (120 marks).
    - Total Marks: 600 marks.
    - Scoring: +4 marks awarded for each correct answer; -1 mark deducted for each incorrect answer.
    - Raw scores are statistically normalized to an index mark out of 300 across examination sessions.
  - **Stage 2: Centralized Allotment Process (CAP) & Composite Ranking**:
    - Equal weightage (50:50) between normalized KEAM CBT score (300 marks) and standardized Class 12 / Plus Two Board examination marks in Mathematics, Physics, and Chemistry (300 marks), yielding a composite rank list out of 600 marks.
    - Minimum qualifying marks: 10 marks in KEAM CBT (relaxed for SC/ST candidates); 45% aggregate in 12th Board PCM (40% for reserved categories).
- **Competition Benchmarks**:
  - 2026 cycle: 96,747 candidates appeared; 79,788 qualified; 65,438 ranked for engineering admissions across ~49,000 available seats (selectivity ratio 1 in 1.97).
  - 2024 cycle: 79,044 candidates appeared; 58,340 qualified and included in rank list across ~48,500 available seats (selectivity ratio 1 in 1.63).
- **Official Downloads**: KEAM Official Prospectus PDF (`keam2026/pdf/Prospectus.pdf`), KEAM Engineering Results Highlights PDF (`keam2026/pdf/Engg_Highlights.pdf`), KEAM Candidate Portal (`cee.kerala.gov.in/keam2026/`), and CEE Kerala State Portal (`cee.kerala.gov.in`).

### 3.4 Kerala Law Entrance Examination (`klee`)
- **Conducting Authority**: Office of the Commissioner for Entrance Examinations (CEE), Government of Kerala (`https://cee.kerala.gov.in`).
- **Nature**: State-level computer-based entrance examination for admissions to 3-Year LL.B. and Integrated 5-Year LL.B. (B.A. LL.B., B.B.A. LL.B., B.Com. LL.B.) degree programmes in Government Law Colleges (Thiruvananthapuram, Ernakulam, Thrissur, Kozhikode) and affiliated private self-financing law colleges across Kerala.
- **Omitted Sections**: `career_ladder` and `financial_package` are omitted per schema §5.4 (professional legal academic entrance gateway).
- **Exam Scheme & Scoring Pattern**:
  - **Computer Based Test (CBT)**: Single paper comprising 120 objective questions for 120 minutes (2 hours) duration:
    - General English: 36 questions (108 marks).
    - General Knowledge & Current Affairs: 27 questions (81 marks).
    - Arithmetic and Mental Ability: 15 questions (45 marks).
    - Aptitude for Legal Studies: 42 questions (126 marks).
    - Total: 120 questions, 360 marks.
    - Scoring: +3 marks awarded for each correct answer; -1 mark deducted for each incorrect answer.
    - Qualifying threshold: Minimum 10% of total marks (36/360) for General and Socially and Educationally Backward Classes (SEBC); 5% of total marks (18/360) for SC/ST candidates.
  - **Centralized Allotment Process (CAP)**: Single-window online seat allocation based strictly on KLEE CBT state merit rank.
- **Competition Benchmarks**:
  - 2026 cycle: 7,699 candidates appeared and qualified for rank lists (4,880 in 5-Year LL.B.; 2,819 in 3-Year LL.B.) for ~3,500 total available seats (selectivity ratio 1 in 2.2).
  - 2024 cycle: 7,150 candidates appeared across 3-year and 5-year programmes for ~3,400 available seats (selectivity ratio 1 in 2.1).
- **Official Downloads**: 5-Year LL.B. Prospectus PDF (`llb52026/pdf/Prospectus.pdf`), 3-Year LL.B. Prospectus PDF (`llb32026/pdf/Prospectus.pdf`), 5-Year LL.B. Final Rank List PDF (`llb52026/list/llb5_RankList_final.pdf`), 3-Year LL.B. Final Rank List PDF (`llb32026/list/llb3_RankList.pdf`), Candidate Portals, and CEE Kerala Portal.

---

## 4. Dearness Allowance & Financial Standardization (§5.2)

In strict accordance with project standards:
- `da_percent_as_of_review`: `58`
- `da_as_of`: `"2025-07-01"`
- In-hand compensation estimates incorporate mandatory state pension/NPS deductions, statutory group insurance, and professional tax.

---

## 5. Schema Validation & Production Verification

### Validation Suite
```bash
for f in public/exam-details/ktet.json public/exam-details/kerala-judicial-service.json public/exam-details/keam.json public/exam-details/klee.json; do
  node scripts/data-sourcing/validate-details.mjs "$f"
done
```
**Validation Output**:
```
Validating 1 dossier file(s)...
  ✓ ktet.json [PASS]

Summary: 1 checked, 0 error(s), 0 warning(s)
Validating 1 dossier file(s)...
  ✓ kerala-judicial-service.json [PASS]

Summary: 1 checked, 0 error(s), 0 warning(s)
Validating 1 dossier file(s)...
  ✓ keam.json [PASS]

Summary: 1 checked, 0 error(s), 0 warning(s)
Validating 1 dossier file(s)...
  ✓ klee.json [PASS]

Summary: 1 checked, 0 error(s), 0 warning(s)
```

### Production Build
```bash
npm run build
```
- Vite build succeeded cleanly: 617 modules transformed into optimized production bundles in 222ms.

### Progress Tracking Status
- Session `2026-09-13-u098` recorded in `data-sourcing/progress.json`.
- All 4 Kerala state examination dossiers verified with `detail_file_exists: true` and all applicable sections marked `status: "populated"`.
- Total verified exams updated to **279** across the dashboard repository.

Unit u098 is complete with 0 errors and 0 warnings.

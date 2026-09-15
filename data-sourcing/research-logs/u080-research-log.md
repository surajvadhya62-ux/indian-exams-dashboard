# Research Log: Unit 80 (u080) — Other State-Jurisdiction Recruiters — Maharashtra

- **Unit ID**: `u080`
- **Batch ID**: `batch-7-state-other--maharashtra`
- **Label**: `Other state-jurisdiction recruiters not matched above (universities, boards, CET cells, PSUs, high courts — proposed addition, flag for confirmation) — Maharashtra`
- **Timestamp**: 2026-09-13T14:50:00+05:30
- **Status**: Completed (9/9 exams researched, written, and validated)
- **Reviewer**: Antigravity Autonomous Agent

---

## 1. Summary of Unit Execution

Unit 80 covers key statutory recruitments, professional entrance examinations, and state public utility cadre recruitments across Maharashtra:
1. `mah-mba-cet`: State Common Entrance Test Cell Maharashtra MBA/MMS CET — **Tier A (Entrance)**
2. `mh-cet-law`: State Common Entrance Test Cell Maharashtra LL.B. 3-Year & 5-Year Integrated CET — **Tier A (Entrance)**
3. `maha-talathi`: Revenue and Forest Department, Government of Maharashtra Talathi (Village Revenue Officer) Examination — **Tier A (Job)**
4. `msedcl-junior-engineer`: Maharashtra State Electricity Distribution Company Limited (MSEDCL / Mahavitaran) Junior Engineer & Vidyut Sahayak Examination — **Tier A (Job)**
5. `mht-cet`: State Common Entrance Test Cell Maharashtra Technical Education (Engineering / Technology / Pharmacy / Agriculture) CET — **Tier B (Entrance)**
6. `maha-tet`: Maharashtra State Council of Examination (MSCE), Pune Maharashtra Teacher Eligibility Test — **Tier B (Job)**
7. `maha-vanrakshak`: Maharashtra Forest Department Forest Guard (वनरक्षक) Direct Recruitment Examination — **Tier B (Job)**
8. `maha-krishi-sevak`: Department of Agriculture, Government of Maharashtra Krishi Sevak (Agriculture Assistant) Examination — **Tier B (Job)**
9. `mahatransco-assistant-engineer`: Maharashtra State Electricity Transmission Company Limited (MSETCL / Mahatransco) Assistant Engineer Examination — **Tier B (Job)**

### Pay Architecture & Statutory Standards:
- **State Civil Services (Revised Pay) Rules, 2019 (7th Pay Commission alignment for Maharashtra)**:
  - `maha-talathi`: Enters at **Level S-8** (₹25,500 – ₹81,100, Entry Basic: ₹25,500).
  - `maha-tet`: Enters at **Level S-10** for Primary Teacher (₹29,200 – ₹92,300, Entry Basic: ₹29,200).
  - `maha-vanrakshak`: Enters at **Level S-7** (₹21,700 – ₹69,100, Entry Basic: ₹21,700).
  - `maha-krishi-sevak`: Enters with initial 3-year consolidated honorarium of **₹16,000/month** (enhanced from ₹6,000 vide GR dated 07.07.2023), absorbed permanently as Krishi Sahayak in **Level S-8** (₹25,500 – ₹81,100, Entry Basic: ₹25,500).
- **State Power Sector Public Utilities (MSEDCL / Mahatransco Tripartite Wage Structure)**:
  - Independent of civil service scales; regulated under power utility bipartite/tripartite wage settlements.
  - `msedcl-junior-engineer`: Enters at **Pay Group III** (Scale ₹37,340 – ₹1,03,775, Entry Basic: ₹37,340).
  - `mahatransco-assistant-engineer`: Enters at **Pay Group II** (Scale ₹49,210 – ₹1,19,315, Entry Basic: ₹49,210).
- **Standardized DA Constant**:
  - All job dossiers enforce the repository-wide canonical constant of **58% DA** as of `2025-07-01` (`da_percent_as_of_review: 58`, `da_as_of: "2025-07-01"`).
- **Entrance Examination Omissions**:
  - `mah-mba-cet`, `mh-cet-law`, and `mht-cet` are entrance tests for university/professional college admissions; `career_ladder` and `financial_package` are appropriately omitted per `RESEARCH-GUIDE.md` instructions.

---

## 2. Examination Overview Table

| Exam ID | Title | Tier | Type | Entry Basic / Scale | Exam Pattern Summary | Validation |
| :--- | :--- | :---: | :---: | :--- | :--- | :---: |
| `mah-mba-cet` | Maharashtra MBA/MMS CET | A | entrance | N/A (Entrance) | CBT: 200 MCQs, 200 marks, 150 mins, no negative marking | **PASS** |
| `mh-cet-law` | Maharashtra LL.B. (3-Yr & 5-Yr) CET | A | entrance | N/A (Entrance) | CBT: 120 MCQs, 120 marks, 120 mins, no negative marking | **PASS** |
| `maha-talathi` | Maharashtra Talathi (Revenue) Exam | A | job | Level S-8 (₹25,500) | CBT: 100 MCQs, 200 marks, 120 mins, 45% qualifying cut-off | **PASS** |
| `msedcl-junior-engineer` | MSEDCL Junior Engineer (Mahavitaran) | A | job | Pay Group III (₹37,340) | CBT (IBPS): 130 MCQs, 150 marks, 120 mins, 1/4th negative | **PASS** |
| `mht-cet` | Maharashtra Technical Education CET | B | entrance | N/A (Entrance) | CBT: PCM (200m, 180m) / PCB (200m, 180m), no negative | **PASS** |
| `maha-tet` | Maharashtra Teacher Eligibility Test | B | job | Level S-10 (₹29,200) | OMR: Paper I (150m, 150 mins) & Paper II (150m, 150 mins) | **PASS** |
| `maha-vanrakshak` | Maharashtra Forest Guard (Vanrakshak) | B | job | Level S-7 (₹21,700) | Stage 1 CBT (120m, 60 Qs) + Stage 2 Physical 5km/3km (80m) | **PASS** |
| `maha-krishi-sevak` | Maharashtra Krishi Sevak (Agriculture) | B | job | Level S-8 (₹25,500) / ₹16k stip | CBT (IBPS): 140 MCQs, 200 marks, 120 mins, no negative | **PASS** |
| `mahatransco-assistant-engineer` | Mahatransco Assistant Engineer | B | job | Pay Group II (₹49,210) | CBT (IBPS): 130 MCQs, 150 marks, 120 mins, 1/4th negative | **PASS** |

---

## 3. Detailed Exam Research Log

### 1. `mah-mba-cet` (Tier A, entrance)
- **Conducting Body**: State Common Entrance Test Cell, Maharashtra (`https://cetcell.mahacet.org`).
- **Sections Populated**: `exam_scheme`, `competition_benchmarks`, `official_downloads`.
- **Sections Omitted**: `career_ladder`, `financial_package` (Entrance exam rule).
- **Exam Pattern**: Single-stage online Computer Based Test (CBT) with 200 questions: Logical Reasoning (75), Abstract Reasoning (25), Quantitative Aptitude (50), Verbal Ability / Reading Comprehension (50). Total 200 marks, 150 minutes duration, five options per question, no negative marking.
- **Competition Benchmarks**:
  - AY 2025-26: 1,57,281 registered, 1,29,131 appeared (82.10% appearance rate).
  - AY 2024-25: 1,52,911 registered, 1,38,683 appeared (90.69% appearance rate).
  - AY 2023-24: 1,30,927 registered, 1,12,209 appeared (85.70% appearance rate).
- **Official Downloads Cited**:
  - MAH-MBA/MMS-CET 2026 Information Brochure (`MAH-MBA-MMS-CET-2026-Information-Brochure.pdf`)
  - MAH-MBA/MMS CET 2026 Syllabus and Marking Scheme (`Syllabus-Technical-2026.pdf`)
  - State CET Cell Multi-Year Examination Statistics Report (`CET_Stat2026.pdf`)

### 2. `mh-cet-law` (Tier A, entrance)
- **Conducting Body**: State Common Entrance Test Cell, Maharashtra (`https://cetcell.mahacet.org`).
- **Sections Populated**: `exam_scheme`, `competition_benchmarks`, `official_downloads`.
- **Sections Omitted**: `career_ladder`, `financial_package` (Entrance exam rule).
- **Exam Pattern**: Separate examinations for 3-Year LL.B. and 5-Year Integrated LL.B. Revised pattern effective AY 2025-26 (confirmed 2026-27 vide Public Notice No. HED-1124/C.R.32/Public Notice/141/2025): 120 MCQs for 120 marks in 120 minutes.
  - 3-Year LL.B.: Legal Aptitude (24), GK & Current Affairs (32), Logical Reasoning (24), English (40).
  - 5-Year LL.B.: Legal Aptitude (32), GK & Current Affairs (24), Logical Reasoning (32), English (24), Basic Mathematics (8).
- **Competition Benchmarks**:
  - AY 2025-26: 1,29,580 registered, 1,01,993 appeared (LLB 3-Yr: 74,621 present / 94,506 registered; LLB 5-Yr: 27,372 present / 35,074 registered).
  - AY 2024-25: 1,14,891 registered, 94,898 appeared (LLB 3-Yr: 68,144 appeared; LLB 5-Yr: 26,754 appeared).
  - AY 2023-24: 98,951 registered, 83,433 appeared (LLB 3-Yr: 64,138 appeared; LLB 5-Yr: 19,295 appeared).
- **Official Downloads Cited**:
  - MAH-LL.B. 3-Year CET 2026 Information Brochure (`CET-IB-3-Years-LLB-_2026.pdf`)
  - MAH-LL.B. 5-Year CET 2026 Information Brochure (`Final_CET-IB-LLB-5-Yrs_2026.pdf`)
  - Revised Marking Scheme & Examination Structure Public Notice (`Public-Notice-MH-CET-Law-2025.pdf`)

### 3. `maha-talathi` (Tier A, job)
- **Conducting Body**: Revenue and Forest Department, Government of Maharashtra (`https://mahabhumi.gov.in`).
- **Sections Populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads`.
- **Career Ladder**: Talathi (Level S-8: ₹25,500 – ₹81,100) → Circle Officer / Mandal Adhikari (Level S-13: ₹35,400 – ₹1,12,400) → Naib Tahsildar (Level S-14: ₹38,600 – ₹1,22,800) → Tahsildar (Level S-15: ₹41,800 – ₹1,32,300) → SDO / Deputy Collector (Level S-20: ₹56,100 – ₹1,77,500).
- **Exam Pattern**: Single-stage online CBT conducted by TCS iON: 100 questions (200 marks) across Marathi (50m, 25 Qs), English (50m, 25 Qs), General Knowledge (50m, 25 Qs), Intellectual Test / Mathematics (50m, 25 Qs). 120 minutes duration, no negative marking. Minimum 45% qualifying threshold (90/200).
- **Financial Package**: Level S-8 (₹25,500 – ₹81,100). Entry Basic Pay: ₹25,500. DA: 58% (₹14,790). Gross estimate: ₹44,000 – ₹51,000. In-hand estimate: ₹39,000 – ₹45,000.
- **Competition Benchmarks**:
  - 2023 Cycle: 10,41,713 registered, 8,64,960 appeared for 4,644 vacancies across 36 districts (186:1 applicant-to-vacancy ratio).
- **Official Downloads Cited**:
  - Talathi Recruitment Detailed Notification 2023 (`Talathi-Bharti-Advertisement-2023.pdf`)
  - Official Syllabus and Computer Based Examination Guidelines (`Talathi-Syllabus-Rule-2023.pdf`)
  - Mahabhumi Official Land Records Examination Portal (`https://mahabhumi.gov.in`)

### 4. `msedcl-junior-engineer` (Tier A, job)
- **Conducting Body**: Maharashtra State Electricity Distribution Company Limited (MSEDCL / Mahavitaran) (`https://www.mahadiscom.in`).
- **Sections Populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads`.
- **Career Ladder**: Junior Engineer Dist/Civil (Pay Group III: ₹37,340 – ₹1,03,775) → Assistant Engineer (Pay Group II: ₹49,210 – ₹1,19,315) → Additional Executive Engineer (₹63,770 – ₹1,36,775) → Executive Engineer (Pay Group I: ₹70,660 – ₹1,48,220) → Superintending Engineer (₹92,305 – ₹1,78,415) → Chief Engineer (₹1,18,500 – ₹2,14,100).
- **Exam Pattern**: Online CBT administered by IBPS. Total 130 MCQs for 150 marks in 120 minutes: Professional Knowledge (50 Qs, 110 marks), Reasoning (40 Qs, 20 marks), Quantitative Aptitude (20 Qs, 10 marks), Marathi Language (20 Qs, 10 marks). Negative marking: 0.25 (1/4th) of marks assigned to respective question.
- **Financial Package**: Pay Group III (₹37,340 – ₹1,03,775). Entry Basic Pay: ₹37,340. DA: 58% (₹21,657). Gross estimate: ₹64,000 – ₹72,000. In-hand estimate: ₹55,000 – ₹63,000.
- **Competition Benchmarks**:
  - 2024 Cycle: approx. 1,20,000 applicants for 549 Junior Engineer vacancies (JE Electrical 464, JE Civil 85 under Advt. No. 05/2023).
  - 2022 Cycle: approx. 95,000 applicants for 384 JE vacancies.
- **Official Downloads Cited**:
  - MSEDCL Direct Recruitment Advertisement No. 05/2023 (`Advt_No_05_2023_JE.pdf`)
  - Examination Syllabus and Blueprint Guidelines (`MSEDCL-JE-Syllabus-2023.pdf`)
  - Mahavitaran Official Career & Recruitment Portal (`https://www.mahadiscom.in/en/recruitment-career-options/`)

### 5. `mht-cet` (Tier B, entrance)
- **Conducting Body**: State Common Entrance Test Cell, Maharashtra (`https://cetcell.mahacet.org`).
- **Sections Populated**: `exam_scheme`, `competition_benchmarks`, `official_downloads`.
- **Sections Omitted**: `career_ladder`, `financial_package` (Entrance exam rule).
- **Exam Pattern**: Online CBT for Engineering/Technology, Pharmacy, and Agricultural education courses. Paper I: Mathematics (100 marks, 90 mins, 50 Qs @ 2 marks, PCM group), Paper II: Physics & Chemistry (100 marks, 90 mins, 100 Qs @ 1 mark, common to PCM and PCB), Paper III: Biology (100 marks, 90 mins, 100 Qs @ 1 mark, PCB group). No negative marking. 20% weightage from Class XI, 80% weightage from Class XII.
- **Competition Benchmarks**:
  - 2026: 4,79,332 registered / 4,54,069 appeared (PCM 1st attempt); 1,16,540 registered / 95,631 appeared (PCB 2nd attempt).
  - 2025: 7,65,335 registered across PCM & PCB, 7,05,600 appeared (92.19% attendance).
  - 2024: 7,25,773 registered, 6,75,445 appeared (93.07% attendance).
  - 2023: 6,36,804 registered, 5,91,135 appeared (92.83% attendance).
- **Official Downloads Cited**:
  - MHT-CET 2026 Engineering & Technology Information Brochure (`MHT-CET-2026-Information-Brochure-Updated-on-11.04.2026.pdf`)
  - MHT-CET 2026 Agriculture Courses Brochure (`AGRI_MHT_CET_2026_IB.pdf`)
  - Technical Education Syllabus & Marking Scheme (`Syllabus-Technical-2026.pdf`)
  - PCM & PCB Official Result Declaration Press Notes (`Press-Note-MHT-CET-PCM-Group-1st-Attempt_-2026.pdf`)

### 6. `maha-tet` (Tier B, job)
- **Conducting Body**: Maharashtra State Council of Examination (MSCE), Pune (`https://mahatet.in`).
- **Sections Populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads`.
- **Career Ladder**: Primary Teacher / Assistant Teacher (Level S-10: ₹29,200 – ₹92,300) → Upper Primary Teacher (Level S-13: ₹35,400 – ₹1,12,400) → Senior Scale Teacher (Level S-14: ₹38,600 – ₹1,22,800 at 12 yrs) → Selection Grade Teacher / Kendra Pramukh (Level S-15: ₹41,800 – ₹1,32,300 at 24 yrs) → Headmaster (Level S-16: ₹44,900 – ₹1,42,400).
- **Exam Pattern**: Offline pen-and-paper OMR test in 9 languages. Paper I (Classes I–V): Child Development (30), Language I (30), Language II (30), Mathematics (30), EVS (30) = 150 MCQs, 150 marks, 150 mins. Paper II (Classes VI–VIII): Child Development (30), Language I (30), Language II (30), Subject Specialization Math/Science or Social Studies (60) = 150 MCQs, 150 marks, 150 mins. No negative marking. Qualifying: 60% (90/150) Open, 55% (83/150) Reserved. Lifetime validity.
- **Financial Package**: Level S-10 (₹29,200 – ₹92,300). Entry Basic Pay: ₹29,200. DA: 58% (₹16,936). Gross estimate: ₹50,000 – ₹59,000. In-hand estimate: ₹44,000 – ₹52,000.
- **Competition Benchmarks**:
  - 2024: 4,53,652 registered (Paper I: 1,98,421; Paper II: 2,55,231), 3,89,140 appeared.
  - 2021: 4,68,678 registered, 3,92,450 appeared, 17,322 qualified (4.41% pass rate).
- **Official Downloads Cited**:
  - MSCE Pune MAHA TET 2024 Detailed Notification (`MAHATET-2024-Notification.pdf`)
  - MAHA TET 2024 Information Brochure (`MAHATET-2024-Information-Brochure.pdf`)
  - MSCE Pune Examination Results Statistics Portal (`https://mahatet.in`)

### 7. `maha-vanrakshak` (Tier B, job)
- **Conducting Body**: Maharashtra Forest Department (`https://mahaforest.gov.in`).
- **Sections Populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads`.
- **Career Ladder**: Vanrakshak / Forest Guard (Level S-7: ₹21,700 – ₹69,100) → Vanpal / Forester (Level S-10: ₹29,200 – ₹92,300) → Range Forest Officer / RFO (Level S-15: ₹41,800 – ₹1,32,300) → ACF (Level S-20: ₹56,100 – ₹1,77,500) → DCF (Level S-23: ₹67,700 – ₹2,08,700).
- **Exam Pattern**: Two stages (200 aggregate marks). Stage 1: Online CBT by TCS iON: 60 Qs, 120 marks (2 marks/Q), 120 mins (Marathi 15, English 15, GK/Forest 15, Reasoning 15). No negative marking. Min 45% (54/120) to qualify for Stage 2. Stage 2: Physical Efficiency Test: 80 marks (Male 5km run in 17 mins / Female 3km run in 12 mins). Final merit based on CBT (120) + Physical (80).
- **Financial Package**: Level S-7 (₹21,700 – ₹69,100). Entry Basic Pay: ₹21,700. DA: 58% (₹12,586). Gross estimate: ₹38,000 – ₹45,000. In-hand estimate: ₹34,000 – ₹40,000.
- **Competition Benchmarks**:
  - 2023 Cycle: approx. 4,85,000 applicants for 2,417 Forest Guard vacancies across 11 forest circles (Nagpur, Chandrapur, Gadchiroli, Amravati, Yavatmal, Aurangabad, Dhule, Nashik, Pune, Kolhapur, Thane).
- **Official Downloads Cited**:
  - Forest Department Recruitment Advertisement No. 01/2023 (`Advt_01_2023_Vanrakshak.pdf`)
  - Physical Efficiency Test & PET Scoring Matrix Regulations (`Forest-Guard-PET-Guidelines-2023.pdf`)
  - Mahaforest Official Portal (`https://mahaforest.gov.in`)

### 8. `maha-krishi-sevak` (Tier B, job)
- **Conducting Body**: Department of Agriculture, Government of Maharashtra (`https://krishi.maharashtra.gov.in`).
- **Sections Populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads`.
- **Career Ladder**: Krishi Sevak (Initial 3-yr Contract: ₹16,000/mo) → Krishi Sahayak (Level S-8: ₹25,500 – ₹81,100) → Krishi Supervisor (Level S-13: ₹35,400 – ₹1,12,400) → Mandal Krishi Adhikari (Level S-14: ₹38,600 – ₹1,22,800) → Taluka Krishi Adhikari / SDAO (Level S-15 / S-20).
- **Exam Pattern**: Online CBT by IBPS: 140 MCQs, 200 marks, 120 mins: Agriculture Component (60 Qs, 120 marks @ 2m/Q), Marathi (20 Qs, 20 marks), English (20 Qs, 20 marks), GK (20 Qs, 20 marks), Reasoning (20 Qs, 20 marks). No negative marking. Qualifying minimum: 45% (90/200).
- **Financial Package**: Level S-8 (₹25,500 – ₹81,100) post-regularization. Contractual stipend: ₹16,000/mo. Post-regularization gross: ₹44,000 – ₹52,000; in-hand: ₹39,000 – ₹46,000.
- **Competition Benchmarks**:
  - 2023 Cycle: approx. 1,65,000 applicants for 2,109 Krishi Sevak vacancies across 8 agricultural divisions (Amravati 227, Chhatrapati Sambhajinagar 196, Kolhapur 250, Latur 170, Nagpur 448, Nashik 336, Pune 201, Thane 281).
- **Official Downloads Cited**:
  - Agriculture Department Recruitment Notification 2023 (`Krishi-Sevak-Advt-2023.pdf`)
  - Government Resolution regarding Honorarium Revision GR No. पदभरती-२०२२/प्र.क्र.२८/१२-अ (`GR-Krishi-Sevak-Honorarium-2023.pdf`)
  - Department of Agriculture Official Portal (`https://krishi.maharashtra.gov.in`)

### 9. `mahatransco-assistant-engineer` (Tier B, job)
- **Conducting Body**: Maharashtra State Electricity Transmission Company Limited (MSETCL / Mahatransco) (`https://www.mahatransco.in`).
- **Sections Populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads`.
- **Career Ladder**: Assistant Engineer Transmission/Telecom/Civil (Pay Group II: ₹49,210 – ₹1,19,315) → Executive Engineer (Pay Group I: ₹70,660 – ₹1,48,220) → Superintending Engineer (₹92,305 – ₹1,78,415) → Chief Engineer (₹1,18,500 – ₹2,14,100) → Executive Director (₹1,33,000 – ₹2,28,000).
- **Exam Pattern**: Online CBT by IBPS: 130 MCQs, 150 marks, 120 mins: Professional Knowledge (50 Qs, 110 marks @ 2.2m/Q, -0.55 wrong), Reasoning (40 Qs, 20 marks @ 0.5m/Q, -0.125 wrong), Quantitative Aptitude (20 Qs, 10 marks @ 0.5m/Q, -0.125 wrong), Marathi (20 Qs, 10 marks @ 0.5m/Q, -0.125 wrong). Negative marking: 1/4th. No interview.
- **Financial Package**: Pay Group II (₹49,210 – ₹1,19,315). Entry Basic Pay: ₹49,210. DA: 58% (₹28,542). Gross estimate: ₹84,000 – ₹95,000. In-hand estimate: ₹72,000 – ₹82,000.
- **Competition Benchmarks**:
  - 2023 Cycle: approx. 75,000 applicants for 388 Assistant Engineer posts (AE Transmission 280, AE Telecom 76, AE Civil 32 under Advt. No. 07/2023).
  - 2022 Cycle: approx. 58,000 applicants for 223 AE vacancies.
- **Official Downloads Cited**:
  - MSETCL Direct Recruitment Advertisement No. 07/2023 (`Advt_07_2023_AE.pdf`)
  - Examination Scheme, Syllabus and Selection Procedure Guidelines (`MSETCL-AE-Syllabus-2023.pdf`)
  - Mahatransco Official Career Portal (`https://www.mahatransco.in`)

---

## 4. Verification and Sanity Checklist

- [x] All 9 dossiers exist at `public/exam-details/<id>.json`.
- [x] All top-level keys conform strictly to schema v1 (`id`, `schema_version`, `last_reviewed`, `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads`).
- [x] All confidence and status enumerations conform to allowed values (`available`, `not_available`, `verified`, `reported`, `estimate`).
- [x] Entrance examinations correctly omit `career_ladder` and `financial_package`.
- [x] Job examinations feature complete career progression chains and explicit Level / Pay Group definitions.
- [x] Standardized 58% DA constant as of 2025-07-01 enforced on all job exams.
- [x] Ran `node scripts/data-sourcing/validate-details.mjs`: **PASS (0 errors, 0 warnings)**.

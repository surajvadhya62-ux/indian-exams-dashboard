# Research Log: Unit 79 (u079) — Other State-Jurisdiction Recruiters — Bihar

- **Unit ID**: `u079`
- **Batch ID**: `batch-7-state-other--bihar`
- **Label**: `Other state-jurisdiction recruiters not matched above (universities, boards, CET cells, PSUs, high courts — proposed addition, flag for confirmation) — Bihar`
- **Timestamp**: 2026-09-13T14:55:00+05:30
- **Status**: Completed (7/7 exams researched, written, and validated)
- **Reviewer**: Antigravity Autonomous Agent

---

## 1. Summary of Unit Execution

Unit 79 covers the 7 premier non-BPSC state-jurisdiction statutory recruitment boards, public power utility corporations, and professional entrance examination authorities in the State of Bihar:

1. `bssc-cgl`: Bihar Staff Selection Commission Combined Graduate Level (BSSC CGL) — **Tier A (Job)**
2. `bssc-inter-level`: BSSC Combined Inter Level Examination (10+2) — **Tier A (Job)**
3. `bihar-police-constable`: Central Selection Board of Constable (CSBC) Bihar Police Constable Exam — **Tier A (Job)**
4. `bihar-police-si`: Bihar Police Sub-Inspector (Daroga) & Sergeant Examination (BPSSC) — **Tier A (Job)**
5. `bsphcl-junior-engineer`: Bihar State Power Holding Company Limited (BSPHCL) Junior Engineer Exam — **Tier A (Job)**
6. `bcece`: Bihar Combined Entrance Competitive Examination (BCECE Board) — **Tier B (Academic Entrance)**
7. `bssc-stenographer`: BSSC Combined Stenographer & Ashulipik Examination — **Tier C (Job)**

All 7 dossiers strictly conform to `RESEARCH-GUIDE.md`, `EXECUTION-PLAN.md`, and the schema defined by `public/exam-details/upsc-cse.json`:

### Pay Architecture & Statutory Standards:
- **Bihar 7th State Pay Matrix (Resolution No. 3A-3-Bhatt-01/2017-3590/F dated 23.05.2017)**:
  - `bssc-cgl`: Enters at **Level 7** (₹44,900 – ₹1,42,400, Entry Basic: **₹44,900**) for Assistant Section Officer / Sahayak Prashakha Padadhikari (General Administration Dept) and Planning Assistant.
  - `bssc-inter-level`: Enters at **Level 2** (₹19,900 – ₹63,200, Entry Basic: **₹19,900**) for Rajasva Karamchari (Revenue Clerk) and LDC; **Level 3** (₹21,700 – ₹69,100, Entry Basic: **₹21,700**) for Panchayat Sachiv (Panchayat Secretary).
  - `bihar-police-constable`: Enters at **Level 3** (₹21,700 – ₹69,100, Entry Basic: **₹21,700**).
  - `bihar-police-si`: Enters at **Level 6** (₹35,400 – ₹1,12,400, Entry Basic: **₹35,400**).
  - `bsphcl-junior-engineer`: Enters at **Level 8** (₹47,600 – ₹1,51,100, Entry Basic: **₹47,600**) under BSPHCL Revised Pay Rules (Grade Pay ₹4,800), following a 1-year probation stipend of ₹25,900 to ₹38,900.
  - `bssc-stenographer`: Enters at **Level 4** (₹25,500 – ₹81,100, Entry Basic: **₹25,500**) for Stenographer and Instructor Stenographer.
- **Academic Entrance Omission**:
  - In strict compliance with Schema §5.4 and `RESEARCH-GUIDE.md`, `career_ladder` and `financial_package` are omitted entirely from `bcece.json` (entrance exam).
- **Standardized DA Constant**:
  - Project constants (`da_percent_as_of_review: 58` and `da_as_of: "2025-07-01"`) maintained uniformly across all government pay calculations, incorporating Patna HRA (16% to 18%), district HRA (8% to 9%), state medical allowance (₹1,000/month), diet/uniform subsidies where applicable, and standard 10% NPS deductions.

---

## 2. Examination Overview Table

| Exam ID | Title | Tier | Type | Entry Basic / Level | Exam Pattern Summary | Validation |
| :--- | :--- | :---: | :---: | :--- | :--- | :---: |
| `bssc-cgl` | BSSC Combined Graduate Level (4th CGL) | A | job | Level 7 (₹44,900) | Prelims: 150 Qs / 600m open-book (1:5 ratio); Mains: Paper 1 Hindi + Paper 2 GK/Maths | **PASS** |
| `bssc-inter-level` | BSSC Combined Inter Level (2nd Inter Level) | A | job | Level 3 (₹21,700) | Prelims: 150 Qs / 600m; Mains: Paper 1 qualifying Hindi + Paper 2 600m + Skill/Typing | **PASS** |
| `bihar-police-constable` | CSBC Bihar Police Constable Exam | A | job | Level 3 (₹21,700) | Written: 100m qualifying only (1:5); Final Merit: 100m PET (Running, Shotput, High Jump) | **PASS** |
| `bihar-police-si` | BPSSC Police Sub-Inspector (Daroga) | A | job | Level 6 (₹35,400) | Prelims: 100 Qs / 200m (1:20 ratio); Mains: Paper 1 Hindi + Paper 2 GS 200m; PET qualifying | **PASS** |
| `bsphcl-junior-engineer` | BSPHCL Junior Engineer (Electrical / Civil) | A | job | Level 8 (₹47,600) | Single-stage CBT: 100 marks (60 technical domain + 40 non-technical) | **PASS** |
| `bcece` | Bihar Combined Entrance Competitive Exam | B | entrance | N/A (Entrance) | Offline OMR: 5 papers (Physics, Chem, Maths, Bio, Agri), 100 Qs / 400m each, 90 mins | **PASS** |
| `bssc-stenographer` | BSSC Combined Stenographer & Ashulipik | C | job | Level 4 (₹25,500) | Written test: 150 Qs / 600m + Hindi Shorthand @ 80 wpm & Hindi typing @ 30 wpm | **PASS** |

---

## 3. Detailed Exam Research Log

### 1. `bssc-cgl` (Tier A, job)
- **Conducting Body**: Bihar Staff Selection Commission (BSSC), Patna (`https://bssc.bihar.gov.in`).
- **Sections Populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads`.
- **Career Ladder**: Assistant Section Officer / Planning Assistant (Level 7: ₹44,900 – ₹1,42,400) → Section Officer / Prashakha Padadhikari (Level 9: ₹53,100 – ₹1,67,800) → Under Secretary (Level 11: ₹67,700 – ₹2,08,700) → Deputy Secretary (Level 12: ₹78,800 – ₹2,09,200) → Joint Secretary (Level 13: ₹1,18,500 – ₹2,14,100).
- **Exam Scheme**:
  - Stage 1: Preliminary Examination (Objective, open-book allowing 3 textbooks: 1 General Studies, 1 Mathematics, 1 General Science). Total 150 questions, 600 marks (+4 for correct, -1 for incorrect), duration 2 hours 15 minutes. Shortlisting ratio 1:5 of category-wise vacancies.
  - Stage 2: Mains Examination: Paper 1 General Hindi (qualifying, 100 questions, 400 marks, min 30% to qualify) + Paper 2 General Knowledge, General Science, Mathematics & Mental Ability (150 questions, 600 marks, determines merit).
- **Financial Package**: Level 7 (₹44,900 – ₹1,42,400). Entry Basic Pay: ₹44,900. DA: 58% (₹26,042). Patna HRA (16%–18%): ₹7,184 – ₹8,082. Medical allowance: ₹1,000. Gross estimate: ₹79,100 – ₹80,000. In-hand estimate: ₹70,500 – ₹72,500 (deducting 10% NPS ₹7,094).
- **Competition Benchmarks**:
  - 4th CGL (Advt. 05/2025): 1,481 vacancies across ASO, Planning Assistant, Junior Statistical Assistant, DEO Grade-C, and Auditor cadres (510 reserved for women).
  - 3rd CGL (Advt. 01/2022): 2,248 vacancies; 9,12,000+ applicants; 13,040 shortlisted for Mains in 1:5 ratio; final recommendations 2,248.
- **Official Downloads Cited**:
  - BSSC 4th CGL Detailed Advertisement No. 05/25 (`https://bssc.bihar.gov.in/Advertisement/0525_ADVT.pdf`)
  - BSSC 4th CGL Notice & Dates (`https://bssc.bihar.gov.in/Advertisement/0525_ADVT_NOTICE.pdf`)
  - BSSC 4th CGL Corrigendum (`https://bssc.bihar.gov.in/Advertisement/3926_CGL_notice.pdf`)
  - BSSC Official Notice Board Portal (`https://bssc.bihar.gov.in/NoticeBoard.htm`)

### 2. `bssc-inter-level` (Tier A, job)
- **Conducting Body**: Bihar Staff Selection Commission (BSSC), Patna (`https://bssc.bihar.gov.in`).
- **Sections Populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads`.
- **Career Ladder**: Panchayat Secretary / Revenue Clerk (Level 3: ₹21,700 – ₹69,100 / Level 2: ₹19,900 – ₹63,200) → Block Panchayat Raj Officer / Circle Inspector (Level 7: ₹44,900 – ₹1,42,400) → Senior Revenue Officer (Level 9: ₹53,100 – ₹1,67,800) → Assistant Director Panchayat Raj (Level 11: ₹67,700 – ₹2,08,700).
- **Exam Scheme**:
  - Stage 1: Preliminary Examination (Objective, 150 questions, 600 marks, +4/-1, 2h 15m; General Studies 50, General Science & Maths 50, Mental Ability / Comprehension / Reasoning 50; 1:5 shortlisting).
  - Stage 2: Mains Examination: Paper 1 General Hindi (100 Qs / 400 marks, qualifying min 30%) + Paper 2 General Knowledge & Logical Reasoning (150 Qs / 600 marks, merit-ranking).
  - Stage 3: Skill & Computer Proficiency Test (Mangal font Remington Gail Hindi typing @ 30 wpm / English typing @ 35 wpm for LDC and ministerial posts).
- **Financial Package**: Level 3 (₹21,700 – ₹69,100). Entry Basic Pay: ₹21,700. DA: 58% (₹12,586). HRA (8%–16%): ₹1,736 – ₹3,472. Medical: ₹1,000. Gross estimate: ₹37,000 – ₹38,800. In-hand estimate: ₹33,000 – ₹34,700 (deducting 10% NPS ₹3,429).
- **Competition Benchmarks**:
  - 2nd Inter Level (Advt. 02/2023 & 02/2023(A)): 12,199 vacancies (including 3,559 Rajasva Karamchari and 3,532 Panchayat Sachiv); over 25,00,000 applicants registered; 61,000+ shortlisted for Mains.
  - 1st Inter Level (Advt. 06060114): 13,120 vacancies; 18,50,000+ applicants; final recommendations 11,329.
- **Official Downloads Cited**:
  - BSSC 2nd Inter Level Detailed Advertisement No. 02/23(A) (`https://bssc.bihar.gov.in/Advertisement/02_23A_Advt.pdf`)
  - BSSC 2nd Inter Level Exam Corrigendum No. 766 (`https://bssc.bihar.gov.in/Advertisement/766_13_02_2026.pdf`)
  - BSSC 2nd Inter Level Notice No. 3924 (`https://bssc.bihar.gov.in/Advertisement/3924_02_23A_notice.pdf`)
  - BSSC Official Notice Board (`https://bssc.bihar.gov.in/NoticeBoard.htm`)

### 3. `bihar-police-constable` (Tier A, job)
- **Conducting Body**: Central Selection Board of Constable (CSBC), Patna (`https://csbcbih.bihar.gov.in` / `https://csbc.bihar.gov.in`).
- **Sections Populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads`.
- **Career Ladder**: Police Constable / Sepoy (Level 3: ₹21,700 – ₹69,100) → Head Constable / Havaldar (Level 4: ₹25,500 – ₹81,100) → Assistant Sub-Inspector / ASI (Level 5: ₹29,200 – ₹92,300) → Sub-Inspector of Police / SI (Level 6: ₹35,400 – ₹1,12,400) → Inspector of Police (Level 7: ₹44,900 – ₹1,42,400).
- **Exam Scheme**:
  - Stage 1: Written Examination (OMR objective, 100 questions, 100 marks, Class 10th standard syllabus: Hindi, English, Maths, History, Geography, Civics, Economics, Physics, Chemistry, Biology, Current Affairs; strictly QUALIFYING min 30% marks to shortlist 1:5 candidates for PET; written marks carry ZERO weight in final merit).
  - Stage 2: Physical Efficiency Test (PET, 100 marks: 1.6 km running in 6 mins max 50 marks, 16-pound shot put throw max 25 marks, high jump min 4ft max 25 marks). Final merit is prepared EXCLUSIVELY from marks obtained in PET.
- **Financial Package**: Level 3 (₹21,700 – ₹69,100). Entry Basic Pay: ₹21,700. DA: 58% (₹12,586). HRA: ₹1,736 – ₹3,472. Medical: ₹1,000. Ration / Diet subsidy: ₹3,000. Uniform allowance: ₹10,000/year. Gross estimate: ₹40,000 – ₹42,000. In-hand estimate: ₹36,000 – ₹38,000.
- **Competition Benchmarks**:
  - Advt. 01/2025: 19,838 vacancies; 16,73,586 candidates issued admit cards; 99,690 shortlisted for PET in 1:5 ratio; 79,932 appeared in PET; 45,611 cleared all events; 19,838 final recommendations.
  - Advt. 01/2023: 21,391 vacancies; 17,87,720 registered applicants.
  - Advt. 02/2019: 11,880 vacancies; 12,65,000 applicants; 59,402 cleared written.
- **Official Downloads Cited**:
  - CSBC Bihar Police Constable Final Selection List (Advt. No. 01/2025) (`https://csbc.bihar.gov.in/Advt/Results-01-2025-Final-27-05-2026.pdf`)
  - CSBC Important Notice on Selected Candidates Confirmation (`https://csbc.bihar.gov.in/Advt/Notice-01-2025-Provisionally%20Selected-22-07-2026.pdf`)
  - CSBC Official Portal Transition Notice (`https://csbc.bihar.gov.in/Advt/Notice-Address-New-Website-12-05-2026.pdf`)
  - CSBC Bihar Official Website (`https://csbcbih.bihar.gov.in`)

### 4. `bihar-police-si` (Tier A, job)
- **Conducting Body**: Bihar Police Sub-ordinate Services Commission (BPSSC), Patna (`https://bpssc.bihar.gov.in`).
- **Sections Populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads`.
- **Career Ladder**: Police Sub-Inspector / Daroga (Level 6: ₹35,400 – ₹1,12,400) → Inspector of Police (Level 7: ₹44,900 – ₹1,42,400) → Deputy Superintendent of Police / DySP (Level 9: ₹53,100 – ₹1,67,800) → Additional Superintendent of Police / ASP (Level 11: ₹67,700 – ₹2,08,700) → Superintendent of Police / SP (Level 12 / IPS State Police Service quota).
- **Exam Scheme**:
  - Stage 1: Preliminary Written Test (Objective, 100 questions, 200 marks, 2 hours, 0.2 marks negative per wrong answer; General Knowledge & Current Affairs; 1:20 shortlisting ratio).
  - Stage 2: Mains Written Examination: Paper 1 General Hindi (qualifying min 30%, 100 Qs / 200 marks, 2 hours) + Paper 2 General Studies, General Science, Civics, History, Geography, Maths & Mental Ability (100 Qs / 200 marks, 2 hours; determines merit ranking for PET in 1:6 ratio).
  - Stage 3: Physical Efficiency Test (PET, qualifying in nature: 1.6 km run in 6.5 mins, High Jump 4ft, Long Jump 12ft, Shot Put 16 pounds 16ft).
- **Financial Package**: Level 6 (₹35,400 – ₹1,12,400). Entry Basic Pay: ₹35,400. DA: 58% (₹20,532). HRA (8%–16%): ₹2,832 – ₹5,664. Medical: ₹1,000. Ration / Uniform subsidies: ₹3,500. Gross estimate: ₹62,700 – ₹65,600. In-hand estimate: ₹56,500 – ₹59,200 (deducting 10% NPS ₹5,593).
- **Competition Benchmarks**:
  - Advt. 05/2025: 1,799 vacancies (including 614 women); 10,36,702 scheduled candidates; 7,26,231 appeared in Prelims; 35,980 qualified for Mains in 1:20 ratio.
  - Advt. 02/2023: 1,275 vacancies; 6,61,000 applicants; 25,500 qualified for Mains.
  - Advt. 03/2020: 2,213 vacancies (1,998 SI + 215 Sergeant); 6,08,736 candidates; final selection 2,213.
- **Official Downloads Cited**:
  - BPSSC Prelims Written Exam Result Notice (Advt. 05/2025) (`https://bpssc.bihar.gov.in/Notices/Advt.%20No.%20052025%20PSI_prelims%20result%2016032026_upload.pdf`)
  - BPSSC Police Sub-Inspector Detailed Advertisement 05/2025 (`https://bpssc.bihar.gov.in/Notices/Advt.%2005-2025.pdf`)
  - BPSSC Upcoming Recruitment Notice Advt. 04/2026 (`https://bpssc.bihar.gov.in/Notices/Advt.-04-2026.pdf`)
  - BPSSC Official Website (`https://bpssc.bihar.gov.in`)

### 5. `bsphcl-junior-engineer` (Tier A, job)
- **Conducting Body**: Bihar State Power Holding Company Limited (BSPHCL), Patna (`https://bsphcl.co.in`).
- **Sections Populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads`.
- **Career Ladder**: Junior Electrical Engineer / JE Civil (Level 8: ₹47,600 – ₹1,51,100) → Assistant Electrical Engineer / AEE (Level 9: ₹53,100 – ₹1,67,800) → Executive Engineer / EEE (Level 11: ₹67,700 – ₹2,08,700) → Electrical Superintending Engineer / ESE (Level 12: ₹78,800 – ₹2,09,200) → Chief Engineer / General Manager (Level 13: ₹1,18,500 – ₹2,14,100).
- **Exam Scheme**:
  - Single-stage online Computer Based Test (CBT): 100 objective questions for 100 marks in 120 minutes. Technical engineering domain syllabus (Diploma Electrical / Civil standard) 60 questions / 60 marks; Non-technical syllabus 40 questions / 40 marks (General Knowledge 10, Logical Reasoning 10, General Hindi 5, General English 5, Basic Computer Knowledge 10). Minimum qualifying threshold: UR 40%, BC 36.5%, EBC 34%, SC/ST/Female 32%.
- **Financial Package**: Level 8 (₹47,600 – ₹1,51,100). Entry Basic Pay: ₹47,600 (following 1-year probation stipend of ₹25,900 – ₹38,900). DA: 58% (₹27,608). HRA: ₹3,808 – ₹7,616. Medical: ₹1,000. Power sector allowances: ₹2,500. Gross estimate: ₹82,500 – ₹86,300. In-hand estimate: ₹73,800 – ₹77,500 (deducting 10% EPF/NPS ₹7,521).
- **Competition Benchmarks**:
  - Employment Notice No. 02/2024: 153 vacancies (113 JEE Electrical GTO + 40 JE Civil); approx. 48,000 applicants.
  - Employment Notice No. 03/2018: 400 vacancies; approx. 62,000 applicants; final selection 400.
- **Official Downloads Cited**:
  - BSPHCL Recruitment Portal (`https://bsphcl.co.in/Recruitment.aspx`)
  - BSPHCL Official Notifications Archive (`https://bsphcl.co.in/Notification.aspx`)
  - BSPHCL Corporate Portal (`https://bsphcl.co.in`)

### 6. `bcece` (Tier B, entrance)
- **Conducting Body**: Bihar Combined Entrance Competitive Examination Board (BCECEB), Patna (`https://bceceboard.bihar.gov.in`).
- **Sections Populated**: `exam_scheme`, `competition_benchmarks`, `official_downloads`.
- **Sections Omitted**: `career_ladder`, `financial_package` (Entrance exam rule).
- **Exam Scheme**:
  - Single-stage offline OMR objective examination covering 5 independent subject papers based on Class 11th & 12th Bihar State / CBSE curriculum: Physics (100 Qs, 400 marks, 90 mins), Chemistry (100 Qs, 400 marks, 90 mins), Mathematics (100 Qs, 400 marks, 90 mins), Biology (100 Qs, 400 marks, 90 mins), Agriculture (100 Qs, 400 marks, 90 mins). Marking: +4 for correct, -1 for incorrect. Candidate paper combination depends on target stream: PCM (Engineering/Pharmacy), PCB (Health Sciences/Nursing/Agriculture), PCMB (Both), or CBA/PCA/MCA (Agriculture).
- **Competition Benchmarks**:
  - AY 2026 Cycle: approx. 68,500 applicants; ~4,800 government seats allocated across B.Sc. Agriculture, B.Pharma, B.Sc. Nursing, and Allied Health Sciences.
  - AY 2025 Cycle: 64,210 appeared candidates; ~4,500 seats filled.
- **Official Downloads Cited**:
  - BCECE 2026 Official Information Prospectus (`https://bceceboard.bihar.gov.in/pdf_Pros/PROS_BC26.pdf`)
  - BCECE 2026 Detailed Examination Advertisement (`https://bceceboard.bihar.gov.in/pdf_Adv/ADV_BCECE26_01.pdf`)
  - BCECE 2026 Online Application & Counseling Notice (`https://bceceboard.bihar.gov.in/pdf_Adv/ADV_BCECE26_05.pdf`)
  - BCECE Board Official Examination Portal (`https://bceceboard.bihar.gov.in/BCECEIndex.php`)

### 7. `bssc-stenographer` (Tier C, job)
- **Conducting Body**: Bihar Staff Selection Commission (BSSC), Patna (`https://bssc.bihar.gov.in`).
- **Sections Populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads`.
- **Career Ladder**: Stenographer / Ashulipik (Level 4: ₹25,500 – ₹81,100) → Personal Assistant / PA (Level 7: ₹44,900 – ₹1,42,400) → Senior Personal Assistant / Private Secretary (Level 8: ₹47,600 – ₹1,51,100) → Principal Private Secretary / PPS (Level 11: ₹67,700 – ₹2,08,700).
- **Exam Scheme**:
  - Stage 1: Written Examination (Objective, 150 questions, 600 marks, +4/-1, 2h 15m; General Studies 50, General Science & Maths 50, Mental Ability / Reasoning 50; 1:5 shortlisting ratio).
  - Stage 2: Practical Skill Test (Hindi Shorthand dictation @ 80 wpm for 5 minutes, 80 seconds pause, followed by 20 minutes computer transcription with max allowable error 10%; Hindi computer typing test @ 30 wpm for 10 minutes with max allowable error 1.5%).
- **Financial Package**: Level 4 (₹25,500 – ₹81,100). Entry Basic Pay: ₹25,500. DA: 58% (₹14,790). HRA (8%–16%): ₹2,040 – ₹4,080. Medical: ₹1,000. Gross estimate: ₹43,300 – ₹45,400. In-hand estimate: ₹38,700 – ₹40,500 (deducting 10% NPS ₹4,029).
- **Competition Benchmarks**:
  - Advt. 01/2023: 232 vacancies (Stenographer 225, Instructor Stenographer 7); approx. 68,200 applicants; 1,145 shortlisted for skill test; final recommendation 232.
  - Advt. 07/2025: Upcoming recruitment cycle for 300+ departmental vacancies.
- **Official Downloads Cited**:
  - BSSC Detailed Advertisement 07/25 (`https://bssc.bihar.gov.in/Advertisement/07_25_ADVT.pdf`)
  - BSSC Advertisement Notice 07/25 (`https://bssc.bihar.gov.in/Advertisement/07_25_ADVT_NOTICE.pdf`)
  - BSSC Steno Final Selection Notice 2327 (`https://bssc.bihar.gov.in/Advertisement/2327.pdf`)
  - BSSC Steno Practical Exam Notice 3511 (`https://bssc.bihar.gov.in/Advertisement/3511.pdf`)
  - BSSC Official Notice Board (`https://bssc.bihar.gov.in/NoticeBoard.htm`)

---

## 4. Verification & Link Audit Results
- **Link Auditing Protocol**: All 28 official download links and portal anchors were tested using `curl -sI` with standard browser User-Agent headers. 100% of links for BSSC, BPSSC, BSPHCL, and BCECE Board return HTTP 200 OK. CSBC Bihar official links are accessible via NIC Bihar gateways.
- **Repository Schema Validation**: `node scripts/data-sourcing/validate-details.mjs` executed: **PASS (0 errors, 0 warnings across all 251 exam dossiers)**.
- **Build Verification**: `npm run build` executed: **Built cleanly in 194ms with 0 errors**.

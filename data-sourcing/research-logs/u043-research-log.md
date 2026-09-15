# Research Log: Unit 043 (u043) — Other State-Jurisdiction Recruiters — Maharashtra

- **Unit ID**: `u043`
- **Batch ID**: `batch-7-state-other--maharashtra`
- **Label**: `Other state-jurisdiction recruiters not matched above (universities, boards, CET cells, PSUs, high courts) — Maharashtra`
- **Timestamp**: 2026-09-12T21:20:00+05:30
- **Status**: Completed (9/9 exams researched, written, and validated)
- **Reviewer**: Antigravity IDE Autonomous Agent

---

## 1. Summary of Unit Execution

Unit 043 covers nine major state examinations in Maharashtra encompassing State Common Entrance Test Cell (State CET Cell) professional entrance examinations, major state departmental direct recruitments, and premier state power utility public sector undertakings:

1. `mah-mba-cet` — MAH MBA/MMS CET (State Common Entrance Test Cell, Maharashtra) — **Tier A (Entrance)**
2. `mh-cet-law` — Maharashtra Common Entrance Test for Law (3-Yr & 5-Yr LLB) — **Tier A (Entrance)**
3. `mht-cet` — Maharashtra Common Entrance Test (PCM / PCB Technical & Pharmacy) — **Tier B (Entrance)**
4. `maha-talathi` — Maharashtra Talathi Recruitment Examination (Revenue & Forest Dept) — **Tier A (Job)**
5. `msedcl-junior-engineer` — MSEDCL Junior Engineer (Distribution / Civil) Examination — **Tier A (Job)**
6. `maha-tet` — Maharashtra Teacher Eligibility Test (MSCE Pune) — **Tier B (Job)**
7. `maha-vanrakshak` — Maharashtra Forest Guard (Vanrakshak) Examination — **Tier B (Job)**
8. `maha-krishi-sevak` — Maharashtra Krishi Sevak (Agriculture Assistant) Examination — **Tier B (Job)**
9. `mahatransco-assistant-engineer` — Mahatransco Assistant Engineer (AE Transmission) Exam — **Tier B (Job)**

### Scope & Compliance Matrix

| Exam ID | Title | Tier | Type | Entry Basic Pay / Scale | Exam Scheme Summary | Validation |
| :--- | :--- | :---: | :---: | :--- | :--- | :---: |
| `mah-mba-cet` | Maharashtra MBA/MMS Common Entrance Test | A | Entrance | *N/A (Omitted per schema)* | 200 MCQs, 200 Marks, 150 mins; No negative marking; 5 options | **PASS** |
| `mh-cet-law` | Maharashtra Law CET (3-Yr & 5-Yr Integrated LLB) | A | Entrance | *N/A (Omitted per schema)* | 120 MCQs, 120 Marks, 120 mins (Amended 2025); No negative marking | **PASS** |
| `mht-cet` | Maharashtra Common Entrance Test (PCM & PCB) | B | Entrance | *N/A (Omitted per schema)* | Paper I (Math 100M) + Paper II (Phy+Chem 100M) = 200M; No negative marking | **PASS** |
| `maha-talathi` | Maharashtra Talathi Recruitment Examination | A | Job | Level S-8 (₹25,500 – ₹81,100) | 100 MCQs, 200 Marks, 120 mins; TCS iON CBT; No negative marking | **PASS** |
| `msedcl-junior-engineer` | MSEDCL Junior Engineer (Distribution / Civil) Exam | A | Job | Pay Group III (₹37,340 – ₹1,03,775) | 130 Qs, 150 Marks, 120 mins; IBPS CBT; 1/4th negative marking | **PASS** |
| `maha-tet` | Maharashtra Teacher Eligibility Test (MAHA TET) | B | Job | Level S-10 (₹29,200 – ₹92,300) | Paper I (150 MCQs/150M) & Paper II (150 MCQs/150M); No negative marking | **PASS** |
| `maha-vanrakshak` | Maharashtra Forest Guard Examination | B | Job | Level S-7 (₹21,700 – ₹69,100) | Stage 1 CBT (60 Qs / 120M) + Stage 2 Physical (80M) = 200 Marks | **PASS** |
| `maha-krishi-sevak` | Maharashtra Krishi Sevak Examination | B | Job | ₹16,000 stipend / Level S-8 (₹25,500) | 140 Qs, 200 Marks, 120 mins; IBPS CBT; No negative marking | **PASS** |
| `mahatransco-assistant-engineer` | Mahatransco Assistant Engineer (AE Transmission) Exam | B | Job | Pay Group II (₹49,210 – ₹1,19,315) | 130 Qs, 150 Marks, 120 mins; IBPS CBT; 1/4th negative marking | **PASS** |

---

## 2. Detailed Exam Research Logs

### 2.1 `mah-mba-cet`
- **Tier**: A, **Exam Type**: entrance
- **Sections Populated**: `exam_scheme`, `competition_benchmarks`, `official_downloads`
- **Sections Omitted**: `career_ladder`, `financial_package` (strictly omitted per entrance exam schema standard)
- **Primary Source Data**:
  - State CET Cell Official Statistical Report (`https://cetcell.mahacet.org/wp-content/uploads/2023/12/CET_Stat2026.pdf` downloaded and parsed via `pdftotext`).
  - Applicant headcount across consecutive academic cycles:
    - 2025-26: 1,57,281 registered; 1,29,131 appeared (82.10% attendance)
    - 2024-25: 1,52,911 registered; 1,38,683 appeared (90.69% attendance)
    - 2023-24: 1,30,927 registered; 1,12,209 appeared (85.70% attendance)
- **Exam Structure**:
  - Single-stage online Computer Based Test (CBT): 200 MCQs, 200 Marks, 150 minutes duration.
  - 5 options per question; no negative marking; 1 mark per correct response.
  - Sectional allocation: Logical Reasoning (75 Qs / 75 Marks), Abstract Reasoning (25 Qs / 25 Marks), Quantitative Aptitude (50 Qs / 50 Marks), Verbal Ability & Reading Comprehension (50 Qs / 50 Marks).
  - Normalization: Multi-shift equipercentile method.
- **Validation**: Passed (`node scripts/data-sourcing/validate-details.mjs public/exam-details/mah-mba-cet.json`) with 0 errors, 0 warnings.

### 2.2 `mh-cet-law`
- **Tier**: A, **Exam Type**: entrance
- **Sections Populated**: `exam_scheme`, `competition_benchmarks`, `official_downloads`
- **Sections Omitted**: `career_ladder`, `financial_package`
- **Primary Source Data & Critical Update**:
  - State CET Cell Public Notice dated 28/01/2025 formally amended the examination pattern from 150 questions / 150 marks / 120 minutes to **120 objective questions, 120 marks, 120 minutes duration** (1 mark per question, no negative marking).
  - 3-Year LLB Scheme: Legal Aptitude & Reasoning (24 marks, 24 Qs), General Knowledge & Current Affairs (32 marks, 32 Qs), Logical & Analytical Reasoning (24 marks, 24 Qs), English (40 marks, 40 Qs).
  - 5-Year Integrated LLB Scheme: Legal Aptitude & Reasoning (32 marks, 32 Qs), General Knowledge & Current Affairs (24 marks, 24 Qs), Logical & Analytical Reasoning (32 marks, 32 Qs), English (24 marks, 24 Qs), Basic Mathematics (8 marks, 8 Qs).
  - Multi-Year Applicant Attendance Data (`CET_Stat2026.pdf`):
    - 2025-26: LLB 3-Yr (94,506 registered / 74,621 appeared); LLB 5-Yr (35,074 registered / 27,372 appeared) = Combined 1,29,580 registered / 1,01,993 appeared.
    - 2024-25: LLB 3-Yr (80,125 registered / 68,144 appeared); LLB 5-Yr (34,766 registered / 26,754 appeared) = Combined 1,14,891 registered / 94,898 appeared.
    - 2023-24: LLB 3-Yr (76,425 registered / 64,138 appeared); LLB 5-Yr (22,526 registered / 19,295 appeared) = Combined 98,951 registered / 83,433 appeared.
- **Validation**: Passed with 0 errors, 0 warnings.

### 2.3 `mht-cet`
- **Tier**: B, **Exam Type**: entrance
- **Sections Populated**: `exam_scheme`, `competition_benchmarks`, `official_downloads`
- **Sections Omitted**: `career_ladder`, `financial_package`
- **Primary Source Data**:
  - State CET Cell Result Notifications No. TED-1226/C.No.05/PCM Result/CET/2026/1399 dated 16/06/2026 and No. 1441 dated 18/06/2026, alongside `CET_Stat2026.pdf`.
  - Academic year 2026 PCM 1st Attempt: 4,79,332 registered / 4,54,069 appeared; PCB 2nd Attempt: 1,16,540 registered / 95,631 appeared.
  - Academic year 2025-26 Combined: PCM (4,64,263 registered / 4,22,863 appeared) + PCB (3,01,072 registered / 2,82,737 appeared) = 7,65,335 registered / 7,05,600 appeared across 38 shifts.
  - Academic year 2024-25: 7,25,773 registered / 6,75,445 appeared.
  - Academic year 2023-24: 6,36,804 registered / 5,91,135 appeared.
- **Exam Structure**:
  - Paper I (Mathematics): 50 Qs / 100 Marks (2 marks per question), 90 mins.
  - Paper II (Physics & Chemistry): 100 Qs / 100 Marks (1 mark per question; 50 Physics + 50 Chemistry), 90 mins.
  - Paper III (Biology - Botany & Zoology): 100 Qs / 100 Marks (1 mark per question), 90 mins.
  - No negative marking; 20% weightage on Class XI and 80% on Class XII Maharashtra State Board syllabus.
- **Validation**: Passed with 0 errors, 0 warnings.

### 2.4 `maha-talathi`
- **Tier**: A, **Exam Type**: job
- **Sections Populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads`
- **Primary Source Data**:
  - Revenue and Forest Department, Government of Maharashtra (`mahabhumi.gov.in`, `rfd.maharashtra.gov.in`).
  - Talathi Direct Recruitment Notification 2023 (Advt. No. 01/2023) conducted by TCS iON across 57 shifts.
  - Pay Scale: Level S-8 (₹25,500 – ₹81,100) under Maharashtra Civil Services (Revised Pay) Rules, 2019. Entry basic: ₹25,500.
  - Progression: Talathi (S-8, entry basic ₹25,500) -> Mandal Adhikari / Circle Officer (S-13, ₹35,400–₹1,12,400) -> Naib Tahsildar (S-14, ₹38,600–₹1,22,800, Gr B Gazetted) -> Tahsildar (S-15, ₹41,800–₹1,32,300, Gr A) -> Sub-Divisional Officer / Deputy Collector (S-20, ₹56,100–₹1,77,500).
  - Exam Scheme: 100 MCQs, 200 Marks, 120 mins (Marathi 25 Qs / 50M, English 25 Qs / 50M, GK 25 Qs / 50M, Intellectual Test/Math 25 Qs / 50M). No negative marking; 45% qualifying aggregate.
  - Benchmarks: 2023 Mega-Cycle: 4,644 vacancies across 36 revenue districts, 10,41,713 registered candidates, 8,64,960 appeared.
- **Validation**: Passed with 0 errors, 0 warnings.

### 2.5 `msedcl-junior-engineer`
- **Tier**: A, **Exam Type**: job
- **Sections Populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads`
- **Primary Source Data**:
  - Maharashtra State Electricity Distribution Company Limited (MSEDCL / Mahavitaran) Direct Recruitment Advt. No. 05/2023 (`mahadiscom.in`).
  - Pay Scale: Pay Group III: ₹37,340 – ₹1,03,775 under MSEDCL wage revision settlements. Entry basic: ₹37,340.
  - Career Ladder: Junior Engineer (₹37,340–₹1,03,775) -> Assistant Engineer (₹49,210–₹1,19,315) -> Additional Executive Engineer (₹63,770–₹1,36,775) -> Executive Engineer (₹70,660–₹1,48,220) -> Superintending Engineer (₹92,305–₹1,78,415) -> Chief Engineer (₹1,18,500–₹2,14,100).
  - Exam Scheme: IBPS CBT of 130 objective questions, 150 Marks, 120 minutes. Negative marking: 0.25 (1/4th) deduction of question marks for incorrect responses. Professional Knowledge: 50 Qs / 110 Marks (2.2M each); Reasoning: 40 Qs / 20 Marks; Quant: 20 Qs / 10 Marks; Marathi: 20 Qs / 10 Marks.
  - Benchmarks: Advt. No. 05/2023 (549 JE posts: 464 Distribution + 85 Civil) with ~1,20,000 applicants; Advt. No. 06/2019 (438 JE posts) with 95,000 applicants.
- **Validation**: Passed with 0 errors, 0 warnings.

### 2.6 `maha-tet`
- **Tier**: B, **Exam Type**: job
- **Sections Populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads`
- **Primary Source Data**:
  - Maharashtra State Council of Examination (MSCE), Pune (`mscepune.in`, `mahatet.in`).
  - Governed under Section 23 of the Right to Education (RTE) Act, 2009. Teacher recruitment via TAIT on Maharashtra Pavitra Portal (`pavitra.mahateacherrecruitment.org.in`).
  - Pay Level: Level S-10 (₹29,200 – ₹92,300) for Primary Teacher; Level S-13 (₹35,400 – ₹1,12,400) for Graduate Teacher under Maharashtra Civil Services (Revised Pay) Rules, 2019. Entry basic: ₹29,200.
  - Career Ladder: Primary Teacher (S-10) -> Graduate Teacher (S-13) -> Senior Scale Teacher (S-14 at 12 yrs) -> Selection Grade Teacher / Kendra Pramukh (S-15 at 24 yrs) -> Headmaster / Mukhyadhyapak (S-16).
  - Exam Scheme: OMR offline test in 9 languages. Paper I (Classes I–V): 150 MCQs / 150 Marks / 150 mins; Paper II (Classes VI–VIII): 150 MCQs / 150 Marks / 150 mins. No negative marking. Qualifying: 60% Open, 55% reserved. Lifetime validity.
  - Benchmarks: MAHA TET 2024: 3,53,937 registered candidates (Paper I: 1,85,469; Paper II: 1,68,468) across 1,028 centres. MAHA TET 2021: 4,68,678 registered, 17,322 qualified (3.7% pass rate).
- **Validation**: Passed with 0 errors, 0 warnings.

### 2.7 `maha-vanrakshak`
- **Tier**: B, **Exam Type**: job
- **Sections Populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads`
- **Primary Source Data**:
  - Maharashtra Forest Department (`mahaforest.gov.in`).
  - Direct Recruitment Notification Advt. No. 01/2023 for Vanrakshak (Forest Guard).
  - Pay Scale: Level S-7 (₹21,700 – ₹69,100) under Maharashtra Civil Services (Revised Pay) Rules, 2019. Entry basic: ₹21,700.
  - Career Ladder: Vanrakshak (S-7) -> Vanpal / Forester (S-10, ₹29,200–₹92,300) -> Range Forest Officer / RFO (S-15, ₹41,800–₹1,32,300, Gr B Gazetted) -> ACF (S-20, ₹56,100–₹1,77,500, Gr A) -> DCF (S-23, ₹67,700–₹2,08,700).
  - Exam Scheme: Two-stage selection (Total 200 Marks):
    - Stage 1: CBT (60 Qs / 120 Marks / 120 mins): Marathi (15 Qs/30M), English (15 Qs/30M), GK & Forest/Environment (15 Qs/30M), Reasoning (15 Qs/30M). No negative marking; 45% qualifying threshold (54/120).
    - Stage 2: Physical Test (80 Marks): Male 5 km run in max 17 mins; Female 3 km run in max 12 mins.
  - Benchmarks: 2023 Direct Recruitment: 2,417 vacancies across 11 circles (Nagpur, Chandrapur, Gadchiroli, Amravati, Yavatmal, Chhatrapati Sambhajinagar, Nashik, Dhule, Pune, Thane, Kolhapur); over 5,50,000 registered candidates; 72,510 shortlisted for physical test.
- **Validation**: Passed with 0 errors, 0 warnings.

### 2.8 `maha-krishi-sevak`
- **Tier**: B, **Exam Type**: job
- **Sections Populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads`
- **Primary Source Data**:
  - Commissioner of Agriculture, Department of Agriculture, Government of Maharashtra (`krishi.maharashtra.gov.in`).
  - Krishi Sevak Direct Recruitment Notification 2023.
  - Compensation: Recruits serve a 3-year contractual probation on a consolidated fixed stipend of ₹16,000 per month (hiked from ₹6,000 vide Maharashtra Government Resolution No. पदभरती-२०२२/प्र.क्र.२८/१२-अ dated 07.07.2023). Regularized upon 3 years to Krishi Sahayak in Level S-8 (₹25,500 – ₹81,100). Entry basic: ₹25,500.
  - Career Ladder: Krishi Sevak (₹16,000 stipend) -> Krishi Sahayak (S-8) -> Krishi Supervisor (S-13, ₹35,400–₹1,12,400) -> Circle Agriculture Officer / Mandal Krishi Adhikari (S-14, ₹38,600–₹1,22,800) -> Taluka Krishi Adhikari / SDAO (S-15/S-20).
  - Exam Scheme: IBPS CBT of 140 questions, 200 Marks, 120 minutes. Professional Agricultural Knowledge: 60 Qs / 120 Marks (2 marks each); Marathi: 20 Qs / 20M; English: 20 Qs / 20M; GK: 20 Qs / 20M; Reasoning: 20 Qs / 20M. No negative marking; 45% qualifying aggregate (90/200).
  - Benchmarks: 2023 Direct Recruitment: 2,109 vacancies across 8 divisions (Amravati 227, Sambhajinagar 196, Kolhapur 250, Latur 170, Nagpur 448, Nashik 336, Pune 201, Thane 281) with approx. 1,65,000 diploma and B.Sc. (Agri) applicants.
- **Validation**: Passed with 0 errors, 0 warnings.

### 2.9 `mahatransco-assistant-engineer`
- **Tier**: B, **Exam Type**: job
- **Sections Populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads`
- **Primary Source Data**:
  - Maharashtra State Electricity Transmission Company Limited (MSETCL / Mahatransco — `mahatransco.in`).
  - Employment Advertisement No. 07/2023 and Advt. No. 04/2022.
  - Pay Scale: Pay Group II: ₹49,210 – ₹1,19,315 under power utility tripartite wage revision settlements. Entry basic: ₹49,210.
  - Career Ladder: Assistant Engineer (Pay Group II: ₹49,210–₹1,19,315) -> Executive Engineer (Pay Group I: ₹70,660–₹1,48,220) -> Superintending Engineer (₹92,305–₹1,78,415) -> Chief Engineer (₹1,18,500–₹2,14,100) -> Executive Director (₹1,33,000–₹2,28,000).
  - Exam Scheme: IBPS CBT of 130 questions, 150 Marks, 120 minutes. Professional Knowledge: 50 Qs / 110 Marks (2.2M each); Reasoning: 40 Qs / 20M; Quant: 20 Qs / 10M; Marathi: 20 Qs / 10M. Negative marking: 0.25 (1/4th) deduction of question marks for incorrect responses.
  - Benchmarks: Advt. No. 07/2023: 388 AE posts (Transmission: 280, Telecom: 76, Civil: 32) with approx. 75,000 applicants; Advt. No. 04/2022: 223 AE posts (Transmission: 170, Telecom: 25, Civil: 28) with approx. 58,000 applicants.
- **Validation**: Passed with 0 errors, 0 warnings.

---

## 3. Technical & Environmental Gotchas Discovered

1. **Maharashtra Government Servers HTTP/2 TCP Window Deadlock**:
   - `curl` queries to `cetcell.mahacet.org`, `mahadiscom.in`, `mahatransco.in`, and other state endpoints frequently stalled or timed out when negotiating default HTTP/2.
   - Passing `--http1.1` to all `curl` commands immediately returned clean HTTP/1.1 200 OK responses.
2. **Scanned PDF Text Extraction**:
   - Several state notifications (e.g. MSEDCL syllabus circulars, Marathi GRs) contain scanned Gujarati/Devanagari image layers where raw `pdftotext` yields empty pages.
   - Using `/opt/homebrew/bin/pdftoppm -png -r 150` followed by rendering to the artifacts directory and inspecting via `view_file` visual verification provided high-fidelity confirmation of question counts, marking schemes, and scales of pay.
3. **Strict Differentiation from Central 7th CPC**:
   - All state departmental posts cite the **Maharashtra Civil Services (Revised Pay) Rules, 2019** (Levels S-7, S-8, S-10, S-13, S-14, etc.).
   - Power distribution and transmission utilities (MSEDCL, Mahatransco) operate under distinct **Pay Group settlements** (Pay Group I, II, III), never central 7th CPC.

---

## 4. Verification Check

Full verification gate executed across the entire repository:
```bash
node scripts/data-sourcing/validate-details.mjs
```
Output:
```text
Validating 201 dossier file(s)...
Summary: 201 checked, 0 error(s), 0 warning(s)
```
Unit 043 is 100% complete and verified.

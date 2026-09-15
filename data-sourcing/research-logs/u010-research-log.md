# Research Log: Unit 10 (u010) — Maharashtra Public Service Commission (MPSC) & Judiciary

- **Unit ID**: `u010`
- **Batch ID**: `batch-4-state-psc--maharashtra`
- **Timestamp**: 2026-09-11T20:50:00+05:30
- **Status**: Completed (6/6 exams researched, authored, and verified)
- **Reviewer**: Antigravity Lead Research & Validation Agent
- **Validation Result**: **PASS (0 errors, 0 warnings across all 78 dossiers in repo)**

---

## 1. Summary of Unit Execution

Unit 10 covers the 6 major competitive recruitments under the Maharashtra Public Service Commission (MPSC) and the Bombay High Court: the State Services (Rajyaseva) Examination (`mpsc`), the Subordinate Services / Non-Gazetted Group B Combined Examination (`mpsc-sti`), post-specific Group B dossiers for Police Sub-Inspector (`mpsc-subordinate-psi`), State Tax Inspector (`mpsc-subordinate-sti`), and Assistant Section Officer Mantralaya (`mpsc-subordinate-aso`), alongside the Maharashtra Judicial Service Civil Judge Junior Division and JMFC Examination (`maha-jmfc`).

All 6 dossiers strictly comply with the frozen schema (`public/exam-details/upsc-cse.json`), state-specific pay matrices (Maharashtra 7th Pay Commission Revised Pay Rules 2019 and SNJPC judicial scale), and the project-wide DA constant (58% as of 2025-07-01).

| Exam ID | Title | Tier | Type | Pay Level / Entry Basic | Benchmark Vacancies (Recent Cycles) | Validation |
| :--- | :--- | :---: | :---: | :--- | :--- | :---: |
| `mpsc-subordinate-psi` | MPSC Maharashtra Subordinate Services Group-B (Police Sub-Inspector - PSI) | A | job | Level S-14 (₹38,600 basic) | 310 (Advt. 011/2026), 216 (Advt. 048/2024) | **PASS** |
| `mpsc-subordinate-sti` | MPSC State Tax Inspector (STI) Group-B Examination | A | job | Level S-14 (₹38,600 basic) | 236 (Advt. 011/2026), 209 (Advt. 048/2024) | **PASS** |
| `mpsc-subordinate-aso` | MPSC Assistant Section Officer (ASO) Mantralaya Examination | A | job | Level S-14 (₹38,600 basic) | 6 (Advt. 011/2026), 55 (Advt. 048/2024) | **PASS** |
| `maha-jmfc` | Maharashtra Judicial Service (Civil Judge Junior Division & JMFC) Exam | A | job | SNJPC J-1 (₹77,840 basic) | 286 (Advt. 013/2026), 114 (Advt. 026/2023) | **PASS** |
| `mpsc` | Maharashtra Public Service Commission State Services (Rajyaseva) Examination | B | job | Level S-20 (₹56,100 basic) | 385 (Advt. 012/2025), 524 (Advt. 414/2023) | **PASS** |
| `mpsc-sti` | Maharashtra PSC STI/PSI/ASO Exam (Non-Gazetted Group B Combined) | B | job | Level S-14 (₹38,600 basic) | 552 (Advt. 011/2026), 480 (Advt. 048/2024) | **PASS** |

---

## 2. Detailed Exam Research Records

### 2.1 `mpsc-subordinate-psi`
- **Tier**: A | **Exam Type**: `job`
- **Sections Populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads`
- **Sources OPENED and Read**:
  - MPSC Advertisement No. 011/2026 (Maharashtra Non-Gazetted Group-B Services Combined Examination 2026).
  - MPSC Advertisement No. 048/2024 (Maharashtra Non-Gazetted Group B Services Examination 2024).
  - Maharashtra Civil Services (Revised Pay) Rules, 2019 (7th Pay Commission for Maharashtra State Employees), Government Resolution No. RPS-2019/CR-1/Services-9.
  - Bombay Police Act / Maharashtra Police Regulations and PSI recruitment rules.
- **Pay Scale**: Level S-14 (₹38,600 - ₹1,22,800). Entry basic pay: ₹38,600.
- **Exam Scheme**:
  - Stage 1: Preliminary Exam (Objective, 100 Qs, 100 marks, 60 mins, -1/4 negative marking, qualifying screening).
  - Stage 2: Main Written Exam (Paper 1 Marathi & English 200 marks + Paper 2 General Studies & Police Acts 200 marks = 400 marks).
  - Stage 3: Physical Efficiency Test (100 marks, qualifying nature at 60% threshold / 60 marks).
  - Stage 4: Interview (40 marks).
- **Link Verification**:
  - `https://mpsc.gov.in` → HTTP 200 (Live)
  - `https://mpsc.gov.in/home` → HTTP 200 (Live)
  - `https://mpsconline.gov.in` → HTTP 301 / 200 (Live)

### 2.2 `mpsc-subordinate-sti`
- **Tier**: A | **Exam Type**: `job`
- **Sections Populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads`
- **Sources OPENED and Read**:
  - MPSC Advertisement No. 011/2026 & Advt. No. 048/2024.
  - Maharashtra Goods and Services Tax Department Recruitment and Service Rules.
  - Maharashtra Civil Services (Revised Pay) Rules, 2019 (Pay Level S-14).
- **Pay Scale**: Level S-14 (₹38,600 - ₹1,22,800). Entry basic pay: ₹38,600.
- **Exam Scheme**:
  - Stage 1: Preliminary Exam (100 Qs, 100 marks, 60 mins, -1/4 negative marking, qualifying screening).
  - Stage 2: Main Exam (Paper 1 Marathi & English 200 marks + Paper 2 GS, Economics & GST Laws 200 marks = 400 marks). No interview, no physical test.
- **Link Verification**:
  - `https://mpsc.gov.in` → HTTP 200 (Live)
  - `https://mpsc.gov.in/home` → HTTP 200 (Live)

### 2.3 `mpsc-subordinate-aso`
- **Tier**: A | **Exam Type**: `job`
- **Sections Populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads`
- **Sources OPENED and Read**:
  - MPSC Advertisement No. 011/2026 & Advt. No. 048/2024.
  - Maharashtra Secretariat Service (Mantralaya Administration) Cadre Rules.
  - Maharashtra Civil Services (Revised Pay) Rules, 2019 (Pay Level S-14).
- **Pay Scale**: Level S-14 (₹38,600 - ₹1,22,800). As ASOs are stationed at Mantralaya in Mumbai (X-category metropolis), they draw 27% HRA (₹10,422) + 58% DA (₹22,388).
- **Exam Scheme**:
  - Stage 1: Preliminary Exam (100 Qs, 100 marks, 60 mins, -1/4 negative marking, qualifying screening).
  - Stage 2: Main Exam (Paper 1 Marathi & English 200 marks + Paper 2 GS, Constitutional Law & Secretariat Administration 200 marks = 400 marks). Purely merit-based on 400 marks; no interview.
- **Link Verification**:
  - `https://mpsc.gov.in` → HTTP 200 (Live)

### 2.4 `maha-jmfc`
- **Tier**: A | **Exam Type**: `job`
- **Sections Populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads`
- **Sources OPENED and Read**:
  - MPSC Advertisement No. 013/2026 (Civil Judge Junior Division and JMFC Examination 2026, 286 vacancies).
  - MPSC Advertisement No. 026/2023 (Civil Judge Junior Division and JMFC Preliminary Examination 2023, 114 vacancies).
  - Bombay High Court Judicial Service Rules and Supreme Court orders in *All India Judges Association v. Union of India* (WP(C) No. 643/2015) adopting the Second National Judicial Pay Commission (SNJPC).
- **Pay Scale**: SNJPC Pay Scale J-1 (₹77,840 - ₹1,36,520). Entry basic pay: ₹77,840. Gross salary estimate ₹1,30,000 - ₹1,55,000.
- **Exam Scheme**:
  - Stage 1: Preliminary Exam (Objective, 100 Qs, 100 marks, 120 mins, -1/4 negative marking, qualifying screening).
  - Stage 2: Main Written Exam (Descriptive, Paper 1 Civil Law 100 marks, Paper 2 Criminal Law & Legal Essay 100 marks = 200 marks).
  - Stage 3: Viva-Voce / Interview (50 marks, minimum 40% qualifying threshold i.e. 20 marks).
- **Link Verification**:
  - `https://mpsc.gov.in` → HTTP 200 (Live)
  - `https://mpsc.gov.in/home` → HTTP 200 (Live)

### 2.5 `mpsc`
- **Tier**: B | **Exam Type**: `job`
- **Sections Populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads`
- **Sources OPENED and Read**:
  - MPSC Advertisement No. 012/2025 (Maharashtra Gazetted Civil Services Combined Preliminary Examination 2025, 385 vacancies).
  - MPSC Advertisement No. 414/2023 (Revised Maharashtra Gazetted Civil Services Combined Preliminary Examination 2024, 524 vacancies).
  - MPSC Revised Scheme and Syllabus for State Services (Rajyaseva) Examination (UPSC-aligned conventional pattern).
  - Maharashtra Civil Services (Revised Pay) Rules, 2019, Pay Level S-20 (₹56,100 - ₹1,77,500) for Group A Gazetted posts.
- **Exam Scheme**:
  - Stage 1: Preliminary Exam (Paper 1 GS 200 marks, Paper 2 CSAT 200 marks qualifying at 33%).
  - Stage 2: Main Exam (Conventional descriptive, 9 papers: Paper 1 Marathi 300 marks qualifying 25%, Paper 2 English 300 marks qualifying 25%, Papers 3-9 Essay, GS I-IV, Optional I-II each 250 marks = 1,750 marks).
  - Stage 3: Personality Test / Interview (275 marks). Total Merit: 2,025 marks.
- **Link Verification**:
  - `https://mpsc.gov.in` → HTTP 200 (Live)
  - `https://mpsc.gov.in/home` → HTTP 200 (Live)

### 2.6 `mpsc-sti`
- **Tier**: B | **Exam Type**: `job`
- **Sections Populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads`
- **Sources OPENED and Read**:
  - MPSC Advertisement No. 011/2026 (Total 552 posts across Group B services).
  - MPSC Advertisement No. 048/2024 (Total 480 posts across Group B services).
  - MPSC Combined Non-Gazetted Examination Scheme and Syllabus.
- **Pay Scale**: Level S-14 (₹38,600 - ₹1,22,800).
- **Exam Scheme**:
  - Stage 1: Combined Preliminary Exam (100 Qs, 100 marks, 60 mins, -1/4 negative marking).
  - Stage 2: Main Exam (Paper 1 Common Language 200 marks + Paper 2 Cadre-Specific Subject 200 marks = 400 marks).
  - Stage 3: Physical Test & Interview (applicable to PSI cadre only).
- **Link Verification**:
  - `https://mpsc.gov.in` → HTTP 200 (Live)

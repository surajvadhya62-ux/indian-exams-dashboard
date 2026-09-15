# Research Log: Unit 9 (u009) — Major State Public Service Commissions: Bihar

- **Unit ID**: `u009`
- **Batch ID**: `batch-4-state-psc--bihar`
- **Timestamp**: 2026-09-11T20:50:00+05:30
- **Status**: Completed (2/2 exams researched, authored, and verified)
- **Reviewer**: Antigravity Lead Research & Validation Agent
- **Validation Result**: **PASS (0 errors, 0 warnings)**

---

## 1. Summary of Unit Execution

Unit 9 covers the two premier state recruitment competitive examinations administered by the Bihar Public Service Commission (BPSC) for the State of Bihar: the prestigious **Bihar Judicial Service Competitive Examination** (recruiting Civil Judge Junior Division / Judicial Magistrates under the High Court of Judicature at Patna) and the **Bihar Public Service Commission Combined Competitive Examination (BPSC CCE)** (recruiting the Bihar Administrative Service, Bihar Police Service, and allied state services).

Both examinations have been researched against primary statutory sources, official BPSC notifications, and government pay resolutions, strictly adhering to the frozen schema in `public/exam-details/upsc-cse.json` and validated by `scripts/data-sourcing/validate-details.mjs`.

| Exam ID | Title | Tier | Type | Entry Basic Pay / Cadre | Recent Cycle Benchmark (Appeared / Vacancies) | Validation |
| :--- | :--- | :---: | :---: | :--- | :--- | :---: |
| `bihar-pcs-j` | Bihar Judicial Service Competitive Examination (Civil Judge Junior Division) | A | job | Level J-1 (₹77,840 basic, SNJPC) | 17,819 appeared / 155 vacancies (32nd BJS) | **PASS** |
| `bpsc` | Bihar Public Service Commission Combined Competitive Exam (CCE) | B | job | Level 9 (₹53,100 basic, Bihar 7th CPC) | 3,28,990 appeared / 2,035 vacancies (70th CCE) | **PASS** |

---

## 2. Detailed Exam Research Records

### 2.1 `bihar-pcs-j`
- **Tier**: A | **Exam Type**: `job`
- **Sections Populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads`
- **Sections Omitted**: None (all 5 required sections populated)
- **Sources OPENED and Read This Session**:
  - `https://bpsc.bihar.gov.in` — Bihar Public Service Commission Official Examination Portal.
  - `https://bpsc.bihar.gov.in/wp-content/uploads/BPSC_content/Notices/Important-Notice-33rd-BJSE-Pre-Exam.-Postponed_BPSC-20260525-3avosd.pdf` — BPSC Important Notice regarding postponement of 33rd Bihar Judicial Services (Preliminary) Examination (Advt. No. 12/2026).
  - `https://bpsc.bihar.gov.in/wp-content/uploads/BPSC_content/Notices/Important-Notice-cum-Examination-Program-33rd-BJSE-Pre-Exam.-122026_BPSC-20260513-itz27v.pdf` — BPSC Examination Program for 33rd BJSE (Advt. No. 12/2026).
  - Second National Judicial Pay Commission (SNJPC) Report & Supreme Court of India Orders in *All India Judges Association v. Union of India* (WP (C) No. 643/2015) — Pay Matrix Level J-1 (₹77,840 – ₹1,36,520).
  - BPSC 32nd Bihar Judicial Services Examination (Advt. No. 23/2023) and 31st Bihar Judicial Services Examination (Advt. No. 04/2020) notification and result releases.
- **Pay Scale & Cadre Rules**:
  - Entry Level: Civil Judge (Junior Division) / Judicial Magistrate First Class.
  - Pay Commission: Second National Judicial Pay Commission (SNJPC) Scale Level J-1: starting basic pay **₹77,840** (scale ₹77,840 – ₹1,36,520).
  - Standard Project DA: 58% effective 2025-07-01. Gross range estimated at ₹1,32,000 – ₹1,55,000; in-hand estimated at ₹1,08,000 – ₹1,28,000.
- **Link Verification**:
  - `https://bpsc.bihar.gov.in` → HTTP 200 (Live)
  - `https://bpsc.bihar.gov.in/wp-content/uploads/BPSC_content/Notices/Important-Notice-33rd-BJSE-Pre-Exam.-Postponed_BPSC-20260525-3avosd.pdf` → HTTP 200 (Live)
  - `https://bpsc.bihar.gov.in/wp-content/uploads/BPSC_content/Notices/Important-Notice-cum-Examination-Program-33rd-BJSE-Pre-Exam.-122026_BPSC-20260513-itz27v.pdf` → HTTP 200 (Live)
  - `https://www.doj.gov.in/` → HTTP 200 (Live)
- **Exam Scheme Details**:
  - Stage 1: Preliminary Exam (OMR screening, 250 marks): Paper I General Knowledge (100 marks, 120 mins) + Paper II Law (150 marks, 120 mins). No negative marking.
  - Stage 2: Main Written Exam (Descriptive, 1,050 marks): 5 Compulsory papers (GK 150m, Elementary Science 100m, General Hindi 100m qualifying 30%, General English 100m qualifying 30%, Evidence & Procedure 150m) + 3 Optional law papers (150m each).
  - Stage 3: Viva-Voce / Interview (100 marks, mandatory minimum 35% qualifying threshold).
- **Competition Benchmarks**:
  - 2023 (32nd BJS, Advt. 23/2023): 17,819 candidates appeared in Prelims; 1,675 qualified for Mains; 463 qualified for interview; 155 vacancies (selectivity ~1 in 115).
  - 2020 (31st BJS, Advt. 04/2020): 15,369 candidates appeared in Prelims; 2,379 qualified for Mains; 693 qualified for interview; 221 vacancies (selectivity ~1 in 70).

---

### 2.2 `bpsc`
- **Tier**: B | **Exam Type**: `job`
- **Sections Populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads`
- **Sections Omitted**: None (all required and best-effort sections populated)
- **Sources OPENED and Read This Session**:
  - `https://bpsc.bihar.gov.in` — Bihar Public Service Commission Official Portal.
  - `https://bpsc.bihar.gov.in/wp-content/uploads/BPSC_content/Notices/Regarding_postpone_72nd_BPSC_BPSC-20260720-u768lx.pdf` — BPSC Important Notice regarding Postponement of 72nd Combined (Preliminary) Competitive Examination.
  - `https://bpsc.bihar.gov.in/wp-content/uploads/BPSC_content/Notices/Corrigendum-Integrated-72nd-CCE-Pre-Advt.-44-vacancies-of-Sugarcane-Officer-deleted_BPSC-20260506-0jupsy.pdf` — BPSC Corrigendum on 72nd CCE Vacancies.
  - Bihar 7th State Pay Matrix Resolution (Finance Department, Government of Bihar Resolution No. 3A-3-Pay-01/2017-3803/F.(2)) — Level 9 (entry basic ₹53,100, Grade Pay ₹5,400) for Bihar Administrative Service / Bihar Police Service.
  - BPSC 70th Integrated CCE and 69th Integrated CCE official announcements and results.
- **Pay Scale & Cadre Rules**:
  - Entry Level: Sub-Divisional Magistrate (SDM) / Deputy Collector (Bihar Administrative Service - BAS), Deputy Superintendent of Police (DSP - Bihar Police Service - BPS).
  - Pay Commission: Bihar 7th State Pay Matrix Level 9: basic pay **₹53,100** (scale ₹53,100 – ₹1,67,800).
  - Standard Project DA: 58% effective 2025-07-01. Gross range estimated at ₹88,000 – ₹1,05,000; in-hand estimated at ₹74,000 – ₹88,000.
- **Link Verification**:
  - `https://bpsc.bihar.gov.in` → HTTP 200 (Live)
  - `https://bpsc.bihar.gov.in/wp-content/uploads/BPSC_content/Notices/Regarding_postpone_72nd_BPSC_BPSC-20260720-u768lx.pdf` → HTTP 200 (Live)
  - `https://bpsc.bihar.gov.in/wp-content/uploads/BPSC_content/Notices/Corrigendum-Integrated-72nd-CCE-Pre-Advt.-44-vacancies-of-Sugarcane-Officer-deleted_BPSC-20260506-0jupsy.pdf` → HTTP 200 (Live)
- **Exam Scheme Details**:
  - Stage 1: Preliminary Exam (OMR screening, 150 marks, 120 mins): Single General Studies paper with revised -1/3 negative marking. Qualifying only.
  - Stage 2: Main Written Exam (Descriptive, 5 papers): General Hindi (100 marks, qualifying 30%), General Studies Paper I (300 marks), General Studies Paper II (300 marks), Essay (300 marks), and Optional Subject (100 marks, qualifying MCQ).
  - Stage 3: Personality Test (Interview, 120 marks). Total merit calculated out of 1,020 marks (GS1 300 + GS2 300 + Essay 300 + Interview 120).
- **Competition Benchmarks**:
  - 2024 (70th Integrated CCE): 3,28,990 candidates appeared in Prelims; 21,581 qualified for Mains; 5,401 qualified for interview; 2,035 vacancies (selectivity ~1 in 162).
  - 2023 (69th Integrated CCE): ~2,70,000 candidates appeared in Prelims; 4,037 qualified for Mains; 1,295 qualified for interview; 475 vacancies (selectivity ~1 in 568).

---

## 3. Compliance and Verification Check

- [x] Schema integrity: Strictly compliant with `upsc-cse.json` frozen schema.
- [x] Link liveness: All links tested live with `curl -sI` and returning HTTP 200.
- [x] No invented numbers: All salary figures tied to SNJPC (for Judiciary) and Bihar 7th CPC Level 9 (for BAS/BPS); DA fixed at project constant 58% as of 2025-07-01.
- [x] State pay trap avoided: Did not apply central 7th CPC civilian scales to state judiciary (used SNJPC Level J-1) or to state administrative services (used Bihar State Pay Matrix Level 9).
- [x] Automated test: `node scripts/data-sourcing/validate-details.mjs` executed and passed with 0 errors and 0 warnings.

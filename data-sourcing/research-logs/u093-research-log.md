# Research Log: Unit 93 (u093) — Subordinate Boards & State Police Recruitment Boards — West Bengal

- **Unit ID**: `u093`
- **Batch ID**: `batch-5-subordinate-police-boards--west-bengal`
- **Label**: `Subordinate Boards & State Police Recruitment Boards — West Bengal`
- **Timestamp**: 2026-09-13T16:15:00+05:30
- **Status**: Completed (5/5 exams researched, written, and validated)
- **Reviewer**: Antigravity Autonomous Agent

---

## 1. Summary of Unit Execution

Unit 93 (`u093`) completes the comprehensive research, statutory salary mapping, multi-tier examination pattern analysis, and competition benchmark sourcing for all 5 major police and enforcement recruitment examinations in the State of West Bengal:

1. `wbprb-police-constable`: West Bengal Police Constable & Lady Constable Examination — **Tier A (Job)**
2. `wbprb-police-si`: West Bengal Police Sub-Inspector (Unarmed & Armed Branch) Examination — **Tier A (Job)**
3. `wbprb-kolkata-constable`: Kolkata Police Constable & Lady Constable Examination — **Tier A (Job)**
4. `wbprb-kolkata-si`: Kolkata Police Sub-Inspector (Unarmed Branch) & Sergeant Examination — **Tier B (Job)**
5. `wbprb-excise-constable`: West Bengal Excise Constable & Lady Excise Constable Examination — **Tier B (Job)**

All five dossiers strictly comply with `RESEARCH-GUIDE.md`, `EXECUTION-PLAN.md`, and the architectural schema exemplified by `public/exam-details/upsc-cse.json`.

### Statutory Pay Architecture & Regulatory Frameworks:
- **West Bengal Services (Revision of Pay and Allowances) Rules, 2019 (WBS ROPA 2019)**:
  - **Constable Cadres** (`wbprb-police-constable`, `wbprb-kolkata-constable`, `wbprb-excise-constable`): Remunerated under **ROPA 2019 Pay Level 6** (₹22,700 – ₹58,500), corresponding to pre-revised Pay Band-2 (₹5,400 – ₹25,200 with Grade Pay ₹2,600). Entry basic pay is **₹22,700**.
  - **Sub-Inspector & Sergeant Cadres** (`wbprb-police-si`, `wbprb-kolkata-si`): Remunerated under **ROPA 2019 Pay Level 10** (₹32,100 – ₹82,900), corresponding to pre-revised Pay Band-3 (₹7,100 – ₹37,600 with Grade Pay ₹3,900). Entry basic pay is **₹32,100**.
- **Standardized Dearness Allowance Constant**:
  - All 5 dossiers enforce the canonical project constants:
    - `"da_percent_as_of_review": 58`
    - `"da_as_of": "2025-07-01"`
- **Live Official Portals & Conducting Bodies**:
  - West Bengal Police Recruitment Board (WBPRB): `https://prb.wb.gov.in`
  - West Bengal Police Directorate: `https://wbpolice.gov.in`
  - Kolkata Police Commissionerate: `https://kolkatapolice.gov.in`
  - Directorate of Excise, Finance Department: `https://excise.wb.gov.in/Portal_New_Default.aspx`

---

## 2. Examination Overview Table

| Exam ID | Title | Tier | Conducting Body | Entry Basic / Scale | Exam Pattern Summary | Validation |
| :--- | :--- | :---: | :--- | :--- | :--- | :---: |
| `wbprb-police-constable` | West Bengal Police Constable & Lady Constable | A | WBPRB | Level 6 (₹22,700) | PWT (100m, qualifying) → PMT/PET → Final Written (85m) → Interview (15m) = 100m final merit | **PASS** |
| `wbprb-police-si` | West Bengal Police Sub-Inspector (UB & AB) | A | WBPRB | Level 10 (₹32,100) | Prelims (200m, screening) → PMT/PET → Combined Competitive (3 papers, 200m) → Interview (30m, min 8m) = 230m final merit | **PASS** |
| `wbprb-kolkata-constable` | Kolkata Police Constable & Lady Constable | A | WBPRB / Kolkata Police | Level 6 (₹22,700) | PWT (100m, qualifying) → PMT/PET → Final Written (85m) → Interview (15m) = 100m final merit | **PASS** |
| `wbprb-kolkata-si` | Kolkata Police Sub-Inspector & Sergeant | B | WBPRB / Kolkata Police | Level 10 (₹32,100) | Prelims (200m, screening) → PMT/PET → Combined Competitive (3 papers, 200m) → Interview (30m, min 8m) = 230m final merit | **PASS** |
| `wbprb-excise-constable` | West Bengal Excise Constable & Lady Excise Constable | B | WBPRB / Directorate of Excise | Level 6 (₹22,700) | PWT (100m, qualifying) → PMT/PET → Final Written (90m) → Interview (10m) = 100m final merit | **PASS** |

---

## 3. Detailed Exam Research Logs

### 3.1. `wbprb-police-constable` — West Bengal Police Constable & Lady Constable
- **File**: `public/exam-details/wbprb-police-constable.json`
- **Conducting Body**: West Bengal Police Recruitment Board (WBPRB)
- **Official Portals**: `https://wbpolice.gov.in`, `https://prb.wb.gov.in`
- **Cadre Architecture**:
  - Constable / Lady Constable (ROPA Level 6: ₹22,700 – ₹58,500) → Assistant Sub-Inspector / ASI (ROPA Level 8: ₹27,000 – ₹69,800, via Departmental Exam after 7–10 yrs) → Sub-Inspector / SI (ROPA Level 10: ₹32,100 – ₹82,900) → Inspector of Police / OC (ROPA Level 12: ₹35,800 – ₹92,100).
- **Exam Pattern**:
  - **Stage 1**: Preliminary Written Test (PWT) — 100 MCQs, 100 marks, 60 minutes duration (General Awareness & GK: 40m, Elementary Mathematics: 30m, Reasoning: 30m). Negative marking: 1/4th (0.25). Screening only.
  - **Stage 2**: Physical Measurement Test (PMT) & Physical Efficiency Test (PET) — Male: 1600m in 6m 30s; Female: 800m in 4m 00s. Qualifying only.
  - **Stage 3**: Final Written Examination — 85 MCQs, 85 marks, 60 minutes duration (GK: 25m, English: 10m, Elementary Maths: 25m, Reasoning: 25m). Negative marking: 1/4th.
  - **Stage 4**: Interview (Personality Test) — 15 marks. Final merit aggregate = 85 + 15 = 100 marks.
- **Financial Compensation**:
  - Entry basic pay: ₹22,700 (ROPA 2019 Level 6).
  - Gross range estimate: ₹38,000 – ₹43,000 (with 58% DA = ₹13,166, 12% HRA = ₹2,724, Medical Allowance = ₹500, dietary subsidy, and kit maintenance).
  - In-hand range estimate: ₹33,000 – ₹38,000 after PTax (₹150–₹200) and GPF/NPS deductions (~10% basic+DA).
- **Competition Benchmarks**:
  - **2024 Cycle**: 11,749 vacancies (Male: 8,212; Female: 3,537); 11,50,000 registered applicants; selectivity ratio ~1 in 98.
  - **2020 Cycle**: 8,632 vacancies (Constable: 7,440; Lady Constable: 1,192); 13,50,000 applicants; 85,000 shortlisted for mains; selectivity ratio ~1 in 156.
  - **2019 Cycle**: 8,419 vacancies; 11,80,000 applicants; selectivity ratio ~1 in 140.
- **Validation**: Passed schema validation with 0 errors, 0 warnings.

---

### 3.2. `wbprb-police-si` — West Bengal Police Sub-Inspector (UB & AB)
- **File**: `public/exam-details/wbprb-police-si.json`
- **Conducting Body**: West Bengal Police Recruitment Board (WBPRB)
- **Official Portals**: `https://wbpolice.gov.in`, `https://prb.wb.gov.in`
- **Cadre Architecture**:
  - Sub-Inspector / Lady SI (ROPA Level 10: ₹32,100 – ₹82,900) → Inspector of Police / IC / OC (ROPA Level 12: ₹35,800 – ₹92,100, 6–10 yrs) → Deputy Superintendent of Police / DSP (ROPA Level 16: ₹56,100 – ₹1,44,300, 14–18 yrs) → Additional SP (ROPA Level 17: ₹67,300 – ₹1,73,200) → Superintendent of Police / IPS (7th CPC Level 11/12: ₹67,700 – ₹2,09,200).
- **Exam Pattern**:
  - **Stage 1**: Preliminary Examination — 100 MCQs, 200 marks, 90 minutes (General Studies: 50 Qs / 100m; Logical & Analytical Reasoning: 25 Qs / 50m; Arithmetic: 25 Qs / 50m). Negative marking: 1/4th (0.5 mark deducted per question). Screening only.
  - **Stage 2**: PMT & PET — Qualifying only.
  - **Stage 3**: Final Combined Competitive Examination (Conventional Descriptive) — 3 Papers, 200 marks:
    - Paper I: General Studies & Arithmetic (100 marks, 120 mins).
    - Paper II: English (50 marks, 60 mins).
    - Paper III: Bengali / Hindi / Urdu / Nepali (50 marks, 60 mins).
  - **Stage 4**: Personality Test (Interview) — 30 marks. Mandatory minimum qualifying threshold: 8 marks. Final merit aggregate = 200 + 30 = 230 marks.
- **Financial Compensation**:
  - Entry basic pay: ₹32,100 (ROPA 2019 Level 10).
  - Gross range estimate: ₹54,000 – ₹60,000 (with 58% DA = ₹18,618, 12% HRA = ₹3,852, Medical Allowance = ₹500, motorcycle mobility allowance, and risk allowance).
  - In-hand range estimate: ₹48,000 – ₹54,000 after PTax (₹200) and GPF/NPS deductions (~10% basic+DA).
- **Competition Benchmarks**:
  - **2024 Cycle**: 464 vacancies (UB: 364; AB: 100); 1,80,000 reported applicants; selectivity ratio ~1 in 388.
  - **2020 Cycle**: 1,088 vacancies (SI UB: 753; Lady SI UB: 150; SI AB: 185); 2,80,000 applicants; 16,500 shortlisted for mains; selectivity ratio ~1 in 257.
  - **2019 Cycle**: 668 vacancies; 2,20,000 applicants; selectivity ratio ~1 in 329.
- **Validation**: Passed schema validation with 0 errors, 0 warnings.

---

### 3.3. `wbprb-kolkata-constable` — Kolkata Police Constable & Lady Constable
- **File**: `public/exam-details/wbprb-kolkata-constable.json`
- **Conducting Body**: West Bengal Police Recruitment Board (WBPRB) on behalf of Kolkata Police Commissionerate
- **Official Portals**: `https://kolkatapolice.gov.in`, `https://prb.wb.gov.in`
- **Cadre Architecture**:
  - Constable / Lady Constable (ROPA Level 6: ₹22,700 – ₹58,500) → Assistant Sub-Inspector / ASI (ROPA Level 8: ₹27,000 – ₹69,800, 7–10 yrs) → Sub-Inspector / Sergeant (ROPA Level 10: ₹32,100 – ₹82,900, 14–18 yrs) → Inspector of Police (ROPA Level 12: ₹35,800 – ₹92,100, 22–26 yrs).
- **Exam Pattern**:
  - **Stage 1**: Preliminary Written Test (PWT) — 100 MCQs, 100 marks, 60 minutes duration (GK: 40m, Elementary Maths: 30m, Reasoning: 30m). Negative marking: 1/4th (0.25). Screening only.
  - **Stage 2**: PMT & PET — Male: 1600m in 6m 30s; Female: 800m in 4m 00s. Qualifying only.
  - **Stage 3**: Final Written Examination — 85 MCQs, 85 marks, 60 minutes duration (GK: 25m, English: 10m, Elementary Maths: 25m, Reasoning: 25m). Negative marking: 1/4th.
  - **Stage 4**: Interview — 15 marks. Final merit aggregate = 85 + 15 = 100 marks.
- **Financial Compensation**:
  - Entry basic pay: ₹22,700 (ROPA 2019 Level 6).
  - Gross range estimate: ₹39,000 – ₹44,000 (with 58% DA = ₹13,166, 12% HRA = ₹2,724, Medical Allowance = ₹500, Kolkata metropolitan duty allowance, and kit upkeep).
  - In-hand range estimate: ₹34,000 – ₹39,000 after statutory deductions.
- **Competition Benchmarks**:
  - **2024 Cycle**: 3,734 vacancies (Constable: 3,464; Lady Constable: 270); 6,50,000 applicants; selectivity ratio ~1 in 174.
  - **2022 Cycle**: 2,266 vacancies (Constable: 1,410; Lady Constable: 856); 6,20,000 applicants; 52,000 shortlisted for mains; selectivity ratio ~1 in 274.
- **Validation**: Passed schema validation with 0 errors, 0 warnings.

---

### 3.4. `wbprb-kolkata-si` — Kolkata Police Sub-Inspector & Sergeant
- **File**: `public/exam-details/wbprb-kolkata-si.json`
- **Conducting Body**: West Bengal Police Recruitment Board (WBPRB) on behalf of Kolkata Police Commissionerate
- **Official Portals**: `https://kolkatapolice.gov.in`, `https://prb.wb.gov.in`
- **Cadre Architecture**:
  - Sub-Inspector (UB) / Sergeant (ROPA Level 10: ₹32,100 – ₹82,900) → Inspector of Police / OC / Traffic Inspector (ROPA Level 12: ₹35,800 – ₹92,100, 6–10 yrs) → Assistant Commissioner of Police / ACP (ROPA Level 16: ₹56,100 – ₹1,44,300, 14–18 yrs) → Deputy Commissioner of Police / DCP (ROPA Level 17: ₹67,300 – ₹1,73,200) → Joint Commissioner / IPS (7th CPC Level 12/13/14).
- **Exam Pattern**:
  - **Stage 1**: Preliminary Examination — 100 MCQs, 200 marks, 90 minutes (GS: 100m, Reasoning: 50m, Arithmetic: 50m). Negative marking: 1/4th. Screening only.
  - **Stage 2**: PMT & PET — Qualifying only.
  - **Stage 3**: Final Combined Competitive Examination (Conventional Descriptive) — 3 Papers, 200 marks (Paper I: GS & Maths 100m; Paper II: English 50m; Paper III: Bengali/Hindi/Urdu/Nepali 50m).
  - **Stage 4**: Personality Test (Interview) — 30 marks. Mandatory minimum qualifying mark: 8 marks. Final merit aggregate = 200 + 30 = 230 marks.
- **Financial Compensation**:
  - Entry basic pay: ₹32,100 (ROPA 2019 Level 10).
  - Gross range estimate: ₹55,000 – ₹61,000 (with 58% DA = ₹18,618, 12% HRA = ₹3,852, Medical Allowance = ₹500, urban mobility and investigation allowances).
  - In-hand range estimate: ₹49,000 – ₹55,000 after statutory deductions.
- **Competition Benchmarks**:
  - **2023 Cycle**: 309 vacancies (SI UB: 212; Lady SI UB: 27; Sergeant: 70); 95,000 applicants; selectivity ratio ~1 in 307.
  - **2021 Cycle**: 330 vacancies (SI UB: 181; Lady SI UB: 27; Sergeant: 122); 1,10,000 applicants; 5,800 shortlisted for mains; selectivity ratio ~1 in 333.
- **Validation**: Passed schema validation with 0 errors, 0 warnings.

---

### 3.5. `wbprb-excise-constable` — West Bengal Excise Constable & Lady Excise Constable
- **File**: `public/exam-details/wbprb-excise-constable.json`
- **Conducting Body**: West Bengal Police Recruitment Board (WBPRB) on behalf of Directorate of Excise, Department of Finance, Government of West Bengal
- **Official Portals**: `https://excise.wb.gov.in/Portal_New_Default.aspx`, `https://wbpolice.gov.in`, `https://prb.wb.gov.in`
- **Cadre Architecture**:
  - Excise Constable / Lady Excise Constable (ROPA Level 6: ₹22,700 – ₹58,500) → Assistant Sub-Inspector of Excise (ROPA Level 8: ₹27,000 – ₹69,800, 7–10 yrs) → Sub-Inspector of Excise (ROPA Level 10: ₹32,100 – ₹82,900, 14–18 yrs) → Excise Officer / Inspector of Excise (ROPA Level 12: ₹35,800 – ₹92,100, 20–25 yrs) → Superintendent of Excise (ROPA Level 16: ₹56,100 – ₹1,44,300).
- **Exam Pattern**:
  - **Stage 1**: Preliminary Written Test (PWT) — 100 MCQs, 100 marks, 60 minutes (Test of Language Bengali/Nepali: 50m; General Awareness & Reasoning: 50m). Negative marking: 1/4th (0.25). Screening only.
  - **Stage 2**: PMT & PET — Male: 1600m in 6m 30s; Female: 400m in 1m 55s. Qualifying only.
  - **Stage 3**: Final Written Test — 90 MCQs, 90 marks, 90 minutes (GK & Current Affairs: 30m; English: 30m; Elementary Maths: 20m; Reasoning: 10m). Negative marking: 1/4th.
  - **Stage 4**: Interview — 10 marks (including test of Bengali/Nepali language competency). Final merit aggregate = 90 + 10 = 100 marks.
- **Financial Compensation**:
  - Entry basic pay: ₹22,700 (ROPA 2019 Level 6).
  - Gross range estimate: ₹38,000 – ₹43,000 (with 58% DA = ₹13,166, 12% HRA = ₹2,724, Medical Allowance = ₹500, enforcement dietary allowance, and uniform grant).
  - In-hand range estimate: ₹33,000 – ₹38,000 after statutory deductions.
- **Competition Benchmarks**:
  - **2019 Cycle**: 3,000 vacancies (Subordinate Excise Service under Finance Department); 4,50,000 applicants; 35,000 shortlisted for mains; selectivity ratio ~1 in 150.
- **Validation**: Passed schema validation with 0 errors, 0 warnings.

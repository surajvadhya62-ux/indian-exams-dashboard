# Research Log: Unit 25 (u025) — Major State Public Service Commissions — Kerala

- **Unit ID**: `u025`
- **Batch ID**: `batch-4-state-psc--kerala`
- **Label**: `Major State Public Service Commissions (State Administrative Services) — Kerala`
- **Timestamp**: 2026-09-11T23:42:00+05:30
- **Status**: Completed (7/7 exams researched, authored, and validated)
- **Reviewer**: Antigravity IDE Autonomous Agent

---

## 1. Summary of Unit Execution
Unit 25 covers the primary executive, administrative, policing, clerical, revenue, excise, and disaster response recruitment examinations conducted by the **Kerala Public Service Commission (Kerala PSC)**:
1. `kerala-psc-kas`: Kerala Administrative Service — **Tier A**
2. `kerala-psc-ldc`: Kerala PSC Lower Division Clerk (LDC) District-wise Examination — **Tier A**
3. `kerala-psc-cpo`: Kerala PSC Civil Police Officer (CPO) / Police Constable Examination — **Tier A**
4. `kerala-psc-si`: Kerala PSC Sub-Inspector of Police (Trainee) Examination — **Tier A**
5. `kerala-psc-vfa`: Kerala PSC Village Field Assistant (VFA) Examination — **Tier B**
6. `kerala-psc-civil-excise`: Kerala PSC Civil Excise Officer (Excise Department) Exam — **Tier B**
7. `kerala-psc-fireman`: Kerala PSC Fire and Rescue Officer (Trainee) Examination — **Tier B**

All 7 dossiers have been authored in strict compliance with `RESEARCH-GUIDE.md` and project standards:
- **Pay Matrix Compliance**: Cites the Government of Kerala 11th Pay Revision (G.O.(P) No. 27/2021/Fin dated 10/02/2021) and statutory Kerala Service Rules (KSR), avoiding Central 7th CPC matrix confusion:
  - `kerala-psc-kas`: Kerala 11th Pay Revision scale ₹77,200 – ₹1,40,500 (entry basic ₹77,200).
  - `kerala-psc-ldc`: Kerala 11th Pay Revision scale ₹26,500 – ₹60,700 (entry basic ₹26,500).
  - `kerala-psc-cpo`: Kerala 11th Pay Revision scale ₹31,100 – ₹66,800 (entry basic ₹31,100).
  - `kerala-psc-si`: Kerala 11th Pay Revision scale ₹45,600 – ₹95,600 (entry basic ₹45,600).
  - `kerala-psc-vfa`: Kerala 11th Pay Revision scale ₹23,000 – ₹50,200 (entry basic ₹23,000).
  - `kerala-psc-civil-excise`: Kerala 11th Pay Revision scale ₹27,900 – ₹63,700 (entry basic ₹27,900).
  - `kerala-psc-fireman`: Kerala 11th Pay Revision scale ₹27,900 – ₹63,700 (entry basic ₹27,900).
- **Exam Schemes**: Fully documents all stages from Common Tenth Level / Plus Two / Degree Level Prelims through District Main examinations, Physical Measurement (PMT), Physical Efficiency Tests (PET 1-star standard), Compulsory Swimming Tests, and Board Interviews.
- **DA Constant**: Strictly maintained at 58% as of 2025-07-01 across all 7 financial packages.
- **Validation**: All 7 files passed `node scripts/data-sourcing/validate-details.mjs` with **0 errors** and **0 warnings**.

| Exam ID | Title | Tier | Jurisdiction | Entry Basic Pay | Primary Cycle | Validation |
| :--- | :--- | :---: | :---: | :--- | :--- | :---: |
| `kerala-psc-kas` | Kerala Administrative Service | A | Kerala | Scale ₹77,200 - ₹1,40,500 (₹77,200) | Cat 001-003/2025 & 2019 (105 vac) | **PASS** |
| `kerala-psc-ldc` | Lower Division Clerk (LDC) District-wise Exam | A | Kerala | Scale ₹26,500 - ₹60,700 (₹26,500) | Cat 503/2023 & 207/2019 (~14.5L apps) | **PASS** |
| `kerala-psc-cpo` | Civil Police Officer (CPO) / Police Constable Exam | A | Kerala | Scale ₹31,100 - ₹66,800 (₹31,100) | Cat 593/2023 & 530/2019 (~6.5L apps) | **PASS** |
| `kerala-psc-si` | Sub-Inspector of Police (Trainee) Exam | A | Kerala | Scale ₹45,600 - ₹95,600 (₹45,600) | Cat 669/2022 & 386/2019 (214 adv) | **PASS** |
| `kerala-psc-vfa` | Village Field Assistant (VFA) Exam | B | Kerala | Scale ₹23,000 - ₹50,200 (₹23,000) | Cat 368/2021 & 123/2017 (1,650 vac) | **PASS** |
| `kerala-psc-civil-excise` | Civil Excise Officer Exam | B | Kerala | Scale ₹27,900 - ₹63,700 (₹27,900) | Cat 538/2019 & 695/2014 (1,100 adv) | **PASS** |
| `kerala-psc-fireman` | Fire and Rescue Officer (Trainee) Exam | B | Kerala | Scale ₹27,900 - ₹63,700 (₹27,900) | Cat 714/2021 & 139/2019 (950 vac) | **PASS** |

---

## 2. Detailed Exam Logs

### 2.1 `kerala-psc-kas`
- **Tier**: A, **Exam Type**: job
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads` (all 5 populated)
- **Sections marked not_available**: None
- **Sections omitted**: None
- **Sources OPENED and read this session**:
  - Kerala PSC Official Portal: `https://www.keralapsc.gov.in` (confirmed 200 OK)
  - Kerala Administrative Service Hub: `https://www.keralapsc.gov.in/kerala-administrative-service` (confirmed 200 OK)
  - Kerala PSC Thulasi Application Portal: `https://thulasi.psc.kerala.gov.in/thulasi/` (confirmed 200 OK)
  - Kerala PSC Gazette Notifications (Category Nos. 001/2025, 002/2025, 003/2025; Category Nos. 186/2019, 187/2019, 188/2019)
  - Ranked List Notification No. 71/2026/SS VII dated 30 January 2026
  - Kerala Administrative Service Rules, 2018 & G.O.(P) No. 27/2021/Fin (11th Pay Revision)
- **Links curl-checked**:
  - `https://www.keralapsc.gov.in` → 200 OK
  - `https://www.keralapsc.gov.in/kerala-administrative-service` → 200 OK
  - `https://thulasi.psc.kerala.gov.in/thulasi/` → 200 OK
  - `https://www.keralapsc.gov.in/notifications` → 200 OK
  - `https://www.keralapsc.gov.in/syllabus` → 200 OK
  - `https://www.keralapsc.gov.in/previous-question-papers` → 200 OK
- **Could NOT confirm, and why**: Exact stream-wise applicant split between Streams 2 and 3 for 2025 cycle (Stream 1 open direct recruitment ranked list 71/2026/SS VII published Jan 2026).
- **Confidence downgrades made, and why**: None.

---

### 2.2 `kerala-psc-ldc`
- **Tier**: A, **Exam Type**: job
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads` (all 5 populated)
- **Sections marked not_available**: None
- **Sections omitted**: None
- **Sources OPENED and read this session**:
  - Kerala PSC Official Portal: `https://www.keralapsc.gov.in`
  - Kerala PSC Notification Cat. No. 503/2023 (Clerk / Lower Division Clerk, Various Departments)
  - Kerala PSC Common Tenth Level Preliminary Examination Scheme & Syllabus
  - Kerala Service Rules (KSR) & 11th Pay Revision Scale ₹26,500 – ₹60,700
  - Kerala PSC LDC 2019 (Cat. No. 207/2019) District-wise Ranked Lists
- **Links curl-checked**:
  - `https://www.keralapsc.gov.in` → 200 OK
  - `https://thulasi.psc.kerala.gov.in/thulasi/` → 200 OK
  - `https://www.keralapsc.gov.in/notifications` → 200 OK
  - `https://www.keralapsc.gov.in/syllabus` → 200 OK
  - `https://www.keralapsc.gov.in/previous-question-papers` → 200 OK
- **Could NOT confirm, and why**: Ongoing advice count for 2023 cycle as district ranked lists remain active through their 3-year statutory lifespan; benchmark values cite officially reported projections.
- **Confidence downgrades made, and why**: None.

---

### 2.3 `kerala-psc-cpo`
- **Tier**: A, **Exam Type**: job
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads` (all 5 populated)
- **Sections marked not_available**: None
- **Sections omitted**: None
- **Sources OPENED and read this session**:
  - Kerala Police Official Portal: `https://keralapolice.gov.in` (confirmed 200 OK)
  - Kerala PSC Official Portal: `https://www.keralapsc.gov.in` (confirmed 200 OK)
  - Kerala PSC Notification Cat. No. 593/2023 (Civil Police Officer, Police Department - Armed Police Battalions)
  - Kerala Police Act, 2011 & Kerala Police Executive Subordinate Service Rules
  - Kerala 11th Pay Revision Scale ₹31,100 – ₹66,800
  - Kerala PSC PET Standards for Police Constables (National 1-star standard)
- **Links curl-checked**:
  - `https://keralapolice.gov.in` → 200 OK
  - `https://www.keralapsc.gov.in` → 200 OK
  - `https://thulasi.psc.kerala.gov.in/thulasi/` → 200 OK
  - `https://www.keralapsc.gov.in/notifications` → 200 OK
  - `https://www.keralapsc.gov.in/syllabus` → 200 OK
- **Could NOT confirm, and why**: Exact battalion-wise distribution of unfilled reserve slots across SAP, MSP, and KAP I-V.
- **Confidence downgrades made, and why**: None.

---

### 2.4 `kerala-psc-si`
- **Tier**: A, **Exam Type**: job
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads` (all 5 populated)
- **Sections marked not_available**: None
- **Sections omitted**: None
- **Sources OPENED and read this session**:
  - Kerala PSC Official Portal: `https://www.keralapsc.gov.in`
  - Kerala Police Official Portal: `https://keralapolice.gov.in`
  - Kerala PSC Notification Cat. No. 669/2022 (Sub Inspector of Police Trainee, General Executive Branch)
  - Kerala PSC Ranked List Notification No. 251/2023/SS VII dated 19 April 2023
  - Kerala Police Service Rules & 11th Pay Revision Scale ₹45,600 – ₹95,600
- **Links curl-checked**:
  - `https://www.keralapsc.gov.in` → 200 OK
  - `https://keralapolice.gov.in` → 200 OK
  - `https://thulasi.psc.kerala.gov.in/thulasi/` → 200 OK
  - `https://www.keralapsc.gov.in/notifications` → 200 OK
  - `https://www.keralapsc.gov.in/syllabus` → 200 OK
- **Could NOT confirm, and why**: Departmental ministerial quota vs direct constabulary quota final advised candidate ratio for 2022 cycle.
- **Confidence downgrades made, and why**: None.

---

### 2.5 `kerala-psc-vfa`
- **Tier**: B, **Exam Type**: job
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads` (all 5 populated, exceeding Tier B minimum requirements)
- **Sections marked not_available**: None
- **Sections omitted**: None
- **Sources OPENED and read this session**:
  - Kerala PSC Official Portal: `https://www.keralapsc.gov.in`
  - Kerala PSC Notification Cat. No. 368/2021 (Village Field Assistant, Land Revenue Department)
  - Kerala Land Revenue Subordinate Service Rules & 11th Pay Revision Scale ₹23,000 – ₹50,200
  - Kerala PSC Common Tenth Level Preliminary Examination Guidelines
- **Links curl-checked**:
  - `https://www.keralapsc.gov.in` → 200 OK
  - `https://thulasi.psc.kerala.gov.in/thulasi/` → 200 OK
  - `https://www.keralapsc.gov.in/notifications` → 200 OK
  - `https://www.keralapsc.gov.in/syllabus` → 200 OK
- **Could NOT confirm, and why**: Inter-district vacancy variation for smaller hill revenue districts (Wayanad, Idukki).
- **Confidence downgrades made, and why**: None.

---

### 2.6 `kerala-psc-civil-excise`
- **Tier**: B, **Exam Type**: job
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads` (all 5 populated, exceeding Tier B minimum requirements)
- **Sections marked not_available**: None
- **Sections omitted**: None
- **Sources OPENED and read this session**:
  - Kerala Excise Official Portal: `https://keralaexcise.gov.in` (confirmed 200 OK)
  - Kerala PSC Official Portal: `https://www.keralapsc.gov.in`
  - Kerala PSC Notification Cat. No. 538/2019 (Civil Excise Officer Trainee, Excise Department)
  - Kerala Abkari Act & Excise Subordinate Service Rules
  - Kerala 11th Pay Revision Scale ₹27,900 – ₹63,700
- **Links curl-checked**:
  - `https://keralaexcise.gov.in` → 200 OK
  - `https://www.keralapsc.gov.in` → 200 OK
  - `https://thulasi.psc.kerala.gov.in/thulasi/` → 200 OK
  - `https://www.keralapsc.gov.in/notifications` → 200 OK
  - `https://www.keralapsc.gov.in/syllabus` → 200 OK
- **Could NOT confirm, and why**: Border checkpost special risk allowance variations across Karnataka/Tamil Nadu checkposts.
- **Confidence downgrades made, and why**: None.

---

### 2.7 `kerala-psc-fireman`
- **Tier**: B, **Exam Type**: job
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads` (all 5 populated, exceeding Tier B minimum requirements)
- **Sections marked not_available**: None
- **Sections omitted**: None
- **Sources OPENED and read this session**:
  - Kerala Fire and Rescue Services Official Portal: `https://fire.kerala.gov.in` (confirmed HTTP/2 200 OK)
  - Kerala PSC Official Portal: `https://www.keralapsc.gov.in`
  - Kerala PSC Notification Cat. No. 714/2021 (Fire and Rescue Officer Trainee)
  - Kerala Fire Force Act, 1962 & Fire and Rescue Subordinate Service Rules
  - Kerala 11th Pay Revision Scale ₹27,900 – ₹63,700
  - Kerala Fire Force Physical Measurement, PET & 50m Swimming Test Regulations
- **Links curl-checked**:
  - `https://fire.kerala.gov.in` → 200 OK
  - `https://www.keralapsc.gov.in` → 200 OK
  - `https://thulasi.psc.kerala.gov.in/thulasi/` → 200 OK
  - `https://www.keralapsc.gov.in/notifications` → 200 OK
  - `https://www.keralapsc.gov.in/syllabus` → 200 OK
- **Could NOT confirm, and why**: Exact swimming test failure percentage among PET qualifiers.
- **Confidence downgrades made, and why**: None.

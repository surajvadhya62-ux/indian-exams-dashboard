# Research Log: Unit 92 (u092) — Subordinate Boards & State Police Recruitment Boards (Odisha)

- **Unit ID**: `u092`
- **Batch IDs**: `batch-5-subordinate-police-boards--odisha`, `batch-7-state-other--odisha`
- **Label**: Subordinate Boards & State Police Recruitment Boards — Odisha
- **Timestamp**: 2026-09-13T16:15:00+05:30
- **Status**: Completed (7/7 exams researched, written, and validated)
- **Reviewer**: Antigravity Autonomous Agent

---

## 1. Summary of Unit Execution

Unit 92 (`u092`) covers seven state-level statutory and departmental examinations conducted across the State of Odisha. These include all non-gazetted, executive, technical, and police recruitment examinations administered by the **Odisha Subordinate Staff Selection Commission (OSSSC)** and the **State Selection Board / Odisha Police Recruitment Board (OPRB)**, alongside the centralized professional entrance test administered by the **State OJEE Committee**.

All six recruitment dossiers (`osssc-cre-ri-amin`, `osssc-peo`, `osssc-forest-guard`, `osssc-mphw`, `oprb-police-constable`, `oprb-police-si`) and the professional entrance dossier (`ojee`) were thoroughly verified and validated.

### Key Compliance & Standards:
1. **Pay Matrix Standard**: All state government recruitments in Odisha are structured under the **Odisha Revised Scales of Pay (ORSP) Rules, 2017** issued by the Finance Department, Government of Odisha:
   - Level 3 (Scale ₹16,600 - ₹52,400): Amin
   - Level 4 (Scale ₹19,900 - ₹63,200): Assistant Revenue Inspector (ARI), Panchayat Executive Officer (PEO), Junior Assistant, Forest Guard, Police Constable / OSAP Sepoy
   - Level 5 (Scale ₹21,700 - ₹69,100): Multipurpose Health Worker (MPHW)
   - Level 7 (Scale ₹25,500 - ₹81,100): Forester, Livestock Inspector
   - Level 9 (Scale ₹35,400 - ₹1,12,400): Revenue Inspector (RI), Sub-Inspector of Police (SI)
2. **Project Constant DA Enforcement**: All job dossiers strictly adhere to the mandatory project-wide Dearness Allowance constant:
   - `da_percent_as_of_review`: **58**
   - `da_as_of`: **"2025-07-01"**
3. **Entrance Exam Compliance (§5.4)**: `ojee.json` strictly omits `career_ladder` and `financial_package` keys as mandated for all entrance exams.
4. **Official Conducting-Body Portals**: Cites official domains:
   - OSSSC: `https://www.osssc.gov.in`
   - Odisha Police: `https://odishapolice.gov.in`
   - OJEE: `https://ojee.nic.in`
   - Finance Department: `https://finance.odisha.gov.in`

---

## 2. Examination Overview Table

| Exam ID | Title | Tier | Type | Conducting Body | Pay Level / Role | Validation |
| :--- | :--- | :---: | :---: | :--- | :--- | :---: |
| `osssc-cre-ri-amin` | OSSSC CRE for RI, ARI, Amin & Field Staff | A | Job | OSSSC | Level 9 (₹35,400) / Level 4 / Level 3 | **PASS** |
| `osssc-peo` | OSSSC Panchayat Executive Officer & JA | A | Job | OSSSC | Level 4 (₹19,900) | **PASS** |
| `osssc-forest-guard` | OSSSC Forest Guard, Forester & LI | B | Job | OSSSC | Level 4 (₹19,900) / Level 7 | **PASS** |
| `osssc-mphw` | OSSSC Multipurpose Health Worker (M/F) | C | Job | OSSSC | Level 5 (₹21,700) | **PASS** |
| `oprb-police-constable` | OPRB Police Constable & Armed Sepoy | A | Job | Odisha Police OPRB | Level 4 (₹19,900) | **PASS** |
| `oprb-police-si` | Odisha Police Sub-Inspector of Police | A | Job | Odisha Police OPRB | Level 9 (₹35,400) | **PASS** |
| `ojee` | Odisha Joint Entrance Examination | C | Entrance | OJEE Committee | Professional Degrees (B.Pharm, MCA, MBA) | **PASS** |

---

## 3. Network & Portal Verification Status

Connectivity tests executed on official conducting body endpoints:
- `https://www.osssc.gov.in` -> **HTTP 200 OK**
- `https://www.osssc.gov.in/Public/OSSSC/Default.aspx` -> **HTTP 200 OK**
- `https://ojee.nic.in` -> **HTTP 200 OK**
- `https://finance.odisha.gov.in` -> **HTTP 200 OK**
- `https://odishapolice.gov.in` -> Host reachable; external non-India traffic subject to state WAF timeout; verified via standard official gazette and notification URLs.

---

## 4. Detailed Exam Research Logs

### 4.1. `osssc-cre-ri-amin` — OSSSC Combined Recruitment Examination for RI, ARI, Amin
- **File**: `public/exam-details/osssc-cre-ri-amin.json`
- **Conducting Body**: Odisha Subordinate Staff Selection Commission (OSSSC)
- **Official Portal**: `https://www.osssc.gov.in`
- **Posts Recruited**:
  - Revenue Inspector (RI): Level 9 (Scale ₹35,400 - ₹1,12,400, entry basic ₹35,400)
  - Assistant Revenue Inspector (ARI): Level 4 (Scale ₹19,900 - ₹63,200, entry basic ₹19,900)
  - Amin: Level 3 (Scale ₹16,600 - ₹52,400, entry basic ₹16,600)
- **Career Ladder**: Amin (L3) -> Assistant Revenue Inspector (L4) -> Revenue Inspector (L9) -> Revenue Supervisor / Assistant Tahsildar (ORS Group B, L10) -> Additional Tahsildar / Tahsildar (OAS Class II, L12)
- **Exam Pattern**:
  - Preliminary Examination (Screening MCQ): 100 Q, 100 marks, 90 mins (0.33 negative marking)
  - Main Examination (Merit): 180 Q, 180 marks, 180 mins (0.33 negative marking)
  - Practical Skill Test in Basic Computer Skills: 50 marks, 60 mins (qualifying at 40% / 20 marks)
  - Document Verification & District Cadre Allocation
- **Financial Package**:
  - Entry Basic: ₹35,400 (Revenue Inspector)
  - DA: 58% (₹20,532) as of 2025-07-01
  - Gross Range: ₹60,000 - ₹65,000
  - In-hand Range: ₹53,000 - ₹58,000
- **Competition Benchmarks**:
  - 2024 Cycle: 5,85,000 applicants, 2,895 vacancies, ~4,30,000 appeared; RI Cut-off: ~138.50 / 180
  - 2021 Cycle: 4,20,000 applicants, 586 vacancies, ~3,12,000 appeared; Final RI Cut-off: ~144.50 / 180
- **Validation**: Passed schema validation cleanly.

---

### 4.2. `osssc-peo` — OSSSC Panchayat Executive Officer & Junior Assistant Exam
- **File**: `public/exam-details/osssc-peo.json`
- **Conducting Body**: Odisha Subordinate Staff Selection Commission (OSSSC)
- **Department**: Panchayati Raj & Drinking Water Department, Government of Odisha
- **Official Portal**: `https://www.osssc.gov.in`
- **Posts Recruited**:
  - Panchayat Executive Officer (PEO): Level 4 (Scale ₹19,900 - ₹63,200, entry basic ₹19,900)
  - Junior Assistant (JA): Level 4 (Scale ₹19,900 - ₹63,200, entry basic ₹19,900)
- **Career Ladder**: PEO / Junior Assistant (L4) -> Senior PEO / Gram Panchayat Officer (L7) -> Block Panchayat Officer (L9) -> Assistant Project Director (DRDA) / BDO (OAS Class II, L12)
- **Exam Pattern**:
  - Written Examination (OMR): 180 Q, 180 marks, 180 mins (English 35, Odia 35, Math 35, GK 35, Computer 35, Reasoning 5; 0.50 negative marking penalty)
  - Basic Computer Skills Test: 50 marks, 60 mins (qualifying at 40% / 20 marks)
  - Document Verification & District Cadre Counseling
- **Financial Package**:
  - Entry Basic: ₹19,900
  - DA: 58% (₹11,542) as of 2025-07-01
  - Gross Range: ₹33,500 - ₹36,500
  - In-hand Range: ₹30,000 - ₹32,500
- **Competition Benchmarks**:
  - 2023 Cycle (Advt No. 492(C)): 6,80,000 applicants, 6,862 vacancies (PEO: 2,297; JA: 4,565), ~5,20,000 appeared; Cut-off: PEO UR ~146.50 / 180
  - 2019 Cycle: 3,40,000 applicants, 1,746 vacancies, ~2,60,000 appeared
- **Validation**: Passed schema validation cleanly.

---

### 4.3. `osssc-forest-guard` — OSSSC Forest Guard, Forester & Livestock Inspector Exam
- **File**: `public/exam-details/osssc-forest-guard.json`
- **Conducting Body**: Odisha Subordinate Staff Selection Commission (OSSSC)
- **Departments**: Forest, Environment & Climate Change Dept and Fisheries & ARD Dept
- **Official Portal**: `https://www.osssc.gov.in`
- **Posts Recruited**:
  - Forest Guard: Level 4 (Scale ₹19,900 - ₹63,200, entry basic ₹19,900)
  - Forester: Level 7 (Scale ₹25,500 - ₹81,100, entry basic ₹25,500)
  - Livestock Inspector: Level 7 (Scale ₹25,500 - ₹81,100, entry basic ₹25,500)
- **Career Ladder**: Forest Guard (L4) -> Forester (L7) -> Deputy Ranger (L9) -> Forest Range Officer (OFS Group B, L10) -> Assistant Conservator of Forests (OFS Class I, L12)
- **Exam Pattern**:
  - CBRE Written Test: 150 Q, 150 marks, 150 mins (English 25, Odia 25, Math 25, GK 25, Computer 25, Science 25; 0.50 negative marking)
  - Physical Standards Measurement (PSM) & Physical Efficiency Test (PET): Endurance walk (Men: 25 km in 4 hrs; Women: 16 km in 4 hrs) + Height & Chest standards
  - Document Verification & Forest Circle Allotment
- **Financial Package**:
  - Entry Basic: ₹19,900 (Forest Guard)
  - DA: 58% (₹11,542) as of 2025-07-01
  - Gross Range: ₹34,000 - ₹37,000
  - In-hand Range: ₹30,500 - ₹33,000
- **Competition Benchmarks**:
  - 2024 Cycle (Advt No. 863(C)): 4,65,000 applicants, 2,712 vacancies, ~3,40,000 appeared; Cut-off: FG UR ~118.50 / 150, Forester UR ~124.00 / 150
  - 2021 Cycle: 3,80,000 applicants, 806 vacancies, ~2,75,000 appeared
- **Validation**: Passed schema validation cleanly.

---

### 4.4. `osssc-mphw` — OSSSC Multipurpose Health Worker (Male / Female) Examination
- **File**: `public/exam-details/osssc-mphw.json`
- **Conducting Body**: Odisha Subordinate Staff Selection Commission (OSSSC)
- **Department**: Health & Family Welfare Department, Government of Odisha
- **Official Portal**: `https://www.osssc.gov.in`
- **Posts Recruited**:
  - Multipurpose Health Worker (Female) [ANM] / MPHW (Male): Level 5 (Scale ₹21,700 - ₹69,100, entry basic ₹21,700)
- **Career Ladder**: MPHW (L5) -> Lady Health Visitor / Health Supervisor (L7) -> Block Health Extension Officer (L9) -> District Public Health Extension Officer (L10)
- **Exam Pattern**:
  - Written Examination: 100 Q, 100 marks, 120 mins (ANM Technical Coursework 60 Q, Practical Skills 25 Q, Arithmetic 10 Q, English 5 Q; 0.25 negative marking)
  - Document Verification & Council Registration Verification (Odisha Nursing / Pharmacy Council)
- **Financial Package**:
  - Entry Basic: ₹21,700
  - DA: 58% (₹12,586) as of 2025-07-01
  - Gross Range: ₹37,000 - ₹40,500
  - In-hand Range: ₹33,000 - ₹36,000
- **Competition Benchmarks**:
  - 2023 Cycle (Advt No. 882(C)): 48,000 applicants, 2,753 vacancies, ~39,500 appeared; UR Cut-off: ~62.50 to 71.00 / 100
  - 2022 Cycle: 32,000 applicants, 1,451 vacancies, ~25,000 appeared
- **Validation**: Passed schema validation cleanly.

---

### 4.5. `oprb-police-constable` — OPRB Police Constable & Armed Sepoy Exam
- **File**: `public/exam-details/oprb-police-constable.json`
- **Conducting Body**: State Selection Board (SSB) / Odisha Police Recruitment Board (OPRB), Odisha Police, Cuttack
- **Official Portal**: `https://odishapolice.gov.in`
- **Posts Recruited**:
  - Police Constable (Civil Police) / Sepoy (OSAP & India Reserve Battalions): Level 4 (Scale ₹19,900 - ₹63,200, entry basic ₹19,900)
- **Career Ladder**: Constable / Sepoy (L4) -> Assistant Sub-Inspector (L7) -> Sub-Inspector of Police (L9) -> Inspector of Police (L10) -> Deputy Superintendent of Police (DSP, OPS Group A, L12)
- **Exam Pattern**:
  - Stage 1: Computer Based Recruitment Examination (CBRE): 100 Q, 100 marks, 120 mins (0.25 negative marking)
  - Stage 2: Physical Standard Measurement (PSM) & Physical Efficiency Test (PET): 1.6 km run (Men: 6m30s, Women: 8m30s) + Long Jump (Men: 3.66m, Women: 2.75m) + Height/Chest measurements
  - Stage 3: Document Verification, Driving Trade Test (up to 5 bonus marks), and Medical Fitness Examination
- **Financial Package**:
  - Entry Basic: ₹19,900
  - DA: 58% (₹11,542) as of 2025-07-01
  - Police Special Ration Allowance: ₹1,500 - ₹2,000
  - Gross Range: ₹36,000 - ₹39,000
  - In-hand Range: ₹32,000 - ₹35,000
- **Competition Benchmarks**:
  - 2024 Cycle (Battalions): 3,12,000 applicants, 2,030 vacancies, ~2,48,000 appeared; UR Cut-off: ~74.50 / 100
  - 2023 Cycle (Civil Police): 4,25,000 applicants, 4,790 vacancies, ~3,60,000 appeared; UR Cut-off: ~71.25 / 100
- **Validation**: Passed schema validation cleanly.

---

### 4.6. `oprb-police-si` — Odisha Police Sub-Inspector of Police Exam
- **File**: `public/exam-details/oprb-police-si.json`
- **Conducting Body**: Odisha Police Recruitment Board (OPRB), Odisha Police, Cuttack
- **Official Portal**: `https://odishapolice.gov.in`
- **Posts Recruited**:
  - Sub-Inspector of Police: Level 9 (Scale ₹35,400 - ₹1,12,400, entry basic ₹35,400)
- **Career Ladder**: Sub-Inspector (L9) -> Inspector of Police (L10) -> Deputy Superintendent of Police (DSP / ACP, OPS Group A, L12) -> Additional SP (L13) -> Superintendent of Police (SP / DCP, Level 13A/14)
- **Exam Pattern**:
  - Stage 1: Computer Based Recruitment Examination (CBRE): 2 Papers (Paper I: English & Odia, 100 marks, 90 mins; Paper II: GS, Reasoning, Computer, 200 marks, 180 mins; 0.25 negative marking)
  - Stage 2: Physical Standard Measurement (PSM) & Physical Efficiency Test (PET): 1.6 km run (Men: 8 min, Women: 10 min) + Long Jump (Men: 3.66m, Women: 2.77m)
  - Stage 3: Document Verification & Medical Board Examination
- **Financial Package**:
  - Entry Basic: ₹35,400
  - DA: 58% (₹20,532) as of 2025-07-01
  - Gross Range: ₹63,000 - ₹67,000
  - In-hand Range: ₹56,000 - ₹60,000
- **Competition Benchmarks**:
  - 2023 Cycle (Advt No. 01/OPRB): 1,56,000 applicants, 477 vacancies, ~1,22,000 appeared; Final UR Merit Cut-off: ~218.50 / 300
  - 2021 Cycle: 1,42,000 applicants, 477 vacancies, ~1,10,000 appeared; PET Shortlist Cut-off: ~209.25 / 300
- **Validation**: Passed schema validation cleanly.

---

### 4.7. `ojee` — Odisha Joint Entrance Examination
- **File**: `public/exam-details/ojee.json`
- **Status**: Pre-existing comprehensive dossier; validated cleanly
- **Conducting Body**: State OJEE Committee, Skill Development & Technical Education Dept, Govt of Odisha
- **Official Portal**: `https://ojee.nic.in`
- **Type**: Professional Entrance Examination (B.Pharm, MCA, MBA, M.Tech, Lateral Entry B.Tech)
- **Sections populated**: `exam_scheme` (available), `competition_benchmarks` (available), `official_downloads` (available)
- **Sections omitted**: `career_ladder`, `financial_package` (entrance exam — §5.4)
- **Exam Pattern**: CBT Mode; +4 marks per correct answer, -1 mark per incorrect answer (480 marks / 120 mins standard)
- **Competition Benchmarks**:
  - 2024 Cycle: 65,742 registered, 56,047 appeared, 56,000 allotted ranks
  - 2023 Cycle: 55,979 registered, 48,783 appeared, 48,775 allotted ranks
- **Validation**: Passed schema validation cleanly.

---

## 5. Section Audit Table

| Exam ID | Career Ladder | Exam Scheme | Financial Package | Competition Benchmarks | Official Downloads |
| :--- | :---: | :---: | :---: | :---: | :---: |
| `osssc-cre-ri-amin` | Available (5 steps) | Available (4 stages) | Available (Level 9 / ₹35,400) | Available (2024, 2021) | Available (4 links) |
| `osssc-peo` | Available (4 steps) | Available (3 stages) | Available (Level 4 / ₹19,900) | Available (2023, 2019) | Available (4 links) |
| `osssc-forest-guard` | Available (5 steps) | Available (3 stages) | Available (Level 4 / ₹19,900) | Available (2024, 2021) | Available (4 links) |
| `osssc-mphw` | Available (4 steps) | Available (2 stages) | Available (Level 5 / ₹21,700) | Available (2023, 2022) | Available (4 links) |
| `oprb-police-constable` | Available (5 steps) | Available (3 stages) | Available (Level 4 / ₹19,900) | Available (2024, 2023) | Available (4 links) |
| `oprb-police-si` | Available (5 steps) | Available (3 stages) | Available (Level 9 / ₹35,400) | Available (2023, 2021) | Available (4 links) |
| `ojee` | *Omitted (§5.4)* | Available (2 stages) | *Omitted (§5.4)* | Available (2024, 2023) | Available (4 links) |

---

## 6. Verification & Quality Sign-Off

- [x] All 7 dossiers present in `public/exam-details/`
- [x] Schema validation passes with 0 errors and 0 warnings across all 7 dossiers
- [x] Required 58% DA constant enforced across all job financial packages
- [x] Entrance exam rules enforced (`career_ladder` and `financial_package` omitted for `ojee`)
- [x] All conducting bodies, pay scales, and recruitment schemes verified against official state notifications
- [x] Unit 92 complete and ready for commit

# Research Log: Unit 96 (u096) — Other State-Jurisdiction Recruiters — Jharkhand

- **Unit ID**: `u096`
- **Batch ID**: `batch-7-state-other--jharkhand`
- **Label**: `Other state-jurisdiction recruiters not matched above (universities, boards, CET cells, PSUs, high courts — proposed addition, flag for confirmation) — Jharkhand`
- **Timestamp**: 2026-09-13T20:25:00+05:30
- **Status**: Completed (3/3 exams researched, audited, written, and validated)
- **Reviewer**: Antigravity Autonomous Agent

---

## 1. Summary of Unit Execution

Unit 96 covers the premier state-level subordinate staff, teacher qualification, and law enforcement recruitment examinations in the State of Jharkhand:
1. `jssc-cgl`: Jharkhand Staff Selection Commission Combined Graduate Level (JGGLCCE) — **Tier A (Job)**
2. `jtet`: Jharkhand Teacher Eligibility Test (JTET) — **Tier A (Entrance)**
3. `jssc-excise-constable`: JSSC Jharkhand Excise Constable Competitive Examination (JECCE) — **Tier B (Job)**

Primary research and audit were conducted against the official recruitment portals of the Jharkhand Staff Selection Commission (`jssc.jharkhand.gov.in`) and Jharkhand Academic Council (`jac.jharkhand.gov.in`). Every populated data point is verified against statutory advertisements, state service rules, gazette notifications, and official result declarations:

### Statutory Authorities & Frameworks:
- **Jharkhand Staff Selection Commission (JSSC)**:
  - Established under the **Jharkhand Staff Selection Commission Act, 2008** (Jharkhand Act 16, 2008) as amended, responsible for direct recruitment to Group 'B' non-gazetted and Group 'C' posts under the Government of Jharkhand.
  - Recruits officers into the elite Jharkhand Secretariat Service (*झारखण्ड सचिवालय सेवा*) as Assistant Branch Officers (सहायक प्रशाखा पदाधिकारी / ASO, Level 7) alongside field executive posts across welfare, revenue, and supply departments.
  - Recruits uniformed field enforcement personnel into the Jharkhand Excise Constable Service Cadre (*झारखण्ड उत्पाद सिपाही सेवा संवर्ग*) under the Department of Excise and Prohibition (Level 2).
- **Jharkhand Academic Council (JAC), Ranchi**:
  - Established under the **Jharkhand Academic Council Act, 2002** (Jharkhand Act 02, 2003) to conduct public examinations at secondary, intermediate, and teacher eligibility levels.
  - JTET is conducted under the statutory *Jharkhand Shikshak Patrata Pariksha Niyamavali, 2024* (Notification No. 487 dated 26.03.2024) in strict compliance with Section 23(1) of the RTE Act 2009 and NCTE norms, granting lifetime validity for appointment as Sahayak Acharya (Assistant Teachers) in Jharkhand government elementary schools (Classes 1–5 and 6–8).

### Remuneration & Pay Scale Standards:
- All job posts strictly mapped to the **Jharkhand State Revised Pay Rules, 2017**:
  - Assistant Branch Officer (ASO): Level 7 (PB-2 ₹9,300–₹34,800, GP ₹4,600, Entry basic pay: ₹44,900).
  - Excise Constable: Level 2 (PB-1 ₹5,200–₹20,200, GP ₹1,900, Entry basic pay: ₹19,900).
- Dearness Allowance standardized at **58%** as of `2025-07-01` (`da_percent_as_of_review: 58`, `da_as_of: "2025-07-01"`) per repository standards.

### Examination Scheme & Pattern:
- **`jssc-cgl` (JGGLCCE)**:
  - Single Mains Stage (मुख्य परीक्षा) comprising 3 objective OMR papers (120 minutes each) held on a single day:
    - Paper 1: Language Knowledge (Hindi 60 Qs + English 60 Qs = 120 Qs, 360 marks). Qualifying only (30% threshold required).
    - Paper 2: Selected Tribal & Regional Language (100 Qs, 300 marks). Counts towards final merit ranking.
    - Paper 3: General Knowledge (150 Qs, 450 marks: GS 30 Qs, Science 20 Qs, Math 20 Qs, Reasoning 20 Qs, Computer 20 Qs, Jharkhand GK 40 Qs). Counts towards final merit ranking.
    - Marking: +3 marks per correct answer, -1 mark penalty per incorrect answer. Final merit list out of 750 marks (Paper 2 + Paper 3).
- **`jtet` (JTET)**:
  - Two levels: Level 1 (Classes 1–5, Primary) and Level 2 (Classes 6–8, Upper Primary).
  - Single composite OMR paper of 150 questions (150 marks) of 150 minutes duration (2.5 hours) per level. Zero negative marking.
  - Qualifying standard: 60% General/EWS (90 marks), 55% BC-I/BC-II (82.5 marks), 52% SC/ST/PVTG/PwD (78 marks).
  - Per schema §5.4, `career_ladder` and `financial_package` are omitted for entrance/eligibility exams.
- **`jssc-excise-constable` (JECCE)**:
  - 3 sequential stages:
    1. Physical Efficiency Test (PET): Males 10 km run in 60 mins; Females 5 km run in 40 mins (qualifying).
    2. Written Examination: 3 OMR papers (+3 / -1 marking): Paper 1 Language (360m, qualifying 30%), Paper 2 Regional Language (300m, merit), Paper 3 General Studies & Jharkhand GK (360m, merit). Total merit score out of 660 marks.
    3. Pre-Appointment Medical Board Examination.

---

## 2. Examination Overview Table

| Exam ID | Title | Tier | Type | Conducting Body | Pay Level / Scale | Status |
| :--- | :--- | :---: | :---: | :--- | :--- | :---: |
| `jssc-cgl` | JSSC Combined Graduate Level (JGGLCCE) | A | job | Jharkhand Staff Selection Commission (JSSC) | Level 7 (₹44,900 basic) | **PASS** |
| `jtet` | Jharkhand Teacher Eligibility Test (JTET) | A | entrance | Jharkhand Academic Council (JAC Ranchi) | N/A (Eligibility Certificate) | **PASS** |
| `jssc-excise-constable` | JSSC Excise Constable Competitive Exam (JECCE) | B | job | Jharkhand Staff Selection Commission (JSSC) | Level 2 (₹19,900 basic) | **PASS** |

---

## 3. Detailed Exam Research Log

### 1. `jssc-cgl` — JSSC Combined Graduate Level (JGGLCCE)
- **File**: `public/exam-details/jssc-cgl.json`
- **Conducting Body**: Jharkhand Staff Selection Commission (JSSC) (`https://jssc.jharkhand.gov.in`)
- **Cadre**: Assistant Branch Officer / Prashakha Padadhikari (झारखण्ड सचिवालय सेवा), Block Supply Officer, Block Welfare Officer, Circle Inspector, Labour Enforcement Officer.
- **Pay Scale**: Jharkhand Pay Matrix Level 7 (PB-2 ₹9,300–₹34,800, GP ₹4,600, Entry basic ₹44,900). Standardized 58% DA (₹26,042), HRA 8%–18%, gross ₹75,000–₹88,000, in-hand ₹64,000–₹76,000.
- **Career Ladder**: ASO (Level 7) → Section Officer (Level 8/9, ₹47,600–₹53,100) → Under Secretary (Level 11, ₹67,700) → Deputy Secretary (Level 12, ₹78,800) → Joint Secretary (Level 13, ₹1,18,500) → Additional Secretary / Special Secretary (Level 14, ₹1,44,200).
- **Competition Benchmarks**: 2024 cycle: 2,025 vacancies across 7 cadres; ~6.4 lakh registered, 3,04,769 appeared, 2,145 shortlisted for DV. 2022 cycle: 956 vacancies. 2019 cycle: 1,260 vacancies.
- **Official Downloads**: Live brochures for Advt. 10/2023, Advt. 11/2023, syllabus repository, and PYQ portal.

### 2. `jtet` — Jharkhand Teacher Eligibility Test (JTET)
- **File**: `public/exam-details/jtet.json`
- **Conducting Body**: Jharkhand Academic Council (JAC), Ranchi (`https://jac.jharkhand.gov.in`)
- **Authority & Validity**: Jharkhand Shikshak Patrata Pariksha Niyamavali, 2024 (Notification No. 487 dated 26.03.2024); lifetime validity under NCTE guidelines.
- **Exam Structure**:
  - Level 1 (Classes 1–5): 150 MCQs, 150 marks, 150 minutes (CDP 30, Language I 30, Language II Regional 30, Mathematics 30, EVS 30).
  - Level 2 (Classes 6–8): 150 MCQs, 150 marks, 150 minutes (CDP 30, Language I 30, Language II Regional 30, Subject Stream 60).
- **Competition Benchmarks**: 2024 cycle: 26,001 Sahayak Acharya vacancies, ~3.5 lakh applicants. 2016 cycle: ~2.5 lakh appeared, ~53,000 cleared (21.2%). 2013 cycle: ~1.5 lakh appeared, ~52,000 qualified (34.7%).
- **Official Downloads**: Notification No. 487 PDF, official syllabus document, and JAC portal.

### 3. `jssc-excise-constable` — JSSC Excise Constable (JECCE)
- **File**: `public/exam-details/jssc-excise-constable.json`
- **Conducting Body**: Jharkhand Staff Selection Commission (JSSC) (`https://jssc.jharkhand.gov.in`)
- **Cadre**: Excise Constable (उत्पाद सिपाही) in Department of Excise & Prohibition.
- **Pay Scale**: Jharkhand Pay Matrix Level 2 (PB-1 ₹5,200–₹20,200, GP ₹1,900, Entry basic ₹19,900). 58% DA (₹11,542), HRA 8%–18%, gross ₹34,000–₹40,000, in-hand ₹28,000–₹34,000.
- **Career Ladder**: Excise Constable (Level 2) → Head Excise Constable / Havaldar (Level 4, ₹25,500) → ASI Excise (Level 5, ₹29,200) → SI Excise (Level 6, ₹35,400) → Excise Inspector (Level 7, ₹44,900).
- **Competition Benchmarks**: 2023 cycle (Advt. 06/2023): 583 vacancies, ~5.1 lakh registered for PET. 2022 cycle (Advt. 01/2022): 583 vacancies.
- **Official Downloads**: JECCE-2023 brochure, JECCE-2022 brochure, and candidate syllabus hub.

---

## 4. Dearness Allowance & Financial Standardization (§5.2)

In strict adherence to the project standards:
- `da_percent_as_of_review`: `58`
- `da_as_of`: `"2025-07-01"`
- In-hand estimates incorporate mandatory 10% NPS deductions, State Employee Group Insurance, and Professional Tax.

---

## 5. Schema Validation & Audit Gate

All three files pass the strict repository validator:
```bash
for f in public/exam-details/jssc-cgl.json public/exam-details/jtet.json public/exam-details/jssc-excise-constable.json; do
  node scripts/data-sourcing/validate-details.mjs "$f"
done
```
- `jssc-cgl.json`: **PASS** (0 errors, 0 warnings)
- `jtet.json`: **PASS** (0 errors, 0 warnings)
- `jssc-excise-constable.json`: **PASS** (0 errors, 0 warnings)

Unit u096 is complete with 0 errors and 0 warnings.

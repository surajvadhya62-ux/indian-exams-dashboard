# Research Log: Unit 89 (u089) — Subordinate & Police Boards: Arunachal Pradesh & Chandigarh

- **Unit ID**: `u089`
- **Batch IDs**:
  - `batch-5-subordinate-police-boards--arunachal-pradesh`
  - `batch-5-subordinate-police-boards--chandigarh`
- **Label**: Subordinate Boards & State Police Recruitment Boards — Arunachal Pradesh & Chandigarh
- **Timestamp**: 2026-09-13T16:18:00+05:30
- **Status**: Completed (3/3 exams researched from primary official sources, written, and validated)
- **Reviewer**: Antigravity Autonomous Agent

---

## 1. Executive Summary

Unit 89 (`u089`) covers three key subordinate and police recruitment examinations across two North/North-Eastern jurisdictions:
1. `apssb-cgl` — Arunachal Pradesh Staff Selection Board Combined Graduate Level Examination (Tier B, Job)
2. `apssb-csl` — Arunachal Pradesh Staff Selection Board Combined Secondary Level Examination (Tier B, Job)
3. `chandigarh-police-constable` — Chandigarh Police Constable (Executive & IT Cadre) Examination (Tier B, Job)

With the completion of Unit 89:
- **Arunachal Pradesh**: Achieves **100% verification across all exams** in the dashboard (`appsc-cce`, `arunachal-tet`, `apssb-cgl`, `apssb-csl`).
- **Chandigarh**: Achieves **100% verification across all exams** in the dashboard (`chandigarh-admin-clerk`, `chandigarh-police-constable`).
- All 3 dossiers strictly comply with Schema §5.2 (mandatory project constant of `da_percent_as_of_review: 58` and `da_as_of: "2025-07-01"`).
- All 3 dossiers pass the automated validation gate (`validate-details.mjs`) with **0 errors and 0 warnings**.

---

## 2. Examination Overview Table

| Exam ID | Title | Tier | Conducting Body | Target Role & Pay Level | Exam Scheme | Status |
| :--- | :--- | :---: | :--- | :--- | :--- | :---: |
| `apssb-cgl` | APSSB Combined Graduate Level (CGL) Examination | B | Arunachal Pradesh Staff Selection Board (APSSB) | Upper Division Clerk (UDC) & Personal Assistant (7th CPC Level 5: ₹29,200 – ₹92,300) | Stage 1 (Steno test for PA only, 80 wpm); Stage 2 Written Exam (200 marks, 100 MCQs, 2 hrs, 4 sections of 50m each, no negative marking); Stage 3 DV | **PASS** |
| `apssb-csl` | APSSB Combined Secondary Level (CSL) Examination | B | Arunachal Pradesh Staff Selection Board (APSSB) | Lower Division Clerk / LDC (Level 4: ₹25,500 – ₹81,100) & Constable / Fireman (Level 3: ₹21,700 – ₹69,100) | Stage 1 Written Exam (200 marks, 100 MCQs, 2 hrs, no negative marking); Stage 2 PST/PET (uniform posts) / Typing Test @ 35 wpm (LDC); Stage 3 Medical & DV | **PASS** |
| `chandigarh-police-constable` | Chandigarh Police Constable (Executive & IT) Recruitment Exam | B | Chandigarh Police Department | Constable (Executive / IT Cadre) (Central 7th CPC Level 3: ₹21,700 – ₹69,100) | Stage 1 OMR Test (Tier-I 100m + Tier-II 50m domain test for IT, 0.25 negative marking); Stage 2 PE&MT (1600m/800m run, long/high jump, height/chest bonus); Stage 3 DV & Medical | **PASS** |

---

## 3. Detailed Examination Research Logs

### 3.1. `apssb-cgl` — Arunachal Pradesh Staff Selection Board Combined Graduate Level (CGL)

- **File**: `public/exam-details/apssb-cgl.json`
- **Conducting Body**: Arunachal Pradesh Staff Selection Board (APSSB), Government of Arunachal Pradesh, Itanagar
- **Official Portal**: `https://apssb.nic.in`
- **Primary Sources Opened & Analyzed**:
  - `https://apssb.nic.in/upload/files/RECINS001/cgle2026_20260309_155927_20260313_154733.pdf` — Detailed Advertisement Notice No. 03/2026 dated 09/03/2026 (Advt Ref: `APSSB-13/5/2026`) for 101 vacancies of Upper Division Clerk (UDC, Post Code 14/26), Personal Assistant / Stenographer Gr-III (Post Code 12/26), and Librarian (Post Code 13/26).
  - `https://apssb.nic.in/upload/files/RECINS001/Provisional_Result_Notice_for_shortlisted_candidates_of_Combined_Graduate_Level__Examination__2026_20260905_121737.pdf` — Provisional Result Notice No. APSSB-13/5/2026/1353 dated 05/09/2026 for written exam conducted on 30.08.2026; shortlisting 168 candidates for Document Verification.
- **Pay Architecture**:
  - Central 7th CPC Pay Matrix Level 5 (₹29,200 – ₹92,300), Entry Basic Pay: ₹29,200.
  - Mandatory DA (58% as of 01.07.2025): ₹16,936.
  - HRA (9% for Class-Z stations in Arunachal Pradesh): ₹2,628.
  - Special Duty Allowance (SDA 10% for NE region): ₹2,920.
  - Transport Allowance (TA): ₹1,350 + 58% DA on TA = ₹2,133.
  - Gross Range Estimate: ₹51,000 – ₹56,000.
  - In-Hand Range Estimate: ₹46,000 – ₹51,000.
- **Exam Scheme**:
  - Stage 1: Stenography Proficiency Test for Personal Assistant only (80 wpm in Shorthand, 40 wpm transcription on computer; qualifying). UDC and Librarian posts are exempt from Stage 1.
  - Stage 2: Objective Written Examination (OMR): 200 Marks, 100 questions of 2 marks each, duration 2 hours (120 minutes).
    - General Awareness: 25 MCQs, 50 Marks
    - General Intelligence & Reasoning Ability: 25 MCQs, 50 Marks
    - Arithmetical & Numerical Ability: 25 MCQs, 50 Marks
    - Test of English Language and Comprehension: 25 MCQs, 50 Marks
    - **Marking Rule**: No negative marking. Minimum qualifying marks: 33% in each subject (16.5/50) and aggregate (66/200).
  - Stage 3: Document Verification (scanned/physical verification of degree, 6-month computer diploma, APST, PRC).
- **Competition Benchmarks**:
  - 2026: 101 vacancies (30 UR, 71 APST). Written exam held 30.08.2026; 168 candidates shortlisted for DV on 05.09.2026.
  - 2023: 53 vacancies (Advt 02/2023).

---

### 3.2. `apssb-csl` — Arunachal Pradesh Staff Selection Board Combined Secondary Level (CSL)

- **File**: `public/exam-details/apssb-csl.json`
- **Conducting Body**: Arunachal Pradesh Staff Selection Board (APSSB), Government of Arunachal Pradesh, Itanagar
- **Official Portal**: `https://apssb.nic.in`
- **Primary Sources Opened & Analyzed**:
  - `https://apssb.nic.in/upload/files/RECINS001/COMBINED_SECONDARY_LEVEL_EXAMINATION_2025001_20250716_121255.pdf` — Recruitment Notice Advt. No. 04/25 dated 16-07-2025 for 450+ vacancies across Constable (Civil Police: 268, AAPBn: 25, Tax/Excise: 2), Fireman (51), Laboratory Attendant (4), Manual Assistant (4), and Multi-Tasking Staff (MTS: ~100+).
  - `https://apssb.nic.in/upload/files/RECINS001/CSL_Exam_Result_dtd_24022026_20260224_203138.pdf` — Final Result Notice No. APSSB-13/10/2025 dated 24-02-2026 (18-page signed notification recommending candidates across departments based on PET/PST held 18.11.2025–24.11.2025 and Medical test Jan-Feb 2026).
  - `https://apssb.nic.in/upload/files/RECINS001/Corrigendum_Result_Notice_CSLE_2025_20260303_104607.pdf` — Corrigendum Result Notice dated 03-03-2026.
  - `https://apssb.nic.in/upload/files/RECINS001/press_release_csle_2025_20251024_131155.pdf` — Press Release dated 24-10-2025 regarding conduct of written exam on 26-10-2025.
- **Pay Architecture**:
  - Central 7th CPC Level 4 (₹25,500 – ₹81,100) for LDC/Forester (target role), and Level 3 (₹21,700 – ₹69,100) for Constable/Fireman.
  - Entry Basic Pay: ₹25,500 (Level 4).
  - Mandatory DA (58% as of 01.07.2025): ₹14,790.
  - HRA (9% Class-Z): ₹2,295.
  - Special Duty Allowance (SDA 10%): ₹2,550.
  - Transport Allowance (TA): ₹1,350 + 58% DA = ₹2,133.
  - Gross Range Estimate: ₹44,000 – ₹49,000.
  - In-Hand Range Estimate: ₹39,000 – ₹44,000.
- **Exam Scheme**:
  - Stage 1: Objective OMR Written Examination (200 Marks, 100 questions, 2 Hours).
    - General Awareness (25 MCQs, 50 Marks)
    - General Intelligence & Reasoning Ability (25 MCQs, 50 Marks)
    - Arithmetical & Numerical Ability (25 MCQs, 50 Marks)
    - Test of English Language and Comprehension (25 MCQs, 50 Marks)
    - **Marking Rule**: No negative marking. Minimum qualifying marks: 33% in each subject and aggregate.
  - Stage 2: Physical Standard Test (PST) & Physical Efficiency Test (PET) for uniform posts (shortlisted in 1:8 ratio based on Stage-1 written marks); Typing Test (35 wpm in English on computer) for LDC/DEO posts. Qualifying only.
  - Stage 3: Medical Fitness Test & Document Verification.
  - **Final Selection**: Strictly based on marks obtained in Stage 1 Written Examination only.
- **Competition Benchmarks**:
  - 2025: 450+ vacancies; written exam conducted 26-10-2025; final recommendation order published 24-02-2026.
  - 2023: 124 vacancies.

---

### 3.3. `chandigarh-police-constable` — Chandigarh Police Constable (Executive & IT Cadre)

- **File**: `public/exam-details/chandigarh-police-constable.json`
- **Conducting Body**: Chandigarh Police Department, Union Territory of Chandigarh
- **Official Portal**: `https://portal.chandigarhpolice.gov.in`
- **Primary Sources Opened & Analyzed**:
  - `https://portal.chandigarhpolice.gov.in/public/attachments/uploads/files/2026-04-13/Standing_order_46_2023_f810d.pdf` — Standing Order No. 46/2023 for Recruitment of Male and Female Constables (Executive) in Chandigarh Police.
  - `https://portal.chandigarhpolice.gov.in/public/attachments/uploads/files/2026-04-13/Recruitment_notice_2023_e542c.pdf` — Recruitment Notice for 700 vacancies of Constable (Executive) dated 20-05-2023.
  - `https://portal.chandigarhpolice.gov.in/public/attachments/uploads/files/2026-04-13/standing_order_IT_57_2024_44c24.pdf` — Standing Order No. 57/2024 for Recruitment of Constables (Executive)(IT) under domain specialization "IT Support".
  - `https://portal.chandigarhpolice.gov.in/public/attachments/uploads/files/2026-04-13/Recruitment_Notice_Const_IT_2024_a898c.pdf` — Recruitment Notice for 144 posts of Constable (Executive)(IT) dated 23-01-2024.
  - `https://portal.chandigarhpolice.gov.in/public/attachments/uploads/files/2026-04-13/TierIISyllabus_IT_2024_1c9b8.pdf` — Detailed Syllabus for Tier II Domain Specialization "IT Support".
  - `https://portal.chandigarhpolice.gov.in/public/attachments/uploads/files/2026-04-13/Cutoff_IT_2024_83ab1.pdf` — Category-wise Cut-off list of candidates for 144 posts of Constable (IT) 2024 (verified via Apple Vision OCR).
  - `https://portal.chandigarhpolice.gov.in/public/attachments/uploads/files/2026-04-13/cat_wise_merit_list_web_1d049.pdf` — Category-wise Final Merit List for 700 posts of Constable (Executive) 2023 dated 18-10-2023.
  - `https://portal.chandigarhpolice.gov.in/public/attachments/uploads/files/2026-04-13/SET_A_latest_ef690.pdf` — Question Paper & Revised Answer Key for 2023 Written Exam.
  - `https://portal.chandigarhpolice.gov.in/public/attachments/uploads/files/2026-04-13/QBooklet_I_answer_IT_2024_cd644.pdf` & `QBooklet_II_answer_IT_2024_16eb8.pdf` — Question Booklets and Answer Keys for 2024 IT Constable Written Exam.
- **Pay Architecture**:
  - Central 7th CPC Level 3 (₹21,700 – ₹69,100), Entry Basic Pay: ₹21,700.
  - Mandatory DA (58% as of 01.07.2025): ₹12,586.
  - HRA (18% for Chandigarh Y-class city): ₹3,906.
  - Transport Allowance (TA): ₹1,350 + 58% DA = ₹2,133.
  - Ration Money & Police Duty Allowance: Admissible as per UT police norms (~₹3,000–₹4,000/mo).
  - Gross Range Estimate: ₹41,000 – ₹46,000.
  - In-Hand Range Estimate: ₹36,000 – ₹41,000.
- **Exam Scheme**:
  - Stage 1: OMR Written Examination:
    - Tier-I: General Written Test (GK/Current Affairs, Reasoning, Numerical Ability) — 100 MCQs, 100 Marks, 2 Hours. Negative marking 0.25. Minimum qualifying marks: 40% General, 35% SC/OBC, 30% ESM.
    - Tier-II: Domain Specialization Test (for IT Cadre) — 50 MCQs, 50 Marks, 1 Hour. Negative marking 0.25.
  - Stage 2: Physical Efficiency & Measurement Test (PE&MT):
    - Physical Endurance Test (Race: 1600m in 6m 15s male / 800m in 4m 15s female; Long Jump: 3.95m male / 2.74m female; High Jump: 1.14m male / 0.90m female; qualifying in 3 attempts).
    - Physical Measurement Test (Height: 170cm male / 157.5cm female; Chest: 84-88cm male; 2 Bonus marks for male >= 183cm, female >= 165cm; NCC Bonus marks: 5% C, 3% B, 2% A). Dope test mandatory.
  - Stage 3: Document Verification & Medical Examination (Driving license mandatory for male candidates; entry-level ICT computer skills course).
- **Competition Benchmarks & Official Cut-Offs**:
  - **2024 (Constable IT - 144 posts)**:
    - Final Merit Marks of Last Candidate:
      - Male: UR 38.75, SC 23.50, OBC 34.50, EWS 33.25, ESM 26.00
      - Female: UR 36.75, SC 27.75, OBC 30.00, EWS 29.50
    - PEMT Shortlisting Marks:
      - Male: UR 20.00, SC 17.25, OBC 25.50, EWS 22.00
      - Female: UR 22.50, SC 13.00, OBC 15.25, EWS 24.50
  - **2023 (Constable Executive - 700 posts)**:
    - Final Merit Cut-Off Marks (out of 100 + bonus):
      - Male: UR 75.77, EWS 73.72, OBC 73.47, SC 64.54
      - Female: UR 72.66, EWS 70.66, OBC 68.11, SC 56.89
      - ESM: UR 59.69, OBC 50.51, SC 36.22

---

## 4. Verification and Validation Results

All three dossiers were subjected to `scripts/data-sourcing/validate-details.mjs`:
```
Validating 1 dossier file(s)...
  ✓ apssb-cgl.json [PASS]

Summary: 1 checked, 0 error(s), 0 warning(s)

Validating 1 dossier file(s)...
  ✓ apssb-csl.json [PASS]

Summary: 1 checked, 0 error(s), 0 warning(s)

Validating 1 dossier file(s)...
  ✓ chandigarh-police-constable.json [PASS]

Summary: 1 checked, 0 error(s), 0 warning(s)
```

The progress database (`data-sourcing/progress.json`) was updated with session `2026-09-13-u089` and verified totals recalculated:
- **Verified Exams**: 260
- **Detail Files Present**: 333
- **Not Started**: 244
- **Total Exams**: 504

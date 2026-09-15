# Research Log: Unit 102 (u102) — Other State-Jurisdiction Recruiters — Meghalaya

- **Unit ID**: `u102`
- **Batch ID**: `batch-7-state-other--meghalaya`
- **Label**: `Other state-jurisdiction recruiters not matched above (universities, boards, CET cells, PSUs, high courts — proposed addition, flag for confirmation) — Meghalaya`
- **Timestamp**: 2026-09-13T21:10:00+05:30
- **Status**: Completed (1/1 exam researched, audited, verified, and validated)
- **Reviewer**: Antigravity Autonomous Agent

---

## 1. Summary of Unit Execution

Unit 102 (`u102`) covers the premier statutory state-level teacher certification authority in the State of Meghalaya:
1. `meghalaya-tet`: Meghalaya Teacher Eligibility Test (MTET) — **Tier C (Entrance)**

A comprehensive primary research and statutory verification pass was conducted across the official education department portal of the Government of Meghalaya (`https://megeducation.gov.in`), the Directorate of Educational Research and Training (DERT), Meghalaya notices and circulars, official syllabus guidebooks, answer keys, and notification gazettes.

### Statutory Authority & Legal Framework:
- **Administering Body**:
  - The examination is administered and conducted by the **Directorate of Educational Research and Training (DERT), Meghalaya**, functioning under the Department of Education, Government of Meghalaya, with headquarters at Arbuthnot Road, Nongrimmaw, Shillong.
- **RTE Act & NCTE Compliance**:
  - MTET is established in strict adherence to Section 23(1) of the **Right of Children to Free and Compulsory Education (RTE) Act, 2009**, and guidelines framed by the **National Council for Teacher Education (NCTE)**.
  - Qualifying MTET is a mandatory statutory prerequisite for appointment as an Assistant Teacher in government, deficit, and aided elementary schools across Meghalaya.
- **Lifetime Certificate Validity**:
  - In accordance with NCTE guidelines (notified vide Letter No. NCTE-Reg012/22/2019-US(Regulation)-HQ dated 09/06/2021 and State Government adoption), MTET eligibility certificates carry **lifetime validity**. Candidates who have already qualified are also permitted to appear again for score improvement without restriction on attempts.
- **Entrance Exam Exemption (§5.4)**:
  - MTET is classified as `exam_type: "entrance"`. Per schema §5.4 and project conventions, `career_ladder` and `financial_package` sections are **omitted entirely** (not empty objects) as teacher salary scales and career progression apply only upon actual recruitment / appointment by the Directorate of School Education & Literacy (DSEL).

---

## 2. Examination Scheme & Evaluation Architecture

MTET consists of two independent objective test papers:

### Paper-I: Lower Primary Stage (Classes I to V)
- **Target Cadre**: Lower Primary School Assistant Teachers.
- **Total Marks**: 150 Marks (150 Multiple Choice Questions, 1 mark each).
- **Duration**: 150 minutes (2 hours 30 minutes).
- **Marking Standard**: No negative marking; 1 mark per correct answer.
- **Sectional Structure**:
  1. **Part-I**: Child Development and Pedagogy — 30 MCQs / 30 Marks (focusing on educational psychology, primary child development, inclusive education).
  2. **Part-II**: Language II (English — Compulsory) — 30 MCQs / 30 Marks (comprehension, grammar, pedagogy of language development).
  3. **Part-III**: Mathematics — 30 MCQs / 30 Marks (numbers, shapes, spatial understanding, pedagogical issues in primary mathematics).
  4. **Part-IV**: Environmental Studies (EVS) — 30 MCQs / 30 Marks (family, plants, animals, natural resources, basic science concepts, EVS pedagogical issues).
  5. **Part-V**: Language I (Optional) — 30 MCQs / 30 Marks. Candidates select one from eight approved regional/scheduled language media:
     - **Khasi**
     - **Garo**
     - **Assamese**
     - **Bengali**
     - **Hindi**
     - **Nepali**
     - **Urdu**
     - **Mizo**

### Paper-II: Upper Primary Stage (Classes VI to VIII)
- **Target Cadre**: Upper Primary School Assistant Teachers (Mathematics & Science OR Social Studies).
- **Total Marks**: 150 Marks (150 Multiple Choice Questions, 1 mark each).
- **Duration**: 150 minutes (2 hours 30 minutes).
- **Marking Standard**: No negative marking; 1 mark per correct answer.
- **Sectional Structure**:
  1. **Part-I**: Child Development and Pedagogy — 30 MCQs / 30 Marks (focusing on adolescent development, learning dynamics, pedagogy).
  2. **Part-II**: Language II (English — Compulsory) — 30 MCQs / 30 Marks (advanced language proficiency, reading comprehension, pedagogical approaches).
  3. **Part-III & IV**: Subject Specialization — 60 MCQs / 60 Marks:
     - For Mathematics & Science Teachers: Mathematics & Science (30 marks Mathematics + 30 marks Science, including pedagogical concepts).
     - For Social Studies / Social Science Teachers: Social Studies / Social Science (History, Geography, Social and Political Life, pedagogical issues).
  4. **Part-V**: Language I (Optional) — 30 MCQs / 30 Marks (from Khasi, Garo, Assamese, Bengali, Hindi, Nepali, Urdu, or Mizo).

### Minimum Qualifying Benchmarks:
- **General / Unreserved Category**: Minimum **60% aggregate** (90 out of 150 marks).
- **Reserved Categories (SC / ST / OBC / Differently Abled)**: Minimum **55% aggregate** (82 out of 150 marks), granting a statutory 5% concession in accordance with NCTE norms.

---

## 3. Examination Overview Table

| Exam ID | Title | State / UT | Tier | Type | Conducting Body | Structure & Scheme | Validation |
| :--- | :--- | :---: | :---: | :---: | :--- | :--- | :---: |
| `meghalaya-tet` | Meghalaya Teacher Eligibility Test (MTET) | Meghalaya | C | entrance | Directorate of Educational Research & Training (DERT), Meghalaya | Paper-I (150m, LP) & Paper-II (150m, UP); 8 Language I options; 60% Gen / 55% Reserved | **PASS** |

---

## 4. Detailed Exam Research & Evidence Audit

### 4.1 Meghalaya Teacher Eligibility Test (`meghalaya-tet`)
- **File**: `public/exam-details/meghalaya-tet.json`
- **Conducting Authority**: Directorate of Educational Research and Training (DERT), Department of Education, Government of Meghalaya (`https://megeducation.gov.in`)
- **Candidate Appearance & Performance Datasets**:
  - **2026 Cycle Benchmark Statistics** (notified vide Memo No. DERT/MTET/18/2026/22):
    - Total Examination Centres: 24 centres spread across all 12 districts of Meghalaya (Shillong, Sohra, Nongstoin, Mairang, Mawkyrwat, Nongpoh, Jowai, Khliehriat, Tura, Williamnagar, Baghmara, Resubelpara, Ampati, etc.).
    - Total Candidate Appearances: **43,883** candidates across both papers.
    - Total Candidates Qualified: **37,218** candidates.
    - Aggregate Pass Rate: **84.81%** (selectivity ratio approx. 1 in 1.18).
    - **Paper-I (Lower Primary)**: 21,999 appeared, 18,546 qualified (84.30% pass rate).
    - **Paper-II (Upper Primary)**: 21,884 appeared, 18,672 qualified (85.32% pass rate).
    - In accordance with NCTE guidelines, MTET is an eligibility benchmark examination rather than a vacancy-filling competitive test; hence vacancies are recorded as `null`.

### 4.2 Live URL & Evidentiary Verification Audit
All 9 primary documentation and syllabus URLs were tested live using `curl -sIL` and returned verified HTTP 200 OK responses:

1. `https://megeducation.gov.in/edu_dept/notices_and_circulars/2026/MTET%20Guidebook_%20Paper%20_%20I.pdf` — **HTTP 200 OK** (DERT Official Guidebook Paper-I)
2. `https://megeducation.gov.in/edu_dept/notices_and_circulars/2026/MTET_Guidebook_%20Paper%20_%20II.pdf` — **HTTP 200 OK** (DERT Official Guidebook Paper-II)
3. `https://megeducation.gov.in/dert/notices_and_circulars/2026/MTET%202026%20Results%20for%20Paper%20I.pdf` — **HTTP 200 OK** (MTET Paper-I Qualified Candidates Notification)
4. `https://megeducation.gov.in/dert/notices_and_circulars/2026/Declaration%20of%20MTET%202026%20Results.pdf` — **HTTP 200 OK** (MTET Official Declaration Notification Memo)
5. `https://megeducation.gov.in/dert/notices_and_circulars/2026/MTET%202026%20Results%20for%20Paper%20II.pdf` — **HTTP 200 OK** (MTET Paper-II Qualified Candidates Notification)
6. `https://megeducation.gov.in/dert/notices_and_circulars/2026/MTET%202026-Answer%20Key_Paper%20I_Series-A.pdf` — **HTTP 200 OK** (Official Answer Key Paper-I Series A)
7. `https://megeducation.gov.in/dert/notices_and_circulars/2026/MTET%202026-ANSWER%20KEY_Paper-II_Series-A.pdf` — **HTTP 200 OK** (Official Answer Key Paper-II Series A)
8. `https://megeducation.gov.in/dert/pages/dert_notice_board.html` — **HTTP 200 OK** (DERT Meghalaya Notice Board Portal)
9. `https://megeducation.gov.in` — **HTTP 200 OK** (Department of Education, Govt of Meghalaya Portal)

---

## 5. Verification & Validation Results

The dossier passed schema validation with zero errors and zero warnings:
```bash
node scripts/data-sourcing/validate-details.mjs public/exam-details/meghalaya-tet.json
```

**Validation Output**:
```
Validating 1 dossier file(s)...
  ✓ meghalaya-tet.json [PASS]

Summary: 1 checked, 0 error(s), 0 warning(s)
```

**Production Build**:
```bash
npm run build
```
```
vite v8.2.2 building client environment for production...
✓ 617 modules transformed.
dist/index.html                     1.23 kB │ gzip:   0.68 kB
dist/assets/index-DVhSvFQl.css     42.17 kB │ gzip:   8.62 kB
dist/assets/index-XdXSJ156.js   1,190.50 kB │ gzip: 284.93 kB
✓ built in 183ms
```
Built cleanly in 183ms with 0 errors.

---

## 6. Reviewer Sign-Off

- Dossier `public/exam-details/meghalaya-tet.json` audited, verified, and confirmed.
- Primary source links audited live with `curl -sIL` confirming HTTP 200 OK across all endpoints.
- Compliance with entrance exam schema §5.4 confirmed (`career_ladder` and `financial_package` omitted per NCTE qualifying framework).
- Session `2026-09-13-u102` recorded in `data-sourcing/progress.json`.

Unit u102 is complete with 0 errors and 0 warnings.

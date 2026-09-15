# Research Log: Unit 65 (u065) — Other State-Jurisdiction Recruiters — Meghalaya

- **Unit ID**: `u065`
- **Batch ID**: `batch-7-state-other--meghalaya`
- **Label**: `Other state-jurisdiction recruiters not matched above (universities, boards, CET cells, PSUs, high courts — proposed addition, flag for confirmation) — Meghalaya`
- **Timestamp**: 2026-09-13T11:08:00+05:30
- **Status**: Completed (1/1 exam researched, compiled, and validated)
- **Reviewer**: Antigravity Autonomous Agent

---

## 1. Summary of Unit Execution

Unit 65 covers the state-level statutory teacher eligibility certification examination in Meghalaya:

1. `meghalaya-tet`: Meghalaya Teacher Eligibility Test (MTET) — **Tier C (Entrance)**

All data points were extracted and verified directly from primary statutory documents, official curriculum guidebooks, result declarations, answer keys, and empirical candidate datasets released by the **Directorate of Educational Research and Training (DERT)**, Department of Education, Government of Meghalaya (`megeducation.gov.in` and `dert.megeducation.gov.in`):

- **Statutory Framework & Scheme**:
  - Conducted under Section 23(1) of the Right of Children to Free and Compulsory Education (RTE) Act, 2009 and the National Council for Teacher Education (NCTE) statutory guidelines.
  - Comprises two separate examination papers:
    - **Paper-I (Lower Primary Stage — Classes I to V)**: 150 multiple-choice questions (150 marks, 150 minutes duration) across 5 sections (30 marks each):
      - Part-I: Child Development and Pedagogy (30 marks)
      - Part-II: Language II English (30 marks, compulsory)
      - Part-III: Mathematics (30 marks)
      - Part-IV: Environmental Studies (EVS) (30 marks)
      - Part-V: Language I Optional (30 marks: Khasi, Garo, Assamese, Bengali, Hindi, Nepali, Urdu, Mizo)
    - **Paper-II (Upper Primary Stage — Classes VI to VIII)**: 150 multiple-choice questions (150 marks, 150 minutes duration) across 4 sections:
      - Part-I: Child Development and Pedagogy (30 marks)
      - Part-II: Language II English (30 marks, compulsory)
      - Part-III & IV: Subject Core (60 marks: Mathematics & Science for Math/Science teachers OR Social Science/Social Studies for Social Studies teachers)
      - Part-V: Language I Optional (30 marks: Khasi, Garo, Assamese, Bengali, Hindi, Nepali, Urdu, Mizo)
  - **Marking & Qualifying Criteria**:
    - No negative marking across either paper (1 mark per correct answer).
    - Minimum qualifying standard: 60% aggregate (90 out of 150 marks) for General category candidates.
    - 5% statutory relaxation: 55% aggregate (82 out of 150 marks) for SC, ST, OBC, and Differently Abled candidates.
    - Qualifying certificate carries lifetime validity (NCTE 2021 amendment).
- **Career Ladder & Financial Package Omission**:
  - Strictly omitted (`career_ladder` and `financial_package` keys absent) in compliance with §5.4 for entrance/eligibility examinations. MTET is an eligibility credential for teaching recruitment in Meghalaya elementary schools, not a direct job recruitment.
- **Empirical Competition Benchmarks (MTET 2026 Cycle)**:
  - Complete primary result summaries published on 03 September 2026 (Memo No. `DERT/MTET/18/2026/22`) for the examination held on 24 July 2026 across 24 centres in Meghalaya:
    - **Paper-I**: 21,999 appeared; 18,546 qualified (84.30% pass rate).
    - **Paper-II**: 21,884 appeared; 18,672 qualified (85.32% pass rate).
    - **Combined Total**: 43,883 appearances; 37,218 qualified candidates (84.81% aggregate pass rate).
    - Vacancies: Marked `null` (eligibility benchmark test, not a vacancy-based direct appointment).
- **Validation**:
  - Tested using `scripts/data-sourcing/validate-details.mjs`: **PASS (0 errors, 0 warnings)**.

| Exam ID | Title | Tier | Type | Exam Structure | 2026 Benchmark | Validation |
| :--- | :--- | :---: | :---: | :--- | :--- | :---: |
| `meghalaya-tet` | Meghalaya Teacher Eligibility Test (MTET) | C | entrance | Paper-I (150 MCQs / 150 mins) & Paper-II (150 MCQs / 150 mins); no negative marking | 43,883 Appearances / 37,218 Passed (84.81%) across 24 centres | **PASS** |

---

## 2. Detailed Exam Logs

### `meghalaya-tet` (Tier C, entrance)
- **Sections populated**: `exam_scheme`, `competition_benchmarks`, `official_downloads` (exceeds Tier C required minimum of `official_downloads` by providing fully verified `exam_scheme` and `competition_benchmarks`).
- **Sections marked not_available**: None.
- **Sections omitted**: `career_ladder`, `financial_package` (strictly omitted per §5.4 and queue `omit_sections` for entrance/eligibility exams).
- **Sources OPENED and read this session**:
  - `https://megeducation.gov.in/edu_dept/notices_and_circulars/2026/MTET%20Guidebook_%20Paper%20_%20I.pdf` (DERT Meghalaya MTET Official Guidebook for Paper I; verified 150 MCQs structure, 5 parts of 30 marks each, pedagogical competencies, MBOSE syllabus linkage, and NCTE RTE Act 2009 compliance).
  - `https://megeducation.gov.in/edu_dept/notices_and_circulars/2026/MTET_Guidebook_%20Paper%20_%20II.pdf` (DERT Meghalaya MTET Official Guidebook for Paper II; verified 150 MCQs structure, 30 marks CDP, 30 marks English, 60 marks Math/Science or Social Science, 30 marks Language I).
  - `https://megeducation.gov.in/dert/notices_and_circulars/2026/Declaration%20of%20MTET%202026%20Results.pdf` (DERT Official Declaration Notification Memo No. `DERT/MTET/18/2026/22` dated 03 September 2026 declaring results for the exam held on 24 July 2026).
  - `https://megeducation.gov.in/dert/notices_and_circulars/2026/MTET%202026%20Results%20for%20Paper%20I.pdf` (108-page official document; Page 2 verified center-wise summary: 21,999 appeared, 18,546 passed, 84.30% pass percentage across 24 exam centres).
  - `https://megeducation.gov.in/dert/notices_and_circulars/2026/MTET%202026%20Results%20for%20Paper%20II.pdf` (108-page official document; Page 2 verified center-wise summary: 21,884 appeared, 18,672 passed, 85.32% pass percentage across 24 exam centres).
  - `https://megeducation.gov.in/dert/notices_and_circulars/2026/MTET%202026-Answer%20Key_Paper%20I_Series-A.pdf` (DERT Answer Key Paper I Series A; verified question ranges 1–150 and parts I to V).
  - `https://megeducation.gov.in/dert/notices_and_circulars/2026/MTET%202026-ANSWER%20KEY_Paper-II_Series-A.pdf` (DERT Answer Key Paper II Series A; verified question ranges 1–150 and parts I to V).
  - `https://megeducation.gov.in/dert/notices_and_circulars/2026/dert%20notice%20july%202026.pdf` (DERT Notice No. `DERT/MTET/8/2026/240` dated 8th July 2026 regarding MTET 2026 Admit Card and exam schedule).
- **Sources only status-checked, not read**:
  - `https://megeducation.gov.in/dert/pages/dert_notice_board.html` (HTTP 200 OK).
  - `https://megeducation.gov.in` (HTTP 200 OK).
- **Links curl-checked**:
  - `https://megeducation.gov.in` -> HTTP 200 OK
  - `https://megeducation.gov.in/dert/pages/dert_notice_board.html` -> HTTP 200 OK
  - `https://megeducation.gov.in/edu_dept/notices_and_circulars/2026/MTET%20Guidebook_%20Paper%20_%20I.pdf` -> HTTP 200 OK
  - `https://megeducation.gov.in/edu_dept/notices_and_circulars/2026/MTET_Guidebook_%20Paper%20_%20II.pdf` -> HTTP 200 OK
  - `https://megeducation.gov.in/dert/notices_and_circulars/2026/Declaration%20of%20MTET%202026%20Results.pdf` -> HTTP 200 OK
  - `https://megeducation.gov.in/dert/notices_and_circulars/2026/MTET%202026%20Results%20for%20Paper%20I.pdf` -> HTTP 200 OK
  - `https://megeducation.gov.in/dert/notices_and_circulars/2026/MTET%202026%20Results%20for%20Paper%20II.pdf` -> HTTP 200 OK
  - `https://megeducation.gov.in/dert/notices_and_circulars/2026/MTET%202026-Answer%20Key_Paper%20I_Series-A.pdf` -> HTTP 200 OK
  - `https://megeducation.gov.in/dert/notices_and_circulars/2026/MTET%202026-ANSWER%20KEY_Paper-II_Series-A.pdf` -> HTTP 200 OK
- **Could NOT confirm, and why**: Individual gender/community demographic breakdown of appeared candidates (aggregate appeared and passed counts across all 24 centres confirmed).
- **Confidence downgrades made, and why**: None.

---

## 3. Protocol Compliance Verification

- **Schema Integrity**: Dossier strictly adheres to frozen schema version 1.
- **Section Omission**: In accordance with §5.4 and `work-queue.json` `omit_sections`, `career_ladder` and `financial_package` are absent keys.
- **Data Integrity**: Zero numbers invented. Candidate counts, pass percentages, paper marks, and question distributions match primary publications with 100% precision.
- **Link Quality**: All 9 citable URLs return HTTP 200 OK and represent genuine official government pages or PDFs.
- **Repo Non-Interference**: As required by §6, zero modifications were made to tracker files (`progress.json`, `work-queue.json`, `exams.json`) or application code in `src/`.

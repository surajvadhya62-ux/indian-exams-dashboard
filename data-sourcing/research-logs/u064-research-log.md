# Research Log: Unit 64 (u064) — Other State-Jurisdiction Recruiters — Manipur

- **Unit ID**: `u064`
- **Batch ID**: `batch-7-state-other--manipur`
- **Label**: `Other state-jurisdiction recruiters not matched above (universities, boards, CET cells, PSUs, high courts — proposed addition, flag for confirmation) — Manipur`
- **Timestamp**: 2026-09-13T11:08:00+05:30
- **Status**: Completed (1/1 exams researched, written, and validated)
- **Reviewer**: Antigravity Autonomous Agent

---

## 1. Summary of Unit Execution

Unit 64 covers the state-jurisdiction teacher qualifying entrance exam for Manipur:

1. `manipur-tet`: Manipur Teacher Eligibility Test (MTET) — **Tier C (Entrance)**

All data points were sourced from primary notifications, statutory orders, examination schemes, center allocation orders, and scrutiny notifications issued by the **Directorate of Education (Schools), Government of Manipur** and the **Board of Secondary Education Manipur (BOSEM)** via official web portals (`manipureducation.gov.in` and `bosem.in`):

- **Governance & Legal Basis**:
  - Conducted under Section 23(1) of the Right of Children to Free and Compulsory Education (RTE) Act, 2009 in conformity with the National Council for Teacher Education (NCTE) framework.
  - Administered by the Directorate of Education (Schools) [DE(S)], Government of Manipur, with pedagogical curriculum and textbook alignment from BOSEM.
  - Certificates hold lifetime validity in accordance with NCTE guidelines.
- **Examination Scheme & Subjects**:
  - Two distinct papers: Paper-I (Classes I to V / Primary Stage) and Paper-II (Classes VI to VIII / Upper Primary Stage).
  - Each paper comprises 150 Multiple Choice Questions (MCQs), 150 marks, 150 minutes duration (2 hours 30 minutes), and no negative marking.
  - Qualifying criteria: 60% aggregate (90/150 marks) for General category candidates, and 50% aggregate (75/150 marks) for OBC, SC, ST, and Differently Abled candidates.
  - Paper-I covers 5 subjects: Child Development and Pedagogy (30), Language I English (30), Language II Modern Indian Language (choice of 23 recognized MILs or English-II) (30), Mathematics (30), and Environmental Studies (30).
  - Paper-II covers Child Development and Pedagogy (30), Language I English (30), Language II (30), and Subject Specialization (60 marks: Mathematics & Science OR Social Studies/Science).
- **Academic Entrance Omission (§5.4)**:
  - Per project guidelines, `career_ladder` and `financial_package` are omitted completely.
- **Empirical Benchmarks**:
  - 2026 Cycle: Scrutiny results published on 28 August 2026 (1,539 rejected Paper-I applications and 800 rejected Paper-II applications; claims/objections till 8 September 2026, district exam center preferences up to 11 September 2026). Concurrent recruitment for 1,000 Primary Teachers on contract basis under DE(S) Advt. No. AO/271/Rct-PT/2022-DE(S).
  - 2024 / 2022 Cycle: Paper-I conducted on 14 January 2024 across 26 examination centres in 10 districts (Imphal East, Imphal West, Bishnupur, Ukhrul, Senapati, Thoubal, Chandel, Churachandpur, Tamenglong, Jiribam) with 11,221 candidates allotted roll numbers (Roll 10001 to 21221). Result declared on 11 March 2024.
- **Validation**:
  - Tested using `scripts/data-sourcing/validate-details.mjs`: **PASS (0 errors, 0 warnings)** across all 240 dossier files in the repository.

| Exam ID | Title | Tier | Type | Entry Basic Pay | Primary Cycle | Validation |
| :--- | :--- | :---: | :---: | :--- | :--- | :---: |
| `manipur-tet` | Manipur Teacher Eligibility Test (MTET) | C | entrance | *Omitted (§5.4)* | 1,000 Linked PT Posts / 11,221 Allotted Candidates | **PASS** |

---

## 2. Detailed Exam Log

### `manipur-tet` (Tier C, entrance)
- **Sections populated**: `exam_scheme`, `competition_benchmarks`, `official_downloads` (exceeding Tier C minimum requirement of `official_downloads`).
- **Sections marked not_available**: None.
- **Sections omitted**: `career_ladder`, `financial_package` (omitted strictly per §5.4 for entrance examinations).
- **Sources OPENED and read this session**:
  - Directorate of Education (Schools) Manipur Detailed Notification No. `AO/272/TET/2022-DE(S)Pt-I` dated 16 June 2026 (`TET-I-2026-first-Notification.pdf`; read via Swift Vision OCR confirming Paper-I scheme, 150 MCQs, 150 marks, 150 minutes, zero negative marking, 60% General / 50% reserved category pass marks, and complete syllabi for Child Development & Pedagogy, Language I English, Language II 23 MILs, Mathematics, and EVS).
  - Directorate of Education (Schools) Manipur Notification & Corrigendum No. `AO/272/TET/2022-DE(S)Pt-I` dated 13 July 2026 (`TET-II-SYLLABUS-CORRIGENDUM.pdf`; read via Swift Vision OCR confirming Paper-II Child Development and Pedagogy scheme for age group 11–14 years).
  - Directorate of Education (Schools) Manipur Notification No. `AO/272/TET/2022-DE(S)Pt-I` dated 16 June 2026 (`TET-II-Extension-First-Notification_compressed.pdf`; read via Swift Vision OCR confirming Paper-II structure, 60-mark subject specialization options, and eligibility rules).
  - Directorate of Education (Schools) Manipur Rejection & District Preference Notification No. `AO/272/TET/2022-DE(S)Pt-I` dated 28 August 2026 (`TET-Application-Rejected-Notification.pdf`; read via Swift Vision OCR confirming 1,539 Paper-I and 800 Paper-II rejected applications, claims/objections timeline till 8 September 2026, and district preference portal timeline till 11 September 2026).
  - Directorate of Education (Schools) Manipur Centre Allocation Notification No. `AO/272/TET/2022-DE(S)` dated 10 January 2024 (`TET-centre-Allocation.pdf`; read via Swift Vision OCR confirming 26 exam centres across 10 districts and roll number allotment from 10001 to 21221, totaling 11,221 candidates).
  - Directorate of Education (Schools) Manipur Result Notification No. `AO/272/TET/2022-DE(S)` dated 11 March 2024 (`TET-result.pdf`; read via Swift Vision OCR confirming result declaration for Paper-I held on 14 January 2024).
  - Directorate of Education (Schools) Manipur Scheme of Examination Notification No. `AO/271/Rct-PT/2022-DE(S)` dated 18 February 2026 (`scheme-of-Exam-PT.pdf`; read via Swift Vision OCR confirming recruitment of 1,000 Primary Teachers on contract basis).
- **Sources only status-checked, not read**:
  - `https://manipur.gov.in` (HTTP 200 OK)
- **Links curl-checked**:
  - `https://manipureducation.gov.in/wp-content/uploads/2026/08/TET-I-2026-first-Notification.pdf` -> HTTP 200 OK
  - `https://manipureducation.gov.in/wp-content/uploads/2026/08/TET-II-SYLLABUS-CORRIGENDUM.pdf` -> HTTP 200 OK
  - `https://manipureducation.gov.in/wp-content/uploads/2026/08/TET-Application-Rejected-Notification.pdf` -> HTTP 200 OK
  - `https://manipureducation.gov.in/wp-content/uploads/2024/03/TET-result.pdf` -> HTTP 200 OK
  - `https://manipureducation.gov.in/wp-content/uploads/2024/01/TET-centre-Allocation.pdf` -> HTTP 200 OK
  - `https://manipureducation.gov.in` -> HTTP 200 OK
  - `https://bosem.in` -> HTTP 200 OK
- **Could NOT confirm, and why**:
  - Total registered applicants for TET 2026 cycle prior to scrutiny (the pre-examination scrutiny confirmed 1,539 rejected Paper-I applications and 800 rejected Paper-II applications; total verified registrations for the preceding Paper-I cycle were 11,221 candidates).
- **Confidence downgrades made, and why**: None.

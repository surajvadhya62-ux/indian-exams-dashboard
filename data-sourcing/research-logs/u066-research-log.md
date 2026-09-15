# Research Log: Unit 66 (u066) — Other State-Jurisdiction Recruiters — Mizoram

- **Unit ID**: `u066`
- **Batch ID**: `batch-7-state-other--mizoram`
- **Label**: `Other state-jurisdiction recruiters not matched above (universities, boards, CET cells, PSUs, high courts — proposed addition, flag for confirmation) — Mizoram`
- **Timestamp**: 2026-09-13T22:12:00+05:30
- **Status**: Completed (1/1 exam researched, written, and validated)
- **Reviewer**: Antigravity Autonomous Agent

---

## 1. Summary of Unit Execution

Unit 66 covers Mizoram state-jurisdiction statutory teacher eligibility certification conducted by the **Mizoram Board of School Education (MBSE)**, Chaltlang, Aizawl:

1. `mizoram-tet`: Mizoram Teacher Eligibility Test (MTET) — **Tier C (Entrance)**

All populated data points were derived from primary notifications, information booklets, syllabi, official answer keys, machine-graded roll sheets, and result gazettes directly published on the official web portal of the conducting authority (`www.mbse.edu.in` and `www.mbseonline.com`):

- **Statutory Framework & Scheme**:
  - Established under Section 23(1) of the Right of Children to Free and Compulsory Education (RTE) Act, 2009 and National Council for Teacher Education (NCTE) notifications dated 23rd August 2010 and 29th July 2011.
  - Divided into two distinct levels:
    - **Paper I**: Primary Stage (Classes I to V) — 150 MCQs, 150 Marks, 150 minutes (2.5 hours) duration across Child Development & Pedagogy, Language I (English), Language II (Mizo / Alternative English), Mathematics, and Environmental Studies.
    - **Paper II**: Middle / Elementary Stage (Classes VI to VIII) — 150 MCQs, 150 Marks, 150 minutes (2.5 hours) duration across Child Development & Pedagogy, Language I (English), Language II (Mizo / Alternative English), and a 60-mark subject specialization (Mathematics & Science OR Social Studies / Social Science).
  - No negative marking; objective machine-graded OMR evaluation.
  - Qualifying criteria: 55% or more (≥82.5 / 83 marks out of 150) for award of the MTET Certificate.
  - Validity: Lifetime validity as per amended NCTE guidelines.
- **Section Compliance & Tier Rules**:
  - Being an academic qualifying/entrance certification examination, `career_ladder` and `financial_package` are strictly omitted in compliance with §5.4.
  - Exceeds the Tier C minimum required section (`official_downloads`) by populating comprehensive, fully verified `exam_scheme` and `competition_benchmarks` from primary board gazettes.
- **Validation**:
  - Tested using `scripts/data-sourcing/validate-details.mjs`: **PASS (0 errors, 0 warnings)** across the dossier and repository-wide.

| Exam ID | Title | Tier | Type | Entry Basic Pay | Primary Cycle Benchmark | Validation |
| :--- | :--- | :---: | :---: | :--- | :--- | :---: |
| `mizoram-tet` | Mizoram Teacher Eligibility Test (MTET) | C | entrance | *Omitted (§5.4)* | 2,639 Applications / 1,705 Qualified (60.25% overall pass rate) | **PASS** |

---

## 2. Detailed Exam Log

### `mizoram-tet` (Tier C, entrance)

- **Sections populated**: `exam_scheme`, `competition_benchmarks`, `official_downloads` (all verified from primary MBSE documents).
- **Sections marked not_available**: None.
- **Sections omitted (entrance only)**: `career_ladder`, `financial_package` (statutory teacher eligibility qualifying test; not a direct employer cadre).
- **Sources OPENED and read this session**:
  - MBSE MTET 2026 Information Booklet PDF (`https://www.mbse.edu.in/wp-content/uploads/2026/04/MTET-2026-Information-Booklet.pdf`; 30 pages analyzed via `pypdf`: verified Section 7 exam structure, 150 MCQs per paper, 150 min duration, Section 8 medium of test, Section 9 qualifying score 55%, Section 10 lifetime validity, Appendix-I detailed syllabus breakdown for Paper I and Paper II).
  - MBSE MTET 2026 Examination Notice PDF (`https://www.mbse.edu.in/wp-content/uploads/2026/04/MTET-2026-Notice.pdf`; application schedule 16th April to 15th May 2026, late fee ₹300 up to 23rd May 2026).
  - MBSE MTET August 2025 Official Result Notice & Gazette PDF (`https://www.mbse.edu.in/wp-content/uploads/2025/09/MTET-August-2025-Exam-Result.pdf` & Notice No. `K.12012/3/2025-MBSE(Acad)/64` dated 16.09.2025; 49 pages analyzed: verified 2,639 applications received, 237 rejected, 2,402 on roll, Paper I appeared 1,354 [810 qualified, 59.82%], Paper II appeared 1,476 [895 qualified: 706 Social Science + 189 Maths/Science, 60.64%], overall 1,705 qualified [60.25%]).
  - MBSE MTET July 2024 Official Result Notice & Gazette PDF (`https://www.mbse.edu.in/wp-content/uploads/2024/08/MTET-July-2024-Result.pdf` & Notice No. `K.12012/2/2021-MBSE(Acad)/219` dated 22.08.2024; 41 pages analyzed: verified 2,832 applications received, 595 rejected, 2,237 on roll, Paper I appeared 1,115 [255 qualified, 22.87%], Paper II appeared 1,416 [636 qualified: 449 Social Science + 187 Maths/Science, 44.92%], overall 891 qualified [35.20%]).
  - MBSE MTET July 2023 Official Result Notice & Gazette PDF (`https://www.mbse.edu.in/wp-content/uploads/2023/08/mtet-results-2023.pdf` & Notice No. `K.12012/2/2021-MBSE(Acad)/149` dated 17.08.2023; 39 pages analyzed: verified 2,094 applications received, 148 rejected, 1,946 on roll, Paper I appeared 1,187 [314 qualified, 26.45%], Paper II appeared 1,228 [538 qualified: 470 Social Science + 68 Maths/Science, 43.81%], overall 852 qualified).
  - MBSE MTET 2026 Final Roll Sheet PDF (`https://www.mbse.edu.in/wp-content/uploads/2026/08/MTET-2026-Rollsheet-Final.pdf`; 124 pages analyzed: confirmed admitted candidate roster across Aizawl, Lunglei, and regional centers pages 2–100 and rejected applicant list 1–713 on pages 101–124).
  - MBSE MTET 2026 Official Answer Key & Correction Notice (`https://www.mbse.edu.in/wp-content/uploads/2026/08/MTET-2026-Answer-Key.pdf` and `https://www.mbse.edu.in/wp-content/uploads/2026/09/MTET-2026-Paper-1-Answer-Key-Correction.pdf`).
  - MBSE MTET 2023 & 2022 Official Previous Year Question Papers (Paper I and Paper II).
- **Sources only status-checked, not read**:
  - `https://www.mbse.edu.in` (HTTP 200 OK)
  - `https://www.mbseonline.com` (HTTP 200 OK)
- **Links curl-checked**:
  - `https://www.mbse.edu.in` → HTTP 200 OK
  - `https://www.mbseonline.com` → HTTP 200 OK
  - `https://www.mbse.edu.in/wp-content/uploads/2026/04/MTET-2026-Information-Booklet.pdf` → HTTP 200 OK
  - `https://www.mbse.edu.in/wp-content/uploads/2026/04/MTET-2026-Notice.pdf` → HTTP 200 OK
  - `https://www.mbse.edu.in/wp-content/uploads/2026/08/MTET-2026-Answer-Key.pdf` → HTTP 200 OK
  - `https://www.mbse.edu.in/wp-content/uploads/2026/09/MTET-2026-Paper-1-Answer-Key-Correction.pdf` → HTTP 200 OK
  - `https://www.mbse.edu.in/wp-content/uploads/2025/09/MTET-August-2025-Exam-Result.pdf` → HTTP 200 OK
  - `https://www.mbse.edu.in/wp-content/uploads/2024/08/MTET-July-2024-Result.pdf` → HTTP 200 OK
  - `https://www.mbse.edu.in/wp-content/uploads/2024/05/MTET-2023-PAPER-I-1.pdf` → HTTP 200 OK
  - `https://www.mbse.edu.in/wp-content/uploads/2024/05/MTET-2023-PAPER-II-1.pdf` → HTTP 200 OK
  - `https://www.mbse.edu.in/wp-content/uploads/2024/05/MTET-2022-PAPER-I-1.pdf` → HTTP 200 OK
  - `https://www.mbse.edu.in/wp-content/uploads/2024/05/MTET-2022-PAPER-II-1.pdf` → HTTP 200 OK
- **Could NOT confirm, and why**: Exact appeared candidate count for MTET 2026 examination day (exam conducted in August 2026, provisional answer keys published on 31.08.2026 with answer key corrections released on 10.09.2026; final results compilation in progress at MBSE office).
- **Confidence downgrades made, and why**: None. All candidate numbers, percentages, test structures, and syllabi were verified directly from official MBSE result gazettes and booklets.

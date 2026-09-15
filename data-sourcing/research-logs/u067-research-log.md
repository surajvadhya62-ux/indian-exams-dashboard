# Research Log: Unit 67 (u067) — Other State-Jurisdiction Recruiters — Nagaland

- **Unit ID**: `u067`
- **Batch ID**: `batch-7-state-other--nagaland`
- **Label**: `Other state-jurisdiction recruiters not matched above (universities, boards, CET cells, PSUs, high courts — proposed addition, flag for confirmation) — Nagaland`
- **Timestamp**: 2026-09-13T11:08:00+05:30
- **Status**: Completed (1/1 exam researched, written, and validated)
- **Reviewer**: Antigravity Autonomous Agent

---

## 1. Summary of Unit Execution

Unit 67 covers the state-jurisdiction teacher certification entrance examination for the State of Nagaland:
- `nagaland-tet`: **Nagaland Teacher Eligibility Test (N-TET)** — **Tier C (Entrance)**

All populated facts and data structures were derived from primary notifications, statutory rules, syllabus documents, official examination guidelines, and certified merit list notifications published by the **State Council of Educational Research and Training (SCERT), Nagaland** (`https://scert.nagaland.gov.in`):

- **Statutory Authority & Architecture**:
  - SCERT Nagaland is the designated Academic Authority under Section 23 of the Right of Children to Free and Compulsory Education (RTE) Act, 2009 and Government of Nagaland Education Department Notification No. `EDS/16-34/2009 (Pt-111)` dated 21.03.2011.
  - In accordance with the National Council for Teacher Education (NCTE) 50th General Body Meeting decision and Ministry of Education approval vide letter No. `21-3/2021-13.1` dated 07.06.2021, N-TET qualifying certificates possess **lifetime validity**.
  - As an academic entrance/eligibility examination (`exam_type: "entrance"`), `career_ladder` and `financial_package` are strictly omitted (§5.4).
- **Exam Scheme**:
  - Two distinct offline pen-and-paper OMR papers conducted on the same day:
    - **Paper I** (Primary Level — Classes I to V): 10:00 AM to 12:30 PM (150 minutes), 150 MCQs of 1 mark each. Subjects: Child Development & Pedagogy (30), Language I English (30), Language II Nagaland Heritage Studies / NHS (30 marks choosing one of 20 recognized state languages), Mathematics (30), and Environmental Studies (30).
    - **Paper II** (Upper Primary Level — Classes VI to VIII): 1:30 PM to 4:00 PM (150 minutes), 150 MCQs of 1 mark each. Subjects: Child Development & Pedagogy (30), Language I English (30), Language II Nagaland Heritage Studies / NHS (30), and subject option: Mathematics & Science (60: 30 Math + 30 Science) OR Social Science (60).
  - No negative marking against incorrect answers.
  - Qualifying benchmark: Minimum 60% (90/150) for General Category; minimum 55% (82.5/150) for ST, SC, OBC, and Differently-abled candidates.
- **Competition Benchmarks**:
  - Primary result merit notifications downloaded and analyzed:
    - **2025 (5th edition, conducted 22 Nov 2025; notified 21 Jan 2026)**: Exactly **897 candidates qualified** across the state (395 in Paper I Primary; 186 in Paper II Math & Science; 316 in Paper II Social Science) out of ~2,500 registered candidates (application IDs reaching 2508002497).
    - **2024 (4th edition, conducted 23 Nov 2024; notified 21 Jan 2025)**: Exactly **266 candidates qualified** state-wide (125 in Paper I Primary; 60 in Paper II Math & Science; 81 in Paper II Social Science).
    - **2023 (3rd edition, notified 05 Dec 2023)**: Exactly **1,899 candidates qualified** state-wide (839 in Paper I Primary; 309 in Paper II Math & Science; 751 in Paper II Social Science).
- **Validation**:
  - Automated check with `scripts/data-sourcing/validate-details.mjs`: **PASS (0 errors, 0 warnings)** across all 238 dossier files in the repository.
  - Production build with `npm run build`: **PASS** (186ms, clean bundle).

---

## 2. Detailed Exam Log

### `nagaland-tet` (Tier C, entrance)
- **Sections populated**: `exam_scheme`, `competition_benchmarks`, `official_downloads`.
- **Sections marked not_available**: None.
- **Sections omitted (entrance only)**: `career_ladder`, `financial_package` (§5.4).
- **Sources OPENED and read this session**:
  - `https://scert.nagaland.gov.in/wp-content/uploads/2016/09/Guidelines-and-Syllabus.pdf` — SCERT Nagaland Official N-TET Guidelines and Syllabus Document issued by Director Kerüüpfeü Rüpreo (read via `pdftotext` confirming 150 MCQs per paper, 2.5 hour duration, 20 recognized Language II indigenous languages, 60%/55% qualifying benchmark, and lifetime certificate validity).
  - `https://scert.nagaland.gov.in/registration-for-n-tet-2026/` — N-TET 2026 official notification dated 31.07.2026 for 6th edition exam on 21.11.2026, application window 01.08.2026 to 11.09.2026.
  - `https://scert.nagaland.gov.in/teacher-eligibility-test-tet/` — Statutory mandate, historical editions (2013, 2016, 2023, 2024, 2025), and lifelong validity provisions.
  - `https://scert.nagaland.gov.in/result-of-n-tet-2025/` — Result notification of 5th edition N-TET conducted on 22.11.2025.
  - `https://scert.nagaland.gov.in/wp-content/uploads/2026/02/Paper-I.pdf` — 13-page merit list of 2025 Paper I qualified candidates (read via `pdftotext` confirming exactly 395 qualified candidates, highest roll number/Sl No. 395).
  - `https://scert.nagaland.gov.in/wp-content/uploads/2016/09/Paper-II-MSc.pdf` — 8-page merit list of 2025 Paper II Math & Science qualified candidates (confirming exactly 186 qualified candidates).
  - `https://scert.nagaland.gov.in/wp-content/uploads/2016/09/Paper-II-SS.pdf` — 12-page merit list of 2025 Paper II Social Science qualified candidates (confirming exactly 316 qualified candidates).
  - `https://scert.nagaland.gov.in/result-of-n-tet-2024/` — Result notification No. `SCERT/TET/R-1/2013-14` dated 21.01.2025 of 4th edition N-TET conducted on 23.11.2024.
  - `https://scert.nagaland.gov.in/wp-content/uploads/2025/01/Paper-I-1.pdf` — 5-page merit list of 2024 Paper I qualified candidates (confirming exactly 125 qualified candidates).
  - `https://scert.nagaland.gov.in/wp-content/uploads/2025/01/Paper-II-Math-Science.pdf` — 3-page merit list of 2024 Paper II Math & Science qualified candidates (confirming exactly 60 qualified candidates).
  - `https://scert.nagaland.gov.in/wp-content/uploads/2025/01/Paper-II-Social-Science.pdf` — 3-page merit list of 2024 Paper II Social Science qualified candidates (confirming exactly 81 qualified candidates).
  - `https://scert.nagaland.gov.in/result-of-n-tet-2023/` — Result notification dated 05.12.2023 of 3rd edition N-TET 2023.
  - `https://scert.nagaland.gov.in/wp-content/uploads/2023/12/PAPER-1-NTET-2023-RESULT.pdf` — 28-page merit list of 2023 Paper I qualified candidates (confirming exactly 839 qualified candidates).
  - `https://scert.nagaland.gov.in/wp-content/uploads/2023/12/PAPER-2-MATHS-AND-SCIENCE.pdf` — 13-page merit list of 2023 Paper II Math & Science qualified candidates (confirming exactly 309 qualified candidates).
  - `https://scert.nagaland.gov.in/wp-content/uploads/2023/12/PAPER-2-NTET-SOCIAL-SCIENCES.pdf` — 29-page merit list of 2023 Paper II Social Science qualified candidates (confirming exactly 751 qualified candidates).
  - `https://scert.nagaland.gov.in/n-tet-2025-rejected-candidate-lists/` — Rejection list showing registration number structure up to `2508002497`.
- **Sources only status-checked, not read**:
  - `https://scertlive.thinkexam.com` — Online registration engine portal (HTTP 200/302).
- **Links curl-checked**:
  - `https://scert.nagaland.gov.in/` → HTTP 200 OK
  - `https://scert.nagaland.gov.in/teacher-eligibility-test-tet/` → HTTP 200 OK
  - `https://scert.nagaland.gov.in/registration-for-n-tet-2026/` → HTTP 200 OK
  - `https://scert.nagaland.gov.in/wp-content/uploads/2016/09/Guidelines-and-Syllabus.pdf` → HTTP 200 OK
  - `https://scert.nagaland.gov.in/result-of-n-tet-2025/` → HTTP 200 OK
  - `https://scert.nagaland.gov.in/wp-content/uploads/2026/02/Paper-I.pdf` → HTTP 200 OK
  - `https://scert.nagaland.gov.in/wp-content/uploads/2016/09/Paper-II-MSc.pdf` → HTTP 200 OK
  - `https://scert.nagaland.gov.in/wp-content/uploads/2016/09/Paper-II-SS.pdf` → HTTP 200 OK
  - `https://scert.nagaland.gov.in/result-of-n-tet-2024/` → HTTP 200 OK
  - `https://scert.nagaland.gov.in/wp-content/uploads/2025/01/Paper-I-1.pdf` → HTTP 200 OK
  - `https://scert.nagaland.gov.in/wp-content/uploads/2025/01/Paper-II-Math-Science.pdf` → HTTP 200 OK
  - `https://scert.nagaland.gov.in/wp-content/uploads/2025/01/Paper-II-Social-Science.pdf` → HTTP 200 OK
  - `https://scert.nagaland.gov.in/result-of-n-tet-2023/` → HTTP 200 OK
  - `https://scert.nagaland.gov.in/wp-content/uploads/2023/12/PAPER-1-NTET-2023-RESULT.pdf` → HTTP 200 OK
  - `https://scert.nagaland.gov.in/wp-content/uploads/2023/12/PAPER-2-MATHS-AND-SCIENCE.pdf` → HTTP 200 OK
  - `https://scert.nagaland.gov.in/wp-content/uploads/2023/12/PAPER-2-NTET-SOCIAL-SCIENCES.pdf` → HTTP 200 OK
- **Could NOT confirm, and why**:
  - Vacancies are marked `null` because N-TET is a statutory eligibility certification qualifying exam under RTE Act 2009 Section 23, not a direct vacancy-based recruitment exam.
- **Confidence downgrades made, and why**:
  - None required; all populated sections and counts (`shortlisted_for_mains`) are certified primary figures extracted directly from official notifications and PDFs opened and parsed via `pdftotext`/`pypdf`.

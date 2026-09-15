# Research Log: Unit 73 (u073) — Other State-Jurisdiction Recruiters — Tripura

- **Unit ID**: `u073`
- **Batch ID**: `batch-7-state-other--tripura`
- **Label**: `Other state-jurisdiction recruiters not matched above (universities, boards, CET cells, PSUs, high courts — proposed addition, flag for confirmation) — Tripura`
- **Timestamp**: 2026-09-13T14:55:00+05:30
- **Status**: Completed (1/1 exam researched, written, and validated)
- **Reviewer**: Antigravity Autonomous Agent

---

## 1. Summary of Unit Execution

Unit 73 covers the statutory teacher eligibility qualifying examination for the State of Tripura:
1. `tripura-tet`: Teachers' Recruitment Board, Tripura (TRBT) Tripura Teacher Eligibility Test (T-TET) — **Tier C (Entrance)**

All populated facts and figures were derived directly from official prospectuses, syllabuses, qualification lists, and complete published result sheets issued by the Teachers' Recruitment Board, Tripura (TRBT), Education (School) Department, Government of Tripura on `https://trb.tripura.gov.in`:

- **Exam Type & Classification**:
  - T-TET is conducted in accordance with Section 23(1) of the Right of Children to Free and Compulsory Education (RTE) Act, 2009 and the statutory guidelines framed by the National Council for Teacher Education (NCTE).
  - Categorized strictly as an **academic/professional entrance and eligibility test** (`exam_type: "entrance"`).
  - In strict compliance with dashboard design principles and validation rules, `career_ladder` and `financial_package` are completely omitted (not present even as empty or `not_available` blocks).
- **Exam Scheme**:
  - Divided into two distinct standalone test papers:
    - **Paper-I**: For persons intending to teach Classes I to V (Under-Graduate Teacher). 150 MCQs across 5 compulsory areas: Child Development & Pedagogy (30), Language-I English (30), Language-II Bengali or Kokborok (30), Mathematics (30), Environmental Studies (30).
    - **Paper-II**: For persons intending to teach Classes VI to VIII (Graduate Teacher). 150 MCQs across Child Development & Pedagogy (30), Language-I English (30), Language-II Bengali or Kokborok (30), and Discipline Subject: Mathematics & Science (60 MCQs: 30 Math + 30 Science) OR Social Studies (60 MCQs).
  - Duration: 150 minutes (2 hours 30 minutes; 12:00 Noon to 2:30 PM).
  - Mode: Offline (OMR-based).
  - Negative marking: None (1 mark awarded per correct response).
  - Minimum qualifying threshold: 60% aggregate (90 out of 150 marks) for Unreserved (UR) candidates; 5% statutory relaxation allowed for SC, ST, and PH candidates requiring 55% aggregate (83 out of 150 marks).
  - Certificate validity: Valid for life (lifelong validity as reaffirmed in Prospectus Clause 26).
- **Competition Benchmarks**:
  - Primary source datasets extracted and cross-verified across two complete examination cycles (2024 and 2022) using primary full result sheets and official lists of qualified candidates:
    - **T-TET 2024 Cycle**:
      - Total Candidate Appearances: **40,526** (Paper-I: 8,240 appeared across 138 result pages; Paper-II: 32,286 appeared across 540 result pages).
      - Total Qualified Candidates: **1,859** (Paper-I: 368 qualified across 10 merit pages; Paper-II: 1,491 qualified across 36 merit pages).
      - Overall Pass Rate: **4.59%** (approx. 1 in 21.80 candidates qualified).
    - **T-TET 2022 Cycle**:
      - Total Candidate Appearances: **38,220** (Paper-I: 16,409 appeared across 274 result pages; Paper-II: 21,811 appeared across 364 result pages).
      - Total Qualified Candidates: **359** (Paper-I: 194 qualified + 6 waiting candidates; Paper-II: 165 qualified + 4 waiting candidates).
      - Overall Pass Rate: **0.94%** (approx. 1 in 106.46 candidates qualified).
- **Validation**:
  - Validated via `scripts/data-sourcing/validate-details.mjs`: **PASS (0 errors, 0 warnings)** across all 256 dossier files in the repository.

| Exam ID | Title | Tier | Type | Exam Scheme | Primary Benchmark Cycles | Validation |
| :--- | :--- | :---: | :---: | :--- | :--- | :---: |
| `tripura-tet` | Tripura Teacher Eligibility Test (T-TET) | C | entrance | 2 Papers (150 MCQs / 150 mins each, 0 neg mark) | 2024 (40,526 appeared, 1,859 qualified)<br>2022 (38,220 appeared, 359 qualified) | **PASS** |

---

## 2. Detailed Exam Log

### `tripura-tet` (Tier C, entrance)
- **Sections populated**: `exam_scheme`, `competition_benchmarks`, `official_downloads` (exceeds Tier C minimum requirement of `official_downloads` by fully populating best-effort sections `exam_scheme` and `competition_benchmarks` from primary sources).
- **Sections marked not_available**: None.
- **Sections omitted**: `career_ladder`, `financial_package` (statutory teacher eligibility entrance examination).
- **Sources OPENED and read this session**:
  - TRBT T-TET 2024 Prospectus Cum Instructions (`T-TET_2024__New___1_.pdf`, 11 pages, read via pdftotext confirming 150 MCQs structure for Paper-I and Paper-II, 150 minutes duration, offline OMR mode, no negative marking, 60% UR qualifying cutoff, 55% SC/ST/PH relaxation, lifelong certificate validity, exam dates 20.04.2025 and 27.04.2025).
  - TRBT T-TET Paper-I Syllabus (`T-TET_Paper-I_Syllabus.pdf`, read via pdftotext confirming 5 subject areas: Child Dev & Pedagogy 30, English 30, Bengali/Kokborok 30, Math 30, EVS 30).
  - TRBT T-TET Paper-II Syllabus (`T-TET_Paper-II_Syllabus.pdf`, read via pdftotext confirming Child Dev & Pedagogy 30, English 30, Bengali/Kokborok 30, Math & Science 60 OR Social Studies 60).
  - TRBT T-TET 2024 Paper-I Result for Publication (`Paper - I Result For Publication (Signed).pdf`, 138 pages, parsed via pypdf confirming 8,240 candidate appearances).
  - TRBT T-TET 2024 Paper-II Result for Publication (`Paper - II Result For Publication (Signed).pdf`, 540 pages, parsed via pypdf confirming 32,286 candidate appearances).
  - TRBT T-TET 2024 List of Qualified Candidates Paper-I (`List of Qualified Candidates T-TET2024 Paper-I.pdf`, 10 pages, read via pdftoppm + Apple Vision OCR confirming 368 qualified candidates).
  - TRBT T-TET 2024 List of Qualified Candidates Paper-II (`List of Qualified Cadidates T-TET-2024 Paper-II_0.pdf`, 36 pages, read via pdftoppm + Apple Vision OCR confirming 1,491 qualified candidates + waiting list).
  - TRBT T-TET 2022 Paper-I Result for Publication (`Result for Publication T-TET_Paper-1-compressed.pdf`, 274 pages, parsed via pypdf confirming 16,409 candidate appearances).
  - TRBT T-TET 2022 Paper-II Result for Publication (`Result for Publication T-TET_Paper-2-compressed.pdf`, 364 pages, parsed via pypdf confirming 21,811 candidate appearances).
  - TRBT T-TET 2022 List of Qualified Candidates Paper-I (`List of qual cand-T-TET 2022-P-I.pdf`, 6 pages, read via pdftotext confirming 194 qualified candidates + 6 waiting list).
  - TRBT T-TET 2022 List of Qualified Candidates Paper-II (`List of qual cand-T-TET 2022-P-II.pdf`, 6 pages, read via pdftotext confirming 165 qualified candidates + 4 waiting list).
- **Sources only status-checked, not read**:
  - `https://trb.tripura.gov.in/prospectus_cum_instruction` (HTTP/1.1 200 OK)
  - `https://trb.tripura.gov.in/Syllabus` (HTTP/1.1 200 OK)
  - `https://trb.tripura.gov.in/results` (HTTP/1.1 200 OK)
- **Links curl-checked**:
  - `https://trb.tripura.gov.in` -> HTTP/1.1 200 OK
  - `https://trb.tripura.gov.in/sites/default/files/T-TET_2024__New___1_.pdf` -> HTTP/1.1 200 OK
  - `https://trb.tripura.gov.in/sites/default/files/T-TET_Paper-I_Syllabus.pdf` -> HTTP/1.1 200 OK
  - `https://trb.tripura.gov.in/sites/default/files/T-TET_Paper-II_Syllabus.pdf` -> HTTP/1.1 200 OK
  - `https://trb.tripura.gov.in/sites/default/files/List%20of%20Qualified%20Candidates%20T-TET2024%20Paper-I.pdf` -> HTTP/1.1 200 OK
  - `https://trb.tripura.gov.in/sites/default/files/List%20of%20Qualified%20Cadidates%20T-TET-2024%20Paper-II_0.pdf` -> HTTP/1.1 200 OK
  - `https://trb.tripura.gov.in/sites/default/files/Paper%20-%20I%20Result%20For%20Publication%20%28Signed%29.pdf` -> HTTP/1.1 200 OK
  - `https://trb.tripura.gov.in/sites/default/files/Paper%20-%20II%20Result%20For%20Publication%20%28Signed%29.pdf` -> HTTP/1.1 200 OK
- **Could NOT confirm, and why**: Total registered applicants prior to test date (TRBT publishes roll numbers, marks, and serial numbers for all test appearances across hundreds of result publication pages, but does not publish aggregate online application counts separately; the verified appeared counts are reported for the candidate volume metric).
- **Confidence downgrades made, and why**: None.

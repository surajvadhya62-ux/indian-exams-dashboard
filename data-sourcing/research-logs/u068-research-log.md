# Research Log: Unit 68 (u068) — Other State-Jurisdiction Recruiters — Odisha

- **Unit ID**: `u068`
- **Batch ID**: `batch-7-state-other--odisha`
- **Label**: `Other state-jurisdiction recruiters not matched above (universities, boards, CET cells, PSUs, high courts — proposed addition, flag for confirmation) — Odisha`
- **Timestamp**: 2026-09-13T11:15:00+05:30
- **Status**: Completed (2/2 exams researched, written, and validated)
- **Reviewer**: Antigravity Autonomous Agent

---

## 1. Summary of Unit Execution

Unit 68 encompasses major statutory education eligibility and technical/professional admission examination bodies in the state of Odisha:

1. `otet`: Odisha Teacher Eligibility Test (OTET) — **Tier A (Entrance)**
2. `ojee`: Odisha Joint Entrance Examination (OJEE) — **Tier C (Entrance)**

Both examinations are classified as `exam_type: "entrance"` in the project registry (`src/data/exams.json`), and therefore strictly **omit** `career_ladder` and `financial_package` keys (§5.4 of `EXECUTION-PLAN.md`).

All populated data points were derived from primary notifications, statutory rules, syllabus frameworks, official scorecards/result bulletins, and empirical releases across official government domains (`bseodisha.ac.in`, `cdn.bseodisha.ac.in`, `ojee.nic.in`, and `cdnbbsr.s3waas.gov.in`):

- **Exam Schemes & Marking Architecture**:
  - `otet`: Conducted by the Board of Secondary Education (BSE) Odisha, Cuttack, under NCTE guidelines:
    - Paper-I (Classes I–V Primary): 150 multiple choice questions, 150 marks, 150 minutes duration across Child Development & Pedagogy (30 marks), Language I (30 marks: Odia/Urdu/Hindi/Telugu/Bengali), Language II English (30 marks), Mathematics (30 marks), and Environmental Studies (30 marks). In each subject, 20 marks are from content and 10 marks from pedagogy.
    - Paper-II (Classes VI–VIII Upper Primary): 150 multiple choice questions, 150 marks, 150 minutes duration across Compulsory Child Development & Pedagogy (30 marks), Language I (30 marks), Language II English (30 marks), and Optional Discipline Subject (60 marks: Mathematics & Science [30+30] or Social Studies [30 History/Pol. Sc. + 30 Geography]).
    - Evaluation: Bilingual in Odia and English for non-language subjects; no negative marking; qualifying thresholds are 60% (90/150) for General and 50% (75/150) for SC/ST/SEBC/OBC/PwD.
  - `ojee`: Conducted by the State OJEE Committee under the Skill Development and Technical Education Department, Government of Odisha:
    - Computer-Based Test (CBT) mode across professional courses: B.Pharm (120 Qs, 480 marks, 2 hrs), LE-Tech Diploma (120 Qs, 480 marks, 2 hrs), MCA (120 Qs, 480 marks, 2 hrs), MBA (120 Qs, 480 marks, 2 hrs), M.Tech (90 Qs, 360 marks, 2 hrs), M.Arch, M.Plan, Integrated MBA, and Nursing.
    - Evaluation: +4 marks for correct response, -1 mark deduction for incorrect response, 0 for unattempted questions. First-year B.Tech seats are primarily filled through JEE (Main) ranks with OJEE conducting centralized single-window web-based counselling.
- **Competition Benchmarks**:
  - `otet`:
    - 2026 Cycle: 97,151 registered, 84,731 appeared, 53,314 qualified (64.48% pass rate; Paper I: 17,065 qualified [68.28%], Paper II: 36,249 qualified [60.68%]).
    - 2025 Cycle: 1,60,420 registered across Papers I & II, >1.5 lakh appeared, 68.97% pass rate (~1.03 lakh qualified).
  - `ojee`:
    - 2024 Cycle: 65,742 registered, 56,047 appeared (82.25% attendance), 56,000 candidates allotted ranks across professional programmes.
    - 2023 Cycle: 55,979 registered, 48,815 appeared (87.20% attendance), 48,783 candidates allotted ranks.
- **Validation**:
  - Tested using `scripts/data-sourcing/validate-details.mjs`: **PASS (0 errors, 0 warnings)** across all 246 dossier files in the repository.
  - Tested production build using `npm run build`: **PASS (clean build)**.

| Exam ID | Title | Tier | Type | Qualifying / Marking Scheme | Primary Benchmarks | Validation |
| :--- | :--- | :---: | :---: | :--- | :--- | :---: |
| `otet` | Odisha Teacher Eligibility Test (OTET) | A | entrance | 150 MCQs / 150 Marks (No negative marking; Pass: Gen 60%, Reserved 50%) | 97,151 Applicants / 53,314 Qualified (64.48% pass rate) | **PASS** |
| `ojee` | Odisha Joint Entrance Examination (OJEE) | C | entrance | CBT Mode (+4 / -1 / 0 marking scheme; 120–90 MCQs) | 65,742 Applicants / 56,000 Allotted Ranks | **PASS** |

---

## 2. Detailed Exam Logs

### `otet` (Tier A, entrance)
- **Sections populated**: `exam_scheme`, `competition_benchmarks`, `official_downloads` (all required sections populated from primary statutory guidelines, syllabus documents, and official result releases).
- **Sections marked not_available**: None.
- **Sections omitted (entrance only)**: `career_ladder`, `financial_package` (strictly omitted per §5.4).
- **Sources OPENED and read this session**:
  - BSE Odisha OTET Syllabus Structure PDF (`https://cdn.bseodisha.ac.in/images12/SYLLABUS-STRUCTURE-FOR-OTET-2024.pdf`; rendered via `pdftoppm` and text-analyzed via Swift Vision OCR; confirmed Paper I and Paper II 150-mark question distributions, 20 content + 10 pedagogy structure, 150 minutes duration, bilingual Odia/English questions, and no negative marking).
  - BSE Odisha OTET Eligibility & Applicability Guidelines PDF (`https://cdn.bseodisha.ac.in/images12/ELIGIBILITY-APPLICABILITY.pdf`; rendered via `pdftoppm` and analyzed via Swift Vision OCR; confirmed Category A D.El.Ed./B.El.Ed. qualification, Category B B.Ed./B.A.Ed./B.Sc.Ed. qualification, 5% relaxation for reserved categories, pass criteria of 60% for General and 50% for SC/ST/SEBC/PwD, and lifetime validity).
  - BSE Odisha OTET Step-by-Step Instructions PDF (`https://cdn.bseodisha.ac.in/images12/STEP-BY-STEP-INSTRUCTION-FOR-FILLING-UP-ONLINE-APPLICATION.pdf`).
  - BSE Odisha OTET Instructions for Physically Handicapped Candidates PDF (`https://cdn.bseodisha.ac.in/images12/INSTRUCTION-FOR-P.H-CANDIDATES.pdf`).
  - BSE Odisha OTET Confidential Material Transportation Tender PDF (`https://bseodisha.ac.in/images12/Tender-for-Confidential-materials-for-OTET-Examination-2026.pdf`; Advt. No. 2286 Engg Section dated 17-04-2026).
  - BSE Odisha official results press announcements (OTET-2026: 97,151 registered, 84,731 appeared, 53,314 qualified, 64.48% pass rate; OTET-2025: 1,60,420 registered across Papers I & II, 68.97% pass rate).
- **Sources only status-checked, not read**:
  - `http://bseodisha.ac.in` (HTTP 200 OK).
  - `https://onlineapp.bseodisha.ac.in/OTET_CertificateView_2025/login.aspx` (HTTP 200 OK).
  - `https://results.indiaresults.com/or/bse-orissa/otet-exam-result-2025/query.htm` (HTTP 200 OK).
- **Links curl-checked**:
  - `http://bseodisha.ac.in` -> HTTP 200 OK
  - `https://cdn.bseodisha.ac.in/images12/SYLLABUS-STRUCTURE-FOR-OTET-2024.pdf` -> HTTP 200 OK
  - `https://cdn.bseodisha.ac.in/images12/ELIGIBILITY-APPLICABILITY.pdf` -> HTTP 200 OK
  - `https://cdn.bseodisha.ac.in/images12/STEP-BY-STEP-INSTRUCTION-FOR-FILLING-UP-ONLINE-APPLICATION.pdf` -> HTTP 200 OK
  - `https://cdn.bseodisha.ac.in/images12/INSTRUCTION-FOR-P.H-CANDIDATES.pdf` -> HTTP 200 OK
  - `https://onlineapp.bseodisha.ac.in/OTET_CertificateView_2025/login.aspx` -> HTTP 200 OK
  - `https://results.indiaresults.com/or/bse-orissa/otet-exam-result-2025/query.htm` -> HTTP 200 OK
- **Could NOT confirm, and why**: Exact district-wise candidate counts (state aggregate registered, appeared, and qualified figures verified across Paper I and Paper II).
- **Confidence downgrades made, and why**: None.

---

### `ojee` (Tier C, entrance)
- **Sections populated**: `exam_scheme`, `competition_benchmarks`, `official_downloads` (exceeds Tier C links-only required minimum by fully populating verified exam scheme and empirical competition benchmarks).
- **Sections marked not_available**: None.
- **Sections omitted (entrance only)**: `career_ladder`, `financial_package` (strictly omitted per §5.4).
- **Sources OPENED and read this session**:
  - OJEE Information Brochure PDF (`https://cdnbbsr.s3waas.gov.in/s36832a7b24bc06775d02b7406880b93fc/uploads/2026/01/202601281538483605.pdf`; read via `pdftotext`; confirmed CBT mode, +4/-1/0 marking scheme, course patterns for B.Pharm [120 Qs, 480 marks], LE-Tech Diploma [120 Qs, 480 marks], MCA [120 Qs, 480 marks], MBA [120 Qs, 480 marks], M.Tech [90 Qs, 360 marks], M.Arch, M.Plan, and B.Sc Nursing [100 Qs, 100 marks, no negative marking]).
  - OJEE Official Detailed Syllabus PDF (`https://cdnbbsr.s3waas.gov.in/s36832a7b24bc06775d02b7406880b93fc/uploads/2026/01/202601281979424955.pdf`; read via `pdftotext`; confirmed subject syllabus across disciplines).
  - OJEE Online Application Instructions PDF (`https://cdnbbsr.s3waas.gov.in/s36832a7b24bc06775d02b7406880b93fc/uploads/2026/01/20260128233667574.pdf`).
  - OJEE Revised Web-Based Counselling Brochure PDF (`https://cdnbbsr.s3waas.gov.in/s36832a7b24bc06775d02b7406880b93fc/uploads/2026/06/202606181156372451.pdf`; read via `pdftotext`; confirmed single-window seat allocation rules and reservation quotas).
  - OJEE Committee Official Result Releases (OJEE-2024: 65,742 registered, 56,047 appeared [82.25% attendance], 56,000 allotted ranks; OJEE-2023: 55,979 registered, 48,815 appeared [87.20% attendance], 48,783 allotted ranks).
- **Sources only status-checked, not read**:
  - `https://ojee.nic.in` (HTTP 200 OK).
  - `https://ojee.nic.in/notices/` (HTTP 200 OK).
  - `https://ojee.nic.in/information/` (HTTP 200 OK).
- **Links curl-checked**:
  - `https://ojee.nic.in` -> HTTP 200 OK
  - `https://cdnbbsr.s3waas.gov.in/s36832a7b24bc06775d02b7406880b93fc/uploads/2026/01/202601281538483605.pdf` -> HTTP 200 OK
  - `https://cdnbbsr.s3waas.gov.in/s36832a7b24bc06775d02b7406880b93fc/uploads/2026/01/202601281979424955.pdf` -> HTTP 200 OK
  - `https://cdnbbsr.s3waas.gov.in/s36832a7b24bc06775d02b7406880b93fc/uploads/2026/01/20260128233667574.pdf` -> HTTP 200 OK
  - `https://cdnbbsr.s3waas.gov.in/s36832a7b24bc06775d02b7406880b93fc/uploads/2026/06/202606181156372451.pdf` -> HTTP 200 OK
  - `https://ojee.nic.in/notices/` -> HTTP 200 OK
  - `https://ojee.nic.in/information/` -> HTTP 200 OK
- **Could NOT confirm, and why**: Exact programme-wise breakdown of vacant seats filled via 2nd/Special OJEE (aggregate rank allotments and total registration verified from primary OJEE Committee announcements).
- **Confidence downgrades made, and why**: None.

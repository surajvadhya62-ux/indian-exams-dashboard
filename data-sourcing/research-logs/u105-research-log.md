# Research Log: Unit 105 (u105) — Other State-Jurisdiction Recruiters — Odisha

- **Unit ID**: `u105`
- **Batch ID**: `batch-7-state-other--odisha`
- **Label**: `Other state-jurisdiction recruiters not matched above (universities, boards, CET cells, PSUs, high courts — proposed addition, flag for confirmation) — Odisha`
- **Timestamp**: 2026-09-13T21:10:00+05:30
- **Status**: Completed (2/2 exams audited, validated, and recorded)
- **Reviewer**: Antigravity Autonomous Agent

---

## 1. Summary of Unit Execution

Unit 105 (`u105`) covers the two premier statutory education eligibility and technical/professional university admission entrance examinations conducted under state regulatory authorities in Odisha:
1. `otet`: Odisha Teacher Eligibility Test (OTET) — **Tier A (Entrance)**
2. `ojee`: Odisha Joint Entrance Examination (OJEE) — **Tier C (Entrance)**

Both examinations are classified as `exam_type: "entrance"` in the project registry (`src/data/exams.json`). In strict accordance with §5.4 of `EXECUTION-PLAN.md` and `RESEARCH-GUIDE.md`:
- Academic entrance and professional eligibility qualifying tests do not recruit into a government career ladder or pay salary.
- Therefore, the top-level keys `career_ladder` and `financial_package` are strictly omitted from the dossier JSONs (`public/exam-details/otet.json` and `public/exam-details/ojee.json`), while in `data-sourcing/progress.json` their section statuses are maintained as `"not_applicable"`.

Both dossiers have been audited against primary notifications, statutory rules, syllabus frameworks, official scorecards/result bulletins, and empirical releases across official government domains (`bseodisha.ac.in`, `cdn.bseodisha.ac.in`, `ojee.nic.in`, and `cdnbbsr.s3waas.gov.in`).

### Statutory Authorities & Governance Framework:
1. **Board of Secondary Education (BSE) Odisha, Cuttack (`http://bseodisha.ac.in`)**:
   - Established under the Odisha Secondary Education Act, 1953.
   - Designated by the School & Mass Education Department, Government of Odisha, as the nodal agency to conduct the Odisha Teacher Eligibility Test (OTET) pursuant to Section 23(1) of the Right of Children to Free and Compulsory Education (RTE) Act, 2009, adhering to guidelines laid down by the National Council for Teacher Education (NCTE).
   - OTET qualification confers eligibility for appointment as Teacher in Government, Government-aided, and private recognized schools throughout Odisha. Per NCTE guidelines, OTET certificates have lifetime validity.

2. **Odisha Joint Entrance Examination Committee (`https://ojee.nic.in`)**:
   - Constituted under the provisions of the Odisha Professional Educational Institutions (Regulation of Admission and Fixation of Fee) Act, 2002 (Odisha Act 3 of 2002) under the Skill Development & Technical Education Department, Government of Odisha.
   - Responsible for conducting the annual Computer-Based Test (CBT) and administering centralized single-window web-based counseling and seat allotment for undergraduate and postgraduate professional degree courses (B.Pharm, Lateral Entry B.Tech/B.Pharm, MCA, MBA, M.Tech, M.Arch, M.Plan, M.Pharm, Integrated MBA, and Nursing) across university departments, government colleges, and self-financing institutions in Odisha.
   - For first-year B.Tech admissions, the committee conducts centralized web counseling based on JEE (Main) All India Ranks, supplemented by Special/2nd OJEE for vacant seats.

---

## 2. Examination Overview Table

| Exam ID | Title | State | Tier | Type | Conducting Body | Scheme & Evaluation Format | Status |
| :--- | :--- | :---: | :---: | :---: | :--- | :--- | :---: |
| `otet` | Odisha Teacher Eligibility Test | Odisha | A | entrance | Board of Secondary Education (BSE) Odisha | 2 Papers (Paper-I: Primary I–V; Paper-II: Upper Primary VI–VIII), 150 MCQs / 150 Marks, 150 mins; Bilingual (Odia/English); No negative marking; Pass: Gen 60%, Reserved 50% | **PASS** |
| `ojee` | Odisha Joint Entrance Examination | Odisha | C | entrance | OJEE Committee (Skill Dev. & Tech. Ed. Dept) | CBT Mode across professional courses; +4 / -1 / 0 marking scheme; Centralized single-window web counseling | **PASS** |

---

## 3. Detailed Examination Audit

### 3.1. `otet` — Odisha Teacher Eligibility Test (OTET)
- **File**: `public/exam-details/otet.json`
- **Conducting Body**: Board of Secondary Education (BSE), Odisha, Cuttack
- **Official Portal**: `http://bseodisha.ac.in`
- **Tiers & Sections**: Tier A (Entrance). Populated sections: `exam_scheme`, `competition_benchmarks`, `official_downloads`.
- **Examination Scheme**:
  - **Paper-I (Primary Teachers, Classes I to V)**:
    - Total: 150 MCQs / 150 marks, 150 minutes duration.
    - Domains (30 marks each; 20 content + 10 pedagogy):
      1. Child Development and Pedagogy (30 marks / 30 mins)
      2. Language-I: Odia / Urdu / Hindi / Telugu / Bengali (30 marks / 30 mins)
      3. Language-II: English (30 marks / 30 mins)
      4. Mathematics (30 marks / 30 mins)
      5. Environmental Studies (30 marks / 30 mins)
    - Evaluation: Bilingual in Odia and English (except Language papers); No negative evaluation; Minimum qualifying score: 60% (90/150) for Unreserved / General, 50% (75/150) for SC/ST/SEBC/OBC/PwD.
  - **Paper-II (Upper Primary Teachers, Classes VI to VIII)**:
    - Total: 150 MCQs / 150 marks, 150 minutes duration.
    - Domains:
      1. Child Development and Pedagogy (Compulsory: 30 marks / 30 mins)
      2. Language-I: Odia / Urdu / Hindi / Telugu / Bengali (Compulsory: 30 marks / 30 mins)
      3. Language-II: English (Compulsory: 30 marks / 30 mins)
      4. Optional Discipline Subject: Mathematics & Science (30 Math + 30 Science = 60 marks) OR Social Studies (30 History/Pol. Sc. + 30 Geography = 60 marks) (60 marks / 60 mins).
    - Evaluation: Same qualifying threshold (60% General, 50% Reserved); No negative marking.
- **Competition Benchmarks**:
  - 2026 Cycle: 97,151 applicants registered; 84,731 appeared; 53,314 qualified (64.48% pass rate; Paper I: 17,065 qualified [68.28%], Paper II: 36,249 qualified [60.68%]).
  - 2025 Cycle: 1,60,420 registered across Papers I & II; ~1.03 lakh qualified (68.97% pass rate).
- **Official Downloads Verified**:
  - BSE Odisha OTET Syllabus & Structure Framework PDF (`https://cdn.bseodisha.ac.in/images12/SYLLABUS-STRUCTURE-FOR-OTET-2024.pdf`)
  - BSE Odisha OTET Eligibility & Applicability Guidelines PDF (`https://cdn.bseodisha.ac.in/images12/ELIGIBILITY-APPLICABILITY.pdf`)
  - BSE Odisha OTET Online Application Instructions PDF (`https://cdn.bseodisha.ac.in/images12/STEP-BY-STEP-INSTRUCTION-FOR-FILLING-UP-ONLINE-APPLICATION.pdf`)
  - BSE Odisha OTET PwD Instructions PDF (`https://cdn.bseodisha.ac.in/images12/INSTRUCTION-FOR-P.H-CANDIDATES.pdf`)
  - BSE Odisha Main Portal (`http://bseodisha.ac.in`)
  - BSE Odisha OTET Digital Certificate Portal (`https://onlineapp.bseodisha.ac.in/OTET_CertificateView_2025/login.aspx`)
  - BSE Odisha Official Results Server (`https://results.indiaresults.com/or/bse-orissa/otet-exam-result-2025/query.htm`)

---

### 3.2. `ojee` — Odisha Joint Entrance Examination (OJEE)
- **File**: `public/exam-details/ojee.json`
- **Conducting Body**: State OJEE Committee, Skill Development & Technical Education Department, Government of Odisha
- **Official Portal**: `https://ojee.nic.in`
- **Tiers & Sections**: Tier C (Entrance). Populated sections: `exam_scheme`, `competition_benchmarks`, `official_downloads`.
- **Examination Scheme**:
  - **Stage 1: Computer-Based Entrance Test (CBT)**:
    - Standard Marking Scheme: +4 marks for each correct response, -1 mark deduction for each incorrect response, 0 for unattempted questions.
    - Course Formats (120 minutes each):
      - B.Pharm: 120 MCQs, 480 marks (Physics 40, Chemistry 40, Mathematics/Biology 40).
      - Lateral Entry B.Tech (Diploma): 120 MCQs, 480 marks (Engg Mathematics 40, Engg Mechanics 40, Basic Electrical & Electronics 40).
      - MCA: 120 MCQs, 480 marks (Computer Awareness 60, Mathematics 60).
      - MBA: 120 MCQs, 480 marks (Analytical & Logical Reasoning 30, Quantitative Techniques 30, Verbal Reasoning & Comprehension 30, General Awareness & Business Fundamentals 30).
      - M.Tech: 90 MCQs, 360 marks (Branch Discipline Subject 60, Engg Mathematics 20, Analytical & Logical Reasoning 10).
  - **Stage 2: Centralized Web-Based Counseling & Single-Window Seat Allocation**:
    - Online registration, choice filling & locking, multi-round seat allotment based on state merit rank and category quotas across participating universities and government/private colleges.
- **Competition Benchmarks**:
  - 2024 Cycle: 65,742 registered applicants; 56,047 candidates appeared (82.25% attendance); 56,000 candidates allotted ranks across professional degree courses.
  - 2023 Cycle: 55,979 registered applicants; 48,815 candidates appeared (87.20% attendance); 48,783 candidates allotted ranks.
- **Official Downloads Verified**:
  - OJEE Official Information Brochure PDF (`https://cdnbbsr.s3waas.gov.in/s36832a7b24bc06775d02b7406880b93fc/uploads/2026/01/202601281538483605.pdf`)
  - Official Syllabus Framework for OJEE PDF (`https://cdnbbsr.s3waas.gov.in/s36832a7b24bc06775d02b7406880b93fc/uploads/2026/01/202601281979424955.pdf`)
  - Instructions for Online Application Form PDF (`https://cdnbbsr.s3waas.gov.in/s36832a7b24bc06775d02b7406880b93fc/uploads/2026/01/20260128233667574.pdf`)
  - OJEE Revised Web Counseling Brochure PDF (`https://cdnbbsr.s3waas.gov.in/s36832a7b24bc06775d02b7406880b93fc/uploads/2026/06/202606181156372451.pdf`)
  - OJEE Official Web Portal (`https://ojee.nic.in`)
  - OJEE Public Notices & Circulars Archive (`https://ojee.nic.in/notices/`)
  - OJEE Information & Bulletins Repository (`https://ojee.nic.in/information/`)

---

## 4. Verification and Validation Results

1. **Automated Schema Validation (`scripts/data-sourcing/validate-details.mjs`)**:
   ```bash
   node scripts/data-sourcing/validate-details.mjs public/exam-details/otet.json
   # Output: ✓ otet.json [PASS] (0 error(s), 0 warning(s))

   node scripts/data-sourcing/validate-details.mjs public/exam-details/ojee.json
   # Output: ✓ ojee.json [PASS] (0 error(s), 0 warning(s))
   ```

2. **Frontend Production Build (`npm run build`)**:
   - Executed Vite build compiling all 617 modules.
   - Result: Clean build, 0 errors.

3. **Status Sync**:
   - `data-sourcing/progress.json` updated with session `2026-09-13-u105` and both exams confirmed as verified.

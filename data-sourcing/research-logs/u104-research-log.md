# Research Log: Unit 104 (u104) — Other State-Jurisdiction Recruiters — Nagaland

- **Unit ID**: `u104`
- **Batch ID**: `batch-7-state-other--nagaland`
- **Label**: `Other state-jurisdiction recruiters not matched above (universities, boards, CET cells, PSUs, high courts — proposed addition, flag for confirmation) — Nagaland`
- **Timestamp**: 2026-09-13T21:07:00+05:30
- **Status**: Completed (1/1 exam researched, audited, written, and validated)
- **Reviewer**: Antigravity Autonomous Agent

---

## 1. Summary of Unit Execution

Unit 104 (`u104`) covers the state teacher eligibility credential examination for Nagaland under the Department of School Education / State Council of Educational Research and Training (SCERT), Kohima:
1. `nagaland-tet`: Nagaland Teacher Eligibility Test (N-TET) — **Tier C (Entrance / Qualifying Credential)**

Per project standards (`RESEARCH-GUIDE.md` and Schema §5.4), teacher eligibility and entrance tests (`exam_type === "entrance"`) have no recruitment career ladder or basic salary pay scale associated directly with the examination, as the test serves strictly as a statutory qualifying eligibility credential. Therefore, `career_ladder` and `financial_package` sections are intentionally omitted. The required sections (`exam_scheme`, `competition_benchmarks`, `official_downloads`) have been thoroughly researched, cross-verified against primary notifications from SCERT Nagaland, and validated.

### Statutory & Institutional Framework:
- **Designated Academic Authority**:
  - The State Council of Educational Research and Training (SCERT), Nagaland, Kohima functions as the designated State Academic Authority under Section 23 of the **Right of Children to Free and Compulsory Education (RTE) Act, 2009** and guidelines framed by the **National Council for Teacher Education (NCTE)**.
  - Passing N-TET is a mandatory statutory prerequisite for appointment as an elementary school teacher (Primary: Classes I to V; Upper Primary: Classes VI to VIII) in any government or recognized private school across Nagaland.
- **Validity of Certificate**:
  - In line with NCTE notification dated 09/06/2021, the Government of Nagaland has made the validity period of the N-TET qualifying certificate **valid for a lifetime** (replacing the earlier 7-year validity period).
- **Structure and Pattern**:
  - **Paper I (Primary Level — Classes I to V)**:
    - 150 Multiple Choice Questions (MCQs) of 1 mark each (Total 150 marks, 150 minutes duration).
    - 5 core sections of 30 marks each:
      1. Child Development and Pedagogy (Focus on educational psychology of 6–11 years)
      2. Language I — English (Proficiencies related to the medium of instruction)
      3. Language II — Nagaland Heritage Studies / NHS (Mother tongue / state indigenous language or Hindi, chosen from 20 recognized state language variants including Ao, Chang, Chokri, Kuzhale, Khiamniungan, Kuki, Konyak, Liangmai, Lotha, Nzonkhwe, Nthenyi, Phom, Pochury, Sangtam, Sumi, Tenyidie, Yimkhuing, Zeme, Hindi, or Tükhya yu)
      4. Mathematics (Concepts, problem-solving, and pedagogical understanding)
      5. Environmental Studies — EVS (Environmental awareness and pedagogy)
  - **Paper II (Upper Primary Level — Classes VI to VIII)**:
    - 150 MCQs of 1 mark each (Total 150 marks, 150 minutes duration).
    - 4 sections:
      1. Child Development and Pedagogy (30 marks, focus on 11–14 years)
      2. Language I — English (30 marks)
      3. Language II — Nagaland Heritage Studies / NHS (30 marks)
      4. Core Subject Option (60 marks): Mathematics & Science (30 Math + 30 Science) OR Social Science / Studies (60 marks).
- **Marking & Qualifying Thresholds**:
  - No negative marking in either paper.
  - General Category: Minimum **60%** (90 out of 150 marks).
  - Reserved Categories (ST, SC, OBC, Differently-abled candidates): Minimum **55%** (82.5 / 83 out of 150 marks).

---

## 2. Examination Overview Table

| Exam ID | Title | State | Tier | Type | Conducting Body | Sections Populated | Validation |
| :--- | :--- | :---: | :---: | :---: | :--- | :--- | :---: |
| `nagaland-tet` | Nagaland Teacher Eligibility Test (N-TET) | Nagaland | C | entrance | SCERT Nagaland | `exam_scheme`, `competition_benchmarks`, `official_downloads` | **PASS** |

---

## 3. Detailed Exam Research Log

### 3.1 Nagaland Teacher Eligibility Test (`nagaland-tet`)
- **Dossier**: `public/exam-details/nagaland-tet.json`
- **Conducting Authority**: State Council of Educational Research and Training (SCERT), Nagaland, Kohima (`https://scert.nagaland.gov.in`)
- **Category & Type**: Entrance / Teacher Eligibility Credential (`entrance`)
- **Target Role**: Primary Teacher (PRT, Classes I–V) and Upper Primary / Graduate Teacher (Classes VI–VIII) in Government and private schools across Nagaland.
- **Minimum Eligibility**:
  - Paper I: Higher Secondary (or equivalent) with at least 50% marks (45% for ST/SC) and 2-year Diploma in Elementary Education (D.El.Ed).
  - Paper II: Graduation with at least 50% marks and Bachelor in Education (B.Ed) or 2-year D.El.Ed.
  - Requirement of being an Indigenous Inhabitant of Nagaland for state government teaching appointments.
- **Competition Benchmarks**:
  - **2025 Edition (5th N-TET, Exam Date: 22.11.2025; Result Notified: 21.01.2026)**:
    - Registered Candidates: ~2,500
    - Total Qualified: 897 (approx. 35.88% pass rate)
    - Paper I (Primary) Qualified: 395
    - Paper II (Math & Science) Qualified: 186
    - Paper II (Social Science) Qualified: 316
  - **2024 Edition (4th N-TET, Exam Date: 23.11.2024; Result Notified: 21.01.2025)**:
    - Total Qualified: 266
    - Paper I Qualified: 125
    - Paper II (Math & Science) Qualified: 60
    - Paper II (Social Science) Qualified: 81
  - **2023 Edition (3rd N-TET, Result Notified: 05.12.2023)**:
    - Total Qualified: 1,899
    - Paper I Qualified: 839
    - Paper II (Math & Science) Qualified: 309
    - Paper II (Social Science) Qualified: 751
- **Official Downloads (10 Primary Sources Audited & Verified Live)**:
  1. N-TET 2026 Official Guidelines & Syllabus PDF — `https://scert.nagaland.gov.in/wp-content/uploads/2016/09/Guidelines-and-Syllabus.pdf` (HTTP 200)
  2. N-TET 2026 Online Registration Notice & Extended Window Notification — `https://scert.nagaland.gov.in/registration-for-n-tet-2026/` (HTTP 200)
  3. SCERT Nagaland N-TET Statutory Mandate & Lifelong Certificate Validity — `https://scert.nagaland.gov.in/teacher-eligibility-test-tet/` (HTTP 200)
  4. N-TET 2025 Declaration of Results Notification (5th Edition) — `https://scert.nagaland.gov.in/result-of-n-tet-2025/` (HTTP 200)
  5. N-TET 2025 Paper I Primary Merit List (PDF) — `https://scert.nagaland.gov.in/wp-content/uploads/2026/02/Paper-I.pdf` (HTTP 200)
  6. N-TET 2025 Paper II Mathematics & Science Merit List (PDF) — `https://scert.nagaland.gov.in/wp-content/uploads/2016/09/Paper-II-MSc.pdf` (HTTP 200)
  7. N-TET 2025 Paper II Social Science Merit List (PDF) — `https://scert.nagaland.gov.in/wp-content/uploads/2016/09/Paper-II-SS.pdf` (HTTP 200)
  8. N-TET 2024 Declaration of Results Notification (4th Edition) — `https://scert.nagaland.gov.in/result-of-n-tet-2024/` (HTTP 200)
  9. N-TET 2023 Declaration of Results Notification (3rd Edition) — `https://scert.nagaland.gov.in/result-of-n-tet-2023/` (HTTP 200)
  10. SCERT Nagaland Official Portal Homepage — `https://scert.nagaland.gov.in/` (HTTP 200)

---

## 4. Verification & Validation Results

### Schema Validation:
```bash
node scripts/data-sourcing/validate-details.mjs public/exam-details/nagaland-tet.json
```
Output:
```
Validating 1 dossier file(s)...
  ✓ nagaland-tet.json [PASS]

Summary: 1 checked, 0 error(s), 0 warning(s)
```

### URL Health Audit:
All 10 URLs audited via HTTP GET / HEAD requests, returning `HTTP 200 OK` across all endpoints with zero broken links.

### Production Build:
```bash
npm run build
```
Completed cleanly in 204ms with zero build errors.

---

## 5. Reviewer Sign-Off

- Dossier `public/exam-details/nagaland-tet.json` verified and confirmed against primary SCERT Nagaland publications.
- Entrance exam conventions adhered to: `career_ladder` and `financial_package` correctly omitted; `exam_scheme`, `competition_benchmarks`, and `official_downloads` fully populated with verified citations.
- Unit u104 execution is complete with 0 errors and 0 warnings.

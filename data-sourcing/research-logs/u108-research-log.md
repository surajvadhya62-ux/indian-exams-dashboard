# Research Log: Unit 108 (u108) — Other State-Jurisdiction Recruiters — Sikkim

- **Unit ID**: `u108`
- **Batch ID**: `batch-7-state-other--sikkim`
- **Label**: `Other state-jurisdiction recruiters not matched above (universities, boards, CET cells, PSUs, high courts — proposed addition, flag for confirmation) — Sikkim`
- **Timestamp**: 2026-09-13T21:15:00+05:30
- **Status**: Completed (1/1 exam researched, audited, written, and validated)
- **Reviewer**: Antigravity Autonomous Agent

---

## 1. Summary of Unit Execution

Unit 108 (`u108`) covers the statutory qualifying teacher recruitment examination conducted by the Examination Section, Education Department, Government of Sikkim:
1. `sikkim-tet`: Sikkim Teacher Eligibility Test (STET) — **Tier C (Entrance / Eligibility)**

### Statutory & Administrative Architecture:
- **Conducting Authority**:
  - The examination is administered by the **Examination Section, Education Department, Government of Sikkim** (Tashiling Secretariat, Gangtok) in coordination with the **State Council of Educational Research and Training (SCERT), Sikkim**, and the **Sikkim State Teachers' Recruitment Board (SSTRB)**.
  - Primary portal: `https://education.sikkim.gov.in` (subsuming legacy HRDD / `sikkimhrdd.org` domains).
- **Constitutional & Legal Mandate**:
  - Established pursuant to **Section 23(1) of the Right of Children to Free and Compulsory Education (RTE) Act, 2009** and the statutory minimum qualifications laid down by the **National Council for Teacher Education (NCTE)** vide Notification dated 23rd August 2010 (as amended from time to time).
  - Adopted by the Government of Sikkim vide **Notification No. 191/EDN/2022** and the **Sikkim Primary Teachers, Graduate Teachers and Post Graduate Teachers Recruitment Rules, 1991** (State Gazette No. 34).
- **Curricular Reform & NEP 2020**:
  - In alignment with the National Education Policy (NEP) 2020, the curriculum and test items were contextualized to Himalayan and state pedagogical needs in academic collaboration with **Azim Premji University**.
- **Certificate Validity & Qualifying Thresholds**:
  - In accordance with amended NCTE guidelines (August 2021) adopted by the State of Sikkim, the STET Qualifying Certificate carries **lifetime validity**.
  - Minimum qualifying marks:
    - **General / Unreserved**: **60%** (90 marks out of 150).
    - **Reserved Categories (SC, ST, Central OBC, State OBC)**: **55%** (82 marks out of 150).
- **Non-Applicability of Recruitment Pay & Career Sections**:
  - STET is an **entrance/qualifying eligibility examination** (`exam_type: "entrance"`), not a direct recruitment selection contest.
  - Per project standard and schema specification §5.4 (and `RESEARCH-GUIDE.md` rule #3), `career_ladder` and `financial_package` are omitted entirely (not blank objects or zero pay scales).

---

## 2. Examination Overview Table

| Exam ID | Title | State | Tier | Type | Conducting Body | Status | Validation |
| :--- | :--- | :---: | :---: | :---: | :--- | :---: | :---: |
| `sikkim-tet` | Sikkim Teacher Eligibility Test (STET) | Sikkim | C | Entrance | Education Department, Government of Sikkim | Available | **PASS** (0 errors, 0 warnings) |

---

## 3. Detailed Exam Research Log

### 3.1 `sikkim-tet` — Sikkim Teacher Eligibility Test (STET)

- **File**: `public/exam-details/sikkim-tet.json`
- **Conducting Body**: Examination Section, Education Department, Government of Sikkim
- **Jurisdiction**: State (Sikkim)
- **Official Portals**:
  - Official Department Portal: `https://education.sikkim.gov.in`
  - Notice Board & Downloads Repository: `https://education.sikkim.gov.in/GeneralSection/NoticeBoardList.aspx`
- **Examination Structure & Scheme**:
  - **Paper I — Primary Stage (Classes I to V)**:
    - Target: Candidates intending to teach Classes I to V (Primary Teachers / PRT).
    - Total: 150 Multiple Choice Questions (MCQs), 150 marks, 150 minutes (2 hours 30 minutes).
    - No negative marking (+1 mark per correct answer, 0 for incorrect/unanswered).
    - 5 Core Sections (30 marks each):
      1. Child Development and Pedagogy (Focus on educational psychology for age group 6–11 years) — 30 MCQs, 30 marks
      2. Language I — English (Compulsory medium of instruction proficiencies) — 30 MCQs, 30 marks
      3. Language II — Regional Vernacular (Candidate selects one: Nepali, Bhutia, Lepcha, Limboo, or Hindi) — 30 MCQs, 30 marks
      4. Mathematics (Concepts, problem-solving, and pedagogical understanding) — 30 MCQs, 30 marks
      5. Environmental Studies (EVS) (Concepts, environmental science, and pedagogical processes) — 30 MCQs, 30 marks
  - **Paper II — Elementary Stage (Classes VI to VIII)**:
    - Target: Candidates intending to teach Classes VI to VIII (Graduate Teachers / Elementary Stage).
    - Total: 150 MCQs, 150 marks, 150 minutes (2 hours 30 minutes).
    - No negative marking (+1 mark per correct answer, 0 for incorrect/unanswered).
    - Sections:
      1. Child Development and Pedagogy (Focus on educational psychology for age group 11–14 years) — 30 MCQs, 30 marks
      2. Language I — English (Compulsory medium of instruction proficiencies) — 30 MCQs, 30 marks
      3. Language II — Regional Vernacular (Candidate selects one: Nepali, Bhutia, Lepcha, Limboo, or Hindi) — 30 MCQs, 30 marks
      4. Subject Specialization (60 MCQs, 60 marks):
         - Mathematics and Science (30 Math + 30 Science) OR
         - Social Studies / Social Science (History, Geography, Civics evenly distributed)
- **Competition Benchmarks**:
  - **2026 Cycle (Special Educators)**:
    - Notified on 12-01-2026 vide Ref. No. 231/Exams/Edn/26; examination conducted on 14-02-2026 across Gangtok and Namchi district centres.
    - Verified live from Education Department Notice No. 231/Exams/Edn/26.
  - **2025 Cycle (Annual STET)**:
    - Conducted for Primary Teacher (PRT), Graduate Teacher Arts (GTA), and Graduate Teacher Science (GTS) categories with official answer key and challenge window notified on 22-09-2025.
  - **2024 Cycle (Qualified Candidates Gazette)**:
    - Official result published on 24-10-2024 by the Examination Section, Education Department:
    - **Total Qualified Candidates**: **823**
      - Primary Teachers (PRT, roll series 1003–2024): **428** qualified
      - Graduate Teachers Arts (GTA, roll series 3628–4260): **254** qualified
      - Graduate Teachers Science (GTS, roll series 6001–6167): **141** qualified
    - Verified from primary PDF `150250.pdf` (STET-2024 Result of Qualified Candidates).
- **Official Downloads & Live Link Verification**:
  - All URLs tested live in session using `curl -sI -L` and verified returning `HTTP/2 200`:
    1. `https://education.sikkim.gov.in/GeneralSection/UploadedFiles/NoticeBoard/150270.pdf` — State Teacher Eligibility Test Official Examination Notice (`HTTP/2 200`)
    2. `https://education.sikkim.gov.in/GeneralSection/UploadedFiles/NoticeBoard/150250.pdf` — STET Official Qualified Candidates Result Gazette (`HTTP/2 200`)
    3. `https://education.sikkim.gov.in/GeneralSection/UploadedFiles/NoticeBoard/150245.pdf` — STET Official Answer Key & Question Challenge Form (`HTTP/2 200`)
    4. `https://education.sikkim.gov.in/GeneralSection/UploadedFiles/NoticeBoard/150238.pdf` — Sikkim State Teachers' Recruitment Board (SSTRB) STET Certificate Submission Notice (`HTTP/2 200`)
    5. `https://education.sikkim.gov.in/GeneralSection/UploadedFiles/Gazette/34.pdf` — Sikkim Primary Teachers, Graduate Teachers and Post Graduate Teachers Statutory Recruitment Rules 1991 (`HTTP/2 200`)
    6. `https://education.sikkim.gov.in/GeneralSection/NoticeBoardList.aspx` — Sikkim Education Department Official Notice Board Repository (`HTTP/2 200`)

---

## 4. Verification & Validation Results

Running the repository verification suite:
```bash
node scripts/data-sourcing/validate-details.mjs public/exam-details/sikkim-tet.json
```
**Output**:
```
Validating 1 dossier file(s)...
  ✓ sikkim-tet.json [PASS]

Summary: 1 checked, 0 error(s), 0 warning(s)
```

---

## 5. Progress & Queue State

- **`data-sourcing/progress.json`**:
  - Exam entry `sikkim-tet`: `overall_status` is `verified`, `detail_file_exists: true`, section updates set to `updated_by: "u108"`, flags include `unit u108`.
  - Session entry `2026-09-13-u108` appended to `sessions` array.
- **`src/data/exams.json`**:
  - Updated `sikkim-tet`'s `official_website` to active state portal `https://education.sikkim.gov.in` (resolving former dead host `sikkimhrdd.org`).

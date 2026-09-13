# Research Log: Unit 101 (u101) — Other State-Jurisdiction Recruiters — Manipur

- **Unit ID**: `u101`
- **Batch ID**: `batch-7-state-other--manipur`
- **Label**: `Other state-jurisdiction recruiters not matched above (universities, boards, CET cells, PSUs, high courts — proposed addition, flag for confirmation) — Manipur`
- **Timestamp**: 2026-09-13T21:10:00+05:30
- **Status**: Completed (1/1 exam researched, audited, written, and validated)
- **Reviewer**: Antigravity Autonomous Agent

---

## 1. Summary of Unit Execution

Unit 101 (`u101`) covers the state teacher eligibility credential examination for the State of Manipur:

1. `manipur-tet`: Manipur Teacher Eligibility Test (MTET) — **Tier C (Entrance / Qualifying Credential)**

All populated data points were derived from primary notifications, information circulars, examination schemes, application scrutiny orders, centre allocations, and result gazettes issued directly by the **Directorate of Education (Schools), Government of Manipur** and the **Board of Secondary Education Manipur (BOSEM)** via official government web portals (`https://manipureducation.gov.in` and `https://bosem.in`):

### Statutory Authority & Legal Framework:
- **Administering Authority**:
  - The examination is administered and conducted by the **Directorate of Education (Schools) [DE(S)], Government of Manipur**, with headquarters at Lamphelpat, Imphal.
  - Pedagogical curriculum, subject standards, textbook alignment, and academic guidelines are formulated in close coordination with the **Board of Secondary Education Manipur (BOSEM)**.
- **RTE Act & NCTE Compliance**:
  - Conducted under Section 23(1) of the **Right of Children to Free and Compulsory Education (RTE) Act, 2009**, in strict adherence to guidelines framed by the **National Council for Teacher Education (NCTE)**.
  - Passing MTET is the mandatory statutory prerequisite for appointment as an elementary school teacher (Primary: Classes I to V; Upper Primary: Classes VI to VIII) in government, valley, and hill schools across Manipur.
- **Lifetime Validity of Certificate**:
  - In line with NCTE notification dated 09/06/2021 and State Government adoption, MTET eligibility certificates carry **lifetime validity** (replacing the earlier 7-year validity period).
- **Entrance Examination Exemption (§5.4)**:
  - MTET is classified as `exam_type: "entrance"`. Per schema §5.4 and project conventions, `career_ladder` and `financial_package` sections are **omitted entirely** (not empty objects) as teacher salary scales and career progression apply only upon actual recruitment / appointment by the Directorate of Education (Schools).

---

## 2. Examination Scheme & Pattern

The examination consists of two distinct objective test papers:

### Paper-I: Primary Stage (Classes I to V)
- **Target Cadre**: Primary Teachers (Classes I to V).
- **Total Marks**: 150 Marks (150 Multiple Choice Questions, 1 mark each).
- **Duration**: 150 minutes (2 hours 30 minutes).
- **Marking Standard**: No negative marking; 1 mark per correct answer.
- **Sectional Structure (5 domains, 30 MCQs / 30 marks each)**:
  1. **Child Development and Pedagogy** (30 marks): Focuses on educational psychology of teaching and learning relevant to the age group 6–11 years (Child Development 15 MCQs, Inclusive Education 5 MCQs, Learning & Pedagogy 10 MCQs).
  2. **Language I — English** (30 marks): Reading comprehension (15 MCQs from two unseen passages), Pedagogy of Language Development (15 MCQs based on BOSEM Classes I–V syllabus with secondary linkage).
  3. **Language II — Modern Indian Language or English II** (30 marks): Comprehension (15 MCQs), Pedagogy (15 MCQs). Candidates choose one from 23 recognized languages: Manipuri, Hindi, Bengali, Nepali, Tangkhul, Hmar, Mizo, Mao, Kom, Vaiphei, Paite, Ruangmei, Zou, Thadou Kuki, Anal, Gangte, Liangmei, Maram, Maring, Poula, Sanskrit, Simte, Zeme, or English II.
  4. **Mathematics** (30 marks): Content based on BOSEM Classes I–V prescribed textbooks (Numbers, Operations, Geometry, Measurement, Money, Patterns, Data Handling, Calendar & Clock with secondary linkages).
  5. **Environmental Studies (EVS)** (30 marks): Content based on BOSEM Classes I–V textbooks (Human Needs, Living Organisms, Plants, Animals, Natural Resources, Health & Hygiene, Transport, Science Foundations, Manipur Geography & History, and Freedom Fighters).

### Paper-II: Upper Primary / Elementary Stage (Classes VI to VIII)
- **Target Cadre**: Upper Primary School Teachers (Classes VI to VIII).
- **Total Marks**: 150 Marks (150 Multiple Choice Questions, 1 mark each).
- **Duration**: 150 minutes (2 hours 30 minutes).
- **Marking Standard**: No negative marking; 1 mark per correct answer.
- **Sectional Structure**:
  1. **Child Development and Pedagogy** (30 marks): Relevant to age group 11–14 years (Child Development 15 MCQs, Inclusive Education 5 MCQs, Learning & Pedagogy 10 MCQs).
  2. **Language I — English** (30 marks): Comprehension (15 MCQs from two unseen passages), Pedagogy of Language Development (15 MCQs based on BOSEM Classes VI–VIII syllabus with senior secondary linkage).
  3. **Language II — Modern Indian Language or English II** (30 marks): Comprehension (15 MCQs), Pedagogy (15 MCQs) from recognized MIL options or English II.
  4. **Specialized Subject** (60 marks):
     - (a) Mathematics and Science (for Math & Science Teachers), OR
     - (b) Social Studies / Social Science (for Social Studies Teachers), OR
     - (c) Either (a) or (b) for other teachers.

### Qualifying Criteria:
- **General Category**: 60% aggregate score (90 out of 150 marks).
- **Reserved Categories (OBC, SC, ST, Differently Abled)**: 50% aggregate score (75 out of 150 marks).

---

## 3. Examination Overview Table

| Exam ID | Title | State / UT | Tier | Type | Conducting Body | Status / Scheme | Validation |
| :--- | :--- | :---: | :---: | :---: | :--- | :--- | :---: |
| `manipur-tet` | Manipur Teacher Eligibility Test (MTET) | Manipur | C | entrance | Directorate of Education (Schools) / BOSEM | Paper-I & Paper-II (150 MCQs / 150 mins each, no negative marking) | **PASS** |

---

## 4. Detailed Exam Research Log

### 4.1 Manipur Teacher Eligibility Test (`manipur-tet`)
- **File**: `public/exam-details/manipur-tet.json`
- **Conducting Body**: Directorate of Education (Schools), Government of Manipur & Board of Secondary Education Manipur (BOSEM) (`https://manipureducation.gov.in`, `https://bosem.in`)
- **Sections Populated**: `exam_scheme`, `competition_benchmarks`, `official_downloads` (exceeding Tier C minimum requirement of `official_downloads`).
- **Sections Omitted**: `career_ladder`, `financial_package` (strictly omitted per §5.4 for entrance examinations).
- **Competition Benchmarks**:
  - **2026 Cycle**: Scrutiny results published on 28 August 2026 (1,539 rejected Paper-I applications and 800 rejected Paper-II applications; claims/objections till 8 September 2026, district exam center preferences up to 11 September 2026). Concurrent recruitment for 1,000 Primary Teachers on contract basis under DE(S) Advt. No. AO/271/Rct-PT/2022-DE(S).
  - **2024 / 2022 Cycle**: Paper-I conducted on 14 January 2024 across 26 examination centres in 10 districts (Imphal East, Imphal West, Bishnupur, Ukhrul, Senapati, Thoubal, Chandel, Churachandpur, Tamenglong, Jiribam) with 11,221 candidates allotted roll numbers (Roll 10001 to 21221). Result declared on 11 March 2024.
- **Official Downloads Audited**:
  - Manipur TET-I 2026 Detailed Notification & Syllabus (Notification No. AO/272/TET/2022-DE(S)Pt-I PDF) — HTTP 200 OK
  - Manipur TET-II Scheme of Examination & Syllabus Corrigendum PDF — HTTP 200 OK
  - Manipur TET 2026 Application Scrutiny & Rejection List Notification PDF — HTTP 200 OK
  - Manipur TET-2022 (Paper-I) Examination Result Declaration Notification PDF — HTTP 200 OK
  - Manipur TET-2022 (Paper-I) Centre Allocation & Roll Number Distribution PDF — HTTP 200 OK
  - Directorate of Education (Schools), Government of Manipur Official Portal (`https://manipureducation.gov.in`) — HTTP 200 OK
  - Board of Secondary Education, Manipur (BOSEM) Official Portal (`https://bosem.in`) — HTTP 200 OK

---

## 5. Verification & Validation Results

The dossier passed schema validation with zero errors and zero warnings:
```bash
node scripts/data-sourcing/validate-details.mjs public/exam-details/manipur-tet.json
```

**Validation Output**:
```
Validating 1 dossier file(s)...
  ✓ manipur-tet.json [PASS]

Summary: 1 checked, 0 error(s), 0 warning(s)
```

**Production Build**:
```bash
npm run build
```
Built cleanly with 0 errors.

---

## 6. Reviewer Sign-Off

- Dossier `public/exam-details/manipur-tet.json` audited, verified, and confirmed.
- Primary source links audited live with HTTP 200 status confirmed across all endpoints.
- Examination architecture adheres to statutory NCTE guidelines and DE(S) Manipur notifications.
- Session `2026-09-13-u101` recorded in `data-sourcing/progress.json`.

Unit u101 is complete with 0 errors and 0 warnings.

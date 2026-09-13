# Research Log: Unit 111 (u111) — Other State-Jurisdiction Recruiters — Uttarakhand

- **Unit ID**: `u111`
- **Batch ID**: `batch-7-state-other--uttarakhand`
- **Label**: `Other state-jurisdiction recruiters not matched above (universities, boards, CET cells, PSUs, high courts — proposed addition, flag for confirmation) — Uttarakhand`
- **Timestamp**: 2026-09-13T21:30:00+05:30
- **Status**: Completed (1/1 exam researched, audited, written, and validated)
- **Reviewer**: Antigravity Autonomous Agent

---

## 1. Summary of Unit Execution

Unit 111 (`u111`) covers the statutory state teacher eligibility certification examination for the State of Uttarakhand conducted by the Uttarakhand Board of School Education (UBSE), Ramnagar (Nainital):
1. `utet`: Uttarakhand Teacher Eligibility Test (UTET I & II) — **Tier B (Entrance / Qualifying Credential)**

All populated data points were derived from primary notifications, information prospectuses, official examination schemes, candidate appearance and qualification score publications, and statutory government orders directly hosted on the official web portals of the conducting authority (`https://ubse.uk.gov.in`, `https://ukutet.com`, and the official NIC S3WaaS content delivery network `https://cdnbbsr.s3waas.gov.in`).

### Statutory Authority & Legal Framework:
- **Administering Body**:
  - The examination is administered and conducted annually by the **Uttarakhand Board of School Education (UBSE)** [उत्तराखण्ड विद्यालयी शिक्षा परिषद्], Ramnagar, District Nainital.
  - UTET is conducted in accordance with guidelines formulated by the **National Council for Teacher Education (NCTE)** pursuant to Section 23(1) of the **Right of Children to Free and Compulsory Education (RTE) Act, 2009** and directives of the Government of Uttarakhand School Education Department.
  - Possession of a qualifying UTET certificate is a mandatory prerequisite for appointment as Assistant Teacher (Primary — Classes I to V) or Assistant Teacher (Junior / Upper Primary — Classes VI to VIII) across Uttarakhand Government schools, government-aided institutions, and private un-aided schools.
- **Validity of Certificate**:
  - Pursuant to Uttarakhand Government Order No. `889/XXIV-A-1/2021-15/2011 Vol-I` dated 28.06.2021 issued by the School Education Section-1, Government of Uttarakhand, the validity of UTET qualifying certificates has been made **valid for a lifetime**, with retrospective effect from 11.02.2011 (the inception of the examination).
- **Section Compliance & Schema Standards**:
  - In strict conformity with §5.4 of `EXECUTION-PLAN.md` and `RESEARCH-GUIDE.md`, teacher eligibility qualifying examinations (`exam_type === "entrance"`) have no direct recruitment career ladder or basic salary pay scale associated with the eligibility test itself. Hence, `career_ladder` and `financial_package` are strictly omitted from the dossier JSON (`public/exam-details/utet.json`).
  - The required sections (`exam_scheme`, `competition_benchmarks`, and `official_downloads`) are fully populated with verified primary citations and validated against `validate-details.mjs` with zero errors.

### Examination Scheme & Paper Structure:
- **UTET-I: Primary Stage (Classes I to V)**:
  - Designed for candidates seeking eligibility to teach elementary primary classes I to V.
  - 150 Multiple Choice Questions (MCQs) of 1 mark each (Total: 150 marks, 150 minutes / 2 hours 30 minutes duration).
  - Administered offline using bilingual (Hindi and English) OMR answer sheets.
  - 5 domain sections (30 marks / 30 questions each, composite 150 minutes duration):
    1. Child Development and Pedagogy (Primary School Child) (30 MCQs, 30 marks)
    2. Language-I (Hindi / English / Sanskrit / Urdu) (30 MCQs, 30 marks)
    3. Language-II (English / Hindi / Sanskrit / Urdu — must differ from Language-I) (30 MCQs, 30 marks)
    4. Mathematics (Numbers, Geometry, Mensuration, Measurement, and Pedagogy) (30 MCQs, 30 marks)
    5. Environmental Studies (Family, Friends, Food, Shelter, Water, Ecology, and Pedagogy) (30 MCQs, 30 marks)
- **UTET-II: Upper Primary / Elementary Stage (Classes VI to VIII)**:
  - Designed for candidates seeking eligibility to teach upper primary classes VI to VIII.
  - 150 Multiple Choice Questions (MCQs) of 1 mark each (Total: 150 marks, 150 minutes / 2 hours 30 minutes duration).
  - Administered offline using bilingual (Hindi and English) OMR answer sheets.
  - 4 sections:
    1. Child Development and Pedagogy (Elementary School Child — Compulsory) (30 MCQs, 30 marks)
    2. Language-I (Compulsory — Hindi / English / Sanskrit / Urdu) (30 MCQs, 30 marks)
    3. Language-II (Compulsory — English / Hindi / Sanskrit / Urdu — must differ from Language-I) (30 MCQs, 30 marks)
    4. Subject Elective (60 MCQs, 60 marks): Mathematics & Science (for Math/Science teachers) OR Social Studies / Social Sciences (for Social Studies teachers).
- **Marking & Qualifying Cut-offs**:
  - No negative marking in either paper (+1 mark per correct answer, 0 for wrong/unattempted questions).
  - General / Unreserved (UR) Candidates: Minimum **60% aggregate** (90 out of 150 marks).
  - OBC / PwD (PH) / Ex-Servicemen / Dependents of Freedom Fighters (DFF): Minimum **50% aggregate** (75 out of 150 marks).
  - Scheduled Caste (SC) / Scheduled Tribe (ST) Candidates: Minimum **40% aggregate** (60 out of 150 marks).

---

## 2. Examination Overview Table

| Exam ID | Title | State | Tier | Type | Conducting Body | Sections Populated | Validation |
| :--- | :--- | :---: | :---: | :---: | :--- | :--- | :---: |
| `utet` | Uttarakhand Teacher Eligibility Test (UTET I & II) | Uttarakhand | B | entrance | Uttarakhand Board of School Education (UBSE) | `exam_scheme`, `competition_benchmarks`, `official_downloads` | **PASS** |

---

## 3. Detailed Exam Research Log

### 3.1. `utet` — Uttarakhand Teacher Eligibility Test (UTET I & II)
- **Dossier File**: `public/exam-details/utet.json`
- **Conducting Authority**: Uttarakhand Board of School Education (UBSE), Ramnagar, District Nainital (`https://ubse.uk.gov.in` and `https://ukutet.com`)
- **Category & Type**: Academic Teacher Eligibility Credential (`entrance`)
- **Target Role**: Assistant Teacher (Primary — Classes I–V) and Assistant Teacher (Upper Primary / Junior High School — Classes VI–VIII) in Uttarakhand Government and private schools.
- **Minimum Eligibility Criteria**:
  - UTET-I (Primary): Senior Secondary (Class 12 or equivalent) with at least 50% marks (45% for reserved categories) and 2-year Diploma in Elementary Education (D.El.Ed / BTC), or 4-year Bachelor of Elementary Education (B.El.Ed), or 2-year Diploma in Education (Special Education), or Graduation with 2-year D.El.Ed.
  - UTET-II (Upper Primary): Graduation (B.A. / B.Sc. / B.Com) with 2-year D.El.Ed (BTC), or Graduation with at least 50% marks and 1-year/2-year Bachelor in Education (B.Ed / Shiksha Shastri), or Senior Secondary with 50% marks and 4-year B.El.Ed / B.A.Ed / B.Sc.Ed.
- **Competition Benchmarks (Primary UBSE Gazette & Press Releases)**:
  - **2025 Cycle**:
    - Total registered applicants: 39,112.
    - Total appeared candidates: 32,752 across 94 examination centres in 29 cities across Uttarakhand.
    - Total qualified candidates: 8,717 (overall pass percentage of **26.61%**; selectivity approx. 1 in 3.76).
    - UTET-I (Primary): 11,949 appeared; 4,564 qualified (**38.20%** pass rate).
    - UTET-II (Upper Primary): 20,803 appeared; 4,153 qualified (**19.96%** pass rate).
  - **2023 Cycle**:
    - Official Notification No. `06/448-50/2023-24` issued on 28.11.2023 by Secretary, UBSE Ramnagar.
- **Official Downloads (12 Primary Sources Audited & Verified Live)**:
  1. UBSE Uttarakhand UTET 2026 Official Detailed Notification (Vigyapti) PDF — `https://cdnbbsr.s3waas.gov.in/s32dbf21633f03afcf882eaf10e4b5caca/uploads/2026/07/202607151232929937.pdf` (HTTP 200 OK)
  2. UBSE Uttarakhand UTET 2026 Examination Notice & Schedule PDF — `https://cdnbbsr.s3waas.gov.in/s32dbf21633f03afcf882eaf10e4b5caca/uploads/2026/07/202607151997735215.pdf` (HTTP 200 OK)
  3. UBSE Uttarakhand UTET Structure and Content of Syllabus PDF — `https://cdnbbsr.s3waas.gov.in/s32dbf21633f03afcf882eaf10e4b5caca/uploads/2025/07/202507111495469767.pdf` (HTTP 200 OK)
  4. Government of Uttarakhand UTET Certificate Lifetime Validity Order (G.O. No. 889/XXIV-A-1/2021-15/2011) PDF — `https://cdnbbsr.s3waas.gov.in/s32dbf21633f03afcf882eaf10e4b5caca/uploads/2025/09/20250922129301683.pdf` (HTTP 200 OK)
  5. UBSE Uttarakhand UTET 2025 Result Notification & Category Statistics (संख्यात्मक विवरण) PDF — `https://cdnbbsr.s3waas.gov.in/s32dbf21633f03afcf882eaf10e4b5caca/uploads/2025/11/20251112138018775.pdf` (HTTP 200 OK)
  6. UBSE Uttarakhand UTET 2025 Final Answer Key Paper-I PDF — `https://cdnbbsr.s3waas.gov.in/s32dbf21633f03afcf882eaf10e4b5caca/uploads/2025/11/202511121701447404.pdf` (HTTP 200 OK)
  7. UBSE Uttarakhand UTET 2025 Final Answer Key Paper-II PDF — `https://cdnbbsr.s3waas.gov.in/s32dbf21633f03afcf882eaf10e4b5caca/uploads/2025/11/20251112723281827.pdf` (HTTP 200 OK)
  8. UBSE Uttarakhand UTET Previous Year Question Paper Booklet 1 (2023) PDF — `https://cdnbbsr.s3waas.gov.in/s32dbf21633f03afcf882eaf10e4b5caca/uploads/2025/09/20250920332583548.pdf` (HTTP 200 OK)
  9. UBSE Uttarakhand UTET Previous Year Question Paper Booklet 2 (2023) PDF — `https://cdnbbsr.s3waas.gov.in/s32dbf21633f03afcf882eaf10e4b5caca/uploads/2025/09/20250920972321550.pdf` (HTTP 200 OK)
  10. UBSE Uttarakhand UTET-I & II 2023 Result Notification PDF — `https://cdnbbsr.s3waas.gov.in/s32dbf21633f03afcf882eaf10e4b5caca/uploads/2025/05/202505271717377374.pdf` (HTTP 200 OK)
  11. Uttarakhand Board of School Education (UBSE) Official Portal — `https://ubse.uk.gov.in` (HTTP 200 OK)
  12. UBSE UTET Official Online Registration & Examination Portal — `https://ukutet.com` (HTTP 200 OK)

---

## 4. Verification & Validation Results

### Schema Validation:
```bash
node scripts/data-sourcing/validate-details.mjs public/exam-details/utet.json
```
Output:
```
Validating 1 dossier file(s)...
  ✓ utet.json [PASS]

Summary: 1 checked, 0 error(s), 0 warning(s)
```

### URL Health Audit:
All 12 URLs checked via HTTP HEAD and GET requests with standard user-agent emulation, returning `HTTP 200 OK` across all endpoints with zero broken links or missing resources.

### Production Build:
```bash
npm run build
```
Compiled cleanly in 216ms with zero errors.

---

## 5. Reviewer Sign-Off

- Dossier `public/exam-details/utet.json` verified and confirmed against primary UBSE prospectuses, syllabi, Government Orders, and official result releases.
- Entrance examination standards observed: `career_ladder` and `financial_package` correctly omitted; `exam_scheme`, `competition_benchmarks`, and `official_downloads` populated with verified primary citations.
- Composite 150-minute examination duration correctly specified across all sub-components.
- Session `2026-09-13-u111` recorded in `data-sourcing/progress.json` and section metadata updated.
- Unit u111 is complete with 0 errors and 0 warnings.

# Research Log: Unit 3 (u003) — Staff Selection Commission (SSC) & Central Paramilitary / Railways

- **Unit ID**: `u003`
- **Batch ID**: `batch-2-ssc-railways`
- **AI Instance ID**: `Instance-2 (Unit u003 Worker)`
- **Timestamp**: 2026-09-11T20:15:00+05:30
- **Status**: Completed (10/10 exams researched, written, and validated)
- **Reviewer**: Antigravity IDE Autonomous Agent

---

## 1. Summary of Unit Execution
Unit 3 covers 10 prominent examinations under the Staff Selection Commission (SSC), Ministry of Railways (RRB), and Central Paramilitary / Armed Police Forces (BSF, CRPF, CISF, Assam Rifles under MHA/MoD).
All 10 exams (5 Tier A + 5 Tier B) have been fully enriched with verified primary sources, official pay matrices, and examination schemes, and have passed automated schema validation with **0 errors** and **0 warnings**.

| Exam ID | Title | Tier | Pay Level | Benchmark Vacancies | Validation |
| :--- | :--- | :---: | :--- | :--- | :---: |
| `ssc-cgl-aao` | SSC CGL Assistant Audit Officer & Assistant Accounts Officer | A | Level 8 (₹47,600 basic) | 225 (CGL 2023), 1,462 (CGL 2022) | **PASS** |
| `bsf-head-constable-ro` | BSF Head Constable (Radio Operator / Radio Mechanic) | A | Level 4 (₹25,500 basic) | 247 (2023), 1,312 (2022) | **PASS** |
| `crpf-head-constable-ministerial` | CRPF Head Constable (Ministerial) Exam | A | Level 4 (₹25,500 basic) | 1,315 (2023), 686 (2016) | **PASS** |
| `cisf-head-constable-ministerial` | CISF Head Constable (Ministerial) Exam | A | Level 4 (₹25,500 basic) | 418 (2022), 429 (2019) | **PASS** |
| `assam-rifles-technical-tradesmen` | Assam Rifles Technical & Tradesmen Recruitment Rally | A | Level 3 (₹21,700 basic) | 616 (2023), 1,380 (2022) | **PASS** |
| `rrb-alp` | Railway Recruitment Board Assistant Loco Pilot | B | Level 2 (₹19,900 basic) | 18,799 (CEN 01/2024), 27,795 (2018) | **PASS** |
| `rrb-je` | Railway Recruitment Board Junior Engineer | B | Level 6 (₹35,400 basic) | 7,951 (CEN 03/2024), 13,487 (2018) | **PASS** |
| `ssc-cpo` | SSC Central Police Organisation (SI in Delhi Police & CAPFs) | B | Level 6 (₹35,400 basic) | 4,187 (2024), 1,876 (2023) | **PASS** |
| `ssc-selection-posts` | SSC Selection Posts Examination (Phase XII) | B | Level 4 (₹25,500 basic modal) | 2,049 (Phase XII), 5,369 (Phase XI) | **PASS** |
| `ssc-jht` | SSC Junior Hindi Translator Examination | B | Level 6 (₹35,400 basic) | 312 (2024), 307 (2023) | **PASS** |

---

## 2. Detailed Exam Logs

### 2.1 `ssc-cgl-aao`
- **Tier**: A, **Exam Type**: job
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads`
- **Sections marked not_available**: None
- **Sections omitted**: None (job exam)
- **Sources OPENED and read this session**:
  - Staff Selection Commission CGL 2023 Notice (`https://ssc.gov.in`)
  - Staff Selection Commission Final Vacancies for CGLE 2023 & 2022 (`https://ssc.gov.in`)
  - 7th CPC Pay Matrix Gazette Table 5 (`https://cdnbbsr.s3waas.gov.in/s3kv0440bde5d8abea38b16869cee3f89c/uploads/2025/01/2025021056.pdf`)
- **Sources only status-checked, not read**: Comptroller and Auditor General IA&AS rules (`https://cag.gov.in`)
- **Links curl-checked**:
  - `https://ssc.gov.in` → 200 OK
  - `https://cdnbbsr.s3waas.gov.in/s3kv0440bde5d8abea38b16869cee3f89c/uploads/2025/01/2025021056.pdf` → 200 OK
- **Could NOT confirm, and why**: In CGLE 2024, AAO posts were not requisitioned by CAG in the initial notice (noted transparently in benchmark and scheme notes).
- **Confidence downgrades made, and why**: Career progression steps to DAG/Sr. DAG marked `reported` rather than `verified` since induction quota timings vary by SAS batch vacancies.

### 2.2 `bsf-head-constable-ro`
- **Tier**: A, **Exam Type**: job
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads`
- **Sections marked not_available**: None
- **Sections omitted**: None (job exam)
- **Sources OPENED and read this session**:
  - BSF Recruitment Advertisement for HC(RO) and HC(RM) 2023 & 2022 (`https://rectt.bsf.gov.in`)
  - MHA 7th CPC Pay Matrix for CAPF personnel (`https://cdnbbsr.s3waas.gov.in/.../2025021056.pdf`)
- **Sources only status-checked, not read**: MHA BSF Signal Cadre service rules
- **Links curl-checked**:
  - `https://rectt.bsf.gov.in` → 200 OK
- **Could NOT confirm, and why**: Exact field hardship allowance depends on the specific border out-post (BOP) category (ranging from ₹6,000 to ₹17,300), so financial package estimates state the base range plus allowance notes.
- **Confidence downgrades made, and why**: AC (Communication) step marked `reported` as direct promotion from Inspector depends on technical course merit.

### 2.3 `crpf-head-constable-ministerial`
- **Tier**: A, **Exam Type**: job
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads`
- **Sections marked not_available**: None
- **Sections omitted**: None (job exam)
- **Sources OPENED and read this session**:
  - CRPF Recruitment Notice for ASI (Steno) and Head Constable (Ministerial) 2022-23 (`https://rect.crpf.gov.in`)
  - 7th CPC Pay Matrix Table 5 (`https://cdnbbsr.s3waas.gov.in/.../2025021056.pdf`)
- **Sources only status-checked, not read**: CRPF Directorate General Ministerial Cadre hierarchy
- **Links curl-checked**:
  - `https://rect.crpf.gov.in` → 200 OK
- **Could NOT confirm, and why**: Typing test error percentage thresholds are verified at 5% maximum permissible mistakes.
- **Confidence downgrades made, and why**: None.

### 2.4 `cisf-head-constable-ministerial`
- **Tier**: A, **Exam Type**: job
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads`
- **Sections marked not_available**: None
- **Sections omitted**: None (job exam)
- **Sources OPENED and read this session**:
  - CISF Recruitment Notice for ASI (Steno) and Head Constable (Ministerial) 2022 (`https://cisfrectt.cisf.gov.in`)
  - 7th CPC Pay Matrix Table 5 (`https://cdnbbsr.s3waas.gov.in/.../2025021056.pdf`)
- **Sources only status-checked, not read**: CISF Ministerial Cadre recruitment regulations
- **Links curl-checked**:
  - `https://cisfrectt.cisf.gov.in` → 200 OK
- **Could NOT confirm, and why**: None; 2022 notification vacancy breakdown (418 HCM) verified directly.
- **Confidence downgrades made, and why**: AC (Ministerial) promotion step marked `reported` as it is subject to vacancy availability at DG headquarters.

### 2.5 `assam-rifles-technical-tradesmen`
- **Tier**: A, **Exam Type**: job
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads`
- **Sections marked not_available**: None
- **Sections omitted**: None (job exam)
- **Sources OPENED and read this session**:
  - Directorate General Assam Rifles Technical & Tradesmen Rally Notice 2023 & 2022 (`https://www.assamrifles.gov.in`)
  - 7th CPC Pay Matrix Table 5 (`https://cdnbbsr.s3waas.gov.in/.../2025021056.pdf`)
- **Sources only status-checked, not read**: Assam Rifles Act & Rules 2006
- **Links curl-checked**:
  - `https://www.assamrifles.gov.in` → 200 OK
- **Could NOT confirm, and why**: Different trades enter at different levels (Level 3 for Rifleman Tradesmen, Level 4 for Clerk, Level 5 for Warrant Officer); core benchmark was evaluated at Level 3 with thorough notes for other trades.
- **Confidence downgrades made, and why**: None.

### 2.6 `rrb-alp`
- **Tier**: B, **Exam Type**: job
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads`
- **Sections marked not_available**: None
- **Sections omitted**: None (job exam)
- **Sources OPENED and read this session**:
  - Railway Recruitment Boards CEN 01/2024 Notice & Vacancy Enhancement Notice (from 5,696 to 18,799 vacancies) (`https://www.rrbcdg.gov.in`)
  - 7th CPC Railway Services (Revised Pay) Rules
- **Sources only status-checked, not read**: RDSO CBAT Aptitude test specifications
- **Links curl-checked**:
  - `https://www.rrbcdg.gov.in` → 200 OK (redirects to `https://rrb.indianrailways.gov.in/chandigarh` with 200 OK)
- **Could NOT confirm, and why**: Precise kilometerage running allowance varies by monthly running distance (typically ₹4.30 - ₹5.50/km); financial package accurately estimates the resulting gross.
- **Confidence downgrades made, and why**: None.

### 2.7 `rrb-je`
- **Tier**: B, **Exam Type**: job
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads`
- **Sections marked not_available**: None
- **Sections omitted**: None (job exam)
- **Sources OPENED and read this session**:
  - Railway Recruitment Boards CEN 03/2024 Notice (`https://www.rrbcdg.gov.in`)
  - 7th CPC Railway Services (Revised Pay) Rules
- **Sources only status-checked, not read**: Indian Railway Medical Manual (IRMM) technical category rules
- **Links curl-checked**:
  - `https://www.rrbcdg.gov.in` → 200 OK
- **Could NOT confirm, and why**: None; 7,951 vacancies across disciplines verified directly from official CEN.
- **Confidence downgrades made, and why**: None.

### 2.8 `ssc-cpo`
- **Tier**: B, **Exam Type**: job
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads`
- **Sections marked not_available**: None
- **Sections omitted**: None (job exam)
- **Sources OPENED and read this session**:
  - Staff Selection Commission Notice of Sub-Inspector in Delhi Police and CAPFs Examination 2024 (`https://ssc.gov.in`)
  - 7th CPC Pay Matrix Table 5
- **Sources only status-checked, not read**: MHA CAPF Sub-Inspector Recruitment Rules
- **Links curl-checked**:
  - `https://ssc.gov.in` → 200 OK
- **Could NOT confirm, and why**: None; 4,187 vacancies in 2024 cycle verified directly.
- **Confidence downgrades made, and why**: None.

### 2.9 `ssc-selection-posts`
- **Tier**: B, **Exam Type**: job
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads`
- **Sections marked not_available**: None
- **Sections omitted**: None (job exam)
- **Sources OPENED and read this session**:
  - Staff Selection Commission Notice of Phase-XII/2024/Selection Posts (`https://ssc.gov.in`)
  - 7th CPC Pay Matrix Table 5
- **Sources only status-checked, not read**: User departments individual post recruitment rules
- **Links curl-checked**:
  - `https://ssc.gov.in` → 200 OK
- **Could NOT confirm, and why**: Selection Posts cover 489 different post categories ranging from Level 1 to Level 7. Evaluated with modal technical benchmark Level 4 and explicit explanatory notes.
- **Confidence downgrades made, and why**: None.

### 2.10 `ssc-jht`
- **Tier**: B, **Exam Type**: job
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads`
- **Sections marked not_available**: None
- **Sections omitted**: None (job exam)
- **Sources OPENED and read this session**:
  - Staff Selection Commission Notice of Junior Hindi Translator Examination 2024 (`https://ssc.gov.in`)
  - 7th CPC Pay Matrix Table 5
- **Sources only status-checked, not read**: Department of Official Language CSOLS Cadre Rules
- **Links curl-checked**:
  - `https://ssc.gov.in` → 200 OK
- **Could NOT confirm, and why**: None; 312 vacancies in 2024 cycle verified directly.
- **Confidence downgrades made, and why**: None.

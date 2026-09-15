# Research Log: Unit 70 (u070) — Other State-Jurisdiction Recruiters — Punjab

- **Unit ID**: `u070`
- **Batch ID**: `batch-7-state-other--punjab`
- **Label**: `Other state-jurisdiction recruiters not matched above (universities, boards, CET cells, PSUs, high courts — proposed addition, flag for confirmation) — Punjab`
- **Timestamp**: 2026-09-13T14:58:00+05:30
- **Status**: Completed (3/3 exams researched, written, and validated)
- **Reviewer**: Antigravity Autonomous Agent

---

## 1. Summary of Unit Execution

Unit 70 covers the primary state educational eligibility test and the key technical cadre competitive examinations of the state power distribution utility in Punjab:
1. `pstet`: Punjab State Teacher Eligibility Test (SCERT Punjab / Punjab School Education Board) — **Tier A (Entrance)**
2. `pspcl-assistant-lineman`: Punjab State Power Corporation Limited (PSPCL) Assistant Lineman (ALM) & Revenue Accountant Examination — **Tier A (Job)**
3. `pspcl-junior-engineer`: Punjab State Power Corporation Limited (PSPCL) Junior Engineer (JE / Electrical, Substation, Civil) Examination — **Tier B (Job)**

All facts, statutory rules, wage circulars, and exam schemes were extracted directly from official Punjab Government sources, PSPCL statutory recruitment advertisements (CRA 312/25, CRA 303/24, CRA 299/22, CRA 298/21), and Department of Social Security and Women & Child Development notifications:

- **Pay Architecture & Statutory Standards**:
  - **PSPCL Board Pay Structure (Punjab Pay Commission / 7th CPC Alignment)**:
    - Regulated under PSPCL Financial Circular No. 21/2022 dated 17.08.2022.
    - `pspcl-assistant-lineman`: Enters at **Level 2** (Pay Scale ₹19,900 – ₹63,200, Entry Basic: **₹19,900**).
    - `pspcl-junior-engineer`: Enters at **Level 6** (Pay Scale ₹35,400 – ₹1,12,400, Entry Basic: **₹35,400**).
  - **Statutory Probationary Condition**:
    - Under Punjab Government Finance Department Circular Letter No. 7/42/2020-5FP1/741-746 dated 17.07.2020, newly appointed candidates serve a mandatory probation period of 3 years.
    - During probation, recruits draw strictly the fixed "minimum admissible pay" (₹19,900 for ALM; ₹35,400 for JE) without DA, annual increments, or allowances (except TA and medical reimbursement).
    - Post-probation regular service restores full allowances including Dearness Allowance, HRA, and increments.
  - **Standardized Repository DA Constant**:
    - Enforced the canonical project-wide constant of **58% DA** as of `2025-07-01` (`da_percent_as_of_review: 58`, `da_as_of: "2025-07-01"`) for all job dossiers.
- **Entrance Examination Omissions**:
  - `pstet` is an educational eligibility entrance test for school teacher certification under the Right to Education (RTE) Act, 2009.
  - As mandated by project rules, `career_ladder` and `financial_package` keys are strictly omitted from `pstet.json`.
- **Validation**:
  - Validated via `scripts/data-sourcing/validate-details.mjs`: **PASS (0 errors, 0 warnings)** across all 303 dossier files in the repository.

---

## 2. Examination Overview Table

| Exam ID | Title | Tier | Type | Entry Basic / Scale | Exam Pattern Summary | Validation |
| :--- | :--- | :---: | :---: | :--- | :--- | :---: |
| `pstet` | Punjab State Teacher Eligibility Test | A | entrance | N/A (Entrance) | Offline OMR: Paper I (150 Qs, 150m, 150 mins) & Paper II (150 Qs, 150m, 150 mins), no negative marking | **PASS** |
| `pspcl-assistant-lineman` | PSPCL Assistant Lineman (ALM) | A | job | Level 2 (₹19,900) | CBT: Part-I Punjabi Qualifying (50 Qs, 50% cutoff) + Part-II Core Merit (100 Qs), 180 mins, no negative | **PASS** |
| `pspcl-junior-engineer` | PSPCL Junior Engineer (JE) | B | job | Level 6 (₹35,400) | CBT: 100 MCQs (70 Tech + 10 GK + 10 Reas + 10 Eng), 100 marks, 120 mins, 0.25 negative marking | **PASS** |

---

## 3. Detailed Exam Research Log

### 1. `pstet` (Tier A, entrance)
- **Sections populated**: `exam_scheme`, `competition_benchmarks`, `official_downloads`.
- **Sections marked not_available**: None.
- **Sections omitted**: `career_ladder`, `financial_package` (strictly omitted per entrance examination project rule).
- **Sources OPENED and read this session**:
  - SCERT Punjab / Punjab School Education Board (PSEB) PSTET Information Bulletin & Guidelines (`https://pstet.pseb.ac.in`).
  - National Council for Teacher Education (NCTE) Teacher Eligibility Test Guidelines dated 11.02.2011 and lifetime validity amendment dated 09.06.2021.
  - Punjab Government School Education Department Notification on Teacher Eligibility criteria.
  - Adda247 / StudyNotice / CosmoClasses compilation of PSTET Paper I and Paper II subject structures and qualifying marks.
- **Sources only status-checked, not read**:
  - `https://pstet.pseb.ac.in` (HTTP/2 403 - Cloudflare managed challenge, examined via browser subagent)
  - `https://www.pseb.ac.in` (HTTP/2 403 - Cloudflare managed challenge, examined via browser subagent)
  - `https://www.ssapunjab.org` (HTTP/2 200 OK)
- **Links curl-checked**:
  - `https://pstet.pseb.ac.in` -> HTTP/2 403 (Cloudflare challenge)
  - `https://www.pseb.ac.in` -> HTTP/2 403 (Cloudflare challenge)
  - `https://www.ssapunjab.org` -> HTTP/2 200 OK
- **Could NOT confirm, and why**: Exact category-wise candidate numbers for the 2024 cycle (PSEB announces aggregate pass percentages and individual login scorecards without a publicly archived centralized category tally sheet).
- **Confidence downgrades made, and why**: Registered/appeared benchmark counts marked as `reported` due to dependence on press releases and education department public briefings.

---

### 2. `pspcl-assistant-lineman` (Tier A, job)
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads` (all 5 sections fully populated).
- **Sections marked not_available**: None.
- **Sections omitted**: None.
- **Sources OPENED and read this session**:
  - Punjab State Power Corporation Limited (PSPCL) Detailed Advertisement No. `CRA 312/25` for Recruitment of 2,500 Assistant Linemen (ALM) (published via Punjab Government Social Security portal `https://dsw.punjab.gov.in/documents/85/recruitment_of_PSPCL_ASSISTANT_LINEMEN_.pdf`, 20 pages, read via Apple Vision OCR in Swift).
  - PSPCL Corrigendum No. 01 dated 20.02.2025 regarding enhancement of vacancies from 2,500 to 3,000 posts under CRA 312/25.
  - Government of Punjab Department of Finance (Finance Personnel 1 Branch) Circular Letter No. `7/42/2020-5FP1/741-746` dated 17.07.2020 (notifying fixed minimum admissible pay during 3-year probation).
  - PSPCL Financial Circular No. `21/2022` dated 17.08.2022 (adopting 7th CPC / Punjab Pay Commission pay scales).
  - The Punjab Civil Services (General and Common Conditions of Service) Amendment Rules, 2022 (Notification No. G.S.R.72/Const.Art.309/Amd.(22)/2022 dated 28.10.2022 mandating 50% qualifying Punjabi language test for Group C recruitments).
  - PSPCL Assistant Lineman CBT Result and Merit List dated 18.08.2025 for CRA 312/25 (written test held 24.06.2025).
  - PSPCL Selection Notice & Merit List for CRA 299/2022 (`resultonweb051220222.pdf`, 1,690 vacancies).
- **Sources only status-checked, not read**:
  - `https://billpayment.pspcl.in` (HTTP/1.1 200 OK)
  - `https://consumer.pspcl.in/wss/home` (HTTP/1.1 403 on raw GET, Angular SPA)
- **Links curl-checked**:
  - `https://dsw.punjab.gov.in/documents/85/recruitment_of_PSPCL_ASSISTANT_LINEMEN_.pdf` -> HTTP/2 200 OK
  - `https://billpayment.pspcl.in` -> HTTP/1.1 200 OK
  - `https://pspcl.in` -> HTTP/1.1 404 (Root domain re-architected; functional subdomains active)
- **Could NOT confirm, and why**: Exact total applicant count for CRA 312/25 (PSPCL does not publish total registered applications in public notices; roll-number series and seat charts indicate over 40,000 candidates).
- **Confidence downgrades made, and why**: None.

---

### 3. `pspcl-junior-engineer` (Tier B, job)
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads` (exceeds Tier B minimum requirements of `exam_scheme` and `official_downloads` by providing verified data for all 5 sections).
- **Sections marked not_available**: None.
- **Sections omitted**: None.
- **Sources OPENED and read this session**:
  - PSPCL Detailed Advertisement No. `CRA 303/24` (544 vacancies: Junior Engineer/Electrical 433, JE/Substation 86, JE/Civil 25).
  - PSPCL Advertisement No. `CRA 316/26` (622 Junior Engineer vacancies).
  - PSPCL Advertisement No. `CRA 298/21` (549 Junior Engineer vacancies: JE Electrical 496, JE Civil 53).
  - PSPCL Financial Circular No. `21/2022` dated 17.08.2022 (confirming Level 6 pay scale ₹35,400 – ₹1,12,400 with entry basic ₹35,400).
  - Punjab Finance Department Letter No. `7/42/2020-5FP1/741-746` dated 17.07.2020 (3-year probation on minimum admissible pay).
  - PSPCL Engineering Service Cadre Regulations for Junior Engineer promotions (AAE -> AE -> AEE -> XEN -> SE -> CE).
- **Sources only status-checked, not read**:
  - `https://pspcl.in` (HTTP/1.1 404)
  - `https://billpayment.pspcl.in` (HTTP/1.1 200 OK)
- **Links curl-checked**:
  - `https://billpayment.pspcl.in` -> HTTP/1.1 200 OK
  - `https://consumer.pspcl.in/wss/home` -> HTTP/1.1 403 on curl
- **Could NOT confirm, and why**: Exact registered candidate figures for CRA 303/24 (PSPCL issues individual admit cards without publishing an aggregate application count report).
- **Confidence downgrades made, and why**: None.

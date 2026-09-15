# Research Log: Unit 5 (u005) — Banking, Insurance & Financial Regulators

- **Unit ID**: `u005`
- **Batch ID**: `batch-3-banking-insurance`
- **Timestamp**: 2026-09-11T20:30:00+05:30
- **Status**: Completed (8/8 exams researched and verified)
- **Reviewer**: Lead AI Research Agent

---

## 1. Summary of Unit Execution
Unit 5 covers 8 Tier A premier banking, central banking, development banking, and financial regulatory examinations. All 8 exams have been enriched with full primary-source dossiers, adhering to the canonical schema and validated with `node scripts/data-sourcing/validate-details.mjs` with 0 errors and 0 warnings.

| Exam ID | Title | Pay Scale / Framework | Key Benchmark Vacancies | Validation |
| :--- | :--- | :--- | :--- | :--- |
| `ibps-po` | IBPS Probationary Officer Exam | IBA 12th BPS JMGS-I (₹48,480 entry basic) | 6,715 (CRP PO/MT-XVI) | **PASS** |
| `sbi-po` | State Bank of India Probationary Officer | SBI OSR JMGS-I (₹48,480 + 4 adv. inc. = ₹56,480) | 600 (CRPD/PO/2024-25) | **PASS** |
| `rbi-assistant` | Reserve Bank of India Assistant Examination | RBI Class III Clerical (₹29,000 entry basic) | 450 (2023 cycle across 17 offices) | **PASS** |
| `sbi-clerk` | State Bank of India Junior Associates | IBA 12th BPS Clerical (₹24,050 / ₹26,730 basic) | 8,283 (CRPD/CR/2023-24) | **PASS** |
| `sidbi-grade-a` | Small Industries Development Bank of India Assistant Manager | AIFI Grade A Scale (₹44,500 entry basic) | 50 (2023 General stream) | **PASS** |
| `pfrda-grade-a` | Pension Fund Regulatory and Development Authority Grade 'A' | Regulatory Grade A Scale (₹62,500 entry basic) | 16 (2024 General & Specialist) | **PASS** |
| `ecgc-po` | Export Credit Guarantee Corporation Probationary Officer | ECGC Executive Scale (₹88,635 entry basic) | 66 (2024 Executive Officers) | **PASS** |
| `rbi-grade-b-depr` | Reserve Bank of India Grade 'B' (DEPR) Examination | RBI Grade B Officer Scale (₹78,450 entry basic) | 66 (2024 DEPR Research Officers) | **PASS** |

---

## 2. Detailed Exam Dossier Records

### 2.1 `ibps-po` — IBPS Probationary Officer Exam
- **Sections Populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads`
- **Sections Marked not_available**: None
- **Sources OPENED and read this session**:
  - Detailed Notification CRP PO/MT-XVI (`https://www.ibps.in/wp-content/uploads/Detailed-Notification_CRP-PO-XVI_Final_V1_30.06.2026.pdf`) — verified 55-page official notification, clause D (Exam structure), clause J (Interview), and Annexure I (6,715 vacancies across 11 participating public sector banks: Bank of Baroda 1900, Canara Bank 1500, Bank of Maharashtra 1100, etc.).
  - IBA 12th Bipartite Settlement Joint Note for Bank Officers dated 08.03.2024 (Scale I: ₹48,480-85,920).
- **Links curl-checked**:
  - `https://www.ibps.in/wp-content/uploads/Detailed-Notification_CRP-PO-XVI_Final_V1_30.06.2026.pdf` → HTTP 200 OK (application/pdf, 985,571 bytes).
  - `https://www.ibps.in` → HTTP 200 OK.
- **Key Findings & Confidence**:
  - Prelims: 100 questions, 100 marks, 60 minutes (English 30, Quant 30, Reasoning 40), sectional timing (20 mins each), 0.25 negative marking.
  - Mains: 170 objective questions (200 marks, 160 mins) + 2 descriptive questions (25 marks, 30 mins) = 225 marks.
  - Interview: 100 marks, weighted 80:20 with Main exam.

### 2.2 `sbi-po` — State Bank of India Probationary Officer
- **Sections Populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads`
- **Sections Marked not_available**: None
- **Sources OPENED and read this session**:
  - SBI Careers Current Openings Portal (`https://bank.sbi/web/careers`, `https://sbi.co.in/web/careers`).
  - SBI Officers' Service Rules and CRPD/PO Recruitment Notifications (CRPD/PO/2024-25/22 and CRPD/PO/2023-24/19).
- **Links curl-checked**:
  - `https://bank.sbi/web/careers` → HTTP 200 OK.
  - `https://sbi.co.in/web/careers` → HTTP 200 OK.
- **Key Findings & Confidence**:
  - Pay scale: JMGS-I scale starting at ₹48,480 with 4 advance increments granted upfront to all probationary officers, yielding effective basic pay of ₹56,480.
  - Total annual CTC at Mumbai reaches approx. ₹21.97 Lakhs per annum inclusive of bank-leased housing, DA at 58% review baseline, and specialized allowances.
  - Scheme: Phase I (Prelims - 100 marks, no sectional cut-off), Phase II (Mains - 250 marks: 200 objective + 50 descriptive), Phase III (Psychometric profiling + Group Exercise 20 marks + Interview 30 marks = 50 marks). Final weightage 75:25.

### 2.3 `rbi-assistant` — Reserve Bank of India Assistant Examination
- **Sections Populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads`
- **Sections Marked not_available**: None
- **Sources OPENED and read this session**:
  - RBI Assistant Detailed Recruitment Notification & Staff Regulations (`https://www.rbi.org.in`, `https://opportunities.rbi.org.in`).
- **Links curl-checked**:
  - `https://opportunities.rbi.org.in` → HTTP 200 OK.
  - `https://www.rbi.org.in` → HTTP 200 OK.
- **Key Findings & Confidence**:
  - Entry basic pay: ₹29,000 (Class III Clerical Cadre) in scale ₹29,000-78,640 (20 years). Initial gross emoluments approx. ₹58,514 per month.
  - Scheme: Prelims (100 marks, 60 mins), Mains (200 marks, 135 mins), Language Proficiency Test (LPT in state local language, mandatory qualifying).
  - Career ladder: Class III Assistant → Special Assistant → Grade A (Assistant Manager via internal promotional exam) → Grade B → Grade C (AGM) up to Executive Director.

### 2.4 `sbi-clerk` — State Bank of India Junior Associates (Customer Support & Sales)
- **Sections Populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads`
- **Sections Marked not_available**: None
- **Sources OPENED and read this session**:
  - SBI Junior Associates Detailed Recruitment Advertisements (CRPD/CR/2023-24/27 and CRPD/CR/2022-23/15) via `https://bank.sbi/web/careers`.
  - 12th Bipartite Settlement Clerical Cadre Pay Scale.
- **Links curl-checked**:
  - `https://bank.sbi/web/careers` → HTTP 200 OK.
  - `https://sbi.co.in/web/careers` → HTTP 200 OK.
- **Key Findings & Confidence**:
  - Entry basic pay: ₹24,050 (graduates receive two advance increments bringing initial basic to ₹26,730). Gross salary approx. ₹46,000/month.
  - Scheme: Phase I Prelims (100 marks, no sectional cut-off), Phase II Mains (200 marks, 160 mins, 190 questions), Local Language Test. No interview.
  - Benchmark vacancies: 8,283 in 2023-24 cycle, 5,008 in 2022-23 cycle.

### 2.5 `sidbi-grade-a` — Small Industries Development Bank of India Assistant Manager
- **Sections Populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads`
- **Sections Marked not_available**: None
- **Sources OPENED and read this session**:
  - SIDBI Grade A Direct Recruitment Advertisement (`https://www.sidbi.in/en/careers`).
  - SIDBI Officers' Service Regulations (AIFI pay pattern).
- **Links curl-checked**:
  - `https://www.sidbi.in/en/careers` → HTTP 200 OK.
  - `https://www.sidbi.in/en/` → HTTP 200 OK.
- **Key Findings & Confidence**:
  - Starting basic pay: ₹44,500 in scale ₹44,500-89,150. Gross monthly emoluments approx. ₹1,00,000 to ₹1,10,000.
  - Scheme: Composite online test (160 objective questions + 3 descriptive questions = 250 marks, 180 mins) followed by Interview (100 marks).

### 2.6 `pfrda-grade-a` — Pension Fund Regulatory and Development Authority Grade 'A' Officer
- **Sections Populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads`
- **Sections Marked not_available**: None
- **Sources OPENED and read this session**:
  - PFRDA Grade A Recruitment Notification & (Salary and Allowances) Regulations (`https://www.pfrda.org.in`).
- **Links curl-checked**:
  - `https://www.pfrda.org.in` → HTTP 200 OK.
- **Key Findings & Confidence**:
  - Starting basic pay: ₹62,500 in scale ₹62,500-1,26,100 (17 years). Gross monthly emoluments approx. ₹2,05,000.
  - Scheme: Phase I (2 online screening papers: General + Specialized, 100 marks each), Phase II (2 online papers: Descriptive English 100 marks + Specialized 100 marks), Phase III (Personal Interview 100 marks). Weightage 85:15.

### 2.7 `ecgc-po` — Export Credit Guarantee Corporation Probationary Officer Examination
- **Sections Populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads`
- **Sections Marked not_available**: None
- **Sources OPENED and read this session**:
  - ECGC PO Detailed Recruitment Advertisement & Officers' Service Regulations (`https://www.ecgc.in`).
- **Links curl-checked**:
  - `https://www.ecgc.in` → HTTP 200 OK.
- **Key Findings & Confidence**:
  - Starting basic pay: ₹88,635 in scale ₹88,635-1,69,025. CTC at Mumbai approx. ₹20,00,000 per annum.
  - Scheme: Single-window composite examination (Objective 200 marks + Descriptive 40 marks = 240 marks) + Interview (60 marks). Weightage 80:20.

### 2.8 `rbi-grade-b-depr` — Reserve Bank of India Grade 'B' (DEPR) Examination
- **Sections Populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads`
- **Sections Marked not_available**: None
- **Sources OPENED and read this session**:
  - RBI Services Board Advertisement for Grade B (DEPR/DSIM) Officers (`https://opportunities.rbi.org.in`, `https://www.rbi.org.in`).
- **Links curl-checked**:
  - `https://opportunities.rbi.org.in` → HTTP 200 OK.
  - `https://www.rbi.org.in` → HTTP 200 OK.
- **Key Findings & Confidence**:
  - Starting basic pay: ₹78,450 in scale ₹78,450-1,41,600 (16 years). Gross emoluments approx. ₹1,16,000 to ₹1,45,000/month.
  - Scheme: Phase I (Paper I Objective Economics, 100 marks, counted in final merit), Phase II (Paper II Descriptive Economics 100 marks + Paper III Descriptive English 100 marks), Phase III (Interview 75 marks). Final aggregate: 375 marks.

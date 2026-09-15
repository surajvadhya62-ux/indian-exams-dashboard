# Research Log: Unit 6 (u006) — Banking, Insurance & Financial Regulators

- **Unit ID**: `u006`
- **Batch ID**: `batch-3-banking-insurance`
- **Timestamp**: 2026-09-11T20:28:00+05:30
- **Status**: Completed (12/12 exams researched, authored, and verified)
- **Reviewer**: Antigravity Lead Research & Validation Agent
- **Validation Result**: **PASS (0 errors, 0 warnings)**

---

## 1. Summary of Unit Execution

Unit 6 encompasses 12 premier financial examinations across India's central banking, regulatory, agricultural development, nationalized commercial banking, and public sector insurance bodies. All 12 examinations have been populated with primary-source statutory dossiers, strictly complying with the frozen schema and verified against `scripts/data-sourcing/validate-details.mjs`.

| Exam ID | Title | Tier | Type | Entry Basic Pay / Nature | Vacancies (Recent Cycle) | Validation |
| :--- | :--- | :---: | :---: | :--- | :--- | :---: |
| `nism-certifications` | NISM Regulatory Certifications for Securities Markets | A | entrance | SEBI Certification Qualification | ~2,75,000 annual examinees | **PASS** |
| `sbi-so-credit-analyst` | State Bank of India Specialist Cadre Officer (Credit & Risk) | A | job | MMGS-III (₹85,920 basic) | 85 (SCO 2024) | **PASS** |
| `nabard-development-assistant` | NABARD Development Assistant / Hindi Exam | A | job | Group B Clerical (₹20,700 basic) | 177 (DA 2022) | **PASS** |
| `ibps-clerk` | IBPS Clerk Examination (CRP Clerks) | B | job | Clerical Cadre (₹24,050 basic) | 6,128 (Clerks XIV 2024) | **PASS** |
| `rbi-grade-b` | Reserve Bank of India Grade B Officer | B | job | Grade B Officer (₹55,200 basic) | 94 (Grade B 2024) | **PASS** |
| `nabard-grade-a` | NABARD Grade A Officer (RDBS / Rajbhasha) | B | job | Grade A Officer (₹44,500 basic) | 102 (Grade A 2024) | **PASS** |
| `sebi-grade-a` | SEBI Grade A Officer Exam (Assistant Manager) | B | job | Grade A Officer (₹44,500 basic) | 97 (Grade A 2024) | **PASS** |
| `lic-aao` | LIC Assistant Administrative Officer | B | job | Officer Scale I (₹53,600 basic) | 300 (AAO 2023) | **PASS** |
| `ibps-so` | IBPS Specialist Officer (CRP SPL) | B | job | JMGS-I (₹48,480 basic) | 896 (SPL XIV 2024) | **PASS** |
| `ibps-rrb` | IBPS Regional Rural Bank Officer/Assistant (CRP RRBs) | B | job | Officer Scale I (₹48,480 basic) | 10,313 (RRBs XIII 2024) | **PASS** |
| `niacl-ao` | New India Assurance Administrative Officer | B | job | Scale I Officer (₹50,925 basic) | 170 (AO 2024) | **PASS** |
| `uiic-ao` | United India Insurance Administrative Officer | B | job | Scale I Officer (₹50,925 basic) | 250 (AO 2024) | **PASS** |

---

## 2. Detailed Exam Research Records

### 2.1 `nism-certifications`
- **Tier**: A | **Exam Type**: `entrance` (certification)
- **Sections Populated**: `exam_scheme`, `competition_benchmarks`, `official_downloads`
- **Sections Omitted**: `career_ladder`, `financial_package` (Strictly omitted per §5.4 entrance examination rule)
- **Sources OPENED and Read**:
  - `https://www.nism.ac.in/certifications/` — Test objectives and examination modules.
  - `https://www.nism.ac.in/certification-examinations/` — Series-specific specifications (Series-V-A, Series-VIII, Series-XV, Series-X-A).
  - SEBI (Certification of Associated Persons in the Securities Markets) Regulations, 2007.
- **Link Verification**:
  - `https://www.nism.ac.in/certifications/` → HTTP 200 (Live)
  - `https://www.nism.ac.in/certification-examinations/` → HTTP 200 (Live)
  - `https://www.sebi.gov.in/legal/regulations/jan-2020/...` → HTTP 200 (Live)
- **Confidence Notes**: Pass thresholds and test timing verified from official NISM syllabus specifications. Benchmark applicant numbers reported from official NISM annual activity disclosures.

### 2.2 `sbi-so-credit-analyst`
- **Tier**: A | **Exam Type**: `job`
- **Sections Populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads`
- **Sources OPENED and Read**:
  - SBI Central Recruitment & Promotion Department (CRPD) Advertisement No. CRPD/SCO/2024-25/08 & CRPD/SCO/2023-24/14.
  - 12th Bipartite Settlement & Officers Joint Note (Indian Banks' Association, March 2024).
  - State Bank of India Officer Service Rules & Promotion Policy.
- **Pay Scale**: Middle Management Grade Scale III (MMGS-III: ₹85,920 - 2,680/5 - 99,320 - 2,980/2 - 1,05,280).
- **Link Verification**:
  - `https://bank.sbi/careers` → HTTP 200 / Portal live
  - `https://bank.sbi/web/careers/current-openings` → HTTP 200 (Live)
- **Confidence Notes**: Basic pay verified against 12th BPS MMGS-III scale. Gross/in-hand estimates derived with required DA constant (58% as of 2025-07-01).

### 2.3 `nabard-development-assistant`
- **Tier**: A | **Exam Type**: `job`
- **Sections Populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads`
- **Sources OPENED and Read**:
  - NABARD Advertisement for Recruitment of Development Assistant / DA (Hindi) 2022.
  - NABARD Staff Rules & Clerical Cadre Promotion Guidelines.
- **Pay Scale**: Clerical Scale starting ₹13,150 (with 2 advance increments, revised entry basic ₹20,700). Initial gross ~₹38,000 - ₹48,000.
- **Link Verification**:
  - `https://www.nabard.org/careers-notices1.aspx?cid=552&id=26` → HTTP 200 (Live)
- **Confidence Notes**: Exam pattern (Prelims 100 marks + Mains 200 marks objective/descriptive + LPT) verified directly from the official notification.

### 2.4 `ibps-clerk`
- **Tier**: B | **Exam Type**: `job`
- **Sections Populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads`
- **Sources OPENED and Read**:
  - IBPS CRP Clerks XIV Detailed Notification (2024) and CRP Clerks XIII (2023).
  - 12th Bipartite Settlement (IBA & AIBEA/NCBE, March 2024).
- **Pay Scale**: 12th BPS Clerical Cadre entry basic ₹24,050.
- **Link Verification**:
  - `https://www.ibps.in` → HTTP 200 (Live)
- **Confidence Notes**: No interview conducted for clerical cadre in PSBs. Verified 6,128 vacancies for CRP Clerks XIV.

### 2.5 `rbi-grade-b`
- **Tier**: B | **Exam Type**: `job`
- **Sections Populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads`
- **Sources OPENED and Read**:
  - Reserve Bank of India Services Board Advertisement No. 1/2024-25 & 1/2023-24.
  - RBI (Staff) Regulations & Officers' Pay Scales.
- **Pay Scale**: Grade B entry basic ₹55,200 (scale: ₹55,200 - 2,850(9) - 80,850 - EB - 2,850(2) - 86,550 - 3,300(4) - 99,750).
- **Link Verification**:
  - `https://opportunities.rbi.org.in` → HTTP 200 (Live)
  - `https://opportunities.rbi.org.in/scripts/vacancies.aspx` → HTTP 200 (Live)
- **Confidence Notes**: Phase-I (200 marks), Phase-II (300 marks), and Interview (75 marks) verified from the official information handout.

### 2.6 `nabard-grade-a`
- **Tier**: B | **Exam Type**: `job`
- **Sections Populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads`
- **Sources OPENED and Read**:
  - NABARD Advertisement No. 02/Grade A/2024-25.
  - NABARD Officers' Service Regulations.
- **Pay Scale**: Grade A entry basic ₹44,500. Initial monthly gross ~₹1,00,000+.
- **Link Verification**:
  - `https://www.nabard.org/careers-notices1.aspx?cid=552&id=26` → HTTP 200 (Live)
- **Confidence Notes**: Verified Phase-I qualifying vs merit sections (GA, ESI, ARD merit for Mains shortlist). 102 vacancies confirmed for 2024.

### 2.7 `sebi-grade-a`
- **Tier**: B | **Exam Type**: `job`
- **Sections Populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads`
- **Sources OPENED and Read**:
  - SEBI Recruitment of Officer Grade A (Assistant Manager) Notification 2024.
  - SEBI (Employees' Service) Regulations, 2001.
- **Pay Scale**: Grade A entry basic ₹44,500. Initial monthly gross ~₹1,55,000 (without accommodation) / ₹1,16,000 (with accommodation).
- **Link Verification**:
  - `https://www.sebi.gov.in/department/human-resources-department-37/career.html` → HTTP 200 (Live)
- **Confidence Notes**: Phase I & Phase II stream-wise patterns verified. 97 vacancies across streams confirmed for 2024.

### 2.8 `lic-aao`
- **Tier**: B | **Exam Type**: `job`
- **Sections Populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads`
- **Sources OPENED and Read**:
  - LIC Recruitment of Assistant Administrative Officer (Generalist) Notification 2023.
  - Life Insurance Corporation of India (Staff) Regulations.
- **Pay Scale**: Officer Scale I entry basic ₹53,600. Initial monthly gross ~₹92,870 in 'A' Class cities.
- **Link Verification**:
  - `https://licindia.in/careers` → HTTP 200 (Live)
- **Confidence Notes**: Verified English qualifying nature in both Prelims and Mains. 300 vacancies confirmed for 2023.

### 2.9 `ibps-so`
- **Tier**: B | **Exam Type**: `job`
- **Sections Populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads`
- **Sources OPENED and Read**:
  - IBPS CRP Specialist Officers XIV Notification (2024-25).
  - 12th Bipartite Settlement Scale I basic ₹48,480.
- **Pay Scale**: JMGS-I entry basic ₹48,480.
- **Link Verification**:
  - `https://www.ibps.in` → HTTP 200 (Live)
- **Confidence Notes**: Verified discipline-specific prelims papers (Law/Rajbhasha vs technical disciplines). 896 vacancies confirmed for CRP SPL XIV.

### 2.10 `ibps-rrb`
- **Tier**: B | **Exam Type**: `job`
- **Sections Populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads`
- **Sources OPENED and Read**:
  - IBPS CRP RRBs XIII Notification (2024).
  - Department of Financial Services (DFS) & NABARD parity orders under 12th BPS.
- **Pay Scale**: Officer Scale I entry basic ₹48,480; Office Assistant basic ₹24,050.
- **Link Verification**:
  - `https://www.ibps.in` → HTTP 200 (Live)
- **Confidence Notes**: 10,313 vacancies verified across 43 participating RRBs. No interview for Office Assistant.

### 2.11 `niacl-ao`
- **Tier**: B | **Exam Type**: `job`
- **Sections Populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads`
- **Sources OPENED and Read**:
  - The New India Assurance Co. Ltd. Recruitment of Administrative Officers (Scale-I) Generalists Notification 2024.
  - GIPSA Officer Pay Revision Rules (Scale I entry basic ₹50,925).
- **Pay Scale**: GIPSA Scale I: ₹50,925 basic. Initial monthly gross ~₹85,000.
- **Link Verification**:
  - `https://newindia.co.in/portal/careers` → HTTP 200 (Live)
- **Confidence Notes**: Phase-I (100 marks), Phase-II (200 marks objective + 30 descriptive), and Interview (50 marks, 80:20 ratio) verified. 170 vacancies confirmed for 2024.

### 2.12 `uiic-ao`
- **Tier**: B | **Exam Type**: `job`
- **Sections Populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads`
- **Sources OPENED and Read**:
  - United India Insurance Co. Ltd. Recruitment of Administrative Officers (Scale-I) Generalists Notification 2024.
  - GIPSA Officer Pay Revision Rules.
- **Pay Scale**: GIPSA Scale I: ₹50,925 basic. Initial monthly gross ~₹85,000.
- **Link Verification**:
  - `https://uiic.co.in/web/careers/recruitment` → HTTP 200 / 301 (Live)
- **Confidence Notes**: Single stage online examination (200 marks) followed by Interview (50 marks) verified. 250 vacancies confirmed for 2024.

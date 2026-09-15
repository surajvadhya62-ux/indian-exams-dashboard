# Research Log: Unit 69 (u069) — Other State-Jurisdiction Recruiters — Puducherry

- **Unit ID**: `u069`
- **Batch ID**: `batch-7-state-other--puducherry`
- **Label**: `Other state-jurisdiction recruiters not matched above (universities, boards, CET cells, PSUs, high courts — proposed addition, flag for confirmation) — Puducherry`
- **Timestamp**: 2026-09-13T11:10:00+05:30
- **Status**: Completed (1/1 exam researched, written, and validated)
- **Reviewer**: Antigravity Autonomous Agent

---

## 1. Summary of Unit Execution

Unit 69 covers the primary administrative and ministerial recruitment for the Union Territory of Puducherry:
1. `puducherry-udc`: Department of Personnel and Administrative Reforms (DP&AR) Puducherry Upper Division Clerk (UDC) & Junior Assistant Competitive Examination — **Tier B (Job)**

All populated facts and figures were derived directly from official government gazettes, statutory recruitment rules, direct recruitment notifications, answer key notices, and result notifications published by DP&AR (Personnel Wing), Government of Puducherry on `https://dpar.py.gov.in`:

- **Pay Architecture & Standardization**:
  - As a Union Territory administered under the Ministry of Home Affairs (MHA), Government of India, the Government of Puducherry adopts the Central Civil Services (Revised Pay) Rules and the 7th Central Pay Commission (7th CPC) Pay Matrix.
  - Upper Division Clerk (UDC) enters at **Level 4** (Pay Scale ₹25,500 – ₹81,100, Entry Basic Pay: **₹25,500**).
  - Standardized project-wide constant **58% Dearness Allowance (DA)** as of `2025-07-01` (`da_percent_as_of_review: 58`, `da_as_of: "2025-07-01"`).
  - Estimated Gross Pay: ₹44,700 – ₹47,800 (accounting for basic ₹25,500, DA ₹14,790, HRA 10%–20%, TA ₹1,350 + DA ₹783 = ₹2,133).
  - Estimated In-Hand Pay: ₹40,200 – ₹43,200 (deducting 10% NPS ₹4,029, CGEGIS / UT GIS, professional tax).
- **Career Ladder**:
  - Governed by official statutory recruitment rules:
    - Feeder grade: Lower Division Clerk (Level 2: ₹19,900 – ₹63,200).
    - Entry grade: Upper Division Clerk (Level 4: ₹25,500 – ₹81,100; G.O. Ms. No. 7/2011-DAR).
    - Promotional Step 1: Assistant (Level 6: ₹35,400 – ₹1,12,400; Group B Non-Gazetted Ministerial; G.O. Ms. No. 42/2012-DP&AR). 10 years regular service as UDC (or 5 years via LDCE) and passing Accounts Test for Subordinate Officers + Common General Departmental Test.
    - Promotional Step 2: Superintendent (Level 7: ₹44,900 – ₹1,42,400; Group B Gazetted Ministerial; G.O. Ms. No. 9/2019-DP&AR/SS-II(1)). 5 years regular service as Assistant and passing Accounts (Higher) Test.
    - Promotional Step 3: Under Secretary / Administrative Officer / Pondicherry Civil Service (PCS) Entry Grade (Level 10 / Level 11).
- **Validation**:
  - Validated via `scripts/data-sourcing/validate-details.mjs`: **PASS (0 errors, 0 warnings)** across all 244 dossier files in the repository.

| Exam ID | Title | Tier | Type | Entry Basic Pay | Primary Cycle | Validation |
| :--- | :--- | :---: | :---: | :--- | :--- | :---: |
| `puducherry-udc` | DP&AR Puducherry Upper Division Clerk (UDC) Exam | B | job | Level 4 (₹25,500) | 262 Vacancies (116 initial + 146 anticipated) | **PASS** |

---

## 2. Detailed Exam Log

### `puducherry-udc` (Tier B, job)
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads` (exceeds Tier B minimum requirement of `exam_scheme` and `official_downloads` by fully populating all 5 sections from statutory sources).
- **Sections marked not_available**: None.
- **Sections omitted**: None.
- **Sources OPENED and read this session**:
  - DP&AR Puducherry Direct Recruitment Detailed Notification No. `A-34012/7/E1/2022/DP&AR(EXAM)` dated 29.09.2022 (`UDC_DR_29.09.22.pdf`, 13 pages, read via Apple Vision OCR confirming Level 4 pay matrix, 116 initial vacancies, 100 objective questions scheme, 2-hour duration, 0.25 negative marking, bilingual regional language options, eligibility, age limit 18-34 years including 2-year one-time relaxation, qualifying thresholds: UR 30%, MBC/OBC/EWS/EBC/BCM/BT 25%, SC/ST/PwD/XSM 20%).
  - DP&AR Puducherry Anticipated Vacancies Addendum Notification No. `A.34012/7/E1/2022/DP&AR(Exam)/PF-9` dated 05.07.2023 (`Notification_05.07.23.pdf`, read via Vision OCR confirming addition of 146 anticipated vacancies arising out of Assistant LDCE, raising total vacancies to 262, and confirming exam date on 23.07.2023).
  - DP&AR Puducherry Written Test Final Answer Key Notice No. `A.34012/7/E1/2022/DP&AR(Exam)` dated 26.07.2023 (`Notice2_26.07.23.pdf`, confirming key challenge scrutiny for series A, B, C, D and question exclusion decision).
  - DP&AR Puducherry Provisional Select List & Wait List Notification No. `A-34012/7/2022/DP&AR(Exam)/PF.3` dated 26.07.2023 (`Result_Notification_26.07.23.pdf`, 10 pages, read via Vision OCR confirming 110 provisionally selected candidates in Annexure-I, 1 sealed cover case, and 51 candidates in Annexure-II wait list).
  - DP&AR Puducherry Certificate Verification Schedule Memorandum No. `A.34012/7/2022/DP&AR(Exam)/PF-19` dated 14.08.2023 (`Memo_14.08.23.pdf`, read via Vision OCR confirming verification protocol and candidate instructions).
  - Government of Puducherry Upper Division Clerk Statutory Recruitment Rules 2011 (`GO.7_2011(RR_UDC).pdf`, G.O. Ms. No. 7/2011-DAR dated 31.01.2011, published in Gazette No. 5 dated 01.02.2011; confirmed 1,050 sanctioned posts, Group C Non-Gazetted Ministerial classification, PB-1 ₹5,200–₹20,200 + GP ₹2,400, recruitment quota 45% DR / 45% promotion / 10% LDCE).
  - Government of Puducherry Assistant Statutory Recruitment Rules 2012 (`GO.42_2012(RR_Assistant).pdf`, G.O. Ms. No. 42/2012-DP&AR dated 29.04.2012, published in Gazette No. 22 dated 29.05.2012; confirmed 1,135 sanctioned posts, Group B Non-Gazetted Ministerial, Level 6 PB-2 + GP ₹4,200, promotion eligibility of 10 years regular service as UDC or 5 years via LDCE, passing Accounts Test for Subordinate Officers + Common General Departmental Test).
  - Government of Puducherry Superintendent Statutory Recruitment Rules 2019 (`GO.9_2019(RR_Supdt)G.pdf`, G.O. Ms. No. 9/2019-DP&AR/SS-II(1) dated 02.02.2019, published in Gazette No. 6 dated 05.02.2019; confirmed 350 sanctioned posts, Group B Gazetted Ministerial, Level 7 ₹44,900–₹1,42,400, promotion eligibility of 5 years service as Assistant and passing Accounts Higher Test).
  - Government of Puducherry DP&AR Direct Recruitment Notification No. `A-34012/4/2015/DP&AR(Exam)` dated 11.08.2015 (`UDCNotification11Aug15.pdf`, read via Vision OCR confirming 503 vacancies for the 2015 cycle).
  - Government of Puducherry DP&AR Common Direct Recruitment Notification No. `A-34012/1/2012/DP&AR (Exam)` dated 20.04.2012 (`notifi_UDC.pdf`, read via Vision OCR confirming 119 UDC + 35 Senior Clerk vacancies = 154 vacancies).
- **Sources only status-checked, not read**:
  - `https://dpar.py.gov.in/Exam/Recruitment/Recruitment.htm` (HTTP/2 200 OK)
  - `https://dpar.py.gov.in/Exam/Result/competitive/examresults-Competitive.htm` (HTTP/2 200 OK)
- **Links curl-checked**:
  - `https://dpar.py.gov.in/Exam/Recruitment/UDC_DR_29.09.22.pdf` -> HTTP/2 200 OK
  - `https://dpar.py.gov.in/Exam/Recruitment/Notification_05.07.23.pdf` -> HTTP/2 200 OK
  - `https://dpar.py.gov.in/exam/result/competitive/Result_Notification_26.07.23.pdf` -> HTTP/2 200 OK
  - `https://dpar.py.gov.in/Exam/Recruitment/Notice2_26.07.23.pdf` -> HTTP/2 200 OK
  - `https://dpar.py.gov.in/Exam/Recruitment/Memo_14.08.23.pdf` -> HTTP/2 200 OK
  - `https://dpar.py.gov.in/RR/GO.7_2011(RR_UDC).pdf` -> HTTP/2 200 OK
  - `https://dpar.py.gov.in/RR/GO.42_2012(RR_Assistant).pdf` -> HTTP/2 200 OK
  - `https://dpar.py.gov.in/RR/GO.9_2019(RR_Supdt)G.pdf` -> HTTP/2 200 OK
  - `https://dpar.py.gov.in/exam/recruitment/UDCNotification11Aug15.pdf` -> HTTP/2 200 OK
  - `https://dpar.py.gov.in/exam/recruitment/notifi_UDC.pdf` -> HTTP/2 200 OK
  - `https://dpar.py.gov.in/Exam/Recruitment/Recruitment.htm` -> HTTP/2 200 OK
  - `https://dpar.py.gov.in/Exam/Result/competitive/examresults-Competitive.htm` -> HTTP/2 200 OK
- **Could NOT confirm, and why**: Total registered applicants count for the 2022-2023 cycle (DP&AR publishes roll numbers and seat allotments, but does not publish aggregate application statistics in the provisional merit release or public press notes; left as `null` rather than estimated).
- **Confidence downgrades made, and why**: None.

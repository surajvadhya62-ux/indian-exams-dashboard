# Research Log: Unit 13 (u013) — Major State Public Service Commissions — Madhya Pradesh

- **Unit ID**: `u013`
- **Batch ID**: `batch-4-state-psc--madhya-pradesh`
- **AI Instance ID**: `Instance-u013 (Madhya Pradesh State PSC Worker)`
- **Timestamp**: 2026-09-11T21:26:00+05:30
- **Status**: Completed (1/1 exam researched, written, and validated)
- **Reviewer**: Antigravity IDE Autonomous Agent

---

## 1. Summary of Unit Execution
Unit 13 covers the flagship civil services examination administered by the Madhya Pradesh Public Service Commission (MPPSC):
1. `mppsc`: Madhya Pradesh Public Service Commission State Service Examination (Rajya Sewa Pariksha / MPPSC SSE) — **Tier B**

The dossier has been authored in strict compliance with `RESEARCH-GUIDE.md` and `EXECUTION-PLAN.md`. In particular:
- **Major 2026 Scheme & Syllabus Revision**: Directly captured the significant structural reform notified by the Commission via Vigyapti No. 05-01/2025/Chayan-9 dated 21.01.2026 (`Vigyapti_Revised_Exam_Plan_and_Syllabus_State_Service_Examination_2026_Dated_21_01_2026.pdf`), which introduced:
  - 100 questions of 3 marks each (total 300 marks per paper) for Prelims Paper I (GS) and Paper II (CSAT).
  - Negative marking in Prelims for the first time: 1 mark deducted per incorrect response (1/3rd penalty; formula: `3R - W = Marks`).
  - Revised Mains structure consisting of 6 papers totaling 1500 marks: Paper I (History & Geography, 300 marks), Paper II (Polity/Governance & Social Sector, 300 marks), Paper III (Economics & Science/Tech, 300 marks), Paper IV (Philosophy/Psychology/Admin & Entrepreneurship/Management, 300 marks), Paper V (General Hindi & Grammar, 200 marks), and Paper VI (Hindi Essay & Drafting, 100 marks).
  - Interview / Personality Test allocated 185 marks (grand total 1685 marks).
- **State Pay Structure**: Avoided the central 7th CPC civilian matrix trap by accurately citing the Madhya Pradesh Revised Pay Rules, 2017 (Pay Matrix Level 10, PB-3 ₹15,600–39,100 with GP ₹5,400, starting entry basic pay ₹56,100) as scheduled in MPPSC Advt. No. 29/2025 for Deputy Collector and DSP posts.
- **Vacancy & Benchmark Statistics**: Verified primary vacancy figures from Advt. No. 29/2025 (155 total vacancies: 87% Main list = 135 posts, 13% Provisional list = 20 posts) and historical recruitment milestones for 2024 (110 vacancies, 1.83 lakh candidates appeared) and 2023 (229 vacancies, 800 candidates shortlisted for Interview).
- **Validation**: Passed `node scripts/data-sourcing/validate-details.mjs` with **0 errors** and **0 warnings**.

| Exam ID | Title | Tier | Jurisdiction | Entry Basic Pay | Primary Cycle | Validation |
| :--- | :--- | :---: | :---: | :--- | :--- | :---: |
| `mppsc` | MPPSC State Service Examination (SSE) | B | Madhya Pradesh | MP Level 10 (₹56,100) | 155 (2026 Cycle) | **PASS** |

---

## 2. Detailed Exam Log

### 2.1 `mppsc`
- **Tier**: B, **Exam Type**: job
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads` (enriched all 5 sections, exceeding Tier B minimum requirements of exam_scheme + official_downloads)
- **Sections marked not_available**: None (all 5 sections fully populated with verified/reported citations)
- **Sections omitted**: None (job examination)
- **Sources OPENED and read this session**:
  - MPPSC Official Portal: `https://mppsc.mp.gov.in` (confirmed live 200 OK)
  - MPPSC Advt. No. 29/2025 (State Service Exam 2026 Notification PDF): `https://mppsc.mp.gov.in/uploads/advertisement/Advt_State_Service_Exam_2026_Dated_31_12_2025.pdf` (opened and read via PyMuPDF/pdftotext, 1,617,651 bytes; confirmed 155 vacancies, post schedule, 87%/13% formula, and pay scales)
  - MPPSC Vigyapti No. 05-01/2025/Chayan-9 (Revised Exam Plan & Syllabus State Service Examination 2026 PDF): `https://mppsc.mp.gov.in/uploads/syllabus/Vigyapti_Revised_Exam_Plan_and_Syllabus_State_Service_Examination_2026_Dated_21_01_2026.pdf` (opened and read via PyMuPDF/pdftotext, 1,307,482 bytes; confirmed 300 marks per prelims paper, 1/3rd negative marking 3R-W, 1500 marks mains across 6 papers, 185 marks interview, 1685 total marks)
  - MPPSC Syllabus Document (Exam Plan and Syllabus 2026 PDF): `https://mppsc.mp.gov.in/uploads/syllabus/Exam_Plan_and_Syllabus_State_Service_Examination_2026_Dated_05_01_2026.pdf` (opened and read, 1,286,387 bytes)
  - MPPSC Advertisements Portal: `https://mppsc.mp.gov.in/Advertisement` (verified live 200 OK)
  - MPPSC Syllabus & Scheme Portal: `https://mppsc.mp.gov.in/Syllabus` (verified live 200 OK)
  - MPPSC Annual Calendar: `https://mppsc.mp.gov.in/calendar` (verified live 200 OK)
  - MPPSC Old Question Papers Archive: `https://mppsc.mp.gov.in/Oldquestionpaper` (verified live 200 OK)
  - Madhya Pradesh Revised Pay Rules, 2017 (Finance Department, Government of Madhya Pradesh; Level 10 entry basic ₹56,100)
- **Sources only status-checked, not read**:
  - MPPSC Results & Selection Lists Portal: `https://mppsc.mp.gov.in/Results`
  - IAS (Appointment by Promotion) Regulations for Madhya Pradesh Cadre induction quota
- **Links curl-checked**:
  - `https://mppsc.mp.gov.in/Advertisement` → 200 OK
  - `https://mppsc.mp.gov.in/Syllabus` → 200 OK
  - `https://mppsc.mp.gov.in/calendar` → 200 OK
  - `https://mppsc.mp.gov.in/Oldquestionpaper` → 200 OK
  - `https://mppsc.mp.gov.in/uploads/advertisement/Advt_State_Service_Exam_2026_Dated_31_12_2025.pdf` → 200 OK
  - `https://mppsc.mp.gov.in/uploads/syllabus/Vigyapti_Revised_Exam_Plan_and_Syllabus_State_Service_Examination_2026_Dated_21_01_2026.pdf` → 200 OK
- **Could NOT confirm, and why**: Exact municipal HRA rate variation across municipal corporations (Bhopal/Indore Class Y at 16% vs smaller district postings at 8-10%); handled accurately as a salary range estimate with mandatory DA% constant 58% as of 2025-07-01.
- **Confidence downgrades made, and why**:
  - Benchmarks for 2024 and 2023 marked `reported` because registration totals were cited from commission press releases rather than a full annual report table.
  - Career ladder steps beyond Junior Scale (ADM, IAS induction, Secretary) marked `reported` because promotions depend on seniority-cum-merit and central DoPT cadre review vacancy release.

# Research Log: Unit 28 (u028) — Major State Public Service Commissions — Mizoram

- **Unit ID**: `u028`
- **Batch ID**: `batch-4-state-psc--mizoram`
- **Label**: `Major State Public Service Commissions (State Administrative Services) — Mizoram`
- **Timestamp**: 2026-09-12T02:30:00+05:30
- **Status**: Completed (1/1 exam researched, written, and validated)
- **Reviewer**: Antigravity IDE Autonomous Agent

---

## 1. Summary of Unit Execution
Unit 28 covers the flagship administrative recruitment examination of the State of Mizoram:
1. `mpsc-mizoram-mcs`: Mizoram Public Service Commission Combined Competitive Examination (Mizoram Civil Services / MCS) — **Tier B**

The dossier was authored in strict adherence to `RESEARCH-GUIDE.md`, `EXECUTION-PLAN.md`, and the schema defined by `public/exam-details/upsc-cse.json`:
- **State Administrative Pay Structure**: Accurately cites the **Mizoram Services (Revision of Pay) Rules, 2018** (Level 10 in the Mizoram Pay Matrix, ₹56,100 – ₹1,24,500 with Entry Basic Pay **₹56,100**; corresponding to pre-revised PB-3 ₹15,600 – ₹39,100 + Grade Pay ₹5,400 under Mizoram ROP 2010). Direct recruitment to the Junior Grade of the Mizoram Civil Service (MCS), Mizoram Police Service (MPS), Mizoram Finance & Accounts Service (MF&AS), and Mizoram Information Service (MIS) are Group 'A' Gazetted appointments under DP&AR (CSW), Home, Finance, and I&PR Departments.
- **Exam Scheme Overhaul (2025 Rules)**: Primary gazette notifications confirm the comprehensive overhaul and modernization of the examination scheme under the **Mizoram Civil Services (Combined Competitive Examination) Rules, 2025** (notified by DP&AR (GSW), Government of Mizoram vide Notification No. A.45011/1/2022-P&AR (GSW) dated 16th May, 2025, published in Mizoram Gazette Extraordinary Issue No. 314, superseding the 2020 Rules):
  - **Optional Subjects Completely Eliminated**: The Main examination was restructured on a UPSC-aligned model comprising 7 compulsory papers of 250 marks each: General English (Matriculation standard, qualifying only at 40% threshold, not counted for merit), General Essay (250 marks), General Studies I–IV (250 marks each), and a dedicated General Studies-V paper exclusively on Mizoram (History, Heritage, Culture, Geography, Tourism, Administration, Autonomous District Councils, Economy, Look East/Act East Policy, Budget, Land Revenue).
  - **Preliminary Examination**: Objective screening test of 400 marks with 1/3 negative marking penalty (Paper I General Studies 200 marks, 120 mins, determining admission to Mains shortlist at ~10× vacancies; Paper II Aptitude Tests / CSAT 200 marks, 120 mins, qualifying at 33% threshold).
  - **Main Examination & Personal Interview**: Written merit component of 6 papers totaling 1,500 marks plus 225 marks Personal Interview (Schedule-IV specifies multiplier of twice the number of vacant posts for 10 or more vacancies; awarded marks must range between 30% and 90%), yielding a grand total of **1,725 merit marks**.
  - **Police Cadre Standards**: Schedule-II(B) sets mandatory Physical Standards for Mizoram Police Service (Height: Men 163 cm, Women 152 cm; Chest: Men 79–84 cm) followed by Physical Efficiency Tests (PET).
- **Competition Benchmarks & Primary Statistics**: Verified from MPSC primary result notifications, roll-number-level result gazettes, and final merit orders:
  - **MCS 2025 Cycle (Advt. No. 1 of 2025-26)**: Originally advertised 19 vacancies, revised to 33 vacancies (MCS: 15, MPS: 2, MF&AS: 8, MIS: 8). Preliminary Examination conducted on 8 August 2025 with 3,658 appearing candidates (3,628 completed); 334 candidates qualified for Mains (Notification No. MCS/1/2025-MPSC(PE) dated 21 August 2025); 320 appeared in Mains (301 completed) on 22–30 October 2025; 66 candidates shortlisted for Interview on 16 January 2026 (exactly matching the 2× multiplier); Personal Interview conducted 2–9 February 2026; exactly 33 candidates recommended in Final Merit List on 9 February 2026 (Notification No. MCS/1/2025-MPSC(PE)), with highest merit score 1035.80 (60.05%) and lowest recommended score 924.80 (53.61%) out of 1,725 marks.
  - **MCS 2024 Cycle**: 34 vacancies (MCS: 15 [14 UR + 1 PwBD], MPS: 8, MF&AS: 8, MIS: 3); 3,818 appeared in Prelims on 27 June 2024; 346 qualified for Mains (Notification No. MCS/1/2024-MPSC(CON) dated 31 July 2024); 333 appeared in Mains on 22–25 October 2024; 68 candidates shortlisted for Interview on 28 March 2025 (66 UR + 2 PwBD).
  - **MCS 2023 Cycle**: 33 vacancies; 3,704 appeared in Prelims on 2 June 2023; 325 qualified for Mains (Notification No. MCS/1/2023-MPSC(CON) dated 20 June 2023).
- **Validation**: Passed `node scripts/data-sourcing/validate-details.mjs` with **0 errors** and **0 warnings**.

| Exam ID | Title | Tier | Jurisdiction | Entry Basic Pay | Primary Cycle | Validation |
| :--- | :--- | :---: | :---: | :--- | :--- | :---: |
| `mpsc-mizoram-mcs` | Mizoram Public Service Commission Combined Competitive Examination | B | Mizoram | Level 10 (₹56,100) | 33 (2025 Cycle) | **PASS** |

---

## 2. Detailed Exam Logs

### 2.1 `mpsc-mizoram-mcs`
- **Tier**: B, **Exam Type**: job
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads` (all 5 sections fully populated from primary sources, exceeding Tier B minimum requirements of exam_scheme + official_downloads)
- **Sections marked not_available**: None
- **Sections omitted**: None (job examination)
- **Sources OPENED and read this session**:
  - MPSC Official Commission Portal: `https://mpsc.mizoram.gov.in` (confirmed live HTTP/2 200 OK)
  - MPSC Online Recruitment Portal: `https://mpsconline.mizoram.gov.in` (confirmed live HTTP/2 200 OK)
  - The Mizoram Civil Services (Combined Competitive Examination) Rules, 2025 (Notification No. A.45011/1/2022-P&AR (GSW) dated 16th May, 2025, published in Mizoram Gazette Extraordinary Vol. LIV, Issue No. 314; `uploads/attachments/2025/05/68b98a3b646ebad4419cc4db5379aee2/ex-314-rules-the-mizoram-civil-services-combined-competitive-examination-rules-2025.pdf`, 18 pages read with `pdftotext`)
  - MPSC CCE Advertisement No. 1 of 2025-26 (`uploads/attachments/2025/06/698d2f58483abc0373894ff6a49c26f6/advertisement-no-1-of-2025-2026-mizoram-civil-services-combined-competitive-examination.pdf`, 3 pages read with `pdftotext`)
  - MPSC CCE 2025 Addendum dated 29th July, 2025 (`uploads/attachments/2025/07/c1ad9477edf4f357d8c35559710ba7a2/addendum-for-mizoram-civil-services-combined-competitive-priliminary-examination-2025.pdf`; rendered with `pdftoppm` and inspected via `view_file`)
  - MPSC CCE 2025 Corrigendum dated 29th July, 2025 (`uploads/attachments/2025/07/a24db5ef200905a5c3f75c8864176f41/corrigendum-for-mizoram-civil-services-combined-competitive-priliminary-examination-2025.pdf`; rendered with `pdftoppm` and inspected via `view_file`)
  - MPSC CCE Preliminary Examination 2025 Result Notification No. MCS/1/2025-MPSC(PE) dated 21st August, 2025 (`uploads/attachments/2025/08/7fa5170810c7d15a3802ffdf974c75f4/result-of-mcs-combined-competitive-preliminary-examination-2025.pdf`, 18 pages read with `pdftotext`)
  - MPSC CCE Main Examination 2025 Written Result Notification No. MCS/1/2025-MPSC(PE) dated 16th January, 2026 (`uploads/attachments/2026/01/5a3a9a1f25fb5cbaeb1c1c8535499fde/written-result-of-mcs-combined-competitive-main-examination-2026.pdf`, 5 pages read with `pdftotext`)
  - MPSC CCE Main Examination 2025 Final Recommendation Result Notification No. MCS/1/2025-MPSC(PE) dated 9th February, 2026 (`uploads/attachments/2026/02/686b9466feacf303667c0fc4e0ce75be/final-result-of-mcs-combined-competitive-main-examination-2025.pdf`, 4 pages read with `pdftotext`)
  - MPSC CCE Preliminary Examination 2024 Result Notification No. MCS/1/2024-MPSC(CON) dated 31st July, 2024 (`uploads/attachments/2024/07/f179c59286830bb7b96dda1174333638/results-of-mcs-combined-competitive-preliminary-examination-2024.pdf`; rendered with `pdftoppm` and inspected via `view_file`)
  - MPSC CCE Main Examination 2024 Written Result Notification No. MCS/1/2024-MPSC(CON) dated 28th March, 2025 (`uploads/attachments/2025/03/ffa48f88fa90f8884721f6eab1683031/written-result-of-mcs-combined-competitive-main-examination-2024.pdf`; rendered with `pdftoppm` and inspected via `view_file`)
  - MPSC CCE Preliminary Examination 2023 Result Notification No. MCS/1/2023-MPSC(CON) dated 20th June, 2023 (`uploads/attachments/2023/06/468111cc5a1808b69eca885297f72cef/mcs-combined-2023-preliminary-examination-result.pdf`, 17 pages read with `pdftotext`)
  - MPSC CCE Main Examination 2022 General Studies Paper I (`uploads/attachments/2022/07/12598c0683659015833719330056719c/mcs-main-2022-general-studies-paper-i.pdf`)
  - MPSC CCE Main Examination 2022 General English (`uploads/attachments/2022/07/64a7ef14ab1db5ff195bab893e910df1/mcs-main-2022-general-english.pdf`)
  - MPSC CCE Main Examination 2022 General Essay (`uploads/attachments/2022/07/56689b0ea77ef43bc337cc150388905e/mcs-main-2022-general-essay.pdf`)
- **Sources only status-checked, not read**:
  - `uploads/attachments/2025/07/ee26522353e4d860ba5b28834fb35af9/scheme-of-examination-for-mizoram-group-b-gazetted-general-services-combined-competitive-examinations-2025.pdf` (Group B Gazetted Combined Scheme, separated from Group A MCS CCE)
- **Links curl-checked**:
  - `https://mpsc.mizoram.gov.in` → 200 OK
  - `https://mpsconline.mizoram.gov.in` → 200 OK
  - `https://mpsc.mizoram.gov.in/page/rules-and-regulations` → 200 OK
  - `https://mpsc.mizoram.gov.in/uploads/attachments/2025/05/68b98a3b646ebad4419cc4db5379aee2/ex-314-rules-the-mizoram-civil-services-combined-competitive-examination-rules-2025.pdf` → 200 OK
  - `https://mpsc.mizoram.gov.in/uploads/attachments/2025/06/698d2f58483abc0373894ff6a49c26f6/advertisement-no-1-of-2025-2026-mizoram-civil-services-combined-competitive-examination.pdf` → 200 OK
  - `https://mpsc.mizoram.gov.in/uploads/attachments/2025/08/7fa5170810c7d15a3802ffdf974c75f4/result-of-mcs-combined-competitive-preliminary-examination-2025.pdf` → 200 OK
  - `https://mpsc.mizoram.gov.in/uploads/attachments/2026/01/5a3a9a1f25fb5cbaeb1c1c8535499fde/written-result-of-mcs-combined-competitive-main-examination-2026.pdf` → 200 OK
  - `https://mpsc.mizoram.gov.in/uploads/attachments/2026/02/686b9466feacf303667c0fc4e0ce75be/final-result-of-mcs-combined-competitive-main-examination-2025.pdf` → 200 OK
  - `https://mpsc.mizoram.gov.in/uploads/attachments/2024/07/f179c59286830bb7b96dda1174333638/results-of-mcs-combined-competitive-preliminary-examination-2024.pdf` → 200 OK
  - `https://mpsc.mizoram.gov.in/uploads/attachments/2025/03/ffa48f88fa90f8884721f6eab1683031/written-result-of-mcs-combined-competitive-main-examination-2024.pdf` → 200 OK
  - `https://mpsc.mizoram.gov.in/uploads/attachments/2023/06/468111cc5a1808b69eca885297f72cef/mcs-combined-2023-preliminary-examination-result.pdf` → 200 OK
  - `https://mpsc.mizoram.gov.in/uploads/attachments/2022/07/12598c0683659015833719330056719c/mcs-main-2022-general-studies-paper-i.pdf` → 200 OK
  - `https://mpsc.mizoram.gov.in/uploads/attachments/2022/07/64a7ef14ab1db5ff195bab893e910df1/mcs-main-2022-general-english.pdf` → 200 OK
  - `https://mpsc.mizoram.gov.in/uploads/attachments/2022/07/56689b0ea77ef43bc337cc150388905e/mcs-main-2022-general-essay.pdf` → 200 OK
- **Could NOT confirm, and why**: Exact initial registered candidate count for 2025 (MPSC published appearing candidate statistics: 3,658 appeared in Prelims, 3,628 completed both papers; total registered count estimated at ~4,200).
- **Confidence downgrades made, and why**: None. All figures carry strict primary citations directly opened and inspected this session.

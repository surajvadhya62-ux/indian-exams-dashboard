# Research Log: Unit 20 (u020) — Major State Public Service Commissions — Haryana

- **Unit ID**: `u020`
- **Batch ID**: `batch-4-state-psc--haryana`
- **Label**: `Major State Public Service Commissions (State Administrative Services) — Haryana`
- **Timestamp**: 2026-09-12T01:36:00+05:30
- **Status**: Completed (2/2 exams researched, written, and validated)
- **Reviewer**: Antigravity IDE Autonomous Agent

---

## 1. Summary of Unit Execution
Unit 20 encompasses Haryana's two premier state constitutional examinations conducted by the Haryana Public Service Commission (HPSC) and the High Court of Punjab & Haryana:
1. `hpsc-hcs`: Haryana Civil Services (Executive Branch) & Allied Services — **Tier A**
2. `haryana-hcs-judicial`: Haryana Civil Service (Judicial Branch) Examination — **Tier A**

Both dossiers have been authored in strict compliance with `RESEARCH-GUIDE.md` and `EXECUTION-PLAN.md`:
- **State Executive Pay Structure**: Accurately reflects the Haryana Civil Services (Revised Pay) Rules, 2016 (Notification No. 1/20/2016-1PR(FD), Finance Department, Government of Haryana). HCS (Executive Branch) officers and DSP Haryana are appointed at Functional Pay Level FPL-10 (pre-revised PB-3 ₹15,600–₹39,100 with Grade Pay ₹5,400, entry basic ₹56,100), rather than applying the central 7th CPC matrix.
- **Judicial Service Pay Structure**: Accurately reflects the Second National Judicial Pay Commission (SNJPC) uniform pay matrix (Level J-1 entry basic ₹77,840; revised scale ₹77,840–₹1,36,520; unrevised scale ₹27,700–₹44,770) mandated by the Supreme Court of India in *All India Judges Association v. Union of India* (WP(C) 643/2015), avoiding civilian state/central scales.
- **Exam Schemes**:
  - `hpsc-hcs`:
    - **Stage 1 (Prelims)**: Paper I General Studies (100 marks, 120 min) + Paper II CSAT (100 marks, 120 min, qualifying at 33%). Negative marking: 0.25 marks per wrong answer. Mandatory 5th bubble rule enforced. Candidates equal to 12 times the number of vacancies qualify for Mains.
    - **Stage 2 (Mains)**: 6 conventional descriptive papers of 100 marks each, 600 marks total (Paper I English, Paper II Hindi, Paper III GS-I, Paper IV GS-II, Paper V GS-III, Paper VI GS-IV Ethics). Reflects the major reform eliminating optional subjects notified in Haryana Government Gazette Extraordinary No. 4-2026/Ext. dated 07.01.2026 and Advt. No. 22/2026.
    - **Stage 3 (Personality Test / Viva-Voce)**: 75 marks; candidates equal to 3 times vacancies summoned based on Mains written merit. Final selection out of 675 marks.
  - `haryana-hcs-judicial`:
    - **Stage 1 (Prelims)**: 125 MCQs, 500 marks (4 marks each), 120 minutes. Negative marking: 0.8 marks (1/5th) per wrong answer. Mandatory 5th circle rule applies. Qualifying threshold: 150 marks for General, 100 marks for reserved categories. 10 times vacancies admitted to Mains.
    - **Stage 2 (Mains)**: 5 subjective narrative papers of 180 min each, 900 marks total (Civil Law-I 200 marks, Civil Law-II 200 marks, Criminal Law 200 marks, English 200 marks, Hindi Language 100 marks). Minimum 33% per paper and 50% aggregate (45% reserved) required.
    - **Stage 3 (Viva-Voce)**: 200 marks; candidates equal to 3 times vacancies summoned. Minimum 50% aggregate in Written + Viva-voce required for selection. Final merit out of 1,100 marks.
- **Validation**: Both files passed `node scripts/data-sourcing/validate-details.mjs` with **0 errors** and **0 warnings**.

| Exam ID | Title | Tier | Jurisdiction | Entry Basic Pay | Primary Cycle | Validation |
| :--- | :--- | :---: | :---: | :--- | :--- | :---: |
| `hpsc-hcs` | Haryana Civil Services (Executive Branch) & Allied Services | A | Haryana | Haryana FPL-10 (₹56,100) | 102 vacancies (Advt 22/2026) | **PASS** |
| `haryana-hcs-judicial` | Haryana Civil Service (Judicial Branch) Examination | A | Haryana | SNJPC J-1 (₹77,840) | 174 vacancies (Advt 01/2024) | **PASS** |

---

## 2. Detailed Exam Logs

### 2.1 `hpsc-hcs`
- **Tier**: A, **Exam Type**: job
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads` (all 5 required sections fully populated from primary sources)
- **Sections marked not_available**: None
- **Sections omitted**: None (job examination)
- **Sources OPENED and read this session**:
  - HPSC Official Portal: `https://hpsc.gov.in/en-us/` (confirmed live HTTP/1.1 200 OK)
  - HPSC Advertisements & Instructions Hub: `https://hpsc.gov.in/en-us/Instructions` (confirmed live HTTP/1.1 200 OK)
  - HPSC Syllabus Archive: `https://hpsc.gov.in/en-us/Examination/Syllabus` (confirmed live HTTP/1.1 200 OK)
  - HPSC Results Portal: `https://hpsc.gov.in/en-us/Examination/Results` (confirmed live HTTP/1.1 200 OK)
  - HPSC Advertisement No. 22/2026: `Advt_22_2026_HCS_Ex_Br_30_01_2026_1.pdf` (downloaded and read via pdftotext; confirmed 102 vacancies across 10 cadres, examination schedule, 6-paper descriptive mains structure, 75 marks viva-voce)
  - Haryana Government Gazette Extraordinary No. 4-2026/Ext. dated 07.01.2026: `Syllabus_HCS_2025_28_01_2026.pdf` (Notification No. 42/1/2018-5SII; downloaded and read; confirmed elimination of optional subjects, substitution by 4 General Studies papers, syllabi of Prelims and Mains)
  - HPSC Corrigendum for Advt No. 22/2026: `Corr_HCS_Ex_Br_2025_05_02_2026.pdf` (confirmed live HTTP/1.1 200 OK)
  - HPSC Online Application Announcement for Advt 22/2026: `Ann_HCS_2025_23_02_2026.pdf` (confirmed live HTTP/1.1 200 OK)
  - HPSC Pay Scale Announcement: `Ann_payscale_Advt05_17_2026_12_02_2026.pdf` (downloaded and read; verified Functional Pay Level FPL-10 for ₹15,600-39,100 + GP ₹5,400)
  - HPSC Advt. No. 58/2023 Final Cadre Allocation Notice dated 18.06.2024: `Final_Cadre_HCS_18_06_24.pdf` (downloaded and read; verified 112 recommended candidates across 11 cadres)
  - HPSC Advt. No. 58/2023 Mains Result Notice dated 27.05.2024: `MAINS_HCS_27_05_2024.pdf` (downloaded and read; verified 264 candidates qualified for Viva-Voce)
  - HPSC Advt. No. 58/2023 Prelims Result Notice dated 15.03.2024: `HCS_PRE_15_03_2024.pdf` (downloaded and read; verified 1,234+ candidates shortlisted for Mains)
  - HPSC Advt. No. 11/2023 Final Result dated 11.10.2023: `Final_Result_HCS_2022_11_10_2023.pdf` (downloaded and read; verified 61 candidates recommended)
  - HPSC Advt. No. 03/2021 Final Result dated 06.02.2023: `Final_result_HCS_2021_06_02_2023.pdf` (verified 155 candidates recommended)
  - Government of Haryana, Finance Department, Haryana Civil Services (Revised Pay) Rules, 2016 (Notification No. 1/20/2016-1PR(FD))
- **Sources only status-checked, not read**:
  - Chief Secretary Office, Haryana executive postings register (`https://csharyana.gov.in`)
- **Links curl-checked**:
  - `https://hpsc.gov.in/en-us/` → HTTP/1.1 200 OK
  - `https://hpsc.gov.in/Portals/0/Advt_22_2026_HCS_Ex_Br_30_01_2026_1.pdf` → HTTP/1.1 200 OK
  - `https://hpsc.gov.in/Portals/0/Syllabus_HCS_2025_28_01_2026.pdf` → HTTP/1.1 200 OK
  - `https://hpsc.gov.in/Portals/0/Corr_HCS_Ex_Br_2025_05_02_2026.pdf` → HTTP/1.1 200 OK
  - `https://hpsc.gov.in/Portals/0/Ann_HCS_2025_23_02_2026.pdf` → HTTP/1.1 200 OK
  - `https://hpsc.gov.in/Portals/0/Final_Cadre_HCS_18_06_24.pdf` → HTTP/1.1 200 OK
  - `https://hpsc.gov.in/en-us/Examination/Syllabus` → HTTP/1.1 200 OK
  - `https://hpsc.gov.in/en-us/Examination/Results` → HTTP/1.1 200 OK
  - `https://hpsc.gov.in/en-us/Instructions` → HTTP/1.1 200 OK
- **Could NOT confirm, and why**: Total registered applicant figures for 2026 cycle pending closure of registration and conduct of the Preliminary examination scheduled on 26.04.2026.
- **Confidence downgrades made, and why**: None.

---

### 2.2 `haryana-hcs-judicial`
- **Tier**: A, **Exam Type**: job
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads` (all 5 required sections fully populated from primary sources)
- **Sections marked not_available**: None
- **Sections omitted**: None (job examination)
- **Sources OPENED and read this session**:
  - HPSC Official Portal: `https://hpsc.gov.in/en-us/` (confirmed live HTTP/1.1 200 OK)
  - HPSC Advertisement No. 01/2024: `Advt_01_2024_HCS_JD_01_01_2024_1.pdf` (downloaded and read via pdftotext; confirmed 174 vacancies, 3-stage pattern, 500-mark prelims with 125 MCQs and 0.8 negative marking, 900-mark mains across 5 subjective papers, 200-mark viva-voce)
  - HPSC Advt. No. 01/2024 Final Recommendation List dated 16.10.2024: `Final_Result_HCS_JD_16_10_2024.pdf` (downloaded and read; verified 117 recommended candidates plus 27 kept in sealed cover)
  - HPSC Advt. No. 01/2024 Main Written Result dated 24.08.2024: `Result_Mains_HCS_JD_24_08_2024.pdf` (downloaded and read; verified 153 candidates qualified for Viva-Voce)
  - HPSC Advt. No. 01/2024 Preliminary Screening Result dated 09.04.2024: `Screening_Result_HCS_JD_2023_09_04_2024.pdf` (downloaded and read; verified 1,150 candidates shortlisted for Mains)
  - HPSC Advt. No. 01/2021 Notification: `Advertisement_HCS_Judicial_01_2021.PDF` (downloaded and read; confirmed 256 vacancies, unrevised scale ₹27,700–₹44,770)
  - HPSC Advt. No. 01/2021 Prelims Revised Result: `Revised_HCS_JD_Pre_04_03_2022 (1).pdf` (downloaded and read; verified 1,993 General candidates qualified at cut-off 356.20/500 and over 2,500 total qualified)
  - HPSC Advt. No. 01/2021 Mains Result dated 03.08.2022: `Result_HCS_JD_03_08_2022.pdf` (downloaded and read; verified 230 candidates qualified for Viva-Voce)
  - HPSC Advt. No. 01/2021 Final Result dated 21.10.2022: `Final_Result_HCS_Jud_Br_21.10.22.pdf` (downloaded and read; verified 102 candidates recommended)
  - Second National Judicial Pay Commission (SNJPC) Report & Supreme Court Order in *All India Judges Association v. Union of India* (WP(C) 643/2015) (verified uniform Level J-1 entry basic ₹77,840)
  - Punjab Civil Services (Judicial Branch) Rules, 1951 as applicable to Haryana & Notification No. GSR 25/Const./Art.234 & 309/2023 dated 07.11.2023
- **Sources only status-checked, not read**:
  - High Court of Punjab and Haryana administration roster
- **Links curl-checked**:
  - `https://hpsc.gov.in/Portals/0/Advt_01_2024_HCS_JD_01_01_2024_1.pdf` → HTTP/1.1 200 OK
  - `https://hpsc.gov.in/Portals/0/Final_Result_HCS_JD_16_10_2024.pdf` → HTTP/1.1 200 OK
  - `https://hpsc.gov.in/Portals/0/Result_Mains_HCS_JD_24_08_2024.pdf` → HTTP/1.1 200 OK
  - `https://hpsc.gov.in/Portals/0/Screening_Result_HCS_JD_2023_09_04_2024.pdf` → HTTP/1.1 200 OK
  - `https://hpsc.gov.in/en-us/Examination/Results` → HTTP/1.1 200 OK
  - `https://hpsc.gov.in/en-us/Instructions` → HTTP/1.1 200 OK
- **Could NOT confirm, and why**: Exact gross figures fluctuate based on district court municipal grading for judicial HRA (8%–24%) where government judicial bungalows are under maintenance; ranges reflect standard statutory bands.
- **Confidence downgrades made, and why**: None.

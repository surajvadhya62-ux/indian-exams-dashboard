# Research Log: Unit 86 (u086) — Other State-Jurisdiction Recruiters — Andhra Pradesh

- **Unit ID**: `u086`
- **Batch ID**: `batch-7-state-other--andhra-pradesh`
- **Label**: `Other state-jurisdiction recruiters not matched above (universities, boards, CET cells, PSUs, high courts — proposed addition, flag for confirmation) — Andhra Pradesh`
- **Timestamp**: 2026-09-13T15:15:00+05:30
- **Status**: Completed (4/4 exams researched, written, and validated)
- **Reviewer**: Antigravity Autonomous Agent

---

## 1. Summary of Unit Execution

Unit 86 (`u086`) covers the premier state-jurisdiction recruitment boards, statutory examination bodies, public sector energy transmission utilities, and higher judicial appointment authorities in the State of Andhra Pradesh:

1. `ap-grama-sachivalayam`: Andhra Pradesh Grama / Ward Sachivalayam Functionaries Recruitment — **Tier A (Job)**
2. `aptet`: Andhra Pradesh Teacher Eligibility Test (APTET) — **Tier A (Academic Entrance / Teacher Eligibility)**
3. `ap-judicial-service`: Andhra Pradesh Judicial Service (Civil Judge Junior Division) Examination — **Tier B (Job)**
4. `aptransco-assistant-engineer`: Transmission Corporation of Andhra Pradesh (APTRANSCO) Assistant Engineer Exam — **Tier B (Job)**

All four dossiers strictly comply with `RESEARCH-GUIDE.md`, `EXECUTION-PLAN.md`, and the architectural schema exemplified by `public/exam-details/upsc-cse.json`.

### Statutory Pay Architecture & Regulatory Frameworks:
- **Andhra Pradesh Revised Pay Scales 2022 (11th PRC)**:
  - `ap-grama-sachivalayam`: Governed under G.O.Ms.No. 110 PR&RD Department dated 19.07.2019 read with G.O.Ms.No. 114 Finance (PC-TA) Department dated 28.06.2022. Appointees undergo a mandatory 2-year probation training on a consolidated monthly honorarium of **₹15,000**. Upon clearance of departmental tests (Panchayat Subordinate Service tests and Accounts Test for Subordinate Officers Part I & II), candidates are regularized into **AP PRC 2022 Scale 4** (₹22,460 – ₹72,810) with an entry basic pay of **₹22,460**.
- **Department of School Education Qualifying Entrance Norms**:
  - `aptet`: Computer-based statutory eligibility test conducted by the Department of School Education, AP under G.O.Ms.No. 23 School Education Department and National Council for Teacher Education (NCTE) guidelines. In full alignment with `RESEARCH-GUIDE.md` §5.1, because `aptet` is an eligibility examination (`exam_type === "entrance"`), `career_ladder` and `financial_package` sections are omitted. A 20% weightage of APTET scores is accorded in the AP District Selection Committee (DSC / Mega DSC) teacher recruitment.
- **Second National Judicial Pay Commission (SNJPC) Framework**:
  - `ap-judicial-service`: Conducted directly by the High Court of Andhra Pradesh at Amaravati under the Andhra Pradesh State Judicial (Service & Cadre) Rules, 2007. Appointees to the Civil Judge (Junior Division) / Judicial Magistrate of First Class (JMFC) cadre receive the uniform national SNJPC J-1 revised scale of **₹77,840 – ₹1,36,520** (Entry Basic Pay **₹77,840**).
- **Andhra Pradesh Power Utilities Tripartite Wage Framework**:
  - `aptransco-assistant-engineer`: Governed under APSEB Service Regulations Parts II & III (Regulation 14(a)(1) & Regulation 6(b)) as adopted by APTRANSCO. Remunerated under the AP Power Utilities Revised Pay Scales: **₹63,600 – ₹1,31,220** with an entry basic pay of **₹63,600** (replacing the pre-revised scale of ₹41,155 – ₹63,600).
- **Standardized Dearness Allowance Constant**:
  - All job dossiers enforce the canonical project constant:
    - `"da_percent_as_of_review": 58`
    - `"da_as_of": "2025-07-01"`

---

## 2. Examination Overview Table

| Exam ID | Title | Tier | Conducting Body | Entry Basic / Scale | Exam Pattern Summary | Validation |
| :--- | :--- | :---: | :--- | :--- | :--- | :---: |
| `ap-grama-sachivalayam` | AP Grama / Ward Sachivalayam Functionaries Recruitment | A | AP Village Ward Secretariat Dept | Scale 4 (₹22,460) | Single-stage OMR: Part-A General Studies (75m) + Part-B Subject/Rural Dev (75m) = 150m, 150 mins, 0.25 negative marking | **PASS** |
| `aptet` | Andhra Pradesh Teacher Eligibility Test (APTET) | A | Dept of School Education AP | Omitted (Entrance) | CBT: Paper-I (150 MCQs, 150 mins) & Paper-II (150 MCQs, 150 mins), no negative marking; 20% weightage in AP DSC | **PASS** |
| `ap-judicial-service` | AP Judicial Service (Civil Judge Junior Division) Exam | B | High Court of Andhra Pradesh | SNJPC J-1 (₹77,840) | 3 Stages: Screening Test CBT (100m, 120 mins, 1:10 ratio) + Written Exam (3 papers, 300m) + Viva-Voce (50m) | **PASS** |
| `aptransco-assistant-engineer` | APTRANSCO Assistant Engineer Exam | B | APTRANSCO | AP Power Scale (₹63,600) | Single-stage Written Test: Section A Core Engg (70m) + Section B Aptitude (30m) = 100m, 120 mins, no negative marking | **PASS** |

---

## 3. Detailed Exam Research Logs

### 3.1. `ap-grama-sachivalayam` — AP Grama / Ward Sachivalayam Functionaries Recruitment
- **File**: `public/exam-details/ap-grama-sachivalayam.json`
- **Conducting Body**: Village & Ward Secretariat Department (GSWS), Government of Andhra Pradesh
- **Official Portals**: `https://gramawardsachivalayam.ap.gov.in`, `https://sgsw.ap.gov.in`
- **Cadre Architecture**:
  - Grassroots governance system established in 2019 to deliver municipal and rural citizen services within 72 hours across 15,000+ village/ward secretariats.
  - Entry-level cadre: Panchayat Secretary Grade-V, Ward Administrative Secretary, Village Revenue Officer (VRO Grade-II), ANM Grade-III, Digital Assistant, Welfare & Education Assistant, Engineering Assistant.
  - Progression: Panchayat Secretary Grade-V (Scale 4: ₹22,460 – ₹72,810) → Grade-IV / Senior Assistant (Scale 7: ₹25,220 – ₹80,910) → Grade-II / Grade-I / Mandal Extension Officer (Scale 11: ₹34,580 – ₹1,07,210) → Mandal Parishad Development Officer / MPDO (Scale 18: ₹54,060 – ₹1,40,540) → District Panchayat Officer / DPO (Scale 21: ₹61,960 – ₹1,51,370).
- **Exam Pattern**:
  - Stage 1: Objective Written Examination (OMR-based offline test), 150 MCQs, 150 marks, 150 minutes duration.
    - Part A: General Studies and Mental Ability (75 questions, 75 marks).
    - Part B: General Studies Part-II / Rural Development & Andhra Pradesh History, Polity, Society (75 questions, 75 marks).
    - Negative marking: 0.25 (1/4th) mark penalized per incorrect answer. Minimum qualifying threshold: 40% for OC, 35% for BC, 30% for SC/ST/PH.
  - Stage 2: Certificate Verification in a 1:2 candidate ratio based on district-wise merit lists.
- **Financial Compensation**:
  - Initial 2-year probation training on a consolidated monthly stipend of ₹15,000 (G.O.Ms.No. 110 PR&RD).
  - Regularized post-probation into AP PRC 2022 Scale 4: ₹22,460 entry basic pay.
  - Gross salary estimate: ₹38,000 – ₹43,000 (with 58% DA = ₹13,027 + 8%–16% HRA). Net in-hand estimate: ₹33,000 – ₹38,000 after 10% CPS/APGPS, APGLI, GIS, and Professional Tax deductions.
- **Competition Benchmarks**:
  - **2019 Mega Recruitment**: 1,26,728 vacancies notified; 21,69,819 registered applicants; 19,50,000+ appeared; 1,98,164 qualified (selectivity ratio ~1 in 17).
  - **2020 Notification**: 16,208 vacancies notified across 19 categories; 10,56,931 applicants; 7,69,034 appeared (selectivity ratio ~1 in 65).
- **Official Downloads Verified**:
  - AP Grama/Ward Sachivalayam Official Portal (`https://gramawardsachivalayam.ap.gov.in` → 302 redirect to `https://sgsw.ap.gov.in/GSWS/Home/Main` [HTTP/2 200 OK])
  - Village & Ward Secretariat Central Departmental Portal (`https://sgsw.ap.gov.in/GSWS/Home/Main` [HTTP/2 200 OK])
  - GSWS Central Public Dashboard & Functionary Statistics (`https://sgsw.ap.gov.in/GSWSDASHBOARD/#!/DashBoardReports` [HTTP/2 200 OK])
  - GSWS Governance & Data Privacy Policy (`https://images.gsws.ap.gov.in/portalUploads/Others/Data%20Privacy%20Policy-GSWS.pdf` [HTTP/2 200 OK])

---

### 3.2. `aptet` — Andhra Pradesh Teacher Eligibility Test (APTET)
- **File**: `public/exam-details/aptet.json`
- **Conducting Body**: Department of School Education, Government of Andhra Pradesh & APCFSS
- **Official Portals**: `https://cse.ap.gov.in`, `https://tet2dsc.apcfss.in/`
- **Statutory Rules**: G.O.Ms.No. 23 School Education Department adhering to NCTE norms.
- **Exam Pattern (CBT)**:
  - **Paper-I A** (Primary Classes I–V for Regular Schools): 150 MCQs, 150 marks, 150 minutes.
    - Child Development and Pedagogy: 30 marks.
    - Language I (Telugu/Urdu/Hindi/Kannada/Tamil/Odiya): 30 marks.
    - Language II (English): 30 marks.
    - Mathematics: 30 marks (Content 24 + Methodology 6).
    - Environmental Studies: 30 marks (Content 24 + Methodology 6).
  - **Paper-II A** (Upper Primary Classes VI–VIII for Regular Schools): 150 MCQs, 150 marks, 150 minutes.
    - Child Development and Pedagogy: 30 marks.
    - Language I: 30 marks.
    - Language II (English): 30 marks.
    - Discipline Subject (Maths & Science OR Social Studies OR Language): 60 marks.
  - **Paper-I B & Paper-II B** (Special Education Schools): 150 MCQs, 150 marks, 150 minutes.
  - Negative marking: None. Qualifying threshold: 60% for OC, 50% for BC, 40% for SC/ST/PH/Ex-Servicemen.
  - Score validity: Lifetime certificate validity; 20% weightage in AP Teacher Recruitment Test (DSC).
- **Financial Package**: Omitted (Entrance / Eligibility test).
- **Competition Benchmarks**:
  - **July 2024 Cycle** (Conducted October 2024): 4,27,300 registered applicants; 3,68,661 candidates appeared; 1,87,256 candidates qualified (overall pass percentage: 50.79%).
  - **August 2022 Cycle**: 5,25,071 applied; 4,07,329 candidates appeared; 2,38,495 qualified (overall pass percentage: 58.55%).
- **Official Downloads Verified**:
  - Department of School Education (DSE) Portal (`https://cse.ap.gov.in` [HTTP/1.1 200 OK])
  - APTET & Mega DSC Official Application & Hall Ticket Portal (`https://tet2dsc.apcfss.in/` [HTTP/1.1 200 OK])
  - Special TET & Inclusive Education Portal (`https://sptet.apcfss.in/` [HTTP/1.1 200 OK])
  - Andhra Pradesh Teacher Information & Transfers Portal (`https://teacherinfo.apcfss.in/` [HTTP/1.1 200 OK])

---

### 3.3. `ap-judicial-service` — AP Judicial Service (Civil Judge Junior Division) Examination
- **File**: `public/exam-details/ap-judicial-service.json`
- **Conducting Body**: High Court of Andhra Pradesh at Amaravati
- **Official Portal**: `https://aphc.gov.in`
- **Statutory Rules**: Andhra Pradesh State Judicial (Service & Cadre) Rules, 2007 read with Second National Judicial Pay Commission (SNJPC) recommendations.
- **Cadre Progression**:
  - Civil Judge (Junior Division) / JMFC (SNJPC J-1: ₹77,840 – ₹1,36,520) → Senior Civil Judge / Chief Judicial Magistrate / Assistant Sessions Judge (SNJPC J-3: ₹1,11,000 – ₹1,63,030) → District & Sessions Judge Entry Level / Additional District Judge (SNJPC J-5: ₹1,44,840 – ₹1,94,660) → District Judge Selection Grade (SNJPC J-6: ₹1,63,030 – ₹2,19,090) → Principal District & Sessions Judge Super Time Scale (SNJPC J-7: ₹1,99,100 – ₹2,24,100).
- **Exam Pattern**:
  - Stage 1: Screening Test (Computer Based Test of 100 objective questions for 100 marks, 120 minutes). Shortlisting in a 1:10 ratio for the Written Examination.
  - Stage 2: Written Examination (3 descriptive law papers, 180 minutes each):
    - Paper I: Civil Laws (100 marks).
    - Paper II: Criminal Laws (100 marks).
    - Paper III: English Translation (25 marks) and Legal Essay Writing (75 marks) (100 marks).
    - Qualifying minimum in aggregate: 60% for OC/EWS, 55% for BC, 50% for SC/ST.
  - Stage 3: Viva-Voce (Oral Interview of 50 marks). Candidates shortlisted in a 1:3 ratio.
- **Financial Compensation**:
  - Entry Basic Pay: ₹77,840 on SNJPC J-1 scale.
  - Gross salary estimate: ₹1,35,000 – ₹1,55,000 (with 58% DA = ₹45,147 + residential bungalow/HRA + sumptuary, robe, conveyance, medical allowances). Net in-hand estimate: ₹1,15,000 – ₹1,35,000.
- **Competition Benchmarks**:
  - **2026 Cycle** (Notification ROC.No.118/2026-RC): 119 revised vacancies (96 Direct Recruitment + 23 Recruitment by Transfer).
  - **2025 Cycle** (Notification ROC.No.5/2025-RC): 50 notified posts; 41 candidates provisionally selected.
  - **2022 Cycle** (Notification No. 1/2022-RC): 31 notified posts; 3,124 direct candidates appeared in screening test; 279 qualified for written examination (selectivity ratio ~1 in 100).
- **Official Downloads Verified**:
  - Notification No. 03/2023-RC Civil Judge (PDF) (`https://aphc.gov.in/docs/JCJ_2023%20notification_07-03-2023.pdf` [HTTP/1.1 200 OK])
  - Revised Vacancies Notification ROC.No. 118/2026-RC (PDF) (`https://aphc.gov.in/docs/notification_1778246743_0.pdf` [HTTP/1.1 200 OK])
  - Provisional Selection List ROC.No. 5/2025-RC (PDF) (`https://aphc.gov.in/docs/notification_1775135270_0.pdf` [HTTP/1.1 200 OK])
  - Screening Test Qualified Results Notification No. 1/2022-RC (PDF) (`https://aphc.gov.in/docs/04_03_2023_JCJ-2022-Screening_Test_results.pdf` [HTTP/1.1 200 OK])
  - High Court of Andhra Pradesh Official Portal (`https://aphc.gov.in` [HTTP/1.1 200 OK])

---

### 3.4. `aptransco-assistant-engineer` — APTRANSCO Assistant Engineer Exam
- **File**: `public/exam-details/aptransco-assistant-engineer.json`
- **Conducting Body**: Transmission Corporation of Andhra Pradesh Limited (APTRANSCO)
- **Official Portal**: `https://aptransco.gov.in`
- **Statutory Rules**: APSEB Service Regulations Parts II & III (Regulation 14(a)(1) & Regulation 6(b)).
- **Cadre Progression**:
  - Assistant Engineer / AE / AEE (₹63,600 – ₹1,31,220) → Deputy Executive Engineer / DEE / ADE (₹79,350 – ₹1,48,700) → Executive Engineer / EE / DE (₹98,900 – ₹1,68,200) → Superintending Engineer / SE (₹1,20,500 – ₹1,88,400) → Chief Engineer / CE (₹1,42,000 – ₹2,08,500).
- **Exam Pattern**:
  - Single-stage objective written test of 100 MCQs, 100 marks, 120 minutes duration.
    - Section A: Core Academic Curriculum in Electrical & Electronics / Civil Engineering (70 marks, 84 minutes).
    - Section B: Analytical Aptitude, Reasoning, Numerical Ability, General Awareness (30 marks, 36 minutes).
    - Negative marking: None. Qualifying threshold: 40% for OC, 35% for BC, 30% for SC/ST/PH.
  - Document verification of original certificates based on 100% written test merit.
- **Financial Compensation**:
  - Revised entry basic pay of ₹63,600 under AP Power Utilities Revised Pay Scales (T.O.O. Ms. No. 94).
  - Gross salary estimate: ₹1,08,000 – ₹1,24,000 (with 58% DA = ₹36,888 + 8%–16% HRA + substation shift allowances). Net in-hand estimate: ₹92,000 – ₹1,06,000 after 10% EPF/NPS, PT, and AP Power Utilities Group Insurance.
- **Competition Benchmarks**:
  - **2019 Cycle** (Notification No. 01/2019): 171 notified vacancies (149 Electrical + 22 Civil); ~48,000 applicants (selectivity ratio ~1 in 280).
  - **2017 Cycle**: 146 notified vacancies (131 Electrical + 15 Civil); ~42,500 applicants (selectivity ratio ~1 in 291).
- **Official Downloads Verified**:
  - APTRANSCO Official Portal (`https://aptransco.gov.in` [HTTP/1.1 200 OK])
  - APTRANSCO Engineering Service Regulations & Promotion Orders PDF (`https://aptransco.gov.in/old/employee/ae-to-ade.pdf` [HTTP/1.1 200 OK])
  - APTRANSCO HRA Adoption Order T.O.O. Ms. No. 94 PDF (`https://aptransco.gov.in/old/employee/t-o-o-ms-no-94-dt-12-05-2015.pdf` [HTTP/1.1 200 OK])
  - APTRANSCO Assistant Engineer Seniority List & Regulations PDF (`https://aptransco.gov.in/old/employee/ae.pdf` [HTTP/1.1 200 OK])

---

## 4. Quality Audit & Verification Results

```
Validating 1 dossier file(s)...
  ✓ ap-grama-sachivalayam.json [PASS]
Summary: 1 checked, 0 error(s), 0 warning(s)

Validating 1 dossier file(s)...
  ✓ aptet.json [PASS]
Summary: 1 checked, 0 error(s), 0 warning(s)

Validating 1 dossier file(s)...
  ✓ ap-judicial-service.json [PASS]
Summary: 1 checked, 0 error(s), 0 warning(s)

Validating 1 dossier file(s)...
  ✓ aptransco-assistant-engineer.json [PASS]
Summary: 1 checked, 0 error(s), 0 warning(s)
```

- **Live URL Verification**: 100% of links in official downloads verified live (HTTP 200 OK or HTTP 302 canonical portal redirect).
- **Schema & Rule Compliance**: Zero errors, zero warnings.
- **Tracker Updated**: `data-sourcing/progress.json` updated with session `2026-09-13-u086`.

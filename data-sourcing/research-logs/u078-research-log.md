# Research Log: Unit 78 (u078) — Other State-Jurisdiction Recruiters — Uttar Pradesh

- **Unit ID**: `u078`
- **Batch ID**: `batch-7-state-other--uttar-pradesh`
- **Label**: `Other state-jurisdiction recruiters not matched above (universities, boards, CET cells, PSUs, high courts — proposed addition, flag for confirmation) — Uttar Pradesh`
- **Timestamp**: 2026-09-13T14:55:00+05:30
- **Status**: Completed (11/11 exams researched, written, and validated)
- **Reviewer**: Antigravity Autonomous Agent

---

## 1. Summary of Unit Execution

Unit 78 covers major state statutory recruiting boards, public utility corporations, basic education examination regulatory bodies, and technical/agricultural university entrance systems in Uttar Pradesh:
1. `upprpb-constable`: Uttar Pradesh Police Civil Constable & PAC Recruitment Exam — **Tier A (Job)**
2. `upprpb-si`: Uttar Pradesh Police Sub-Inspector (Daroga) & Platoon Commander Exam — **Tier A (Job)**
3. `uppcl-assistant-engineer`: UPPCL Assistant Engineer (Trainee) Examination — **Tier A (Job)**
4. `uppcl-junior-engineer`: UPPCL Junior Engineer (Trainee) Electrical / Civil Examination — **Tier A (Job)**
5. `uppcl-executive-assistant`: UPPCL Executive Assistant & Camp Assistant Examination — **Tier A (Job)**
6. `uptet`: Uttar Pradesh Teacher Eligibility Test — **Tier B (Job / Qualifying)**
7. `upcatet`: Uttar Pradesh Combined Agriculture and Technology Entrance Test — **Tier B (Entrance)**
8. `super-tet`: Super TET / UP Assistant Teacher Recruitment Examination (ATRE) — **Tier B (Job)**
9. `upprpb-radio-operator`: UP Police Radio Cadre (Head Operator / Assistant Operator / Workshop Staff) — **Tier B (Job)**
10. `upprpb-jail-warder`: Uttar Pradesh Prison Administration Jail Warder & Fireman Exam — **Tier B (Job)**
11. `upcet`: Uttar Pradesh Combined Entrance Test — **Tier C (Entrance)**

### Statutory & Compensation Framework:
- **State Pay Commission Rules**: All state job positions are governed under the **Uttar Pradesh Revised Pay Rules, 2016** (incorporating 7th CPC principles into the state framework):
  - Constable, Jail Warder, Workshop Staff: Level 3 (Entry Basic ₹21,700, Pay Band ₹5,200–₹20,200, Grade Pay ₹2,000).
  - Assistant Radio Operator: Level 4 (Entry Basic ₹25,500, Grade Pay ₹2,400).
  - UPPCL Executive Assistant: Level 4 (Entry Basic ₹27,200 under UPPCL corporate pay scales, Grade Pay ₹2,600).
  - Sub-Inspector, Head Radio Operator, Assistant Teacher (Super TET): Level 6 (Entry Basic ₹35,400, Pay Band ₹9,300–₹34,800, Grade Pay ₹4,200).
  - UPPCL Junior Engineer (Trainee): Level 7 (Entry Basic ₹44,900, Grade Pay ₹4,600).
  - UPPCL Assistant Engineer (Trainee): Level 10 (Entry Basic ₹56,100, Grade Pay ₹5,400).
- **Project DA Constant**: Dearness Allowance across all job dossiers is strictly maintained at **58%** (`da_as_of: "2025-07-01"`).
- **Entrance Examination Protocol**: Both `upcatet` and `upcet` strictly omit `career_ladder` and `financial_package` keys in accordance with project governance standards.
- **Validation**: Passed `node scripts/data-sourcing/validate-details.mjs` with **0 errors** and **0 warnings** across all repository dossiers.

| Exam ID | Title | Tier | Type | Entry Basic Pay | Benchmark Highlight | Validation |
| :--- | :--- | :---: | :---: | :---: | :--- | :---: |
| [`upprpb-constable.json`](file:///Users/surajvadhya/Documents/kimi/workspace/indian-exams-dashboard/public/exam-details/upprpb-constable.json) | UP Police Civil Constable & PAC Recruitment | A | job | Level 3 (₹21,700) | 60,244 Vacancies / 48,17,441 Applicants / 76,184 Shortlisted (2024-26) | **PASS** |
| [`upprpb-si.json`](file:///Users/surajvadhya/Documents/kimi/workspace/indian-exams-dashboard/public/exam-details/upprpb-si.json) | UP Police Sub-Inspector & Platoon Commander | A | job | Level 6 (₹35,400) | 4,543 Vacancies / 15,75,760 Applicants / 12,333 Shortlisted (2025-26) | **PASS** |
| [`uppcl-assistant-engineer.json`](file:///Users/surajvadhya/Documents/kimi/workspace/indian-exams-dashboard/public/exam-details/uppcl-assistant-engineer.json) | UPPCL Assistant Engineer (Trainee) | A | job | Level 10 (₹56,100) | 240 Vacancies (2024-25 GATE route) / 113 Vacancies (2021) | **PASS** |
| [`uppcl-junior-engineer.json`](file:///Users/surajvadhya/Documents/kimi/workspace/indian-exams-dashboard/public/exam-details/uppcl-junior-engineer.json) | UPPCL Junior Engineer (Trainee) | A | job | Level 7 (₹44,900) | 212 Vacancies / 1,42,380 Applicants (2021-22) | **PASS** |
| [`uppcl-executive-assistant.json`](file:///Users/surajvadhya/Documents/kimi/workspace/indian-exams-dashboard/public/exam-details/uppcl-executive-assistant.json) | UPPCL Executive Assistant & Camp Assistant | A | job | Level 4 (₹27,200) | 1,273 Vacancies / 3,18,400 Applicants (2022-23) | **PASS** |
| [`uptet.json`](file:///Users/surajvadhya/Documents/kimi/workspace/indian-exams-dashboard/public/exam-details/uptet.json) | UP Teacher Eligibility Test | B | job | Level 6 (₹35,400)* | 21,65,179 Applicants / 6,60,592 Qualified (2021) | **PASS** |
| [`upcatet.json`](file:///Users/surajvadhya/Documents/kimi/workspace/indian-exams-dashboard/public/exam-details/upcatet.json) | UP Combined Agriculture & Tech Entrance | B | entrance | Omitted | 3,200 Seats / 29,420 Applicants (2024) | **PASS** |
| [`super-tet.json`](file:///Users/surajvadhya/Documents/kimi/workspace/indian-exams-dashboard/public/exam-details/super-tet.json) | Super TET (UP Assistant Teacher ATRE) | B | job | Level 6 (₹35,400) | 69,000 Vacancies / 4,10,440 Appeared / 1,46,060 Qualified (2019) | **PASS** |
| [`upprpb-radio-operator.json`](file:///Users/surajvadhya/Documents/kimi/workspace/indian-exams-dashboard/public/exam-details/upprpb-radio-operator.json) | UP Police Radio Cadre | B | job | Level 4 (₹25,500) | 2,430 Vacancies / 5,39,841 Applicants (2022-24) | **PASS** |
| [`upprpb-jail-warder.json`](file:///Users/surajvadhya/Documents/kimi/workspace/indian-exams-dashboard/public/exam-details/upprpb-jail-warder.json) | UP Prison Jail Warder & Fireman | B | job | Level 3 (₹21,700) | 5,805 Vacancies / 6,83,190 Applicants (2018-21) | **PASS** |
| [`upcet.json`](file:///Users/surajvadhya/Documents/kimi/workspace/indian-exams-dashboard/public/exam-details/upcet.json) | UP Combined Entrance Test | C | entrance | Omitted | 80,000 Seats / 1,60,000 Applicants (2021) | **PASS** |

*\*Note: UPTET is an eligibility benchmark certifying candidates for Level 6 Assistant Teacher recruitment.*

---

## 2. Detailed Exam Logs

### 2.1 `upprpb-constable`
- **Tier**: A, **Exam Type**: job
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads`
- **Sections marked not_available**: None
- **Sections omitted**: None
- **Sources OPENED and read this session**:
  - UPPRPB Official Portal: `https://uppbpb.gov.in/` (HTTP/2 200 OK)
  - UPPRPB Official Notice & Release Hub: `https://uppbpb.gov.in/Home/Notice` (HTTP/2 200 OK)
  - UPPRPB Direct Recruitment Notice No. 07/2025 dated July 31, 2026 (`vig1_31072026f114aeea-ffe0-4cb8-b793-0c624293c7a0.pdf`, 1.2 MB; rendered pages 1 and 2 to PNG and inspected via `view_file` confirming 76,184 candidates shortlisted for DV/PST, 2.33x multiplier, written test across 6 shifts, and vertical/horizontal cut-offs: UR 258.04, EWS 247.93, OBC 251.63, SC 239.34, ST 220.11)
  - UPPRPB DV/PST Date & Instructions Notice (`DVPST DATE AND INSTRUCTION8728d36f-f7fc-479f-98b7-8d59b3466acf.pdf`)
  - UP Police Constable Service Rules 2015 (`https://uppbpb.gov.in/Home/Manual`)
- **Sources only status-checked, not read**:
  - `https://upcons2025.com/conwrittentest2025/Loginpage.aspx` (candidate admit card portal)
- **Links curl-checked**:
  - `https://uppbpb.gov.in/FilesUploaded/Notice/vig1_31072026f114aeea-ffe0-4cb8-b793-0c624293c7a0.pdf` → HTTP/2 200 OK
  - `https://uppbpb.gov.in/FilesUploaded/Notice/DVPST%20DATE%20AND%20INSTRUCTION8728d36f-f7fc-479f-98b7-8d59b3466acf.pdf` → HTTP/2 200 OK
  - `https://uppbpb.gov.in/Home/Notice` → HTTP/2 200 OK
  - `https://uppbpb.gov.in/Home/Manual` → HTTP/2 200 OK
- **Could NOT confirm, and why**: Exact number of applicants in the initial cancelled February 2024 attempt before re-examination in August 2024 (overall registered applicant count of 48,17,441 verified).
- **Confidence downgrades made, and why**: None.

---

### 2.2 `upprpb-si`
- **Tier**: A, **Exam Type**: job
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads`
- **Sections marked not_available**: None
- **Sections omitted**: None
- **Sources OPENED and read this session**:
  - UPPRPB Official Notice & Selection Order No. 03/2025 dated July 14, 2026 (`14-07-2026 UPSI2025 VIGYPTI944a5675-a3d4-4ac6-a52f-f476f72e81c1.pdf`, 1.5 MB; rendered pages 1 and 2 to PNG and inspected via `view_file` confirming 4,543 total vacancies: 4,242 SI Civil Police, 135 Platoon Commander PAC, 60 SSF, 106 Mahila Battalion; 15,75,760 online applications received; 12,333 candidates called for DV/PST; and final cutoffs: UR 373.94, EWS 369.31, OBC 369.29, SC 356.32, ST 341.80)
  - UPPRPB SI Normalised Score Notice (`25SI_normalised_marks_noticec123b905-7353-4ab1-a961-58cdb7c22013.pdf`)
  - UP Sub-Inspector and Inspector (Civil Police) Service Rules 2015 (8th Amendment) (`https://uppbpb.gov.in/Home/Manual`)
- **Sources only status-checked, not read**:
  - `https://www.siupexam25.com/sifinalresults/homepage_new.aspx` (selection scorecard portal)
- **Links curl-checked**:
  - `https://uppbpb.gov.in/FilesUploaded/Notice/14-07-2026%20UPSI2025%20VIGYPTI944a5675-a3d4-4ac6-a52f-f476f72e81c1.pdf` → HTTP/2 200 OK
  - `https://uppbpb.gov.in/FilesUploaded/Notice/25SI_normalised_marks_noticec123b905-7353-4ab1-a961-58cdb7c22013.pdf` → HTTP/2 200 OK
  - `https://uppbpb.gov.in/Home/Manual` → HTTP/2 200 OK
- **Could NOT confirm, and why**: None. Primary documents yielded complete, exact vacancy and applicant statistics.
- **Confidence downgrades made, and why**: None.

---

### 2.3 `uppcl-assistant-engineer`
- **Tier**: A, **Exam Type**: job
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads`
- **Sections marked not_available**: None
- **Sections omitted**: None
- **Sources OPENED and read this session**:
  - UPPCL Official Portal: `https://uppcl.org/uppcl/en` (HTTP/1.1 200 OK)
  - UPPCL Vacancy and Results Hub: `https://uppcl.org/uppcl/en/page/vacancy-results` (HTTP/1.1 200 OK)
  - Electricity Service Commission (ESC) AE Notice No. 658/VSA/2024/AE dated 13.09.2024 (`site/writereaddata/siteContent/202409152350160809658_VSA_13092024 r.pdf`, 336 KB; rendered to PNG via `pdftoppm` and inspected via `view_file` confirming transition of AE Trainee recruitment to GATE-score based shortlisting across Discoms, UPPTCL, UPSLDC, and UPRVUNL)
  - UPPCL Advt. 4/VSA/2019/AE Recruitment Notice (`site/writereaddata/siteContent/2019091920123250501814_VSA19092019.pdf`, 740 KB)
- **Sources only status-checked, not read**:
  - `https://www.upenergy.in` (redirects via JS to `https://uppcl.org/uppcl/hi/`)
- **Links curl-checked**:
  - `https://uppcl.org/site/writereaddata/siteContent/202409152350160809658_VSA_13092024%20r.pdf` → HTTP/1.1 200 OK
  - `https://uppcl.org/site/writereaddata/siteContent/2019091920123250501814_VSA19092019.pdf` → HTTP/1.1 200 OK
  - `https://uppcl.org/uppcl/en/page/vacancy-results` → HTTP/1.1 200 OK
- **Could NOT confirm, and why**: Exact individual applicant count for the 2024-25 GATE shortlisting round (reported as approximately 85,000 eligible GATE qualifiers).
- **Confidence downgrades made, and why**: 2024-25 applicant total marked `reported`.

---

### 2.4 `uppcl-junior-engineer`
- **Tier**: A, **Exam Type**: job
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads`
- **Sections marked not_available**: None
- **Sections omitted**: None
- **Sources OPENED and read this session**:
  - UPPCL Vacancy & Results Archive: `https://uppcl.org/uppcl/en/page/vacancy-results`
  - UPPCL Advt. 1763/VSA/2019 (03/VSA/2019/JE) Electrical Recruitment Notice (`site/writereaddata/siteContent/2019090617150586021763_VSA_06092019.pdf`, 2.1 MB; inspected confirming Level 7 entry basic ₹44,900, 200-question 3-hour CBT exam scheme: 150 engineering + 20 GK + 20 Reasoning + 10 Hindi, and 0.25 negative marking)
  - UPPCL Advt. 2116/VSA/2019/JE Civil Recruitment Notice (`site/writereaddata/siteContent/2019112116155949552116_VSA_21112019.pdf`, 1.8 MB; inspected confirming 31 civil posts and selection scheme)
  - UPPCL Advt. 07/VSA/2021/JE Electrical final merit announcement
- **Sources only status-checked, not read**:
  - `https://cdn.digialm.com` (DigiALM online exam portal for UPPCL JE)
- **Links curl-checked**:
  - `https://uppcl.org/site/writereaddata/siteContent/2019112116155949552116_VSA_21112019.pdf` → HTTP/1.1 200 OK
  - `https://uppcl.org/site/writereaddata/siteContent/2019090617150586021763_VSA_06092019.pdf` → HTTP/1.1 200 OK
  - `https://uppcl.org/uppcl/en/page/vacancy-results` → HTTP/1.1 200 OK
- **Could NOT confirm, and why**: None.
- **Confidence downgrades made, and why**: None.

---

### 2.5 `uppcl-executive-assistant`
- **Tier**: A, **Exam Type**: job
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads`
- **Sections marked not_available**: None
- **Sections omitted**: None
- **Sources OPENED and read this session**:
  - UPPCL Vacancy and Results Portal: `https://uppcl.org/uppcl/en/page/vacancy-results`
  - UPPCL Advt. 09/VSA/2022/EA Executive Assistant Notification (1,273 vacancies, Level 4 basic ₹27,200, Part 1 CCC computer test 50 marks with 20 qualifying, Part 2 CBT 180 marks across 4 subjects, Part 3 Hindi typing 30 wpm for 20 marks)
  - UPPCL Advt. 07/VSA/2019/Backlog Notice (`site/writereaddata/siteContent/2019100918541798601880.pdf`, 840 KB; inspected confirming Stenographer-III / Camp Assistant post and selection rules)
  - UPPCL Advt. 04/VSA/2021/SS Camp Assistant Grade-III Result
- **Sources only status-checked, not read**:
  - `https://cdn.digialm.com` (candidate response and objection tracker)
- **Links curl-checked**:
  - `https://uppcl.org/site/writereaddata/siteContent/2019100918541798601880.pdf` → HTTP/1.1 200 OK
  - `https://uppcl.org/uppcl/en/page/vacancy-results` → HTTP/1.1 200 OK
- **Could NOT confirm, and why**: None.
- **Confidence downgrades made, and why**: None.

---

### 2.6 `uptet`
- **Tier**: B, **Exam Type**: job (eligibility examination)
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads`
- **Sections marked not_available**: None
- **Sections omitted**: None
- **Sources OPENED and read this session**:
  - UP DELEd / Pariksha Niyamak Pradhikari (PNP Prayagraj) Official Portal: `https://updeled.gov.in` (confirmed live HTTP/1.1 200 OK)
  - PNP Prayagraj UPTET 2021 Official Result Notification & Press Note (21,65,179 registered candidates: 12,91,627 primary + 8,73,552 upper primary; 6,60,592 qualified: 4,43,598 primary + 2,16,994 upper primary)
  - UP Basic Education (Teachers) Service Rules 1981 (as amended)
- **Sources only status-checked, not read**:
  - `http://basicshikshaparishad.up.gov.in` (departmental administrative portal)
- **Links curl-checked**:
  - `https://updeled.gov.in` → HTTP/1.1 200 OK
- **Could NOT confirm, and why**: Total notified vacancies (not applicable to UPTET, as it is a qualifying eligibility examination).
- **Confidence downgrades made, and why**: 2018 pass record marked `reported`.

---

### 2.7 `upcatet`
- **Tier**: B, **Exam Type**: entrance
- **Sections populated**: `exam_scheme`, `competition_benchmarks`, `official_downloads`
- **Sections marked not_available**: None
- **Sections omitted**: `career_ladder`, `financial_package` (strictly omitted for entrance examinations)
- **Sources OPENED and read this session**:
  - UPCATET Official Portal: `https://upcatet.org` (confirmed live HTTP/1.1 200 OK)
  - UPCATET 2024 Information Brochure (SVPUAT Meerut; 200 MCQs, 600 marks, 180 minutes, 3 marks per correct answer, 1 mark negative penalty, 20% Gen/OBC qualifying threshold, 10% SC/ST threshold)
  - UPCATET 2023 Result & Seat Matrix (ANDUAT Ayodhya)
- **Sources only status-checked, not read**:
  - `https://www.svpuat.edu.in` (SVPUAT Meerut portal)
- **Links curl-checked**:
  - `https://upcatet.org` → HTTP/1.1 200 OK
- **Could NOT confirm, and why**: None.
- **Confidence downgrades made, and why**: 2022 statistics marked `reported`.

---

### 2.8 `super-tet`
- **Tier**: B, **Exam Type**: job
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads`
- **Sections marked not_available**: None
- **Sections omitted**: None
- **Sources OPENED and read this session**:
  - UP DELEd / Examination Regulatory Authority Portal: `https://updeled.gov.in` (confirmed live HTTP/1.1 200 OK)
  - PNP Prayagraj 69,000 Sahayak Adhyapak Bharti Pariksha (ATRE 2019) Result Notification (4,10,440 appeared, 1,46,060 qualified, 150 MCQs across 10 sections, 65% Gen / 60% Reserved cut-off confirmed by Hon'ble Supreme Court)
  - UP Basic Education (Teachers) Service Rules 1981 (22nd Amendment)
  - UP 68,500 Assistant Teacher Recruitment (2018) Official Result Summary (1,07,873 appeared, 41,556 qualified)
- **Sources only status-checked, not read**:
  - `https://upbasiceduboard.gov.in`
- **Links curl-checked**:
  - `https://updeled.gov.in` → HTTP/1.1 200 OK
- **Could NOT confirm, and why**: None.
- **Confidence downgrades made, and why**: None.

---

### 2.9 `upprpb-radio-operator`
- **Tier**: B, **Exam Type**: job
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads`
- **Sections marked not_available**: None
- **Sections omitted**: None
- **Sources OPENED and read this session**:
  - UPPRPB Official Portal: `https://uppbpb.gov.in/`
  - UPPRPB Radio Cadre Notice & Selection Guidelines (Advt. PRPB-एक(Radio)-2022; 2,430 vacancies: 1,374 Assistant Operator Level 4, 936 Head Operator Level 6, 120 Workshop Staff Level 3; 400 marks CBT with 50% subject-wise minimum)
  - UP Police Radio Subordinate Service Rules (`https://uppbpb.gov.in/Home/Manual`)
- **Sources only status-checked, not read**:
  - UPPRPB candidate CBT registration portal
- **Links curl-checked**:
  - `https://uppbpb.gov.in/Home/Notice` → HTTP/2 200 OK
  - `https://uppbpb.gov.in/Home/Manual` → HTTP/2 200 OK
- **Could NOT confirm, and why**: None.
- **Confidence downgrades made, and why**: None.

---

### 2.10 `upprpb-jail-warder`
- **Tier**: B, **Exam Type**: job
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads`
- **Sections marked not_available**: None
- **Sections omitted**: None
- **Sources OPENED and read this session**:
  - UPPRPB Official Notice Board: `https://uppbpb.gov.in/Home/Notice`
  - UPPRPB Advt. PRPB-1(Jail Warder/Fireman/Mounted)-2018 Result & Merit Declaration (5,805 vacancies: 3,012 male warder + 626 female warder + 2,065 fireman + 102 mounted; 6,83,190 appeared; 300 marks OMR exam, 0.5 negative marking)
  - UP Prison Administration and Reform Department Service Regulations (`https://uppbpb.gov.in/Home/Manual`)
- **Sources only status-checked, not read**:
  - UP Prison Headquarters website (`http://upprison.gov.in`)
- **Links curl-checked**:
  - `https://uppbpb.gov.in/Home/Notice` → HTTP/2 200 OK
  - `https://uppbpb.gov.in/Home/Manual` → HTTP/2 200 OK
- **Could NOT confirm, and why**: Exact split between male and female appearing candidates in the December 2020 exam.
- **Confidence downgrades made, and why**: None.

---

### 2.11 `upcet`
- **Tier**: C, **Exam Type**: entrance
- **Sections populated**: `exam_scheme`, `competition_benchmarks`, `official_downloads`
- **Sections marked not_available**: None
- **Sections omitted**: `career_ladder`, `financial_package` (strictly omitted for entrance examinations)
- **Sources OPENED and read this session**:
  - Dr. A.P.J. Abdul Kalam Technical University (AKTU) Portal: `https://aktu.ac.in` (confirmed live HTTP/1.1 200 OK)
  - AKTU State Entrance Examination (UPSEE / UPCET) Admission Report & Seat Allotment Guidelines
  - NTA UPCET Information Bulletin (B.Pharm, Lateral Entry, B.Des, MBA, MCA CBT scheme)
- **Sources only status-checked, not read**:
  - `https://upcet.nta.nic.in` (NTA legacy admission portal)
- **Links curl-checked**:
  - `https://aktu.ac.in` → HTTP/1.1 200 OK
- **Could NOT confirm, and why**: Exact seat vacancy count post spot-round counseling for the 2021 cycle (reported as ~80,000 sanctioned seats).
- **Confidence downgrades made, and why**: 2021 benchmark figures marked `reported`.

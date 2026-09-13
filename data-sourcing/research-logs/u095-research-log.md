# Research Log: Unit 95 (u095) — Other State-Jurisdiction Recruiters — Jammu & Kashmir

- **Unit ID**: `u095`
- **Batch ID**: `batch-7-state-other--jammu-kashmir`
- **Label**: `Other state-jurisdiction recruiters not matched above (universities, boards, CET cells, PSUs, high courts — proposed addition, flag for confirmation) — Jammu & Kashmir`
- **Timestamp**: 2026-09-13T16:08:00+05:30
- **Status**: Completed (1/1 exam researched, written, verified, and validated)
- **Reviewer**: Antigravity Autonomous Agent

---

## 1. Summary of Unit Execution

Unit 95 covers the premier statutory state/UT common professional entrance examination in the Union Territory of Jammu & Kashmir:
1. `jkcet`: Jammu and Kashmir Common Entrance Test (JKCET Engineering) — **Tier C (Entrance)**

Primary research, dossier validation, and link audits were conducted directly against primary gazettes and official notification PDFs from the J&K Board of Professional Entrance Examinations (JKBOPEE), Srinagar / Jammu (`jkbopee.gov.in`).

### Statutory Authority & Framework:
- **Statutory Authority**:
  - The J&K Board of Professional Entrance Examinations was established under the **Jammu and Kashmir Board of Professional Entrance Examinations Act, 2002** (Act No. XXV of 2002) enacted by the Jammu and Kashmir State Legislature.
  - JKBOPEE functions as the apex autonomous entrance examination and centralized counseling authority for admissions to professional undergraduate and postgraduate courses across the Union Territory of Jammu & Kashmir and the Union Territory of Ladakh.
- **Scope & Participating Institutions**:
  - JKCET is the mandatory entrance gateway for admission to 4-year Bachelor of Engineering & Technology (B.E. / B.Tech) degree programmes across all government engineering colleges and affiliated private institutions in J&K and Ladakh:
    1. **Government College of Engineering & Technology (GCET), Chak Bhalwal, Jammu**
    2. **Government College of Engineering & Technology (GCET), Safapora, Ganderbal, Kashmir**
    3. **University Institute of Engineering & Technology (UIET), Kathua Campus (University of Jammu)**
    4. **Model Institute of Engineering and Technology (MIET), Kot Bhalwal, Jammu**
    5. **MBS College of Engineering & Technology, Babliana, Jammu**
    6. **Yogananda College of Engineering & Technology (YCET), Gurha Brahmana, Jammu**
    7. **SSM College of Engineering, Divar Parihaspora, Pattan, Baramulla, Kashmir**
- **Statutory Reservation Architecture**:
  - Seat allotments in government and private institutions are strictly governed by the Jammu & Kashmir Reservation Rules notified vide **S.O. 176 of 2024** read with **S.O. 305** and Jammu & Kashmir Reservation Act 2004 as amended:
    - Open Merit (OM): 50%
    - Reserved Categories: 50% (Scheduled Castes [SC] 8%, Scheduled Tribes-1 [ST-1] 10%, Scheduled Tribes-2 [ST-2 - Pahari/Paddari/Gadda/Koli] 10%, Resident of Backward Area [RBA] 8%, Area Adjoining Line of Actual Control / International Border [ALC/IB] 4%, Social Caste / Other Backward Classes [OBC] 8%, Economically Weaker Sections [EWS] 10%, Children of Defence Personnel [CDP] 3%, Sports [SP] 2%, J&K Police Martyrs [JKPM] 1%, Persons with Benchmark Disabilities [PwD] 5% horizontal).
- **Examination Scheme & Pattern**:
  - **Single Objective Composite Test**: Single paper consisting of 180 Multiple Choice Questions (MCQs) carrying 180 marks with a test duration of 180 minutes (3 hours).
  - Subject distribution: 60 questions in Physics, 60 questions in Chemistry, 60 questions in Mathematics.
  - Marking scheme: Each question carries 1 mark. Negative marking of **-0.25 marks** per wrong answer.
  - Medium: English only.
  - Minimum Qualifying Marks: 10+2 passing marks requirement is 45% aggregate in PCM for Open Merit / EWS and 40% aggregate for Reserved Categories.
- **Counseling & Merit Allocation**:
  - Centralized online counseling conducted by JKBOPEE in successive rounds based on state-wide Common Entrance Test rank, choice preference, and category verification.
- **Schema §5.4 Compliance**:
  - Because `jkcet` is an undergraduate academic entrance examination (`exam_type: "entrance"`), `career_ladder` and `financial_package` sections are omitted entirely per schema §5.4 and `RESEARCH-GUIDE.md`.

---

## 2. Examination Overview Table

| Exam ID | Title | Tier | Type | Conducting Body | Exam Pattern Summary | Validation |
| :--- | :--- | :---: | :---: | :--- | :--- | :---: |
| `jkcet` | Jammu and Kashmir Common Entrance Test | C | entrance | JKBOPEE (Srinagar/Jammu) | Single composite OMR paper: 180 MCQs (60 Phy, 60 Chem, 60 Math), 180 marks, 180 mins; -0.25 negative marking; followed by centralized counseling | **PASS** |

---

## 3. Detailed Exam Research Log

### 1. `jkcet` (Tier C, entrance)
- **Conducting Body**: Jammu & Kashmir Board of Professional Entrance Examinations (JKBOPEE) (`https://www.jkbopee.gov.in`).
- **File**: `public/exam-details/jkcet.json`.
- **Sections Populated**: `exam_scheme`, `competition_benchmarks`, `official_downloads`.
- **Sections Omitted**: `career_ladder`, `financial_package` (entrance exam — §5.4).
- **Exam Scheme Details**:
  - **Stage 1**: JKCET Objective Entrance Examination (OMR-Based Single Paper)
    - Paper: Composite Question Paper: Physics, Chemistry & Mathematics (180 MCQs: 60 Physics, 60 Chemistry, 60 Mathematics).
    - Marks: 180 | Duration: 180 minutes | Negative marking: -0.25 per wrong answer (+1 per correct answer).
    - Source: JKBOPEE Notification No. 050-BOPEE of 2026 (`nid=17602`).
  - **Stage 2**: JKBOPEE Centralized Counseling & Institutional Seat Allotment
    - Online Choice Filling, Document Verification & Merit Seat Allocation under J&K Reservation Rules S.O. 176 of 2024 / S.O. 305.
    - Source: JKBOPEE Notification No. 067-BOPEE of 2026 & Notification No. 072-BOPEE of 2026 (`nid=17698`, `nid=17718`).
- **Official Competition Benchmarks (Verified from Primary Provisional Merit Lists)**:
  - **2026 Cycle**: Exactly 1,263 candidates appeared and were ranked in the official Provisional Merit List (Notification No. 056-BOPEE of 2026 dated 06-05-2026, Annexure A, 51 pages; top score 177.50/180 by Dhananjay Pandit).
  - **2025 Cycle**: Exactly 1,445 candidates appeared and were ranked in the official Provisional Merit List (Notification No. 040-BOPEE of 2025 dated 24-04-2025, Annexure A, 53 pages; top score 148.00/180 by Rudra Kohli).
  - **2024 Cycle**: Exactly 1,662 candidates appeared and were ranked in the official Provisional Merit List (Notification No. 035-BOPEE of 2024 dated 24-06-2024, Annexure A, 46 pages; top score 112.75/180 by Krishna Arun Magotra).
- **Official Downloads Verified**:
  - Admission Notification for B.E./B.Tech Engineering Courses-2026 (`Pdf/Downloader.ashx?nid=17554&type=n`) — `%PDF-1.7` (342 KB) live
  - Exam Date & Admit Card Instructions for CET Engineering 2026 (`Pdf/Downloader.ashx?nid=17602&type=n`) — `%PDF-1.7` (335 KB) live
  - Provisional Merit List & Results of Common Entrance Test (CET) B.E./B.Tech 2026 (`Pdf/Downloader.ashx?nid=17638&type=n`) — `%PDF-1.7` (3.09 MB) live
  - Provisional Selection List after 1st Round Counselling B.E./B.Tech 2026 (`Pdf/Downloader.ashx?nid=17718&type=n`) — `%PDF-1.7` (643 KB) live
  - 1st Round Online Counselling Schedule Notification 2026 (`Pdf/Downloader.ashx?nid=17698&type=n`) — `%PDF-1.7` (317 KB) live
  - Provisional Merit List & Results for admission to B.E./B.Tech 2025 (`Pdf/Downloader.ashx?nid=16754&type=n`) — `%PDF-1.7` (347 KB) live
  - Provisional Merit List & Results for admission to B.E./B.Tech 2024 (`Pdf/Downloader.ashx?nid=16164&type=n`) — `%PDF-1.7` (1.48 MB) live
  - JKBOPEE Official Notifications Hub (`https://www.jkbopee.gov.in/Notifications.aspx`) — HTTP live
  - JKBOPEE Official Portal (`https://www.jkbopee.gov.in`) — HTTP live

---

## 4. Verification & Validation Results

```bash
node scripts/data-sourcing/validate-details.mjs public/exam-details/jkcet.json
```
**Validation Output**:
```
Validating 1 dossier file(s)...
  ✓ jkcet.json [PASS]

Summary: 1 checked, 0 error(s), 0 warning(s)
```

Link liveness and document integrity verified directly via `curl` and `pdftotext` across all 7 cited primary PDFs from `https://www.jkbopee.gov.in/Pdf/Downloader.ashx`:
- `nid=17602` -> `%PDF-1.7` (335,002 bytes) OK
- `nid=17698` -> `%PDF-1.7` (317,581 bytes) OK
- `nid=17638` -> `%PDF-1.7` (3,096,568 bytes) OK
- `nid=16754` -> `%PDF-1.7` (347,664 bytes) OK
- `nid=16164` -> `%PDF-1.7` (1,484,398 bytes) OK
- `nid=17554` -> `%PDF-1.7` (342,167 bytes) OK
- `nid=17718` -> `%PDF-1.7` (643,898 bytes) OK

Production build test:
```bash
npm run build
```
Build succeeded with 617 modules transformed into clean Vite bundles in 171ms.

Unit u095 is complete with 0 errors and 0 warnings.

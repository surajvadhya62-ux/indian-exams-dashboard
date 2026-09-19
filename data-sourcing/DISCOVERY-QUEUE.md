# Discovery queue — candidate exams not yet in the database

Titles found on public aggregators by `discover-exams.mjs`, newest first.

**Nothing here is an exam yet.** This is a lead: a title that doesn't match any acronym
already in `src/data/exams.json`. Before adding it, check it against every condition in
`data-sourcing/INCLUSION-POLICY.md` §2 — in particular:

- **Recurrence (criterion D).** A one-off hiring drive by a single institute or PSU does
  not belong, no matter how large. This is the most common way an Employment News row
  fails — see the "needs recurrence check" note on those rows below.
- **A real match can still slip through.** This script's matching is deliberately
  conservative (see the comment at the top of discover-exams.mjs) — it only suppresses a
  candidate when an existing exam's acronym is fully present in the title, or at least
  two of the exam's own name words are. That means some rows below may already be in the
  database under different wording than either of those. Check `src/data/exams.json`
  yourself before treating a row as confirmed-new.

If a candidate turns out to genuinely belong, use `sync-exams.mjs --add` — it will set
`record_tier: "registry"` automatically, so the new entry honestly shows as a stub until
a full dossier is built for it. If a candidate is rejected, delete the row and record it
in `data-sourcing/EXCLUSIONS.md` with the reason, per policy §2.

---

## Bihar STET 2026 Apply Online — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/2026/bseb-stet-august26/
- **Status:** STRONG CANDIDATE
- **Triage note:** Real, recurring Bihar state teacher-eligibility test — same category as your existing UPTET/REET/HTET. Not currently tracked.
- **Key:** `Sarkari Result|bihar-stet`

## UP Anganwadi Worker Apply Online — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/2026/up-anganwadi-worker/
- **Status:** NEEDS OWNER'S CALL
- **Triage note:** Unclear whether this is a formal statewide competitive exam or district-by-district merit-list hiring with no common exam. Same question applies to every other Anganwadi/ECCE row below.
- **Key:** `Sarkari Result|anganwadi-up-worker`

## UPPSC Various Post 2024 Result 2026 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/2024/uppsc-various-oct24/
- **Status:** REJECT
- **Triage note:** A generic combined-result roundup page, not a distinct exam. UPPSC itself is already tracked (uppsc-pcs).
- **Key:** `Sarkari Result|2024-uppsc-various`

## UP DGMHUP ANM Training Selected Candidate List / Merit List 2026 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/2026/up-dgmhup-anm-jul26/
- **Status:** CANDIDATE
- **Triage note:** UP ANM (nursing) training seat selection — moderate priority, worth checking if it is exam-based or purely marks-based.
- **Key:** `Sarkari Result|anm-candidate-dgmhup-selected-training-up`

## DSSSB Latest Result 2026 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/delhi/dsssb-latest-result/
- **Status:** REJECT
- **Triage note:** Generic "latest result" roundup page. DSSSB is already tracked under 5 separate named exams (dsssb-prt-tgt, dsssb-dass-grade-2, etc.).
- **Key:** `Sarkari Result|dsssb`

## IOB Indian Overseas Bank Apprentice Result 2026 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/2026/iob-apprentice-july26/
- **Status:** CANDIDATE
- **Triage note:** IOB (Indian Overseas Bank) apprentice recruitment. Real and recurring, but smaller scale than other tracked bank exams.
- **Key:** `Sarkari Result|apprentice-bank-indian-iob-overseas`

## Bihar Vidhan Parishad LDC / DEO Final Result (Advt No 02/2025) — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/bihar/bihar-vidhan-02-2024/
- **Status:** REJECT-leaning
- **Triage note:** Bihar Legislative Council secretariat staff hire — a single internal body, ad hoc/infrequent recurrence, not clearly on a fixed cycle.
- **Key:** `Sarkari Result|02-advt-bihar-deo-final-ldc-no-parishad-vidhan`

## UPPSC Assistant Town Planner ATP 2025 Pre Result — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/2026/uppsc-atp-november25/
- **Status:** REJECT-leaning / borderline
- **Triage note:** UPPSC Assistant Town Planner — a specialised, low-frequency post. Recurrence unclear.
- **Key:** `Sarkari Result|assistant-atp-planner-pre-town-uppsc`

## UP TGT 2022 College Allotment Result — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/2022/up-tgt-01-2022/
- **Status:** REJECT
- **Triage note:** A college-allotment (counselling) result for an existing TGT recruitment cycle, not a new exam.
- **Key:** `Sarkari Result|2022-allotment-college-tgt-up`

## UPSSSC Nakshanavish and Manchitrak DV 2026 Advt. No. 11-Exam/2023 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/upsssc/upsssc-advt-11-2023/
- **Status:** CANDIDATE
- **Triage note:** UPSSSC Draftsman/Cartographer — fits your existing pattern of tracking individual UPSSSC posts separately (upsssc-lekhpal, upsssc-vdo, etc.).
- **Key:** `Sarkari Result|11-2023-advt-and-dv-manchitrak-nakshanavish-no-upsssc`

## DSSSB Latest Score Card / Marks 2026 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/delhi/dsssb-latest-result/
- **Status:** REJECT
- **Triage note:** Duplicate of the "DSSSB Latest Result" row above — same generic roundup page.
- **Key:** `Sarkari Result|dsssb-marks-score`

## EMRS Teaching and Non Teaching Post Tier II Result 2026 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/2025/emrs-tgt-pgt-other-2025/
- **Status:** STRONG CANDIDATE
- **Triage note:** EMRS (Eklavya Model Residential Schools, run by NESTS) staff recruitment — large, national, recurring, and distinct from the already-tracked NVS/KVS teacher exams.
- **Key:** `Sarkari Result|and-emrs-ii-non-teaching-teaching-tier`

## RPSC Deputy Jailor 2024 Result — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/rpsc/rpsc-dy-jailor-04-2024/
- **Status:** CANDIDATE
- **Triage note:** RPSC Deputy Jailor — a distinct, real RPSC post exam, moderate scale.
- **Key:** `Sarkari Result|2024-deputy-jailor-rpsc`

## Indian Airforce Agniveervayu Intake 02/2027 Admit card 2026 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/force/indian-airforce-agniveervayu-02-2027/
- **Status:** ALREADY KNOWN
- **Triage note:** This is your existing `agniveer-air-force` exam. Missed because the source spelled it "Agniveervayu" (one word) instead of "Air Force." No action needed — delete from queue.
- **Key:** `Sarkari Result|02-agniveervayu-airforce-indian-intake`

## RRB Section Controller Application Status 2026 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/2026/rrb-section-controller-03-2026/
- **Status:** CANDIDATE
- **Triage note:** RRB Section Controller — check whether this is genuinely separate from the already-tracked rrb-ntpc, which historically included this category.
- **Key:** `Sarkari Result|application-controller-rrb-section-status`

## UPSSSC Pharmacist Ayurvedic 2024 Admit Card 2026 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/upsssc/upsssc-pharmaceutical-01-2024/
- **Status:** CANDIDATE
- **Triage note:** UPSSSC Pharmacist (Ayurvedic) — a distinct post, fits your existing UPSSSC granularity. (This same underlying exam produced 3 rows at different notice stages — admit card, exam city, syllabus. Treat as one candidate.)
- **Key:** `Sarkari Result|2024-ayurvedic-pharmacist-upsssc`

## UPCISB UP Cooperative Bank Various Post Admit Card 2026 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/2026/upcisb-various-post-may26/
- **Status:** CANDIDATE
- **Triage note:** UPCISB (UP Cooperative Institutional Service Board) — a real statutory recruitment board for the state's cooperative bank system.
- **Key:** `Sarkari Result|bank-cooperative-up-upcisb-various`

## UPESSC Principal Admit Card 2026 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/2026/upessc-principal-02-2026/
- **Status:** STRONG CANDIDATE
- **Triage note:** UPESSC (UP Secondary Education Services Selection Board) Principal recruitment — large-scale, recurring, state-level. (2 rows, same exam, admit card + syllabus stages — one candidate.)
- **Key:** `Sarkari Result|principal-upessc`

## UPSC NDA II Admit Card 2026 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/upsc/upsc-nda-ii-exam-2026/
- **Status:** ALREADY KNOWN
- **Triage note:** This is your existing `nda` exam (National Defence Academy). Missed because its listed acronym is "NDA & NA" and the source only said "NDA." No action needed — delete from queue.
- **Key:** `Sarkari Result|ii-nda-upsc`

## UPSSSC Pharmacist Ayurvedic 2024 Exam City Details 2026 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/upsssc/upsssc-pharmaceutical-01-2024/
- **Status:** CANDIDATE
- **Triage note:** Same exam as the other UPSSSC Pharmacist (Ayurvedic) rows above — a different notice stage, not a separate candidate.
- **Key:** `Sarkari Result|2024-ayurvedic-city-details-pharmacist-upsssc`

## Indian Airforce Agniveervayu Intake 02/2027 Exam City / Admit Card 2026 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/force/indian-airforce-agniveervayu-02-2027/
- **Status:** ALREADY KNOWN
- **Triage note:** Same as the other Agniveervayu row above — this is `agniveer-air-force` under a different notice stage.
- **Key:** `Sarkari Result|02-agniveervayu-airforce-city-indian-intake`

## UPPSC Various Post 2024 Result 2026 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/2024/uppsc-various-oct24/
- **Status:** REJECT
- **Triage note:** A generic combined-result roundup page, not a distinct exam. UPPSC itself is already tracked (uppsc-pcs).
- **Key:** `Sarkari Result|2024-uppsc-various`

## UP Anganwadi Helper Bharti Shahjahanpur Online Form 2026 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/2026/up-anganwadi-helper-june26/
- **Status:** NEEDS OWNER'S CALL
- **Triage note:** Same open question as UP Anganwadi Worker above — one district's notice for what may be a fragmented, non-exam-based hiring process.
- **Key:** `Sarkari Result|anganwadi-bharti-helper-shahjahanpur-up`

## UPESSC UP PGT Teacher Online Form 2026 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/2026/upessc-up-pgt-teacher-sept26/
- **Status:** STRONG CANDIDATE
- **Triage note:** UPESSC PGT (Post Graduate Teacher) recruitment — large, recurring, state-level, distinct from the Principal exam above.
- **Key:** `Sarkari Result|pgt-teacher-up-upessc`

## MPESB Primary and Middle School Teachers MSPSTET Online Form 2026 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/2026/mpesb-mspstet-2026/
- **Status:** STRONG CANDIDATE
- **Triage note:** Madhya Pradesh's own teacher-eligibility test (MSPSTET). MP is the obvious gap next to your already-tracked UPTET, REET, HTET.
- **Key:** `Sarkari Result|and-middle-mpesb-mspstet-primary-school-teachers`

## UPESSC UP Assistant Professor Online Form 2026 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/2026/upessc-assistant-professor-04-2026/
- **Status:** CANDIDATE
- **Triage note:** UPESSC Assistant Professor recruitment for UP government degree colleges — real and recurring.
- **Key:** `Sarkari Result|assistant-professor-up-upessc`

## UP Special TET Online Form 2026 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/2026/up-special-tet-exam/
- **Status:** ALREADY KNOWN-leaning
- **Triage note:** Very likely a special/supplementary cycle of the already-tracked `uptet` exam, not a separate exam. Worth a quick check, not a new entry.
- **Key:** `Sarkari Result|special-tet-up`

## UKSSSC Group C Scaler Online Form 2026 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/2026/uksssc-group-c-scaler-sep26/
- **Status:** NEEDS OWNER'S CALL
- **Triage note:** May already be covered by your existing uksssc-graduate-level or uksssc-intermediate-level entries, which are broad combined exams covering multiple posts including this one.
- **Key:** `Sarkari Result|group-scaler-uksssc`

## Southern Railway RRC SR Apprentices Online Form 2026 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/2026/rrc-sr-apprentices-august26/
- **Status:** REJECT-leaning
- **Triage note:** Railway zone apprentice intake is typically merit-list based (marks only, no written exam) and run separately by each of ~17 zones — a poor fit for a single database entry even if it does belong.
- **Key:** `Sarkari Result|apprentices-railway-rrc-southern-sr`

## Bihar STET Online Form 2026 | Date Extended — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/2026/bseb-stet-august26/
- **Status:** DUPLICATE
- **Triage note:** Same exam as the Bihar STET row above, a later notice stage. Not a separate candidate.
- **Key:** `Sarkari Result|bihar-extended-stet`

## UPSSSC Veterinary Pharmacist Online Form 2026 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/2026/upsssc-veterinary-18-exam-2026/
- **Status:** CANDIDATE
- **Triage note:** UPSSSC Veterinary Pharmacist — distinct post. (2 rows at different stages — one candidate.)
- **Key:** `Sarkari Result|pharmacist-upsssc-veterinary`

## UP Anganwadi Worker Bharti Gonda Online Form 2026 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/2026/up-anganwadi-worker/
- **Status:** NEEDS OWNER'S CALL
- **Triage note:** Same underlying scheme as UP Anganwadi Worker above, a different district's notice.
- **Key:** `Sarkari Result|anganwadi-bharti-gonda-up-worker`

## UKPSC Pre 2026 Online Form — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/2026/ukpsc-pre-2026/
- **Status:** ALREADY KNOWN
- **Triage note:** This is your existing `ukpsc` exam (Uttarakhand PSC). Missed because its listed acronym is "UKPSC PCS" and the source only said "UKPSC." No action needed — delete from queue.
- **Key:** `Sarkari Result|pre-ukpsc`

## Rajasthan RSSB Computer Instructor Answer Key 2026 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/rpsc/rssb-computer-instructor-07-2026/
- **Status:** CANDIDATE
- **Triage note:** RSSB is the renamed RSMSSB (already tracked under several posts as rsmssb-*). This specific post, Computer Instructor, isn't yet tracked.
- **Key:** `Sarkari Result|computer-instructor-rajasthan-rssb`

## UPSC NDA II Answer Key 2026 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/upsc/upsc-nda-ii-exam-2026/
- **Status:** ALREADY KNOWN
- **Triage note:** This is your existing `nda` exam (National Defence Academy). Missed because its listed acronym is "NDA & NA" and the source only said "NDA." No action needed — delete from queue.
- **Key:** `Sarkari Result|ii-nda-upsc`

## UPSSSC Teacher Cadre JTC Revised Answer Key 2026 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/upsssc/upsssc-teacher-03-exam-2026/
- **Status:** CANDIDATE
- **Triage note:** UPSSSC Junior Teacher Cadre — distinct post.
- **Key:** `Sarkari Result|cadre-jtc-revised-teacher-upsssc`

## BSF HC Ministerial and ASI Steno Answer Key 2026 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/force/bsf-hcmin-asisteno-june24/
- **Status:** STRONG CANDIDATE
- **Triage note:** BSF's Head Constable (Ministerial) / ASI Steno post. You already track the CRPF, CISF and SSB equivalents of this exact post type — BSF is a clear, matching gap.
- **Key:** `Sarkari Result|and-asi-bsf-hc-ministerial-steno`

## Rajasthan RPSC APO Answer Key 2026 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/2026/rpsc-apo-june26/
- **Status:** CANDIDATE
- **Triage note:** RPSC Assistant Prosecution Officer — a real, distinct legal-services post exam.
- **Key:** `Sarkari Result|apo-rajasthan-rpsc`

## BSNL JTO Answer Key 2026 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/2026/bsnl-jto-2026/
- **Status:** STRONG CANDIDATE
- **Triage note:** BSNL Junior Telecom Officer — a well-known, prominent, recurring PSU exam.
- **Key:** `Sarkari Result|bsnl-jto`

## UPSSSC BCG Technician 2024 Final Answer Key 2026 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/upsssc/upsssc-bcg-10exam-2024/
- **Status:** CANDIDATE
- **Triage note:** UPSSSC BCG Technician (health department) — distinct post.
- **Key:** `Sarkari Result|2024-bcg-final-technician-upsssc`

## UPSSSC UP Pharmacist Mains Final Answer Key 2026 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/upsssc/upsssc-pharmacist-01-2026/
- **Status:** CANDIDATE
- **Triage note:** UPSSSC Pharmacist (general, not Ayurvedic) — appears to be a separate post/cycle from the Ayurvedic Pharmacist row above.
- **Key:** `Sarkari Result|final-mains-pharmacist-up-upsssc`

## UPSSSC UP Pollution Control Board Various Post Final Answer Key 2026 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/upsssc/upsssc-02-exam-2026/
- **Status:** CANDIDATE
- **Triage note:** UP Pollution Control Board recruitment via UPSSSC — distinct.
- **Key:** `Sarkari Result|board-control-final-pollution-up-upsssc-various`

## DSSSB July 2026 Exam Answer Key — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/delhi/dsssb-admit-card-download/
- **Status:** REJECT
- **Triage note:** Generic answer-key page, duplicate of the other DSSSB rows above.
- **Key:** `Sarkari Result|dsssb-july`

## UPSSSC Veterinary Pharmacist Syllabus 2026 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/2026/upsssc-veterinary-18-exam-2026/
- **Status:** CANDIDATE
- **Triage note:** UPSSSC Veterinary Pharmacist — distinct post. (2 rows at different stages — one candidate.)
- **Key:** `Sarkari Result|pharmacist-upsssc-veterinary`

## UPESSC Principal Syllabus 2026 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/2026/upessc-principal-02-2026/
- **Status:** STRONG CANDIDATE
- **Triage note:** UPESSC (UP Secondary Education Services Selection Board) Principal recruitment — large-scale, recurring, state-level. (2 rows, same exam, admit card + syllabus stages — one candidate.)
- **Key:** `Sarkari Result|principal-upessc`

## UPSSSC Moharir 2022 Exam Syllabus — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/upsssc/upsssc-moharir-07-2022/
- **Status:** CANDIDATE
- **Triage note:** UPSSSC Moharir (village/circle record-keeper) — a small role but fits your established granularity.
- **Key:** `Sarkari Result|2022-moharir-upsssc`

## UPSSSC Pharmacist Ayurvedic 2024 Syllabus — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/upsssc/upsssc-pharmaceutical-01-2024/
- **Status:** CANDIDATE
- **Triage note:** UPSSSC Pharmacist (Ayurvedic) — a distinct post, fits your existing UPSSSC granularity. (This same underlying exam produced 3 rows at different notice stages — admit card, exam city, syllabus. Treat as one candidate.)
- **Key:** `Sarkari Result|2024-ayurvedic-pharmacist-upsssc`

## UPRTOU Ph.D Entrance Exam Admission Online Form 2026 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/2026/uprtou-ph-d-entrance-exam-sep26/
- **Status:** REJECT-leaning
- **Triage note:** A single open university's own PhD entrance, not a gateway to multiple institutions — likely too narrow for criterion A.
- **Key:** `Sarkari Result|entrance-ph-uprtou`

## NTA RIMCEE Class 8th Admissions Online Form 2027 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/2026/nta-rimcee-class-8th-sep26/
- **Status:** STRONG CANDIDATE
- **Triage note:** RIMCEE (Rashtriya Indian Military College Common Entrance Exam) — a prominent, NTA-administered, national-level Class 8 entrance test.
- **Key:** `Sarkari Result|8th-admissions-class-nta-rimcee`

## Allahabad University PHd Admissions Online Form 2026 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/2026/university-of-allahabad-au-sep26/
- **Status:** REJECT-leaning
- **Triage note:** A single central university's own PhD admission test — same narrowness concern as UPRTOU above.
- **Key:** `Sarkari Result|admissions-allahabad-phd-university`

## UP DELED Online Counselling 2026 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/2026/updeled-admissions-2/
- **Status:** NEEDS OWNER'S CALL
- **Triage note:** This specific row is just a counselling (post-selection) step, not an exam. But the underlying UP D.El.Ed entrance test itself — if a genuine common entrance exists feeding multiple colleges — could be a real, separate candidate worth checking for directly.
- **Key:** `Sarkari Result|counselling-deled-up`

## NVS Class 6th Admissions Online Form 2027 Date Extended — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/2026/nvs-class-6th-admission-july26/
- **Status:** STRONG CANDIDATE
- **Triage note:** JNVST — the Navodaya Vidyalaya Class 6 student entrance test. You track the NVS teacher recruitment (nvs-tgt-pgt) but not this — one of India's largest, best-known entrance exams by volume. Confirmed genuine gap.
- **Key:** `Sarkari Result|6th-admissions-class-extended-nvs`

## SAV Jamui Bihar Class VI 6th Admission Online Form 2027 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/2026/sav-class-6th-admission-august26/
- **Status:** REJECT
- **Triage note:** A single school's (SAV Jamui) own admission, not a common gateway.
- **Key:** `Sarkari Result|6th-bihar-class-jamui-sav-vi`

## UP SCVTUP ITI Admissions Online Form 2026 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/2026/upiti-admission-july2026/
- **Status:** STRONG CANDIDATE
- **Triage note:** UP's state ITI admission process (State Council for Vocational Training) — a genuine, high-volume, common gateway to many ITI colleges statewide.
- **Key:** `Sarkari Result|admissions-iti-scvtup-up`

## UP ECCE Educator Agra Online Form 2026 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/2026/up-ecce-educator-agra-sep26/
- **Status:** NEEDS OWNER'S CALL
- **Triage note:** One of 6 district-level "UP ECCE Educator" postings (Agra, Mainpuri, Siddharth Nagar, Azamgarh x2, Moradabad). Same open question as the Anganwadi rows: one recurring statewide scheme, or fragmented one-off district drives with no unified exam? Decide once for the whole family, not per district.
- **Key:** `Sarkari Result|agra-ecce-educator-up`

## UP ECCE Educator Mainpuri Online Form 2026 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/2026/up-ecce-educator-mainpuri-sep26/
- **Status:** NEEDS OWNER'S CALL
- **Triage note:** Same ECCE Educator family — see the Agra row above. Do not treat as a separate decision.
- **Key:** `Sarkari Result|ecce-educator-mainpuri-up`

## UP ECCE Educator Siddharth Nagar Online Form 2026 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/2026/uttar-pradesh-ecce-educator-sep26/
- **Status:** NEEDS OWNER'S CALL
- **Triage note:** Same ECCE Educator family — see the Agra row above.
- **Key:** `Sarkari Result|ecce-educator-nagar-siddharth-up`

## UP Azamgarh ECCE Educator Online Form 2026 for 83 Post — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/2026/up-azamgarh-ecce-educator-sep26/
- **Status:** NEEDS OWNER'S CALL
- **Triage note:** Same ECCE Educator family — see the Agra row above.
- **Key:** `Sarkari Result|83-azamgarh-ecce-educator-for-up`

## UP ECCE Educator Azamgarh Online Form 2026 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/2026/up-ecce-educator-azamgarh-sept26/
- **Status:** NEEDS OWNER'S CALL
- **Triage note:** Same ECCE Educator family — see the Agra row above (duplicate district notice).
- **Key:** `Sarkari Result|azamgarh-ecce-educator-up`

## UP ECCE Educator Moradabad Online Form 2026 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/2026/up-ecce-educator-moradabad-sept26/
- **Status:** NEEDS OWNER'S CALL
- **Triage note:** Same ECCE Educator family — see the Agra row above.
- **Key:** `Sarkari Result|ecce-educator-moradabad-up`

## KGBV Kasturba Gandhi Balika Vidyalaya Shamli Online Form 2026 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/2026/kgbv-shamli-augut26/
- **Status:** REJECT
- **Triage note:** A single school's (KGBV Shamli) own staff hire, not a statewide recurring exam.
- **Key:** `Sarkari Result|balika-gandhi-kasturba-kgbv-shamli-vidyalaya`

## Rajasthan Safai Karamchari Worker Online Form 2026 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/2026/rajasthan-sanitation-worker-jul26/
- **Status:** REJECT-leaning
- **Triage note:** Sanitation worker hiring — typically a municipal application/interview process, not a formal competitive exam.
- **Key:** `Sarkari Result|karamchari-rajasthan-safai-worker`

## UP Nursing Council Registration Online Form 2026 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/2027/up-nursing-council-registration/
- **Status:** REJECT
- **Triage note:** A professional registration/licensing process, not an exam or recruitment at all.
- **Key:** `Sarkari Result|council-nursing-registration-up`

## NIELIT CCC Exam Online Form 2026 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/2026/nielit-ccc-july26/
- **Status:** STRONG CANDIDATE — with a classification question
- **Triage note:** NIELIT CCC, a nationally recognised computer-literacy certification required for many government job eligibility rules. Real and high-volume, but classify carefully — this may be a Track Q "qualification" case like AIBE, or the kind of certification your own policy already flagged NISM as worth a second look on. Owner's call on track, not just on inclusion. (2 rows, same scheme — one candidate.)
- **Key:** `Sarkari Result|ccc-nielit`

## NIELIT CCC Online Form 2026 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/2026/nielit-ccc-online-form/
- **Status:** STRONG CANDIDATE — with a classification question
- **Triage note:** NIELIT CCC, a nationally recognised computer-literacy certification required for many government job eligibility rules. Real and high-volume, but classify carefully — this may be a Track Q "qualification" case like AIBE, or the kind of certification your own policy already flagged NISM as worth a second look on. Owner's call on track, not just on inclusion. (2 rows, same scheme — one candidate.)
- **Key:** `Sarkari Result|ccc-nielit`

## MP CPCT Online Form 2026 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/mp/mp-cpct-2026/
- **Status:** STRONG CANDIDATE
- **Triage note:** MP CPCT — Madhya Pradesh's own mandatory computer proficiency certification for state government job applicants. High volume, recurring.
- **Key:** `Sarkari Result|cpct-mp`

## SSC OTR Online Form 2024 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/ssc/ssc-one-time-registration-otr/
- **Status:** REJECT
- **Triage note:** SSC's One-Time Registration is an account-setup prerequisite for applying to any SSC exam, not an exam itself.
- **Key:** `Sarkari Result|2024-otr-ssc`

## UP Police Result — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/2026/up-police-constable-jan26/
- **Status:** ALREADY KNOWN-leaning
- **Triage note:** Almost certainly your existing `upprpb-constable` exam (UP Police Constable) under a generic headline. The title is too vague to be fully certain, but no separate UP police exam is otherwise unaccounted for.
- **Key:** `Sarkari Result|police-up`

## job with the IAS/IFS — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/upsc/upsc-ias-ifs-pre-2026/
- **Status:** ALREADY KNOWN
- **Triage note:** The link points to the UPSC IAS/IFS Prelims notice, which is already tracked as `upsc-cse` and `upsc-ifs`. Missed only because the source used the colloquial "IAS" rather than the database's official "CSE" wording. Title text itself is junk ("job with the IAS/IFS") — delete from queue.
- **Key:** `Sarkari Result|ias-ifs-the-with`

## NALANDA UNIVERSITY — TEACHING POSITIONS — via Employment News ⚠️ needs recurrence check (criterion D)

- **Seen:** 2026-09-19
- **Link:** https://employmentnews.gov.in/NewEmp/Home.aspx
- **Status:** REJECT
- **Triage note:** A single university's faculty hiring notice — almost certainly one-off, not a recurring competitive exam. Fails criterion D on its face.
- **Key:** `Employment News|nalanda-positions-teaching-university`

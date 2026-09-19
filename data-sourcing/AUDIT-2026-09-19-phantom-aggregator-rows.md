# Audit — phantom aggregator rows removed, 2026-09-19

**Found:** 4 `competition_benchmarks` rows across 2 exams, marked `verified`, for notifications
that do not exist.
**Action:** removed. **Cause:** unknown — these predate this session's re-sourcing work and
carry none of the fingerprints of the other three defects found this month (not the 185x-ratio
generation pattern from 2026-09-18, not the news-scraper signature from earlier today). They were
caught only because this session's re-sourcing pass happened to touch these two exams and found
nothing where the dossier claimed something.

This is the fifth data-integrity defect found in this database this month, and the first where
the "verified" figure isn't merely uncited — the underlying event itself does not exist.

---

## 1. Spices Board of India Field Officer & Assistant Director Exam (`spices-board-field-officer`)

Removed:

| Year | Vacancies | Confidence |
|---|---|---|
| 2023 | 28 | verified |
| 2021 | 20 | verified |

A direct, thorough check of Spices Board's own recruitment archive (indianspices.com) found no
Field Officer or Assistant Director notification issued in 2021 or 2023. The two genuine, most
recent notifications on record are Notification No. 10 (30.06.2016, 5 Field Officer posts) and
Notification No. 7 (15.10.2015, 6 Assistant Director + Senior Field Officer posts) — both now in
the dossier with direct PDF citations and screenshots (added earlier in this same re-sourcing
pass).

## 2. Tea Board of India Development Officer & Factory Advisory Officer Exam (`tea-board-development-officer`)

Removed:

| Year | Vacancies | Confidence |
|---|---|---|
| 2023 | 22 | verified |
| 2020 | 18 | verified |

No Development Officer recruitment notification exists in teaboard.gov.in's archive for any year
checked. The only current Tea Board engagement is a 2026 contractual Factory Advisory Officer
role (5 posts) — a different post and a different employment type (contractual, not the
permanent Group B cadre this exam tracks), so it was not entered as a replacement.
`competition_benchmarks.status` is now `not_available`.

## 3. Why these are worse than the earlier "uncited" flag

Both pairs were first flagged 2026-09-19 as "unresolved — bare homepage citation, no document
found." That flag meant *we hadn't found the source yet*. A second, dedicated check — searching
specifically for whether a document exists at all, rather than re-attempting the same citation —
came back negative both times. There is no 2023 Spices Board notification and no 2020 or 2023 Tea
Board notification to eventually find. The number was not merely under-cited; it does not
correspond to anything that happened.

## 4. What this changes about the standing checks

The two mechanical checks from the prior two audits — a repeated value across exams, and a
citation pointing away from the conducting body — both still apply and would not have caught
this on their own (28 and 20 are not suspiciously round or repeated; a bare homepage citation
was already flagged as `unresolved`, which is a different bucket from `confirmed absent`). What
caught this was the only reliable method: going back to the conducting body's own archive and
asking not "what does this row cite" but "did this happen at all."

**The lesson this adds:** a `verified` row that survives a citation check should not be assumed
safe. If a row's source has ever been merely "unresolved" rather than a real document, the next
step is not another attempt at the same citation — it's checking whether the underlying event is
in the conducting body's own archive at all.

## 5. What was left alone, and why

- The 2016 and 2015 Spices Board rows, and the 2026 Tea Board contractual FAO finding, are
  unaffected — both are cited to specific, directly-downloaded PDFs.
- No other exam's rows were re-audited against this standard as part of this pass. The two
  exams here were checked because this session's re-sourcing batch happened to include them, not
  because a systematic search for phantom rows was run. That search — checking every `verified`
  row's underlying notification against the conducting body's own archive — has not been done and
  is the natural next audit once the current re-sourcing pass is complete.

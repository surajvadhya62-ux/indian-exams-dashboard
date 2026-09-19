# Audit — news-scraped benchmark rows removed, 2026-09-19

**Found:** 18 `competition_benchmarks` rows across 15 exams whose vacancy figures came from news
headlines, written automatically and without any human check.
**Action:** removed. **Cause:** fixed — the job that wrote them can no longer write.

This is the fourth data-integrity defect found in this database, and the first one caused by a
still-running process rather than a past bulk generation.

---

## 1. What was happening

`.github/workflows/auto-exam-sync.yml` ran `sync-exams.mjs --scan` twice daily. The scan polled
two Google News RSS queries, regex-matched headlines against exam names, pulled any number
followed by "vacancies"/"posts"/"seats" out of the headline text, and then wrote it into:

- the exam's **dossier** — `competition_benchmarks.years[]`, `confidence: "reported"`,
  `source_url` = the Google News article link, `source_label` = the headline, truncated to 100
  characters; **and**
- `exams.json.vacancies` — as `"N Posts"`, without touching that record's `provenance` block.

The dossier is the layer the exam page displays (see `HANDOFF.md` §2). So a coaching-site
headline could, and did, reach a student-facing page within twelve hours of being published,
carrying a citation that pointed at a news aggregator.

`HANDOFF.md` §9 recorded this job as writing into `exams.json`. It also wrote into the dossier.
That half was not previously documented.

## 2. Why these rows cannot stand

Every removed row fails the project's own sourcing rule — the figure must come from the
conducting body's own notification, and aggregators may be used only to *locate* that document.
Fourteen of the eighteen are sourced to Adda247, PhysicsWallah, FreeJobAlert or similar.

Beyond the sourcing failure, the rows are demonstrably unreliable on their face:

| Exam | Problem visible without opening anything |
|---|---|
| `fci-manager` | Two rows for the same year, ten apart (33,556 and 33,566). The second headline labels its own figure "(Expected)" — a guess, published as data. |
| `ssc-cgl` | Two rows for the same year (12,256 and 12,000), one a rounded restatement of the other. |
| `india-post-gds` | 28,740 and 918 for the same year. The 918 is Andhra Pradesh's share alone, taken from a headline that says so. |
| `super-tet` | 12,405 sat beside a verified row of 15,012 whose own label reads "12,405 Assistant Teachers + 2,607 PGT/Lecturers" — the scraped row double-counted a component of the row above it. |
| `ssc-cgl` (again) | 12,256 is the CGLE-wide total across all posts. On 2026-09-19 that same figure was *deliberately withheld* from `ssc-cgl-aao` for exactly that reason (VERIFICATION-QUEUE.md row 50). It entered a different dossier unchallenged the same week. |

## 3. Rows removed

| Exam | Year | Figure | Headline it came from |
|---|---|---|---|
| `appsc` | 2026 | 163 | APPSC Group 1 Notification 2026 Out For 163 Vacancies, Apply Online, Eligibility, Salary - Adda247 |
| `cil-management-trainee` | 2026 | 660 | Coal India MT Recruitment 2026 Notification Out for 660 Vacancies, Last Date Extended - PW |
| `dsssb-prt-tgt` | 2026 | 1,417 | DSSSB Teacher Vacancy 2026 Out for 1417 Posts (TGT, PRT, Computer Science Special Educator) |
| `epfo-apfc` | 2026 | 80 | UPSC EPFO APFC Notification 2026 Out: 80 Vacancies, Eligibility, Exam Date, Application Process |
| `fci-manager` | 2026 | 33,556 | FCI Recruitment 2026 for 33556 Vacancies, Check FCI Exam Details Here - Adda247 |
| `fci-manager` | 2026 | 33,566 | FCI Recruitment 2026: Notification, 33566 Vacancies (Expected), Eligibility, Salary - PW |
| `ibps-clerk` | 2026 | 11,403 | IBPS Clerk Exam Date 2026 Out For 11,403 Vacancies, Check Prelims Exam Date and Shifts - Adda247 |
| `india-post-gds` | 2026 | 28,740 | India Post GDS Recruitment 2026 for 28740 vacancies – Notification, Vacancy, Eligibility & Apply |
| `india-post-gds` | 2026 | 918 | India Post GDS Recruitment 2026: Notification Out for 25,000+ Posts - 918 Vacancies in AP, 419 in Te… |
| `mppsc` | 2026 | 949 | MPPSC Assistant Professor Recruitment 2026 Notification Out for 949 Posts |
| `psssb-patwari` | 2026 | 1,001 | Punjab Patwari Recruitment 2026 Notification Out Soon For 1001 Posts |
| `rrb-je` | 2026 | 4,098 | RRB JE 2026 Notification Out: 4,098 Vacancies, Eligibility, Apply Online - PW |
| `rrb-paramedical` | 2026 | 590 | RRB Paramedical Recruitment 2026: Notification Out For 590 Posts |
| `sbi-clerk` | 2026 | 1,538 | SBI Clerk (Junior Associate) Recruitment 2026 Notification Out - Apply Online for 1538 Posts - FreeJobAlert |
| `ssc-cgl` | 2026 | 12,256 | SSC CGL 2026 notification out for 12,256 vacancies; registration begins for Group B and C posts |
| `ssc-cgl` | 2026 | 12,000 | SSC CGL 2026 Notification Out: Application begins for over 12,000 vacancies at ssc.gov.in |
| `ssc-chsl` | 2026 | 2,536 | SSC CHSL Recruitment 2026 Notification Out [2536 Vacancies], Eligibility, Apply Link - Adda247 |
| `super-tet` | 2026 | 12,405 | UP Super TET 2026: Applications begin for 12,405 teacher vacancies - indianexpress.com |

Removed, not downgraded — same reasoning as the 2026-09-18 audit: the confidence enum has no
value weak enough, and a downgraded row still shows the number to a student.

## 4. Worth re-sourcing rather than forgetting

- **`sbi-clerk` 1,538.** This figure is already known to be *correct* — it corresponds to a real
  SC/ST/OBC backlog drive, Advt. CRPD/CR/SPLDRIVE/2026-27/16 (`HANDOFF.md` §9). It was removed
  because its citation pointed at FreeJobAlert, not because the number is wrong. It should go back
  in, cited to the advertisement itself.
- The other seventeen are unassessed. The scan now queues each one as a lead in
  `NEWS-SCAN-QUEUE.md`, which is where they should be worked.

## 5. What was left alone, and why

- **`super-tet` 15,012 (`verified`).** Does not carry the scraper's signature: the scan always
  wrote `confidence: "reported"` with the headline as the label, and this row is `verified` with a
  structured label naming the notification and its split. It is weakly cited (bare
  `https://upessc.up.gov.in`) and belongs to the separate homepage-citation concern being tracked
  in `VERIFICATION-QUEUE.md`, not to this defect.
- **`exams.json.vacancies` for the affected exams.** Still holds the news-derived values, but
  every one of them carries `provenance.vacancies.confidence` of `unverified` or `placeholder`,
  so `src/utils/provenance.js` already suppresses them from display. These are due to be replaced
  wholesale when the summary field becomes derived from the dossier, so they were not edited here.
  The one exception is `sbi-clerk`, whose `exams.json` figure is the properly verified 5,583 and
  was never overwritten.

## 6. The fix

`sync-exams.mjs --scan` no longer writes to any data file. On a headline match it appends a lead
to `data-sourcing/NEWS-SCAN-QUEUE.md` — exam, claimed figure, headline, link, status `unreviewed`,
plus a dedupe key so a recirculating headline is queued once rather than twice a day. The workflow
now stages only that queue file, so the job has nothing to commit exam data with even if the
script were changed back. The GitHub issue it raises now says a lead needs checking, instead of
the previous claim that the database had been updated.

## 7. The standing lesson, extended

The 2026-09-18 audit's tell was **a value repeated across exams that should not share one**.
This defect adds a second: **a citation that points anywhere other than the conducting body**.
Both are checkable mechanically, on the whole dataset, in seconds:

```bash
# citations that are not the conducting body
grep -rl "news.google.com\|adda247\|testbook\|freejobalert\|careerpower" public/exam-details/

# figures repeated across exams that should not share one
# (group by value, count distinct exams — see AUDIT-2026-09-18)
```

Worth running both after any bulk change, and before trusting any batch of incoming data.

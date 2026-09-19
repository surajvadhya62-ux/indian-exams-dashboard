# Handoff — India Exams Dashboard

**Date:** 2026-09-19, third update of the same day (supersedes the 2026-09-18 handoff and both
earlier 2026-09-19 versions — the two-tier model, aggregator discovery, the discovery triage,
and email notifications are all now built; see §2a, §10a)
**Owner:** Suraj (chartered accountant, **not a developer** — explain in plain language, use
audit/accounting framing where it helps, avoid engineering jargon)
**Purpose:** everything a fresh session needs. Facts below were measured, not assumed.

> **➡️ Picking this up fresh? Go to §10b first.** That section is the live thread — a proposal
> the owner has been shown and not yet answered (fix the site's own overclaimed coverage
> figures, and build a Coverage & Method page). Everything else in this document is finished
> work or a standing reference. §13 lists what else is waiting on an owner decision.

---

## 0. Read this first

1. **The project lives at `/Users/surajvadhya/Projects/indian-exams-dashboard`.**
   `Documents/kimi/workspace/indian-exams-dashboard` is a **symlink** to it, so an edit through
   either path hits the same file. **Do not move it into `Documents`** — macOS blocks scheduled
   background jobs from reading `Documents`/`Desktop`/`Downloads` (exit 126).
2. **`data-sourcing/HANDOVER.md` (2026-09-14) is stale.** It predates the git remote and the
   GitHub Pages deployment.
3. **Do not run portal fetching on GitHub Actions.** Indian government portals refuse US traffic:
   22/38 readable from India, 12/38 from GitHub's San Jose runner. Evidence in
   `connectivity-report.md`.
4. **The two-layer design question is settled — `exams.json.vacancies` is now a calculated
   field.** See §2. It used to be hand-maintained separately from the dossier and the two drifted;
   don't hand-edit it again, or the next `derive-vacancies` run will silently overwrite the edit.
5. **`gh` CLI is not installed.** Check GitHub state with `git fetch` + `git log origin/main`.
6. Node is at `/opt/homebrew/bin/node`. Deployment is automatic on push to `main`
   (`.github/workflows/deploy.yml` → GitHub Pages). **All 2026-09-19 work, including the two
   items below, is pushed to `origin/main` as of this update** — `git status -sb` should show
   `main` even with `origin/main`. Always check this yourself rather than trusting this line;
   it was wrong in the version of this handoff written earlier the same day (§12).
7. **Two more things landed later on 2026-09-19, after the rest of this document was written:**
   the `track` field (§3) is now actually read by the UI, and `sync-exams.mjs` no longer
   fabricates data for a newly discovered exam. Both are described where they're structurally
   relevant (§3, §10) rather than as a separate changelog — this handoff describes current
   state, not a timeline.
8. **Two scheduled jobs now run on this Mac**, both as LaunchAgents in
   `~/Library/LaunchAgents` (neither plist is tracked in the repo):
   `com.indiaexams.portal-watch` daily at 09:00 (§7) and `com.indiaexams.discover-exams`
   weekly, Mondays at 09:00 (§10a). Check both with `launchctl list | grep indiaexams`.
9. **Two automated emails now send** from `indiaexamsautomation@gmail.com` to the owner —
   one when an exam is actually added, one when a weekly discovery run finds something new
   (§10a). Credentials are in `scripts/automation/notify-config.json`, **gitignored and
   never committed**; `notify-config.example.json` is the tracked template. If the app
   password is ever lost, regenerate at `myaccount.google.com/apppasswords`.
10. **`npm run validate` now checks `exams.json` too**, not just the dossier files (§2a). It
   used to be blind to the master list entirely. A new exam missing any registry-minimum
   field will now fail it.

---

## 1. What the project is

A React/Vite site cataloguing Indian government and competitive exams, with a deep-dive
"dossier" per exam (career ladder, salary, exam scheme, cutoffs/vacancies, official links).

| Measure | Value |
|---|---|
| Exams in `src/data/exams.json` | 499 (was 500 — `tpsc-tcs` removed 2026-09-19 as a duplicate of `tpsc-cce`) |
| Dossiers in `public/exam-details/` | 499 |
| `npm run validate` | 499 checked, 0 errors, 0 warnings |
| Tracks (see §3) | 378 R (recruitment), 117 A (admission), 4 Q (qualification) |
| Exams with a `verified` vacancy figure on the summary field | 186 (was 1 on 2026-09-18) — see §2 |

---

## 2. The two data layers — settled 2026-09-19, `exams.json` is now calculated

This used to be the single most important open risk in the repo. It is now closed, but the shape
still matters for understanding the site.

| | `src/data/exams.json` | `public/exam-details/<id>.json` |
|---|---|---|
| Holds | one flat record per exam — **the summary, calculated, never hand-edited** | the deep dossier per exam — **the only place vacancy data is entered** |
| Vacancy shape | a single `vacancies` string, e.g. `"523 Posts"` | `competition_benchmarks.years[]`, one row per cycle, can hold several rows per year |
| Provenance | `provenance.vacancies{}`, now includes `derived_on` | `confidence`/`source_url`/`as_of` per row (pre-existing) |
| Shown on the exam page? | **No** | **Yes** — the "Cut-offs & Vacancies" tab |
| Read by | `Analytics.jsx`, `pdfGenerator.js` | `CompetitionBenchmarks.jsx` |

**The old consequence, now prevented rather than just documented:** updating `exams.json.vacancies`
by hand used to change nothing a visitor sees, and the two layers would silently drift apart — a
prior session verified a figure, wrote it only to `exams.json`, and the owner correctly reported
that nothing changed on the site.

**The fix:** `scripts/automation/derive-vacancy-summary.mjs` (`npm run derive-vacancies`, with a
`--dry-run`) recalculates `exams.json.vacancies` and `provenance.vacancies` for every exam,
straight from the dossier. Nobody edits the summary field by hand again — fix the dossier, then
re-run the script. **This is a manual step, not a hook.** If a dossier is edited and the script
isn't re-run, `exams.json` goes stale again with no warning. Consider wiring it into `npm run
validate` or a pre-commit hook if this keeps getting forgotten.

**The rule the script enforces**, in order:
1. Only `confidence: "verified"` dossier rows count.
2. A verified row must also **cite an actual document**, not a bare homepage — `citesDocument()`
   in the script checks the URL path. As of 2026-09-19, 165 of 541 verified dossier rows fail
   this and stay blocked from the summary (`--list-blocked` prints them). Two of the rows this
   caught turned out to have no notification behind them at all (§4d).
3. Rows flagged `exclude_from_rollup: true` are skipped — for a real, verified figure that must
   not be summed with a neighbour (two hiring routes that may target the same posts; a drive
   partly cancelled after publication). Set this flag by hand when adding such a row.
4. What survives is grouped by the most recent year and summed.
5. If nothing survives, the field is cleared, not left stale or guessed.

**Track A (admission) and Q (qualification) exams are excluded from all of the above** and always
resolve to `not_applicable`, driven off the `track` field specifically — **not** off prior
`provenance`. An early version of this script inferred the admission/qualification classification
from what the exam's provenance already said, which would have started publishing college seat
counts as job vacancies the first time an admission exam's provenance was ever touched (e.g.
`kcet` → "1,20,000 Posts", Karnataka's engineering seat pool, not a government job). Caught before
it shipped. If this script is ever rewritten, keep the `track`-based exclusion — it is the reason
119 exams don't have a seat count mislabelled as a vacancy count on their page.

**SBI Clerk's two live cycles** (a general drive and an SC/ST/OBC backlog drive, different
figures) is exactly the case the dossier's year-array was built to express and the flat string
could not — the summary now reports whichever cycle is most recent, from the dossier, correctly.

---

## 2a. The two-tier registry/dossier model — built 2026-09-19 (later the same day)

`INCLUSION-POLICY.md` §4's "registry entry vs. full dossier" split, previously an open schema
question (§10 used to describe it as the real remaining prerequisite for discovery), is now a
field: `record_tier`, values `"registry"` or `"dossier"`, on every `exams.json` record. Full
design reasoning is in `data-sourcing/DECISION-2026-09-19-record-tier.md` — read that before
touching this field.

**Calculated, not hand-set** — same discipline as `vacancies` (§2). `scripts/automation/
derive-record-tier.mjs` (`npm run derive-tiers`, with `--dry-run`) looks at each exam's dossier:
no dossier file, or a dossier with no section marked `status: "available"`, → `"registry"`;
otherwise → `"dossier"`. Applied 2026-09-19: **all 499 existing records classify as `"dossier"`,
zero as `"registry"`** — purely additive, nothing changed for a visitor that day.

**`npm run validate` now also checks `exams.json` itself**, not only the dossier files — this
was a real, previously-undetected gap: the validator's `run()` only ever walked
`public/exam-details/`, so a record sitting in `exams.json` with nothing behind it was
invisible to it. It now enforces the registry minimum (name, conducting_body, track,
min_qualification, frequency, official_website — `INCLUSION-POLICY.md` §4) on every record,
checks `record_tier` is present and valid, checks a `"dossier"`-tier record actually has a
dossier file, and checks for duplicate ids (the `tpsc-tcs` class of defect, §1).

**A real bug this surfaced and fixed:** `sync-exams.mjs --add` wrote a new exam's site under a
key called `website`, which matches no field any existing record actually has (`official_website`
is the real field, on all 499), and never asked for `min_qualification` or `frequency` at all —
both required by the registry minimum. A record this function created would have failed the new
validation immediately. Fixed: `--add` now requires `--website`, `--min-qualification` and
`--frequency`, writes them under the correct field names, and sets `record_tier: "registry"`
directly on creation so a newly discovered exam is honest about itself from the moment it
exists. Verified with a real `--add` call that passed validation, then removed.

**On the site:** `ExamCard.jsx` shows a "REGISTRY ENTRY" badge (via `src/utils/recordTier.js`,
the same single-source-of-truth pattern as `trackLabels.js`) in place of the green "VERIFIED"
badge for a registry-tier exam, and `StatsOverview.jsx` reports the dossier/registry split once
any registry-tier exam exists. Nothing visible changed on 2026-09-19 itself, since there are
none yet.

---

## 3. The inclusion policy (in force)

`data-sourcing/INCLUSION-POLICY.md`. Written and ratified 2026-09-18. Defines the population so
"exhaustive" is measurable. Three tracks (R recruitment / A admission / Q qualification), a
six-condition inclusion test, a unit-of-record rule separating a distinct exam from an edition of
one, and a two-tier registry/dossier model.

Owner's settled rulings (§8 of that document): PG/doctoral admission tests in scope; state CET
cells in scope; **autonomous bodies in scope, government-*aided* private institutions out** —
the test is creation and funding, not the word "autonomous"; rejected candidates recorded in
`data-sourcing/EXCLUSIONS.md`.

A `track` field (R/A/Q) exists on all 499 records, and **as of 2026-09-19 it's wired into the
UI** — the exam cards, the detail modal (badges, the Career Progression tab, the type filter),
`StatsOverview`, `Analytics`, and the PDF exporter all now branch on `track` via a shared
`src/utils/trackLabels.js` helper, instead of falling back to the two-way `exam_type` switch.
This closed a real, visible bug: CA, CS, CMA and AIBE (track Q) were displayed everywhere as an
"Entrance Exam," including a literally false claim on the Career Progression tab ("this is an
academic entrance exam, not a recruitment"). `exam_type` itself was **left alone deliberately**
— it still has only two values (`job`/`entrance`) and the dossier validator
(`scripts/data-sourcing/validate-details.mjs`) and `sync-exams.mjs` still key off it internally,
so it isn't going away; only the *UI's* reads were moved to `track`. Two places that write into
the app's own filter state by key name (`Analytics.jsx`'s central/state chart drill-down
buttons) had to be updated in the same change, since renaming the filter key without checking
every caller would have silently broken them.

**Not done, and flagged as a genuine open question, not an oversight:** the Wizard's job/entrance
picker and Analytics' central-vs-state comparison chart still bucket track Q under "Entrance."
That's a product/UX decision (add a third bucket, or not), not a labeling bug like the ones
above — left for the owner to decide, not silently changed.

**Measured, as of 2026-09-19 (was "ten files" before the change):** three UI files still compare
`exam_type` directly — `Analytics.jsx` (8 comparisons: its own local type filter, two KPI counts,
and the central/state chart), `ExamWizard.jsx` (1, the purpose picker), and the owner's own
`syllabusTaxonomy.js` (1, untouched by design). The first two are exactly the deliberate
product-decision leftovers above. Three scripts also read it — `validate-details.mjs`,
`build-work-queue.mjs` and `sync-exams.mjs` — where branching on `job`/`entrance` is correct
behaviour (it drives which dossier sections are required), not a bug to migrate.

The track Q boundary itself is settled — see §8 ruling 5 in `INCLUSION-POLICY.md`: Q means the
exam confers a professional designation or right to practise from a statutory body (ICAI, ICSI,
ICMAI, the Bar Council). UGC-NET and CSIR-NET stay track A (eligibility to apply, not a licence).
NISM Regulatory Certifications is flagged as worth a second look — structurally closer to AIBE
than to an entrance test — once there's an actual `track` filter to judge it against, which there
now is.

---

## 4. ⚠️ Data integrity — the defining issue of this project

**Five** separate fabrication/contamination defects have been found (two more since the
2026-09-18 handoff). Assume more exist — none of the five were found by looking for defects in
general; each was found incidentally while doing something else. There has been no systematic
sweep.

### 4a. `exams.json` placeholder vacancies (found, marked, suppressed)
500 records carried a vacancy figure; only 242 distinct values; 92 read "650 Posts". Every record
now carries `provenance.vacancies.confidence`:

| Confidence | Count | Meaning |
|---|---|---|
| `not_applicable` | 121 | admission/qualification exam; figure removed |
| `placeholder` | 228 | value shared with another exam, never researched |
| `unverified` | 150 | unique but uncited |
| `verified` | 1 | SBI Clerk, checked against the notification PDF |

`src/utils/provenance.js` enforces the rule: **only `verified` reaches a student.**

### 4b. Invented display data (fixed)
- `Analytics.jsx` assigned **450 posts** to any exam with no parseable figure, then summed the
  result into a chart headed "Estimated Vacancy Volume".
- `pdfGenerator.js` fabricated a two-year competition table when a dossier had none — 500,000
  applicants and "1,000+" vacancies for the current year, 480,000 and "950+" for a prior year
  that never happened — beneath a footnote asserting the figures came from official
  notifications.

Both now withhold instead of inventing.

### 4c. Fabricated dossier benchmarks (found 2026-09-18, 170 rows removed)
**170 of 500 exams** carried a `competition_benchmarks` row marked `confidence: "verified"` whose
numbers were generated from a fixed ratio. All 170 matched simultaneously:
`applicants === vacancies * 185`, `selectivity_ratio === "approx. 1 in 185"`,
`as_of === "2025-09-01"`, source_url = the body's homepage. Ten vacancy values covered all 170;
92 shared 650 — the same default as 4a, so the defect was written into **both** layers.
AIBE (a pass/fail bar exam with no vacancies) and ACET were among them.

Full record: `data-sourcing/AUDIT-2026-09-18-fabricated-benchmarks.md`.

Rows were **removed**, not downgraded: the schema's confidence enum
(`verified` | `reported` | `estimate`) has no value weak enough, and a downgraded row would still
display the number.

**Verified dossier rows: 628 before → 459 after.**

### 4d. News-scraper writing straight to the database (found and fixed 2026-09-19)
`.github/workflows/auto-exam-sync.yml` ran `sync-exams.mjs --scan` twice daily. It matched Google
News headlines against exam names and wrote any number it regex-matched near "vacancies" straight
into the dossier and `exams.json`, `confidence: "reported"`, source_url pointing at the news
article. This was documented in the 2026-09-18 handoff (§9, below) as writing to `exams.json`
only — it also wrote to the dossier, which the site actually displays. That half was undocumented
until this defect was traced.

**18 rows across 15 high-traffic exams** had reached the live-facing dossier before this was
caught, including `ssc-cgl`, `sbi-clerk`, `ibps-clerk`, `india-post-gds`, `super-tet`, `rrb-je`.
Two duplicate figures on the same exam-year (`fci-manager`: 33,556 and 33,566, one headline
labelled "(Expected)"); a state's regional share published as a national total
(`india-post-gds`: 918, Andhra Pradesh's slice alone); a figure that duplicated a component
already inside a verified row beside it (`super-tet`).

**Fixed:** `sync-exams.mjs --scan` no longer writes to any data file. It appends a lead to
`data-sourcing/NEWS-SCAN-QUEUE.md` instead (exam, claimed figure, headline, link, status
`unreviewed`, a dedupe key). The workflow now stages only that queue file. Full record:
`data-sourcing/AUDIT-2026-09-19-news-scraped-benchmarks.md`.

### 4e. Phantom rows with no underlying notification (found 2026-09-19, 4 rows removed)
Two exams — `spices-board-field-officer` (2023: 28, 2021: 20) and
`tea-board-development-officer` (2023: 22, 2020: 18) — carried `verified` rows for years with **no
notification at all**, confirmed by checking each conducting body's own recruitment archive
directly. This is a different failure from "uncited": uncited means the source hasn't been found
yet; this means the event did not happen. Neither generation pattern (4a's placeholder, 4c's
185x-ratio) explains these — they simply haven't been checked before. Full record:
`data-sourcing/AUDIT-2026-09-19-phantom-aggregator-rows.md`.

**This was found by accident**, while re-sourcing two exams that happened to be in a batch. No
systematic check of whether a `verified` row's underlying notification actually exists has been
run across the other ~537 verified rows. That is the natural next audit.

### The standing lesson, now in three parts
1. **A value repeated across exams that should not share one** (caught 4a, 4c).
2. **A citation pointing anywhere other than the conducting body** — news domains, coaching
   sites, job-alert mirrors, or a bare homepage with no document (caught 4d, and is what
   `derive-vacancy-summary.mjs`'s `citesDocument()` check now enforces mechanically before a
   figure reaches the summary).
3. **A `verified` row whose source was never stronger than "unresolved"** is worth a direct check
   against the conducting body's own archive, not another attempt at the same citation (caught
   4e). A row that survives checks 1 and 2 is not automatically safe.

None of these are theoretical — each was the specific tell that caught a real defect this month.

---

## 5. What is trusted right now

| Layer | Status |
|---|---|
| 541 dossier rows marked `verified` | A large share now genuinely document-checked — every re-sourced row from batches 1-35 (§6) is cited to a specific, directly-downloaded or owner-opened document, several with actual screenshots on disk in `data-sourcing/screenshots/`. The pre-existing majority is still **analytical assurance only** (no generation pattern found; does not confirm any individual figure). No systematic split between the two has been done. |
| 510 dossier rows marked `reported` | Uncited or secondary-sourced. Not shown with a badge. |
| 186 `exams.json` figures marked `verified` | Calculated from the dossier (§2), up from 1 (SBI Clerk only) on 2026-09-18. Each traces back to whichever dossier row(s) fed it. |
| 165 dossier rows marked `verified` but excluded from the summary | Cite only a bare homepage, not a document. `npm run derive-vacancies -- --list-blocked` prints them. This is the visible work queue — treat a blank summary figure as "needs a citation," not "no data." |

**Do not describe the pre-2026-09 rows as verified-and-checked**, even where the tag says
`verified`. Two of them (§4e) turned out to be phantom despite the tag. Sampling the rest
substantively is still the natural follow-up, and now has a head start: the 165 blocked rows are
already known to be weak; start there.

---

## 6. Current work in progress — re-sourcing the 170

**Status as of 2026-09-19: 25 of the original 34 batches fully done, 9 partial, plus a
"Batch 35 (cleanup)" pass over everything the first attempt held back — most of which is now
also resolved.** This section used to say the work hadn't started; it is now most of the way
through.

- `data-sourcing/VERIFICATION-QUEUE.md` — the 170 exams, popularity-ordered, each row updated
  with what was found, what was entered, and why anything was held.
- `data-sourcing/ANTIGRAVITY-BATCHES.md` — the 34 original batches plus Batch 35 (cleanup),
  each marked `[x]` done, `[~]` partial, or `[ ]` not started, with a one-line summary of outcome.

**Two tools are in play, not one.** Batches 1-20 ran through **Google Antigravity** (agentic IDE,
runs on the owner's Mac from an Indian IP, captures real screenshots — check
`data-sourcing/screenshots/` for the exam's filename before assuming a batch has no visual
evidence). From batch 21 onward the owner has also used **Ling 3.0**, a text-based tool with no
screenshot capability — for that tool, "the owner opened the source PDF himself and confirmed the
figure" is the equivalent check, and an empty screenshots folder for a Ling 3.0 batch's exams is
expected, not a red flag. Some later batches (27, 29, 32, 33) came back with real downloaded PDFs,
OCR text, and screenshots again — check `data-sourcing/screenshots/` and the exam's dossier
`source_label` before assuming which tool produced a given row.

**The workflow, and the rule that matters:**
1. Owner runs a batch (either tool); it returns figures, and ideally a document link or screenshot.
2. The human check — screenshot, or the owner opening the PDF directly — is what makes a figure
   `verified`. Unchecked extraction, or extraction sourced to a coaching site / job-alert mirror /
   bare homepage instead of the conducting body, stays at `reported` and off the page.
3. Results come back to Claude, which checks each figure against the *existing* dossier entry
   before writing anything — several real corrections this session were only caught this way
   (§4, and see the commit `data(vacancies): re-source 39 exams from cleanup batches 21-35` for
   the specific list). Writes go to the **dossier** only (not `exams.json` — see §2, now
   calculated from the dossier automatically).
4. **Default incoming batch data to `verified` without demanding proof each time** — the owner
   checks the source himself before or after sending a batch. The one exception: hold and flag
   anything that looks like a genuine problem regardless of whether it was checked — wrong scope,
   an impossible date, a figure that contradicts an existing verified row, a source that's a bare
   homepage or a coaching-site mirror. That's a data-integrity catch, not a process-compliance
   step, and it has caught real issues (§4).

**The prompt's critical instruction:** `applicants` must be null unless a document states it.
The entire 4c defect was derived applicant counts. A null is worth more than a plausible figure.

**Never give Antigravity or Ling 3.0 write access to this repo.** Data entered without a
checkable source trail is indistinguishable from data that was invented.

**Still open in the queue** (check `data-sourcing/VERIFICATION-QUEUE.md` for current detail on
each): `reet`, `csphcl-line-attendant`, `iocl-apprentice`, `maha-vanrakshak` (two independent
transcriptions of the same vacancy table don't sum to their own stated totals — needs a screenshot,
not another retyping), `ongc-finance-officer`, `pgimer-nursing-officer` (PGIMER itself withdrew
this vacancy record pending a roster revision — don't enter it even if re-offered), `tn-mrb-staff-nurse`,
`uk-judicial-service` (same advertisement number gives 8 vacancies in one document and 16 in
another — needs both documents opened side by side), `upsssc-aso`, `upsssc-tubewell-operator`. Plus
one structural question that isn't a sourcing task: **`nia-si-inspector`** — NIA runs no
independent competitive exam of its own; open-market hiring goes entirely through SSC CGL
(already a separate exam in this database), and NIA's own direct notices are deputation-only, not
open to the public. This may not meet the inclusion policy's own criteria for a distinct exam.
Needs the owner's call, not more sourcing.

---

## 7. The portal watcher

Deterministic change detection over authority notice boards. **No AI dependency** — no API key,
no quota, nothing to break when a model is retired. Reports; never writes to `exams.json`.

| Path | Purpose |
|---|---|
| `scripts/automation/portal-watch.mjs` | the watcher |
| `scripts/automation/run-portal-watch.sh` | wrapper: logs, alerts on failure |
| `~/Library/LaunchAgents/com.indiaexams.portal-watch.plist` | daily, 09:00 |
| `data-sourcing/PORTAL-CHANGE-LOG.md` | review queue, newest first (tracked) |
| `data-sourcing/portal-snapshots/` | working state (gitignored) |

`npm run watch-portals`, ~40s. Reach: **24 of 38** authorities readable, ~1,150 notices watched.
That is 24 of 342 authorities (7.0%), covering 97 of 500 exams (19.4%) — state this honestly.

JS-rendered, needs a browser engine: SSC, UPPSC, Andhra PSC, Maharashtra PSC. Unreachable: SBI,
Bihar, Karnataka, Punjab, Telangana, West Bengal, J&K, Himachal, Manipur, Meghalaya.

**UPPSC is a trap:** it serves a full-looking page whose notices are unrendered template
placeholders. The script detects this (`JS_RENDERED`) rather than recording rubbish.

Controls: `launchctl load|unload ~/Library/LaunchAgents/com.indiaexams.portal-watch.plist`,
`launchctl kickstart gui/$(id -u)/com.indiaexams.portal-watch`.

---

## 8. The vacancy intake pipeline — now superseded, not yet retired

`npm run apply-vacancy-updates` (`--dry-run` supported) reads
`data-sourcing/vacancy-updates.csv` → writes `exams.json` provenance → logs to
`data-sourcing/vacancy-update-log.md` → removes applied rows, leaves rejected ones with reasons.

⚠️ **§2's design question is now settled, and this script writes to the field that settlement
made calculated.** Anything this script writes will be silently overwritten the next time
`npm run derive-vacancies` runs, since that script recalculates `exams.json.vacancies` and
`provenance.vacancies` from the dossier on every run and does not consult this CSV. Running this
script no longer has any lasting effect. It has not been deleted or redirected — that's a
follow-up, either retire it or repoint it at writing dossier rows instead of `exams.json` rows.
Don't rely on it in the meantime.

---

## 9. The auto-sync — fixed 2026-09-19, was live and unvouched for longer than documented

`.github/workflows/auto-exam-sync.yml` runs `sync-exams.mjs --scan` twice daily. It fetches two
Google News RSS queries and regex-matches headlines against exam names.

**Corrected from the 2026-09-18 handoff:** this was previously documented as writing only to
`exams.json`. It also wrote directly into each matched exam's dossier — the layer the site
actually displays — which is how 18 unvouched rows reached 15 live exam pages (§4d) before this
was traced and fixed.

**As of 2026-09-19, it no longer writes to any data file.** A headline match is appended to
`data-sourcing/NEWS-SCAN-QUEUE.md` as a lead (exam, claimed figure, headline, link, status
`unreviewed`) instead. The workflow's git step now stages only that queue file. The GitHub issue
it raises says a lead needs checking, not that the database was updated.

It still **cannot** add a new exam (`addNewExam()` is only reachable via a manual `--add`); the
workflow's "new exam → GitHub issue" step is dead code. `addNewExam()` and its dossier template
**used to** fabricate placeholder data for anything they did create — that was fixed later on
2026-09-19 and is no longer true; see §10.5.

The `sbi-clerk` "1,538 Posts" figure this section previously used as the cautionary example was
removed in the 2026-09-19 cleanup along with the other 17 (§4d) for its citation, not its
accuracy — it corresponds to a real SC/ST/OBC backlog drive (Advt.
CRPD/CR/SPLDRIVE/2026-27/16) and is worth re-entering once sourced to the advertisement itself
rather than a news link.

---

## 10. Owner's strategic priorities

1. **Exhaustive coverage** is the differentiator — well beyond 500 exams.
2. **Only cutoffs and vacancies change materially year to year.** Concentrate update effort
   there; spend the rest on adding exams.

Criticism put to the owner, which they accepted and acted on: cutoffs/vacancies are the hardest
and most dangerous data to automate; breadth dilutes quality unless tiered; "exhaustive" needs an
inclusion policy (now written); discovery should come from aggregators (Employment News, National
Career Service, Sarkari Result) rather than crawling 342 authority sites; the moat is structure
and permanence, not raw coverage.

**Recommended sequence from here — steps 3, 4 and 5 are done:**
1. Finish re-sourcing the 170 (§6) — mostly done, a handful of named exceptions remain
2. Sample the analytically-clean `verified` rows substantively (§5) — not started; the 165
   blocked-from-summary rows (§2, §5) are a natural place to begin, since they're already known
   to be weakly sourced
3. ~~Settle the two-layer design question~~ — **done 2026-09-19** (§2)
4. ~~Gate or disable the unvouched auto-sync~~ — **done 2026-09-19** (§9)
5. ~~Aggregator-based discovery, with the two-tier registry/dossier model~~ — **done
   2026-09-19 (later the same day).** The two-tier model is built (§2a). Discovery is built and
   has produced a first real batch (§10a). **What's next is reviewing that batch**, not more
   scaffolding — see §10a and the open questions (§13).

---

## 10a. Aggregator discovery — built and run once, 2026-09-19 (later the same day)

`scripts/automation/discover-exams.mjs` (`npm run discover-exams`, with `--dry-run`).
Scrapes two public aggregators for exam/recruitment titles and checks each one against the
499 exams already in the database. **Never writes to `exams.json` or a dossier** — same rule
as the news scanner (§9), for the same reason (§4d): it appends unmatched titles to
`data-sourcing/DISCOVERY-QUEUE.md` as leads, nothing more.

**Connectivity checked first, from this Mac (the same Indian-IP environment the portal
watcher runs from), before building anything:**

| Source | Reachable? | Used? |
|---|---|---|
| Sarkari Result (`sarkariresult.com`) | Yes — clean, static, dated posting links | **Yes**, primary source |
| Employment News (`employmentnews.gov.in`) | Yes, but only at `/NewEmp/Home.aspx` — the bare domain and `www.` subdomain both serve dead ends (a redirect stub, a 404). Carries a small genuinely server-rendered table of recent notices. | **Yes**, secondary source |
| National Career Service (`ncs.gov.in`) | Reachable, but its homepage is dominated by private-sector job-market data (Apna, Swiggy, staffing agencies), not government exam notices | **No** — left out deliberately, not attempted half-way. Its actually useful section, if one exists, is behind a specific search/filter flow this script doesn't drive. Flagged as a follow-up in §13. |

**Matching, and why it went through two iterations in one run:** a candidate is treated as
"already known" when either (a) every token of some exam's *acronym* appears in the title, or
(b) at least two of that exam's *name* tokens do. (b) was added only after evidence: the first
version used acronym-matching alone, and a real run showed `upsssc-junior-assistant` (acronym
"UPSSSC JA") wasn't recognised because Sarkari Result's headline spelled out "Junior Assistant"
rather than "JA". The name-overlap threshold is deliberately **2, not 1** — a single-word
version would have matched "UP Primary Teacher" against every teacher-eligibility exam already
in the database (aptet, ctet, htet, ...) and silently discarded a genuine lead. Full reasoning
is in the comments at the top of the script itself — read them before changing the threshold.

**First real run, 2026-09-19:** 212 raw titles fetched (205 Sarkari Result, 7 Employment
News) → 15 dropped as not-an-exam-at-all by a small evidence-based pattern list (certificate
reissues, scholarship disbursals, a general jobseeker registry — none of these are exams) → 127
matched an existing exam → **70 new candidates queued**, `data-sourcing/DISCOVERY-QUEUE.md`.
Employment News rows are flagged `⚠️ needs recurrence check` in the queue, since most of what
it actually surfaces is one-off single-post hiring by an individual PSU or institute (a
professor post, a CEO/MD hire) — real, scrapable, but likely to fail
`INCLUSION-POLICY.md` criterion D (recurrence) or A (a common competitive gateway, not one
org's internal hire). The script doesn't filter these out itself; that judgement belongs to
whoever reviews the queue against the policy, not to a heuristic.

**Update, later the same day: the batch was reviewed.** Every one of the 70 rows in
`DISCOVERY-QUEUE.md` now carries a status and a one-line reason instead of "unreviewed" — see
`git log` for the commit that did it (`docs(data): triage all 70 discovery-queue candidates`).
Breakdown: 12 `STRONG CANDIDATE` (2 with an added classification question), 19 `CANDIDATE`,
17 `REJECT`/`REJECT-leaning`, 11 `NEEDS OWNER'S CALL` (mostly one question asked once — the
Anganwadi/ECCE Educator family, §13), and 9 `ALREADY KNOWN`/`DUPLICATE` — matching misses
confirmed by hand against `exams.json` (Agniveer Air Force, NDA, UKPSC, UPSC IAS/IFS were all
already tracked under wording this script's matcher didn't recognise).

**One matching fix was attempted and reverted in the same sitting** — worth reading if the
matcher is ever touched again. A third check ("trust a single, genuinely distinctive all-caps
acronym word on its own") was added to catch the UKPSC miss, and broke twice: first by picking
"Bihar" (a state name) as `bihar-pcs-j`'s "distinctive" word, which then hid the genuine
"Bihar STET" candidate; then, after restricting to real capitals, by discovering that a
conducting body's own abbreviation ("UPSSSC", "NIELIT") isn't reliably distinctive at the
exam level even when it currently identifies only one tracked exam — `nielit-scientist-b`'s
"NIELIT" wrongly matched the completely different, genuinely new "NIELIT CCC" candidate.
Reverted to the original two checks. Full reasoning is in `discover-exams.mjs`'s own comments
— **do not re-attempt this exact fix** without reading them first.

**Now running weekly, not manual-only.** `com.indiaexams.discover-exams.plist` (installed to
`~/Library/LaunchAgents`, not tracked in this repo — same as the portal watcher's plist),
Monday 09:00, same hour as the daily portal watch. `run-discover-exams.sh` wraps it, logging to
`data-sourcing/discover-exams.log`. A run only emails the owner when it finds something
genuinely new since the last run (`notifyNewDiscoveryCandidates()` in `notify.mjs`) — a quiet
week produces no email at all. `scripts/automation/discovery-seen.json` (gitignored) tracks
what's already been surfaced, and was rebuilt from the 70 already-triaged rows before this went
live, specifically so the first scheduled run wouldn't re-queue and re-email about all of them
as if they were new.

**A second, separate notification now also exists**, on the owner's own standing
requirement: `notifyExamAdded()` in `notify.mjs` fires whenever `sync-exams.mjs --add`
actually succeeds (never on `--dry-run`), regardless of whether the exam came from this
discovery queue or was added by hand. Both notifications share one Gmail account
(`indiaexamsautomation@gmail.com`, sending via an app password) and one config file,
`scripts/automation/notify-config.json` — gitignored, never committed; copy
`notify-config.example.json` to create it. Neither notification blocks its underlying action
on failure — a missing or broken email is logged loudly but never stops an exam being added or
a candidate being queued.

---

## 10b. ⏸️ WHERE THE LAST SESSION STOPPED — a proposal awaiting the owner's yes/no

**This is the live thread. Start here.** Nothing below has been built. The owner asked for a
handoff mid-decision, so this section carries the full argument rather than a summary, to save
re-deriving it.

### How it came up

The owner asked: since dossiers will only be built for exams that pass the criteria, shouldn't
the site have a distinct page showing which exams have full dossiers and which are
listing-only? The answer given was that the instinct is right but a stub-*browsing* page is the
wrong shape — nobody browses a database by completeness, and a page whose entire content is
what hasn't been researched reads as an apology. Four things were proposed instead.

### The four proposed items, and what each is blocked on

| # | Item | Status |
|---|---|---|
| 1 | **A Coverage & Method page** — scope, inclusion criteria, coverage counts, evidence standard, known gaps | **NOT blocked. Recommended to do now.** See below. |
| 2 | **Stubs must sort last** in search results — a registry entry must never outrank a researched exam | Blocked: no stubs exist yet, nothing to sort |
| 3 | **Every headline count must split** ("1,500 exams · 430 full dossiers") | Partly done — `StatsOverview` already splits (§2a); needs doing wherever else a total appears. Invisible until stubs exist. |
| 4 | **A "Request a full dossier" button on stub entries** — turns each stub into a demand signal, which is what `INCLUSION-POLICY.md` §4 says should drive promotion but currently has no mechanism. Cheap: `Feedback.jsx` already posts to the owner's email via formsubmit.co, so the plumbing exists. | Blocked: no stub cards to attach it to |

Items 2–4 become live the moment the first registry-tier exam exists — i.e. as soon as any of
the 12 `STRONG CANDIDATE` rows in `DISCOVERY-QUEUE.md` is added. Do not build them before then;
they are no-ops with zero stubs.

### Why item 1 is not blocked, and is arguably overdue

An initial recommendation said the whole thing was premature because there are zero registry
entries. **That was half wrong, and the correction matters.** Item 1's content is already true
and already interesting today — and there is a live honesty gap on the site right now that has
nothing to do with stubs.

**Measured 2026-09-19, not estimated** (`npm run derive-vacancies -- --dry-run`, plus a direct
count over the dossiers):

| The site currently says | What is actually true |
|---|---|
| "Verified Active Targets: 499" | 186 of 499 carry a verified vacancy figure; 313 publish none |
| "Central & State · 100% Citable" | 165 verified dossier rows cite only a homepage, no document |
| "0.0% Speculation Tolerance · Official Gazette PDFs · Zero Hearsay" | 541 dossier rows are tagged `verified`, but §5 of this document states the pre-2026-09 majority is **analytical assurance only** — no generation pattern found, which is not the same as any individual figure having been checked. Two such rows turned out to be phantom (§4e). |

Those strings are in `src/components/StatsOverview.jsx` (cells 01 and 05). The green "VERIFIED"
badge on `ExamCard.jsx` is more defensible — its tooltip claims the *entry* is a verified
statutory registry entry, not that every figure on it is checked — but "100% Citable" and "Zero
Hearsay" are not defensible against the numbers above.

**The uncomfortable framing, which the owner responds well to (§11):** 170 fabricated rows were
removed, a scraper writing unvouched figures to live pages was shut off, and a whole provenance
system was built — and the front page still says "Zero Hearsay." The front page is now the least
rigorous artifact in the project. It would not survive the standard the owner has applied to
everything else.

### What item 1 actually is — two halves

**(a) Fix the overclaims** in `StatsOverview.jsx` so they state what is true. "186 of 499
figures verified against a source document" is a *stronger* claim than "100% Citable", because
it is checkable and nobody else in this space publishes it.

**(b) Build a Coverage & Method page.** The site has no router — views are hash-based
(`#explore`, `#analytics`, …) switched on `activeView` in `App.jsx`, with the valid list at
`App.jsx`'s `validViews` array. A new view plus a nav entry is the consistent way to add it.
Proposed contents:

- **Scope** — what counts as an exam here; the six inclusion conditions in plain language
- **Coverage** — 499 exams; the R/A/Q track split (378/117/4); the dossier/registry split
  (499/0 today, and that number will move)
- **Evidence standard** — the five confidence levels; that only `verified` figures are shown to
  a student; that 165 rows are currently *withheld* for citing only a homepage
- **Known gaps, stated deliberately** — a database that names its own gaps is more trustworthy
  than one that implies it has none

Also queued, small, and more useful once stubs exist: add the registry/dossier split to the
existing search filters (`SearchFilter.jsx`, alongside domain/state/track) so the owner can pull
up "all stubs" for editorial work without a dedicated page.

### The exact state

The owner was asked "want me to build (a) and (b)?" and replied by asking for this handoff
instead. **So: (a) and (b) are proposed, argued, unstarted, and awaiting a yes/no.** The
outline above is settled enough that once the owner agrees, the work is component-plus-copy —
Sonnet, not Opus (§11).

---

## 11. Working with this owner

- Chartered accountant, not a developer. Plain language; audit framing lands well.
- **Wants to be told which model to use per task.** Haiku for mechanical; Sonnet for ordinary
  coding *and* for reviewing incoming re-sourcing batches against existing records — this is
  demonstrated, not theoretical (batches 21-35, entirely on Sonnet, caught a duplicate exam later
  removed, a wrong advertisement number with a superseded figure, a mislabelled year, and two
  contradictions with existing verified rows); Opus for choosing a rule, changing a schema, or
  questioning whether something belongs at all (e.g. the derived-summary design, the
  `nia-si-inspector` inclusion question); external tools for bulk document reading. Before
  recommending a tier up, check whether the cheaper tier has already done that exact kind of task
  well in this project. Say when switching is not worth the overhead.
- **Asks for criticism directly and acts on it.** Give it straight. Items 4b and 4c surfaced
  because he asked "where did I go wrong" and "why are we doing the same thing again and again."
- He keeps his own work in the tree (`src/utils/syllabusTaxonomy.js`, `StoryGate.jsx` and
  similar). **Never bundle his uncommitted files into an automation commit.** Check
  `git status` before staging.
- Ask before committing when the change is substantial.

---

## 12. Git state at handoff

✅ **Pushed** as of this update. Always re-check this yourself with `git status -sb` rather
than trusting this line; it has been wrong in earlier versions of this handoff the same day.

2026-09-19 commits, later the same day (newest first) — **all pushed**:
```
(this handoff update)
1d2f528 docs: update handoff — discovery batch triaged, weekly schedule and notifications live
b0d4d33 feat(automation): weekly scheduled discovery run, with a notification only when there's something new
c52b161 feat(automation): email notification whenever a new exam is actually added
b60c901 docs(data): triage all 70 discovery-queue candidates
de48abf docs(automation): record and revert a tried-and-broken discover-exams matching rule
40b747c docs: update handoff — record_tier + registry validation built, discovery run once
9740f8a feat(automation): aggregator-based exam discovery, writing only to a review queue
7d116c1 feat(data): add record_tier field, registry-minimum validation, and stub badge
```

**Nothing from the §10b proposal is in this list — none of it has been written.** The working
tree at handoff carries only the owner's own two files (below).

**A private, gitignored file now exists that isn't in the list above and never will
be:** `scripts/automation/notify-config.json` holds the real Gmail sending address and app
password. It's covered by the existing `scripts/automation/*.json` gitignore rule. Its
template, `notify-config.example.json`, IS tracked (explicitly un-ignored in `.gitignore`) —
read that file for what a fresh session needs to know if this credential is ever lost or
rotated.

Earlier 2026-09-19 commits, already on `origin/main`:
```
a4d586c fix(automation): stop sync-exams.mjs fabricating data for newly discovered exams
aa3bc24 fix(ui): wire the track field into the UI, retiring exam_type's binary read
3957355 docs: update handoff for 2026-09-19 — two-layer design settled, two new integrity findings
d35b159 feat(data): derive exams.json vacancies from the dossier instead of hand-editing
f280b90 fix(automation): stop the news scanner writing to the database
f2fb5c5 fix(data): remove tpsc-tcs as a duplicate of tpsc-cce
9eb3e07 fix(data): remove 4 phantom benchmark rows with no underlying notification
422392c data(vacancies): re-source 39 exams from cleanup batches 21-35
```

2026-09-18 commits, already on `origin/main`:
```
8c0fff7 docs(data): verification queue for the 170 exams with removed benchmarks
d969df8 fix(data): remove 170 fabricated competition benchmark rows
bb3dfd7 data(vacancies): verify SBI Clerk 2025 against the official notification
f5bb266 feat(automation): vacancy update intake script and CSV
3e222bc feat(data): add track field, correcting CA/CS/CMA/AIBE classification
f50b27f feat(data): record provenance for every vacancy figure and suppress the unverified
6ec1017 docs(data): settle inclusion policy scope questions; add exclusions register
fef07fb docs(data): inclusion policy defining what belongs in the exam database
557e054 feat(automation): daily portal notice watcher with deterministic change detection
```

There were also many intermediate batch-re-sourcing commits between 2026-09-18 and 2026-09-19
already on `origin/main` (`git log --oneline` for the full list) — the two lists above are the
structural commits, not every commit.

Uncommitted: the owner's own `src/utils/syllabusTaxonomy.js` and `data-sourcing/PORTAL-CHANGE-LOG.md`
(the portal watcher's own output, growing daily) — leave both alone. Check `git status` before
staging anything; these two should never appear in an automation commit's file list.

---

## 13. Open questions

**The four waiting on an owner decision are listed first — everything after them is standing
technical debt, not a blocked conversation.**

- ⏸️ **1. Build the Coverage & Method page, and fix the site's own overclaims? (§10b)** The
  live thread. Proposed, argued with measured numbers, awaiting a plain yes/no. If yes, it's
  Sonnet work: fix two strings in `StatsOverview.jsx`, add one hash-routed view plus a nav
  entry.
- ⏸️ **2. The Anganwadi / ECCE Educator ruling.** One question, asked once, resolves 8 of the
  11 `NEEDS OWNER'S CALL` rows in `DISCOVERY-QUEUE.md`: is this hiring a real, recurring,
  statewide competitive exam, or scattered district-by-district merit-list drives with no
  unified exam behind them? Don't decide these row by row.
- ⏸️ **3. Add the 12 `STRONG CANDIDATE` exams?** Ready to go via `sync-exams.mjs --add`
  whenever confirmed (each needs `--website`, `--min-qualification` and `--frequency`; the
  script now refuses without them). Adding even one of these is what unblocks §10b items 2–4,
  since it creates the first registry-tier record. Strongest of the twelve: MPESB MSPSTET
  (Madhya Pradesh's own teacher-eligibility test — the obvious gap beside the tracked UPTET/
  REET/HTET), NVS Class 6 / JNVST, EMRS, BSF HC Ministerial, BSNL JTO, NTA RIMCEE, MP CPCT.
- ⏸️ **4. `nia-si-inspector` — does it belong in the database at all?** NIA runs no independent
  competitive exam; hiring goes through SSC CGL (already listed separately) or deputation-only
  circulars not open to the public. May fail the inclusion policy's own criteria (§6).

---

- **`data-sourcing/DISCOVERY-QUEUE.md`'s 70 candidates have been triaged (§10a) but not
  acted on.** 12 `STRONG CANDIDATE` rows are ready to add via `sync-exams.mjs --add` as soon
  as the owner confirms them. 11 `NEEDS OWNER'S CALL` rows are waiting on one decision, asked
  once (the next bullet). The `ALREADY KNOWN`/`DUPLICATE` rows (9 of them) can simply be
  deleted from the queue file — they're matching misses, not real candidates.
- **National Career Service (`ncs.gov.in`) was left out of discovery deliberately** (§10a) —
  its homepage is private-sector job data, not government exam notices. Whether it's worth
  the extra work to drive its actual search/filter flow for the government-jobs section it
  presumably has is an open question, not a decided no.
- **The Wizard's job/entrance picker and Analytics' central-vs-state chart still bucket track Q
  under "Entrance."** Flagged in §3 as a product decision, not fixed — a third bucket may or may
  not be wanted; ask the owner rather than guessing.
- **`derive-vacancy-summary.mjs` is a manual step with no enforcement.** A dossier edit that isn't
  followed by `npm run derive-vacancies` leaves `exams.json` stale with no warning. Consider a
  `validate` hook or pre-commit check.
- **`apply-vacancy-updates.mjs` is superseded but not retired** (§8). Anything it writes is
  silently overwritten by the next `derive-vacancies` run. Retire it or repoint it at the dossier.
- **165 dossier rows are `verified` but excluded from the summary** for citing only a homepage
  (§2, §5). This is now the visible re-sourcing queue, roughly the same size as the 170-exam job
  just finished. The existing Antigravity/Ling 3.0 batch pipeline (§6) applies directly.
- **No systematic phantom-row sweep has been run.** §4e's two phantom exams were found by
  accident, not by looking for this defect. Checking whether every `verified` row's underlying
  notification genuinely exists, across all ~537 rows, has not been done.
- **`sbi-clerk`'s 1,538-post backlog-drive figure is worth re-entering** (§9) — it's accurate, it
  was only removed for its citation (a news link), and the real advertisement number is on file
  (CRPD/CR/SPLDRIVE/2026-27/16).
- **`mes-supervisor-barrack-store`'s 502 figure was corrected on citation strength, not because
  the explanation given for the correction actually held up** — see the dossier's own note on
  that row. Worth a cleaner re-check if this exam comes up again.
- **`uk-judicial-service`**: the same advertisement number states 8 vacancies in one document and
  16 in another (a results notice). Needs both opened side by side to resolve, not another
  transcription attempt.
- ~~Surfacing `track` in the UI (filters, badges)~~ — **done 2026-09-19** (§3). Fully retiring
  `exam_type` is **not** planned: three scripts branch on it correctly (§3), so the realistic
  end state is the two fields coexisting, not a migration.
- The 14 unreachable portals; a browser engine for the JS-rendered ones. Antigravity may solve
  this incidentally — it drives a real browser from an Indian IP.
- Linking detected notices to specific exams. The watcher says "a notice appeared", not "exam X
  changed". **This half of the original requirement is still unmet.**
- `sources-config.json` has missing `psc` fields for Delhi and Ladakh.
- **RSMSSB Grade III Teacher (Level 1 & 2) direct recruitment has no dossier entry.** Found
  2026-09-19 while fixing `reet`'s dossier: REET is a qualifying test with no vacancies of its
  own, but its page carried vacancy figures (48,000 in 2022, 31,000 in 2021) that actually belong
  to this separate RSMSSB recruitment exam. Those figures have been removed from `reet`'s page
  (now correctly shows no vacancies), but the underlying exam — likely one of the largest state
  teacher recruitment drives in the country — is missing from the database entirely. Needs a full
  new dossier (career ladder, exam scheme, etc.), not just a benchmark row; flagging so it isn't
  lost. Still not created as of 2026-09-19.

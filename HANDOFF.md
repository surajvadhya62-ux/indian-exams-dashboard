# Handoff — India Exams Dashboard

**Date:** 2026-09-19 (supersedes the 2026-09-18 handoff)
**Owner:** Suraj (chartered accountant, **not a developer** — explain in plain language, use
audit/accounting framing where it helps, avoid engineering jargon)
**Purpose:** everything a fresh session needs. Facts below were measured, not assumed.

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
also still fabricate placeholder data for anything they do create — see §10, this is a
prerequisite for the aggregator work, not yet done.

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

**Recommended sequence from here — steps 3, 4 and the aggregator's prerequisite are done:**
1. Finish re-sourcing the 170 (§6) — mostly done, a handful of named exceptions remain
2. Sample the analytically-clean `verified` rows substantively (§5) — not started; the 165
   blocked-from-summary rows (§2, §5) are a natural place to begin, since they're already known
   to be weakly sourced
3. ~~Settle the two-layer design question~~ — **done 2026-09-19** (§2)
4. ~~Gate or disable the unvouched auto-sync~~ — **done 2026-09-19** (§9)
5. **Aggregator-based discovery, with the two-tier registry/dossier model — next.**
   ~~One prerequisite first: strip `sync-exams.mjs`'s fabricated defaults~~ — **done 2026-09-19.**
   `addNewExam()` and `createDetailDossierTemplate()` used to invent a full dossier for any new
   exam (a `vacancies_notified: 100` placeholder, a generic exam scheme, a two-rung career
   ladder, all cited to the exam's own website or a hardcoded UPSC/UPPSC fallback when no website
   was even known) — exactly the placeholder-defect shape from §4a. Now `id`, `name`,
   `conducting_body`, `domain`, `jurisdiction`, `exam_type` and `track` are required explicitly
   (the script exits with a clear error if any is missing, or if `track`/`exam_type` are
   inconsistent with each other) and every dossier section other than a genuine source link is
   written as `not_available` with an honest note, rather than guessed. Verified with a real
   `--add` call that the output still passes `npm run validate`.
   **What's still actually open, and is the real remaining prerequisite:** the two-tier
   registry/dossier model itself (`INCLUSION-POLICY.md` §4) doesn't exist as a schema yet — all
   499 records are full dossiers today, there's no stub-record shape, and no "this is a stub"
   badge on the site. Before wiring up real discovery, decide how a stub's completeness status
   is recorded — as a value on an *existing* field, or a new one — with the `exam_type`
   two-way-switch trap in mind (§3): ten files already read `exam_type` as a strict binary with
   no branch for a third value, and `track` was nearly walked into the same trap before being
   wired in as its own field. A stub/full-dossier flag should almost certainly be its own field
   too, not a new value squeezed onto something else.

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

✅ **Pushed.** `git status -sb` shows `main` even with `origin/main` as of this update — always
re-check this yourself, since this line was wrong (main was 5 commits ahead, unpushed) in the
version of this handoff written earlier the same day.

2026-09-19 commits (newest first):
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

- ~~Push the local commits.~~ **Done — pushed as of this update (§12).** Still always verify with
  `git status -sb` rather than trusting this line; it was stale earlier the same day.
- **`nia-si-inspector` — does it belong in the database at all?** NIA runs no independent
  competitive exam; hiring goes through SSC CGL (already listed separately) or deputation-only
  circulars not open to the public. This may fail the inclusion policy's own criteria. Needs the
  owner's decision, not more sourcing (§6).
- ~~The aggregator's prerequisite~~ — **done.** `sync-exams.mjs` no longer fabricates data for a
  new exam (§10). **What's actually still open:** the two-tier registry/dossier model itself
  hasn't been built — no stub-record shape, no "stub" badge on the site, and a real schema
  decision (own field vs. new value on an existing one — see the `exam_type` two-way-switch
  trap in §3) needs to be made before it is.
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
- Surfacing `track` in the UI (filters, badges) and retiring `exam_type`.
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

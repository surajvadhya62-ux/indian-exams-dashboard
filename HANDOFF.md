# Handoff — India Exams Dashboard

**Date:** 2026-09-20 (supersedes the 2026-09-19 handoff — the Coverage & Method proposal that
document left as "the live thread" is now built; 10 new exams were added; a full design review
was done and acted on; Google Sign-In was integrated and activated; a second stale-count defect,
unrelated to the first, was found and fixed; the portal watcher now emails cut-off and vacancy
notices instead of only logging them. See §10b–§10f and §7a.)
**Owner:** Suraj (chartered accountant, **not a developer** — explain in plain language, use
audit/accounting framing where it helps, avoid engineering jargon)
**Purpose:** everything a fresh session needs. Facts below were measured, not assumed.

> **➡️ Picking this up fresh?** There is no single blocking proposal this time — three standing
> owner decisions remain (§13), none of them gating other work. The most recent structural
> changes are §10c (10 new exams, a real tier-classification bug caught mid-way), §10d (a design
> review acted on in full, including a real CSS bug caught only by testing, not by trusting a
> log), §10e (Google Sign-In, now live with a real Client ID), and §10f (a second stale-hardcoded-
> number defect — same disease as §2, different organ). Read §0 first regardless.

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
4. **Two summary fields on `exams.json` are calculated, never hand-edited — a third file now
   joins them.** `vacancies` (§2) and `record_tier` (§2a) were already calculated as of
   2026-09-19. As of 2026-09-20, **`src/data/authorities.json` is calculated too** (§10f) — the
   same discipline, applied a third time after the same mistake recurred in a different field.
   Re-run the relevant `derive-*.mjs` script after any change that could affect it; don't hand-edit
   the output.
5. **`gh` CLI is not installed.** Check GitHub state with `git fetch` + `git log origin/main`.
6. Node is at `/opt/homebrew/bin/node`. Deployment is automatic on push to `main`
   (`.github/workflows/deploy.yml` → GitHub Pages). **All work described in this handoff is
   pushed to `origin/main`** — always verify with `git status -sb` yourself rather than trusting
   this line (§12 has the full commit list).
7. **Two scheduled jobs run on this Mac**, both as LaunchAgents in `~/Library/LaunchAgents`
   (neither plist is tracked in the repo): `com.indiaexams.portal-watch` daily at 09:00 (§7) and
   `com.indiaexams.discover-exams` weekly, Mondays at 09:00 (§10a). Check both with
   `launchctl list | grep indiaexams`.
8. **Two automated emails send** from `indiaexamsautomation@gmail.com` to the owner — one when
   an exam is actually added, one when a weekly discovery run finds something new (§10a).
   Credentials are in `scripts/automation/notify-config.json`, **gitignored and never
   committed**; `notify-config.example.json` is the tracked template.
9. **Google Sign-In is live** (§10e). `src/config/googleAuth.js` holds a real Client ID —
   **it is not a secret** (it's a public identifier, safe to have committed) — so don't treat it
   as one or move it into an env var "for safety." If sign-in ever throws `origin_mismatch`
   again, see §10e; the usual cause is a propagation delay after touching the origin list in
   Google Cloud Console, not a code problem.
10. **`npm run validate` checks `exams.json` and every dossier file.** A new exam missing any
    registry-minimum field, or a duplicate id, fails it immediately. Current state: **509
    checked, 0 errors, 0 warnings** (both the dossier pass and the registry pass).

---

## 1. What the project is

A React/Vite site cataloguing Indian government and competitive exams, with a deep-dive
"dossier" per exam (career ladder, salary, exam scheme, cutoffs/vacancies, official links).

| Measure | Value |
|---|---|
| Exams in `src/data/exams.json` | **509** (was 499 on 2026-09-19 — 10 added from the discovery queue, §10c) |
| — with a full dossier | 499 |
| — registry-only stubs | 10 (all 10 additions — see §10c for why the tier-classifier initially got this wrong) |
| `npm run validate` | 509 checked, 0 errors, 0 warnings |
| Tracks (see §3) | 385 R (recruitment), 120 A (admission), 4 Q (qualification) |
| Exams with a `verified` vacancy figure on the summary field | 186 of 509 (37%) — unchanged this update; none of the 10 new exams have vacancy data yet |
| Distinct conducting authorities | **348** (was hardcoded to 342 everywhere on the site until 2026-09-20 — see §10f. Not simply 342 + 7 new ones; a real duplicate-naming bug was involved) |

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
   in the script checks the URL path. 165 of 541 verified dossier rows fail this and stay blocked
   from the summary (`--list-blocked` prints them). Two of the rows this caught turned out to
   have no notification behind them at all (§4d).
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
it shipped. If this script is ever rewritten, keep the `track`-based exclusion.

**SBI Clerk's two live cycles** (a general drive and an SC/ST/OBC backlog drive, different
figures) is exactly the case the dossier's year-array was built to express and the flat string
could not — the summary now reports whichever cycle is most recent, from the dossier, correctly.

---

## 2a. The two-tier registry/dossier model — built 2026-09-19, now actually populated

`INCLUSION-POLICY.md` §4's "registry entry vs. full dossier" split is a field: `record_tier`,
values `"registry"` or `"dossier"`, on every `exams.json` record. Full design reasoning is in
`data-sourcing/DECISION-2026-09-19-record-tier.md`.

**Calculated, not hand-set** — same discipline as `vacancies` (§2). `scripts/automation/
derive-record-tier.mjs` (`npm run derive-tiers`, with `--dry-run`) looks at each exam's dossier
and decides `"registry"` vs `"dossier"` from what's actually in it.

**A real bug in this exact script was found and fixed on 2026-09-19, the same day it was
written — read this before touching the script again.** The original rule checked whether *any*
of five dossier sections (including `official_downloads`) was marked `status: "available"`. But
`sync-exams.mjs --add` always writes an `official_downloads` section holding the one discovery
link — so every newly added exam had *something* marked available, and the script classified
every single new exam as `"dossier"` tier on its first run, the opposite of the intended
behaviour. Caught by testing the 10 exams added in §10c, not by trusting the console output.
Fixed by excluding `official_downloads` from the set of sections that count as real dossier
depth (`PROFILE_SECTION_KEYS` in the script now excludes it) — verified the fix reclassifies
exactly those 10 exams to `"registry"` and none of the pre-existing 499.

**`npm run validate` checks `exams.json` itself**, not only the dossier files — enforces the
registry minimum (name, conducting_body, track, min_qualification, frequency,
official_website — `INCLUSION-POLICY.md` §4) on every record, checks `record_tier` is present
and valid, checks a `"dossier"`-tier record actually has a dossier file, and checks for
duplicate ids.

**On the site:** `ExamCard.jsx` shows a "REGISTRY ENTRY" badge (via `src/utils/recordTier.js`)
in place of the green "VERIFIED" badge for a registry-tier exam, and `StatsOverview.jsx` reports
the dossier/registry split. **As of 2026-09-20 this is no longer theoretical** — 10 real
registry-tier exams exist (§10c), so this badge and split are now visibly live on the site for
the first time.

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

A `track` field (R/A/Q) exists on all 509 records and is wired into the UI — the exam cards, the
detail modal (badges, the Career Progression tab, the type filter), `StatsOverview`, `Analytics`,
and the PDF exporter all branch on `track` via a shared `src/utils/trackLabels.js` helper,
instead of falling back to the two-way `exam_type` switch. This closed a real, visible bug: CA,
CS, CMA and AIBE (track Q) used to be displayed everywhere as an "Entrance Exam." `exam_type`
itself was **left alone deliberately** — it still has only two values (`job`/`entrance`) and the
dossier validator and `sync-exams.mjs` still key off it internally.

**Not done, and flagged as a genuine open question, not an oversight:** the Wizard's job/entrance
picker and Analytics' central-vs-state comparison chart still bucket track Q under "Entrance."
That's a product/UX decision, not a labeling bug — left for the owner to decide.

The track Q boundary itself is settled — see §8 ruling 5 in `INCLUSION-POLICY.md`: Q means the
exam confers a professional designation or right to practise from a statutory body (ICAI, ICSI,
ICMAI, the Bar Council). UGC-NET and CSIR-NET stay track A. **NISM Regulatory Certifications and,
as of 2026-09-19, NIELIT CCC and MP CPCT are all flagged as the same open boundary question** —
each is structurally closer to a mandatory practising/eligibility certificate than to a
recruitment or entrance test. See §10c for why the latter two were deliberately held out of the
2026-09-19/20 batch of additions pending this exact ruling, and §13 for the standing question.

---

## 4. ⚠️ Data integrity — the defining issue of this project

**Five** separate fabrication/contamination defects have been found across the project's
history. Assume more exist — none were found by looking for defects in general; each was found
incidentally while doing something else. There has been no systematic sweep.

### 4a. `exams.json` placeholder vacancies (found, marked, suppressed)
500 records carried a vacancy figure; only 242 distinct values; 92 read "650 Posts". Every record
now carries `provenance.vacancies.confidence`. `src/utils/provenance.js` enforces the rule:
**only `verified` reaches a student.**

### 4b. Invented display data (fixed)
- `Analytics.jsx` assigned **450 posts** to any exam with no parseable figure, then summed the
  result into a chart headed "Estimated Vacancy Volume".
- `pdfGenerator.js` fabricated a two-year competition table when a dossier had none.

Both now withhold instead of inventing.

### 4c. Fabricated dossier benchmarks (found 2026-09-18, 170 rows removed)
**170 of 500 exams** carried a `competition_benchmarks` row marked `confidence: "verified"` whose
numbers were generated from a fixed ratio (`applicants === vacancies * 185` etc.). Full record:
`data-sourcing/AUDIT-2026-09-18-fabricated-benchmarks.md`. Rows were **removed**, not downgraded.
**Verified dossier rows: 628 before → 459 after.**

### 4d. News-scraper writing straight to the database (found and fixed 2026-09-19)
`.github/workflows/auto-exam-sync.yml` ran `sync-exams.mjs --scan` twice daily, writing any
number it regex-matched near "vacancies" straight into the dossier and `exams.json`. **18 rows
across 15 high-traffic exams** had reached the live-facing dossier before this was caught. Fixed:
`--scan` no longer writes to any data file — it appends a lead to
`data-sourcing/NEWS-SCAN-QUEUE.md` instead. Full record:
`data-sourcing/AUDIT-2026-09-19-news-scraped-benchmarks.md`.

### 4e. Phantom rows with no underlying notification (found 2026-09-19, 4 rows removed)
Two exams carried `verified` rows for years with **no notification at all**. A different failure
from "uncited" — this means the event did not happen. Full record:
`data-sourcing/AUDIT-2026-09-19-phantom-aggregator-rows.md`. **Found by accident.** No systematic
check of whether a `verified` row's underlying notification actually exists has been run across
the other ~537 verified rows.

### The standing lesson, now in three parts (plus a fourth, added 2026-09-20)
1. **A value repeated across exams that should not share one** (caught 4a, 4c — and see §10f:
   the same generation-family bug, a duplicate real-world entity hiding under two spellings,
   recurred in a completely different field, `conducting_body`, a full session later. This isn't
   a coincidence worth dismissing — it's the same failure mode showing up wherever a string is
   typed by hand instead of read from one canonical source.)
2. **A citation pointing anywhere other than the conducting body** — caught 4d, and is what
   `derive-vacancy-summary.mjs`'s `citesDocument()` check now enforces mechanically.
3. **A `verified` row whose source was never stronger than "unresolved"** is worth a direct check
   against the conducting body's own archive (caught 4e). A row that survives checks 1 and 2 is
   not automatically safe.
4. **A number displayed on the site and a number computed from the data can silently diverge the
   moment either one is hand-maintained separately from the other** — this is the `vacancies`
   lesson (§2) and the `record_tier` lesson (§2a) applied a third time to `authorities.json`
   and roughly a dozen hardcoded literals across the UI (§10f). Once was a design flaw; three
   times in one project is a pattern worth generalising: **anything derivable from `exams.json`
   should be derived at render time or by a tracked `derive-*.mjs` script, never typed as a
   literal.**

None of these are theoretical — each was the specific tell that caught a real defect.

---

## 5. What is trusted right now

| Layer | Status |
|---|---|
| 541 dossier rows marked `verified` | A large share now genuinely document-checked (§6). The pre-existing majority is still **analytical assurance only** — no generation pattern found, which is not the same as any individual figure having been checked. |
| 510 dossier rows marked `reported` | Uncited or secondary-sourced. Not shown with a badge. |
| 186 `exams.json` figures marked `verified` | Calculated from the dossier (§2). Each traces back to whichever dossier row(s) fed it. Unchanged by the 2026-09-19/20 additions — none of the 10 new exams have vacancy data yet. |
| 165 dossier rows marked `verified` but excluded from the summary | Cite only a bare homepage, not a document. `npm run derive-vacancies -- --list-blocked` prints them. This is the visible work queue. |

**Do not describe the pre-2026-09 rows as verified-and-checked**, even where the tag says
`verified`. Two of them (§4e) turned out to be phantom despite the tag.

---

## 6. Re-sourcing the 170 — status unchanged this update

25 of the original 34 batches fully done, 9 partial, plus a "Batch 35 (cleanup)" pass, most of
which is now also resolved. Not touched in this update — see `data-sourcing/VERIFICATION-QUEUE.md`
and `data-sourcing/ANTIGRAVITY-BATCHES.md` for current detail. **Still open in the queue:** `reet`,
`csphcl-line-attendant`, `iocl-apprentice`, `maha-vanrakshak`, `ongc-finance-officer`,
`pgimer-nursing-officer` (PGIMER itself withdrew this record — don't re-enter even if re-offered),
`tn-mrb-staff-nurse`, `uk-judicial-service`, `upsssc-aso`, `upsssc-tubewell-operator`. Plus
`nia-si-inspector` — a structural inclusion question, not a sourcing task (§13).

**Never give Antigravity or Ling 3.0 write access to this repo.** Data entered without a
checkable source trail is indistinguishable from data that was invented.

---

## 7. The portal watcher

Deterministic change detection over authority notice boards. **No AI dependency.** Reports; never
writes to `exams.json`.

| Path | Purpose |
|---|---|
| `scripts/automation/portal-watch.mjs` | the watcher |
| `scripts/automation/run-portal-watch.sh` | wrapper: logs, alerts on failure |
| `~/Library/LaunchAgents/com.indiaexams.portal-watch.plist` | daily, 09:00 — **the loaded copy** |
| `scripts/automation/launchd/` | the committed copies of all three schedules, + `install.sh`. The source of truth: edit here, re-run the installer. See its README. |
| `data-sourcing/PORTAL-CHANGE-LOG.md` | review queue, newest first (tracked) |
| `data-sourcing/portal-snapshots/` | working state (gitignored) |
| `scripts/automation/notify.mjs` → `notifyBenchmarkNotices()` | the cut-off/vacancy email, added 2026-09-20 |

`npm run watch-portals`, ~40s. Reach: **24 of 38** authorities readable, ~1,150 notices watched.
That is 24 of **348** authorities (6.9% — was quoted as 7.0% of 342; the denominator moved,
§10f, the numerator did not) — **the "97 of 500 exams" coverage figure has not been
re-verified against the new total of 509 or the 7 newly added authorities** and should be
rechecked before being quoted again, rather than mechanically rescaled.

JS-rendered, needs a browser engine: SSC, UPPSC, Andhra PSC, Maharashtra PSC. Unreachable: SBI,
Bihar, Karnataka, Punjab, Telangana, West Bengal, J&K, Himachal, Manipur, Meghalaya.

**UPPSC is a trap:** it serves a full-looking page whose notices are unrendered template
placeholders. The script detects this (`JS_RENDERED`) rather than recording rubbish.

Controls: `launchctl load|unload ~/Library/LaunchAgents/com.indiaexams.portal-watch.plist`,
`launchctl kickstart gui/$(id -u)/com.indiaexams.portal-watch`.

### 7a. The cut-off / vacancy email — added 2026-09-20

**The gap it closes.** Until now the project emailed on two events, both of which were *our own
data changing*: an exam added (`sync-exams.mjs --add`), and new discovery candidates (weekly).
Nothing emailed when the **sources** changed. A cut-off or a revised vacancy figure landed in
`PORTAL-CHANGE-LOG.md` — a file someone has to remember to open — and could sit there unread
indefinitely. The owner raised this directly: *"I don't get mail for cut-off and vacancies?"*
He was right; the watcher had no mail capability at all.

Note the asymmetry that made it easy to miss: the two existing emails fire on events the owner
himself causes, which are the ones he already knows about. The silent one was the event nobody
is present for.

**What it does.** After writing the change log as before, the watcher filters the new notices
through `BENCHMARK_KEYWORDS` and mails only those, grouped by authority, links only.

- `BENCHMARK_KEYWORDS` is deliberately much narrower than `NOTICE_KEYWORDS`. The latter decides
  what counts as a notice and stays broad on purpose (the log should over-report); the former
  decides what is worth interrupting someone for. It matches cut-off / merit list / vacancy, and
  `posts` **only when carrying a number** — the bare word appears in nearly every recruitment
  notice ever written and would make the email worthless.
- No separate corrigendum clause: corrigenda that revise a vacancy position say "vacancy" or
  "posts" anyway, while the majority (which only move a date) correctly don't match.
- **A quiet day sends nothing**, so an email always means there is something to open.
- A failed send warns loudly and does **not** fail the run — the notices are already in the log,
  and losing the day's snapshot diff over a mail error is the worse outcome.
- It writes nothing. Same rule as everything else here: links, never figures.

**Measured, not assumed:** run against the 17 notices already in the change log, 9 matched. The
hits were the Cutoff Marks results and the numbered post counts; correctly ignored were admit
cards, interview letters and a press release about a sea buckthorn conclave. One known false
positive — UPSC's standing "Vacancies in UPSC" link, which is their own internal staffing page,
not an exam. Excludable by name if it becomes noise.

Test the format without waiting for a portal: `node scripts/automation/notify.mjs --test-benchmarks`.

### 7b. A missed run was invisible — fixed 2026-09-20

**What happened.** Sunday 2026-09-20's 09:00 run never fired. The Mac was powered off from
23:19 the previous night until 11:46. Nothing reported it — a missed run writes no log entry,
and no entry is indistinguishable from a quiet day. It was found only by reading the log by hand
while answering an unrelated question about the schedule.

**The cause, and the wrong belief behind it.** launchd replays a missed `StartCalendarInterval`
job when the Mac **wakes from sleep**, but **not** when it is switched on after being **powered
off** — that occurrence is simply lost. The plist's own comment asserted the opposite ("if the
Mac is asleep **or off**... macOS runs the job at the next opportunity"). The comment was wrong,
and being wrong in a *reassuring* direction is what kept anyone from looking. Both plists carried
this text; the discovery one still does (same defect, lower stakes — see below).

**The fix, which needs both halves:**

1. `com.indiaexams.portal-watch.plist` now sets `RunAtLoad` — the job also fires at startup.
2. `run-portal-watch.sh` refuses to run twice on a day that already succeeded (`--force`
   overrides). Without this, the startup trigger would be actively harmful: the first run
   consumes the notice diff, so a duplicate reports nothing, and that day's new notices would
   never be emailed.

The guard keys off `RUN FINISHED OK`, not merely an attempt, so a failed morning run is still
retried rather than written off. Verified live: reloading the job fired the startup trigger, the
guard skipped it, and the day still shows exactly one run.

**The weekly heartbeat** — `portal-watch-heartbeat.mjs`, Sundays 19:00
(`com.indiaexams.portal-watch-heartbeat.plist`), an **evening** slot so it reports on a week that
includes that morning's own run.

This is **the one email that always sends**, inverting the rule every other notification here
follows. That is the entire point: silence from the others is ambiguous — no cut-off email means
either nothing was published or the watcher never ran, and those are very different. A note that
arrives regardless makes the absence visible.

It reads only `portal-watch.log` and reports each day as ran / FAILED / DID NOT RUN, with notice
counts. Two judgements worth keeping:

- A day with a `RUN STARTED` and no finish line is **FAILED**, not OK. An interrupted run is a
  failure even though nothing wrote the word.
- A day **before the watcher's first recorded run** is `NOT_SCHEDULED_YET`, listed but not
  counted. Without this the first heartbeat read "2 of 7 days ran" and would have sent the owner
  hunting a fault that wasn't there. A monitor that cries wolf in its own first message teaches
  people to ignore it.

`node scripts/automation/portal-watch-heartbeat.mjs --dry-run` prints the table without sending;
`--days 14` widens the window.

**The discovery job had the identical defect — fixed the same day.** Same wrong comment, same
missing catch-up. Lower stakes (a missed Monday means leads arrive late, not that a diff is
consumed and lost) but fixed anyway, because "it only loses a week" is how a control ends up
never being checked at all.

`com.indiaexams.discover-exams.plist` now sets `RunAtLoad`, and `run-discover-exams.sh` carries
the equivalent guard — **per-week, not per-day**, anchored to the Monday the schedule targets.
Two wrong versions worth not reinventing:

- *"skip if it ran today"* — re-runs on every boot Tuesday through Sunday.
- *"skip if it ran in the last 7 days"* — breaks the anchor. A Wednesday catch-up would suppress
  the following Monday, only 5 days later, and the schedule would drift a little further every
  time it was missed.

Verified against six scenarios (same-week logins, next Monday, a Wednesday catch-up followed by
the next Monday, and a never-run log): all correct, including the drift trap.

**Deliberately not reloaded on 2026-09-20.** Loading a job with `RunAtLoad` fires it immediately,
which would have run discovery a day early and emailed candidates unasked. The already-loaded
definition still fires Monday 09:00 correctly — the schedule did not change — and the new plist
loads at the next login, which is exactly when its catch-up could first matter. It also
self-heals the bad case: if the Mac is off this Monday, the old definition misses it, and the new
one loads at the next boot and catches up.

Its first-ever scheduled run is Monday 2026-09-21; every lead in `DISCOVERY-QUEUE.md` so far came
from manual runs. Worth checking `data-sourcing/discover-exams.log` exists afterwards — the file
does not exist yet at all.

**A mistake worth not repeating.** Verifying the module "imported cleanly" by running
`import("./portal-watch.mjs")` **executes the run** — the file calls `main()` on load. It was
stopped early but had already refreshed the `upsc` and `rrb` snapshots, which are gitignored and
so unrestorable. Effect: one day of those two boards' notices was absorbed as "already seen" and
would never have been reported. Closed by reading both boards directly (RRB: nothing relevant;
UPSC: 23 items, all still on the board). **To check this script parses, use `node --check`, never
an import.**

---

## 8. The vacancy intake pipeline — superseded, not yet retired

`npm run apply-vacancy-updates` (`--dry-run` supported). ⚠️ Anything this script writes is
silently overwritten the next time `npm run derive-vacancies` runs. Not deleted or redirected —
that's a follow-up. Don't rely on it.

**The route that does work** is the dossier, then `npm run derive-vacancies`. Where the owner
wants another AI tool to do that typing against a figure he has already verified,
`data-sourcing/AI-TOOL-PROMPTS.md` (added 2026-09-20) holds the prompts — one for a benchmark
row, one for `sync-exams.mjs --add`, one for assessing a discovery lead without writing anything.
The line those prompts hold, and the reason they exist as a file rather than being retyped each
time: **a tool may type, it may not judge.** `ANTIGRAVITY-BATCHES.md` remains the *research*
prompt, for figures nobody has checked yet; these are the *application* prompts, for figures the
owner has.

---

## 9. The auto-sync — fixed 2026-09-19

`.github/workflows/auto-exam-sync.yml` runs `sync-exams.mjs --scan` twice daily, matching Google
News RSS headlines against exam names. **No longer writes to any data file** — a headline match
is appended to `data-sourcing/NEWS-SCAN-QUEUE.md` as a lead instead. It still **cannot** add a
new exam (`addNewExam()` is only reachable via a manual `--add`).

---

## 10. Owner's strategic priorities

1. **Exhaustive coverage** is the differentiator — well beyond 500 exams.
2. **Only cutoffs and vacancies change materially year to year.** Concentrate update effort
   there; spend the rest on adding exams.

**Recommended sequence — steps 3 through 6 are now done:**
1. Finish re-sourcing the 170 (§6) — mostly done, a handful of named exceptions remain
2. Sample the analytically-clean `verified` rows substantively (§5) — not started; the 165
   blocked-from-summary rows are a natural place to begin
3. ~~Settle the two-layer design question~~ — **done 2026-09-19** (§2)
4. ~~Gate or disable the unvouched auto-sync~~ — **done 2026-09-19** (§9)
5. ~~Aggregator-based discovery, with the two-tier registry/dossier model~~ — **done
   2026-09-19** (§2a, §10a)
6. ~~Fix the site's own overclaimed coverage figures; build a Coverage & Method page~~ —
   **done 2026-09-20** (§10b)

---

## 10a. Aggregator discovery — built 2026-09-19, batch mostly actioned

`scripts/automation/discover-exams.mjs` (`npm run discover-exams`, with `--dry-run`). Scrapes
Sarkari Result and Employment News for exam/recruitment titles, checks each against the existing
database, and appends unmatched titles to `data-sourcing/DISCOVERY-QUEUE.md` as leads — never
writes to `exams.json` or a dossier directly. National Career Service was deliberately left out
(its homepage is private-sector job data, not government exam notices).

**First real run, 2026-09-19:** 212 raw titles → 70 new candidates queued, then triaged: 12
`STRONG CANDIDATE` (2 with a classification question), 19 `CANDIDATE`, 17 `REJECT`, 11
`NEEDS OWNER'S CALL`, 9 `ALREADY KNOWN`/`DUPLICATE`.

**Update, 2026-09-19/20: 10 of the 12 `STRONG CANDIDATE` rows have now been added** — see §10c
for the full list, the research behind each, and a real bug this surfaced and fixed. The other
2 (NIELIT CCC, MP CPCT) were deliberately held back — see §10c and §13.

**Now running weekly, not manual-only.** `com.indiaexams.discover-exams.plist`, Monday 09:00.
A run only emails the owner when it finds something genuinely new since the last run — a quiet
week produces no email. `scripts/automation/discovery-seen.json` (gitignored) tracks what's
already been surfaced.

**A second notification exists**: `notifyExamAdded()` fires whenever `sync-exams.mjs --add`
actually succeeds. Both notifications share `indiaexamsautomation@gmail.com` and
`scripts/automation/notify-config.json` (gitignored). Neither blocks its underlying action on
failure.

---

## 10b. The Coverage & Method proposal — built 2026-09-20, no longer the live thread

**This was the previous handoff's entire "start here" section.** It has been built. What follows
is a compressed record of what was proposed and what shipped — read `git log` for the commit if
the reasoning behind a specific wording choice is needed later.

**What was proposed (2026-09-19):** the owner asked whether the site should show which exams
have full dossiers and which are listing-only. The answer was that a stub-*browsing* page is the
wrong shape, but two things genuinely were overdue: (a) fixing overclaimed strings already on the
site (`StatsOverview.jsx` said "100% Citable" and "Zero Hearsay" while 165 rows cited only a
homepage and the pre-2026-09 majority of "verified" rows had never been individually checked),
and (b) a dedicated Coverage & Method page stating scope, evidence standard, and known gaps
plainly.

**What was built, 2026-09-20:**
- `StatsOverview.jsx`'s cell 01 title changed from "Verified Active Targets" to "Tracked Exams";
  cell 05 changed from a hardcoded "0.0% Speculation Tolerance / Zero Hearsay" to a live,
  computed "N% Vacancy Figures Verified" (N of total, checked against a source document).
- A new view, `src/components/CoverageMethod.jsx`, added at `#coverage`, with a nav entry. Covers
  scope (the six inclusion conditions in plain language), the R/A/Q track split, the
  dossier/registry tier split, the five-level evidence standard, and known gaps stated
  deliberately. All numbers are computed live from the `exams` prop it receives, not hardcoded —
  this matters, because §10f later found and fixed a case where a very similar-looking page
  section (a "24 of 342" figure inside this same component) *had* been hardcoded and had already
  gone stale within the same day.

**Items originally proposed but deliberately not built yet:** a "stubs sort last in search
results" rule, and a "Request a full dossier" button on stub cards. Both were blocked on stub
entries actually existing; both are now unblocked, since §10c created the first 10 registry-tier
records. Neither has been built — flagged as open work in §13, not forgotten.

---

## 10c. Ten exams added from the discovery queue — 2026-09-19/20

Of the 12 `STRONG CANDIDATE` rows in `DISCOVERY-QUEUE.md` (§10a), the owner confirmed adding all
12; **10 were added, 2 were held back** on a real classification question found during the work,
not silently skipped.

**Added, each via `sync-exams.mjs --add` with a researched official website, minimum
qualification and frequency (nothing guessed):** Bihar STET (`bihar-stet`), EMRS staff
recruitment (`emrs-staff-recruitment`), UPESSC Principal (`upessc-principal`), UPESSC PGT Teacher
(`upessc-pgt-teacher`), MPESB MSPSTET (`mpesb-mspstet`), BSF HC Ministerial/ASI Steno
(`bsf-hc-ministerial-asi-steno`), BSNL JTO (`bsnl-jto`), NTA RIMCEE (`nta-rimcee`), NVS Class 6 /
JNVST (`nvs-class-6-jnvst`), UP ITI Admission via SCVTUP (`up-scvtup-iti-admission`).

**One correction made during research:** `upsessb.org` — the site UPESSB used to be reachable
at — now redirects to an unrelated, unrelated-looking domain (likely an expired/hijacked
domain). Used the real successor government site, `upessc.up.gov.in`, instead for both UPESSC
exams. Worth checking again if this ever comes up — a hijacked former-government domain is
exactly the kind of thing that should not end up as a citation anywhere in this project.

**Held back, deliberately, not an oversight:** NIELIT CCC and MP CPCT. Both are
computer-proficiency certifications required for government job eligibility in their respective
states/nationally, not a job or an admission in themselves — the discovery queue's own triage
note had already flagged NIELIT CCC as needing the owner's call on track classification (R/A/Q,
matching the NISM question in §3); while researching the batch, MP CPCT was found to have the
*identical* structure and was flagged the same way rather than guessed at. See §13 — this is
now the specific, narrow form of the standing "NISM/NIELIT CCC track boundary" question.

**A real bug found and fixed in the same piece of work, not a separate incident:** see §2a — the
`record_tier` deriver classified all 10 new exams as `"dossier"` tier instead of `"registry"` on
their first run, the opposite of the intended behaviour, because of an interaction between two
previously-separate, previously-correct changes (`--add` requiring `--website`, and the tier
deriver treating any populated section as "real" dossier content). Caught by testing the actual
output rather than trusting that two independently-correct pieces of code would compose
correctly. Fixed; verified against exactly these 10 exams and the pre-existing 499.

**A second, smaller real bug found here, fixed in §10f, not here:** the MPESB entry above was
initially written with `conducting_body: "Madhya Pradesh Employees Selection Board (MPESB)"` —
the full name — while the other 9 pre-existing MPESB exams use the acronym `"MPESB"`. This
inflated the site's distinct-authority count by one, and was one of two real duplicate-naming
bugs that made a naive "just count distinct `conducting_body` strings" answer wrong. Full story
in §10f; both instances are now fixed in `exams.json` directly.

---

## 10d. A design review, acted on in full — 2026-09-20

The owner asked whether the site needed a design overhaul. It was answered directly, after
actually launching the app (headless Chrome via CDP, not a code read) and looking at desktop,
mobile, and the exam detail modal: **no wholesale rehaul — the visual design is a real asset —
but five concrete things were wrong.** All five were then built.

1. **Four small rendering bugs, fixed in `ExamDetail.jsx`/`SearchFilter.jsx`/`App.jsx`:** the
   Share button in the exam-detail modal was clipped behind the absolutely-positioned close
   button whenever both were present; the exam-detail tab strip is a horizontally-scrollable row
   with no visual affordance that it scrolls, so the last visible tab read as truncated rather
   than "there's more" (added a CSS edge-fade mask); emoji (🇮🇳 🏛️ 💼 📜 🎓 💬 ✈️) were mixed
   into the line-icon set used everywhere else on the exam badges and the share popover's social
   buttons (replaced with react-icons, including brand icons from `react-icons/fa`/`fa6`); and
   two more stale hardcoded counts of the same class §2/§2a/§10f already describe (the search
   placeholder, and the syllabus-overlap "module under maintenance" placeholder's exam count).

2. **The mobile stat wall.** The five `StatsOverview` tiles stacked into three rows (~500–600px)
   above the first actual exam card on a phone — measured at **1131px down on an 844px-tall
   viewport**, 1.3 screens before a visitor saw what they came for. Fixed: on mobile (≤640px)
   the strip is now a single horizontally-scrollable row, same edge-fade treatment as the tab
   strip. Reduced the offset to **889px** — not fully above the fold, and stated honestly as
   such rather than declared "fixed" — but the specific wall the review identified is gone.

3. **Nav consolidation.** 11 flat top-level destinations (`Header.jsx`, `MobileNav.jsx`)
   overflowed the bar on desktop (the 11th item clipped off the right edge) and required an
   undiscoverable horizontal scroll on mobile. Grouped into 6: Explore, Updates, Saved, Calendar,
   plus two dropdowns — **Tools** (Wizard, Screener, Compare) and **About** (Coverage & Method,
   Analytics, 7th CPC Cadres, Guide, Feedback). "Overlap" was deliberately left out of Tools: the
   `#overlap` view currently renders a "module under scheduled maintenance" placeholder (see
   `App.jsx`), and giving a disabled feature a permanent nav slot would be exactly the kind of
   overclaim the Coverage & Method page (§10b) exists to correct elsewhere on the same site.

   **A real bug was caught here during verification, not during the initial build.** Both new
   dropdown panels rendered invisibly — the click fired, `aria-expanded` flipped, the chevron
   rotated, but nothing appeared on screen. A screenshot alone made it look like the feature was
   simply unfinished. The actual cause: the nav bar scrolls horizontally
   (`overflow-x: auto`), and per the CSS overflow spec, pairing `overflow-x: auto` with an unset
   `overflow-y` silently forces the browser to compute `overflow-y: auto` too — clipping anything
   that extends past the bar's own height, even though the dropdown's own computed style reported
   `display: flex` and `visibility: visible`. Only caught by inspecting `getComputedStyle` on the
   actual DOM after the toggle fired; the visual symptom alone was indistinguishable from "not
   built yet." **Fixed** by rendering each dropdown outside its scrolling ancestor, positioned
   with `position: fixed` from the trigger's own `getBoundingClientRect()` rather than
   `position: absolute` relative to a scrolling parent. Verified afterward with fresh browser
   tabs: both dropdowns open, are fully visible, and clicking an item both navigates and closes
   the menu correctly.

4. **A plain-language wording pass**, moderate scope by the owner's own choice (mono kickers
   like "REGISTRY // 01" and flavour names like "Gazette Wire"/"Aspirant Vault" were kept as
   styling, not touched): "Intelligence Terminal" → "509 Indian Government Exams", "Inspect" →
   "View details", "Compensation Scope" → "Pay Range", "Premier Entrances" → "Admission Exams",
   "Pinned Targets" → "Saved Exams", "509 / 509 Targets" → "509 of 509 exams".

5. **Bundle size.** The whole app shipped as one ~2MB (397KB gzip) JS chunk, downloaded before a
   visitor saw a single exam — a real cost on this audience's typical mid-range Android phone
   over mobile data, not a rounding error. Converted every view/modal not needed for the first
   paint of Explore to `React.lazy()` + `Suspense` (Analytics, which alone pulls in recharts at
   404KB; Comparison; Calendar; the exam detail modal; Grades Guide; How-To-Use; Coverage &
   Method; Wizard; Screener; Feedback; Command Palette; Updates Feed; My Dashboard; Walkthrough
   Tour; Auth Modal). The three always-mounted modals (Command Palette, Tour, Auth) are now also
   only *mounted* while actually open — their keyboard shortcuts live in `App.jsx` itself, not
   inside the components, so Cmd+K etc. still work with nothing mounted. Also moved the PDF
   export (`jspdf`/`jspdf-autotable`, 469KB/152KB gzip) from a static import in the always-eager
   `ExamCard`/`ExamGrid` to a dynamic `import()` inside the existing click handler. Dropped a
   dead eager import of `SyllabusOverlapEngine` — the real component nothing renders (see point
   3's maintenance placeholder). **Net effect: main chunk 397KB gzip → 167KB gzip on first load.**

---

## 10e. Google Sign-In — built and activated, 2026-09-20

The owner asked for Google Sign-In. Since this site has **no backend** (§0 point 1 — it's a
static GitHub Pages deploy, same as everything else here), this is Google Identity Services'
client-side ID-token flow: a real "Sign in with Google" button, auto-filling a visitor's real
name/email/photo, sitting **alongside** the existing name/email form and 1-click guest demo (the
owner's explicit choice — not a replacement).

**Files:** `src/config/googleAuth.js` (the Client ID — a public identifier, not a secret, safe
committed), `src/utils/googleAuth.js` (script loading, credential decoding, button rendering —
see its header comment for why the ID token is decoded client-side rather than cryptographically
verified against a backend: there is no protected resource here for a forged token to gain
access to, so that verification step would be theatre, not security). `AuthModal.jsx` renders
the button above its existing tabs. Both the profile card and the header's small account
indicator now show the real Google photo when present.

**Setup is documented for the owner, non-technically, in `data-sourcing/GOOGLE-SIGNIN-SETUP.md`**
— the one thing only the owner could do (creating an OAuth Client ID tied to their own Google
account). They completed it same-day; the real Client ID has been pasted into
`src/config/googleAuth.js` and pushed.

**Verified working**, not just built: in a headless browser, Google's own real iframe button
renders (confirming the SDK accepted the Client ID), and no console errors were present.

**A real, if currently harmless, bug was found and fixed here too:** `google.accounts.id.
initialize()` was called every time the auth modal (re)mounted — that call is meant to be a
one-time global registration, and Google logs its own "called multiple times" warning when it
isn't treated as one (surfaced by React StrictMode's dev-only double-invoke, but the underlying
non-idempotency was real regardless of what triggered it). Fixed: `initialize()` now runs at most
once per page load, dispatching through a `latestOnCredential` reference so the registered
callback is never stale, while `renderButton()` still runs on every mount (it has to — the
container DOM node is fresh each time). Confirmed the warning is gone after the fix.

**One live incident, resolved:** shortly after the real Client ID went live, the owner hit
`Error 400: origin_mismatch` on the actual site. Checked the live URL directly
(`https://surajvadhya62-ux.github.io/indian-exams-dashboard/`, no redirect, no custom domain,
confirmed via `curl`) — it matched exactly what the setup guide told the owner to register. The
most likely cause was Google's own documented propagation delay after adding an authorized
origin (their docs say this can take minutes to hours). **It resolved on its own** without a code
change. If this recurs, check the exact registered origin string in Google Cloud Console for a
trailing slash or `http`/`https` mismatch before assuming it's a bug in this repo.

---

## 10f. The authorities count was wrong — 342 was stale, 348 is correct, found 2026-09-20

The owner asked a plain factual question — is the site's "342 conducting authorities" figure
still right, or should it be 350 (the number a naive live recount gave)? **Neither answer held
up**, and chasing it down properly surfaced a second, independent instance of the exact lesson
§2/§2a already taught (see §4's fourth point).

**342 was a one-time, hand-generated snapshot**, `src/data/authorities.json`, never regenerated
as exams were added. It went stale the moment §10c's 10 new exams introduced authorities it had
never seen. It was also hardcoded as a bare literal, disconnected from that file or from
`exams.json` directly, in **9 more places**: `Header.jsx`'s status pill, `StatsOverview.jsx`'s
stat tile, `App.jsx`'s Explore subtitle, `Feedback.jsx`'s trust row (which also had a stale
"500 Exams Verified" sitting right next to it), `UpdatesFeed.jsx`'s authority filter (5 separate
mentions — the dropdown's actual `<option>` list was already built from live data; only the
surrounding labels were frozen), `CoverageMethod.jsx`'s own known-gaps line (the page built in
§10b to *fix* overclaims had already grown one stale number of its own, within the same day), and
`WalkthroughTour.jsx`'s onboarding copy (8 stale numbers across 4 tour steps: exam count,
authority count, and a central/state split that had also drifted, from 247/253 to the current
252/257).

**350 — a naive `new Set(exams.map(e => e.conducting_body)).size` — was inflated by a real data
bug**, not just "342 plus 7 new ones minus zero." One of §10c's new exams (MPESB MSPSTET) was
entered with the conducting body's full spelled-out name, while the other 9 MPESB exams already
in the database use the acronym — the same real authority, counted twice under two spellings.
Fixing this surfaced a second, **pre-existing** instance of the identical issue ("MP ESB" vs
"MPESB", on `mp-pat`) that predates 2026-09-19 entirely and had nothing to do with this week's
work. Both fixed in `exams.json` directly, dropping the naive count from 350 to 349, then to
**348** once the file was properly regenerated (below).

**The actual number is 348.**

**The fix, matching the established pattern exactly:** wrote
`scripts/automation/derive-authorities.mjs` (with `--dry-run`, same conventions as
`derive-vacancy-summary.mjs` and `derive-record-tier.mjs`). `authorities.json` is now
**calculated from `exams.json`, never hand-edited** — re-run it after any change that could add,
remove, or rename a `conducting_body`. One real improvement made along the way, not scope creep:
the original 342-entry snapshot gave every single authority the same generic placeholder website
(`https://www.india.gov.in`) — the regenerated file uses each authority's actual
`official_website`, already present on every exam record, which is strictly more useful and
nothing new was fabricated to produce it.

Every hardcoded reference above now reads a live count — either a new `totalAuthorities` prop
threaded down from `App.jsx` (computed once via `useMemo`, same pattern as `totalExams`), or
computed inline from a component's own `exams` prop where one was already available. **Verified
in a real browser, not just built:** Header, the stat tile, the Explore subtitle, Coverage &
Method, and the Updates filter all show 348 consistently. `IndiaMap.jsx`'s stale state-exam
count (253) was also found and fixed to the live 257 while auditing for this exact class of bug
nearby — not part of the original question, but the same disease, caught while the diagnostic
tools were already out.

---

## 11. Working with this owner

- Chartered accountant, not a developer. Plain language; audit framing lands well.
- **Wants to be told which model to use per task.** Haiku for mechanical; Sonnet for ordinary
  coding, for reviewing incoming re-sourcing batches against existing records, and — demonstrated
  again in §10c/§10d/§10e/§10f — for exactly the kind of "build it, then verify the actual output
  before believing it, then fix what verification finds" work that produced four separate real
  bug catches in one day; Opus for choosing a rule, changing a schema, or questioning whether
  something belongs at all. Before recommending a tier up, check whether the cheaper tier has
  already done that exact kind of task well in this project.
- **Asks for criticism directly and acts on it.** The design review (§10d) is a clean example:
  asked "does the site need a design rehaul," told plainly that the answer was no but five
  specific things were wrong, and all five were then built the same session.
- **A screenshot alone is not verification.** Four separate real bugs this session (§2a's
  tier-classifier, §10d's clipped dropdowns, §10e's `initialize()` warning, §10f's stale
  authority count) were each the kind of thing that *looks* fine in a screenshot or a "it
  works" log line, and were only caught by inspecting actual computed state — `getComputedStyle`,
  a fresh `git diff`, a re-run of the actual derivation script, a direct recount against the
  source data. Default to checking the underlying state, not just the visible symptom, before
  reporting something as done.
- He keeps his own work in the tree (`src/utils/syllabusTaxonomy.js`, `data-sourcing/
  PORTAL-CHANGE-LOG.md`, `StoryGate.jsx` and similar). **Never bundle his uncommitted files into
  an automation commit.** Check `git status` before staging — this was done correctly across
  every commit in §10b–§10f; both his files remained untouched throughout.
- Ask before committing when the change is substantial, and **ask again before pushing**
  specifically when the change makes something newly live for real visitors (Google Sign-In
  going from built-but-hidden to actually active was treated as its own confirmation point,
  separate from "should I commit this code at all").

---

## 12. Git state at handoff

✅ **Pushed** as of this update. Always re-check this yourself with `git status -sb` rather than
trusting this line.

2026-09-19/20 commits, this update, newest first — **all pushed**:
```
(this handoff update)
9118a25 fix(data): stale "342 authorities" was hardcoded in 9 places; real count is 348
9c259a7 feat(auth): activate Google Sign-In with the owner's real Client ID
cde2922 perf(bundle): code-split lazy-loaded views, defer jspdf/recharts to first use
0d2ca59 feat(ui): fix rendering bugs, collapse mobile stat wall, consolidate nav, plain-language copy
cf7d936 feat(auth): add Google Sign-In as an option alongside the existing form
455618f fix(ui): make Explore tab header count dynamic instead of hardcoded 500
bed8ef7 feat(data): add 10 confirmed exams from discovery queue as registry stubs; fix record_tier bug
446d6aa feat(site): fix front-page overclaims, add Coverage & Method page
```

**Note on hashes:** `446d6aa` and `bed8ef7` are the *rebased* hashes. They were originally
committed as `97bb5e3`/`5077ad2`, but `origin/main` had moved (an automated `News scan: queue
vacancy leads for review` commit from the auto-sync workflow, §9) between committing and pushing,
so a `git pull --rebase` replayed them with new hashes before the push succeeded. If searching
history for the original hashes, they won't be found — this is expected, not data loss.

Already on `origin/main` before this update (from the automated workflow, not this session):
```
4bef849 News scan: queue vacancy leads for review [skip ci]
```

Earlier 2026-09-19 commits (from the previous handoff, still accurate):
```
1d2f528 docs: update handoff — discovery batch triaged, weekly schedule and notifications live
b0d4d33 feat(automation): weekly scheduled discovery run, with a notification only when there's something new
c52b161 feat(automation): email notification whenever a new exam is actually added
b60c901 docs(data): triage all 70 discovery-queue candidates
de48abf docs(automation): record and revert a tried-and-broken discover-exams matching rule
40b747c docs: update handoff — record_tier + registry validation built, discovery run once
9740f8a feat(automation): aggregator-based exam discovery, writing only to a review queue
7d116c1 feat(data): add record_tier field, registry-minimum validation, and stub badge
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
already on `origin/main` (`git log --oneline` for the full list) — the lists above are the
structural commits, not every commit.

**A private, gitignored file exists and never will be committed:**
`scripts/automation/notify-config.json` (Gmail sending address and app password). Its template,
`notify-config.example.json`, IS tracked. **`src/config/googleAuth.js`, by contrast, IS
committed with a real value** — see §10e for why that's correct and not an oversight.

Uncommitted, and correctly left alone throughout every commit in this update: the owner's own
`src/utils/syllabusTaxonomy.js` and `data-sourcing/PORTAL-CHANGE-LOG.md`. Check `git status`
before staging anything; these two should never appear in an automation commit's file list.

---

## 13. Open questions

**Three are waiting on an owner decision — everything after them is standing technical debt,
not a blocked conversation.**

- ⏸️ **1. The NISM / NIELIT CCC / MP CPCT track boundary.** One ruling, asked once, resolves
  all three: is a mandatory computer-proficiency or regulatory certification (required for job
  *eligibility*, not a job or admission itself) track A (like an entrance test) or track Q (like
  AIBE — a practising licence)? `INCLUSION-POLICY.md` §8 ruling 5 already flagged NISM as worth
  revisiting once a `track` filter shipped, which it now has (§3). NIELIT CCC and MP CPCT are
  sitting in `DISCOVERY-QUEUE.md`, fully researched, ready to add via `sync-exams.mjs --add` the
  moment this is settled (§10c).
- ⏸️ **2. The Anganwadi / ECCE Educator ruling.** Unchanged from the previous handoff: one
  question, asked once, resolves 8 of the 11 `NEEDS OWNER'S CALL` rows in
  `DISCOVERY-QUEUE.md` — is this hiring a real, recurring, statewide competitive exam, or
  scattered district-by-district merit-list drives with no unified exam behind them?
- ⏸️ **3. `nia-si-inspector` — does it belong in the database at all?** Unchanged. NIA runs no
  independent competitive exam; hiring goes through SSC CGL (already listed separately) or
  deputation-only circulars not open to the public.

---

- **Items 2 and 4 of the original §10b proposal (stubs sort last in search; a "Request a full
  dossier" button on stub cards) are now unblocked** — §10c created the first 10 registry-tier
  records — **but neither has been built yet.** Small, and now the natural next piece of work if
  the owner wants the two-tier model to be more than a badge.
- **`data-sourcing/DISCOVERY-QUEUE.md`'s remaining rows:** 19 `CANDIDATE` rows need more checking
  before they're addable; the 9 `ALREADY KNOWN`/`DUPLICATE` rows can simply be deleted from the
  file — they're matching misses, not real candidates, and are just clutter at this point.
- **National Career Service (`ncs.gov.in`) was left out of discovery deliberately** — its
  homepage is private-sector job data. Whether it's worth driving its actual search/filter flow
  is an open question, not a decided no.
- **The Wizard's job/entrance picker and Analytics' central-vs-state chart still bucket track Q
  under "Entrance."** A product decision, not a fix — ask the owner rather than guessing.
- **`derive-vacancy-summary.mjs`, `derive-record-tier.mjs`, and now `derive-authorities.mjs`
  are all manual steps with no enforcement.** A change that should trigger one of them but
  doesn't leaves the derived file stale with no warning — this has now happened for real, in a
  visible way, to two of the three (§2a, §10f). Worth actually building the `validate`-hook or
  pre-commit check this handoff has recommended twice now, rather than recommending it a third
  time next update.
- **`apply-vacancy-updates.mjs` is superseded but not retired** (§8).
- **165 dossier rows are `verified` but excluded from the summary** for citing only a homepage
  (§2, §5). The visible re-sourcing queue.
- **No systematic phantom-row sweep has been run** (§4e).
- **`sbi-clerk`'s 1,538-post backlog-drive figure is worth re-entering** (§9) — accurate, only
  removed for citation strength; the real advertisement number is on file
  (CRPD/CR/SPLDRIVE/2026-27/16).
- **`mes-supervisor-barrack-store`'s 502 figure** and **`uk-judicial-service`'s conflicting 8/16
  vacancy figures** — both still need the specific re-check described in the previous handoff.
- The 14 unreachable portals; a browser engine for the JS-rendered ones.
- Linking detected notices to specific exams — still unmet.
- `sources-config.json` has missing `psc` fields for Delhi and Ladakh.
- **RSMSSB Grade III Teacher (Level 1 & 2) direct recruitment still has no dossier entry.**
  Found 2026-09-19 while fixing `reet`'s dossier — flagged, not lost, still not created.
- **The portal watcher's exam-coverage figure ("97 of 500 exams") needs re-verification**
  against the new 509-exam total and the 7 newly added authorities (§7, §10f) — flagged this
  update, not yet done.

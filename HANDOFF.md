# Handoff — India Exams Dashboard

**Date:** 2026-09-18 (supersedes the earlier handoff of the same date)
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
4. **There are two separate data layers, and it is easy to edit the wrong one.** See §2. This has
   already caused one wasted cycle.
5. **`gh` CLI is not installed.** Check GitHub state with `git fetch` + `git log origin/main`.
6. Node is at `/opt/homebrew/bin/node`. Deployment is automatic on push to `main`
   (`.github/workflows/deploy.yml` → GitHub Pages).

---

## 1. What the project is

A React/Vite site cataloguing Indian government and competitive exams, with a deep-dive
"dossier" per exam (career ladder, salary, exam scheme, cutoffs/vacancies, official links).

| Measure | Value |
|---|---|
| Exams in `src/data/exams.json` | 500 |
| Dossiers in `public/exam-details/` | 500 |
| `npm run validate` | 500 checked, 0 errors, 0 warnings |
| Tracks (see §3) | 379 R (recruitment), 117 A (admission), 4 Q (qualification) |

---

## 2. ⚠️ The two data layers — read before editing any exam data

This is the single most important structural fact about the repo.

| | `src/data/exams.json` | `public/exam-details/<id>.json` |
|---|---|---|
| Holds | one flat record per exam | the deep dossier per exam |
| Vacancy shape | a single `vacancies` string | `competition_benchmarks.years[]`, one row per cycle |
| Provenance | `provenance.vacancies{}` (added 2026-09-18) | `confidence`/`source_url`/`as_of` per row (pre-existing) |
| Shown on the exam page? | **No** | **Yes** — the "Cut-offs & Vacancies" tab |
| Read by | `Analytics.jsx`, `pdfGenerator.js` | `CompetitionBenchmarks.jsx` |

**Consequence:** updating `exams.json.vacancies` changes nothing a visitor sees. A session
already made this mistake — verified a figure, wrote it to `exams.json`, and the owner correctly
reported that nothing changed on the site.

**Also:** the flat `exams.json.vacancies` field is structurally inadequate. SBI Clerk currently
has two live cycles (a general one and an SC/ST/OBC backlog drive) with different figures; one
string cannot express which cycle it means. The dossier's year-array can.

**Unresolved design question, deliberately left open for the owner:** whether
`exams.json.vacancies` should be retired, derived from the dossier, or kept as a separate
headline figure for the Analytics rollups (which need one number per exam to chart). Do not
quietly pick one — ask.

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

A `track` field (R/A/Q) exists on all 500 records. **`exam_type` was left alone deliberately** —
ten files read it as a strict two-way switch (`=== 'job'` / `=== 'entrance'`) with no branch for a
third value, so changing it is a UI redesign, not a data fix. `track` is not yet read by any UI.

---

## 4. ⚠️ Data integrity — the defining issue of this project

Three separate fabrication defects have been found. Assume more exist.

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

### The standing lesson
Every fabrication so far shared one tell: **a value repeated across exams that should not share
one.** When touching any data field, run that test first — group by value, count distinct exams.
It has caught all three defects.

---

## 5. What is trusted right now

| Layer | Status |
|---|---|
| 459 dossier rows marked `verified` | **Analytical assurance only.** No generation pattern found (scattered dates, no constant ratio, specific working notes). This rules out *generated* data; it does **not** confirm any individual figure. Nobody has opened their sources. |
| 544 dossier rows marked `reported` | Uncited or secondary-sourced. Not shown with a badge. |
| 1 `exams.json` verified figure | SBI Clerk, checked against the primary PDF. |

**Do not describe the 459 as verified-and-checked.** Sampling them substantively is the natural
follow-up once §6 is done.

---

## 6. Current work in progress — re-sourcing the 170

- `data-sourcing/VERIFICATION-QUEUE.md` — the 170 exams, popularity-ordered
  (60 very_high, 80 high, 29 medium, 1 low).
- `data-sourcing/ANTIGRAVITY-BATCHES.md` — 34 ready-to-paste batches of 5, with the research
  prompt. The owner runs these in **Google Antigravity** (agentic IDE, runs on his Mac from an
  Indian IP, so it reaches portals that scripts and US-hosted tools cannot, and it captures
  screenshots as evidence).

**The workflow, and the rule that matters:**
1. Owner runs a batch in Antigravity; it returns figures plus screenshots.
2. Owner opens the screenshot and confirms the number is actually there.
3. Only that human check makes it `verified`. Unchecked extraction is `reported` and stays off
   the page.
4. Results come back to Claude, which writes them into the **dossier** (not `exams.json` — see §2).

**The prompt's critical instruction:** `applicants` must be null unless a document states it.
The entire 4c defect was derived applicant counts. A null is worth more than a plausible figure.

**Never give Antigravity write access to this repo.** Data entered without a checkable source
trail is indistinguishable from data that was invented.

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

## 8. The vacancy intake pipeline

`npm run apply-vacancy-updates` (`--dry-run` supported) reads
`data-sourcing/vacancy-updates.csv` → writes `exams.json` provenance → logs to
`data-sourcing/vacancy-update-log.md` → removes applied rows, leaves rejected ones with reasons.

Rejects: unknown id, track ≠ R, confidence not `verified`/`reported`, missing source, bad date,
**and any attempt to downgrade an existing `verified` figure without an explicit checked decision.**

⚠️ **This writes to `exams.json`, which the exam page does not display (§2).** It needs a dossier
equivalent, or retiring, once the §2 design question is settled.

---

## 9. The pre-existing auto-sync, and its standing weakness

`.github/workflows/auto-exam-sync.yml` runs `sync-exams.mjs --scan` twice daily. It fetches two
Google News RSS queries, regex-matches headlines against exam names, and writes vacancy figures
found in headlines straight into the database. It **cannot** add a new exam (`addNewExam()` is
only reachable via a manual `--add`); the workflow's "new exam → GitHub issue" step is dead code.

**It is still live and still unvouched.** It produced the "1,538 Posts" figure on `sbi-clerk`
from a headline. That figure later turned out to be *correct* — it was a real SC/ST/OBC backlog
drive (Advt. CRPD/CR/SPLDRIVE/2026-27/16) — but it reached the database with no verification,
which is luck, not control. **Consider gating or disabling it.**

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

**Recommended sequence from here:**
1. Finish re-sourcing the 170 (§6)
2. Sample the 459 analytically-clean rows substantively (§5)
3. Settle the two-layer design question (§2)
4. Gate or disable the unvouched auto-sync (§9)
5. Then aggregator-based discovery, with the two-tier registry/dossier model

---

## 11. Working with this owner

- Chartered accountant, not a developer. Plain language; audit framing lands well.
- **Wants to be told which model to use per task.** Haiku for mechanical; Sonnet for ordinary
  coding where the design is settled; Opus for judgement, data-integrity review, and anything
  where the premise may be wrong; external tools for bulk document reading. Say when switching
  is not worth the overhead.
- **Asks for criticism directly and acts on it.** Give it straight. Items 4b and 4c surfaced
  because he asked "where did I go wrong" and "why are we doing the same thing again and again."
- He keeps his own work in the tree (`src/utils/syllabusTaxonomy.js`, `StoryGate.jsx` and
  similar). **Never bundle his uncommitted files into an automation commit.** Check
  `git status` before staging.
- Ask before committing when the change is substantial.

---

## 12. Git state at handoff

Clean and pushed; local level with `origin/main`. This session's commits:

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

Uncommitted: the owner's own `src/utils/syllabusTaxonomy.js` — leave it alone.

---

## 13. Open questions

- **§2 — the two-layer design.** Blocks §8 from being genuinely useful. Needs the owner's call.
- Surfacing `track` in the UI (filters, badges) and retiring `exam_type`.
- The 14 unreachable portals; a browser engine for the JS-rendered ones. Antigravity may solve
  this incidentally — it drives a real browser from an Indian IP.
- Linking detected notices to specific exams. The watcher says "a notice appeared", not "exam X
  changed". **This half of the original requirement is still unmet.**
- `sources-config.json` has missing `psc` fields for Delhi and Ladakh.
- **RSMSSB Grade III Teacher (Level 1 & 2) direct recruitment has no dossier entry.** Found 2026-09-19
  while fixing `reet`'s dossier: REET is a qualifying test with no vacancies of its own, but its page
  carried vacancy figures (48,000 in 2022, 31,000 in 2021) that actually belong to this separate
  RSMSSB recruitment exam. Those figures have been removed from `reet`'s page (now correctly shows
  no vacancies), but the underlying exam — likely one of the largest state teacher recruitment
  drives in the country — is missing from the 500-exam database entirely. Needs a full new dossier
  (career ladder, exam scheme, etc.), not just a benchmark row; flagging so it isn't lost.

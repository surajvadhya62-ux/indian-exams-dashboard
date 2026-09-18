# Handoff — India Exams Dashboard

**Date:** 2026-09-18
**Owner:** Suraj (chartered accountant, **not a developer** — explain in plain language, use
audit/accounting framing where it helps, avoid engineering jargon)
**Purpose:** everything a fresh session needs to continue without re-investigating. Facts below were
measured this session, not assumed.

---

## 0. Read this first — things that will waste your time if you don't know them

1. **The project moved.** It is now at `/Users/surajvadhya/Projects/indian-exams-dashboard`.
   It used to be at `Documents/kimi/workspace/indian-exams-dashboard`. **Do not move it back into
   `Documents`** — macOS blocks scheduled background jobs from reading `Documents`/`Desktop`/
   `Downloads` ("Operation not permitted", exit 126). That is why it was moved.
2. **`data-sourcing/HANDOVER.md` (dated 2026-09-14) is stale on two points.** It says no git remote
   is configured and that deployment is a manual zip upload to Vercel. Both are now wrong — see §2.
3. **Do not run portal fetching on GitHub Actions.** Indian government portals refuse US traffic.
   Measured: 22/38 readable from India, 12/38 from GitHub's San Jose runner. Evidence is committed
   at `connectivity-report.md`.
4. **Nothing from this session's main build is committed yet.** See §6.

---

## 1. What the project is

A React/Vite site cataloguing Indian government and competitive exams, with a deep-dive "dossier"
per exam (career ladder, salary, exam scheme, cutoffs/vacancies, official links).

| Measure | Value |
|---|---|
| Exams in `src/data/exams.json` | **500** |
| Entries in `src/data/authorities.json` | **342** |
| Distinct conducting bodies across exams | **342** |
| Dossiers in `public/exam-details/` | 500, all passing schema validation |
| `npm run validate` | **500 checked, 0 errors, 0 warnings** (verified 2026-09-18) |

---

## 2. Infrastructure facts (verified, correcting the old handover)

- **Git remote:** `https://github.com/surajvadhya62-ux/indian-exams-dashboard.git`, branch `main`
- **Deployment:** `.github/workflows/deploy.yml` publishes to **GitHub Pages on every push to main**.
  Committed data changes therefore reach the live site automatically. (The old handover's "manual
  zip upload to Vercel" is obsolete.)
- `gh` CLI is **not installed** on this machine — check GitHub state via `git fetch` + `git log
  origin/main` rather than the Actions UI.
- Node is at `/opt/homebrew/bin/node` (v26.3.1).

---

## 3. The pre-existing automation, and what it actually does

`.github/workflows/auto-exam-sync.yml` — runs **twice daily** (02:20 and 14:20 UTC), added
2026-09-16, calls `scripts/automation/sync-exams.mjs --scan`.

**What `--scan` genuinely does, from reading the code:**
- Prints the authority list from `sources-config.json`. It does **not** visit those sites. Cosmetic.
- Fetches **two Google News RSS queries**, regex-matches headlines against existing exam
  names/acronyms, and if a headline contains a vacancy figure, writes it into that exam's record.
- **It cannot add a new exam.** `addNewExam()` is only reachable via a manual `--add` CLI call. The
  workflow's "new exam found → GitHub issue" step reads `new-exams-found.json`, which the automated
  scan never writes to. That step is dead code.

**Evidence of actual output:** exactly one auto-commit exists (`034d5c1`), which added
`"vacancies": "1,538 Posts"` to `sbi-clerk`.

**⚠️ Standing control weakness:** that figure came from a news headline, went straight into the
database, and published live with no verification against the SBI notification and no review step.
Owner (a CA) considers unvouched figures reaching a site students rely on a real problem.
**Fix this before scaling exam volume.**

---

## 4. What was built this session: the portal watcher

**Design principle: version 1 uses no AI at all.** It does deterministic change detection — records
the set of notice links on each authority's notice board, diffs against the previous run, reports
additions. No API key, no quota, nothing to break when a model is retired. An interpretation layer
can sit on top later.

### Files
| Path | Purpose |
|---|---|
| `scripts/automation/portal-watch.mjs` | The watcher |
| `scripts/automation/run-portal-watch.sh` | Wrapper: runs it, logs, alerts on failure |
| `~/Library/LaunchAgents/com.indiaexams.portal-watch.plist` | Daily schedule, **09:00** |
| `data-sourcing/PORTAL-CHANGE-LOG.md` | **Review queue** — newest run first (tracked in git) |
| `data-sourcing/portal-snapshots/` | Working state, 24 files (**gitignored**, regenerable) |
| `data-sourcing/portal-watch.log` | Run log (gitignored) |
| `scripts/automation/connectivity-probe.mjs` | One-off diagnostic, already run |

Run by hand: `npm run watch-portals` — takes about **40 seconds**.

### Verified working
Scheduled run completed 2026-09-18 16:35 IST, exit code 0, no errors.

### Reach
- **24 of 38** configured authorities readable, **~1,150 notices** under watch
- Certificate workaround (`CERT_RELAXED_HOSTS` in the script) recovered IBPS and Assam PSC
- **JavaScript-rendered, needs a browser engine:** SSC, UPPSC, Andhra PSC, Maharashtra PSC
- **Unreachable:** SBI, Bihar, Karnataka, Punjab, Telangana, West Bengal, J&K, Himachal, Manipur,
  Meghalaya

⚠️ **UPPSC is a trap worth remembering:** it returns a full-looking page whose notices are
unrendered template placeholders (`{{'AllNoticeAdvert_HM' | translate }}`). The script now detects
this (`JS_RENDERED`) instead of silently recording rubbish. Expect the same pattern elsewhere.

### The coverage reality — state this honestly, don't let it get lost
- **24 of 342 authorities = 7.0%**
- Those bodies conduct **97 of 500 exams = 19.4%**

The 38-authority config was a pre-existing shortlist, never the full 342.

---

## 5. Cost and vendor findings (don't re-research these)

- **Google AI Pro (₹1,950/mo consumer subscription) grants no API quota.** The Gemini Developer API
  is billed separately with its own free tier.
- **`gemini-2.0-flash` and `-flash-lite` were shut down 2026-06-01.** The widely-quoted 1,500
  requests/day free tier belongs to those dead models.
- **`gemini-2.5-flash` retires 2026-10-16.** Surviving free tier is 3.x Flash-Lite at roughly
  **20-500 requests/day** — confirm the exact figure for the specific model ID before relying on it.
- Model retirement recurs every 6-12 months. Any LLM-dependent job must fail loudly, and expect to
  bump the model ID about twice a year. **This is why v1 avoids the dependency entirely.**
- Indian VPS if ever needed: ~₹450-700/month (Vultr/DigitalOcean/Linode Mumbai-Bangalore), or
  ~₹180+ from Indian providers billing in INR with a GST invoice. **Not currently needed** — it runs
  free on the Mac. Advice given: don't incur the cost until the process proves its worth.

---

## 6. Git state as at handoff

**Nothing from the watcher build is committed.** Working tree:

```
 M .gitignore          (added portal-snapshots/ ignore)
 M package.json        (added "watch-portals" script)
 M src/App.jsx                    ┐
 M src/components/CommandPalette.jsx │  Owner's own earlier work —
 M src/components/Header.jsx        │  NOT this session's. Do not
 M src/components/MobileNav.jsx     │  bundle into an automation commit.
 M src/index.css                    │
 M src/utils/syllabusTaxonomy.js   ┘
?? data-sourcing/PORTAL-CHANGE-LOG.md
?? scripts/automation/portal-watch.mjs
?? scripts/automation/run-portal-watch.sh
```

Local and `origin/main` are level. Two commits were pushed this session (`799392a`, `eee7aa8`) —
the connectivity probe and its report. **Owner has not asked for a commit of the watcher work yet;
ask before committing.**

---

## 7. Strategic direction — the owner's stated priorities

From discussion at the end of the session:

1. **The exam universe is too small.** There are well over 500 government exams; expanding coverage
   is the main goal. The thesis: no dashboard exhaustively covers Indian government exams at this
   scale, and that exhaustiveness is the differentiator.
2. **Only cutoffs and vacancies change materially year-to-year.** Eligibility, age limits, exam
   patterns and selection processes change once in several years. So update effort should
   concentrate on cutoffs and vacancies, and the rest of the effort should go into adding exams.

This is a sound prioritisation. It reduces "keep 500 exams current" to roughly two data events per
exam per year — about **three events a day** across the database.

### Criticism put to the owner (they asked for it; they have not yet responded)

1. **Cutoffs/vacancies are the hardest and most dangerous data to automate** — scanned PDFs,
   category-wise breakdowns, provisional figures revised by corrigendum, and the numbers students
   actually decide on. See the "1,538 Posts" incident in §3.
2. **Breadth will dilute quality unless tiered.** Recommend two explicit tiers: a cheap *registry*
   entry (name, authority, qualification, frequency, official link) versus a full *dossier*, and
   label on the site which an exam is. Better than 1,500 half-empty dossiers.
3. **"Exhaustive" is unbounded without an inclusion policy.** Recommend writing one first —
   e.g. recurring, open to public application, competitive written examination, government or
   statutory body. Makes the claim bounded and defensible.
4. **The discovery method is pointed at the wrong place.** Authorities already in the database
   mostly conduct exams already held, so authority sweeps have diminishing returns for *discovery*
   (they remain good for *updates*). Qualification and discipline are student-facing filters, not
   discovery instruments. **Recommend discovery via aggregators** — Employment News / Rozgar
   Samachar, National Career Service portal, and the Sarkari Result / FreeJobAlert category. Three
   aggregators beat crawling 342 authority sites.
5. **The moat is structure and permanence, not raw coverage.** Aggregator sites are already
   comprehensive on breadth; what they lack is structure, comparability and history. Coverage alone
   is not the differentiator.

### Recommended sequence given to the owner
1. Write the inclusion policy
2. Fix the unverified-figure pipeline **before** scaling volume
3. Build aggregator-based discovery (this is what grows 500 into the real universe)
4. Introduce the two-tier model on the site
5. Build the cutoff/vacancy pipeline properly: detect free → verify against primary source → publish
   with citation, date and confidence
6. Authority sweeps continue in background for the major commissions

---

## 8. Open question awaiting the owner's answer

**Where to start: the inclusion policy, or aggregator-based discovery?**

Also outstanding, lower priority:
- Whether to commit the watcher work (and separately from the owner's own 8 modified files)
- Expanding the authority list beyond the 38-entry shortfile toward 342
- Linking detected notices to specific exams in `exams.json` — currently the watcher says
  "a notice appeared", not "exam X changed". **This half of the original requirement is unmet.**
- The 14 unreadable portals (browser engine for the JS-rendered ones)
- `sources-config.json` has missing `psc` fields for Delhi and Ladakh

---

## 9. Operating notes

- Turn the schedule off: `launchctl unload ~/Library/LaunchAgents/com.indiaexams.portal-watch.plist`
- Turn it on: `launchctl load ~/Library/LaunchAgents/com.indiaexams.portal-watch.plist`
- Run now: `launchctl kickstart gui/$(id -u)/com.indiaexams.portal-watch`
- Failures raise a macOS notification and are recorded in `data-sourcing/portal-watch.log`
- The watcher **never writes to `exams.json`**. That is deliberate — it reports, a human decides.

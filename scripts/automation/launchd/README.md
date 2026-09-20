# Scheduled jobs (launchd)

The three background jobs that run this project's automation, and the one command that
installs them.

macOS reads job definitions from `~/Library/LaunchAgents`, which is outside this repo. Until
2026-09-20 that made the schedules the only part of the automation with **no backup at all** —
the scripts would survive a wiped or replaced Mac, and the thing that actually runs them would
not. These files are the source of truth. Edit them here, re-run `install.sh`, and the loaded
jobs follow.

## Install

```bash
./scripts/automation/launchd/install.sh
```

Copies all three into `~/Library/LaunchAgents` and loads them. Safe to re-run — it unloads
first, so it picks up edits rather than keeping a stale definition.

It rewrites the repo path on the way in. The committed plists hardcode
`/Users/surajvadhya/Projects/indian-exams-dashboard`; if the repo has moved, every program and
log path in them would be wrong and **launchd would fail silently rather than say so**. The
installer detects this and substitutes the real location. It also refuses to install if `node`
is not where the plists expect it.

```bash
./scripts/automation/launchd/install.sh --status      # what is loaded right now
./scripts/automation/launchd/install.sh --uninstall   # unload and remove all three
```

## The three jobs

| Job | When | What it does | Emails? |
|---|---|---|---|
| `com.indiaexams.portal-watch` | daily 09:00 | checks 38 authority notice boards (~30s) | only when a new notice mentions a cut-off or vacancy |
| `com.indiaexams.discover-exams` | Mondays 09:00 | scrapes 2 aggregators for exams not in the database | only when a genuinely new candidate appears |
| `com.indiaexams.portal-watch-heartbeat` | Sundays 19:00 | reports which days the watcher ran | **always** |

The heartbeat is the deliberate exception. Every other notification stays silent on a quiet run,
so that an email means something to look at — but that leaves one question unanswerable from the
inbox: no cut-off email this week might mean nothing was published, or might mean the watcher
never ran. A note that arrives regardless makes the absence visible.

Its 19:00 slot is also deliberate: it must report on a week that includes that morning's own
09:00 run.

## The missed-run problem, and why RunAtLoad is there

**launchd replays a job missed while the Mac was asleep. It does not replay one missed while the
Mac was switched off** — that occurrence is simply lost. Both plists originally claimed
otherwise, and on Sunday 2026-09-20 the 09:00 watch was silently skipped (Mac off 23:19 → 11:46).
Nothing reported it: a missed run writes no log entry, and no entry looks exactly like a quiet
day.

So the two scheduled jobs also set `RunAtLoad`, firing at startup to catch up. That only works
because their wrappers refuse to repeat a period that already succeeded — `run-portal-watch.sh`
per day, `run-discover-exams.sh` per week. Without those guards the startup trigger would be
actively harmful: the watcher's first run consumes the notice diff, so a duplicate would report
nothing and that day's new notices would never be emailed.

Both guards key off a *successful* run, not merely an attempt, so a failed morning run is still
retried. `--force` overrides either.

The heartbeat has no `RunAtLoad`: a missed one needs no catch-up, because the next week's note
reads the whole log window and covers the same ground.

## Checking on them

```bash
launchctl list | grep indiaexams        # loaded jobs; middle column is last exit status
tail -40 data-sourcing/portal-watch.log
node scripts/automation/portal-watch-heartbeat.mjs --dry-run   # the week's status, sends nothing
```

Run either job by hand at any time:

```bash
./scripts/automation/run-portal-watch.sh            # respects the once-a-day guard
./scripts/automation/run-portal-watch.sh --force    # runs regardless
./scripts/automation/run-discover-exams.sh
```

## If you move the repo

Do **not** put it under `Documents`, `Desktop` or `Downloads` — macOS blocks scheduled background
jobs from reading those, and the job fails with exit 126 (`HANDOFF.md` §0). Anywhere else is
fine: move it, then re-run `install.sh` and the paths are rewritten.

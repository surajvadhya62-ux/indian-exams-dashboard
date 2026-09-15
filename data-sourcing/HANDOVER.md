# Handover — Indian Exams Dashboard, exam-detail research

**Date:** 2026-09-14
**Project:** `indian-exams-dashboard` — a React/Vite site listing 504 Indian government/competitive exams, with a deep-dive "dossier" (career path, salary, exam pattern, official links) for each one.

---

## Current state (verified against the actual files, not just labels)

- **504 exams total.**
- **339 already have a complete, cited dossier** — done.
- **165 still need research** — this is the real remaining work.
- The website already works fine for all 504 today. Exams without a dossier yet just show "not yet available" instead of breaking anything.

---

## What happened in this session

1. An earlier round of work (113 "units", `u001`–`u113`) researched most exams, finishing 287 of them per the tracker.
2. A follow-up plan was already sitting in the project (`work-queue.json`, `BATCH-DISPATCH-PLAN.md`) listing 25 new units for the remaining 217.
3. **Audit found the tracker was wrong.** 52 of those "217 remaining" exams already had real, fully-cited research files on disk from earlier — they just never got marked as done. This was caught because the owner noticed IBPS PO being re-researched despite having seen it done before.
4. **Fixed:**
   - `data-sourcing/progress.json` — the 52 exams are now correctly marked `verified`.
   - `data-sourcing/work-queue.json` — the 5 now-redundant units (`u114`, `u115`, `u116`, `u137`, `u138`) were removed. 20 units remain, covering exactly the 165 exams that are genuinely undone.
   - `data-sourcing/BATCH-DISPATCH-PLAN.md` — all references updated to match (new units run `u117`–`u136`, not `u001`–`u025`, to avoid colliding with the original 113 units' numbering).
5. Ran the schema validator across all 346 detail files: 343 pass clean, 3 are broken empty stubs (`jee-advanced`, `gate`, `aiims-norcet`) — these 3 are included in the 165 still-to-research list, not extra work.
6. Confirmed `npm run build` succeeds with zero errors after all fixes.

**What was checked:** whether real data is present in every file (structure + citation count), across all 346 files.
**What was NOT checked:** whether every citation is factually accurate (would require re-fetching every source URL — not done at scale, only spot-checked on 2-3 files).

---

## Next action — ready to execute right now

Give this instruction to whichever AI is doing the research (needs live web access + ability to read PDFs — confirm this before starting):

> "Open and follow `data-sourcing/BATCH-DISPATCH-PLAN.md` in this folder. Start with unit `u117` from `data-sourcing/work-queue.json`, complete it fully as the plan describes, then continue through `u118`, `u119`, ... up to `u136`, one at a time, in order."

That file is self-contained — it explains the schema, the citation-confidence rules, and the review/incorporate/publish steps.

---

## Outstanding items (not blocking the research work)

1. **`site.zip` is broken** — it contains two different builds stacked on top of each other (an old one at the zip root, a newer one nested inside a `dist/` folder). If uploaded to Vercel as-is, the live site would show stale/wrong data. **Owner has deferred fixing this to a later session** — it has zero effect on the research work above, only on the eventual "upload to Vercel" step.
2. **Deploy method confirmed:** owner manually uploads a zip file to Vercel (not git push, not CLI). No GitHub remote is configured, and none is needed for this workflow.
3. **No git commit has been made yet** for today's fixes (tracker + queue + plan doc). These are local file edits, not yet checkpointed. Recommended before further changes pile up, but not done — pending explicit go-ahead (commits are only made when the user asks).
4. Once `u117`–`u136` are done and reviewed, `progress.json` should read `verified: 504` and the site is fully complete.

---

## Key files reference

| File | Purpose |
|---|---|
| `data-sourcing/BATCH-DISPATCH-PLAN.md` | The complete, self-contained instructions for researching remaining exams |
| `data-sourcing/work-queue.json` | The 20 units (`u117`–`u136`) still needing research, 165 exams |
| `data-sourcing/progress.json` | Live tracker — 339 verified, 165 not_started |
| `data-sourcing/RESEARCH-GUIDE.md` | Binding quality/citation standard |
| `public/exam-details/upsc-cse.json` | Reference schema — copy its structure exactly for any new exam |
| `public/exam-details/*.json` | 346 individual exam dossier files |
| `scripts/data-sourcing/validate-details.mjs` | Run this after any new batch of files to catch schema errors |

---

## Lesson learned (worth remembering for next time)

Don't trust `progress.json`'s "not_started" label at face value before dispatching a unit — check whether `public/exam-details/<id>.json` already exists and has real citations first. That's exactly what went wrong here, and cost one wasted research run (unit `u114`, since renumbered/removed) before it was caught.

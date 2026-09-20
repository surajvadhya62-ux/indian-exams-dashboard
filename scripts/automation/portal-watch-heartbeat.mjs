#!/usr/bin/env node

/**
 * portal-watch-heartbeat.mjs
 *
 * The weekly "still alive" note for the daily portal watcher. Added 2026-09-20.
 *
 * WHY THIS EXISTS. Every other notification in this project stays silent unless something
 * happened, so that an email always means something to look at. That is the right default,
 * but it leaves one question unanswerable from the inbox alone: a week with no cut-off email
 * might mean nothing was published, or might mean the watcher never ran. Those are very
 * different, and the second one is invisible — a missed run writes no log entry, and no entry
 * looks exactly like a quiet day.
 *
 * It is not hypothetical. Sunday 2026-09-20's 09:00 run was skipped because the Mac was
 * powered off from 23:19 the night before until 11:46 (launchd replays a missed calendar job
 * after sleep, but not after a shutdown). Nothing reported it; it was found only by reading
 * the log by hand.
 *
 * So this one sends every week regardless — that inversion is the entire point.
 *
 * WHAT IT READS. Only data-sourcing/portal-watch.log, which run-portal-watch.sh has always
 * written: a "RUN STARTED" line per attempt, then "RUN FINISHED OK" or "RUN FAILED". A date
 * with a started-but-never-finished run is reported FAILED, not OK — an interrupted run is a
 * failure even though nothing wrote the word.
 *
 * It reads; it writes nothing, touches no exam data, and never re-runs the watcher.
 *
 * Usage:
 *   node scripts/automation/portal-watch-heartbeat.mjs             # last 7 days, sends
 *   node scripts/automation/portal-watch-heartbeat.mjs --dry-run   # prints, sends nothing
 *   node scripts/automation/portal-watch-heartbeat.mjs --days 14
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { notifyWatchHeartbeat } from './notify.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT_DIR = path.resolve(__dirname, '../..')
const LOG_PATH = path.join(ROOT_DIR, 'data-sourcing/portal-watch.log')

const args = process.argv.slice(2)
const DRY_RUN = args.includes('--dry-run')
const daysArg = args.indexOf('--days')
const WINDOW_DAYS = daysArg !== -1 && args[daysArg + 1] ? Math.max(1, parseInt(args[daysArg + 1], 10) || 7) : 7

// The wrapper writes local time, e.g. "RUN FINISHED OK: 2026-09-19 09:00:30 IST".
const STARTED_RE = /^RUN STARTED: (\d{4}-\d{2}-\d{2}) (\d{2}:\d{2}:\d{2})/
const FINISHED_RE = /^RUN FINISHED OK: (\d{4}-\d{2}-\d{2}) (\d{2}:\d{2}:\d{2})/
const FAILED_RE = /^RUN FAILED \(exit \d+\): (\d{4}-\d{2}-\d{2})/
// portal-watch.mjs's own closing summary, e.g. "  17 new notice(s) found across 24 readable portal(s)."
const SUMMARY_RE = /^\s*(\d+) new notice\(s\) found across/

function localDateKey(d) {
  // Deliberately not toISOString(): that converts to UTC, which in IST shifts anything
  // before 05:30 onto the previous day and would mis-attribute an early-morning run.
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

/**
 * Walk the log in order, collapsing each date to its best outcome. A date can hold several
 * attempts (a failure at 09:00, a manual retry later); the day counts as OK if any attempt
 * succeeded, which matches what the owner actually cares about — were the boards checked.
 */
function readLog() {
  if (!fs.existsSync(LOG_PATH)) return new Map()

  const byDate = new Map()
  let currentDate = null

  const upsert = (date, patch) => {
    const existing = byDate.get(date) || { status: 'FAILED', notices: null, time: null }
    // Never let a later failed attempt downgrade a day that already succeeded.
    if (existing.status === 'OK' && patch.status === 'FAILED') return
    byDate.set(date, { ...existing, ...patch })
  }

  for (const line of fs.readFileSync(LOG_PATH, 'utf-8').split(/\r?\n/)) {
    const started = STARTED_RE.exec(line)
    if (started) {
      currentDate = started[1]
      // Assume failure until a finish line says otherwise: a run that was interrupted
      // (shutdown mid-run, crash) leaves a started line and nothing else, and that is
      // not a success.
      upsert(currentDate, { status: 'FAILED', time: started[2] })
      continue
    }

    const finished = FINISHED_RE.exec(line)
    if (finished) {
      upsert(finished[1], { status: 'OK', time: finished[2] })
      currentDate = finished[1]
      continue
    }

    const failed = FAILED_RE.exec(line)
    if (failed) {
      upsert(failed[1], { status: 'FAILED' })
      continue
    }

    const summary = SUMMARY_RE.exec(line)
    if (summary && currentDate) {
      const existing = byDate.get(currentDate)
      if (existing) byDate.set(currentDate, { ...existing, notices: parseInt(summary[1], 10) })
    }
  }

  return byDate
}

function buildWindow(byDate, windowDays) {
  const days = []
  const today = new Date()

  // A day before the watcher's first recorded run is not a missed run — the job did not
  // exist yet. Counting those as misses would make the first heartbeat read "2 of 7 days
  // ran" and send the owner looking for a fault that isn't there. A monitor that cries
  // wolf in its own first message teaches people to ignore it.
  const knownDates = [...byDate.keys()].sort()
  const firstRun = knownDates[0] || null

  for (let i = windowDays - 1; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(today.getDate() - i)
    const key = localDateKey(d)
    const entry = byDate.get(key)
    const beforeInstall = firstRun !== null && key < firstRun
    days.push({
      date: key,
      weekday: d.toLocaleDateString('en-IN', { weekday: 'long' }),
      status: entry ? entry.status : beforeInstall ? 'NOT_SCHEDULED_YET' : 'MISSED',
      notices: entry ? entry.notices : null,
      time: entry ? entry.time : null,
    })
  }
  return days
}

async function main() {
  const days = buildWindow(readLog(), WINDOW_DAYS)

  console.log(`Portal watch — last ${WINDOW_DAYS} days\n`)
  for (const d of days) {
    const found = d.status === 'OK' ? `${d.notices ?? '?'} notice(s)` : ''
    console.log(`  ${d.weekday.padEnd(9)} ${d.date}  ${d.status.padEnd(7)} ${d.time || ''}  ${found}`)
  }

  const expected = days.filter((d) => d.status !== 'NOT_SCHEDULED_YET')
  const ok = expected.filter((d) => d.status === 'OK').length
  console.log(`\n${ok} of ${expected.length} scheduled day(s) ran.`)

  if (DRY_RUN) {
    console.log('\n--dry-run: no email sent.')
    return
  }

  const result = await notifyWatchHeartbeat(days)
  if (result.sent) {
    console.log('✓ Heartbeat email sent.')
  } else {
    console.warn(`⚠ Heartbeat email NOT sent: ${result.reason}`)
  }
}

main().catch((err) => {
  console.error('portal-watch-heartbeat failed:', err)
  process.exit(1)
})

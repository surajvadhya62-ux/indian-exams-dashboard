#!/bin/bash
#
# Wrapper used by the scheduled job. Runs the portal watch and appends a timestamped
# record to a log file, so there is evidence of every run — including runs that failed.
#
# CATCH-UP AFTER A SHUTDOWN (added 2026-09-20)
# --------------------------------------------
# launchd's StartCalendarInterval fires a missed job when the Mac WAKES FROM SLEEP, but
# not when it is switched on after being POWERED OFF — an occurrence that elapsed while
# the machine was off is simply lost. The plist used to claim otherwise; it was wrong,
# and on Sunday 2026-09-20 the 09:00 run was silently skipped because the Mac was off
# from 23:19 the previous night until 11:46. Nothing reported this: a missed run leaves
# no entry, and no entry looks exactly like a quiet day.
#
# The fix is in two halves, and needs both:
#   - the plist now sets RunAtLoad, so the job also fires when the Mac starts up;
#   - this script refuses to run twice in the same day, so that extra trigger is a
#     catch-up and not a duplicate. Two runs in one day would be worse than harmless:
#     the first consumes the notice diff, so the second reports nothing and the day's
#     new notices would never be emailed.
#
# The guard keys off a SUCCESSFUL run ("RUN FINISHED OK"), not an attempted one, so a
# failed morning run is still retried on the next trigger rather than being written off.
#
# To run it by hand at any time:
#   ./scripts/automation/run-portal-watch.sh           # respects the once-a-day guard
#   ./scripts/automation/run-portal-watch.sh --force   # runs regardless

set -uo pipefail

REPO_DIR="/Users/surajvadhya/Projects/indian-exams-dashboard"
NODE_BIN="/opt/homebrew/bin/node"
LOG_FILE="$REPO_DIR/data-sourcing/portal-watch.log"

FORCE=0
[ "${1:-}" = "--force" ] && FORCE=1

cd "$REPO_DIR" || exit 1

TODAY=$(date '+%Y-%m-%d')
if [ $FORCE -eq 0 ] && [ -f "$LOG_FILE" ] && grep -q "RUN FINISHED OK: $TODAY" "$LOG_FILE"; then
  # Already completed today. Exit 0 and quietly — this is the normal outcome of the
  # RunAtLoad trigger on any day the 09:00 run already happened, and a non-zero exit
  # here would make launchd treat an ordinary login as a failure.
  echo "Portal watch already completed today ($TODAY). Skipping. Use --force to override."
  exit 0
fi

{
  echo ""
  echo "=================================================================="
  echo "RUN STARTED: $(date '+%Y-%m-%d %H:%M:%S %Z')"
  echo "=================================================================="
} >>"$LOG_FILE"

"$NODE_BIN" scripts/automation/portal-watch.mjs >>"$LOG_FILE" 2>&1
STATUS=$?

if [ $STATUS -eq 0 ]; then
  echo "RUN FINISHED OK: $(date '+%Y-%m-%d %H:%M:%S %Z')" >>"$LOG_FILE"
else
  echo "RUN FAILED (exit $STATUS): $(date '+%Y-%m-%d %H:%M:%S %Z')" >>"$LOG_FILE"
  # Surface failures on screen rather than letting them pass silently.
  osascript -e 'display notification "Portal watch failed — see data-sourcing/portal-watch.log" with title "India Exams Dashboard"' 2>/dev/null
fi

exit $STATUS

#!/bin/bash
#
# Wrapper used by the scheduled weekly job. Runs exam discovery and appends a
# timestamped record to a log file, so there is evidence of every run — including
# runs that failed. Mirrors run-portal-watch.sh's structure.
#
# CATCH-UP AFTER A SHUTDOWN (added 2026-09-20)
# --------------------------------------------
# Same defect, and same fix, as run-portal-watch.sh — see HANDOFF.md §7b. launchd replays a
# missed StartCalendarInterval job when the Mac WAKES FROM SLEEP, but not when it is switched
# on after being POWERED OFF; that occurrence is lost. Both plists carried a comment claiming
# otherwise, which is why the portal watch's missed run went unnoticed for a day.
#
# Lower stakes here than for the daily watch: a missed Monday means leads arrive late, not that
# a diff is consumed and lost. Fixed anyway, because "it only loses a week" is how a control
# ends up never being checked.
#
# THE GUARD IS PER-WEEK, NOT PER-DAY. run-portal-watch.sh skips a day that already succeeded;
# the equivalent for a weekly job is the calendar week, anchored to the Monday the schedule
# targets. Two wrong versions worth not reinventing:
#   - "skip if it ran today" would re-run on every boot Tue–Sun.
#   - "skip if it ran in the last 7 days" would break the anchor: a Wednesday catch-up would
#     suppress the following Monday, only 5 days later, and the schedule would drift.
#
# To run it by hand at any time:
#   ./scripts/automation/run-discover-exams.sh           # respects the once-a-week guard
#   ./scripts/automation/run-discover-exams.sh --force   # runs regardless

set -uo pipefail

REPO_DIR="/Users/surajvadhya/Projects/indian-exams-dashboard"
NODE_BIN="/opt/homebrew/bin/node"
LOG_FILE="$REPO_DIR/data-sourcing/discover-exams.log"

FORCE=0
[ "${1:-}" = "--force" ] && FORCE=1

cd "$REPO_DIR" || exit 1

# Monday of the current week (today, if today is Monday). %u gives 1=Mon..7=Sun.
DOW=$(date '+%u')
WEEK_START=$(date -v-$((DOW - 1))d '+%Y-%m-%d')

if [ $FORCE -eq 0 ] && [ -f "$LOG_FILE" ]; then
  # Dates are fixed-width YYYY-MM-DD, so a lexicographic compare is a chronological one.
  LAST_OK=$(grep -o 'RUN FINISHED OK: [0-9][0-9-]*' "$LOG_FILE" | awk '{print $4}' | sort | tail -1)
  if [ -n "$LAST_OK" ] && [[ ! "$LAST_OK" < "$WEEK_START" ]]; then
    # Already succeeded this week. Exit 0 and quietly — this is the normal outcome of the
    # RunAtLoad trigger on any login after the week's run, and a non-zero exit here would
    # make launchd treat an ordinary startup as a failure.
    echo "Exam discovery already ran this week (last success $LAST_OK, week starts $WEEK_START). Skipping. Use --force to override."
    exit 0
  fi
fi

{
  echo ""
  echo "=================================================================="
  echo "RUN STARTED: $(date '+%Y-%m-%d %H:%M:%S %Z')"
  echo "=================================================================="
} >>"$LOG_FILE"

"$NODE_BIN" scripts/automation/discover-exams.mjs >>"$LOG_FILE" 2>&1
STATUS=$?

if [ $STATUS -eq 0 ]; then
  echo "RUN FINISHED OK: $(date '+%Y-%m-%d %H:%M:%S %Z')" >>"$LOG_FILE"
else
  echo "RUN FAILED (exit $STATUS): $(date '+%Y-%m-%d %H:%M:%S %Z')" >>"$LOG_FILE"
  # Surface failures on screen rather than letting them pass silently.
  osascript -e 'display notification "Exam discovery run failed — see data-sourcing/discover-exams.log" with title "India Exams Dashboard"' 2>/dev/null
fi

exit $STATUS

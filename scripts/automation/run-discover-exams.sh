#!/bin/bash
#
# Wrapper used by the scheduled weekly job. Runs exam discovery and appends a
# timestamped record to a log file, so there is evidence of every run — including
# runs that failed. Mirrors run-portal-watch.sh's structure.
#
# To run it by hand at any time:
#   ./scripts/automation/run-discover-exams.sh

set -uo pipefail

REPO_DIR="/Users/surajvadhya/Projects/indian-exams-dashboard"
NODE_BIN="/opt/homebrew/bin/node"
LOG_FILE="$REPO_DIR/data-sourcing/discover-exams.log"

cd "$REPO_DIR" || exit 1

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

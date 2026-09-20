#!/bin/bash
#
# Installs the three scheduled jobs into ~/Library/LaunchAgents and loads them.
#
# WHY THIS DIRECTORY EXISTS. launchd reads job definitions from ~/Library/LaunchAgents, which
# is outside the repo, so until 2026-09-20 the schedules were the one part of this automation
# with no backup at all. The scripts would survive a wiped or replaced Mac; the thing that
# actually runs them would not — including the RunAtLoad catch-up that HANDOFF.md §7b describes,
# which is the fix for runs being silently skipped. These copies are the source of truth. Edit
# them here, re-run this script, and the loaded jobs follow.
#
# Usage:
#   ./scripts/automation/launchd/install.sh              install and load all three
#   ./scripts/automation/launchd/install.sh --uninstall  unload and remove all three
#   ./scripts/automation/launchd/install.sh --status     show what is currently loaded

set -uo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_DIR="$(cd "$SCRIPT_DIR/../../.." && pwd)"
AGENTS_DIR="$HOME/Library/LaunchAgents"

# The path baked into the committed plists. If the repo now lives somewhere else — a new Mac,
# a restored backup, a different user — every ProgramArguments and log path in them is wrong,
# and launchd fails silently rather than telling anyone. So rewrite on the way in.
CANONICAL_REPO="/Users/surajvadhya/Projects/indian-exams-dashboard"

JOBS=(
  com.indiaexams.portal-watch
  com.indiaexams.discover-exams
  com.indiaexams.portal-watch-heartbeat
)

status() {
  echo "Currently loaded:"
  launchctl list | grep indiaexams || echo "  (none)"
}

if [ "${1:-}" = "--status" ]; then
  status
  exit 0
fi

if [ "${1:-}" = "--uninstall" ]; then
  for job in "${JOBS[@]}"; do
    launchctl unload "$AGENTS_DIR/$job.plist" 2>/dev/null
    rm -f "$AGENTS_DIR/$job.plist"
    echo "removed $job"
  done
  echo
  status
  exit 0
fi

# --- preflight: the two absolute paths the jobs depend on ---

NODE_BIN=$(grep -h -o '/[^<]*/bin/node' "$SCRIPT_DIR"/*.plist | head -1)
if [ ! -x "$NODE_BIN" ]; then
  echo "ERROR: the plists expect node at $NODE_BIN, which is not executable here."
  echo "       node is actually at: $(command -v node || echo 'not found')"
  echo "       Fix the path in the plists in this directory, then re-run."
  exit 1
fi

mkdir -p "$AGENTS_DIR"

echo "Repo:  $REPO_DIR"
echo "node:  $NODE_BIN"
[ "$REPO_DIR" != "$CANONICAL_REPO" ] && echo "NOTE:  repo has moved from $CANONICAL_REPO — rewriting paths on install."
echo

for job in "${JOBS[@]}"; do
  src="$SCRIPT_DIR/$job.plist"
  dest="$AGENTS_DIR/$job.plist"

  if [ ! -f "$src" ]; then
    echo "SKIP $job — $src is missing"
    continue
  fi

  sed "s|$CANONICAL_REPO|$REPO_DIR|g" "$src" > "$dest"

  if ! plutil -lint "$dest" >/dev/null; then
    echo "ERROR: $job.plist is not valid after rewriting. Left in place for inspection: $dest"
    exit 1
  fi

  # Unload first so a re-run picks up an edited definition rather than keeping the old one.
  launchctl unload "$dest" 2>/dev/null
  if launchctl load "$dest" 2>/dev/null; then
    echo "loaded $job"
  else
    echo "ERROR: launchctl could not load $job — see $dest"
  fi
done

echo
status
echo
echo "Schedules: portal watch daily 09:00 · discovery Mondays 09:00 · heartbeat Sundays 19:00."
echo "The first two also fire at startup to catch up a slot missed while the Mac was off;"
echo "their wrappers skip a day (or week) that already succeeded, so that is never a duplicate."

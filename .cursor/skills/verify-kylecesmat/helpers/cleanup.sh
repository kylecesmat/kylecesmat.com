#!/usr/bin/env bash
# Stop only the preview this run started. Do not delete evidence.
set -euo pipefail

HELPERS="$(cd "$(dirname "$0")" && pwd)"
SKILL_DIR="$(cd "$HELPERS/.." && pwd)"
STATE="$SKILL_DIR/.run/state"

if [[ ! -f "$STATE" ]]; then
  echo "cleanup: no state file; nothing to stop"
  exit 0
fi
# shellcheck disable=SC1090
source "$STATE"

kill_tree() {
  local pid="$1"
  local kids
  kids="$(ps -o pid= --ppid "$pid" 2>/dev/null || true)"
  for k in $kids; do
    kill_tree "$k"
  done
  if kill -0 "$pid" 2>/dev/null; then
    kill "$pid" 2>/dev/null || true
  fi
}

if [[ -n "${PID:-}" ]] && kill -0 "$PID" 2>/dev/null; then
  kill_tree "$PID"
  for _ in $(seq 1 20); do
    kill -0 "$PID" 2>/dev/null || break
    sleep 0.1
  done
  if kill -0 "$PID" 2>/dev/null; then
    kill -9 "$PID" 2>/dev/null || true
  fi
  echo "cleanup: stopped pid=$PID"
else
  echo "cleanup: recorded pid ${PID:-unset} already gone"
fi

rm -f "$STATE"
echo "cleanup: evidence directories were not touched"

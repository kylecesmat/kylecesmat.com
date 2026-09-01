#!/usr/bin/env bash
# Start a local astro preview owned by this verification run.
set -euo pipefail

HELPERS="$(cd "$(dirname "$0")" && pwd)"
SKILL_DIR="$(cd "$HELPERS/.." && pwd)"
ROOT="$(cd "$SKILL_DIR/../../.." && pwd)"
RUN_DIR="$SKILL_DIR/.run"
STATE="$RUN_DIR/state"
PORT="${VERIFY_PORT:-4321}"
HOST="${VERIFY_HOST:-127.0.0.1}"

mkdir -p "$RUN_DIR"

if [[ -f "$STATE" ]]; then
  # shellcheck disable=SC1090
  source "$STATE"
  if [[ -n "${PID:-}" ]] && kill -0 "$PID" 2>/dev/null; then
    echo "verify-kylecesmat: already launched pid=$PID port=$PORT" >&2
    exit 0
  fi
  rm -f "$STATE"
fi

LOCK="$ROOT/.astro/preview.json"
if [[ -f "$LOCK" ]]; then
  lock_pid="$(python3 -c "import json; print(json.load(open('$LOCK')).get('pid',''))" 2>/dev/null || true)"
  if [[ -n "$lock_pid" ]] && kill -0 "$lock_pid" 2>/dev/null; then
    echo "verify-kylecesmat: stopping this checkout's leftover preview pid=$lock_pid"
    kill "$lock_pid" 2>/dev/null || true
    for _ in $(seq 1 30); do
      kill -0 "$lock_pid" 2>/dev/null || break
      sleep 0.1
    done
    if kill -0 "$lock_pid" 2>/dev/null; then
      kill -9 "$lock_pid" 2>/dev/null || true
    fi
  fi
  rm -f "$LOCK"
fi

if command -v lsof >/dev/null 2>&1 && lsof -iTCP:"$PORT" -sTCP:LISTEN >/dev/null 2>&1; then
  echo "verify-kylecesmat: port $PORT still bound after releasing this checkout's lock. Refuse." >&2
  exit 1
fi

cd "$ROOT"
npm install
npm run build

# ASTRO_PREVIEW_BACKGROUND=1 keeps preview in the foreground under our PID
# (Cursor would otherwise daemonize `astro preview` and drop ownership).
LOG="$RUN_DIR/preview.log"
: >"$LOG"
ASTRO_PREVIEW_BACKGROUND=1 ./node_modules/.bin/astro preview --host "$HOST" --port "$PORT" >"$LOG" 2>&1 &
PID=$!

{
  echo "PID=$PID"
  echo "PORT=$PORT"
  echo "HOST=$HOST"
  echo "STARTED_AT=$(date -u +%Y-%m-%dT%H:%M:%SZ)"
} >"$STATE"

cleanup_on_fail() {
  if kill -0 "$PID" 2>/dev/null; then
    kill "$PID" 2>/dev/null || true
    wait "$PID" 2>/dev/null || true
  fi
  rm -f "$STATE"
}

owns_listen() {
  local want="$1"
  local lp parent cur
  lp="$(lsof -iTCP:"$PORT" -sTCP:LISTEN -t 2>/dev/null | head -1 || true)"
  [[ -z "$lp" ]] && return 1
  [[ "$lp" == "$want" ]] && return 0
  cur="$lp"
  for _ in 1 2 3 4 5; do
    parent="$(ps -o ppid= -p "$cur" 2>/dev/null | tr -d ' ' || true)"
    [[ -z "$parent" || "$parent" == "1" ]] && break
    [[ "$parent" == "$want" ]] && return 0
    cur="$parent"
  done
  return 1
}

for _ in $(seq 1 40); do
  if curl -sf -o /dev/null "http://${HOST}:${PORT}/" && owns_listen "$PID"; then
    echo "verify-kylecesmat: ready pid=$PID http://${HOST}:${PORT}/"
    exit 0
  fi
  if ! kill -0 "$PID" 2>/dev/null; then
    echo "verify-kylecesmat: preview exited before ready. log:" >&2
    cat "$LOG" >&2 || true
    cleanup_on_fail
    exit 1
  fi
  sleep 0.25
done

echo "verify-kylecesmat: timed out waiting for http://${HOST}:${PORT}/" >&2
cat "$LOG" >&2 || true
cleanup_on_fail
exit 1

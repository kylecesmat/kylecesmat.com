#!/usr/bin/env bash
# Read-only: is this preview instance worth driving?
set -euo pipefail

HELPERS="$(cd "$(dirname "$0")" && pwd)"
SKILL_DIR="$(cd "$HELPERS/.." && pwd)"
ROOT="$(cd "$SKILL_DIR/../../.." && pwd)"
STATE="$SKILL_DIR/.run/state"
HERO='Building Agent Experience for enterprise engineering orgs'
TRAJECTORY='Coinbase SEM · formerly Formidable'

if [[ ! -f "$STATE" ]]; then
  echo "doctor: missing $STATE (run launch.sh)" >&2
  exit 1
fi
# shellcheck disable=SC1090
source "$STATE"

NODE_V="$(node -v)"
NODE_MAJOR="${NODE_V#v}"
NODE_MAJOR="${NODE_MAJOR%%.*}"
if [[ "$NODE_MAJOR" -lt 22 ]]; then
  echo "doctor: Node >=22 required, got $NODE_V" >&2
  exit 1
fi

NVMRC="$(tr -d '[:space:]' <"$ROOT/.nvmrc")"
if [[ "$NVMRC" != "22" ]]; then
  echo "doctor: .nvmrc is '$NVMRC', expected 22" >&2
  exit 1
fi

if [[ -z "${PID:-}" ]] || ! kill -0 "$PID" 2>/dev/null; then
  echo "doctor: recorded PID ${PID:-unset} is not running" >&2
  exit 1
fi

LISTEN_PIDS=""
if command -v lsof >/dev/null 2>&1; then
  LISTEN_PIDS="$(lsof -iTCP:"$PORT" -sTCP:LISTEN -t 2>/dev/null || true)"
fi

owns=0
for lp in $LISTEN_PIDS; do
  if [[ "$lp" == "$PID" ]]; then
    owns=1
    break
  fi
  # npm/npx often spawn a child that actually binds the port
  if [[ "$(ps -o ppid= -p "$lp" 2>/dev/null | tr -d ' ')" == "$PID" ]]; then
    owns=1
    break
  fi
  # walk a couple of ancestors
  cur="$lp"
  for _ in 1 2 3 4; do
    parent="$(ps -o ppid= -p "$cur" 2>/dev/null | tr -d ' ' || true)"
    [[ -z "$parent" || "$parent" == "1" ]] && break
    if [[ "$parent" == "$PID" ]]; then
      owns=1
      break
    fi
    cur="$parent"
  done
  [[ "$owns" == 1 ]] && break
done

if [[ "$owns" != 1 ]]; then
  echo "doctor: port $PORT is not owned by pid $PID (listen pids: ${LISTEN_PIDS:-none})" >&2
  exit 1
fi

TMP="$(mktemp)"
STATUS="$(curl -sS -o "$TMP" -w '%{http_code}' "http://${HOST}:${PORT}/")"
if [[ "$STATUS" != "200" ]]; then
  echo "doctor: GET / returned $STATUS" >&2
  rm -f "$TMP"
  exit 1
fi

if ! grep -q "$HERO" "$TMP"; then
  echo "doctor: homepage missing locked hero string" >&2
  rm -f "$TMP"
  exit 1
fi

if grep -q '\[TODO: headline' "$TMP" || grep -q 'headlinePick' "$TMP"; then
  echo "doctor: homepage still has placeholder headline" >&2
  rm -f "$TMP"
  exit 1
fi

if ! grep -q "$TRAJECTORY" "$TMP"; then
  echo "doctor: homepage missing trajectory line" >&2
  rm -f "$TMP"
  exit 1
fi

# Fail if quantitative hiring metrics leaked back onto the homepage.
if grep -E '0→|2,200|0%→94%|~170 MCP|4\.8k|16k runs|26s→|98% down' "$TMP"; then
  echo "doctor: homepage contains quantitative metrics (forbidden)" >&2
  rm -f "$TMP"
  exit 1
fi

rm -f "$TMP"
echo "doctor: ok node=$NODE_V pid=$PID http://${HOST}:${PORT}/ hero=locked"

#!/usr/bin/env bash
# Fetch a preview URL into evidence/$RUN_ID/: HTTP status, HTML, aria-ish snapshot, screenshot.
set -euo pipefail

HELPERS="$(cd "$(dirname "$0")" && pwd)"
SKILL_DIR="$(cd "$HELPERS/.." && pwd)"
STATE="$SKILL_DIR/.run/state"

URL="${1:-}"
STEM="${2:-page}"
if [[ -z "$URL" ]]; then
  echo "usage: snapshot.sh <url> [stem]" >&2
  exit 1
fi

if [[ -z "${RUN_ID:-}" ]]; then
  echo "snapshot.sh: set RUN_ID (evidence folder name)" >&2
  exit 1
fi

OUT="$SKILL_DIR/evidence/$RUN_ID"
mkdir -p "$OUT"

STATUS="$(curl -sS -D "$OUT/${STEM}.headers" -o "$OUT/${STEM}.html" -w '%{http_code}' "$URL")"
echo "$STATUS" >"$OUT/${STEM}.status.txt"
echo "url=$URL" >"$OUT/${STEM}.meta.txt"
echo "status=$STATUS" >>"$OUT/${STEM}.meta.txt"
echo "fetched_at=$(date -u +%Y-%m-%dT%H:%M:%SZ)" >>"$OUT/${STEM}.meta.txt"
if [[ -f "$STATE" ]]; then
  echo "state=$(tr '\n' ' ' <"$STATE")" >>"$OUT/${STEM}.meta.txt"
fi

python3 "$HELPERS/aria_snapshot.py" "$OUT/${STEM}.html" >"$OUT/${STEM}.aria.txt"

CHROME="${CHROME_BIN:-/usr/bin/google-chrome-stable}"
if [[ -x "$CHROME" ]]; then
  "$CHROME" \
    --headless=new \
    --disable-gpu \
    --no-sandbox \
    --hide-scrollbars \
    --window-size=1280,1800 \
    --screenshot="$OUT/${STEM}.png" \
    "$URL" >/dev/null 2>"$OUT/${STEM}.chrome.log" || {
    echo "snapshot.sh: chrome screenshot failed (see ${STEM}.chrome.log)" >&2
  }
else
  echo "snapshot.sh: no chrome at $CHROME; skipped screenshot" >&2
fi

echo "snapshot: $OUT/${STEM}.* status=$STATUS"

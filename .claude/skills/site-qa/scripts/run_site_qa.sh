#!/bin/bash
# Run Site QA against a URL and print structured results.
#
# Usage:
#   ./run_site_qa.sh <url>              # rechecks previous issues if they exist
#   ./run_site_qa.sh <url> --fresh      # forces a fresh scan, ignoring previous results
#
# Auth:
#   Uses BREEZY_AGENT_JWT env var (set automatically in coding-agent containers)
#
# Example:
#   ./run_site_qa.sh https://xyz.sandbox.getbreezy.app
#   ./run_site_qa.sh https://xyz.sandbox.getbreezy.app --fresh

set -euo pipefail

RESULTS_FILE="/tmp/site_qa_last_results.json"

if [ -z "${1:-}" ]; then
  echo "Error: URL is required."
  echo "Usage: ./run_site_qa.sh <url> [--fresh]"
  exit 1
fi

if echo "$1" | grep -qiE '^https?://localhost'; then
  echo "Error: localhost URLs are not supported. Use the sandbox URL instead."
  echo "Example: ./run_site_qa.sh https://xyz.sandbox.getbreezy.app"
  exit 1
fi

URL="$1"
RECHECK=false
if [ "${2:-}" = "--fresh" ]; then
  RECHECK=false
elif [ -f "$RESULTS_FILE" ]; then
  RECHECK=true
fi

BREEZY_API_URL="${BREEZY_API_URL:-https://app.getbreezy.app}"
ENDPOINT="$BREEZY_API_URL/breezy/coding_agent_requests/site_qa"

# --------------- auth header ---------------
JWT="${BREEZY_AGENT_JWT:-}"
if [ -z "$JWT" ]; then
  echo "Error: BREEZY_AGENT_JWT env var is required."
  exit 1
fi
AUTH_HEADER="X-Coding-Agent-JWT: $JWT"

# --------------- call endpoint ---------------
if [ "$RECHECK" = true ]; then
  echo "Running Site QA (recheck mode)..."
  echo "  Note: Rechecking previously reported issues only — no new issues will be flagged."
  echo "  To run a fresh scan instead: ./run_site_qa.sh $URL --fresh"
else
  echo "Running Site QA (fresh scan)..."
fi
echo "  URL:       $URL"
echo "  Endpoint:  $ENDPOINT"
echo ""

if [ "$RECHECK" = true ]; then
  PREVIOUS_ISSUES=$(jq -c '[.pages[].issues[] | {issue: .issue, severity: .severity}]' "$RESULTS_FILE")
  PAYLOAD=$(jq -n --arg url "$URL" --argjson issues "$PREVIOUS_ISSUES" \
    '{website_url: $url, max_pages: 1, previous_issues: $issues}')
else
  PAYLOAD="{\"website_url\":\"$URL\",\"max_pages\":1}"
fi

RESPONSE=$(curl -sS -w "\n%{http_code}" "$ENDPOINT" \
  -H "Content-Type: application/json" \
  -H "$AUTH_HEADER" \
  -d "$PAYLOAD")

HTTP_CODE=$(echo "$RESPONSE" | tail -1)
BODY=$(echo "$RESPONSE" | sed '$d')

if [ "$HTTP_CODE" -ge 400 ]; then
  echo "Request failed (HTTP $HTTP_CODE):"
  echo "$BODY" | jq . 2>/dev/null || echo "$BODY"
  exit 1
fi

# Save results for future --recheck runs
echo "$BODY" | jq . > "$RESULTS_FILE"

# --------------- display results ---------------
echo "=== Site QA Results ==="
echo "$BODY" | jq .

# Quick summary line
TOTAL=$(echo "$BODY" | jq -r '.total_issues // "?"')
GROUPED=$(echo "$BODY" | jq -r '.grouped_total_issues // "?"')
echo ""
echo "Summary: $TOTAL raw issues ($GROUPED grouped)"

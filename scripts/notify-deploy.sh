#!/bin/bash
# Deploy notification script for Breezy
# Usage:
#   notify-deploy.sh success <repo_name> <commit_hash>
#   notify-deploy.sh failed <repo_name> <commit_hash> [error_message]
#
# Environment variables:
#   GITHUB_RUN_ID - GitHub Actions run ID (automatically set in GitHub Actions)

set -e

ACTION="${1}"
BREEZY_API_URL="${BREEZY_API_URL:-https://app.getbreezy.app}"

# Check if deploy secret is set
if [ -z "$BREEZY_SITES_PIPELINE_DEPLOY_SECRET" ]; then
  echo "BREEZY_SITES_PIPELINE_DEPLOY_SECRET not set, skipping deploy notification"
  exit 0
fi

# Build run_id JSON field if available
RUN_ID_JSON=""
if [ -n "$GITHUB_RUN_ID" ]; then
  RUN_ID_JSON=",\"run_id\": \"$GITHUB_RUN_ID\""
fi

case "$ACTION" in
  success)
    REPO_NAME="${2}"
    COMMIT_HASH="${3}"
    
    if [ -z "$REPO_NAME" ] || [ -z "$COMMIT_HASH" ]; then
      echo "Usage: notify-deploy.sh success <repo_name> <commit_hash>"
      exit 1
    fi
    
    curl -s -X POST "$BREEZY_API_URL/breezy/site_deploys/update_status" \
      -H "Content-Type: application/json" \
      -H "X-Deploy-Secret: $BREEZY_SITES_PIPELINE_DEPLOY_SECRET" \
      -d "{
        \"repo_name\": \"$REPO_NAME\",
        \"commit_hash\": \"$COMMIT_HASH\",
        \"status\": \"success\"$RUN_ID_JSON
      }" >/dev/null 2>&1 || true
    
    echo "Deploy marked as success (run_id: ${GITHUB_RUN_ID:-n/a})"
    ;;
    
  failed)
    REPO_NAME="${2}"
    COMMIT_HASH="${3}"
    ERROR_MESSAGE="${4:-Deploy failed - check GitHub Actions logs}"
    
    if [ -z "$REPO_NAME" ] || [ -z "$COMMIT_HASH" ]; then
      echo "Usage: notify-deploy.sh failed <repo_name> <commit_hash> [error_message]"
      exit 1
    fi
    
    curl -s -X POST "$BREEZY_API_URL/breezy/site_deploys/update_status" \
      -H "Content-Type: application/json" \
      -H "X-Deploy-Secret: $BREEZY_SITES_PIPELINE_DEPLOY_SECRET" \
      -d "{
        \"repo_name\": \"$REPO_NAME\",
        \"commit_hash\": \"$COMMIT_HASH\",
        \"status\": \"failed\",
        \"error_message\": \"$ERROR_MESSAGE\"$RUN_ID_JSON
      }" >/dev/null 2>&1 || true
    
    echo "Deploy marked as failed (run_id: ${GITHUB_RUN_ID:-n/a})"
    ;;
    
  *)
    echo "Usage: notify-deploy.sh <success|failed> <repo_name> <commit_hash> [error_message]"
    exit 1
    ;;
esac

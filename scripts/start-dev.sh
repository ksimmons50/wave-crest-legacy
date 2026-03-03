#!/bin/bash

# Start Next.js development server with automatic restart.
#
# Why a restart loop?
# Next.js exits with code 1 when next.config.ts changes, expecting a process
# manager to restart it. In ECS this would kill the whole task. Additionally,
# the symlinked node_modules from /app can break when the coding agent modifies
# dependencies, causing module-not-found errors on restart. The loop handles
# both: it replaces the broken symlink with a real npm install before retrying.
#
# Restart sentinel:
# The coding agent (or anyone with access to /workspace) can request a graceful
# restart by running: touch /workspace/.restart-server
# A background watcher picks this up within ~2 seconds.

# Fail fast during initialization only
set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Starting Next.js development server...${NC}"

# Seed /workspace from the image once, then run from /workspace
if [ -d /workspace ]; then
  if [ ! -f /workspace/package.json ]; then
    echo -e "${GREEN}📦 Initializing /workspace from /app...${NC}"
    # Copy all files (including dotfiles) without overwriting if they somehow exist
    # The -a flag preserves permissions, ownership, and timestamps
    shopt -s dotglob nullglob
    cp -a /app/. /workspace/
    # Reuse image dependencies if present to speed up start
    if [ -d /app/node_modules ] && [ ! -e /workspace/node_modules ]; then
      ln -s /app/node_modules /workspace/node_modules
    fi
    echo -e "${GREEN}✅ Workspace initialized${NC}"
  fi
  
  cd /workspace
else
  cd /app
fi

# Set up environment for Next.js
export NODE_OPTIONS="--max-old-space-size=8192"
# Force polling for file watching in container environment
export CHOKIDAR_USEPOLLING=true
export CHOKIDAR_INTERVAL=1000
# Mark this as a Breezy dev server to prevent build conflicts
export BREEZY_DEV_SERVER=true

# Start Next.js development server
echo -e "${GREEN}⚡ Starting Next.js on port ${PORT:-3007}...${NC}"
echo -e "${BLUE}💡 To restart the server: touch /workspace/.restart-server${NC}"
echo -e "${BLUE}💡 To recover from corruption: npm run recover${NC}"
echo -e "${BLUE}🔍 Health check available at: http://localhost:${PORT:-3007}/api/health${NC}"
echo

# Disable set -e for the restart loop
set +e

# Track rapid crashes to avoid infinite restart loops
CRASH_COUNT=0
MAX_RAPID_CRASHES=5
MODULES_FIXED=false

# Sentinel files for restart signaling.
# The coding agent touches RESTART_SENTINEL. The background watcher sees it,
# converts it to RESTART_ACK (so the main loop knows this was a requested
# restart, not a crash), then kills Next.js.
RESTART_SENTINEL="/workspace/.restart-server"
RESTART_ACK="/tmp/.restart-ack"

# Forward SIGTERM/SIGINT to the Next.js child process for graceful shutdown
NEXT_PID=0
WATCHER_PID=0
NEXT_PID_FILE="/tmp/.next-dev-pid"

shutdown() {
  echo -e "\n${GREEN}🛑 Shutting down dev server...${NC}"
  [ $WATCHER_PID -ne 0 ] && kill $WATCHER_PID 2>/dev/null
  if [ $NEXT_PID -ne 0 ]; then
    kill_next_and_wait $NEXT_PID
    wait $NEXT_PID 2>/dev/null
  fi
  rm -f "$RESTART_ACK" "$NEXT_PID_FILE"
  exit 0
}
trap shutdown SIGTERM SIGINT

# Nuke corrupted node_modules and run a clean npm install from scratch.
# Clears the npm cache first to avoid ENOTEMPTY bugs where npm's own cached
# tarballs/directories cause rmdir failures even on a fresh install.
#
# Returns 0 on success, 1 on failure.
fix_node_modules() {
  local label="${1:-recovery}"
  echo -e "${YELLOW}🔧 [$label] Removing node_modules and npm cache, then running clean npm install...${NC}"
  rm -rf /workspace/node_modules
  npm cache clean --force 2>&1
  npm install 2>&1
  local rc=$?
  if [ $rc -eq 0 ]; then
    echo -e "${GREEN}✅ [$label] npm install complete${NC}"
    return 0
  fi
  echo -e "${RED}⚠ [$label] npm install failed (exit $rc). Retrying...${NC}"
  rm -rf /workspace/node_modules
  npm cache clean --force 2>&1
  npm install 2>&1
  rc=$?
  if [ $rc -eq 0 ]; then
    echo -e "${GREEN}✅ [$label] npm install complete (retry succeeded)${NC}"
    return 0
  fi
  echo -e "${RED}⚠ [$label] npm install failed again (exit $rc)${NC}"
  return 1
}

# Kill the Next.js process and everything holding the server port.
# npx spawns child processes (the actual Next.js server) that inherit the port,
# so killing just npx leaves orphans holding the port open.
kill_next_and_wait() {
  local pid=$1
  local port=${PORT:-3007}
  # Kill the process group (npx + children) via negative PID
  kill -TERM -"$pid" 2>/dev/null || kill -TERM "$pid" 2>/dev/null
  sleep 1
  # Force-kill anything still holding the port
  fuser -k "$port"/tcp 2>/dev/null || true
  # Wait up to 5 seconds for the port to be free
  local attempts=0
  while [ $attempts -lt 10 ]; do
    if ! fuser "$port"/tcp >/dev/null 2>&1; then
      return 0
    fi
    sleep 0.5
    attempts=$((attempts + 1))
  done
  # Last resort: SIGKILL anything on the port
  fuser -k -9 "$port"/tcp 2>/dev/null || true
  sleep 1
}

# Background watcher: polls for the sentinel file and kills Next.js when found.
# Writes an ack file so the main loop can distinguish requested restarts from crashes.
# NOTE: This runs in a subshell (via &) so it cannot see the parent's NEXT_PID
# variable. Instead it reads the PID from NEXT_PID_FILE on each iteration.
watch_for_restart() {
  while true; do
    sleep 2
    if [ -f "$RESTART_SENTINEL" ]; then
      rm -f "$RESTART_SENTINEL"
      touch "$RESTART_ACK"
      echo -e "\n${BLUE}🔄 Restart requested (via .restart-server). Restarting Next.js...${NC}"
      local pid
      pid=$(cat "$NEXT_PID_FILE" 2>/dev/null)
      if [ -n "$pid" ] && kill -0 "$pid" 2>/dev/null; then
        kill_next_and_wait "$pid"
      fi
    fi
  done
}
watch_for_restart &
WATCHER_PID=$!

while true; do
  LAST_START_TIME=$(date +%s)

  npx next dev -H 0.0.0.0 -p ${PORT:-3007} &
  NEXT_PID=$!
  echo "$NEXT_PID" > "$NEXT_PID_FILE"
  wait $NEXT_PID
  EXIT_CODE=$?
  NEXT_PID=0

  # Check if this was a requested restart (watcher left an ack file)
  if [ -f "$RESTART_ACK" ]; then
    rm -f "$RESTART_ACK"
    if fix_node_modules "restart"; then
      echo -e "${GREEN}✅ Module sync succeeded${NC}"
    else
      echo -e "${YELLOW}⚠ npm install failed — proceeding with whatever modules are available${NC}"
    fi
    MODULES_FIXED=true
    CRASH_COUNT=0
    echo -e "${BLUE}🔄 Restarting Next.js now...${NC}"
    sleep 3
    continue
  fi

  # Exit cleanly on SIGTERM/SIGINT (exit code 0 or 143)
  if [ $EXIT_CODE -eq 0 ] || [ $EXIT_CODE -eq 143 ]; then
    echo -e "${GREEN}🛑 Dev server stopped cleanly (exit $EXIT_CODE).${NC}"
    exit 0
  fi

  # Track rapid crashes: if the process ran for less than 10 seconds, count it
  NOW=$(date +%s)
  ELAPSED=$(( NOW - LAST_START_TIME ))
  if [ $ELAPSED -lt 10 ]; then
    CRASH_COUNT=$(( CRASH_COUNT + 1 ))
  else
    CRASH_COUNT=0
    # Server ran long enough that the previous fix "worked". Reset the flag so
    # the NEXT corruption triggers a fresh fix_node_modules instead of being
    # skipped. Without this, the agent can corrupt modules a second time and the
    # crash handler will skip the fix → rapid crash loop → "giving up".
    MODULES_FIXED=false
  fi

  echo -e "${YELLOW}⚠ Next.js exited with code $EXIT_CODE. Restarting in 2 seconds...${NC}"

  # Ensure the port is free before restarting. When Next.js crashes, orphaned
  # child processes (spawned by npx) may still hold the port open.
  fuser -k "${PORT:-3007}"/tcp 2>/dev/null || true
  sleep 1

  # If we haven't tried fixing node_modules yet for this crash cycle, do it now.
  # This restores the clean image copy and runs npm install to sync new deps.
  if [ "$MODULES_FIXED" = false ]; then
    if fix_node_modules "crash"; then
      echo -e "${GREEN}✅ Module recovery succeeded — restarting with clean deps${NC}"
    else
      echo -e "${YELLOW}⚠ npm install failed — some deps may be missing${NC}"
    fi
    MODULES_FIXED=true
    CRASH_COUNT=0  # Reset — give it a fair chance with clean modules
    sleep 2
    continue
  fi

  if [ $CRASH_COUNT -ge $MAX_RAPID_CRASHES ]; then
    LAST_RESORT_ATTEMPTED=${LAST_RESORT_ATTEMPTED:-false}
    if [ "$LAST_RESORT_ATTEMPTED" = true ]; then
      echo -e "${RED}💀 Next.js crashed $MAX_RAPID_CRASHES times rapidly after last-resort recovery. Giving up.${NC}"
      echo -e "${RED}   Check logs above for the repeating error to diagnose the issue.${NC}"
      exit 1
    fi

    # Last resort: nuke .next cache + full module recovery before giving up entirely.
    echo -e "${RED}🚨 Next.js crashed $MAX_RAPID_CRASHES times rapidly. Attempting last-resort recovery...${NC}"
    echo -e "${YELLOW}🗑️  Deleting .next build cache...${NC}"
    rm -rf /workspace/.next
    if fix_node_modules "last-resort"; then
      echo -e "${GREEN}✅ Last-resort recovery succeeded${NC}"
    else
      echo -e "${YELLOW}⚠ Last-resort npm install failed — trying anyway${NC}"
    fi
    MODULES_FIXED=true
    CRASH_COUNT=0
    LAST_RESORT_ATTEMPTED=true
    sleep 3
    continue
  fi

  sleep 2
done

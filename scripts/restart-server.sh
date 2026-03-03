#!/bin/bash

# Request a graceful restart of the Next.js dev server.
#
# This works by touching a sentinel file that the start-dev.sh background
# watcher polls for. The watcher will gracefully stop Next.js and the restart
# loop will bring it back up within a few seconds.
#
# Usage:
#   bash scripts/restart-server.sh
#   # or via npm:
#   npm run restart

RESTART_SENTINEL="/workspace/.restart-server"

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

touch "$RESTART_SENTINEL"
echo -e "${GREEN}🔄 Restart requested.${NC} The dev server will restart within a few seconds."
echo -e "${BLUE}💡 Watch the server logs to confirm the restart.${NC}"

#!/bin/bash
# Lists all available templates from breezy-templates.com
# Set TEMPLATES_API_URL to use a different server (e.g., http://localhost:3003)

API_URL="${TEMPLATES_API_URL:-https://breezy-templates.com}"
curl -s "$API_URL/api/templates" | jq '.templates[] | {id, name, description, style, colorScheme}'

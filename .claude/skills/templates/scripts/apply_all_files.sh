#!/bin/bash
# Downloads a template and applies ALL files to this project
# Usage: ./apply_all_files.sh <template_id>
# Example: ./apply_all_files.sh modern
# Set TEMPLATES_API_URL to use a different server (e.g., http://localhost:3003)

set -e

if [ -z "$1" ]; then
  echo "Usage: $0 <template_id>"
  echo "Run list_templates.sh to see available template IDs"
  exit 1
fi

TEMPLATE_ID="$1"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="${SCRIPT_DIR%%/.claude/*}"
API_URL="${TEMPLATES_API_URL:-https://breezy-templates.com}"

echo "Fetching template: $TEMPLATE_ID from $API_URL..."
RESPONSE=$(curl -s "$API_URL/api/templates/$TEMPLATE_ID/source")

if echo "$RESPONSE" | jq -e '.success == false' > /dev/null 2>&1; then
  echo "Error: Template '$TEMPLATE_ID' not found"
  exit 1
fi

# Create components directory for template
mkdir -p "$PROJECT_ROOT/app/components/templates/$TEMPLATE_ID"

# Process each source file
echo "$RESPONSE" | jq -c '.sources[]' | while read -r source; do
  TYPE=$(echo "$source" | jq -r '.type')
  CODE=$(echo "$source" | jq -r '.code')
  ORIG_PATH=$(echo "$source" | jq -r '.path')
  FILENAME=$(basename "$ORIG_PATH")
  
  case "$TYPE" in
    globals)
      DEST="$PROJECT_ROOT/app/globals.css"
      echo "$CODE" > "$DEST"
      echo "  ✓ app/globals.css"
      ;;
    page)
      # Fix @/ imports: @/components/ -> @/app/components/, @/utils/ -> @/app/utils/
      FIXED_CODE=$(echo "$CODE" | sed 's|@/components/|@/app/components/|g')
      FIXED_CODE=$(echo "$FIXED_CODE" | sed 's|@/utils/|@/app/utils/|g')
      # Fix navigation links from /preview/id/ to /
      FIXED_CODE=$(echo "$FIXED_CODE" | sed 's|/preview/'"$TEMPLATE_ID"'/|/|g')
      FIXED_CODE=$(echo "$FIXED_CODE" | sed 's|/preview/'"$TEMPLATE_ID"'"|/"|g')
      # Also handle anchor links like /preview/id#section
      FIXED_CODE=$(echo "$FIXED_CODE" | sed 's|/preview/'"$TEMPLATE_ID"'#|/#|g')

      if [[ "$ORIG_PATH" == *"/about/"* ]]; then
        mkdir -p "$PROJECT_ROOT/app/about"
        DEST="$PROJECT_ROOT/app/about/page.tsx"
      else
        DEST="$PROJECT_ROOT/app/page.tsx"
      fi
      echo "$FIXED_CODE" > "$DEST"
      REL_DEST="$(echo $DEST | sed "s|$PROJECT_ROOT/||")"
      echo "  ✓ $REL_DEST"

      # Generate sections manifest from home page (for section library)
      if [[ "$ORIG_PATH" != *"/about/"* ]]; then
        node -e "
          const fs = require('fs');
          const code = fs.readFileSync(process.argv[1], 'utf8');
          const re = /\{ id: ['\"]([^'\"]+)['\"], name: ['\"]([^'\"]+)['\"], Component: (\w+) \}/g;
          const sections = [];
          let m;
          while ((m = re.exec(code))) sections.push({ id: m[1], name: m[2], componentName: m[3] });
          fs.writeFileSync(process.argv[2], JSON.stringify(sections, null, 2));
          console.log('  ✓ sections.json (' + sections.length + ' sections)');
        " "$DEST" "$PROJECT_ROOT/app/components/templates/$TEMPLATE_ID/sections.json"
      fi
      ;;
    component)
      # Fix @/ imports for components
      FIXED_CODE=$(echo "$CODE" | sed 's|@/components/|@/app/components/|g')
      FIXED_CODE=$(echo "$FIXED_CODE" | sed 's|@/utils/|@/app/utils/|g')
      # Fix navigation links from /preview/id/ to /
      FIXED_CODE=$(echo "$FIXED_CODE" | sed 's|/preview/'"$TEMPLATE_ID"'/|/|g')
      FIXED_CODE=$(echo "$FIXED_CODE" | sed 's|/preview/'"$TEMPLATE_ID"'"|/"|g')
      # Also handle anchor links like /preview/id#section
      FIXED_CODE=$(echo "$FIXED_CODE" | sed 's|/preview/'"$TEMPLATE_ID"'#|/#|g')

      # Navigation and Footer go to app/components/ (not under templates/)
      # because the base repo's layout imports them from there
      if [[ "$FILENAME" == "Navigation.tsx" || "$FILENAME" == "Footer.tsx" ]]; then
        # Fix content imports: ./content/ -> ./templates/$TEMPLATE_ID/content/
        # These files move to app/components/ but their content files stay in templates/
        FIXED_CODE=$(echo "$FIXED_CODE" | sed "s|\\./content/|./templates/$TEMPLATE_ID/content/|g")
        DEST="$PROJECT_ROOT/app/components/$FILENAME"
        echo "$FIXED_CODE" > "$DEST"
        echo "  ✓ app/components/$FILENAME"
      else
        # Preserve subdirectory structure (e.g., content/home.tsx)
        # Extract relative path after template ID
        REL_PATH=$(echo "$ORIG_PATH" | sed "s|.*templates/$TEMPLATE_ID/||")
        DEST_DIR=$(dirname "$PROJECT_ROOT/app/components/templates/$TEMPLATE_ID/$REL_PATH")
        mkdir -p "$DEST_DIR"
        DEST="$PROJECT_ROOT/app/components/templates/$TEMPLATE_ID/$REL_PATH"
        echo "$FIXED_CODE" > "$DEST"
        echo "  ✓ app/components/templates/$TEMPLATE_ID/$REL_PATH"
      fi
      ;;
    shared)
      # Skip LeadForm and RealReviews - base repo has its own versions
      if [[ "$FILENAME" == "LeadForm.tsx" || "$FILENAME" == "RealReviews.tsx" || "$FILENAME" == "RealScheduling.tsx" ]]; then
        echo "  ⏭ Skipped $FILENAME (keeping existing)"
      else
        # Other shared components go to app/components/
        FIXED_CODE=$(echo "$CODE" | sed 's|@/components/|@/app/components/|g')
        FIXED_CODE=$(echo "$FIXED_CODE" | sed 's|@/utils/|@/app/utils/|g')
        # Fix navigation links from /preview/id/ to /
        FIXED_CODE=$(echo "$FIXED_CODE" | sed 's|/preview/'"$TEMPLATE_ID"'/|/|g')
        FIXED_CODE=$(echo "$FIXED_CODE" | sed 's|/preview/'"$TEMPLATE_ID"'"|/"|g')
        # Also handle anchor links like /preview/id#section
        FIXED_CODE=$(echo "$FIXED_CODE" | sed 's|/preview/'"$TEMPLATE_ID"'#|/#|g')
        
        DEST="$PROJECT_ROOT/app/components/$FILENAME"
        echo "$FIXED_CODE" > "$DEST"
        echo "  ✓ app/components/$FILENAME"
      fi
      ;;
    layout)
      # Skip layout - keep existing app/layout.tsx
      echo "  ⏭ Skipped layout.tsx (keeping existing)"
      ;;
  esac
done

echo ""
echo "Done! Template '$TEMPLATE_ID' applied."

echo ""
echo "👉 AGENT: Start by reading and maybe editing these files:"
echo "  - app/page.tsx (home page — section order & structure)"
echo "  - professionalConstants.ts (business name, colors, copy)"
echo ""
echo "Checking for TODO(CODING_AGENT) comments..."
TODO_FILES=$(grep -rl 'TODO(CODING_AGENT)' "$PROJECT_ROOT/app" "$PROJECT_ROOT/professionalConstants.ts" --include="*.tsx" --include="*.jsx" --include="*.ts" 2>/dev/null || true)

if [ -n "$TODO_FILES" ]; then
  echo ""
  echo "============================================================"
  echo "IMPORTANT: Found TODO(CODING_AGENT) comments to address!"
  echo "============================================================"
  echo ""
  echo "Files with TODO(CODING_AGENT) comments:"
  for f in $TODO_FILES; do
    rel_path="${f#$PROJECT_ROOT/}"
    echo "  - $rel_path"
    grep -n 'TODO(CODING_AGENT)' "$f" 2>/dev/null | while read -r line; do
      line_num="${line%%:*}"
      comment="${line#*TODO(CODING_AGENT)}"
      comment=$(echo "$comment" | sed 's/^[: ]*//')
      echo "      L$line_num: $comment"
    done
  done
  echo ""
  echo "👉 AGENT: Address each TODO(CODING_AGENT) comment above."
  echo "   Each comment describes what needs to be implemented or changed."
  echo "   Focus on these TODOs - no need to explore the project broadly."
  echo "   Make sure no <Placeholder> components are left in the code."
  echo ""
else
  echo "  ✓ No TODO(CODING_AGENT) comments found - template is ready to use!"
fi

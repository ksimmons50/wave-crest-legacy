---
name: templates
description: Browse and apply templates from https://breezy-templates.com/. Use when the user wants to change the website's overall design or switch to a different template style.
---

## Scripts

Run these from `.claude/skills/templates/scripts/`:

- **`list_templates.sh`** - Show available templates with descriptions
- **`apply_all_files.sh <id>`** - Apply template (globals, pages, components) with import paths fixed

## Applying a Template

1. Run `list_templates.sh` to see options
2. Run `apply_all_files.sh <id>` to apply the template

## Notes

- Templates use `professionalConstants` - preserve those imports
- Keep existing `RealReviews`, `RealScheduling`, and `LeadForm` functionality
- Preview templates at `https://breezy-templates.com/preview/<id>`

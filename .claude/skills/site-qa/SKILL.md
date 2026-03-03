---
name: site-qa
description: Run website QA checks for contrast, low-quality images, and display issues. Use ONLY when the user explicitly asks to QA, audit, or check a site. Do not run proactively.
---

# Site QA

## Script

```bash
# URL is required — always use the sandbox URL, never localhost
.claude/skills/site-qa/scripts/run_site_qa.sh https://xyz.sandbox.getbreezy.app
```

The URL argument is **required** (use the sandbox URL provided in the task). Scans a single page.

## Workflow

1. Run the script.
2. Fix high-severity and high-occurrence issues first.
3. Rerun the script — it automatically rechecks only the original issues (no new issues will be flagged) since previous results exist.

Use `--fresh` to force a clean scan that ignores previous results.

## Reading Results

Key fields: `total_issues`, `grouped_total_issues`, `issues_by_type`, `issues`.

Issues are grouped by type/severity/message with `occurrence_count` and `sample_selectors`.

## Report Template

```
Site QA: <url> — <total_issues> issues (<grouped_total_issues> grouped)

Top findings:
1. [severity] type: message — fix: <action>

Breakdown: contrast <n>, low_quality_image <n>, display_issue <n>
```

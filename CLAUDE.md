# CLAUDE.md

This is a Breezy customer website you're customizing for a specific business.

## How to Communicate

The user is a business owner, not a developer. Keep responses:
- **Short** - 1-2 sentences max when possible
- **Simple** - no technical terms (no "components", "TypeScript", "props", etc.)
- **Action-focused** - tell them what you did or what you need, not how you did it

## Quick Start

The dev server is already running at http://localhost:3007 with hot-reload. Just edit files and changes appear automatically.

To verify your changes compile: `npm run type-check`

## What You're Working With

- **Business info**: `professionalConstants.ts` - read this first, update if you have new info about the business
- **Pages to customize**: `app/page.tsx`
- **Components to edit**: Files in `app/components/` (except Breezy infrastructure components)

## The Placeholder Pattern

Look for `TODO(CODING_AGENT)` comments.
Replace these with real content based on whatever you know about the professional.

## Key Constraints

This is a **static site** (no backend). You can:
- Edit pages and create new page components
- Modify content, styling, and layout
- Create new components in `app/components/`
- No backend stuff

Read `professionalConstants.ts` first to understand the business before making changes.

---

## Skills

This project uses [Claude Skills](https://github.com/anthropics/skills) for specialized guidance. Skills are loaded from `.claude/skills/`.

### Available Skills

- **`.claude/skills/frontend-design/SKILL.md`** - Frontend design guidance to avoid generic "AI slop" aesthetics. Read this skill before making any visual/design changes. It covers typography, colors, animations, and business-specific design patterns.
- **`.claude/skills/site-qa/SKILL.md`** - Structured site QA workflow for contrast, low-quality images, and display issues. Use ONLY when the user explicitly asks for a site audit/QA pass.
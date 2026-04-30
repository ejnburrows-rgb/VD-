# Vercel + GitHub Cleanup Checklist

Use this checklist to make Viajera Digital look clean in both GitHub and Vercel without touching production blindly.

## Current Goal

Polish the active Viajera Digital deployment and remove confusion from old deployments/projects.

## Keep

Keep one primary Vercel project connected to this GitHub repo:

- Repository: `ejnburrows-rgb/VD-`
- Production branch: `main`
- Framework: Next.js
- Install command: `npm ci`
- Build command: `npm run build`
- Runtime target: Node.js 22+

## Archive or Delete in Vercel

In Vercel, remove or archive deployments/projects that are clearly not the active Viajera Digital app:

- duplicate VD imports
- test deployments from abandoned branches
- Netlify/Railway migration experiments that are no longer used
- projects with stale domains pointing nowhere
- projects not connected to `ejnburrows-rgb/VD-`

Do **not** delete anything that owns the current live production domain until the replacement production deployment is verified.

## Domain Cleanup

One production domain should point to the active Vercel project. For each extra domain:

1. Confirm whether it receives real traffic.
2. Confirm whether it points to the current VD app.
3. Remove unused preview/test domains.
4. Keep redirects intentional and documented.

## Environment Variables

Verify required variables in Vercel are present only on the active project:

- Groq / AI provider keys
- database connection strings
- Prisma-related secrets
- any public client variables prefixed with `NEXT_PUBLIC_`

Remove secrets from abandoned projects after confirming they are not used.

## GitHub Cleanup

Recommended repo cleanup sequence:

1. Merge the cleanup PR only after Vercel preview build passes.
2. Close stale PRs that are not related to the current app polish pass.
3. Delete merged/stale branches after confirming no active deployment depends on them.
4. Keep `.gitignore` strict so logs, `.claude/`, `.vercel/`, editor files, and env files stay out of GitHub.

## Pre-Merge Gate

Before merging any cleanup/polish PR:

- Vercel preview build passes.
- Home page loads.
- Core audio/transcription route still loads.
- No secrets appear in the diff.
- Production domain is identified.
- Rollback path is clear.

# Working rules

1. Treat `main` as the authoritative release branch.
2. Read `README.md` and `docs/STATUS.md` before changing product behavior.
3. Preserve verified cultural material, poet attribution, transcription content, and décima rules.
4. Never replace source-backed content with invented names, quotations, history, or performance details.
5. Keep secrets in local or hosted environment variables only.
6. Run `npm run lint` and `npm run build` before release.
7. Use short-lived branches for real work and remove them after merge.
8. Historical restore, experiment, and agent branches do not override current `main`.
9. Keep documentation concise; record only current truth in `docs/STATUS.md`.

## GITHUB ACCOUNT LIMITS

- EJN uses a free GitHub account and does not have GitHub Actions available.
- Do not depend on GitHub Actions, required CI checks, or hosted Actions runners to complete or verify work.
- Use direct verification, local/sandbox testing, or other available tools instead.
- Do not recommend upgrading GitHub solely to enable Actions unless EJN explicitly asks about paid options.

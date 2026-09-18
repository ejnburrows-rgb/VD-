# Current status

**Authoritative branch:** `main`

**Product:** Viajera Digital — décima transcription, analysis, preservation, education, and export.

## September 18, 2026 cleanup

- The completed `ui-premium-alt` branch was 15 commits ahead of `main` and zero behind.
- That work was merged into `main` through PR #32.
- No other open pull request was present before that merge.
- `polish/ui-final` is fully behind `main` and is historical.
- `fix/add-resend-dependency` is obsolete as a release source because `main` already contains the Resend dependency.
- Old restore/revert branches and isolated performance experiments are not production branches.

## Release checks

Before production:

1. `npm run lint`
2. `npm run build`
3. Verify transcription and analysis with a representative décima sample.
4. Verify export/share paths used by the release.
5. Confirm required hosted environment variables are present without exposing their values.

## Cleanup target

Keep `main` plus only genuinely active short-lived work. Historical restore, superseded polish, and merged cleanup branches should be removed after their contents are confirmed unnecessary.

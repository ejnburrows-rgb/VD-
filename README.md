# Viajera Digital

A digital preservation and analysis platform for the Cuban décima espinela tradition. Viajera Digital turns recorded performances into searchable transcriptions, structural analysis, educational material, and exportable cultural records.

## What it does

1. Processes uploaded or linked performance audio.
2. Produces Spanish transcription with AI-assisted tooling.
3. Analyzes décima structure, rhyme, verse form, and performance cues.
4. Presents preserved poets, performances, and educational material in a polished bilingual-ready web experience.
5. Exports and shares processed material through the app's supported output flows.

## Stack

| Layer | Technology |
|---|---|
| App | Next.js 14 · React 18 · TypeScript |
| Styling | Tailwind CSS |
| AI | Groq SDK · Google Generative AI |
| Data | Prisma |
| Email | Resend |
| Audio helpers | `@distube/ytdl-core` |
| Deployment | Vercel |
| Runtime | Node.js 22+ |

## Local development

```bash
git clone https://github.com/ejnburrows-rgb/VD-.git
cd VD-
npm ci
npm run dev
```

Open `http://localhost:3000`.

Copy `.env.local.example` to `.env.local` and provide only the keys required for the workflow you are testing. Never commit real secrets.

## Quality checks

```bash
npm run lint
npm run build
```

Run both before releasing changes to `main`.

## Deployment

The repository is configured for Vercel.

- Framework: Next.js
- Install: `npm install`
- Build: `npm run build`
- Region: `iad1`
- Authoritative release branch: `main`

## Repository rules

- `main` is the release source of truth.
- Short-lived branches are for active work only; merged or superseded branches should be removed.
- Old restore branches are historical references, not release instructions.
- One-off audit/debug scripts should not accumulate in the repository unless they remain part of the supported workflow.
- Keep cultural content, attribution, transcription behavior, and décima analysis faithful to verified source material.
- Keep `docs/STATUS.md` current when release state changes.

## Documentation

- `docs/STATUS.md` — current repository state
- `AGENTS.md` — concise working rules for contributors

## License

MIT

Built by NBO — Novo Business Order.

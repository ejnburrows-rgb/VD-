# Viajera Digital

**Décima Transcription & Heritage Poetry Platform**

Viajera Digital is a Next.js application for capturing, transcribing, analyzing, and preserving the Cuban décima espinela tradition. It combines a polished audio experience with AI-assisted Spanish transcription and structural analysis for oral poetry.

---

## Product Focus

Viajera Digital helps preserve live décima performances by turning audio into searchable, analyzable cultural records.

Core workflow:

1. Upload or process audio of décima performances.
2. Transcribe Spanish poetic speech with AI-assisted transcription.
3. Analyze décima structure, including rhyme, verse shape, and performance cues.
4. Browse and study preserved performances through a clean web interface.

---

## Tech Stack

| Layer | Technology |
|---|---|
| App | Next.js · React · TypeScript |
| Styling | Tailwind CSS |
| AI | Groq SDK · Google Generative AI |
| Audio helpers | `@distube/ytdl-core` |
| Deployment | Vercel |
| Runtime target | Node.js 22+ |

---

## Local Development

```bash
git clone https://github.com/ejnburrows-rgb/VD-.git
cd VD-
npm ci
npm run dev
```

Open `http://localhost:3000`.

Required local secrets should live in `.env.local`. Do not commit `.env*`, `.claude/`, Vercel state, logs, build outputs, or local editor settings.

---

## Quality Checks

```bash
npm run lint
npm run build
```

Before merging deployment changes, confirm the Vercel preview build passes.

---

## Deployment

This repo is configured for Vercel:

- Framework: Next.js
- Install: `npm ci`
- Build: `npm run build`
- Runtime target: Node.js 22+
- Region: `iad1`

---

## GitHub Hygiene

Keep the repository focused on app source, configuration, docs, and production assets. Avoid committing:

- local IDE folders
- `.claude/` or AI tool caches
- debug logs
- generated build folders
- experimental one-off scripts unless they are productized

---

## License

MIT

---

**Built by NBO — Novo Business Order**\
© Emilio José Novo 2026
<!-- build: 2026-04-30 -->

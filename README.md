# Viajera Digital

**Décima Transcription & Heritage Poetry Platform**

> Full-stack application for transcribing, analyzing, and preserving the Cuban décima espinela tradition. Spotify-style audio UI with AI-powered transcription via GROQ Whisper and NotebookLM-style analysis functionality.

🔗 **Live:** [Deployed — URL TBD]

---

## What It Does

Viajera Digital captures, transcribes, and analyzes décimas espinelas — the 10-line octosyllabic poetic form that is the DNA of oral poetry across Latin America and the Caribbean. The platform combines audio playback with AI transcription to digitize and preserve a living literary tradition.

Core workflow:
1. Upload or record audio of décima performances (repentistas, recitals, controversias)
2. AI transcription via GROQ Whisper — optimized for Spanish poetic speech
3. Structural analysis: syllable count verification, rhyme scheme (abbaaccddc), pause detection at verse 4
4. Browse, search, and study transcribed décimas in a Spotify-style interface

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | TypeScript · HTML · CSS · JavaScript |
| UI Pattern | Spotify-style audio player + NotebookLM-style analysis |
| Player | Custom player scripts (playback, controls, streaming) |
| Backend | Python 3.13+ (separate repo: `viajera-digital-backend`) |
| Data Models | `models.py` — schema definitions and data structures |
| Processing | `pipeline.py` — transcription processing and transformation |
| Exports | `exports.py` — output generation and file exports |
| AI / Transcription | GROQ Whisper API |
| Database | Prisma ORM |
| Config | Environment-based configuration files |
| Containerization | Docker |
| Deployment | Frontend: Vercel · Backend: Render (`render.yaml`) |

---

## Repositories

This project is split across two repos:

| Repo | What | Language |
|---|---|---|
| **`VD-`** (this repo) | Frontend — UI, player, pages, config | TypeScript |
| **`viajera-digital-backend`** | Backend — API, models, pipeline, exports | Python |

---

## Run Locally

### Frontend
```
git clone https://github.com/ejnburrows-rgb/VD-.git
cd VD-
cp .env.example .env
npx serve .
```

### Backend
```
git clone https://github.com/ejnburrows-rgb/viajera-digital-backend.git
cd viajera-digital-backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
python main.py
```

### Docker (Backend)
```
docker build -t viajera-digital-backend .
docker run -p 8000:8000 viajera-digital-backend
```

---

## Deploy

**Frontend (Vercel):** Connect the `VD-` repo to Vercel for auto-deploy on push.

**Backend (Render):** The `render.yaml` blueprint handles deployment configuration.

---

## Cultural Context

The décima espinela was codified by Vicente Espinel (1591) and became the dominant oral poetry form across Cuba, Puerto Rico, Mexico, Venezuela, Colombia, and the Canary Islands. Repentistas — improvisational poets — perform décimas live before audiences of thousands. Viajera Digital exists to ensure these performances are captured, transcribed, and preserved with structural fidelity.

---

## License

MIT

---

**Built by NBO — Novo Business Order**
© Emilio José Novo 2026

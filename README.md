# El Guajiro de Hialeah - Viajera Digital

Transcriptor y Analizador de Décima Espinela Cubana

## 🚀 Deployment a Vercel

### Pre-requisitos

1. **Cuenta de Vercel**: [vercel.com](https://vercel.com)
2. **GitHub Repository**: Repositorio público o privado
3. **API Keys**:
   - GROQ_API_KEY (para transcripción con Whisper)
   - GEMINI_API_KEY (para análisis con Gemini)

### Pasos de Deployment

#### 1. Preparar Environment Variables

En el dashboard de Vercel:
- Settings → Environment Variables
- Agregar:
  - `GROQ_API_KEY`: (tu clave de Groq, configúrala en Vercel como secreto)
  - `GEMINI_API_KEY`: (tu clave de Gemini, configúrala en Vercel como secreto)
  - `DATABASE_URL`: (opcional, para Prisma)
  - `NEXT_PUBLIC_APP_URL`: `https://[tu-proyecto].vercel.app`

#### 2. Conectar con GitHub

1. Ve a [vercel.com/new](https://vercel.com/new)
2. Importa tu repositorio de GitHub
3. Configura:
   - Framework Preset: **Next.js**
   - Root Directory: `.`
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)

#### 3. Deploy

Vercel detectará automáticamente el proyecto Next.js y desplegará.

#### 4. Verificar Deployment

Después del deploy, verifica:
- ✅ Build exitoso en Vercel Dashboard
- ✅ Homepage carga correctamente
- ✅ API routes responden (ej: `/api/validate-youtube` con POST)

## 🛠️ Desarrollo Local

```bash
# Instalar dependencias
npm install

# Configurar .env.local
cp .env.example .env.local
# Editar .env.local con tus API keys

# Generar Prisma Client
npx prisma generate

# Desarrollo
npm run dev

# Build de producción
npm run build

# Iniciar servidor de producción
npm start
```

## 📁 Estructura del Proyecto

```
├── app/
│   ├── api/              # API Routes
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home page
│   └── globals.css       # Estilos globales
├── components/           # Componentes React
│   ├── ui/               # Componentes UI base
│   └── ...
├── lib/                  # Utilidades y helpers
├── prisma/               # Schema de Prisma
└── public/               # Archivos estáticos
```

## 🔧 API Routes

### `/api/validate-youtube` (POST)
Valida URLs de YouTube usando `@distube/ytdl-core`

### `/api/process-video` (POST)
Procesa video completo:
1. Descarga audio de YouTube
2. Transcribe con Groq Whisper
3. Analiza con Google Gemini

### `/api/transcribe-audio` (POST)
Transcribe audio usando Groq Whisper API

### `/api/analyze-decimas` (POST)
Analiza transcripción y formatea en décimas espinelas

## 🌐 Variables de Entorno

```env
GROQ_API_KEY=your_groq_key
GEMINI_API_KEY=your_gemini_key
DATABASE_URL=postgresql://... (opcional)
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
YOUTUBE_API_KEY=your_youtube_key (opcional, para YouTube Data API v3)
```

## 📝 Scripts Disponibles

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Build de producción
- `npm start` - Servidor de producción
- `npm run lint` - Linter de código

## 🎨 Tecnologías

- **Framework**: Next.js 14 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Base de Datos**: PostgreSQL + Prisma (opcional)
- **APIs**:
  - Groq Whisper (transcripción)
  - Google Gemini (análisis)
  - @distube/ytdl-core (descarga YouTube)

## 📄 Licencia

Este proyecto es propiedad de Emilio José Novo.

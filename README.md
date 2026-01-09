# 🎤 Viajera Digital - El Guajiro de Hialeah

Plataforma de transcripción y análisis de décima espinela cubana. Preservando el patrimonio cultural cubano a través de la tecnología.

## 📋 Descripción

Viajera Digital es una aplicación Next.js 14 que transcribe videos de YouTube y formatea el contenido en décimas espinelas cubanas tradicionales (ABBAACCDDC), con análisis académico, biografías de poetas y recursos educativos.

### Características Principales

- 🎥 **Transcripción de YouTube**: Descarga y transcribe audio de videos de YouTube
- 🎤 **Análisis con IA**: Usa Groq Whisper para transcripción y Google Gemini para análisis
- 📝 **Formato de Décimas**: Identifica y formatea décimas espinelas (ABBAACCDDC)
- 📊 **Análisis Académico**: Selecciona las TOP 4 mejores décimas con justificación
- 📚 **Recursos Educativos**: 12 biografías de poetas y 9 secciones educativas
- ⬇️ **Exportación**: Descarga resultados en formato .txt

## 🚀 Setup

### Prerrequisitos

- Node.js 18+ 
- npm o yarn
- PostgreSQL (o usar Neon/Supabase)

### Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <repository-url>
   cd viajera-digital
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   
   Copia `.env.example` a `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   
   Edita `.env.local` con tus API keys:
   ```env
   GROQ_API_KEY=tu_groq_api_key
   GEMINI_API_KEY=tu_gemini_api_key
   DATABASE_URL=postgresql://user:password@localhost:5432/viajera_digital
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Configurar base de datos**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Iniciar servidor de desarrollo**
   ```bash
   npm run dev
   ```

6. **Abrir en el navegador**
   ```
   http://localhost:3000
   ```

## 🔑 API Keys

### Groq API Key
1. Ve a [console.groq.com](https://console.groq.com)
2. Crea una cuenta o inicia sesión
3. Genera una API key
4. Agrega la key a `.env.local` como `GROQ_API_KEY`

### Google Gemini API Key
1. Ve a [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Crea una cuenta o inicia sesión
3. Genera una API key
4. Agrega la key a `.env.local` como `GEMINI_API_KEY`

### Base de Datos (PostgreSQL)

#### Opción 1: Neon (Recomendado - Gratis)
1. Ve a [neon.tech](https://neon.tech)
2. Crea una cuenta gratuita
3. Crea un nuevo proyecto
4. Copia el connection string
5. Agrega a `.env.local` como `DATABASE_URL`

#### Opción 2: Supabase (Gratis)
1. Ve a [supabase.com](https://supabase.com)
2. Crea una cuenta gratuita
3. Crea un nuevo proyecto
4. Ve a Settings > Database
5. Copia el connection string
6. Agrega a `.env.local` como `DATABASE_URL`

#### Opción 3: PostgreSQL Local
1. Instala PostgreSQL localmente
2. Crea una base de datos: `createdb viajera_digital`
3. Usa: `postgresql://user:password@localhost:5432/viajera_digital`

## 📦 Dependencias Principales

- **Next.js 14.2+** - Framework React
- **React 18.3+** - Biblioteca UI
- **TypeScript 5.4+** - Tipado estático
- **Tailwind CSS 3.4+** - Estilos
- **Prisma 5.19+** - ORM para PostgreSQL
- **Groq SDK 0.7+** - API de transcripción Whisper
- **Google Generative AI 0.21+** - API Gemini
- **@distube/ytdl-core 4.14+** - Descarga de audio YouTube

## 🛠️ Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo

# Producción
npm run build        # Construye la aplicación
npm run start        # Inicia servidor de producción

# Utilidades
npm run lint         # Ejecuta ESLint
npx prisma generate  # Genera Prisma Client
npx prisma db push  # Sincroniza schema con BD
```

## 📁 Estructura del Proyecto

```
viajera-digital/
├── app/
│   ├── api/              # API routes
│   ├── layout.tsx        # Layout principal
│   ├── page.tsx          # Página principal
│   └── globals.css       # Estilos globales
├── components/
│   ├── groq-decima-processor.tsx  # Componente principal
│   ├── hero-section.tsx            # Hero con Calixto
│   ├── navigation-tabs.tsx          # Tabs de navegación
│   ├── education-section.tsx        # Recursos educativos
│   └── ui/               # Componentes shadcn/ui
├── lib/
│   ├── db.ts             # Prisma client
│   ├── utils.ts          # Utilidades
│   └── ...               # Helpers
├── prisma/
│   └── schema.prisma     # Schema de base de datos
└── public/               # Assets estáticos
```

## 🎨 Paleta de Colores

- **Gold**: `#C8A05C` - Bordes, acentos
- **Orange**: `#D97706` - Títulos, headers
- **Orange Brown**: `#D2691E` - Botones
- **Dark Brown**: `#5C4033` - Texto principal
- **Cream**: `#F5E6D3` - Fondo
- **Red**: `#DC2626` - Botón YouTube, errores
- **Mint Green**: `#D1FAE5` - Info boxes

## 🚀 Deploy en Netlify

### Opción 1: Deploy desde Dashboard (Recomendado)

1. **Ir a Netlify**
   - Ve a [app.netlify.com](https://app.netlify.com)
   - Inicia sesión con GitHub

2. **Importar proyecto**
   - Click en **"Add new site"** → **"Import an existing project"**
   - Selecciona **GitHub** y autoriza Netlify
   - Busca y selecciona tu repositorio: **VD-**

3. **Configurar build**
   - Netlify detectará Next.js automáticamente
   - Verifica la configuración:
     - **Branch to deploy**: `main`
     - **Build command**: `npm run build`
     - **Publish directory**: `.next`

4. **Configurar variables de entorno**
   - Click en **"Show advanced"** → **"New variable"**
   - Agrega todas las variables de `.env.local`:
     - `GROQ_API_KEY`
     - `GEMINI_API_KEY`
     - `DATABASE_URL`
     - `NEXT_PUBLIC_APP_URL` (actualiza después del deploy con tu URL real)

5. **Deploy**
   - Click en **"Deploy site"**
   - Espera 2-5 minutos para completar
   - Obtendrás una URL tipo: `https://nombre-aleatorio.netlify.app`

### Opción 2: Deploy con CLI

```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

O usa el script incluido:

```powershell
# En PowerShell
.\deploy-netlify.ps1
```

### Configuración de Netlify

- **Framework**: Next.js 14 (detectado automáticamente)
- **Build Command**: `npm run build`
- **Publish Directory**: `.next`
- **Node Version**: 18 (configurado en `netlify.toml`)
- **Plugin**: `@netlify/plugin-nextjs` (instalado automáticamente)

### Notas Importantes

- El plugin `@netlify/plugin-nextjs` maneja automáticamente las API routes como serverless functions
- Netlify tiene un timeout de 10 segundos en el plan gratuito (26 segundos en Pro) para funciones serverless
- Las variables de entorno deben configurarse en el dashboard de Netlify antes del deploy
- Después del primer deploy, actualiza `NEXT_PUBLIC_APP_URL` con tu URL real de Netlify

Para más detalles, ver [`NETLIFY_DEPLOY.md`](./NETLIFY_DEPLOY.md)

## 📚 Recursos Educativos

La aplicación incluye:

- **12 Biografías de Poetas**: Calixto González, Alexis Díaz-Pimienta, Juan Antonio Díaz, y más
- **9 Secciones Educativas**: 
  - ¿Qué es una Décima?
  - Historia de la Décima Espinela
  - Estructura ABBAACCDDC
  - Sílabas Métricas
  - Rima Consonante vs Asonante
  - Décima en Cuba
  - Grandes Decimistas
  - Improvisación (Repentismo)
  - Recursos para Aprender

## 🐛 Troubleshooting

### Error: "Can't reach database server"
- Verifica que `DATABASE_URL` esté correcto en `.env.local`
- Asegúrate de que la base de datos esté accesible
- Si usas Neon/Supabase, verifica que el proyecto esté activo

### Error: "API key invalid"
- Verifica que las API keys estén correctas en `.env.local`
- Asegúrate de que no haya espacios extra
- Reinicia el servidor después de cambiar `.env.local`

### Error: "Video unavailable"
- El video puede ser privado, bloqueado por región, o age-restricted
- Prueba con otro video público de YouTube

### Error: "Transcription timeout"
- El video puede ser muy largo (>20 minutos)
- La app chunkeará automáticamente, pero puede tomar más tiempo

## 📝 Licencia

Este proyecto es privado y propiedad de Emilio José Novo.

## 👤 Autor

**Emilio José Novo**
- Desarrollador y arquitecto de la plataforma
- Preservando el patrimonio cultural cubano a través de la tecnología

## 🙏 Agradecimientos

- **Leonor Lopetegui** - Maestra y mentora
- **Juan Antonio Díaz** - Recursos en [juanantoniodiaz.com](https://juanantoniodiaz.com)
- **Calixto González** - "El Guajiro de Hialeah" - Inspiración del proyecto

---

**Viajera Digital** - Preservando la décima espinela cubana para las futuras generaciones.


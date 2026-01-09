# EL GUAJIRO DE HIALEAH - VIAJERA DIGITAL
## ESPECIFICACIÓN COMPLETA DE LA APLICACIÓN

---

## 🎯 DESCRIPCIÓN DEL PROYECTO

Aplicación Next.js 14 que transcribe videos de YouTube y formatea el contenido en décimas espinelas cubanas tradicionales (ABBAACCDDC), con análisis académico, biografías de poetas y recursos educativos.

---

## 🏗️ ARQUITECTURA TÉCNICA

### Stack Tecnológico
- **Framework**: Next.js 14 (App Router)
- **Lenguaje**: TypeScript (strict mode)
- **Estilos**: Tailwind CSS + shadcn/ui
- **Base de Datos**: PostgreSQL + Prisma ORM
- **APIs**:
  - Groq Whisper API (transcripción audio)
  - Google Gemini API (análisis y formato)
  - yt-dlp-exec (descarga audio YouTube)
- **Deployment**: Vercel

### Variables de Entorno (.env.local)
```env
# APIs
GROQ_API_KEY=tu_groq_key_aqui
GEMINI_API_KEY=tu_gemini_key_aqui

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/viajera_digital

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 📁 ESTRUCTURA DEL PROYECTO

```
VD FINAL/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   └── api/
│       ├── validate-youtube/route.ts
│       ├── process-video/route.ts
│       └── [videoId]/
│           ├── decimas/route.ts
│           ├── analysis/route.ts
│           └── export/
│               ├── text/route.ts
│               ├── pdf/route.ts
│               └── share/route.ts
├── components/
│   ├── header.tsx
│   ├── hero-section.tsx
│   ├── main-app.tsx
│   ├── navigation-tabs.tsx
│   ├── processing-section.tsx
│   ├── about-modal.tsx
│   ├── decimals-section.tsx
│   ├── analysis-section.tsx
│   ├── export-section.tsx
│   ├── education-section.tsx
│   ├── tribute-section.tsx
│   └── ui/
│       ├── button.tsx
│       ├── badge.tsx
│       ├── card.tsx
│       ├── dialog.tsx
│       ├── input.tsx
│       ├── textarea.tsx
│       ├── tabs.tsx
│       └── toast.tsx
├── lib/
│   ├── db.ts
│   ├── utils.ts
│   ├── syllable-counter.ts
│   ├── rhyme-validator.ts
│   └── perplexity-parser.ts
├── prisma/
│   └── schema.prisma
├── public/
│   ├── calixto-gonzalez-hero.jpg
│   ├── favicon.svg
│   └── og-image.png
├── .env.local
├── .env.example
├── .gitignore
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.ts
└── tsconfig.json
```

---

## 🎨 DISEÑO Y COLORES

### Paleta de Colores (Tema Vintage Cubano)
```css
/* Primarios */
--gold: #C8A05C;          /* Títulos hero, bordes */
--orange: #D97706;        /* Headers, headings */
--bright-orange: #EA580C; /* Badges, acentos */
--orange-brown: #D2691E;  /* Botones */

/* Neutros */
--dark-brown: #5C4033;    /* Texto principal */
--very-dark: #78350F;     /* Footer */
--cream: #F5E6D3;         /* Fondo */

/* Funcionales */
--red: #DC2626;           /* YouTube button */
--mint-green: #D1FAE5;    /* Info boxes */
```

### Tipografía
- **Headings**: font-serif (Georgia, serif)
- **Body**: font-sans (system-ui, sans-serif)

---

## 🗄️ SCHEMA DE BASE DE DATOS (Prisma)

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum ProcessingStatus {
  PENDING
  DOWNLOADING
  TRANSCRIBING
  ANALYZING
  COMPLETED
  FAILED
}

model Video {
  id              String           @id @default(cuid())
  youtubeId       String           @unique
  youtubeUrl      String
  title           String?
  duration        Int?             // segundos
  status          ProcessingStatus @default(PENDING)
  transcript      String?          @db.Text
  processedAt     DateTime?
  createdAt       DateTime         @default(now())
  updatedAt       DateTime         @updatedAt
  
  decimas         Decima[]
  analysis        Analysis?
  
  @@index([youtubeId])
  @@index([status])
}

model Poet {
  id              String    @id @default(cuid())
  name            String    @unique
  birthYear       Int?
  deathYear       Int?
  birthplace      String?
  biography       String?   @db.Text
  style           String?
  influences      String[]
  notableWorks    String[]
  imageUrl        String?
  
  decimas         Decima[]
  
  @@index([name])
}

model Decima {
  id              String    @id @default(cuid())
  videoId         String
  poetId          String?
  
  number          Int
  verses          String[]  // 10 versos exactos
  rhymeScheme     String    @default("ABBAACCDDC")
  syllableCount   Int[]     // conteo por verso
  theme           String?
  quality         Float?    // 0-10 score
  
  createdAt       DateTime  @default(now())
  
  video           Video     @relation(fields: [videoId], references: [id], onDelete: Cascade)
  poet            Poet?     @relation(fields: [poetId], references: [id])
  
  @@index([videoId])
  @@index([poetId])
}

model Analysis {
  id              String    @id @default(cuid())
  videoId         String    @unique
  
  totalDecimas    Int
  topFour         Json      // Top 4 décimas con justificación
  themes          String[]
  rhymeQuality    Float     // promedio
  culturalContext String?   @db.Text
  
  createdAt       DateTime  @default(now())
  
  video           Video     @relation(fields: [videoId], references: [id], onDelete: Cascade)
}
```

---

## 🔗 LINKS EXTERNOS EXACTOS

### Header Attribution
```tsx
"Por Emilio José Novo - Recursos: Juanantoniodiaz.com"

// Link a:
<a href="https://juanantoniodiaz.com/acerca-de/" 
   className="underline hover:text-[#D2691E] transition-colors"
   target="_blank" rel="noopener noreferrer">
  Juanantoniodiaz.com
</a>
```

### Modal "Acerca de" - Recursos Web
```tsx
<div>
  <p>Web: <strong>
    <a href="https://juanantoniodiaz.com/acerca-de/" 
       className="underline hover:text-[#D2691E]"
       target="_blank" rel="noopener noreferrer">
      Juanantoniodiaz.com
    </a>
  </strong></p>
  
  <p>Canal: <strong>
    <a href="https://youtube.com/@juanantoniodiaz9034"
       className="underline hover:text-[#D2691E]"
       target="_blank" rel="noopener noreferrer">
      @juanantoniodiaz9034
    </a>
  </strong></p>
</div>
```

---

## 🌴 MODAL "ACERCA DE" - SECCIÓN LEONOR LOPETEGUI

### Estructura con Botón Expandible (*)

```tsx
// Estado
const [showLeonorInfo, setShowLeonorInfo] = useState(false);

// Render
<div className="border-t-2 border-[#C8A05C] pt-4">
  <p className="font-medium text-[#D2691E] mb-2">
    Agradecimientos por la creación a:
  </p>
  
  <p>
    <strong>Leonor Lopetegui</strong>
    <button 
      onClick={() => setShowLeonorInfo(!showLeonorInfo)}
      className="ml-1 text-[#D2691E] hover:text-[#C8A05C] transition-colors font-bold text-lg"
      aria-label="Ver más información sobre Leonor Lopetegui"
    >
      *
    </button>
  </p>

  {showLeonorInfo && (
    <div className="mt-4 p-4 bg-[#F5E6D3] border-2 border-[#C8A05C] rounded-lg space-y-3 text-sm animate-in fade-in duration-300">
      <p>Leonor Lopetegui ha sido mi maestra de español, consejera y una abuela más que la vida me regaló desde mis cinco años de edad, cuando ella junto a su esposo, mi tío Armando González, me trajo de Cuba junto a mis padres. Al igual que a tantos otros de nuestra familia, nos ayudaron a comenzar una nueva vida en Miami, una experiencia que marcó profundamente mi formación y mi corazón.</p>

      <p>Con casi cincuenta años dedicados a la enseñanza del español, la Sra. Lopetegui no solo dominó el arte de enseñar con pasión y devoción en las Escuelas Públicas del Condado de Miami-Dade, sino que tocó innumerables vidas con su generosidad y amor incondicional. Su legado está marcado por reconocimientos extraordinarios como el Premio Cervantes de la Universidad Nova Southeastern por hacer una diferencia en la educación hispana, y por ser nombrada Maestra del Año en la Escuela Primaria James H. Bright durante el año escolar 2001-2002.</p>

      <p>También fue seleccionada Educadora Bilingüe del Año por la Asociación Bilingüe de la Florida, un testimonio de su liderazgo excepcional en la educación bilingüe. Durante más de diez años, lideró la División de Educación Bilingüe e Idiomas del Mundo para las Escuelas Públicas del Condado de Miami-Dade, dejando una huella imborrable en el perfeccionamiento del español entre niños y adultos. Ha escrito libros educativos para niños y ha compartido su sabiduría en importantes eventos educativos nacionales e internacionales, incluyendo la Asociación Nacional de Educación Bilingüe y la Asociación Bilingüe de la Florida.</p>

      <p>En reconocimiento a esta labor monumental, la Ciudad de Sweetwater proclamó el 6 de junio de 2014 como el "Día de la Sra. Leonor Lopetegui". Para mí y para tantos otros, ella representa mucho más que todos estos honores: es un ejemplo vivo de generosidad, sabiduría y amor que trasciende las aulas y perdura para siempre en nuestros corazones.</p>
    </div>
  )}
</div>
```

---

## ⚙️ API ROUTES

### 1. `/api/validate-youtube` (POST)
```typescript
// Valida URL de YouTube
Request: { youtubeUrl: string }
Response: { valid: boolean, videoId?: string, error?: string }
```

### 2. `/api/process-video` (POST)
```typescript
// Procesa video completo: download → transcribe → analyze
Request: { youtubeUrl: string, singerName?: string }
Response: { videoId: string, status: ProcessingStatus }
```

### 3. `/api/[videoId]/decimas` (GET)
```typescript
// Obtiene décimas formateadas
Response: { decimas: Decima[], total: number }
```

### 4. `/api/[videoId]/analysis` (GET)
```typescript
// Obtiene análisis académico
Response: Analysis
```

### 5. `/api/[videoId]/export/text` (GET)
```typescript
// Exporta como .txt
Response: text/plain file download
```

### 6. `/api/[videoId]/export/pdf` (GET)
```typescript
// Exporta como PDF con formato vintage
Response: application/pdf file download
```

### 7. `/api/[videoId]/share` (POST)
```typescript
// Genera link compartible
Response: { shareUrl: string, expiresAt: Date }
```

---

## 🎭 12 POETAS CUBANOS (Data Seed)

```typescript
const POETS = [
  {
    name: "Calixto González",
    birthYear: 1945,
    birthplace: "La Coloma, Pinar del Río",
    biography: "Calixto nació donde el cielo toca el agua—La Coloma, pueblo de pescadores...",
    style: "Improvisación, creación colectiva",
    influences: ["Tradición oral", "Exilio cubano"],
    notableWorks: ["Décimas de La Coloma", "Voces del exilio"]
  },
  {
    name: "Alexis Díaz-Pimienta",
    birthYear: 1966,
    birthplace: "La Habana, Cuba",
    biography: "Poeta, repentista y teórico de la décima espinela...",
    style: "Repentismo académico",
    influences: ["Naborí", "Indio Naborí"],
    notableWorks: ["Teoría de la improvisación", "El libro de la décima"]
  },
  // ... 10 poetas más con estructura similar
];
```

---

## 📚 9 SECCIONES EDUCATIVAS

1. **¿Qué es una Décima?**
2. **Historia de la Décima Espinela**
3. **Estructura: ABBAACCDDC**
4. **Sílabas Métricas (8 por verso)**
5. **Rima Consonante vs Asonante**
6. **Décima en Cuba**
7. **Grandes Decimistas**
8. **Improvisación (Repentismo)**
9. **Recursos para Aprender**

---

## 🚀 COMANDOS DE DESARROLLO

```bash
# Instalar dependencias
npm install

# Setup Prisma
npx prisma generate
npx prisma db push

# Desarrollo
npm run dev

# Build producción
npm run build

# Deploy Vercel
vercel --prod
```

---

## ✅ CHECKLIST DE FUNCIONALIDADES

### Procesamiento
- [x] Toggle YouTube/Texto Directo
- [x] Validación URL YouTube
- [x] Descarga audio (yt-dlp)
- [x] Transcripción (Groq Whisper)
- [x] Análisis (Google Gemini)
- [x] Formato décimas ABBAACCDDC

### UI/UX
- [x] Hero Section (Calixto González)
- [x] 7 Tabs de navegación
- [x] Modal "Acerca de" con Leonor expandible
- [x] Progress indicators
- [x] Responsive mobile-first
- [x] Links externos correctos

### Exportación
- [x] Descarga .txt
- [x] Descarga .pdf vintage
- [x] Share link

### Base de Datos
- [x] Prisma schema completo
- [x] Relaciones Video/Poet/Decima/Analysis
- [x] Seed data (12 poetas)

---

## 🎯 CRITERIOS DE ÉXITO

La app está completa cuando:
- ✅ `npm run dev` funciona sin errores
- ✅ Hero section muestra tributo a Calixto
- ✅ Todas las 7 tabs funcionan
- ✅ Modal "Acerca de" abre con historia completa
- ✅ Botón * expande sección Leonor Lopetegui
- ✅ Links externos abren URLs correctas
- ✅ Validación YouTube funciona
- ✅ Toggle Texto Directo cambia interfaz
- ✅ Colores vintage cubano aplicados
- ✅ Responsive en móvil

---

**FIN DE ESPECIFICACIÓN**

import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

export const runtime = 'nodejs'
export const maxDuration = 120

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || ''
const MAX_INPUT_LENGTH = 100000 // Characters
const MAX_TOKENS = 8192

interface AnalyzeRequest {
  transcript: string
  singerName?: string
  youtubeUrl?: string
}

interface AnalyzeResponse {
  decimas: string
  analysis: string
  youtubeUrl?: string
}

// Split long transcripts into manageable chunks
function splitTranscript(transcript: string, maxLength: number): string[] {
  if (transcript.length <= maxLength) {
    return [transcript]
  }

  const chunks: string[] = []
  let currentChunk = ''

  // Split by sentences (periods, exclamation, question marks)
  const sentences = transcript.split(/([.!?]\s+)/)

  for (let i = 0; i < sentences.length; i++) {
    const sentence = sentences[i]
    
    if (currentChunk.length + sentence.length > maxLength && currentChunk.length > 0) {
      chunks.push(currentChunk.trim())
      currentChunk = sentence
    } else {
      currentChunk += sentence
    }
  }

  if (currentChunk.trim().length > 0) {
    chunks.push(currentChunk.trim())
  }

  return chunks
}

// Retry function with exponential backoff
async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 2000
): Promise<T> {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn()
    } catch (error: any) {
      const errorMessage = error.message || String(error)
      
      // Don't retry on non-rate limit errors
      if (!errorMessage.includes('rate limit') && 
          !errorMessage.includes('429') && 
          !errorMessage.includes('quota exceeded') &&
          !errorMessage.includes('Resource has been exhausted')) {
        throw error
      }
      
      // If this was the last attempt, throw the error
      if (attempt === maxRetries) {
        throw error
      }
      
      // Calculate exponential backoff delay
      const delay = baseDelay * Math.pow(2, attempt)
      console.log(`Rate limit hit. Retrying in ${delay/1000}s... (Attempt ${attempt + 1}/${maxRetries + 1})`)
      
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, delay))
    }
  }
  
  throw new Error('Max retries exceeded')
}

export async function POST(request: NextRequest) {
  try {
    const body: AnalyzeRequest = await request.json()
    const { transcript, singerName, youtubeUrl } = body

    // Validate request
    if (!transcript || typeof transcript !== 'string') {
      return NextResponse.json(
        { error: 'Transcript is required' },
        { status: 400 }
      )
    }

    if (transcript.trim().length === 0) {
      return NextResponse.json(
        { error: 'Transcript cannot be empty' },
        { status: 400 }
      )
    }

    // Initialize Gemini client
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY)
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.0-flash-exp',
    })

    try {
      // Prepare the enhanced prompt for décima transcription
      const prompt = `Transcribir TODA esta grabación de décimas improvisadas (controversias, polémicas, eventos de repentismo) al formato de décima espinela escrita, respetando rigurosamente la estructura métrica y esquema de rima.

**ESTRUCTURA OBLIGATORIA**:
- **Esquema de rima**: A B B A A C C D D C (rima consonante)
- **Métrica**: Versos octosílabos (8 sílabas por verso)
- **Formato**: Cada décima debe tener exactamente 10 versos

**INSTRUCCIONES ESPECÍFICAS**:

1. **Identificación de poetas**:
   - ${singerName ? `Cuando el usuario especifica "${singerName} primero", organiza las décimas en ese orden exacto.` : 'Identifica los poetas por cambios de voz/estilo.'}
   - Incluye encabezados claros: **[Nombre del Poeta]**
   - Numera consecutivamente todas las décimas del evento

2. **Proceso de transcripción**:
   - Escucha/lee la transcripción del audio/video proporcionado
   - Identifica dónde comienza y termina cada décima
   - Convierte el discurso oral en versos escritos de 8 sílabas
   - Asegura que el esquema de rima sea A B B A A C C D D C con rima consonante
   - Corrige errores menores de pronunciación pero mantén la esencia del poeta

3. **Verificación de calidad**:
   - Cuenta las sílabas de cada verso (debe ser 8)
   - Verifica el esquema de rima consonante
   - Asegura coherencia temática dentro de cada décima
   - Mantén el vocabulario y estilo del poeta original

4. **Formato de presentación**:
   **[1. Poeta X]**
   
   Verso 1 (A) [8 sílabas]
   Verso 2 (B) [8 sílabas]
   Verso 3 (B) [8 sílabas]
   Verso 4 (A) [8 sílabas]
   Verso 5 (A) [8 sílabas]
   Verso 6 (C) [8 sílabas]
   Verso 7 (C) [8 sílabas]
   Verso 8 (D) [8 sílabas]
   Verso 9 (D) [8 sílabas]
   Verso 10 (C) [8 sílabas]
   
   ---

5. **Manejo de contenido extenso**:
   - Si el material es largo (1+ hora), organiza por secciones temáticas
   - Mantén numeración continua
   - Incluye separadores visuales entre poetas

6. **Casos especiales**:
   - Si un verso no alcanza 8 sílabas naturalmente, ajusta con sinéresis/diéresis poética
   - Si la rima oral no es perfecta, busca la palabra consonante más cercana que mantenga el sentido
   - Documenta cualquier ajuste significativo en nota al pie

**IDIOMA**: Trabaja exclusivamente en español, respetando regionalismos cubanos y vocabulario del campo.

**PRIORIDAD**: Precisión métrica > Rima exacta > Sentido literal

**OUTPUT ESPERADO**: Transcripción completa, ordenada por poeta según instrucción del usuario, con todas las décimas en formato Espinela verificado, lista para publicación o archivo.

Transcripción a analizar:
${transcript}

**FORMATO DE RESPUESTA**:

=== DÉCIMAS IDENTIFICADAS ===

**[1. Poeta: Nombre]**

Verso 1 (A)
Verso 2 (B)
Verso 3 (B)
Verso 4 (A)
Verso 5 (A)
Verso 6 (C)
Verso 7 (C)
Verso 8 (D)
Verso 9 (D)
Verso 10 (C)

---

**[2. Poeta: Nombre]**

[... continuar para TODAS las décimas del evento ...]

---

=== 📊 RESUMEN FINAL ===

- **Total décimas**: [N]
- **Tema principal**: [tema]

=== 🏆 TOP 2 MEJORES DE CADA POETA ===

**POETA 1: [Nombre]**

**Décima #[N]** - [Tema]
[Décima completa en formato espinela - 10 versos]

**Análisis poético**: [Análisis de calidad de rima, significado, importancia cultural. NO contar sílabas ni análisis de métricas.]

---

**Décima #[N]** - [Tema]
[Décima completa en formato espinela - 10 versos]

**Análisis poético**: [Análisis de calidad de rima, significado, importancia cultural. NO contar sílabas ni análisis de métricas.]

---

**POETA 2: [Nombre]**

[Repetir formato TOP 2 para cada poeta adicional identificado...]`

      // Handle long transcripts by splitting if needed
      let fullResponse = ''
      
      if (transcript.length > MAX_INPUT_LENGTH) {
        // Split transcript and process in chunks
        const chunks = splitTranscript(transcript, MAX_INPUT_LENGTH)
        console.log(`Processing transcript in ${chunks.length} chunks`)

        const chunkResponses: string[] = []

        for (let i = 0; i < chunks.length; i++) {
          const chunkPrompt = `Transcribe esta porción de décimas improvisadas al formato espinela escrita.

**ESTRUCTURA**: Esquema A B B A A C C D D C, 8 sílabas/verso, 10 versos por décima.
${singerName ? `El poeta que comienza es: ${singerName}.` : ''}
Numera desde ${i * 10 + 1}. Identifica poetas por turnos.

Porción de transcripción:
${chunks[i]}

Formato:
=== DÉCIMAS (Parte ${i + 1}) ===

**[${i * 10 + 1}. Poeta: Nombre]**
[10 versos formato espinela]

---`

          const chunkResult = await retryWithBackoff(async () => {
            return await model.generateContent({
              contents: [{ role: 'user', parts: [{ text: chunkPrompt }] }],
              generationConfig: {
                maxOutputTokens: MAX_TOKENS,
                temperature: 0.7,
              },
            })
          })

          const chunkText = chunkResult.response.text()
          chunkResponses.push(chunkText)

          // Small delay between chunks
          if (i < chunks.length - 1) {
            await new Promise(resolve => setTimeout(resolve, 1000))
          }
        }

        // Combine all chunk responses
        fullResponse = chunkResponses.join('\n\n---\n\n')

        // Generate final analysis with TOP 2 per poet
        const analysisPrompt = `Basado en estas décimas transcritas, genera el resumen final:

${fullResponse}

=== 📊 RESUMEN FINAL ===
- **Total décimas**: [cuenta todas las décimas]
- **Tema principal**: [tema central de la canturía]

=== 🏆 TOP 2 MEJORES DE CADA POETA ===

Para cada poeta identificado en la transcripción:
1. Selecciona sus 2 mejores décimas
2. Incluye la décima completa (10 versos en formato espinela)
3. Añade análisis poético: calidad de rima, significado, importancia cultural
4. NO contar sílabas ni análisis de métricas

Formato:
**POETA: [Nombre]**

**Décima #[N]** - [Tema]
[10 versos completos]

**Análisis poético**: [análisis sin contar sílabas]

---

[Repetir para cada poeta]`

        const analysisResult = await retryWithBackoff(async () => {
          return await model.generateContent({
            contents: [{ role: 'user', parts: [{ text: analysisPrompt }] }],
            generationConfig: {
              maxOutputTokens: 4096,
              temperature: 0.7,
            },
          })
        })

        fullResponse += '\n\n' + analysisResult.response.text()
      } else {
        // Process single transcript
        const result = await retryWithBackoff(async () => {
          return await model.generateContent({
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            generationConfig: {
              maxOutputTokens: MAX_TOKENS,
              temperature: 0.7,
            },
          })
        })

        fullResponse = result.response.text()
      }

      // Split response into décimas and analysis (supports both old and new format)
      const analysisMatch = fullResponse.match(/=== 📊 RESUMEN FINAL ===\s*(.+)/s) || 
                           fullResponse.match(/=== ANÁLISIS TOP 4 MEJORES DÉCIMAS ===\s*(.+)/s) ||
                           fullResponse.match(/=== 🏆 TOP 2 MEJORES DE CADA POETA ===\s*(.+)/s)
      const analysis = analysisMatch ? analysisMatch[0].trim() : 'Análisis no encontrado en la respuesta'
      
      const decimasMatch = fullResponse.match(/(.+?)(?:=== 📊 RESUMEN FINAL ===|=== ANÁLISIS TOP 4 MEJORES DÉCIMAS ===|=== 🏆 TOP 2 MEJORES|$)/s)
      const decimas = decimasMatch ? decimasMatch[1].trim() : fullResponse

      const response: AnalyzeResponse = {
        decimas,
        analysis,
        youtubeUrl,
      }

      return NextResponse.json(response, {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      })
    } catch (error: any) {
      const errorMessage = error.message || String(error)
      console.error('Gemini API error:', errorMessage)

      if (errorMessage.includes('API key') || errorMessage.includes('401')) {
        return NextResponse.json(
          { error: 'Invalid API key or authentication failed' },
          { status: 401 }
        )
      }

      if (errorMessage.includes('rate limit') || errorMessage.includes('429')) {
        return NextResponse.json(
          { error: 'API rate limit exceeded. Please try again in a few moments.' },
          { status: 429 }
        )
      }

      if (errorMessage.includes('quota') || errorMessage.includes('quota exceeded')) {
        return NextResponse.json(
          { error: 'API quota exceeded. Please check your usage limits.' },
          { status: 429 }
        )
      }

      if (errorMessage.includes('safety') || errorMessage.includes('blocked')) {
        return NextResponse.json(
          { error: 'Content was blocked by safety filters. Please try a different transcript.' },
          { status: 400 }
        )
      }

      return NextResponse.json(
        { error: `Analysis failed: ${errorMessage}` },
        { status: 500 }
      )
    }
  } catch (error: any) {
    console.error('Request processing error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}


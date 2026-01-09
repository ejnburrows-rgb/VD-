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
}

interface AnalyzeResponse {
  decimas: string
  analysis: string
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

export async function POST(request: NextRequest) {
  try {
    const body: AnalyzeRequest = await request.json()
    const { transcript, singerName } = body

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
      // Prepare the prompt - EXACT prompt as specified
      const prompt = `Analiza esta transcripción de décimas espinela cubana. Identifica todas las décimas ABBAACCDDC (8 sílabas/verso). Para cada una: número, poeta, texto, análisis. TOP 4 mejores con explicación.

Requisitos específicos:
- Esquema de rima ABBAACCDDC estricto
- Exactamente 8 sílabas por verso
- Agrupar en estrofas de 10 versos cada una
- Identificar el nombre del poeta antes de cada décima
- Numerar cada décima secuencialmente
- Seleccionar las TOP 4 mejores décimas y proporcionar análisis breve explicando por qué son las mejores (calidad de rima, significado, importancia cultural)
- Preservar el significado y flujo original
${singerName ? `\nNota: El cantante que comienza la canturía es: ${singerName}. Úsalo como referencia para identificar poetas.` : ''}

Transcripción:
${transcript}

Formato de respuesta:

=== DÉCIMAS IDENTIFICADAS ===

Décima 1
Poeta: [Nombre del poeta]
[10 versos con esquema ABBAACCDDC, 8 sílabas cada uno]

Décima 2
Poeta: [Nombre del poeta]
[10 versos con esquema ABBAACCDDC, 8 sílabas cada uno]

[... continuar para todas las décimas ...]

=== ANÁLISIS TOP 4 MEJORES DÉCIMAS ===

1. Décima [Número] - [Explicación detallada: calidad de rima, significado, importancia cultural]
2. Décima [Número] - [Explicación detallada: calidad de rima, significado, importancia cultural]
3. Décima [Número] - [Explicación detallada: calidad de rima, significado, importancia cultural]
4. Décima [Número] - [Explicación detallada: calidad de rima, significado, importancia cultural]`

      // Handle long transcripts by splitting if needed
      let fullResponse = ''
      
      if (transcript.length > MAX_INPUT_LENGTH) {
        // Split transcript and process in chunks
        const chunks = splitTranscript(transcript, MAX_INPUT_LENGTH)
        console.log(`Processing transcript in ${chunks.length} chunks`)

        const chunkResponses: string[] = []

        for (let i = 0; i < chunks.length; i++) {
          const chunkPrompt = `Analiza esta porción de transcripción de décimas espinela cubana. Identifica todas las décimas ABBAACCDDC (8 sílabas/verso). Para cada una: número, poeta, texto.

Requisitos:
- Esquema de rima ABBAACCDDC estricto
- Exactamente 8 sílabas por verso
- Agrupar en estrofas de 10 versos cada una
- Identificar el nombre del poeta antes de cada décima
- Numerar cada décima secuencialmente empezando desde ${i * 10 + 1}
- Preservar el significado y flujo original
${singerName ? `\nNota: El cantante que comienza la canturía es: ${singerName}. Úsalo como referencia para identificar poetas.` : ''}

Porción de transcripción:
${chunks[i]}

Formato de respuesta:

=== DÉCIMAS (Parte ${i + 1}) ===

Décima ${i * 10 + 1}
Poeta: [Nombre]
[10 versos con esquema ABBAACCDDC, 8 sílabas cada uno]

[... continuar ...]`

          const chunkResult = await model.generateContent({
            contents: [{ role: 'user', parts: [{ text: chunkPrompt }] }],
            generationConfig: {
              maxOutputTokens: MAX_TOKENS,
              temperature: 0.7,
            },
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

        // Generate final analysis of top 4 décimas
        const analysisPrompt = `Basado en estas décimas, selecciona las TOP 4 mejores y proporciona análisis detallado:

${fullResponse}

=== ANÁLISIS TOP 4 MEJORES DÉCIMAS ===

Proporciona análisis para las top 4 décimas explicando calidad de rima, significado e importancia cultural.`

        const analysisResult = await model.generateContent({
          contents: [{ role: 'user', parts: [{ text: analysisPrompt }] }],
          generationConfig: {
            maxOutputTokens: 2048,
            temperature: 0.7,
          },
        })

        fullResponse += '\n\n' + analysisResult.response.text()
      } else {
        // Process single transcript
        const result = await model.generateContent({
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          generationConfig: {
            maxOutputTokens: MAX_TOKENS,
            temperature: 0.7,
          },
        })

        fullResponse = result.response.text()
      }

      // Split response into décimas and analysis
      const analysisMatch = fullResponse.match(/=== ANÁLISIS TOP 4 MEJORES DÉCIMAS ===\s*(.+)/s) || 
                           fullResponse.match(/=== TOP 4 DÉCIMAS ANALYSIS ===\s*(.+)/s)
      const analysis = analysisMatch ? analysisMatch[1].trim() : 'Análisis no encontrado en la respuesta'
      
      const decimasMatch = fullResponse.match(/(.+?)(?:=== ANÁLISIS TOP 4 MEJORES DÉCIMAS ===|=== TOP 4 DÉCIMAS ANALYSIS ===|$)/s)
      const decimas = decimasMatch ? decimasMatch[1].trim() : fullResponse

      const response: AnalyzeResponse = {
        decimas,
        analysis,
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


import { NextRequest, NextResponse } from 'next/server'
import Groq from 'groq-sdk'
import ytdl from '@distube/ytdl-core'

export const runtime = 'nodejs'
export const maxDuration = 600 // 10 minutes max for Pro plan

const GROQ_API_KEY = process.env.GROQ_API_KEY || ''
const MAX_VIDEO_DURATION_SECONDS = 6300 // 105 minutes (1h 45min)
const CHUNK_SIZE_MB = 20 // Groq limit is 25MB, use 20 for safety

interface TranscribeRequest {
  youtubeUrl: string
}

interface TranscribeResponse {
  text: string
  segmentCount: number
  duration?: number
  title?: string
}

// Validate YouTube URL
function isValidYouTubeUrl(url: string): boolean {
  const patterns = [
    /^https?:\/\/(www\.)?youtube\.com\/watch\?v=[\w-]+/,
    /^https?:\/\/youtu\.be\/[\w-]+/,
  ]
  return patterns.some(pattern => pattern.test(url))
}

// Stream to buffer with timeout
async function streamToBuffer(
  stream: NodeJS.ReadableStream,
  timeoutMs: number = 45000
): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = []
    const timeout = setTimeout(() => {
      stream.removeAllListeners()
      reject(new Error('Download timeout'))
    }, timeoutMs)

    stream.on('data', (chunk: Buffer) => chunks.push(chunk))
    stream.on('end', () => {
      clearTimeout(timeout)
      resolve(Buffer.concat(chunks))
    })
    stream.on('error', (err) => {
      clearTimeout(timeout)
      reject(err)
    })
  })
}

// Transcribe audio buffer with Groq
async function transcribeWithGroq(
  groq: Groq,
  audioBuffer: Buffer,
  filename: string
): Promise<string> {
  // Convert Buffer to ArrayBuffer for File constructor
  const arrayBuffer = audioBuffer.buffer.slice(
    audioBuffer.byteOffset,
    audioBuffer.byteOffset + audioBuffer.byteLength
  ) as ArrayBuffer

  const audioFile = new File([arrayBuffer], filename, {
    type: 'audio/m4a',
  })

  console.log('[Transcribe] Sending to Groq, size:', audioBuffer.length, 'bytes')

  const transcription = await groq.audio.transcriptions.create({
    file: audioFile as any,
    model: 'whisper-large-v3',
    language: 'es',
    response_format: 'text',
  })

  if (typeof transcription === 'string') {
    return transcription
  } else if (transcription && typeof transcription === 'object' && 'text' in transcription) {
    return (transcription as any).text
  }
  return String(transcription)
}

export async function POST(request: NextRequest) {
  console.log('[Transcribe API] Request received')
  
  try {
    // Validate API key
    if (!GROQ_API_KEY) {
      console.error('[Transcribe API] GROQ_API_KEY not configured')
      return NextResponse.json(
        { error: 'Servicio de transcripción no configurado. Contacta al administrador.' },
        { status: 503 }
      )
    }

    const body: TranscribeRequest = await request.json()
    const { youtubeUrl } = body

    console.log('[Transcribe API] URL:', youtubeUrl)

    // Validate request
    if (!youtubeUrl || typeof youtubeUrl !== 'string') {
      return NextResponse.json(
        { error: 'URL de YouTube requerida' },
        { status: 400 }
      )
    }

    if (!isValidYouTubeUrl(youtubeUrl)) {
      return NextResponse.json(
        { error: 'URL de YouTube inválida' },
        { status: 400 }
      )
    }

    try {
      // Step 1: Get video info
      console.log('[Transcribe API] Getting video info...')
      const info = await ytdl.getInfo(youtubeUrl, {
        requestOptions: {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          },
        },
      })

      const durationSeconds = parseInt(info.videoDetails.lengthSeconds) || 0
      const title = info.videoDetails.title

      console.log('[Transcribe API] Video:', title, '- Duration:', durationSeconds, 's')

      // Check duration limit
      if (durationSeconds > MAX_VIDEO_DURATION_SECONDS) {
        const maxMinutes = Math.floor(MAX_VIDEO_DURATION_SECONDS / 60)
        const videoMinutes = Math.floor(durationSeconds / 60)
        return NextResponse.json(
          { 
            error: `Video demasiado largo (${videoMinutes} min). Máximo: ${maxMinutes} min para evitar timeouts.` 
          },
          { status: 400 }
        )
      }

      // Step 2: Find audio format
      const audioFormats = ytdl.filterFormats(info.formats, 'audioonly')
      if (audioFormats.length === 0) {
        return NextResponse.json(
          { error: 'No hay formato de audio disponible' },
          { status: 400 }
        )
      }

      const audioFormat = audioFormats.find(f => f.container === 'mp4' || f.container === 'webm') || audioFormats[0]
      console.log('[Transcribe API] Audio format:', audioFormat.container)

      // Step 3: Download audio
      console.log('[Transcribe API] Downloading audio...')
      const audioStream = ytdl(youtubeUrl, {
        format: audioFormat,
        requestOptions: {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          },
        },
      })

      const audioBuffer = await streamToBuffer(audioStream, 50000)
      console.log('[Transcribe API] Downloaded:', audioBuffer.length, 'bytes')

      if (audioBuffer.length === 0) {
        return NextResponse.json(
          { error: 'No se pudo descargar el audio' },
          { status: 500 }
        )
      }

      // Step 4: Transcribe with Groq
      console.log('[Transcribe API] Transcribing with Groq Whisper...')
      const groq = new Groq({ apiKey: GROQ_API_KEY })

      // Check if we need to chunk (>25MB)
      const maxBytes = CHUNK_SIZE_MB * 1024 * 1024
      let fullText = ''
      let segmentCount = 1

      if (audioBuffer.length > maxBytes) {
        // Split into chunks
        const numChunks = Math.ceil(audioBuffer.length / maxBytes)
        console.log('[Transcribe API] Splitting into', numChunks, 'chunks')
        
        const transcriptions: string[] = []
        for (let i = 0; i < numChunks; i++) {
          const start = i * maxBytes
          const end = Math.min(start + maxBytes, audioBuffer.length)
          const chunk = audioBuffer.slice(start, end)
          
          console.log(`[Transcribe API] Processing chunk ${i + 1}/${numChunks}`)
          const chunkText = await transcribeWithGroq(groq, chunk, `audio-${i}.m4a`)
          transcriptions.push(chunkText.trim())
          
          // Delay between chunks to avoid rate limits
          if (i < numChunks - 1) {
            await new Promise(r => setTimeout(r, 1000))
          }
        }
        
        fullText = transcriptions.join('\n\n')
        segmentCount = numChunks
      } else {
        fullText = await transcribeWithGroq(groq, audioBuffer, 'audio.m4a')
      }

      console.log('[Transcribe API] Transcription complete, length:', fullText.length)

      if (!fullText || fullText.trim().length === 0) {
        return NextResponse.json(
          { error: 'No se generó texto de transcripción' },
          { status: 500 }
        )
      }

      const response: TranscribeResponse = {
        text: fullText.trim(),
        segmentCount,
        duration: durationSeconds,
        title,
      }

      return NextResponse.json(response)

    } catch (error: any) {
      const errorMessage = error.message || String(error)
      console.error('[Transcribe API] Error:', errorMessage)

      // Handle specific errors
      if (errorMessage.includes('rate limit') || errorMessage.includes('429')) {
        return NextResponse.json(
          { error: 'Límite de API excedido. Espera unos minutos e intenta de nuevo.' },
          { status: 429 }
        )
      }

      if (errorMessage.includes('timeout')) {
        return NextResponse.json(
          { error: 'Tiempo agotado. El video puede ser muy largo.' },
          { status: 408 }
        )
      }

      if (errorMessage.includes('403') || errorMessage.includes('cipher')) {
        return NextResponse.json(
          { 
            error: 'YouTube ha bloqueado la descarga temporalmente. Esto es común cuando YouTube actualiza sus protecciones. Por favor, usa la opción "Texto Directo" para copiar y pegar la transcripción manualmente, o intenta con el video más tarde.' 
          },
          { status: 503 }
        )
      }

      if (errorMessage.includes('private')) {
        return NextResponse.json(
          { 
            error: 'El video es privado y no puede ser accedido. Por favor, usa un video público o la opción "Texto Directo" para ingresar la transcripción manualmente.' 
          },
          { status: 403 }
        )
      }

      if (errorMessage.includes('unavailable') || errorMessage.includes('not found')) {
        return NextResponse.json(
          { 
            error: 'El video no está disponible o ha sido eliminado. Por favor, verifica el enlace o usa la opción "Texto Directo" para ingresar la transcripción manualmente.' 
          },
          { status: 404 }
        )
      }

      if (errorMessage.includes('This video is unavailable') || 
          errorMessage.includes('Video unavailable') ||
          errorMessage.includes('Playback on other websites has been disabled')) {
        return NextResponse.json(
          { 
            error: 'El video tiene restricciones de reproducción. YouTube no permite descargar este audio. Por favor, usa la opción "Texto Directo" para copiar y pegar la transcripción, o intenta con un video sin restricciones.' 
          },
          { status: 403 }
        )
      }

      if (errorMessage.includes('Sign in to confirm you\'re not a bot')) {
        return NextResponse.json(
          { 
            error: 'YouTube requiere verificación humana. La descarga ha sido bloqueada. Por favor, usa la opción "Texto Directo" para ingresar la transcripción manualmente.' 
          },
          { status: 403 }
        )
      }

      return NextResponse.json(
        { error: `Error de transcripción: ${errorMessage}` },
        { status: 500 }
      )
    }
  } catch (error: any) {
    console.error('[Transcribe API] Request error:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
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

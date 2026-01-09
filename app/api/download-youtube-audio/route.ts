import { NextRequest, NextResponse } from 'next/server'
import ytdl from '@distube/ytdl-core'

export const runtime = 'nodejs'
export const maxDuration = 60 // Vercel hobby plan limit

// Maximum video duration in seconds (20 minutes to stay within Vercel limits)
const MAX_VIDEO_DURATION_SECONDS = 1200

interface DownloadRequest {
  youtubeUrl: string
}

interface DownloadResponse {
  audioBase64: string
  durationSeconds: number
  title?: string
}

// Validate YouTube URL format
function isValidYouTubeUrl(url: string): boolean {
  const patterns = [
    /^https?:\/\/(www\.)?youtube\.com\/watch\?v=[\w-]+/,
    /^https?:\/\/youtu\.be\/[\w-]+/,
    /^https?:\/\/(www\.)?youtube\.com\/embed\/[\w-]+/,
  ]
  return patterns.some(pattern => pattern.test(url))
}

// Extract video ID from URL
function extractVideoId(url: string): string | null {
  const patterns = [
    /[?&]v=([\w-]+)/,
    /youtu\.be\/([\w-]+)/,
    /embed\/([\w-]+)/,
  ]
  
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) return match[1]
  }
  return null
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
      reject(new Error('Download timeout - video may be too long'))
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

export async function POST(request: NextRequest) {
  console.log('[Download API] Request received')
  
  try {
    const body: DownloadRequest = await request.json()
    const { youtubeUrl } = body

    console.log('[Download API] URL:', youtubeUrl)

    // Validate request
    if (!youtubeUrl || typeof youtubeUrl !== 'string') {
      return NextResponse.json(
        { error: 'URL de YouTube requerida' },
        { status: 400 }
      )
    }

    // Validate URL format
    if (!isValidYouTubeUrl(youtubeUrl)) {
      return NextResponse.json(
        { error: 'Formato de URL inválido. Debe ser youtube.com/watch?v= o youtu.be/' },
        { status: 400 }
      )
    }

    const videoId = extractVideoId(youtubeUrl)
    if (!videoId) {
      return NextResponse.json(
        { error: 'No se pudo extraer el ID del video' },
        { status: 400 }
      )
    }

    console.log('[Download API] Video ID:', videoId)

    try {
      // Get video info first
      console.log('[Download API] Getting video info...')
      const info = await ytdl.getInfo(youtubeUrl, {
        requestOptions: {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          },
        },
      })
      
      const durationSeconds = parseInt(info.videoDetails.lengthSeconds) || 0
      const title = info.videoDetails.title
      
      console.log('[Download API] Duration:', durationSeconds, 'seconds, Title:', title)

      // Check duration limit
      if (durationSeconds > MAX_VIDEO_DURATION_SECONDS) {
        const maxMinutes = Math.floor(MAX_VIDEO_DURATION_SECONDS / 60)
        const videoMinutes = Math.floor(durationSeconds / 60)
        return NextResponse.json(
          { 
            error: `Video demasiado largo (${videoMinutes} minutos). Máximo permitido: ${maxMinutes} minutos. Por favor, usa un video más corto.` 
          },
          { status: 400 }
        )
      }

      // Find audio format
      const audioFormats = ytdl.filterFormats(info.formats, 'audioonly')
      if (audioFormats.length === 0) {
        return NextResponse.json(
          { error: 'No hay formato de audio disponible para este video' },
          { status: 400 }
        )
      }

      // Choose best audio format (prefer mp4/webm for compatibility)
      const audioFormat = audioFormats.find(f => f.container === 'mp4' || f.container === 'webm') 
        || audioFormats[0]
      
      console.log('[Download API] Audio format:', audioFormat.container, audioFormat.audioQuality)

      // Download audio
      console.log('[Download API] Downloading audio...')
      const audioStream = ytdl(youtubeUrl, {
        format: audioFormat,
        requestOptions: {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          },
        },
      })

      // Convert stream to buffer
      const audioBuffer = await streamToBuffer(audioStream)
      console.log('[Download API] Downloaded:', audioBuffer.length, 'bytes')

      if (audioBuffer.length === 0) {
        return NextResponse.json(
          { error: 'No se pudo descargar el audio del video' },
          { status: 500 }
        )
      }

      // Convert to base64
      const audioBase64 = audioBuffer.toString('base64')

      const response: DownloadResponse = {
        audioBase64,
        durationSeconds,
        title,
      }

      console.log('[Download API] Success!')
      return NextResponse.json(response)
      
    } catch (error: any) {
      const errorMessage = error.message || String(error)
      console.error('[Download API] Error:', errorMessage)
      
      // Handle specific YouTube errors
      if (errorMessage.includes('Private video') || errorMessage.includes('private')) {
        return NextResponse.json(
          { error: 'Este video es privado y no se puede acceder' },
          { status: 403 }
        )
      }

      if (errorMessage.includes('Sign in') || errorMessage.includes('age')) {
        return NextResponse.json(
          { error: 'Este video requiere iniciar sesión o es restringido por edad' },
          { status: 403 }
        )
      }

      if (errorMessage.includes('not available') || errorMessage.includes('unavailable')) {
        return NextResponse.json(
          { error: 'Este video no está disponible' },
          { status: 404 }
        )
      }

      if (errorMessage.includes('timeout')) {
        return NextResponse.json(
          { error: 'Tiempo de espera agotado. El video puede ser muy largo.' },
          { status: 408 }
        )
      }

      // Generic error with details
      if (errorMessage.includes('Status code: 403') || errorMessage.includes('cipher')) {
        return NextResponse.json(
          { error: 'YouTube bloqueó la descarga. Intenta con otro video o más tarde.' },
          { status: 503 }
        )
      }

      return NextResponse.json(
        { error: `Error al descargar: ${errorMessage}` },
        { status: 500 }
      )
    }
  } catch (error: any) {
    console.error('[Download API] Request error:', error)
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

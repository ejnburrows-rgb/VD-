import { NextRequest, NextResponse } from 'next/server'
import Groq from 'groq-sdk'

export const runtime = 'nodejs'
export const maxDuration = 300

const GROQ_API_KEY = process.env.GROQ_API_KEY || ''
const FIREBASE_FUNCTION_URL = process.env.FIREBASE_FUNCTION_URL || ''
const ZYLA_API_KEY = process.env.ZYLA_API_KEY || ''
const MAX_VIDEO_DURATION_SECONDS = 6300

interface TranscribeRequest {
  youtubeUrl: string
}

interface TranscribeResponse {
  text: string
  segmentCount: number
  duration?: number
  title?: string
}

function isValidYouTubeUrl(url: string): boolean {
  const patterns = [
    /^https?:\/\/(www\.)?youtube\.com\/watch\?v=[\w-]+/,
    /^https?:\/\/youtu\.be\/[\w-]+/,
  ]
  return patterns.some(pattern => pattern.test(url))
}

export async function POST(request: NextRequest) {
  console.log('[Transcribe API] Request received')
  
  try {
    if (!GROQ_API_KEY) {
      return NextResponse.json({ error: 'GROQ API key not configured.' }, { status: 503 })
    }

    const body: TranscribeRequest = await request.json()
    const { youtubeUrl } = body

    console.log('[Transcribe API] URL:', youtubeUrl)

    if (!youtubeUrl || typeof youtubeUrl !== 'string') {
      return NextResponse.json({ error: 'URL de YouTube requerida' }, { status: 400 })
    }

    if (!isValidYouTubeUrl(youtubeUrl)) {
      return NextResponse.json({ error: 'URL de YouTube invalida' }, { status: 400 })
    }

    try {
      let audioUrl: string
      let duration: number
      let title: string

      // Try Zyla API first (most reliable)
      if (ZYLA_API_KEY) {
        console.log('[Transcribe API] Calling Zyla API...')
        const zylaResponse = await fetch(
          `https://zylalabs.com/api/2661/youtube+to+audio+api/3858/convert?url=${encodeURIComponent(youtubeUrl)}`,
          {
            headers: { 
              'Authorization': `Bearer ${ZYLA_API_KEY}` 
            }
          }
        )

        if (!zylaResponse.ok) {
          throw new Error('Zyla API failed: ' + zylaResponse.status)
        }

        const zylaData = await zylaResponse.json()
        audioUrl = zylaData.download_url
        title = zylaData.title || 'Unknown'
        duration = zylaData.duration || 0

        console.log('[Transcribe API] Zyla returned audio URL for:', title)
      } else if (FIREBASE_FUNCTION_URL) {
        // Use Firebase Cloud Function to extract audio URL
        console.log('[Transcribe API] Calling Firebase function...')
        const firebaseResponse = await fetch(FIREBASE_FUNCTION_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: youtubeUrl })
        })

        if (!firebaseResponse.ok) {
          const errorData = await firebaseResponse.json()
          throw new Error(errorData.error || 'Firebase function failed')
        }

        const firebaseData = await firebaseResponse.json()
        audioUrl = firebaseData.audioUrl
        duration = firebaseData.duration
        title = firebaseData.title

        console.log('[Transcribe API] Firebase returned audio URL for:', title)
      } else {
        // Fallback: Try direct extraction (may fail due to YouTube blocking)
        console.log('[Transcribe API] No Firebase URL configured, trying direct...')
        const ytdl = (await import('@distube/ytdl-core')).default
        
        const info = await ytdl.getInfo(youtubeUrl)
        duration = parseInt(info.videoDetails.lengthSeconds) || 0
        title = info.videoDetails.title
        
        const audioFormats = ytdl.filterFormats(info.formats, 'audioonly')
        if (audioFormats.length === 0) {
          throw new Error('No audio format available')
        }
        
        const bestAudio = audioFormats[0]
        audioUrl = bestAudio.url
      }

      // Check duration limit
      if (duration > MAX_VIDEO_DURATION_SECONDS) {
        const maxMinutes = Math.floor(MAX_VIDEO_DURATION_SECONDS / 60)
        const videoMinutes = Math.floor(duration / 60)
        return NextResponse.json(
          { error: 'Video demasiado largo (' + videoMinutes + ' min). Maximo: ' + maxMinutes + ' min.' },
          { status: 400 }
        )
      }

      console.log('[Transcribe API] Video:', title, '- Duration:', duration, 's')
      console.log('[Transcribe API] Sending audio URL to Groq Whisper...')

      // Call Groq Whisper API with the audio URL
      const groq = new Groq({ apiKey: GROQ_API_KEY })
      
      // Download audio and send to Groq
      const audioResponse = await fetch(audioUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Accept': '*/*',
          'Range': 'bytes=0-'
        }
      })

      if (!audioResponse.ok) {
        throw new Error('Failed to download audio: ' + audioResponse.status)
      }

      const audioBuffer = Buffer.from(await audioResponse.arrayBuffer())
      console.log('[Transcribe API] Downloaded audio:', audioBuffer.length, 'bytes')

      // Create file for Groq
      const audioFile = new File(
        [audioBuffer], 
        'audio.webm', 
        { type: 'audio/webm' }
      )

      const transcription = await groq.audio.transcriptions.create({
        file: audioFile as any,
        model: 'whisper-large-v3',
        language: 'es',
        response_format: 'text',
      })

      let fullText = ''
      if (typeof transcription === 'string') {
        fullText = transcription
      } else if (transcription && typeof transcription === 'object' && 'text' in transcription) {
        fullText = (transcription as any).text
      } else {
        fullText = String(transcription)
      }

      console.log('[Transcribe API] Transcription complete, length:', fullText.length)

      if (!fullText || fullText.trim().length === 0) {
        return NextResponse.json({ error: 'No se genero texto de transcripcion' }, { status: 500 })
      }

      const response: TranscribeResponse = {
        text: fullText.trim(),
        segmentCount: 1,
        duration,
        title,
      }

      return NextResponse.json(response)

    } catch (error: any) {
      const errorMessage = error.message || String(error)
      console.error('[Transcribe API] Error:', errorMessage)

      if (errorMessage.includes('rate limit') || errorMessage.includes('429')) {
        return NextResponse.json({ error: 'Limite de API excedido. Espera unos minutos.' }, { status: 429 })
      }
      if (errorMessage.includes('private')) {
        return NextResponse.json({ error: 'El video es privado. Usa Texto Directo.' }, { status: 403 })
      }
      if (errorMessage.includes('403') || errorMessage.includes('blocked')) {
        return NextResponse.json({ error: 'YouTube bloqueo la descarga. Usa Texto Directo.' }, { status: 503 })
      }
      return NextResponse.json({ error: 'Error: ' + errorMessage }, { status: 500 })
    }
  } catch (error: any) {
    console.error('[Transcribe API] Request error:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { 
    status: 200, 
    headers: { 
      'Access-Control-Allow-Origin': '*', 
      'Access-Control-Allow-Methods': 'POST, OPTIONS', 
      'Access-Control-Allow-Headers': 'Content-Type' 
    } 
  })
}

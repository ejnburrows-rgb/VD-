import { NextRequest, NextResponse } from 'next/server'
import Groq from 'groq-sdk'
import ytdl from '@distube/ytdl-core'

export const runtime = 'nodejs'
export const maxDuration = 600

const GROQ_API_KEY = process.env.GROQ_API_KEY || ''
const MAX_VIDEO_DURATION_SECONDS = 6300
const CHUNK_SIZE_MB = 20

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

async function streamToBuffer(stream: NodeJS.ReadableStream, timeoutMs: number = 180000): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = []
    const timeout = setTimeout(() => {
      stream.removeAllListeners()
      reject(new Error('Download timeout'))
    }, timeoutMs)
    stream.on('data', (chunk: Buffer) => chunks.push(chunk))
    stream.on('end', () => { clearTimeout(timeout); resolve(Buffer.concat(chunks)) })
    stream.on('error', (err) => { clearTimeout(timeout); reject(err) })
  })
}

async function transcribeWithGroq(groq: Groq, audioBuffer: Buffer, filename: string): Promise<string> {
  const arrayBuffer = audioBuffer.buffer.slice(audioBuffer.byteOffset, audioBuffer.byteOffset + audioBuffer.byteLength) as ArrayBuffer
  const audioFile = new File([arrayBuffer], filename, { type: 'audio/mp4' })
  console.log('[Transcribe] Sending to Groq, size:', audioBuffer.length, 'bytes')
  const transcription = await groq.audio.transcriptions.create({
    file: audioFile as any,
    model: 'whisper-large-v3',
    language: 'es',
    response_format: 'text',
  })
  if (typeof transcription === 'string') return transcription
  if (transcription && typeof transcription === 'object' && 'text' in transcription) return (transcription as any).text
  return String(transcription)
}

const defaultAgent = ytdl.createAgent(undefined, { localAddress: undefined })

export async function POST(request: NextRequest) {
  console.log('[Transcribe API] Request received')
  try {
    if (!GROQ_API_KEY) {
      return NextResponse.json({ error: 'Servicio de transcripcion no configurado.' }, { status: 503 })
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
      console.log('[Transcribe API] Getting video info...')
      const info = await ytdl.getInfo(youtubeUrl, {
        agent: defaultAgent,
        requestOptions: {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.9',
          },
        },
      })
      const durationSeconds = parseInt(info.videoDetails.lengthSeconds) || 0
      const title = info.videoDetails.title
      console.log('[Transcribe API] Video:', title, '- Duration:', durationSeconds, 's')
      if (durationSeconds > MAX_VIDEO_DURATION_SECONDS) {
        return NextResponse.json({ error: 'Video demasiado largo. Maximo: 105 min.' }, { status: 400 })
      }
      const audioFormats = ytdl.filterFormats(info.formats, 'audioonly')
      if (audioFormats.length === 0) {
        return NextResponse.json({ error: 'No hay formato de audio disponible' }, { status: 400 })
      }
      const audioFormat = audioFormats.find((f: any) => f.container === 'mp4' || f.container === 'webm') || audioFormats[0]
      console.log('[Transcribe API] Audio format:', audioFormat.container)
      console.log('[Transcribe API] Downloading audio...')
      const audioStream = ytdl(youtubeUrl, {
        format: audioFormat,
        agent: defaultAgent,
        requestOptions: {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
            'Accept': '*/*',
            'Range': 'bytes=0-',
          },
        },
      })
      const audioBuffer = await streamToBuffer(audioStream, 180000)
      console.log('[Transcribe API] Downloaded:', audioBuffer.length, 'bytes')
      if (audioBuffer.length === 0) {
        return NextResponse.json({ error: 'No se pudo descargar el audio' }, { status: 500 })
      }
      console.log('[Transcribe API] Transcribing with Groq Whisper...')
      const groq = new Groq({ apiKey: GROQ_API_KEY })
      const maxBytes = CHUNK_SIZE_MB * 1024 * 1024
      let fullText = ''
      let segmentCount = 1
      if (audioBuffer.length > maxBytes) {
        const numChunks = Math.ceil(audioBuffer.length / maxBytes)
        console.log('[Transcribe API] Splitting into', numChunks, 'chunks')
        const transcriptions: string[] = []
        for (let i = 0; i < numChunks; i++) {
          const start = i * maxBytes
          const end = Math.min(start + maxBytes, audioBuffer.length)
          const chunk = audioBuffer.slice(start, end)
          console.log('[Transcribe API] Processing chunk', i + 1, '/', numChunks)
          const chunkText = await transcribeWithGroq(groq, chunk, 'audio-' + i + '.m4a')
          transcriptions.push(chunkText.trim())
          if (i < numChunks - 1) await new Promise(r => setTimeout(r, 1000))
        }
        fullText = transcriptions.join('\n\n')
        segmentCount = numChunks
      } else {
        fullText = await transcribeWithGroq(groq, audioBuffer, 'audio.m4a')
      }
      if (!fullText || fullText.trim().length === 0) {
        return NextResponse.json({ error: 'No se genero texto de transcripcion' }, { status: 500 })
      }
      console.log('[Transcribe API] Transcription complete, length:', fullText.length)
      const response: TranscribeResponse = { text: fullText.trim(), segmentCount, duration: durationSeconds, title }
      return NextResponse.json(response)
    } catch (error: any) {
      const errorMessage = error.message || String(error)
      console.error('[Transcribe API] Error:', errorMessage)
      if (errorMessage.includes('rate limit') || errorMessage.includes('429')) {
        return NextResponse.json({ error: 'Limite de API excedido. Espera unos minutos.' }, { status: 429 })
      }
      if (errorMessage.includes('private') || errorMessage.includes('Private')) {
        return NextResponse.json({ error: 'El video es privado. Usa Texto Directo.' }, { status: 403 })
      }
      if (errorMessage.includes('Sign in') || errorMessage.includes('bot')) {
        return NextResponse.json({ error: 'YouTube requiere verificacion. Usa Texto Directo para copiar y pegar la transcripcion manualmente.' }, { status: 403 })
      }
      if (errorMessage.includes('parsing') || errorMessage.includes('watch.html')) {
        return NextResponse.json({ error: 'YouTube ha actualizado su estructura. Usa Texto Directo mientras se actualiza el sistema.' }, { status: 503 })
      }
      if (errorMessage.includes('403') || errorMessage.includes('Status code: 403')) {
        return NextResponse.json({ error: 'YouTube ha bloqueado la descarga de este video. Por favor, usa la opcion Texto Directo: copia la transcripcion del video manualmente y pegala en el campo de texto.' }, { status: 503 })
      }
      if (errorMessage.includes('decipher') || errorMessage.includes('cipher')) {
        return NextResponse.json({ error: 'No se puede descifrar el audio de YouTube. Usa Texto Directo para copiar y pegar la transcripcion manualmente.' }, { status: 503 })
      }
      return NextResponse.json({ error: 'Error de transcripcion: ' + errorMessage }, { status: 500 })
    }
  } catch (error: any) {
    console.error('[Transcribe API] Request error:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 200, headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' } })
}

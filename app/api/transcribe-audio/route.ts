import { NextRequest, NextResponse } from 'next/server'
import Groq from 'groq-sdk'
import youtubedl from 'youtube-dl-exec'
import { readFileSync, unlinkSync, existsSync } from 'fs'
import { tmpdir } from 'os'
import { join } from 'path'

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

function extractVideoId(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/)
  return match ? match[1] : null
}

async function transcribeWithGroq(groq: Groq, audioBuffer: Buffer, filename: string): Promise<string> {
  const arrayBuffer = audioBuffer.buffer.slice(audioBuffer.byteOffset, audioBuffer.byteOffset + audioBuffer.byteLength) as ArrayBuffer
  const audioFile = new File([arrayBuffer], filename, { type: 'audio/mp3' })
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

export async function POST(request: NextRequest) {
  console.log('[Transcribe API] Request received')
  let tempFilePath: string | null = null
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
    const videoId = extractVideoId(youtubeUrl)
    if (!videoId) {
      return NextResponse.json({ error: 'No se pudo extraer el ID del video' }, { status: 400 })
    }
    try {
      console.log('[Transcribe API] Getting video info...')
      const videoInfo = await youtubedl(youtubeUrl, { dumpSingleJson: true, noCheckCertificates: true, noWarnings: true, preferFreeFormats: true }) as any
      const durationSeconds = videoInfo.duration || 0
      const title = videoInfo.title || 'Unknown'
      console.log('[Transcribe API] Video:', title, '- Duration:', durationSeconds, 's')
      if (durationSeconds > MAX_VIDEO_DURATION_SECONDS) {
        return NextResponse.json({ error: 'Video demasiado largo. Maximo: 105 min.' }, { status: 400 })
      }
      console.log('[Transcribe API] Downloading audio...')
      tempFilePath = join(tmpdir(), 'audio-' + videoId + '-' + Date.now() + '.mp3')
      await youtubedl(youtubeUrl, { extractAudio: true, audioFormat: 'mp3', audioQuality: 0, output: tempFilePath, noCheckCertificates: true, noWarnings: true })
      await new Promise(r => setTimeout(r, 500))
      if (!existsSync(tempFilePath)) {
        const altPath = tempFilePath + '.mp3'
        if (existsSync(altPath)) tempFilePath = altPath
        else throw new Error('Audio file not created')
      }
      const audioBuffer = readFileSync(tempFilePath)
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
        const transcriptions: string[] = []
        for (let i = 0; i < numChunks; i++) {
          const start = i * maxBytes
          const end = Math.min(start + maxBytes, audioBuffer.length)
          const chunk = audioBuffer.slice(start, end)
          const chunkText = await transcribeWithGroq(groq, chunk, 'audio-' + i + '.mp3')
          transcriptions.push(chunkText.trim())
          if (i < numChunks - 1) await new Promise(r => setTimeout(r, 1000))
        }
        fullText = transcriptions.join('\n\n')
        segmentCount = numChunks
      } else {
        fullText = await transcribeWithGroq(groq, audioBuffer, 'audio.mp3')
      }
      if (!fullText || fullText.trim().length === 0) {
        return NextResponse.json({ error: 'No se genero texto de transcripcion' }, { status: 500 })
      }
      const response: TranscribeResponse = { text: fullText.trim(), segmentCount, duration: durationSeconds, title }
      return NextResponse.json(response)
    } catch (error: any) {
      console.error('[Transcribe API] Error:', error.message)
      return NextResponse.json({ error: 'Error de transcripcion: ' + error.message }, { status: 500 })
    }
  } catch (error: any) {
    console.error('[Transcribe API] Request error:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  } finally {
    if (tempFilePath && existsSync(tempFilePath)) {
      try { unlinkSync(tempFilePath) } catch (e) {}
    }
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 200, headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' } })
}

import { NextRequest, NextResponse } from 'next/server'
import Groq from 'groq-sdk'
import { readFile, unlink } from 'fs/promises'
import { createReadStream, statSync } from 'fs'

export const runtime = 'nodejs'
export const maxDuration = 300

const GROQ_API_KEY = process.env.GROQ_API_KEY || ''
const MAX_FILE_SIZE = 25 * 1024 * 1024 // 25MB (Groq limit)

interface TranscribeRequest {
  audioPath?: string
  youtubeUrl?: string
}

interface TranscribeResponse {
  text: string
  duration?: number
  title?: string
}

export async function POST(request: NextRequest) {
  console.log('[Transcribe API] Request received')
  
  try {
    if (!GROQ_API_KEY) {
      return NextResponse.json(
        { error: 'GROQ_API_KEY not configured' },
        { status: 503 }
      )
    }

    const body: TranscribeRequest = await request.json()
    let { audioPath, youtubeUrl } = body

    // If YouTube URL provided, download audio first
    if (youtubeUrl && !audioPath) {
      console.log('[Transcribe API] Downloading audio from YouTube...')
      const downloadResponse = await fetch(`${request.nextUrl.origin}/api/download-youtube-audio`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ youtubeUrl }),
      })

      if (!downloadResponse.ok) {
        const errorData = await downloadResponse.json()
        throw new Error(errorData.error || 'Failed to download audio')
      }

      const downloadData = await downloadResponse.json()
      audioPath = downloadData.audioPath
    }

    if (!audioPath) {
      return NextResponse.json(
        { error: 'Audio path or YouTube URL required' },
        { status: 400 }
      )
    }

    console.log('[Transcribe API] Checking audio file:', audioPath)

    // Check file size
    const stats = statSync(audioPath)
    if (stats.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `Audio file too large (${Math.floor(stats.size / 1024 / 1024)}MB). Max: 25MB. Try a shorter video.` },
        { status: 400 }
      )
    }

    console.log('[Transcribe API] Transcribing with Groq Whisper...')

    const groq = new Groq({ apiKey: GROQ_API_KEY })

    // Read audio file
    const audioBuffer = await readFile(audioPath)
    const audioFile = new File([audioBuffer], 'audio.mp3', { type: 'audio/mpeg' })

    // Transcribe with Groq Whisper
    const transcription = await groq.audio.transcriptions.create({
      file: audioFile,
      model: 'whisper-large-v3',
      language: 'es',
      response_format: 'text',
      temperature: 0.0,
    })

    // Clean up temp file
    try {
      await unlink(audioPath)
      console.log('[Transcribe API] Cleaned up temp file')
    } catch (e) {
      console.warn('[Transcribe API] Failed to clean up temp file:', e)
    }

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
      return NextResponse.json(
        { error: 'No transcription generated' },
        { status: 500 }
      )
    }

    const response: TranscribeResponse = {
      text: fullText.trim(),
    }

    return NextResponse.json(response)

  } catch (error: any) {
    const errorMessage = error.message || String(error)
    console.error('[Transcribe API] Error:', errorMessage)

    if (errorMessage.includes('rate limit') || errorMessage.includes('429')) {
      return NextResponse.json(
        { error: 'API rate limit exceeded. Wait a few minutes.' },
        { status: 429 }
      )
    }

    if (errorMessage.includes('quota')) {
      return NextResponse.json(
        { error: 'API quota exceeded. Check your Groq usage.' },
        { status: 429 }
      )
    }

    return NextResponse.json(
      { error: `Transcription failed: ${errorMessage}` },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({ 
    status: 'ok', 
    message: 'Groq Whisper transcription API',
    model: 'whisper-large-v3'
  })
}

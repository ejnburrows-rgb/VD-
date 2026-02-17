import { NextRequest, NextResponse } from 'next/server'
import { transcribeAudio } from '@/lib/transcription-service'
import { downloadYouTubeAudio } from '@/lib/audio-downloader'
import { unlink } from 'fs/promises'

export const runtime = 'nodejs'
export const maxDuration = 300

interface TranscribeRequest {
  audioPath?: string
  youtubeUrl?: string
}

export async function POST(request: NextRequest) {
  console.log('[Transcribe API] Request received')
  
  try {
    const body: TranscribeRequest = await request.json()
    let { audioPath, youtubeUrl } = body

    // If YouTube URL provided, download audio first
    if (youtubeUrl && !audioPath) {
      console.log('[Transcribe API] Downloading audio from YouTube...')
      const downloadResult = await downloadYouTubeAudio(youtubeUrl)
      audioPath = downloadResult.audioPath
    }

    if (!audioPath) {
      return NextResponse.json(
        { error: 'Audio path or YouTube URL required' },
        { status: 400 }
      )
    }

    let text = ''
    try {
      console.log('[Transcribe API] Transcribing with Groq Whisper...')
      text = await transcribeAudio(audioPath)
      console.log('[Transcribe API] Transcription complete, length:', text.length)
    } finally {
      // Clean up temp file
      try {
        await unlink(audioPath)
        console.log('[Transcribe API] Cleaned up temp file')
      } catch (e) {
        console.warn('[Transcribe API] Failed to clean up temp file:', e)
      }
    }

    return NextResponse.json({
      text,
    })

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

    if (errorMessage.includes('Audio file too large') || errorMessage.includes('Video too long')) {
      return NextResponse.json(
        { error: errorMessage },
        { status: 400 }
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

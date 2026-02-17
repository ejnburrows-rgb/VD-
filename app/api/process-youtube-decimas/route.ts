import { NextRequest, NextResponse } from 'next/server'
import { downloadYouTubeAudio } from '@/lib/audio-downloader'
import { transcribeAudio } from '@/lib/transcription-service'
import { analyzeDecimas } from '@/lib/analysis-service'
import { unlink } from 'fs/promises'

export const runtime = 'nodejs'
export const maxDuration = 300

interface ProcessRequest {
  youtubeUrl: string
  poet1Name?: string
  poet2Name?: string
  poet1First?: boolean
  eventTitle?: string
}

interface ProcessResponse {
  decimas: string
  analysis: string
  duration?: number
  title?: string
}

export async function POST(request: NextRequest) {
  console.log('[Process YouTube] Request received')
  
  try {
    const body: ProcessRequest = await request.json()
    const { youtubeUrl, poet1Name, poet2Name, poet1First, eventTitle } = body

    if (!youtubeUrl) {
      return NextResponse.json(
        { error: 'YouTube URL required' },
        { status: 400 }
      )
    }

    console.log('[Process YouTube] Step 1: Downloading audio...')

    // Step 1: Download audio
    const { audioPath, duration, title } = await downloadYouTubeAudio(youtubeUrl)

    let transcript = ''
    try {
      console.log('[Process YouTube] Step 2: Transcribing audio...')
      // Step 2: Transcribe audio
      transcript = await transcribeAudio(audioPath)
      console.log('[Process YouTube] Transcription complete:', transcript.length, 'chars')
    } finally {
      // Clean up temp file
      try {
        await unlink(audioPath)
        console.log('[Process YouTube] Cleaned up temp file')
      } catch (e) {
        console.warn('[Process YouTube] Failed to clean up temp file:', e)
      }
    }

    console.log('[Process YouTube] Step 3: Analyzing décimas with Gemini...')

    // Step 3: Analyze with Gemini
    const singerName = poet1First ? poet1Name : poet2Name
    
    const { decimas, analysis } = await analyzeDecimas(transcript, singerName || undefined)

    console.log('[Process YouTube] Analysis complete')

    const response: ProcessResponse = {
      decimas,
      analysis,
      title: eventTitle || title,
      duration,
    }

    return NextResponse.json(response)

  } catch (error: any) {
    const errorMessage = error.message || String(error)
    console.error('[Process YouTube] Error:', errorMessage)

    // Handle specific errors if possible
    let status = 500
    if (errorMessage.includes('YouTube URL') || errorMessage.includes('Video too long') || errorMessage.includes('Audio file too large')) {
      status = 400
    } else if (errorMessage.includes('rate limit') || errorMessage.includes('429')) {
      status = 429
    }

    return NextResponse.json(
      { error: `Processing failed: ${errorMessage}` },
      { status: status }
    )
  }
}

export async function GET() {
  return NextResponse.json({ 
    status: 'ok', 
    message: 'YouTube décima processing pipeline',
    workflow: 'YouTube → yt-dlp → Groq Whisper → Gemini Analysis (Optimized)'
  })
}

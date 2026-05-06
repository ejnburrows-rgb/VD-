import { NextRequest, NextResponse } from 'next/server'

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

    console.log('[Process YouTube] Step 1: Transcribing audio...')

    // Step 1: Transcribe audio with Groq Whisper
    const transcribeResponse = await fetch(`${request.nextUrl.origin}/api/transcribe-audio`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ youtubeUrl }),
    })

    if (!transcribeResponse.ok) {
      const errorData = await transcribeResponse.json()
      throw new Error(errorData.error || 'Transcription failed')
    }

    const transcriptionData = await transcribeResponse.json()
    console.log('[Process YouTube] Transcription complete:', transcriptionData.text.length, 'chars')

    console.log('[Process YouTube] Step 2: Analyzing décimas with Gemini...')

    // Step 2: Analyze with Gemini (using existing analyze-decimas endpoint)
    const singerName = poet1First ? poet1Name : poet2Name
    
    const analyzeResponse = await fetch(`${request.nextUrl.origin}/api/analyze-decimas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        transcript: transcriptionData.text,
        singerName: singerName || undefined,
        youtubeUrl,
      }),
    })

    if (!analyzeResponse.ok) {
      const errorData = await analyzeResponse.json()
      throw new Error(errorData.error || 'Analysis failed')
    }

    const analysisData = await analyzeResponse.json()
    console.log('[Process YouTube] Analysis complete')

    const response: ProcessResponse = {
      decimas: analysisData.decimas,
      analysis: analysisData.analysis,
      title: eventTitle,
    }

    return NextResponse.json(response)

  } catch (error: any) {
    const errorMessage = error.message || String(error)
    console.error('[Process YouTube] Error:', errorMessage)

    return NextResponse.json(
      { error: `Processing failed: ${errorMessage}` },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({ 
    status: 'ok', 
    message: 'YouTube décima processing pipeline',
    workflow: 'YouTube → yt-dlp → Groq Whisper → Gemini Analysis'
  })
}

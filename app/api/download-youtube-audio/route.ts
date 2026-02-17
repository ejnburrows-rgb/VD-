import { NextRequest, NextResponse } from 'next/server'
import { downloadYouTubeAudio, MAX_VIDEO_DURATION } from '@/lib/audio-downloader'

export const runtime = 'nodejs'
export const maxDuration = 300

interface DownloadRequest {
  youtubeUrl: string
}

export async function POST(request: NextRequest) {
  console.log('[Download API] Request received')
  
  try {
    const body: DownloadRequest = await request.json()
    const { youtubeUrl } = body

    if (!youtubeUrl || typeof youtubeUrl !== 'string') {
      return NextResponse.json(
        { error: 'YouTube URL required' },
        { status: 400 }
      )
    }

    const { audioPath, duration, title } = await downloadYouTubeAudio(youtubeUrl)

    return NextResponse.json({
      audioPath,
      duration,
      title,
    })

  } catch (error: any) {
    const errorMessage = error.message || String(error)
    console.error('[Download API] Error:', errorMessage)

    if (errorMessage.includes('Private video')) {
      return NextResponse.json(
        { error: 'This video is private' },
        { status: 403 }
      )
    }

    if (errorMessage.includes('Sign in') || errorMessage.includes('age')) {
      return NextResponse.json(
        { error: 'Video requires sign-in or is age-restricted' },
        { status: 403 }
      )
    }

    if (errorMessage.includes('not available')) {
      return NextResponse.json(
        { error: 'Video not available' },
        { status: 404 }
      )
    }

    if (errorMessage.includes('Video too long') || errorMessage.includes('Invalid YouTube URL')) {
      return NextResponse.json(
        { error: errorMessage },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: `Download failed: ${errorMessage}` },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({ 
    status: 'ok', 
    message: 'YouTube audio download API',
    maxDuration: MAX_VIDEO_DURATION 
  })
}

import { NextRequest, NextResponse } from 'next/server'
import ytdlp from 'yt-dlp-exec'
import { writeFile, unlink } from 'fs/promises'
import { join } from 'path'
import { tmpdir } from 'os'

export const runtime = 'nodejs'
export const maxDuration = 300

const MAX_VIDEO_DURATION = 7200 // 2 hours in seconds

interface DownloadRequest {
  youtubeUrl: string
}

interface DownloadResponse {
  audioPath: string
  duration: number
  title: string
}

function isValidYouTubeUrl(url: string): boolean {
  const patterns = [
    /^https?:\/\/(www\.)?youtube\.com\/watch\?v=[\w-]+/,
    /^https?:\/\/youtu\.be\/[\w-]+/,
    /^https?:\/\/(www\.)?youtube\.com\/embed\/[\w-]+/,
  ]
  return patterns.some(pattern => pattern.test(url))
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

    if (!isValidYouTubeUrl(youtubeUrl)) {
      return NextResponse.json(
        { error: 'Invalid YouTube URL format' },
        { status: 400 }
      )
    }

    console.log('[Download API] Fetching video info...')

    // Get video info first
    const info = await ytdlp(youtubeUrl, {
      dumpSingleJson: true,
      noCheckCertificate: true,
      noWarnings: true,
      preferFreeFormats: true,
    })

    const duration = info.duration || 0
    const title = info.title || 'Unknown'

    if (duration > MAX_VIDEO_DURATION) {
      return NextResponse.json(
        { error: `Video too long (${Math.floor(duration / 60)} min). Max: ${MAX_VIDEO_DURATION / 60} min` },
        { status: 400 }
      )
    }

    console.log('[Download API] Downloading audio:', title, `(${duration}s)`)

    // Download audio to temp directory
    const tempDir = tmpdir()
    const audioPath = join(tempDir, `audio-${Date.now()}.mp3`)

    await ytdlp(youtubeUrl, {
      extractAudio: true,
      audioFormat: 'mp3',
      audioQuality: 0,
      output: audioPath,
      noCheckCertificate: true,
      noWarnings: true,
      preferFreeFormats: true,
    })

    console.log('[Download API] Audio downloaded to:', audioPath)

    const response: DownloadResponse = {
      audioPath,
      duration,
      title,
    }

    return NextResponse.json(response)

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

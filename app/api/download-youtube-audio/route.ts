import { NextRequest, NextResponse } from 'next/server'
import ytdlp from 'yt-dlp-exec'
import { access } from 'fs/promises'
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

    console.log('[Download API] Fetching info and downloading...')

    const tempDir = tmpdir()
    const audioPath = join(tempDir, `audio-${Date.now()}.mp3`)

    // Combined call: Get info AND download in one step
    // Optimization: avoid double fetch and process spawning
    // Using dumpSingleJson ensures we get metadata even if download is skipped via matchFilter
    const info = await ytdlp(youtubeUrl, {
      dumpSingleJson: true,
      noSimulate: true,
      extractAudio: true,
      audioFormat: 'mp3',
      audioQuality: 0,
      output: audioPath,
      noCheckCertificate: true,
      noWarnings: true,
      preferFreeFormats: true,
      matchFilter: `duration <= ${MAX_VIDEO_DURATION}`
    } as any)

    const duration = info.duration || 0
    const title = info.title || 'Unknown'

    // Check if download succeeded (file exists)
    // If matchFilter prevents download (video too long), file won't be created but we still get info
    try {
      await access(audioPath)
    } catch {
      if (duration > MAX_VIDEO_DURATION) {
        return NextResponse.json(
          { error: `Video too long (${Math.floor(duration / 60)} min). Max: ${MAX_VIDEO_DURATION / 60} min` },
          { status: 400 }
        )
      }

      // If duration is fine but file missing, download failed (e.g. network error)
      throw new Error('Download failed: File not created')
    }

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

import { NextRequest, NextResponse } from 'next/server'
import ytdl from '@distube/ytdl-core'
import { Readable } from 'stream'

export const runtime = 'nodejs'
export const maxDuration = 60 // 30 seconds timeout for downloads

interface DownloadRequest {
  youtubeUrl: string
}

interface DownloadResponse {
  audioBase64: string
  durationSeconds: number
}

// Validate YouTube URL format
function isValidYouTubeUrl(url: string): boolean {
  const patterns = [
    /^https?:\/\/(www\.)?youtube\.com\/watch\?v=[\w-]+/,
    /^https?:\/\/youtu\.be\/[\w-]+/,
    /^https?:\/\/(www\.)?youtube\.com\/embed\/[\w-]+/,
  ]
  return patterns.some(pattern => pattern.test(url))
}

// Extract video ID from URL
function extractVideoId(url: string): string | null {
  const patterns = [
    /[?&]v=([\w-]+)/,
    /youtu\.be\/([\w-]+)/,
    /embed\/([\w-]+)/,
  ]
  
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) return match[1]
  }
  return null
}

// Convert stream to buffer
function streamToBuffer(stream: Readable): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = []
    stream.on('data', (chunk) => chunks.push(chunk))
    stream.on('end', () => resolve(Buffer.concat(chunks)))
    stream.on('error', reject)
  })
}

export async function POST(request: NextRequest) {
  try {
    const body: DownloadRequest = await request.json()
    const { youtubeUrl } = body

    // Validate request
    if (!youtubeUrl || typeof youtubeUrl !== 'string') {
      return NextResponse.json(
        { error: 'YouTube URL is required' },
        { status: 400 }
      )
    }

    // Validate URL format
    if (!isValidYouTubeUrl(youtubeUrl)) {
      return NextResponse.json(
        { error: 'Invalid YouTube URL format. Must be youtube.com/watch?v= or youtu.be/' },
        { status: 400 }
      )
    }

    const videoId = extractVideoId(youtubeUrl)
    if (!videoId) {
      return NextResponse.json(
        { error: 'Could not extract video ID from URL' },
        { status: 400 }
      )
    }

    try {
      // Get video info with timeout
      const infoPromise = ytdl.getInfo(youtubeUrl)
      const infoTimeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Info fetch timeout')), 10000)
      })

      const info = await Promise.race([infoPromise, infoTimeoutPromise]) as ytdl.videoInfo
      
      // Get duration
      const durationSeconds = Math.floor(parseInt(info.videoDetails.lengthSeconds) || 0)

      // Choose best audio format
      const audioFormat = ytdl.chooseFormat(info.formats, {
        quality: 'highestaudio',
        filter: 'audioonly'
      })

      if (!audioFormat) {
        return NextResponse.json(
          { error: 'No audio format available for this video' },
          { status: 400 }
        )
      }

      // Download audio stream with timeout
      const audioStream = ytdl(youtubeUrl, {
        quality: 'highestaudio',
        filter: 'audioonly'
      })

      const downloadTimeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Download timeout after 30 seconds')), 30000)
      })

      // Convert stream to buffer
      const bufferPromise = streamToBuffer(audioStream)
      const audioBuffer = await Promise.race([bufferPromise, downloadTimeoutPromise]) as Buffer

      // Convert to base64
      const audioBase64 = audioBuffer.toString('base64')

      const response: DownloadResponse = {
        audioBase64,
        durationSeconds,
      }

      return NextResponse.json(response, {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      })
    } catch (error: any) {
      // Handle specific errors
      const errorMessage = error.message || String(error)
      
      if (errorMessage.includes('Private video') || errorMessage.includes('is private') || errorMessage.includes('private')) {
        return NextResponse.json(
          { error: 'This video is private and cannot be accessed' },
          { status: 403 }
        )
      }

      if (errorMessage.includes('region') || errorMessage.includes('blocked') || errorMessage.includes('not available')) {
        return NextResponse.json(
          { error: 'This video is not available in your region' },
          { status: 403 }
        )
      }

      if (errorMessage.includes('age') || errorMessage.includes('restricted') || errorMessage.includes('sign in')) {
        return NextResponse.json(
          { error: 'This video is age-restricted and cannot be accessed' },
          { status: 403 }
        )
      }

      if (errorMessage.includes('timeout')) {
        return NextResponse.json(
          { error: 'Download timed out. The video may be too large or the connection is slow' },
          { status: 408 }
        )
      }

      if (errorMessage.includes('Video unavailable') || errorMessage.includes('not found') || errorMessage.includes('does not exist')) {
        return NextResponse.json(
          { error: 'Video not found or unavailable' },
          { status: 404 }
        )
      }

      console.error('Download error:', errorMessage)
      return NextResponse.json(
        { error: `Failed to download audio: ${errorMessage}` },
        { status: 500 }
      )
    }
  } catch (error: any) {
    console.error('Request processing error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}

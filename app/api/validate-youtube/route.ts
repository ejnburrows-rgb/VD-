import { NextRequest, NextResponse } from 'next/server'
import { isValidYouTubeUrl, extractYouTubeId } from '@/lib/utils'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { youtubeUrl } = body

    if (!youtubeUrl || typeof youtubeUrl !== 'string') {
      return NextResponse.json(
        { valid: false, error: 'YouTube URL is required' },
        { status: 400 }
      )
    }

    const valid = isValidYouTubeUrl(youtubeUrl)
    const videoId = valid ? extractYouTubeId(youtubeUrl) : null

    if (!valid || !videoId) {
      return NextResponse.json(
        { valid: false, error: 'Invalid YouTube URL format' },
        { status: 400 }
      )
    }

    return NextResponse.json({
      valid: true,
      videoId,
    })
  } catch (error: any) {
    console.error('Validation error:', error)
    return NextResponse.json(
      { valid: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}


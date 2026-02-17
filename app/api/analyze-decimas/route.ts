import { NextRequest, NextResponse } from 'next/server'
import { analyzeDecimas } from '@/lib/decimas-analysis'

export const runtime = 'nodejs'
export const maxDuration = 120

interface AnalyzeRequest {
  transcript: string
  singerName?: string
  youtubeUrl?: string
}

export async function POST(request: NextRequest) {
  try {
    const body: AnalyzeRequest = await request.json()
    const { transcript, singerName, youtubeUrl } = body

    try {
      const result = await analyzeDecimas(transcript, singerName, youtubeUrl)

      return NextResponse.json(result, {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      })
    } catch (error: any) {
      const errorMessage = error.message || String(error)
      console.error('Gemini API error:', errorMessage)

      if (errorMessage.includes('Transcript is required') || errorMessage.includes('Transcript cannot be empty')) {
        return NextResponse.json(
          { error: errorMessage },
          { status: 400 }
        )
      }

      if (errorMessage.includes('API key') || errorMessage.includes('401')) {
        return NextResponse.json(
          { error: 'Invalid API key or authentication failed' },
          { status: 401 }
        )
      }

      if (errorMessage.includes('rate limit') || errorMessage.includes('429')) {
        return NextResponse.json(
          { error: 'API rate limit exceeded. Please try again in a few moments.' },
          { status: 429 }
        )
      }

      if (errorMessage.includes('quota') || errorMessage.includes('quota exceeded')) {
        return NextResponse.json(
          { error: 'API quota exceeded. Please check your usage limits.' },
          { status: 429 }
        )
      }

      if (errorMessage.includes('safety') || errorMessage.includes('blocked')) {
        return NextResponse.json(
          { error: 'Content was blocked by safety filters. Please try a different transcript.' },
          { status: 400 }
        )
      }

      return NextResponse.json(
        { error: `Analysis failed: ${errorMessage}` },
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

export async function GET() {
  return NextResponse.json({ 
    status: 'ok', 
    message: 'Analyze Decimas API - Text-only MVP',
    version: '1.0.0'
  })
}

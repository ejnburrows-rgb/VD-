import { NextRequest, NextResponse } from 'next/server'
import { analyzeDecimas } from '@/lib/analysis-service'

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

    if (!transcript || typeof transcript !== 'string') {
      return NextResponse.json(
        { error: 'Transcript is required' },
        { status: 400 }
      )
    }

    if (transcript.trim().length === 0) {
      return NextResponse.json(
        { error: 'Transcript cannot be empty' },
        { status: 400 }
      )
    }

    const { decimas, analysis } = await analyzeDecimas(transcript, singerName)

    return NextResponse.json({
      decimas,
      analysis,
      youtubeUrl,
    }, {
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

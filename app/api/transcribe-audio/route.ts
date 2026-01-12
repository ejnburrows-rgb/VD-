import { NextResponse } from 'next/server'

export async function POST() {
  return NextResponse.json(
    { error: 'YouTube features disabled in text-only MVP' },
    { status: 501 }
  )
}

export async function GET() {
  return NextResponse.json({ status: 'disabled', message: 'Text-only MVP' })
}

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ videoId: string }> }
) {
  try {
    const { videoId } = await params

    const video = await prisma.video.findUnique({
      where: { id: videoId },
      include: {
        decimas: {
          include: {
            poet: true,
          },
          orderBy: {
            number: 'asc',
          },
        },
      },
    })

    if (!video) {
      return NextResponse.json(
        { error: 'Video not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      decimas: video.decimas,
      total: video.decimas.length,
    })
  } catch (error: any) {
    console.error('Get décimas error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}


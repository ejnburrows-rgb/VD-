import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: { videoId: string } }
) {
  try {
    const { videoId } = params

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
        analysis: true,
      },
    })

    if (!video) {
      return NextResponse.json(
        { error: 'Video not found' },
        { status: 404 }
      )
    }

    let text = `DÉCIMAS ESPINELAS\n`
    text += `Video: ${video.title || video.youtubeUrl}\n`
    text += `Fecha: ${video.processedAt?.toLocaleDateString() || 'N/A'}\n`
    text += `\n${'='.repeat(50)}\n\n`

    for (const decima of video.decimas) {
      text += `Décima ${decima.number}\n`
      if (decima.poet) {
        text += `Poeta: ${decima.poet.name}\n`
      }
      text += `\n`
      decima.verses.forEach((verse, index) => {
        text += `${index + 1}. ${verse}\n`
      })
      text += `\n${'-'.repeat(50)}\n\n`
    }

    if (video.analysis) {
      text += `\nANÁLISIS\n`
      text += `${'='.repeat(50)}\n\n`
      text += `Total de décimas: ${video.analysis.totalDecimas}\n`
      text += `Calidad de rima promedio: ${video.analysis.rhymeQuality.toFixed(2)}\n`
      if (video.analysis.culturalContext) {
        text += `\nContexto Cultural:\n${video.analysis.culturalContext}\n`
      }
    }

    return new NextResponse(text, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Content-Disposition': `attachment; filename="decimas-${videoId}.txt"`,
      },
    })
  } catch (error: any) {
    console.error('Export text error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}


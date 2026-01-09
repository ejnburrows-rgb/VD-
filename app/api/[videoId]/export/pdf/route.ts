import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { jsPDF } from 'jspdf'

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
        analysis: true,
      },
    })

    if (!video) {
      return NextResponse.json(
        { error: 'Video not found' },
        { status: 404 }
      )
    }

    const doc = new jsPDF()
    let yPos = 20

    // Title
    doc.setFontSize(18)
    doc.setTextColor(200, 160, 92) // #C8A05C
    doc.text('DÉCIMAS ESPINELAS', 105, yPos, { align: 'center' })
    yPos += 10

    // Video info
    doc.setFontSize(12)
    doc.setTextColor(92, 64, 51) // #5C4033
    doc.text(`Video: ${video.title || video.youtubeUrl}`, 20, yPos)
    yPos += 7
    doc.text(
      `Fecha: ${video.processedAt?.toLocaleDateString() || 'N/A'}`,
      20,
      yPos
    )
    yPos += 15

    // Décimas
    for (const decima of video.decimas) {
      if (yPos > 270) {
        doc.addPage()
        yPos = 20
      }

      doc.setFontSize(14)
      doc.setTextColor(217, 119, 6) // #D97706
      doc.text(`Décima ${decima.number}`, 20, yPos)
      yPos += 8

      if (decima.poet) {
        doc.setFontSize(11)
        doc.setTextColor(92, 64, 51)
        doc.text(`Poeta: ${decima.poet.name}`, 20, yPos)
        yPos += 7
      }

      doc.setFontSize(10)
      decima.verses.forEach((verse, index) => {
        if (yPos > 270) {
          doc.addPage()
          yPos = 20
        }
        doc.text(`${index + 1}. ${verse}`, 25, yPos)
        yPos += 6
      })

      yPos += 5
    }

    // Analysis
    if (video.analysis && yPos < 250) {
      doc.addPage()
      yPos = 20

      doc.setFontSize(16)
      doc.setTextColor(200, 160, 92)
      doc.text('ANÁLISIS', 105, yPos, { align: 'center' })
      yPos += 15

      doc.setFontSize(11)
      doc.setTextColor(92, 64, 51)
      doc.text(
        `Total de décimas: ${video.analysis.totalDecimas}`,
        20,
        yPos
      )
      yPos += 7
      doc.text(
        `Calidad de rima promedio: ${video.analysis.rhymeQuality.toFixed(2)}`,
        20,
        yPos
      )
      yPos += 10

      if (video.analysis.culturalContext) {
        const lines = doc.splitTextToSize(
          video.analysis.culturalContext,
          170
        )
        doc.text(lines, 20, yPos)
      }
    }

    const pdfBuffer = Buffer.from(doc.output('arraybuffer'))

    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="decimas-${videoId}.pdf"`,
      },
    })
  } catch (error: any) {
    console.error('Export PDF error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}


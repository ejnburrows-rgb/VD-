import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const videoId = params.id;

    const video = await prisma.video.findUnique({
      where: { id: videoId },
      include: {
        analysis: true,
        poets: {
          include: {
            decimas: {
              orderBy: { number: 'asc' }
            }
          },
          orderBy: { turnNumber: 'asc' }
        }
      }
    });

    if (!video) {
      return NextResponse.json(
        { error: 'Video no encontrado' },
        { status: 404 }
      );
    }

    if (video.status !== 'COMPLETED') {
      return NextResponse.json(
        { error: 'El video aún no ha sido procesado completamente' },
        { status: 400 }
      );
    }

    // Generate text content
    let textContent = '';
    
    // Video information
    textContent += `INFORMACIÓN DEL VIDEO\n`;
    textContent += `=====================\n`;
    textContent += `Título: ${video.title}\n`;
    textContent += `Duración: ${video.duration}\n`;
    textContent += `Fecha de análisis: ${video.processedAt.toLocaleDateString('es-ES')}\n`;
    textContent += `Poetas identificados: ${video.poets.map((p: any) => p.name).join(', ')}\n\n`;

    // Décimas by poet
    textContent += `DÉCIMAS FORMATEADAS\n`;
    textContent += `==================\n\n`;

    video.poets.forEach((poet: any) => {
      textContent += `${poet.name.toUpperCase()}${poet.turnNumber ? ` - Turno ${poet.turnNumber}` : ''}\n`;
      textContent += `${'='.repeat((poet.name || '').length + 10)}\n\n`;

      poet.decimas.forEach((decima: any) => {
        textContent += `Décima ${decima.number}:\n`;
        decima.lines.forEach((line: string) => {
          textContent += `${line}\n`;
        });
        textContent += `\nEsquema de rima: ${decima.rhymeScheme}\n`;
        textContent += `Métrica: ${decima.meter}\n`;
        if (decima.timestamp) {
          textContent += `Marca de tiempo: ${decima.timestamp}\n`;
        }
        textContent += `\n`;
      });
    });

    // Analysis summary
    if (video.analysis) {
      textContent += `RESUMEN DE LA CANTURÍA\n`;
      textContent += `======================\n\n`;

      if (video.analysis.summary) {
        textContent += `${video.analysis.summary}\n\n`;
      }

      // Deep analysis
      if (video.analysis.deepAnalysis) {
        textContent += `ANÁLISIS PROFUNDO\n`;
        textContent += `================\n\n`;
        textContent += `${video.analysis.deepAnalysis}\n\n`;
      }
    }

    const response = {
      title: video.title,
      duration: video.duration,
      processedAt: video.processedAt,
      textContent: textContent.trim()
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('Error generating text export:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

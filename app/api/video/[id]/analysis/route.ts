
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
              where: { isTopThree: true },
              orderBy: { topThreeRank: 'asc' }
            }
          }
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
        { error: 'El análisis aún no ha sido completado' },
        { status: 400 }
      );
    }

    const topDecimasByPoet: Record<string, any[]> = {};
    
    video.poets.forEach((poet: any) => {
      if (poet.decimas.length > 0) {
        topDecimasByPoet[poet.name] = poet.decimas.map((decima: any) => ({
          id: decima.id,
          number: decima.number,
          lines: decima.lines,
          poet: poet.name,
          rank: decima.topThreeRank || 0,
          technicalMastery: decima.technicalMastery,
          poeticDevices: decima.poeticDevices,
          culturalElements: decima.culturalElements,
          emotionalResonance: decima.emotionalResonance,
          improvisation: decima.improvisation,
          topThreeReason: decima.topThreeReason
        }));
      }
    });

    const response = {
      id: video.id,
      videoTitle: video.title,
      summary: video.analysis?.summary,
      deepAnalysis: video.analysis?.deepAnalysis,
      rawTranscript: video.transcript, // Include full Perplexity response
      topDecimasByPoet
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('Error fetching analysis:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

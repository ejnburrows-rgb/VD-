
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

    const response = {
      id: video.id,
      title: video.title,
      duration: video.duration,
      processedAt: video.processedAt,
      processingTime: video.processingTime,
      poets: video.poets.map((poet: any) => ({
        id: poet.id,
        name: poet.name,
        turnNumber: poet.turnNumber,
        decimas: poet.decimas.map((decima: any) => ({
          id: decima.id,
          number: decima.number,
          lines: decima.lines,
          rhymeScheme: decima.rhymeScheme,
          meter: decima.meter,
          isComplete: decima.isComplete,
          isRegular: decima.isRegular,
          timestamp: decima.timestamp
        }))
      }))
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('Error fetching decimas:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

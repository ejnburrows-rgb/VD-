
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { randomBytes } from 'crypto';

export const dynamic = "force-dynamic";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const videoId = params.id;

    // Verify video exists and is completed
    const video = await prisma.video.findUnique({
      where: { id: videoId }
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

    // Generate a unique share ID
    const shareId = randomBytes(16).toString('hex');

    // In a full implementation, you would store share links in a separate table
    // For now, we'll return the share ID that can be used to construct the URL
    // The share route would fetch the video by ID
    
    return NextResponse.json({
      shareId: videoId, // Using videoId directly for simplicity
      videoId,
      expiresAt: null // No expiration for now
    });

  } catch (error) {
    console.error('Error creating share link:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

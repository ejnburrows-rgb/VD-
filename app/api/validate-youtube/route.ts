import { NextRequest, NextResponse } from 'next/server';
import ytdl from '@distube/ytdl-core';

export const runtime = 'nodejs';
export const maxDuration = 30;

export async function POST(request: NextRequest) {
  try {
    const { youtubeUrl } = await request.json();

    if (!youtubeUrl) {
      return NextResponse.json(
        { error: 'YouTube URL is required' },
        { status: 400 }
      );
    }

    // Validar URL
    if (!ytdl.validateURL(youtubeUrl)) {
      return NextResponse.json(
        { valid: false, error: 'Invalid YouTube URL' },
        { status: 400 }
      );
    }

    // Obtener info del video
    const info = await ytdl.getInfo(youtubeUrl);

    return NextResponse.json({
      valid: true,
      videoId: info.videoDetails.videoId,
      title: info.videoDetails.title,
      duration: info.videoDetails.lengthSeconds,
      thumbnail: info.videoDetails.thumbnails?.[0]?.url || info.videoDetails.thumbnail?.thumbnails?.[0]?.url || `https://i.ytimg.com/vi/${info.videoDetails.videoId}/hqdefault.jpg`
    });

  } catch (error: any) {
    console.error('Error validating YouTube URL:', error);
    return NextResponse.json(
      { valid: false, error: error.message || 'Failed to validate YouTube URL' },
      { status: 500 }
    );
  }
}


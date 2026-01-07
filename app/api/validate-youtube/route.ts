import { NextRequest, NextResponse } from 'next/server';
import { validateYouTubeUrl, isYouTubeApiConfigured } from '@/lib/youtube-client';

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url || typeof url !== 'string') {
      return NextResponse.json(
        { error: 'URL de YouTube requerida' },
        { status: 400 }
      );
    }

    // Verificar si la API Key está configurada
    if (!isYouTubeApiConfigured()) {
      return NextResponse.json(
        { 
          error: 'YouTube API no configurada. Por favor, agrega tu YOUTUBE_API_KEY en el archivo .env',
          instructions: 'Obtén tu API Key en: https://console.cloud.google.com/apis/credentials'
        },
        { status: 503 }
      );
    }

    // Validar y obtener información del video usando YouTube Data API v3
    const videoInfo = await validateYouTubeUrl(url.trim());

    return NextResponse.json({
      id: videoInfo.id,
      url: videoInfo.url,
      title: videoInfo.title,
      duration: videoInfo.duration,
      thumbnailUrl: videoInfo.thumbnailUrl,
      channelTitle: videoInfo.channelTitle,
      description: videoInfo.description.substring(0, 200) // Primeros 200 caracteres
    });

  } catch (error) {
    console.error('YouTube validation error:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    
    // Errores específicos de la API de YouTube
    if (errorMessage.includes('Video no encontrado') || errorMessage.includes('eliminado')) {
      return NextResponse.json(
        { error: 'Este video no existe o fue eliminado' },
        { status: 404 }
      );
    }
    
    if (errorMessage.includes('privado')) {
      return NextResponse.json(
        { error: 'Este video es privado y no puede ser accedido' },
        { status: 403 }
      );
    }

    if (errorMessage.includes('permisos') || errorMessage.includes('API Key')) {
      return NextResponse.json(
        { 
          error: 'Error de configuración de YouTube API',
          details: errorMessage
        },
        { status: 403 }
      );
    }

    if (errorMessage.includes('cuota') || errorMessage.includes('límite')) {
      return NextResponse.json(
        { 
          error: 'Límite de cuota de YouTube API alcanzado',
          details: 'Por favor, intenta más tarde o contacta al administrador'
        },
        { status: 429 }
      );
    }

    if (errorMessage.includes('URL') && errorMessage.includes('inválida')) {
      return NextResponse.json(
        { error: errorMessage },
        { status: 400 }
      );
    }
    
    if (errorMessage.includes('network') || errorMessage.includes('timeout')) {
      return NextResponse.json(
        { error: 'Error de conexión. Verifica tu conexión a internet e inténtalo de nuevo.' },
        { status: 503 }
      );
    }

    // Error genérico
    return NextResponse.json(
      { 
        error: 'Error al validar el video de YouTube',
        details: errorMessage
      },
      { status: 500 }
    );
  }
}

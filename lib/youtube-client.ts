// Optional YouTube Data API v3 client
// Only used if googleapis package is installed and YOUTUBE_API_KEY is configured
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

let youtube: any = null;

// Try to initialize YouTube API client if available (optional dependency)
try {
  if (YOUTUBE_API_KEY && YOUTUBE_API_KEY !== 'YOUR_YOUTUBE_API_KEY_HERE') {
    // Dynamic import to avoid build errors if googleapis is not installed
    const { google } = require('googleapis');
    youtube = google.youtube({
      version: 'v3',
      auth: YOUTUBE_API_KEY,
    });
  }
} catch (e) {
  // googleapis not installed - that's okay, we'll use ytdl instead
  console.log('YouTube Data API v3 not available, using ytdl-core fallback');
}

export interface YouTubeVideoInfo {
  id: string;
  url: string;
  title: string;
  description: string;
  duration: string;
  thumbnailUrl: string;
  channelTitle: string;
  publishedAt: string;
}

/**
 * Extrae el ID del video de una URL de YouTube
 * Soporta formatos: youtube.com/watch?v=ID, youtu.be/ID, youtube.com/embed/ID
 */
export function extractVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/watch\?.*v=([a-zA-Z0-9_-]{11})/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}

/**
 * Convierte duración ISO 8601 (PT1H2M10S) a formato legible (1h 2m 10s)
 */
function parseDuration(isoDuration: string): string {
  const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  
  if (!match) return 'Duración desconocida';

  const hours = match[1] ? parseInt(match[1]) : 0;
  const minutes = match[2] ? parseInt(match[2]) : 0;
  const seconds = match[3] ? parseInt(match[3]) : 0;

  const parts = [];
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (seconds > 0) parts.push(`${seconds}s`);

  return parts.join(' ') || '0s';
}

/**
 * Obtiene información detallada de un video usando YouTube Data API v3
 * Falls back to ytdl if API key is not configured
 * NOTE: This requires googleapis package and YOUTUBE_API_KEY to be installed
 */
export async function getVideoInfo(videoId: string): Promise<YouTubeVideoInfo> {
  // If YouTube API is configured, use it
  if (youtube) {
    try {
      const response = await youtube.videos.list({
        part: ['snippet', 'contentDetails', 'status'],
        id: [videoId],
      });

      if (!response.data.items || response.data.items.length === 0) {
        throw new Error('Video no encontrado');
      }

      const video = response.data.items[0];
      const snippet = video.snippet;
      const contentDetails = video.contentDetails;
      const status = video.status;

      // Verificar si el video está disponible
      if (status?.uploadStatus !== 'processed') {
        throw new Error('El video aún está siendo procesado por YouTube');
      }

      if (status?.privacyStatus === 'private') {
        throw new Error('Este video es privado y no puede ser accedido');
      }

      // Obtener la mejor calidad de thumbnail disponible
      const thumbnails = snippet?.thumbnails;
      const thumbnailUrl =
        thumbnails?.maxres?.url ||
        thumbnails?.standard?.url ||
        thumbnails?.high?.url ||
        thumbnails?.medium?.url ||
        thumbnails?.default?.url ||
        `https://i.ytimg.com/vi/${videoId}/sddefault.jpg`;

      const duration = contentDetails?.duration
        ? parseDuration(contentDetails.duration)
        : 'Duración desconocida';

      return {
        id: videoId,
        url: `https://www.youtube.com/watch?v=${videoId}`,
        title: snippet?.title || 'Título no disponible',
        description: snippet?.description || '',
        duration,
        thumbnailUrl,
        channelTitle: snippet?.channelTitle || 'Canal desconocido',
        publishedAt: snippet?.publishedAt || '',
      };
    } catch (error: any) {
      // Manejar errores específicos de la API
      if (error.code === 403) {
        throw new Error(
          'Error de permisos: Verifica que tu API Key tenga habilitada la YouTube Data API v3'
        );
      }

      if (error.code === 400) {
        throw new Error('ID de video inválido');
      }

      if (error.code === 404) {
        throw new Error('Video no encontrado o eliminado');
      }

      if (error.code === 429) {
        throw new Error(
          'Límite de cuota de YouTube API alcanzado. Por favor, intenta más tarde.'
        );
      }

      // Si hay error, fallback to ytdl
      console.warn('YouTube API error, falling back to ytdl:', error.message);
    }
  }

  // Fallback: Use ytdl to get basic info (will be done in validate-youtube route)
  // This function is mainly for API-based validation
  throw new Error('YouTube API no configurada. Use ytdl directamente en las rutas API.');
}

/**
 * Valida una URL de YouTube y retorna la información del video
 */
export async function validateYouTubeUrl(url: string): Promise<YouTubeVideoInfo> {
  const videoId = extractVideoId(url);

  if (!videoId) {
    throw new Error(
      'URL de YouTube inválida. Formatos soportados: youtube.com/watch?v=ID, youtu.be/ID'
    );
  }

  return await getVideoInfo(videoId);
}

/**
 * Verifica si la API Key está configurada correctamente
 */
export function isYouTubeApiConfigured(): boolean {
  return (
    !!YOUTUBE_API_KEY &&
    YOUTUBE_API_KEY !== 'YOUR_YOUTUBE_API_KEY_HERE' &&
    YOUTUBE_API_KEY.trim().length > 0 &&
    !!youtube
  );
}

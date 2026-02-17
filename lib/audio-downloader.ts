import ytdlp from 'yt-dlp-exec'
import { join } from 'path'
import { tmpdir } from 'os'

export const MAX_VIDEO_DURATION = 7200 // 2 hours in seconds

export interface DownloadResponse {
  audioPath: string
  duration: number
  title: string
}

function isValidYouTubeUrl(url: string): boolean {
  const patterns = [
    /^https?:\/\/(www\.)?youtube\.com\/watch\?v=[\w-]+/,
    /^https?:\/\/youtu\.be\/[\w-]+/,
    /^https?:\/\/(www\.)?youtube\.com\/embed\/[\w-]+/,
  ]
  return patterns.some(pattern => pattern.test(url))
}

export async function downloadYouTubeAudio(youtubeUrl: string): Promise<DownloadResponse> {
  if (!youtubeUrl || typeof youtubeUrl !== 'string') {
    throw new Error('YouTube URL required')
  }

  if (!isValidYouTubeUrl(youtubeUrl)) {
    throw new Error('Invalid YouTube URL format')
  }

  console.log('[Audio Downloader] Fetching video info...')

  // Get video info first
  const info = await ytdlp(youtubeUrl, {
    dumpSingleJson: true,
    noCheckCertificate: true,
    noWarnings: true,
    preferFreeFormats: true,
  })

  // Ensure duration is treated as a number
  const duration = typeof info.duration === 'string'
    ? parseFloat(info.duration)
    : (typeof info.duration === 'number' ? info.duration : 0)

  const title = info.title || 'Unknown'

  if (duration > MAX_VIDEO_DURATION) {
    throw new Error(`Video too long (${Math.floor(duration / 60)} min). Max: ${MAX_VIDEO_DURATION / 60} min`)
  }

  console.log('[Audio Downloader] Downloading audio:', title, `(${duration}s)`)

  // Download audio to temp directory
  const tempDir = tmpdir()
  const audioPath = join(tempDir, `audio-${Date.now()}.mp3`)

  await ytdlp(youtubeUrl, {
    extractAudio: true,
    audioFormat: 'mp3',
    audioQuality: 0,
    output: audioPath,
    noCheckCertificate: true,
    noWarnings: true,
    preferFreeFormats: true,
  })

  console.log('[Audio Downloader] Audio downloaded to:', audioPath)

  return {
    audioPath,
    duration,
    title,
  }
}

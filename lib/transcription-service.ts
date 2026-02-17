import Groq from 'groq-sdk'
import { readFile } from 'fs/promises'
import { statSync } from 'fs'

const GROQ_API_KEY = process.env.GROQ_API_KEY || ''
const MAX_FILE_SIZE = 25 * 1024 * 1024 // 25MB (Groq limit)

export async function transcribeAudio(audioPath: string): Promise<string> {
  if (!GROQ_API_KEY) {
    throw new Error('GROQ_API_KEY not configured')
  }

  if (!audioPath) {
    throw new Error('Audio path required')
  }

  console.log('[Transcription Service] Checking audio file:', audioPath)

  // Check file size
  try {
    const stats = statSync(audioPath)
    if (stats.size > MAX_FILE_SIZE) {
      throw new Error(`Audio file too large (${Math.floor(stats.size / 1024 / 1024)}MB). Max: 25MB. Try a shorter video.`)
    }
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      throw new Error('Audio file not found')
    }
    throw error
  }

  console.log('[Transcription Service] Transcribing with Groq Whisper...')

  const groq = new Groq({ apiKey: GROQ_API_KEY })

  // Read audio file
  const audioBuffer = await readFile(audioPath)
  const audioFile = new File([audioBuffer], 'audio.mp3', { type: 'audio/mpeg' })

  try {
    // Transcribe with Groq Whisper
    const transcription = await groq.audio.transcriptions.create({
      file: audioFile,
      model: 'whisper-large-v3',
      language: 'es',
      response_format: 'text',
      temperature: 0.0,
    })

    let fullText = ''
    if (typeof transcription === 'string') {
      fullText = transcription
    } else if (transcription && typeof transcription === 'object' && 'text' in transcription) {
      fullText = (transcription as any).text
    } else {
      fullText = String(transcription)
    }

    console.log('[Transcription Service] Transcription complete, length:', fullText.length)

    if (!fullText || fullText.trim().length === 0) {
      throw new Error('No transcription generated')
    }

    return fullText.trim()

  } catch (error: any) {
    const errorMessage = error.message || String(error)
    console.error('[Transcription Service] Error:', errorMessage)

    // Propagate specific errors
    if (errorMessage.includes('rate limit') || errorMessage.includes('429')) {
      throw new Error('API rate limit exceeded. Wait a few minutes.')
    }

    if (errorMessage.includes('quota')) {
      throw new Error('API quota exceeded. Check your Groq usage.')
    }

    throw error
  }
}

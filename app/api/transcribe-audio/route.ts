import { NextRequest, NextResponse } from 'next/server'
import Groq from 'groq-sdk'

export const runtime = 'nodejs'
export const maxDuration = 300 // 60 seconds timeout for transcription per chunk

const GROQ_API_KEY = process.env.GROQ_API_KEY || ''
const CHUNK_DURATION_SECONDS = 1200 // 20 minutes
const MAX_RETRIES = 3
const RETRY_DELAY_MS = 2000

interface TranscribeRequest {
  youtubeUrl: string
}

interface TranscribeResponse {
  text: string
  segmentCount: number
}

interface DownloadResponse {
  audioBase64: string
  durationSeconds: number
}

// Chunk audio buffer into segments
function chunkAudioBuffer(audioBuffer: Buffer, durationSeconds: number): Buffer[] {
  if (durationSeconds <= CHUNK_DURATION_SECONDS) {
    return [audioBuffer]
  }

  const chunks: Buffer[] = []
  const totalBytes = audioBuffer.length
  const bytesPerSecond = totalBytes / durationSeconds
  const bytesPerChunk = Math.floor(bytesPerSecond * CHUNK_DURATION_SECONDS)

  for (let i = 0; i < totalBytes; i += bytesPerChunk) {
    const end = Math.min(i + bytesPerChunk, totalBytes)
    chunks.push(audioBuffer.slice(i, end))
  }

  return chunks
}

// Transcribe a single audio chunk with retry logic and timeout
async function transcribeChunk(
  groq: Groq,
  audioBase64: string,
  chunkIndex: number,
  retryCount = 0
): Promise<string> {
  try {
    const audioBuffer = Buffer.from(audioBase64, 'base64')
    
    // Convert Buffer to ArrayBuffer for File constructor compatibility
    const arrayBuffer = audioBuffer.buffer.slice(
      audioBuffer.byteOffset,
      audioBuffer.byteOffset + audioBuffer.byteLength
    ) as ArrayBuffer
    const audioFile = new File([arrayBuffer], `chunk-${chunkIndex}.m4a`, {
      type: 'audio/m4a',
    })

    // Use OpenAI-compatible transcription API with timeout (60 seconds)
    const transcriptionPromise = groq.audio.transcriptions.create({
      file: audioFile as any,
      model: 'whisper-large-v3',
      language: 'es',
      response_format: 'text',
    })

    const timeoutPromise = new Promise<typeof transcriptionPromise>((_, reject) => {
      setTimeout(() => reject(new Error('Transcription timeout after 60 seconds')), 60000)
    })

    const transcription = await Promise.race([transcriptionPromise, timeoutPromise])

    // Handle different response formats
    if (typeof transcription === 'string') {
      return transcription
    } else if (transcription && typeof transcription === 'object' && 'text' in transcription) {
      return (transcription as any).text
    } else {
      return String(transcription)
    }
  } catch (error: any) {
    const errorMessage = error.message || String(error)
    
    // Retry on rate limit or temporary errors
    if (
      (errorMessage.includes('rate limit') || 
       errorMessage.includes('429') ||
       errorMessage.includes('timeout') ||
       errorMessage.includes('network')) &&
      retryCount < MAX_RETRIES
    ) {
      console.log(`Retrying chunk ${chunkIndex}, attempt ${retryCount + 1}/${MAX_RETRIES}`)
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS * (retryCount + 1)))
      return transcribeChunk(groq, audioBase64, chunkIndex, retryCount + 1)
    }

    throw new Error(`Failed to transcribe chunk ${chunkIndex}: ${errorMessage}`)
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: TranscribeRequest = await request.json()
    const { youtubeUrl } = body

    // Validate request
    if (!youtubeUrl || typeof youtubeUrl !== 'string') {
      return NextResponse.json(
        { error: 'YouTube URL is required' },
        { status: 400 }
      )
    }

    // Initialize Groq client
    const groq = new Groq({
      apiKey: GROQ_API_KEY,
    })

    try {
      // Step 1: Download audio from YouTube
      const downloadResponse = await fetch(`${request.nextUrl.origin}/api/download-youtube-audio`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ youtubeUrl }),
      })

      if (!downloadResponse.ok) {
        const errorData = await downloadResponse.json()
        return NextResponse.json(
          { error: `Failed to download audio: ${errorData.error || 'Unknown error'}` },
          { status: downloadResponse.status }
        )
      }

      const downloadData: DownloadResponse = await downloadResponse.json()
      const { audioBase64, durationSeconds } = downloadData

      if (!audioBase64) {
        return NextResponse.json(
          { error: 'No audio data received from download' },
          { status: 500 }
        )
      }

      // Step 2: Determine if chunking is needed
      const audioBuffer = Buffer.from(audioBase64, 'base64')
      const needsChunking = durationSeconds > CHUNK_DURATION_SECONDS

      let transcriptions: string[] = []

      if (needsChunking) {
        // Chunk the audio
        const chunks = chunkAudioBuffer(audioBuffer, durationSeconds)
        console.log(`Processing ${chunks.length} chunks for ${durationSeconds}s video`)

        // Process chunks sequentially to avoid rate limits
        for (let i = 0; i < chunks.length; i++) {
          const chunkBase64 = chunks[i].toString('base64')
          console.log(`Transcribing chunk ${i + 1}/${chunks.length}`)
          
          const chunkText = await transcribeChunk(groq, chunkBase64, i)
          transcriptions.push(chunkText.trim())
          
          // Small delay between chunks to avoid rate limits
          if (i < chunks.length - 1) {
            await new Promise(resolve => setTimeout(resolve, 1000))
          }
        }
      } else {
        // Single transcription
        console.log('Transcribing single audio file')
        const transcription = await transcribeChunk(groq, audioBase64, 0)
        transcriptions.push(transcription.trim())
      }

      // Step 3: Concatenate all transcriptions
      const fullText = transcriptions
        .filter(text => text.length > 0)
        .join('\n\n')
        .trim()

      if (!fullText) {
        return NextResponse.json(
          { error: 'No transcription text was generated' },
          { status: 500 }
        )
      }

      const response: TranscribeResponse = {
        text: fullText,
        segmentCount: transcriptions.length,
      }

      return NextResponse.json(response, {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      })
    } catch (error: any) {
      const errorMessage = error.message || String(error)
      console.error('Transcription error:', errorMessage)

      if (errorMessage.includes('rate limit') || errorMessage.includes('429')) {
        return NextResponse.json(
          { error: 'API rate limit exceeded. Please try again in a few moments.' },
          { status: 429 }
        )
      }

      if (errorMessage.includes('timeout')) {
        return NextResponse.json(
          { error: 'Transcription timed out. The audio may be too long.' },
          { status: 408 }
        )
      }

      return NextResponse.json(
        { error: `Transcription failed: ${errorMessage}` },
        { status: 500 }
      )
    }
  } catch (error: any) {
    console.error('Request processing error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}


import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { extractYouTubeId, isValidYouTubeUrl } from '@/lib/utils'
import Groq from 'groq-sdk'
import { GoogleGenerativeAI } from '@google/generative-ai'
import ytdl from '@distube/ytdl-core'
import { Readable } from 'stream'

export const runtime = 'nodejs'
export const maxDuration = 300

const GROQ_API_KEY = process.env.GROQ_API_KEY || ''
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || ''

function streamToBuffer(stream: Readable): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = []
    stream.on('data', (chunk) => chunks.push(chunk))
    stream.on('end', () => resolve(Buffer.concat(chunks)))
    stream.on('error', reject)
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { youtubeUrl, singerName } = body

    if (!youtubeUrl || typeof youtubeUrl !== 'string') {
      return NextResponse.json({ error: 'YouTube URL is required' }, { status: 400 })
    }

    if (!isValidYouTubeUrl(youtubeUrl)) {
      return NextResponse.json({ error: 'Invalid YouTube URL' }, { status: 400 })
    }

    const videoId = extractYouTubeId(youtubeUrl)
    if (!videoId) {
      return NextResponse.json({ error: 'Could not extract video ID' }, { status: 400 })
    }

    let video = await prisma.video.findUnique({ where: { youtubeId: videoId } })

    if (video && video.status === 'COMPLETED') {
      return NextResponse.json({ videoId: video.id, status: video.status })
    }

    if (!video) {
      video = await prisma.video.create({
        data: {
          youtubeId: videoId,
          youtubeUrl,
          title: '',
          duration: '0',
          status: 'PENDING',
        },
      })
    } else {
      video = await prisma.video.update({
        where: { id: video.id },
        data: { status: 'PENDING' },
      })
    }

    processVideoAsync(video.id, youtubeUrl, videoId, singerName).catch((error) => {
      console.error('Async processing error:', error)
      prisma.video.update({ where: { id: video!.id }, data: { status: 'ERROR' } })
    })

    return NextResponse.json({ videoId: video.id, status: 'PENDING' })
  } catch (error: any) {
    console.error('Process video error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

async function processVideoAsync(
  videoId: string,
  youtubeUrl: string,
  youtubeVideoId: string,
  singerName?: string
) {
  try {
    await prisma.video.update({ where: { id: videoId }, data: { status: 'DOWNLOADING' } })

    const info = await ytdl.getInfo(youtubeUrl)
    const duration = String(Math.floor(parseInt(info.videoDetails.lengthSeconds) || 0))
    const title = info.videoDetails.title

    await prisma.video.update({ where: { id: videoId }, data: { title, duration } })

    const audioStream = ytdl(youtubeUrl, { quality: 'highestaudio', filter: 'audioonly' })
    const audioBuffer = await streamToBuffer(audioStream)

    await prisma.video.update({ where: { id: videoId }, data: { status: 'TRANSCRIBING' } })

    const groq = new Groq({ apiKey: GROQ_API_KEY })
    const arrayBuffer = audioBuffer.buffer.slice(
      audioBuffer.byteOffset,
      audioBuffer.byteOffset + audioBuffer.byteLength
    ) as ArrayBuffer
    const audioFile = new File([arrayBuffer], `${youtubeVideoId}.m4a`, { type: 'audio/m4a' })

    const transcription = await groq.audio.transcriptions.create({
      file: audioFile as any,
      model: 'whisper-large-v3',
      language: 'es',
      response_format: 'text',
    })

    const transcript =
      typeof transcription === 'string'
        ? transcription
        : (transcription as any).text || String(transcription)

    await prisma.video.update({ where: { id: videoId }, data: { transcript } })

    await prisma.video.update({ where: { id: videoId }, data: { status: 'ANALYZING' } })

    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY)
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' })

    const prompt = `Format this Spanish transcript into traditional décimas.

Requirements:
- ABBAACCDDC rhyme scheme
- Exactly 8 syllables per verse
- Group into stanzas of 10 verses each
- Add poet/author name before each décima
- Number each décima sequentially
- Select the TOP 4 best décimas and provide brief analysis explaining why they're the best (rhyme quality, meaning, cultural significance)
- Preserve the original meaning and flow

${singerName ? `The singer/poet who begins is: ${singerName}` : ''}

Transcript:
${transcript}`

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: { maxOutputTokens: 8192, temperature: 0.7 },
    })

    await prisma.video.update({
      where: { id: videoId },
      data: { status: 'COMPLETED', processedAt: new Date() },
    })
  } catch (error: any) {
    console.error('Processing error:', error)
    await prisma.video.update({ where: { id: videoId }, data: { status: 'ERROR' } })
    throw error
  }
}

import express from 'express';
import { exec } from 'child_process';
import { promisify } from 'util';
import { readFileSync, existsSync } from 'fs';
import { unlink } from 'fs/promises';
import { tmpdir } from 'os';
import { join } from 'path';
import Groq from 'groq-sdk';
import cors from 'cors';
import ytDlp from 'youtube-dl-exec';

const execAsync = promisify(exec);
const app = express();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'Viajera Transcription API' });
});

app.post('/api/transcribe', async (req, res) => {
  const tempFiles = [];
  const startTime = Date.now();

  try {
    const { youtube_url } = req.body;
    
    // Validación
    if (!youtube_url?.includes('youtube.com') && !youtube_url?.includes('youtu.be')) {
      return res.status(400).json({ success: false, error: 'URL de YouTube inválida' });
    }

    console.log('📥 [INICIO] Procesando:', youtube_url);
    
    // 1. DESCARGAR AUDIO
    const audioId = `audio_${Date.now()}`;
    const audioPath = join(tmpdir(), `${audioId}.mp3`);
    tempFiles.push(audioPath);

    await ytDlp(youtube_url, {
      extractAudio: true,
      audioFormat: 'mp3',
      audioQuality: 128,
      output: audioPath,
      noPlaylist: true,
    });

    console.log('✅ [DESCARGA] Audio guardado:', audioPath);

    // 2. OBTENER DURACIÓN
    const { stdout: durationStr } = await execAsync(
      `ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${audioPath}"` 
    );
    const durationSeconds = parseFloat(durationStr.trim());
    const durationMinutes = Math.round(durationSeconds / 60);
    
    console.log(`⏱️ [DURACIÓN] ${durationMinutes} minutos (${durationSeconds}s)`);

    // 3. CHUNKING SI ES NECESARIO
    let chunkPaths = [];
    const chunkDuration = 1200; // 20 minutos

    if (durationSeconds > chunkDuration) {
      console.log('✂️ [CHUNKING] Dividiendo audio...');
      
      const chunkPattern = join(tmpdir(), `${audioId}_chunk_%03d.mp3`);
      await execAsync(
        `ffmpeg -i "${audioPath}" -f segment -segment_time ${chunkDuration} -c copy "${chunkPattern}" -y` 
      );

      const numChunks = Math.ceil(durationSeconds / chunkDuration);
      for (let i = 0; i < numChunks; i++) {
        const chunkPath = join(tmpdir(), `${audioId}_chunk_${String(i).padStart(3, '0')}.mp3`);
        if (existsSync(chunkPath)) {
          chunkPaths.push(chunkPath);
          tempFiles.push(chunkPath);
        }
      }
      
      console.log(`✅ [CHUNKING] ${chunkPaths.length} chunks creados`);
    } else {
      chunkPaths = [audioPath];
      console.log('✅ [CHUNKING] No necesario, audio dentro de límite');
    }

    // 4. TRANSCRIBIR CADA CHUNK
    console.log('🎤 [TRANSCRIPCIÓN] Iniciando...');
    const transcripts = [];

    for (let i = 0; i < chunkPaths.length; i++) {
      console.log(`   📝 Chunk ${i + 1}/${chunkPaths.length}...`);
      
      const audioBuffer = readFileSync(chunkPaths[i]);
      const audioFile = new File([audioBuffer], 'audio.mp3', { type: 'audio/mpeg' });

      try {
        const result = await groq.audio.transcriptions.create({
          file: audioFile,
          model: 'whisper-large-v3',
          language: 'es',
        });
        transcripts.push(result);
        console.log(`   ✅ Chunk ${i + 1} completado (${result.length} caracteres)`);
      } catch (error) {
        console.log(`   ⚠️ Chunk ${i + 1} falló: ${error.message}`);
        // Continuar con siguientes chunks
      }
    }

    const fullTranscript = transcripts.join(' ').trim();
    console.log(`✅ [TRANSCRIPCIÓN] Completa: ${fullTranscript.length} caracteres`);

    // 5. FORMATEAR DÉCIMAS ESPINELAS
    console.log('📝 [FORMATEO] Identificando décimas...');
    
    const formattingResult = await groq.chat.completions.create({
      model: 'llama-3.1-70b-versatile',
      messages: [
        {
          role: 'system',
          content: 'Eres experto en repentismo cubano. Respondes SOLO con JSON válido sin markdown.'
        },
        {
          role: 'user',
          content: `Analiza esta transcripción de controversia de repentismo cubano. Identifica cada décima espinela (10 versos de 8 sílabas con rima abbaaccddc).

Responde con JSON:
{
  "secciones": [
    {
      "tipo": "decima" | "conversacion",
      "decimista": "nombre del decimista o Decimista 1/2",
      "versos": ["verso1", "verso2", ..., "verso10"] | null,
      "texto": "texto completo de esta sección",
      "timestamp": "MM:SS"
    }
  ],
  "total_decimas": número,
  "decimistas": ["nombre1", "nombre2"]
}

Duración del video: ${durationMinutes} minutos.
Calcula timestamps aproximados proporcionalmente.

TRANSCRIPCIÓN:
${fullTranscript}`
        }
      ],
      temperature: 0.2,
      max_tokens: 8000,
    });

    let formatted;
    try {
      let jsonText = formattingResult.choices.message.content;
      // Limpiar markdown si existe
      const match = jsonText.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
      if (match) jsonText = match;[1]
      formatted = JSON.parse(jsonText);
      console.log(`✅ [FORMATEO] ${formatted.total_decimas || 0} décimas identificadas`);
    } catch (e) {
      console.log(`⚠️ [FORMATEO] Error parseando JSON: ${e.message}`);
      formatted = { 
        secciones: [{ tipo: 'conversacion', texto: fullTranscript, timestamp: '00:00' }], 
        total_decimas: 0,
        decimistas: [],
        error: 'No se pudo formatear'
      };
    }

    // 6. LIMPIAR ARCHIVOS TEMPORALES
    console.log('🧹 [LIMPIEZA] Eliminando archivos temporales...');
    let deletedCount = 0;
    const results = await Promise.allSettled(tempFiles.map(file => unlink(file)));

    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        deletedCount++;
      } else {
        console.log(`   ⚠️ No se pudo eliminar: ${tempFiles[index]}`);
      }
    });
    console.log(`✅ [LIMPIEZA] ${deletedCount}/${tempFiles.length} archivos eliminados`);

    const processingTime = ((Date.now() - startTime) / 1000).toFixed(1);
    console.log(`✅ [FIN] Procesamiento completado en ${processingTime}s`);

    // 7. RESPUESTA
    res.json({
      success: true,
      video_url: youtube_url,
      duracion_minutos: durationMinutes,
      transcript: fullTranscript,
      decimas: formatted.secciones || [],
      stats: {
        total_decimas: formatted.total_decimas || 0,
        decimistas: formatted.decimistas || [],
        chunks_procesados: chunkPaths.length,
        tiempo_proceso_segundos: parseFloat(processingTime),
        caracteres_transcritos: fullTranscript.length
      }
    });

  } catch (error) {
    console.error('❌ [ERROR]:', error);
    
    // Limpiar archivos en caso de error
    await Promise.allSettled(tempFiles.map(file => unlink(file)));
    
    res.status(500).json({ 
      success: false, 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Viajera Transcription API corriendo en puerto ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
  console.log(`📍 Endpoint: POST http://localhost:${PORT}/api/transcribe`);
});

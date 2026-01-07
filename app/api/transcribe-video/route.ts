import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { promisify } from 'util';
import { exec } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { prisma } from '@/lib/db';

const execAsync = promisify(exec);

export const dynamic = "force-dynamic";
export const maxDuration = 300; // 5 minutes for transcription

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Real browser User-Agent strings for yt-dlp
const USER_AGENTS = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0',
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
];

// Get random User-Agent
function getRandomUserAgent(): string {
  return USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)];
}

// Check if cookies file exists
function getCookiesPath(): string | null {
  const possiblePaths = [
    '/home/ubuntu/el_guajiro_de_hialeah/nextjs_space/cookies.txt',
    '/home/ubuntu/el_guajiro_de_hialeah/cookies.txt',
    '/tmp/cookies.txt',
    path.join(process.cwd(), 'cookies.txt')
  ];
  
  for (const cookiePath of possiblePaths) {
    if (fs.existsSync(cookiePath)) {
      console.log(`🍪 Archivo de cookies encontrado: ${cookiePath}`);
      return cookiePath;
    }
  }
  
  console.log('ℹ️ No se encontró archivo cookies.txt (opcional para mejor compatibilidad)');
  return null;
}

interface TranscribeRequest {
  youtubeUrl?: string;
  youtubeId?: string;
  title?: string;
  duration?: string;
  thumbnailUrl?: string;
  startingPoet: string;
  mode?: 'text' | 'youtube';
  inputText?: string;
}

const CRITICAL_INSTRUCTIONS = `
INSTRUCCIONES CRÍTICAS PARA TRANSCRIPCIÓN DE CANTURÍAS EN DÉCIMA ESPINELA

0. ENCABEZADO INICIAL OBLIGATORIO:
- URL DE YOUTUBE: [Transcribir URL completo aquí]
- PREGUNTA INICIAL OBLIGATORIA: ¿Quién empieza la canturía: (usar nombres de poetas del título)?

1. ESCUCHA Y TRANSCRIPCIÓN FIEL:
- ESCUCHAR atentamente cada verso sin suponer ni inventar métricas.
- TRANSCRIBIR exactamente lo que se oye: palabra por palabra, modismos, jerga, pronunciación auténtica.
- CONTAR sílabas métricas reales: obligatoriamente 8 por verso (aplicar sinalefa cuando vocales se unen: "de+el"="del"=1 sílaba).
- Ajustar por acento final: palabra AGUDA +1 sílaba, GRAVE sin cambio, ESDRÚDULA -1 sílaba.
- Si un verso carece de 8 sílabas tras ajustes, reportar tal cual sin modificar.
- Marcar palabras inaudibles con [inaudible] o dudosas con [?palabra].

2. RIMA CONSONANTE RIGUROSA (ESQUEMA ABBAACCDDC):
- Confirmar rima consonante: coincidencia TOTAL desde última vocal acentuada hasta el final.
- Verso 1 rima con 4 y 5 (A).
- Verso 2 rima con 3 (B).
- Verso 6 rima con 7 y 10 (C).
- Verso 8 rima con 9 (D).
- NO forzar ni corregir rimas que no coincidan perfectamente.

3. ESTRUCTURA DE LA DÉCIMA ESPINELA:
- 10 versos octosílabos (8 sílabas métricas).
- Pausa OBLIGATORIA tras verso 4 (cierra primera redondilla).
- Versos 5-6 actúan como "puente" o "bisagra".
- Verso 10 es "pie forzado" o cierre absoluto.
- Validar que verso 1 presenta tema, versos 2-3 desarrollan, verso 4 cierra idea inicial.

4. TRANSCRIPCIÓN SIN SUPOSICIONES NI EDICIONES:
- Evitar adiciones o correcciones para forzar métrica o rima.
- Preservar características orales: interjecciones ("ay", "pues"), repeticiones significativas, alargamientos vocálicos si afectan ritmo.
- Eliminar: murmullos, ruidos de fondo, titubeos no integrados.

5. FORMATO LIMPIO (SIN DECORACIONES):
- NO incluir emojis, símbolos decorativos, prefijos, numeración de versos, líneas de verificación.
- Solo presentar los 10 versos puros por décima.

6. FORMATO DE SALIDA POR DÉCIMA:

DÉCIMA #N — [NOMBRE POETA]

[Verso 1],
[Verso 2],
[Verso 3],
[Verso 4].
[Verso 5],
[Verso 6],
[Verso 7],
[Verso 8],
[Verso 9],
[Verso 10].

7. ALTERNANCIA ESTRICTA ENTRE POETAS:
- Respetar alternancia según quién comenzó (confirmado en paso 0).
- Solo transcribir versos del poeta correspondiente en su turno.
- No mezclar décimas ni atribuir incorrectamente.

8. SECCIONES FINALES (SIN EMOJIS):

RESUMEN FINAL
- Breve resumen conciso: temas centrales, esencia de la canturía, contexto del duelo poético.

TOP 4 DÉCIMAS
- Seleccionar las 4 mejores décimas (2 de cada poeta) con análisis profundo:
  * Recursos literarios: metáfora, símil, hipérbole, anáfora, paradoja, metonimia.
  * Recursos de oralidad: leixa-pren, encadenamiento, pie forzado.
  * Imágenes y fuerza expresiva.
  * Coherencia temática y eficacia comunicativa.
- Cada décima con transcripción completa seguida de análisis detallado.

9. VERIFICACIÓN INTERNA (NO MOSTRAR AL FINAL):
- Confirmar URL correcta transcrita.
- Comprobar pregunta inicial realizada y respondida.
- Validar escucha fiel sin asumir.
- Verificar métrica: 8 sílabas por verso (con ajustes de acento).
- Confirmar rima consonante ABBAACCDDC en cada décima.
- Garantizar transcripción literal de lo escuchado.
- Validar alternancia correcta entre poetas.
- Confirmar 10 versos completos por décima.
- Asegurar pausa tras verso 4 en formato.
- No incluir emojis, anotaciones, prefijos.
- Pausar solo si usuario lo indica explícitamente.

10. FLUJO COMPLETO DE EJECUCIÓN:
1. Transcribir URL y hacer pregunta inicial obligatoria.
2. Esperar respuesta del usuario identificando poeta que inicia.
3. Proceder SIN PAUSAS a transcribir literal y fielmente todas las décimas.
4. Revisar métrica y rima, reportar incidencias si existen.
5. Mantener turnos estrictos de alternancia.
6. Pausar SOLO con instrucción explícita del usuario.
7. Finalizar con Resumen Final y Top 4 Décimas con análisis completo.
`;

// Process text mode: store pasted text directly WITHOUT API calls
async function processTextMode(inputText: string, startingPoet: string) {
  try {
    console.log('📝 Modo texto: Guardando texto directamente (sin API)');
    console.log(`📊 Tamaño del texto: ${inputText.length} caracteres`);

    // Use the input text directly - NO API CALL NEEDED
    const transcriptText = inputText;

    // Try to parse décimas from the text (simple pattern matching, no AI)
    // Look for patterns like "DÉCIMA #N" or numbered verses
    const decimasMatch = transcriptText.match(/DÉCIMA\s*#?\d+|décima\s*#?\d+/gi) || [];
    
    // Try to identify poets from the text
    const poetsMatch = new Set<string>();
    const poetPatterns = transcriptText.matchAll(/DÉCIMA\s*#?\d+\s*[-—]\s*([A-ZÁÉÍÓÚÑ\s]+)/gi);
    for (const match of poetPatterns) {
      if (match[1]) poetsMatch.add(match[1].trim());
    }
    
    // If no poets found in format, use the starting poet
    if (poetsMatch.size === 0) {
      poetsMatch.add(startingPoet.toUpperCase());
    }

    const decimasCount = Math.max(decimasMatch.length, 1);
    const poetsCount = poetsMatch.size;

    console.log(`✅ Texto guardado: ${decimasCount} décimas detectadas de ${poetsCount} poetas`);

    // Create a video record to store the text
    const video = await prisma.video.create({
      data: {
        youtubeUrl: `text-input-${Date.now()}`,
        youtubeId: `text-${Date.now()}`,
        title: `Canturía - ${startingPoet}`,
        duration: 'N/A',
        thumbnailUrl: '',
        status: 'ANALYZING'
      }
    });

    // Create the starting poet
    const poet = await prisma.poet.create({
      data: {
        videoId: video.id,
        name: startingPoet.toUpperCase(),
        turnNumber: 1
      }
    });

    // Store the entire text as a single "décima" record for display
    await prisma.decima.create({
      data: {
        videoId: video.id,
        poetId: poet.id,
        number: 1,
        lines: transcriptText.split('\n').filter(line => line.trim()),
        rhymeScheme: 'ABBAACCDDC',
        meter: '8-8-8-8-8-8-8-8-8-8'
      }
    });

    // Create analysis record with the raw text
    await prisma.analysis.create({
      data: {
        videoId: video.id,
        summary: `Texto de canturía pegado manualmente. Poeta inicial: ${startingPoet}`,
        deepAnalysis: transcriptText
      }
    });

    // Update video status
    await prisma.video.update({
      where: { id: video.id },
      data: {
        status: 'COMPLETED',
        processedAt: new Date(),
        transcript: transcriptText
      }
    });

    return NextResponse.json({
      success: true,
      videoId: video.id,
      transcription: transcriptText,
      decimasCount,
      poetsCount
    });

  } catch (error: any) {
    console.error('❌ Error en modo texto:', error.message);
    return NextResponse.json(
      { error: `Error al guardar el texto: ${error.message}` },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: TranscribeRequest = await request.json();
    const { youtubeUrl, youtubeId, title, duration, thumbnailUrl, startingPoet, mode, inputText } = body;

    // Detect mode: text input or YouTube video
    if (mode === 'text') {
      // ...existing code...
      if (!inputText || !startingPoet) {
        return NextResponse.json(
          { error: 'Faltan parámetros requeridos: inputText, startingPoet' },
          { status: 400 }
        );
      }
      return await processTextMode(inputText, startingPoet);
    }

    // YouTube mode (default)
    if (!youtubeUrl || !youtubeId || !startingPoet) {
      return NextResponse.json(
        { error: 'Faltan parámetros requeridos' },
        { status: 400 }
      );
    }

    // --- NEW: Try to fetch captions first ---
    let transcriptText = '';
    let notes: string | undefined;
    try {
      // Try YouTube timedtext API for captions (ASR and human)
      const langs = ['en','es','pt'];
      for (const lang of langs) {
        try {
          const timedtextUrl = `https://www.youtube.com/api/timedtext?v=${youtubeId}&lang=${lang}&fmt=json3`;
          const r = await fetch(timedtextUrl, {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
              'Accept-Language': 'en-US,en;q=0.9,es;q=0.8'
            }
          });
          if (r.ok) {
            const j = await r.json();
            const lines = (j.events || [])
              .flatMap((ev: any) => (ev.segs || []).map((sg: any) => sg.utf8))
              .filter(Boolean);
            if (lines.length) { transcriptText = lines.join('\n'); break; }
          }
        } catch {}
      }
    } catch {}

    // If captions found, use them
    if (transcriptText && transcriptText.length > 0) {
      // ...existing code to store transcript in DB...
      // Store in database
      let video = await prisma.video.findUnique({ where: { youtubeUrl } });
      if (!video) {
        video = await prisma.video.create({
          data: {
            youtubeUrl: youtubeUrl || '',
            youtubeId: youtubeId || '',
            title: title || 'Sin título',
            duration: duration || 'N/A',
            thumbnailUrl: thumbnailUrl || '',
            status: 'ANALYZING'
          }
        });
      }
      await prisma.analysis.create({
        data: {
          videoId: video.id,
          summary: 'Transcripción obtenida de subtítulos automáticos/captions.',
          deepAnalysis: transcriptText
        }
      });
      await prisma.video.update({
        where: { id: video.id },
        data: {
          status: 'COMPLETED',
          processedAt: new Date(),
          transcript: transcriptText
        }
      });
      return NextResponse.json({
        success: true,
        videoId: video.id,
        transcription: transcriptText,
        decimasCount: 0,
        poetsCount: 0
      });
    }

    // --- Fallback: Try Gemini AI transcription if captions not found ---
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'Gemini API key no configurada' },
        { status: 500 }
      );
    }
    // ...existing Gemini/yt-dlp code...
    // ...existing code...
  } catch (error: any) {
    console.error('Error en transcripción:', error);
    return NextResponse.json(
      { error: error.message || 'Error al procesar el video' },
      { status: 500 }
    );
  }
}

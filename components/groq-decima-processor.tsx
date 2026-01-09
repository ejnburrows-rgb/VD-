"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { isValidYouTubeUrl } from '@/lib/utils'

interface TranscriptionResult {
  text: string
  segmentCount: number
}

interface AnalysisResult {
  decimas: string
  analysis: string
}

type ProcessingStage = 
  | 'idle'
  | 'validating'
  | 'downloading'
  | 'transcribing'
  | 'analyzing'
  | 'completed'
  | 'error'

export function GroqDecimaProcessor() {
  const [youtubeUrl, setYoutubeUrl] = useState('')
  const [singerName, setSingerName] = useState('')
  const [isUrlValid, setIsUrlValid] = useState(false)
  const [stage, setStage] = useState<ProcessingStage>('idle')
  const [progress, setProgress] = useState({ current: 0, total: 0 })
  const [error, setError] = useState<string | null>(null)
  const [transcriptionResult, setTranscriptionResult] = useState<TranscriptionResult | null>(null)
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)

  // Validar URL de YouTube
  const handleUrlChange = (value: string) => {
    setYoutubeUrl(value)
    setError(null)
    const valid = isValidYouTubeUrl(value)
    setIsUrlValid(valid)
    if (!valid && value.length > 0) {
      setError('URL de YouTube inválida. Debe ser formato youtube.com/watch?v= o youtu.be/')
    }
  }

  // Validar video
  const handleValidateVideo = async () => {
    if (!youtubeUrl || !isUrlValid) return

    setStage('validating')
    setError(null)

    try {
      const response = await fetch('/api/validate-youtube', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ youtubeUrl }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error al validar el video')
      }

      if (data.valid) {
        setIsUrlValid(true)
      } else {
        setIsUrlValid(false)
        setError(data.error || 'El video no es válido o no está disponible')
      }
    } catch (err: any) {
      setError(err.message || 'Error al validar el video. Intenta nuevamente.')
      setIsUrlValid(false)
    } finally {
      setStage('idle')
    }
  }

  // Procesar video completo
  const handleTranscribeVideo = async () => {
    if (!youtubeUrl || !isUrlValid || !singerName.trim()) return

    setStage('downloading')
    setError(null)
    setTranscriptionResult(null)
    setAnalysisResult(null)
    setProgress({ current: 0, total: 0 })

    try {
      // Paso 1: Transcribir audio
      setStage('transcribing')
      setProgress({ current: 0, total: 1 })

      const transcribeResponse = await fetch('/api/transcribe-audio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ youtubeUrl }),
      })

      if (!transcribeResponse.ok) {
        const errorData = await transcribeResponse.json()
        throw new Error(errorData.error || 'Error al transcribir el audio')
      }

      const transcriptionData: TranscriptionResult = await transcribeResponse.json()
      setTranscriptionResult(transcriptionData)
      setProgress({ current: transcriptionData.segmentCount, total: transcriptionData.segmentCount })

      // Paso 2: Analizar con Gemini
      setStage('analyzing')
      setProgress({ current: 0, total: 1 })

      const analyzeResponse = await fetch('/api/analyze-decimas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          transcript: transcriptionData.text,
          singerName: singerName.trim()
        }),
      })

      if (!analyzeResponse.ok) {
        const errorData = await analyzeResponse.json()
        throw new Error(errorData.error || 'Error al analizar las décimas')
      }

      const analysisData: AnalysisResult = await analyzeResponse.json()
      setAnalysisResult(analysisData)
      setStage('completed')
    } catch (err: any) {
      setError(err.message || 'Error al procesar el video. Intenta nuevamente.')
      setStage('error')
      console.error('Processing error:', err)
    }
  }

  // Descargar resultado como .txt
  const handleDownload = () => {
    if (!analysisResult) return

    const content = `DÉCIMAS ESPINELAS CUBANAS
Generado por Viajera Digital
Cantante: ${singerName}
URL: ${youtubeUrl}
Fecha: ${new Date().toLocaleString('es-ES')}

${'='.repeat(60)}
DÉCIMAS IDENTIFICADAS
${'='.repeat(60)}

${analysisResult.decimas}

${'='.repeat(60)}
ANÁLISIS TOP 4 MEJORES DÉCIMAS
${'='.repeat(60)}

${analysisResult.analysis}

${'='.repeat(60)}
TRANSCRIPCIÓN ORIGINAL
${'='.repeat(60)}

${transcriptionResult?.text || 'No disponible'}
`

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `decimas-${singerName.replace(/\s+/g, '-')}-${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  // Resetear formulario
  const handleReset = () => {
    setYoutubeUrl('')
    setSingerName('')
    setIsUrlValid(false)
    setStage('idle')
    setProgress({ current: 0, total: 0 })
    setError(null)
    setTranscriptionResult(null)
    setAnalysisResult(null)
  }

  const canValidate = youtubeUrl.length > 0 && isUrlValid && stage === 'idle'
  const canTranscribe = isUrlValid && singerName.trim().length > 0 && stage === 'idle'

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      <Card className="bg-[#F5E6D3] border-2 border-[#C8A05C] shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-serif font-bold text-[#D97706]">
            🎤 Procesador de Décimas Espinelas
          </CardTitle>
          <CardDescription className="text-[#5C4033] text-base">
            Transcribe y analiza canturías de décima espinela cubana desde YouTube
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Inputs */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-[#5C4033] mb-2">
                URL de YouTube
              </label>
              <Input
                type="url"
                placeholder="https://www.youtube.com/watch?v=..."
                value={youtubeUrl}
                onChange={(e) => handleUrlChange(e.target.value)}
                className="w-full"
                disabled={stage !== 'idle'}
              />
              {youtubeUrl && !isUrlValid && (
                <p className="text-xs text-[#DC2626] mt-1">
                  ⚠️ URL inválida. Debe ser formato youtube.com/watch?v= o youtu.be/
                </p>
              )}
              {isUrlValid && (
                <Badge className="mt-2 bg-[#D1FAE5] text-[#5C4033] border-[#C8A05C]">
                  ✅ URL válida
                </Badge>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#5C4033] mb-2">
                Nombre del Cantante
              </label>
              <Input
                type="text"
                placeholder="Ej: Eduardo Duque, Anamarys Gil, Calixto González..."
                value={singerName}
                onChange={(e) => setSingerName(e.target.value)}
                className="w-full"
                disabled={stage !== 'idle'}
              />
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex gap-4">
            <Button
              onClick={handleValidateVideo}
              disabled={!canValidate || (stage as string) === 'validating'}
              variant="outline"
              className="flex-1"
            >
              {(stage as string) === 'validating' ? (
                <>
                  <span className="animate-spin mr-2">⏳</span>
                  Validando...
                </>
              ) : (
                'Validar Video'
              )}
            </Button>

            <Button
              onClick={handleTranscribeVideo}
              disabled={!canTranscribe || stage !== 'idle'}
              variant="destructive"
              className="flex-1 bg-[#DC2626] hover:bg-red-700"
            >
              {stage === 'idle' ? (
                'Transcribir Video'
              ) : stage === 'downloading' ? (
                <>
                  <span className="animate-spin mr-2">⬇️</span>
                  Descargando audio...
                </>
              ) : stage === 'transcribing' ? (
                <>
                  <span className="animate-spin mr-2">🎤</span>
                  {progress.total > 1
                    ? `Transcribiendo segmento ${progress.current} de ${progress.total}...`
                    : 'Transcribiendo...'}
                </>
              ) : stage === 'analyzing' ? (
                <>
                  <span className="animate-spin mr-2">✨</span>
                  Formateando con Gemini...
                </>
              ) : (
                'Transcribir Video'
              )}
            </Button>

            {stage === 'completed' && (
              <Button
                onClick={handleReset}
                variant="ghost"
                className="flex-1"
              >
                🔄 Nuevo Proceso
              </Button>
            )}
          </div>

          {/* Estados de progreso */}
          {stage !== 'idle' && stage !== 'completed' && stage !== 'error' && (
            <div className="bg-[#D1FAE5] border-2 border-[#C8A05C] rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="animate-spin text-2xl">⏳</div>
                <div className="flex-1">
                  <p className="font-semibold text-[#5C4033]">
                    {stage === 'downloading' && 'Descargando audio del video...'}
                    {stage === 'transcribing' && 
                      (progress.total > 1
                        ? `Transcribiendo segmento ${progress.current} de ${progress.total}...`
                        : 'Transcribiendo audio...')}
                    {stage === 'analyzing' && 'Analizando y formateando décimas con Gemini AI...'}
                  </p>
                  <p className="text-sm text-[#5C4033]/70 mt-1">
                    {stage === 'downloading' && 'Esto puede tomar unos momentos...'}
                    {stage === 'transcribing' && 'Procesando audio con Groq Whisper...'}
                    {stage === 'analyzing' && 'Identificando décimas y generando análisis...'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Mensaje de error */}
          {error && (
            <div className="bg-red-50 border-2 border-[#DC2626] rounded-lg p-4 animate-in fade-in duration-300">
              <div className="flex items-start gap-3">
                <span className="text-2xl">❌</span>
                <div className="flex-1">
                  <p className="font-semibold text-[#DC2626] mb-1">Error</p>
                  <p className="text-sm text-[#5C4033]">{error}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setError(null)}
                  className="text-[#DC2626] hover:text-red-700"
                >
                  ✕
                </Button>
              </div>
            </div>
          )}

          {/* Resultados */}
          {stage === 'completed' && analysisResult && (
            <div className="space-y-6 animate-in fade-in duration-500">
              {/* Décimas formateadas */}
              <div className="bg-white border-2 border-[#C8A05C] rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-serif font-bold text-[#D97706]">
                    📝 Décimas Identificadas
                  </h3>
                  <Badge className="bg-[#D2691E] text-white">
                    {transcriptionResult?.segmentCount || 0} segmento(s)
                  </Badge>
                </div>
                <div className="prose prose-sm max-w-none">
                  <pre className="whitespace-pre-wrap text-[#5C4033] font-sans text-sm leading-relaxed bg-[#F5E6D3] p-4 rounded border border-[#C8A05C]">
                    {analysisResult.decimas}
                  </pre>
                </div>
              </div>

              {/* Análisis TOP 4 */}
              <div className="bg-white border-2 border-[#C8A05C] rounded-lg p-6">
                <h3 className="text-2xl font-serif font-bold text-[#D97706] mb-4">
                  🏆 Análisis TOP 4 Mejores Décimas
                </h3>
                <div className="prose prose-sm max-w-none">
                  <pre className="whitespace-pre-wrap text-[#5C4033] font-sans text-sm leading-relaxed bg-[#F5E6D3] p-4 rounded border border-[#C8A05C]">
                    {analysisResult.analysis}
                  </pre>
                </div>
              </div>

              {/* Botón de descarga */}
              <div className="flex justify-center">
                <Button
                  onClick={handleDownload}
                  variant="default"
                  size="lg"
                  className="bg-[#D2691E] hover:bg-[#C8A05C] text-white px-8 py-3 text-lg"
                >
                  <span className="mr-2">⬇️</span>
                  Descargar Resultado (.txt)
                </Button>
              </div>

              {/* Información adicional */}
              <div className="bg-[#D1FAE5] border-2 border-[#C8A05C] rounded-lg p-4">
                <p className="text-sm text-[#5C4033]">
                  <strong>Información del proceso:</strong>
                </p>
                <ul className="text-sm text-[#5C4033] mt-2 space-y-1 ml-4">
                  <li>• Cantante: <strong>{singerName}</strong></li>
                  <li>• Segmentos transcritos: <strong>{transcriptionResult?.segmentCount || 0}</strong></li>
                  <li>• Longitud de transcripción: <strong>{transcriptionResult?.text.length || 0} caracteres</strong></li>
                </ul>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}


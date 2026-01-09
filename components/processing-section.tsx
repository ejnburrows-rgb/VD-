"use client"

import { useState } from 'react'
import Image from 'next/image'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Badge } from './ui/badge'

type InputMode = 'youtube' | 'text'

export function ProcessingSection() {
  const [inputMode, setInputMode] = useState<InputMode>('youtube')
  const [youtubeUrl, setYoutubeUrl] = useState('')
  const [directText, setDirectText] = useState('')
  const [singerName, setSingerName] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [isValidating, setIsValidating] = useState(false)
  const [videoValid, setVideoValid] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<any>(null)

  const handleValidateVideo = async () => {
    if (!youtubeUrl) return

    setIsValidating(true)
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
      setVideoValid(data.valid)
    } catch (err: any) {
      console.error('Validation error:', err)
      setError(err.message || 'Error al validar el video')
      setVideoValid(false)
    } finally {
      setIsValidating(false)
    }
  }

  const handleProcess = async () => {
    setIsProcessing(true)
    setError(null)
    try {
      if (inputMode === 'youtube') {
        // Step 1: Transcribe
        const transcribeResponse = await fetch('/api/transcribe-audio', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ youtubeUrl }),
        })

        if (!transcribeResponse.ok) {
          const errorData = await transcribeResponse.json()
          throw new Error(errorData.error || 'Error al transcribir')
        }

        const transcriptionData = await transcribeResponse.json()

        // Step 2: Analyze
        const analyzeResponse = await fetch('/api/analyze-decimas', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            transcript: transcriptionData.text,
            singerName: singerName || undefined,
          }),
        })

        if (!analyzeResponse.ok) {
          const errorData = await analyzeResponse.json()
          throw new Error(errorData.error || 'Error al analizar')
        }

        const analysisData = await analyzeResponse.json()
        setResult({ transcription: transcriptionData, analysis: analysisData })
      } else {
        // Handle direct text processing
        const analyzeResponse = await fetch('/api/analyze-decimas', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            transcript: directText,
            singerName: singerName || undefined,
          }),
        })

        if (!analyzeResponse.ok) {
          const errorData = await analyzeResponse.json()
          throw new Error(errorData.error || 'Error al analizar')
        }

        const analysisData = await analyzeResponse.json()
        setResult({ analysis: analysisData })
      }
    } catch (err: any) {
      console.error('Process error:', err)
      setError(err.message || 'Error al procesar')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <Card className="bg-[#F5E6D3] border-2 border-[#C8A05C] shadow-lg">
        <CardContent className="p-6 space-y-6">
          {/* Header with Gemini branding */}
          <div className="flex items-center gap-4 pb-4 border-b border-[#C8A05C]/30">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold">
              G
            </div>
            <div>
              <h2 className="text-2xl font-serif font-bold text-[#D97706]">
                Análisis de Décimas
              </h2>
              <p className="text-sm text-[#5C4033]">Powered by Google Gemini</p>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-[#5C4033] leading-relaxed">
            Analiza canturías de décima espinela cubana desde YouTube o pegando
            texto directamente. La app usa{' '}
            <strong>Google Gemini</strong> para identificar décimas, poetas y
            turnos automáticamente.
          </p>

          {/* Feature Box */}
          <div className="bg-[#D1FAE5] border-2 border-[#C8A05C] rounded-lg p-4">
            <div className="flex items-start gap-3">
              <span className="text-3xl">✨</span>
              <div className="flex-1">
                <p className="font-semibold text-[#5C4033] mb-1">
                  🎯 Procesamiento inteligente con Gemini AI
                </p>
                <p className="text-sm text-[#5C4033] mb-3">
                  Sigue las <strong>INSTRUCCIONES CRÍTICAS</strong> para
                  transcripción de canturías. ¡Rápido y preciso!
                </p>
                <div className="space-y-1 text-sm text-[#5C4033]">
                  <p>⏱️ Proceso: Descarga + Transcripción (2-4 min)</p>
                  <p>✅ Formatea: Décimas en estructura ABBAACCDDC</p>
                  <p>🎯 Identifica: Poetas, turnos y métrica automáticamente</p>
                </div>
              </div>
            </div>
          </div>

          {/* Mode Selection */}
          <div>
            <h3 className="text-lg font-serif font-bold text-[#D97706] mb-4">
              Selecciona el modo de entrada
            </h3>
            <div className="flex gap-4">
              <Button
                variant={inputMode === 'youtube' ? 'default' : 'outline'}
                onClick={() => setInputMode('youtube')}
                className={`flex-1 ${inputMode === 'youtube' ? 'bg-[#D2691E] hover:bg-[#C8A05C]' : ''}`}
              >
                <span className="mr-2">📺</span>
                YouTube URL
              </Button>
              <Button
                variant={inputMode === 'text' ? 'default' : 'outline'}
                onClick={() => setInputMode('text')}
                className={`flex-1 ${inputMode === 'text' ? 'bg-[#D2691E] hover:bg-[#C8A05C]' : ''}`}
              >
                <span className="mr-2">📝</span>
                Texto Directo
              </Button>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-red-50 border-2 border-red-500 rounded-lg p-4">
              <p className="text-red-600 text-sm">❌ {error}</p>
            </div>
          )}

          {inputMode === 'youtube' ? (
            <div className="space-y-6">
              {/* Step 1: YouTube URL */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Badge className="bg-[#D2691E] text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold p-0">
                    1
                  </Badge>
                  <h3 className="text-lg font-serif font-bold text-[#D97706]">
                    Pega el URL de YouTube
                  </h3>
                </div>
                <Input
                  type="url"
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={youtubeUrl}
                  onChange={(e) => {
                    setYoutubeUrl(e.target.value)
                    setVideoValid(false)
                    setError(null)
                  }}
                  className="w-full bg-white border-[#C8A05C]"
                />
                <div className="flex items-center gap-2">
                  <p className="text-sm text-[#5C4033]">🧪 URLs de prueba rápida:</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setYoutubeUrl('https://youtu.be/7vThzpq8cHQ')
                      setVideoValid(false)
                    }}
                    className="text-[#D2691E] hover:text-[#C8A05C]"
                  >
                    Test Video 1
                  </Button>
                </div>
                <Button
                  onClick={handleValidateVideo}
                  disabled={!youtubeUrl || isValidating}
                  className="w-full bg-[#5C4033] hover:bg-[#78350F] text-white"
                >
                  {isValidating ? (
                    <>
                      <span className="animate-spin mr-2">⏳</span>
                      Validando...
                    </>
                  ) : (
                    <>
                      <span className="mr-2">🔍</span>
                      Validar Video
                    </>
                  )}
                </Button>
                {videoValid && (
                  <Badge className="bg-[#D1FAE5] text-[#5C4033] border border-green-500">
                    ✅ Video válido
                  </Badge>
                )}
              </div>

              {/* Step 2: Singer Name */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Badge className="bg-[#D2691E] text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold p-0">
                    2
                  </Badge>
                  <h3 className="text-lg font-serif font-bold text-[#D97706]">
                    ¿Quién comienza la canturía?
                  </h3>
                </div>
                <Input
                  type="text"
                  placeholder="Nombre del cantante principal"
                  value={singerName}
                  onChange={(e) => setSingerName(e.target.value)}
                  className="w-full bg-white border-[#C8A05C]"
                />
                <Button
                  onClick={handleProcess}
                  disabled={!videoValid || isProcessing}
                  className="w-full bg-[#DC2626] hover:bg-red-700 text-white"
                >
                  {isProcessing ? (
                    <>
                      <span className="animate-spin mr-2">⏳</span>
                      Procesando...
                    </>
                  ) : (
                    <>
                      <span className="mr-2">🎤</span>
                      Transcribir Video
                    </>
                  )}
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-serif font-bold text-[#D97706] mb-2">
                  Pega el texto de la transcripción
                </h3>
                <Textarea
                  placeholder="Pega aquí el texto de la canturía..."
                  value={directText}
                  onChange={(e) => setDirectText(e.target.value)}
                  className="w-full min-h-[200px] bg-white border-[#C8A05C]"
                />
              </div>
              <Input
                type="text"
                placeholder="Nombre del cantante principal"
                value={singerName}
                onChange={(e) => setSingerName(e.target.value)}
                className="w-full bg-white border-[#C8A05C]"
              />
              <Button
                onClick={handleProcess}
                disabled={!directText.trim() || isProcessing}
                className="w-full bg-[#D2691E] hover:bg-[#C8A05C] text-white"
              >
                {isProcessing ? 'Analizando...' : 'Analizar Texto'}
              </Button>
            </div>
          )}

          {/* Results */}
          {result && (
            <div className="space-y-4 pt-6 border-t border-[#C8A05C]">
              <h3 className="text-xl font-serif font-bold text-[#D97706]">
                📝 Resultado del Análisis
              </h3>
              <div className="bg-white p-4 rounded-lg border border-[#C8A05C]">
                <pre className="whitespace-pre-wrap text-sm text-[#5C4033]">
                  {result.analysis?.decimas || 'Sin resultados'}
                </pre>
              </div>
              {result.analysis?.analysis && (
                <div className="bg-[#D1FAE5] p-4 rounded-lg border border-[#C8A05C]">
                  <h4 className="font-semibold text-[#5C4033] mb-2">🏆 Top 4 Mejores Décimas</h4>
                  <pre className="whitespace-pre-wrap text-sm text-[#5C4033]">
                    {result.analysis.analysis}
                  </pre>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import { useState } from 'react'
import { Sparkles, Youtube, FileText, Search, Mic } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'

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
      {/* Main Card */}
      <div className="rounded-lg text-card-foreground shadow-sm p-6 bg-white/90 backdrop-blur-sm border-2 border-[#C8A05C]/20">
        <div className="space-y-4">
          {/* Header with Gemini branding */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C8A05C] to-[#D2691E] flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#5C4033]">Análisis de Décimas</h2>
              <p className="text-sm text-[#5C4033]/70">Powered by Google Gemini</p>
            </div>
          </div>

          {/* Description */}
          <div className="bg-[#F5E6D3]/50 p-4 rounded-lg border border-[#C8A05C]/30">
            <p className="text-sm text-[#5C4033] leading-relaxed">
              Analiza canturías de décima espinela cubana desde YouTube o pegando texto directamente. La app usa{' '}
              <strong>Google Gemini</strong> para identificar décimas, poetas y turnos automáticamente.
            </p>
          </div>

          {/* Feature Box */}
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-4 rounded-lg border-l-4 border-emerald-500">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 text-2xl">✨</div>
              <div className="flex-1">
                <p className="font-semibold text-emerald-900 text-sm mb-2">
                  🎯 Procesamiento inteligente con Gemini AI
                </p>
                <p className="text-sm text-emerald-800 mb-2">
                  Sigue las <strong>INSTRUCCIONES CRÍTICAS</strong> para transcripción de canturías.
                  <span className="font-semibold"> ¡Rápido y preciso!</span>
                </p>
                <div className="text-xs text-emerald-700 space-y-1">
                  <p>⏱️ Proceso: Descarga + Transcripción (2-4 min)</p>
                  <p>✅ Formatea: Décimas en estructura ABBAACCDDC</p>
                  <p>🎯 Identifica: Poetas, turnos y métrica automáticamente</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mode Selection */}
      <div className="mt-6">
        <h3 className="text-lg font-bold text-[#5C4033] mb-4">
          Selecciona el modo de entrada
        </h3>
        <div className="flex gap-4">
          <button
            onClick={() => setInputMode('youtube')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg border-2 transition-all ${
              inputMode === 'youtube'
                ? 'bg-[#D2691E] text-white border-[#D2691E]'
                : 'bg-white text-[#5C4033] border-[#C8A05C]/30 hover:border-[#C8A05C]'
            }`}
          >
            <Youtube className="w-5 h-5" />
            YouTube URL
          </button>
          <button
            onClick={() => setInputMode('text')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg border-2 transition-all ${
              inputMode === 'text'
                ? 'bg-[#D2691E] text-white border-[#D2691E]'
                : 'bg-white text-[#5C4033] border-[#C8A05C]/30 hover:border-[#C8A05C]'
            }`}
          >
            <FileText className="w-5 h-5" />
            Texto Directo
          </button>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mt-4 bg-red-50 border-2 border-red-500 rounded-lg p-4">
          <p className="text-red-600 text-sm">❌ {error}</p>
        </div>
      )}

      {inputMode === 'youtube' ? (
        <div className="mt-6 space-y-6">
          {/* Step 1: YouTube URL */}
          <div className="bg-white/90 rounded-lg p-4 border-2 border-[#C8A05C]/20">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-7 h-7 rounded-full bg-[#D2691E] text-white flex items-center justify-center text-sm font-bold">
                1
              </div>
              <h3 className="text-lg font-bold text-[#5C4033]">
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
              className="w-full bg-white border-[#C8A05C]/30"
            />
            <div className="flex items-center gap-2 mt-2">
              <p className="text-sm text-[#5C4033]">🧪 URLs de prueba rápida:</p>
              <button
                onClick={() => {
                  setYoutubeUrl('https://youtu.be/7vThzpq8cHQ')
                  setVideoValid(false)
                }}
                className="text-sm text-[#D2691E] hover:text-[#C8A05C] underline"
              >
                Test Video 1
              </button>
            </div>
            <button
              onClick={handleValidateVideo}
              disabled={!youtubeUrl || isValidating}
              className="mt-3 w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-[#D2691E] text-white hover:bg-[#C8A05C] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isValidating ? (
                <>
                  <span className="animate-spin">⏳</span>
                  Validando...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  Validar Video
                </>
              )}
            </button>
            {videoValid && (
              <div className="mt-2 inline-block bg-emerald-100 text-emerald-800 text-sm px-3 py-1 rounded-full border border-emerald-300">
                ✅ Video válido
              </div>
            )}
          </div>

          {/* Step 2: Singer Name */}
          <div className="bg-white/90 rounded-lg p-4 border-2 border-[#C8A05C]/20">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-7 h-7 rounded-full bg-[#D2691E] text-white flex items-center justify-center text-sm font-bold">
                2
              </div>
              <h3 className="text-lg font-bold text-[#5C4033]">
                ¿Quién comienza la canturía?
              </h3>
            </div>
            <Input
              type="text"
              placeholder="Nombre del cantante principal"
              value={singerName}
              onChange={(e) => setSingerName(e.target.value)}
              className="w-full bg-white border-[#C8A05C]/30"
            />
            <button
              onClick={handleProcess}
              disabled={!videoValid || isProcessing}
              className="mt-3 w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-[#DC2626] text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isProcessing ? (
                <>
                  <span className="animate-spin">⏳</span>
                  Procesando...
                </>
              ) : (
                <>
                  <Mic className="w-4 h-4" />
                  Transcribir Video
                </>
              )}
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          <div className="bg-white/90 rounded-lg p-4 border-2 border-[#C8A05C]/20">
            <h3 className="text-lg font-bold text-[#5C4033] mb-3">
              Pega el texto de la transcripción
            </h3>
            <Textarea
              placeholder="Pega aquí el texto de la canturía..."
              value={directText}
              onChange={(e) => setDirectText(e.target.value)}
              className="w-full min-h-[200px] bg-white border-[#C8A05C]/30"
            />
            <Input
              type="text"
              placeholder="Nombre del cantante principal"
              value={singerName}
              onChange={(e) => setSingerName(e.target.value)}
              className="w-full mt-3 bg-white border-[#C8A05C]/30"
            />
            <button
              onClick={handleProcess}
              disabled={!directText.trim() || isProcessing}
              className="mt-3 w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-[#D2691E] text-white hover:bg-[#C8A05C] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isProcessing ? 'Analizando...' : 'Analizar Texto'}
            </button>
          </div>
        </div>
      )}

      {/* Results */}
      {result && (
        <div className="mt-6 space-y-4">
          <div className="bg-white/90 rounded-lg p-4 border-2 border-[#C8A05C]/20">
            <h3 className="text-xl font-bold text-[#5C4033] mb-3">
              📝 Resultado del Análisis
            </h3>
            <pre className="whitespace-pre-wrap text-sm text-[#5C4033] bg-[#F5E6D3]/50 p-4 rounded-lg">
              {result.analysis?.decimas || 'Sin resultados'}
            </pre>
          </div>
          {result.analysis?.analysis && (
            <div className="bg-emerald-50 rounded-lg p-4 border-2 border-emerald-200">
              <h4 className="font-semibold text-emerald-900 mb-2">🏆 Top 4 Mejores Décimas</h4>
              <pre className="whitespace-pre-wrap text-sm text-emerald-800">
                {result.analysis.analysis}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

"use client"

import { useState } from 'react'
import { Sparkles, FileText } from 'lucide-react'
import { Textarea } from './ui/textarea'
import { Input } from './ui/input'

export function ProcessingSection() {
  const [directText, setDirectText] = useState('')
  const [singerName, setSingerName] = useState('')
  const [language, setLanguage] = useState('español')
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<any>(null)

  const handleProcess = async () => {
    if (!directText.trim()) {
      setError('Por favor ingresa texto para analizar')
      return
    }

    setIsProcessing(true)
    setError(null)
    setResult(null)
    
    try {
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
        throw new Error(errorData.error || 'Error al analizar el texto')
      }

      const analysisData = await analyzeResponse.json()
      setResult({ analysis: analysisData })
    } catch (err: any) {
      console.error('Process error:', err)
      setError(err.message || 'Error al procesar el texto')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      {/* Main Header Card */}
      <div className="rounded-lg shadow-lg p-6 bg-white/90 backdrop-blur-sm border-2 border-[#C8A05C]/20">
        <div className="space-y-4">
          {/* Header with Gemini branding */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C8A05C] to-[#D2691E] flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#5C4033]">Análisis de Texto Directo - MVP</h2>
              <p className="text-sm text-[#5C4033]/70">Powered by Google Gemini AI</p>
            </div>
          </div>

          {/* Description */}
          <div className="bg-[#F5E6D3]/50 p-4 rounded-lg border border-[#C8A05C]/30">
            <p className="text-sm text-[#5C4033] leading-relaxed">
              <strong>Versión MVP:</strong> Analiza texto de décimas espinelas cubanas directamente. 
              Pega tu transcripción y la IA identificará décimas, poetas y turnos automáticamente usando <strong>Google Gemini</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mt-4 bg-red-50 border-2 border-red-500 rounded-lg p-4">
          <p className="text-red-600 text-sm font-semibold">❌ {error}</p>
        </div>
      )}

      {/* Text Input Section */}
      <div className="mt-6 space-y-4">
        <div className="bg-white/90 rounded-lg p-6 border-2 border-[#C8A05C]/20 shadow-md">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-6 h-6 text-[#D2691E]" />
            <h3 className="text-xl font-bold text-[#5C4033]">
              Ingresa el texto para analizar
            </h3>
          </div>

          {/* Language Selector */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-[#5C4033] mb-2">
              Idioma del texto:
            </label>
            <div className="flex gap-3">
              <button
                onClick={() => setLanguage('español')}
                className={`px-4 py-2 rounded-lg border-2 transition-all ${
                  language === 'español'
                    ? 'bg-[#D2691E] text-white border-[#D2691E]'
                    : 'bg-white text-[#5C4033] border-[#C8A05C]/30 hover:border-[#C8A05C]'
                }`}
              >
                🇪🇸 Español
              </button>
              <button
                onClick={() => setLanguage('english')}
                className={`px-4 py-2 rounded-lg border-2 transition-all ${
                  language === 'english'
                    ? 'bg-[#D2691E] text-white border-[#D2691E]'
                    : 'bg-white text-[#5C4033] border-[#C8A05C]/30 hover:border-[#C8A05C]'
                }`}
              >
                🇺🇸 English
              </button>
            </div>
          </div>

          {/* Text Area */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-[#5C4033] mb-2">
              Texto de la canturía:
            </label>
            <Textarea
              placeholder="Pega aquí el texto completo de la canturía de décimas..."
              value={directText}
              onChange={(e) => {
                setDirectText(e.target.value)
                setError(null)
              }}
              className="w-full min-h-[250px] bg-white border-[#C8A05C]/30 focus:border-[#D2691E] text-base"
            />
            <div className="flex justify-between items-center mt-2">
              <p className="text-xs text-[#5C4033]/60">
                Caracteres: {directText.length}
              </p>
              {directText.length > 50000 && (
                <p className="text-xs text-amber-600 font-semibold">
                  ⚠️ Texto muy largo, puede tardar más
                </p>
              )}
            </div>
          </div>

          {/* Singer Name Input */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-[#5C4033] mb-2">
              ¿Quién comienza la canturía? (opcional):
            </label>
            <Input
              type="text"
              placeholder="Ej: Nombre del primer poeta que canta"
              value={singerName}
              onChange={(e) => setSingerName(e.target.value)}
              className="w-full bg-white border-[#C8A05C]/30 focus:border-[#D2691E]"
            />
          </div>

          {/* Analyze Button */}
          <button
            onClick={handleProcess}
            disabled={!directText.trim() || isProcessing}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-[#D2691E] text-white font-semibold hover:bg-[#C8A05C] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md"
          >
            {isProcessing ? (
              <>
                <span className="animate-spin">⏳</span>
                Analizando con Gemini AI...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Analizar Décimas
              </>
            )}
          </button>
        </div>
      </div>

      {/* Results Section */}
      {result && (
        <div className="mt-6 space-y-4">
          <div className="bg-white/90 rounded-lg p-6 border-2 border-[#C8A05C]/20 shadow-md">
            <h3 className="text-xl font-bold text-[#5C4033] mb-4 flex items-center gap-2">
              📝 Décimas Identificadas
            </h3>
            <div className="bg-[#F5E6D3]/50 p-4 rounded-lg max-h-[600px] overflow-y-auto">
              <pre className="whitespace-pre-wrap text-sm text-[#5C4033] font-mono leading-relaxed">
                {result.analysis?.decimas || 'Sin resultados'}
              </pre>
            </div>
          </div>
          
          {result.analysis?.analysis && (
            <div className="bg-emerald-50 rounded-lg p-6 border-2 border-emerald-300 shadow-md">
              <h4 className="text-lg font-bold text-emerald-900 mb-3 flex items-center gap-2">
                🏆 Análisis de las Mejores Décimas
              </h4>
              <div className="bg-white/70 p-4 rounded-lg">
                <pre className="whitespace-pre-wrap text-sm text-emerald-800 leading-relaxed">
                  {result.analysis.analysis}
                </pre>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

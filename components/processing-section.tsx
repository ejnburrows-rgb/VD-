"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Badge } from './ui/badge'
import { isValidYouTubeUrl } from '@/lib/utils'

type InputMode = 'youtube' | 'text'

export function ProcessingSection() {
  const [inputMode, setInputMode] = useState<InputMode>('youtube')
  const [youtubeUrl, setYoutubeUrl] = useState('')
  const [directText, setDirectText] = useState('')
  const [singerName, setSingerName] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [isValidating, setIsValidating] = useState(false)
  const [videoValid, setVideoValid] = useState(false)

  const handleValidateVideo = async () => {
    if (!youtubeUrl) return

    setIsValidating(true)
    try {
      const response = await fetch('/api/validate-youtube', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ youtubeUrl }),
      })

      const data = await response.json()
      setVideoValid(data.valid)
    } catch (error) {
      console.error('Validation error:', error)
      setVideoValid(false)
    } finally {
      setIsValidating(false)
    }
  }

  const handleProcess = async () => {
    setIsProcessing(true)
    try {
      if (inputMode === 'youtube') {
        const response = await fetch('/api/process-video', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            youtubeUrl,
            singerName: singerName || undefined,
          }),
        })

        if (!response.ok) {
          throw new Error('Processing failed')
        }

        const data = await response.json()
        // Handle success - could redirect or update state
        console.log('Processing started:', data)
      } else {
        // Handle direct text processing
        console.log('Processing direct text:', directText)
      }
    } catch (error) {
      console.error('Process error:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <Card className="bg-[#F5E6D3] border-2 border-[#C8A05C]">
        <CardHeader>
          <CardTitle className="text-2xl font-serif text-[#D97706]">
            Análisis de Décimas
          </CardTitle>
          <CardDescription className="text-[#5C4033]">
            Powered by Google Gemini
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-sm text-[#5C4033]">
            Analiza canturías de décima espinela cubana desde YouTube o pegando
            texto directamente. La app usa{' '}
            <strong>Google Gemini</strong> para identificar décimas, poetas y
            turnos automáticamente.
          </p>

          <div className="bg-[#D1FAE5] border-2 border-[#C8A05C] rounded-lg p-4 space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl">✨</span>
              <div>
                <p className="font-semibold text-[#5C4033]">
                  🎯 Procesamiento inteligente con Gemini AI
                </p>
                <p className="text-sm text-[#5C4033]">
                  Sigue las <strong>INSTRUCCIONES CRÍTICAS</strong> para
                  transcripción de canturías. ¡Rápido y preciso!
                </p>
              </div>
            </div>
            <div className="ml-8 space-y-1 text-sm text-[#5C4033]">
              <p>⏱️ Proceso: Descarga + Transcripción (2-4 min)</p>
              <p>✅ Formatea: Décimas en estructura ABBAACCDDC</p>
              <p>
                🎯 Identifica: Poetas, turnos y métrica automáticamente
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-serif font-bold text-[#D97706] mb-4">
              Selecciona el modo de entrada
            </h3>
            <div className="flex gap-4">
              <Button
                variant={inputMode === 'youtube' ? 'default' : 'outline'}
                onClick={() => setInputMode('youtube')}
                className="flex-1"
              >
                <span className="mr-2">📺</span>
                YouTube URL
              </Button>
              <Button
                variant={inputMode === 'text' ? 'default' : 'outline'}
                onClick={() => setInputMode('text')}
                className="flex-1"
              >
                <span className="mr-2">📝</span>
                Texto Directo
              </Button>
            </div>
          </div>

          {inputMode === 'youtube' ? (
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="default">1</Badge>
                  <h3 className="text-lg font-serif font-bold text-[#D97706]">
                    Pegar el URL de YouTube
                  </h3>
                </div>
                <Input
                  type="url"
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={youtubeUrl}
                  onChange={(e) => {
                    setYoutubeUrl(e.target.value)
                    setVideoValid(false)
                  }}
                  className="w-full"
                />
                <div className="mt-2">
                  <p className="text-sm text-[#5C4033] mb-2">
                    🧪 URLs de prueba rápida:
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setYoutubeUrl('https://www.youtube.com/watch?v=test')
                      setVideoValid(false)
                    }}
                  >
                    Test Video 1
                  </Button>
                </div>
                <Button
                  onClick={handleValidateVideo}
                  disabled={!youtubeUrl || isValidating}
                  className="mt-4 w-full"
                >
                  {isValidating ? 'Validando...' : 'Validar Video'}
                </Button>
                {videoValid && (
                  <Badge variant="default" className="mt-2">
                    ✅ Video válido
                  </Badge>
                )}
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="default">2</Badge>
                  <h3 className="text-lg font-serif font-bold text-[#D97706]">
                    ¿Quién comienza la canturía?
                  </h3>
                </div>
                <Input
                  type="text"
                  placeholder="Ej: Eduardo Duque, Anamarys Gil, etc."
                  value={singerName}
                  onChange={(e) => setSingerName(e.target.value)}
                  className="w-full"
                />
                <Button
                  onClick={handleProcess}
                  disabled={!videoValid || isProcessing}
                  className="mt-4 w-full bg-[#DC2626] hover:bg-red-700"
                >
                  {isProcessing ? 'Procesando...' : 'Transcribir Video'}
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
                  className="w-full min-h-[200px]"
                />
              </div>
              <Button
                onClick={handleProcess}
                disabled={!directText.trim() || isProcessing}
                className="w-full"
              >
                {isProcessing ? 'Analizando...' : 'Analizar Texto'}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}


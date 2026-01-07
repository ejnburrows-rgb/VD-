"use client";
import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, CheckCircle, Loader2, FileText, Sparkles, Youtube, Type } from "lucide-react";

interface ProcessingSectionProps {
  onVideoProcessed: (videoId: string) => void;
}

type ProcessingStage = 'idle' | 'validating' | 'processing' | 'completed' | 'error';
type InputMode = 'text' | 'youtube';

export default function ProcessingSection({ onVideoProcessed }: ProcessingSectionProps) {
  const [inputMode, setInputMode] = useState<InputMode>('youtube');
  const [inputText, setInputText] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [videoInfo, setVideoInfo] = useState<any>(null);
  const [transcriptionResult, setTranscriptionResult] = useState("");
  const [processingStage, setProcessingStage] = useState<ProcessingStage>('idle');
  const [error, setError] = useState<string>("");
  const [processedInfo, setProcessedInfo] = useState<{decimasCount: number; poetsCount: number} | null>(null);
  const [startingPoet, setStartingPoet] = useState<string>("");
  // Auto flow: when a URL is pasted/changed, validate it automatically and, if startingPoet is set, process
  React.useEffect(() => {
    const url = youtubeUrl.trim();
    if (!url) return;
    const timer = setTimeout(async () => {
      if (processingStage === 'idle' || processingStage === 'error') {
        try {
          // Auto-validate
          const response = await fetch('/api/validate-youtube', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url })
          });
          const data = await response.json();
          if (response.ok) {
            setVideoInfo(data);
            // If startingPoet already set, auto-process
            if (startingPoet.trim()) {
              // Reuse existing handler in YouTube mode
              await (async () => {
                setProcessingStage('processing');
                setError("");
                setTranscriptionResult("");
                try {
                  const resp = await fetch('/api/transcribe', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ url: data.url })
                  });
                  const out = await resp.json();
                  if (!resp.ok) throw new Error(out.error || 'Error al transcribir');
                  setTranscriptionResult(out.transcript || '');
                  setProcessedInfo({
                    decimasCount: out.transcript
                      ? ((out.transcript.match(/\n/g) || []).length + 1)
                      : 0,
                    poetsCount: 0
                  });

                  setProcessingStage('completed');
                  if (out.videoId) onVideoProcessed(out.videoId);
                  if (out.notes && !out.transcript) setError(out.notes);
                } catch (e:any) {
                  setError(e.message || 'Error al procesar');
                  setProcessingStage('error');
                }
              })();
            }
          } else {
            setError(data.error || 'Error al validar el URL de YouTube');
            setVideoInfo(null);
            setProcessingStage('error');
          }
        } catch (e:any) {
          setError(e.message || 'Error al validar el URL de YouTube');
          setProcessingStage('error');
          setVideoInfo(null);
        }
      }
    }, 600); // debounce
    return () => clearTimeout(timer);
  }, [youtubeUrl, startingPoet]);


  const validateYoutubeUrl = async () => {
    if (!youtubeUrl.trim()) {
      setError('Por favor pega un URL válido de YouTube');
      return;
    }

    setProcessingStage('validating');
    setError("");
    
    try {
      const response = await fetch('/api/validate-youtube', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: youtubeUrl.trim() })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al validar el video de YouTube');
      }

      setVideoInfo(data);
      setProcessingStage('idle');
    } catch (err: any) {
      setError(err.message || 'Error al validar el URL de YouTube');
      setProcessingStage('error');
      setVideoInfo(null);
    }
  };

  const handleProcess = async () => {
    if (inputMode === 'text') {
      // Text mode validation
      if (!inputText.trim() || !startingPoet.trim()) {
        setError('Por favor pega el texto de la canturía y especifica quién comienza');
        return;
      }
    } else {
      // YouTube mode validation
      if (!videoInfo || !startingPoet.trim()) {
        setError('Por favor valida el video de YouTube y especifica quién comienza');
        return;
      }
    }

    setProcessingStage('processing');
    setError("");
    setTranscriptionResult("");
    
    try {
      if (inputMode === 'text') {
        const requestBody = {
          inputText: inputText.trim(),
          startingPoet: startingPoet.trim(),
          mode: 'text'
        };
        const response = await fetch('/api/transcribe-video', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestBody)
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || 'Error al procesar');
        }
        setTranscriptionResult(data.transcription);
        setProcessedInfo({
          decimasCount: data.decimasCount,
          poetsCount: data.poetsCount
        });
        setProcessingStage('completed');
        if (data.videoId) {
          onVideoProcessed(data.videoId);
        }
      } else {
        // YouTube mode: call the minimal captions endpoint
        const resp = await fetch('/api/transcribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: videoInfo.url })
        });
        const data = await resp.json();
        if (!resp.ok) {
          throw new Error(data.error || 'Error al transcribir');
        }
        setTranscriptionResult(data.transcript || '');
        setProcessedInfo({
          decimasCount: (data.transcript ? (data.transcript.match(/\n/g) || []).length + 1 : 0),
          poetsCount: 0
        });
        setProcessingStage('completed');
        if (data.videoId) {
          onVideoProcessed(data.videoId);
        }
        if (data.notes) {
          // Surface notes in UI via error slot if transcript is empty
          if (!data.transcript) setError(data.notes);
        }
      }
    } catch (err: any) {
      setError(err.message || 'Error al procesar');
      setProcessingStage('error');
    }
  };

  const handleReset = () => {
    setInputText("");
    setYoutubeUrl("");
    setVideoInfo(null);
    setTranscriptionResult("");
    setProcessingStage('idle');
    setError("");
    setProcessedInfo(null);
    setStartingPoet("");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="p-6 bg-white/90 backdrop-blur-sm border-2 border-[#C8A05C]/20">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C8A05C] to-[#D2691E] flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#5C4033]">Análisis de Décimas</h2>
              <p className="text-sm text-[#5C4033]/70">Powered by Google Gemini</p>
            </div>
          </div>
          
          <div className="bg-[#F5E6D3]/50 p-4 rounded-lg border border-[#C8A05C]/30">
            <p className="text-sm text-[#5C4033] leading-relaxed">
              Analiza canturías de décima espinela cubana desde YouTube o pegando texto directamente. 
              La app usa <strong>Google Gemini</strong> para identificar décimas, poetas y turnos automáticamente.
            </p>
          </div>
          
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
                  <p>⏱️ Proceso: {inputMode === 'youtube' ? 'Descarga + Transcripción (2-4 min)' : 'Análisis del texto (30-60 seg)'}</p>
                  <p>✅ Formatea: Décimas en estructura ABBAACCDDC</p>
                  <p>🎯 Identifica: Poetas, turnos y métrica automáticamente</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Mode Selector */}
      <Card className="p-6 bg-white/90 backdrop-blur-sm border-2 border-[#C8A05C]/20">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-[#5C4033]">Selecciona el modo de entrada</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={() => setInputMode('youtube')}
              variant={inputMode === 'youtube' ? 'default' : 'outline'}
              className={inputMode === 'youtube' 
                ? 'bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600' 
                : 'border-[#C8A05C] text-[#5C4033] hover:bg-[#C8A05C]/10'}
              disabled={processingStage === 'processing' || processingStage === 'validating'}
            >
              <Youtube className="w-4 h-4 mr-2" />
              YouTube URL
            </Button>
            
            <Button
              onClick={() => setInputMode('text')}
              variant={inputMode === 'text' ? 'default' : 'outline'}
              className={inputMode === 'text' 
                ? 'bg-gradient-to-r from-[#D2691E] to-[#C8A05C] hover:from-[#C8A05C] hover:to-[#D2691E]' 
                : 'border-[#C8A05C] text-[#5C4033] hover:bg-[#C8A05C]/10'}
              disabled={processingStage === 'processing' || processingStage === 'validating'}
            >
              <Type className="w-4 h-4 mr-2" />
              Texto Directo
            </Button>
          </div>
        </div>
      </Card>

      {/* Step 1: Input - YouTube or Text */}
      {inputMode === 'youtube' ? (
        <>
          {/* YouTube URL Input */}
          <Card className="p-6 bg-white/90 backdrop-blur-sm border-2 border-[#C8A05C]/20">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold">
                  1
                </div>
                <h3 className="text-xl font-semibold text-[#5C4033]">Pega el URL de YouTube</h3>
              </div>
              
              <Input
                type="url"
                placeholder="https://www.youtube.com/watch?v=..."
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                className="text-base"
                disabled={processingStage === 'processing' || processingStage === 'validating'}
              />
              
              {/* Quick Test URLs */}
              <div className="bg-amber-900/10 rounded-lg p-3 border border-amber-900/20">
                <p className="text-xs text-[#5C4033]/60 mb-2">🧪 URLs de prueba rápida:</p>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setYoutubeUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ')}
                    className="text-xs px-3 py-1.5 bg-amber-900/30 hover:bg-amber-900/50 text-[#5C4033] rounded-lg transition-colors"
                    type="button"
                  >
                    Test Video 1
                  </button>
                </div>
              </div>
              
              <Button 
                onClick={validateYoutubeUrl}
                className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600"
                disabled={!youtubeUrl.trim() || processingStage === 'processing' || processingStage === 'validating'}
              >
                {processingStage === 'validating' ? (
                  <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Validando...</>
                ) : (
                  <><CheckCircle className="w-4 h-4 mr-2" /> Validar Video</>
                )}
              </Button>

              {/* Video Preview */}
              {videoInfo && (
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-lg border-2 border-green-500/30">
                  <div className="flex items-start gap-4">
                    {videoInfo.thumbnailUrl && (
                      <img 
                        src={videoInfo.thumbnailUrl} 
                        alt="Video thumbnail"
                        className="w-32 h-20 object-cover rounded"
                      />
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="font-semibold text-green-900">Video validado</span>
                      </div>
                      <p className="text-xs text-[#5C4033]/70 mt-1">Duración: {videoInfo.duration}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </>
      ) : (
        <>
          {/* Text Input */}
          <Card className="p-6 bg-white/90 backdrop-blur-sm border-2 border-[#C8A05C]/20">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#C8A05C] text-white flex items-center justify-center font-bold">
                  1
                </div>
                <h3 className="text-xl font-semibold text-[#5C4033]">Pega el texto de la canturía</h3>
              </div>
              
              <div className="relative">
                <Textarea
                  placeholder="Pega aquí el texto completo de la canturía con todas las décimas..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="min-h-[300px] text-base font-mono"
                  disabled={processingStage === 'processing'}
                />
                <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-[#C8A05C]/30 shadow-sm">
                  <div className="text-xs text-[#5C4033]/70 flex items-center gap-2">
                    <FileText className="w-3 h-3" />
                    <span className="font-mono font-semibold">{inputText.length.toLocaleString()}</span>
                    <span>caracteres</span>
                  </div>
                </div>
              </div>
              
              {inputText.length > 0 && (
                <div className="text-sm text-[#5C4033]/70 flex items-center gap-2 bg-green-50 p-2 rounded-lg">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Texto listo para analizar ({Math.ceil(inputText.length / 100)} líneas aprox.)</span>
                </div>
              )}
            </div>
          </Card>
        </>
      )}

      {/* Step 2: Starting Poet */}
      <Card className="p-6 bg-white/90 backdrop-blur-sm border-2 border-[#C8A05C]/20">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#C8A05C] text-white flex items-center justify-center font-bold">
              2
            </div>
            <h3 className="text-xl font-semibold text-[#5C4033]">¿Quién comienza la canturía?</h3>
          </div>
          
          <Input
            type="text"
            placeholder="Ej: Eduardo Duque, Anamarys Gil, etc."
            value={startingPoet}
            onChange={(e) => setStartingPoet(e.target.value)}
            className="text-lg"
            disabled={processingStage === 'processing' || processingStage === 'validating'}
          />
          
          <Button 
            onClick={handleProcess}
            className="w-full bg-gradient-to-r from-[#D2691E] to-[#C8A05C] hover:from-[#C8A05C] hover:to-[#D2691E]"
            disabled={
              processingStage === 'processing' || 
              processingStage === 'validating' ||
              !startingPoet.trim() ||
              (inputMode === 'text' && !inputText.trim()) ||
              (inputMode === 'youtube' && !videoInfo)
            }
          >
            {processingStage === 'processing' ? (
              <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> {inputMode === 'youtube' ? 'Transcribiendo...' : 'Analizando...'}</>
            ) : (
              <><Sparkles className="w-4 h-4 mr-2" /> {inputMode === 'youtube' ? 'Transcribir Video' : 'Analizar Décimas'}</>
            )}
          </Button>
        </div>
      </Card>

      {/* Processing Status */}
      {processingStage === 'processing' && (
        <Card className="p-6 bg-gradient-to-br from-[#F5E6D3] to-[#E6D7C1] border-2 border-[#C8A05C]/20">
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-4">
              <Loader2 className="w-8 h-8 animate-spin text-[#D2691E]" />
              <div>
                <h4 className="font-semibold text-[#5C4033]">
                  {inputMode === 'youtube' ? 'Transcribiendo video con Gemini AI...' : 'Analizando con Gemini AI...'}
                </h4>
                <p className="text-sm text-[#5C4033]/70">
                  {inputMode === 'youtube' ? 'Esto puede tomar 2-4 minutos' : 'Esto puede tomar 30-60 segundos'}
                </p>
              </div>
            </div>
            
            <div className="bg-white/50 p-4 rounded-lg space-y-2">
              {inputMode === 'youtube' ? (
                <>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-[#D2691E] animate-pulse"></div>
                    <span className="text-[#5C4033]">Paso 1: Descargando audio del video (30-90 seg)</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-[#C8A05C] animate-pulse"></div>
                    <span className="text-[#5C4033]">Paso 2: Transcribiendo audio con Gemini (1-2 min)</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                    <span className="text-[#5C4033]/70">Paso 3: Identificando décimas y poetas</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                    <span className="text-[#5C4033]/70">Paso 4: Formateando resultado final</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-[#D2691E] animate-pulse"></div>
                    <span className="text-[#5C4033]">Paso 1: Analizando estructura del texto</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-[#C8A05C] animate-pulse"></div>
                    <span className="text-[#5C4033]">Paso 2: Identificando décimas y poetas</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                    <span className="text-[#5C4033]/70">Paso 3: Formateando resultado final</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </Card>
      )}

      {/* Error Display */}
      {error && (
        <Card className="p-6 bg-red-50 border-2 border-red-300 animate-fade-in">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-semibold text-red-900 text-lg mb-2">⚠️ Error de Procesamiento</h4>
              <div className="text-sm text-red-800 whitespace-pre-line leading-relaxed">
                {error}
              </div>
              {error.includes('Modo Texto') && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm font-semibold text-green-900 mb-2">
                    💡 Tip: El Modo Texto es más rápido y confiable
                  </p>
                  <button
                    onClick={() => {
                      setInputMode('text');
                      setError('');
                      setProcessingStage('idle');
                    }}
                    className="text-sm bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    ✅ Cambiar a Modo Texto
                  </button>
                </div>
              )}
            </div>
          </div>
        </Card>
      )}

      {/* Success - Transcription Result */}
      {processingStage === 'completed' && transcriptionResult && (
        <Card className="p-6 bg-white/90 backdrop-blur-sm border-2 border-green-500/20">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-8 h-8 text-green-600" />
                <div>
                  <h3 className="text-xl font-bold text-[#5C4033]">¡Transcripción Completada!</h3>
                  {processedInfo && (
                    <p className="text-sm text-[#5C4033]/70">
                      {processedInfo.decimasCount} décimas de {processedInfo.poetsCount} poetas
                    </p>
                  )}
                </div>
              </div>
              <Button
                onClick={handleReset}
                variant="outline"
                className="border-[#C8A05C] text-[#C8A05C] hover:bg-[#C8A05C]/10"
              >
                {inputMode === 'youtube' ? 'Nuevo Video' : 'Nuevo Análisis'}
              </Button>
            </div>

            <div className="bg-[#F5E6D3]/30 p-6 rounded-lg border border-[#C8A05C]/20 max-h-[600px] overflow-y-auto">
              <pre className="whitespace-pre-wrap text-sm font-mono text-[#5C4033] leading-relaxed">
                {transcriptionResult}
              </pre>
            </div>

            <div className="bg-gradient-to-r from-[#C8A05C]/10 to-[#D2691E]/10 p-4 rounded-lg border border-[#C8A05C]/30">
              <p className="text-sm text-[#5C4033] text-center">
                ✨ Ahora puedes ver las décimas organizadas en la pestaña <strong>"Décimas"</strong> y el análisis completo en <strong>"Análisis"</strong>
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}

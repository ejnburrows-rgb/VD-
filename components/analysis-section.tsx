
"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, TrendingUp, Award, FileText, Copy, Check } from "lucide-react";

interface TopDecima {
  id: string;
  number: number;
  lines: string[];
  poet: string;
  rank: number;
  technicalMastery?: string;
  poeticDevices?: string;
  culturalElements?: string;
  emotionalResonance?: string;
  improvisation?: string;
  topThreeReason?: string;
}

interface AnalysisData {
  id: string;
  videoTitle: string;
  
  // Summary (RESUMEN FINAL)
  summary?: string;
  
  // Deep analysis (análisis completo)
  deepAnalysis?: string;
  
  // Raw transcript (transcripción completa)
  rawTranscript?: string;
  
  // Top décimas by poet
  topDecimasByPoet: Record<string, TopDecima[]>;
}

interface AnalysisSectionProps {
  videoId: string | null;
}

export default function AnalysisSection({ videoId }: AnalysisSectionProps) {
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [showFullTranscript, setShowFullTranscript] = useState(false);
  const [copiedTranscript, setCopiedTranscript] = useState(false);

  useEffect(() => {
    if (!videoId) return;

    const fetchAnalysisData = async () => {
      setLoading(true);
      setError("");
      
      try {
        const response = await fetch(`/api/video/${videoId}/analysis`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Error al cargar el análisis');
        }

        setAnalysisData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar el análisis');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysisData();
  }, [videoId]);

  if (!videoId) {
    return (
      <div className="text-center py-16">
        <BookOpen className="w-16 h-16 mx-auto text-[#C8A05C]/50 mb-4" />
        <h3 className="text-xl font-semibold text-[#5C4033] mb-2">
          No hay análisis disponible
        </h3>
        <p className="text-[#5C4033]/70">
          Procesa un video primero para ver el análisis completo aquí.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center py-16">
        <div className="animate-spin w-8 h-8 border-4 border-[#C8A05C] border-t-transparent rounded-full mx-auto mb-4" />
        <p className="text-[#5C4033]">Cargando análisis...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <div className="text-red-600 mb-4">⚠️</div>
        <h3 className="text-xl font-semibold text-red-600 mb-2">Error</h3>
        <p className="text-red-600/70">{error}</p>
      </div>
    );
  }

  if (!analysisData) {
    return (
      <div className="text-center py-16">
        <BookOpen className="w-16 h-16 mx-auto text-[#C8A05C]/50 mb-4" />
        <h3 className="text-xl font-semibold text-[#5C4033] mb-2">
          Análisis no encontrado
        </h3>
        <p className="text-[#5C4033]/70">
          No se pudo cargar el análisis del video.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-[#C8A05C] mb-4 font-serif">
          🌴 Análisis Completo
        </h2>
        <p className="text-[#5C4033]/80 max-w-2xl mx-auto">
          Análisis académico profundo de las décimas, técnica poética, elementos culturales y calidad artística.
        </p>
      </div>

      {/* Summary of the Canturía */}
      {analysisData.summary && (
        <Card className="p-6 cuban-card">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-6 h-6 text-[#D2691E]" />
            <h3 className="text-2xl font-bold text-[#C8A05C] font-serif">
              Resumen de la Canturía
            </h3>
          </div>
          
          <div className="text-[#5C4033] leading-relaxed whitespace-pre-wrap">
            {analysisData.summary}
          </div>
        </Card>
      )}

      {/* Deep Analysis */}
      {analysisData.deepAnalysis && (
        <Card className="p-6 cuban-card">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-6 h-6 text-[#D2691E]" />
            <h3 className="text-2xl font-bold text-[#C8A05C] font-serif">
              📖 Análisis Profundo
            </h3>
          </div>

          <div className="text-[#5C4033] leading-relaxed whitespace-pre-wrap">
            {analysisData.deepAnalysis}
          </div>
        </Card>
      )}

      {/* Top 3 Décimas (al final, como en Perplexity) */}
      {Object.entries(analysisData.topDecimasByPoet).length > 0 && (
        <Card className="p-6 cuban-card">
          <div className="flex items-center gap-3 mb-6">
            <Award className="w-6 h-6 text-[#D2691E]" />
            <h3 className="text-2xl font-bold text-[#C8A05C] font-serif">
              ⭐ Top 3 Décimas Destacadas
            </h3>
          </div>

          {Object.entries(analysisData.topDecimasByPoet).map(([poetName, topDecimas]) => (
            <div key={poetName} className="space-y-6 mb-8 last:mb-0">
              <div className="space-y-6">
                {topDecimas.map((decima, index) => (
                  <div key={decima.id} className="border-l-4 border-[#D2691E] pl-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Badge className="bg-[#D2691E] text-white">
                        Décima #{decima.number}
                      </Badge>
                      <h4 className="text-lg font-semibold text-[#5C4033]">
                        {poetName}
                      </h4>
                    </div>

                    {/* Décima Text */}
                    <div className="decima-text text-base leading-relaxed mb-4 bg-[#F5E6D3]/50 p-4 rounded-lg">
                      {decima.lines.map((line, lineIndex) => (
                        <p key={lineIndex} className="text-[#5C4033]">
                          {line}
                        </p>
                      ))}
                    </div>

                    {/* Interpretación */}
                    {decima.topThreeReason && (
                      <div className="bg-white/50 p-4 rounded-lg">
                        <h5 className="font-semibold text-[#D2691E] mb-2">INTERPRETACIÓN:</h5>
                        <p className="text-[#5C4033]/80 text-sm leading-relaxed whitespace-pre-wrap">
                          {decima.topThreeReason}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </Card>
      )}

      {/* Full Transcript Section */}
      {analysisData.rawTranscript && (
        <Card className="p-6 cuban-card">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-[#D2691E]" />
              <h3 className="text-2xl font-bold text-[#C8A05C] font-serif">
                Transcripción Completa de Perplexity
              </h3>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(analysisData.rawTranscript || '');
                    setCopiedTranscript(true);
                    setTimeout(() => setCopiedTranscript(false), 2000);
                  } catch (err) {
                    console.error('Error copying:', err);
                  }
                }}
                variant="outline"
                size="sm"
                className="border-[#C8A05C] text-[#C8A05C] hover:bg-[#C8A05C] hover:text-white"
              >
                {copiedTranscript ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Copiado
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copiar Todo
                  </>
                )}
              </Button>
              <Button
                onClick={() => setShowFullTranscript(!showFullTranscript)}
                variant="outline"
                size="sm"
                className="border-[#5C4033] text-[#5C4033] hover:bg-[#5C4033] hover:text-white"
              >
                {showFullTranscript ? 'Ocultar' : 'Mostrar'}
              </Button>
            </div>
          </div>

          {showFullTranscript && (
            <div className="bg-white/50 p-4 rounded-lg border border-[#C8A05C]/30 max-h-[600px] overflow-y-auto">
              <pre className="text-sm text-[#5C4033] whitespace-pre-wrap font-mono leading-relaxed">
                {analysisData.rawTranscript}
              </pre>
            </div>
          )}

          {!showFullTranscript && (
            <div className="bg-[#C8A05C]/10 p-4 rounded-lg border border-[#C8A05C]/30 text-center">
              <p className="text-sm text-[#5C4033]">
                <strong>💡 Haz clic en "Mostrar"</strong> para ver el texto completo que Perplexity generó.
                Esto incluye TODAS las décimas, análisis y notas originales sin formato.
              </p>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}


"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, User, FileText } from "lucide-react";

interface DecimaData {
  id: string;
  number: number;
  lines: string[];
  rhymeScheme: string;
  meter: string;
  isComplete: boolean;
  isRegular: boolean;
  timestamp?: string;
}

interface PoetData {
  id: string;
  name: string;
  turnNumber?: number;
  decimas: DecimaData[];
}

interface VideoData {
  id: string;
  title: string;
  duration: string;
  processedAt: Date;
  processingTime?: number;
  poets: PoetData[];
}

interface DecimalsSectionProps {
  videoId: string | null;
}

export default function DecimalsSection({ videoId }: DecimalsSectionProps) {
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!videoId) return;

    const fetchVideoData = async () => {
      setLoading(true);
      setError("");
      
      try {
        const response = await fetch(`/api/video/${videoId}/decimas`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Error al cargar las décimas');
        }

        setVideoData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar las décimas');
      } finally {
        setLoading(false);
      }
    };

    fetchVideoData();
  }, [videoId]);

  if (!videoId) {
    return (
      <div className="text-center py-16">
        <FileText className="w-16 h-16 mx-auto text-[#C8A05C]/50 mb-4" />
        <h3 className="text-xl font-semibold text-[#5C4033] mb-2">
          No hay décimas para mostrar
        </h3>
        <p className="text-[#5C4033]/70">
          Procesa un video primero para ver las décimas formateadas aquí.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center py-16">
        <div className="animate-spin w-8 h-8 border-4 border-[#C8A05C] border-t-transparent rounded-full mx-auto mb-4" />
        <p className="text-[#5C4033]">Cargando décimas...</p>
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

  if (!videoData) {
    return (
      <div className="text-center py-16">
        <FileText className="w-16 h-16 mx-auto text-[#C8A05C]/50 mb-4" />
        <h3 className="text-xl font-semibold text-[#5C4033] mb-2">
          Video no encontrado
        </h3>
        <p className="text-[#5C4033]/70">
          No se pudo cargar la información del video.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-[#C8A05C] mb-4 font-serif">
          🌴 Décimas Formateadas
        </h2>
        <p className="text-[#5C4033]/80 max-w-2xl mx-auto">
          Todas las décimas identificadas y formateadas según la estructura clásica de 10 versos octosílabos.
        </p>
      </div>

      {/* Video Info Header */}
      <Card className="p-8 bg-gradient-to-br from-[#F5E6D3] to-[#F5E6D3]/80 border-2 border-[#C8A05C]/30 shadow-lg">
        <div className="space-y-6">
          {/* Título del Video */}
          <div className="pb-4 border-b-2 border-[#C8A05C]/20">
            <div className="flex items-start gap-3">
              <FileText className="w-7 h-7 text-[#D2691E] flex-shrink-0 mt-1" />
              <div className="flex-1">
                <p className="text-sm font-medium text-[#D2691E] mb-2">Título del vídeo</p>
                <h3 className="text-xl font-bold text-[#5C4033] leading-relaxed">
                  {videoData.title}
                </h3>
              </div>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3 bg-white/40 p-4 rounded-lg">
              <Clock className="w-6 h-6 text-[#D2691E] flex-shrink-0" />
              <div>
                <p className="text-xs font-medium text-[#D2691E] mb-1">Duración</p>
                <p className="text-lg font-bold text-[#5C4033]">{videoData.duration}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 bg-white/40 p-4 rounded-lg">
              <User className="w-6 h-6 text-[#D2691E] flex-shrink-0" />
              <div>
                <p className="text-xs font-medium text-[#D2691E] mb-1">Poetas</p>
                <p className="text-lg font-bold text-[#5C4033]">
                  {videoData.poets.map(p => p.name).join(" vs ")}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 bg-white/40 p-4 rounded-lg">
              <Badge className="bg-[#D2691E] text-white text-xs">
                {new Date(videoData.processedAt).toLocaleDateString('es-ES', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric'
                })}
              </Badge>
              <div>
                <p className="text-xs font-medium text-[#D2691E] mb-1">Procesado</p>
                {videoData.processingTime && (
                  <p className="text-sm font-semibold text-[#5C4033]">
                    {Math.round(videoData.processingTime / 60)} min
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Décimas Alternadas por Turno */}
      {(() => {
        // Crear una lista plana de todas las décimas con información del poeta
        const allDecimas = videoData.poets.flatMap(poet => 
          poet.decimas.map(decima => ({
            ...decima,
            poetName: poet.name,
            poetId: poet.id
          }))
        );

        // Ordenar por número de décima (orden de aparición en la canturía)
        allDecimas.sort((a, b) => a.number - b.number);

        // Renderizar todas las décimas en secuencia alternada
        return allDecimas.map((decima, index) => (
          <Card key={decima.id} className="p-6 cuban-card">
            <div className="space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <h4 className="text-lg font-semibold text-[#5C4033]">
                    Décima {decima.number}
                  </h4>
                  <p className="text-sm text-[#C8A05C] font-semibold mt-1">
                    🎤 {decima.poetName}
                  </p>
                </div>
                <div className="flex gap-2">
                  {!decima.isComplete && (
                    <Badge variant="outline" className="text-orange-600 border-orange-300">
                      Incompleta
                    </Badge>
                  )}
                  {!decima.isRegular && (
                    <Badge variant="outline" className="text-yellow-600 border-yellow-300">
                      Irregular
                    </Badge>
                  )}
                  {decima.timestamp && (
                    <Badge variant="outline" className="text-[#5C4033] border-[#C8A05C]">
                      {decima.timestamp}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Décima Lines */}
              <div className="decima-text text-lg leading-relaxed space-y-1">
                {decima.lines.map((line, lineIndex) => (
                  <p key={lineIndex} className="text-[#5C4033]">
                    {line}
                  </p>
                ))}
              </div>

              {/* Technical Info */}
              <div className="pt-4 border-t border-[#C8A05C]/20 space-y-2">
                <div className="flex flex-wrap gap-6 text-sm text-[#5C4033]/80">
                  <span>
                    <strong>Esquema de rima:</strong> {decima.rhymeScheme}
                  </span>
                  <span>
                    <strong>Métrica:</strong> {decima.meter}
                  </span>
                  {decima.timestamp && (
                    <span>
                      <strong>Marca de tiempo:</strong> {decima.timestamp}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ));
      })()}

      {videoData.poets.length === 0 && (
        <div className="text-center py-16">
          <FileText className="w-16 h-16 mx-auto text-[#C8A05C]/50 mb-4" />
          <h3 className="text-xl font-semibold text-[#5C4033] mb-2">
            No se encontraron décimas
          </h3>
          <p className="text-[#5C4033]/70">
            El análisis no identificó décimas en este video.
          </p>
        </div>
      )}
    </div>
  );
}

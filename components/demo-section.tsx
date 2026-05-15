"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { PlayCircle, Youtube, Info } from "lucide-react";

interface DemoSectionProps {
  videoId?: string;
}

const GEMINI_GEM_URL = "https://gemini.google.com/gem/6e58e93575ee";

export default function DemoSection({ videoId }: DemoSectionProps) {
  // Default demo video ID (can be changed)
  const defaultVideoId = videoId || "";
  const [currentVideoId, setCurrentVideoId] = React.useState(defaultVideoId);

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <PlayCircle className="w-8 h-8 text-[#D2691E]" />
          <h2 className="text-4xl font-bold text-[#C8A05C] font-serif">
            Demostración de la App
          </h2>
        </div>
        <p className="text-[#5C4033]/80 text-lg max-w-2xl mx-auto">
          Aprende cómo usar <strong>Viajera Digital</strong> para transcribir y analizar 
          décimas de YouTube en minutos. Este video te guiará paso a paso por el proceso completo.
        </p>
      </div>

      {/* Video Player Card */}
      <Card className="cuban-card overflow-hidden">
        {currentVideoId ? (
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={`https://www.youtube.com/embed/${currentVideoId}?rel=0&modestbranding=1`}
              title="Demostración de Viajera Digital"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <div className="relative w-full bg-gradient-to-br from-[#F5E6D3] to-[#E6D7C1] flex items-center justify-center" style={{ paddingBottom: "56.25%" }}>
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
              <Youtube className="w-20 h-20 text-[#C8A05C] mb-4 opacity-50" />
              <p className="text-[#5C4033] text-lg font-medium mb-2">
                Video de demostración próximamente
              </p>
              <p className="text-[#5C4033]/70 text-sm max-w-md">
                Estamos preparando un video tutorial completo para guiarte por todas las funciones de la aplicación.
              </p>
            </div>
          </div>
        )}
      </Card>

      {/* Quick Guide */}
      <Card className="p-6 cuban-card bg-gradient-to-r from-[#F5E6D3] to-[#E6D7C1]">
        <div className="flex items-center gap-3 mb-4">
          <Info className="w-6 h-6 text-[#D2691E]" />
          <h3 className="text-2xl font-bold text-[#C8A05C] font-serif">
            Guía Rápida
          </h3>
        </div>
        
        <div className="space-y-4 text-[#5C4033]">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#C8A05C] text-white flex items-center justify-center font-bold">
              1
            </div>
            <div>
              <h4 className="font-semibold text-[#D2691E] mb-1">Pega el enlace de YouTube</h4>
              <p className="text-sm leading-relaxed">
                Copia el URL de cualquier video de décimas cubanas de YouTube y pégalo en el campo de entrada.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#C8A05C] text-white flex items-center justify-center font-bold">
              2
            </div>
            <div>
              <h4 className="font-semibold text-[#D2691E] mb-1">Indica quién comienza</h4>
              <p className="text-sm leading-relaxed">
                Escribe el nombre del poeta que comienza la canturía (aparece en el título del video).
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#C8A05C] text-white flex items-center justify-center font-bold">
              3
            </div>
            <div>
              <h4 className="font-semibold text-[#D2691E] mb-1">Transcripción automática</h4>
              <p className="text-sm leading-relaxed">
                <a
                  href={GEMINI_GEM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#D2691E] underline underline-offset-2 hover:text-[#A0522D] transition-colors"
                >
                  Google Gemini
                </a>{" "}
                transcribe y formatea automáticamente todas las décimas siguiendo las reglas tradicionales de la décima espinela.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#C8A05C] text-white flex items-center justify-center font-bold">
              4
            </div>
            <div>
              <h4 className="font-semibold text-[#D2691E] mb-1">Explora y exporta</h4>
              <p className="text-sm leading-relaxed">
                Revisa las décimas formateadas, el análisis completo y exporta los resultados en PDF o texto.
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Features Highlight */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="p-5 cuban-card text-center">
          <h4 className="font-bold text-[#C8A05C] mb-2">Simple y Rápido</h4>
          <p className="text-sm text-[#5C4033]/80">
            Procesa videos en minutos sin necesidad de descargas
          </p>
        </Card>

        <Card className="p-5 cuban-card text-center">
          <h4 className="font-bold text-[#C8A05C] mb-2">Décimas Formateadas</h4>
          <p className="text-sm text-[#5C4033]/80">
            Cada décima perfectamente estructurada con métrica y rima
          </p>
        </Card>

        <Card className="p-5 cuban-card text-center">
          <h4 className="font-bold text-[#C8A05C] mb-2">Análisis Profundo</h4>
          <p className="text-sm text-[#5C4033]/80">
            Contexto histórico y técnica de cada poeta
          </p>
        </Card>
      </div>

      {/* Call to Action */}
      <div className="text-center p-8 bg-gradient-to-r from-[#C8A05C]/10 to-[#D2691E]/10 rounded-lg border-2 border-[#C8A05C]">
        <h3 className="text-2xl font-bold text-[#C8A05C] mb-3 font-serif">
          ¿Listo para empezar?
        </h3>
        <p className="text-[#5C4033]/80 mb-4 max-w-2xl mx-auto">
          Ve a la sección <strong>"Procesar Transcripción"</strong> para comenzar a analizar 
          tus videos favoritos de décimas cubanas.
        </p>
        <a
          href={GEMINI_GEM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-2 bg-[#C8A05C] text-white rounded-lg font-medium hover:bg-[#D2691E] transition-colors"
        >
          Abrir Gemini
        </a>
      </div>
    </div>
  );
}

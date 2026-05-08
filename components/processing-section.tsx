"use client"

import { FileText, Play } from 'lucide-react'

export function ProcessingSection() {
  const handleOrderPDF = () => {
    // Dispatch event for the existing order modal system to listen to.
    // Falls back to a mailto-style anchor in the markup below if no listener is attached.
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('vd:open-order-modal'))
    }
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="rounded-lg shadow-sm p-6 bg-white/90 backdrop-blur-sm border-2 border-[#C8A05C]/20 space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-[#C8A05C] to-[#D2691E] mb-2">
            <Play className="w-7 h-7 text-white ml-1" />
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#5C4033]">
            Cómo Funciona Viajera Digital
          </h2>
          <p className="text-sm md:text-base text-[#5C4033]/80 italic font-serif max-w-2xl mx-auto">
            Mira el video demostrativo: de la canturía improvisada al PDF preservado para siempre.
          </p>
        </div>

        {/* Demo video */}
        <div className="relative aspect-video rounded-lg overflow-hidden border-2 border-[#C8A05C]/30 bg-black/5 shadow-md">
          <video
            controls
            preload="metadata"
            className="w-full h-full object-cover"
            poster="/calixto-gonzalez-hero.jpg"
          >
            <source src="/demo-viajera-digital.mp4" type="video/mp4" />
            Tu navegador no soporta la reproducción de video.
          </video>
        </div>

        {/* Order PDF CTA */}
        <div className="bg-[#F5E6D3]/60 p-6 md:p-8 rounded-lg border border-[#C8A05C]/30 text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-[#5C4033]">
            <FileText className="w-6 h-6" />
            <h3 className="text-2xl font-serif font-bold">
              Ordene su PDF
            </h3>
          </div>
          <p className="text-sm md:text-base text-[#5C4033]/85 leading-relaxed max-w-xl mx-auto font-serif">
            Envíenos la canturía y reciba un PDF profesional con la transcripción completa, las décimas identificadas por poeta y el análisis de las cuatro mejores improvisaciones.
          </p>
          <button
            onClick={handleOrderPDF}
            data-vd-action="order-pdf"
            className="inline-flex items-center gap-2 py-3 px-8 rounded-lg bg-[#D2691E] text-white hover:bg-[#C8A05C] transition-all font-serif font-semibold text-base shadow-md"
          >
            <FileText className="w-5 h-5" />
            Ordene su PDF
          </button>
        </div>
      </div>
    </div>
  )
}

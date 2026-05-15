"use client"

import Image from 'next/image'

export function HeroSection() {
  return (
    <section className="relative min-h-screen w-full">
      {/* Background image - FULL VIEWPORT */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/calixto-gonzalez-hero.jpg"
          alt="Calixto González - El Guajiro de Hialeah"
          fill
          className="object-cover"
          priority
          quality={90}
        />
      </div>
      
      {/* Very light bottom gradient only; keep portrait visible */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
      
      {/* Transparent text panel - positioned at bottom */}
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 w-[88%] max-w-xl z-10">
        <div className="text-center rounded-2xl p-5 bg-black/10 border border-[#F5E6D3]/20 shadow-[0_12px_36px_rgba(0,0,0,0.18)]">
          <h1 className="text-5xl font-serif font-bold text-[#F4D58D] mb-2 drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)]">
            El Guajiro de Hialeah
          </h1>
          <p className="text-sm tracking-widest mb-4 text-[#FFF3D6] drop-shadow-[0_2px_5px_rgba(0,0,0,0.9)]">EST. 1936</p>
          <div className="italic text-sm leading-relaxed text-[#FFF3D6] font-serif space-y-1 drop-shadow-[0_2px_5px_rgba(0,0,0,0.9)]">
            <p>Un algoritmo que siente la pasión del poeta,</p>
            <p>rescata del olvido cada improvisación,</p>
            <p>preserva intacta la lírica del corazón,</p>
            <p>y eterniza el arte vivo de la décima completa.</p>
          </div>
          <p className="text-xs mt-4 text-[#FFF3D6] drop-shadow-[0_2px_5px_rgba(0,0,0,0.9)]">
            — Emilio José Novo | Juanantoniodiaz.com
          </p>
        </div>
      </div>
    </section>
  )
}

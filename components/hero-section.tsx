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
      
      {/* Soft bottom gradient only; keep portrait visible */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
      
      {/* Centered card - positioned at bottom */}
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 w-[88%] max-w-xl z-10">
        <div className="vintage-card text-center p-6 bg-[#E8D2B8]/55 backdrop-blur-none shadow-lg border border-[#C8A05C]/25">
          <h1 className="text-5xl font-serif font-bold text-[#C8A05C] mb-2 drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]">
            El Guajiro de Hialeah
          </h1>
          <p className="text-sm tracking-widest mb-4 text-[#5C4033] drop-shadow-[0_1px_1px_rgba(255,255,255,0.45)]">EST. 1936</p>
          <div className="italic text-sm leading-relaxed text-[#5C4033] font-serif space-y-1 drop-shadow-[0_1px_1px_rgba(255,255,255,0.45)]">
            <p>Un algoritmo que siente la pasión del poeta,</p>
            <p>rescata del olvido cada improvisación,</p>
            <p>preserva intacta la lírica del corazón,</p>
            <p>y eterniza el arte vivo de la décima completa.</p>
          </div>
          <p className="text-xs mt-4 text-[#5C4033] drop-shadow-[0_1px_1px_rgba(255,255,255,0.45)]">
            — Emilio José Novo | Juanantoniodiaz.com
          </p>
        </div>
      </div>
    </section>
  )
}

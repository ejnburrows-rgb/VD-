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
      
      {/* Gradient SOLO en bottom - NO full screen */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      
      {/* Centered card - positioned at bottom */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-[90%] max-w-2xl z-10">
        <div className="vintage-card text-center p-8 bg-[#F5E6D3]/95 backdrop-blur-sm">
          <div className="text-4xl mb-2">🌴</div>
          <h1 className="text-5xl font-serif font-bold text-[#C8A05C] mb-2">
            El Guajiro de Hialeah
          </h1>
          <p className="text-sm tracking-widest mb-4 text-[#5C4033]">EST. 1936</p>
          <div className="italic text-sm leading-relaxed text-[#5C4033] font-serif space-y-1">
            <p>Un algoritmo que siente la pasión del poeta,</p>
            <p>rescata del olvido cada improvisación,</p>
            <p>preserva intacta la lírica del corazón,</p>
            <p>y eterniza el arte vivo de la décima completa.</p>
          </div>
          <p className="text-xs mt-4 text-[#5C4033]">
            — Emilio José Novo | juanantoniodiaz.com
          </p>
        </div>
      </div>
    </section>
  )
}


"use client"

import Image from 'next/image'

export function HeroSection() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Background image - FULL VIEWPORT */}
      <div className="absolute inset-0 h-full w-full">
        <Image
          src="/calixto-gonzalez-hero.jpg"
          alt="Calixto González - El Guajiro de Hialeah"
          fill
          className="object-cover"
          priority
          quality={95}
        />
      </div>

      {/* Soft cinematic depth; portrait remains visible */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_38%,rgba(0,0,0,0.18)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/24 via-transparent to-black/5" />

      {/* Transparent text panel - positioned at bottom */}
      <div className="absolute bottom-14 left-1/2 z-10 w-[88%] max-w-xl -translate-x-1/2 md:bottom-16">
        <div className="rounded-3xl border border-[#FFF3D6]/25 bg-black/[0.07] p-5 text-center shadow-[0_18px_50px_rgba(0,0,0,0.20)] md:p-6">
          <h1 className="mb-2 font-serif text-4xl font-bold tracking-wide text-[#F4D58D] drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] md:text-5xl">
            El Guajiro de Hialeah
          </h1>
          <p className="mb-4 text-sm tracking-[0.28em] text-[#FFF3D6] drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">EST. 1936</p>
          <div className="space-y-1 font-serif text-sm italic leading-relaxed text-[#FFF3D6] drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
            <p>Un algoritmo que siente la pasión del poeta,</p>
            <p>rescata del olvido cada improvisación,</p>
            <p>preserva intacta la lírica del corazón,</p>
            <p>y eterniza el arte vivo de la décima completa.</p>
          </div>
          <div className="mx-auto my-4 h-px w-24 bg-gradient-to-r from-transparent via-[#F4D58D]/80 to-transparent" />
          <p className="text-xs text-[#FFF3D6] drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
            — Emilio José Novo | Juanantoniodiaz.com
          </p>
        </div>
      </div>
    </section>
  )
}

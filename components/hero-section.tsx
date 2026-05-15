"use client"

import Image from 'next/image'

export function HeroSection() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#120B08]">
      <div className="absolute inset-y-0 right-0 h-full w-full md:w-[68%]">
        <Image
          src="/calixto-gonzalez-hero.jpg"
          alt="Calixto González - El Guajiro de Hialeah"
          fill
          className="object-cover object-center"
          priority
          quality={95}
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-[#120B08] via-[#120B08]/78 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#120B08]/78 via-transparent to-transparent" />

      <div className="relative z-10 flex min-h-screen items-end px-5 pb-16 pt-24 md:items-center md:px-12 md:pb-0">
        <div className="max-w-2xl border-l border-[#F4D58D]/50 pl-5 md:pl-8">
          <p className="mb-4 font-serif text-xs uppercase tracking-[0.45em] text-[#F4D58D]/80">EST. 1936</p>
          <h1 className="font-serif text-5xl font-bold leading-tight text-[#F4D58D] drop-shadow-[0_3px_12px_rgba(0,0,0,0.85)] md:text-7xl">
            El Guajiro de Hialeah
          </h1>
          <div className="mt-7 max-w-xl space-y-1 font-serif text-base italic leading-relaxed text-[#FFF3D6] drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] md:text-lg">
            <p>Un algoritmo que siente la pasión del poeta,</p>
            <p>rescata del olvido cada improvisación,</p>
            <p>preserva intacta la lírica del corazón,</p>
            <p>y eterniza el arte vivo de la décima completa.</p>
          </div>
          <div className="my-6 h-px w-40 bg-gradient-to-r from-[#F4D58D] to-transparent" />
          <p className="font-serif text-sm text-[#FFF3D6]/90">
            — Emilio José Novo | Juanantoniodiaz.com
          </p>
        </div>
      </div>
    </section>
  )
}

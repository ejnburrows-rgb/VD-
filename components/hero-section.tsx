"use client"

import Image from 'next/image'

export function HeroSection() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      <div className="absolute inset-0 h-full w-full">
        <Image
          src="/calixto-gonzalez-hero.jpg"
          alt="Calixto González - El Guajiro de Hialeah"
          fill
          className="object-cover object-center"
          priority
          quality={95}
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-[#3A241A]/35 via-transparent to-transparent" />

      <div className="absolute bottom-14 left-1/2 z-10 w-[90%] max-w-xl -translate-x-1/2 md:bottom-16">
        <div className="rounded-3xl border border-[#FFF6E6]/35 bg-[#4A2F24]/20 p-5 text-center shadow-xl md:p-6">
          <h1 className="mb-2 font-serif text-4xl font-bold tracking-wide text-[#FFE8A6] drop-shadow-lg md:text-5xl">
            El Guajiro de Hialeah
          </h1>
          <p className="mb-4 text-sm tracking-[0.24em] text-[#FFF6E6] drop-shadow-lg">EST. 1936</p>
          <div className="space-y-1 font-serif text-base italic leading-relaxed text-[#FFF6E6] drop-shadow-lg md:text-lg">
            <p>Un algoritmo que siente la pasión del poeta,</p>
            <p>rescata del olvido cada improvisación,</p>
            <p>preserva intacta la lírica del corazón,</p>
            <p>y eterniza el arte vivo de la décima completa.</p>
          </div>
          <div className="mx-auto my-4 h-px w-28 bg-[#FFE8A6]/80" />
          <p className="font-serif text-sm text-[#FFF6E6] drop-shadow-lg">
            — Emilio José Novo | Juanantoniodiaz.com
          </p>
        </div>
      </div>
    </section>
  )
}

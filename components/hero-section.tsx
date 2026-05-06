"use client"

import Image from 'next/image'

export function HeroSection() {
  return (
    <section className="relative min-h-screen w-full">
      {/* Background image */}
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

      {/* Bottom gradient only */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

      {/* Centered card with the décima espinela (ABBAACCDDC) */}
      <div className="absolute bottom-12 md:bottom-20 left-1/2 transform -translate-x-1/2 w-[92%] max-w-2xl z-10">
        <div className="vintage-card text-center px-6 py-8 md:px-10 md:py-10 bg-[#F5E6D3]/95">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#C8A05C] mb-2 tracking-wide">
            El Guajiro de Hialeah
          </h1>
          <p className="text-xs md:text-sm tracking-[0.3em] mb-6 text-[#5C4033]">EST. 1936</p>

          <div className="italic text-base md:text-lg leading-relaxed text-[#5C4033] font-serif space-y-1">
            <p>Aquí me tienes José</p>
            <p>cantando en distinto idioma</p>
            <p>sin olvidar La Coloma</p>
            <p>que llorando la dejé.</p>
            <p>Jamás me olvidaré</p>
            <p>de mi Madre, Padre y Tío,</p>
            <p>y aquí estoy medio vacío,</p>
            <p>nada que me pueda llenar</p>
            <p>hasta poder regresar</p>
            <p>para bañarme en mi río.</p>
          </div>

          <p className="text-xs mt-5 tracking-widest text-[#8B4513]/80 font-semibold">
            DÉCIMA ESPINELA · ABBAACCDDC
          </p>
          <p className="text-xs mt-1 text-[#5C4033]">
            — Calixto González
          </p>
        </div>
      </div>
    </section>
  )
}

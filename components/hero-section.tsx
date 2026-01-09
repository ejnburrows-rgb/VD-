"use client"

import { useState } from 'react'
import Image from 'next/image'
import { AboutModal } from './about-modal'

export function HeroSection() {
  const [aboutModalOpen, setAboutModalOpen] = useState(false)

  return (
    <>
      <section className="relative w-full h-[600px] overflow-hidden">
        {/* Background image with subtle dimming */}
        <Image
          src="/calixto-gonzalez-hero.jpg"
          alt="Calixto González en el puerto de Hialeah"
          fill
          className="object-cover object-top brightness-[0.85]"
          priority
          quality={90}
          sizes="100vw"
        />

        {/* Subtle dark overlay for gentle fade effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/35 to-black/50" />

        {/* Centered translucent writing square */}
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div
            className="w-full max-w-xl rounded-2xl border-2 border-[#C8A05C]/60 shadow-2xl text-center p-6 md:p-8 space-y-4"
            style={{
              backgroundColor: 'rgba(245, 230, 211, 0.80)',
              backdropFilter: 'blur(4px)',
            }}
          >
            <h1 className="text-4xl md:text-5xl font-serif font-bold" style={{ color: '#C8894D' }}>
              Calixto González
            </h1>
            <h2 className="text-xl md:text-2xl font-serif italic" style={{ color: '#D97706' }}>
              El Guajiro de Hialeah
            </h2>

            <div
              className="inline-flex px-5 py-1.5 rounded-full text-white font-semibold text-sm tracking-widest"
              style={{ backgroundColor: '#D97706' }}
            >
              EST 1936
            </div>

            <div className="space-y-1 italic text-sm md:text-base font-serif" style={{ color: '#5C4033' }}>
              <p>Un algoritmo que siente la pasión del poeta,</p>
              <p>rescata del olvido cada improvisación,</p>
              <p>preserva intacta la lírica del corazón,</p>
              <p>y eterniza el arte vivo de la décima completa.</p>
            </div>

            <p className="text-xs mt-2" style={{ color: '#5C4033' }}>
              © Emilio José Novo | juanantoniodiaz.com |{' '}
              <button
                onClick={() => setAboutModalOpen(true)}
                className="underline hover:text-[#D2691E] transition-colors"
              >
                Acerca de
              </button>
            </p>
          </div>
        </div>
      </section>

      <AboutModal open={aboutModalOpen} onOpenChange={setAboutModalOpen} />
    </>
  )
}

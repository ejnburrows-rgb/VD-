"use client"

import { useState } from 'react'
import Image from 'next/image'
import { AboutModal } from './about-modal'

export function HeroSection() {
  const [aboutModalOpen, setAboutModalOpen] = useState(false)

  return (
    <>
      <section className="relative w-full h-[600px] overflow-hidden">
        {/* Background image */}
        <Image
          src="/calixto-gonzalez-hero.jpg"
          alt="Calixto González en el puerto de Hialeah"
          fill
          className="object-cover object-center"
          priority
          quality={90}
          sizes="100vw"
        />

        {/* subtle vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-black/40" />

        {/* Centered translucent writing square */}
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div
            className="w-full max-w-2xl rounded-3xl border-[3px] border-[#C8A05C]/80 shadow-2xl text-center p-8 md:p-10 space-y-4"
            style={{
              backgroundColor: 'rgba(245, 230, 211, 0.82)',
              backdropFilter: 'blur(6px)',
            }}
          >
            <h1 className="text-5xl md:text-6xl font-serif font-bold" style={{ color: '#C8A05C' }}>
              Calixto González
            </h1>
            <h2 className="text-3xl md:text-4xl font-serif italic" style={{ color: '#D97706' }}>
              El Guajiro de Hialeah
            </h2>

            <div
              className="inline-flex px-6 py-2 rounded-full text-white font-semibold tracking-[0.3em]"
              style={{ backgroundColor: '#D97706' }}
            >
              EST 1936
            </div>

            <div className="mt-6 space-y-2 italic text-lg md:text-xl font-serif" style={{ color: '#5C4033' }}>
              <p>Un algoritmo que siente la pasión del poeta,</p>
              <p>rescata del olvido cada improvisación,</p>
              <p>preserva intacta la lírica del corazón,</p>
              <p>y eterniza el arte vivo de la décima completa.</p>
            </div>

            <p className="text-sm mt-4" style={{ color: '#5C4033' }}>
              © Emilio José Novo | juanantoniodiaz.com |{' '}
              <button
                onClick={() => setAboutModalOpen(true)}
                className="underline transition-colors"
                style={{ color: '#D2691E' }}
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

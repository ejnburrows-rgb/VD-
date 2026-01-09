"use client"

import { useState } from 'react'
import Image from 'next/image'
import { AboutModal } from './about-modal'

export function HeroSection() {
  const [aboutModalOpen, setAboutModalOpen] = useState(false)

  return (
    <>
      <section className="relative w-full h-[500px] overflow-hidden">
        {/* Background image */}
        <Image
          src="/calixto-gonzalez-hero.jpg"
          alt="Calixto González en el puerto de Hialeah"
          fill
          className="object-cover object-top"
          priority
          quality={90}
          sizes="100vw"
        />

        {/* subtle vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/60" />

        {/* Centered translucent writing square */}
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div
            className="w-full max-w-xl rounded-2xl border-2 border-[#C8A05C]/60 shadow-2xl text-center p-6 md:p-8 space-y-3"
            style={{
              backgroundColor: 'rgba(245, 230, 211, 0.75)',
              backdropFilter: 'blur(4px)',
            }}
          >
            <h1 className="text-4xl md:text-5xl font-serif font-bold" style={{ color: '#8B4513' }}>
              Calixto González
            </h1>
            <h2 className="text-xl md:text-2xl font-serif" style={{ color: '#D97706' }}>
              El Guajiro de Hialeah
            </h2>

            <button
              onClick={() => setAboutModalOpen(true)}
              className="inline-flex px-6 py-2 rounded-full text-white font-semibold text-sm"
              style={{ backgroundColor: '#DC2626' }}
            >
              Acerca de
            </button>
          </div>
        </div>
      </section>

      <AboutModal open={aboutModalOpen} onOpenChange={setAboutModalOpen} />
    </>
  )
}

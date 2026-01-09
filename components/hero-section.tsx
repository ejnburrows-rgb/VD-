"use client"

import { useState } from 'react'
import Image from 'next/image'
import { AboutModal } from './about-modal'

export function HeroSection() {
  const [aboutModalOpen, setAboutModalOpen] = useState(false)

  return (
    <>
      <section className="relative min-h-screen w-full overflow-hidden -mt-16">
        {/* Background image - FULL VIEWPORT */}
        <div className="absolute inset-0 w-full h-full z-0">
          <Image
            src="/calixto-gonzalez-hero.jpg"
            alt="Calixto González en el puerto de Hialeah"
            fill
            className="object-cover object-center"
            priority
            quality={90}
            sizes="100vw"
          />
        </div>
        
        {/* Gradient SOLO en bottom - NO full screen */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 via-transparent to-transparent z-[1]" />
        
        {/* Centered card - positioned at bottom */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-[90%] max-w-2xl z-20">
          <div className="vintage-card text-center p-8 bg-[#F5E6D3]/95 backdrop-blur-sm border-[3px] border-[#C8A05C] rounded-2xl shadow-2xl">
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-[#C8A05C] mb-2">
              Calixto González
            </h1>
            <h2 className="text-2xl md:text-3xl font-serif font-semibold text-[#5C4033] mb-2">
              El Guajiro de Hialeah
            </h2>
            <p className="text-sm tracking-widest mb-4 text-[#5C4033] font-semibold">
              EST 1936
            </p>
            <div className="italic text-sm md:text-base leading-relaxed text-[#5C4033] font-serif space-y-1 my-6">
              <p>Un algoritmo que siente la pasión del poeta,</p>
              <p>rescata del olvido cada improvisación,</p>
              <p>preserva intacta la lírica del corazón,</p>
              <p>y eterniza el arte vivo de la décima completa.</p>
            </div>
            <p className="text-sm text-[#5C4033] mt-4">
              © Emilio José Novo | juanantoniodiaz.com |
              <button
                onClick={() => setAboutModalOpen(true)}
                className="ml-1 text-[#D2691E] hover:text-[#C8A05C] underline transition-colors cursor-pointer"
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

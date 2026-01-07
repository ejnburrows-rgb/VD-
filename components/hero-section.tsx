
"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import AboutModal from "@/components/about-modal";

export default function HeroSection() {
  const [showAboutModal, setShowAboutModal] = useState(false);
  return (
    <section className="relative min-h-screen flex items-end justify-center overflow-hidden pt-20">
      {/* Background Image - Full Color */}
      <div className="absolute inset-0">
        <Image
          src="/calixto-gonzalez-hero.jpg"
          alt="Calixto González en el puerto de Hialeah"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Bottom Gradient Overlay - Only at bottom for text */}
      <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-[#F5E6D3]/95 via-[#F5E6D3]/80 to-transparent z-10"></div>

      {/* Content - Positioned at bottom */}
      <div className="relative z-20 w-full max-w-4xl mx-auto px-4 pb-16">
        <div className="text-center">
          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl font-bold text-[#C8A05C] mb-2 font-serif drop-shadow-lg">
            Calixto González
          </h1>
          
          {/* Subtitle */}
          <h2 className="text-3xl md:text-4xl font-semibold text-[#D2691E] mb-4 font-serif italic drop-shadow-md">
            El Guajiro de Hialeah
          </h2>
          
          {/* Badge */}
          <Badge className="text-xl bg-[#D2691E] text-white px-6 py-2 mb-8 font-semibold">
            EST 1936
          </Badge>
          
          {/* Tagline */}
          <div className="text-lg md:text-xl text-[#5C4033] italic leading-relaxed max-w-3xl mx-auto mb-8 decima-text">
            <p className="mb-2">Un algoritmo que siente la pasión del poeta,</p>
            <p className="mb-2">rescata del olvido cada improvisación,</p>
            <p className="mb-2">preserva intacta la lírica del corazón,</p>
            <p>y eterniza el arte vivo de la décima completa.</p>
          </div>
          
          {/* Attribution */}
          <p className="text-sm text-[#5C4033]">
            © Emilio José Novo | juanantoniodiaz.com | 
            <button 
              onClick={() => setShowAboutModal(true)}
              className="ml-1 underline hover:text-[#D2691E] transition-colors duration-200 font-medium"
            >
              Acerca de
            </button>
          </p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-[#C8A05C] rounded-full flex justify-center">
          <div className="w-1 h-3 bg-[#C8A05C] rounded-full mt-2"></div>
        </div>
      </div>

      {/* About Modal */}
      <AboutModal 
        isOpen={showAboutModal} 
        onClose={() => setShowAboutModal(false)} 
      />
    </section>
  );
}

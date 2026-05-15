"use client"

import { ExternalLink } from 'lucide-react'

const GEMINI_GEM_URL = 'https://gemini.google.com/gem/6e58e93575ee'

export function ProcessingSection() {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-4">
      <div className="rounded-lg p-4 bg-white/85 border border-[#C8A05C]/30 shadow-sm text-center space-y-3">
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#5C4033]">
          Transcribir Canturía
        </h2>
        <a
          href={GEMINI_GEM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#D2691E] text-white hover:bg-[#C8A05C] transition-colors font-serif font-semibold shadow-sm"
        >
          Abrir Gemini
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  )
}

"use client"

import { ExternalLink } from 'lucide-react'

const GEMINI_GEM_URL = 'https://gemini.google.com/gem/6e58e93575ee'

export function ProcessingSection() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-2">
      <div className="rounded-3xl border border-[#F4D58D]/25 bg-[#FFF3D6]/8 p-6 text-center shadow-2xl md:p-8">
        <div className="mx-auto mb-5 h-px w-32 bg-gradient-to-r from-transparent via-[#F4D58D] to-transparent" />
        <h2 className="font-serif text-4xl font-bold tracking-wide text-[#F4D58D] md:text-5xl">
          Transcribir Canturía
        </h2>
        <a
          href={GEMINI_GEM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-full border border-[#F4D58D] bg-[#F4D58D] px-7 py-3 font-serif font-bold text-[#20130D] shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#FFF3D6]"
        >
          Abrir Gemini
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </div>
  )
}

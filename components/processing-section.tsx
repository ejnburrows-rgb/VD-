"use client"

import { ExternalLink } from 'lucide-react'

const GEMINI_GEM_URL = 'https://gemini.google.com/gem/6e58e93575ee'

export function ProcessingSection() {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-5">
      <div className="rounded-2xl border border-[#C8A05C]/35 bg-[#FFF8EC]/82 p-5 text-center shadow-[0_14px_36px_rgba(92,64,51,0.13)] backdrop-blur-sm md:p-6">
        <div className="mx-auto mb-4 h-px w-24 bg-gradient-to-r from-transparent via-[#C8A05C] to-transparent" />
        <h2 className="font-serif text-2xl font-bold tracking-wide text-[#4A2F24] md:text-3xl">
          Transcribir Canturía
        </h2>
        <a
          href={GEMINI_GEM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-[#D97706] to-[#B45309] px-6 py-3 font-serif font-semibold text-[#FFF8EC] shadow-[0_10px_22px_rgba(180,83,9,0.24)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(180,83,9,0.30)]"
        >
          Abrir Gemini
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </div>
  )
}

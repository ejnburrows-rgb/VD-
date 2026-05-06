"use client"

import Link from 'next/link'

export function Header() {
  return (
    <header className="bg-[#F5E6D3] border-b-2 border-[#C8A05C] py-4 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <h1 className="text-2xl font-serif font-bold text-[#D97706]">
            Viajera Digital
          </h1>
          <p className="text-sm text-[#5C4033]">
            Por <strong>Emilio José Novo</strong> • Recursos:{' '}
            <Link
              href="https://juanantoniodiaz.com/acerca-de/"
              className="underline hover:text-[#D2691E] transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Juanantoniodiaz.com
            </Link>
          </p>
        </div>
      </div>
    </header>
  )
}


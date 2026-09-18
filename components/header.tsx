"use client"

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#C8A05C]/35 bg-gradient-to-b from-[#8B4513] via-[#7B3F16] to-[#6F3512] px-4 py-3 shadow-[0_8px_22px_rgba(92,64,51,0.26)]">
      <div className="container mx-auto max-w-7xl text-center">
        <h1 className="font-serif text-3xl font-bold tracking-wide text-[#FFF6E6] drop-shadow-[0_2px_3px_rgba(0,0,0,0.35)] md:text-4xl">
          Viajera Digital
        </h1>
      </div>
    </header>
  )
}

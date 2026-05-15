"use client"

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#C8A05C]/25 bg-gradient-to-b from-[#8A3F12] via-[#7C3510] to-[#6E2E0D] px-4 py-3 shadow-[0_8px_24px_rgba(74,47,36,0.22)]">
      <div className="container mx-auto max-w-7xl text-center">
        <h1 className="font-serif text-3xl font-bold tracking-wide text-[#FFF3D6] drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)] md:text-4xl">
          Viajera Digital
        </h1>
      </div>
    </header>
  )
}

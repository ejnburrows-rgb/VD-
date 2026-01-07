
"use client";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#F5E6D3]/95 backdrop-blur-sm border-b-2 border-[#C8A05C] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <h1 className="text-3xl md:text-4xl font-bold text-[#D2691E] font-serif text-center">
          Viajera Digital
        </h1>
        <p className="text-sm text-center text-[#5C4033] mt-2">
          Por <strong className="text-[#D2691E]">Emilio José Novo</strong> • Recursos: <a 
            href="https://juanantoniodiaz.com/acerca-de/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="font-bold text-[#C8A05C] hover:text-[#D2691E] underline transition-colors duration-200"
          >
            Juanantoniodiaz.com
          </a>
        </p>
      </div>
    </header>
  );
}

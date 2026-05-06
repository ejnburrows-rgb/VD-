"use client"

import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-[#78350F] text-[#F5E6D3] py-8 px-4 mt-12 border-t-4 border-[#C8A05C]">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Información del Proyecto */}
          <div>
            <h3 className="text-xl font-serif font-bold text-[#C8A05C] mb-4">
              Viajera Digital
            </h3>
            <p className="text-sm text-[#F5E6D3]/80 mb-2">
              Plataforma de transcripción y análisis de décima espinela cubana.
            </p>
            <p className="text-sm text-[#F5E6D3]/80">
              Preservando el patrimonio cultural cubano a través de la tecnología.
            </p>
          </div>

          {/* Recursos */}
          <div>
            <h3 className="text-xl font-serif font-bold text-[#C8A05C] mb-4">
              Recursos
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="https://juanantoniodiaz.com/acerca-de/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#F5E6D3]/80 hover:text-[#C8A05C] transition-colors underline"
                >
                  Juanantoniodiaz.com
                </Link>
              </li>
              <li>
                <Link
                  href="https://youtube.com/@juanantoniodiaz9034"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#F5E6D3]/80 hover:text-[#C8A05C] transition-colors underline"
                >
                  Canal de YouTube
                </Link>
              </li>
            </ul>
          </div>

          {/* Créditos */}
          <div>
            <h3 className="text-xl font-serif font-bold text-[#C8A05C] mb-4">
              Créditos
            </h3>
            <p className="text-sm text-[#F5E6D3]/80 mb-2">
              <strong>Desarrollado por:</strong>
            </p>
            <p className="text-sm text-[#F5E6D3]/80 mb-4">
              Emilio José Novo
            </p>
            <p className="text-xs text-[#F5E6D3]/60">
              © {new Date().getFullYear()} Viajera Digital. Todos los derechos reservados.
            </p>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="border-t border-[#C8A05C]/30 mt-8 pt-6 text-center">
          <p className="text-xs text-[#F5E6D3]/60">
            En memoria de <strong className="text-[#C8A05C]">Calixto González</strong>, 
            "El Guajiro de Hialeah" (1936-2024)
          </p>
        </div>
      </div>
    </footer>
  )
}


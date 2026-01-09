"use client"

export function Footer() {
  return (
    <footer className="bg-[#78350F] text-[#F5E6D3] mt-auto">
      {/* Main Footer Content */}
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* El Guajiro de Hialeah */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🌴</span>
              <h3 className="text-xl font-serif font-bold text-[#C8A05C]">
                El Guajiro de Hialeah
              </h3>
            </div>
            <p className="text-sm text-[#F5E6D3]/80 mb-2">
              Plataforma de transcripción y análisis de décima espinela cubana.
            </p>
            <p className="text-sm text-[#F5E6D3]/70">
              © 2026 El Guajiro de Hialeah. Todos los derechos reservados.
            </p>
          </div>

          {/* Creador */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">👤</span>
              <h3 className="text-xl font-serif font-bold text-[#C8A05C]">
                Creador
              </h3>
            </div>
            <p className="text-sm text-[#F5E6D3] font-semibold mb-2">
              Emilio José Novo
            </p>
            <p className="text-sm text-[#F5E6D3]/80 mb-3">
              Desarrollador y arquitecto de la plataforma. Preservando el patrimonio cultural cubano a través de la tecnología.
            </p>
            <p className="text-xs text-[#F5E6D3]/60">
              Propiedad intelectual protegida bajo las leyes de derechos de autor de Estados Unidos.
            </p>
          </div>

          {/* Legal & Patentes */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">⚖️</span>
              <h3 className="text-xl font-serif font-bold text-[#C8A05C]">
                Legal & Patentes
              </h3>
            </div>
            <div className="space-y-2 text-sm text-[#F5E6D3]/80">
              <p>
                <strong className="text-[#F5E6D3]">Patente Pendiente:</strong>{' '}
                Tecnología de transcripción y análisis automatizado de décima espinela.
              </p>
              <p>
                <strong className="text-[#F5E6D3]">Copyright:</strong>{' '}
                Todo el contenido, diseño, código fuente y algoritmos están protegidos por derechos de autor.
              </p>
              <p>
                <strong className="text-[#F5E6D3]">Licencia:</strong>{' '}
                Creative Commons BY-NC-SA 4.0 (Uso no comercial con atribución)
              </p>
            </div>
          </div>
        </div>

        {/* Línea divisoria con honor */}
        <div className="border-t border-[#C8A05C]/30 mt-8 pt-6 text-center space-y-3">
          <p className="text-sm text-[#F5E6D3]/80">
            Desarrollado con ❤ en Miami, Florida • En honor a{' '}
            <strong className="text-[#C8A05C]">Calixto González</strong>{' '}
            "El Guajiro de Hialeah"
          </p>
          <p className="text-sm text-[#F5E6D3]/70 italic">
            "Un algoritmo que siente la pasión del poeta, rescata del olvido cada improvisación,
            <br className="hidden md:block" />
            preserva intacta la lírica del corazón, y eterniza el arte vivo de la décima completa."
          </p>
          <p className="text-sm text-[#F5E6D3]/80">
            © <strong>Emilio José Novo</strong>
          </p>
        </div>
      </div>

      {/* Legal Disclaimer */}
      <div className="bg-[#5C4033] py-4 px-4">
        <div className="container mx-auto max-w-7xl">
          <p className="text-xs text-[#F5E6D3]/70 text-center leading-relaxed">
            <strong className="text-[#F5E6D3]/90">Aviso Legal:</strong>{' '}
            Este software y su contenido están protegidos por las leyes de propiedad intelectual de los Estados Unidos y tratados internacionales. El uso no autorizado, reproducción, distribución o modificación puede resultar en sanciones civiles y penales. Todos los análisis y transcripciones generados por esta plataforma son para fines educativos y de preservación cultural.
          </p>
        </div>
      </div>
    </footer>
  )
}

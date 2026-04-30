"use client"

import { Shield, Scale, Youtube, Globe } from 'lucide-react'
import Link from 'next/link'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#4A3728] text-white py-12 border-t-4 border-[#C8A05C]">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid md:grid-cols-3 gap-12 mb-10">
          {/* Columna 1: Identidad */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-[#C8A05C]" />
              <h3 className="text-xl font-serif font-bold text-[#C8A05C]">Viajera Digital</h3>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              Tecnología de vanguardia para la preservación del patrimonio oral cubano. IA Claude Sonnet • Transcripción de Audio • Análisis Académico • Patrimonio UNESCO.
            </p>
            <div className="pt-2 text-xs text-gray-400 space-y-1">
              <p>Desarrollado en Miami, Florida</p>
              <p>En honor a Calixto González "El Guajiro de Hialeah"</p>
            </div>
          </div>

          {/* Columna 2: Contacto y Enlaces */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Globe className="w-6 h-6 text-[#D2691E]" />
              <h3 className="text-xl font-serif font-bold text-[#D2691E]">Recursos</h3>
            </div>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="https://juanantoniodiaz.com" target="_blank" className="flex items-center gap-2 hover:text-[#C8A05C] transition-colors">
                  <Globe className="w-4 h-4" /> JuanAntonioDiaz.com
                </Link>
              </li>
              <li>
                <Link href="https://youtube.com/@juanantoniodiaz9034" target="_blank" className="flex items-center gap-2 hover:text-[#C8A05C] transition-colors">
                  <Youtube className="w-4 h-4" /> @juanantoniodiaz9034
                </Link>
              </li>
              <li className="pt-2">
                <p><strong>Creada por:</strong> Emilio José Novo</p>
                <p className="text-xs text-gray-400">Versión 2.0 Pro</p>
              </li>
            </ul>
          </div>

          {/* Columna 3: Legal */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Scale className="w-6 h-6 text-[#C8A05C]" />
              <h3 className="text-xl font-serif font-bold text-[#C8A05C]">Legal</h3>
            </div>
            <div className="text-xs text-gray-300 space-y-3 leading-relaxed">
              <p>
                <strong className="text-white">Patente Pendiente:</strong> Tecnología de transcripción y análisis automatizado de décima espinela.
              </p>
              <p>
                <strong className="text-white">Licencia:</strong> Creative Commons BY-NC-SA 4.0 (Uso no comercial con atribución)
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-[#C8A05C]/20 pt-8 text-center space-y-6">
          <p className="text-xs text-gray-400 italic max-w-2xl mx-auto leading-relaxed">
            "Un algoritmo que siente la pasión del poeta, rescata del olvido cada improvisación, preserva intacta la lírica del corazón, y eterniza el arte vivo de la décima completa."
          </p>
          
          <div className="space-y-1">
            <p className="text-sm font-bold text-[#C8A05C]">© {currentYear} Emilio José Novo</p>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest">Todos los derechos reservados</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

"use client";

import React from "react";
import { Heart, Shield, Scale } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-[#5C4033] to-[#3E2B24] text-white py-8 mt-12">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-3 gap-8 mb-6">
          {/* Column 1: Copyright & Creator */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-5 h-5 text-[#C8A05C]" />
              <h3 className="text-lg font-bold text-[#C8A05C]">El Guajiro de Hialeah</h3>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              Plataforma de transcripción y análisis de décima espinela cubana.
            </p>
            <p className="text-xs text-gray-400">
              © {currentYear} El Guajiro de Hialeah. Todos los derechos reservados.
            </p>
          </div>

          {/* Column 2: Creator & Intellectual Property */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-2">
              <Heart className="w-5 h-5 text-[#D2691E]" />
              <h3 className="text-lg font-bold text-[#D2691E]">Creador</h3>
            </div>
            <p className="text-sm">
              <strong className="text-[#C8A05C]">Emilio José Novo</strong>
            </p>
            <p className="text-xs text-gray-300 leading-relaxed">
              Desarrollador y arquitecto de la plataforma. Preservando el patrimonio cultural cubano a través de la tecnología.
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Propiedad intelectual protegida bajo las leyes de derechos de autor de Estados Unidos.
            </p>
          </div>

          {/* Column 3: Legal & Patents */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-2">
              <Scale className="w-5 h-5 text-[#C8A05C]" />
              <h3 className="text-lg font-bold text-[#C8A05C]">Legal & Patentes</h3>
            </div>
            <div className="text-xs text-gray-300 space-y-2 leading-relaxed">
              <p>
                <strong className="text-white">Patente Pendiente:</strong> Tecnología de transcripción y análisis automatizado de décima espinela.
              </p>
              <p>
                <strong className="text-white">Copyright:</strong> Todo el contenido, diseño, código fuente y algoritmos están protegidos por derechos de autor.
              </p>
              <p>
                <strong className="text-white">Licencia:</strong> Creative Commons BY-NC-SA 4.0 (Uso no comercial con atribución)
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#C8A05C]/30 my-6"></div>

        {/* Bottom Footer */}
        <div className="text-center space-y-2">
          <p className="text-xs text-gray-400">
            Desarrollado con <span className="text-[#D2691E]">❤</span> en Miami, Florida • En honor a <strong className="text-[#C8A05C]">Calixto González</strong> "El Guajiro de Hialeah"
          </p>
          <p className="text-xs text-gray-500 italic mt-3">
            "Un algoritmo que siente la pasión del poeta, rescata del olvido cada improvisación,<br />
            preserva intacta la lírica del corazón, y eterniza el arte vivo de la décima completa."
          </p>
          <p className="text-sm text-gray-300 mt-4">
            © <strong className="text-[#C8A05C]">Emilio José Novo</strong>
          </p>
        </div>

        {/* Legal Disclaimer */}
        <div className="mt-6 p-4 bg-[#3E2B24]/50 rounded-lg border border-[#C8A05C]/20">
          <p className="text-xs text-gray-400 text-center leading-relaxed">
            <strong className="text-[#C8A05C]">Aviso Legal:</strong> Este software y su contenido están protegidos por las leyes de propiedad intelectual de los Estados Unidos y tratados internacionales. El uso no autorizado, reproducción, distribución o modificación puede resultar en sanciones civiles y penales. Todos los análisis y transcripciones generados por esta plataforma son para fines educativos y de preservación cultural.
          </p>
        </div>
      </div>
    </footer>
  );
}

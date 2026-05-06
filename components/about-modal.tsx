"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { Badge } from './ui/badge'

interface AboutModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AboutModal({ open, onOpenChange }: AboutModalProps) {
  const [showLeonorInfo, setShowLeonorInfo] = useState(false)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-[#F5E6D3] text-[#5C4033] border-2 border-[#C8A05C]">
        <DialogHeader>
          <DialogTitle className="text-3xl font-serif font-bold text-[#C8894D] mb-6 text-center">
            Acerca de El Guajiro de Hialeah
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          <section className="grid md:grid-cols-2 gap-6">
            <div className="p-4 bg-white/70 rounded-lg border border-[#C8A05C]/30">
              <h4 className="text-lg font-bold mb-2 text-[#D2691E]">
                Desarrollo
              </h4>
              <p>Creada por: <strong>Emilio José Novo</strong></p>
            </div>
            <div className="p-4 bg-white/70 rounded-lg border border-[#C8A05C]/30">
              <h4 className="text-lg font-bold mb-2 text-[#D2691E]">
                Recursos Web
              </h4>
              <p>
                Web:{' '}
                <Link href="https://juanantoniodiaz.com/acerca-de/" target="_blank" rel="noopener noreferrer" className="underline font-bold text-[#D2691E]">
                  Juanantoniodiaz.com
                </Link>
              </p>
              <p>
                Canal:{' '}
                <Link href="https://youtube.com/@juanantoniodiaz9034" target="_blank" rel="noopener noreferrer" className="underline font-bold text-[#D2691E]">
                  @juanantoniodiaz9034
                </Link>
              </p>
            </div>
          </section>

          <section className="border-t border-[#C8A05C]/40 pt-4">
            <p className="text-sm font-semibold text-[#D2691E] mb-2">
              Agradecimientos por la creación a:
            </p>
            <p className="text-base">
              <strong>Leonor Lopetegui</strong>
              <button
                onClick={() => setShowLeonorInfo(!showLeonorInfo)}
                className="ml-2 text-[#D2691E] hover:text-[#C8A05C] transition-colors font-bold text-lg"
                aria-label="Más sobre Leonor Lopetegui"
              >
                *
              </button>
            </p>

            {showLeonorInfo && (
              <div className="mt-4 p-4 bg-[#F5E6D3] border-2 border-[#C8A05C] rounded-lg space-y-3 text-sm animate-in fade-in duration-300">
                <p>
                  Leonor Lopetegui ha sido mi maestra de español y consejera desde que llegué de Cuba a los cinco años.
                </p>
                <p>
                  Su trayectoria está marcada por honores monumentales: es <strong>Premio Cervantes de la Universidad Nova Southeastern</strong>,
                  fue <strong>Maestra del Año</strong> en la Escuela Primaria James H. Bright (2001-2002), y elegida
                  <strong> Educadora Bilingüe del Año</strong> por la Asociación Bilingüe de la Florida.
                </p>
                <p>
                  Lideró por más de una década la División de Educación Bilingüe e Idiomas del Mundo para las Escuelas Públicas de Miami-Dade.
                  En reconocimiento a su impacto, la Ciudad de Sweetwater proclamó el <strong>6 de junio de 2014</strong> como el
                  "Día de la Sra. Leonor Lopetegui".
                </p>
              </div>
            )}
          </section>

          <div className="flex flex-wrap gap-2 justify-center mt-4">
            {['IA Claude Sonnet', 'NextJS 14', 'Transcripción de Audio', 'Análisis Académico', 'Patrimonio UNESCO'].map((label) => (
              <Badge key={label} className="text-xs bg-[#C8A05C] text-[#F5E6D3]">
                {label}
              </Badge>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

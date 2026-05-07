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

  const brownText = { color: '#5C4033' }
  const orangeText = { color: '#D2691E' }
  const goldBadge = { backgroundColor: '#C8A05C', color: '#F5E6D3' }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-[#F5E6D3] text-[#5C4033] border-2 border-[#C8A05C]">
        <DialogHeader>
          <DialogTitle className="text-3xl font-serif font-bold text-[#C8894D] mb-6 text-center">
            Acerca de El Guajiro de Hialeah
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* DÉCIMA PARA JOSÉ — full 10-line ABBAACCDDC structure */}
          <div className="p-6 bg-white/60 rounded-lg border-2 border-[#D2691E]/30 italic text-center text-base md:text-lg leading-relaxed shadow-sm">
            <p className="font-bold text-[#D2691E] mb-4 not-italic">"Décima para José"</p>
            <p>Aquí me tienes, José,</p>
            <p>cantando en distinto idioma,</p>
            <p>sin olvidar La Coloma</p>
            <p>que llorando la dejé.</p>
            <p>Jamás me olvidaré</p>
            <p>de mi Madre, Padre y Tío,</p>
            <p>y aquí estoy medio vacío,</p>
            <p>nada que me pueda llenar</p>
            <p>hasta poder regresar</p>
            <p>para bañarme en mi río.</p>
          </div>

          <p className="font-semibold" style={brownText}>
            Viajera Digital nace de este legado. Esta fue la primera décima que escuché en vivo,
            cantada por mi abuelo Calixto para mí. Honramos su memoria y la de todos los poetas
            que mantienen viva esta tradición milenaria.
          </p>

          <section className="grid md:grid-cols-2 gap-6">
            <div className="p-4 bg-white/70 rounded-lg border border-[#C8A05C]/30">
              <h4 className="text-lg font-bold flex items-center gap-2" style={orangeText}>
                Desarrollo
              </h4>
              <p>Creada por: <strong>Emilio José Novo</strong></p>
              <p>Versión: 2.0 Pro</p>
            </div>
            <div className="p-4 bg-white/70 rounded-lg border border-[#C8A05C]/30">
              <h4 className="text-lg font-bold flex items-center gap-2" style={orangeText}>
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

          {/* Leonor Lopetegui */}
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
                  Leonor Lopetegui ha sido mi maestra de español y consejera desde que llegué de Cuba a los cinco años,
                  traído por ella y su esposo, mi tío Armando González.
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
              <Badge key={label} className="text-xs" style={goldBadge}>
                {label}
              </Badge>
            ))}
          </div>

          <p className="text-center italic text-sm mt-6 text-[#5C4033]/70">
            "Un algoritmo que siente la pasión del poeta, rescata del olvido cada improvisación, preserva intacta la lírica del corazón, y eterniza el arte vivo de la
            décima completa."
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

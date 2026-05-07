"use client"

import Link from 'next/link'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { Badge } from './ui/badge'
import { MemorialContent } from './memorial-content'

interface AboutModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AboutModal({ open, onOpenChange }: AboutModalProps) {
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

        <article className="memorial-prose space-y-5 mt-2 leading-relaxed text-[15px] md:text-base text-[#3A2A1C] font-serif">
          <MemorialContent />
        </article>

        <section className="grid md:grid-cols-2 gap-6 mt-8 pt-6 border-t border-[#C8A05C]/40">
          <div className="p-4 bg-white/70 rounded-lg border border-[#C8A05C]/30">
            <h4 className="text-lg font-bold mb-2" style={orangeText}>
              Desarrollo
            </h4>
            <p>Creada por: <strong>Emilio José Novo</strong></p>
            <p>Versión: 2.0 Pro</p>
          </div>
          <div className="p-4 bg-white/70 rounded-lg border border-[#C8A05C]/30">
            <h4 className="text-lg font-bold mb-2" style={orangeText}>
              Recursos Web
            </h4>
            <p>
              Web:{' '}
              <Link href="https://juanantoniodiaz.com" target="_blank" rel="noopener noreferrer" className="underline font-bold text-[#D2691E]">
                JuanAntonioDiaz.com
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

        <div className="flex flex-wrap gap-2 justify-center mt-6">
          {['IA Claude Sonnet', 'NextJS 14', 'Transcripción de Audio', 'Análisis Académico', 'Patrimonio UNESCO'].map((label) => (
            <Badge key={label} className="text-xs" style={goldBadge}>
              {label}
            </Badge>
          ))}
        </div>

        <p className="text-center italic text-sm mt-6 text-[#5C4033]/70">
          “Un algoritmo que siente la pasión del poeta, rescata del olvido cada improvisación, preserva intacta la lírica del corazón, y eterniza el arte vivo de la décima completa.”
        </p>
      </DialogContent>
    </Dialog>
  )
}

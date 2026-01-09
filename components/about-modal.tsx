"use client"

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import { Button } from './ui/button'
import Link from 'next/link'

interface AboutModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AboutModal({ open, onOpenChange }: AboutModalProps) {
  const [showLeonorInfo, setShowLeonorInfo] = useState(false)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-[#F5E6D3] text-[#5C4033]">
        <DialogHeader>
          <DialogTitle className="text-3xl font-serif font-bold text-[#C8A05C] mb-6 text-center">
            🌴 Acerca de El Guajiro de Hialeah
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Introducción */}
          <section className="mb-8">
            <p className="text-lg leading-relaxed mb-4 text-[#5C4033]">
              <strong>El Guajiro de Hialeah</strong> es una aplicación dedicada a la preservación 
              y análisis de la <strong>décima espinela cubana</strong> — uno de los tesoros más 
              valiosos del patrimonio cultural inmaterial de Cuba.
            </p>
          </section>

          {/* Misión */}
          <section className="mb-8">
            <h3 className="text-2xl font-serif font-bold text-[#C8A05C] mb-4">Misión de Preservación</h3>
            <p className="mb-4 text-[#5C4033]">
              En un mundo donde las improvisaciones poéticas pueden perderse 
              en el olvido después de ser cantadas, nuestra misión es:
            </p>
            <ul className="space-y-2 ml-6 text-[#5C4033]">
              <li>🎤 <strong>Rescatar del olvido</strong> cada improvisación</li>
              <li>📜 <strong>Preservar intacta</strong> la lírica del corazón guajiro</li>
              <li>🌟 <strong>Eternizar</strong> el arte vivo de la décima completa</li>
              <li>🎓 <strong>Educar</strong> sobre la rica historia de este arte</li>
              <li>🤝 <strong>Conectar</strong> generaciones a través de la poesía</li>
            </ul>
          </section>

          {/* Homenaje a Calixto González */}
          <section className="mb-8 p-6 bg-[#F5E6D3] rounded-lg border-2 border-[#C8A05C]">
            <h3 className="text-2xl font-serif font-bold text-[#C8A05C] mb-4">
              Dedicado a Calixto González
            </h3>
            <p className="mb-4 text-[#5C4033]">
              Esta aplicación honra la memoria de <strong>Calixto González</strong> (1936–),
              el verdadero <strong>Guajiro de Hialeah</strong>, cuya vida y arte 
              inspiraron generaciones de decimistas.
            </p>
            
            <blockquote className="decima-text text-center my-6 p-4 border-l-4 border-[#C8A05C] italic text-[#5C4033]">
              Hoy que te vas con la muerte<br/>
              hacia una casa de cielo,<br/>
              la sequía del pañuelo<br/>
              en ríos se nos convierte.<br/>
              Y aunque no podamos verte<br/>
              jamás, en la cantura,<br/>
              no existirá un solo día<br/>
              que se hable de ejemplo<br/>
              de Hombre que no se escuche<br/>
              tu nombre, Guajiro de Hialeah.
              <footer className="mt-4 text-right text-sm not-italic">
                — <cite>Juan Antonio Díaz</cite>
              </footer>
            </blockquote>
          </section>

          {/* SECCIÓN LEONOR LOPETEGUI - CRÍTICO */}
          <section className="mb-8 p-6 bg-[#F5E6D3] rounded-lg border-2 border-[#C8A05C]">
            <h3 className="text-2xl font-serif font-bold text-[#C8A05C] mb-4">
              Agradecimientos por la Creación
            </h3>
            
            <h4 className="text-xl font-semibold text-[#5C4033] mb-3">
              Leonor Lopetegui
              <button
                onClick={() => setShowLeonorInfo(!showLeonorInfo)}
                className="ml-2 text-[#D2691E] hover:text-[#C8A05C] transition-colors font-bold text-lg"
                aria-label="Ver más información sobre Leonor Lopetegui"
              >
                *
              </button>
            </h4>
            
            {showLeonorInfo && (
              <div className="mt-4 space-y-4 text-base leading-relaxed animate-in fade-in duration-300">
                <p>
                  <strong>Leonor Lopetegui</strong> ha sido mi maestra de español, consejera 
                  y una abuela más que la vida me regaló desde mis cinco años de edad, 
                  cuando ella junto a su esposo, mi tío Armando González, me trajo de Cuba 
                  junto a mis padres. Al igual que a tantos otros de nuestra familia, 
                  nos ayudaron a comenzar una nueva vida en Miami, una experiencia que 
                  marcó profundamente mi formación y mi corazón.
                </p>

                <p>
                  Con <strong>casi cincuenta años dedicados a la enseñanza del español</strong>, 
                  la Sra. Lopetegui no solo dominó el arte de enseñar con pasión y devoción 
                  en las <strong>Escuelas Públicas del Condado de Miami-Dade</strong>, sino que 
                  tocó innumerables vidas con su generosidad y amor incondicional.
                </p>

                <div className="pl-4 border-l-4 border-[#C8A05C] bg-[#F5E6D3] p-4 rounded">
                  <p className="font-semibold mb-2 text-[#5C4033]">Reconocimientos Extraordinarios:</p>
                  <ul className="space-y-2 ml-4 text-sm">
                    <li>
                      🏆 <strong>Premio Cervantes</strong> de la Universidad Nova Southeastern 
                      por hacer una diferencia en la educación hispana
                    </li>
                    <li>
                      ⭐ <strong>Maestra del Año</strong> en la Escuela Primaria James H. Bright 
                      (año escolar 2001-2002)
                    </li>
                    <li>
                      🎓 <strong>Educadora Bilingüe del Año</strong> por la Asociación 
                      Bilingüe de la Florida
                    </li>
                    <li>
                      👑 <strong>Líder de la División de Educación Bilingüe e Idiomas del Mundo</strong> 
                      para las Escuelas Públicas del Condado de Miami-Dade (más de 10 años)
                    </li>
                    <li>
                      📚 <strong>Autora</strong> de libros educativos para niños
                    </li>
                    <li>
                      🌎 <strong>Conferencista</strong> en eventos educativos nacionales e 
                      internacionales (Asociación Nacional de Educación Bilingüe)
                    </li>
                  </ul>
                </div>

                <p className="italic p-4 bg-[#C8A05C]/10 rounded text-[#5C4033]">
                  En reconocimiento a esta labor monumental, la <strong>Ciudad de Sweetwater</strong> 
                  proclamó el <strong>6 de junio de 2014</strong> como el 
                  <strong>"Día de la Sra. Leonor Lopetegui"</strong>.
                </p>

                <p className="font-semibold text-lg text-center text-[#5C4033]">
                  Para mí y para tantos otros, ella representa mucho más que todos estos honores: 
                  es un <strong>ejemplo vivo de generosidad, sabiduría y amor</strong> que 
                  trasciende las aulas y perdura para siempre en nuestros corazones.
                </p>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowLeonorInfo(false)}
                  className="mt-4"
                >
                  Cerrar
                </Button>
              </div>
            )}
          </section>

          {/* Tributo Final */}
          <section className="mb-8 text-center">
            <div className="border-t-2 border-[#C8A05C] pt-6 mt-6">
              <p className="text-xl italic font-semibold text-[#5C4033] mb-4">
                A todos los poetas que han dedicado sus vidas a mantener viva la décima:
              </p>
              <p className="text-lg text-[#5C4033]">
                Su voz sigue cantando en cada verso que procesamos aquí.
              </p>
            </div>
          </section>

          {/* Footer */}
          <footer className="text-center text-sm border-t-2 border-[#C8A05C] pt-6 mt-6">
            <p className="font-semibold mb-2 text-[#5C4033]">
              Creada por <strong>Emilio José Novo</strong>
            </p>
            <p className="mb-2 text-[#5C4033]">
              Web:{' '}
              <Link 
                href="https://juanantoniodiaz.com/acerca-de/" 
                className="text-[#D2691E] hover:underline"
                target="_blank" 
                rel="noopener noreferrer"
              >
                juanantoniodiaz.com
              </Link>
            </p>
            <p className="mb-2 text-[#5C4033]">
              <strong>Versión 2.0 Pro</strong>
            </p>
            <p className="text-xs text-[#5C4033]/70 mt-4">
              Licencia: <strong>Creative Commons</strong> — Uso libre con atribución
            </p>
          </footer>
        </div>
      </DialogContent>
    </Dialog>
  )
}


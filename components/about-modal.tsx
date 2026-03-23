"use client"

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
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
          {/* Calixto: Tejedor Entre Dos Orillas */}
          <section className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C8A05C] to-[#D2691E] flex items-center justify-center">
                <span className="text-2xl">🌴</span>
              </div>
              <h3 className="text-2xl font-serif font-bold text-[#C8A05C]">
                Calixto: Tejedor Entre Dos Orillas
              </h3>
            </div>

            <div className="space-y-4 text-[#5C4033] leading-relaxed">
              <p>
                Calixto nació donde el cielo toca el agua—<strong>La Coloma</strong>, pueblo de pescadores.
                Entre barcas y sal, aprendió lo que el mar enseña: esperar es arte. Los pescadores lo saben—tejer redes lleva días,
                tejer palabras pide lo mismo.
              </p>

              <p>
                La décima le palpitaba desde niño. Esa forma de diez versos que cruzó el océano y echó raíces en Cuba.
                Calixto se hizo trovador—no de rimas fáciles, sino de las que improvisan con el corazón. Creación colectiva, siempre.
              </p>

              <p>
                El exilio lo llevó a <strong>Hialeah</strong>. Allá le llamaron <strong>el Guajiro</strong>—campesino de verdad,
                fuerza tranquila, autenticidad que no se aprende. Exilio que fortalece.
              </p>

              <p>
                Su casa se volvió refugio. Abría la puerta, conseguía espacios en las radios, conectaba trovadores dispersos.
                Su voz baja pero firme les recordaba: la décima cura, guarda lo que no queremos perder.
              </p>

              <p>
                <strong>Viajera Digital</strong> nace de ese legado. Preservamos cada décima usando tecnología que siente la pasión del poeta.
                Honramos la memoria de Calixto González y todos los poetas que mantienen viva esta tradición milenaria.
              </p>

              <p>
                Como las redes de La Coloma—pacientes, fuertes—Calixto tejió comunidad que no se deshace.
                Su casa vive en la memoria como ese lugar donde la décima encontró techo, donde trovadores se reconocieron hermanos.
              </p>

              <p>
                En esas redes quedó atrapada, felizmente, una viajera de España que llegó buscando versos y encontró raíces.
                Cuba no suelta a quien prueba el sabor de sus décimas. Ella quedó tejida en esta red—hebra europea en tapiz caribeño.
              </p>

              <p>
                <strong>Viajera Digital</strong> continúa ese tejido. Cada décima preservada es hebra. Cada poeta que aquí encuentra su voz es nudo.
                Cada generación que accede a este archivo teje hacia adelante. La tecnología sirve a la tradición.
              </p>

              <p className="font-semibold text-lg text-[#5C4033]">
                Para que la décima nunca sea arrancada del verde imán de nuestro suelo.
              </p>
            </div>
          </section>

          {/* Mensaje Final */}
          <section className="mb-8 text-center p-4 bg-[#F5E6D3]/50 rounded-lg border border-[#C8A05C]/30">
            <p className="text-lg italic text-[#5C4033]">
              🌴 &quot;A todos los poetas que han dedicado sus vidas a mantener viva la décima: su voz sigue cantando en cada verso que procesamos aquí.&quot;
            </p>
          </section>

          {/* Desarrollo y Recursos */}
          <section className="mb-8 grid md:grid-cols-2 gap-6">
            <div className="p-4 bg-white/60 rounded-lg border border-[#C8A05C]/30">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-[#C8A05C] flex items-center justify-center">
                  <span className="text-white text-sm">💻</span>
                </div>
                <h4 className="text-lg font-bold text-[#5C4033]">Desarrollo</h4>
              </div>
              <p className="text-sm text-[#5C4033] mb-2">
                Creada por: <strong>Emilio José Novo</strong>
              </p>
              <p className="text-sm text-[#5C4033]">
                Versión: <strong>2.0 Pro</strong>
              </p>
            </div>

            <div className="p-4 bg-white/60 rounded-lg border border-[#C8A05C]/30">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-[#D2691E] flex items-center justify-center">
                  <span className="text-white text-sm">🌐</span>
                </div>
                <h4 className="text-lg font-bold text-[#5C4033]">Recursos Web</h4>
              </div>
              <p className="text-sm text-[#5C4033] mb-2">
                Web:{' '}
                <Link
                  href="https://juanantoniodiaz.com/acerca-de/"
                  className="text-[#D2691E] hover:underline font-semibold"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Juanantoniodiaz.com
                </Link>
              </p>
              <p className="text-sm text-[#5C4033] mb-2">
                Canal:{' '}
                <Link
                  href="https://youtube.com/@juanantoniodiaz9034"
                  className="text-[#D2691E] hover:underline font-semibold"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @juanantoniodiaz9034
                </Link>
              </p>
              <p className="text-xs text-[#5C4033]/70">
                Licencia: Creative Commons (Uso libre con atribución)
              </p>
            </div>
          </section>

          {/* Agradecimientos - Leonor Lopetegui */}
          <section className="mb-8 border-t-2 border-[#C8A05C] pt-4">
            <p className="text-sm font-medium text-[#5C4033] mb-2">
              Agradecimientos por la creación a:
            </p>
            <p className="text-base text-[#5C4033]">
              <strong>Leonor Lopetegui</strong>
              <button
                onClick={() => setShowLeonorInfo(!showLeonorInfo)}
                className="ml-2 text-[#D2691E] hover:text-[#C8A05C] transition-colors font-bold text-lg"
                aria-label="Ver más información sobre Leonor Lopetegui"
              >
                *
              </button>
            </p>

            {showLeonorInfo && (
              <div className="mt-4 p-4 bg-[#F5E6D3] border-2 border-[#C8A05C] rounded-lg space-y-3 text-sm animate-in fade-in duration-300">
                <p>
                  Leonor Lopetegui ha sido mi maestra de español, consejera y una abuela más que la vida me regaló desde mis cinco años de edad,
                  cuando ella junto a su esposo, mi tío Armando González, me trajo de Cuba junto a mis padres. Al igual que a tantos otros de nuestra familia,
                  nos ayudaron a comenzar una nueva vida en Miami, una experiencia que marcó profundamente mi formación y mi corazón.
                </p>
                <p>
                  Con casi cincuenta años dedicados a la enseñanza del español, la Sra. Lopetegui no solo dominó el arte de enseñar con pasión y devoción
                  en las Escuelas Públicas del Condado de Miami-Dade, sino que tocó innumerables vidas con su generosidad y amor incondicional.
                  Su legado está marcado por reconocimientos extraordinarios como el Premio Cervantes de la Universidad Nova Southeastern por hacer una diferencia
                  en la educación hispana, y por ser nombrada Maestra del Año en la Escuela Primaria James H. Bright durante el año escolar 2001-2002.
                </p>
                <p>
                  También fue seleccionada Educadora Bilingüe del Año por la Asociación Bilingüe de la Florida, un testimonio de su liderazgo excepcional
                  en la educación bilingüe. Durante más de diez años, lideró la División de Educación Bilingüe e Idiomas del Mundo para las Escuelas Públicas
                  del Condado de Miami-Dade, dejando una huella imborrable en el perfeccionamiento del español entre niños y adultos. Ha escrito libros educativos
                  para niños y ha compartido su sabiduría en importantes eventos educativos nacionales e internacionales, incluyendo la Asociación Nacional de
                  Educación Bilingüe y la Asociación Bilingüe de la Florida.
                </p>
                <p>
                  En reconocimiento a esta labor monumental, la Ciudad de Sweetwater proclamó el 6 de junio de 2014 como el &quot;Día de la Sra. Leonor Lopetegui&quot;.
                  Para mí y para tantos otros, ella representa mucho más que todos estos honores: es un ejemplo vivo de generosidad, sabiduría y amor que
                  trasciende las aulas y perdura para siempre en nuestros corazones.
                </p>
              </div>
            )}
          </section>

          {/* Tecnologías */}
          <section className="mb-8">
            <div className="flex flex-wrap gap-2 justify-center">
              {['IA Claude Sonnet', 'NextJS 14', 'Transcripción de Audio', 'Análisis Académico', 'Patrimonio UNESCO'].map((label) => (
                <span key={label} className="px-3 py-1 bg-[#C8A05C]/20 text-[#5C4033] rounded-full text-xs font-medium border border-[#C8A05C]/30">
                  {label}
                </span>
              ))}
            </div>
          </section>

          {/* Cita Final */}
          <section className="mb-8 text-center p-4 bg-[#F5E6D3]/50 rounded-lg border border-[#C8A05C]/30">
            <p className="text-sm italic text-[#5C4033]">
              &quot;Un algoritmo que siente la pasión del poeta, rescata del olvido cada improvisación,
              preserva intacta la lírica del corazón, y eterniza el arte vivo de la décima completa.&quot;
            </p>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  )
}

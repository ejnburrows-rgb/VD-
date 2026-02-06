"use client"

import Link from 'next/link'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { Badge } from './ui/badge'

interface AboutModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AboutModal({ open, onOpenChange }: AboutModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-[#F5E6D3] text-[#5C4033]">
        <DialogHeader>
          <DialogTitle className="text-3xl font-serif font-bold text-[#C8A05C] mb-6 text-center">
            🌴 Acerca de El Guajiro de Hialeah
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          <section className="space-y-4">
            <h3 className="text-2xl font-serif font-bold flex items-center gap-2" style={{ color: '#C8A05C' }}>
              ❤️ Calixto: Tejedor Entre Dos Orillas
            </h3>
            <p>
              Calixto nació donde el cielo toca el agua—<strong>La Coloma</strong>, pueblo de pescadores. Entre barcas y sal, aprendió lo que el mar enseña:
              esperar es arte. Los pescadores lo saben—tejer redes lleva días, tejer palabras pide lo mismo.
            </p>
            <p>
              La décima le palpitaba desde niño. Esa forma de diez versos que cruzó el océano y echó raíces en Cuba. Calixto se hizo trovador—no de rimas
              fáciles, sino de las que improvisan con el corazón. Creación colectiva, siempre.
            </p>
            <p>
              El exilio lo llevó a <strong>Hialeah</strong>. Allí le llamaron <strong>el Guajiro</strong>—campesino de verdad, fuerza tranquila, autenticidad que
              no se aprende. Exilio que fortalece.
            </p>
            <p>
              Su casa se volvió refugio. Abría la puerta, conseguía espacios en las radios, conectaba trovadores dispersos. Su voz baja pero firme les recordaba:
              la décima cura, guarda lo que no queremos perder.
            </p>
            <p className="font-semibold" style={{ color: '#D97706' }}>
              Viajera Digital nace de ese legado. Preservamos cada décima usando tecnología que siente la pasión del poeta. Honramos la memoria de Calixto González y
              todos los poetas que mantienen viva esta tradición milenaria.
            </p>
            <p>
              Como las redes de La Coloma—pacientes, fuertes—Calixto tejió comunidad que no se deshace. Su casa vive en la memoria como ese lugar donde la décima
              encontró techo, donde los poetas reconocieron hermanos.
            </p>
            <p className="italic">
              En esta tierra que lo adoptó, felizmente, una visión de España hebra. Cada poeta que aquí encuentra su voz es nudo. Cada generación que accede a este
              archivo teje hacia adelante. La tecnología sirve a la tradición.
            </p>
            <p className="font-bold text-center" style={{ color: '#D97706' }}>
              Para que la décima nunca sea arrancada del verde imán de nuestro suelo.
            </p>
          </section>

          <section className="text-center p-4 bg-white rounded-lg border border-[#C8A05C]/40">
            <p className="italic text-[#5C4033]">
              🌴 &quot;A todos los poetas que han dedicado sus vidas a mantener viva la décima: su voz sigue cantando en cada verso que procesamos aquí.&quot;
            </p>
          </section>

          <section className="grid md:grid-cols-2 gap-6">
            <div className="p-4 bg-white/70 rounded-lg border border-[#C8A05C]/30">
              <h4 className="text-lg font-bold flex items-center gap-2" style={{ color: '#D97706' }}>
                ⚙️ Desarrollo
              </h4>
              <p>Creada por: <strong>Emilio José Novo</strong></p>
              <p>Versión: 2.0 Pro</p>
            </div>
            <div className="p-4 bg-white/70 rounded-lg border border-[#C8A05C]/30">
              <h4 className="text-lg font-bold flex items-center gap-2" style={{ color: '#D97706' }}>
                🌐 Recursos Web
              </h4>
              <p>
                Web:{' '}
                <Link href="https://juanantoniodiaz.com/acerca-de/" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: '#D2691E' }}>
                  Juanantoniodiaz.com
                </Link>
              </p>
              <p>
                Canal:{' '}
                <Link href="https://youtube.com/@juanantoniodiaz9034" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: '#D2691E' }}>
                  @juanantoniodiaz9034
                </Link>
              </p>
              <p className="text-sm text-[#6B7280]">Licencia: Creative Commons (Uso libre con atribución)</p>
            </div>
          </section>

          <section className="border-t border-[#C8A05C]/40 pt-4">
            <h4 className="text-sm font-semibold" style={{ color: '#D97706' }}>
              Agradecimientos por la creación a:
            </h4>
            <p className="text-base">
              <strong>Leonor Lopetegui</strong> *
            </p>
          </section>

          <div className="flex flex-wrap gap-2 justify-center mt-4">
            {['IA Claude Sonnet', 'NextJS 14', 'Transcripción de Audio', 'Análisis Académico', 'Patrimonio UNESCO'].map((label) => (
              <Badge key={label} className="text-xs" style={{ backgroundColor: '#D2691E', color: 'white' }}>
                {label}
              </Badge>
            ))}
          </div>

          <p className="text-center italic text-sm mt-6" style={{ color: '#6B7280' }}>
            &quot;Un algoritmo que siente la pasión del poeta, rescata del olvido cada improvisación, preserva intacta la lírica del corazón, y eterniza el arte vivo de la
            décima completa.&quot;
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

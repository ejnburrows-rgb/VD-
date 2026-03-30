"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Globe, BookOpen } from "lucide-react"

interface AboutModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AboutModal({ open, onOpenChange }: AboutModalProps) {
  const [showLeonorInfo, setShowLeonorInfo] = useState(false)
  const [showArmandoInfo, setShowArmandoInfo] = useState(false)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-[#F5E6D3] text-[#5C4033]">
        <DialogHeader>
          <DialogTitle className="text-3xl font-serif font-bold text-[#C8A05C] mb-6 text-center">
            🌴 Acerca de El Guajiro de Hialeah
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Armando González: El Pilar de la Familia */}
          <section className="space-y-4">
            <h3 className="text-2xl font-serif font-bold flex items-center gap-2" style={{ color: '#C8A05C' }}>
              🚲 Armando González: El Pilar de la Familia
            </h3>
            <p>
              Mi tío <strong>Armando González</strong> fue más que familiar—fue mi primer padrino en esta tierra,
              el hombre que junto a su esposa <strong>Leonor Lopetegui</strong> me regaló mi primera bicicleta cuando
              apenas tenía <strong>tres años</strong>. Aquella bicicleta no fue solo un juguete; fue la primera
              libertad, la primera promesa de que en este nuevo país podría pedalear hacia cualquier sueño.
            </p>
            <p>
              Su puerta siempre estaba abierta. No importaba la hora, no importaba el motivo. La casa de Armando
              en Miami era el puerto seguro donde toda la familia desembarcaba después del exilio. Él nos trajo
              desde Cuba—mi padre, mi madre, y un niño asustado que no entendía por qué había dejado su casa.
              Armando entendió. Y sin decir mucho, hizo que esa transición doliera menos.
            </p>
            <p>
              <strong>Armando es mi mejor amigo</strong>—no solo por sangre, sino por elección. Armando me enseñaba
              las reglas de la vida: trabajar duro, cuidar a la familia, y nunca olvidar de dónde venimos.
              La Coloma vivía en su memoria como vive en la mía ahora.
            </p>
            <p>
              La primera décima la escuché de él. Puso la radio de Radio Martí mientras arreglaba bicicletas
              en el garaje, me llevó a los encuentros de trovadores en Hialeah, y me enseñó que la poesía
              no era solo para libros, sino para vivirla.
            </p>

            <button
              onClick={() => setShowArmandoInfo(!showArmandoInfo)}
              className="text-sm underline hover:no-underline" style={{ color: '#D2691E' }}
            >
              {showArmandoInfo ? '- Menos información' : '+ Más sobre Armando y La Coloma'}
            </button>

            {showArmandoInfo && (
              <div className="p-4 bg-white/70 rounded-lg border border-[#C8A05C]/30 text-sm space-y-3">
                <p>
                  Armando González nació en <strong>La Coloma</strong>, ese pueblo de pescadores en Pinar del Río
                  donde el cielo se confunde con el mar. Creció entre redes y anzuelos, aprendiendo que la paciencia
                  no es virtud, sino necesidad. Cuando vino a Miami, trajo consigo el espíritu de La Coloma:
                  comunidad, generosidad, y una puerta siempre abierta.
                </p>
                <p>
                  En Hialeah, Armando no solo construyó una casa—construyó un refugio. Familiares recién llegados
                  de Cuba, amigos del barrio, trovadores sin techo: todos encontraron en su casa una cena caliente
                  y una oreja dispuesta. Su garaje era famoso: allí arreglaba bicicletas para los niños del vecindario,
                  siempre gratis, siempre con una sonrisa.
                </p>
              </div>
            )}
          </section>

          {/* Décima para José */}
          <section className="text-center p-6 bg-white rounded-lg border-2 border-[#C8A05C]">
            <h3 className="text-xl font-serif font-bold mb-4" style={{ color: '#C8A05C' }}>
              🎵 Décima para José
            </h3>
            <div className="space-y-1 italic text-[#5C4033] text-lg">
              <p>Aquí me tienes José</p>
              <p>cantando en distinto idioma</p>
              <p>sin olvidar La Coloma</p>
              <p>que llorando la dejé.</p>
              <p>Jamás me olvidaré</p>
              <p>de mi Madre, Padre y Tío,</p>
              <p>y aquí estoy medio vacío,</p>
              <p>nada que me pueda llenar</p>
              <p>nada que me pueda llenar</p>
              <p>hasta poder regresar</p>
              <p>para bañarme en mi río.</p>
            </div>
          </section>

          {/* Calixto: El Verdadero Guajiro de Hialeah */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C8A05C] to-[#D2691E] flex items-center justify-center">
                <span className="text-2xl">🌴</span>
              </div>
              <h3 className="text-2xl font-serif font-bold text-[#C8A05C]">
                Calixto: El Verdadero Guajiro de Hialeah
              </h3>
            </div>

            <div className="space-y-4 text-[#5C4033] leading-relaxed">
              <p>
                Calixto González nació en <strong>La Coloma, Pinar del Río</strong>—uno entre dieciséis hermanos, en una tierra donde el mar enseña paciencia y los pescadores saben que lo importante no es lo que el agua trae, sino lo que las redes no dejan escapar.
              </p>

              <p>
                De joven emigró a La Habana y abrió una ferretería. Su negocio era punto de encuentro antes que comercio, lugar de conversación antes que transacción. Con <strong>Benny Moré</strong> se sentaban juntos a la mesa, Benny con su botella de ron, y entre conversación e improvisación se les iba el tiempo. Calixto no contaba estas historias para impresionar; las contaba porque formaban parte del tejido de una vida vivida entre gente, música y palabra.
              </p>

              <p>
                Esa décima arriba mencionada fue la primera que escuché improvisar en vivo. No era solo poesía: era su vida entera comprimida en diez versos—la nostalgia, el amor, el río de La Coloma que nunca dejó de correr por dentro de él. El exilio lo trajo a <strong>Hialeah</strong>. Manejó camiones—trabajo duro que nunca le quitó la delicadeza. Con sus hermanos—Armandito entre ellos—viajó de vuelta a la isla y me regaló esa bicicleta cuando yo era niño.
              </p>

              <p>
                En Miami, su casa se convirtió en refugio para trovadores y repentistas que llegaban de Cuba sin saber cómo empezar de nuevo. Conectaba poetas dispersos por un exilio que todo lo fragmentaba. <strong>Viajera Digital</strong> existe porque Calixto González dedicó su vida a mantener viva la décima a través de conexiones humanas.
              </p>

              <p className="font-bold text-center text-[#D2691E] mt-6">
                Para que la décima nunca sea arrancada del verde imán de nuestro suelo.
              </p>
            </div>
          </section>

          <section className="text-center p-4 bg-white rounded-lg border border-[#C8A05C]/40">
            <p className="italic text-[#5C4033]">
              🌴 "A todos los poetas que han dedicado sus vidas a mantener viva la décima: su voz sigue cantando en cada verso que procesamos aquí."
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
              <h4 className="text-lg font-bold flex items-center gap-2" style={{ color: '#D2691E' }}>
                🌐 Recursos Web
              </h4>
              <p className="text-sm" style={{ color: "#5C4033" }}>
                Web:{" "}
                <strong>
                  <a
                    href="https://juanantoniodiaz.com/acerca-de/"
                    className="underline transition-colors"
                    style={{ color: "inherit" }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Juanantoniodiaz.com
                  </a>
                </strong>
              </p>
              <p className="text-sm" style={{ color: "#5C4033" }}>
                Canal:{" "}
                <strong>
                  <a
                    href="https://youtube.com/@juanantoniodiaz9034"
                    className="underline transition-colors"
                    style={{ color: "inherit" }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    @juanantoniodiaz9034
                  </a>
                </strong>
              </p>
              <p className="text-sm text-[#6B7280]">Licencia: Creative Commons (Uso libre con atribución)</p>
            </div>
          </section>

          {/* Leonor Tribute Section - MERGED FROM SOURCE B */}
          <section className="border-t border-[#C8A05C]/40 pt-4">
            {!showLeonorInfo && (
              <div className="text-sm text-[#5C4033]">
                <p>
                  Agradecimiento *{' '}
                  <button
                    onClick={() => setShowLeonorInfo(true)}
                    className="text-[#D2691E] hover:text-[#C8A05C] underline cursor-pointer font-semibold transition-colors"
                  >
                    Leonor Lopetegui
                  </button>
                </p>
              </div>
            )}

            {showLeonorInfo && (
              <div className="border-t-2 pt-6 animate-in fade-in duration-300" style={{ borderColor: "#C8A05C" }}>
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-xl md:text-2xl font-serif font-bold text-[#C8A05C] mb-1">
                      Agradecimiento especial
                    </h3>
                    <h4 className="text-lg md:text-xl font-serif italic text-[#D2691E]">
                      A Leonor Lopetegui
                    </h4>
                  </div>

                  <div className="p-6 border-2 rounded-lg space-y-4 text-sm md:text-base leading-relaxed" style={{ backgroundColor: "#F5E6D3", borderColor: "#C8A05C", color: "#5C4033" }}>
                    <p>
                      Hay personas que cambian una vida entera sin proponérselo. Para mí, una de ellas es Leonor Lopetegui. Fue mi maestra de español, es mi consejera y una abuela más que la vida me regaló, porque fue ella, junto a su esposo, mi tío <strong>Armando González</strong>, quien me trajo de Cuba junto a mis padres. Al igual que a tantos otros de nuestra familia, nos ayudaron a comenzar una nueva vida en Miami, una experiencia que marcó profundamente mi formación y mi corazón.
                    </p>

                    <p>
                      Durante casi cincuenta años en las Escuelas Públicas del Condado de Miami-Dade, la Sra. Lopetegui enseñó español con una mezcla única de rigor y cariño. Su labor fue reconocida con premios como el Cervantes de la Universidad Nova Southeastern por su impacto en la educación hispana, el nombramiento como Maestra del Año en la escuela primaria James H. Bright (2001–2002) y el reconocimiento como Educadora Bilingüe del Año por la Asociación Bilingüe de la Florida. Durante más de diez años lideró la División de Educación Bilingüe e Idiomas del Mundo, escribió materiales educativos para niños y compartió su experiencia en congresos nacionales e internacionales. La Ciudad de Sweetwater incluso proclamó el 6 de junio de 2014 como el &quot;Día de la Sra. Leonor Lopetegui&quot;.
                    </p>

                    <p>
                      Pero cuando pienso en ella, no pienso primero en los premios ni en los cargos. La recuerdo en el suelo conmigo, tras un largo día de trabajo enseñando español a otros niños. Yo tenía cinco años. Ella convertía una pizarra en un juego y el juego en clase. Ahí, en esas tardes simples, me enseñó mis primeras letras en español, a juntar sílabas, a leer despacio las palabras y a escribir mi nombre, una y otra vez, hasta que me saliera bien. La veo dibujando letras grandes y claras, escribiendo palabras lentamente para que yo pudiera seguirlas con la mirada, borrándolas con la mano para volver a escribirlas, sonriendo cada vez que yo repetía algo bien. En esa pizarra sencilla cabían un idioma entero y todo el cariño con que me lo regalaba.
                    </p>

                    <p>
                      Me enseñó a amar el español, a cuidar las palabras, a entender que el idioma es algo vivo y que la palabra tiene poder. Tanto poder, que lo que Dios nos dejó para conocerlo fue su Palabra en la Biblia. Me hizo ver que, bien usadas, las palabras pueden acercar, consolar, levantar y que por eso hay que tratarlas siempre con respeto y gratitud. Mucho de lo que soy, de lo que escribo y de lo que esta aplicación intenta hacer nace de aquellas tardes en el suelo, frente a la pizarra, de esas primeras lecciones tuyas, pacientes y constantes, desde mi niñez. En cada intento de explicar mejor una idea, en cada esfuerzo por que una frase suene clara y sincera, hay algo de lo que tú me enseñaste sin prisa, con una fe tranquila en que algún día lo entendería.
                    </p>

                    <p>
                      Por todo eso, esta aplicación ha sido posible, en gran parte, gracias a lo que tú sembraste en mí desde pequeño.
                    </p>

                    <p className="font-semibold">
                      Para muchos será siempre la profesora Leonor Lopetegui.<br />
                      Para mí, hoy y siempre, es y será mi <em>Tía Leonor</em>.
                    </p>

                    <button
                      onClick={() => setShowLeonorInfo(false)}
                      className="text-sm underline hover:no-underline mt-4" style={{ color: '#D2691E' }}
                    >
                      - Cerrar información de Leonor
                    </button>
                  </div>
                </div>
              </div>
            )}
          </section>

          <div className="flex flex-wrap gap-2 justify-center mt-4">
            {['IA Claude Sonnet', 'NextJS 14', 'Transcripción de Audio', 'Análisis Académico', 'Patrimonio UNESCO'].map((label) => (
              <Badge key={label} className="text-xs" style={{ backgroundColor: '#D2691E', color: 'white' }}>
                {label}
              </Badge>
            ))}
          </div>

          <p className="text-center italic text-sm mt-6" style={{ color: '#6B7280' }}>
            "Un algoritmo que siente la pasión del poeta, rescata del olvido cada improvisación, preserva intacta la lírica del corazón, y eterniza el arte vivo de la
            décima completa."
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

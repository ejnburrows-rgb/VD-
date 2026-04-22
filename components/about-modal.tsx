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
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-[#F5E6D3] text-[#5C4033] border-2 border-[#C8A05C]">
        <DialogHeader>
          <DialogTitle className="text-4xl font-serif font-bold text-[#C8894D] mb-6 text-center">
            🌴 Viajera Digital: El Legado Vivo de la Décima
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-8 mt-4 text-justify px-4">
          {/* CALIXTO GONZÁLEZ — MAIN NARRATIVE */}
          <section className="space-y-4">
            <h3 className="text-2xl font-serif font-bold flex items-center gap-2 border-b-2 border-[#C8A05C]/30 pb-2" style={{ color: '#C8A05C' }}>
              ❤️ Calixto González: El Guajiro de Hialeah
            </h3>
            <div className="leading-relaxed space-y-4 text-lg">
              <p>
                La Coloma es un pueblo de pescadores al borde de Pinar del Río donde el Golfo se traga la luz entera cada atardecer y los hombres que trabajan el agua no hablan mucho de belleza. Simplemente viven dentro de ella. Calixto González nació ahí; uno entre dieciséis hermanos, criado entre aire salado y el ritmo de redes arrastradas sobre arena mojada antes del amanecer. Ese es el mundo que lo formó. No un aula. No un escenario. Una costa donde el mar te enseña a esperar, y la espera te enseña a escuchar, y escuchar; si eres Calixto; te enseña a cantar.
              </p>
              <p>
                La décima lo encontró temprano. Diez versos, ocho sílabas cada uno, un esquema de rima más viejo que la república. En La Coloma no era literatura. Era la manera en que la gente hablaba cuando lo que tenía que decir importaba demasiado para el habla común. Calixto aprendió a improvisar como los otros muchachos aprendían a remendar redes; mirando, después haciendo, después haciéndolo tantas veces que el oficio desapareció dentro del instinto. Se hizo trovador. No del tipo que actúa. Del tipo que lo siente de verdad.
              </p>
              <p>
                Joven todavía, Calixto dejó La Coloma y se fue para La Habana. Abrió su propia ferretería; un negocio que era punto de encuentro antes que comercio, lugar de conversación antes que transacción. Y fue ahí, entre mostrador y clientela, donde la vida le puso delante a gente que no se olvida.
              </p>
              <p>
                Conoció a Benny Moré. Me lo contó él mismo, con esa tranquilidad con que contaba las cosas que le importaban de verdad. Le proveyó los materiales para construir su casa. Y después, cuando la casa estuvo en pie, se sentaban juntos a la mesa; Benny con su botella de ron y Calixto con sus versos. Improvisaban ahí, entre trago y décima, dos hombres que entendían que la música y la poesía no se ensayan. Se viven.
              </p>
              <p>
                También me contó que cuando Camilo Cienfuegos llegó a La Habana en el 59, Calixto fue y se presentó. Con la misma naturalidad con la que abría la puerta de su casa, abría conversación con quien fuera.
              </p>
              <p>
                El exilio rompió la geografía pero no al hombre.
              </p>
              <p>
                Hialeah lo recibió como Hialeah recibe a todos; sin ceremonia, sin suavidad, con trabajo que hacer mañana. Manejó camiones. Trabajo duro, honesto, de esos que te parten la espalda pero no el espíritu. Y aun con todo lo que pesaba el exilio encima, Calixto nunca dejó de preocuparse por su familia en Cuba. Cada día cargaba camiones y cada noche cargaba la distancia.
              </p>
              <p>
                Cuando yo tenía tres años, viajó de regreso a Cuba junto con su hermano y mi tío Armando González. Y allí, en aquel viaje, me regaló la primera bicicleta que llegué a tener. Un sueño de niño cumplido por las manos del mismo hombre que un día dejó La Coloma llorando. Ese gesto lo dice todo sobre quién era Calixto; no importaba cuán lejos estuviera ni cuánto pesara la ausencia, él siempre encontraba la manera de llegar.
              </p>
              <p>
                La gente empezó a llamarlo el Guajiro de Hialeah, y el nombre se quedó porque era cierto. Guajiro. Campesino en el sentido más hondo; no una etiqueta, no folklore, sino un hombre cuyas raíces llegaban tan profundo en la tierra cubana que ni el concreto pudo matarlas.
              </p>
              <p>
                Lo que hizo después es lo que yo cargo.
              </p>
              <p>
                Abrió su casa. Eso fue todo. Abrió la puerta de su hogar en Hialeah y le dijo entra a cada trovador que el exilio había dispersado por el sur de la Florida. Poetas que habían perdido sus públicos, sus plazas, sus espacios en la radio, su país. Calixto los encontró. Les consiguió tiempo al aire en las emisoras locales. Organizó canturías en garajes y salas y patios donde la única condición de entrada era la voluntad de escuchar. Su casa se convirtió en el lugar donde los decimistas recordaban que no estaban solos; donde la tradición que el exilio intentó ahogar seguía respirando, seguía cantando, seguía pasando de una voz a la siguiente.
              </p>
              <p>
                Yo sé esto porque estuve ahí. Pequeño. Sentado en las piernas de alguien o en el piso, probablemente, mientras los adultos intercambaban versos y el cuarto se llenaba de esa energía particular que genera una canturía; mitad competencia, mitad reunión de familia, todo corazón. Calixto fue la primera persona que vi improvisar en vivo. Para mí la décima era algo de la televisión o la radio. Sabía que era improvisada, entendía eso, pero nunca lo había experimentado en persona. Nunca había sentido lo que se siente cuando alguien se para frente a ti y construye un verso del aire mismo.
              </p>
              <p>
                Y ahí se paró Calixto. La primera décima me la dedicó a mí. Me miró fijamente a los ojos y pronunció cada sílaba como si cada una fuera un regalo que llevaba años guardando:
              </p>
            </div>

            {/* DÉCIMA PARA JOSÉ (VERIFIED) */}
            <div className="p-8 bg-white/60 rounded-xl border-2 border-[#D2691E]/30 my-8 italic text-center text-xl leading-relaxed shadow-lg font-serif" style={{ color: '#5C4033' }}>
              <p className="font-bold text-[#D2691E] mb-6 not-italic">📜 "Aquí me tienes, José" — Calixto González</p>
              "Aquí me tienes José<br/>
              cantando en distinto idioma<br/>
              sin olvidar La Coloma<br/>
              que llorando la dejé.<br/>
              Jamás me olvidaré<br/>
              de mi Madre, Padre y Tío,<br/>
              y aquí estoy medio vacío,<br/>
              nada que me pueda llenar<br/>
              hasta poder regresar<br/>
              para bañarme en mi río."
            </div>

            <div className="leading-relaxed space-y-4 text-lg">
              <p>
                La Coloma corriendo por cada sílaba. Se fue de aquel lugar llorando y nunca dejó de cargarlo por dentro. Esa décima no fue un poema. Fue una confesión. Y me la entregó mirándome a los ojos, como diciéndome: guárdala tú, que yo ya la cargué bastante.
              </p>
              <p>
                Mi tío Armando González, esposo de Leonor Lopetegui, solía viajar de vuelta a La Coloma con Calixto. Dos hombres regresando al agua que los crió, aun cuando el país alrededor de esa agua había cambiado hasta volverse irreconocible. Pienso en eso a veces; la terquedad de volver. La negativa a dejar que un lugar se convierta solo en recuerdo.
              </p>
              <p>
                Calixto se acordaba de todos. Eso era lo que lo hacía Calixto. No las décimas, no las canturías, no la voz. La memoria. La insistencia en no dejar que nadie desapareciera.
              </p>
              <p>
                Cantó "jamás me olvidaré" y cada cosa que hizo después lo confirmó.
              </p>
              <p>
                Viajera Digital existe para que esa promesa se cumpla en las dos direcciones.
              </p>
              <p>
                Para el repentismo cubano en el exilio fue Calixto González; el Guajiro de Hialeah.
              </p>
              <p className="font-bold text-center mt-6">Jamás te olvidaremos.</p>
            </div>
          </section>

          {/* TRIBUTO — JUAN ANTONIO DÍAZ */}
          <section className="bg-[#FEF3C7] p-8 rounded-xl border-2 border-[#C8A05C]/40 space-y-4 text-center italic shadow-sm">
             <div className="max-w-md mx-auto">
               <p>"Hoy que te vas con la muerte<br/>
               hacia una casa de cielo,<br/>
               la sequía del pañuelo<br/>
               en ríos se nos convierte.<br/>
               Y aunque no podamos verte<br/>
               jamás, en la canturía,<br/>
               no existirá un solo día<br/>
               que se hable de ejemplo de Hombre<br/>
               que no se escuche tu nombre,<br/>
               Guajiro de Hialeah."</p>
               <p className="mt-4 not-italic font-bold text-[#C8894D]">—— Juan Antonio Díaz</p>
             </div>
          </section>

          {/* LEONOR LOPETEGUI DEDICATION */}
          <section className="border-t-2 border-[#C8A05C]/30 pt-8 mt-8">
            <h3 className="text-2xl font-serif font-bold flex items-center justify-between gap-2" style={{ color: '#C8A05C' }}>
              📚 Dedicatoria Especial: Mi Tía Leonor
              <button
                onClick={() => setShowLeonorInfo(!showLeonorInfo)}
                className="text-[#D2691E] hover:text-[#C8A05C] transition-colors font-bold text-lg px-4 border border-[#D2691E] rounded-md"
              >
                {showLeonorInfo ? "Ver Menos" : "Conocer su Historia"}
              </button>
            </h3>
            
            <div className={`mt-6 space-y-4 text-lg leading-relaxed ${showLeonorInfo ? "" : "hidden"}`}>
              <p>
                Hay personas que cambian una vida entera sin proponérselo. Para mí, una de ellas es Leonor Lopetegui. Fue mi maestra de español, es mi consejera y una abuela más que la vida me regaló, porque fue ella, junto a su esposo, mi tío Armando González, quien me trajo de Cuba junto a mis padres. Al igual que a tantos otros de nuestra familia, nos ayudaron a comenzar una nueva vida en Miami, una experiencia que marcó profundamente mi formación y mi corazón.
              </p>
              <p>
                Durante casi cincuenta años en las Escuelas Públicas del Condado de Miami-Dade, la Sra. Lopetegui enseñó español con una mezcla única de rigor y cariño. Su labor fue reconocida con premios como el Cervantes de la Universidad Nova Southeastern por su impacto en la educación hispana, el nombramiento como Maestra del Año en la escuela primaria James H. Bright (2001–2002) y el reconocimiento como Educadora Bilingüe del Año por la Asociación Bilingüe de la Florida. Durante más de diez años lideró la División de Educación Bilingüe e Idiomas del Mundo, escribió materiales educativos para niños y compartió su experiencia en congresos nacionales e internacionales. La Ciudad de Sweetwater incluso proclamó el 6 de junio de 2014 como el "Día de la Sra. Leonor Lopetegui".
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
              <p className="font-bold">Para muchos será siempre la profesora Leonor Lopetegui.</p>
              <p className="font-bold text-[#D2691E] text-2xl">Para mí, hoy y siempre, es y será mi Tía Leonor.</p>
            </div>
          </section>

          {/* FOOTER / CREDITS */}
          <section className="bg-white/40 p-6 rounded-lg border border-[#C8A05C]/20 text-sm space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p><strong>Creada por:</strong> Emilio José Novo</p>
                <p><strong>Versión:</strong> 2.0 Pro</p>
                <p><strong>Web:</strong> <Link href="https://juanantoniodiaz.com" className="underline text-[#D2691E]">Juanantoniodiaz.com</Link></p>
                <p><strong>Canal:</strong> <Link href="https://youtube.com/@juanantoniodiaz9034" className="underline text-[#D2691E]">@juanantoniodiaz9034</Link></p>
              </div>
              <div className="text-right">
                <p><strong>Licencia:</strong> CC BY-NC-SA 4.0</p>
                <p><strong>Patente Pendiente:</strong> Tecnología de análisis de décima</p>
                <p>En honor a Calixto González</p>
                <p>Miami, Florida 🇺🇸</p>
              </div>
            </div>
            
            <p className="italic text-center text-[#5C4033]/80 border-t border-dashed border-[#C8A05C]/30 pt-4">
              "Un algoritmo que siente la pasión del poeta, rescata del olvido cada improvisación, preserva intacta la lírica del corazón, y eterniza el arte vivo de la décima completa."
            </p>
            
            <div className="flex flex-wrap gap-2 justify-center pt-2">
              {['IA Claude Sonnet', 'NextJS 14', 'Transcripción de Audio', 'Análisis Académico', 'Patrimonio UNESCO'].map((label) => (
                <Badge key={label} className="text-[10px] bg-[#D97706] text-white border-none">
                  {label}
                </Badge>
              ))}
            </div>
            <p className="text-center text-[11px] font-bold text-[#D2691E]">© Emilio José Novo</p>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  )
}

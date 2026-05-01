with open('components/memorial-scroll.tsx', 'w', encoding='utf-8') as f:
    f.write('''import { Fleuron } from "./fleuron"

export function MemorialScroll({ onProcesar }: { onProcesar: () => void }) {
  return (
    <article className="memorial">
      <div className="portrait-column">
        <div className="portrait-pin">
          <img src="/calixto-portrait.jpg" alt="Calixto González, El Guajiro de Hialeah" />
          <div className="hero-meta">
            <span className="meta-name">Calixto González</span>
            <span className="meta-tag">El Guajiro de Hialeah</span>
            <span className="meta-est">EST 1936</span>
          </div>
        </div>
      </div>
      <div className="prose-column">
        <blockquote className="cuarteta">
          Un algoritmo que siente la pasión del poeta,<br/>
          rescata del olvido cada improvisación,<br/>
          preserva intacta la lírica del corazón,<br/>
          y eterniza el arte vivo de la décima completa.
        </blockquote>
        <p className="byline">© Emilio José Novo · <a href="https://juanantoniodiaz.com" target="_blank" rel="noopener noreferrer">JuanAntonioDiaz.com</a></p>

        <p className="opening">La Coloma es un pueblo de pescadores al borde de Pinar del Río donde el Golfo se traga la luz entera cada atardecer y los hombres que trabajan el agua no hablan mucho de belleza. Simplemente viven dentro de ella. Calixto González nació ahí; uno entre dieciséis hermanos, criado entre aire salado y el ritmo de redes arrastradas sobre arena mojada antes del amanecer. Ese es el mundo que lo formó. No un aula. No un escenario. Una costa donde el mar te enseña a esperar, y la espera te enseña a escuchar, y escuchar — si eres Calixto — te enseña a cantar.</p>
        
        <p>La décima lo encontró temprano. Diez versos, ocho sílabas cada uno, un esquema de rima más viejo que la república. En La Coloma no era literatura. Era la manera en que la gente hablaba cuando lo que tenía que decir importaba demasiado para el habla común. Calixto aprendió a improvisar como los otros muchachos aprendían a remendar redes; mirando, después haciendo, después haciéndolo tantas veces que el oficio desapareció dentro del instinto. Se hizo trovador. No del tipo que actúa. Del tipo que lo siente de verdad.</p>
        
        <p>Joven todavía, Calixto dejó La Coloma y se fue para La Habana. Abrió su propia ferretería; un negocio que era punto de encuentro antes que comercio, lugar de conversación antes que transacción. Y fue ahí, entre mostrador y clientela, donde la vida le puso delante a gente que no se olvida.</p>
        
        <p>Conoció a Benny Moré. Me lo contó él mismo, con esa tranquilidad con que contaba las cosas que le importaban de verdad. Le proveyó los materiales para construir su casa. Y después, cuando la casa estuvo en pie, se sentaban juntos a la mesa; Benny con su botella de ron y Calixto con sus versos. Improvisaban ahí, entre trago y décima, dos hombres que entendían que la música y la poesía no se ensayan. Se viven.</p>
        
        <p>También me contó que cuando Camilo Cienfuegos llegó a La Habana en el 59, Calixto fue y se presentó. Con la misma naturalidad con la que abría la puerta de su casa, abría conversación con quien fuera.</p>
        
        <p>El exilio rompió la geografía, pero no al hombre.</p>
        
        <p>Hialeah lo recibió como Hialeah recibe a todos; sin ceremonia, sin suavidad, con trabajo que hacer mañana. Manejó camiones. Trabajo duro, honesto, de esos que te parten la espalda, pero no el espíritu. Y aun con todo lo que pesaba el exilio encima, Calixto nunca dejó de preocuparse por su familia en Cuba. Cada día cargaba camiones y cada noche cargaba la distancia.</p>
        
        <p>Cuando yo tenía tres años, viajó de regreso a Cuba junto con su hermano y mi tío Armando González. Y allí, en aquel viaje, me regaló la primera bicicleta que llegué a tener. Un sueño de niño cumplido por las manos del mismo hombre que un día dejó La Coloma llorando. Ese gesto lo dice todo sobre quién era Calixto; no importaba cuán lejos estuviera ni cuánto pesara la ausencia, él siempre encontraba la manera de llegar.</p>
        
        <p>La gente empezó a llamarlo el Guajiro de Hialeah, y el nombre se quedó porque era cierto. Guajiro. Campesino en el sentido más hondo; no una etiqueta, no folklore, sino un hombre cuyas raíces llegaban tan profundo en la tierra cubana que ni el concreto pudo matarlas.</p>
        
        <p>Lo que hizo después es lo que yo cargo.</p>
        
        <p>Abrió su casa. Eso fue todo. Abrió la puerta de su hogar en Hialeah y le dijo <em>entra</em> a cada trovador que el exilio había dispersado por el sur de la Florida. Poetas que habían perdido sus públicos, sus plazas, sus espacios en la radio, su país. Calixto los encontró. Les consiguió tiempo al aire en las emisoras locales. Organizó canturías en garajes y salas y patios donde la única condición de entrada era la voluntad de escuchar. Su casa se convirtió en el lugar donde los decimistas recordaban que no estaban solos; donde la tradición que el exilio intentó ahogar seguía respirando, seguía cantando, seguía pasando de una voz a la siguiente.</p>
        
        <p>Yo sé esto porque estuve ahí. Pequeño. Sentado en las piernas de alguien o en el piso, probablemente, mientras los adultos intercambiaban versos y el cuarto se llenaba de esa energía particular que genera una canturía; mitad competencia, mitad reunión de familia, todo corazón. Calixto fue la primera persona que vi improvisar en vivo. Para mí, la décima era algo de la televisión o la radio. Sabía que era improvisada, entendía eso, pero nunca lo había experimentado en persona. Nunca había sentido lo que se siente cuando alguien se paró frente a ti y construye un verso del aire mismo.</p>
        
        <p>Y ahí se paró Calixto. La primera décima me la dedicó a mí. Me miró fijamente a los ojos y pronunció cada sílaba como si cada una fuera un regalo que llevaba años guardando;</p>

        <blockquote className="decima">
          Aquí me tienes José<br/>
          cantando en distinto idioma<br/>
          sin olvidar La Coloma<br/>
          que llorando la dejé.<br/>
          Jamás me olvidaré<br/>
          de mi Madre, Padre y Tío,<br/>
          y aquí estoy medio vacío,<br/>
          nada que me pueda llenar<br/>
          hasta poder regresar<br/>
          para bañarme en mi río.
        </blockquote>

        <p>La Coloma corriendo por cada sílaba. Se fue de aquel lugar llorando y nunca dejó de cargarlo por dentro. Esa décima no fue un poema. Fue una confesión. Y me la entregó mirándome a los ojos, como diciéndome: <em>guárdala tú, que yo ya la cargué bastante.</em></p>
        
        <p>Esa fue la primera vez que yo experimenté algo así — la décima improvisada, en persona, dedicada a mí. Algo se me movió por dentro que no tenía nombre todavía. El tiempo se hizo despacio. El cuarto entero se quedó en silencio aunque nadie había dejado de respirar. Eso era lo que después aprendería a llamar <em>la magia del momento</em> — la única manera honesta de nombrar lo que pasa cuando alguien construye diez versos del aire y te los entrega como si fueran un regalo que cargó toda la vida. No se ensaya. No se repite. Se vive una sola vez, y a uno lo deja distinto.</p>
        
        <p>Mi tío Armando González, esposo de Leonor Lopetegui, solía viajar de vuelta a La Coloma con Calixto. Dos hombres regresando al agua que los crió, aun cuando el país alrededor de esa agua había cambiado hasta volverse irreconocible. Pienso en eso a veces; la terquedad de volver. La negativa a dejar que un lugar se convierta en solo un recuerdo.</p>
        
        <p>Calixto se acordaba de todos. Eso era lo que lo hacía Calixto. No las décimas, no las canturías, no la voz. La memoria. La insistencia en no dejar que nadie desapareciera.</p>
        
        <p>Cantó <em>"jamás me olvidaré"</em> — y cada cosa que hizo después lo confirmó. Él no se olvidó. Ese fue el ejemplo que nos dejó.</p>
        
        <p>Viajera Digital existe como manifiesto de esa promesa: que nosotros tampoco nos olvidaremos. Ni de él, ni de los que cantaron a su lado, ni de los que vienen detrás cargando la décima sin saber todavía cuánto pesa.</p>

        <p className="seal">Jamás te olvidaremos.</p>

        <blockquote className="decima">
          Hoy que te vas con la muerte<br/>
          hacia una casa de cielo,<br/>
          la sequía del pañuelo<br/>
          en ríos se nos convierte.<br/>
          Y aunque no podamos verte<br/>
          jamás, en la canturía,<br/>
          no existirá un solo día<br/>
          que se hable de ejemplo de Hombre<br/>
          que no se escuche tu nombre,<br/>
          Guajiro de Hialeah.
          <footer>— Juan Antonio Díaz</footer>
        </blockquote>

        <Fleuron />

        <p className="section-lead"><em>Y junto a él, otra voz que nos enseñó a escuchar.</em></p>
        
        <p>Hay personas que cambian una vida entera sin proponérselo. Para mí, una de ellas es Leonor Lopetegui. Fue mi maestra de español, es mi consejera, y una abuela más que la vida me regaló. Junto a su esposo, mi tío Armando González, fue ella quien nos trajo de Cuba — a mí, a mis padres, y a tantos otros de la familia — y quien nos ayudó a empezar de nuevo en Miami.</p>

        <p>Durante casi cincuenta años enseñó español en las Escuelas Públicas del Condado de Miami-Dade. La Universidad Nova Southeastern le entregó el premio Cervantes por su impacto en la educación hispana. La escuela primaria James H. Bright la nombró Maestra del Año (2001–2002). La Asociación Bilingüe de la Florida la distinguió como Educadora Bilingüe del Año. Durante más de diez años lideró la División de Educación Bilingüe e Idiomas del Mundo, escribió materiales educativos para niños, y compartió su experiencia en congresos nacionales e internacionales. La Ciudad de Sweetwater proclamó el 6 de junio de 2014 como el "Día de la Sra. Leonor Lopetegui."</p>

        <p>Pero cuando pienso en ella, no pienso primero en los premios ni en los cargos. La recuerdo en el suelo conmigo, tras un día entero enseñando español a otros niños. Yo tenía cinco años. Ella convertía una pizarra en juego, y el juego en clase. Ahí, en esas tardes, me enseñó mis primeras letras en español; a juntar sílabas, a leer despacio, a escribir mi nombre una y otra vez hasta que me saliera bien. La veo dibujando letras grandes y claras, escribiendo despacio para que yo pudiera seguirlas con la mirada, borrándolas con la mano para volver a empezar, sonriendo cada vez que yo repetía algo bien. En esa pizarra sencilla cabían un idioma entero y todo el cariño con que me lo regalaba.</p>

        <p>Me enseñó a amar el español. A cuidar las palabras. A entender que el idioma está vivo y que la palabra tiene peso — tanto peso que lo que Dios nos dejó para conocerlo fue su Palabra en la Biblia. Me hizo ver que, bien usadas, las palabras pueden acercar, consolar, levantar; que por eso hay que tratarlas con respeto. Mucho de lo que soy, de lo que escribo, y de lo que esta aplicación intenta hacer, nace de aquellas tardes en el suelo, frente a la pizarra. En cada intento de explicar mejor una idea, en cada esfuerzo por que una frase suene clara y sincera, hay algo de lo que me enseñaste sin prisa, sin levantar la voz, sentada conmigo en el piso.</p>

        <p>Gracias, tía. Por habernos traído, por cada letra, y por la fe tranquila que tuviste en que algún día yo entendería. Esta aplicación existe, en gran parte, gracias a lo que sembraste en mí desde niño.</p>

        <p>Para muchos será siempre la profesora Leonor Lopetegui.</p>

        <p>Para mí, hoy y siempre, es y será mi <em>Tía Leonor</em>.</p>

        <Fleuron />

        <div className="cta-end">
          <button onClick={onProcesar} className="cta-procesar">Procesar una canturía &rarr;</button>
          <p className="cta-blurb">Esta aplicación existe para que la palabra cantada no se pierda.</p>
        </div>
      </div>
    </article>
  )
}
''')

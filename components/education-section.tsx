"use client";

import { PoetsCompendium } from "./poets-compendium";

const sectionBg = { backgroundColor: "#F5E6D3" };
const headingGold = { color: "#C8A05C" };
const headingOrange = { color: "#D97706" };
const body = { color: "#5C4033" };
const leftRule = { borderColor: "#C8A05C" };
const featureCard = { backgroundColor: "#FFFFFF", borderColor: "#C8A05C" };
const quoteRule = { borderColor: "#D97706", color: "#5C4033" };
const accent = { color: "#D97706" };
const unescoCard = { backgroundColor: "#FDF6E8", borderColor: "#C8A05C" };
const naboriCard = { backgroundColor: "#FFFBF0", borderColor: "#D97706" };

export function EducationSection() {
  return (
    <div className="space-y-8 pb-12" style={sectionBg}>
      <div className="container max-w-4xl py-8 px-4">
        <h2
          className="text-3xl font-serif font-bold mb-8 flex items-center gap-2"
          style={headingGold}
        >
          Educación Histórica
        </h2>

        <p className="text-center mb-8 italic font-serif" style={body}>
          La historia de la décima espinela: cinco siglos de arquitectura poética que viajó de Andalucía a Cuba y se quedó prendida al verde imán del palmar.
        </p>

        {/* Arquitectura */}
        <div className="mb-8 border-l-4 pl-6" style={leftRule}>
          <h3 className="text-2xl font-bold font-serif mb-4" style={headingGold}>
            Arquitectura Poética, Raíz Compartida
          </h3>
          <p className="mb-4" style={body}>
            Diez versos de ocho sílabas. Cuatro rimas consonantes entrelazadas en el patrón <strong>ABBAACCDDC</strong>. Una pausa obligatoria después del cuarto verso. Esa es la décima espinela, codificada en 1591 por <strong>Vicente Espinel</strong> en su libro <em>Diversas rimas</em>.
          </p>
          <p className="mb-4" style={body}>
            Espinel no inventó la estrofa de diez versos — antes de él ya circulaban &ldquo;décimas primitivas&rdquo; con estructuras variables. Lo que él hizo fue fijar la forma definitiva: la cuarteta de planteamiento, la pausa central como respiro, los versos puente que giran el sentido, y el cierre que aterriza el pensamiento. Como músico además de poeta, Espinel entendió el ritmo como sustancia viva: la pausa no es decoración, es donde el verso respira y vira.
          </p>
          <p style={body}>
            <strong>Primera cuarteta (ABBA)</strong> — plantea. <strong>Versos centrales (AC)</strong> — giran. <strong>Última cuarteta (CDDC)</strong> — cierra, golpea, aterriza. Diez líneas que cargan un universo entero dentro del mismo aliento.
          </p>
        </div>

        {/* Travesía atlántica */}
        <div className="mb-8 border-l-4 pl-6" style={leftRule}>
          <h3 className="text-2xl font-bold font-serif mb-4" style={headingGold}>
            Travesía Atlántica y Arraigo Cubano
          </h3>
          <p className="mb-4" style={body}>
            Cruzó el océano en boca de soldados, frailes y colonos, y al llegar a Cuba encontró su sitio. Mientras en España su uso culto se apagaba, el guajiro cubano la abrazó como lengua del campo. La transmisión no fue académica — fue de boca en boca: de padre a hijo en el bohío, de compadre a compadre bajo la ceiba, de cantor a aprendiz en las fiestas de <strong>guateque</strong>, esas veladas campesinas donde la décima era moneda social, carta de presentación y prueba de ingenio.
          </p>
          <p className="mb-4" style={body}>
            <strong>El Cucalambé</strong> — Juan Cristóbal Nápoles Fajardo — la vistió de palmas, ceibas, tocororo, caña y tabaco en el siglo XIX, completando su naturalización criolla. Pero la verdadera revolución fue colectiva: generaciones de campesinos que nunca publicaron un libro internalizaron el ABBAACCDDC como gramática emocional. La décima dejó de ser estrofa importada para convertirse en lengua materna del campo cubano.
          </p>
          <p style={body}>
            Así nació el <strong>punto cubano</strong> — el repentismo. La estrofa escrita se hizo improvisación oral cantada, acompañada por laúd, tres y guitarra. Improvisar una décima en Cuba no es solo armar diez versos octosílabos rimados al instante: es tejer pensamiento mientras corre el reloj, responder ataques poéticos en controversia, y cerrar con rimas sorpresivas que el público exige. El guateque era universidad sin matrícula: allí se aprendía escuchando, allí se graduaba quien se atrevía a cantar.
          </p>
        </div>

        {/* Propiedad panamericana */}
        <div className="mb-8 border-l-4 pl-6" style={leftRule}>
          <h3 className="text-2xl font-bold font-serif mb-4" style={headingGold}>
            Propiedad Panamericana
          </h3>
          <p className="mb-4" style={body}>
            Cuba la cultiva con intensidad singular, pero la décima no es solamente cubana. Cada tierra que la recibió la vistió con su acento. En <strong>Panamá</strong> se canta en <em>cantaderas</em> los viernes, sábados y domingos, con guitarra española, violín, mejoranera y rabel. En <strong>Venezuela</strong> entra al folclor llanero con arpa, cuatro y bandola. En <strong>Puerto Rico</strong> el trovador jíbaro la improvisa en la montaña con el cuatro puertorriqueño. En <strong>México</strong> vive en los sones jarochos de Veracruz y en el huapango de la Huasteca. <strong>Argentina, Chile, Colombia, las Islas Canarias</strong> — en cada lugar la décima echó raíz distinta, alimentada por otro paisaje, cantada con otro acento.
          </p>
          <p className="mb-4" style={body}>
            El poeta canario <strong>Pedro Lezcano</strong> lo dijo sin rodeos:
          </p>
          <blockquote className="border-l-4 pl-4 italic my-4 font-serif leading-relaxed" style={quoteRule}>
            Aunque el poeta inventor<br />
            fuera Vicente Espinel,<br />
            la décima ya no es de él,<br />
            sino del pueblo cantor.
          </blockquote>
        </div>

        {/* 1955 */}
        <div className="mb-8 p-6 rounded-lg border-2" style={featureCard}>
          <h3 className="text-2xl font-bold font-serif mb-4" style={headingGold}>
            Momentos de Excelencia — 1955, San Antonio de los Baños
          </h3>
          <p className="mb-4" style={body}>
            El <strong>Indio Naborí</strong> y <strong>Angelito Valiente</strong> cruzaron palabras en controversias radiadas que aún se citan en Cuba. Dos voces, un formato ancestral, el aire convertido en arquitectura verbal. Las décimas salían con la urgencia del relámpago y la precisión del cirujano. Cuba entera escuchaba — y aprendía.
          </p>
          <p className="mb-4" style={body}>
            La revancha del 28 de agosto de 1955 en el estadio Campo Armada reunió más de diez mil personas — un récord nunca superado en Cuba. Esos duelos no transmitieron versos sueltos; sembraron un estándar. Quedaron como referencia para todo lo que vino después: así se hace, así se canta, así se honra la estrofa.
          </p>
          <blockquote className="border-l-4 pl-4 italic my-4 font-serif" style={quoteRule}>
            &ldquo;Pongan ahí un cuarto jurado: yo mismo, que voto por Naborí.&rdquo;
            <footer className="text-sm not-italic mt-2" style={accent}>
              — Angelito Valiente, tras la revancha
            </footer>
          </blockquote>
        </div>

        {/* 52 segundos */}
        <div className="mb-8 border-l-4 pl-6" style={leftRule}>
          <h3 className="text-2xl font-bold font-serif mb-4" style={headingGold}>
            Cincuenta y Dos Segundos: Arquitectura Contra el Reloj
          </h3>
          <p className="mb-4" style={body}>
            La décima improvisada se canta en unos <strong>52 segundos</strong>. Menos de un minuto para cristalizar un pensamiento en estructura, una emoción en forma fija, un golpe de chispa en algo que se va a recordar.
          </p>
          <p className="mb-4" style={body}>
            El decimista navega varias corrientes a la vez:
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-4" style={body}>
            <li>Métrica octosílaba sin que se note la cuenta</li>
            <li>Rimas consonantes que sigan la canción sin forzar el sentido</li>
            <li>Coherencia temática del primer verso al último</li>
            <li>Belleza, sin perder autenticidad</li>
            <li>Todo eso mientras corre el cronómetro y el público espera</li>
          </ul>
          <p className="mb-4" style={body}>
            No es acrobacia verbal. Es la prueba de que la restricción no aprieta la creatividad — la concentra. El marco rígido de la décima no aprisiona la expresión; la convierte en gema.
          </p>
          <p className="font-bold" style={accent}>
            Solo los maestros caben en esos 52 segundos donde técnica y arte se vuelven una sola cosa.
          </p>
        </div>

        {/* UNESCO 2017 */}
        <div className="mb-8 p-6 rounded-lg border-2" style={unescoCard}>
          <h3 className="text-2xl font-bold font-serif mb-4" style={headingOrange}>
            UNESCO 2017 — Patrimonio Cultural Inmaterial de la Humanidad
          </h3>
          <p className="mb-4" style={body}>
            En <strong>2017 la UNESCO inscribió el punto cubano como Patrimonio Cultural Inmaterial de la Humanidad</strong>. No celebró una forma poética suelta — reconoció un ecosistema vivo: la décima cantada que conecta a Espinel en el Siglo de Oro con un repentista en una plaza de Holguín hoy mismo, al erudito que la analiza con el guajiro que la improvisa, a la página impresa con la voz cantada.
          </p>
          <p className="italic font-serif" style={accent}>
            La décima vive. No como reliquia de museo, sino como organismo que cambia sin traicionar su esencia.
          </p>
        </div>

        {/* Viajera Peninsular → Viajera Digital */}
        <div className="mb-8 p-6 rounded-lg border-2" style={naboriCard}>
          <h3 className="text-2xl font-bold font-serif mb-4" style={headingOrange}>
            De Viajera Peninsular a Viajera Digital
          </h3>
          <p className="mb-4" style={body}>
            En 1940, <strong>Jesús Orta Ruiz — El Indio Naborí</strong> — le puso a la décima la metáfora perfecta: <em>viajera peninsular</em>. Una estrofa nacida en Andalucía que cruzó el mar, se enamoró del palmar cubano y nunca regresó. Lo dijo en sus propios diez versos:
          </p>
          <blockquote className="border-l-4 pl-4 italic my-4 font-serif leading-relaxed" style={quoteRule}>
            Viajera peninsular,<br />
            ¡cómo te has aplatanado!<br />
            ¿Qué sinsonte enamorado<br />
            te dio cita en el palmar?<br />
            Dejaste viña y pomar<br />
            soñando caña y café,<br />
            y tu alma española fue<br />
            canción de arado y guataca<br />
            cuando al vaivén de una hamaca<br />
            te diste al Cucalambé.
          </blockquote>
          <p className="text-sm mb-6 italic" style={body}>
            — Jesús Orta Ruiz (El Indio Naborí), 1940. Del poemario <em>Viajera peninsular</em>.
          </p>
          <p className="mb-4" style={body}>
            Y en otra estrofa del mismo poemario, Naborí selló el arraigo con una imagen que no se olvida:
          </p>
          <blockquote className="border-l-4 pl-4 italic my-4 font-serif leading-relaxed" style={quoteRule}>
            …te conquistó el arroyuelo<br />
            con musical bienvenida,<br />
            <strong>y te quedaste prendida<br />
            al verde imán de mi suelo.</strong>
          </blockquote>
          <p className="mb-4" style={body}>
            Ahí está la historia entera en dos pinceladas: la décima se aplatanó y se quedó prendida al verde imán de Cuba. El viaje de España a Cuba, la transformación de viña en caña, de guitarra en tres, de academia en guateque. La estrofa dejó de pertenecer a un poeta español del siglo XVI para volverse voz colectiva de un pueblo entero.
          </p>
          <p className="mb-4 font-bold text-lg" style={accent}>
            Esta aplicación lleva el nombre <em>Viajera Digital</em> en honor a esa imagen.
          </p>
          <p className="mb-4" style={body}>
            Porque la décima viaja de nuevo. Ya no cruza el Atlántico en barco de vela sino en señal digital. Ya no se asienta en un solo palmar sino que busca hogar en cada pantalla donde alguien quiera escucharla. La misma estrofa que se aplatanó en Cuba ahora se digitaliza — no para perder su tierra, sino para que su tierra no la pierda.
          </p>
          <p className="italic font-serif" style={accent}>
            De viajera peninsular a viajera digital: el mismo espíritu nómada, el mismo arraigo profundo, un nuevo camino.
          </p>
        </div>

        {/* Compendio de Poetas */}
        <PoetsCompendium />
      </div>
    </div>
  );
}

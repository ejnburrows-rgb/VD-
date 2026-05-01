import Link from "next/link";
import { Fleuron } from "@/components/fleuron";

export default function EducacionPage() {
  return (
    <main className="educacion-scroll">
      <div className="pt-8 max-w-3xl mx-auto">
        <Link href="/" className="inline-block font-ui text-[#8b6f2c] hover:text-[#3e2814] transition-colors mb-12 uppercase tracking-widest text-sm font-semibold">
          &larr; Memoria
        </Link>
        
        <article className="educacion-prose">
          <header className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-display font-bold text-[#3e2814] mb-4">La Décima Espinela</h1>
            <p className="font-prose italic text-xl text-[#6b4a25]">El Arraigo de la Palabra</p>
          </header>

          <p className="opening">
            La décima espinela despliega diez versos octosílabos organizados según el esquema ABBAACCDDC. Esta arquitectura, cristalizada por el poeta andaluz Vicente Espinel en 1591 dentro de su obra Diversas rimas, sostiene siglos de expresión lírica.
          </p>
          <p>
            Espinel codificó su forma definitiva: pausa obligatoria tras el cuarto verso y cuatro rimas consonantes perfectamente balanceadas. La pausa central permite tanto la respiración física como el giro conceptual, transformando diez líneas en una conversación interna entre planteamiento y resolución.
          </p>

          <div className="fleuron-wrap"><Fleuron /></div>

          <h2 className="italic text-center text-[#6b4a25] mb-6">Travesía Atlántica: Semilla en Nuevo Suelo</h2>
          <p>
            En 1608, Silvestre de Balboa compuso en Cuba Espejo de paciencia, el primer poema épico de la isla, marcando la presencia temprana de la décima en suelo americano.
          </p>
          <p>
            Durante el siglo XVIII, la inmigración canaria depositó la décima en el campo cubano, donde se estableció como punto guajiro. El campesinado adoptó la espinela como continente natural para su cosmovisión: lamentos, celebraciones y filosofía rural encontraron expresión en diez versos.
          </p>

          <div className="fleuron-wrap"><Fleuron /></div>

          <h2 className="italic text-center text-[#6b4a25] mb-6">El Cucalambé: Cubanización Definitiva</h2>
          <p>
            Juan Cristóbal Nápoles Fajardo cubanizó definitivamente la décima al adaptarla como continente estético al contenido de lo identitario cubano. Su obra es la voz del campesino que nos constituyó medularmente como pueblo.
          </p>
          <p>
            La décima fluyó simultáneamente en la poesía culta y popular. La espinela no pertenecía a una clase social específica, sino a quienes dominaban su técnica, desde los palacios madrileños hasta los bohíos cubanos.
          </p>

          <div className="fleuron-wrap"><Fleuron /></div>

          <h2 className="italic text-center text-[#6b4a25] mb-6">El Repentismo: Arte Nacional</h2>
          <p>
            El repentismo—improvisación de décimas en competencia—se consolidó como arte nacional cubano. La controversia se estructura como un diálogo dialéctico donde cada poeta debe responder al contrario incorporando pies forzados con maestría técnica.
          </p>
          <p>
            La radio transformó la décima en fenómeno masivo, democratizando la complejidad técnica. Los oyentes aprendían a reconocer la excelencia en tiempo real, apreciando cómo un repentista incorpora un verso ajeno sin que se note el giro.
          </p>

          <div className="fleuron-wrap"><Fleuron /></div>

          <h2 className="italic text-center text-[#6b4a25] mb-6">Momentos de Excelencia: La Controversia del Siglo (1955)</h2>
          <p>
            El 28 de agosto de 1955, más de diez mil personas presenciaron en el estadio Campo Armada de San Miguel del Padrón el duelo entre Jesús Orta Ruiz "El Indio Naborí" y Angelito Valiente. Naborí y Valiente no solo demostraban virtuosismo: glosaban la actualidad, llamaban a la conciencia colectiva y elevaban la atención cotidiana a niveles de visión poética.
          </p>
          <blockquote className="decima text-center my-8">
            "Pongan ahí un cuarto jurado: yo mismo, que voto por Naborí."<br/>
            <footer>— Angelito Valiente</footer>
          </blockquote>

          <div className="fleuron-wrap"><Fleuron /></div>

          <h2 className="italic text-center text-[#6b4a25] mb-6">UNESCO 2017: Patrimonio del Mundo</h2>
          <p>
            En diciembre de 2017, la UNESCO declaró el Punto cubano como Patrimonio Cultural Inmaterial de la Humanidad, reconociendo oficialmente lo que el pueblo cubano ha sabido por siglos: que esta música es el alma de una nación.
          </p>
        </article>
      </div>
    </main>
  );
}

"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'

interface Poet {
  name: string
  birthYear?: number
  deathYear?: number
  birthplace?: string
  biography: string
  style?: string
  influences?: string[]
  notableWorks?: string[]
}

function getPoetBiography(poetName: string): Poet | null {
  const poets: { [key: string]: Poet } = {
    "Calixto González": {
      name: "Calixto González",
      birthYear: 1945,
      birthplace: "La Coloma, Pinar del Río",
      biography: "Calixto nació donde el cielo toca el agua—La Coloma, pueblo de pescadores donde el mar y la tierra se funden en una sola voz. Desde niño, las décimas fueron su lenguaje natural, aprendidas en las tertulias familiares y en los encuentros improvisados del pueblo. Su exilio a Miami en los años 60 lo convirtió en uno de los pilares de la comunidad cubana en Hialeah, donde mantuvo viva la tradición de la décima espinela. Calixto no solo improvisaba, sino que creaba comunidad a través de la poesía, uniendo a generaciones en torno al arte de la décima. Su legado perdura en cada canturía que resuena en los encuentros de poetas cubanos en el exilio.",
      style: "Improvisación, creación colectiva",
      influences: ["Tradición oral", "Exilio cubano", "Canturías familiares"],
      notableWorks: ["Décimas de La Coloma", "Voces del exilio", "Canturías de Hialeah"]
    },
    "Alexis Díaz-Pimienta": {
      name: "Alexis Díaz-Pimienta",
      birthYear: 1966,
      birthplace: "La Habana, Cuba",
      biography: "Poeta, repentista y teórico de la décima espinela, Alexis Díaz-Pimienta ha dedicado su vida al estudio y práctica del repentismo. Doctor en Filología, ha publicado numerosos libros sobre teoría de la improvisación y ha llevado la décima cubana a escenarios internacionales. Su trabajo académico ha sido fundamental para entender la estructura y evolución de la décima espinela, mientras que su práctica como repentista demuestra la vitalidad contemporánea de esta tradición milenaria.",
      style: "Repentismo académico",
      influences: ["Naborí", "Indio Naborí", "Tradición académica"],
      notableWorks: ["Teoría de la improvisación", "El libro de la décima", "Manual del repentista"]
    },
    "Juan Antonio Díaz": {
      name: "Juan Antonio Díaz",
      birthYear: 1950,
      birthplace: "Cuba",
      biography: "Poeta y promotor cultural, Juan Antonio Díaz ha sido fundamental en la preservación y difusión de la décima espinela cubana. Su trabajo en juanantoniodiaz.com ha creado un espacio digital único para la décima, conectando a poetas de todas las generaciones. Su poesía refleja la nostalgia del exilio y el amor por la tradición cubana, manteniendo viva la llama de la décima en la diáspora.",
      style: "Décima tradicional, temática del exilio",
      influences: ["Tradición oral cubana", "Poesía del exilio"],
      notableWorks: ["Décimas del exilio", "Canturías digitales"]
    },
    "Eduardo Duque": {
      name: "Eduardo Duque",
      birthYear: 1960,
      birthplace: "Cuba",
      biography: "Repentista destacado, Eduardo Duque ha llevado la décima espinela a nuevos públicos a través de sus presentaciones y grabaciones. Su estilo combina la tradición con elementos contemporáneos, demostrando la versatilidad y vigencia de la décima. Ha participado en numerosos encuentros y festivales de poesía improvisada, tanto en Cuba como en la diáspora.",
      style: "Repentismo tradicional",
      influences: ["Tradición oral", "Improvisación"],
      notableWorks: ["Canturías en vivo", "Décimas improvisadas"]
    },
    "Anamarys Gil": {
      name: "Anamarys Gil",
      birthYear: 1970,
      birthplace: "Cuba",
      biography: "Poetisa y repentista, Anamarys Gil representa la nueva generación de decimistas cubanos. Su trabajo demuestra que la décima espinela no es solo patrimonio del pasado, sino un arte vivo y en constante evolución. Ha participado activamente en encuentros de poetas y ha contribuido a mantener viva la tradición en las nuevas generaciones.",
      style: "Décima contemporánea",
      influences: ["Tradición oral", "Poesía contemporánea"],
      notableWorks: ["Décimas nuevas", "Voces jóvenes"]
    },
    "Indio Naborí": {
      name: "Indio Naborí",
      birthYear: 1922,
      deathYear: 2005,
      birthplace: "San Miguel del Padrón, La Habana",
      biography: "Considerado uno de los más grandes decimistas cubanos del siglo XX, Jesús Orta Ruiz, conocido como 'Indio Naborí', fue poeta, periodista y promotor cultural. Su obra abarca desde la décima tradicional hasta la experimentación moderna, siempre manteniendo el respeto por la métrica y la rima. Fue fundador de la Unión Nacional de Escritores y Artistas de Cuba y su legado literario es fundamental para entender la evolución de la décima en Cuba.",
      style: "Décima tradicional y moderna",
      influences: ["Tradición oral", "Vanguardias literarias"],
      notableWorks: ["Décimas completas", "Poesía cubana", "El libro de la décima"]
    },
    "Pedro Péglez González": {
      name: "Pedro Péglez González",
      birthYear: 1940,
      birthplace: "Cuba",
      biography: "Poeta y repentista, Pedro Péglez González ha sido un pilar de la décima espinela en la comunidad cubana. Su trabajo ha mantenido viva la tradición de la improvisación y ha formado a nuevas generaciones de poetas. Su estilo se caracteriza por la profundidad temática y el dominio técnico de la métrica.",
      style: "Décima tradicional",
      influences: ["Tradición oral", "Improvisación"],
      notableWorks: ["Canturías tradicionales", "Décimas del pueblo"]
    },
    "Justo Vega": {
      name: "Justo Vega",
      birthYear: 1909,
      deathYear: 1993,
      birthplace: "San Antonio de los Baños, La Habana",
      biography: "Leyenda del repentismo cubano, Justo Vega fue uno de los más grandes improvisadores del siglo XX. Junto a Adolfo Alfonso, formó una de las parejas más famosas del repentismo cubano. Su capacidad para improvisar décimas sobre cualquier tema, su dominio de la métrica y su ingenio lo convirtieron en un referente indiscutible del arte de la décima espinela.",
      style: "Repentismo clásico",
      influences: ["Tradición oral", "Improvisación"],
      notableWorks: ["Canturías con Adolfo Alfonso", "Décimas improvisadas"]
    },
    "Adolfo Alfonso": {
      name: "Adolfo Alfonso",
      birthYear: 1914,
      deathYear: 1999,
      birthplace: "San Antonio de los Baños, La Habana",
      biography: "Compañero inseparable de Justo Vega, Adolfo Alfonso formó parte de una de las duplas más famosas del repentismo cubano. Su estilo complementaba perfectamente el de Vega, creando diálogos poéticos que han quedado como referencia del arte de la improvisación. Su dominio de la décima espinela y su capacidad para crear versos sobre cualquier tema lo convirtieron en una leyenda del repentismo.",
      style: "Repentismo clásico",
      influences: ["Tradición oral", "Improvisación"],
      notableWorks: ["Canturías con Justo Vega", "Décimas del campo"]
    },
    "Vicente Espinel": {
      name: "Vicente Espinel",
      birthYear: 1550,
      deathYear: 1624,
      birthplace: "Ronda, España",
      biography: "Creador de la décima espinela, Vicente Espinel fue un poeta, músico y novelista español del Siglo de Oro. Aunque no era cubano, su invención de la estrofa de diez versos con el esquema de rima ABBAACCDDC se convirtió en la base de una de las tradiciones poéticas más importantes de Cuba. La décima espinela debe su nombre a Espinel, quien la popularizó en su obra 'Diversas rimas' (1591).",
      style: "Décima espinela (creador)",
      influences: ["Poesía renacentista española"],
      notableWorks: ["Diversas rimas", "Vida del escudero Marcos de Obregón"]
    },
    "José Martí": {
      name: "José Martí",
      birthYear: 1853,
      deathYear: 1895,
      birthplace: "La Habana, Cuba",
      biography: "Aunque más conocido por su prosa y su lucha por la independencia de Cuba, José Martí también cultivó la décima espinela en su obra poética. Su uso de la décima demuestra la versatilidad de esta forma métrica y su capacidad para expresar tanto temas íntimos como políticos. Martí elevó la décima a nuevos niveles de expresión literaria.",
      style: "Décima literaria",
      influences: ["Romanticismo", "Modernismo"],
      notableWorks: ["Versos libres", "Ismaelillo", "Versos sencillos"]
    },
    "Eliseo Diego": {
      name: "Eliseo Diego",
      birthYear: 1920,
      deathYear: 1994,
      birthplace: "La Habana, Cuba",
      biography: "Poeta cubano de la generación del Orígenes, Eliseo Diego cultivó la décima espinela con maestría, combinando la tradición métrica con una sensibilidad moderna. Su obra poética, aunque no se limita a la décima, demuestra el respeto y dominio de esta forma tradicional, adaptándola a temas contemporáneos con elegancia y profundidad.",
      style: "Décima literaria moderna",
      influences: ["Tradición oral", "Vanguardias literarias"],
      notableWorks: ["En la calzada de Jesús del Monte", "Poesía completa"]
    }
  }

  return poets[poetName] || null
}

export function EducationSection() {
  const [expandedPoet, setExpandedPoet] = useState<string | null>(null)
  const [activeSection, setActiveSection] = useState<string | null>(null)

  const poets = [
    "Calixto González",
    "Alexis Díaz-Pimienta",
    "Juan Antonio Díaz",
    "Eduardo Duque",
    "Anamarys Gil",
    "Indio Naborí",
    "Pedro Péglez González",
    "Justo Vega",
    "Adolfo Alfonso",
    "Vicente Espinel",
    "José Martí",
    "Eliseo Diego"
  ]

  const educationalSections = [
    {
      id: "que-es",
      title: "¿Qué es una Décima?",
      content: `La décima es una estrofa poética de diez versos octosílabos (ocho sílabas cada uno) con un esquema de rima específico. La décima espinela, creada por el poeta español Vicente Espinel en el siglo XVI, tiene el esquema de rima ABBAACCDDC.

Esta forma poética se caracteriza por su estructura fija: diez versos de ocho sílabas cada uno, con un patrón de rima que crea una musicalidad única. La décima ha sido fundamental en la tradición oral cubana, especialmente en el repentismo o improvisación poética.`
    },
    {
      id: "historia",
      title: "Historia de la Décima Espinela",
      content: `La décima espinela fue creada por Vicente Espinel (1550-1624), poeta español del Siglo de Oro, quien la popularizó en su obra "Diversas rimas" (1591). Aunque Espinel no inventó la estrofa de diez versos, sí estableció el esquema de rima ABBAACCDDC que lleva su nombre.

La décima llegó a América durante la colonización española y se arraigó profundamente en Cuba, donde se convirtió en la forma poética preferida para la improvisación. En Cuba, la décima espinela se fusionó con las tradiciones africanas y criollas, creando un estilo único que perdura hasta hoy.`
    },
    {
      id: "estructura",
      title: "Estructura: ABBAACCDDC",
      content: `El esquema de rima ABBAACCDDC es la característica distintiva de la décima espinela:

- Versos 1 y 4 riman (A)
- Versos 2 y 3 riman (B)
- Versos 5 y 6 riman (A)
- Versos 7 y 10 riman (C)
- Versos 8 y 9 riman (D)

Esta estructura crea una musicalidad única que facilita la memorización y la improvisación. Los versos 1-4 forman una cuarteta, los versos 5-6 un pareado, y los versos 7-10 otra cuarteta invertida, creando un equilibrio perfecto.`
    },
    {
      id: "silabas",
      title: "Sílabas Métricas (8 por verso)",
      content: `Cada verso de la décima espinela debe tener exactamente ocho sílabas métricas. El conteo de sílabas en español sigue reglas específicas:

1. Sinalefa: Cuando una palabra termina en vocal y la siguiente comienza en vocal, se cuentan como una sola sílaba.
2. Hiato: Algunas combinaciones de vocales no forman sinalefa y se cuentan por separado.
3. Acento final: Si el verso termina en palabra aguda, se suma una sílaba; si termina en palabra esdrújula, se resta una.

El dominio de estas reglas es esencial para crear décimas correctas y mantener la musicalidad de la estrofa.`
    },
    {
      id: "rima",
      title: "Rima Consonante vs Asonante",
      content: `En la décima espinela tradicional se usa rima consonante, donde todas las letras desde la última vocal tónica coinciden:

- Rima consonante: "casa" rima con "masa" (casa/masa)
- Rima asonante: "casa" rima con "rama" (solo las vocales: a-a)

La décima espinela clásica requiere rima consonante perfecta, aunque en la práctica contemporánea a veces se acepta rima asonante. La rima consonante es más difícil pero crea una musicalidad más rica y es la preferida en competencias y encuentros de repentismo.`
    },
    {
      id: "cuba",
      title: "Décima en Cuba",
      content: `La décima espinela llegó a Cuba con los colonizadores españoles y se arraigó profundamente en la cultura popular. En Cuba, la décima se fusionó con:

- Tradiciones africanas: Los ritmos y estructuras de la música africana influyeron en el canto de décimas.
- Cultura campesina: La décima se convirtió en la forma poética preferida en el campo cubano.
- Improvisación: El repentismo cubano elevó la décima a un arte de improvisación en vivo.

Hoy, la décima espinela es considerada patrimonio cultural cubano y se practica tanto en la isla como en la diáspora, especialmente en comunidades de Miami, donde poetas como Calixto González mantuvieron viva la tradición.`
    },
    {
      id: "grandes",
      title: "Grandes Decimistas",
      content: `Algunos de los más grandes decimistas cubanos incluyen:

- Indio Naborí (Jesús Orta Ruiz): Considerado el más grande decimista del siglo XX.
- Justo Vega y Adolfo Alfonso: La pareja más famosa del repentismo cubano.
- Alexis Díaz-Pimienta: Teórico y practicante contemporáneo de la décima.
- Calixto González: "El Guajiro de Hialeah", pilar de la décima en el exilio.

Estos y muchos otros poetas han mantenido viva la tradición de la décima espinela, adaptándola a nuevos contextos mientras preservan su esencia tradicional.`
    },
    {
      id: "improvisacion",
      title: "Improvisación (Repentismo)",
      content: `El repentismo es el arte de improvisar décimas en vivo, respondiendo a temas propuestos por el público o a desafíos de otros poetas. Características:

- Improvisación en tiempo real: El poeta crea décimas sobre la marcha.
- Temas variados: Desde temas filosóficos hasta situaciones cotidianas.
- Competencias: Los encuentros de repentistas incluyen desafíos y competencias.
- Musicalidad: Las décimas se cantan o recitan con acompañamiento musical.

El repentismo requiere dominio técnico de la métrica, rima y ritmo, además de creatividad y agilidad mental. Es una de las formas más puras de la tradición oral cubana.`
    },
    {
      id: "recursos",
      title: "Recursos para Aprender",
      content: `Para aprender sobre la décima espinela:

1. Libros: "Teoría de la improvisación" de Alexis Díaz-Pimienta, obras de Indio Naborí.
2. Sitios web: juanantoniodiaz.com, plataformas de décima cubana.
3. Videos: Canal de YouTube @juanantoniodiaz9034 con canturías y análisis.
4. Encuentros: Participar en encuentros de poetas y repentistas.
5. Práctica: Escribir y recitar décimas regularmente.

La mejor forma de aprender es escuchando a los maestros, practicando la métrica y la rima, y participando en la comunidad de decimistas.`
    }
  ]

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <h2 className="text-3xl font-serif font-bold text-[#C8A05C] mb-8 text-center">
        🎓 Educación Histórica
      </h2>

      {/* Sobre la Décima Espinela */}
      <div className="cuban-card mb-6">
        <h3 className="text-2xl font-serif font-bold text-[#C8A05C] mb-4">
          Sobre la Décima Espinela
        </h3>
        <p className="leading-relaxed text-[#5C4033]">
          La <strong>décima espinela</strong> es una estrofa de <strong>10 versos octosílabos</strong> 
          (8 sílabas cada uno) con rima consonante en el esquema <strong>ABBAACCDDC</strong>.
          Cada décima es un universo completo de significado, belleza y técnica.
        </p>
      </div>

      {/* Historia en Cuba */}
      <div className="cuban-card mb-6">
        <h3 className="text-2xl font-serif font-bold text-[#C8A05C] mb-4">
          Historia en Cuba
        </h3>
        <ul className="space-y-3 text-[#5C4033]">
          <li>
            <strong>Primer indicio (1608):</strong> "Espejo de paciencia" 
            de Silvestre de Balboa — primera obra literaria cubana
          </li>
          <li>
            <strong>Consolidación (Siglo XVIII):</strong> Ligada a inmigración 
            canaria y al punto guajiro
          </li>
          <li>
            <strong>Evolución (Siglo XIX):</strong> De poesía elitista escrita 
            a improvisación oral popular — "El Cucalamb" cubaniza la forma
          </li>
          <li>
            <strong>Modernización (Siglo XX):</strong> Popularización masiva a través 
            de radio, televisión y canturas públicas
          </li>
        </ul>
      </div>

      {/* Educational Sections */}
      <div className="grid md:grid-cols-2 gap-4 mb-12">
        {educationalSections.map((section) => (
          <Card key={section.id} className="bg-[#F5E6D3] border-2 border-[#C8A05C]">
            <CardHeader>
              <CardTitle className="text-[#C8A05C]">{section.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[#5C4033] text-sm leading-relaxed whitespace-pre-line">
                {section.content}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Maestros de la Décima */}
      <div className="cuban-card mb-6">
        <h3 className="text-2xl font-serif font-bold text-[#C8A05C] mb-4">
          Maestros de la Décima: Voces que Construyen Tradición
        </h3>
        
        <div className="poet-list space-y-4">
          {poets.map((poetName) => {
            const poet = getPoetBiography(poetName)
            if (!poet) return null

            const isExpanded = expandedPoet === poetName

            return (
              <div key={poetName} className="poet-item border-b border-[#C8A05C]/30 pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-[#5C4033]">
                      {poet.name}
                    </h4>
                    {poet.birthYear && (
                      <p className="text-sm text-[#5C4033]/70">
                        {poet.birthplace}
                        {' '}({poet.birthYear}
                        {poet.deathYear ? ` - ${poet.deathYear}` : ''})
                      </p>
                    )}
                    {poet.style && (
                      <p className="text-sm italic text-[#C8A05C]">{poet.style}</p>
                    )}
                  </div>
                  <button
                    onClick={() => setExpandedPoet(isExpanded ? null : poetName)}
                    className="ml-4 text-2xl hover:scale-110 transition-transform"
                    aria-label={`Más información sobre ${poet.name}`}
                  >
                    ℹ️
                  </button>
                </div>
                
                {/* Panel expandible */}
                {isExpanded && (
                  <div className="mt-4 p-4 bg-[#F5E6D3] rounded-lg decima-text animate-in fade-in duration-300">
                    <p className="mb-4 text-[#5C4033] leading-relaxed">
                      {poet.biography}
                    </p>

                    {poet.style && (
                      <div className="mb-2">
                        <strong className="text-[#D2691E]">Estilo:</strong>{' '}
                        <span className="text-[#5C4033]">{poet.style}</span>
                      </div>
                    )}

                    {poet.influences && poet.influences.length > 0 && (
                      <div className="mb-2">
                        <strong className="text-[#D2691E]">Influencias:</strong>{' '}
                        <span className="text-[#5C4033]">{poet.influences.join(', ')}</span>
                      </div>
                    )}

                    {poet.notableWorks && poet.notableWorks.length > 0 && (
                      <div className="mb-4">
                        <strong className="text-[#D2691E]">Obras destacadas:</strong>{' '}
                        <span className="text-[#5C4033]">{poet.notableWorks.join(', ')}</span>
                      </div>
                    )}

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setExpandedPoet(null)}
                      className="mt-2"
                    >
                      Cerrar
                    </Button>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Momento Cumbre 1955 */}
      <div className="cuban-card mb-6">
        <h3 className="text-2xl font-serif font-bold text-[#C8A05C] mb-4">
          ⚡ Momento Cumbre 1955
        </h3>
        <p className="leading-relaxed mb-4 text-[#5C4033]">
          El <strong>28 de agosto de 1955</strong>, más de <strong>diez mil personas</strong> 
          llenaron el estadio Campo Armada de San Miguel del Padrón para presenciar la 
          revancha entre <strong>El Indio Naborí</strong> y <strong>Angelito Valiente</strong> 
          — un récord nunca superado en Cuba.
        </p>
        <p className="leading-relaxed mb-4 text-[#5C4033]">
          Los temas fueron <strong>El Campesino</strong> y <strong>La Esperanza</strong>. 
          Improvisaron diez espinelas cada uno. El jurado otorgó el triunfo al Indio Naborí, 
          pero Angelito, con su caballerosidad característica, se acercó al jurado y dijo:
        </p>
        <blockquote className="italic text-center my-4 p-4 bg-[#C8A05C]/10 rounded border-l-4 border-[#C8A05C] text-[#5C4033]">
          "Pongan ahí un cuarto jurado: yo mismo, que voto por Nabor."
        </blockquote>
        <p className="text-sm italic text-[#5C4033]">
          Esta controversia es un momento cimero del repentismo que ha trascendido 
          el instante al adquirir valor textual.
        </p>
      </div>

      {/* Proeza Técnica */}
      <div className="cuban-card mb-6">
        <h3 className="text-2xl font-serif font-bold text-[#C8A05C] mb-4">
          🎯 Proeza Técnica: El Desafío de los 52 Segundos
        </h3>
        <p className="leading-relaxed mb-4 text-[#5C4033]">
          Componer una décima perfecta en menos de un minuto requiere:
        </p>
        <ul className="space-y-2 ml-6 text-[#5C4033]">
          <li>✅ <strong>Métrica octosílaba correcta</strong> (8 sílabas por verso)</li>
          <li>✅ <strong>Rima consonante ABBAACCDDC impecable</strong></li>
          <li>✅ <strong>Coherencia temática y narrativa</strong></li>
          <li>✅ <strong>Belleza lírica y profundidad conceptual</strong></li>
          <li>✅ <strong>TODO en menos de 60 segundos</strong></li>
        </ul>
        <p className="text-center font-semibold mt-4 text-lg text-[#5C4033]">
          Solo los maestros lo logran.
        </p>
      </div>

      {/* Patrimonio UNESCO */}
      <div className="cuban-card mb-6 bg-[#C8A05C]/10">
        <h3 className="text-2xl font-serif font-bold text-[#C8A05C] mb-4">
          🌍 Patrimonio Cultural Inmaterial de la Humanidad
        </h3>
        <p className="leading-relaxed mb-4 text-[#5C4033]">
          En <strong>2012</strong>, la <strong>UNESCO</strong> reconoció la décima cubana 
          como <strong>Patrimonio Cultural Inmaterial de la Humanidad</strong>.
        </p>
        <p className="leading-relaxed mb-2 text-[#5C4033]">
          Este reconocimiento celebra:
        </p>
        <ul className="space-y-2 ml-6 text-[#5C4033]">
          <li>🎤 La tradición viva de la improvisación oral</li>
          <li>🌾 La preservación de la identidad cultural campesina</li>
          <li>👨‍👩‍👧‍👦 La transmisión intergeneracional del arte decimístico</li>
          <li>🌊 El puente cultural entre España y América Latina</li>
        </ul>
      </div>
    </div>
  )
}


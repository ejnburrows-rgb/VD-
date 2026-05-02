"use client"

import Image from "next/image"
import { useMemo, useState } from "react"
import { PoetPlaceholder } from "./poet-placeholder"

type Poet = {
  slug: string
  name: string
  era: string
  years?: string
  location?: string
  portrait?: string
  dek: string
  story: string
  legacy: string[]
}

const POETS: Poet[] = [
  {
    slug: "espinel",
    name: "Vicente Espinel",
    era: "Siglo XVI · Andalucía",
    years: "1550–1624",
    location: "Ronda, España",
    portrait: "/poets/espinel.jpg",
    dek: "El nombre que queda unido a la espinela: diez versos octosílabos con una arquitectura que todavía sostiene la improvisación.",
    story:
      "Espinel pertenece al origen formal de la décima espinela. Su importancia no está en una estatua fría, sino en haber dado una casa métrica a una emoción popular que después cruzó mares, campos y generaciones.",
    legacy: [
      "Fija la forma clásica de la espinela.",
      "Une música, verso y memoria popular.",
      "Su estructura viaja después hacia Cuba y América Latina.",
    ],
  },
  {
    slug: "placido",
    name: "Plácido",
    era: "Siglo XIX · Cuba colonial",
    years: "1809–1844",
    location: "La Habana / Matanzas",
    portrait: "/poets/placido.jpg",
    dek: "Gabriel de la Concepción Valdés: voz de belleza, dolor y destino trágico en la poesía cubana.",
    story:
      "Plácido representa una sensibilidad cubana que escribe desde la herida y desde la dignidad. Su figura recuerda que la poesía también puede sobrevivir como testimonio de una época injusta.",
    legacy: [
      "Figura central de la poesía cubana del siglo XIX.",
      "Su obra enlaza lirismo, identidad y drama histórico.",
      "Su nombre sigue vivo en la memoria literaria nacional.",
    ],
  },
  {
    slug: "cucalambe",
    name: "El Cucalambé",
    era: "Siglo XIX · Cuba colonial",
    years: "1829–1862",
    location: "Las Tunas, Cuba",
    portrait: "/poets/cucalambe.jpg",
    dek: "Juan Cristóbal Nápoles Fajardo: una raíz profunda de la poesía campesina cubana.",
    story:
      "El Cucalambé convirtió el paisaje guajiro en materia poética. En su obra, el campo no aparece como decoración: aparece como mundo, carácter, lengua y destino.",
    legacy: [
      "Símbolo mayor del siboneyismo y la poesía campesina.",
      "Referente para la identidad lírica rural cubana.",
      "Su nombre acompaña festivales y tradiciones de la décima.",
    ],
  },
  {
    slug: "chanito",
    name: "Chanito Isidrón",
    era: "Edad de Oro · 1940–50",
    years: "1903–1987",
    location: "Cuba",
    portrait: "/poets/chanito.jpg",
    dek: "Improvisador de gracia veloz, picardía limpia y dominio escénico.",
    story:
      "Chanito representa esa décima que entra por el oído como conversación brillante. Su fuerza estaba en la respuesta, el giro y la naturalidad con que hacía parecer fácil lo difícil.",
    legacy: [
      "Figura clave de la controversia campesina.",
      "Maestro del humor fino y la réplica improvisada.",
      "Puente entre radio, público popular y tradición oral.",
    ],
  },
  {
    slug: "justo-vega",
    name: "Justo Vega",
    era: "Edad de Oro · 1940–50",
    years: "1909–1993",
    location: "Cuba",
    portrait: "/poets/justo-vega.jpg",
    dek: "Una de las voces legendarias de la controversia cubana.",
    story:
      "Justo Vega encarna el temple del repentista clásico: claridad, musicalidad, respeto por la forma y una presencia que convertía cada duelo verbal en memoria colectiva.",
    legacy: [
      "Nombre imprescindible de la décima oral cubana.",
      "Referente de elegancia en la controversia.",
      "Modelo de dominio métrico y presencia radial.",
    ],
  },
  {
    slug: "adolfo-alfonso",
    name: "Adolfo Alfonso",
    era: "Edad de Oro · 1940–50",
    years: "1924–2012",
    location: "Cuba",
    portrait: "/poets/adolfo-alfonso.jpg",
    dek: "Poeta de filo, rapidez y autoridad dentro del repentismo cubano.",
    story:
      "Adolfo Alfonso dejó la impresión de un poeta que sabía entrar al combate verbal con precisión. Su décima tenía energía, calle, campo y oficio.",
    legacy: [
      "Controversista de enorme reconocimiento popular.",
      "Figura asociada a la radio y a la escena campesina.",
      "Ejemplo de repentismo con fuerza y claridad.",
    ],
  },
  {
    slug: "sosa-curbelo",
    name: "Sosa Curbelo",
    era: "Edad de Oro · 1940–50",
    years: "",
    location: "Cuba",
    portrait: "/poets/sosa-curbelo.jpg",
    dek: "Nombre de respeto dentro del linaje de poetas populares cubanos.",
    story:
      "Sosa Curbelo pertenece a esa constelación de voces que sostuvieron la décima como arte vivo: no como pieza de museo, sino como palabra dicha frente al pueblo.",
    legacy: [
      "Parte de la memoria oral de la controversia cubana.",
      "Figura del ambiente guajiro tradicional.",
      "Nombre que merece preservación dentro del archivo décimista.",
    ],
  },
  {
    slug: "angel-valiente",
    name: "Angelito Valiente",
    era: "Edad de Oro · 1940–50",
    years: "1916–1987",
    location: "Cuba",
    portrait: "/poets/angel-valiente.jpg",
    dek: "Una voz de autoridad natural, recordada por su fuerza en la controversia.",
    story:
      "Angelito Valiente fue de esos poetas que no necesitaban adornar demasiado para imponerse. Su arte estaba en la seguridad del verso, la cadencia y el golpe justo.",
    legacy: [
      "Figura reconocida del repentismo cubano.",
      "Asociado a controversias memorables.",
      "Ejemplo de voz popular con mando poético.",
    ],
  },
  {
    slug: "riveron-hernandez",
    name: "Riverón Hernández",
    era: "Edad de Oro · 1940–50",
    years: "",
    location: "Cuba",
    portrait: "/poets/riveron-hernandez.jpg",
    dek: "Presencia del linaje guajiro que mantuvo encendida la palabra improvisada.",
    story:
      "Riverón Hernández pertenece al mapa de voces que hicieron de la décima una conversación nacional. Su memoria se guarda en grabaciones, relatos y respeto popular.",
    legacy: [
      "Representante de la tradición oral cubana.",
      "Nombre vinculado al canto campesino.",
      "Parte del archivo sentimental de la controversia.",
    ],
  },
  {
    slug: "indio-nabori",
    name: "El Indio Naborí",
    era: "Generación Naborí",
    years: "1922–2005",
    location: "Cuba",
    portrait: "/poets/indio-nabori.jpg",
    dek: "Jesús Orta Ruiz: una de las cumbres intelectuales y populares de la décima cubana.",
    story:
      "Naborí elevó la décima sin quitarle tierra. En su obra conviven cultura, patria, campo, pensamiento y emoción. Es una prueba de que lo popular también puede ser alto arte.",
    legacy: [
      "Poeta Nacional de Cuba.",
      "Figura decisiva para prestigiar la décima escrita y oral.",
      "Puente entre tradición campesina y literatura mayor.",
    ],
  },
  {
    slug: "efrain-riveron",
    name: "Efraín Riverón",
    era: "Generación Naborí",
    years: "",
    location: "Cuba",
    portrait: "/poets/efrain-riveron.jpg",
    dek: "Voz vinculada a la continuidad del repentismo y la memoria campesina.",
    story:
      "Efraín Riverón representa la continuidad: esa línea de poetas que reciben una herencia, la trabajan en público y la entregan viva a los que vienen después.",
    legacy: [
      "Nombre dentro de la tradición repentista.",
      "Parte del tejido cultural de la décima cubana.",
      "Voz asociada a la permanencia del arte oral.",
    ],
  },
  {
    slug: "soriano",
    name: "Soriano",
    era: "Maestros del exilio",
    years: "",
    location: "Cuba / Exilio",
    portrait: "/poets/soriano.jpg",
    dek: "La décima llevada en la memoria de los que salieron sin soltar la raíz.",
    story:
      "Soriano pertenece al capítulo del exilio, donde la canturía no es solo espectáculo: es forma de recordar, reunirse y seguir siendo.",
    legacy: [
      "Representante de la décima fuera de la isla.",
      "Vincula nostalgia, comunidad y tradición.",
      "Nombre a preservar dentro del archivo del exilio.",
    ],
  },
  {
    slug: "pablo-leon",
    name: "Pablo León",
    era: "Maestros del exilio",
    years: "",
    location: "Cuba / Miami",
    portrait: "/poets/pablo-leon.jpg",
    dek: "Poeta de encuentro, controversia y memoria viva del exilio cubano.",
    story:
      "Pablo León pertenece a la canturía como reunión de familia ampliada: voces, guitarra, respuesta, respeto y emoción compartida.",
    legacy: [
      "Figura presente en la tradición décimista del exilio.",
      "Asociado a encuentros de controversia y canto guajiro.",
      "Parte del puente cultural entre Cuba y Miami.",
    ],
  },
  {
    slug: "candelita",
    name: "Candelita",
    era: "Maestros del exilio",
    years: "",
    location: "Cuba / Exilio",
    portrait: "/poets/candelita.jpg",
    dek: "Nombre querido dentro de la memoria cantada del guajiro cubano.",
    story:
      "Candelita trae esa luz de los nombres populares: los que el público recuerda no por solemnidad, sino por cariño, presencia y sabor en la décima.",
    legacy: [
      "Voz vinculada a la cultura guajira cubana.",
      "Nombre de reconocimiento popular.",
      "Parte del ambiente vivo de la controversia.",
    ],
  },
  {
    slug: "mirabal",
    name: "Mirabal",
    era: "Voz contemporánea",
    years: "",
    location: "Cuba / Exilio",
    portrait: "/poets/mirabal.jpg",
    dek: "Una voz contemporánea dentro del mapa de controversias y encuentros.",
    story:
      "Mirabal representa la décima como continuidad presente: no un recuerdo inmóvil, sino una práctica que todavía exige oído, respeto y rapidez.",
    legacy: [
      "Figura de la continuidad décimista.",
      "Parte de los encuentros contemporáneos.",
      "Mantiene viva la práctica de la controversia.",
    ],
  },
  {
    slug: "tomasita-quiala",
    name: "Tomasita Quiala",
    era: "Voz contemporánea",
    years: "1961–",
    location: "La Habana, Cuba",
    portrait: "/poets/tomasita-quiala.jpg",
    dek: "Una de las grandes improvisadoras cubanas, dueña de fuerza escénica y dominio verbal.",
    story:
      "Tomasita Quiala rompe cualquier idea pequeña de la décima. En ella hay poder, rapidez, gracia y una autoridad que convierte la improvisación en presencia mayor.",
    legacy: [
      "Figura fundamental del repentismo contemporáneo.",
      "Reconocida por su fuerza como improvisadora.",
      "Referente para nuevas generaciones de poetas.",
    ],
  },
  {
    slug: "chanchito",
    name: "Chanchito Pereira",
    era: "Voz contemporánea",
    years: "",
    location: "Cuba / Exilio",
    portrait: "/poets/chanchito.jpg",
    dek: "Poeta de sabor popular, memoria oral y encuentro familiar.",
    story:
      "Chanchito Pereira pertenece al universo donde la décima se vive cerca: en reuniones, controversias, videos, recuerdos y afectos que necesitan conservarse.",
    legacy: [
      "Nombre presente en la memoria décimista familiar.",
      "Parte de la escena contemporánea del canto guajiro.",
      "Voz a conservar dentro del archivo de Canturía.",
    ],
  },
  {
    slug: "juan-antonio-diaz",
    name: "Juan Antonio Díaz",
    era: "Voz contemporánea",
    years: "",
    location: "Hialeah / Cuba",
    portrait: "/poets/juan-antonio-diaz.jpg",
    dek: "Guajiro de Hialeah: décima, memoria, familia y presencia viva.",
    story:
      "Juan Antonio Díaz está en el centro de esta experiencia because su canturía no se presenta como pieza antigua, sino como memoria familiar todavía encendida. Su voz sostiene el puente entre Cuba, Hialeah y los que escuchan para no olvidar.",
    legacy: [
      "Figura viva de la canturía familiar.",
      "Conecta décima, exilio y memoria personal.",
      "Su archivo merece conservarse con belleza y respeto.",
    ],
  },
  {
    slug: "quintana",
    name: "Quintana",
    era: "Voz contemporánea",
    years: "",
    location: "Cuba / Exilio",
    portrait: "/poets/quintana.jpg",
    dek: "Poeta de controversia, respuesta y escena compartida.",
    story:
      "Quintana aparece dentro de la tradición como contraparte viva: el poeta que ayuda a que la décima respire en duelo, réplica y conversación.",
    legacy: [
      "Presente en encuentros de controversia.",
      "Figura del archivo contemporáneo de Canturía.",
      "Sostiene la práctica oral de la décima.",
    ],
  },
  {
    slug: "yoslay",
    name: "Yoslay",
    era: "Voz contemporánea",
    years: "",
    location: "Cuba / Exilio",
    portrait: "/poets/yoslay.jpg",
    dek: "Voz joven o contemporánea dentro del círculo vivo de la improvisación.",
    story:
      "Yoslay representa que la décima no termina en los maestros históricos. Sigue pasando de voz en voz, adaptándose sin perder su raíz.",
    legacy: [
      "Parte de la continuidad contemporánea.",
      "Nombre incluido en el archivo vivo de canturías.",
      "Representante transmisión generacional.",
    ],
  },
  {
    slug: "camargo",
    name: "Camargo",
    era: "Voz contemporánea",
    years: "",
    location: "Cuba / Exilio",
    portrait: "/poets/camargo.jpg",
    dek: "Poeta dentro del ambiente vivo de controversia y memoria.",
    story:
      "Camargo pertenece al tejido de voces que hacen que la canturía sea encuentro, no simple grabación: una presencia que responde, acompaña y sostiene.",
    legacy: [
      "Figura del archivo contemporáneo.",
      "Presente en la memoria oral de la canturía.",
      "Parte de la red viva de poetas populares.",
    ],
  },
  {
    slug: "oniesis",
    name: "Oniesis",
    era: "Voz contemporánea",
    years: "",
    location: "Cuba / Exilio",
    portrait: "/poets/oniesis.jpg",
    dek: "Voz de continuidad en la tradición improvisada.",
    story:
      "Oniesis forma parte de la generación que mantiene el reto de improvisar con respeto a la forma y con oído para el público.",
    legacy: [
      "Parte de la práctica contemporánea.",
      "Nombre incluido en el archivo de Canturía.",
      "Representa permanencia de la décima viva.",
    ],
  },
  {
    slug: "julio-pablo",
    name: "Julio Pablo",
    era: "Voz contemporánea",
    years: "",
    location: "Cuba / Exilio",
    portrait: "/poets/julio-pablo.jpg",
    dek: "Poeta de la escena viva, asociado al presente de la controversia.",
    story:
      "Julio Pablo pertenece al presente de la décima: donde cada encuentro puede convertirse en archivo si se conserva con belleza, contexto y respeto.",
    legacy: [
      "Figura contemporánea de la canturía.",
      "Parte de los encuentros conservados por el proyecto.",
      "Nombre a preservar dentro del compendio visual.",
    ],
  },
]

function groupByEra(poets: Poet[]) {
  return poets.reduce<Record<string, Poet[]>>((acc, poet) => {
    acc[poet.era] ||= []
    acc[poet.era].push(poet)
    return acc
  }, {})
}

function Portrait({ poet }: { poet: Poet }) {
  const src = poet.portrait

  if (!src) {
    return <PoetPlaceholder name={poet.name} />
  }

  return (
    <div className="poet-portrait-shell">
      <Image
        src={src}
        alt={`Retrato de ${poet.name}`}
        width={180}
        height={180}
        className="poet-portrait"
        onError={(event) => {
          const target = event.currentTarget as HTMLImageElement
          target.style.display = "none"
          const parent = target.closest(".poet-portrait-shell")
          parent?.classList.add("poet-portrait-shell--fallback")
        }}
      />
      <div className="poet-portrait-fallback">
        <PoetPlaceholder name={poet.name} />
      </div>
    </div>
  )
}

export function PoetsCompendium() {
  const grouped = useMemo(() => groupByEra(POETS), [])
  const [openSlug, setOpenSlug] = useState<string>(POETS[0]?.slug || "")

  return (
    <section className="poets-premium-section" id="poetas">
      <div className="poets-premium-header">
        <p className="eyebrow">Archivo vivo de la décima</p>
        <h2>Los maestros de la canturía</h2>
        <p>
          Una galería para entrar por el rostro y abrir la historia: poetas,
          improvisadores y voces que sostienen la memoria de la décima.
        </p>
      </div>

      <div className="poets-era-stack">
        {Object.entries(grouped).map(([era, poets]) => (
          <div className="poets-era" key={era}>
            <div className="poets-era-title">
              <span />
              <h3>{era}</h3>
              <span />
            </div>

            <div className="poets-grid">
              {poets.map((poet) => {
                const isOpen = openSlug === poet.slug

                return (
                  <article
                    className={`poet-card ${isOpen ? "poet-card--open" : ""}`}
                    key={poet.slug}
                  >
                    <button
                      type="button"
                      className="poet-card-button"
                      aria-expanded={isOpen}
                      aria-controls={`poet-panel-${poet.slug}`}
                      onClick={() => setOpenSlug(isOpen ? "" : poet.slug)}
                    >
                      <Portrait poet={poet} />

                      <span className="poet-card-heading">
                        <span className="poet-card-name">{poet.name}</span>
                        <span className="poet-card-meta">
                          {[poet.years, poet.location].filter(Boolean).join(" · ")}
                        </span>
                        <span className="poet-card-dek">{poet.dek}</span>
                      </span>

                      <span className="poet-card-mark" aria-hidden="true">
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>

                    <div
                      id={`poet-panel-${poet.slug}`}
                      className="poet-body-wrapper"
                    >
                      <div className="poet-body-inner">
                        <div className="poet-body">
                          <p>{poet.story}</p>

                          <div className="poet-legacy">
                            <p>Legado</p>
                            <ul>
                              {poet.legacy.map((item) => (
                                <li key={item}>{item}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default PoetsCompendium

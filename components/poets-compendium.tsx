"use client"

import { useState } from "react"

interface Poet {
  slug: string
  name: string
  subtitle: string
  era: string
  birth: string
  death?: string
  location?: string
  biography: string[]
  initials: string
}

const poets: Poet[] = [
  {
    slug: "espinel",
    name: "Vicente Espinel",
    subtitle: "El Arquitecto Original",
    era: "Siglo XVI · Andalucía",
    birth: "28 de diciembre de 1550, Ronda, Málaga",
    death: "4 de febrero de 1624, Madrid",
    initials: "VE",
    biography: [
      "Vicente Gómez Martínez Espinel transformó definitivamente la poesía española cuando en 1591 publicó Diversas Rimas, obra que recorrió casi toda la métrica de entonces.",
      "Su legado perdurable cristalizó en la décima: diez versos octosílabos con arquitectura de rima abbaaccddc, agrupación de dos quintillas que los gigantes españoles adoptaron inmediatamente. Lope de Vega, Calderón de la Barca, Cervantes, Quevedo y Góngora la incorporaron a sus obras durante el Siglo de Oro.",
      "Espinel poseía vastísima cultura. Tradujo el Arte poética de Horacio y fue centro de la vida poética de su época. Su genio no se limitó a la literatura: añadió la quinta cuerda a la guitarra española, transformando también el panorama musical.",
      "Su obra cumbre en prosa fue la novela picaresca Relaciones de la vida del escudero Marcos de Obregón (1618). La forma que Espinel inventó cruzó el Atlántico transformándose: lo que España concibió como continente estético, Cuba llenó de contenido identitario."
    ]
  },
  {
    slug: "placido",
    name: "Plácido",
    subtitle: "Transparencia Trágica",
    era: "Siglo XIX · Cuba colonial",
    birth: "1809, La Habana",
    death: "28 de junio de 1844, Matanzas",
    initials: "P",
    biography: [
      "Gabriel de la Concepción Valdés nació en La Habana, hijo de un peluquero mulato y una bailarina española. Huérfano y artesano, trabajó en múltiples oficios: carpintería, tipografía y platería.",
      "Su poesía, caracterizada por la ingenuidad, simpatía y transparencia natural, elevó la décima a alturas líricas extraordinarias en el siglo XIX, convirtiéndose en uno de los representantes más importantes del Romanticismo cubano.",
      "Fue fusilado en 1844, acusado de ser jefe de la Conspiración de La Escalera. Se dirigió al suplicio declamando su 'Plegaria a Dios', poema compuesto la víspera de su muerte.",
      "Su cubanía residía en esa transparencia natural de su voz que al final trágico de su vida cobró acentos desgarradores de sencilla grandeza."
    ]
  },
  {
    slug: "cucalambe",
    name: "El Cucalambé",
    subtitle: "Arquitecto de la Cubanización",
    era: "Siglo XIX · Cuba colonial",
    birth: "1829, Victoria de Las Tunas",
    death: "1861 (desaparecido)",
    initials: "C",
    biography: [
      "Juan Cristóbal Nápoles Fajardo representa la definitiva cubanización de la décima espinela, adaptándola como continente estético al contenido identitario de la isla.",
      "Su obra cumbre, Rumores del Hórmigo (1856), capta la naturaleza criolla con lujo visual y auditivo desde un punto de vista esencialmente campesino.",
      "Durante las guerras de Independencia, sus versos eran compañía casi inconsciente del mambí. Fue el único poeta que logró ser aceptado plenamente por el pueblo, entrando totalmente en su vida.",
      "Esta primera arquitectura verdaderamente cubana de la décima constituye la savia viva que todavía fecunda la poesía popular cubana."
    ]
  },
  {
    slug: "chanito",
    name: "Chanito Isidrón",
    subtitle: "Fundador de la Novela en Décimas",
    era: "Edad de Oro · 1940-50",
    birth: "1903, Calabazar de Sagua",
    death: "1987, La Habana",
    initials: "CI",
    biography: [
      "Cipriano Isidrón Torres, el 'elegante poeta de Las Villas', comenzó a improvisar a los ocho años. En 1938, con Amores Montaraces, se convirtió en fundador de la novela en décimas para ser cantada.",
      "Su sensibilidad para captar el relato en décimas lo condujo a escribir obras tremendamente populares en Cuba y en Canarias. Fue protagonista en programas estelares de la radio cubana como 'Buscando el Príncipe de Punto Cubano'.",
      "Su humor agresivo era una explosión de rebeldía y protesta. No solo fue una voz mayor del humorismo criollo, sino que en las letras cubanas tiene un lugar de fundador.",
      "Considerado el rey del punto cubano, fue uno de los mejores repentistas que ha tenido Cuba, uniendo lo popular con una estructura narrativa ambiciosa."
    ]
  },
  {
    slug: "justo-vega",
    name: "Justo Vega",
    subtitle: "El Caballero de la Décima",
    era: "Edad de Oro · 1940-50",
    birth: "9 de agosto de 1909, Matanzas",
    death: "13 de enero de 1993, La Habana",
    initials: "JV",
    biography: [
      "Justo Vega, maestro de la improvisación tradicional, fue reconocido como 'El Caballero de la Décima Improvisada'. Fue uno de los repentistas estelares del pie forzado y el punto cubano.",
      "Su fama creció especialmente en el programa televisivo 'Palmas y Cañas', donde formó un dúo legendario con Adolfo Alfonso durante veinticinco años.",
      "Más que un gran intérprete, se convirtió en artífice de fabulosas controversias, evocadas por varias generaciones de cubanos que disfrutaron sus presentaciones en radio y televisión.",
      "Su elegancia en el trato y su precisión en el verso definieron un estándar de caballerosidad en el escenario que le valió su apodo eterno."
    ]
  },
  {
    slug: "adolfo-alfonso",
    name: "Adolfo Alfonso",
    subtitle: "Compenetración sin Réplica",
    era: "Edad de Oro · 1940-50",
    birth: "1924, Melena del Sur",
    death: "23 de enero de 2012, La Habana",
    initials: "AA",
    biography: [
      "Adolfo Alfonso decidió dedicar su vida a la décima tras admirar una controversia entre Angelito Valiente y el Indio Naborí. Fue parte de lo más valioso de la música campesina cubana.",
      "Durante veinticinco años, formó pareja inseparable con Justo Vega en 'Palmas y Cañas'. Tan fuerte era su compenetración que, tras la muerte de Justo, Adolfo decidió no buscar otra pareja estable.",
      "Su talento poético, su modo inconfundible de entonar y su acento jocoso, cercano al choteo cubano, le permitieron romper la barrera rural y llegar a un público masivo.",
      "Recibió el Premio Nacional de Música en 2004. Su legado es el de un poeta que supo unir la profundidad del verso con la alegría contagiosa de lo criollo."
    ]
  },
  {
    slug: "sosa-curbelo",
    name: "Guillermo Sosa Curbelo",
    subtitle: "El Poeta de las Multitudes",
    era: "Edad de Oro · 1940-50",
    birth: "1915, Sagua la Grande",
    death: "2001, Miami",
    initials: "GS",
    biography: [
      "Guillermo Sosa Curbelo fue uno de los repentistas más ágiles y talentosos de su época. Desde muy joven se destacó en programas radiales como 'Rumores del Undoso'.",
      "Fue famoso por escenificar controversias épicas con figuras como Ángel Valiente y el Indio Naborí, demostrando una rapidez mental que le valió el respeto de sus colegas.",
      "Tras emigrar a Miami, se integró activamente a la comunidad de decimistas en el exilio, manteniendo viva la tradición de la décima en programas de radio locales.",
      "Su destreza técnica en la improvisación y su capacidad para conectar con el público lo sitúan como una figura de relevancia en la historia de la décima cubana."
    ]
  },
  {
    slug: "angel-valiente",
    name: "Ángel Valiente 'Angelito'",
    subtitle: "Teatro en Movimiento",
    era: "Edad de Oro · 1940-50",
    birth: "1916, San Antonio de los Baños",
    death: "21 de enero de 1987",
    initials: "AV",
    biography: [
      "Ángel Valiente fue un lector incansable y cultura autodidacta que desde los ocho años improvisaba décimas. Su estilo era muy teatral, accionando mucho con las manos y dramatizando sus versos.",
      "Protagonizó junto al Indio Naborí la famosa 'Controversia del Siglo' en 1955, reuniendo a más de diez mil personas en un acontecimiento sin precedentes.",
      "Su caballerosidad quedó inmortalizada cuando, tras el triunfo de Naborí, se unió al jurado para votar espontáneamente por su contrincante.",
      "Fue un poeta épico-dramático que llenó el panorama repentístico de energía y pasión, convirtiendo cada canturía en una función teatral inolvidable."
    ]
  },
  {
    slug: "riveron-hernandez",
    name: "Francisco Riverón Hernández",
    subtitle: "Poeta Pictórico",
    era: "Edad de Oro · 1940-50",
    birth: "1917, Güines",
    death: "13 de enero de 1975",
    initials: "FR",
    biography: [
      "Francisco Riverón es considerado 'el precursor de la décima moderna en Cuba'. Aunque abandonó la escuela temprano, aprendió la técnica del verso en su línea más culta de forma autodidacta.",
      "Sus temas recurrentes fueron la naturaleza de la Patria y las tradiciones campesinas. Se le define como el 'poeta pictórico' por la plasticidad y colorido de sus imágenes.",
      "Fundó y dirigió el programa radial Renacer Cubano. Sus poemas, como 'Epístola a José Martí', tuvieron un gran impacto social en su época.",
      "Por la elevación y finura de sus décimas, Riverón Hernández logró unir la tradición popular con una estética literaria de gran sofisticación."
    ]
  },
  {
    slug: "efrain-riveron",
    name: "Efraín Riverón Argüelles",
    subtitle: "Lírica de la Memoria",
    era: "Generación Naborí",
    birth: "1942, Güines",
    initials: "ER",
    biography: [
      "Hijo del emblemático Francisco Riverón Hernández, Efraín heredó el estilo lírico y la pasión por la poesía de su padre, destacando en programas como 'Palmas y Cañas'.",
      "Es considerado uno de los poetes repentistas más literarios de su generación. Su obra escrita se caracteriza por un lenguaje rico en alegorías y metáforas costumbristas.",
      "Ha obtenido numerosos galardones, incluyendo el Premio Iberoamericano Cucalambé en dos ocasiones y el Premio Samuel Feijóo por la obra de la vida.",
      "Desde 1992 reside en Miami, donde continúa publicando libros y manteniendo un vínculo constante con la difusión de la décima cubana."
    ]
  },
  {
    slug: "soriano",
    name: "Manuel Soriano",
    subtitle: "Cronista del Exilio",
    era: "Maestros del exilio",
    birth: "1947, Bejucal",
    initials: "MS",
    biography: [
      "Manuel Soriano reside en Miami desde 1986, donde se ha consolidado como una de las figuras más activas del repentismo en el exilio, con una voz timbrada y estilo agresivo.",
      "Escribe diariamente décimas para programas de televisión local, estableciendo una práctica única de crónica poética cotidiana sobre eventos mundiales.",
      "Fue encarcelado como preso político en Cuba por una décima dedicada a la libertad. Su obra constituye una crónica viviente de la experiencia del exilio cubano.",
      "Ha publicado múltiples volúmenes de poesía y redondillas filosóficas, demostrando que la décima puede ser tanto testimonio político como arte de alta factura."
    ]
  },
  {
    slug: "candelita",
    name: "Asael Díaz 'Candelita'",
    subtitle: "Rapidez y Tradición",
    era: "Maestros del exilio",
    birth: "1944, Potrerillo",
    initials: "AD",
    biography: [
      "Asael Díaz inició su carrera profesional a los 11 años tras ganar un concurso de décima campesina. En 1966 debutó en 'Palmas y Cañas' junto a los grandes maestros.",
      "Se destacó por su rapidez enunciadora y un estilo de canto vibrante. En 1992 se radicó en Miami, participando en programas como 'Clave Guajira'.",
      "Es reconocido como una figura importante de la primera promoción post-Naborí, manteniendo viva la tradición en escenarios internacionales.",
      "Además de su labor como repentista, ha incursionado en la décima escrita, publicando obras que recogen su trayectoria de décadas."
    ]
  },
  {
    slug: "pablo-leon",
    name: "Pablo León Alonso",
    subtitle: "Arquitecto de Paradojas",
    era: "Maestros del exilio",
    birth: "1927, Consolación del Sur",
    initials: "PL",
    biography: [
      "Pablo León fue una de las figuras más influyentes del repentismo cubano, distinguido por su precisión métrica y una serenidad que le otorgó un sello único.",
      "Residió en Miami, donde continuó cultivando la décima y participando en encuentros culturales que mantenían viva la tradición para la comunidad en el exilio.",
      "Su legado incluye décimas memorables de gran profundidad filosófica, como su famosa meditación sobre la muerte de Martí.",
      "Su capacidad para construir versos espontáneos con una estructura impecable lo convirtió en un referente ineludible de la tradición oral cubana."
    ]
  },
  {
    slug: "indio-nabori",
    name: "El Indio Naborí",
    subtitle: "Voz Lírica del Siglo XX",
    era: "Generación Naborí",
    birth: "1922, San Miguel del Padrón",
    death: "2005, La Habana",
    initials: "IN",
    biography: [
      "Jesús Orta Ruiz es la figura más representativa de la décima en Cuba del siglo XX. Sus décimas improvisadas combinaron recursos literarios sofisticados con rapidez de pensamiento.",
      "Recibió el Premio Nacional de Literatura en 1995. Su controversia épica con Ángel Valiente en 1955 marcó un hito nunca superado en la historia cultural cubana.",
      "Tenía una voz dulce y melodiosa. Su obra estableció un nivel de altura literaria sin precedentes para la décima oral, fusionando lo popular con lo culto de forma invisible.",
      "Naborí no solo fue un gran poeta, sino un mentor para generaciones de repentistas que vieron en su estilo el patrón ideal de la décima cubana."
    ]
  },
  {
    slug: "mirabal",
    name: "Omar Mirabal Navarro",
    subtitle: "El Cantor del Mayabeque",
    era: "Voz contemporánea",
    birth: "14 de noviembre de 1955, Güines",
    initials: "OM",
    biography: [
      "Conocido como 'El Cantor del Mayabeque', Omar Mirabal es considerado uno de los más extraordinarios improvisadores que hay en Cuba actualmente.",
      "Su estilo tiene ascendencia naboriana, destacando por el uso del símil, las imágenes visuales y un dominio técnico absoluto de la décima.",
      "Es dueño de un canto pausado y de una limpieza enunciativa que lo distingue. Ha conformado parejas legendarias en controversias mediáticas de gran impacto.",
      "Para muchos amantes del género, Omar es el 'poeta patrón' actual, un eje estético de obligada referencia para las nuevas promociones de repentistas."
    ]
  },
  {
    slug: "tomasita-quiala",
    name: "Tomasita Quiala",
    subtitle: "La Reina del Repentismo",
    era: "Voz contemporánea",
    birth: "1960, Banes",
    death: "11 de junio de 2025",
    initials: "TQ",
    biography: [
      "Tomasita Quiala, invidente desde su nacimiento, fue una de las más notables exponentes de la décima en el mundo. Conocida como 'La Ciega Maravillosa', conquistó escenarios internacionales.",
      "Destacó por su rapidez mental y su capacidad para la controversia, rompiendo barreras en un mundo tradicionalmente masculino.",
      "Recibió numerosos galardones, incluyendo el Premio Nacional de Cultura Comunitaria. Su primer libro de décimas fue incluso transcrito al braille.",
      "Su legado permanece como símbolo de talento, autenticidad y superación, inspirando a generaciones de repentistas en Cuba y el mundo."
    ]
  },
  {
    slug: "chanchito",
    name: "Francisco Pereira 'Chanchito'",
    subtitle: "Orfebrería Lingüística",
    era: "Voz contemporánea",
    birth: "1947, Nueva Paz",
    death: "14 de enero de 1999",
    initials: "FP",
    biography: [
      "Francisco Pereira es recordado por su capacidad para elevar el repentismo a una forma de alta literatura, siendo llamado 'el más naboriano de los post-naborianos'.",
      "Su entierro fue un evento histórico donde sus compañeros lo despidieron improvisando décimas, testimonio del inmenso cariño que le profesaba el pueblo.",
      "Fue un improvisador de recia personalidad en el escenario, respetado por su sencillez y su dominio magistral de los recursos literarios.",
      "Su obra es un referente fundamental de la orfebrería lingüística dentro de la improvisación, capturando el alma de la nación en diez versos perfectos."
    ]
  },
  {
    slug: "juan-antonio-diaz",
    name: "Juan Antonio Díaz",
    subtitle: "Planos que Sorprenden",
    era: "Voz contemporánea",
    birth: "26 de mayo de 1970, Pinar del Río",
    initials: "JA",
    biography: [
      "Juan Antonio Díaz es uno de los decimistas improvisadores más influyentes de su generación. El Indio Naborí destacó su capacidad de crear planos imaginativos sorprendentes.",
      "Su estilo combina la herencia campesina pinareña con una técnica depurada. Ha compartido escenario con los más grandes maestros contemporáneos.",
      "Ha publicado obras como 'Mi dolor tuyo', donde sus décimas recogen el sentimiento y la esperanza del pueblo cubano.",
      "Desde su finca natal hasta los escenarios internacionales, Juan Antonio ha llevado la décima a un nivel de sofisticación poética que conecta lo rural con lo universal."
    ]
  },
  {
    slug: "quintana",
    name: "Luis Quintana",
    subtitle: "Viajero del Barroco",
    era: "Voz contemporánea",
    birth: "1971",
    initials: "LQ",
    biography: [
      "Luis Quintana representa la integración de temas contemporáneos con métrica clásica, enriquecida por su experiencia radicado en España.",
      "Considerado uno de los más grandes de todos los tiempos, su décima posee lírica, idea y una excelencia en la metáfora sin fisuras.",
      "Destaca por su histrionismo y su capacidad gladiatoria en la controversia, haciendo uso de diferentes tonadas para dar fuerza o ternura a su mensaje.",
      "Su estilo 'mulato viajero' ha regresado a Cuba con una riqueza expresiva única, consolidándolo como un maestro indiscutible del repentismo actual."
    ]
  },
  {
    slug: "yoslay",
    name: "Yoslay García Lanzarique",
    subtitle: "Solidez Matancera",
    era: "Voz contemporánea",
    birth: "1978, Matanzas",
    initials: "YG",
    biography: [
      "Yoslay García representa la solidez y continuidad del arte en las nuevas generaciones. Se distingue por su marcado respeto a los contrincantes en el contrapunteo.",
      "No utiliza un lenguaje sencillo; se arma de recursos literarios para resolver el pie forzado, revelándose como un escritor artero en el escenario.",
      "Posee el don de decir mucho con poco, sorprendiendo al público con la profundidad de sus temas y su pericia técnica.",
      "Su estilo matancero—sólido, meditado, profundo—ofrece una alternativa de contemplación poética dentro del dinamismo del repentismo contemporáneo."
    ]
  },
  {
    slug: "camargo",
    name: "Leandro Camargo",
    subtitle: "Defensor de Símbolos",
    era: "Voz contemporánea",
    birth: "1987, Los Palacios",
    initials: "LC",
    biography: [
      "Leandro Camargo es un talentoso poeta relevante tanto en la improvisación como en la investigación, docencia y escritura de la décima.",
      "A los 20 años ganó el prestigioso Concurso Nacional Justo Vega. Es frecuente su participación en proyectos comunitarios de referencia en Pinar del Río.",
      "Ha regalado a la décima la merced de la improvisación sobre temas históricos y patrióticos, defendiendo los símbolos nacionales con profundo respeto.",
      "Domina variantes difíciles como la seguidilla al revés, combinando el amor a la patria con una técnica impecable y gran profundidad emocional."
    ]
  },
  {
    slug: "oniesis",
    name: "Oniesis Gil",
    subtitle: "Elevación de la Improvisación",
    era: "Voz contemporánea",
    birth: "Matanzas",
    initials: "OG",
    biography: [
      "Oniesis Gil forma parte de la vanguardia del repentismo cubano del siglo XXI. Su estilo se caracteriza por una profunda conexión con la cultura popular.",
      "Ha protagonizado controversias encendidas en homenaje a figuras como Tomasita Quiala, evidenciando su compromiso con la tradición.",
      "Se distingue por su capacidad de crear momentos memorables del repentismo contemporáneo junto a las principales figuras del género.",
      "Su arte se desarrolla dentro de la tradición de la décima campesina, elevando la improvisación a niveles de excelencia técnica y originalidad poética."
    ]
  },
  {
    slug: "julio-pablo",
    name: "Julio Pablo 'Príncipe Pinareño'",
    subtitle: "Arquitecto de Versos",
    era: "Voz contemporánea",
    birth: "1996, Pinar del Río",
    initials: "JP",
    biography: [
      "Julio Pablo representa la generación más joven de maestros, transformando el silencio en arquitectura sonora con décimas que unen siglos.",
      "Conocido como el 'Mago del Momento', destaca por su presencia total en la controversia y su capacidad para transformar el pensamiento vivo en estrofas memorables.",
      "Usa formas centenarias para expresar ansiedades contemporáneas, proyectando la riqueza del punto guajiro hacia el futuro a través de plataformas digitales.",
      "Cada estrofa que improvisa lleva la marca identitaria de su tierra natal, elevando lo específicamente cubano a una relevancia humana y universal."
    ]
  }
]

export function PoetsCompendium() {
  const [openSlug, setOpenSlug] = useState<string>("")

  return (
    <section className="poets-section">
      <span className="poets-section-eyebrow">Los maestros</span>
      <h2 className="poets-section-title">Poetas de la canturía</h2>
      <p className="poets-section-dek">Una galería viva de las voces que sostienen la décima cubana.</p>

      {poets.map((poet) => {
        const initials = poet.initials
          ?? poet.name.split(" ").map(p => p[0]).filter(Boolean).slice(0, 2).join("");
        const isOpen = openSlug === poet.slug;

        return (
          <article key={poet.slug} className="poet-row" data-open={isOpen ? "true" : "false"}>
            <button
              type="button"
              className="poet-row-button"
              onClick={() => setOpenSlug(isOpen ? "" : poet.slug)}
              aria-expanded={isOpen}
            >
              <span className="poet-medallion" aria-hidden="true">{initials}</span>
              <span className="poet-row-meta">
                <span className="poet-row-name">{poet.name}</span>
                <span className="poet-row-era">{poet.era}</span>
                <span className="poet-row-dek">{poet.subtitle}</span>
              </span>
              <span className="poet-row-toggle" aria-hidden="true">{isOpen ? "−" : "+"}</span>
            </button>
            <div className="poet-row-body">
              <div className="poet-row-body-inner">
                <div className="poet-row-body-content">
                  {poet.biography.map((p, i) => (
                    <p key={i} style={{ marginBottom: "0.85rem" }}>{p}</p>
                  ))}
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </section>
  )
}

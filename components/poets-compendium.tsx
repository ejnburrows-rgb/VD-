"use client";

import { useState } from "react";

interface Poet {
  name: string;
  subtitle: string;
  birth: string;
  death?: string;
  location?: string;
  biography: string[];
}

const poets: Poet[] = [
  {
    name: "Adolfo Alfonso",
    subtitle: "Compenetración sin Réplica",
    birth: "8 de julio de 1924 en Melena del Sur, Cuba",
    death: "23 de enero de 2012, a los 87 años",
    biography: [
      "Decimista nato considerado uno de los mejores que ha tenido Cuba. A los catorce años ya interpretaba tangos. Sin embargo, después de admirar una controversia entre Angelito Valiente y el Indio Naborí, decidió dedicar su vida a cultivar la décima y el son montuno.",
      "El azar lo llevó a encontrarse con Justo Vega en el programa radiofónico Las Mil Diez, encuentro que cambió el rumbo de su vida artística y la historia del repentismo cubano. Consideraba a Justo Vega su maestro tanto como poeta como conocedor de la vida. Durante veinticinco años, ambos fueron parte de lo más valioso de la música campesina cubana en el programa televisivo \"Palmas y Cañas\".",
      "Tan fuerte era la compenetración entre ambos trovadores que, después de muerto Justo Vega en 1993, Alfonso decidió no buscar otra pareja. A pesar de su trabajo con repentistas de gran talento como Emiliano Sardiñas, nunca volvió a experimentar la compenetración y empatía que sintiera con su compañero de varias décadas.",
      "El inigualable talento poético, el modo inconfundible de entonar e interpretar la más auténtica música de nuestros campos y el acento jocoso, cercano al choteo cubano, les valió la posibilidad de romper con la barrera rural que encasillaba al repentismo y llevar su música a un público más amplio. Alfonso recibió el Premio Nacional de Música en 2004."
    ]
  },
  {
    name: "Asael Díaz \"Candelita\"",
    subtitle: "Rapidez Enunciadora Legendaria",
    birth: "1944 en Potrerillo, región central de Cuba",
    biography: [
      "Inició su carrera en la tonada campesina a la edad de 11 años en el poblado de Cruces, creciendo en una familia donde todos cantaban: su padre, tíos y tías. Célebre por su canto y su rapidez enunciadora, característica que le valió el sobrenombre de \"Candelita\".",
      "En 1955, con solo 11 años, participó en el programa \"Buscando el príncipe de la décima campesina\" en la emisora CMHK de Cruces y ganó el premio: cinco pesos y una botella de ron Tres Toneles.",
      "En 1964 se radicó en La Habana, presentándose en programas radiales campesinos de Radio Rebelde y Radio Progreso. En 1966 debutó en el legendario programa Palmas y Cañas junto a Ramón Veloz y Coralia Fernández, cantando con los maestros Justo Vega y Adolfo Alfonso.",
      "Compartió escenarios con Francisco Pereira \"Chanchito\", Inocente Iznaga \"El Jilguero de Cienfuegos\", Raúl Rondón \"El Bardo Camagüeyano\", Martín Rodríguez y Minerva (padres de Albita Rodríguez). En 1992 llegó a Miami después de haber cumplido condena en Cuba por razones políticas.",
      "Sus décimas reflejan medio siglo dedicado al verso y la tonada: \"Medio siglo de carrera / de improvisador cubano / con la décima en la mano / y el mundo en la cabeza / De sombrero y guayabera / mi décima la he vestido / y lo que de ella he tenido / ha sido una vida dada / al verso y a la tonada\"."
    ]
  },
  {
    name: "Chanito Isidrón",
    subtitle: "Rey del Punto Cubano",
    birth: "1903 en Calabazar de Sagua, Las Villas",
    death: "22 de julio de 1987",
    biography: [
      "Cipriano Isidrón Torres, hijo de padres canarios, comenzó a improvisar desde los ocho años, siendo figura imprescindible en todas las fiestas a las que concurrían cantadores de fama. En 1931 abandonó las faenas agrícolas y se lanzó con su guitarra a recorrer los pueblos villaclareños, donde empezó a llamársele \"el elegante poeta de Las Villas\".",
      "En 1936 comenzó en la radio de Santa Clara, trabajando en numerosos programas musicales que tenían como público básico a la población campesina. En 1938, con su obra \"Amores Montaraces\", se convirtió en fundador de la novela en décimas para ser cantada, escribiendo 123 décimas que totalizaban 1,230 versos. Nadie había escrito una novela en décimas hasta Chanito Isidrón.",
      "La novela cuenta la historia de Camilo y Estrella: \"Camilo, galán guajiro / que de amor canta con brío / sus décimas a una esquina / lanza con voz cristalina / y alma puesta en el gentío\".",
      "La Cadena Azul, que llegó a convertirse en la cadena radial más escuchada de Cuba, lo contrató para escribir novelas guajiras hechas en décimas y cantadas. La época de oro de la radiodifusión cubana—años 40 y 50—lo tuvo como principal protagonista en programas estelares como \"Buscando el Príncipe de Punto Cubano\" (cuyo trono ocupó) y \"Dímelo cantando\".",
      "Su humor agresivo era como una explosión de rebeldía, de protesta, de anuncio de futuro. Considerado como el rey del punto cubano, fue uno de los mejores repentistas que ha tenido Cuba. La última proeza de Chanito Isidrón fue escribir la saga del héroe legendario Manuel García, Rey de los Campos de Cuba (1985)."
    ]
  },
  {
    name: "El Cucalambé",
    subtitle: "Primer Arquitecto de la Cubanización",
    birth: "1 de julio de 1829 en Victoria de Las Tunas",
    death: "Desapareció misteriosamente hacia 1861",
    biography: [
      "Juan Cristóbal Nápoles Fajardo fue educado por su abuelo materno José Rafael Fajardo García—hacendado, cura y conspirador anticolonial—y participó en la conspiración de Agüero en 1851.",
      "Publicó sus primeras décimas guajiras en 1845 en el periódico El Fanal de Puerto Príncipe. En 1856 publicó su poemario \"Rumores del Hórmigo\", considerado clásico de la lírica cubana. Esta obra representa la definitiva cubanización de la décima espinela, adaptándola como continente estético al contenido identitario de la isla.",
      "Su poesía espontánea y fluida capta la naturaleza criolla con lujo visual y auditivo desde un punto de vista esencialmente campesino. La obra cucalambeana está signada por un trabajo estilístico aclimatado a la sencillez del verso, donde confluyen varias dualidades: la efectiva simbiosis de lo popular y lo culto en una expresión depurada pero no artificiosa.",
      "Fue el único poeta que logró ser aceptado plenamente por el pueblo, entrando totalmente en su vida. Durante las guerras de Independencia, sus versos eran compañía casi inconsciente del mambí. Roberto Manzano afirma sobre él: \"Poeta de Tierra Adentro, Juan Cristóbal Nápoles Fajardo es la voz del campesino que nos constituyó medularmente como pueblo y la del espíritu crítico del ciudadano que anhela mejor vida\"."
    ]
  },
  {
    name: "Efraín Riverón Argüelles",
    subtitle: "Continuidad del Legado Familiar",
    birth: "15 de diciembre de 1942 en Güines",
    location: "Miami desde 1992",
    biography: [
      "Hijo del maestro Francisco Riverón Hernández, continúa el legado familiar como destacado poeta repentista y escritor. Escribió y dirigió disímiles programas de música campesina en Radio Cadena Habana. Actuó como poeta en programas de Radio Rebelde, Radio Liberación, Radio Progreso, y en los programas de televisión Palmas y Cañas y Meridiano Campesino.",
      "Fue segundo premio en los Concursos Cucalambé de 1970 y 1972.",
      "Poemarios publicados: El rumbo de mi sangre (1979), La exacta memoria (1994), Nube y espuma (1999), Un punto en el tiempo (2002), Los ojos en la Isla (2006), De la Isla, la familia y otros recuerdos (2007), Los días de otro almanaque (2008), Después de la ceniza (2010), De la palabra y el espejo (2011), De la luz su fondo (2012).",
      "Vive en Miami desde 1992, manteniendo presencia activa en el repentismo del exilio."
    ]
  },
  {
    name: "Francisco Pereira \"Chanchito\"",
    subtitle: "Fidelidad Revolucionaria y Poesía",
    birth: "Cuba",
    biography: [
      "Considerado entre las figuras indiscutibles del repentismo. En 1998 se celebró una controversia histórica entre Francisco Pereira \"Chanchito\", desde Cuba, y Asael Díaz \"Candelita\" en Estados Unidos—dos viejos amigos y compañeros de generación separados por diferencias políticas pero unidos por la décima.",
      "Su fidelidad revolucionaria estuvo probada siempre. Pereira integró una delegación que viajó a Islas Canarias, donde un lugareño con marcada intención contrarrevolucionaria le puso un pie forzado para tratar de manchar la imagen del Comandante en Jefe; sin embargo con su inteligencia y lealtad, usó la espinela para resaltar las virtudes de Cuba y la posición del líder ante el yanqui prepotente.",
      "Ha realizado controversias memorables con Omar Mirabal, Juan Antonio Díaz y otros maestros del repentismo contemporáneo."
    ]
  },
  {
    name: "Francisco Riverón Hernández",
    subtitle: "El Poeta Pictórico",
    birth: "2 de abril de 1917 en Güines, La Habana",
    death: "13 de enero de 1975 en La Habana",
    biography: [
      "Tuvo que abandonar la escuela en octavo grado para ser aprendiz de zapatero y ayudar a la economía familiar. En su tiempo libre se dedicó a leer a los grandes maestros de la poesía y aprendió así la técnica del verso en su línea más culta. Definido como \"el más literato de su promoción y uno de los mejores repentistas de Cuba\".",
      "Riverón cultivó distintas formas del verso, pero en la décima logró sus mejores aciertos líricos. Sus temas más recurrentes fueron la belleza de la naturaleza de la Patria, las tradiciones del campesino cubano y los problemas sociales del pueblo, en especial el hombre del campo en la época prerrevolucionaria.",
      "Se ha dicho, con razón, que \"si Naborí es el poeta lírico por excelencia, Riverón Hernández es el poeta pictórico, y Valiente es el poeta épico-dramático\". Tres estilos que definieron formas de hacer y que llenaron el panorama repentístico de epígonos e imitadores.",
      "Por la elevación y finura de sus décimas, este decimista es considerado \"el precursor de la décima moderna en Cuba\".",
      "Obras destacadas: El sembrador guajiro (1951), José de los Cubanos (1953), Décimas de amor (1955), Retazos de Cuba (1964). Su famosa redondilla muestra su sensibilidad social: \"Anda por la calle un niño / huérfano hasta de la vida, / tiene la boca zurcida / por el hambre de un cariño\"."
    ]
  },
  {
    name: "Guillermo Sosa Curbelo",
    subtitle: "El Poeta de las Multitudes",
    birth: "3 de febrero de 1915 en Sagua la Grande",
    death: "9 de febrero de 2001 en Miami",
    biography: [
      "Conocido como \"El poeta de las multitudes\", desde su juventud se dedicó al arte de la improvisación, convirtiéndose en uno de los repentistas más ágiles que ha dado Cuba en todos los tiempos. Escenificó candentes controversias con los mejores decimistas del país.",
      "Su obra en el exilio continuó manteniendo viva la tradición de la décima cubana, consolidando su legado como maestro del repentismo de su generación."
    ]
  },
  {
    name: "El Indio Naborí",
    subtitle: "Voz Lírica del Siglo XX",
    birth: "30 de septiembre de 1922 en Los Zapotes, San Miguel del Padrón",
    death: "30 de diciembre de 2005",
    biography: [
      "Jesús Orta Ruiz representa la figura más representativa de la décima en Cuba del siglo XX. Nació en el seno de una familia campesina. Su vida estuvo marcada por la generosidad, sencillez y bondad, características atribuidas a sus humildes orígenes y a las múltiples ocupaciones que asumió desde joven para subsistir: pastor de ovejas, operario de zapatero y dependiente de comercio.",
      "Desde niño despertó admiración con sus improvisaciones. Se desempeñó como trovador y escritor radial en Radio Progreso, poniendo su arte al servicio de la organización de la Asociación Nacional Campesina en 1940. En 1946 comenzó su trabajo en el programa radial \"Dímelo cantando\", donde sus primeras obras humorísticas como \"Mi suegra Doña Glaudiosa\" y \"La vieja de Caimito\" alcanzaron gran popularidad.",
      "Publicaciones: Guardarraya Sonora (1946), Bandurria y Violín (1948), Estampas y Elegías (1955).",
      "En 1961, cuando se creó el semanario Palante, fue convocado para dirigir la página campesina \"Dímelo cantando\", consolidando una sección que se extendió a cientos de miles de lectores rurales en toda Cuba.",
      "Revitalizó la décima cubana con un aire de modernidad consecuencia del estudio profundo de la poesía española, especialmente de la vanguardia. Recibió el Premio Nacional de Literatura en 1995, el Premio de la Crítica Literaria en 1996 y la Distinción por la Cultura Nacional en 1981.",
      "Sus décimas improvisadas combinaron recursos literarios sofisticados con rapidez de pensamiento, estableciendo un nivel de altura literaria sin precedentes para la décima oral. Debido a su ceguera, asumió una nueva arquitectura para la creación de sus poemas, dirigiéndose a lograr un peso mayor en el pensamiento abstracto."
    ]
  },
  {
    name: "Juan Antonio Díaz",
    subtitle: "Planos Imaginativos que Sorprenden",
    birth: "26 de mayo de 1970 en la finca \"La Caoba\", San Diego de los Baños, Pinar del Río",
    biography: [
      "Poeta repentista cubano considerado en el mundo como uno de los decimistas improvisadores más influyentes de su generación. El Indio Naborí afirmó sobre él: \"En la vanguardia de nuestros repentistas actuales, constituido por unos treinta jóvenes, figura y se destaca el ágil improvisador Juan Antonio Díaz de cuyos planos reales de sus recuerdos agropecuarios salen no pocas veces planos imaginativos sorprendentes\".",
      "Ha compartido escenario con maestros como Pablo León, Omar Mirabal, Luis Quintana, Leandro Camargo y Yoslay García. Su obra incluye tributos a figuras históricas del repentismo cubano, manteniendo viva la memoria de los grandes maestros.",
      "Su estilo combina la herencia campesina pinareña con técnica depurada y capacidad de crear imágenes poéticas que conectan lo rural con lo universal. Ha publicado el libro \"Mi dolor tuyo\", donde sus décimas aupan todo el sufrimiento y la esperanza del cubano."
    ]
  },
  {
    name: "Justo Vega",
    subtitle: "El Caballero de la Décima Improvisada",
    birth: "9 de agosto de 1909 en Matanzas",
    death: "13 de enero de 1993",
    biography: [
      "Maestro de la improvisación tradicional, reconocido como \"El Caballero de la Décima Improvisada\", fue uno de los repentistas estelares del pie forzado y el punto cubano. En 1934 fundó y dirigió el cuarteto Trovadores Cubanos, integrado además por Pedro Guerra, Alejandro Aguilar y Bernardo Vega.",
      "Su fama creció por sus presentaciones en programas radiales como \"Patria Guajira\" y especialmente \"Palmas y Cañas\", donde formó un dúo legendario con Adolfo Alfonso durante veinticinco años. La fuerza de su poesía lo colocó entre los grandes de la décima, junto al Indio Naborí, Chanito Isidrón, Angelito Valiente y otros maestros.",
      "Más que un gran intérprete, se convirtió en artífice de fabulosas controversias, evocadas por varias generaciones de cubanos que disfrutaron sus presentaciones en radio, televisión y fiestas campesinas."
    ]
  },
  {
    name: "Leandro Camargo",
    subtitle: "Defensor Poético de Símbolos",
    birth: "1987 en Los Palacios, Pinar del Río",
    biography: [
      "Joven y talentoso poeta, más conocido por su amplia y deslumbrante ejecutoria como repentista en los escenarios de la décima oral improvisada. Es igualmente relevante en la investigación, la docencia y la escritura de la poesía en estrofas de diez versos.",
      "En 2007, con solo 20 años, alcanzó el Premio en la XL Jornada Cucalambeana en el emblemático Concurso Nacional de Improvisación Justo Vega, anualmente celebrada en Las Tunas. Su precocidad creativa se manifestó desde los 14 años, cuando en 2001 actuó en el encuentro titulado \"La canturía más larga\" en Güines.",
      "En 2010 ganó el concurso de repentismo Francisco Pereira, organizado por la Casa Naborí, de Limonar, Matanzas.",
      "Una nueva generación de poetas como él le ha obsequiado a la décima la merced de la improvisación sobre temas históricos y patrióticos. En 2019, en una seguidilla improvisada sobre la bandera cubana, expresó: \"Y no es que haya que adorarla / en sustitución de un dios, / es que hay que limpiar la voz / de sombras para nombrarla. / El que aprende a respetarla / sus orígenes no olvida, / y allí está, firme y erguida / donde el cubano la vea / para que Cuba no sea / traicionada ni ofendida\"."
    ]
  },
  {
    name: "Luis Quintana",
    subtitle: "Mulato Viajero del Barroco",
    birth: "25 de diciembre de 1971 en Matanzas",
    location: "Radicado en España",
    biography: [
      "Luis Alain Quintana Ruano es maestro de la décima urbana conocido por integrar temas contemporáneos con métrica clásica. Es considerado sin discusión uno de los más grandes poetas repentistas cubanos de todos los tiempos.",
      "Su estilo \"mulato viajero\" es conocedor de lo barroco y se ha impregnado de lo español, regresando a Cuba con una riqueza expresiva única. Hay grandeza en su décima improvisada, que posee la lírica y la idea, el saber del hombre, sus caídas y la excelencia en la metáfora.",
      "Ha protagonizado controversias legendarias junto a Alexis Díaz Pimienta y Juan Antonio Díaz, aclamadas por el público.",
      "Su capacidad de moverse entre registros—urbano y campesino, cubano y español, clásico y contemporáneo—lo distingue como uno de los improvisadores más respetados de la actualidad."
    ]
  },
  {
    name: "Manuel Soriano",
    subtitle: "Cronista Diario del Exilio",
    birth: "5 de mayo de 1947 en Bejucal, La Habana",
    location: "Miami desde 1986",
    biography: [
      "Su iniciación en la poesía comenzó a los siete años cuando recitó \"Los zapaticos de rosa\" de José Martí en su escuela el 28 de enero de 1954, en el 101 aniversario del nacimiento del Apóstol.",
      "Producciones discográficas: Cubanos en Canarias, Enlace con el recuerdo, Encuentro para la Historia.",
      "Obras literarias publicadas: Vivencias (1999), Magia del Juego de Damas (2001), Quinientos Setenta y Nueve (2003), Mis Guantanameras (2005) con 700 décimas sobre noticias diarias, Noticias Rimadas (2007) con 768 décimas narrando eventos cronológicos mundiales.",
      "Desde el otoño de 2003 escribe diariamente las décimas de las guantanameras para un popular programa de televisión local. Es muy activo en el programa Clave Guajira del canal 41 América TV en Miami. Su voz timbrada, gran velocidad y estilo agresivo lo han convertido en uno de los repentistas más respetados tanto en Cuba como en Estados Unidos.",
      "En 1982 fue encarcelado como preso político por una décima dedicada a los presos políticos cubanos: \"Cargan tras las rejas su condena / el afán de ser libres es la pena / de los presos políticos cubanos\"."
    ]
  },
  {
    name: "Omar Mirabal Navarro",
    subtitle: "El Cantor del Mayabeque",
    birth: "14 de noviembre de 1955 en Güines, Mayabeque",
    biography: [
      "Maestro de la vertiente oral improvisada de la décima (repentismo), es conocido como \"El Cantor del Mayabeque\". Considerado uno de los más extraordinarios decimistas y uno de los mejores poetas improvisadores que hay en Cuba actualmente.",
      "Para una buena parte de los amantes de la décima, Omar Mirabal es el mejor poeta de Cuba. Su estilo poético tiene evidente ascendencia naboriana, donde destacan el gusto por el símil y las imágenes visuales. Es reconocido por su dominio técnico de la décima, por el celo con que cuida su lenguaje y por la plasticidad de sus imágenes.",
      "Los recursos expresivos mirabalianos tienen sus raíces en la más profunda tradición del habla campesina, lo que ha hecho de su obra la de mayor impacto e influencia en los poetas de promociones posteriores. Es dueño de un canto pausado, de gran limpieza enunciativa y de un estilo poético de gran profundidad.",
      "La popularidad que Omar Mirabal llegó a alcanzar en los años 80, junto a la calidad de sus interpretaciones, lo convirtieron en un eje estético de obligada referencia para las nuevas generaciones. Nadie como Omar ha encarnado en una sola persona el espíritu de Jesús Orta Ruiz (El Indio Naborí) y Francisco Riverón Hernández.",
      "Conformó con Jesusito Rodríguez \"El As de la Metáfora\", la pareja de improvisadores más completa y mediática de los últimos tiempos. Ha realizado controversias memorables con Pablo León, Angelito Valiente, Tuto García, Francisco Pereira \"Chanchito\", Jesusito Rodríguez, Rafael García, Hirán Fundora, Luis Paz \"Papillo\", Roberto García y Juan Antonio Díaz."
    ]
  },
  {
    name: "Oniesis Gil",
    subtitle: "Elevación de la Improvisación",
    birth: "Cuba",
    biography: [
      "Poeta improvisador conocido por su estilo único y profunda conexión con la cultura popular. Destacado poeta improvisador (repentista) cubano que desarrolla su arte dentro de la tradición de la décima campesina y el repentismo. Forma parte de la nueva generación de poetas que han elevado la improvisación a niveles de excelencia.",
      "Junto a Yoslay García, constituyen no sólo la vanguardia del repentismo cubano de principio del siglo XXI, sino las voces más alzadas de la nueva generación. Ha compartido escenario con las principales figuras del repentismo cubano contemporáneo, incluyendo Juan Antonio Díaz, Luis Quintana y otros maestros.",
      "En una controversia memorable con Luis Quintana, Oniesis demostró su nivel extraordinario de improvisación. Ha protagonizado una encendida controversia en homenaje a la popular improvisadora cubana Tomasita Quiala.",
      "Su estilo se caracteriza por una profunda conexión con las raíces de la tradición oral cubana, combinada con innovación técnica y capacidad de sorprender al público con construcciones poéticas de gran originalidad."
    ]
  },
  {
    name: "Pablo León Alonso",
    subtitle: "Arquitecto de Paradojas Memorables",
    birth: "1 de septiembre de 1927 en Consolación del Sur, Pinar del Río",
    death: "31 de enero de 2012 en Miami, Estados Unidos (84 años)",
    biography: [
      "Fue una de las figuras más influyentes en la tradición del repentismo cubano. Su estilo se distinguió por la precisión métrica, la riqueza metafórica y una serenidad que le otorgó un sello único dentro del arte de la improvisación poética.",
      "Desde sus primeros años mostró una inclinación natural hacia la décima, consolidándose como un poeta de gran profundidad y creatividad. Su capacidad para construir versos espontáneos con una estructura impecable lo convirtió en un referente dentro de la tradición oral cubana.",
      "A lo largo de su trayectoria, Pablo León llevó su arte más allá de las fronteras de Cuba, estableciendo vínculos con la comunidad cubana en el exilio. Pasó la etapa final de su vida en Estados Unidos, donde continuó su labor decimística en ciudades como Miami, Nueva York y Nueva Jersey, participando en conciertos y programas radiales dedicados a la música campesina y la improvisación poética.",
      "Entre sus versos memorables destaca la décima que condensa profundidad filosófica: \"La muerte se hizo más fuerte / con la muerte de Martí, / porque sin muertos así / se moriría la muerte\". La paradoja productiva revela verdades que desafían lógica simple mientras mantienen estructura impecable."
    ]
  },
  {
    name: "Plácido",
    subtitle: "Transparencia Trágica",
    birth: "1809 en La Habana",
    death: "28 de junio de 1844 (fusilado)",
    biography: [
      "Gabriel de la Concepción Valdés, hijo de un peluquero mulato y una bailadora española, fue depositado por la madre en la Casa de Beneficencia. Escribió su primer poema a los doce años—un soneto titulado \"La hermosa\".",
      "Huérfano y artesano, trabajó en múltiples oficios: carpintería, tipografía, fabricación de objetos de carey y platería. En 1821 ingresó como alumno en el taller del retratista Vicente Escobar, y en 1823 se incorporó como aprendiz en la famosa tipografía de José Severino Boloña.",
      "Su poesía, caracterizada por ingenuidad, simpatía, ternura y transparencia natural, elevó la décima a alturas líricas extraordinarias en el siglo XIX, convirtiéndose en uno de los representantes más importantes del Romanticismo cubano.",
      "Fue fusilado injustamente, acusado de ser jefe de la Conspiración de La Escalera para organizar un levantamiento de esclavos—acusación cuya veracidad todavía se debate. Se dirigió al suplicio declamando su \"Plegaria a Dios\", poema compuesto la víspera de su muerte.",
      "Cintio Vitier escribió sobre él: \"La cubanía de Plácido, mucho más que en sus temas vernáculos, está en ese imponderable de ingenuidad y simpatía, de ternura y modestia, en esa transparencia natural de su voz manando cristalina\"."
    ]
  },
  {
    name: "Tomasita Quiala",
    subtitle: "La Reina del Repentismo",
    birth: "29 de diciembre de 1960 en Arroyón de Flores, Banes, Holguín",
    death: "11 de junio de 2025 a los 64 años",
    biography: [
      "Juana Tomasa Quiala Rojas fue conocida como \"La Reina del Repentismo\", \"La Ciega Maravillosa\", \"Alondra de La Lisa\" y \"Novia de Canarias\". Fue una de las más notables exponentes del repentismo y la décima en Cuba.",
      "Invidente desde su nacimiento, realizó estudios en la escuela para ciegos Varona Suárez. Desde niña Tomasita Quiala declamaba poemas sin saber que eran décimas.",
      "Sus inicios en la improvisación fueron inesperados cuando intervino espontáneamente en una canturía en defensa de otro poeta y lo hizo de tal manera que conquistó el aplauso del público. Invidente y mujer en un mundo generalmente masculino, tuvo que ganarse a pulso su lugar como una de las pocas mujeres dedicadas al repentismo en Cuba.",
      "En sus propias palabras: \"Uno se podrá cultivar, podrá estudiar, podrá leer libros y aprender, pero si no se tiene ese don, no podrá ser repentista\".",
      "Se destacó por su interpretación de la décima de pie forzado y en la controversia. Fue embajadora de la décima cubana en escenarios internacionales de España, Portugal, México, Colombia y Argentina. Alcanzó el primer lugar en el Festival de San Luis de Potosí en México.",
      "Distinciones recibidas: Premio Nacional de la Cultura Comunitaria (2004), Premio Iberoamericano Indio Naborí, Distinción Antero Regalado de la ANAP, Distinción 23 de agosto de la Federación de Mujeres Cubanas, Bastón de Cristal.",
      "Su primer libro de décimas, \"¿Quién soy? La novia de Islas Canarias\", fue transcrito al braille para las bibliotecas y escuelas especiales de Cuba."
    ]
  },
  {
    name: "Vicente Espinel",
    subtitle: "Arquitecto Original de la Décima",
    birth: "28 de diciembre de 1550 en Ronda, Málaga",
    death: "4 de febrero de 1624 en Madrid",
    biography: [
      "Vicente Gómez Martínez Espinel nació cuando el Siglo de Oro español comenzaba a brillar. Sacerdote, músico y escritor del Siglo de Oro español, su vida fue azarosa, llena de cambios, nunca fácil ni sosegada. Intentó ser soldado, fue escudero del Conde de Lemos, vivió con disipación en Sevilla.",
      "Los corsarios berberiscos lo apresaron; estuvo esclavizado en Argel hasta que los genoveses lo rescataron. Marchó después a Flandes, al ejército de Alejandro Farnesio.",
      "Poseía vastísima cultura. Dominaba el latín, siendo llamado \"el único poeta latino-castellano\". Tradujo el Arte poética de Horacio y fue centro de la vida poética y artística de su época.",
      "En 1591 publicó \"Diversas Rimas\", obra que transformó definitivamente la poesía española cuando ensayó todas las estrofas posibles. Su legado perdurable cristalizó en la décima: diez versos octosílabos con arquitectura de rima abbaaccddc.",
      "Lope de Vega—quien fue su alumno—, Calderón de la Barca, Cervantes, Quevedo y Góngora la incorporaron a sus obras durante el Siglo de Oro. Pero aunque el poeta inventor fuera Vicente Espinel, la décima ya no es de él sino del pueblo cantor que la adoptó y la llevó a través del Atlántico hacia América Latina.",
      "Además de su legado poético, Espinel añadió la quinta cuerda a la guitarra española—una cuerda más aguda llamada \"mi agudo\" o \"prima\"—transformando también el panorama musical."
    ]
  },
  {
    name: "Yoslay García Lanzarique",
    subtitle: "Solidez Matancera",
    birth: "1978 en Matanzas",
    biography: [
      "Joven decimista natural de Matanzas, representa la continuidad del arte en las nuevas generaciones y se erige como uno de los poetas repentistas más importantes de su generación. La solidez de su décima lo distingue en el escenario.",
      "En el uso del contrapunteo tiene marcado respeto a sus contrincantes, no utiliza palabras burlescas, y posee el don de con poco decir mucho, sorprendiendo al público. No utiliza un lenguaje sencillo; más bien se arma de recursos literarios para resolver el pie forzado, revelándose como un escritor artero.",
      "Junto a Oniesis Gil y otros jóvenes repentistas, Yoslay García constituyen no sólo la vanguardia del repentismo cubano de principio del siglo XXI, sino las voces más alzadas de la nueva generación.",
      "Su estilo matancero—sólido, meditado, profundo—contrasta con estilos más teatrales o explosivos, ofreciendo una alternativa de contemplación poética dentro del dinamismo del repentismo."
    ]
  },
  {
    name: "Ángel Valiente \"Angelito\"",
    subtitle: "Teatro en Movimiento",
    birth: "28 de febrero de 1916 en San Antonio de los Baños, La Habana",
    death: "21 de enero de 1987 en San Antonio de los Baños",
    biography: [
      "Ángel Miguel Valiente Rodríguez cursó la enseñanza elemental en una escuela pública de su barrio natal, interrumpiendo sus estudios para dedicarse al trabajo en vegas tabacaleras y otros oficios. Sin embargo, siempre fue un lector incansable, logrando cierta cultura autodidacta.",
      "Desde los ocho años improvisaba décimas. Ya en su juventud había logrado fama nacional a través de los programas radiales y la televisión. Su estilo era muy teatral: accionaba mucho con las manos, dramatizaba, ponía la misma energía en la voz que demostraba en sus gestos, y convencía al público con su efusividad gestual y paralingüística.",
      "Se llegó a decir que \"improvisaba más con las manos que con la boca\", aunque sus décimas eran de gran calidad literaria. Este estilo contrastaba notablemente con el del Indio Naborí, quien tenía una voz dulce, melodiosa, y cantaba con delicadeza.",
      "Fue protagonista de la célebre \"Controversia del Siglo\" junto al Indio Naborí. El primer encuentro ocurrió el 15 de junio de 1955 en el teatro del Casino Español de San Antonio de los Baños, donde más de dos mil personas presenciaron sus improvisaciones sobre El Amor, La Libertad y La Muerte.",
      "La revancha del 28 de agosto de 1955 en el estadio Campo Armada de San Miguel del Padrón reunió más de diez mil personas—un récord nunca superado en Cuba. Los temas fueron El Campesino y La Esperanza. El jurado decidió otorgar el triunfo al Indio Naborí, pero Angelito Valiente, con su caballerosidad característica, se acercó al jurado y dijo: \"Pongan ahí un cuarto jurado: yo mismo, que voto por Naborí\".",
      "Fue combatiente revolucionario y fundador y dirigente de los Comités de Defensa de la Revolución (CDR). Naborí y Valiente son considerados los más grandes repentistas cubanos del siglo XX."
    ]
  }
];

export function PoetsCompendium() {
  const [expandedPoet, setExpandedPoet] = useState<string | null>(null);

  const togglePoet = (name: string) => {
    setExpandedPoet(expandedPoet === name ? null : name);
  };

  return (
    <div className="space-y-4">
      <h3
        className="text-2xl font-bold font-serif mb-6 flex items-center gap-2"
        style={{ color: "#C8A05C" }}
      >
        📜 Los Maestros de la Décima: Compendio Completo
      </h3>
      
      <p className="mb-6" style={{ color: "#5C4033" }}>
        Biografías completas de los grandes maestros del repentismo cubano, ordenadas alfabéticamente.
      </p>

      {poets.map((poet) => (
        <div
          key={poet.name}
          className="border-2 rounded-lg overflow-hidden"
          style={{ borderColor: "#C8A05C", backgroundColor: "#FEF3C7" }}
        >
          <button
            onClick={() => togglePoet(poet.name)}
            className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-[#C8A05C]/20 transition-colors"
          >
            <div>
              <span className="font-bold font-serif" style={{ color: "#8B4513" }}>
                {poet.name}
              </span>
              <span className="ml-2 text-sm" style={{ color: "#D97706" }}>
                ({poet.birth.split(" en ")[0]})
              </span>
              <p className="text-sm italic" style={{ color: "#5C4033" }}>
                {poet.subtitle}
              </p>
            </div>
            <span className="text-xl" style={{ color: "#C8A05C" }}>
              {expandedPoet === poet.name ? "▲" : "▼"}
            </span>
          </button>

          {expandedPoet === poet.name && (
            <div className="px-4 pb-4 border-t" style={{ borderColor: "#C8A05C" }}>
              <div className="mt-3 space-y-2 text-sm" style={{ color: "#5C4033" }}>
                <p>
                  <strong>Nacimiento:</strong> {poet.birth}
                </p>
                {poet.death && (
                  <p>
                    <strong>Fallecimiento:</strong> {poet.death}
                  </p>
                )}
                {poet.location && (
                  <p>
                    <strong>Ubicación:</strong> {poet.location}
                  </p>
                )}
                <div className="mt-4 space-y-3">
                  {poet.biography.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

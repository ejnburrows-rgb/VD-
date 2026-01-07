
"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Crown, Users, Award } from "lucide-react";

export default function EducationSection() {
  const [expandedPoet, setExpandedPoet] = React.useState<string | null>(null);
  
  const historicalFigures = [
    "Vicente Espinel",
    "El Cucalambé",
    "Plácido",
    "El Indio Naborí",
    "Angelito Valiente",
    "Francisco Riverón Hernández",
    "Justo Vega",
    "Adolfo Alfonso",
    "Chanito Isidrón",
    "Omar Mirabal",
    "Tomasita Quiala",
    "Julio Pablo El Príncipe Pinareño",
    "Juan Antonio Díaz",
    "Pablo León",
    "Luis Quintana",
    "Yoslay García",
    "Leandro Camargo",
    "Oniesis Gil",
    "Manuel Soriano"
  ];

  const getPoetBiography = (name: string) => {
    switch(name) {
      case "Vicente Espinel":
        return (
          <div className="space-y-4">
            <h4 className="text-xl font-bold text-[#C8A05C] font-serif">
              Vicente Espinel (1550-1624): El Arquitecto Original
            </h4>
            <p>
              Vicente Gómez Martínez Espinel nació en Ronda, Málaga, el 28 de diciembre de 1550 y falleció en Madrid el 4 de febrero de 1624. Sacerdote, músico y escritor del Siglo de Oro español, transformó definitivamente la poesía española cuando en 1591 publicó <em>Diversas Rimas</em>, obra que recorrió casi toda la métrica de entonces, ensayando todas las estrofas posibles.
            </p>
            <p>
              Su legado perdurable cristalizó en la décima: diez versos octosílabos con arquitectura de rima <strong>abbaaccddc</strong>, agrupación de dos quintillas que los gigantes españoles adoptaron inmediatamente. Lope de Vega—quien fue su alumno—, Calderón de la Barca, Cervantes, Quevedo y Góngora la incorporaron a sus obras durante el Siglo de Oro.
            </p>
            <p>
              Espinel poseía vastísima cultura. Dominaba el latín, siendo llamado "el único poeta latino-castellano". Tradujo el Arte poética de Horacio y fue centro de la vida poética y artística de su época. Su genio no se limitó a la literatura: añadió la quinta cuerda a la guitarra española—una cuerda más aguda llamada "mi agudo" o "prima"—transformando también el panorama musical.
            </p>
            <p>
              Su obra cumbre en prosa fue la novela picaresca <em>Relaciones de la vida del escudero Marcos de Obregón</em> (1618), provista de elementos autobiográficos. La forma que Espinel inventó cruzó el Atlántico transformándose: lo que España concibió como continente estético, Cuba llenó de contenido identitario.
            </p>
          </div>
        );
      
      case "El Cucalambé":
        return (
          <div className="space-y-4">
            <h4 className="text-xl font-bold text-[#C8A05C] font-serif">
              El Cucalambé (Juan Cristóbal Nápoles Fajardo, 1829-1861): Primer Arquitecto de la Cubanización
            </h4>
            <p>
              Juan Cristóbal Nápoles Fajardo nació en Victoria de Las Tunas y desapareció misteriosamente hacia 1861, dejando un legado que permanece vivo en la tradición oral. Su obra cumbre, <em>Rumores del Hórmigo</em> (1856), representa la definitiva cubanización de la décima espinela, adaptándola como continente estético al contenido identitario de la isla.
            </p>
            <p>
              Educado por su abuelo materno José Rafael Fajardo García—hacendado, cura y conspirador anticolonial—, El Cucalambé participó en la conspiración de Agüero en 1851. Su poesía espontánea y fluida capta la naturaleza criolla con lujo visual y auditivo desde un punto de vista esencialmente campesino.
            </p>
            <p>
              Fue el único poeta que logró ser aceptado plenamente por el pueblo, entrando totalmente en su vida. Durante las guerras de Independencia, sus versos eran compañía casi inconsciente del mambí. Esta primera arquitectura verdaderamente cubana de la décima—estructura española, alma caribeña—constituyó savia viva que todavía fecunda la poesía popular cubana.
            </p>
          </div>
        );

      case "Plácido":
        return (
          <div className="space-y-4">
            <h4 className="text-xl font-bold text-[#C8A05C] font-serif">
              Plácido (Gabriel de la Concepción Valdés, 1809-1844): Transparencia Trágica
            </h4>
            <p>
              Gabriel de la Concepción Valdés nació en La Habana, hijo de un peluquero mulato y una bailarina española. Fue depositado por la madre en la Casa de Beneficencia. Escribió su primer poema a los doce años—un soneto titulado "La hermosa".
            </p>
            <p>
              Huérfano y artesano, trabajó en múltiples oficios: carpintería, tipografía, fabricación de objetos de carey y platería. Quedó huérfano de padre cuando este murió en México buscando mejor suerte. En 1821 ingresó como alumno en el taller del retratista Vicente Escobar, y en 1823 se incorporó como aprendiz en la famosa tipografía de José Severino Boloña.
            </p>
            <p>
              Su habilidad como artesano del carey lo llevó a Matanzas en 1826 para trabajar en el taller de Nicolás de Bota, donde acrecentó su fama de poeta. Regresó a Matanzas en 1840 y se casó dos años después. Su poesía, caracterizada por ingenuidad, simpatía, ternura y transparencia natural, elevó la décima a alturas líricas extraordinarias en el siglo XIX, convirtiéndose en uno de los representantes más importantes del Romanticismo cubano.
            </p>
            <p>
              Fue fusilado el 28 de junio de 1844, acusado injustamente de ser jefe de la Conspiración de La Escalera para organizar un levantamiento de esclavos—acusación cuya veracidad todavía se debate. Se dirigió al suplicio declamando su "Plegaria a Dios", poema compuesto la víspera de su muerte. Su cubanía residía en ese imponderable de ingenuidad y simpatía, en esa transparencia natural de su voz que al final trágico de su vida cobró acentos desgarradores de sencilla grandeza.
            </p>
          </div>
        );

      case "El Indio Naborí":
        return (
          <div className="space-y-4">
            <h4 className="text-xl font-bold text-[#C8A05C] font-serif">
              El Indio Naborí (Jesús Orta Ruiz, 1922-2005): Voz Lírica del Siglo XX
            </h4>
            <p>
              Jesús Orta Ruiz, nacido en Los Zapotes, San Miguel del Padrón, representa la figura más representativa de la décima en Cuba del siglo XX. Nació en el seno de una familia campesina. Desde niño despertó admiración con sus improvisaciones. Se desempeñó como trovador y escritor radial en Radio Progreso, poniendo su arte al servicio de la organización de la Asociación Nacional Campesina en 1940.
            </p>
            <p>
              Su etapa juvenil de repentista dejó huellas tan profundas que todavía se le invoca con emoción en toda competencia de improvisadores. Su controversia más famosa fue su épica confrontación con Ángel Valiente. El primer encuentro ocurrió el 15 de junio de 1955 en el teatro del Casino Español de San Antonio de los Baños, donde más de dos mil personas (con el parque desbordado por la multitud) presenciaron sus improvisaciones sobre El Amor, La Libertad y La Muerte. El resultado fue empate.
            </p>
            <p>
              La revancha del 28 de agosto de 1955 en el estadio Campo Armada de San Miguel del Padrón reunió más de diez mil personas—un récord nunca superado en Cuba, acontecimiento sin precedentes en la historia cultural cubana. Los temas fueron El Campesino y La Esperanza, improvisando diez espinelas cada uno. El jurado otorgó el triunfo al Indio Naborí, haciendo patente su reconocimiento al valioso esfuerzo realizado por Ángel Valiente.
            </p>
            <p>
              Tenía una voz dulce, melodiosa, y cantaba con delicadeza, acariciando las palabras. Recibió el Premio Nacional de Literatura en 1995. Sus décimas improvisadas combinaron recursos literarios sofisticados con rapidez de pensamiento, estableciendo un nivel de altura literaria sin precedentes para la décima oral.
            </p>
          </div>
        );

      case "Angelito Valiente":
        return (
          <div className="space-y-4">
            <h4 className="text-xl font-bold text-[#C8A05C] font-serif">
              Ángel Valiente "Angelito" (1916-1987): Teatro en Movimiento
            </h4>
            <p>
              Ángel Miguel Valiente Rodríguez nació el 28 de febrero de 1916 en San Antonio de los Baños, zona tabacalera de La Habana. Cursó la enseñanza elemental en una escuela pública de su barrio natal, interrumpiendo sus estudios para dedicarse al trabajo en vegas tabacaleras y otros oficios. Sin embargo, siempre fue un lector incansable, logrando cierta cultura autodidacta.
            </p>
            <p>
              Desde los ocho años improvisaba décimas. Ya en su juventud había logrado fama nacional a través de los programas radiales y la televisión. Su estilo era muy teatral: accionaba mucho con las manos, dramatizaba, ponía la misma energía en la voz que demostraba en sus gestos, y convencía al público con su efusividad gestual y paralingüística. Se llegó a decir que "improvisaba más con las manos que con la boca", aunque sus décimas eran de gran calidad literaria.
            </p>
            <p>
              Su caballerosidad quedó inmortalizada cuando, tras la decisión del jurado de otorgar el triunfo a Naborí en 1955, se acercó al jurado y dijo espontáneamente: "Pongan ahí un cuarto jurado: yo mismo, que voto por Naborí". Participó en el programa radiofónico "Competencia Nacional de Trovadores" de la emisora CMQ, que se trasmitía de 10 a 11 de la mañana, donde él y Naborí ganaron el respeto, la admiración y el cariño de todos los cubanos.
            </p>
            <p>
              Fue combatiente revolucionario y fundador y dirigente de los Comités de Defensa de la Revolución (CDR). Murió el 21 de enero de 1987 en San Antonio de los Baños, su pueblo natal.
            </p>
          </div>
        );

      case "Francisco Riverón Hernández":
        return (
          <div className="space-y-4">
            <h4 className="text-xl font-bold text-[#C8A05C] font-serif">
              Francisco Riverón Hernández (1917-1975): Poeta Pictórico
            </h4>
            <p>
              Francisco Riverón Hernández nació el 2 de abril de 1917 en Güines, La Habana. Tuvo que abandonar la escuela en octavo grado para ser aprendiz de zapatero y ayudar a la economía familiar. En su tiempo libre se dedicó a leer a los grandes maestros de la poesía y aprendió así la técnica del verso en su línea más culta. Definido como "el más literato de su promoción y uno de los mejores repentistas de Cuba".
            </p>
            <p>
              Riverón cultivó distintas formas del verso, pero en la décima logró sus mejores aciertos líricos. Sus temas más recurrentes fueron la belleza de la naturaleza de la Patria, las tradiciones del campesino cubano y los problemas sociales del pueblo, en especial el hombre del campo en la época prerrevolucionaria.
            </p>
            <p>
              Sus poemas fueron muy conocidos, tal es el caso de "Epístola a José Martí" (<em>José de los Cubanos</em>), que tuvo un gran impacto social. Se ha dicho, con razón, que "si Naborí es el poeta lírico por excelencia, Riverón Hernández es el poeta pictórico, y Valiente es el poeta épico-dramático". Tres estilos que definieron formas de hacer y que llenaron el panorama repentístico de epígonos e imitadores.
            </p>
            <p>
              Por la elevación y finura de sus décimas, este decimista es considerado "el precursor de la décima moderna en Cuba". Entre sus obras destacan <em>El sembrador guajiro</em> (1951), <em>José de los Cubanos</em> (1953), <em>Décimas de amor</em> (1955), <em>Retazos de Cuba</em> (1964), y <em>Las mejores décimas de amor</em>.
            </p>
            <p>
              Fue fundador y director del programa radial <em>Renacer Cubano</em> de Radio Marianao. Su famosa redondilla "Anda por la calle un niño / huérfano hasta de la vida, / tiene la boca zurcida / por el hambre de un cariño" muestra su sensibilidad social. Falleció el 13 de enero de 1975 en La Habana.
            </p>
          </div>
        );

      case "Justo Vega":
        return (
          <div className="space-y-4">
            <h4 className="text-xl font-bold text-[#C8A05C] font-serif">
              Justo Vega (1909-1993): El Caballero de la Décima Improvisada
            </h4>
            <p>
              Justo Vega, maestro de la improvisación tradicional, nació en Matanzas el 9 de agosto de 1909. Reconocido como "El Caballero de la Décima Improvisada", fue uno de los repentistas estelares del pie forzado y el punto cubano. En 1934 fundó y dirigió el cuarteto Trovadores Cubanos, integrado además por Pedro Guerra, Alejandro Aguilar y Bernardo Vega.
            </p>
            <p>
              Su fama creció por sus presentaciones en programas radiales como "Patria Guajira" y especialmente "Palmas y Cañas", donde formó un dúo legendario con Adolfo Alfonso durante veinticinco años. La fuerza de su poesía lo colocó entre los grandes de la décima, junto al Indio Naborí, Chanito Isidrón, Angelito Valiente y otros maestros.
            </p>
            <p>
              Más que un gran intérprete, se convirtió en artífice de fabulosas controversias, evocadas por varias generaciones de cubanos que disfrutaron sus presentaciones en radio, televisión y fiestas campesinas. Falleció el 13 de enero de 1993, dejando una gran huella en el panorama cultural cubano.
            </p>
          </div>
        );

      case "Adolfo Alfonso":
        return (
          <div className="space-y-4">
            <h4 className="text-xl font-bold text-[#C8A05C] font-serif">
              Adolfo Alfonso (1925-2012): Compenetración sin Réplica
            </h4>
            <p>
              Adolfo Alfonso, decimista nato considerado uno de los mejores que ha tenido Cuba, a los catorce años ya interpretaba tangos. Pero después de admirar una controversia entre Angelito Valiente y el Indio Naborí, decidió dedicar su vida a cultivar la décima y el son montuno.
            </p>
            <p>
              El azar lo llevó a encontrarse con Justo Vega en el programa radiofónico <em>Las Mil Diez</em>, encuentro que cambió el rumbo de su vida artística y la historia del repentismo cubano. Consideraba a Justo Vega su maestro tanto como poeta como conocedor de la vida. Durante veinticinco años, ambos fueron parte de lo más valioso de la música campesina cubana en el programa televisivo "Palmas y Cañas".
            </p>
            <p>
              Tan fuerte era la compenetración entre ambos trovadores que, después de muerto Justo Vega en 1993, Alfonso decidió no buscar otra pareja. A pesar de su trabajo con repentistas de gran talento como Emiliano Sardiñas, nunca volvió a experimentar la compenetración y empatía que sintiera con su compañero de varias décadas.
            </p>
            <p>
              El inigualable talento poético, el modo inconfundible de entonar e interpretar la más auténtica música de nuestros campos y el acento jocoso, cercano al choteo cubano, les valió la posibilidad de romper con la barrera rural que encasillaba al repentismo y llevar su música a un público más amplio. Alfonso recibió el Premio Nacional de Música en 2004. Falleció el 23 de enero de 2012, a los 87 años, víctima de una afección cardiorespiratoria.
            </p>
          </div>
        );

      case "Chanito Isidrón":
        return (
          <div className="space-y-4">
            <h4 className="text-xl font-bold text-[#C8A05C] font-serif">
              Chanito Isidrón (Cipriano Isidrón Torres, 1903-1992): Fundador de la Novela en Décimas
            </h4>
            <p>
              Cipriano Isidrón Torres nació en Calabazar de Sagua, Las Villas, hijo de padres canarios. Comenzó a improvisar desde los ocho años, siendo figura imprescindible en todas las fiestas a las que concurrían cantadores de fama. En 1931 abandonó las faenas agrícolas y se lanzó con su guitarra a recorrer los pueblos villaclareños, donde empezó a llamársele "el elegante poeta de Las Villas".
            </p>
            <p>
              En 1938, con <em>Amores Montaraces</em>, se convirtió en fundador de la novela en décimas para ser cantada, escribiendo 123 décimas que totalizaban 1,230 versos. Nadie había escrito una novela en décimas hasta Chanito Isidrón. Él es el iniciador entre nosotros de esta modalidad genérica. Su sensibilidad para captar el relato en décimas y su sedimentado saber decimista lo condujeron a escribir esta obra tremendamente popular en Cuba y en Canarias.
            </p>
            <p>
              La novela cuenta la historia de Camilo y Estrella. Comienza así: "Camilo, galán guajiro / que de amor canta con brío / sus décimas a una esquina / lanza con voz cristalina / y alma puesta en el gentío".
            </p>
            <p>
              Se inició en la radio de Santa Clara en 1936, y La Cadena Azul lo contrató para escribir novelas guajiras hechas en décimas y cantadas. La época de oro de la radiodifusión cubana—años 40 y 50—lo tuvo como principal protagonista en programas estelares como "Buscando el Príncipe de Punto Cubano" (cuyo trono ocupó) y "Dímelo cantando".
            </p>
            <p>
              Su humor agresivo era como una explosión de rebeldía, de protesta, de anuncio de futuro. No sólo ha sido este poeta popular una voz mayor del humorismo criollo, sino que en las letras cubanas tiene un lugar de fundador. Considerado como el rey del punto cubano, fue uno de los mejores repentistas que ha tenido Cuba.
            </p>
          </div>
        );

      case "Omar Mirabal":
        return (
          <div className="space-y-4">
            <h4 className="text-xl font-bold text-[#C8A05C] font-serif">
              Omar Mirabal (1955-presente): El Cantor del Mayabeque
            </h4>
            <p>
              Omar Mirabal Navarro nació el 14 de noviembre de 1955 en Güines, municipio del actual Mayabeque. Conocido en el medio repentista como "El Cantor del Mayabeque", es considerado uno de los más extraordinarios decimistas y uno de los mejores poetas improvisadores que hay en Cuba actualmente.
            </p>
            <p>
              Para una buena parte de los amantes de la décima, Omar Mirabal es el mejor poeta de Cuba, algo que dice mucho de su calidad y aceptación. Su estilo poético tiene evidente ascendencia naboriana, donde destacan el gusto por el símil y las imágenes visuales. Es reconocido por su dominio técnico de la décima, por el celo con que cuida su lenguaje y por la plasticidad de sus imágenes.
            </p>
            <p>
              Los recursos expresivos mirabalianos tienen sus raíces en la más profunda tradición del habla campesina, lo que ha hecho de su obra la de mayor impacto e influencia en los poetas de promociones posteriores. Es dueño de un canto pausado, de gran limpieza enunciativa y de un estilo poético de gran profundidad.
            </p>
            <p>
              La popularidad que Omar Mirabal llegó a alcanzar en los años 80, junto a la calidad de sus interpretaciones, lo convirtieron en un eje estético de obligada referencia para las nuevas generaciones. Nadie como Omar ha encarnado en una sola persona el espíritu de Jesús Orta Ruiz (El Indio Naborí) y Francisco Riverón Hernández, al extremo de dejar de ser un "poeta beaker" y convertirse en un "poeta patrón", en un poeta modélico.
            </p>
            <p>
              Omar le imprime a su tonada un aire de parsimonia que por momentos denota cansancio y que precisamente lo distingue en un arabesco melódico personal. Conformó con Jesusito Rodríguez "El As de la Metáfora", la pareja de improvisadores más completa y mediática de los últimos tiempos. Ha realizado controversias memorables con Pablo León, Angelito Valiente, Tuto García, Francisco Pereira "Chanchito", Jesusito Rodríguez, Rafael García, Hirán Fundora, Luis Paz "Papillo", Roberto García y Juan Antonio Díaz.
            </p>
          </div>
        );

      case "Tomasita Quiala":
        return (
          <div className="space-y-4">
            <h4 className="text-xl font-bold text-[#C8A05C] font-serif">
              Tomasita Quiala (1960-2025): La Reina del Repentismo
            </h4>
            <p>
              Juana Tomasa Quiala Rojas nació el 29 de diciembre de 1960 en Arroyón de Flores, Banes, provincia de Holguín. Conocida como "La Reina del Repentismo", "La Ciega Maravillosa", "Alondra de La Lisa" y "Novia de Canarias", fue una de las más notables exponentes del repentismo y la décima en Cuba.
            </p>
            <p>
              Invidente desde su nacimiento, realizó estudios en la escuela para ciegos Varona Suárez (también conocida como escuela especial para ciegos Abel Santamaría), donde cursó la enseñanza primaria y secundaria. Desde niña Tomasita Quiala declamaba poemas sin saber que eran décimas.
            </p>
            <p>
              Sus inicios en la improvisación fueron inesperados cuando intervino espontáneamente en una canturía en defensa de otro poeta y lo hizo de tal manera que conquistó el aplauso del público, marcando así el inicio de una brillante trayectoria. Invidente y mujer en un mundo generalmente masculino, tuvo que ganarse a pulso su lugar como una de las pocas mujeres dedicadas al repentismo en Cuba. En sus propias palabras: "Uno se podrá cultivar, podrá estudiar, podrá leer libros y aprender, pero si no se tiene ese don, no podrá ser repentista".
            </p>
            <p>
              Se destacó por su interpretación de la décima de pie forzado y en la controversia. Fue embajadora de la décima cubana en escenarios internacionales de España, Portugal, México, Colombia y Argentina, donde su capacidad para improvisar fue recibida con asombro y admiración. Alcanzó el primer lugar en el Festival de San Luis de Potosí en México.
            </p>
            <p>
              Recibió numerosas distinciones, incluyendo el Premio Nacional de la Cultura Comunitaria (2004), el Premio Iberoamericano Indio Naborí del Centro Iberoamericano de la Décima y el Verso Improvisado, la Distinción Antero Regalado de la ANAP, la Distinción 23 de agosto de la Federación de Mujeres Cubanas, el Bastón de Cristal y el Sello por la Rehabilitación de la Asociación Nacional de Ciegos y Débiles Visuales de Cuba.
            </p>
            <p>
              Su primer libro de décimas, <em>¿Quién soy? La novia de Islas Canarias</em>, fue transcrito al braille para las bibliotecas y escuelas especiales de Cuba. Participó en emblemáticos programas de televisión cubana como <em>Palmas y Cañas</em> y <em>El Motor de Arranque</em>. Falleció el 11 de junio de 2025 a los 64 años de edad, tras complicaciones cardiovasculares. Su legado permanece como símbolo de talento, autenticidad y superación, inspirando a generaciones de repentistas en Cuba y el mundo.
            </p>
          </div>
        );

      case "Julio Pablo El Príncipe Pinareño":
        return (
          <div className="space-y-4">
            <h4 className="text-xl font-bold text-[#C8A05C] font-serif">
              Julio Pablo Travieso Martínez: Arquitecto de Versos en Tiempo Presente
            </h4>
            
            <div>
              <h5 className="font-semibold text-[#D2691E] mb-2">El Arte Como Respiración</h5>
              <p>
                Observa el escenario vacío. Siente el silencio colectivo antes del primer verso. 
                Julio Pablo Travieso Martínez, nacido en 1996 bajo el cielo pinareño, transforma 
                ese silencio en arquitectura sonora—décimas que construyen puentes entre siglos, 
                generaciones, islas.
              </p>
              <p className="mt-2">
                Este joven maestro no preserva tradiciones como quien guarda reliquias en vitrinas. 
                Las respira. Las reinterpreta. Las expande. El repentismo fluye a través de él como 
                agua que recuerda su cauce ancestral mientras descubre territorios nuevos. Tradición 
                y renovación. Memoria y creación. Ambas. Siempre ambas.
              </p>
            </div>

            <div>
              <h5 className="font-semibold text-[#D2691E] mb-2">Raíces Que Sostienen, Alas Que Liberan</h5>
              <p>
                La Casa de la Décima "Celestino García"—fundada en 2008 como ecosistema cultural—nutrió 
                semillas que hoy florecen ante audiencias nacionales e internacionales. Desde esa institución 
                emblemática, Travieso cultivó el dominio técnico que transforma la improvisación en precisión 
                controlada: diez versos octosílabos que contienen universos.
              </p>
              <p className="mt-2">
                Oralitura Habana 2019 lo vio compartir escenario con decimistas cuyas voces cruzaban océanos. 
                Las controversias con Yoniel Perdomo—febrero 2025, versos sobre infancia campesina que duraron 
                horas—revelaron la resistencia física y mental que exige el arte oral sostenido. La conversación 
                poética con el puertorriqueño Julio César Sanabria demostró que la décima borra fronteras 
                geográficas mediante resonancia cultural compartida.
              </p>
              <p className="mt-2">
                Cada presentación confirma una verdad fundamental: la técnica magistral habilita la expresión 
                auténtica, nunca la oscurece.
              </p>
            </div>

            <div>
              <h5 className="font-semibold text-[#D2691E] mb-2">El Mago del Momento: Cuando la Décima Revela Su Esencia</h5>
              <p>
                Travieso merece también el título de "Mago del Momento"—designación que captura la naturaleza 
                efímera y milagrosa del repentismo. Él enseña una verdad que los grandes maestros comprenden 
                intuitivamente: la décima es la magia del momento.
              </p>
              <p className="mt-2">
                No existe ensayo para la improvisación. No hay segunda oportunidad para el verso que nace y 
                muere en el instante de su pronunciación. El poeta sostiene la audiencia en suspenso 
                compartido—el momento cuando pensamiento se vuelve palabra, cuando palabra se cristaliza en 
                forma perfecta, cuando forma captura emoción que todos reconocen como auténtica.
              </p>
              <p className="mt-2">
                Esta magia exige presencia total: el poeta no puede distraerse, dudar, retroceder. Debe confiar 
                que años de práctica emergerán como instinto. Que la forma memorizada se llenará de contenido 
                espontáneo. Que la estructura sostendrá el peso de la verdad improvisada. Travieso demuestra 
                este milagro cada vez que transforma silencio en verso—cada controversia donde el momento 
                genera significado que ninguna composición escrita replicaría exactamente.
              </p>
            </div>

            <div>
              <h5 className="font-semibold text-[#D2691E] mb-2">La Décima Como Instrumento de Precisión</h5>
              <p>
                La espinela—estrofa nacional cubana, forma heredada de España que Cuba adoptó como voz 
                propia—encuentra en Travieso un intérprete que entiende su paradoja esencial: estructura 
                rígida que genera libertad ilimitada. Diez versos, esquema fijo de rima, ritmo octosílabo 
                invariable. Dentro de esos límites aparentemente restrictivos, el poeta improvisa sobre 
                cualquier tema con la fluidez del pensamiento hablado.
              </p>
              <p className="mt-2">
                Vida campesina. Amor. Divorcio. Historia. Filosofía. Cada tema se moldea en décimas que 
                satisfacen exigencias técnicas mientras transmiten verdades humanas inmediatas. La forma no 
                decora el contenido—lo encarna. La restricción métrica no limita significado—lo cristaliza 
                en memorabilidad.
              </p>
            </div>

            <div>
              <h5 className="font-semibold text-[#D2691E] mb-2">Generación Guardiana, Generación Innovadora</h5>
              <p>
                Travieso pertenece a la generación que heredó responsabilidad histórica: mantener viva una 
                tradición oral en era digital. Junto a Anabeybi Rodríguez—"la princesa pinareña"—y otros 
                jóvenes repentistas, forma una red de artistas que entienden que preservar no significa congelar.
              </p>
              <p className="mt-2">
                Estos poetas contemporáneos aplican formas centenarias a preocupaciones actuales. Usan redes 
                sociales para amplificar versos que antes solo viajaban hasta donde alcanzaban voces sin 
                amplificación. Graban presentaciones que antes existían únicamente en memoria colectiva. 
                Documentan procesos creativos que maestros anteriores—como Basilio Echevarría Acosta, "El 
                Negro"—transmitieron exclusivamente mediante ejemplo directo.
              </p>
              <p className="mt-2">
                Mueven la décima hacia el futuro honrando su pasado. Velocidad con reverencia.
              </p>
            </div>

            <div>
              <h5 className="font-semibold text-[#D2691E] mb-2">Geografía Cultural: Pinar del Río Como Identidad</h5>
              <p>
                Cada verso que Travieso improvisa lleva la marca de su provincia occidental. Pinar del 
                Río—donde el punto guajiro no es género musical sino lenguaje materno, donde la décima 
                estructura pensamiento colectivo—habla a través de él. No como ventrílocuo que repite frases 
                ajenas, sino como voz individual que articula experiencia comunitaria.
              </p>
              <p className="mt-2">
                El título "Príncipe Pinareño" reconoce esa doble función: maestría personal que representa 
                herencia colectiva. Travieso proyecta identidad regional mientras alcanza relevancia universal. 
                Lo específicamente cubano ilumina lo fundamentalmente humano.
              </p>
            </div>

            <div>
              <h5 className="font-semibold text-[#D2691E] mb-2">Testimonio Personal: Privilegio Compartido</h5>
              <p>
                Conocer a Julio Pablo Travieso. Llamarlo amigo. Reconocerlo como hermano. Estas experiencias 
                constituyen bendiciones que agradezco con gratitud diaria, porque presenciar maestría poética 
                en persona—observar cómo la mente transforma experiencia en verso mientras el verso se 
                pronuncia—revela procesos creativos que ninguna grabación captura completamente.
              </p>
              <p className="mt-2">
                Su presencia confirma que el arte del pueblo no es primitivo ni simple. Es sofisticado en 
                ejecución, profundo en implicación, accesible sin sacrificar complejidad.
              </p>
            </div>

            <div>
              <h5 className="font-semibold text-[#D2691E] mb-2">Resistencia Cultural Como Acto Creativo</h5>
              <p>
                Cada controversia que Travieso sostiene, cada festival donde participa, cada alumno que forma, 
                constituye acto de resistencia cultural: testimonio viviente de que tradiciones orales permanecen 
                vibrantes cuando artistas talentosos las encarnan con compromiso contemporáneo. La décima 
                improvisada no es reliquia museográfica sino herramienta comunicativa actual.
              </p>
              <p className="mt-2">
                En contextos donde homogeneización cultural amenaza especificidades regionales, donde consumo 
                pasivo reemplaza participación activa, donde velocidad privilegia superficialidad, el repentismo 
                ofrece alternativa: creación compartida en tiempo real entre poeta y audiencia, forma que exige 
                presencia total.
              </p>
            </div>

            <div>
              <h5 className="font-semibold text-[#D2691E] mb-2">Trayectoria Que Continúa</h5>
              <p>
                Julio Pablo Travieso Martínez escribe su capítulo en la historia de la poesía cubana con versos 
                que vuelan—literalmente—en el momento de su creación. Su trabajo asegura que generaciones 
                futuras heredarán tradición viva, no archivo histórico. Que la décima seguirá evolucionando sin 
                perder identidad esencial. Que Pinar del Río mantendrá su voz distintiva en conversaciones 
                culturales nacionales e internacionales.
              </p>
              <p className="mt-2">
                Que la palabra colorida y precisa—la que Martí persiguió incansablemente—continúa emergiendo a 
                través del oficio paciente de artistas comprometidos con excelencia.
              </p>
              <p className="mt-2 font-medium italic text-[#C8A05C]">
                Que sus versos vuelen alto, llevando esencia cubana a corazones que reconozcan en la décima 
                improvisada lo que siempre ha sido: sofisticación accesible, particularidad que alcanza 
                universalidad, técnica magistral al servicio de verdad compartida. Magia que ocurre una vez y 
                nunca exactamente igual—porque así es el momento, y así es el arte que lo honra.
              </p>
            </div>
          </div>
        );

      case "Juan Antonio Díaz":
        return (
          <div className="space-y-4">
            <h4 className="text-xl font-bold text-[#C8A05C] font-serif">
              Juan Antonio Díaz (1970-presente): Planos Imaginativos que Sorprenden
            </h4>
            <p>
              Juan Antonio Díaz nació el 26 de mayo de 1970 en la finca "La Caoba", San Diego de los Baños, Pinar del Río, Cuba. Poeta repentista considerado en el mundo como uno de los decimistas improvisadores más influyentes de su generación.
            </p>
            <p>
              El Indio Naborí afirmó sobre él: "En la vanguardia de nuestros repentistas actuales, constituido por unos treinta jóvenes, figura y se destaca el ágil improvisador Juan Antonio Díaz de cuyos planos reales de sus recuerdos agropecuarios salen no pocas veces planos imaginativos sorprendentes". Esta caracterización del maestro Naborí captura la esencia del estilo de Juan Antonio: capacidad de partir de lo concreto campesino para elevarse hacia construcciones imaginativas que asombran.
            </p>
            <p>
              Ha compartido escenario con maestros como Pablo León, Omar Mirabal, Luis Quintana, Leandro Camargo y Yoslay García. Su obra incluye tributos a figuras históricas del repentismo cubano, manteniendo viva la memoria de los grandes maestros. En controversias con Luis Quintana ha demostrado su dominio técnico de la décima improvisada.
            </p>
            <p>
              Su estilo combina la herencia campesina pinareña con técnica depurada y capacidad de crear imágenes poéticas que conectan lo rural con lo universal. Ha publicado el libro <em>"Mi dolor tuyo"</em>, donde sus décimas aupan todo el sufrimiento y la esperanza del cubano.
            </p>
          </div>
        );

      case "Pablo León":
        return (
          <div className="space-y-4">
            <h4 className="text-xl font-bold text-[#C8A05C] font-serif">
              Pablo León (1927-fecha desconocida): Arquitecto de Paradojas Memorables
            </h4>
            <p>
              Pablo León Alonso nació el 1 de septiembre de 1927 en Consolación del Sur, Pinar del Río, Cuba. Fue una de las figuras más influyentes en la tradición del repentismo cubano. Su estilo se distinguió por la precisión métrica, la riqueza metafórica y una serenidad que le otorgó un sello único dentro del arte de la improvisación poética.
            </p>
            <p>
              Desde sus primeros años mostró una inclinación natural hacia la décima, consolidándose como un poeta de gran profundidad y creatividad. Su capacidad para construir versos espontáneos con una estructura impecable lo convirtió en un referente dentro de la tradición oral cubana. Participó en numerosas controversias poéticas, donde su talento y dominio del lenguaje lo posicionaron como uno de los improvisadores más respetados de su generación.
            </p>
            <p>
              A lo largo de su trayectoria, Pablo León llevó su arte más allá de las fronteras de Cuba, estableciendo vínculos con la comunidad cubana en el exilio. Residió en Miami, donde continuó cultivando la décima y participando en encuentros culturales que mantenían viva la tradición del repentismo.
            </p>
            <p>
              Su legado se mantiene vivo a través de su obra, donde la poesía adquiere una resonancia especial en el imaginario cultural cubano. Entre sus versos memorables destaca la décima que condensa profundidad filosófica en construcción aforística:
            </p>
            <div className="pl-6 border-l-4 border-[#C8A05C] italic text-[#5C4033] my-3">
              <p>"La muerte se hizo más fuerte</p>
              <p>con la muerte de Martí,</p>
              <p>porque sin muertos así</p>
              <p>se moriría la muerte"</p>
            </div>
            <p>
              Estos versos encapsulan la profundidad de su pensamiento y su compromiso con la memoria histórica y la tradición literaria de la isla. La paradoja productiva—la muerte necesita muertes nobles para justificar su existencia—revela verdades que desafían lógica simple mientras mantienen estructura impecable. Su obra sigue inspirando a nuevas generaciones de decimistas, consolidando su lugar en la tradición literaria cubana.
            </p>
          </div>
        );

      case "Luis Quintana":
        return (
          <div className="space-y-4">
            <h4 className="text-xl font-bold text-[#C8A05C] font-serif">
              Luis Quintana: Mulato Viajero del Barroco
            </h4>
            <p>
              Luis Quintana, maestro de la décima urbana radicado en España, representa un fenómeno único en el repentismo contemporáneo: la integración de temas contemporáneos con métrica clásica, enriquecida por el diálogo transatlántico entre Cuba y España. Su estilo "mulato viajero" conocedor de lo barroco se ha impregnado de lo español, regresando a Cuba con riqueza expresiva única.
            </p>
            <p>
              Considerado sin discusión uno de los más grandes poetas repentistas cubanos de todos los tiempos, hay grandeza en su décima improvisada, que posee la lírica y la idea, el saber del hombre, sus caídas y la excelencia en la metáfora para exponer todo eso sin fisuras. Pero además tiene histrionismo, es artista y al mismo tiempo peleón. Tiene pinta de gladiador mientras controla su voz y hace uso de diferentes tonadas en los momentos apropiados para dar fuerza y agresividad o suavidad y ternura a lo que dice, y gesticula para que se "vea" además de que se escuche su décima.
            </p>
            <p>
              Ha protagonizado controversias legendarias junto a Alexis Díaz Pimienta y Juan Antonio Díaz, aclamadas por el público. En una batalla poética con Oniesis Gil en la Casa de la Décima de Mayabeque, Güines, Cuba, demostró su capacidad de condensar el estilo de otros poetas con gran eficacia, combinada con su dominio técnico impecable.
            </p>
            <p>
              Su capacidad de moverse entre registros—urbano y campesino, cubano y español, clásico y contemporáneo—lo distingue como uno de los improvisadores más respetados de la actualidad. Ha compartido escenario con Juan Antonio Díaz en múltiples ocasiones, creando momentos memorables del repentismo contemporáneo.
            </p>
          </div>
        );

      case "Yoslay García":
        return (
          <div className="space-y-4">
            <h4 className="text-xl font-bold text-[#C8A05C] font-serif">
              Yoslay García (1978-presente): Solidez Matancera
            </h4>
            <p>
              Yoslay García nació en 1978, natural de Matanzas. Representa la continuidad del arte en las nuevas generaciones y se erige como uno de los poetas repentistas más importantes de su generación. La solidez de su décima lo distingue en el escenario.
            </p>
            <p>
              En el uso del contrapunteo tiene marcado respeto a sus contrincantes, no utiliza palabras burlescas, y posee el don de con poco decir mucho, sorprendiendo al público. No utiliza un lenguaje sencillo; más bien se arma de recursos literarios para resolver el pie forzado, revelándose como un escritor artero. Con pericia se vale de técnicas poéticas para definir profundos temas.
            </p>
            <p>
              Junto a Oniesis Gil (37 años) y otros jóvenes repentistas, Yoslay García (41 años) constituyen no sólo la vanguardia del repentismo cubano de principio del siglo XXI, sino las voces más alzadas de la nueva generación. Ha compartido escenario con figuras destacadas como Juan Antonio Díaz y otros maestros contemporáneos.
            </p>
            <p>
              Ha protagonizado controversias con Geovanis León y otros poetas de su generación, demostrando consistentemente su capacidad de construir décimas de gran profundidad con economía de recursos. Su estilo matancero—sólido, meditado, profundo—contrasta con estilos más teatrales o explosivos, ofreciendo una alternativa de contemplación poética dentro del dinamismo del repentismo.
            </p>
          </div>
        );

      case "Leandro Camargo":
        return (
          <div className="space-y-4">
            <h4 className="text-xl font-bold text-[#C8A05C] font-serif">
              Leandro Camargo (1987-presente): Defensor Poético de Símbolos
            </h4>
            <p>
              Leandro Camargo Pérez nació en 1987 en Los Palacios, Pinar del Río. Joven y talentoso poeta, más conocido por su amplia y deslumbrante ejecutoria como repentista en los escenarios de la décima oral improvisada, es igualmente relevante en la investigación, la docencia y la escritura de la poesía en estrofas de diez versos.
            </p>
            <p>
              En 2007, con solo 20 años, alcanzó el Premio en el emblemático Concurso Nacional de Improvisación Justo Vega, en la XL Jornada Cucalambeana, anualmente celebrada en Las Tunas. Su precocidad creativa se manifestó desde los 14 años, cuando en 2001 actuó en el encuentro titulado "La canturía más larga", celebrado durante todo un día de repentismo en Güines, llevando ya varios años cantando décimas improvisadas.
            </p>
            <p>
              Otro certamen emblemático de la improvisación fue ganado por Leandro en 2010: el concurso de repentismo Francisco Pereira, organizado por la Casa Naborí, de Limonar, Matanzas. Es frecuente su participación en los encuentros de la Casa de la Décima Celestino García, en Pinar del Río, proyecto comunitario de referencia para el universo decimístico.
            </p>
            <p>
              Una nueva generación de poetas como él le ha obsequiado a la décima la merced de la improvisación sobre temas históricos y patrióticos. En 2019, en una seguidilla improvisada sobre la bandera cubana, dijo lo que todos los decimistas patriotas cubanos hubiéramos querido expresar. Su décima "La Bandera" es un ejemplo magistral de poesía patriótica improvisada que defiende los símbolos nacionales con profundo respeto:
            </p>
            <div className="pl-6 border-l-4 border-[#C8A05C] italic text-[#5C4033] my-3">
              <p>"Y no es que haya que adorarla</p>
              <p>en sustitución de un dios,</p>
              <p>es que hay que limpiar la voz</p>
              <p>de sombras para nombrarla.</p>
              <p>El que aprende a respetarla</p>
              <p>sus orígenes no olvida,</p>
              <p>y allí está, firme y erguida</p>
              <p>donde el cubano la vea</p>
              <p>para que Cuba no sea</p>
              <p>traicionada ni ofendida"</p>
            </div>
            <p>
              Ha demostrado también su dominio técnico en variantes difíciles del repentismo cubano, como la seguidilla al revés—sucesión de décimas en punto fijo que canta primero al derecho y luego al revés, en homenaje implícito a Alejo Carpentier, autor de "Viaje a la semilla". Su poesía combina el amor a la patria con una técnica impecable y profundidad emocional.
            </p>
          </div>
        );

      case "Oniesis Gil":
        return (
          <div className="space-y-4">
            <h4 className="text-xl font-bold text-[#C8A05C] font-serif">
              Oniesis Gil: Elevación de la Improvisación
            </h4>
            <p>
              Oniesis Gil, poeta improvisador conocido por su estilo único y profunda conexión con la cultura popular, es destacado poeta improvisador (repentista) cubano que desarrolla su arte dentro de la tradición de la décima campesina y el repentismo. Forma parte de la nueva generación de poetas que han elevado la improvisación a niveles de excelencia.
            </p>
            <p>
              Junto a Yoslay García, constituyen no sólo la vanguardia del repentismo cubano de principio del siglo XXI, sino las voces más alzadas de la nueva generación. Ha compartido escenario con las principales figuras del repentismo cubano contemporáneo, incluyendo Juan Antonio Díaz, Luis Quintana y otros maestros.
            </p>
            <p>
              En una controversia memorable con Luis Quintana, Oniesis demostró su nivel extraordinario de improvisación. Los repentistas Luis Quintana y Oniesis Gil protagonizaron una encendida controversia en homenaje a la popular improvisadora cubana Tomasita Quiala, evidenciando su compromiso con la tradición y su capacidad de crear momentos memorables del repentismo contemporáneo.
            </p>
            <p>
              Su estilo se caracteriza por una profunda conexión con las raíces de la tradición oral cubana, combinada con innovación técnica y capacidad de sorprender al público con construcciones poéticas de gran originalidad.
            </p>
          </div>
        );

      case "Manuel Soriano":
        return (
          <div className="space-y-4">
            <h4 className="text-xl font-bold text-[#C8A05C] font-serif">
              Manuel Soriano (1947-presente): Cronista Diario del Exilio
            </h4>
            <p>
              Manuel Soriano nació el 5 de mayo de 1947 en Bejucal, La Habana. Desde 1986 reside en Miami, donde se ha consolidado como una de las figuras más activas del repentismo en el exilio. Poeta repentista y decimista, su iniciación en la poesía comenzó a los siete años cuando recitó "Los zapaticos de rosa" de José Martí en su escuela el 28 de enero de 1954, en el 101 aniversario del nacimiento del Apóstol.
            </p>
            <p>
              Cuenta con varias producciones discográficas como <em>Cubanos en Canarias</em>, <em>Enlace con el recuerdo</em> y <em>Encuentro para la Historia</em>. En el campo literario ha publicado cinco volúmenes notables: <em>Vivencias</em> (1999), poesía en diversas métricas—décima, romance, soneto, sonetillo, aguinaldo; <em>Magia del Juego de Damas</em> (2001), sobre la historia del juego; <em>Quinientos Setenta y Nueve</em> (2003), libro de redondillas filosóficas; <em>Mis Guantanameras</em> (2005), con 700 décimas sobre noticias diarias; y <em>Noticias Rimadas</em> (2007), con 768 décimas narrando eventos cronológicos mundiales.
            </p>
            <p>
              Desde el otoño de 2003 escribe diariamente las décimas de las guantanameras para un popular programa de televisión local, estableciendo una práctica única de crónica poética cotidiana. Es muy activo en el programa <em>Clave Guajira</em> del canal 41 América TV en Miami. Ha compartido controversias con Jesús Lazo, Pablo León, Guillermo Sosa Curbelo, Efraín Riverón, Asael Díaz "Candelita", Juan Antonio Díaz, Oniesis Gil y muchos otros maestros.
            </p>
            <p>
              En 1982 fue encarcelado como preso político por una décima dedicada a los presos políticos cubanos: "Cargan tras las rejas su condena / el afán de ser libres es la pena / de los presos políticos cubanos". Este episodio evidencia que la forma poética puede portar contenido político sin perder altura literaria, transformando la décima en testimonio de resistencia.
            </p>
            <p>
              Su voz timbrada, gran velocidad y estilo agresivo lo han convertido en uno de los repentistas más respetados tanto en Cuba como en Estados Unidos. Su obra constituye crónica viviente del exilio cubano, documentando en décimas la experiencia de una comunidad separada de su patria pero unida por la palabra poética.
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-[#C8A05C] mb-4 font-serif">
          🌴 Educación Histórica
        </h2>
        <p className="text-[#5C4033]/80 max-w-2xl mx-auto">
          Conoce la rica historia de la décima espinela, desde sus orígenes españoles 
          hasta su florecimiento en la tradición oral cubana.
        </p>
      </div>

      {/* Arquitectura Poética, Raíz Compartida */}
      <Card className="p-6 cuban-card">
        <div className="flex items-center gap-3 mb-4">
          <BookOpen className="w-6 h-6 text-[#D2691E]" />
          <h3 className="text-2xl font-bold text-[#C8A05C] font-serif">
            Arquitectura Poética, Raíz Compartida
          </h3>
        </div>
        <div className="text-[#5C4033] leading-relaxed space-y-4">
          <p>
            La décima espinela despliega diez versos octosílabos organizados según el esquema 
            <strong> ABBAACCDDC</strong>. Esta arquitectura, cristalizada por el poeta andaluz 
            <strong> Vicente Espinel</strong> en 1591 dentro de su obra <em>Diversas rimas</em>, 
            sostiene siglos de expresión lírica. Espinel no inventó la estrofa de diez versos—ya 
            circulaban "décimas primitivas" con estructuras variables—sino que codificó su forma 
            definitiva: pausa obligatoria tras el cuarto verso, cuatro rimas consonantes perfectamente 
            balanceadas. Músico además de poeta, Espinel comprendió el ritmo como sustancia viva: la 
            pausa central permite tanto respiración física como giro conceptual, transformando diez 
            líneas en conversación interna entre planteamiento y resolución.
          </p>
          <p>
            La estructura revela simetría orgánica. <strong>Primera cuarteta (ABBA)</strong>: 
            presentación del tema, semilla conceptual. <strong>Versos centrales (AC)</strong>: 
            bisagra donde el pensamiento pivota, unidos por encabalgamiento que completa en el sexto 
            verso la idea iniciada en el quinto. <strong>Segunda cuarteta (CDDC)</strong>: culminación, 
            cierre que resuena. Esta geometría habilita tanto meditación pausada como improvisación 
            brillante—flexibilidad que explica su perdurabilidad a través de cinco siglos y dos continentes.
          </p>
        </div>
      </Card>

      {/* Florecimiento Español: Del Creador a los Maestros */}
      <Card className="p-6 cuban-card">
        <div className="flex items-center gap-3 mb-4">
          <Crown className="w-6 h-6 text-[#D2691E]" />
          <h3 className="text-2xl font-bold text-[#C8A05C] font-serif">
            Florecimiento Español: Del Creador a los Maestros
          </h3>
        </div>
        <div className="text-[#5C4033] leading-relaxed space-y-4">
          <p>
            <strong>Lope de Vega</strong> descubrió la espinela entre la obra de Espinel, la ponderó 
            como "dulce y sonora", le otorgó nombre permanente y la insertó en el Parnaso español. Esta 
            consagración por el "Fénix de los ingenios" convirtió la décima en la estrofa octosilábica 
            más practicada del Siglo de Oro. Lo que el soneto representó para el verso largo, la espinela 
            lo fue para el corto: proporciones simétricas, eficacia tanto como unidad suelta como en serie.
          </p>
          <p>
            <strong>Calderón de la Barca, Góngora, Quevedo, Cervantes</strong>—los colosos literarios del 
            siglo XVII adoptaron la forma. La décima fluyó simultáneamente en poesía culta y popular, en 
            teatro y certámenes públicos donde competían "glosas en ocasión de festividades". Esta doble 
            ciudadanía—aristocrática y plebeya—estableció versatilidad fundacional: la espinela no pertenecía 
            a clase social específica sino a quienes dominaban su técnica.
          </p>
        </div>
      </Card>

      {/* Travesía Atlántica: Semilla en Nuevo Suelo */}
      <Card className="p-6 cuban-card">
        <div className="flex items-center gap-3 mb-4">
          <Users className="w-6 h-6 text-[#D2691E]" />
          <h3 className="text-2xl font-bold text-[#C8A05C] font-serif">
            Travesía Atlántica: Semilla en Nuevo Suelo
          </h3>
        </div>
        <div className="text-[#5C4033] leading-relaxed space-y-5">
          <div>
            <h4 className="font-semibold text-[#D2691E] mb-3 text-lg">
              🏛️ Primer Registro Americano (1608)
            </h4>
            <p>
              <strong>Silvestre de Balboa</strong>, canario radicado en Cuba, compuso en 1608 
              <em>Espejo de paciencia</em>, primer poema épico de la literatura cubana. La obra narra 
              el secuestro del Obispo de Cuba Juan de las Cabezas Altamirano cerca de Bayamo. Este 
              registro inaugural marca presencia temprana de la décima en suelo americano, portada por 
              emigrantes peninsulares e insulares canarios que traían la forma métrica en su equipaje 
              cultural invisible pero permanente.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-[#D2691E] mb-3 text-lg">
              🌾 Consolidación Campesina (Siglo XVIII)
            </h4>
            <p>
              Durante el siglo XVIII, la inmigración canaria intensificada depositó la décima en el campo 
              cubano. Los emigrantes canarios "trajeron a Cuba la forma de cantar décimas", donde se 
              estableció como <strong>punto guajiro</strong>—género netivamente cubano que fusionó métrica 
              española con sensibilidad criolla. El campesinado adoptó la espinela como continente natural 
              para su cosmovisión: lamentos, celebraciones, sátiras, filosofía rural encontraron expresión 
              en diez versos.
            </p>
            <p className="mt-3">
              <strong>Juan Cristóbal Nápoles Fajardo, el Cucalambé</strong> (1829-1862), cubanizó 
              definitivamente la décima al adaptarla "como continente estético al contenido de lo identitario 
              cubano". Su poemario <em>Rumores del Hórmigo</em> (1857) demostró "simbiosis efectiva, sin 
              fracturas, de lo popular y lo culto". El Cucalambé no despertó epígonos entre poetas cultos 
              posteriores, pero su legado arraigó en el pueblo, donde sí encontró continuadores que 
              desarrollaron sus líneas expresivas. Fue "la voz del campesino que nos constituyó medularmente 
              como pueblo", estableciendo la décima como <strong>"Mágica Estrofa Nacional"</strong>.
            </p>
          </div>
        </div>
      </Card>

      {/* Evolución Cultural */}
      <Card className="p-6 cuban-card">
        <div className="flex items-center gap-3 mb-4">
          <Award className="w-6 h-6 text-[#D2691E]" />
          <h3 className="text-2xl font-bold text-[#C8A05C] font-serif">
            Evolución Cultural: De lo Escrito a lo Oral, de lo Rural a lo Urbano
          </h3>
        </div>
        <div className="text-[#5C4033] leading-relaxed space-y-4">
          <p>
            La décima transitó desde poesía culta escrita hacia improvisación oral rural, manteniendo 
            vitalidad en ambos registros. Esta transformación la convirtió en puente entre clases sociales 
            y geografías: la misma forma que Calderón pulía en palacios madrileños resonaba en bohíos 
            cubanos, adaptada por campesinos que jamás leyeron a Espinel pero dominaban su arquitectura 
            como lengua materna.
          </p>
          <p>
            El <strong>repentismo</strong>—improvisación de décimas en competencia—se consolidó como arte 
            nacional cubano. Repentistas como Pedro Guerra, Chanito Isidrón, Guillermo Sosa alcanzaron 
            estatura mítica en controversias donde la agilidad mental, dominio métrico y agudeza conceptual 
            se enfrentaban ante públicos fervientes. La controversia se estructura como "diálogo amebeo, 
            discurso dialéctico entre dos improvisadores", donde cada poeta debe responder al contrario 
            incorporando <strong>pies forzados</strong>—versos ajenos que deben cerrar su décima improvisada, 
            exigiendo maestría técnica y edición mental instantánea.
          </p>
        </div>
      </Card>

      {/* Modernización Masiva (Siglo XX) */}
      <Card className="p-6 cuban-card bg-gradient-to-r from-[#F5E6D3] to-[#E6D7C1]">
        <div className="flex items-center gap-3 mb-4">
          <div className="text-3xl">📻</div>
          <h3 className="text-2xl font-bold text-[#C8A05C] font-serif">
            Modernización Masiva (Siglo XX)
          </h3>
        </div>
        <div className="text-[#5C4033] leading-relaxed space-y-4">
          <p>
            La radio transformó la décima de arte regional en fenómeno nacional. Programas como 
            <strong>"Competencia Nacional de Trovadores"</strong> (transmitido de 10 a 11 am) convirtieron 
            a repentistas en figuras nacionales. <strong>Jesús Orta Ruiz (Indio Naborí)</strong> y 
            <strong>Ángel Valiente</strong> protagonizaron la "Controversia del Siglo"—enfrentamiento que 
            "interesó tanto al pueblo" que se convirtió en evento cultural definidor de la década de 1950. 
            Estos dos poetas "son los más grandes repentistas cubanos del siglo XX, lo que equivale a decir, 
            posiblemente, que están entre los más grandes de la historia de la improvisación".
          </p>
          <p>
            Naborí y Valiente no solo demostraban virtuosismo: "glosaban la actualidad, daban un punto de 
            reflexión sobre los problemas del país, llamaban a la conciencia colectiva, elevaban la atención 
            cotidiana a niveles de visión poética". La décima radiofónica funcionaba simultáneamente como 
            entretenimiento, comentario social y educación poética para millones. Otros decimistas—Gustavo 
            Tacoronte, Sergio Mederos, Pablo León—participaron en emisoras como Cadena Azul, Radio Progreso, 
            Mil Diez, y espacios televisivos "Palmas y cañas" y "Meridiano campesino".
          </p>
          <p className="font-medium text-[#D2691E]">
            Esta masificación mediática no diluyó complejidad técnica sino la democratizó: oyentes aprendían 
            a reconocer excelencia en tiempo real, apreciando cómo un repentista "debe encontrar el punto 
            necesario de donde partir" para incorporar un pie forzado sin que "sea demasiado evidente el giro". 
            La radio creó audiencias sofisticadas capaces de discernir entre competencia rutinaria y genio 
            improvisado.
          </p>
        </div>
      </Card>

      {/* Presencia Latinoamericana */}
      <Card className="p-6 cuban-card">
        <div className="flex items-center gap-3 mb-4">
          <div className="text-3xl">🌎</div>
          <h3 className="text-2xl font-bold text-[#C8A05C] font-serif">
            Presencia Latinoamericana
          </h3>
        </div>
        <div className="text-[#5C4033] leading-relaxed space-y-4">
          <p>
            La décima no es exclusivamente cubana aunque Cuba la cultive con intensidad singular. En 
            <strong>Panamá</strong>, las décimas se cantan en "cantaderas" (viernes, sábados, domingos) 
            acompañadas por guitarra española, violín, mejoranera y rabel. En <strong>Venezuela</strong>, 
            integran el folclor llanero con arpa, cuatro y bandola. <strong>México, Argentina, Chile, 
            Puerto Rico</strong> reclaman la forma como propia.
          </p>
          <p className="italic font-medium text-[#C8A05C]">
            El poeta canario Pedro Lezcano sintetiza esta propiedad compartida: "Aunque el poeta inventor / 
            fuera Vicente Espinel, / la décima ya no es de él, / sino del pueblo cantor".
          </p>
        </div>
      </Card>

      {/* Legado Vivo */}
      <Card className="p-6 cuban-card bg-gradient-to-br from-[#C8A05C]/10 to-[#D2691E]/10">
        <div className="flex items-center gap-3 mb-4">
          <div className="text-3xl">✨</div>
          <h3 className="text-2xl font-bold text-[#C8A05C] font-serif">
            Legado Vivo
          </h3>
        </div>
        <div className="text-[#5C4033] leading-relaxed space-y-4">
          <p>
            Cinco siglos después de que Espinel fijara su estructura, la décima fluye en tradición oral 
            de millones que jamás leyeron <em>Diversas rimas</em> pero internalizaron su geometría como 
            respiración. Poetas profesionales y campesinos improvisadores, académicos y repentistas 
            callejeros comparten dominio de la misma arquitectura—diez versos que contienen universos. 
            La forma persiste porque cumple función dual: permite tanto elaboración artística culta como 
            expresión popular inmediata, sirve página impresa y escenario improvisado, sostiene meditación 
            solitaria y competencia pública.
          </p>
          <p className="font-medium text-[#D2691E] text-center text-lg mt-6">
            La décima espinela demuestra que complejidad técnica y accesibilidad popular no se oponen. 
            Rigor y espontaneidad. Tradición española y apropiación americana. Escritura erudita e 
            improvisación oral. <strong>Ambas. Siempre ambas.</strong>
          </p>
        </div>
      </Card>

      {/* Maestros de la Décima */}
      <Card className="p-6 cuban-card">
        <div className="flex items-center gap-3 mb-6">
          <Award className="w-6 h-6 text-[#D2691E]" />
          <h3 className="text-2xl font-bold text-[#C8A05C] font-serif">
            Maestros de la Décima: Voces que Construyen Tradición
          </h3>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {historicalFigures.map((poet, index) => (
            <div key={index} className="border-l-4 border-[#D2691E] pl-4 py-2">
              <button
                onClick={() => setExpandedPoet(expandedPoet === poet ? null : poet)}
                className="font-semibold text-[#5C4033] hover:text-[#C8A05C] transition-colors duration-200 text-left"
              >
                🌴 {poet}
                <span className="ml-1 text-[#D2691E] font-bold text-lg">*</span>
              </button>
            </div>
          ))}
        </div>

        {/* Biografía Expandible */}
        {expandedPoet && (
          <div className="mt-6 p-6 bg-[#F5E6D3] border-2 border-[#C8A05C] rounded-lg text-sm leading-relaxed animate-in fade-in duration-300">
            {getPoetBiography(expandedPoet)}
            
            <button
              onClick={() => setExpandedPoet(null)}
              className="mt-6 px-4 py-2 bg-[#C8A05C] text-white rounded hover:bg-[#D2691E] transition-colors duration-200"
            >
              Cerrar
            </button>
          </div>
        )}
      </Card>

      {/* Momentos de Excelencia: La Décima en su Esplendor */}
      <Card className="p-6 cuban-card bg-gradient-to-r from-[#F5E6D3] to-[#E6D7C1]">
        <div className="flex items-center gap-3 mb-4">
          <div className="text-3xl">⭐</div>
          <h3 className="text-2xl font-bold text-[#C8A05C] font-serif">
            Momentos de Excelencia: La Décima en su Esplendor
          </h3>
        </div>
        <div className="text-[#5C4033] leading-relaxed space-y-4">
          <div>
            <h4 className="font-semibold text-[#D2691E] mb-3 text-lg flex items-center gap-2">
              <Badge className="bg-[#D2691E] text-white px-3 py-1">1955</Badge>
              Cuando el Arte Encontró su Voz
            </h4>
            <p>
              San Antonio de los Baños presenció algo extraordinario. <strong>El Indio Naborí</strong> y 
              <strong>Angelito Valiente</strong> transformaron el aire en arquitectura verbal, construyendo 
              estrofas que desafiaban la gravedad del tiempo. Sus controversias radiadas no transmitían 
              simplemente versos: irradiaban maestría, tejían conexión humana a través de ondas electromagnéticas, 
              sembraban estándares que aún florecen en la memoria colectiva.
            </p>
            <p className="mt-3">
              Estos duelos poéticos representaron la síntesis perfecta entre tradición heredada y genio individual. 
              Dos artistas, un formato ancestral, infinitas posibilidades. Las palabras fluían con la urgencia del 
              relámpago y la precisión del cirujano. Cuba entera escuchaba, respiraba al ritmo de las décimas, 
              participaba en un ritual que hacía del espectador un testigo de excelencia.
            </p>
          </div>
        </div>
      </Card>

      {/* Cincuenta y Dos Segundos: Arquitectura Contra el Reloj */}
      <Card className="p-6 cuban-card">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-[#D2691E] rounded-full flex items-center justify-center text-white font-bold text-lg">
            52"
          </div>
          <h3 className="text-2xl font-bold text-[#C8A05C] font-serif">
            Cincuenta y Dos Segundos: Arquitectura Contra el Reloj
          </h3>
        </div>
        <div className="text-[#5C4033] leading-relaxed space-y-4">
          <p>
            La décima perfecta emerge en <strong>52 segundos</strong>. Menos de un minuto para cristalizar 
            pensamiento en forma, emoción en estructura, espontaneidad en permanencia.
          </p>
          <p>
            Imagina el proceso: el decimista navega simultáneamente múltiples corrientes. Debe honrar la 
            métrica octosílaba sin sacrificar naturalidad. Debe tejer rimas consonantes mientras mantiene 
            coherencia temática. Debe alcanzar belleza sin perder autenticidad. Todo esto mientras el cronómetro 
            corre, implacable testigo de una proeza que fusiona velocidad mental con profundidad artística.
          </p>
          <p>
            Esta hazaña no es mera acrobacia verbal. Es demostración de que las restricciones no limitan la 
            creatividad: la catalizan. El marco rígido de la décima, lejos de aprisionar la expresión, la 
            concentra hasta alcanzar densidad diamantina. Presión y tiempo transforman el carbón del pensamiento 
            ordinario en la gema de la expresión memorable.
          </p>
          <p className="font-medium text-[#D2691E]">
            Solo los maestros habitan este espacio donde técnica y arte se funden indistinguiblemente. Donde 
            la disciplina rigurosa habilita la libertad verdadera. Donde la velocidad no compromete la calidad, 
            sino que la intensifica.
          </p>
        </div>
      </Card>

      {/* UNESCO 2012: El Reconocimiento Universal */}
      <Card className="p-6 cuban-card bg-gradient-to-br from-[#C8A05C]/10 to-[#D2691E]/10">
        <div className="flex items-center gap-3 mb-4">
          <div className="text-3xl">🏛️</div>
          <h3 className="text-2xl font-bold text-[#C8A05C] font-serif">
            UNESCO 2012: El Reconocimiento Universal
          </h3>
        </div>
        <div className="text-[#5C4033] leading-relaxed space-y-4">
          <p>
            Cuando la <strong>UNESCO inscribió la décima como Patrimonio Cultural Inmaterial de la Humanidad</strong>, 
            no celebraba simplemente una forma poética. Reconocía un ecosistema cultural vivo, respirante, que 
            atraviesa siglos sin perder vitalidad.
          </p>
          <p>
            La décima funciona como puente múltiple. Conecta épocas: Espinela en el Siglo de Oro español dialoga 
            con decimistas contemporáneos en plazas latinoamericanas. Conecta estratos sociales: la misma estructura 
            que refinan los eruditos la dominan los improvisadores populares en festivales rurales. Conecta 
            modalidades: la palabra escrita coexiste con la improvisación oral, cada una enriqueciendo la otra.
          </p>
          <p>
            Este reconocimiento valida una verdad fundamental: ciertas formas artísticas contienen sabiduría sobre 
            lo humano que trasciende contextos particulares. La décima porta códigos de identidad hispanoamericana 
            mientras permanece accesible a cualquier cultura que valore la precisión, la belleza y la memoria colectiva.
          </p>
          <p className="font-medium text-[#D2691E] italic">
            La décima vive. No como reliquia museística, sino como organismo que evoluciona sin traicionar su 
            esencia. Tradición y renovación. Rigor y libertad. Ambas. Siempre ambas.
          </p>
          <p className="mt-4">
            Cada décima compuesta reactiva conexiones ancestrales mientras forja caminos nuevos. Cada improvisador 
            que enfrenta el desafío de los 52 segundos honra a Naborí y Valiente mientras crea algo único, 
            irrepetible, suyo. Esta paradoja productiva—fidelidad absoluta al pasado que genera innovación 
            constante—explica por qué la décima no solo sobrevive: <strong>prospera</strong>.
          </p>
        </div>
      </Card>
    </div>
  );
}

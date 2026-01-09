"use client";

import { PoetsCompendium } from "./poets-compendium";

export function EducationSection() {
  return (
    <div className="space-y-8 pb-12" style={{ backgroundColor: "#F5E6D3" }}>
      <div className="container max-w-4xl py-8 px-4">
        <h2
          className="text-3xl font-serif font-bold mb-8 flex items-center gap-2"
          style={{ color: "#C8A05C" }}
        >
          🎓 Educación Histórica
        </h2>

        <p className="text-center mb-8" style={{ color: "#5C4033" }}>
          Conoce la rica historia de la décima espinela, desde sus orígenes
          españoles hasta su florecimiento en la tradición oral cubana.
        </p>

        <div className="mb-8 border-l-4 pl-6" style={{ borderColor: "#C8A05C" }}>
          <h3
            className="text-2xl font-bold font-serif mb-4 flex items-center gap-2"
            style={{ color: "#C8A05C" }}
          >
            📖 Arquitectura Poética, Raíz Compartida
          </h3>
          <p className="mb-4" style={{ color: "#5C4033" }}>
            La décima espinela despliega diez versos octosílabos organizados
            según el esquema <strong>ABBAACCDDC</strong>. Esta arquitectura,
            cristalizada por el poeta andaluz <strong>Vicente Espinel</strong> en
            1591 dentro de su obra <em>Diversas rimas</em>, sostiene siglos de
            expresión lírica.
          </p>
          <p style={{ color: "#5C4033" }}>
            La décima llegó a América con la colonización española y echó raíces
            en Cuba, donde se convirtió en la forma poética preferida para la
            improvisación.
          </p>
        </div>

        <div className="mb-8 border-l-4 pl-6" style={{ borderColor: "#C8A05C" }}>
          <h3
            className="text-2xl font-bold font-serif mb-4 flex items-center gap-2"
            style={{ color: "#C8A05C" }}
          >
            🇨🇺 Raíces Cubanas: De España al Campo Cubano
          </h3>
          <p className="mb-4" style={{ color: "#5C4033" }}>
            La décima espinela llegó a Cuba en el siglo XVII, traída por colonos
            españoles, especialmente canarios. Los guajiros adoptaron esta
            forma poética y la hicieron suya.
          </p>
          <p style={{ color: "#5C4033" }}>
            <strong>Jesús Rodríguez "El Cucalamb"</strong> (1829-1902) es
            considerado el padre de la décima cubana moderna.
          </p>
        </div>

        <div className="mb-8 border-l-4 pl-6" style={{ borderColor: "#C8A05C" }}>
          <h3
            className="text-2xl font-bold font-serif mb-4 flex items-center gap-2"
            style={{ color: "#C8A05C" }}
          >
            ⚡ El Repentismo: Arte de la Improvisación
          </h3>
          <p className="mb-4" style={{ color: "#5C4033" }}>
            El <strong>repentismo</strong> es el arte de improvisar décimas en
            vivo, respondiendo a temas propuestos por el público o a desafíos de
            otros poetas.
          </p>
          <p style={{ color: "#5C4033" }}>
            Los <strong>decimistas</strong> crean décimas perfectas en cuestión
            de segundos, manteniendo la estructura ABBAACCDDC mientras responden
            a temas complejos.
          </p>
        </div>

        <div
          className="mb-8 p-6 rounded-lg border-2"
          style={{ backgroundColor: "#FEF3C7", borderColor: "#C8A05C" }}
        >
          <h3
            className="text-2xl font-bold font-serif mb-4 flex items-center gap-2"
            style={{ color: "#C8A05C" }}
          >
            ⚡ Momento Cumbre 1955
          </h3>
          <p className="mb-4" style={{ color: "#5C4033" }}>
            El <strong>28 de agosto de 1955</strong>, más de{" "}
            <strong>diez mil personas</strong> llenaron el estadio Campo Armada
            para presenciar la revancha entre <strong>El Indio Naborí</strong> y{" "}
            <strong>Angelito Valiente</strong>.
          </p>
          <blockquote
            className="border-l-4 pl-4 italic my-4"
            style={{ borderColor: "#D97706", color: "#5C4033" }}
          >
            "Pongan ahí un cuarto jurado: yo mismo, que voto por Nabor."
          </blockquote>
        </div>

        <div className="mb-8 border-l-4 pl-6" style={{ borderColor: "#C8A05C" }}>
          <h3
            className="text-2xl font-bold font-serif mb-4 flex items-center gap-2"
            style={{ color: "#C8A05C" }}
          >
            🎯 Proeza Técnica: El Desafío de los 52 Segundos
          </h3>
          <p className="mb-4" style={{ color: "#5C4033" }}>
            Componer una décima perfecta en menos de un minuto requiere:
          </p>
          <ul className="list-none space-y-2 mb-4" style={{ color: "#5C4033" }}>
            <li>✅ <strong>Métrica octosílaba correcta</strong></li>
            <li>✅ <strong>Rima consonante ABBAACCDDC impecable</strong></li>
            <li>✅ <strong>Coherencia temática y narrativa</strong></li>
            <li>✅ <strong>TODO en menos de 60 segundos</strong></li>
          </ul>
          <p className="font-bold" style={{ color: "#D97706" }}>
            Solo los maestros lo logran.
          </p>
        </div>

        <div
          className="mb-8 p-6 rounded-lg border-2"
          style={{ backgroundColor: "#D1FAE5", borderColor: "#10B981" }}
        >
          <h3
            className="text-2xl font-bold font-serif mb-4 flex items-center gap-2"
            style={{ color: "#059669" }}
          >
            🌍 Patrimonio Cultural Inmaterial de la Humanidad
          </h3>
          <p className="mb-4" style={{ color: "#5C4033" }}>
            En <strong>2012</strong>, la <strong>UNESCO</strong> reconoció la
            décima cubana como Patrimonio Cultural Inmaterial de la Humanidad.
          </p>
          <ul className="list-none space-y-2" style={{ color: "#5C4033" }}>
            <li>🎤 La tradición viva de la improvisación oral</li>
            <li>🌾 La preservación de la identidad cultural campesina</li>
            <li>👨‍👩‍👧‍👦 La transmisión intergeneracional del arte decimístico</li>
            <li>🌊 El puente cultural entre España y América Latina</li>
          </ul>
        </div>

        {/* Compendio de Poetas */}
        <PoetsCompendium />
      </div>
    </div>
  );
}

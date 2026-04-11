"use client";

import { PoetsCompendium } from "./poets-compendium";

export function EducationSection() {
  return (
    <div className="space-y-12 pb-12" style={{ backgroundColor: "#F5E6D3" }}>
      <div className="container max-w-5xl py-12 px-6">
        <h2
          className="text-4xl font-serif font-bold mb-12 flex items-center justify-center gap-3 border-b-2 border-[#C8A05C]/30 pb-4"
          style={{ color: "#C8A05C" }}
        >
          🎓 Educación Histórica: El Arraigo de la Palabra
        </h2>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Arquitectura Poética, Raíz Compartida */}
          <section className="p-6 bg-white/50 rounded-lg border-l-4 shadow-sm" style={{ borderColor: "#C8A05C" }}>
            <h3 className="text-2xl font-bold font-serif mb-4" style={{ color: "#C8A05C" }}>
              📖 Arquitectura Poética, Raíz Compartida
            </h3>
            <p className="leading-relaxed mb-4" style={{ color: "#5C4033" }}>
              La décima espinela es una estructura de <strong>diez versos octosílabos</strong> con un esquema de rima rígido: <strong>ABBAACCDDC</strong>. Esta arquitectura fue cristalizada por el poeta, músico y sacerdote malagueño <strong>Vicente Espinel</strong> en 1591, dentro de su obra <em>Diversas rimas</em>.
            </p>
            <p className="leading-relaxed" style={{ color: "#5C4033" }}>
              Lo que comenzó como una innovación del Siglo de Oro español se convirtió en la piedra angular de la poesía popular iberoamericana, donde la "espinela" encontró en el habla del pueblo su verdadero destino.
            </p>
          </section>

          {/* Travesía Atlántica y Arraigo Cubano */}
          <section className="p-6 bg-white/50 rounded-lg border-l-4 shadow-sm" style={{ borderColor: "#C8A05C" }}>
            <h3 className="text-2xl font-bold font-serif mb-4" style={{ color: "#C8A05C" }}>
              🚢 Travesía Atlántica y Arraigo Cubano
            </h3>
            <p className="leading-relaxed mb-4" style={{ color: "#5C4033" }}>
              La décima cruzó el océano con los colonos españoles, pero en <strong>Cuba</strong> encontró una tierra única para florecer. Fueron los campesinos, especialmente los de origen canario, quienes adoptaron la estrofa y la adaptaron al ritmo del campo.
            </p>
            <p className="leading-relaxed" style={{ color: "#5C4033" }}>
              A diferencia de otras regiones donde la décima se recita o escribe, en Cuba se canta a través del <strong>Punto cubano</strong>, fusionando la métrica española con la cadencia guajira, creando un arte que es a la vez oral, musical y poético.
            </p>
          </section>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Propiedad Panamericana */}
          <section className="p-6 bg-white/50 rounded-lg border-l-4 shadow-sm" style={{ borderColor: "#C8A05C" }}>
            <h3 className="text-2xl font-bold font-serif mb-4" style={{ color: "#C8A05C" }}>
              🌎 Propiedad Panamericana
            </h3>
             <p className="leading-relaxed mb-4" style={{ color: "#5C4033" }}>
              Aunque con diferentes nombres—payada en Argentina y Uruguay, galerón en Venezuela, o decimistas en México y Panamá—la espinela es el <strong>idioma poético común</strong> de todo el continente.
            </p>
            <p className="leading-relaxed" style={{ color: "#5C4033" }}>
              Es la forma en que los pueblos americanos han procesado su historia, sus dolores y sus alegrías. Es una tradición panamericana que une a millones de voces en una sola estructura métrica que ha resistido más de cuatro siglos.
            </p>
          </section>

          {/* Legado Vivo */}
          <section className="p-6 bg-white/50 rounded-lg border-l-4 shadow-sm" style={{ borderColor: "#C8A05C" }}>
            <h3 className="text-2xl font-bold font-serif mb-4" style={{ color: "#C8A05C" }}>
              🌿 Legado Vivo
            </h3>
            <p className="leading-relaxed mb-4" style={{ color: "#5C4033" }}>
              La décima no es una reliquia de museo; es un arte dinámico que se adapta a cada época. Hoy, el <strong>repentismo</strong> sigue vibrando en festivales, en la radio y ahora en formatos digitales.
            </p>
            <p className="leading-relaxed" style={{ color: "#5C4033" }}>
              Este software, <strong>Viajera Digital</strong>, es un puente tecnológico para este legado vivo, utilizando inteligencia artificial para transcribir y analizar el arte que antes solo quedaba en el aire o en grabaciones dispersas.
            </p>
          </section>
        </div>

        {/* Momentos de Excelencia: Naborí vs Valiente */}
        <div className="mb-12 p-8 rounded-xl border-2 shadow-lg" style={{ backgroundColor: "#FEF3C7", borderColor: "#C8A05C" }}>
          <h3 className="text-2xl font-bold font-serif mb-6 text-center" style={{ color: "#8B4513" }}>
            ⭐ Momentos de Excelencia: La Controversia del Siglo (1955)
          </h3>
          <p className="leading-relaxed mb-6 text-lg" style={{ color: "#5C4033" }}>
            El 28 de agosto de 1955 ocurrió un evento sin precedentes: más de <strong>diez mil personas</strong> llenaron el estadio Campo Armada en San Miguel del Padrón para ver a dos gigantes: <strong>Jesús Orta Ruiz "El Indio Naborí"</strong> y <strong>Angelito Valiente</strong>.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-white/40 rounded border border-[#C8A05C]/30 text-center italic">
              "Pongan ahí un cuarto jurado: yo mismo, que voto por Naborí."
              <p className="mt-2 not-italic font-bold text-sm">— Angelito Valiente</p>
            </div>
            <div className="flex items-center text-sm leading-relaxed" style={{ color: "#5C4033" }}>
              Este gesto de Valiente al reconocer la superioridad de su oponente tras horas de duelo cerró con broche de oro la mayor exhibición de repentismo masivo en la historia de Cuba.
            </div>
          </div>
        </div>

        {/* Cincuenta y Dos Segundos */}
        <div className="mb-12 border-l-8 pl-8" style={{ borderColor: "#D97706" }}>
          <h3 className="text-3xl font-bold font-serif mb-4" style={{ color: "#D97706" }}>
            🎯 Cincuenta y Dos Segundos
          </h3>
          <p className="text-lg leading-relaxed mb-4" style={{ color: "#5C4033" }}>
            Ese es el tiempo promedio aproximado que un maestro del repentismo necesita para concebir y cantar una décima perfecta de <strong>80 sílabas y 5 rimas obligatorias</strong>.
          </p>
          <ul className="grid md:grid-cols-2 gap-x-12 gap-y-4 text-[#5C4033] font-medium">
            <li className="flex items-center gap-2">🔹 Procesamiento cognitivo instantáneo</li>
            <li className="flex items-center gap-2">🔹 Métrica octosílaba sin errores</li>
            <li className="flex items-center gap-2">🔹 Rima consonante ABBAACCDDC</li>
            <li className="flex items-center gap-2">🔹 Coherencia narrativa impecable</li>
          </ul>
        </div>

        {/* UNESCO 2017 */}
        <div className="mb-12 p-8 rounded-xl border-2 text-center shadow-md" style={{ backgroundColor: "#D1FAE5", borderColor: "#10B981" }}>
          <h3 className="text-3xl font-bold font-serif mb-4" style={{ color: "#059669" }}>
            🌍 UNESCO 2017: Patrimonio del Mundo
          </h3>
          <p className="text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: "#065F46" }}>
            En diciembre de 2017, la UNESCO declaró el <strong>Punto cubano</strong> como Patrimonio Cultural Inmaterial de la Humanidad, reconociendo oficialmente lo que el pueblo cubano ha sabido por siglos: que esta música es el alma de una nación y un tesoro para toda la especie humana.
          </p>
        </div>

        {/* Compendio de Poetas */}
        <div className="mt-16 pt-16 border-t-2 border-[#C8A05C]/30">
          <PoetsCompendium />
        </div>
      </div>
    </div>
  );
}

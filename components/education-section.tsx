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
              La décima espinela despliega <strong>diez versos octosílabos</strong> organizados según el esquema <strong>ABBAACCDDC</strong>. Esta arquitectura, cristalizada por el poeta andaluz <strong>Vicente Espinel</strong> en 1591 dentro de su obra <em>Diversas rimas</em>, sostiene siglos de expresión lírica.
            </p>
            <p className="leading-relaxed" style={{ color: "#5C4033" }}>
              Espinel codificó su forma definitiva: pausa obligatoria tras el cuarto verso y cuatro rimas consonantes perfectamente balanceadas. La pausa central permite tanto la respiración física como el giro conceptual, transformando diez líneas en una conversación interna entre planteamiento y resolución.
            </p>
          </section>

          {/* Travesía Atlántica: Semilla en Nuevo Suelo */}
          <section className="p-6 bg-white/50 rounded-lg border-l-4 shadow-sm" style={{ borderColor: "#C8A05C" }}>
            <h3 className="text-2xl font-bold font-serif mb-4" style={{ color: "#C8A05C" }}>
              🚢 Travesía Atlántica: Semilla en Nuevo Suelo
            </h3>
            <p className="leading-relaxed mb-4" style={{ color: "#5C4033" }}>
              En 1608, <strong>Silvestre de Balboa</strong> compuso en Cuba <em>Espejo de paciencia</em>, el primer poema épico de la isla, marcando la presencia temprana de la décima en suelo americano.
            </p>
            <p className="leading-relaxed" style={{ color: "#5C4033" }}>
              Durante el siglo XVIII, la inmigración canaria depositó la décima en el campo cubano, donde se estableció como <strong>punto guajiro</strong>. El campesinado adoptó la espinela como continente natural para su cosmovisión: lamentos, celebraciones y filosofía rural encontraron expresión en diez versos.
            </p>
          </section>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* El Cucalambé y la Cubanización */}
          <section className="p-6 bg-white/50 rounded-lg border-l-4 shadow-sm" style={{ borderColor: "#C8A05C" }}>
            <h3 className="text-2xl font-bold font-serif mb-4" style={{ color: "#C8A05C" }}>
              🌎 El Cucalambé: Cubanización Definitiva
            </h3>
            <p className="leading-relaxed mb-4" style={{ color: "#5C4033" }}>
              <strong>Juan Cristóbal Nápoles Fajardo</strong> cubanizó definitivamente la décima al adaptarla como continente estético al contenido de lo identitario cubano. Su obra es la voz del campesino que nos constituyó medularmente como pueblo.
            </p>
            <p className="leading-relaxed" style={{ color: "#5C4033" }}>
              La décima fluyó simultáneamente en la poesía culta y popular. La espinela no pertenecía a una clase social específica, sino a quienes dominaban su técnica, desde los palacios madrileños hasta los bohíos cubanos.
            </p>
          </section>

          {/* Legado Vivo y Repentismo */}
          <section className="p-6 bg-white/50 rounded-lg border-l-4 shadow-sm" style={{ borderColor: "#C8A05C" }}>
            <h3 className="text-2xl font-bold font-serif mb-4" style={{ color: "#C8A05C" }}>
              🌿 El Repentismo: Arte Nacional
            </h3>
            <p className="leading-relaxed mb-4" style={{ color: "#5C4033" }}>
              El repentismo—improvisación de décimas en competencia—se consolidó como arte nacional cubano. La controversia se estructura como un diálogo dialéctico donde cada poeta debe responder al contrario incorporando pies forzados con maestría técnica.
            </p>
            <p className="leading-relaxed" style={{ color: "#5C4033" }}>
              La radio transformó la décima en fenómeno masivo, democratizando la complejidad técnica. Los oyentes aprendían a reconocer la excelencia en tiempo real, apreciando cómo un repentista incorpora un verso ajeno sin que se note el giro.
            </p>
          </section>
        </div>

        {/* Momentos de Excelencia: Naborí vs Valiente */}
        <div className="mb-12 p-8 rounded-xl border-2 shadow-lg" style={{ backgroundColor: "#FEF3C7", borderColor: "#C8A05C" }}>
          <h3 className="text-2xl font-bold font-serif mb-6 text-center" style={{ color: "#8B4513" }}>
            ⭐ Momentos de Excelencia: La Controversia del Siglo (1955)
          </h3>
          <p className="leading-relaxed mb-6 text-lg" style={{ color: "#5C4033" }}>
            El 28 de agosto de 1955, más de <strong>diez mil personas</strong> presenciaron en el estadio Campo Armada de San Miguel del Padrón el duelo entre <strong>Jesús Orta Ruiz "El Indio Naborí"</strong> y <strong>Angelito Valiente</strong>.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-white/40 rounded border border-[#C8A05C]/30 text-center italic">
              "Pongan ahí un cuarto jurado: yo mismo, que voto por Naborí."
              <p className="mt-2 not-italic font-bold text-sm">— Angelito Valiente</p>
            </div>
            <div className="flex items-center text-sm leading-relaxed" style={{ color: "#5C4033" }}>
              Naborí y Valiente no solo demostraban virtuosismo: glosaban la actualidad, llamaban a la conciencia colectiva y elevaban la atención cotidiana a niveles de visión poética.
            </div>
          </div>
        </div>

        {/* UNESCO 2017 */}
        <div className="mb-12 p-8 rounded-xl border-2 text-center shadow-md" style={{ backgroundColor: "#D1FAE5", borderColor: "#10B981" }}>
          <h3 className="text-3xl font-bold font-serif mb-4" style={{ color: "#059669" }}>
            🌍 UNESCO 2017: Patrimonio del Mundo
          </h3>
          <p className="text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: "#065F46" }}>
            En diciembre de 2017, la UNESCO declaró el <strong>Punto cubano</strong> como Patrimonio Cultural Inmaterial de la Humanidad, reconociendo oficialmente lo que el pueblo cubano ha sabido por siglos: que esta música es el alma de una nación.
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

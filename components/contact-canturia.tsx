"use client"

import { Fleuron } from "./fleuron"

export function ContactCanturia() {
  return (
    <div className="contact-premium-stack">
      <section className="demo-card">
        <div className="demo-content">
          <p className="eyebrow">Demo visual</p>
          <h2>Listo para presentar</h2>
          <p>
            La experiencia está preparada para mostrar una canturía en formato visual:
            versos, selección poética, justificación y entrega final. El video definitivo
            se puede añadir cuando esté disponible.
          </p>
        </div>
      </section>

      <section className="vd-solicitar" id="contacto">
        <article className="vd-solicitar__card">
          <div className="vd-solicitar__fleuron" aria-hidden="true"><Fleuron /></div>
          <p className="vd-solicitar__eyebrow">Una canturía, conservada para siempre</p>
          <h2 className="vd-solicitar__title">Solicitar</h2>
          <div className="vd-solicitar__body">
            <p>
              Cada canturía se transcribe verso por verso y se entrega como un PDF o EPUB
              elegante, diseñado para conservarse toda la vida.
            </p>
            <p>
              Las décimas se transcriben verso por verso. Las cuatro mejores se escogen con
              su justificación poética. Todo presentado en tipografía sobria sobre un fondo
              sepia, listo para leer en cualquier dispositivo o imprimir si así lo prefiere.
            </p>
          </div>
          <a
            href="https://juanantoniodiaz.com/contacto"
            target="_blank"
            rel="noopener noreferrer"
            className="vd-solicitar__cta"
            aria-label="Solicitar una canturía"
          >
            Solicitar →
          </a>
          <p className="vd-solicitar__attrib"><em>Guajiro de Hialeah</em></p>
        </article>
      </section>
    </div>
  )
}

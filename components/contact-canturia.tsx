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

      <section className="contact-canturia" id="contacto">
        <Fleuron />
        <h2 className="contact-title">Una canturía, conservada para siempre</h2>
        <div className="contact-offer">
          <p className="offer-line">
            Cada canturía se transcribe verso por verso y se entrega como un PDF o EPUB
            elegante, diseñado para conservarse toda la vida.
          </p>
          <p className="offer-detail">
            Las décimas se transcriben verso por verso. Las cuatro mejores se escogen con
            su justificación poética. Todo presentado en tipografía sobria sobre un fondo
            sepia, listo para leer en cualquier dispositivo o imprimir si así lo prefiere.
          </p>
        </div>

        <div className="contact-cluster">
          <a href="https://juanantoniodiaz.com/contacto" target="_blank" rel="noopener noreferrer" className="cta-primary">
            Solicitar →
          </a>
          <p className="cta-attrib">
            <em>Guajiro de Hialeah</em>
          </p>
        </div>
      </section>
    </div>
  )
}

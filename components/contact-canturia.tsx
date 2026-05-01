"use client"

import { Fleuron } from "./fleuron"

export function ContactCanturia() {
  return (
    <section className="contact-canturia">
      <Fleuron />
      <h2 className="contact-title">Una canturía, conservada para siempre</h2>
      <p className="contact-lede">
        Cada canturía se transcribe verso por verso y se entrega como un PDF o EPUB elegante,
        diseñado para conservarse toda la vida.
      </p>
      <p className="contact-detail">
        Las décimas se transcriben verso por verso. Las cuatro mejores se escogen con su
        justificación poética. Todo presentado en tipografía sobria sobre un fondo sepia,
        listo para leer en cualquier dispositivo o imprimir si así lo prefiere.
      </p>
      <a href="#contact-form" className="contact-cta">Solicitar →</a>
      <p className="contact-attribution"><em>Guajiro de Hialeah</em></p>
    </section>
  )
}

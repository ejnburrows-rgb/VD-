"use client"

import { useState } from "react"
import { OrderModal } from "./order-modal"

export function ContactCanturia() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <section className="contact-canturia">
        <div className="contact-card">
          <span className="contact-fleuron" aria-hidden="true">❦</span>
          <span className="contact-eyebrow">
            Una canturía, conservada para siempre
          </span>
          <h2 className="contact-title">Ordene</h2>
          <div className="contact-body">
            <p>
              Cada canturía se transcribe verso por verso y se entrega como un
              PDF o EPUB elegante, diseñado para conservarse toda la vida.
            </p>
            <p>
              Las décimas se transcriben verso por verso. Las cuatro mejores
              se escogen con su justificación poética. Todo presentado en
              tipografía sobria sobre un fondo sepia, listo para leer en
              cualquier dispositivo o imprimir si así lo prefiere.
            </p>
          </div>
          <button
            type="button"
            className="contact-cta"
            onClick={() => setOpen(true)}
          >
            Ordene →
          </button>
          <p className="contact-attribution">
            <em>Guajiro de Hialeah</em>
          </p>
        </div>
      </section>

      <OrderModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}

export default ContactCanturia

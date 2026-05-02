"use client"

import { useState } from "react"

type OrderModalProps = {
  open: boolean
  onClose: () => void
}

export function OrderModal({ open, onClose }: OrderModalProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState("")

  if (!open) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("sending")
    setErrorMsg("")

    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.error ?? "No se pudo enviar la solicitud.")
      }

      setStatus("sent")
      setName("")
      setEmail("")
      setMessage("")
    } catch (err) {
      setStatus("error")
      setErrorMsg(err instanceof Error ? err.message : "Error desconocido.")
    }
  }

  return (
    <div
      className="order-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="order-modal-title"
    >
      <div className="order-modal" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="order-modal-close"
          onClick={onClose}
          aria-label="Cerrar"
        >
          ×
        </button>

        {status === "sent" ? (
          <div className="order-modal-success">
            <span className="order-modal-fleuron" aria-hidden="true">❦</span>
            <h2 id="order-modal-title" className="order-modal-title">
              Gracias
            </h2>
            <p>
              Su solicitud ha sido recibida. Le responderemos a su correo en
              las próximas horas con los detalles de su canturía.
            </p>
            <button
              type="button"
              className="order-modal-cta"
              onClick={onClose}
            >
              Cerrar
            </button>
          </div>
        ) : (
          <>
            <span className="order-modal-fleuron" aria-hidden="true">❦</span>
            <span className="order-modal-eyebrow">
              Una canturía, conservada para siempre
            </span>
            <h2 id="order-modal-title" className="order-modal-title">
              Ordene
            </h2>
            <p className="order-modal-dek">
              Déjenos su correo electrónico y le responderemos con los
              detalles de su canturía en formato PDF o EPUB.
            </p>

            <form className="order-form" onSubmit={handleSubmit}>
              <label className="order-form-field">
                <span className="order-form-label">Nombre</span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="order-form-input"
                  required
                  autoComplete="name"
                />
              </label>

              <label className="order-form-field">
                <span className="order-form-label">Correo electrónico</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="order-form-input"
                  required
                  autoComplete="email"
                />
              </label>

              <label className="order-form-field">
                <span className="order-form-label">Mensaje (opcional)</span>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="order-form-textarea"
                  rows={4}
                />
              </label>

              {status === "error" && (
                <p className="order-form-error">{errorMsg}</p>
              )}

              <button
                type="submit"
                className="order-form-submit"
                disabled={status === "sending"}
              >
                {status === "sending" ? "Enviando…" : "Enviar →"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

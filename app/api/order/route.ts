import { NextResponse } from "next/server"
import { Resend } from "resend"

export const dynamic = 'force-dynamic'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function escapeHtml(str: string): string {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

export async function POST(req: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  try {
    const body = await req.json().catch(() => null)

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Solicitud inválida." },
        { status: 400 },
      )
    }

    const name = typeof body.name === "string" ? body.name.trim() : ""
    const email = typeof body.email === "string" ? body.email.trim() : ""
    const message =
      typeof body.message === "string" ? body.message.trim() : ""

    if (!name || !email) {
      return NextResponse.json(
        { error: "Nombre y correo son requeridos." },
        { status: 400 },
      )
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: "Correo electrónico inválido." },
        { status: 400 },
      )
    }

    if (name.length > 200 || email.length > 320 || message.length > 4000) {
      return NextResponse.json(
        { error: "Datos demasiado largos." },
        { status: 400 },
      )
    }

    const to = process.env.ORDER_TO_EMAIL
    const from = process.env.ORDER_FROM_EMAIL ?? "onboarding@resend.dev"

    if (!to || !process.env.RESEND_API_KEY) {
      console.error("Missing ORDER_TO_EMAIL or RESEND_API_KEY env var")
      return NextResponse.json(
        { error: "Configuración del servidor incompleta." },
        { status: 500 },
      )
    }

    const html = `
      <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; padding: 32px; background: #f8edcf; color: #2a1a0d; border: 1px solid #b8893f;">
        <p style="text-align: center; color: #b8893f; letter-spacing: 0.3em; font-size: 11px; margin: 0 0 12px;">VIAJERA DIGITAL</p>
        <h1 style="text-align: center; font-size: 28px; margin: 0 0 24px; letter-spacing: -0.01em;">Nueva solicitud de canturía</h1>
        <hr style="border: none; border-top: 1px solid #b8893f; margin: 0 0 24px;" />
        <p style="margin: 0 0 8px;"><strong>Nombre:</strong> ${escapeHtml(name)}</p>
        <p style="margin: 0 0 8px;"><strong>Correo:</strong> ${escapeHtml(email)}</p>
        ${
          message
            ? `<p style="margin: 16px 0 0;"><strong>Mensaje:</strong></p><p style="margin: 8px 0 0; white-space: pre-wrap;">${escapeHtml(message)}</p>`
            : ""
        }
      </div>
    `

    const result = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `Nueva solicitud de canturía — ${name}`,
      html,
    })

    if (result.error) {
      console.error("Resend error:", result.error)
      return NextResponse.json(
        { error: "No se pudo enviar el correo." },
        { status: 500 },
      )
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("Order API error:", err)
    return NextResponse.json(
      { error: "Error interno del servidor." },
      { status: 500 },
    )
  }
}

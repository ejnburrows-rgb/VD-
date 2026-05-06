import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: 'El Guajiro de Hialeah | Transcriptor y Analizador de Décima Espinela Cubana',
  description: 'Plataforma de transcripción y análisis de décima espinela cubana. Preservando el patrimonio cultural cubano a través de la tecnología.',
  keywords: ['décima espinela', 'Cuba', 'poesía', 'repentismo', 'Calixto González', 'transcripción', 'AI', 'Groq', 'Gemini'],
  authors: [{ name: 'Emilio José Novo' }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`${inter.variable} font-sans`}>{children}</body>
    </html>
  )
}


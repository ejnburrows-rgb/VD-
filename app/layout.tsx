export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "El Guajiro de Hialeah | Transcriptor y Analizador de Décima Espinela Cubana",
  description: "Un algoritmo que siente la pasión del poeta, rescata del olvido cada improvisación, preserva intacta la lírica del corazón, y eterniza el arte vivo de la décima completa.",
  keywords: ['décima espinela', 'Cuba', 'poesía', 'repentismo', 'Calixto González', 'transcripción', 'AI', 'Groq', 'Gemini'],
  authors: [{ name: 'Emilio José Novo' }],
  openGraph: {
    title: "El Guajiro de Hialeah | Transcriptor y Analizador de Décima Espinela Cubana",
    description: "Un algoritmo que siente la pasión del poeta, rescata del olvido cada improvisación, preserva intacta la lírica del corazón, y eterniza el arte vivo de la décima completa.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "El Guajiro de Hialeah",
      },
    ],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.className} antialiased bg-[#F5E6D3] text-[#5C4033]`} suppressHydrationWarning>
        <a href="#main-content" className="skip-link">
          Saltar al contenido principal
        </a>
        {children}
      </body>
    </html>
  );
}


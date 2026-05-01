export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond, Lora } from "next/font/google";
import { PaperTexture } from "@/components/paper-texture";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400","700","900"],
  style: ["normal","italic"]
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["400","500","600","700"],
  style: ["normal","italic"]
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  weight: ["400","500","600"]
});

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
      <body className={`${playfair.variable} ${cormorant.variable} ${lora.variable} antialiased`} suppressHydrationWarning>
        <PaperTexture />
        {children}
      </body>
    </html>
  );
}


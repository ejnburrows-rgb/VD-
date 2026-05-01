import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { MainApp } from "@/components/main-app";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen tobacco-paper text-[var(--vd-ink-primary)]">
        <HeroSection />
        
        <div className="container max-w-4xl mx-auto px-4 py-12 flex justify-center">
          <blockquote className="decima-card p-8 italic shadow-md max-w-2xl w-full">
            <p className="whitespace-pre-wrap leading-relaxed text-lg mb-4 text-center">{`Hoy que te vas con la muerte
hacia una casa de cielo,
la sequía del pañuelo
en ríos se nos convierte.
Y aunque no podamos verte
jamás, en la canturía,
no existirá un solo día
que se hable de ejemplo de Hombre
que no se escuche tu nombre,
Guajiro de Hialeah.`}</p>
            <p className="font-semibold text-right mt-4">— Juan Antonio Díaz</p>
          </blockquote>
        </div>

        <MainApp />
      </main>
      <Footer />
    </>
  );
}


import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { MainApp } from "@/components/main-app";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen vintage-background">
        <HeroSection />
        <MainApp />
      </main>
      <Footer />
    </>
  );
}


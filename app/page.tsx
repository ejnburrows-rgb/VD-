import { Header } from '@/components/header'
import { HeroSection } from '@/components/hero-section'
import { TributeSection } from '@/components/tribute-section'
import { MainApp } from '@/components/main-app'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F5E6D3] flex flex-col">
      <Header />
      <HeroSection />
      <TributeSection />
      <MainApp />
      <Footer />
    </div>
  )
}


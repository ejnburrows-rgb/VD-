"use client"
import { TopNav } from "./top-nav"
import { HeroSection } from "./hero-section"
import { MemorialScroll } from "./memorial-scroll"
import { MemorialContent } from "./memorial-content"
import { ContactCanturia } from "./contact-canturia"
import { SiteFooter } from "./footer"

export function MainApp() {
  return (
    <main className="tobacco-paper">
      <div className="h-2 w-full cigar-band" />
      <TopNav />
      <HeroSection />
      <MemorialScroll>
        <MemorialContent />
      </MemorialScroll>
      <ContactCanturia />
      <SiteFooter />
    </main>
  )
}

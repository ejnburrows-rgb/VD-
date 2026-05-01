"use client"
import { TopNav } from "./top-nav"
import { MemorialScroll } from "./memorial-scroll"
import { MemorialContent } from "./memorial-content"
import { ContactCanturia } from "./contact-canturia"
import { SiteFooter } from "./footer"

export function MainApp() {
  return (
    <main className="tobacco-paper">
      <div className="h-2 w-full cigar-band" />
      <TopNav />
      <MemorialScroll>
        <MemorialContent />
      </MemorialScroll>
      <ContactCanturia />
      <SiteFooter />
    </main>
  )
}

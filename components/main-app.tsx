"use client"
import { TopNav } from "./top-nav"
import { MemorialScroll } from "./memorial-scroll"
import { ContactCanturia } from "./contact-canturia"
import { SiteFooter } from "./footer"

export function MainApp() {
  return (
    <main className="tobacco-paper">
      <div className="h-2 w-full cigar-band" />
      <TopNav />
      <MemorialScroll />
      <ContactCanturia />
      <SiteFooter />
    </main>
  )
}

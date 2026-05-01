"use client"
import { useState, useEffect } from "react"
import { TopNav } from "./top-nav"
import { MemorialScroll } from "./memorial-scroll"
import { ProcesarWorkspace } from "./procesar-workspace"
import { SiteFooter } from "./footer"

export function MainApp() {
  const [view, setView] = useState<"memoria" | "procesar">("memoria")
  
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash === "#procesar") setView("procesar")
  }, [])
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.location.hash = view === "procesar" ? "procesar" : ""
    }
  }, [view])
  
  return (
    <main className="tobacco-paper">
      <div className="h-2 w-full cigar-band" />
      <TopNav view={view} setView={setView} />
      {view === "memoria" ? <MemorialScroll onProcesar={() => setView("procesar")} /> : <ProcesarWorkspace onBack={() => setView("memoria")} />}
      <SiteFooter />
    </main>
  )
}

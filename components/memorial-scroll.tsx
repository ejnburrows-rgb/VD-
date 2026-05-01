"use client"

import { PaperTexture } from "./paper-texture"

export function MemorialScroll({ children }: { children: React.ReactNode }) {
  return (
    <div className="memorial-page">
      <div className="memorial-portrait-bg" aria-hidden="true" />
      <div className="memorial-scrim" aria-hidden="true" />
      <article className="memorial-hero">
        <PaperTexture />
        <div className="memorial-prose">{children}</div>
      </article>
    </div>
  )
}

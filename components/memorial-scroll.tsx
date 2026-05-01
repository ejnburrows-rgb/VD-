"use client"

import { PaperTexture } from "./paper-texture"
import Image from "next/image"

export function MemorialScroll({ children }: { children: React.ReactNode }) {
  return (
    <section className="memorial-section" id="memorial">
      <div className="memorial-portrait-bg" aria-hidden="true">
        <Image
          src="/calixto-gonzalez-hero.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="memorial-content">
        <article className="memorial-article">
          <PaperTexture />
          <div className="memorial-prose">{children}</div>
        </article>
      </div>
    </section>
  )
}

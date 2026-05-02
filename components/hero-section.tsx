"use client";

const CALIXTO_PORTRAIT_SRC: string | null = "/calixto-gonzalez-hero.jpg"; 

export function HeroSection() {
  return (
    <section className="vd-hero" aria-label="Viajera Digital — inicio">
      <div className="vd-hero__grid">
        <div>
          <span className="hero-eyebrow">Archivo</span>
          <h1 className="hero-title">Viajera Digital</h1>
          <p className="hero-subtitle">Archivo de la canturía cubana</p>
          <div className="hero-fleuron" aria-hidden="true">
            <span className="hero-fleuron-mark">❦</span>
          </div>

          <a
            className="hero-cta"
            href="https://juanantoniodiaz.com/contacto"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Solicitar una canturía"
          >
            Solicitar →
          </a>
        </div>

        <div>
          <div className="hero-portrait-frame">
            {CALIXTO_PORTRAIT_SRC ? (
              <img
                src={CALIXTO_PORTRAIT_SRC}
                alt="Calixto González — el Guajiro de Hialeah"
                loading="eager"
                decoding="async"
              />
            ) : (
              <div className="vd-hero__monogram" aria-hidden="true">CG</div>
            )}
          </div>
          <p className="hero-portrait-caption">
            Calixto González · el Guajiro de Hialeah
          </p>
        </div>
      </div>
    </section>
  );
}

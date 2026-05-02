"use client";

const CALIXTO_PORTRAIT_SRC: string | null = "/calixto-gonzalez-hero.jpg"; 

export function HeroSection() {
  return (
    <section className="vd-hero" aria-label="Viajera Digital — inicio">
      <div className="vd-hero__grid">
        <div>
          <h1 className="vd-hero__title">Viajera Digital</h1>
          <p className="vd-hero__subtitle">Archivo de la canturía cubana</p>

          <svg
            className="vd-hero__fleuron"
            viewBox="0 0 132 22"
            aria-hidden="true"
            focusable="false"
          >
            <g fill="currentColor">
              <path d="M0 11 H46" stroke="currentColor" strokeWidth="0.8" />
              <path d="M86 11 H132" stroke="currentColor" strokeWidth="0.8" />
              <path d="M66 4 C70 4 73 7 73 11 C73 15 70 18 66 18 C62 18 59 15 59 11 C59 7 62 4 66 4 Z M66 7 C68 7 70 9 70 11 C70 13 68 15 66 15 C64 15 62 13 62 11 C62 9 64 7 66 7 Z" />
              <circle cx="50" cy="11" r="1.4" />
              <circle cx="82" cy="11" r="1.4" />
            </g>
          </svg>

          <a
            className="vd-hero__cta"
            href="https://juanantoniodiaz.com/contacto"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Solicitar una canturía"
          >
            <span>Solicitar</span>
            <span aria-hidden="true">→</span>
          </a>
        </div>

        <div>
          <figure className="vd-hero__frame">
            {CALIXTO_PORTRAIT_SRC ? (
              <img
                className="vd-hero__portrait"
                src={CALIXTO_PORTRAIT_SRC}
                alt="Calixto González — el Guajiro de Hialeah"
                loading="eager"
                decoding="async"
              />
            ) : (
              <div className="vd-hero__monogram" aria-hidden="true">CG</div>
            )}
          </figure>
          <figcaption className="vd-hero__caption">
            Calixto González · el Guajiro de Hialeah
          </figcaption>
        </div>
      </div>
    </section>
  );
}

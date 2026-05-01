import { Fleuron } from "./fleuron"

const JUAN_ANTONIO_CONTACT_URL = "https://juanantoniodiaz.com/contacto"
const DEMO_VIDEO_SRC = "/canturia-demo.mp4"
const DEMO_VIDEO_POSTER = "/canturia-demo-poster.jpg"

export function ContactCanturia() {
  return (
    <section className="canturia-service">
      <div className="canturia-inner">
        <Fleuron />
        <h2 className="canturia-title">Una canturía, hecha a mano</h2>
        <p className="canturia-lede">
          Cada canturía se transcribe verso por verso, se imprime sobre papel envejecido por humo de tabaco, y se entrega en PDF para que dure toda la vida.
        </p>

        <figure className="demo-frame">
          <video
            className="demo-video"
            src={DEMO_VIDEO_SRC}
            poster={DEMO_VIDEO_POSTER}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="Demostración silenciosa de una canturía siendo convertida en PDF"
          />
          <figcaption className="demo-caption">Demostración — sonido apagado intencionalmente</figcaption>
        </figure>

        <div className="canturia-offer">
          <p className="offer-line">
            Si desea una canturía de YouTube convertida en un PDF elegante — para tenerla, leerla, regalarla — escríbanos.
          </p>
          <p className="offer-detail">
            Las décimas se transcriben verso por verso. Las cuatro mejores se escogen con su justificación poética. Todo impreso sobre papel sepia, envejecido por humo de tabaco.
          </p>
        </div>

        <div className="contact-cluster">
          <a
            href={JUAN_ANTONIO_CONTACT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-primary"
          >
            Solicitar a Juan Antonio Díaz &rarr;
          </a>
          <p className="cta-attrib"><em>Un guajiro en Hialeah</em></p>
        </div>
      </div>
    </section>
  )
}

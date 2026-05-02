export function SiteFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="tobacco-footer text-center py-12 mt-16 border-t border-[var(--vd-gold-deep)]">
      <div className="container mx-auto px-6 max-w-4xl space-y-3 font-ui text-sm text-[var(--vd-paper-deep)]">
        <div className="font-display text-xl tracking-[0.18em] uppercase text-[var(--vd-paper-warm)] font-bold mb-6">
          VIAJERA DIGITAL
        </div>
        <p className="portada-footer">
          Un guajiro en Hialeah &middot;{" "}
          <a
            href="https://juanantoniodiaz.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--vd-gold-glow)] hover:text-[var(--vd-gold-light)] transition-colors underline underline-offset-4"
          >
            JuanAntonioDiaz.com
          </a>
        </p>
        <p className="text-xs text-[var(--vd-tobacco-light)] mt-6">
          &copy; {currentYear} Emilio José Novo &middot; Patente Pendiente &middot; Creative Commons BY-NC-SA 4.0
        </p>
      </div>
    </footer>
  )
}

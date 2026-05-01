export function Fleuron() {
  return (
    <div className="fleuron-wrap" aria-hidden="true">
      <svg width="80" height="32" viewBox="0 0 80 32" fill="none">
        <path d="M2 16 L28 16" stroke="var(--vd-gold-deep)" strokeWidth="1" />
        <path d="M52 16 L78 16" stroke="var(--vd-gold-deep)" strokeWidth="1" />
        <path d="M40 8 C44 8 48 12 48 16 C48 20 44 24 40 24 C36 24 32 20 32 16 C32 12 36 8 40 8 Z" stroke="var(--vd-gold-glow)" strokeWidth="1.2" fill="none" />
        <circle cx="40" cy="16" r="2" fill="var(--vd-gold-glow)" />
      </svg>
    </div>
  )
}

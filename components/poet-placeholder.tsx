import { Fleuron } from "./fleuron"

export function PoetPlaceholder({ initials }: { initials: string }) {
  return (
    <div className="poet-placeholder" aria-hidden="true">
      <Fleuron />
      <span className="placeholder-initials">{initials}</span>
    </div>
  )
}

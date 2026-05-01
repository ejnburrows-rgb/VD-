type PoetPlaceholderProps = {
  name?: string
  className?: string
}

export function PoetPlaceholder({ name = "Poeta", className = "" }: PoetPlaceholderProps) {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("")

  return (
    <div className={`poet-placeholder ${className}`} aria-hidden="true">
      <div className="poet-placeholder__grain" />
      <div className="poet-placeholder__ring">
        <span>{initials || "✦"}</span>
      </div>
    </div>
  )
}

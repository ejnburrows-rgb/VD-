import Link from "next/link";

type View = "memoria" | "procesar"

export function TopNav({ view, setView }: { view: View; setView: (v: View) => void }) {
  return (
    <nav className="top-nav">
      <span className="wordmark">VIAJERA DIGITAL</span>
      <ul className="nav-links">
        <li><button onClick={() => setView("memoria")} className={view === "memoria" ? "active" : ""}>Memoria</button></li>
        <li><button onClick={() => setView("procesar")} className={view === "procesar" ? "active" : ""}>Procesar</button></li>
        <li><Link href="/educacion">Educación &rarr;</Link></li>
        <li><Link href="/poetas">Poetas &rarr;</Link></li>
      </ul>
    </nav>
  )
}

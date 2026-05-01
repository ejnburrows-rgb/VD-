import Link from "next/link";

export function TopNav() {
  return (
    <nav className="top-nav">
      <span className="wordmark">VIAJERA DIGITAL</span>
      <ul className="nav-links">
        <li><Link href="/#memorial">Memoria</Link></li>
        <li><Link href="/educacion">Educación &rarr;</Link></li>
        <li><Link href="/poetas">Poetas &rarr;</Link></li>
      </ul>
    </nav>
  )
}

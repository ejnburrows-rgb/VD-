import Link from "next/link";
import { PoetsCompendium } from "@/components/poets-compendium";

export default function PoetasPage() {
  return (
    <main className="tobacco-paper pb-16">
      <div className="pt-8 px-6 max-w-5xl mx-auto">
        <Link href="/" className="inline-block font-ui text-[#8b6f2c] hover:text-[#3e2814] transition-colors mb-12 uppercase tracking-widest text-sm font-semibold">
          &larr; Memoria
        </Link>
        
        <PoetsCompendium />
      </div>
    </main>
  );
}

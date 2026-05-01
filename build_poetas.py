import re

with open('components/poets-compendium.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract cases
cases = re.findall(r'case "([^"]+)":\s*return \(\s*<div[^>]*>([\s\S]*?)</div>\s*\);', content)

out = """import Link from "next/link";
import { Fleuron } from "@/components/fleuron";

export default function PoetasPage() {
  return (
    <main className="tobacco-paper pb-16">
      <div className="pt-8 px-6 max-w-3xl mx-auto">
        <Link href="/" className="inline-block font-ui text-[#8b6a3f] hover:text-[#3e2814] transition-colors mb-12">
          &larr; Memoria
        </Link>
        
        <header className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-display font-black text-[#3e2814] mb-4">Poetas que cantaron a su lado</h1>
        </header>

        <article className="font-prose text-lg text-[#2a180a] leading-relaxed space-y-8">
"""

def clean_html(text):
    # Remove h4 tags and convert to h2
    text = re.sub(r'<h4[^>]*>(.*?)</h4>', r'<h2 className="text-3xl font-display font-bold text-center text-[#3e2814] mb-8">\1</h2>', text, flags=re.S)
    text = re.sub(r'<div[^>]*>', '', text)
    text = re.sub(r'</div>', '', text)
    return text.strip()

# Move Julio Pablo to first
julio_case = None
other_cases = []
for name, html in cases:
    if "Julio Pablo" in name:
        julio_case = (name, html)
    else:
        other_cases.append((name, html))

sorted_cases = []
if julio_case:
    sorted_cases.append(julio_case)
sorted_cases.extend(other_cases)

for i, (name, html) in enumerate(sorted_cases):
    cleaned = clean_html(html)
    out += cleaned + "\n"
    if i < len(sorted_cases) - 1:
        out += "\n<Fleuron />\n\n"

out += """
        </article>
      </div>
    </main>
  );
}
"""

with open('app/poetas/page.tsx', 'w', encoding='utf-8') as f:
    f.write(out)

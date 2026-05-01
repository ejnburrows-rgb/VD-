const fs = require("fs")
const path = require("path")

const required = [
  "app/globals.css",
  "components/poets-compendium.tsx",
  "components/poet-placeholder.tsx",
]

const forbidden = [
  "Cantoría",
  "Cantoria",
  "can-to-ria",
  "can to ria",
  "solicitar a Juan Antonio Díaz",
  "Solicitar a Juan Antonio Díaz",
  "un guajiro de Hialeah",
  "papel envejecido por humo de tabaco",
  "piel de gallina",
  "PIEL de gallina",
]

function walk(dir) {
  if (!fs.existsSync(dir)) return []
  let results = []
  const list = fs.readdirSync(dir)
  list.forEach((file) => {
    file = path.join(dir, file)
    const stat = fs.statSync(file)
    if (stat && stat.isDirectory()) {
      if (!file.includes('node_modules') && !file.includes('.next') && !file.includes('.git')) {
        results = results.concat(walk(file))
      }
    } else {
      results.push(file)
    }
  })
  return results
}

const files = walk("app")
  .concat(walk("components"))
  .concat(walk("public"))
  .filter((file) => /\.(tsx|ts|jsx|js|css|md|json|html|txt)$/.test(file))

const text = files.map((file) => [file, fs.readFileSync(file, "utf8")])

const missing = required.filter((file) => !fs.existsSync(file))
const forbiddenHits = []

for (const [file, content] of text) {
  for (const needle of forbidden) {
    if (content.includes(needle)) {
      forbiddenHits.push(`${file}: ${needle}`)
    }
  }
}

const css = fs.existsSync("app/globals.css") ? fs.readFileSync("app/globals.css", "utf8") : ""
const poets = fs.existsSync("components/poets-compendium.tsx") ? fs.readFileSync("components/poets-compendium.tsx", "utf8") : ""

const checks = {
  requiredFilesPresent: missing.length === 0,
  noForbiddenCopy: forbiddenHits.length === 0,
  usesCanturia: text.some(([, content]) => content.includes("Canturía") || content.includes("canturía")),
  poetAccordion: poets.includes("aria-expanded") && poets.includes("poet-body-wrapper"),
  poetPortraits: poets.includes("poet-portrait") && poets.includes("/poets/"),
  tobaccoPalette: css.includes("--vd-tobacco-950") && css.includes("--vd-gold"),
  premiumCards: css.includes(".poet-card") && css.includes("backdrop-filter"),
  smoothAccordion: css.includes("grid-template-rows: 0fr") && css.includes("grid-template-rows: 1fr"),
  kenBurns: css.includes("@keyframes vdKenBurns"),
  footerCasing: text.some(([, content]) => content.includes("JuanAntonioDiaz.com")),
  honestPdfCopy: text.some(([, content]) => content.includes("PDF o EPUB")),
}

console.log(JSON.stringify({ checks, missing, forbiddenHits }, null, 2))

if (Object.values(checks).some((value) => value !== true) || missing.length || forbiddenHits.length) {
  // Relaxing exit code for now as some forbidden strings might be in non-UI files or legacy content that needs manual review, 
  // but let's see what hits we get.
  // Actually, let's keep it strict as requested.
  process.exit(1)
}

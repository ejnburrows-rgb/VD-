import { ProcessingSection } from "./processing-section"
import { DecimalsSection } from "./decimals-section"
import { AnalysisSection } from "./analysis-section"
import { ExportSection } from "./export-section"
import DemoSection from "./demo-section"

export function ProcesarWorkspace({ onBack }: { onBack?: () => void }) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-16">
      {onBack && (
        <button onClick={onBack} className="inline-block font-ui text-[#8b6a3f] hover:text-[#3e2814] transition-colors mb-8">
          &larr; Volver a la memoria
        </button>
      )}
      <ProcessingSection />
      <DecimalsSection />
      <AnalysisSection />
      <ExportSection />
      <DemoSection />
    </div>
  )
}

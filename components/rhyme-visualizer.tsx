
"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RhymeValidationResult, getRhymeGroupColor } from "@/lib/rhyme-validator";
import { CheckCircle, AlertCircle } from "lucide-react";

interface RhymeVisualizerProps {
  result: RhymeValidationResult;
  verses: string[];
}

export default function RhymeVisualizer({ result, verses }: RhymeVisualizerProps) {
  const { valid, groups, confidence, errors } = result;

  // Map verse numbers to rhyme groups
  const verseToGroup: Record<number, 'A' | 'B' | 'C' | 'D'> = {};
  Object.entries(groups).forEach(([letter, group]) => {
    group.verses.forEach(verseNum => {
      verseToGroup[verseNum] = letter as 'A' | 'B' | 'C' | 'D';
    });
  });

  return (
    <Card className="p-6 bg-white/90 border-2 border-[#C8A05C]/20">
      <div className="space-y-4">
        {/* Header with validation status */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-[#C8A05C] font-serif">
            🎵 Análisis de Rima ABBAACCDDC
          </h3>
          <div className="flex items-center gap-2">
            {valid ? (
              <CheckCircle className="w-5 h-5 text-green-600" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-600" />
            )}
            <Badge
              variant={valid ? "default" : "destructive"}
              className={valid ? "bg-green-600" : "bg-red-600"}
            >
              {valid ? "Rima Válida" : "Rima Inválida"} ({confidence}%)
            </Badge>
          </div>
        </div>

        {/* Rhyme groups visualization */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {(['A', 'B', 'C', 'D'] as const).map(letter => {
            const group = groups[letter];
            const color = getRhymeGroupColor(letter);
            
            return (
              <Card
                key={letter}
                className="p-3 border-2"
                style={{ borderColor: color }}
              >
                <div
                  className="text-center font-bold text-white text-lg mb-2 py-1 rounded"
                  style={{ backgroundColor: color }}
                >
                  Grupo {letter}
                </div>
                <div className="text-sm space-y-1">
                  <div className="font-semibold text-[#5C4033]">
                    Sonido: -{group.sound}
                  </div>
                  <div className="text-xs text-[#5C4033]/70">
                    Versos: {group.verses.join(', ')}
                  </div>
                  <div className="mt-2 space-y-1">
                    {group.words.map((word, idx) => (
                      <div
                        key={idx}
                        className="text-xs px-2 py-1 rounded text-white"
                        style={{ backgroundColor: color }}
                      >
                        {word}
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Verses with color coding */}
        <div className="space-y-2">
          <h4 className="font-semibold text-[#5C4033]">
            Décima con Esquema de Rima:
          </h4>
          <div className="space-y-1">
            {verses.map((verse, idx) => {
              const verseNum = idx + 1;
              const group = verseToGroup[verseNum];
              const color = group ? getRhymeGroupColor(group) : '#5C4033';
              
              return (
                <div
                  key={idx}
                  className="flex items-start gap-2 p-2 rounded hover:bg-[#F5E6D3]/50 transition-colors"
                >
                  <Badge
                    className="flex-shrink-0 text-white font-bold"
                    style={{ backgroundColor: color }}
                  >
                    {verseNum}
                  </Badge>
                  <span
                    className="text-sm font-serif text-[#5C4033] flex-1"
                    style={{ borderLeft: `3px solid ${color}`, paddingLeft: '8px' }}
                  >
                    {verse}
                  </span>
                  <Badge
                    variant="outline"
                    className="flex-shrink-0 text-xs"
                    style={{ borderColor: color, color }}
                  >
                    {group}
                  </Badge>
                </div>
              );
            })}
          </div>
        </div>

        {/* Error messages */}
        {errors.length > 0 && (
          <Card className="p-4 bg-red-50 border-red-200">
            <h4 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              Problemas Detectados:
            </h4>
            <ul className="text-sm text-red-700 space-y-1 list-disc list-inside">
              {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
          </Card>
        )}

        {/* Explanation */}
        <Card className="p-3 bg-[#C8A05C]/10">
          <p className="text-xs text-[#5C4033]">
            <strong>ℹ️ Esquema ABBAACCDDC:</strong> La décima espinela sigue un patrón
            específico de rima consonante. Los versos 1-4-5 riman entre sí (A), los versos
            2-3 riman (B), los versos 6-7-10 riman (C), y los versos 8-9 riman (D).
          </p>
        </Card>
      </div>
    </Card>
  );
}

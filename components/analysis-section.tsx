"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'

interface Analysis {
  totalDecimas: number
  topFour: Array<{
    number: number
    justification: string
  }>
  themes: string[]
  rhymeQuality: number
  culturalContext?: string
}

export function AnalysisSection() {
  const [analysis, setAnalysis] = useState<Analysis | null>(null)
  const [loading, setLoading] = useState(false)

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <Card className="bg-[#F5E6D3] border-2 border-[#C8A05C]">
        <CardHeader>
          <CardTitle className="text-2xl font-serif text-[#D97706]">
            📊 Análisis Completo
          </CardTitle>
          <CardDescription className="text-[#5C4033]">
            Análisis académico de las décimas procesadas
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-center text-[#5C4033]">Analizando...</p>
          ) : !analysis ? (
            <div className="text-center py-12">
              <p className="text-[#5C4033] mb-4">
                Procesa un video para ver el análisis completo aquí.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <Card className="bg-white/50 border border-[#C8A05C]">
                  <CardHeader>
                    <CardTitle className="text-lg text-[#D97706]">
                      Estadísticas
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-[#5C4033]">
                      <strong>Total de décimas:</strong> {analysis.totalDecimas}
                    </p>
                    <p className="text-[#5C4033]">
                      <strong>Calidad de rima:</strong>{' '}
                      {analysis.rhymeQuality.toFixed(2)}/10
                    </p>
                    {analysis.themes.length > 0 && (
                      <div>
                        <strong className="text-[#D2691E]">Temas:</strong>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {analysis.themes.map((theme, index) => (
                            <Badge key={index} variant="secondary">
                              {theme}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {analysis.culturalContext && (
                  <Card className="bg-white/50 border border-[#C8A05C]">
                    <CardHeader>
                      <CardTitle className="text-lg text-[#D97706]">
                        Contexto Cultural
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-[#5C4033] leading-relaxed">
                        {analysis.culturalContext}
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>

              {analysis.topFour.length > 0 && (
                <Card className="bg-white/50 border-2 border-[#C8A05C]">
                  <CardHeader>
                    <CardTitle className="text-xl font-serif text-[#D97706]">
                      Top 4 Décimas
                    </CardTitle>
                    <CardDescription className="text-[#5C4033]">
                      Las mejores décimas según calidad, rima y significado
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {analysis.topFour.map((item, index) => (
                        <div
                          key={item.number}
                          className="border-l-4 border-[#D2691E] pl-4"
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="default">#{index + 1}</Badge>
                            <span className="font-semibold text-[#D97706]">
                              Décima {item.number}
                            </span>
                          </div>
                          <p className="text-sm text-[#5C4033]">
                            {item.justification}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}


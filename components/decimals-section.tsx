"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'

interface Decima {
  id: string
  number: number
  verses: string[]
  poet?: {
    name: string
  }
  rhymeScheme: string
  theme?: string
}

export function DecimalsSection() {
  const [decimas, setDecimas] = useState<Decima[]>([])
  const [loading, setLoading] = useState(false)

  // This would fetch from API based on current video
  // For now, showing placeholder structure

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <Card className="bg-[#F5E6D3] border-2 border-[#C8A05C]">
        <CardHeader>
          <CardTitle className="text-2xl font-serif text-[#D97706]">
            📖 Décimas Formateadas
          </CardTitle>
          <CardDescription className="text-[#5C4033]">
            {decimas.length > 0
              ? `${decimas.length} décimas encontradas`
              : 'No hay décimas procesadas aún'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-center text-[#5C4033]">Cargando décimas...</p>
          ) : decimas.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-[#5C4033] mb-4">
                Procesa un video de YouTube o pega texto para ver las décimas
                formateadas aquí.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {decimas.map((decima) => (
                <Card
                  key={decima.id}
                  className="bg-white/50 border-2 border-[#C8A05C]"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl font-serif text-[#D97706]">
                        Décima {decima.number}
                      </CardTitle>
                      <Badge variant="outline">{decima.rhymeScheme}</Badge>
                    </div>
                    {decima.poet && (
                      <CardDescription className="text-[#D2691E] font-semibold">
                        Poeta: {decima.poet.name}
                      </CardDescription>
                    )}
                    {decima.theme && (
                      <CardDescription className="text-[#5C4033]">
                        Tema: {decima.theme}
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 font-serif text-[#5C4033]">
                      {decima.verses.map((verse, index) => (
                        <p key={index} className="text-sm">
                          {index + 1}. {verse}
                        </p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}


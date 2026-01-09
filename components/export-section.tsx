"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'

export function ExportSection() {
  const [videoId, setVideoId] = useState<string | null>(null)

  const handleExportText = async () => {
    if (!videoId) return
    try {
      const response = await fetch(`/api/${videoId}/export/text`)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `decimas-${videoId}.txt`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Export error:', error)
    }
  }

  const handleExportPDF = async () => {
    if (!videoId) return
    try {
      const response = await fetch(`/api/${videoId}/export/pdf`)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `decimas-${videoId}.pdf`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Export error:', error)
    }
  }

  const handleShare = async () => {
    if (!videoId) return
    try {
      const response = await fetch(`/api/${videoId}/export/share`, {
        method: 'POST',
      })
      const data = await response.json()
      
      if (navigator.share) {
        await navigator.share({
          title: 'Décimas Espinelas',
          text: 'Mira estas décimas formateadas',
          url: data.shareUrl,
        })
      } else {
        await navigator.clipboard.writeText(data.shareUrl)
        alert('Link copiado al portapapeles!')
      }
    } catch (error) {
      console.error('Share error:', error)
    }
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <Card className="bg-[#F5E6D3] border-2 border-[#C8A05C]">
        <CardHeader>
          <CardTitle className="text-2xl font-serif text-[#D97706]">
            ⬇️ Exportar Resultados
          </CardTitle>
          <CardDescription className="text-[#5C4033]">
            Descarga o comparte las décimas procesadas
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!videoId ? (
            <p className="text-center text-[#5C4033] py-8">
              Procesa un video primero para habilitar las opciones de exportación.
            </p>
          ) : (
            <div className="grid md:grid-cols-3 gap-4">
              <Button
                onClick={handleExportText}
                variant="outline"
                className="h-24 flex flex-col items-center justify-center gap-2"
              >
                <span className="text-3xl">📄</span>
                <span>Exportar TXT</span>
              </Button>
              <Button
                onClick={handleExportPDF}
                variant="outline"
                className="h-24 flex flex-col items-center justify-center gap-2"
              >
                <span className="text-3xl">📕</span>
                <span>Exportar PDF</span>
              </Button>
              <Button
                onClick={handleShare}
                variant="outline"
                className="h-24 flex flex-col items-center justify-center gap-2"
              >
                <span className="text-3xl">🔗</span>
                <span>Compartir Link</span>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}


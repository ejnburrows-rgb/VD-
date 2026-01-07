
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, Link, Copy, CheckCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ExportSectionProps {
  videoId: string | null;
}

export default function ExportSection({ videoId }: ExportSectionProps) {
  const [exporting, setExporting] = useState<string | null>(null);
  const [shareUrl, setShareUrl] = useState<string>("");

  const exportToPDF = async () => {
    if (!videoId) return;
    
    setExporting('pdf');
    try {
      const response = await fetch(`/api/video/${videoId}/export/pdf`, {
        method: 'POST'
      });

      if (!response.ok) {
        throw new Error('Error al generar PDF');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `guajiro-de-hialeah-analisis-${videoId}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      
      toast({
        title: "PDF generado",
        description: "El análisis se ha descargado correctamente.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo generar el PDF. Inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setExporting(null);
    }
  };

  const generateShareLink = async () => {
    if (!videoId) return;
    
    setExporting('link');
    try {
      const response = await fetch(`/api/video/${videoId}/share`, {
        method: 'POST'
      });

      if (!response.ok) {
        throw new Error('Error al generar enlace');
      }

      const data = await response.json();
      const fullUrl = `${window.location.origin}/share/${data.shareId}`;
      setShareUrl(fullUrl);
      
      toast({
        title: "Enlace generado",
        description: "El enlace de compartir está listo.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo generar el enlace. Inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setExporting(null);
    }
  };

  const copyToClipboard = async () => {
    if (!videoId) return;
    
    setExporting('clipboard');
    try {
      const response = await fetch(`/api/video/${videoId}/export/text`);
      
      if (!response.ok) {
        throw new Error('Error al obtener el contenido');
      }

      const data = await response.json();
      const textContent = `
🌴 GUAJIRO DE HIALEAH - ANÁLISIS DE DÉCIMA ESPINELA

Título: ${data.title}
Duración: ${data.duration}
Fecha de análisis: ${new Date(data.processedAt).toLocaleDateString('es-ES')}

${data.textContent}

---
Generado por El Guajiro de Hialeah
${window.location.origin}
      `.trim();

      await navigator.clipboard.writeText(textContent);
      
      toast({
        title: "Copiado al portapapeles",
        description: "El análisis se ha copiado correctamente.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo copiar el contenido. Inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setExporting(null);
    }
  };

  const copyShareUrl = async () => {
    if (!shareUrl) return;
    
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast({
        title: "Enlace copiado",
        description: "El enlace se ha copiado al portapapeles.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo copiar el enlace.",
        variant: "destructive",
      });
    }
  };

  if (!videoId) {
    return (
      <div className="text-center py-16">
        <Download className="w-16 h-16 mx-auto text-[#C8A05C]/50 mb-4" />
        <h3 className="text-xl font-semibold text-[#5C4033] mb-2">
          No hay contenido para exportar
        </h3>
        <p className="text-[#5C4033]/70">
          Procesa un video primero para poder exportar los resultados.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-[#C8A05C] mb-4 font-serif">
          🌴 Exportar Resultados
        </h2>
        <p className="text-[#5C4033]/80 max-w-2xl mx-auto">
          Guarda, comparte o copia los resultados del análisis en diferentes formatos.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {/* PDF Export */}
        <Card className="p-6 cuban-card text-center">
          <div className="mb-4">
            <div className="w-16 h-16 mx-auto bg-[#D2691E]/10 rounded-full flex items-center justify-center mb-3">
              <Download className="w-8 h-8 text-[#D2691E]" />
            </div>
            <h3 className="text-lg font-semibold text-[#5C4033] mb-2">
              Descargar PDF
            </h3>
            <p className="text-sm text-[#5C4033]/70 mb-4">
              Genera un PDF completo con todo el análisis, décimas y contenido educativo.
            </p>
          </div>
          <Button
            onClick={exportToPDF}
            disabled={exporting === 'pdf'}
            className="w-full cuban-button"
          >
            {exporting === 'pdf' ? (
              <>
                <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                Generando...
              </>
            ) : (
              <>
                <Download className="w-4 h-4 mr-2" />
                Descargar PDF
              </>
            )}
          </Button>
        </Card>

        {/* Share Link */}
        <Card className="p-6 cuban-card text-center">
          <div className="mb-4">
            <div className="w-16 h-16 mx-auto bg-[#C8A05C]/10 rounded-full flex items-center justify-center mb-3">
              <Link className="w-8 h-8 text-[#C8A05C]" />
            </div>
            <h3 className="text-lg font-semibold text-[#5C4033] mb-2">
              Compartir Enlace
            </h3>
            <p className="text-sm text-[#5C4033]/70 mb-4">
              Crea un enlace público para compartir el análisis completo.
            </p>
          </div>
          <Button
            onClick={generateShareLink}
            disabled={exporting === 'link'}
            variant="outline"
            className="w-full border-[#C8A05C] text-[#C8A05C] hover:bg-[#C8A05C] hover:text-white mb-3"
          >
            {exporting === 'link' ? (
              <>
                <div className="animate-spin w-4 h-4 border-2 border-[#C8A05C] border-t-transparent rounded-full mr-2" />
                Generando...
              </>
            ) : (
              <>
                <Link className="w-4 h-4 mr-2" />
                Generar Enlace
              </>
            )}
          </Button>
          
          {shareUrl && (
            <div className="space-y-2">
              <div className="p-2 bg-[#F5E6D3] rounded text-xs text-[#5C4033] break-all">
                {shareUrl}
              </div>
              <Button
                onClick={copyShareUrl}
                size="sm"
                variant="ghost"
                className="w-full text-[#5C4033] hover:bg-[#C8A05C]/10"
              >
                <Copy className="w-3 h-3 mr-1" />
                Copiar enlace
              </Button>
            </div>
          )}
        </Card>

        {/* Copy to Clipboard */}
        <Card className="p-6 cuban-card text-center">
          <div className="mb-4">
            <div className="w-16 h-16 mx-auto bg-[#8B4513]/10 rounded-full flex items-center justify-center mb-3">
              <Copy className="w-8 h-8 text-[#8B4513]" />
            </div>
            <h3 className="text-lg font-semibold text-[#5C4033] mb-2">
              Copiar al Portapapeles
            </h3>
            <p className="text-sm text-[#5C4033]/70 mb-4">
              Copia un resumen textual del análisis para pegar en otros documentos.
            </p>
          </div>
          <Button
            onClick={copyToClipboard}
            disabled={exporting === 'clipboard'}
            variant="outline"
            className="w-full border-[#8B4513] text-[#8B4513] hover:bg-[#8B4513] hover:text-white"
          >
            {exporting === 'clipboard' ? (
              <>
                <div className="animate-spin w-4 h-4 border-2 border-[#8B4513] border-t-transparent rounded-full mr-2" />
                Copiando...
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-2" />
                Copiar Texto
              </>
            )}
          </Button>
        </Card>
      </div>

      {/* Usage Instructions */}
      <Card className="p-6 cuban-card max-w-4xl mx-auto">
        <h3 className="text-lg font-semibold text-[#5C4033] mb-4 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-[#D2691E]" />
          Instrucciones de Uso
        </h3>
        <div className="grid md:grid-cols-3 gap-4 text-sm text-[#5C4033]/80">
          <div>
            <h4 className="font-medium text-[#D2691E] mb-2">PDF</h4>
            <p>
              Ideal para archivo, impresión o presentaciones académicas. Incluye todo el contenido 
              con el diseño vintage auténtico.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-[#C8A05C] mb-2">Enlace</h4>
            <p>
              Perfecto para compartir en redes sociales o enviar por email. 
              El enlace es público y no requiere registro.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-[#8B4513] mb-2">Texto</h4>
            <p>
              Útil para integrar en documentos, blogs o investigaciones. 
              Formato plano con toda la información esencial.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}


import { NextRequest, NextResponse } from 'next/server';

export const dynamic = "force-dynamic";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const videoId = params.id;

    // Get the text content first
    const baseUrl = request.headers.get('host') || 'localhost:3000';
    const protocol = request.headers.get('x-forwarded-proto') || 'http';
    const textResponse = await fetch(`${protocol}://${baseUrl}/api/video/${videoId}/export/text`);
    
    if (!textResponse.ok) {
      throw new Error('Failed to get video content');
    }

    const textData = await textResponse.json();

    // Create a simple PDF content structure for client-side generation
    // Since we're using client-side PDF generation, we return the structured data
    const pdfData = {
      title: textData.title,
      content: textData.textContent,
      metadata: {
        author: 'El Guajiro de Hialeah',
        subject: 'Análisis de Décima Espinela Cubana',
        keywords: 'décima, espinela, cuba, poesía, análisis',
        creator: 'Guajiro de Hialeah v2.0',
        producer: 'El Guajiro de Hialeah'
      },
      styling: {
        primaryColor: '#C8A05C',
        secondaryColor: '#5C4033',
        backgroundColor: '#F5E6D3'
      }
    };

    return NextResponse.json(pdfData);

  } catch (error) {
    console.error('Error generating PDF data:', error);
    return NextResponse.json(
      { error: 'Error al generar PDF' },
      { status: 500 }
    );
  }
}

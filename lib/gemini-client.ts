/**
 * Cliente para Google Gemini API
 * Usado para procesamiento interno si es necesario
 * No expuesto al usuario final
 */

import { GoogleGenerativeAI } from '@google/generative-ai';

if (!process.env.GEMINI_API_KEY) {
  console.warn('⚠️  GEMINI_API_KEY no configurada - funciones de IA interna deshabilitadas');
}

const genAI = process.env.GEMINI_API_KEY 
  ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  : null;

/**
 * Genera texto usando Gemini 1.5 Flash
 * Uso interno para validación o procesamiento de texto
 */
export async function generateText(
  prompt: string,
  options: {
    temperature?: number;
    maxTokens?: number;
  } = {}
): Promise<string> {
  if (!genAI) {
    throw new Error('Gemini API no está configurada');
  }

  try {
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-1.5-pro',
      generationConfig: {
        temperature: options.temperature ?? 0.7,
        maxOutputTokens: options.maxTokens ?? 2048,
      }
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error en Gemini API:', error);
    throw new Error('Error al generar contenido con Gemini');
  }
}

/**
 * Genera texto estructurado en formato JSON
 * Útil para procesamiento de datos estructurados
 */
export async function generateStructuredText(
  prompt: string,
  schema: string
): Promise<any> {
  if (!genAI) {
    throw new Error('Gemini API no está configurada');
  }

  try {
    const fullPrompt = `${prompt}\n\nResponde ÚNICAMENTE con JSON válido siguiendo este schema:\n${schema}`;
    
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-1.5-pro',
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 4096,
      }
    });

    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();
    
    // Extraer JSON del texto (en caso de que venga envuelto en markdown)
    const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/) || text.match(/({[\s\S]*})/);
    const jsonText = jsonMatch ? jsonMatch[1] : text;
    
    return JSON.parse(jsonText.trim());
  } catch (error) {
    console.error('Error en Gemini API:', error);
    throw new Error('Error al generar contenido estructurado con Gemini');
  }
}

export const geminiAvailable = !!process.env.GEMINI_API_KEY;

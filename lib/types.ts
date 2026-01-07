/**
 * Tipos compartidos para la aplicación
 * Viajera Digital - Análisis de Décimas Espinelas
 */

export interface DecimaSchema {
  numero: number;
  poeta: string;
  versos: string[]; // Must be exactly 10 verses
  analisis_metrico: {
    silabas_por_verso: number[];
    sinalefas_detectadas: number;
    palabras_finales: string[];
  };
  analisis_cultural: string;
}

export interface AnalysisResponse {
  decimas: DecimaSchema[];
  resumen: {
    total_decimas: number;
    notas: string;
  };
}

/**
 * Parser para convertir el resultado de Perplexity en datos estructurados
 */

export interface ParsedDecima {
  poetName: string;
  title: string;
  verses: string[];
  rhymeScheme: string;
  timestamp?: string;
  theme?: string;
}

export interface ParsedTopDecima {
  poetName: string;
  decimaNumber: number;
  verses: string[];
  mastery: string;
  literaryDevices: string;
  culturalNotes: string;
}

export interface ParsedAnalysis {
  summary: string;
  topDecimas: ParsedTopDecima[];
  deepAnalysis: string;
}

export interface ParsedResult {
  decimas: ParsedDecima[];
  analysis: ParsedAnalysis;
  rawText: string;
}

/**
 * Intenta extraer décimas de forma más simple cuando el formato principal falla
 * Busca bloques de 8-10 líneas consecutivas que parezcan versos
 */
function fallbackParsing(text: string): ParsedDecima[] {
  const decimas: ParsedDecima[] = [];
  const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  
  let currentVerses: string[] = [];
  let decimaNumber = 1;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Ignorar líneas obvias que no son versos
    const isNotVerse = 
      line.length > 120 ||
      line.match(/^(resumen|análisis|top\s+\d|nota|observ|contexto|métrica|rima|décima\s+\d)/i) ||
      line.startsWith('---') ||
      line.startsWith('***') ||
      line.startsWith('###');
    
    if (isNotVerse) {
      // Si tenemos 8-10 versos acumulados, guardar como décima
      if (currentVerses.length >= 8 && currentVerses.length <= 10) {
        decimas.push({
          poetName: `Poeta ${Math.ceil(decimaNumber / 2)}`,
          title: `Décima ${decimaNumber}`,
          verses: currentVerses,
          rhymeScheme: 'ABBAACCDDC',
          theme: 'Tema tradicional'
        });
        decimaNumber++;
      }
      currentVerses = [];
      continue;
    }
    
    // Limpiar el verso
    let cleanVerse = line
      .replace(/\[8 sílabas\]/gi, '')
      .replace(/\[\d+\s*s[ií]labas\]/gi, '')
      .replace(/\([ABCDE]\)/gi, '')
      .replace(/^\d+[\.\)]\s*/i, '')
      .replace(/^[-–—•]\s*/i, '')
      .replace(/\*\*/g, '')
      .replace(/^>\s*/g, '')
      .trim();
    
    // Validar que parezca un verso
    const wordCount = cleanVerse.split(/\s+/).filter(w => w.length > 0).length;
    const hasLetters = /[a-záéíóúñü]/i.test(cleanVerse);
    
    if (cleanVerse.length >= 8 && cleanVerse.length <= 100 && wordCount >= 2 && wordCount <= 20 && hasLetters) {
      currentVerses.push(cleanVerse);
      
      // Si tenemos 10 versos, cerrar la décima
      if (currentVerses.length === 10) {
        decimas.push({
          poetName: `Poeta ${Math.ceil(decimaNumber / 2)}`,
          title: `Décima ${decimaNumber}`,
          verses: currentVerses,
          rhymeScheme: 'ABBAACCDDC',
          theme: 'Tema tradicional'
        });
        decimaNumber++;
        currentVerses = [];
      }
    } else if (currentVerses.length > 0) {
      // Si el verso no es válido pero tenemos versos acumulados
      // y ya tenemos suficientes (8-10), guardar la décima
      if (currentVerses.length >= 8 && currentVerses.length <= 10) {
        decimas.push({
          poetName: `Poeta ${Math.ceil(decimaNumber / 2)}`,
          title: `Décima ${decimaNumber}`,
          verses: currentVerses,
          rhymeScheme: 'ABBAACCDDC',
          theme: 'Tema tradicional'
        });
        decimaNumber++;
      }
      currentVerses = [];
    }
  }
  
  // Guardar última décima si existe
  if (currentVerses.length >= 8 && currentVerses.length <= 10) {
    decimas.push({
      poetName: `Poeta ${Math.ceil(decimaNumber / 2)}`,
      title: `Décima ${decimaNumber}`,
      verses: currentVerses,
      rhymeScheme: 'ABBAACCDDC',
      theme: 'Tema tradicional'
    });
  }
  
  return decimas;
}

/**
 * Parsea el resultado de Perplexity para extraer décimas
 * Maneja múltiples formatos posibles de respuesta
 */
export function parsePerplexityResult(text: string): ParsedResult {
  const decimas: ParsedDecima[] = [];
  const lines = text.split('\n');
  
  let currentDecima: Partial<ParsedDecima> | null = null;
  let currentVerses: string[] = [];
  let lineIndex = 0;
  
  // Múltiples patrones para detectar encabezados de décimas
  const headerPatterns = [
    // DÉCIMA #1 — ANAMARYS GIL (formato de Perplexity)
    /^[\*\s]*d[eé]cima\s+#(\d+)\s*[—–-]\s*(.+?)[\*\s]*$/i,
    // [1. Poeta - Tema] o **[1. Poeta - Tema]**
    /^[\*\s]*\[(\d+)[\.\)]\s*([^\-\]\n]+?)\s*[-–—:]\s*([^\]\n]+?)\][\*\s]*$/i,
    // **1. Poeta - Tema** o ##1. Poeta - Tema
    /^[\*#\s]+(\d+)[\.\)]\s*([^\-\n]+?)\s*[-–—:]\s*([^\n]+?)[\*#\s]*$/i,
    // Décima 1: Poeta - Tema
    /^d[eé]cima\s+(\d+)[\:\.\)]\s*([^\-:\n]+?)\s*[-–—:]\s*([^\n]+)$/i,
    // 1) Poeta - Tema (sin corchetes ni markdown)
    /^(\d+)[\)\.\:]\s+([^\-:\n]+?)\s*[-–—:]\s*([^\n]+?)$/i,
    // 1. Poeta - Tema (sin adornos)
    /^(\d+)\.\s+([^\-:\n]+?)\s*[-–—:]\s*(.+?)$/i,
    // **Poeta - Tema** (sin numeración)
    /^\*\*([^\-\*\n]+?)\s*[-–—:]\s*([^\*\n]+?)\*\*$/i,
  ];
  
  while (lineIndex < lines.length) {
    const line = lines[lineIndex].trim();
    
    // Intentar detectar encabezado con múltiples patrones
    let headerMatch = null;
    for (const pattern of headerPatterns) {
      headerMatch = line.match(pattern);
      if (headerMatch) break;
    }
    
    if (headerMatch) {
      // Guardar décima anterior si existe y tiene suficientes versos
      if (currentDecima && currentVerses.length >= 8) {
        // Aceptar décimas con 8-10 versos (más flexible)
        decimas.push({
          poetName: currentDecima.poetName || 'Poeta Desconocido',
          title: currentDecima.title || 'Sin título',
          verses: currentVerses.slice(0, 10),
          rhymeScheme: 'ABBAACCDDC',
          theme: currentDecima.theme
        });
      }
      
      // Iniciar nueva décima
      // Verificar si el patrón capturó 3 o 2 grupos
      let poetName: string;
      let theme: string;
      let decimaNumber: string = '';
      
      if (headerMatch[3]) {
        // Patrón con 3 grupos: grupo 1 = número, grupo 2 = poeta, grupo 3 = tema
        decimaNumber = headerMatch[1].trim();
        poetName = headerMatch[2].trim().replace(/\*\*/g, '').replace(/^#+\s*/g, '');
        theme = headerMatch[3].trim().replace(/\*\*/g, '');
      } else if (headerMatch[2]) {
        // Patrón con 2 grupos: puede ser (número, poeta) o (poeta, tema)
        const firstGroup = headerMatch[1].trim().replace(/\*\*/g, '').replace(/^#+\s*/g, '');
        const secondGroup = headerMatch[2].trim().replace(/\*\*/g, '');
        
        // Si el primer grupo es un número, entonces: grupo 1 = número, grupo 2 = poeta
        if (/^\d+$/.test(firstGroup)) {
          decimaNumber = firstGroup;
          poetName = secondGroup;
          theme = `Décima ${decimaNumber}`;
        } else {
          // Si no es número: grupo 1 = poeta, grupo 2 = tema
          poetName = firstGroup;
          theme = secondGroup;
        }
      } else {
        // Patrón con 1 solo grupo (raro pero por si acaso)
        poetName = headerMatch[1].trim().replace(/\*\*/g, '').replace(/^#+\s*/g, '');
        theme = 'Décima';
      }
      
      currentDecima = {
        poetName: poetName,
        title: theme,
        theme: theme
      };
      currentVerses = [];
      lineIndex++;
      continue;
    }
    
    // Detectar versos cuando hay una décima activa
    if (currentDecima && line.length > 0) {
      // Ignorar líneas que claramente no son versos
      const isNotVerse = 
        line.startsWith('---') ||
        line.startsWith('===') ||
        line.startsWith('***') ||
        line.startsWith('###') ||
        line.startsWith('//') ||
        line.startsWith('**') || // Títulos en markdown
        line.endsWith('**') || // Títulos en markdown
        line.match(/^[\*#]+\s/i) ||
        line.match(/^(resumen|análisis|top\s+\d|nota|observ|contexto|métrica|rima|interpretación|cantur[ií]a|aquí van)/i) ||
        line.match(/[—–]\s*\d{4}$/i) || // Fechas al final de línea (ej: "— 2025")
        line.match(/vs\./i) || // Líneas con "vs."
        line.length > 120; // Los versos no suelen ser muy largos
      
      if (!isNotVerse) {
        // Limpiar el verso de marcadores comunes
        let cleanVerse = line
          .replace(/\[8 sílabas\]/gi, '')
          .replace(/\[\d+\s*s[ií]labas\]/gi, '')
          .replace(/\([ABCDE]\)/gi, '')
          .replace(/\s+\([ABCDE]\)\s*$/gi, '')
          .replace(/^\d+[\.\)]\s*/i, '') // Remover numeración de versos
          .replace(/^[-–—•]\s*/i, '') // Remover guiones y bullets al inicio
          .replace(/\*\*/g, '') // Remover negritas markdown
          .replace(/^>\s*/g, '') // Remover marcador de cita
          .trim();
        
        // Validar que parezca un verso (longitud razonable, contiene palabras)
        const wordCount = cleanVerse.split(/\s+/).filter(w => w.length > 0).length;
        const hasLetters = /[a-záéíóúñü]/i.test(cleanVerse);
        
        if (cleanVerse.length >= 8 && cleanVerse.length <= 100 && wordCount >= 2 && wordCount <= 20 && hasLetters) {
          if (currentVerses.length < 10) {
            currentVerses.push(cleanVerse);
          }
        }
      }
      
      // Si encontramos un separador después de tener versos, cerrar la décima
      if ((line === '---' || line === '***' || line === '') && currentVerses.length >= 8) {
        // Verificar si la siguiente línea no vacía es un nuevo encabezado
        let nextNonEmptyLine = '';
        for (let j = lineIndex + 1; j < lines.length; j++) {
          if (lines[j].trim().length > 0) {
            nextNonEmptyLine = lines[j].trim();
            break;
          }
        }
        
        let isNextHeader = false;
        for (const pattern of headerPatterns) {
          if (nextNonEmptyLine.match(pattern)) {
            isNextHeader = true;
            break;
          }
        }
        
        if (isNextHeader) {
          // Guardar y cerrar décima actual
          decimas.push({
            poetName: currentDecima.poetName || 'Poeta Desconocido',
            title: currentDecima.title || 'Sin título',
            verses: currentVerses.slice(0, 10),
            rhymeScheme: 'ABBAACCDDC',
            theme: currentDecima.theme
          });
          currentDecima = null;
          currentVerses = [];
        }
      }
    }
    
    lineIndex++;
  }
  
  // Guardar última décima si existe
  if (currentDecima && currentVerses.length >= 8) {
    decimas.push({
      poetName: currentDecima.poetName || 'Poeta Desconocido',
      title: currentDecima.title || 'Sin título',
      verses: currentVerses.slice(0, 10),
      rhymeScheme: 'ABBAACCDDC',
      theme: currentDecima.theme
    });
  }
  
  // Si no encontramos décimas con el método principal, intentar fallback
  let finalDecimas = decimas;
  if (decimas.length === 0) {
    console.log('Parsing principal no encontró décimas, intentando fallback...');
    finalDecimas = fallbackParsing(text);
    if (finalDecimas.length > 0) {
      console.log(`Fallback encontró ${finalDecimas.length} décimas`);
    }
  }
  
  // Parsear análisis
  const analysis = parseAnalysisSection(text);
  
  return {
    decimas: finalDecimas,
    analysis,
    rawText: text
  };
}

/**
 * Parsea la sección de análisis del resultado
 */
function parseAnalysisSection(text: string): ParsedAnalysis {
  const lowerText = text.toLowerCase();
  
  // Buscar sección de resumen
  let summary = '';
  const summaryPatterns = [
    /\*\*resumen\s+final\*\*[:\s]*([\s\S]*?)(?=\*\*aquí van|top\s+3|aquí van las top|\n\n\*\*|$)/i,
    /resumen\s+final[:\s]+([\s\S]*?)(?=top\s+3|aquí van|análisis\s+profundo|\n\n\n)/i,
    /resumen\s+general[:\s]+([\s\S]*?)(?=top\s+3|análisis\s+profundo|\n\n\n)/i,
    /resumen[:\s]+([\s\S]*?)(?=top\s+3|análisis\s+profundo|\n\n\n)/i,
    /análisis\s+general[:\s]+([\s\S]*?)(?=top\s+3|análisis\s+profundo|\n\n\n)/i
  ];
  
  for (const pattern of summaryPatterns) {
    const match = text.match(pattern);
    if (match && match[1].trim().length > 50) {
      summary = match[1].trim();
      break;
    }
  }
  
  // Buscar sección de top décimas
  const topDecimas: ParsedTopDecima[] = [];
  const topSectionPatterns = [
    /\*\*aquí van las top\s+\d+\*\*[:\s]*([\s\S]*?)(?=\*\*|análisis\s+profundo|$)/i,
    /aquí van las top\s+\d+[:\s]*([\s\S]*?)(?=análisis\s+profundo|$)/i,
    /top\s+\d+[^:]*:([\s\S]*?)(?=análisis\s+profundo|$)/i
  ];
  
  let topMatch = null;
  for (const pattern of topSectionPatterns) {
    topMatch = text.match(pattern);
    if (topMatch) break;
  }
  
  if (topMatch) {
    const topSection = topMatch[1];
    
    // Buscar décimas con formato: DÉCIMA #N — POETA
    const decimaTopPattern = /d[eé]cima\s+#(\d+)\s*[—–-]\s*(.+?)\s*\n\s*([\s\S]*?)(?=interpretaci[oó]n:|d[eé]cima\s+#|\*\*\*|$)/gi;
    let match;
    
    while ((match = decimaTopPattern.exec(topSection)) !== null && topDecimas.length < 6) {
      const decimaNumber = parseInt(match[1]);
      const poetName = match[2].trim();
      const content = match[3].trim();
      
      // Extraer versos (líneas que no están vacías y no son separadores)
      const verses = content
        .split('\n')
        .map(line => line.trim())
        .filter(line => 
          line.length > 0 && 
          !line.startsWith('***') && 
          !line.match(/^interpretaci[oó]n:/i)
        )
        .slice(0, 10);
      
      // Buscar interpretación
      const interpretMatch = topSection.match(
        new RegExp(`d[eé]cima\\s+#${decimaNumber}[^]*?interpretaci[oó]n:\\s*([\\s\\S]*?)(?=d[eé]cima\\s+#|\\*\\*\\*|$)`, 'i')
      );
      const interpretation = interpretMatch ? interpretMatch[1].trim() : '';
      
      if (verses.length >= 8) {
        topDecimas.push({
          poetName: poetName,
          decimaNumber: decimaNumber,
          verses: verses,
          mastery: 'Excelente dominio técnico',
          literaryDevices: 'Uso efectivo de recursos literarios',
          culturalNotes: interpretation || 'Décima destacada por su valor literario'
        });
      }
    }
    
    // Si no se encontraron con el método anterior, intentar el método antiguo
    if (topDecimas.length === 0) {
      const decimaEntries = topSection.split(/\n\n+/).filter(s => s.trim().length > 100);
      
      decimaEntries.forEach((entry, idx) => {
        if (idx < 6) {
          const poetMatch = entry.match(/([^:]+?):/);
          const versesMatch = entry.match(/verso[s]?[:\s]+([\s\S]*?)(?=dominio|mastery|$)/i);
          const masteryMatch = entry.match(/(?:dominio|mastery)[:\s]+(.*?)(?=\n|recursos|$)/i);
          const devicesMatch = entry.match(/recursos\s+literarios[:\s]+(.*?)(?=\n|notas|$)/i);
          const notesMatch = entry.match(/notas\s+culturales[:\s]+(.*?)(?=\n|$)/i);
          
          if (poetMatch) {
            topDecimas.push({
              poetName: poetMatch[1].trim(),
              decimaNumber: idx + 1,
              verses: versesMatch ? versesMatch[1].trim().split('\n').slice(0, 10) : [],
              mastery: masteryMatch ? masteryMatch[1].trim() : 'Excelente dominio técnico',
              literaryDevices: devicesMatch ? devicesMatch[1].trim() : 'Uso efectivo de recursos literarios',
              culturalNotes: notesMatch ? notesMatch[1].trim() : 'Refleja la tradición cubana'
            });
          }
        }
      });
    }
  }
  
  // Buscar análisis profundo
  let deepAnalysis = '';
  const deepPattern = /análisis\s+profundo[:\s]+([\s\S]*)$/i;
  const deepMatch = text.match(deepPattern);
  
  if (deepMatch) {
    deepAnalysis = deepMatch[1].trim();
  }
  
  return {
    summary: summary || 'Análisis de la canturía disponible en el texto completo.',
    topDecimas,
    deepAnalysis: deepAnalysis || 'Análisis profundo disponible en el texto completo.'
  };
}

/**
 * Valida que el resultado parseado sea válido
 */
export function validateParsedResult(result: ParsedResult, showDebug: boolean = false): { valid: boolean; errors: string[]; warnings: string[] } {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  if (!result.decimas || result.decimas.length === 0) {
    errors.push('❌ No se encontraron décimas en el resultado.');
    errors.push('');
    errors.push('💡 Asegúrate de que tu respuesta de Perplexity incluye:');
    errors.push('   • Décimas numeradas con formato: "1. Poeta - Tema" o "[1. Poeta - Tema]"');
    errors.push('   • Cada décima debe tener 10 versos (líneas de poesía)');
    errors.push('   • Separadores entre décimas (línea vacía o "---")');
    errors.push('');
    errors.push('📋 Ejemplo del formato esperado:');
    errors.push('   **[1. Calixto González - El Amor al Campo]**');
    errors.push('   ');
    errors.push('   En el campo yo nací');
    errors.push('   donde el sol siempre relumbra');
    errors.push('   ... (8 versos más)');
    errors.push('   ');
    errors.push('   ---');
    
    // Información de debug si está habilitada
    if (showDebug && result.rawText) {
      errors.push('');
      errors.push('🔍 Debug: Primeras 500 caracteres del texto recibido:');
      errors.push(result.rawText.substring(0, 500) + '...');
      errors.push('');
      errors.push('📊 Estadísticas del texto:');
      errors.push(`   • Total de líneas: ${result.rawText.split('\n').length}`);
      errors.push(`   • Total de caracteres: ${result.rawText.length}`);
      const numberedLines = result.rawText.split('\n').filter(l => /^\d+[\.\)]\s/.test(l.trim()));
      errors.push(`   • Líneas con numeración (1. 2. etc): ${numberedLines.length}`);
    }
  }
  
  if (result.decimas.length > 0) {
    const invalidDecimas = result.decimas.filter(d => d.verses.length < 8 || d.verses.length > 10);
    if (invalidDecimas.length > 0) {
      warnings.push(`⚠️ Se encontraron ${invalidDecimas.length} décimas con número incorrecto de versos.`);
      warnings.push(`   Las décimas deben tener exactamente 10 versos (actualmente algunas tienen ${invalidDecimas[0].verses.length}).`);
    }
    
    // Verificar si hay décimas sin nombre de poeta
    const anonymousDecimas = result.decimas.filter(d => !d.poetName || d.poetName === 'Poeta Desconocido');
    if (anonymousDecimas.length > 0) {
      warnings.push(`⚠️ ${anonymousDecimas.length} décimas no tienen nombre de poeta identificado.`);
    }
  }
  
  // El análisis es opcional pero es bueno tenerlo
  if (!result.analysis.summary || result.analysis.summary.length < 30) {
    warnings.push('ℹ️ No se encontró un resumen de análisis completo (esto es opcional pero recomendado).');
  }
  
  // Si tenemos décimas pero con warnings, seguir adelante
  const hasDecimas = result.decimas && result.decimas.length > 0;
  
  return {
    valid: hasDecimas && errors.length === 0,
    errors,
    warnings
  };
}

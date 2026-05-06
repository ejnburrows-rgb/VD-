// Parser for Perplexity-style analysis responses

export interface ParsedDecima {
  number: number
  poet?: string
  verses: string[]
  theme?: string
}

export interface ParsedAnalysis {
  decimas: ParsedDecima[]
  topFour: Array<{
    number: number
    justification: string
  }>
  themes: string[]
  culturalContext?: string
}

export function parseGeminiResponse(text: string): ParsedAnalysis {
  const decimas: ParsedDecima[] = []
  const topFour: Array<{ number: number; justification: string }> = []
  const themes: string[] = []
  
  // Extract décimas
  const decimaMatches = text.matchAll(/Décima\s+(\d+)[:\s]*\nPoet:\s*(.+?)\n([\s\S]*?)(?=Décima\s+\d+|TOP|$)/gi)
  
  for (const match of decimaMatches) {
    const number = parseInt(match[1])
    const poet = match[2].trim()
    const versesText = match[3].trim()
    
    // Extract verses (10 lines)
    const verses = versesText
      .split('\n')
      .map(v => v.trim())
      .filter(v => v.length > 0)
      .slice(0, 10)
    
    if (verses.length === 10) {
      decimas.push({
        number,
        poet,
        verses
      })
    }
  }
  
  // Extract top 4
  const topFourMatch = text.match(/TOP\s+4[\s\S]*?(?=\n\n|$)/i)
  if (topFourMatch) {
    const topFourText = topFourMatch[0]
    const topMatches = topFourText.matchAll(/(\d+)\.\s*Décima\s+(\d+)[:\s]*(.+?)(?=\d+\.|$)/gi)
    
    for (const match of topMatches) {
      const number = parseInt(match[2])
      const justification = match[3].trim()
      topFour.push({ number, justification })
    }
  }
  
  // Extract themes
  const themesMatch = text.match(/Temas?[:\s]+(.+?)(?:\n|$)/i)
  if (themesMatch) {
    themes.push(...themesMatch[1].split(',').map(t => t.trim()))
  }
  
  return {
    decimas,
    topFour: topFour.slice(0, 4),
    themes,
  }
}


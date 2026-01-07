
/**
 * Spanish Syllable Counter with Sinalefa Detection
 * Implements Spanish prosodic rules for décima métrica
 */

export interface Sinalefa {
  position: string; // "word1_word2"
  reduction: number; // Usually 1
  words: [string, string];
}

export interface SyllableCount {
  words: number;
  approximateSyllables: number;
  sinalefas: Sinalefa[];
  stressAdjustment: number; // -1, 0, or +1
  finalWordStress: 'aguda' | 'grave' | 'esdrujula' | 'unknown';
  isValid: boolean; // true if approximateSyllables === 8
  breakdown: string; // Human-readable explanation
}

/**
 * Count base syllables in a word (rough approximation based on vowels)
 */
function countBaseVowels(word: string): number {
  const vowels = ['a', 'e', 'i', 'o', 'u', 'á', 'é', 'í', 'ó', 'ú', 'ü'];
  const lower = word.toLowerCase();
  let count = 0;
  
  for (let i = 0; i < lower.length; i++) {
    if (vowels.includes(lower[i])) {
      count++;
    }
  }
  
  return count;
}

/**
 * Check if word ends with a vowel
 */
function endsWithVowel(word: string): boolean {
  const vowels = ['a', 'e', 'i', 'o', 'u', 'á', 'é', 'í', 'ó', 'ú'];
  const cleaned = word.replace(/[.,;:!?¿¡"'()[\]{}]/g, '').toLowerCase();
  return cleaned.length > 0 && vowels.includes(cleaned[cleaned.length - 1]);
}

/**
 * Check if word starts with a vowel
 */
function startsWithVowel(word: string): boolean {
  const vowels = ['a', 'e', 'i', 'o', 'u', 'á', 'é', 'í', 'ó', 'ú'];
  const cleaned = word.replace(/[.,;:!?¿¡"'()[\]{}]/g, '').toLowerCase();
  return cleaned.length > 0 && vowels.includes(cleaned[0]);
}

/**
 * Determine word stress type based on Spanish orthographic rules
 * 
 * Rules:
 * 1. If word has accent mark (á, é, í, ó, ú), stress is on that syllable
 * 2. If word ends in vowel, 'n', or 's': stress on penultimate (grave)
 * 3. Otherwise: stress on last syllable (aguda)
 * 
 * Esdrújulas (antepenultimate stress) always have accent marks in Spanish
 */
function determineStress(word: string): 'aguda' | 'grave' | 'esdrujula' {
  const cleaned = word.replace(/[.,;:!?¿¡"'()[\]{}]/g, '').toLowerCase();
  
  if (!cleaned) return 'grave'; // Default
  
  // Check for accent marks (indicates esdrújula or specific stress)
  const hasAccent = /[áéíóú]/.test(cleaned);
  
  if (hasAccent) {
    // Count vowels to determine if esdrújula
    const vowelCount = (cleaned.match(/[aeiouáéíóú]/g) || []).length;
    const accentPosition = cleaned.search(/[áéíóú]/);
    
    // If accent is on third-to-last vowel or earlier, it's esdrújula
    // This is a simplification - proper detection requires syllabification
    if (vowelCount >= 3) {
      const vowelsAfterAccent = (cleaned.substring(accentPosition + 1).match(/[aeiouáéíóú]/g) || []).length;
      if (vowelsAfterAccent >= 2) {
        return 'esdrujula';
      }
    }
    
    // If accent but not esdrújula, check last character
    const lastChar = cleaned[cleaned.length - 1];
    if (/[aeiouáéíóúns]/.test(lastChar)) {
      return 'grave'; // Accent overrides default rule
    }
    return 'aguda';
  }
  
  // No accent - apply default rules
  const lastChar = cleaned[cleaned.length - 1];
  
  if (/[aeiouáéíóúns]/.test(lastChar)) {
    return 'grave'; // Default for words ending in vowel, n, or s
  }
  
  return 'aguda'; // Default for words ending in consonant (except n, s)
}

/**
 * Count syllables in a verse with Spanish prosodic rules
 * 
 * Rules applied:
 * 1. Count base syllables (vowel groups)
 * 2. Detect sinalefas (vowel elision between words)
 * 3. Adjust for final word stress:
 *    - Aguda: +1 syllable
 *    - Grave: no adjustment
 *    - Esdrújula: -1 syllable
 */
export function countSyllables(verse: string): SyllableCount {
  // Split into words
  const words = verse.trim().split(/\s+/).filter(w => w.length > 0);
  
  if (words.length === 0) {
    return {
      words: 0,
      approximateSyllables: 0,
      sinalefas: [],
      stressAdjustment: 0,
      finalWordStress: 'unknown',
      isValid: false,
      breakdown: 'Verso vacío'
    };
  }
  
  // Count base syllables
  let totalSyllables = 0;
  const syllablesPerWord: number[] = [];
  
  for (const word of words) {
    const count = countBaseVowels(word);
    syllablesPerWord.push(count);
    totalSyllables += count;
  }
  
  // Detect sinalefas
  const sinalefas: Sinalefa[] = [];
  
  for (let i = 0; i < words.length - 1; i++) {
    const currentWord = words[i];
    const nextWord = words[i + 1];
    
    if (endsWithVowel(currentWord) && startsWithVowel(nextWord)) {
      sinalefas.push({
        position: `${currentWord}_${nextWord}`,
        reduction: 1,
        words: [currentWord, nextWord]
      });
      totalSyllables -= 1; // Subtract 1 for the sinalefa
    }
  }
  
  // Determine stress of final word
  const finalWord = words[words.length - 1];
  const finalWordStress = determineStress(finalWord);
  
  // Apply stress adjustment
  let stressAdjustment = 0;
  switch (finalWordStress) {
    case 'aguda':
      stressAdjustment = 1;
      break;
    case 'grave':
      stressAdjustment = 0;
      break;
    case 'esdrujula':
      stressAdjustment = -1;
      break;
  }
  
  const finalSyllables = totalSyllables + stressAdjustment;
  
  // Build breakdown explanation
  const breakdown = buildBreakdown(
    words.length,
    syllablesPerWord,
    sinalefas,
    finalWordStress,
    stressAdjustment,
    finalSyllables
  );
  
  return {
    words: words.length,
    approximateSyllables: finalSyllables,
    sinalefas,
    stressAdjustment,
    finalWordStress,
    isValid: finalSyllables === 8,
    breakdown
  };
}

/**
 * Build human-readable breakdown of syllable counting
 */
function buildBreakdown(
  wordCount: number,
  syllablesPerWord: number[],
  sinalefas: Sinalefa[],
  stress: string,
  adjustment: number,
  final: number
): string {
  const baseSyllables = syllablesPerWord.reduce((a, b) => a + b, 0);
  let breakdown = `${wordCount} palabras, ${baseSyllables} sílabas base`;
  
  if (sinalefas.length > 0) {
    breakdown += `\n- ${sinalefas.length} sinalefa(s): ${sinalefas.map(s => s.position).join(', ')}`;
    breakdown += ` (-${sinalefas.length})`;
  }
  
  if (adjustment !== 0) {
    breakdown += `\n- Ajuste por palabra final ${stress}: ${adjustment > 0 ? '+' : ''}${adjustment}`;
  }
  
  breakdown += `\n= ${final} sílabas métricas ${final === 8 ? '✓' : '⚠️'}`;
  
  return breakdown;
}

/**
 * Validate syllable count for entire décima
 */
export function validateDecimaSyllables(verses: string[]): {
  valid: boolean;
  counts: SyllableCount[];
  invalidVerses: number[];
  totalSinalefas: number;
} {
  if (verses.length !== 10) {
    return {
      valid: false,
      counts: [],
      invalidVerses: [],
      totalSinalefas: 0
    };
  }
  
  const counts = verses.map(countSyllables);
  const invalidVerses = counts
    .map((c, idx) => ({ idx: idx + 1, valid: c.isValid }))
    .filter(v => !v.valid)
    .map(v => v.idx);
  
  const totalSinalefas = counts.reduce((sum, c) => sum + c.sinalefas.length, 0);
  
  return {
    valid: invalidVerses.length === 0,
    counts,
    invalidVerses,
    totalSinalefas
  };
}

/**
 * Format syllable count for display
 */
export function formatSyllableCount(count: SyllableCount): string {
  const icon = count.isValid ? '✓' : '⚠️';
  return `${count.words} palabras, ~${count.approximateSyllables} síl. ${icon}`;
}

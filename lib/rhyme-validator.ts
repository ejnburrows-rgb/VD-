/**
 * ABBAACCDDC Rhyme Scheme Validator for Spanish Décima Espinela
 * Validates consonant rhyme patterns with normalization
 */

export interface RhymeGroup {
  sound: string;
  verses: number[];
  words: string[];
}

export interface RhymeValidationResult {
  valid: boolean;
  errors: string[];
  groups: {
    A: RhymeGroup;
    B: RhymeGroup;
    C: RhymeGroup;
    D: RhymeGroup;
  };
  scheme: string;
  confidence: number; // 0-100%
}

/**
 * Normalize Spanish word for rhyme comparison
 * - Lowercase
 * - Remove accents (á→a, é→e, etc.)
 * - Strip punctuation
 * - Remove whitespace
 */
function normalizeWord(word: string): string {
  return word
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[.,;:!?¿¡"'()[\]{}]/g, '') // Remove punctuation
    .trim();
}

/**
 * Extract rhyme sound from word
 * Returns substring from last vowel to end of word
 * Examples:
 *   "exilio" → "ilio"
 *   "corazón" → "on"
 *   "sentir" → "ir"
 */
function extractRhymeSound(word: string): string {
  const normalized = normalizeWord(word);
  const vowels = ['a', 'e', 'i', 'o', 'u'];
  
  // Find position of last vowel
  let lastVowelIndex = -1;
  for (let i = normalized.length - 1; i >= 0; i--) {
    if (vowels.includes(normalized[i])) {
      lastVowelIndex = i;
      break;
    }
  }
  
  if (lastVowelIndex === -1) {
    return normalized; // No vowel found, return entire word
  }
  
  return normalized.substring(lastVowelIndex);
}

/**
 * Get final word from verse
 * Handles punctuation and whitespace
 */
function getFinalWord(verse: string): string {
  const words = verse.trim().split(/\s+/);
  return words[words.length - 1] || '';
}

/**
 * Validate ABBAACCDDC rhyme scheme
 * 
 * Scheme breakdown:
 *   A: verses 1, 4, 5    (positions 0, 3, 4)
 *   B: verses 2, 3       (positions 1, 2)
 *   C: verses 6, 7, 10   (positions 5, 6, 9)
 *   D: verses 8, 9       (positions 7, 8)
 */
export function validateRhymeScheme(verses: string[]): RhymeValidationResult {
  const errors: string[] = [];
  
  // Validate input
  if (!verses || verses.length !== 10) {
    return {
      valid: false,
      errors: [`Décima must have exactly 10 verses, found ${verses?.length || 0}`],
      groups: {
        A: { sound: '', verses: [], words: [] },
        B: { sound: '', verses: [], words: [] },
        C: { sound: '', verses: [], words: [] },
        D: { sound: '', verses: [], words: [] }
      },
      scheme: 'INVALID',
      confidence: 0
    };
  }
  
  // Extract final words and rhyme sounds
  const finalWords = verses.map(getFinalWord);
  const rhymeSounds = finalWords.map(extractRhymeSound);
  
  // Group verses by rhyme scheme
  const groupA = {
    verses: [1, 4, 5],
    indices: [0, 3, 4],
    sounds: [rhymeSounds[0], rhymeSounds[3], rhymeSounds[4]],
    words: [finalWords[0], finalWords[3], finalWords[4]]
  };
  
  const groupB = {
    verses: [2, 3],
    indices: [1, 2],
    sounds: [rhymeSounds[1], rhymeSounds[2]],
    words: [finalWords[1], finalWords[2]]
  };
  
  const groupC = {
    verses: [6, 7, 10],
    indices: [5, 6, 9],
    sounds: [rhymeSounds[5], rhymeSounds[6], rhymeSounds[9]],
    words: [finalWords[5], finalWords[6], finalWords[9]]
  };
  
  const groupD = {
    verses: [8, 9],
    indices: [7, 8],
    sounds: [rhymeSounds[7], rhymeSounds[8]],
    words: [finalWords[7], finalWords[8]]
  };
  
  // Validate each group has consistent rhyme sound
  function validateGroup(
    group: typeof groupA,
    letter: string
  ): { valid: boolean; sound: string } {
    const uniqueSounds = [...new Set(group.sounds)];
    
    if (uniqueSounds.length > 1) {
      // Multiple rhyme sounds in group - not valid
      group.sounds.forEach((sound, idx) => {
        if (sound !== uniqueSounds[0]) {
          errors.push(
            `Verse ${group.verses[idx]} (${letter}): "${group.words[idx]}" (${sound}) doesn't rhyme with group sound "${uniqueSounds[0]}"`
          );
        }
      });
      return { valid: false, sound: uniqueSounds[0] };
    }
    
    return { valid: true, sound: uniqueSounds[0] };
  }
  
  const aResult = validateGroup(groupA, 'A');
  const bResult = validateGroup(groupB, 'B');
  const cResult = validateGroup(groupC, 'C');
  const dResult = validateGroup(groupD, 'D');
  
  const allValid = aResult.valid && bResult.valid && cResult.valid && dResult.valid;
  
  // Calculate confidence score
  let confidence = 100;
  if (errors.length > 0) {
    confidence = Math.max(0, 100 - (errors.length * 15)); // -15% per error
  }
  
  return {
    valid: allValid,
    errors,
    groups: {
      A: {
        sound: aResult.sound,
        verses: groupA.verses,
        words: groupA.words
      },
      B: {
        sound: bResult.sound,
        verses: groupB.verses,
        words: groupB.words
      },
      C: {
        sound: cResult.sound,
        verses: groupC.verses,
        words: groupC.words
      },
      D: {
        sound: dResult.sound,
        verses: groupD.verses,
        words: groupD.words
      }
    },
    scheme: 'ABBAACCDDC',
    confidence
  };
}

/**
 * Get color for rhyme group (for UI visualization)
 */
export function getRhymeGroupColor(group: 'A' | 'B' | 'C' | 'D'): string {
  const colors = {
    A: '#C8A05C', // Gold (primary)
    B: '#D2691E', // Brown-orange (button)
    C: '#8B4513', // Saddle brown (accent)
    D: '#5C4033'  // Dark brown (secondary)
  };
  return colors[group];
}

/**
 * Format rhyme validation result for display
 */
export function formatRhymeResult(result: RhymeValidationResult): string {
  if (result.valid) {
    return `✅ Rima válida ABBAACCDDC (${result.confidence}% confianza)`;
  }
  
  return `⚠️ Rima inválida (${result.confidence}% confianza)\nErrores:\n${result.errors.join('\n')}`;
}

// Legacy exports for backwards compatibility
export function getLastSyllable(word: string): string {
  return extractRhymeSound(word);
}

export function getRhymeSound(word: string): string {
  return extractRhymeSound(word);
}

export function getLastWord(verse: string): string {
  return getFinalWord(verse);
}

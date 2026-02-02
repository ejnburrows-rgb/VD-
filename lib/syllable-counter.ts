// Spanish syllable counter for décima validation

const diphthongs = ['ai', 'ei', 'oi', 'au', 'eu', 'ou', 'ia', 'ie', 'io', 'ua', 'ue', 'uo']
const diphthongRegexes = diphthongs.map(d => new RegExp(d, 'gi'))

export function countSyllables(word: string): number {
  if (!word) return 0
  
  let count = 0
  const vowels = 'aeiouáéíóúüAEIOUÁÉÍÓÚÜ'
  let previousWasVowel = false
  
  for (let i = 0; i < word.length; i++) {
    const isVowel = vowels.includes(word[i])
    
    if (isVowel) {
      if (!previousWasVowel) {
        count++
      }
      previousWasVowel = true
    } else {
      previousWasVowel = false
    }
  }
  
  // Handle diphthongs and triphthongs
  for (const regex of diphthongRegexes) {
    const matches = word.match(regex)
    if (matches) {
      count -= matches.length
    }
  }
  
  // Handle word endings that affect syllable count
  if (word.endsWith('ión') || word.endsWith('ión')) {
    count++
  }
  
  return Math.max(1, count)
}

export function countVerseSyllables(verse: string): number {
  const words = verse.trim().split(/\s+/)
  let total = 0
  
  for (const word of words) {
    total += countSyllables(word.replace(/[.,;:!?¡¿]/g, ''))
  }
  
  return total
}


// Spanish syllable counter for décima validation

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
  const diphthongs = ['ai', 'ei', 'oi', 'au', 'eu', 'ou', 'ia', 'ie', 'io', 'ua', 'ue', 'uo']
  for (const diphthong of diphthongs) {
    const regex = new RegExp(diphthong, 'gi')
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


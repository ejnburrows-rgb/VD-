// Validates ABBAACCDDC rhyme scheme for décimas

export function getLastSyllable(word: string): string {
  const cleanWord = word.toLowerCase().replace(/[.,;:!?¡¿]/g, '')
  const vowels = 'aeiouáéíóúü'
  
  // Find last vowel
  let lastVowelIndex = -1
  for (let i = cleanWord.length - 1; i >= 0; i--) {
    if (vowels.includes(cleanWord[i])) {
      lastVowelIndex = i
      break
    }
  }
  
  if (lastVowelIndex === -1) return cleanWord.slice(-2)
  
  return cleanWord.slice(lastVowelIndex)
}

export function getRhymeSound(word: string): string {
  const lastSyllable = getLastSyllable(word)
  // Normalize similar sounds
  return lastSyllable
    .replace(/á/g, 'a')
    .replace(/é/g, 'e')
    .replace(/í/g, 'i')
    .replace(/ó/g, 'o')
    .replace(/ú/g, 'u')
    .replace(/ü/g, 'u')
}

export function getLastWord(verse: string): string {
  const words = verse.trim().split(/\s+/)
  return words[words.length - 1] || ''
}

export function validateRhymeScheme(verses: string[]): {
  valid: boolean
  scheme: string
  errors: string[]
} {
  if (verses.length !== 10) {
    return {
      valid: false,
      scheme: '',
      errors: [`Expected 10 verses, got ${verses.length}`]
    }
  }
  
  const expectedScheme = 'ABBAACCDDC'
  const rhymes: string[] = []
  const errors: string[] = []
  
  for (let i = 0; i < 10; i++) {
    const lastWord = getLastWord(verses[i])
    const rhyme = getRhymeSound(lastWord)
    rhymes.push(rhyme)
  }
  
  // Check scheme
  const scheme: string[] = []
  const rhymeMap: { [key: string]: string } = {}
  let currentLetter = 'A'
  
  for (let i = 0; i < 10; i++) {
    const rhyme = rhymes[i]
    
    if (rhymeMap[rhyme]) {
      scheme.push(rhymeMap[rhyme])
    } else {
      scheme.push(currentLetter)
      rhymeMap[rhyme] = currentLetter
      currentLetter = String.fromCharCode(currentLetter.charCodeAt(0) + 1)
    }
  }
  
  const actualScheme = scheme.join('')
  const valid = actualScheme === expectedScheme
  
  if (!valid) {
    errors.push(`Expected ${expectedScheme}, got ${actualScheme}`)
  }
  
  return {
    valid,
    scheme: actualScheme,
    errors
  }
}


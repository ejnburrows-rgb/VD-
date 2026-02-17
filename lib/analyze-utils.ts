// Utility functions for text analysis

// Split long transcripts into manageable chunks
export function splitTranscript(transcript: string, maxLength: number): string[] {
  if (transcript.length <= maxLength) {
    return [transcript]
  }

  const chunks: string[] = []
  let currentChunk = ''

  // Split by sentences (periods, exclamation, question marks)
  const sentences = transcript.split(/([.!?]\s+)/)

  for (let i = 0; i < sentences.length; i++) {
    const sentence = sentences[i]

    if (currentChunk.length + sentence.length > maxLength && currentChunk.length > 0) {
      chunks.push(currentChunk.trim())
      currentChunk = sentence
    } else {
      currentChunk += sentence
    }
  }

  if (currentChunk.trim().length > 0) {
    chunks.push(currentChunk.trim())
  }

  return chunks
}

// Retry function with exponential backoff
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 2000
): Promise<T> {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn()
    } catch (error: any) {
      const errorMessage = error.message || String(error)

      // Don't retry on non-rate limit errors
      if (!errorMessage.includes('rate limit') &&
          !errorMessage.includes('429') &&
          !errorMessage.includes('quota exceeded') &&
          !errorMessage.includes('Resource has been exhausted')) {
        throw error
      }

      // If this was the last attempt, throw the error
      if (attempt === maxRetries) {
        throw error
      }

      // Calculate exponential backoff delay
      const delay = baseDelay * Math.pow(2, attempt)
      console.log(`Rate limit hit. Retrying in ${delay/1000}s... (Attempt ${attempt + 1}/${maxRetries + 1})`)

      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, delay))
    }
  }

  throw new Error('Max retries exceeded')
}

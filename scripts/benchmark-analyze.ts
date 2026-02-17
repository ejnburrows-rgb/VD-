// scripts/benchmark-analyze.ts

// Mock dependencies
const RETRY_DELAY_MS = 2000;
const API_LATENCY_MS = 2500; // Simulated API latency
const CHUNK_DELAY_MS = 1000; // Existing delay between chunks
const CHUNK_COUNT = 5;

// Mock the Gemini Model
const model = {
  generateContent: async (options: any) => {
    // Simulate API latency
    await new Promise(resolve => setTimeout(resolve, API_LATENCY_MS));
    return {
      response: {
        text: () => `Response for ${options.contents[0].parts[0].text.substring(0, 20)}...`
      }
    };
  }
};

// Retry with Backoff Mock (simulating successful retry after 1 failure if needed, but for baseline just success)
async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 2000
): Promise<T> {
  // Simple retry logic simulation
  try {
    return await fn();
  } catch (error) {
    // Retry logic here if simulating failures
    throw error;
  }
}

// Generate Dummy Chunks
const chunks = Array.from({ length: CHUNK_COUNT }, (_, i) => `Chunk content ${i}`);

// Sequential Processing (Baseline)
async function runSequential() {
  console.log('--- Starting Sequential Benchmark ---');
  const start = Date.now();
  const chunkResponses: string[] = [];

  for (let i = 0; i < chunks.length; i++) {
    const chunkPrompt = `Chunk Prompt ${i}`;

    // Process chunk
    const chunkResult = await retryWithBackoff(async () => {
      return await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: chunkPrompt }] }],
        generationConfig: {
          maxOutputTokens: 100,
          temperature: 0.7,
        },
      });
    });

    const chunkText = chunkResult.response.text();
    chunkResponses.push(chunkText);

    // Small delay between chunks
    if (i < chunks.length - 1) {
      await new Promise(resolve => setTimeout(resolve, CHUNK_DELAY_MS));
    }
  }

  const end = Date.now();
  console.log(`Sequential Time: ${(end - start) / 1000}s`);
  return chunkResponses;
}

// Parallel Processing with Concurrency Limit (Optimized)
async function runParallel(concurrency: number) {
  console.log(`--- Starting Parallel Benchmark (Concurrency: ${concurrency}) ---`);
  const start = Date.now();

  // Simple concurrency limiter implementation
  const limit = (fn: () => Promise<any>) => {
    // A simplified p-limit logic
    return fn(); // Placeholder: actually need a queue if not using p-limit
  };

  // Implementing p-limit style logic manually for the benchmark
  const results: string[] = new Array(chunks.length);
  let currentIndex = 0;

  const worker = async () => {
    while (currentIndex < chunks.length) {
      const i = currentIndex++;
      const chunkPrompt = `Chunk Prompt ${i}`;

      const chunkResult = await retryWithBackoff(async () => {
        return await model.generateContent({
          contents: [{ role: 'user', parts: [{ text: chunkPrompt }] }],
          generationConfig: {
            maxOutputTokens: 100,
            temperature: 0.7,
          },
        });
      });

      results[i] = chunkResult.response.text();

      // Removed the fixed delay between chunks in favor of concurrency
    }
  };

  const workers = Array.from({ length: Math.min(concurrency, chunks.length) }, () => worker());
  await Promise.all(workers);

  const end = Date.now();
  console.log(`Parallel Time: ${(end - start) / 1000}s`);
  return results;
}

(async () => {
  console.log(`Simulating processing of ${CHUNK_COUNT} chunks with ${API_LATENCY_MS/1000}s latency per request.`);

  // Run Sequential
  await runSequential();

  // Run Parallel
  await runParallel(3);
})();

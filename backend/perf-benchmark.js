import fs from 'fs';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { tmpdir } from 'os';
import { performance } from 'perf_hooks';

const FILE_SIZE_MB = 100; // Increased to 100MB to stress I/O and memory
const ITERATIONS = 5;
const FILE_PATH = join(tmpdir(), 'perf-test-file.bin');

// Create dummy file
function createDummyFile() {
  console.log(`Creating ${FILE_SIZE_MB}MB dummy file...`);
  const buffer = Buffer.alloc(FILE_SIZE_MB * 1024 * 1024);
  fs.writeFileSync(FILE_PATH, buffer);
  console.log('File created:', FILE_PATH);
}

function measureLag() {
  let maxLag = 0;
  let lastCheck = performance.now();
  const interval = setInterval(() => {
    const now = performance.now();
    const lag = now - lastCheck - 10;
    if (lag > maxLag) maxLag = lag;
    lastCheck = now;
  }, 10);

  return () => {
    clearInterval(interval);
    return maxLag;
  };
}

async function benchmarkBlocking() {
  console.log('\n--- Benchmarking Blocking (readFileSync) ---');
  const getLag = measureLag(); // Start measuring immediately
  const start = performance.now();

  for (let i = 0; i < ITERATIONS; i++) {
    const buffer = fs.readFileSync(FILE_PATH);
    // const file = new File([buffer], 'audio.mp3', { type: 'audio/mpeg' });
    await new Promise(resolve => setTimeout(resolve, 10));
  }

  const duration = performance.now() - start;
  const maxLag = getLag();

  console.log(`Total Duration: ${duration.toFixed(2)}ms`);
  console.log(`Max Event Loop Lag: ${maxLag.toFixed(2)}ms`);
  return { duration, maxLag };
}

async function benchmarkNonBlocking() {
  console.log('\n--- Benchmarking Non-Blocking (fs.promises.readFile) ---');
  const getLag = measureLag();
  const start = performance.now();

  for (let i = 0; i < ITERATIONS; i++) {
    const buffer = await readFile(FILE_PATH);
    // const file = new File([buffer], 'audio.mp3', { type: 'audio/mpeg' });
    await new Promise(resolve => setTimeout(resolve, 10));
  }

  const duration = performance.now() - start;
  const maxLag = getLag();

  console.log(`Total Duration: ${duration.toFixed(2)}ms`);
  console.log(`Max Event Loop Lag: ${maxLag.toFixed(2)}ms`);
  return { duration, maxLag };
}

async function run() {
  try {
    createDummyFile();

    // Warmup
    fs.readFileSync(FILE_PATH);

    const blocking = await benchmarkBlocking();
    await new Promise(resolve => setTimeout(resolve, 500));

    const nonBlocking = await benchmarkNonBlocking();

    console.log('\n--- Results Summary ---');
    console.log(`Blocking Max Lag: ${blocking.maxLag.toFixed(2)}ms`);
    console.log(`Non-Blocking Max Lag: ${nonBlocking.maxLag.toFixed(2)}ms`);

    if (blocking.maxLag > nonBlocking.maxLag * 1.5) {
      console.log('✅ SUCCESS: Non-blocking implementation significantly reduced event loop lag.');
    } else {
      console.log('⚠️ WARNING: Difference is small.');
    }

  } catch (error) {
    console.error('Error:', error);
  } finally {
    if (fs.existsSync(FILE_PATH)) fs.unlinkSync(FILE_PATH);
  }
}

run();

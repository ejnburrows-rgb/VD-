import fs from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';
import { performance } from 'perf_hooks';

const FILE_SIZE_MB = 50;
const FILE_PATH = join(tmpdir(), 'benchmark_audio.mp3');

function createDummyFile() {
  console.log(`Creating ${FILE_SIZE_MB}MB dummy file at ${FILE_PATH}...`);
  try {
    const buffer = Buffer.alloc(FILE_SIZE_MB * 1024 * 1024);
    fs.writeFileSync(FILE_PATH, buffer);
    console.log('File created.');
  } catch (e) {
    console.error('Error creating dummy file:', e);
  }
}

function cleanup() {
  if (fs.existsSync(FILE_PATH)) {
    try {
      fs.unlinkSync(FILE_PATH);
      console.log('Dummy file deleted.');
    } catch (e) {
      console.error('Error deleting dummy file:', e);
    }
  }
}

function getMemoryMB() {
  const used = process.memoryUsage().rss;
  return (used / 1024 / 1024).toFixed(2);
}

// Mock Groq SDK behavior
const mockGroq = {
  audio: {
    transcriptions: {
      create: async ({ file }) => {
        // Simulate processing delay
        await new Promise(resolve => setTimeout(resolve, 100));

        // If it's a stream, simulate reading it
        if (file && typeof file.pipe === 'function') {
           return new Promise((resolve, reject) => {
             file.on('data', () => {}); // Consume stream
             file.on('end', resolve);
             file.on('error', reject);
           });
        }
        return { text: "Mock transcription" };
      }
    }
  }
};

async function runBenchmark() {
  createDummyFile();

  console.log('--- Starting Benchmark ---');
  console.log(`Initial RSS: ${getMemoryMB()} MB`);

  // --- BASELINE ---
  if (global.gc) global.gc();
  await new Promise(r => setTimeout(r, 200));

  const startBase = process.memoryUsage().rss;
  console.log(`\n[Baseline] Start: ${getMemoryMB()} MB`);

  try {
    const audioBuffer = fs.readFileSync(FILE_PATH);
    const audioFile = new File([audioBuffer], 'audio.mp3', { type: 'audio/mpeg' });

    const peakBase = process.memoryUsage().rss;
    console.log(`[Baseline] Peak (after load): ${getMemoryMB()} MB`);

    await mockGroq.audio.transcriptions.create({ file: audioFile });

    console.log(`[Baseline] Diff: +${((peakBase - startBase) / 1024 / 1024).toFixed(2)} MB`);
  } catch (e) {
    console.error('[Baseline] Error:', e);
  }

  // --- OPTIMIZED ---
  if (global.gc) global.gc();
  await new Promise(r => setTimeout(r, 1000)); // Let GC settle

  const startOpt = process.memoryUsage().rss;
  console.log(`\n[Optimized] Start: ${getMemoryMB()} MB`);

  try {
    const stream = fs.createReadStream(FILE_PATH);

    // Check memory immediately after stream creation (should be low)
    const peakOpt = process.memoryUsage().rss;
    console.log(`[Optimized] Peak (after stream creation): ${getMemoryMB()} MB`);

    await mockGroq.audio.transcriptions.create({ file: stream });

    // Check memory after processing (should still be low or slightly higher due to buffers)
    const endOpt = process.memoryUsage().rss;
    console.log(`[Optimized] End: ${getMemoryMB()} MB`);

    console.log(`[Optimized] Diff: +${((peakOpt - startOpt) / 1024 / 1024).toFixed(2)} MB`);

  } catch (e) {
    console.error('[Optimized] Error:', e);
  }

  cleanup();
}

runBenchmark();

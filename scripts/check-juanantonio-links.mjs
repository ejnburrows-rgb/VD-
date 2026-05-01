import fs from 'fs';
import path from 'path';

const searchDirs = ['app', 'components', 'lib', 'styles', 'public'];
let failed = false;

function scanDir(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      scanDir(fullPath);
    } else if (stat.isFile() && /\.(tsx|ts|js|jsx)$/.test(file)) {
      checkFile(fullPath);
    }
  }
}

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Case-insensitive search for juanantoniodiaz.com
  const regex = /juanantoniodiaz\.com/gi;
  let match;
  while ((match = regex.exec(content)) !== null) {
    // Check surrounding context for <Link> or not being inside <a> with target="_blank" and rel="noopener noreferrer"
    
    // We get a chunk of text around the match to verify
    const start = Math.max(0, match.index - 500);
    const end = Math.min(content.length, match.index + 500);
    const context = content.substring(start, end);

    // If it's wrapped in <Link, fail immediately
    if (/<Link[^>]*>[\s\S]*?juanantoniodiaz\.com/i.test(context)) {
      console.error(`\x1b[31mFAIL: Found <Link> wrapper in ${filePath}\x1b[0m`);
      failed = true;
      continue;
    }

    // Check if it's inside an <a> tag by finding the closest <a backwards and the closest > forwards
    const aTagStart = context.lastIndexOf('<a', match.index - start);
    const aTagEnd = context.indexOf('>', aTagStart);
    
    if (aTagStart === -1 || aTagEnd === -1) {
      console.error(`\x1b[31mFAIL: Unwrapped bare text in ${filePath}\x1b[0m`);
      failed = true;
      continue;
    }

    const aTagToMatch = context.substring(aTagStart, aTagEnd + 1);
    
    const hasTargetBlank = /target\s*=\s*(['"])_blank\1/.test(aTagToMatch);
    const hasRelNoopener = /rel\s*=\s*(['"]).*?noopener.*?\1/.test(aTagToMatch);
    const hasRelNoreferrer = /rel\s*=\s*(['"]).*?noreferrer.*?\1/.test(aTagToMatch);

    if (!hasTargetBlank || !hasRelNoopener || !hasRelNoreferrer) {
      console.error(`\x1b[31mFAIL: Missing target="_blank" or rel="noopener noreferrer" in ${filePath}\x1b[0m`);
      failed = true;
    }
  }
}

console.log('Scanning for JuanAntonioDiaz.com link compliance...');
searchDirs.forEach(scanDir);

if (failed) {
  console.error('\x1b[31mSmoke test failed! Please fix the links.\x1b[0m');
  process.exit(1);
} else {
  console.log('\x1b[32mAll links compliant! Smoke test passed.\x1b[0m');
  process.exit(0);
}

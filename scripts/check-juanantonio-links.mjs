import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const directoriesToCheck = ['app', 'components'];
let errorCount = 0;

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  if (!content.includes('JuanAntonioDiaz.com')) return;

  // Simple regex to match <a ... >JuanAntonioDiaz.com</a>
  // Not perfect but good enough for a smoke test
  const linkRegex = /<a[^>]*>[^<]*JuanAntonioDiaz\.com[^<]*<\/a>/gi;
  const links = content.match(linkRegex);

  if (links) {
    links.forEach(link => {
      const hasHref = link.includes('href="https://juanantoniodiaz.com"');
      const hasTarget = link.includes('target="_blank"');
      const hasRel = link.includes('rel="noopener noreferrer"');

      if (!hasHref || !hasTarget || !hasRel) {
        console.error(`❌ Invalid link found in ${filePath}`);
        console.error(`   Found: ${link}`);
        errorCount++;
      } else {
        console.log(`✅ Valid link found in ${filePath}`);
      }
    });
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      walkDir(filePath);
    } else if (filePath.endsWith('.tsx') || filePath.endsWith('.jsx')) {
      checkFile(filePath);
    }
  }
}

console.log('Running Juan Antonio Díaz link smoke test...');
directoriesToCheck.forEach(dir => {
  const fullPath = path.join(rootDir, dir);
  if (fs.existsSync(fullPath)) {
    walkDir(fullPath);
  }
});

if (errorCount > 0) {
  console.error(`\nSmoke test failed with ${errorCount} errors.`);
  process.exit(1);
} else {
  console.log('\n✅ All links pass smoke test.');
  process.exit(0);
}

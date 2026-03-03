#!/usr/bin/env node
/**
 * Validates CSS syntax and structure.
 * Usage: node scripts/check-css-syntax.mjs <file>
 */
import postcss from 'postcss';
import { readFileSync } from 'fs';

const file = process.argv[2];
if (!file) {
  console.error('Usage: node scripts/check-css-syntax.mjs <file>');
  process.exit(1);
}

const css = readFileSync(file, 'utf8');

// Check syntax with PostCSS parser
try {
  postcss.parse(css);
} catch (e) {
  console.error(e.message);
  process.exit(1);
}

// Check @import ordering - imports after @import 'tailwindcss' will cause build errors
// because tailwindcss expands into actual CSS rules
const lines = css.split('\n');
let tailwindLine = -1;

for (let i = 0; i < lines.length; i++) {
  if (lines[i].trim().match(/^@import\s+'tailwindcss'/)) {
    tailwindLine = i;
    break;
  }
}

if (tailwindLine >= 0) {
  for (let i = tailwindLine + 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line || line.startsWith('/*') || line.startsWith('//')) continue;
    if (line.match(/^@import\s+/) && !line.match(/^@import\s+'tailwindcss'/)) {
      console.error(
        `Line ${i + 1}: @import must appear BEFORE @import 'tailwindcss'.\n` +
        `The tailwindcss import expands into CSS rules, so any imports after it will fail.`
      );
      process.exit(1);
    }
  }
}

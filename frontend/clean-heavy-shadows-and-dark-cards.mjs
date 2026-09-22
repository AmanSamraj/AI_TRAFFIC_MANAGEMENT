import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

function getAllJsxFiles(dir) {
  const results = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      results.push(...getAllJsxFiles(full));
    } else if (entry.endsWith('.jsx') || entry.endsWith('.js')) {
      results.push(full);
    }
  }
  return results;
}

const replacements = [
  ['bg-[#070e1c]', 'bg-[var(--color-card)]'],
  ['bg-[#0c182b]/95', 'bg-[var(--color-card)]'],
  ['bg-[#0c182b]', 'bg-[var(--color-card)]'],
  ['variant="glow"', 'variant="default"'],
  ['shadow-2xl', 'shadow-sm'],
  ['shadow-xl', 'shadow-sm'],
  ['shadow-lg', 'shadow-sm'],
  ['shadow-black/60', ''],
  ['border-slate-750/80', 'border-[var(--color-border)]'],
  ["boxShadow: '0 0 40px rgba(0,210,255,0.08)'", "boxShadow: '0 8px 30px rgba(0,0,0,0.15)'"],
  ["boxShadow: '0 0 12px rgba(0,210,255,0.3)'", "boxShadow: 'none'"],
  ["boxShadow: '0 0 12px rgba(16,185,129,0.3)'", "boxShadow: 'none'"],
  ['border-3 border-slate-950', 'border border-[var(--color-border-dark)]'],
  ['border-3 border-slate-900', 'border border-[var(--color-border-dark)]'],
  ['border-2 border-slate-900', 'border border-[var(--color-border-dark)]'],
  ['from-slate-100 via-white to-slate-200', 'bg-[var(--color-surface)]'],
];

const targetDirs = ['src/pages', 'src/component', 'src/layout'];
let totalChanges = 0;

for (const dir of targetDirs) {
  for (const file of getAllJsxFiles(dir)) {
    let content = readFileSync(file, 'utf-8');
    let changes = 0;

    for (const [from, to] of replacements) {
      const count = content.split(from).length - 1;
      if (count > 0) {
        content = content.replaceAll(from, to);
        changes += count;
      }
    }

    if (changes > 0) {
      writeFileSync(file, content, 'utf-8');
      console.log(`Cleaned ${file}: ${changes} replacements`);
      totalChanges += changes;
    }
  }
}

console.log(`\nCleaned ${totalChanges} heavy shadows, glow variants, and dark hardcoded cards.`);

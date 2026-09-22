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

const directReplacements = [
  // Cyan accents -> Amber / Charcoal
  ['accent-cyan-400', 'accent-[var(--color-amber)]'],
  ['accent-cyan-500', 'accent-[var(--color-amber)]'],
  ['text-cyan-200', 'text-[var(--color-amber-light)]'],
  ['text-cyan-300', 'text-[var(--color-amber)]'],
  ['text-cyan-400', 'text-[var(--color-amber)]'],
  ['text-cyan-500', 'text-[var(--color-amber)]'],
  ['bg-cyan-400', 'bg-[var(--color-amber)]'],
  ['bg-cyan-500', 'bg-[var(--color-amber)]'],
  ['bg-cyan-900/90', 'bg-[var(--color-charcoal)]'],
  ['bg-cyan-950/90', 'bg-[var(--color-charcoal)]'],
  ['bg-cyan-950/80', 'bg-[var(--color-charcoal-light)]'],
  ['bg-cyan-950/60', 'bg-[var(--color-surface)]'],
  ['bg-cyan-950/20', 'bg-[var(--color-surface)]'],
  ['border-cyan-400/80', 'border-[var(--color-amber)]'],
  ['border-cyan-400/40', 'border-[var(--color-border-dark)]'],
  ['border-cyan-400/70', 'border-[var(--color-amber)]'],
  ['border-cyan-400', 'border-[var(--color-amber)]'],
  ['border-cyan-500/20', 'border-[var(--color-border)]'],
  ['border-cyan-500/40', 'border-[var(--color-amber)]'],
  ['border-cyan-500', 'border-[var(--color-amber)]'],
  ['bg-cyan-400/70', 'bg-[var(--color-amber)]'],
  ['bg-cyan-400/30', 'bg-[var(--color-border)]'],
  ['bg-cyan-500/20', 'bg-[rgba(245,166,35,0.1)]'],
  ['text-slate-950', 'text-[var(--color-charcoal)]'],
  ['hover:from-cyan-400 hover:to-blue-500', 'hover:brightness-95'],
  ['selection:bg-cyan-500/30 selection:text-cyan-200', 'selection:bg-[var(--color-amber)] selection:text-[var(--color-charcoal)]'],
  ['shadow-cyan-500/25', 'shadow-sm'],
  ['border-cyan-400/40', 'border-[var(--color-border)]'],
  ['cyanVolumeGradient', 'amberVolumeGradient'],
  ['#00d2ff', '#F5A623'],
  ['#00f2fe', '#FFD166'],
  ['#4facfe', '#C77A00'],
  ['bg-[radial-gradient(#00d2ff_1px,transparent_1px)]', 'bg-[radial-gradient(#d0c8b8_1px,transparent_1px)]'],
  ['backdrop-blur-xs', ''],
  ['backdrop-blur-sm', ''],
  ['backdrop-blur-md', ''],
  ['backdrop-blur-xl', ''],
];

const targetDirs = ['src/pages', 'src/component', 'src/layout'];
let totalReplacements = 0;

for (const dir of targetDirs) {
  for (const file of getAllJsxFiles(dir)) {
    let content = readFileSync(file, 'utf-8');
    let changes = 0;

    // Remove glowing drop-shadows and neon box-shadows regex
    const glowRegex = /shadow-\[0_0_[^\]]+\]/g;
    if (glowRegex.test(content)) {
      content = content.replace(glowRegex, 'shadow-sm');
      changes++;
    }

    const dropShadowRegex = /drop-shadow-\[0_0_[^\]]+\]/g;
    if (dropShadowRegex.test(content)) {
      content = content.replace(dropShadowRegex, '');
      changes++;
    }

    for (const [from, to] of directReplacements) {
      const count = content.split(from).length - 1;
      if (count > 0) {
        content = content.replaceAll(from, to);
        changes += count;
      }
    }

    if (changes > 0) {
      writeFileSync(file, content, 'utf-8');
      console.log(`Cleaned ${file}: ${changes} changes`);
      totalReplacements += changes;
    }
  }
}

console.log(`\nAll residual styles cleaned: ${totalReplacements} changes total.`);

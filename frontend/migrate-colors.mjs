// Color migration script — replaces old dark-mode Tailwind classes with CSS variable inline styles
// Run with: node migrate-colors.mjs

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const pagesDir = 'src/pages';

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

// Mapping of old Tailwind utility classes -> replacement approach
// We'll do direct string replacements
const replacements = [
  // ── Backgrounds ──
  ['bg-slate-950/60', 'bg-[var(--color-background)]'],
  ['bg-slate-950/40', 'bg-[var(--color-background)]'],
  ['bg-slate-950/20', 'bg-[var(--color-surface)]'],
  ['bg-slate-950', 'bg-[var(--color-charcoal)]'],
  ['bg-slate-900/95', 'bg-[var(--color-card)]'],
  ['bg-slate-900/90', 'bg-[var(--color-card)]'],
  ['bg-slate-900/80', 'bg-[var(--color-card)]'],
  ['bg-slate-900', 'bg-[var(--color-card)]'],
  ['bg-slate-850', 'bg-[var(--color-background)]'],
  ['bg-slate-800/80', 'bg-[var(--color-background)]'],
  ['bg-slate-800/60', 'bg-[var(--color-background)]'],
  ['bg-slate-800/40', 'bg-[var(--color-background)]'],
  ['bg-slate-800/30', 'bg-[var(--color-background)]'],
  ['bg-slate-800', 'bg-[var(--color-background)]'],
  ['bg-[#060e1a]', 'bg-[var(--color-background)]'],
  ['bg-[#0a1628]', 'bg-[var(--color-background)]'],
  
  // ── Background — Emerald/Cyan special ──
  ['bg-emerald-950/40', 'bg-[rgba(25,135,84,0.06)]'],
  ['bg-emerald-950/30', 'bg-[rgba(25,135,84,0.04)]'],
  ['bg-emerald-500/10', 'bg-[rgba(25,135,84,0.08)]'],
  ['bg-cyan-950/40', 'bg-[rgba(91,103,112,0.06)]'],
  ['bg-cyan-500/15', 'bg-[rgba(245,166,35,0.08)]'],
  ['bg-cyan-500/10', 'bg-[rgba(245,166,35,0.06)]'],
  ['bg-red-950/40', 'bg-[rgba(220,53,69,0.06)]'],
  ['bg-amber-950/40', 'bg-[rgba(245,166,35,0.06)]'],
  
  // ── Text ──
  ['text-slate-100', 'text-[var(--color-text)]'],
  ['text-slate-200', 'text-[var(--color-text)]'],
  ['text-slate-300', 'text-[var(--color-text-secondary)]'],
  ['text-slate-400', 'text-[var(--color-text-muted)]'],
  ['text-slate-500', 'text-[var(--color-text-muted)]'],
  ['text-slate-600', 'text-[var(--color-text-muted)]'],
  ['text-cyan-400', 'text-[var(--color-amber)]'],
  ['text-cyan-300', 'text-[var(--color-amber)]'],
  ['text-cyan-500', 'text-[var(--color-amber)]'],
  
  // ── Borders ──
  ['border-slate-700/80', 'border-[var(--color-border)]'],
  ['border-slate-700/90', 'border-[var(--color-border)]'],
  ['border-slate-700', 'border-[var(--color-border)]'],
  ['border-slate-800/60', 'border-[var(--color-border)]'],
  ['border-slate-800', 'border-[var(--color-border)]'],
  ['border-cyan-500/40', 'border-[var(--color-amber)]'],
  ['border-cyan-500', 'border-[var(--color-amber)]'],
  ['border-emerald-500/40', 'border-[rgba(25,135,84,0.3)]'],
  ['border-red-500/40', 'border-[rgba(220,53,69,0.3)]'],
  ['border-amber-500/40', 'border-[rgba(245,166,35,0.3)]'],
  
  // ── Dividers ──
  ['divide-slate-800/60', 'divide-[var(--color-border)]'],
  ['divide-slate-800', 'divide-[var(--color-border)]'],
  
  // ── Focus rings ──
  ['focus:ring-cyan-500/50', 'focus:ring-[var(--color-amber)]'],
  ['focus:ring-cyan-500', 'focus:ring-[var(--color-amber)]'],
  ['focus:border-cyan-500', 'focus:border-[var(--color-amber)]'],
  ['focus:ring-2 focus:ring-cyan-500', 'focus:ring-2 focus:ring-[var(--color-amber)]'],
  ['focus:outline-none focus:ring-2 focus:ring-cyan-500', 'focus:outline-none focus:ring-2 focus:ring-[var(--color-amber)]'],
  
  // ── Spinner / loading ──
  ['border-cyan-500/20', 'border-[rgba(245,166,35,0.15)]'],
  ['border-t-cyan-400', 'border-t-[var(--color-amber)]'],
  ['border-t-cyan-500', 'border-t-[var(--color-amber)]'],
  
  // ── Gradient backgrounds ──
  ['from-cyan-500 to-blue-600', 'from-[var(--color-amber)] to-[var(--color-amber-dark)]'],
  ['from-cyan-500', 'from-[var(--color-amber)]'],
  
  // ── Shadows ──
  ['shadow-cyan-950/30', 'shadow-[rgba(0,0,0,0.08)]'],
  ['shadow-cyan-500/20', 'shadow-[rgba(245,166,35,0.15)]'],
  ['shadow-cyan-950/20', 'shadow-[rgba(0,0,0,0.06)]'],
  ['shadow-black/40', 'shadow-[rgba(0,0,0,0.12)]'],
  ['shadow-2xl shadow-black/40', 'shadow-lg'],
  
  // ── Hover states ──
  ['hover:text-cyan-400', 'hover:text-[var(--color-amber)]'],
  ['hover:bg-slate-800/60', 'hover:bg-[var(--color-background)]'],
  ['hover:bg-slate-800/80', 'hover:bg-[var(--color-background)]'],
  ['hover:bg-slate-800/30', 'hover:bg-[var(--color-background)]'],
  ['hover:bg-slate-800', 'hover:bg-[var(--color-background)]'],
  ['hover:bg-slate-850', 'hover:bg-[var(--color-background)]'],
  ['hover:border-slate-600', 'hover:border-[var(--color-border-dark)]'],
  ['hover:text-white', 'hover:text-[var(--color-text)]'],
  
  // ── Placeholder ──
  ['placeholder-slate-500', 'placeholder-[var(--color-text-muted)]'],
  ['placeholder-slate-400', 'placeholder-[var(--color-text-muted)]'],
  
  // ── Backdrop ──
  ['backdrop-blur-md', ''],
  ['backdrop-blur-xl', ''],
  ['backdrop-blur-sm', ''],
  
  // ── Misc hardcoded hex colors in className ──
  ['text-white', 'text-[var(--color-text)]'],
];

// Also do inline style string replacements for hex colors
const styleReplacements = [
  ["'#00d2ff'", "'#F5A623'"],      // cyan -> amber in chart defaults
  ['"#00d2ff"', '"#F5A623"'],
  ["'#94a3b8'", "'#918B80'"],      // slate tick -> muted text  
  ['"#94a3b8"', '"#918B80"'],
  ["'rgba(255, 255, 255, 0.05)'", "'rgba(0,0,0,0.06)'"],
  ['"rgba(255, 255, 255, 0.05)"', '"rgba(0,0,0,0.06)"'],
  ["'rgba(255, 255, 255, 0.1)'", "'rgba(0,0,0,0.1)'"],
  ['"rgba(255, 255, 255, 0.1)"', '"rgba(0,0,0,0.1)"'],
];

let totalChanges = 0;

for (const file of getAllJsxFiles(pagesDir)) {
  let content = readFileSync(file, 'utf-8');
  let changes = 0;

  for (const [from, to] of replacements) {
    const count = content.split(from).length - 1;
    if (count > 0) {
      content = content.replaceAll(from, to);
      changes += count;
    }
  }

  for (const [from, to] of styleReplacements) {
    const count = content.split(from).length - 1;
    if (count > 0) {
      content = content.replaceAll(from, to);
      changes += count;
    }
  }

  if (changes > 0) {
    writeFileSync(file, content, 'utf-8');
    console.log(`✓ ${file} — ${changes} replacements`);
    totalChanges += changes;
  }
}

console.log(`\nDone. ${totalChanges} total replacements across all page files.`);

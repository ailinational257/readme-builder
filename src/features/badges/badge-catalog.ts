// ─── Badge Catalog ──────────────────────────────────────────────────────────
// Pre-built badge presets organized by category.

import type { BadgePreset } from '../../types/badges';

export const BADGE_PRESETS: BadgePreset[] = [
  // ─── Languages ──────────────────────────────────────────────────────────
  { id: 'js', label: 'JavaScript', message: '', color: 'f7df1e', logoName: 'javascript', logoColor: '000', category: 'language' },
  { id: 'ts', label: 'TypeScript', message: '', color: '3178c6', logoName: 'typescript', logoColor: 'white', category: 'language' },
  { id: 'python', label: 'Python', message: '', color: '3776ab', logoName: 'python', logoColor: 'white', category: 'language' },
  { id: 'rust', label: 'Rust', message: '', color: '000000', logoName: 'rust', logoColor: 'white', category: 'language' },
  { id: 'go', label: 'Go', message: '', color: '00add8', logoName: 'go', logoColor: 'white', category: 'language' },
  { id: 'java', label: 'Java', message: '', color: 'ed8b00', logoName: 'openjdk', logoColor: 'white', category: 'language' },
  { id: 'csharp', label: 'C%23', message: '', color: '239120', logoName: 'csharp', logoColor: 'white', category: 'language' },
  { id: 'cpp', label: 'C%2B%2B', message: '', color: '00599c', logoName: 'cplusplus', logoColor: 'white', category: 'language' },
  { id: 'ruby', label: 'Ruby', message: '', color: 'cc342d', logoName: 'ruby', logoColor: 'white', category: 'language' },
  { id: 'php', label: 'PHP', message: '', color: '777bb4', logoName: 'php', logoColor: 'white', category: 'language' },
  { id: 'swift', label: 'Swift', message: '', color: 'fa7343', logoName: 'swift', logoColor: 'white', category: 'language' },
  { id: 'kotlin', label: 'Kotlin', message: '', color: '7f52ff', logoName: 'kotlin', logoColor: 'white', category: 'language' },

  // ─── Frameworks ─────────────────────────────────────────────────────────
  { id: 'react', label: 'React', message: '', color: '61dafb', logoName: 'react', logoColor: '000', category: 'framework' },
  { id: 'vue', label: 'Vue.js', message: '', color: '4fc08d', logoName: 'vuedotjs', logoColor: 'white', category: 'framework' },
  { id: 'next', label: 'Next.js', message: '', color: '000000', logoName: 'nextdotjs', logoColor: 'white', category: 'framework' },
  { id: 'angular', label: 'Angular', message: '', color: 'dd0031', logoName: 'angular', logoColor: 'white', category: 'framework' },
  { id: 'svelte', label: 'Svelte', message: '', color: 'ff3e00', logoName: 'svelte', logoColor: 'white', category: 'framework' },
  { id: 'express', label: 'Express', message: '', color: '000000', logoName: 'express', logoColor: 'white', category: 'framework' },
  { id: 'django', label: 'Django', message: '', color: '092e20', logoName: 'django', logoColor: 'white', category: 'framework' },
  { id: 'flask', label: 'Flask', message: '', color: '000000', logoName: 'flask', logoColor: 'white', category: 'framework' },
  { id: 'fastapi', label: 'FastAPI', message: '', color: '009688', logoName: 'fastapi', logoColor: 'white', category: 'framework' },
  { id: 'tailwind', label: 'Tailwind', message: 'CSS', color: '06b6d4', logoName: 'tailwindcss', logoColor: 'white', category: 'framework' },

  // ─── Status ─────────────────────────────────────────────────────────────
  { id: 'build-pass', label: 'build', message: 'passing', color: '22c55e', logoName: 'github-actions', logoColor: 'white', category: 'status' },
  { id: 'build-fail', label: 'build', message: 'failing', color: 'ef4444', logoName: 'github-actions', logoColor: 'white', category: 'status' },
  { id: 'active', label: 'status', message: 'active', color: '22c55e', logoName: '', logoColor: '', category: 'status' },
  { id: 'maintenance', label: 'maintenance', message: 'yes', color: 'f59e0b', logoName: '', logoColor: '', category: 'status' },
  { id: 'archived', label: 'status', message: 'archived', color: '6b7280', logoName: '', logoColor: '', category: 'status' },
  { id: 'wip', label: 'status', message: 'WIP', color: 'f59e0b', logoName: '', logoColor: '', category: 'status' },
  { id: 'stable', label: 'stability', message: 'stable', color: '22c55e', logoName: '', logoColor: '', category: 'status' },
  { id: 'beta', label: 'stability', message: 'beta', color: 'f59e0b', logoName: '', logoColor: '', category: 'status' },

  // ─── License ────────────────────────────────────────────────────────────
  { id: 'mit', label: 'license', message: 'MIT', color: '6366f1', logoName: '', logoColor: '', category: 'license' },
  { id: 'apache', label: 'license', message: 'Apache 2.0', color: 'd22128', logoName: '', logoColor: '', category: 'license' },
  { id: 'gpl', label: 'license', message: 'GPL v3', color: '007ec6', logoName: '', logoColor: '', category: 'license' },
  { id: 'bsd', label: 'license', message: 'BSD 3-Clause', color: '007ec6', logoName: '', logoColor: '', category: 'license' },
  { id: 'unlicense', label: 'license', message: 'Unlicense', color: '007ec6', logoName: '', logoColor: '', category: 'license' },

  // ─── Tools ──────────────────────────────────────────────────────────────
  { id: 'docker', label: 'Docker', message: '', color: '2496ed', logoName: 'docker', logoColor: 'white', category: 'tool' },
  { id: 'git', label: 'Git', message: '', color: 'f05032', logoName: 'git', logoColor: 'white', category: 'tool' },
  { id: 'vscode', label: 'VS Code', message: '', color: '007acc', logoName: 'visualstudiocode', logoColor: 'white', category: 'tool' },
  { id: 'webpack', label: 'Webpack', message: '', color: '8dd6f9', logoName: 'webpack', logoColor: '000', category: 'tool' },
  { id: 'vite', label: 'Vite', message: '', color: '646cff', logoName: 'vite', logoColor: 'white', category: 'tool' },
  { id: 'eslint', label: 'ESLint', message: '', color: '4b32c3', logoName: 'eslint', logoColor: 'white', category: 'tool' },
  { id: 'prettier', label: 'Prettier', message: '', color: 'f7b93e', logoName: 'prettier', logoColor: '000', category: 'tool' },

  // ─── Databases ──────────────────────────────────────────────────────────
  { id: 'postgres', label: 'PostgreSQL', message: '', color: '4169e1', logoName: 'postgresql', logoColor: 'white', category: 'database' },
  { id: 'mongodb', label: 'MongoDB', message: '', color: '47a248', logoName: 'mongodb', logoColor: 'white', category: 'database' },
  { id: 'redis', label: 'Redis', message: '', color: 'dc382d', logoName: 'redis', logoColor: 'white', category: 'database' },
  { id: 'mysql', label: 'MySQL', message: '', color: '4479a1', logoName: 'mysql', logoColor: 'white', category: 'database' },
  { id: 'sqlite', label: 'SQLite', message: '', color: '003b57', logoName: 'sqlite', logoColor: 'white', category: 'database' },

  // ─── Cloud ──────────────────────────────────────────────────────────────
  { id: 'aws', label: 'AWS', message: '', color: '232f3e', logoName: 'amazonaws', logoColor: 'white', category: 'cloud' },
  { id: 'gcp', label: 'Google Cloud', message: '', color: '4285f4', logoName: 'googlecloud', logoColor: 'white', category: 'cloud' },
  { id: 'azure', label: 'Azure', message: '', color: '0078d4', logoName: 'microsoftazure', logoColor: 'white', category: 'cloud' },
  { id: 'vercel', label: 'Vercel', message: '', color: '000000', logoName: 'vercel', logoColor: 'white', category: 'cloud' },
  { id: 'netlify', label: 'Netlify', message: '', color: '00c7b7', logoName: 'netlify', logoColor: 'white', category: 'cloud' },
  { id: 'heroku', label: 'Heroku', message: '', color: '430098', logoName: 'heroku', logoColor: 'white', category: 'cloud' },
];

export function getBadgeUrl(preset: BadgePreset, style: string = 'for-the-badge'): string {
  const label = preset.label;
  const message = preset.message || preset.label;
  let url = `https://img.shields.io/badge/${label}-${message}-${preset.color}?style=${style}`;
  if (preset.logoName) url += `&logo=${preset.logoName}`;
  if (preset.logoColor) url += `&logoColor=${preset.logoColor}`;
  return url;
}

export function getBadgesByCategory(category: string): BadgePreset[] {
  return BADGE_PRESETS.filter(b => b.category === category);
}

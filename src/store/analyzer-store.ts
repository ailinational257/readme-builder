// ─── Analyzer Store ──────────────────────────────────────────────────────────

import { create } from 'zustand';
import type { Section } from '../types/sections';

export interface AnalyzerSuggestion {
  id: string;
  category: 'error' | 'warning' | 'info';
  title: string;
  description: string;
  sectionType: string;
}

interface AnalyzerState {
  score: number;
  suggestions: AnalyzerSuggestion[];
  isAnalyzing: boolean;
  analyze: (sections: Section[]) => void;
}

export const useAnalyzerStore = create<AnalyzerState>()((set) => ({
  score: 0,
  suggestions: [],
  isAnalyzing: false,

  analyze: (sections: Section[]) => {
    set({ isAnalyzing: true });

    const suggestions: AnalyzerSuggestion[] = [];
    let score = 0;
    const maxScore = 100;
    
    // Core section checks
    const checks = [
      { type: 'header', weight: 15, label: 'Header / Title' },
      { type: 'about', weight: 10, label: 'About / Description' },
      { type: 'features', weight: 10, label: 'Features' },
      { type: 'installation', weight: 15, label: 'Installation' },
      { type: 'usage', weight: 10, label: 'Usage' },
      { type: 'screenshots', weight: 5, label: 'Screenshots' },
      { type: 'contributing', weight: 10, label: 'Contributing' },
      { type: 'license', weight: 15, label: 'License' },
    ];

    const sectionTypes = new Set(sections.map(s => s.type));

    checks.forEach(check => {
      if (sectionTypes.has(check.type as Section['type'])) {
        score += check.weight;
      } else {
        const category = check.weight >= 15 ? 'error' as const : check.weight >= 10 ? 'warning' as const : 'info' as const;
        suggestions.push({
          id: `missing-${check.type}`,
          category,
          title: `Missing ${check.label}`,
          description: `Add a ${check.label} section to improve your README.`,
          sectionType: check.type,
        });
      }
    });

    // Content Depth & Quality Checks
    
    // Header checks
    const headerSection = sections.find(s => s.type === 'header') as (Section & { type: 'header' }) | undefined;
    if (headerSection) {
      if (!headerSection.title || headerSection.title.trim() === '') {
        score -= 5;
        suggestions.push({
          id: 'empty-title',
          category: 'error',
          title: 'Empty Project Title',
          description: 'Your header needs a project title.',
          sectionType: 'header',
        });
      }
      if (headerSection.badges.length === 0) {
        suggestions.push({
          id: 'no-badges',
          category: 'info',
          title: 'No Badges',
          description: 'Add badges (build status, version, license) to make your README more professional.',
          sectionType: 'header',
        });
      } else {
        score += 2; // Bonus
      }
    }

    // About checks
    const aboutSection = sections.find(s => s.type === 'about') as (Section & { type: 'about' }) | undefined;
    if (aboutSection) {
      const wordCount = aboutSection.description.split(/\s+/).filter(Boolean).length;
      if (wordCount < 20) {
        score -= 5;
        suggestions.push({
          id: 'short-about',
          category: 'warning',
          title: 'Short Description',
          description: 'Expand your About section. A good description is usually 3-4 sentences.',
          sectionType: 'about',
        });
      }
    }

    // Features checks
    const featuresSection = sections.find(s => s.type === 'features') as (Section & { type: 'features' }) | undefined;
    if (featuresSection) {
      if (featuresSection.features.length < 3) {
        suggestions.push({
          id: 'few-features',
          category: 'info',
          title: 'Few Features Listed',
          description: 'Try to list at least 3 key features of your project.',
          sectionType: 'features',
        });
      }
    }

    // Screenshots checks
    const screenshotsSection = sections.find(s => s.type === 'screenshots') as (Section & { type: 'screenshots' }) | undefined;
    if (screenshotsSection) {
      if (screenshotsSection.screenshots.length === 0) {
        score -= 2;
        suggestions.push({
          id: 'empty-screenshots',
          category: 'warning',
          title: 'Empty Screenshots',
          description: 'Add actual screenshot URLs to the screenshots section.',
          sectionType: 'screenshots',
        });
      }
    }

    // Installation/Usage checks
    const installSection = sections.find(s => s.type === 'installation') as (Section & { type: 'installation' }) | undefined;
    if (installSection) {
      if (installSection.steps.length === 0 || installSection.steps.every(s => !s.command)) {
        score -= 5;
        suggestions.push({
          id: 'empty-install',
          category: 'warning',
          title: 'No Installation Commands',
          description: 'Provide actual commands for users to install or run your project.',
          sectionType: 'installation',
        });
      }
    }

    // Clamp score
    const finalScore = Math.min(maxScore, Math.max(0, score));

    set({
      score: finalScore,
      suggestions,
      isAnalyzing: false,
    });
  },
}));

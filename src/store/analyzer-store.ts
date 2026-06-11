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
    const checks = [
      { type: 'header', weight: 15, label: 'Header / Title' },
      { type: 'about', weight: 10, label: 'About / Description' },
      { type: 'features', weight: 10, label: 'Features' },
      { type: 'installation', weight: 15, label: 'Installation' },
      { type: 'usage', weight: 10, label: 'Usage' },
      { type: 'screenshots', weight: 5, label: 'Screenshots' },
      { type: 'contributing', weight: 10, label: 'Contributing' },
      { type: 'license', weight: 15, label: 'License' },
      { type: 'contact', weight: 5, label: 'Contact' },
      { type: 'roadmap', weight: 5, label: 'Roadmap' },
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

    // Bonus checks
    const headerSection = sections.find(s => s.type === 'header');
    if (headerSection && headerSection.type === 'header' && headerSection.badges.length === 0) {
      suggestions.push({
        id: 'no-badges',
        category: 'info',
        title: 'No Badges',
        description: 'Add badges (build status, version, license) to make your README more professional.',
        sectionType: 'header',
      });
    }

    const screenshotsSection = sections.find(s => s.type === 'screenshots');
    if (screenshotsSection && screenshotsSection.type === 'screenshots' && screenshotsSection.screenshots.length === 0) {
      suggestions.push({
        id: 'empty-screenshots',
        category: 'warning',
        title: 'Empty Screenshots',
        description: 'Add actual screenshot URLs to the screenshots section.',
        sectionType: 'screenshots',
      });
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

// ─── README Store ────────────────────────────────────────────────────────────
// Central Zustand store for the README document.
// All section CRUD operations, reordering, and markdown generation live here.
// Includes localStorage persistence middleware for autosave.

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Section, SectionType } from '../types/sections';
import { createSection } from '../utils/section-factory';
import { sectionsToMarkdown } from '../markdown/generator';
import { markdownToSections } from '../markdown/parser';
import { generateId } from '../utils/id';

interface ReadmeState {
  // ─── Data ────────────────────────────────────────────────────────────────
  projectName: string;
  sections: Section[];
  lastSaved: number;

  // ─── Computed ────────────────────────────────────────────────────────────
  getMarkdown: () => string;

  // ─── Actions ─────────────────────────────────────────────────────────────
  setProjectName: (name: string) => void;
  setSections: (sections: Section[]) => void;
  addSection: (type: SectionType, index?: number) => void;
  removeSection: (id: string) => void;
  duplicateSection: (id: string) => void;
  updateSection: (id: string, updates: Partial<Section>) => void;
  reorderSections: (fromIndex: number, toIndex: number) => void;
  toggleSectionVisibility: (id: string) => void;
  setFromMarkdown: (markdown: string) => void;
  loadTemplate: (sections: Section[]) => void;
  reset: () => void;
}

const DEFAULT_SECTIONS: Section[] = [];

export const useReadmeStore = create<ReadmeState>()(
  persist(
    (set, get) => ({
      projectName: 'My Project',
      sections: DEFAULT_SECTIONS,
      lastSaved: Date.now(),

      getMarkdown: () => {
        return sectionsToMarkdown(get().sections);
      },

      setProjectName: (name) => {
        set({ projectName: name, lastSaved: Date.now() });
      },

      setSections: (sections) => {
        set({ sections, lastSaved: Date.now() });
      },

      addSection: (type, index) => {
        const section = createSection(type);
        set(state => {
          const newSections = [...state.sections];
          if (index !== undefined && index >= 0 && index <= newSections.length) {
            newSections.splice(index, 0, section);
          } else {
            newSections.push(section);
          }
          return { sections: newSections, lastSaved: Date.now() };
        });
      },

      removeSection: (id) => {
        set(state => ({
          sections: state.sections.filter(s => s.id !== id),
          lastSaved: Date.now(),
        }));
      },

      duplicateSection: (id) => {
        set(state => {
          const index = state.sections.findIndex(s => s.id === id);
          if (index === -1) return state;

          const original = state.sections[index];
          const duplicate: Section = {
            ...JSON.parse(JSON.stringify(original)),
            id: generateId(),
          };

          const newSections = [...state.sections];
          newSections.splice(index + 1, 0, duplicate);
          return { sections: newSections, lastSaved: Date.now() };
        });
      },

      updateSection: (id, updates) => {
        set(state => ({
          sections: state.sections.map(s =>
            s.id === id ? { ...s, ...updates } as Section : s
          ),
          lastSaved: Date.now(),
        }));
      },

      reorderSections: (fromIndex, toIndex) => {
        set(state => {
          const newSections = [...state.sections];
          const [moved] = newSections.splice(fromIndex, 1);
          newSections.splice(toIndex, 0, moved);
          return { sections: newSections, lastSaved: Date.now() };
        });
      },

      toggleSectionVisibility: (id) => {
        set(state => ({
          sections: state.sections.map(s =>
            s.id === id ? { ...s, visible: !s.visible } : s
          ),
          lastSaved: Date.now(),
        }));
      },

      setFromMarkdown: (markdown) => {
        const sections = markdownToSections(markdown);
        set({ sections, lastSaved: Date.now() });
      },

      loadTemplate: (sections) => {
        set({ sections, lastSaved: Date.now() });
      },

      reset: () => {
        set({ sections: [], projectName: 'My Project', lastSaved: Date.now() });
      },
    }),
    {
      name: 'readme-studio-project',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        projectName: state.projectName,
        sections: state.sections,
        lastSaved: state.lastSaved,
      }),
    }
  )
);

// ─── UI Store ────────────────────────────────────────────────────────────────
// UI-level state: view mode, theme, panel states, selected section.

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type ViewMode = 'preview' | 'markdown' | 'split';
export type ThemeMode = 'light' | 'dark' | 'system';
export type LeftPanelTab = 'templates' | 'components' | 'settings';

interface UIState {
  viewMode: ViewMode;
  theme: ThemeMode;
  resolvedTheme: 'light' | 'dark';
  selectedSectionId: string | null;
  leftPanelTab: LeftPanelTab;
  leftPanelOpen: boolean;
  rightPanelOpen: boolean;
  analyzerOpen: boolean;
  commandPaletteOpen: boolean;

  setViewMode: (mode: ViewMode) => void;
  setTheme: (theme: ThemeMode) => void;
  setResolvedTheme: (theme: 'light' | 'dark') => void;
  selectSection: (id: string | null) => void;
  setLeftPanelTab: (tab: LeftPanelTab) => void;
  toggleLeftPanel: () => void;
  toggleRightPanel: () => void;
  toggleAnalyzer: () => void;
  toggleCommandPalette: () => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      viewMode: 'preview',
      theme: 'dark',
      resolvedTheme: 'dark',
      selectedSectionId: null,
      leftPanelTab: 'components',
      leftPanelOpen: true,
      rightPanelOpen: true,
      analyzerOpen: false,
      commandPaletteOpen: false,

      setViewMode: (mode) => set({ viewMode: mode }),
      setTheme: (theme) => set({ theme }),
      setResolvedTheme: (resolvedTheme) => set({ resolvedTheme }),
      selectSection: (id) => set({ selectedSectionId: id, rightPanelOpen: id !== null }),
      setLeftPanelTab: (tab) => set({ leftPanelTab: tab }),
      toggleLeftPanel: () => set(s => ({ leftPanelOpen: !s.leftPanelOpen })),
      toggleRightPanel: () => set(s => ({ rightPanelOpen: !s.rightPanelOpen })),
      toggleAnalyzer: () => set(s => ({ analyzerOpen: !s.analyzerOpen })),
      toggleCommandPalette: () => set(s => ({ commandPaletteOpen: !s.commandPaletteOpen })),
    }),
    {
      name: 'readme-studio-ui',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        theme: state.theme,
        leftPanelOpen: state.leftPanelOpen,
        rightPanelOpen: state.rightPanelOpen,
        viewMode: state.viewMode,
      }),
    }
  )
);

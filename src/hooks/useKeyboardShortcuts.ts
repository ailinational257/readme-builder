// ─── Keyboard Shortcuts ─────────────────────────────────────────────────────
// Global keyboard shortcut handler for the builder.

import { useEffect } from 'react';
import { useUIStore } from '../store/ui-store';
import { useReadmeStore } from '../store/readme-store';
import { useHistoryStore } from '../store/history-store';
import { exportAsMarkdown } from '../services/export-service';

export function useKeyboardShortcuts() {
  const toggleCommandPalette = useUIStore(s => s.toggleCommandPalette);
  const selectSection = useUIStore(s => s.selectSection);
  const selectedSectionId = useUIStore(s => s.selectedSectionId);
  const commandPaletteOpen = useUIStore(s => s.commandPaletteOpen);
  const analyzerOpen = useUIStore(s => s.analyzerOpen);
  const toggleAnalyzer = useUIStore(s => s.toggleAnalyzer);

  const sections = useReadmeStore(s => s.sections);
  const setSections = useReadmeStore(s => s.setSections);
  const removeSection = useReadmeStore(s => s.removeSection);

  const undo = useHistoryStore(s => s.undo);
  const redo = useHistoryStore(s => s.redo);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable;

      // Ctrl+K — Command Palette (always works)
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        toggleCommandPalette();
        return;
      }

      // Escape — Close panels
      if (e.key === 'Escape') {
        if (commandPaletteOpen) {
          toggleCommandPalette();
          return;
        }
        if (analyzerOpen) {
          toggleAnalyzer();
          return;
        }
        if (selectedSectionId) {
          selectSection(null);
          return;
        }
      }

      // Don't handle shortcuts when typing in inputs
      if (isInput) return;

      // Ctrl+Z — Undo
      if ((e.ctrlKey || e.metaKey) && !e.shiftKey && e.key === 'z') {
        e.preventDefault();
        const restored = undo();
        if (restored) setSections(restored);
        return;
      }

      // Ctrl+Shift+Z — Redo
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'Z') {
        e.preventDefault();
        const restored = redo();
        if (restored) setSections(restored);
        return;
      }

      // Ctrl+S — Export
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        exportAsMarkdown(sections);
        return;
      }

      // Delete — Remove selected section
      if (e.key === 'Delete' && selectedSectionId) {
        e.preventDefault();
        removeSection(selectedSectionId);
        selectSection(null);
        return;
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [
    toggleCommandPalette,
    selectSection,
    selectedSectionId,
    commandPaletteOpen,
    analyzerOpen,
    toggleAnalyzer,
    sections,
    setSections,
    removeSection,
    undo,
    redo,
  ]);
}

// ─── History Store ───────────────────────────────────────────────────────────
// Manages undo/redo state with snapshots of sections.

import { create } from 'zustand';
import type { Section } from '../types/sections';

interface Snapshot {
  sections: Section[];
  timestamp: number;
}

interface HistoryState {
  past: Snapshot[];
  future: Snapshot[];
  maxSnapshots: number;

  canUndo: () => boolean;
  canRedo: () => boolean;

  pushSnapshot: (sections: Section[]) => void;
  undo: () => Section[] | null;
  redo: () => Section[] | null;
  clear: () => void;
}

export const useHistoryStore = create<HistoryState>()((set, get) => ({
  past: [],
  future: [],
  maxSnapshots: 50,

  canUndo: () => get().past.length > 0,
  canRedo: () => get().future.length > 0,

  pushSnapshot: (sections) => {
    const snapshot: Snapshot = {
      sections: JSON.parse(JSON.stringify(sections)),
      timestamp: Date.now(),
    };

    set(state => {
      const past = [...state.past, snapshot];
      // Trim to max snapshots
      if (past.length > state.maxSnapshots) {
        past.shift();
      }
      return {
        past,
        future: [], // Clear redo stack on new change
      };
    });
  },

  undo: () => {
    const { past } = get();
    if (past.length === 0) return null;

    const previous = past[past.length - 1];
    set(state => ({
      past: state.past.slice(0, -1),
      future: [...state.future, previous],
    }));

    // Return the snapshot before the one we just popped
    const newPast = get().past;
    if (newPast.length > 0) {
      return newPast[newPast.length - 1].sections;
    }
    return [];
  },

  redo: () => {
    const { future } = get();
    if (future.length === 0) return null;

    const next = future[future.length - 1];
    set(state => ({
      past: [...state.past, next],
      future: state.future.slice(0, -1),
    }));

    return next.sections;
  },

  clear: () => set({ past: [], future: [] }),
}));

// ─── Analyzer Panel ──────────────────────────────────────────────────────────
// Displays README quality score and suggestions.

import { AlertTriangle, CheckCircle, Info, Plus, X } from 'lucide-react';
import { useAnalyzerStore, type AnalyzerSuggestion } from '../../store/analyzer-store';
import { useUIStore } from '../../store/ui-store';
import { useReadmeStore } from '../../store/readme-store';
import type { SectionType } from '../../types/sections';

export function AnalyzerPanel() {
  const analyzerOpen = useUIStore(s => s.analyzerOpen);
  const toggleAnalyzer = useUIStore(s => s.toggleAnalyzer);
  const score = useAnalyzerStore(s => s.score);
  const suggestions = useAnalyzerStore(s => s.suggestions);
  const addSection = useReadmeStore(s => s.addSection);

  if (!analyzerOpen) return null;

  const scoreColor = score >= 80 ? 'var(--color-accent-success)' : score >= 50 ? 'var(--color-accent-warning)' : 'var(--color-accent-error)';
  const scoreLabel = score >= 80 ? 'Excellent' : score >= 60 ? 'Good' : score >= 40 ? 'Needs Work' : 'Poor';

  return (
    <div className="fixed bottom-10 right-4 w-80 bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-xl shadow-lg z-50 animate-scale-in overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--color-border)]">
        <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">README Analyzer</h3>
        <button onClick={toggleAnalyzer} className="p-1 rounded-md hover:bg-[var(--color-bg-hover)] text-[var(--color-text-tertiary)]">
          <X size={14} />
        </button>
      </div>

      {/* Score */}
      <div className="flex items-center gap-4 px-4 py-4">
        <div className="relative w-16 h-16">
          <svg className="w-16 h-16 -rotate-90" viewBox="0 0 36 36">
            <path
              d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="var(--color-border)"
              strokeWidth="3"
            />
            <path
              d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke={scoreColor}
              strokeWidth="3"
              strokeDasharray={`${score}, 100`}
              strokeLinecap="round"
              className="transition-all duration-500 ease-out"
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-lg font-bold" style={{ color: scoreColor }}>{score}</span>
        </div>
        <div>
          <p className="text-sm font-semibold text-[var(--color-text-primary)]">{scoreLabel}</p>
          <p className="text-xs text-[var(--color-text-tertiary)]">
            {suggestions.length === 0 ? 'Your README is comprehensive!' : `${suggestions.length} suggestion${suggestions.length > 1 ? 's' : ''}`}
          </p>
        </div>
      </div>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="px-4 pb-4 max-h-48 overflow-y-auto space-y-2">
          {suggestions.map(s => (
            <SuggestionItem key={s.id} suggestion={s} onAdd={() => addSection(s.sectionType as SectionType)} />
          ))}
        </div>
      )}
    </div>
  );
}

function SuggestionItem({ suggestion, onAdd }: { suggestion: AnalyzerSuggestion; onAdd: () => void }) {
  const Icon = suggestion.category === 'error' ? AlertTriangle : suggestion.category === 'warning' ? AlertTriangle : suggestion.category === 'info' ? Info : CheckCircle;
  const color = suggestion.category === 'error' ? 'var(--color-accent-error)' : suggestion.category === 'warning' ? 'var(--color-accent-warning)' : 'var(--color-accent-info)';

  return (
    <div className="flex items-start gap-2 p-2 rounded-md bg-[var(--color-bg-surface)] border border-[var(--color-border)]">
      <Icon size={14} className="mt-0.5 shrink-0" style={{ color }} />
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-[var(--color-text-primary)]">{suggestion.title}</p>
        <p className="text-[10px] text-[var(--color-text-tertiary)] mt-0.5">{suggestion.description}</p>
      </div>
      <button
        onClick={onAdd}
        className="p-1 rounded-md hover:bg-[var(--color-accent-primary-muted)] text-[var(--color-accent-primary)] transition-colors shrink-0"
        title="Add this section"
      >
        <Plus size={12} />
      </button>
    </div>
  );
}

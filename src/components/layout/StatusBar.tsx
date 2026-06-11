// ─── Status Bar ─────────────────────────────────────────────────────────────

import { useEffect } from 'react';
import { Activity, FileText, Layers, Clock, BarChart3 } from 'lucide-react';
import { useReadmeStore } from '../../store/readme-store';
import { useUIStore } from '../../store/ui-store';
import { useAnalyzerStore } from '../../store/analyzer-store';

export function StatusBar() {
  const sections = useReadmeStore(s => s.sections);
  const lastSaved = useReadmeStore(s => s.lastSaved);
  const viewMode = useUIStore(s => s.viewMode);
  const setViewMode = useUIStore(s => s.setViewMode);
  const analyzerOpen = useUIStore(s => s.analyzerOpen);
  const toggleAnalyzer = useUIStore(s => s.toggleAnalyzer);
  const score = useAnalyzerStore(s => s.score);
  const analyze = useAnalyzerStore(s => s.analyze);

  // Re-analyze when sections change
  useEffect(() => {
    analyze(sections);
  }, [sections, analyze]);

  const markdown = useReadmeStore(s => s.getMarkdown());
  const wordCount = markdown.split(/\s+/).filter(Boolean).length;
  const charCount = markdown.length;

  const timeAgo = getTimeAgo(lastSaved);

  const scoreColor = score >= 80 ? 'var(--color-accent-success)' : score >= 50 ? 'var(--color-accent-warning)' : 'var(--color-accent-error)';

  return (
    <footer className="h-7 border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)] flex items-center px-3 gap-4 text-[10px] text-[var(--color-text-tertiary)] shrink-0 z-50">
      {/* View Mode Toggle */}
      <div className="flex items-center gap-0.5 bg-[var(--color-bg-surface)] rounded-md p-0.5 border border-[var(--color-border)]">
        <button
          onClick={() => setViewMode('preview')}
          className={`px-2 py-0.5 rounded text-[10px] font-medium transition-all ${viewMode === 'preview' ? 'bg-[var(--color-accent-primary)] text-white' : 'text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)]'}`}
        >
          Preview
        </button>
        <button
          onClick={() => setViewMode('markdown')}
          className={`px-2 py-0.5 rounded text-[10px] font-medium transition-all ${viewMode === 'markdown' ? 'bg-[var(--color-accent-primary)] text-white' : 'text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)]'}`}
        >
          Markdown
        </button>
        <button
          onClick={() => setViewMode('split')}
          className={`px-2 py-0.5 rounded text-[10px] font-medium transition-all ${viewMode === 'split' ? 'bg-[var(--color-accent-primary)] text-white' : 'text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)]'}`}
        >
          Split
        </button>
      </div>

      <div className="flex items-center gap-1">
        <Layers size={10} />
        <span>{sections.length} sections</span>
      </div>

      <div className="flex items-center gap-1">
        <FileText size={10} />
        <span>{wordCount} words · {charCount} chars</span>
      </div>

      <div className="flex-1" />

      {/* Analyzer Score */}
      <button
        onClick={toggleAnalyzer}
        className={`flex items-center gap-1 px-2 py-0.5 rounded-md transition-all hover:bg-[var(--color-bg-hover)] ${analyzerOpen ? 'bg-[var(--color-bg-hover)]' : ''}`}
      >
        <BarChart3 size={10} />
        <span>Score:</span>
        <span className="font-semibold" style={{ color: scoreColor }}>{score}</span>
      </button>

      <div className="flex items-center gap-1">
        <Clock size={10} />
        <span>Saved {timeAgo}</span>
      </div>

      <div className="flex items-center gap-1">
        <Activity size={10} className="text-[var(--color-accent-success)]" />
        <span className="text-[var(--color-accent-success)]">Autosave on</span>
      </div>
    </footer>
  );
}

function getTimeAgo(timestamp: number): string {
  const diff = Date.now() - timestamp;
  if (diff < 5000) return 'just now';
  if (diff < 60000) return `${Math.floor(diff / 1000)}s ago`;
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
  return `${Math.floor(diff / 3600000)}h ago`;
}

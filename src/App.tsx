// ─── App ─────────────────────────────────────────────────────────────────────
// Main application shell assembling all layout components.

import { TopNav } from './components/layout/TopNav';
import { LeftSidebar } from './components/layout/LeftSidebar';
import { RightPanel } from './components/layout/RightPanel';
import { StatusBar } from './components/layout/StatusBar';
import { VisualBuilder } from './editor/VisualBuilder';
import { MarkdownEditor } from './editor/MarkdownEditor';
import { MarkdownPreviewPanel } from './editor/MarkdownPreview';
import { AnalyzerPanel } from './features/analyzer/AnalyzerPanel';
import { useTheme } from './hooks/use-theme';
import { useUIStore } from './store/ui-store';
import { PanelLeft, PanelRight } from 'lucide-react';

export default function App() {
  useTheme();

  const viewMode = useUIStore(s => s.viewMode);
  const leftPanelOpen = useUIStore(s => s.leftPanelOpen);
  const toggleLeftPanel = useUIStore(s => s.toggleLeftPanel);
  const rightPanelOpen = useUIStore(s => s.rightPanelOpen);
  const toggleRightPanel = useUIStore(s => s.toggleRightPanel);
  const selectedSectionId = useUIStore(s => s.selectedSectionId);

  return (
    <div className="h-screen flex flex-col bg-[var(--color-bg-primary)]">
      {/* Top Navigation */}
      <TopNav />

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel Toggle (when collapsed) */}
        {!leftPanelOpen && (
          <button
            onClick={toggleLeftPanel}
            className="w-10 flex items-center justify-center border-r border-[var(--color-border)] bg-[var(--color-bg-secondary)] text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-hover)] transition-colors"
            aria-label="Open left panel"
          >
            <PanelLeft size={16} />
          </button>
        )}

        {/* Left Sidebar */}
        <LeftSidebar />

        {/* Center Canvas */}
        <main className="flex-1 flex flex-col overflow-hidden bg-[var(--color-bg-primary)] relative">
          {/* Panel collapse buttons */}
          <div className="absolute top-2 left-2 z-10 flex gap-1">
            {leftPanelOpen && (
              <button
                onClick={toggleLeftPanel}
                className="p-1.5 rounded-md bg-[var(--color-bg-elevated)] border border-[var(--color-border)] text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-hover)] transition-all shadow-sm"
                aria-label="Close left panel"
              >
                <PanelLeft size={13} />
              </button>
            )}
          </div>
          <div className="absolute top-2 right-2 z-10 flex gap-1">
            {selectedSectionId && (
              <button
                onClick={toggleRightPanel}
                className="p-1.5 rounded-md bg-[var(--color-bg-elevated)] border border-[var(--color-border)] text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-hover)] transition-all shadow-sm"
                aria-label={rightPanelOpen ? "Close right panel" : "Open right panel"}
              >
                <PanelRight size={13} />
              </button>
            )}
          </div>

          {/* View Mode Content */}
          {viewMode === 'preview' && <VisualBuilder />}
          {viewMode === 'markdown' && <MarkdownEditor />}
          {viewMode === 'split' && (
            <div className="flex-1 flex overflow-hidden">
              <div className="flex-1 border-r border-[var(--color-border)] overflow-hidden flex flex-col">
                <div className="px-3 py-1.5 text-[10px] font-medium text-[var(--color-text-tertiary)] uppercase tracking-wider border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
                  Editor
                </div>
                <MarkdownEditor />
              </div>
              <div className="flex-1 overflow-hidden flex flex-col">
                <div className="px-3 py-1.5 text-[10px] font-medium text-[var(--color-text-tertiary)] uppercase tracking-wider border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
                  Preview
                </div>
                <MarkdownPreviewPanel />
              </div>
            </div>
          )}
        </main>

        {/* Right Panel */}
        <RightPanel />
      </div>

      {/* Status Bar */}
      <StatusBar />

      {/* Analyzer Panel (floating) */}
      <AnalyzerPanel />
    </div>
  );
}

// ─── Command Palette ────────────────────────────────────────────────────────
// Ctrl+K command menu inspired by Linear/VS Code/Raycast.

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  Search,
  Copy,
  Trash2,
  Download,
  Sun,
  Moon,
  Undo2,
  Redo2,
  FileText,
  Sparkles,
  Info,
  ListChecks,
  Layers,
  Code,
  Image,
  Play,
  Map,
  HelpCircle,
  GitPullRequest,
  Users,
  Scale,
  Mail,
  PenTool,
  LayoutTemplate,
} from 'lucide-react';
import { useUIStore } from '../../store/ui-store';
import { useReadmeStore } from '../../store/readme-store';
import { useHistoryStore } from '../../store/history-store';
import { exportAsMarkdown, copyToClipboard } from '../../services/export-service';
import type { SectionType } from '../../types/sections';

interface Command {
  id: string;
  label: string;
  description?: string;
  icon: typeof Search;
  category: string;
  action: () => void;
  shortcut?: string;
}

export function CommandPalette() {
  const isOpen = useUIStore(s => s.commandPaletteOpen);
  const toggle = useUIStore(s => s.toggleCommandPalette);
  const addSection = useReadmeStore(s => s.addSection);
  const sections = useReadmeStore(s => s.sections);
  const selectedSectionId = useUIStore(s => s.selectedSectionId);
  const removeSection = useReadmeStore(s => s.removeSection);
  const duplicateSection = useReadmeStore(s => s.duplicateSection);
  const setTheme = useUIStore(s => s.setTheme);
  const setViewMode = useUIStore(s => s.setViewMode);
  const undo = useHistoryStore(s => s.undo);
  const redo = useHistoryStore(s => s.redo);

  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const sectionCommands: { type: SectionType; label: string; icon: typeof Search }[] = [
    { type: 'header', label: 'Header', icon: FileText },
    { type: 'hero', label: 'Hero', icon: Sparkles },
    { type: 'about', label: 'About', icon: Info },
    { type: 'features', label: 'Features', icon: ListChecks },
    { type: 'tech-stack', label: 'Tech Stack', icon: Layers },
    { type: 'installation', label: 'Installation', icon: Download },
    { type: 'usage', label: 'Usage', icon: Code },
    { type: 'screenshots', label: 'Screenshots', icon: Image },
    { type: 'demo', label: 'Demo', icon: Play },
    { type: 'roadmap', label: 'Roadmap', icon: Map },
    { type: 'faq', label: 'FAQ', icon: HelpCircle },
    { type: 'contributing', label: 'Contributing', icon: GitPullRequest },
    { type: 'contributors', label: 'Contributors', icon: Users },
    { type: 'license', label: 'License', icon: Scale },
    { type: 'contact', label: 'Contact', icon: Mail },
    { type: 'custom', label: 'Custom', icon: PenTool },
  ];

  const commands: Command[] = useMemo(() => [
    // Section creation
    ...sectionCommands.map(s => ({
      id: `add-${s.type}`,
      label: `Add ${s.label} Section`,
      description: `Insert a new ${s.label.toLowerCase()} section`,
      icon: s.icon,
      category: 'Add Section',
      action: () => { addSection(s.type); toggle(); },
    })),
    // Actions
    ...(selectedSectionId ? [
      {
        id: 'duplicate-section',
        label: 'Duplicate Section',
        description: 'Duplicate the selected section',
        icon: Copy,
        category: 'Actions',
        action: () => { duplicateSection(selectedSectionId); toggle(); },
      },
      {
        id: 'delete-section',
        label: 'Delete Section',
        description: 'Remove the selected section',
        icon: Trash2,
        category: 'Actions',
        action: () => { removeSection(selectedSectionId); toggle(); },
        shortcut: 'Del',
      },
    ] : []),
    // Export
    {
      id: 'export-md',
      label: 'Export as Markdown',
      description: 'Download README.md file',
      icon: Download,
      category: 'Export',
      action: () => { exportAsMarkdown(sections); toggle(); },
    },
    {
      id: 'copy-clipboard',
      label: 'Copy to Clipboard',
      description: 'Copy markdown to clipboard',
      icon: Copy,
      category: 'Export',
      action: () => { copyToClipboard(sections); toggle(); },
      shortcut: 'Ctrl+C',
    },
    // History
    {
      id: 'undo',
      label: 'Undo',
      icon: Undo2,
      category: 'History',
      action: () => { undo(); toggle(); },
      shortcut: 'Ctrl+Z',
    },
    {
      id: 'redo',
      label: 'Redo',
      icon: Redo2,
      category: 'History',
      action: () => { redo(); toggle(); },
      shortcut: 'Ctrl+Shift+Z',
    },
    // View
    {
      id: 'view-preview',
      label: 'Switch to Preview',
      icon: LayoutTemplate,
      category: 'View',
      action: () => { setViewMode('preview'); toggle(); },
    },
    {
      id: 'view-markdown',
      label: 'Switch to Markdown',
      icon: Code,
      category: 'View',
      action: () => { setViewMode('markdown'); toggle(); },
    },
    {
      id: 'view-split',
      label: 'Switch to Split View',
      icon: Layers,
      category: 'View',
      action: () => { setViewMode('split'); toggle(); },
    },
    // Theme
    {
      id: 'theme-dark',
      label: 'Dark Theme',
      icon: Moon,
      category: 'Theme',
      action: () => { setTheme('dark'); toggle(); },
    },
    {
      id: 'theme-light',
      label: 'Light Theme',
      icon: Sun,
      category: 'Theme',
      action: () => { setTheme('light'); toggle(); },
    },
  ], [addSection, sections, selectedSectionId, duplicateSection, removeSection, toggle, undo, redo, setViewMode, setTheme, sectionCommands]);

  const filteredCommands = useMemo(() => {
    if (!query.trim()) return commands;
    const q = query.toLowerCase();
    return commands.filter(c =>
      c.label.toLowerCase().includes(q) ||
      c.description?.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q)
    );
  }, [query, commands]);

  // Group by category
  const grouped = useMemo(() => {
    const groups: Record<string, Command[]> = {};
    filteredCommands.forEach(cmd => {
      if (!groups[cmd.category]) groups[cmd.category] = [];
      groups[cmd.category].push(cmd);
    });
    return groups;
  }, [filteredCommands]);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(i => Math.min(i + 1, filteredCommands.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(i => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      filteredCommands[selectedIndex]?.action();
    } else if (e.key === 'Escape') {
      toggle();
    }
  }, [filteredCommands, selectedIndex, toggle]);

  // Scroll selected item into view
  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-index="${selectedIndex}"]`);
    el?.scrollIntoView({ block: 'nearest' });
  }, [selectedIndex]);

  if (!isOpen) return null;

  let flatIndex = -1;

  return (
    <>
      <div className="command-palette-backdrop" onClick={toggle} />
      <div className="command-palette" role="dialog" aria-label="Command palette">
        {/* Search Input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--color-border)]">
          <Search size={16} className="text-[var(--color-text-tertiary)] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a command..."
            className="flex-1 bg-transparent text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] outline-none"
            aria-label="Search commands"
          />
          <kbd className="hidden md:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono text-[var(--color-text-tertiary)] bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded">Esc</kbd>
        </div>

        {/* Results */}
        <div ref={listRef} className="max-h-72 overflow-y-auto py-2" role="listbox">
          {filteredCommands.length === 0 ? (
            <div className="px-4 py-8 text-center text-sm text-[var(--color-text-tertiary)]">
              No commands found for "{query}"
            </div>
          ) : (
            Object.entries(grouped).map(([category, cmds]) => (
              <div key={category}>
                <div className="px-4 py-1.5 text-[10px] font-medium text-[var(--color-text-tertiary)] uppercase tracking-wider">
                  {category}
                </div>
                {cmds.map(cmd => {
                  flatIndex++;
                  const idx = flatIndex;
                  const Icon = cmd.icon;
                  return (
                    <button
                      key={cmd.id}
                      data-index={idx}
                      role="option"
                      aria-selected={idx === selectedIndex}
                      onClick={cmd.action}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`w-full flex items-center gap-3 px-4 py-2 text-left transition-colors ${
                        idx === selectedIndex
                          ? 'bg-[var(--color-accent-primary-muted)] text-[var(--color-text-primary)]'
                          : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-hover)]'
                      }`}
                    >
                      <Icon size={14} className="shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm truncate">{cmd.label}</div>
                        {cmd.description && (
                          <div className="text-[10px] text-[var(--color-text-tertiary)] truncate">{cmd.description}</div>
                        )}
                      </div>
                      {cmd.shortcut && (
                        <kbd className="text-[10px] font-mono text-[var(--color-text-tertiary)] bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded px-1.5 py-0.5 shrink-0">
                          {cmd.shortcut}
                        </kbd>
                      )}
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center gap-4 px-4 py-2 border-t border-[var(--color-border)] text-[10px] text-[var(--color-text-tertiary)]">
          <span className="flex items-center gap-1">
            <kbd className="px-1 py-0.5 bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded font-mono">↑↓</kbd>
            navigate
          </span>
          <span className="flex items-center gap-1">
            <kbd className="px-1 py-0.5 bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded font-mono">↵</kbd>
            select
          </span>
          <span className="flex items-center gap-1">
            <kbd className="px-1 py-0.5 bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded font-mono">esc</kbd>
            close
          </span>
        </div>
      </div>
    </>
  );
}

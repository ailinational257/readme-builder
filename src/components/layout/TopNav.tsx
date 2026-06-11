// ─── Top Navigation Bar ─────────────────────────────────────────────────────

import { useState, useRef, useCallback } from 'react';
import {
  FileText,
  Download,
  Upload,
  Sun,
  Moon,
  Monitor,
  ChevronDown,
  Copy,
  FileJson,
  FolderArchive,
  GitBranch,
  FileUp,
} from 'lucide-react';
import { useReadmeStore } from '../../store/readme-store';
import { useUIStore, type ThemeMode } from '../../store/ui-store';
import { exportAsMarkdown, exportAsJSON, exportAsZip, copyToClipboard } from '../../services/export-service';
import { importFromMarkdownFile, importFromJSONFile, importFromGitHub } from '../../services/import-service';

export function TopNav() {
  const projectName = useReadmeStore(s => s.projectName);
  const setProjectName = useReadmeStore(s => s.setProjectName);
  const sections = useReadmeStore(s => s.sections);
  const setSections = useReadmeStore(s => s.setSections);
  const theme = useUIStore(s => s.theme);
  const setTheme = useUIStore(s => s.setTheme);

  const [exportOpen, setExportOpen] = useState(false);
  const [importOpen, setImportOpen] = useState(false);
  const [importing, setImporting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [githubUrl, setGithubUrl] = useState('');
  const [showGithubInput, setShowGithubInput] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const themeOptions: { value: ThemeMode; icon: typeof Sun; label: string }[] = [
    { value: 'light', icon: Sun, label: 'Light' },
    { value: 'dark', icon: Moon, label: 'Dark' },
    { value: 'system', icon: Monitor, label: 'System' },
  ];

  const currentTheme = themeOptions.find(t => t.value === theme) || themeOptions[1];
  const ThemeIcon = currentTheme.icon;

  const cycleTheme = useCallback(() => {
    const order: ThemeMode[] = ['dark', 'light', 'system'];
    const idx = order.indexOf(theme);
    setTheme(order[(idx + 1) % order.length]);
  }, [theme, setTheme]);

  const handleCopy = async () => {
    await copyToClipboard(sections);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFileImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImporting(true);
    try {
      const isJSON = file.name.endsWith('.json');
      const result = isJSON
        ? await importFromJSONFile(file)
        : await importFromMarkdownFile(file);

      if (result.success) {
        setSections(result.sections);
        if (result.projectName) setProjectName(result.projectName);
      }
    } finally {
      setImporting(false);
      setImportOpen(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleGithubImport = async () => {
    if (!githubUrl.trim()) return;
    setImporting(true);
    try {
      const result = await importFromGitHub(githubUrl);
      if (result.success) {
        setSections(result.sections);
        if (result.projectName) setProjectName(result.projectName);
      }
    } finally {
      setImporting(false);
      setShowGithubInput(false);
      setImportOpen(false);
      setGithubUrl('');
    }
  };

  return (
    <header className="h-12 border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)] flex items-center px-4 gap-3 shrink-0 z-50">
      {/* Logo & Name */}
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)] flex items-center justify-center shadow-sm">
          <FileText size={14} className="text-white" />
        </div>
        <input
          id="project-name-input"
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          className="bg-transparent text-sm font-semibold text-[var(--color-text-primary)] border-none outline-none w-40 focus:ring-1 focus:ring-[var(--color-accent-primary)] rounded px-1 -ml-1 transition-all"
          aria-label="Project name"
        />
      </div>

      <div className="flex-1" />

      {/* Import */}
      <div className="relative">
        <button
          id="import-btn"
          onClick={() => { setImportOpen(!importOpen); setExportOpen(false); }}
          className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-hover)] rounded-md transition-all"
          aria-label="Import"
        >
          <Upload size={14} />
          Import
          <ChevronDown size={12} />
        </button>
        {importOpen && (
          <div className="absolute top-full right-0 mt-1 w-64 bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-lg shadow-lg py-1 z-50 animate-scale-in">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-hover)] transition-colors"
            >
              <FileUp size={14} />
              Import Markdown File
            </button>
            <button
              onClick={() => { fileInputRef.current?.click(); }}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-hover)] transition-colors"
            >
              <FileJson size={14} />
              Import JSON Template
            </button>
            <div className="h-px bg-[var(--color-border)] my-1" />
            <button
              onClick={() => setShowGithubInput(true)}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-hover)] transition-colors"
            >
              <GitBranch size={14} />
              Import from GitHub URL
            </button>
            {showGithubInput && (
              <div className="px-3 py-2">
                <input
                  type="text"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  placeholder="https://github.com/owner/repo"
                  className="w-full px-2.5 py-1.5 text-xs bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-md text-[var(--color-text-primary)] outline-none focus:border-[var(--color-accent-primary)] transition-colors"
                  onKeyDown={(e) => e.key === 'Enter' && handleGithubImport()}
                />
                <button
                  onClick={handleGithubImport}
                  disabled={importing}
                  className="w-full mt-1.5 px-2.5 py-1.5 text-xs font-medium bg-[var(--color-accent-primary)] text-white rounded-md hover:bg-[var(--color-accent-primary-hover)] transition-colors disabled:opacity-50"
                >
                  {importing ? 'Importing...' : 'Import'}
                </button>
              </div>
            )}
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept=".md,.json"
          className="hidden"
          onChange={handleFileImport}
        />
      </div>

      {/* Export */}
      <div className="relative">
        <button
          id="export-btn"
          onClick={() => { setExportOpen(!exportOpen); setImportOpen(false); }}
          className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium bg-[var(--color-accent-primary)] text-white rounded-md hover:bg-[var(--color-accent-primary-hover)] transition-all"
          aria-label="Export"
        >
          <Download size={14} />
          Export
          <ChevronDown size={12} />
        </button>
        {exportOpen && (
          <div className="absolute top-full right-0 mt-1 w-52 bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-lg shadow-lg py-1 z-50 animate-scale-in">
            <button
              onClick={() => { exportAsMarkdown(sections); setExportOpen(false); }}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-hover)] transition-colors"
            >
              <FileText size={14} />
              README.md
            </button>
            <button
              onClick={() => { exportAsJSON(sections, projectName); setExportOpen(false); }}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-hover)] transition-colors"
            >
              <FileJson size={14} />
              JSON Template
            </button>
            <button
              onClick={() => { exportAsZip(sections, projectName); setExportOpen(false); }}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-hover)] transition-colors"
            >
              <FolderArchive size={14} />
              ZIP Archive
            </button>
            <div className="h-px bg-[var(--color-border)] my-1" />
            <button
              onClick={() => { handleCopy(); setExportOpen(false); }}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-hover)] transition-colors"
            >
              <Copy size={14} />
              {copied ? '✓ Copied!' : 'Copy to Clipboard'}
            </button>
          </div>
        )}
      </div>

      {/* Theme Toggle */}
      <button
        id="theme-toggle"
        onClick={cycleTheme}
        className="flex items-center justify-center w-8 h-8 rounded-md text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-hover)] transition-all"
        aria-label={`Switch theme (current: ${currentTheme.label})`}
        title={`Theme: ${currentTheme.label}`}
      >
        <ThemeIcon size={16} />
      </button>
    </header>
  );
}

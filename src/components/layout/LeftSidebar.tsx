// ─── Left Sidebar ───────────────────────────────────────────────────────────
// Contains tabs for Templates, Components (section types), and Settings.

import { useState } from 'react';
import {
  LayoutTemplate,
  Component,
  Settings,
  Plus,
  Heading1 as Heading,
  Sparkles,
  Info,
  ListChecks,
  Layers,
  Download,
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
  ChevronRight,
} from 'lucide-react';
import { useReadmeStore } from '../../store/readme-store';
import { useUIStore, type LeftPanelTab } from '../../store/ui-store';
import { ALL_TEMPLATES } from '../../templates';
import type { SectionType } from '../../types/sections';

const ICON_MAP: Record<string, typeof Heading> = {
  heading: Heading,
  sparkles: Sparkles,
  info: Info,
  'list-checks': ListChecks,
  layers: Layers,
  download: Download,
  code: Code,
  image: Image,
  play: Play,
  map: Map,
  'help-circle': HelpCircle,
  'git-pull-request': GitPullRequest,
  users: Users,
  scale: Scale,
  mail: Mail,
  'pen-tool': PenTool,
};

const SECTION_ITEMS: { type: SectionType; label: string; icon: string; description: string }[] = [
  { type: 'header', label: 'Header', icon: 'heading', description: 'Title, logo & badges' },
  { type: 'hero', label: 'Hero', icon: 'sparkles', description: 'Eye-catching hero' },
  { type: 'about', label: 'About', icon: 'info', description: 'Project overview' },
  { type: 'features', label: 'Features', icon: 'list-checks', description: 'Key features list' },
  { type: 'tech-stack', label: 'Tech Stack', icon: 'layers', description: 'Technologies used' },
  { type: 'installation', label: 'Installation', icon: 'download', description: 'Setup instructions' },
  { type: 'usage', label: 'Usage', icon: 'code', description: 'Code examples' },
  { type: 'screenshots', label: 'Screenshots', icon: 'image', description: 'Image gallery' },
  { type: 'demo', label: 'Demo', icon: 'play', description: 'Live demo / video' },
  { type: 'roadmap', label: 'Roadmap', icon: 'map', description: 'Project roadmap' },
  { type: 'faq', label: 'FAQ', icon: 'help-circle', description: 'Questions & answers' },
  { type: 'contributing', label: 'Contributing', icon: 'git-pull-request', description: 'How to contribute' },
  { type: 'contributors', label: 'Contributors', icon: 'users', description: 'Team members' },
  { type: 'license', label: 'License', icon: 'scale', description: 'License info' },
  { type: 'contact', label: 'Contact', icon: 'mail', description: 'Contact details' },
  { type: 'custom', label: 'Custom', icon: 'pen-tool', description: 'Custom markdown' },
];

const TABS: { id: LeftPanelTab; label: string; icon: typeof LayoutTemplate }[] = [
  { id: 'templates', label: 'Templates', icon: LayoutTemplate },
  { id: 'components', label: 'Sections', icon: Component },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export function LeftSidebar() {
  const leftPanelTab = useUIStore(s => s.leftPanelTab);
  const setLeftPanelTab = useUIStore(s => s.setLeftPanelTab);
  const leftPanelOpen = useUIStore(s => s.leftPanelOpen);
  const addSection = useReadmeStore(s => s.addSection);
  const loadTemplate = useReadmeStore(s => s.loadTemplate);
  const setProjectName = useReadmeStore(s => s.setProjectName);
  const [searchQuery, setSearchQuery] = useState('');

  if (!leftPanelOpen) return null;

  const filteredSections = SECTION_ITEMS.filter(s =>
    s.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <aside className="w-64 border-r border-[var(--color-border)] bg-[var(--color-bg-secondary)] flex flex-col shrink-0 animate-slide-in-left">
      {/* Tabs */}
      <div className="flex border-b border-[var(--color-border)]">
        {TABS.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setLeftPanelTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium transition-all border-b-2 ${
                leftPanelTab === tab.id
                  ? 'text-[var(--color-accent-primary)] border-[var(--color-accent-primary)] bg-[var(--color-accent-primary-muted)]'
                  : 'text-[var(--color-text-tertiary)] border-transparent hover:text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-hover)]'
              }`}
              aria-label={tab.label}
            >
              <Icon size={14} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto">
        {leftPanelTab === 'components' && (
          <div className="p-3">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search sections..."
              className="w-full px-3 py-1.5 text-xs bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-md text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] outline-none focus:border-[var(--color-accent-primary)] transition-colors mb-2"
            />
            <div className="space-y-0.5">
              {filteredSections.map(item => {
                const Icon = ICON_MAP[item.icon] || PenTool;
                return (
                  <button
                    key={item.type}
                    onClick={() => addSection(item.type)}
                    className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md text-left hover:bg-[var(--color-bg-hover)] group transition-all"
                    aria-label={`Add ${item.label} section`}
                  >
                    <div className="w-7 h-7 rounded-md bg-[var(--color-bg-surface)] border border-[var(--color-border)] flex items-center justify-center shrink-0 group-hover:border-[var(--color-accent-primary)] group-hover:bg-[var(--color-accent-primary-muted)] transition-colors">
                      <Icon size={13} className="text-[var(--color-text-tertiary)] group-hover:text-[var(--color-accent-primary)] transition-colors" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-medium text-[var(--color-text-primary)] truncate">{item.label}</div>
                      <div className="text-[10px] text-[var(--color-text-tertiary)] truncate">{item.description}</div>
                    </div>
                    <Plus size={14} className="text-[var(--color-text-tertiary)] ml-auto opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {leftPanelTab === 'templates' && (
          <div className="p-3 space-y-2">
            <p className="text-[10px] text-[var(--color-text-tertiary)] uppercase tracking-wider font-medium px-1 mb-1">Choose a template</p>
            {ALL_TEMPLATES.map(template => (
              <button
                key={template.id}
                onClick={() => {
                  loadTemplate(template.sections);
                  setProjectName(template.sections.find(s => s.type === 'header')?.type === 'header' ? (template.sections.find(s => s.type === 'header') as { title: string }).title : template.name);
                }}
                className="w-full flex items-center gap-3 p-2.5 rounded-lg hover:bg-[var(--color-bg-hover)] border border-transparent hover:border-[var(--color-border)] transition-all group text-left"
              >
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)] flex items-center justify-center shrink-0 opacity-80 group-hover:opacity-100 transition-opacity">
                  <LayoutTemplate size={16} className="text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-semibold text-[var(--color-text-primary)]">{template.name}</div>
                  <div className="text-[10px] text-[var(--color-text-tertiary)] mt-0.5 line-clamp-1">{template.description}</div>
                </div>
                <ChevronRight size={14} className="text-[var(--color-text-tertiary)] opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
              </button>
            ))}
          </div>
        )}

        {leftPanelTab === 'settings' && (
          <SettingsPanel />
        )}
      </div>
    </aside>
  );
}

function SettingsPanel() {
  const projectName = useReadmeStore(s => s.projectName);
  const setProjectName = useReadmeStore(s => s.setProjectName);
  const reset = useReadmeStore(s => s.reset);
  const theme = useUIStore(s => s.theme);
  const setTheme = useUIStore(s => s.setTheme);

  return (
    <div className="p-4 space-y-4">
      <div>
        <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-1.5 block">Project Name</label>
        <input
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          className="w-full px-3 py-2 text-sm bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-md text-[var(--color-text-primary)] outline-none focus:border-[var(--color-accent-primary)] transition-colors"
        />
      </div>
      <div>
        <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-1.5 block">Theme</label>
        <div className="flex gap-1">
          {(['dark', 'light', 'system'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all ${
                theme === t
                  ? 'bg-[var(--color-accent-primary)] text-white'
                  : 'bg-[var(--color-bg-surface)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-hover)]'
              }`}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <div className="pt-2 border-t border-[var(--color-border)]">
        <button
          onClick={reset}
          className="w-full py-2 text-xs font-medium text-[var(--color-accent-error)] bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-md hover:bg-red-500/10 transition-colors"
        >
          Reset Project
        </button>
      </div>
    </div>
  );
}

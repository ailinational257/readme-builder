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
  ChevronDown,
  Search,
  Terminal,
  Brain,
  Rocket,
  User,
  GitFork,
  Eye,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useReadmeStore } from '../../store/readme-store';
import { useUIStore, type LeftPanelTab } from '../../store/ui-store';
import { ALL_TEMPLATES } from '../../templates';
import type { SectionType } from '../../types/sections';
import type { Section } from '../../types/sections';

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

interface SectionGroup {
  label: string;
  items: { type: SectionType; label: string; icon: string; description: string }[];
}

const SECTION_GROUPS: SectionGroup[] = [
  {
    label: 'Essentials',
    items: [
      { type: 'header', label: 'Header', icon: 'heading', description: 'Title, logo & badges' },
      { type: 'hero', label: 'Hero', icon: 'sparkles', description: 'Eye-catching hero' },
      { type: 'about', label: 'About', icon: 'info', description: 'Project overview' },
      { type: 'features', label: 'Features', icon: 'list-checks', description: 'Key features list' },
    ],
  },
  {
    label: 'Getting Started',
    items: [
      { type: 'tech-stack', label: 'Tech Stack', icon: 'layers', description: 'Technologies used' },
      { type: 'installation', label: 'Installation', icon: 'download', description: 'Setup instructions' },
      { type: 'usage', label: 'Usage', icon: 'code', description: 'Code examples' },
    ],
  },
  {
    label: 'Media & Demos',
    items: [
      { type: 'screenshots', label: 'Screenshots', icon: 'image', description: 'Image gallery' },
      { type: 'demo', label: 'Demo', icon: 'play', description: 'Live demo / video' },
    ],
  },
  {
    label: 'Community',
    items: [
      { type: 'roadmap', label: 'Roadmap', icon: 'map', description: 'Project roadmap' },
      { type: 'faq', label: 'FAQ', icon: 'help-circle', description: 'Questions & answers' },
      { type: 'contributing', label: 'Contributing', icon: 'git-pull-request', description: 'How to contribute' },
      { type: 'contributors', label: 'Contributors', icon: 'users', description: 'Team members' },
      { type: 'license', label: 'License', icon: 'scale', description: 'License info' },
      { type: 'contact', label: 'Contact', icon: 'mail', description: 'Contact details' },
    ],
  },
  {
    label: 'Custom',
    items: [
      { type: 'custom', label: 'Custom', icon: 'pen-tool', description: 'Custom markdown block' },
    ],
  },
];

const ALL_SECTION_ITEMS = SECTION_GROUPS.flatMap(g => g.items);

const TABS: { id: LeftPanelTab; label: string; icon: typeof LayoutTemplate }[] = [
  { id: 'templates', label: 'Templates', icon: LayoutTemplate },
  { id: 'components', label: 'Sections', icon: Component },
  { id: 'settings', label: 'Settings', icon: Settings },
];

interface TemplateCategory {
  id: string;
  label: string;
  icon: typeof Terminal;
  color: string;
  templateIds: string[];
}

const TEMPLATE_CATEGORIES: TemplateCategory[] = [
  { id: 'developer', label: 'Developer Projects', icon: Terminal, color: '#238636', templateIds: ['developer'] },
  { id: 'open-source', label: 'Open Source Projects', icon: GitFork, color: '#1F6FEB', templateIds: ['open-source'] },
  { id: 'portfolio', label: 'Portfolio Projects', icon: User, color: '#8B5CF6', templateIds: ['portfolio', 'github-profile'] },
  { id: 'saas', label: 'SaaS Projects', icon: Rocket, color: '#D29922', templateIds: ['saas'] },
  { id: 'cli', label: 'CLI Projects', icon: Terminal, color: '#F85149', templateIds: ['cli'] },
  { id: 'ai', label: 'AI Projects', icon: Brain, color: '#238636', templateIds: ['ai-project'] },
];

export function LeftSidebar() {
  const navigate = useNavigate();
  const leftPanelTab = useUIStore(s => s.leftPanelTab);
  const setLeftPanelTab = useUIStore(s => s.setLeftPanelTab);
  const leftPanelOpen = useUIStore(s => s.leftPanelOpen);
  const addSection = useReadmeStore(s => s.addSection);
  const loadTemplate = useReadmeStore(s => s.loadTemplate);
  const setProjectName = useReadmeStore(s => s.setProjectName);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [previewTemplate, setPreviewTemplate] = useState<{ name: string; sections: Section[] } | null>(null);

  if (!leftPanelOpen) return null;

  const filteredSections = searchQuery
    ? ALL_SECTION_ITEMS.filter(s =>
        s.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : null;

  return (
    <aside className="w-64 border-r border-[var(--color-border)] bg-[var(--color-bg-secondary)] flex flex-col shrink-0 animate-slide-in-left">
      {/* Tabs */}
      <div className="flex border-b border-[var(--color-border)]">
        {TABS.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => {
                if (tab.id === 'settings') {
                  navigate('/settings');
                } else {
                  setLeftPanelTab(tab.id);
                }
              }}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium transition-all border-b-2 ${
                leftPanelTab === tab.id && tab.id !== 'settings'
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
            {/* Search */}
            <div className="relative mb-3">
              <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search sections..."
                className="w-full pl-8 pr-3 py-2 text-xs bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-lg text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] outline-none focus:border-[var(--color-accent-primary)] focus:ring-1 focus:ring-[var(--color-accent-primary-muted)] transition-all"
                aria-label="Search sections"
              />
            </div>

            {/* Search Results or Grouped Sections */}
            {filteredSections ? (
              <div className="space-y-0.5">
                {filteredSections.map(item => {
                  const Icon = ICON_MAP[item.icon] || PenTool;
                  return (
                    <SectionButton key={item.type} item={item} Icon={Icon} onClick={() => addSection(item.type)} />
                  );
                })}
                {filteredSections.length === 0 && (
                  <p className="text-xs text-[var(--color-text-tertiary)] text-center py-4">No sections found</p>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                {SECTION_GROUPS.map(group => (
                  <div key={group.label}>
                    <div className="text-[10px] font-semibold text-[var(--color-text-tertiary)] uppercase tracking-wider px-1 mb-1.5">
                      {group.label}
                    </div>
                    <div className="space-y-0.5">
                      {group.items.map(item => {
                        const Icon = ICON_MAP[item.icon] || PenTool;
                        return (
                          <SectionButton key={item.type} item={item} Icon={Icon} onClick={() => addSection(item.type)} />
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {leftPanelTab === 'templates' && (
          <div className="p-3 space-y-1.5">
            <p className="text-[10px] text-[var(--color-text-tertiary)] uppercase tracking-wider font-semibold px-1 mb-2">Template Categories</p>
            {TEMPLATE_CATEGORIES.map(category => {
              const CatIcon = category.icon;
              const isExpanded = expandedCategory === category.id;
              const templates = ALL_TEMPLATES.filter(t => category.templateIds.includes(t.id));

              return (
                <div key={category.id} className="rounded-lg border border-[var(--color-border)] overflow-hidden bg-[var(--color-bg-primary)]">
                  <button
                    onClick={() => setExpandedCategory(isExpanded ? null : category.id)}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 hover:bg-[var(--color-bg-hover)] transition-colors"
                  >
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${category.color}20` }}>
                      <CatIcon size={14} style={{ color: category.color }} />
                    </div>
                    <div className="text-left flex-1 min-w-0">
                      <div className="text-xs font-medium text-[var(--color-text-primary)]">{category.label}</div>
                      <div className="text-[10px] text-[var(--color-text-tertiary)]">{templates.length} template{templates.length > 1 ? 's' : ''}</div>
                    </div>
                    <ChevronDown size={12} className={`text-[var(--color-text-tertiary)] transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                  </button>

                  {isExpanded && (
                    <div className="border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
                      {templates.map(template => (
                        <div
                          key={template.id}
                          className="flex items-center gap-2.5 px-3 py-2.5 hover:bg-[var(--color-bg-hover)] transition-colors group"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-medium text-[var(--color-text-primary)]">{template.name}</div>
                            <div className="text-[10px] text-[var(--color-text-tertiary)] line-clamp-1">{template.description}</div>
                          </div>
                          <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => setPreviewTemplate({ name: template.name, sections: template.sections })}
                              className="p-1 rounded text-[var(--color-text-tertiary)] hover:text-[var(--color-accent-secondary)] hover:bg-[var(--color-accent-secondary-muted)] transition-colors"
                              title="Preview template"
                            >
                              <Eye size={12} />
                            </button>
                            <button
                              onClick={() => {
                                loadTemplate(template.sections);
                                const headerSection = template.sections.find(s => s.type === 'header');
                                if (headerSection && headerSection.type === 'header') {
                                  setProjectName(headerSection.title);
                                } else {
                                  setProjectName(template.name);
                                }
                              }}
                              className="p-1 rounded text-[var(--color-text-tertiary)] hover:text-[var(--color-accent-primary)] hover:bg-[var(--color-accent-primary-muted)] transition-colors"
                              title="Apply template"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Template Preview Modal */}
      {previewTemplate && (
        <TemplatePreviewModal
          name={previewTemplate.name}
          sections={previewTemplate.sections}
          onApply={() => {
            loadTemplate(previewTemplate.sections);
            const headerSection = previewTemplate.sections.find(s => s.type === 'header');
            if (headerSection && headerSection.type === 'header') {
              setProjectName(headerSection.title);
            }
            setPreviewTemplate(null);
          }}
          onClose={() => setPreviewTemplate(null)}
        />
      )}
    </aside>
  );
}

function SectionButton({ item, Icon, onClick }: { item: { type: SectionType; label: string; description: string }; Icon: typeof Heading; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left hover:bg-[var(--color-bg-hover)] group transition-all"
      aria-label={`Add ${item.label} section`}
    >
      <div className="w-8 h-8 rounded-lg bg-[var(--color-bg-surface)] border border-[var(--color-border)] flex items-center justify-center shrink-0 group-hover:border-[var(--color-accent-primary)] group-hover:bg-[var(--color-accent-primary-muted)] transition-colors">
        <Icon size={14} className="text-[var(--color-text-tertiary)] group-hover:text-[var(--color-accent-primary)] transition-colors" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-xs font-medium text-[var(--color-text-primary)] truncate">{item.label}</div>
        <div className="text-[10px] text-[var(--color-text-tertiary)] truncate">{item.description}</div>
      </div>
      <Plus size={14} className="text-[var(--color-text-tertiary)] ml-auto opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
    </button>
  );
}

function TemplatePreviewModal({ name, sections, onApply, onClose }: { name: string; sections: Section[]; onApply: () => void; onClose: () => void }) {
  const sectionTypes = sections.map(s => s.type);

  return (
    <>
      <div className="modal-backdrop" onClick={onClose} />
      <div className="modal-content w-[420px] max-w-[90vw] bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-[var(--color-border)]">
          <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">{name}</h3>
          <p className="text-[10px] text-[var(--color-text-tertiary)] mt-0.5">Preview template before applying</p>
        </div>

        {/* Sections List */}
        <div className="px-5 py-4">
          <div className="text-[10px] font-semibold text-[var(--color-text-tertiary)] uppercase tracking-wider mb-2">
            Included Sections ({sections.length})
          </div>
          <div className="flex flex-wrap gap-1.5">
            {sectionTypes.map((type, i) => (
              <span key={i} className="px-2 py-1 text-[10px] font-medium bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-md text-[var(--color-text-secondary)]">
                {type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="px-5 py-3 border-t border-[var(--color-border)] flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-[var(--color-text-secondary)] bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-lg hover:bg-[var(--color-bg-hover)] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onApply}
            className="px-4 py-2 text-xs font-semibold bg-[var(--color-accent-primary)] text-white rounded-lg hover:bg-[var(--color-accent-primary-hover)] transition-colors"
          >
            Apply Template
          </button>
        </div>
      </div>
    </>
  );
}

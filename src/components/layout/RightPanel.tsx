// ─── Right Panel (Properties) ────────────────────────────────────────────────
// Shows editable properties for the currently selected section.

import { useState } from 'react';
import { X, Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { useReadmeStore } from '../../store/readme-store';
import { useUIStore } from '../../store/ui-store';
import type { Section, Badge, HeaderStyle, HeaderAlignment, ScreenshotLayout, DemoType, LicenseType, BadgeStyle } from '../../types/sections';
import { SECTION_METADATA } from '../../types/sections';
import { BADGE_PRESETS, getBadgeUrl } from '../../features/badges/badge-catalog';
import { generateId } from '../../utils/id';

export function RightPanel() {
  const selectedSectionId = useUIStore(s => s.selectedSectionId);
  const rightPanelOpen = useUIStore(s => s.rightPanelOpen);
  const selectSection = useUIStore(s => s.selectSection);
  const sections = useReadmeStore(s => s.sections);
  const updateSection = useReadmeStore(s => s.updateSection);

  if (!rightPanelOpen || !selectedSectionId) return null;

  const section = sections.find(s => s.id === selectedSectionId);
  if (!section) return null;

  const meta = SECTION_METADATA.find(m => m.type === section.type);

  const update = (updates: Partial<Section>) => {
    updateSection(section.id, updates);
  };

  return (
    <aside className="w-72 border-l border-[var(--color-border)] bg-[var(--color-bg-secondary)] flex flex-col shrink-0 animate-slide-in-right">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--color-border)]">
        <div>
          <h3 className="text-xs font-semibold text-[var(--color-text-primary)]">{meta?.label} Properties</h3>
          <p className="text-[10px] text-[var(--color-text-tertiary)] mt-0.5">{meta?.description}</p>
        </div>
        <button
          onClick={() => selectSection(null)}
          className="p-1 rounded-md hover:bg-[var(--color-bg-hover)] text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors"
        >
          <X size={14} />
        </button>
      </div>

      {/* Properties */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <SectionProperties section={section} onUpdate={update} />
      </div>
    </aside>
  );
}

// ─── Field Components ────────────────────────────────────────────────────────

function FieldGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-[11px] font-medium text-[var(--color-text-secondary)] mb-1.5 block uppercase tracking-wider">{label}</label>
      {children}
    </div>
  );
}

function TextInput({ value, onChange, placeholder = '' }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-2.5 py-1.5 text-xs bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-md text-[var(--color-text-primary)] outline-none focus:border-[var(--color-accent-primary)] transition-colors placeholder:text-[var(--color-text-tertiary)]"
    />
  );
}

function TextAreaInput({ value, onChange, placeholder = '', rows = 3 }: { value: string; onChange: (v: string) => void; placeholder?: string; rows?: number }) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full px-2.5 py-1.5 text-xs bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-md text-[var(--color-text-primary)] outline-none focus:border-[var(--color-accent-primary)] transition-colors resize-y placeholder:text-[var(--color-text-tertiary)]"
    />
  );
}

function SelectInput<T extends string>({ value, onChange, options }: { value: T; onChange: (v: T) => void; options: { value: T; label: string }[] }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as T)}
      className="w-full px-2.5 py-1.5 text-xs bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-md text-[var(--color-text-primary)] outline-none focus:border-[var(--color-accent-primary)] transition-colors"
    >
      {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
    </select>
  );
}

// ─── Per-Section Properties ──────────────────────────────────────────────────

function SectionProperties({ section, onUpdate }: { section: Section; onUpdate: (updates: Partial<Section>) => void }) {
  switch (section.type) {
    case 'header': return <HeaderProperties section={section} onUpdate={onUpdate as (u: Partial<typeof section>) => void} />;
    case 'hero': return <HeroProperties section={section} onUpdate={onUpdate as (u: Partial<typeof section>) => void} />;
    case 'about': return <AboutProperties section={section} onUpdate={onUpdate as (u: Partial<typeof section>) => void} />;
    case 'features': return <FeaturesProperties section={section} onUpdate={onUpdate as (u: Partial<typeof section>) => void} />;
    case 'tech-stack': return <TechStackProperties section={section} onUpdate={onUpdate as (u: Partial<typeof section>) => void} />;
    case 'installation': return <InstallationProperties section={section} onUpdate={onUpdate as (u: Partial<typeof section>) => void} />;
    case 'usage': return <UsageProperties section={section} onUpdate={onUpdate as (u: Partial<typeof section>) => void} />;
    case 'screenshots': return <ScreenshotsProperties section={section} onUpdate={onUpdate as (u: Partial<typeof section>) => void} />;
    case 'demo': return <DemoProperties section={section} onUpdate={onUpdate as (u: Partial<typeof section>) => void} />;
    case 'roadmap': return <RoadmapProperties section={section} onUpdate={onUpdate as (u: Partial<typeof section>) => void} />;
    case 'faq': return <FAQProperties section={section} onUpdate={onUpdate as (u: Partial<typeof section>) => void} />;
    case 'contributing': return <ContributingProperties section={section} onUpdate={onUpdate as (u: Partial<typeof section>) => void} />;
    case 'contributors': return <ContributorsProperties section={section} onUpdate={onUpdate as (u: Partial<typeof section>) => void} />;
    case 'license': return <LicenseProperties section={section} onUpdate={onUpdate as (u: Partial<typeof section>) => void} />;
    case 'contact': return <ContactProperties section={section} onUpdate={onUpdate as (u: Partial<typeof section>) => void} />;
    case 'custom': return <CustomProperties section={section} onUpdate={onUpdate as (u: Partial<typeof section>) => void} />;
    default: return null;
  }
}

type P<T> = { section: T; onUpdate: (u: Partial<T>) => void };

function HeaderProperties({ section, onUpdate }: P<Section & { type: 'header' }>) {
  const [showBadgePicker, setShowBadgePicker] = useState(false);

  return (
    <>
      <FieldGroup label="Title">
        <TextInput value={section.title} onChange={(title) => onUpdate({ title })} placeholder="Project name" />
      </FieldGroup>
      <FieldGroup label="Subtitle">
        <TextInput value={section.subtitle} onChange={(subtitle) => onUpdate({ subtitle })} placeholder="Brief description" />
      </FieldGroup>
      <FieldGroup label="Style">
        <SelectInput<HeaderStyle>
          value={section.style}
          onChange={(style) => onUpdate({ style })}
          options={[
            { value: 'minimal', label: 'Minimal' },
            { value: 'centered', label: 'Centered' },
            { value: 'hero', label: 'Hero' },
            { value: 'banner', label: 'Banner' },
            { value: 'animated', label: 'Animated' },
          ]}
        />
      </FieldGroup>
      <FieldGroup label="Alignment">
        <SelectInput<HeaderAlignment>
          value={section.alignment}
          onChange={(alignment) => onUpdate({ alignment })}
          options={[
            { value: 'left', label: 'Left' },
            { value: 'center', label: 'Center' },
            { value: 'right', label: 'Right' },
          ]}
        />
      </FieldGroup>
      <FieldGroup label="Logo URL">
        <TextInput value={section.logoUrl} onChange={(logoUrl) => onUpdate({ logoUrl })} placeholder="https://..." />
      </FieldGroup>
      <FieldGroup label="Banner URL">
        <TextInput value={section.bannerUrl} onChange={(bannerUrl) => onUpdate({ bannerUrl })} placeholder="https://..." />
      </FieldGroup>

      <FieldGroup label={`Badges (${section.badges.length})`}>
        <div className="flex flex-wrap gap-2 mb-3">
          {section.badges.map((badge, i) => (
            <div key={badge.id} className="flex items-center gap-1 bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-md p-1 pr-1.5">
              <img src={getBadgeUrl({ id: badge.id, label: badge.label, message: badge.message, color: badge.color, logoName: badge.logoName, logoColor: badge.logoColor, category: 'custom' }, badge.style)} alt={badge.label} className="h-5 w-auto" />
              <button
                onClick={() => {
                  const badges = section.badges.filter((_, j) => j !== i);
                  onUpdate({ badges });
                }}
                className="p-0.5 ml-0.5 rounded hover:bg-[var(--color-bg-hover)] text-[var(--color-text-tertiary)] hover:text-[var(--color-accent-error)] transition-colors"
                title="Remove badge"
              >
                <Trash2 size={11} />
              </button>
            </div>
          ))}
        </div>
        <div className="space-y-1.5">
          <button
            onClick={() => setShowBadgePicker(!showBadgePicker)}
            className="w-full flex items-center justify-center gap-1.5 py-1.5 text-[10px] font-medium text-[var(--color-accent-primary)] border border-dashed border-[var(--color-border)] rounded-md hover:bg-[var(--color-accent-primary-muted)] transition-colors"
          >
            <Plus size={11} /> Add Badge
          </button>
          {showBadgePicker && (
            <BadgePicker
              onSelect={(badge) => {
                onUpdate({ badges: [...section.badges, badge] });
                setShowBadgePicker(false);
              }}
            />
          )}
        </div>
      </FieldGroup>

      {/* Buttons */}
      <FieldGroup label={`Buttons (${section.buttons.length})`}>
        <div className="space-y-2">
          {section.buttons.map((btn, i) => (
            <div key={btn.id} className="space-y-1 p-2 bg-[var(--color-bg-surface)] rounded-md border border-[var(--color-border)]">
              <TextInput value={btn.text} onChange={(text) => {
                const buttons = [...section.buttons];
                buttons[i] = { ...btn, text };
                onUpdate({ buttons });
              }} placeholder="Button text" />
              <TextInput value={btn.url} onChange={(url) => {
                const buttons = [...section.buttons];
                buttons[i] = { ...btn, url };
                onUpdate({ buttons });
              }} placeholder="URL" />
              <button onClick={() => onUpdate({ buttons: section.buttons.filter((_, j) => j !== i) })} className="text-[10px] text-[var(--color-accent-error)] hover:underline">Remove</button>
            </div>
          ))}
          <button
            onClick={() => onUpdate({ buttons: [...section.buttons, { id: generateId(), text: 'Button', url: '#' }] })}
            className="w-full flex items-center justify-center gap-1.5 py-1.5 text-[10px] font-medium text-[var(--color-accent-primary)] border border-dashed border-[var(--color-border)] rounded-md hover:bg-[var(--color-accent-primary-muted)] transition-colors"
          >
            <Plus size={11} /> Add Button
          </button>
        </div>
      </FieldGroup>
    </>
  );
}

function BadgePicker({ onSelect }: { onSelect: (badge: Badge) => void }) {
  const [category, setCategory] = useState('language');
  const filtered = BADGE_PRESETS.filter(b => b.category === category);
  const categories = [...new Set(BADGE_PRESETS.map(b => b.category))];

  return (
    <div className="border border-[var(--color-border)] rounded-lg bg-[var(--color-bg-elevated)] p-2 mt-1 max-h-48 overflow-y-auto">
      <div className="flex gap-1 flex-wrap mb-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-2 py-0.5 text-[10px] rounded-full transition-colors ${cat === category ? 'bg-[var(--color-accent-primary)] text-white' : 'bg-[var(--color-bg-surface)] text-[var(--color-text-tertiary)] hover:bg-[var(--color-bg-hover)]'}`}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {filtered.map(preset => (
          <button
            key={preset.id}
            onClick={() => onSelect({
              id: generateId(),
              label: preset.label,
              message: preset.message || preset.label,
              color: preset.color,
              labelColor: '',
              style: 'for-the-badge' as BadgeStyle,
              logoName: preset.logoName,
              logoColor: preset.logoColor,
              link: '',
            })}
            className="hover:opacity-80 transition-opacity"
            title={preset.label}
          >
            <img src={getBadgeUrl(preset, 'for-the-badge')} alt={preset.label} className="h-6 w-auto rounded" />
          </button>
        ))}
      </div>
    </div>
  );
}

function HeroProperties({ section, onUpdate }: P<Section & { type: 'hero' }>) {
  return (
    <>
      <FieldGroup label="Title"><TextInput value={section.title} onChange={(title) => onUpdate({ title })} /></FieldGroup>
      <FieldGroup label="Tagline"><TextInput value={section.tagline} onChange={(tagline) => onUpdate({ tagline })} /></FieldGroup>
      <FieldGroup label="Description"><TextAreaInput value={section.description} onChange={(description) => onUpdate({ description })} /></FieldGroup>
      <FieldGroup label="Image URL"><TextInput value={section.imageUrl} onChange={(imageUrl) => onUpdate({ imageUrl })} placeholder="https://..." /></FieldGroup>
      <FieldGroup label="Alignment">
        <SelectInput value={section.alignment} onChange={(alignment) => onUpdate({ alignment })} options={[{ value: 'left', label: 'Left' }, { value: 'center', label: 'Center' }, { value: 'right', label: 'Right' }]} />
      </FieldGroup>
    </>
  );
}

function AboutProperties({ section, onUpdate }: P<Section & { type: 'about' }>) {
  return (
    <>
      <FieldGroup label="Title"><TextInput value={section.title} onChange={(title) => onUpdate({ title })} /></FieldGroup>
      <FieldGroup label="Description"><TextAreaInput value={section.description} onChange={(description) => onUpdate({ description })} /></FieldGroup>
      <FieldGroup label="Highlights">
        <div className="space-y-1">
          {section.highlights.map((h, i) => (
            <div key={i} className="flex gap-1">
              <TextInput value={h} onChange={(text) => { const highlights = [...section.highlights]; highlights[i] = text; onUpdate({ highlights }); }} />
              <button onClick={() => onUpdate({ highlights: section.highlights.filter((_, j) => j !== i) })} className="p-1 text-[var(--color-text-tertiary)] hover:text-[var(--color-accent-error)]"><Trash2 size={11} /></button>
            </div>
          ))}
          <button onClick={() => onUpdate({ highlights: [...section.highlights, 'New highlight'] })} className="w-full py-1 text-[10px] text-[var(--color-accent-primary)] border border-dashed border-[var(--color-border)] rounded hover:bg-[var(--color-accent-primary-muted)] transition-colors"><Plus size={10} className="inline mr-1" />Add</button>
        </div>
      </FieldGroup>
    </>
  );
}

function FeaturesProperties({ section, onUpdate }: P<Section & { type: 'features' }>) {
  return (
    <>
      <FieldGroup label="Title"><TextInput value={section.title} onChange={(title) => onUpdate({ title })} /></FieldGroup>
      <FieldGroup label="Columns">
        <SelectInput value={String(section.columns)} onChange={(v) => onUpdate({ columns: Number(v) as 1 | 2 | 3 })} options={[{ value: '1', label: '1 Column' }, { value: '2', label: '2 Columns' }, { value: '3', label: '3 Columns' }]} />
      </FieldGroup>
      <FieldGroup label={`Features (${section.features.length})`}>
        <div className="space-y-2">
          {section.features.map((f, i) => (
            <CollapsibleItem key={f.id} title={`${f.emoji} ${f.title}`} onRemove={() => onUpdate({ features: section.features.filter((_, j) => j !== i) })}>
              <TextInput value={f.emoji} onChange={(emoji) => { const features = [...section.features]; features[i] = { ...f, emoji }; onUpdate({ features }); }} placeholder="Emoji" />
              <TextInput value={f.title} onChange={(title) => { const features = [...section.features]; features[i] = { ...f, title }; onUpdate({ features }); }} placeholder="Title" />
              <TextInput value={f.description} onChange={(description) => { const features = [...section.features]; features[i] = { ...f, description }; onUpdate({ features }); }} placeholder="Description" />
            </CollapsibleItem>
          ))}
          <button onClick={() => onUpdate({ features: [...section.features, { id: generateId(), emoji: '✨', title: 'New Feature', description: 'Description' }] })} className="w-full py-1.5 text-[10px] text-[var(--color-accent-primary)] border border-dashed border-[var(--color-border)] rounded hover:bg-[var(--color-accent-primary-muted)] transition-colors"><Plus size={10} className="inline mr-1" />Add Feature</button>
        </div>
      </FieldGroup>
    </>
  );
}

function TechStackProperties({ section, onUpdate }: P<Section & { type: 'tech-stack' }>) {
  return (
    <>
      <FieldGroup label="Title"><TextInput value={section.title} onChange={(title) => onUpdate({ title })} /></FieldGroup>
      <FieldGroup label="Display Style">
        <SelectInput value={section.displayStyle} onChange={(displayStyle) => onUpdate({ displayStyle })} options={[{ value: 'badges', label: 'Badges' }, { value: 'table', label: 'Table' }, { value: 'list', label: 'List' }, { value: 'icons', label: 'Icons' }]} />
      </FieldGroup>
      <FieldGroup label={`Technologies (${section.items.length})`}>
        <div className="space-y-2">
          {section.items.map((item, i) => (
            <CollapsibleItem key={item.id} title={item.name} onRemove={() => onUpdate({ items: section.items.filter((_, j) => j !== i) })}>
              <TextInput value={item.name} onChange={(name) => { const items = [...section.items]; items[i] = { ...item, name }; onUpdate({ items }); }} placeholder="Name" />
              <TextInput value={item.icon} onChange={(icon) => { const items = [...section.items]; items[i] = { ...item, icon }; onUpdate({ items }); }} placeholder="Simple Icons slug" />
              <TextInput value={item.category} onChange={(category) => { const items = [...section.items]; items[i] = { ...item, category }; onUpdate({ items }); }} placeholder="Category" />
              <TextInput value={item.url} onChange={(url) => { const items = [...section.items]; items[i] = { ...item, url }; onUpdate({ items }); }} placeholder="URL" />
            </CollapsibleItem>
          ))}
          <button onClick={() => onUpdate({ items: [...section.items, { id: generateId(), name: 'Technology', icon: '', category: 'General', url: '' }] })} className="w-full py-1.5 text-[10px] text-[var(--color-accent-primary)] border border-dashed border-[var(--color-border)] rounded hover:bg-[var(--color-accent-primary-muted)] transition-colors"><Plus size={10} className="inline mr-1" />Add Technology</button>
        </div>
      </FieldGroup>
    </>
  );
}

function InstallationProperties({ section, onUpdate }: P<Section & { type: 'installation' }>) {
  return (
    <>
      <FieldGroup label="Title"><TextInput value={section.title} onChange={(title) => onUpdate({ title })} /></FieldGroup>
      <FieldGroup label="Package Manager">
        <SelectInput value={section.packageManager} onChange={(packageManager) => onUpdate({ packageManager })} options={[{ value: 'npm', label: 'npm' }, { value: 'yarn', label: 'yarn' }, { value: 'pnpm', label: 'pnpm' }, { value: 'bun', label: 'bun' }]} />
      </FieldGroup>
      <FieldGroup label="Prerequisites">
        <div className="space-y-1">
          {section.prerequisites.map((p, i) => (
            <div key={i} className="flex gap-1">
              <TextInput value={p} onChange={(text) => { const prerequisites = [...section.prerequisites]; prerequisites[i] = text; onUpdate({ prerequisites }); }} />
              <button onClick={() => onUpdate({ prerequisites: section.prerequisites.filter((_, j) => j !== i) })} className="p-1 text-[var(--color-text-tertiary)] hover:text-[var(--color-accent-error)]"><Trash2 size={11} /></button>
            </div>
          ))}
          <button onClick={() => onUpdate({ prerequisites: [...section.prerequisites, ''] })} className="w-full py-1 text-[10px] text-[var(--color-accent-primary)] border border-dashed border-[var(--color-border)] rounded hover:bg-[var(--color-accent-primary-muted)] transition-colors"><Plus size={10} className="inline mr-1" />Add</button>
        </div>
      </FieldGroup>
      <FieldGroup label={`Steps (${section.steps.length})`}>
        <div className="space-y-2">
          {section.steps.map((step, i) => (
            <CollapsibleItem key={step.id} title={step.title || `Step ${i + 1}`} onRemove={() => onUpdate({ steps: section.steps.filter((_, j) => j !== i) })}>
              <TextInput value={step.title} onChange={(title) => { const steps = [...section.steps]; steps[i] = { ...step, title }; onUpdate({ steps }); }} placeholder="Step title" />
              <TextInput value={step.command} onChange={(command) => { const steps = [...section.steps]; steps[i] = { ...step, command }; onUpdate({ steps }); }} placeholder="Command" />
            </CollapsibleItem>
          ))}
          <button onClick={() => onUpdate({ steps: [...section.steps, { id: generateId(), title: '', command: '', description: '' }] })} className="w-full py-1.5 text-[10px] text-[var(--color-accent-primary)] border border-dashed border-[var(--color-border)] rounded hover:bg-[var(--color-accent-primary-muted)] transition-colors"><Plus size={10} className="inline mr-1" />Add Step</button>
        </div>
      </FieldGroup>
    </>
  );
}

function UsageProperties({ section, onUpdate }: P<Section & { type: 'usage' }>) {
  return (
    <>
      <FieldGroup label="Title"><TextInput value={section.title} onChange={(title) => onUpdate({ title })} /></FieldGroup>
      <FieldGroup label="Description"><TextAreaInput value={section.description} onChange={(description) => onUpdate({ description })} /></FieldGroup>
      <FieldGroup label={`Examples (${section.examples.length})`}>
        <div className="space-y-2">
          {section.examples.map((ex, i) => (
            <CollapsibleItem key={ex.id} title={ex.title || `Example ${i + 1}`} onRemove={() => onUpdate({ examples: section.examples.filter((_, j) => j !== i) })}>
              <TextInput value={ex.title} onChange={(title) => { const examples = [...section.examples]; examples[i] = { ...ex, title }; onUpdate({ examples }); }} placeholder="Title" />
              <TextInput value={ex.language} onChange={(language) => { const examples = [...section.examples]; examples[i] = { ...ex, language }; onUpdate({ examples }); }} placeholder="Language (tsx, python, bash...)" />
              <TextAreaInput value={ex.code} onChange={(code) => { const examples = [...section.examples]; examples[i] = { ...ex, code }; onUpdate({ examples }); }} placeholder="Code" rows={4} />
              <TextInput value={ex.description} onChange={(description) => { const examples = [...section.examples]; examples[i] = { ...ex, description }; onUpdate({ examples }); }} placeholder="Description" />
            </CollapsibleItem>
          ))}
          <button onClick={() => onUpdate({ examples: [...section.examples, { id: generateId(), title: '', code: '', language: 'bash', description: '' }] })} className="w-full py-1.5 text-[10px] text-[var(--color-accent-primary)] border border-dashed border-[var(--color-border)] rounded hover:bg-[var(--color-accent-primary-muted)] transition-colors"><Plus size={10} className="inline mr-1" />Add Example</button>
        </div>
      </FieldGroup>
    </>
  );
}

function ScreenshotsProperties({ section, onUpdate }: P<Section & { type: 'screenshots' }>) {
  return (
    <>
      <FieldGroup label="Title"><TextInput value={section.title} onChange={(title) => onUpdate({ title })} /></FieldGroup>
      <FieldGroup label="Layout">
        <SelectInput<ScreenshotLayout> value={section.layout} onChange={(layout) => onUpdate({ layout })} options={[{ value: 'single', label: 'Single' }, { value: 'gallery', label: 'Gallery' }, { value: 'grid', label: 'Grid' }]} />
      </FieldGroup>
      <FieldGroup label={`Screenshots (${section.screenshots.length})`}>
        <div className="space-y-2">
          {section.screenshots.map((ss, i) => (
            <CollapsibleItem key={ss.id} title={ss.caption || `Screenshot ${i + 1}`} onRemove={() => onUpdate({ screenshots: section.screenshots.filter((_, j) => j !== i) })}>
              <TextInput value={ss.url} onChange={(url) => { const screenshots = [...section.screenshots]; screenshots[i] = { ...ss, url }; onUpdate({ screenshots }); }} placeholder="Image URL" />
              <TextInput value={ss.caption} onChange={(caption) => { const screenshots = [...section.screenshots]; screenshots[i] = { ...ss, caption }; onUpdate({ screenshots }); }} placeholder="Caption" />
              <TextInput value={ss.alt} onChange={(alt) => { const screenshots = [...section.screenshots]; screenshots[i] = { ...ss, alt }; onUpdate({ screenshots }); }} placeholder="Alt text" />
            </CollapsibleItem>
          ))}
          <button onClick={() => onUpdate({ screenshots: [...section.screenshots, { id: generateId(), url: '', caption: '', alt: '' }] })} className="w-full py-1.5 text-[10px] text-[var(--color-accent-primary)] border border-dashed border-[var(--color-border)] rounded hover:bg-[var(--color-accent-primary-muted)] transition-colors"><Plus size={10} className="inline mr-1" />Add Screenshot</button>
        </div>
      </FieldGroup>
    </>
  );
}

function DemoProperties({ section, onUpdate }: P<Section & { type: 'demo' }>) {
  return (
    <>
      <FieldGroup label="Title"><TextInput value={section.title} onChange={(title) => onUpdate({ title })} /></FieldGroup>
      <FieldGroup label="Description"><TextAreaInput value={section.description} onChange={(description) => onUpdate({ description })} /></FieldGroup>
      <FieldGroup label="Type">
        <SelectInput<DemoType> value={section.demoType} onChange={(demoType) => onUpdate({ demoType })} options={[{ value: 'gif', label: 'GIF' }, { value: 'youtube', label: 'YouTube' }, { value: 'loom', label: 'Loom' }, { value: 'image', label: 'Image' }]} />
      </FieldGroup>
      <FieldGroup label="URL"><TextInput value={section.url} onChange={(url) => onUpdate({ url })} placeholder="Demo URL" /></FieldGroup>
      <FieldGroup label="Thumbnail URL"><TextInput value={section.thumbnailUrl} onChange={(thumbnailUrl) => onUpdate({ thumbnailUrl })} placeholder="Optional thumbnail" /></FieldGroup>
    </>
  );
}

function RoadmapProperties({ section, onUpdate }: P<Section & { type: 'roadmap' }>) {
  return (
    <>
      <FieldGroup label="Title"><TextInput value={section.title} onChange={(title) => onUpdate({ title })} /></FieldGroup>
      <FieldGroup label={`Items (${section.items.length})`}>
        <div className="space-y-1">
          {section.items.map((item, i) => (
            <div key={item.id} className="flex items-center gap-1.5">
              <input type="checkbox" checked={item.completed} onChange={() => { const items = [...section.items]; items[i] = { ...item, completed: !item.completed }; onUpdate({ items }); }} className="accent-[var(--color-accent-primary)]" />
              <TextInput value={item.text} onChange={(text) => { const items = [...section.items]; items[i] = { ...item, text }; onUpdate({ items }); }} />
              <button onClick={() => onUpdate({ items: section.items.filter((_, j) => j !== i) })} className="p-1 text-[var(--color-text-tertiary)] hover:text-[var(--color-accent-error)]"><Trash2 size={11} /></button>
            </div>
          ))}
          <button onClick={() => onUpdate({ items: [...section.items, { id: generateId(), text: 'New item', completed: false }] })} className="w-full py-1 text-[10px] text-[var(--color-accent-primary)] border border-dashed border-[var(--color-border)] rounded hover:bg-[var(--color-accent-primary-muted)] transition-colors"><Plus size={10} className="inline mr-1" />Add Item</button>
        </div>
      </FieldGroup>
    </>
  );
}

function FAQProperties({ section, onUpdate }: P<Section & { type: 'faq' }>) {
  return (
    <>
      <FieldGroup label="Title"><TextInput value={section.title} onChange={(title) => onUpdate({ title })} /></FieldGroup>
      <FieldGroup label={`Questions (${section.items.length})`}>
        <div className="space-y-2">
          {section.items.map((item, i) => (
            <CollapsibleItem key={item.id} title={item.question || `Q${i + 1}`} onRemove={() => onUpdate({ items: section.items.filter((_, j) => j !== i) })}>
              <TextInput value={item.question} onChange={(question) => { const items = [...section.items]; items[i] = { ...item, question }; onUpdate({ items }); }} placeholder="Question" />
              <TextAreaInput value={item.answer} onChange={(answer) => { const items = [...section.items]; items[i] = { ...item, answer }; onUpdate({ items }); }} placeholder="Answer" />
            </CollapsibleItem>
          ))}
          <button onClick={() => onUpdate({ items: [...section.items, { id: generateId(), question: '', answer: '' }] })} className="w-full py-1.5 text-[10px] text-[var(--color-accent-primary)] border border-dashed border-[var(--color-border)] rounded hover:bg-[var(--color-accent-primary-muted)] transition-colors"><Plus size={10} className="inline mr-1" />Add FAQ</button>
        </div>
      </FieldGroup>
    </>
  );
}

function ContributingProperties({ section, onUpdate }: P<Section & { type: 'contributing' }>) {
  return (
    <>
      <FieldGroup label="Title"><TextInput value={section.title} onChange={(title) => onUpdate({ title })} /></FieldGroup>
      <FieldGroup label="Description"><TextAreaInput value={section.description} onChange={(description) => onUpdate({ description })} /></FieldGroup>
      <FieldGroup label="Guidelines">
        <div className="space-y-1">
          {section.guidelines.map((g, i) => (
            <div key={i} className="flex gap-1">
              <TextInput value={g} onChange={(text) => { const guidelines = [...section.guidelines]; guidelines[i] = text; onUpdate({ guidelines }); }} />
              <button onClick={() => onUpdate({ guidelines: section.guidelines.filter((_, j) => j !== i) })} className="p-1 text-[var(--color-text-tertiary)] hover:text-[var(--color-accent-error)]"><Trash2 size={11} /></button>
            </div>
          ))}
          <button onClick={() => onUpdate({ guidelines: [...section.guidelines, ''] })} className="w-full py-1 text-[10px] text-[var(--color-accent-primary)] border border-dashed border-[var(--color-border)] rounded hover:bg-[var(--color-accent-primary-muted)] transition-colors"><Plus size={10} className="inline mr-1" />Add Guideline</button>
        </div>
      </FieldGroup>
      <FieldGroup label="Code of Conduct">
        <label className="flex items-center gap-2 text-xs">
          <input type="checkbox" checked={section.codeOfConduct} onChange={() => onUpdate({ codeOfConduct: !section.codeOfConduct })} className="accent-[var(--color-accent-primary)]" />
          Include Code of Conduct reference
        </label>
      </FieldGroup>
    </>
  );
}

function ContributorsProperties({ section, onUpdate }: P<Section & { type: 'contributors' }>) {
  return (
    <>
      <FieldGroup label="Title"><TextInput value={section.title} onChange={(title) => onUpdate({ title })} /></FieldGroup>
      <FieldGroup label={`Contributors (${section.contributors.length})`}>
        <div className="space-y-2">
          {section.contributors.map((c, i) => (
            <CollapsibleItem key={c.id} title={c.name || `Contributor ${i + 1}`} onRemove={() => onUpdate({ contributors: section.contributors.filter((_, j) => j !== i) })}>
              <TextInput value={c.name} onChange={(name) => { const contributors = [...section.contributors]; contributors[i] = { ...c, name }; onUpdate({ contributors }); }} placeholder="Name" />
              <TextInput value={c.githubUsername} onChange={(githubUsername) => { const contributors = [...section.contributors]; contributors[i] = { ...c, githubUsername }; onUpdate({ contributors }); }} placeholder="GitHub username" />
              <TextInput value={c.avatarUrl} onChange={(avatarUrl) => { const contributors = [...section.contributors]; contributors[i] = { ...c, avatarUrl }; onUpdate({ contributors }); }} placeholder="Avatar URL (optional)" />
              <TextInput value={c.role} onChange={(role) => { const contributors = [...section.contributors]; contributors[i] = { ...c, role }; onUpdate({ contributors }); }} placeholder="Role" />
            </CollapsibleItem>
          ))}
          <button onClick={() => onUpdate({ contributors: [...section.contributors, { id: generateId(), name: '', githubUsername: '', avatarUrl: '', role: '' }] })} className="w-full py-1.5 text-[10px] text-[var(--color-accent-primary)] border border-dashed border-[var(--color-border)] rounded hover:bg-[var(--color-accent-primary-muted)] transition-colors"><Plus size={10} className="inline mr-1" />Add Contributor</button>
        </div>
      </FieldGroup>
    </>
  );
}

function LicenseProperties({ section, onUpdate }: P<Section & { type: 'license' }>) {
  return (
    <>
      <FieldGroup label="Title"><TextInput value={section.title} onChange={(title) => onUpdate({ title })} /></FieldGroup>
      <FieldGroup label="License Type">
        <SelectInput<LicenseType> value={section.licenseType} onChange={(licenseType) => onUpdate({ licenseType })} options={[
          { value: 'MIT', label: 'MIT' },
          { value: 'Apache-2.0', label: 'Apache 2.0' },
          { value: 'GPL-3.0', label: 'GPL 3.0' },
          { value: 'BSD-2-Clause', label: 'BSD 2-Clause' },
          { value: 'BSD-3-Clause', label: 'BSD 3-Clause' },
          { value: 'ISC', label: 'ISC' },
          { value: 'MPL-2.0', label: 'MPL 2.0' },
          { value: 'LGPL-3.0', label: 'LGPL 3.0' },
          { value: 'Unlicense', label: 'Unlicense' },
          { value: 'custom', label: 'Custom' },
        ]} />
      </FieldGroup>
      <FieldGroup label="Author"><TextInput value={section.author} onChange={(author) => onUpdate({ author })} placeholder="Your name" /></FieldGroup>
      <FieldGroup label="Year"><TextInput value={section.year} onChange={(year) => onUpdate({ year })} /></FieldGroup>
      {section.licenseType === 'custom' && (
        <FieldGroup label="Custom License Text"><TextAreaInput value={section.customText} onChange={(customText) => onUpdate({ customText })} rows={4} /></FieldGroup>
      )}
    </>
  );
}

function ContactProperties({ section, onUpdate }: P<Section & { type: 'contact' }>) {
  return (
    <>
      <FieldGroup label="Title"><TextInput value={section.title} onChange={(title) => onUpdate({ title })} /></FieldGroup>
      <FieldGroup label="Name"><TextInput value={section.name} onChange={(name) => onUpdate({ name })} /></FieldGroup>
      <FieldGroup label="Email"><TextInput value={section.email} onChange={(email) => onUpdate({ email })} /></FieldGroup>
      <FieldGroup label={`Links (${section.links.length})`}>
        <div className="space-y-2">
          {section.links.map((link, i) => (
            <CollapsibleItem key={link.id} title={link.platform || `Link ${i + 1}`} onRemove={() => onUpdate({ links: section.links.filter((_, j) => j !== i) })}>
              <TextInput value={link.platform} onChange={(platform) => { const links = [...section.links]; links[i] = { ...link, platform }; onUpdate({ links }); }} placeholder="Platform (e.g. GitHub)" />
              <TextInput value={link.url} onChange={(url) => { const links = [...section.links]; links[i] = { ...link, url }; onUpdate({ links }); }} placeholder="URL" />
              <TextInput value={link.label} onChange={(label) => { const links = [...section.links]; links[i] = { ...link, label }; onUpdate({ links }); }} placeholder="Display label" />
            </CollapsibleItem>
          ))}
          <button onClick={() => onUpdate({ links: [...section.links, { id: generateId(), platform: '', url: '', label: '' }] })} className="w-full py-1.5 text-[10px] text-[var(--color-accent-primary)] border border-dashed border-[var(--color-border)] rounded hover:bg-[var(--color-accent-primary-muted)] transition-colors"><Plus size={10} className="inline mr-1" />Add Link</button>
        </div>
      </FieldGroup>
    </>
  );
}

function CustomProperties({ section, onUpdate }: P<Section & { type: 'custom' }>) {
  return (
    <>
      <FieldGroup label="Title"><TextInput value={section.title} onChange={(title) => onUpdate({ title })} /></FieldGroup>
      <FieldGroup label="Content (Markdown)"><TextAreaInput value={section.content} onChange={(content) => onUpdate({ content })} rows={8} /></FieldGroup>
    </>
  );
}

// ─── Collapsible Item ────────────────────────────────────────────────────────

function CollapsibleItem({ title, onRemove, children }: { title: string; onRemove: () => void; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-[var(--color-border)] rounded-md bg-[var(--color-bg-surface)] overflow-hidden">
      <div className="flex items-center gap-1.5 px-2 py-1.5 cursor-pointer hover:bg-[var(--color-bg-hover)] transition-colors" onClick={() => setOpen(!open)}>
        {open ? <ChevronUp size={11} className="text-[var(--color-text-tertiary)]" /> : <ChevronDown size={11} className="text-[var(--color-text-tertiary)]" />}
        <span className="text-[11px] font-medium text-[var(--color-text-primary)] truncate flex-1">{title}</span>
        <button onClick={(e) => { e.stopPropagation(); onRemove(); }} className="p-0.5 text-[var(--color-text-tertiary)] hover:text-[var(--color-accent-error)] transition-colors"><Trash2 size={11} /></button>
      </div>
      {open && <div className="px-2 pb-2 space-y-1.5">{children}</div>}
    </div>
  );
}

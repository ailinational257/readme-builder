// ─── Section Preview Renderer ────────────────────────────────────────────────
// Renders each section type as an inline-editable preview component.

import { useState, useCallback } from 'react';
import type { Section } from '../types/sections';
import { useReadmeStore } from '../store/readme-store';
import { badgeToMarkdown } from '../markdown/generator';

interface SectionPreviewProps {
  section: Section;
}

// ─── Inline Editable Text ────────────────────────────────────────────────────

interface EditableTextProps {
  value: string;
  onChange: (value: string) => void;
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
  placeholder?: string;
  multiline?: boolean;
}

function EditableText({ value, onChange, tag: Tag = 'span', className = '', placeholder = 'Click to edit...', multiline = false }: EditableTextProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);

  const startEdit = () => {
    setDraft(value);
    setEditing(true);
  };

  const commitEdit = () => {
    setEditing(false);
    if (draft !== value) onChange(draft);
  };

  if (editing) {
    if (multiline) {
      return (
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commitEdit}
          onKeyDown={(e) => { if (e.key === 'Escape') { setEditing(false); } }}
          autoFocus
          className={`${className} bg-[var(--color-bg-surface)] border border-[var(--color-accent-primary)] rounded px-2 py-1 outline-none resize-y min-h-[80px] w-full`}
          rows={3}
        />
      );
    }
    return (
      <input
        type="text"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commitEdit}
        onKeyDown={(e) => { if (e.key === 'Enter') commitEdit(); if (e.key === 'Escape') setEditing(false); }}
        autoFocus
        className={`${className} bg-[var(--color-bg-surface)] border border-[var(--color-accent-primary)] rounded px-2 py-0.5 outline-none w-full`}
      />
    );
  }

  return (
    <Tag
      onClick={startEdit}
      className={`${className} cursor-text hover:bg-[var(--color-accent-primary-muted)] hover:outline hover:outline-1 hover:outline-[var(--color-accent-primary)] rounded px-0.5 transition-all inline-block min-w-[40px] ${!value ? 'text-[var(--color-text-tertiary)] italic' : ''}`}
      title="Click to edit"
    >
      {value || placeholder}
    </Tag>
  );
}

// ─── Section Preview Components ──────────────────────────────────────────────

export function SectionPreview({ section }: SectionPreviewProps) {
  const updateSection = useReadmeStore(s => s.updateSection);

  const update = useCallback(
    (updates: Partial<Section>) => updateSection(section.id, updates),
    [section.id, updateSection]
  );

  switch (section.type) {
    case 'header':
      return <HeaderPreview section={section} onUpdate={update} />;
    case 'hero':
      return <HeroPreview section={section} onUpdate={update} />;
    case 'about':
      return <AboutPreview section={section} onUpdate={update} />;
    case 'features':
      return <FeaturesPreview section={section} onUpdate={update} />;
    case 'tech-stack':
      return <TechStackPreview section={section} onUpdate={update} />;
    case 'installation':
      return <InstallationPreview section={section} onUpdate={update} />;
    case 'usage':
      return <UsagePreview section={section} onUpdate={update} />;
    case 'screenshots':
      return <ScreenshotsPreview section={section} onUpdate={update} />;
    case 'demo':
      return <DemoPreview section={section} onUpdate={update} />;
    case 'roadmap':
      return <RoadmapPreview section={section} onUpdate={update} />;
    case 'faq':
      return <FAQPreview section={section} onUpdate={update} />;
    case 'contributing':
      return <ContributingPreview section={section} onUpdate={update} />;
    case 'contributors':
      return <ContributorsPreview section={section} onUpdate={update} />;
    case 'license':
      return <LicensePreview section={section} onUpdate={update} />;
    case 'contact':
      return <ContactPreview section={section} onUpdate={update} />;
    case 'custom':
      return <CustomPreview section={section} onUpdate={update} />;
    default:
      return <div className="text-[var(--color-text-tertiary)] text-sm">Unknown section type</div>;
  }
}

// ─── Individual Preview Components ───────────────────────────────────────────

interface PreviewProps<T extends Section> {
  section: T;
  onUpdate: (updates: Partial<T>) => void;
}

function HeaderPreview({ section, onUpdate }: PreviewProps<Section & { type: 'header' }>) {
  return (
    <div className={`markdown-preview ${section.alignment === 'center' ? 'text-center' : ''}`}>
      {section.logoUrl && (
        <img src={section.logoUrl} alt="Logo" className="w-20 h-20 mx-auto mb-3 rounded-xl" />
      )}
      {section.bannerUrl && (
        <img src={section.bannerUrl} alt="Banner" className="w-full rounded-lg mb-3" />
      )}
      <EditableText
        value={section.title}
        onChange={(title) => onUpdate({ title } as Partial<Section & { type: 'header' }>)}
        tag="h1"
        className="text-3xl font-bold"
        placeholder="Project Title"
      />
      {(section.subtitle || true) && (
        <blockquote className="border-l-4 border-[var(--color-accent-primary)] pl-4 my-3 bg-[var(--color-accent-primary-muted)] py-2 rounded-r-md">
          <EditableText
            value={section.subtitle}
            onChange={(subtitle) => onUpdate({ subtitle } as Partial<Section & { type: 'header' }>)}
            tag="p"
            className="text-[var(--color-text-secondary)]"
            placeholder="A brief description..."
          />
        </blockquote>
      )}
      {section.badges.length > 0 && (
        <div className="flex flex-wrap gap-1.5 my-3 justify-center">
          {section.badges.map(badge => {
            const md = badgeToMarkdown(badge);
            const urlMatch = md.match(/\(([^)]+)\)/);
            const imgUrl = urlMatch ? urlMatch[1].replace(/^\[!\[[^\]]*\]\(/, '').replace(/\).*/, '') : '';
            const shieldUrl = md.match(/https:\/\/img\.shields\.io[^)]+/)?.[0] || '';
            return <img key={badge.id} src={shieldUrl || imgUrl} alt={badge.label} className="h-6" />;
          })}
        </div>
      )}
      {section.buttons.length > 0 && (
        <div className="flex gap-3 my-3 justify-center flex-wrap">
          {section.buttons.map(btn => (
            <a key={btn.id} href={btn.url} className="text-[var(--color-accent-primary)] font-medium hover:underline">{btn.text}</a>
          ))}
        </div>
      )}
    </div>
  );
}

function HeroPreview({ section, onUpdate }: PreviewProps<Section & { type: 'hero' }>) {
  return (
    <div className={`markdown-preview ${section.alignment === 'center' ? 'text-center' : ''}`}>
      <EditableText value={section.title} onChange={(title) => onUpdate({ title } as never)} tag="h1" className="text-3xl font-bold" placeholder="Hero Title" />
      <EditableText value={section.tagline} onChange={(tagline) => onUpdate({ tagline } as never)} tag="h3" className="text-xl font-medium text-[var(--color-text-secondary)] mt-2" placeholder="Tagline" />
      <EditableText value={section.description} onChange={(description) => onUpdate({ description } as never)} tag="p" className="mt-3 text-[var(--color-text-secondary)]" placeholder="Description" multiline />
      {section.imageUrl && <img src={section.imageUrl} alt="Hero" className="w-full rounded-lg mt-4" />}
    </div>
  );
}

function AboutPreview({ section, onUpdate }: PreviewProps<Section & { type: 'about' }>) {
  return (
    <div className="markdown-preview">
      <EditableText value={section.title} onChange={(title) => onUpdate({ title } as never)} tag="h2" className="text-xl font-semibold border-b border-[var(--color-border)] pb-2" />
      <EditableText value={section.description} onChange={(description) => onUpdate({ description } as never)} tag="p" className="mt-2" multiline />
      {section.highlights.length > 0 && (
        <ul className="list-disc pl-5 mt-3 space-y-1">
          {section.highlights.map((h, i) => (
            <li key={i}>
              <EditableText
                value={h}
                onChange={(text) => {
                  const highlights = [...section.highlights];
                  highlights[i] = text;
                  onUpdate({ highlights } as never);
                }}
                className="text-sm"
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function FeaturesPreview({ section, onUpdate }: PreviewProps<Section & { type: 'features' }>) {
  return (
    <div className="markdown-preview">
      <EditableText value={section.title} onChange={(title) => onUpdate({ title } as never)} tag="h2" className="text-xl font-semibold border-b border-[var(--color-border)] pb-2" />
      <div className={`grid gap-3 mt-3 ${section.columns === 2 ? 'grid-cols-2' : section.columns === 3 ? 'grid-cols-3' : 'grid-cols-1'}`}>
        {section.features.map((feature, i) => (
          <div key={feature.id} className="flex gap-2 items-start p-2 rounded-md hover:bg-[var(--color-bg-hover)] transition-colors">
            <span className="text-lg shrink-0">{feature.emoji}</span>
            <div>
              <EditableText
                value={feature.title}
                onChange={(title) => {
                  const features = [...section.features];
                  features[i] = { ...feature, title };
                  onUpdate({ features } as never);
                }}
                tag="span"
                className="font-semibold text-sm"
              />
              <EditableText
                value={feature.description}
                onChange={(description) => {
                  const features = [...section.features];
                  features[i] = { ...feature, description };
                  onUpdate({ features } as never);
                }}
                tag="p"
                className="text-xs text-[var(--color-text-secondary)] mt-0.5"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TechStackPreview({ section }: PreviewProps<Section & { type: 'tech-stack' }>) {
  return (
    <div className="markdown-preview">
      <h2 className="text-xl font-semibold border-b border-[var(--color-border)] pb-2">{section.title}</h2>
      <div className="flex flex-wrap gap-2 mt-3">
        {section.items.map(item => (
          <img
            key={item.id}
            src={`https://img.shields.io/badge/${encodeURIComponent(item.name)}-000?style=for-the-badge&logo=${item.icon}&logoColor=white`}
            alt={item.name}
            className="h-7"
          />
        ))}
      </div>
    </div>
  );
}

function InstallationPreview({ section, onUpdate }: PreviewProps<Section & { type: 'installation' }>) {
  return (
    <div className="markdown-preview">
      <EditableText value={section.title} onChange={(title) => onUpdate({ title } as never)} tag="h2" className="text-xl font-semibold border-b border-[var(--color-border)] pb-2" />
      {section.prerequisites.length > 0 && (
        <>
          <h3 className="text-base font-semibold mt-3">Prerequisites</h3>
          <ul className="list-disc pl-5 mt-1">
            {section.prerequisites.map((p, i) => <li key={i} className="text-sm">{p}</li>)}
          </ul>
        </>
      )}
      <div className="mt-3 space-y-3">
        {section.steps.map((step, i) => (
          <div key={step.id}>
            <p className="text-sm font-medium">{i + 1}. {step.title}</p>
            <pre className="mt-1 bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg p-3 overflow-x-auto">
              <code className="text-xs font-mono">{step.command}</code>
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
}

function UsagePreview({ section, onUpdate }: PreviewProps<Section & { type: 'usage' }>) {
  return (
    <div className="markdown-preview">
      <EditableText value={section.title} onChange={(title) => onUpdate({ title } as never)} tag="h2" className="text-xl font-semibold border-b border-[var(--color-border)] pb-2" />
      {section.description && <p className="mt-2 text-sm">{section.description}</p>}
      {section.examples.map(example => (
        <div key={example.id} className="mt-3">
          {example.title && <h3 className="text-base font-semibold">{example.title}</h3>}
          {example.description && <p className="text-sm text-[var(--color-text-secondary)] mt-1">{example.description}</p>}
          <pre className="mt-1.5 bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg p-3 overflow-x-auto">
            <code className="text-xs font-mono">{example.code}</code>
          </pre>
        </div>
      ))}
    </div>
  );
}

function ScreenshotsPreview({ section }: PreviewProps<Section & { type: 'screenshots' }>) {
  return (
    <div className="markdown-preview">
      <h2 className="text-xl font-semibold border-b border-[var(--color-border)] pb-2">{section.title}</h2>
      <div className={`mt-3 ${section.layout === 'grid' ? 'grid grid-cols-2 gap-3' : 'space-y-3'}`}>
        {section.screenshots.map(ss => (
          <div key={ss.id} className="text-center">
            <img src={ss.url} alt={ss.alt} className="rounded-lg w-full" />
            {ss.caption && <p className="text-xs text-[var(--color-text-tertiary)] mt-1 italic">{ss.caption}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

function DemoPreview({ section, onUpdate }: PreviewProps<Section & { type: 'demo' }>) {
  return (
    <div className="markdown-preview">
      <EditableText value={section.title} onChange={(title) => onUpdate({ title } as never)} tag="h2" className="text-xl font-semibold border-b border-[var(--color-border)] pb-2" />
      {section.description && <p className="mt-2 text-sm">{section.description}</p>}
      {section.url ? (
        section.demoType === 'youtube' ? (
          <div className="mt-3 aspect-video bg-[var(--color-bg-surface)] rounded-lg flex items-center justify-center border border-[var(--color-border)]">
            <a href={section.url} className="text-[var(--color-accent-primary)] hover:underline">▶ Watch on YouTube</a>
          </div>
        ) : (
          <img src={section.url} alt="Demo" className="w-full rounded-lg mt-3" />
        )
      ) : (
        <div className="mt-3 aspect-video bg-[var(--color-bg-surface)] rounded-lg flex items-center justify-center border border-dashed border-[var(--color-border)]">
          <span className="text-sm text-[var(--color-text-tertiary)]">Add a demo URL in the properties panel</span>
        </div>
      )}
    </div>
  );
}

function RoadmapPreview({ section, onUpdate }: PreviewProps<Section & { type: 'roadmap' }>) {
  return (
    <div className="markdown-preview">
      <EditableText value={section.title} onChange={(title) => onUpdate({ title } as never)} tag="h2" className="text-xl font-semibold border-b border-[var(--color-border)] pb-2" />
      <ul className="mt-3 space-y-1.5">
        {section.items.map((item, i) => (
          <li key={item.id} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => {
                const items = [...section.items];
                items[i] = { ...item, completed: !item.completed };
                onUpdate({ items } as never);
              }}
              className="accent-[var(--color-accent-primary)] w-4 h-4"
            />
            <EditableText
              value={item.text}
              onChange={(text) => {
                const items = [...section.items];
                items[i] = { ...item, text };
                onUpdate({ items } as never);
              }}
              className={`text-sm ${item.completed ? 'line-through text-[var(--color-text-tertiary)]' : ''}`}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

function FAQPreview({ section, onUpdate }: PreviewProps<Section & { type: 'faq' }>) {
  return (
    <div className="markdown-preview">
      <EditableText value={section.title} onChange={(title) => onUpdate({ title } as never)} tag="h2" className="text-xl font-semibold border-b border-[var(--color-border)] pb-2" />
      <div className="mt-3 space-y-2">
        {section.items.map((item, i) => (
          <details key={item.id} className="border border-[var(--color-border)] rounded-lg p-3 bg-[var(--color-bg-elevated)]">
            <summary className="font-medium text-sm cursor-pointer hover:text-[var(--color-accent-primary)] transition-colors">
              <EditableText
                value={item.question}
                onChange={(question) => {
                  const items = [...section.items];
                  items[i] = { ...item, question };
                  onUpdate({ items } as never);
                }}
                className="inline"
              />
            </summary>
            <div className="mt-2">
              <EditableText
                value={item.answer}
                onChange={(answer) => {
                  const items = [...section.items];
                  items[i] = { ...item, answer };
                  onUpdate({ items } as never);
                }}
                tag="p"
                className="text-sm text-[var(--color-text-secondary)]"
                multiline
              />
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}

function ContributingPreview({ section, onUpdate }: PreviewProps<Section & { type: 'contributing' }>) {
  return (
    <div className="markdown-preview">
      <EditableText value={section.title} onChange={(title) => onUpdate({ title } as never)} tag="h2" className="text-xl font-semibold border-b border-[var(--color-border)] pb-2" />
      <EditableText value={section.description} onChange={(description) => onUpdate({ description } as never)} tag="p" className="mt-2 text-sm" multiline />
      {section.guidelines.length > 0 && (
        <ol className="list-decimal pl-5 mt-3 space-y-1">
          {section.guidelines.map((g, i) => (
            <li key={i} className="text-sm">
              <EditableText
                value={g}
                onChange={(text) => {
                  const guidelines = [...section.guidelines];
                  guidelines[i] = text;
                  onUpdate({ guidelines } as never);
                }}
              />
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

function ContributorsPreview({ section }: PreviewProps<Section & { type: 'contributors' }>) {
  return (
    <div className="markdown-preview">
      <h2 className="text-xl font-semibold border-b border-[var(--color-border)] pb-2">{section.title}</h2>
      <div className="flex flex-wrap gap-4 mt-3">
        {section.contributors.map(c => (
          <div key={c.id} className="text-center">
            <img
              src={c.avatarUrl || `https://github.com/${c.githubUsername}.png?size=80`}
              alt={c.name}
              className="w-16 h-16 rounded-full mx-auto border-2 border-[var(--color-border)]"
            />
            <p className="text-xs font-medium mt-1.5">{c.name}</p>
            <p className="text-[10px] text-[var(--color-text-tertiary)]">@{c.githubUsername}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function LicensePreview({ section, onUpdate }: PreviewProps<Section & { type: 'license' }>) {
  return (
    <div className="markdown-preview">
      <EditableText value={section.title} onChange={(title) => onUpdate({ title } as never)} tag="h2" className="text-xl font-semibold border-b border-[var(--color-border)] pb-2" />
      <p className="mt-2 text-sm">
        This project is licensed under the <strong>{section.licenseType}</strong> License — see the <a href="#">LICENSE</a> file for details.
      </p>
      <p className="text-sm text-[var(--color-text-secondary)] mt-1">
        Copyright © {section.year} {section.author}
      </p>
    </div>
  );
}

function ContactPreview({ section, onUpdate }: PreviewProps<Section & { type: 'contact' }>) {
  return (
    <div className="markdown-preview">
      <EditableText value={section.title} onChange={(title) => onUpdate({ title } as never)} tag="h2" className="text-xl font-semibold border-b border-[var(--color-border)] pb-2" />
      {section.name && <p className="mt-2 font-medium">{section.name}</p>}
      {section.email && (
        <p className="text-sm mt-1">📧 Email: <a href={`mailto:${section.email}`}>{section.email}</a></p>
      )}
      {section.links.length > 0 && (
        <ul className="mt-2 space-y-1">
          {section.links.map(link => (
            <li key={link.id} className="text-sm">
              {link.platform}: <a href={link.url}>{link.label}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function CustomPreview({ section, onUpdate }: PreviewProps<Section & { type: 'custom' }>) {
  return (
    <div className="markdown-preview">
      <EditableText value={section.title} onChange={(title) => onUpdate({ title } as never)} tag="h2" className="text-xl font-semibold border-b border-[var(--color-border)] pb-2" />
      <EditableText value={section.content} onChange={(content) => onUpdate({ content } as never)} tag="p" className="mt-2 text-sm whitespace-pre-wrap" multiline />
    </div>
  );
}

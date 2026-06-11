// ─── Visual Builder ─────────────────────────────────────────────────────────
// Main canvas with drag-and-drop reordering via dnd-kit.

import { useCallback } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  GripVertical,
  Copy,
  Trash2,
  Eye,
  EyeOff,
  Plus,
} from 'lucide-react';
import { useReadmeStore } from '../store/readme-store';
import { useUIStore } from '../store/ui-store';
import { SectionPreview } from './SectionPreview';
import type { Section, SectionType } from '../types/sections';
import { SECTION_METADATA } from '../types/sections';

export function VisualBuilder() {
  const sections = useReadmeStore(s => s.sections);
  const reorderSections = useReadmeStore(s => s.reorderSections);
  const addSection = useReadmeStore(s => s.addSection);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = sections.findIndex(s => s.id === active.id);
    const newIndex = sections.findIndex(s => s.id === over.id);
    if (oldIndex !== -1 && newIndex !== -1) {
      reorderSections(oldIndex, newIndex);
    }
  }, [sections, reorderSections]);

  if (sections.length === 0) {
    return <EmptyState onAddSection={addSection} />;
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-3xl mx-auto py-8 px-6">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={sections.map(s => s.id)}
            strategy={verticalListSortingStrategy}
          >
            {sections.map((section) => (
              <SortableSection key={section.id} section={section} />
            ))}
          </SortableContext>
        </DndContext>

        {/* Add Section Button */}
        <AddSectionButton />
      </div>
    </div>
  );
}

function SortableSection({ section }: { section: Section }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id });

  const selectSection = useUIStore(s => s.selectSection);
  const selectedSectionId = useUIStore(s => s.selectedSectionId);
  const duplicateSection = useReadmeStore(s => s.duplicateSection);
  const removeSection = useReadmeStore(s => s.removeSection);
  const toggleSectionVisibility = useReadmeStore(s => s.toggleSectionVisibility);

  const isSelected = selectedSectionId === section.id;
  const meta = SECTION_METADATA.find(m => m.type === section.type);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative group mb-4 rounded-xl border transition-all ${
        isSelected
          ? 'border-[var(--color-accent-primary)] shadow-[var(--shadow-glow)]'
          : 'border-transparent hover:border-[var(--color-border)]'
      } ${!section.visible ? 'opacity-40' : ''}`}
      onClick={() => selectSection(section.id)}
    >
      {/* Section toolbar */}
      <div className={`absolute -top-3 left-4 flex items-center gap-0.5 px-1 py-0.5 rounded-md bg-[var(--color-bg-elevated)] border border-[var(--color-border)] shadow-sm z-10 transition-opacity ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
        <button
          {...attributes}
          {...listeners}
          className="p-1 text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] cursor-grab active:cursor-grabbing transition-colors"
          aria-label="Drag to reorder"
        >
          <GripVertical size={12} />
        </button>
        <span className="text-[10px] font-medium text-[var(--color-text-tertiary)] px-1">{meta?.label}</span>
        <div className="w-px h-3 bg-[var(--color-border)] mx-0.5" />
        <button
          onClick={(e) => { e.stopPropagation(); toggleSectionVisibility(section.id); }}
          className="p-1 text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors"
          aria-label={section.visible ? 'Hide section' : 'Show section'}
        >
          {section.visible ? <Eye size={12} /> : <EyeOff size={12} />}
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); duplicateSection(section.id); }}
          className="p-1 text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors"
          aria-label="Duplicate section"
        >
          <Copy size={12} />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); removeSection(section.id); }}
          className="p-1 text-[var(--color-text-tertiary)] hover:text-[var(--color-accent-error)] transition-colors"
          aria-label="Delete section"
        >
          <Trash2 size={12} />
        </button>
      </div>

      {/* Section content */}
      <div className="p-5 pt-4">
        <SectionPreview section={section} />
      </div>
    </div>
  );
}

function EmptyState({ onAddSection }: { onAddSection: (type: SectionType) => void }) {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center max-w-lg mx-auto px-6 py-16 animate-fade-in">
        {/* Illustration */}
        <div className="relative mx-auto mb-8 w-28 h-28">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[var(--color-accent-primary)]/20 to-[var(--color-accent-secondary)]/20 animate-float" />
          <div className="absolute inset-2 rounded-2xl bg-[var(--color-bg-surface)] border border-[var(--color-border)] flex flex-col items-center justify-center gap-1.5 shadow-lg">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="12" y1="13" x2="12" y2="17" />
              <line x1="10" y1="15" x2="14" y2="15" />
            </svg>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2 tracking-tight">Start Building Your README</h2>
        <p className="text-sm text-[var(--color-text-secondary)] mb-8 leading-relaxed max-w-sm mx-auto">
          Add sections from the sidebar, choose a template, or start from scratch with the buttons below.
        </p>

        {/* Primary Actions */}
        <div className="flex gap-3 justify-center flex-wrap mb-6">
          <button
            onClick={() => onAddSection('header')}
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold bg-[var(--color-accent-primary)] text-white rounded-xl hover:bg-[var(--color-accent-primary-hover)] transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
          >
            <Plus size={16} />
            Add Header
          </button>
          <button
            onClick={() => {
              onAddSection('header');
              onAddSection('about');
              onAddSection('features');
              onAddSection('installation');
              onAddSection('usage');
              onAddSection('license');
            }}
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-[var(--color-text-primary)] bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-xl hover:bg-[var(--color-bg-hover)] hover:border-[var(--color-border-strong)] transition-all hover:-translate-y-0.5"
          >
            Quick Start
          </button>
        </div>

        {/* Suggested Templates */}
        <div className="text-[10px] text-[var(--color-text-tertiary)] uppercase tracking-wider font-semibold mb-3">Or start from a template</div>
        <div className="flex gap-2 justify-center flex-wrap">
          {[
            { label: 'Developer', emoji: '\u{1F4BB}' },
            { label: 'Open Source', emoji: '\u{1F310}' },
            { label: 'Portfolio', emoji: '\u{1F3A8}' },
            { label: 'SaaS', emoji: '\u{1F680}' },
          ].map(t => (
            <button
              key={t.label}
              className="px-3 py-1.5 text-xs text-[var(--color-text-secondary)] bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-lg hover:bg-[var(--color-bg-hover)] hover:border-[var(--color-border-strong)] hover:text-[var(--color-text-primary)] transition-all"
            >
              {t.emoji} {t.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function AddSectionButton() {
  const addSection = useReadmeStore(s => s.addSection);

  return (
    <div className="flex justify-center py-6">
      <button
        onClick={() => addSection('custom')}
        className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-[var(--color-text-tertiary)] border border-dashed border-[var(--color-border)] rounded-xl hover:border-[var(--color-accent-primary)] hover:text-[var(--color-accent-primary)] hover:bg-[var(--color-accent-primary-muted)] transition-all"
        aria-label="Add new section"
      >
        <Plus size={16} />
        Add Section
      </button>
    </div>
  );
}

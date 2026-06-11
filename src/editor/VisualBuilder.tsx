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
      <div className="text-center max-w-md mx-auto px-6 py-16 animate-fade-in">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)] flex items-center justify-center mx-auto mb-5 shadow-lg">
          <Plus size={28} className="text-white" />
        </div>
        <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-2">Start Building Your README</h2>
        <p className="text-sm text-[var(--color-text-secondary)] mb-6">
          Add sections from the sidebar, or start with a template to get going quickly.
        </p>
        <div className="flex gap-2 justify-center flex-wrap">
          <button
            onClick={() => onAddSection('header')}
            className="px-4 py-2 text-sm font-medium bg-[var(--color-accent-primary)] text-white rounded-lg hover:bg-[var(--color-accent-primary-hover)] transition-colors"
          >
            Add Header
          </button>
          <button
            onClick={() => {
              onAddSection('header');
              onAddSection('about');
              onAddSection('features');
              onAddSection('installation');
              onAddSection('license');
            }}
            className="px-4 py-2 text-sm font-medium bg-[var(--color-bg-surface)] text-[var(--color-text-secondary)] border border-[var(--color-border)] rounded-lg hover:bg-[var(--color-bg-hover)] hover:text-[var(--color-text-primary)] transition-colors"
          >
            Quick Start
          </button>
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

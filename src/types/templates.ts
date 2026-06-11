import type { Section, SectionType } from './sections';

export interface Template {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'project' | 'profile' | 'product';
  sections: Section[];
  preview: string;
}

export interface TemplateCategory {
  id: string;
  name: string;
  description: string;
  templates: Template[];
}

export type TemplateSectionConfig = {
  type: SectionType;
  overrides?: Record<string, unknown>;
};

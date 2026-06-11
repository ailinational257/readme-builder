export interface BadgePreset {
  id: string;
  label: string;
  message: string;
  color: string;
  logoName: string;
  logoColor: string;
  category: BadgeCategory;
}

export type BadgeCategory =
  | 'language'
  | 'framework'
  | 'status'
  | 'license'
  | 'social'
  | 'tool'
  | 'database'
  | 'cloud'
  | 'custom';

export interface BadgeCategoryMeta {
  id: BadgeCategory;
  label: string;
  icon: string;
}

export const BADGE_CATEGORIES: BadgeCategoryMeta[] = [
  { id: 'language', label: 'Languages', icon: 'code' },
  { id: 'framework', label: 'Frameworks', icon: 'layers' },
  { id: 'status', label: 'Status', icon: 'activity' },
  { id: 'license', label: 'License', icon: 'scale' },
  { id: 'social', label: 'Social', icon: 'share-2' },
  { id: 'tool', label: 'Tools', icon: 'wrench' },
  { id: 'database', label: 'Databases', icon: 'database' },
  { id: 'cloud', label: 'Cloud', icon: 'cloud' },
  { id: 'custom', label: 'Custom', icon: 'pen-tool' },
];

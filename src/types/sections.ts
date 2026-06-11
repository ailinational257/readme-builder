// ─── Section Type Definitions ───────────────────────────────────────────────
// Each section type has a discriminated union via the `type` field.
// All sections share a common base with `id`, `type`, and `visible`.

export type SectionType =
  | 'header'
  | 'hero'
  | 'about'
  | 'features'
  | 'tech-stack'
  | 'installation'
  | 'usage'
  | 'screenshots'
  | 'demo'
  | 'roadmap'
  | 'faq'
  | 'contributing'
  | 'contributors'
  | 'license'
  | 'contact'
  | 'custom';

export interface SectionBase {
  id: string;
  type: SectionType;
  visible: boolean;
}

// ─── Header ──────────────────────────────────────────────────────────────────

export type HeaderStyle = 'minimal' | 'centered' | 'hero' | 'banner' | 'animated';
export type HeaderAlignment = 'left' | 'center' | 'right';

export interface HeaderButton {
  id: string;
  text: string;
  url: string;
}

export interface HeaderSection extends SectionBase {
  type: 'header';
  style: HeaderStyle;
  title: string;
  subtitle: string;
  logoUrl: string;
  bannerUrl: string;
  alignment: HeaderAlignment;
  buttons: HeaderButton[];
  badges: Badge[];
}

// ─── Hero ────────────────────────────────────────────────────────────────────

export interface HeroSection extends SectionBase {
  type: 'hero';
  title: string;
  tagline: string;
  description: string;
  imageUrl: string;
  alignment: HeaderAlignment;
  badges: Badge[];
}

// ─── About ───────────────────────────────────────────────────────────────────

export interface AboutSection extends SectionBase {
  type: 'about';
  title: string;
  description: string;
  highlights: string[];
}

// ─── Features ────────────────────────────────────────────────────────────────

export interface Feature {
  id: string;
  emoji: string;
  title: string;
  description: string;
}

export interface FeaturesSection extends SectionBase {
  type: 'features';
  title: string;
  features: Feature[];
  columns: 1 | 2 | 3;
}

// ─── Tech Stack ──────────────────────────────────────────────────────────────

export interface TechItem {
  id: string;
  name: string;
  icon: string;
  category: string;
  url: string;
}

export interface TechStackSection extends SectionBase {
  type: 'tech-stack';
  title: string;
  items: TechItem[];
  displayStyle: 'badges' | 'table' | 'list' | 'icons';
}

// ─── Installation ────────────────────────────────────────────────────────────

export interface InstallStep {
  id: string;
  title: string;
  command: string;
  description: string;
}

export interface InstallationSection extends SectionBase {
  type: 'installation';
  title: string;
  prerequisites: string[];
  steps: InstallStep[];
  packageManager: 'npm' | 'yarn' | 'pnpm' | 'bun';
}

// ─── Usage ───────────────────────────────────────────────────────────────────

export interface UsageExample {
  id: string;
  title: string;
  code: string;
  language: string;
  description: string;
}

export interface UsageSection extends SectionBase {
  type: 'usage';
  title: string;
  description: string;
  examples: UsageExample[];
}

// ─── Screenshots ─────────────────────────────────────────────────────────────

export interface Screenshot {
  id: string;
  url: string;
  caption: string;
  alt: string;
}

export type ScreenshotLayout = 'single' | 'gallery' | 'grid';

export interface ScreenshotsSection extends SectionBase {
  type: 'screenshots';
  title: string;
  screenshots: Screenshot[];
  layout: ScreenshotLayout;
}

// ─── Demo ────────────────────────────────────────────────────────────────────

export type DemoType = 'gif' | 'youtube' | 'loom' | 'image';

export interface DemoSection extends SectionBase {
  type: 'demo';
  title: string;
  description: string;
  demoType: DemoType;
  url: string;
  thumbnailUrl: string;
}

// ─── Roadmap ─────────────────────────────────────────────────────────────────

export interface RoadmapItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface RoadmapSection extends SectionBase {
  type: 'roadmap';
  title: string;
  items: RoadmapItem[];
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface FAQSection extends SectionBase {
  type: 'faq';
  title: string;
  items: FAQItem[];
}

// ─── Contributing ────────────────────────────────────────────────────────────

export interface ContributingSection extends SectionBase {
  type: 'contributing';
  title: string;
  description: string;
  guidelines: string[];
  codeOfConduct: boolean;
}

// ─── Contributors ────────────────────────────────────────────────────────────

export interface Contributor {
  id: string;
  name: string;
  githubUsername: string;
  avatarUrl: string;
  role: string;
}

export interface ContributorsSection extends SectionBase {
  type: 'contributors';
  title: string;
  contributors: Contributor[];
}

// ─── License ─────────────────────────────────────────────────────────────────

export type LicenseType =
  | 'MIT'
  | 'Apache-2.0'
  | 'GPL-3.0'
  | 'BSD-2-Clause'
  | 'BSD-3-Clause'
  | 'ISC'
  | 'MPL-2.0'
  | 'LGPL-3.0'
  | 'Unlicense'
  | 'custom';

export interface LicenseSection extends SectionBase {
  type: 'license';
  title: string;
  licenseType: LicenseType;
  customText: string;
  author: string;
  year: string;
}

// ─── Contact ─────────────────────────────────────────────────────────────────

export interface ContactLink {
  id: string;
  platform: string;
  url: string;
  label: string;
}

export interface ContactSection extends SectionBase {
  type: 'contact';
  title: string;
  name: string;
  email: string;
  links: ContactLink[];
}

// ─── Custom ──────────────────────────────────────────────────────────────────

export interface CustomSection extends SectionBase {
  type: 'custom';
  title: string;
  content: string;
}

// ─── Union Type ──────────────────────────────────────────────────────────────

export type Section =
  | HeaderSection
  | HeroSection
  | AboutSection
  | FeaturesSection
  | TechStackSection
  | InstallationSection
  | UsageSection
  | ScreenshotsSection
  | DemoSection
  | RoadmapSection
  | FAQSection
  | ContributingSection
  | ContributorsSection
  | LicenseSection
  | ContactSection
  | CustomSection;

// ─── Badges (shared across sections) ─────────────────────────────────────────

export type BadgeStyle = 'flat' | 'flat-square' | 'plastic' | 'for-the-badge' | 'social';

export interface Badge {
  id: string;
  label: string;
  message: string;
  color: string;
  labelColor: string;
  style: BadgeStyle;
  logoName: string;
  logoColor: string;
  link: string;
}

// ─── Section Labels & Metadata ───────────────────────────────────────────────

export interface SectionMeta {
  type: SectionType;
  label: string;
  description: string;
  icon: string;
}

export const SECTION_METADATA: SectionMeta[] = [
  { type: 'header', label: 'Header', description: 'Project title, logo, and badges', icon: 'heading' },
  { type: 'hero', label: 'Hero', description: 'Eye-catching hero section', icon: 'sparkles' },
  { type: 'about', label: 'About', description: 'Project overview and highlights', icon: 'info' },
  { type: 'features', label: 'Features', description: 'Key features list', icon: 'list-checks' },
  { type: 'tech-stack', label: 'Tech Stack', description: 'Technologies used', icon: 'layers' },
  { type: 'installation', label: 'Installation', description: 'Setup instructions', icon: 'download' },
  { type: 'usage', label: 'Usage', description: 'Usage examples with code', icon: 'code' },
  { type: 'screenshots', label: 'Screenshots', description: 'Project screenshots gallery', icon: 'image' },
  { type: 'demo', label: 'Demo', description: 'Live demo or video', icon: 'play' },
  { type: 'roadmap', label: 'Roadmap', description: 'Project roadmap checklist', icon: 'map' },
  { type: 'faq', label: 'FAQ', description: 'Frequently asked questions', icon: 'help-circle' },
  { type: 'contributing', label: 'Contributing', description: 'Contribution guidelines', icon: 'git-pull-request' },
  { type: 'contributors', label: 'Contributors', description: 'Project contributors', icon: 'users' },
  { type: 'license', label: 'License', description: 'License information', icon: 'scale' },
  { type: 'contact', label: 'Contact', description: 'Contact information', icon: 'mail' },
  { type: 'custom', label: 'Custom', description: 'Custom markdown section', icon: 'pen-tool' },
];

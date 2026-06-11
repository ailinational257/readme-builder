import { generateId } from './id';
import type {
  Section,
  SectionType,
  HeaderSection,
  HeroSection,
  AboutSection,
  FeaturesSection,
  TechStackSection,
  InstallationSection,
  UsageSection,
  ScreenshotsSection,
  DemoSection,
  RoadmapSection,
  FAQSection,
  ContributingSection,
  ContributorsSection,
  LicenseSection,
  ContactSection,
  CustomSection,
} from '../types/sections';

function createHeader(overrides?: Partial<HeaderSection>): HeaderSection {
  return {
    id: generateId(),
    type: 'header',
    visible: true,
    style: 'centered',
    title: 'My Awesome Project',
    subtitle: 'A brief description of your amazing project',
    logoUrl: '',
    bannerUrl: '',
    alignment: 'center',
    buttons: [
      { id: generateId(), text: 'View Demo', url: '#demo' },
      { id: generateId(), text: 'Documentation', url: '#usage' },
    ],
    badges: [],
    ...overrides,
  };
}

function createHero(overrides?: Partial<HeroSection>): HeroSection {
  return {
    id: generateId(),
    type: 'hero',
    visible: true,
    title: 'Welcome to My Project',
    tagline: 'Build something incredible',
    description: 'A powerful, modern solution for developers who want to ship faster and build better products.',
    imageUrl: '',
    alignment: 'center',
    badges: [],
    ...overrides,
  };
}

function createAbout(overrides?: Partial<AboutSection>): AboutSection {
  return {
    id: generateId(),
    type: 'about',
    visible: true,
    title: 'About',
    description: 'This project was built to solve a specific problem. Describe what your project does and why it exists.',
    highlights: [
      'Easy to use and configure',
      'Built with modern technologies',
      'Open source and community driven',
    ],
    ...overrides,
  };
}

function createFeatures(overrides?: Partial<FeaturesSection>): FeaturesSection {
  return {
    id: generateId(),
    type: 'features',
    visible: true,
    title: 'Features',
    features: [
      { id: generateId(), emoji: '🚀', title: 'Fast Performance', description: 'Optimized for speed and efficiency' },
      { id: generateId(), emoji: '🔒', title: 'Secure', description: 'Built with security best practices' },
      { id: generateId(), emoji: '📱', title: 'Responsive', description: 'Works on all devices and screen sizes' },
      { id: generateId(), emoji: '🎨', title: 'Customizable', description: 'Easily adapt to your needs' },
    ],
    columns: 2,
    ...overrides,
  };
}

function createTechStack(overrides?: Partial<TechStackSection>): TechStackSection {
  return {
    id: generateId(),
    type: 'tech-stack',
    visible: true,
    title: 'Tech Stack',
    items: [
      { id: generateId(), name: 'React', icon: 'react', category: 'Frontend', url: 'https://react.dev' },
      { id: generateId(), name: 'TypeScript', icon: 'typescript', category: 'Language', url: 'https://typescriptlang.org' },
      { id: generateId(), name: 'Node.js', icon: 'nodedotjs', category: 'Backend', url: 'https://nodejs.org' },
    ],
    displayStyle: 'badges',
    ...overrides,
  };
}

function createInstallation(overrides?: Partial<InstallationSection>): InstallationSection {
  return {
    id: generateId(),
    type: 'installation',
    visible: true,
    title: 'Installation',
    prerequisites: ['Node.js 18+', 'npm or yarn'],
    steps: [
      { id: generateId(), title: 'Clone the repository', command: 'git clone https://github.com/username/project.git', description: '' },
      { id: generateId(), title: 'Navigate to project directory', command: 'cd project', description: '' },
      { id: generateId(), title: 'Install dependencies', command: 'npm install', description: '' },
      { id: generateId(), title: 'Start development server', command: 'npm run dev', description: '' },
    ],
    packageManager: 'npm',
    ...overrides,
  };
}

function createUsage(overrides?: Partial<UsageSection>): UsageSection {
  return {
    id: generateId(),
    type: 'usage',
    visible: true,
    title: 'Usage',
    description: 'Here are some examples of how to use this project:',
    examples: [
      {
        id: generateId(),
        title: 'Basic Example',
        code: 'import { MyComponent } from \'my-project\';\n\nfunction App() {\n  return <MyComponent />;\n}',
        language: 'tsx',
        description: 'Import and use the main component',
      },
    ],
    ...overrides,
  };
}

function createScreenshots(overrides?: Partial<ScreenshotsSection>): ScreenshotsSection {
  return {
    id: generateId(),
    type: 'screenshots',
    visible: true,
    title: 'Screenshots',
    screenshots: [
      { id: generateId(), url: 'https://placehold.co/800x400/1a1a2e/e0e0e0?text=Screenshot+1', caption: 'Main Dashboard', alt: 'Screenshot of main dashboard' },
      { id: generateId(), url: 'https://placehold.co/800x400/16213e/e0e0e0?text=Screenshot+2', caption: 'Settings Page', alt: 'Screenshot of settings page' },
    ],
    layout: 'gallery',
    ...overrides,
  };
}

function createDemo(overrides?: Partial<DemoSection>): DemoSection {
  return {
    id: generateId(),
    type: 'demo',
    visible: true,
    title: 'Demo',
    description: 'Check out the live demo to see the project in action.',
    demoType: 'gif',
    url: '',
    thumbnailUrl: '',
    ...overrides,
  };
}

function createRoadmap(overrides?: Partial<RoadmapSection>): RoadmapSection {
  return {
    id: generateId(),
    type: 'roadmap',
    visible: true,
    title: 'Roadmap',
    items: [
      { id: generateId(), text: 'Initial Release', completed: true },
      { id: generateId(), text: 'Add authentication', completed: true },
      { id: generateId(), text: 'Dashboard UI', completed: false },
      { id: generateId(), text: 'API integration', completed: false },
      { id: generateId(), text: 'Mobile support', completed: false },
    ],
    ...overrides,
  };
}

function createFAQ(overrides?: Partial<FAQSection>): FAQSection {
  return {
    id: generateId(),
    type: 'faq',
    visible: true,
    title: 'FAQ',
    items: [
      { id: generateId(), question: 'How do I install this project?', answer: 'Follow the installation guide above.' },
      { id: generateId(), question: 'Is this project free to use?', answer: 'Yes, this project is open source and free to use.' },
    ],
    ...overrides,
  };
}

function createContributing(overrides?: Partial<ContributingSection>): ContributingSection {
  return {
    id: generateId(),
    type: 'contributing',
    visible: true,
    title: 'Contributing',
    description: 'Contributions are welcome! Here\'s how you can help:',
    guidelines: [
      'Fork the repository',
      'Create a feature branch (`git checkout -b feature/amazing-feature`)',
      'Commit your changes (`git commit -m \'Add amazing feature\'`)',
      'Push to the branch (`git push origin feature/amazing-feature`)',
      'Open a Pull Request',
    ],
    codeOfConduct: true,
    ...overrides,
  };
}

function createContributors(overrides?: Partial<ContributorsSection>): ContributorsSection {
  return {
    id: generateId(),
    type: 'contributors',
    visible: true,
    title: 'Contributors',
    contributors: [
      { id: generateId(), name: 'Your Name', githubUsername: 'username', avatarUrl: '', role: 'Creator' },
    ],
    ...overrides,
  };
}

function createLicense(overrides?: Partial<LicenseSection>): LicenseSection {
  return {
    id: generateId(),
    type: 'license',
    visible: true,
    title: 'License',
    licenseType: 'MIT',
    customText: '',
    author: 'Your Name',
    year: new Date().getFullYear().toString(),
    ...overrides,
  };
}

function createContact(overrides?: Partial<ContactSection>): ContactSection {
  return {
    id: generateId(),
    type: 'contact',
    visible: true,
    title: 'Contact',
    name: 'Your Name',
    email: 'your.email@example.com',
    links: [
      { id: generateId(), platform: 'GitHub', url: 'https://github.com/username', label: '@username' },
      { id: generateId(), platform: 'Twitter', url: 'https://twitter.com/username', label: '@username' },
    ],
    ...overrides,
  };
}

function createCustom(overrides?: Partial<CustomSection>): CustomSection {
  return {
    id: generateId(),
    type: 'custom',
    visible: true,
    title: 'Custom Section',
    content: 'Add your custom markdown content here.',
    ...overrides,
  };
}

const FACTORY_MAP: Record<SectionType, (overrides?: Partial<never>) => Section> = {
  header: createHeader,
  hero: createHero,
  about: createAbout,
  features: createFeatures,
  'tech-stack': createTechStack,
  installation: createInstallation,
  usage: createUsage,
  screenshots: createScreenshots,
  demo: createDemo,
  roadmap: createRoadmap,
  faq: createFAQ,
  contributing: createContributing,
  contributors: createContributors,
  license: createLicense,
  contact: createContact,
  custom: createCustom,
};

export function createSection(type: SectionType, overrides?: Record<string, unknown>): Section {
  const factory = FACTORY_MAP[type];
  return factory(overrides as Partial<never>);
}

export {
  createHeader,
  createHero,
  createAbout,
  createFeatures,
  createTechStack,
  createInstallation,
  createUsage,
  createScreenshots,
  createDemo,
  createRoadmap,
  createFAQ,
  createContributing,
  createContributors,
  createLicense,
  createContact,
  createCustom,
};

// ─── Template Definitions ────────────────────────────────────────────────────
// Pre-built templates that users can load to quick-start their README.

import type { Template } from '../types/templates';
import {
  createHeader,
  createAbout,
  createFeatures,
  createInstallation,
  createUsage,
  createLicense,
  createRoadmap,
  createContributing,
  createContributors,
  createHero,
  createContact,
  createTechStack,
  createScreenshots,
  createDemo,
  createFAQ,
  createCustom,
} from '../utils/section-factory';

export const developerTemplate: Template = {
  id: 'developer',
  name: 'Developer Project',
  description: 'A well-structured README for developer tools and libraries',
  icon: 'code-2',
  category: 'project',
  preview: '# My Library\n> Badges, Features, Installation, Usage, License',
  sections: [
    createHeader({
      title: 'My Developer Project',
      subtitle: 'A powerful developer tool built with modern technologies',
      style: 'centered',
      badges: [
        { id: '1', label: 'build', message: 'passing', color: '22c55e', labelColor: '', style: 'for-the-badge', logoName: 'github-actions', logoColor: 'white', link: '' },
        { id: '2', label: 'npm', message: 'v1.0.0', color: 'cb3837', labelColor: '', style: 'for-the-badge', logoName: 'npm', logoColor: 'white', link: '' },
        { id: '3', label: 'license', message: 'MIT', color: '6366f1', labelColor: '', style: 'for-the-badge', logoName: '', logoColor: '', link: '' },
        { id: '4', label: 'TypeScript', message: '5.0', color: '3178c6', labelColor: '', style: 'for-the-badge', logoName: 'typescript', logoColor: 'white', link: '' },
      ],
    }),
    createFeatures({
      features: [
        { id: 'f1', emoji: '⚡', title: 'Lightning Fast', description: 'Optimized for performance with zero dependencies' },
        { id: 'f2', emoji: '🔒', title: 'Type Safe', description: 'Full TypeScript support with comprehensive type definitions' },
        { id: 'f3', emoji: '📦', title: 'Lightweight', description: 'Under 5KB gzipped, tree-shakeable' },
        { id: 'f4', emoji: '🧪', title: 'Well Tested', description: '100% test coverage with unit and integration tests' },
      ],
    }),
    createInstallation(),
    createUsage(),
    createLicense(),
  ],
};

export const openSourceTemplate: Template = {
  id: 'open-source',
  name: 'Open Source',
  description: 'Comprehensive template for community-driven open source projects',
  icon: 'git-branch',
  category: 'project',
  preview: '# OSS Project\n> Overview, Features, Roadmap, Contributing, License',
  sections: [
    createHeader({
      title: 'My Open Source Project',
      subtitle: 'Open source tool built by the community, for the community',
      style: 'centered',
      badges: [
        { id: '1', label: 'stars', message: '1.2k', color: 'f59e0b', labelColor: '', style: 'for-the-badge', logoName: 'github', logoColor: 'white', link: '' },
        { id: '2', label: 'contributors', message: '25+', color: '22c55e', labelColor: '', style: 'for-the-badge', logoName: '', logoColor: '', link: '' },
        { id: '3', label: 'license', message: 'MIT', color: '6366f1', labelColor: '', style: 'for-the-badge', logoName: '', logoColor: '', link: '' },
      ],
    }),
    createAbout({
      description: 'A brief overview of what this project does, why it was created, and what problem it solves.',
      highlights: [
        'Community-driven development',
        'Comprehensive documentation',
        'Regular releases and updates',
        'Welcoming to new contributors',
      ],
    }),
    createFeatures(),
    createRoadmap(),
    createContributing(),
    createContributors(),
    createLicense(),
  ],
};

export const portfolioTemplate: Template = {
  id: 'portfolio',
  name: 'Portfolio / Profile',
  description: 'Showcase your skills, projects, and contact info',
  icon: 'user',
  category: 'profile',
  preview: '# Hi, I\'m Dev 👋\n> Hero, About, Skills, Projects, Contact',
  sections: [
    createHero({
      title: 'Hi, I\'m Developer 👋',
      tagline: 'Full-Stack Developer | Open Source Enthusiast',
      description: 'I build beautiful, performant web applications with modern technologies. Passionate about open source and developer experience.',
    }),
    createAbout({
      title: 'About Me',
      description: 'I\'m a full-stack developer with 5+ years of experience building web applications. I love working with React, TypeScript, and Node.js.',
      highlights: [
        '🔭 Currently working on exciting projects',
        '🌱 Learning Rust and systems programming',
        '💬 Ask me about React, TypeScript, or Node.js',
        '📫 How to reach me: developer@email.com',
      ],
    }),
    createTechStack({
      title: 'Skills & Technologies',
      items: [
        { id: '1', name: 'React', icon: 'react', category: 'Frontend', url: 'https://react.dev' },
        { id: '2', name: 'TypeScript', icon: 'typescript', category: 'Language', url: '' },
        { id: '3', name: 'Node.js', icon: 'nodedotjs', category: 'Backend', url: '' },
        { id: '4', name: 'Python', icon: 'python', category: 'Language', url: '' },
        { id: '5', name: 'PostgreSQL', icon: 'postgresql', category: 'Database', url: '' },
        { id: '6', name: 'Docker', icon: 'docker', category: 'DevOps', url: '' },
      ],
    }),
    createCustom({
      title: 'Featured Projects',
      content: '### 🏆 Project One\nA brief description of your best project. [View →](https://github.com/username/project)\n\n### 🚀 Project Two\nAnother great project description. [View →](https://github.com/username/project2)\n\n### 🎯 Project Three\nYet another project. [View →](https://github.com/username/project3)',
    }),
    createContact(),
  ],
};

export const saasTemplate: Template = {
  id: 'saas',
  name: 'SaaS Product',
  description: 'Showcase your SaaS product with features, demo, and FAQ',
  icon: 'rocket',
  category: 'product',
  preview: '# Product Name\n> Overview, Features, Screenshots, Demo, FAQ',
  sections: [
    createHeader({
      title: 'ProductName',
      subtitle: 'The modern platform for teams who want to ship faster',
      style: 'hero',
      buttons: [
        { id: 'b1', text: '🚀 Get Started', url: 'https://example.com/signup' },
        { id: 'b2', text: '📖 Documentation', url: 'https://docs.example.com' },
      ],
      badges: [
        { id: '1', label: 'status', message: 'active', color: '22c55e', labelColor: '', style: 'for-the-badge', logoName: '', logoColor: '', link: '' },
        { id: '2', label: 'version', message: '2.0', color: '6366f1', labelColor: '', style: 'for-the-badge', logoName: '', logoColor: '', link: '' },
      ],
    }),
    createFeatures({
      features: [
        { id: 'f1', emoji: '⚡', title: 'Real-time Collaboration', description: 'Work together with your team in real-time' },
        { id: 'f2', emoji: '🔐', title: 'Enterprise Security', description: 'SOC 2 compliant with end-to-end encryption' },
        { id: 'f3', emoji: '📊', title: 'Advanced Analytics', description: 'Deep insights into your workflow performance' },
        { id: 'f4', emoji: '🔌', title: 'Integrations', description: 'Connect with 100+ tools your team already uses' },
      ],
      columns: 2,
    }),
    createScreenshots(),
    createDemo(),
    createFAQ({
      items: [
        { id: 'q1', question: 'Is there a free plan?', answer: 'Yes! We offer a generous free tier for individuals and small teams.' },
        { id: 'q2', question: 'Can I self-host?', answer: 'Yes, we provide Docker images and Kubernetes manifests for self-hosting.' },
        { id: 'q3', question: 'How do I migrate from other tools?', answer: 'We provide migration guides and an import tool for most popular platforms.' },
      ],
    }),
    createLicense(),
  ],
};

export const cliTemplate: Template = {
  id: 'cli',
  name: 'CLI Tool',
  description: 'Documentation template for command-line tools',
  icon: 'terminal',
  category: 'project',
  preview: '# cli-tool\n> Installation, Commands, Examples, Config',
  sections: [
    createHeader({
      title: 'my-cli-tool',
      subtitle: 'A powerful command-line tool for modern developers',
      style: 'minimal',
      badges: [
        { id: '1', label: 'npm', message: 'v1.0.0', color: 'cb3837', labelColor: '', style: 'flat-square', logoName: 'npm', logoColor: 'white', link: '' },
        { id: '2', label: 'license', message: 'MIT', color: '6366f1', labelColor: '', style: 'flat-square', logoName: '', logoColor: '', link: '' },
      ],
    }),
    createInstallation({
      title: 'Installation',
      steps: [
        { id: 's1', title: 'Install globally via npm', command: 'npm install -g my-cli-tool', description: '' },
        { id: 's2', title: 'Or use npx directly', command: 'npx my-cli-tool', description: '' },
      ],
    }),
    createUsage({
      title: 'Commands',
      description: 'Available commands and their usage:',
      examples: [
        { id: 'e1', title: 'Initialize a new project', code: 'my-cli init my-project', language: 'bash', description: 'Scaffolds a new project in the current directory' },
        { id: 'e2', title: 'Build the project', code: 'my-cli build --production', language: 'bash', description: 'Build for production with optimizations' },
        { id: 'e3', title: 'Run development server', code: 'my-cli dev --port 3000', language: 'bash', description: 'Start a hot-reloading dev server' },
      ],
    }),
    createCustom({
      title: 'Configuration',
      content: 'Create a `.myclirc` file in your project root:\n\n```json\n{\n  "output": "./dist",\n  "minify": true,\n  "sourceMaps": true,\n  "target": "es2022"\n}\n```\n\n### Environment Variables\n\n| Variable | Description | Default |\n| --- | --- | --- |\n| `MY_CLI_DEBUG` | Enable debug logging | `false` |\n| `MY_CLI_CONFIG` | Custom config path | `.myclirc` |',
    }),
    createLicense(),
  ],
};

export const aiProjectTemplate: Template = {
  id: 'ai-project',
  name: 'AI / ML Project',
  description: 'Template for AI, ML, and data science projects',
  icon: 'brain',
  category: 'project',
  preview: '# AI Project\n> Overview, Features, Examples, API Usage',
  sections: [
    createHeader({
      title: 'My AI Project',
      subtitle: 'State-of-the-art machine learning model for natural language understanding',
      style: 'centered',
      badges: [
        { id: '1', label: 'Python', message: '3.11+', color: '3776ab', labelColor: '', style: 'for-the-badge', logoName: 'python', logoColor: 'white', link: '' },
        { id: '2', label: 'PyTorch', message: '2.0', color: 'ee4c2c', labelColor: '', style: 'for-the-badge', logoName: 'pytorch', logoColor: 'white', link: '' },
        { id: '3', label: 'license', message: 'Apache 2.0', color: '6366f1', labelColor: '', style: 'for-the-badge', logoName: '', logoColor: '', link: '' },
      ],
    }),
    createAbout({
      title: 'Overview',
      description: 'This project implements a state-of-the-art model for [task]. It achieves X% accuracy on [benchmark], outperforming previous approaches by Y%.',
      highlights: [
        'Pre-trained models available on HuggingFace',
        'Easy-to-use Python API',
        'GPU and CPU inference support',
        'Comprehensive evaluation suite',
      ],
    }),
    createFeatures({
      title: 'Key Features',
      features: [
        { id: 'f1', emoji: '🧠', title: 'State-of-the-Art', description: 'Achieves top performance on standard benchmarks' },
        { id: 'f2', emoji: '⚡', title: 'Fast Inference', description: 'Optimized for both GPU and CPU inference' },
        { id: 'f3', emoji: '📊', title: 'Evaluation Suite', description: 'Built-in tools for model evaluation and comparison' },
        { id: 'f4', emoji: '🔧', title: 'Fine-tuning', description: 'Easy fine-tuning on custom datasets' },
      ],
    }),
    createUsage({
      title: 'Quick Start',
      description: '',
      examples: [
        {
          id: 'e1',
          title: 'Basic Usage',
          code: 'from my_ai_project import Model\n\nmodel = Model.from_pretrained("my-model")\nresult = model.predict("Hello, world!")\nprint(result)',
          language: 'python',
          description: 'Load a pre-trained model and run inference',
        },
        {
          id: 'e2',
          title: 'API Server',
          code: 'from my_ai_project import serve\n\nserve(model="my-model", port=8000)',
          language: 'python',
          description: 'Start a REST API server for model inference',
        },
      ],
    }),
    createInstallation({
      steps: [
        { id: 's1', title: 'Install from PyPI', command: 'pip install my-ai-project', description: '' },
        { id: 's2', title: 'Or install from source', command: 'git clone https://github.com/username/my-ai-project.git\ncd my-ai-project\npip install -e .', description: '' },
      ],
      prerequisites: ['Python 3.11+', 'CUDA 12.0+ (for GPU support)'],
      packageManager: 'pip' as 'npm',
    }),
    createLicense({ licenseType: 'Apache-2.0' }),
  ],
};

export const githubProfileTemplate: Template = {
  id: 'github-profile',
  name: 'GitHub Profile',
  description: 'A standout GitHub profile README',
  icon: 'github',
  category: 'profile',
  preview: '# Hi 👋\n> About, Skills, Stats, Social Links',
  sections: [
    createHero({
      title: 'Hey there! I\'m Developer 👋',
      tagline: 'Building the future, one commit at a time',
      description: '',
    }),
    createAbout({
      title: 'About Me',
      description: '',
      highlights: [
        '🔭 Currently working on **awesome-project**',
        '🌱 Learning **Rust** and **WebAssembly**',
        '👯 Looking to collaborate on open source projects',
        '💬 Ask me about **React, TypeScript, Node.js**',
        '📫 Reach me at **dev@example.com**',
        '⚡ Fun fact: I debug with console.log and I\'m not ashamed',
      ],
    }),
    createTechStack({
      title: 'Tech Stack',
      items: [
        { id: '1', name: 'JavaScript', icon: 'javascript', category: 'Languages', url: '' },
        { id: '2', name: 'TypeScript', icon: 'typescript', category: 'Languages', url: '' },
        { id: '3', name: 'Python', icon: 'python', category: 'Languages', url: '' },
        { id: '4', name: 'React', icon: 'react', category: 'Frontend', url: '' },
        { id: '5', name: 'Next.js', icon: 'nextdotjs', category: 'Frontend', url: '' },
        { id: '6', name: 'Node.js', icon: 'nodedotjs', category: 'Backend', url: '' },
        { id: '7', name: 'PostgreSQL', icon: 'postgresql', category: 'Database', url: '' },
        { id: '8', name: 'Docker', icon: 'docker', category: 'DevOps', url: '' },
        { id: '9', name: 'AWS', icon: 'amazonaws', category: 'Cloud', url: '' },
      ],
      displayStyle: 'badges',
    }),
    createCustom({
      title: 'GitHub Stats',
      content: '<div align="center">\n\n![GitHub Stats](https://github-readme-stats.vercel.app/api?username=username&show_icons=true&theme=tokyonight)\n\n![Top Languages](https://github-readme-stats.vercel.app/api/top-langs/?username=username&layout=compact&theme=tokyonight)\n\n![GitHub Streak](https://streak-stats.demolab.com?user=username&theme=tokyonight)\n\n</div>',
    }),
    createContact({
      title: 'Connect With Me',
      name: '',
      email: '',
      links: [
        { id: '1', platform: 'GitHub', url: 'https://github.com/username', label: '@username' },
        { id: '2', platform: 'LinkedIn', url: 'https://linkedin.com/in/username', label: 'username' },
        { id: '3', platform: 'Twitter', url: 'https://twitter.com/username', label: '@username' },
        { id: '4', platform: 'Website', url: 'https://username.dev', label: 'username.dev' },
      ],
    }),
  ],
};

// ─── Export All Templates ────────────────────────────────────────────────────

export const ALL_TEMPLATES: Template[] = [
  developerTemplate,
  openSourceTemplate,
  portfolioTemplate,
  saasTemplate,
  cliTemplate,
  aiProjectTemplate,
  githubProfileTemplate,
];

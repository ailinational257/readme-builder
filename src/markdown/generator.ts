// ─── Markdown Generator ─────────────────────────────────────────────────────
// Pure functions to convert Section objects into GitHub-compatible markdown.

import type {
  Section,
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
  Badge,
} from '../types/sections';

// ─── Badge Helper ────────────────────────────────────────────────────────────

export function badgeToMarkdown(badge: Badge): string {
  const parts: string[] = [];
  parts.push(`https://img.shields.io/badge/${encodeURIComponent(badge.label)}-${encodeURIComponent(badge.message)}-${badge.color}`);

  const params: string[] = [];
  if (badge.style && badge.style !== 'flat') params.push(`style=${badge.style}`);
  if (badge.logoName) params.push(`logo=${badge.logoName}`);
  if (badge.logoColor) params.push(`logoColor=${badge.logoColor}`);
  if (badge.labelColor) params.push(`labelColor=${badge.labelColor}`);

  const url = params.length > 0 ? `${parts[0]}?${params.join('&')}` : parts[0];
  const img = `![${badge.label}](${url})`;

  return badge.link ? `[${img}](${badge.link})` : img;
}

export function badgesToMarkdown(badges: Badge[]): string {
  if (badges.length === 0) return '';
  return badges.map(badgeToMarkdown).join(' ') + '\n';
}

// ─── Section Generators ──────────────────────────────────────────────────────

function generateHeader(section: HeaderSection): string {
  const lines: string[] = [];

  if (section.bannerUrl) {
    if (section.alignment === 'center') lines.push('<div align="center">\n');
    lines.push(`![Banner](${section.bannerUrl})\n`);
  } else if (section.alignment === 'center') {
    lines.push('<div align="center">\n');
  }

  if (section.logoUrl) {
    lines.push(`<img src="${section.logoUrl}" alt="Logo" width="120" />\n`);
  }

  if (section.style === 'hero' || section.style === 'banner') {
    lines.push(`# ${section.title}\n`);
  } else if (section.style === 'animated') {
    lines.push(`# ✨ ${section.title} ✨\n`);
  } else {
    lines.push(`# ${section.title}\n`);
  }

  if (section.subtitle) {
    lines.push(`> ${section.subtitle}\n`);
  }

  if (section.badges.length > 0) {
    lines.push(badgesToMarkdown(section.badges));
  }

  if (section.buttons.length > 0) {
    const btns = section.buttons
      .map(b => `[${b.text}](${b.url})`)
      .join(' • ');
    lines.push(`\n${btns}\n`);
  }

  if (section.alignment === 'center') {
    lines.push('\n</div>\n');
  }

  return lines.join('\n');
}

function generateHero(section: HeroSection): string {
  const lines: string[] = [];

  if (section.alignment === 'center') lines.push('<div align="center">\n');

  lines.push(`# ${section.title}\n`);

  if (section.tagline) {
    lines.push(`### ${section.tagline}\n`);
  }

  if (section.description) {
    lines.push(`${section.description}\n`);
  }

  if (section.badges.length > 0) {
    lines.push(badgesToMarkdown(section.badges));
  }

  if (section.imageUrl) {
    lines.push(`\n![Hero](${section.imageUrl})\n`);
  }

  if (section.alignment === 'center') {
    lines.push('\n</div>\n');
  }

  return lines.join('\n');
}

function generateAbout(section: AboutSection): string {
  const lines: string[] = [];
  lines.push(`## ${section.title}\n`);
  lines.push(`${section.description}\n`);

  if (section.highlights.length > 0) {
    lines.push('');
    section.highlights.forEach(h => {
      lines.push(`- ${h}`);
    });
    lines.push('');
  }

  return lines.join('\n');
}

function generateFeatures(section: FeaturesSection): string {
  const lines: string[] = [];
  lines.push(`## ${section.title}\n`);

  if (section.columns > 1) {
    // Table layout for multi-column
    const features = section.features;
    const cols = section.columns;
    const headerRow = Array(cols).fill('Feature').join(' | ');
    const dividerRow = Array(cols).fill('---').join(' | ');
    lines.push(`| ${headerRow} |`);
    lines.push(`| ${dividerRow} |`);

    for (let i = 0; i < features.length; i += cols) {
      const row = [];
      for (let j = 0; j < cols; j++) {
        const f = features[i + j];
        if (f) {
          row.push(`${f.emoji} **${f.title}** - ${f.description}`);
        } else {
          row.push('');
        }
      }
      lines.push(`| ${row.join(' | ')} |`);
    }
    lines.push('');
  } else {
    section.features.forEach(f => {
      lines.push(`- ${f.emoji} **${f.title}** — ${f.description}`);
    });
    lines.push('');
  }

  return lines.join('\n');
}

function generateTechStack(section: TechStackSection): string {
  const lines: string[] = [];
  lines.push(`## ${section.title}\n`);

  switch (section.displayStyle) {
    case 'badges':
      section.items.forEach(item => {
        const badge = `![${item.name}](https://img.shields.io/badge/${encodeURIComponent(item.name)}-000?style=for-the-badge&logo=${item.icon}&logoColor=white)`;
        lines.push(badge);
      });
      lines.push('');
      break;
    case 'table': {
      const categories = [...new Set(section.items.map(i => i.category))];
      categories.forEach(cat => {
        lines.push(`### ${cat}\n`);
        lines.push('| Technology | Link |');
        lines.push('| --- | --- |');
        section.items
          .filter(i => i.category === cat)
          .forEach(item => {
            lines.push(`| ${item.name} | [${item.url}](${item.url}) |`);
          });
        lines.push('');
      });
      break;
    }
    case 'list':
      section.items.forEach(item => {
        lines.push(`- **${item.name}** — [${item.url}](${item.url})`);
      });
      lines.push('');
      break;
    case 'icons':
      section.items.forEach(item => {
        lines.push(`<img src="https://cdn.simpleicons.org/${item.icon}" alt="${item.name}" width="40" height="40" />`);
      });
      lines.push('\n');
      break;
  }

  return lines.join('\n');
}

function generateInstallation(section: InstallationSection): string {
  const lines: string[] = [];
  lines.push(`## ${section.title}\n`);

  if (section.prerequisites.length > 0) {
    lines.push('### Prerequisites\n');
    section.prerequisites.forEach(p => lines.push(`- ${p}`));
    lines.push('');
  }

  lines.push('### Steps\n');
  section.steps.forEach((step, i) => {
    lines.push(`${i + 1}. ${step.title}\n`);
    if (step.description) lines.push(`   ${step.description}\n`);
    lines.push(`   \`\`\`bash\n   ${step.command}\n   \`\`\`\n`);
  });

  return lines.join('\n');
}

function generateUsage(section: UsageSection): string {
  const lines: string[] = [];
  lines.push(`## ${section.title}\n`);

  if (section.description) {
    lines.push(`${section.description}\n`);
  }

  section.examples.forEach(example => {
    if (example.title) lines.push(`### ${example.title}\n`);
    if (example.description) lines.push(`${example.description}\n`);
    lines.push(`\`\`\`${example.language}\n${example.code}\n\`\`\`\n`);
  });

  return lines.join('\n');
}

function generateScreenshots(section: ScreenshotsSection): string {
  const lines: string[] = [];
  lines.push(`## ${section.title}\n`);

  switch (section.layout) {
    case 'single':
      section.screenshots.forEach(ss => {
        lines.push(`![${ss.alt}](${ss.url})\n`);
        if (ss.caption) lines.push(`*${ss.caption}*\n`);
      });
      break;
    case 'gallery':
      lines.push('<div align="center">\n');
      section.screenshots.forEach(ss => {
        lines.push(`<img src="${ss.url}" alt="${ss.alt}" width="45%" />`);
      });
      lines.push('\n</div>\n');
      break;
    case 'grid':
      lines.push('| Screenshot | Description |');
      lines.push('| --- | --- |');
      section.screenshots.forEach(ss => {
        lines.push(`| ![${ss.alt}](${ss.url}) | ${ss.caption} |`);
      });
      lines.push('');
      break;
  }

  return lines.join('\n');
}

function generateDemo(section: DemoSection): string {
  const lines: string[] = [];
  lines.push(`## ${section.title}\n`);

  if (section.description) {
    lines.push(`${section.description}\n`);
  }

  switch (section.demoType) {
    case 'gif':
      if (section.url) lines.push(`![Demo](${section.url})\n`);
      break;
    case 'youtube':
      if (section.url) {
        const videoId = section.url.match(/(?:v=|\/)([\w-]{11})/)?.[1] || '';
        lines.push(`[![Demo](https://img.youtube.com/vi/${videoId}/maxresdefault.jpg)](${section.url})\n`);
      }
      break;
    case 'loom':
      if (section.url) {
        lines.push(`[🎥 Watch Demo on Loom](${section.url})\n`);
      }
      break;
    case 'image':
      if (section.url) lines.push(`![Demo](${section.url})\n`);
      break;
  }

  return lines.join('\n');
}

function generateRoadmap(section: RoadmapSection): string {
  const lines: string[] = [];
  lines.push(`## ${section.title}\n`);

  section.items.forEach(item => {
    const check = item.completed ? 'x' : ' ';
    lines.push(`- [${check}] ${item.text}`);
  });
  lines.push('');

  return lines.join('\n');
}

function generateFAQ(section: FAQSection): string {
  const lines: string[] = [];
  lines.push(`## ${section.title}\n`);

  section.items.forEach(item => {
    lines.push(`<details>`);
    lines.push(`<summary><strong>${item.question}</strong></summary>\n`);
    lines.push(`${item.answer}\n`);
    lines.push(`</details>\n`);
  });

  return lines.join('\n');
}

function generateContributing(section: ContributingSection): string {
  const lines: string[] = [];
  lines.push(`## ${section.title}\n`);
  lines.push(`${section.description}\n`);

  if (section.guidelines.length > 0) {
    section.guidelines.forEach((g, i) => {
      lines.push(`${i + 1}. ${g}`);
    });
    lines.push('');
  }

  if (section.codeOfConduct) {
    lines.push('Please read our [Code of Conduct](CODE_OF_CONDUCT.md) before contributing.\n');
  }

  return lines.join('\n');
}

function generateContributors(section: ContributorsSection): string {
  const lines: string[] = [];
  lines.push(`## ${section.title}\n`);

  lines.push('<table>');
  lines.push('  <tr>');
  section.contributors.forEach(c => {
    const avatar = c.avatarUrl || `https://github.com/${c.githubUsername}.png?size=100`;
    lines.push(`    <td align="center">`);
    lines.push(`      <a href="https://github.com/${c.githubUsername}">`);
    lines.push(`        <img src="${avatar}" width="100px;" alt="${c.name}" />`);
    lines.push(`        <br />`);
    lines.push(`        <sub><b>${c.name}</b></sub>`);
    lines.push(`      </a>`);
    lines.push(`      <br />`);
    lines.push(`      <sub>${c.role}</sub>`);
    lines.push(`    </td>`);
  });
  lines.push('  </tr>');
  lines.push('</table>\n');

  return lines.join('\n');
}

function generateLicense(section: LicenseSection): string {
  const lines: string[] = [];
  lines.push(`## ${section.title}\n`);

  if (section.licenseType === 'custom') {
    lines.push(section.customText + '\n');
  } else {
    lines.push(`This project is licensed under the **${section.licenseType}** License — see the [LICENSE](LICENSE) file for details.\n`);
    lines.push(`Copyright © ${section.year} ${section.author}\n`);
  }

  return lines.join('\n');
}

function generateContact(section: ContactSection): string {
  const lines: string[] = [];
  lines.push(`## ${section.title}\n`);

  if (section.name) lines.push(`**${section.name}**\n`);
  if (section.email) lines.push(`📧 Email: [${section.email}](mailto:${section.email})\n`);

  if (section.links.length > 0) {
    section.links.forEach(link => {
      lines.push(`- ${link.platform}: [${link.label}](${link.url})`);
    });
    lines.push('');
  }

  return lines.join('\n');
}

function generateCustom(section: CustomSection): string {
  const lines: string[] = [];
  lines.push(`## ${section.title}\n`);
  lines.push(section.content + '\n');
  return lines.join('\n');
}

// ─── Main Generator ──────────────────────────────────────────────────────────

const GENERATORS: Record<string, (section: never) => string> = {
  header: generateHeader as (s: never) => string,
  hero: generateHero as (s: never) => string,
  about: generateAbout as (s: never) => string,
  features: generateFeatures as (s: never) => string,
  'tech-stack': generateTechStack as (s: never) => string,
  installation: generateInstallation as (s: never) => string,
  usage: generateUsage as (s: never) => string,
  screenshots: generateScreenshots as (s: never) => string,
  demo: generateDemo as (s: never) => string,
  roadmap: generateRoadmap as (s: never) => string,
  faq: generateFAQ as (s: never) => string,
  contributing: generateContributing as (s: never) => string,
  contributors: generateContributors as (s: never) => string,
  license: generateLicense as (s: never) => string,
  contact: generateContact as (s: never) => string,
  custom: generateCustom as (s: never) => string,
};

export function sectionToMarkdown(section: Section): string {
  if (!section.visible) return '';
  const generator = GENERATORS[section.type];
  if (!generator) return '';
  return generator(section as never);
}

export function sectionsToMarkdown(sections: Section[]): string {
  return sections
    .filter(s => s.visible)
    .map(sectionToMarkdown)
    .filter(Boolean)
    .join('\n---\n\n');
}

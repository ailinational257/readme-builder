// ─── Markdown Parser ────────────────────────────────────────────────────────
// Best-effort parser to convert raw markdown back into Section objects.
// Used when the user edits markdown directly in Monaco editor.

import type { Section } from '../types/sections';
import { generateId } from '../utils/id';

/**
 * Parse raw markdown string into an array of sections.
 * This is a best-effort heuristic parser — it splits on `## ` headings
 * and attempts to identify section types from heading text.
 */
export function markdownToSections(md: string): Section[] {
  const sections: Section[] = [];
  const blocks = splitIntoBlocks(md);

  blocks.forEach(block => {
    const section = blockToSection(block);
    if (section) {
      sections.push(section);
    }
  });

  return sections;
}

interface Block {
  heading: string;
  content: string;
  level: number;
}

function splitIntoBlocks(md: string): Block[] {
  const blocks: Block[] = [];
  const lines = md.split('\n');
  let currentBlock: Block | null = null;
  let contentLines: string[] = [];

  for (const line of lines) {
    const h1Match = line.match(/^# (.+)$/);
    const h2Match = line.match(/^## (.+)$/);

    if (h1Match || h2Match) {
      // Save previous block
      if (currentBlock) {
        currentBlock.content = contentLines.join('\n').trim();
        blocks.push(currentBlock);
      }

      currentBlock = {
        heading: (h1Match ? h1Match[1] : h2Match![1]).trim(),
        content: '',
        level: h1Match ? 1 : 2,
      };
      contentLines = [];
    } else {
      contentLines.push(line);
    }
  }

  // Save last block
  if (currentBlock) {
    currentBlock.content = contentLines.join('\n').trim();
    blocks.push(currentBlock);
  } else if (contentLines.join('\n').trim()) {
    // Content without headings — treat as custom
    blocks.push({
      heading: 'Custom Section',
      content: contentLines.join('\n').trim(),
      level: 2,
    });
  }

  return blocks;
}

function blockToSection(block: Block): Section | null {
  const heading = block.heading.replace(/[✨⚡🚀🎨]/g, '').trim();
  const lowerHeading = heading.toLowerCase();

  // H1 blocks are headers
  if (block.level === 1) {
    return {
      id: generateId(),
      type: 'header',
      visible: true,
      style: 'centered',
      title: heading,
      subtitle: extractBlockquote(block.content),
      logoUrl: '',
      bannerUrl: '',
      alignment: 'center',
      buttons: [],
      badges: [],
    };
  }

  // Match by heading name
  if (lowerHeading.includes('feature')) {
    return {
      id: generateId(),
      type: 'features',
      visible: true,
      title: heading,
      features: extractListItems(block.content).map(text => ({
        id: generateId(),
        emoji: extractEmoji(text) || '✨',
        title: extractBoldText(text) || text.substring(0, 30),
        description: removeBoldAndEmoji(text),
      })),
      columns: 1,
    };
  }

  if (lowerHeading.includes('install') || lowerHeading.includes('getting started') || lowerHeading.includes('setup')) {
    return {
      id: generateId(),
      type: 'installation',
      visible: true,
      title: heading,
      prerequisites: [],
      steps: extractCodeBlocks(block.content).map((code, i) => ({
        id: generateId(),
        title: `Step ${i + 1}`,
        command: code,
        description: '',
      })),
      packageManager: 'npm',
    };
  }

  if (lowerHeading.includes('usage') || lowerHeading.includes('example')) {
    const codeBlocks = extractCodeBlocks(block.content);
    return {
      id: generateId(),
      type: 'usage',
      visible: true,
      title: heading,
      description: extractParagraph(block.content),
      examples: codeBlocks.map((code, i) => ({
        id: generateId(),
        title: `Example ${i + 1}`,
        code,
        language: 'bash',
        description: '',
      })),
    };
  }

  if (lowerHeading.includes('roadmap')) {
    return {
      id: generateId(),
      type: 'roadmap',
      visible: true,
      title: heading,
      items: extractChecklistItems(block.content),
    };
  }

  if (lowerHeading.includes('faq')) {
    return {
      id: generateId(),
      type: 'faq',
      visible: true,
      title: heading,
      items: extractFAQItems(block.content),
    };
  }

  if (lowerHeading.includes('contribut') && !lowerHeading.includes('contributors')) {
    return {
      id: generateId(),
      type: 'contributing',
      visible: true,
      title: heading,
      description: extractParagraph(block.content),
      guidelines: extractListItems(block.content).map(item => item.replace(/^\d+\.\s*/, '')),
      codeOfConduct: block.content.toLowerCase().includes('code of conduct'),
    };
  }

  if (lowerHeading.includes('contributors')) {
    return {
      id: generateId(),
      type: 'contributors',
      visible: true,
      title: heading,
      contributors: [],
    };
  }

  if (lowerHeading.includes('license')) {
    return {
      id: generateId(),
      type: 'license',
      visible: true,
      title: heading,
      licenseType: detectLicenseType(block.content),
      customText: '',
      author: '',
      year: new Date().getFullYear().toString(),
    };
  }

  if (lowerHeading.includes('contact')) {
    return {
      id: generateId(),
      type: 'contact',
      visible: true,
      title: heading,
      name: '',
      email: extractEmail(block.content),
      links: [],
    };
  }

  if (lowerHeading.includes('about')) {
    return {
      id: generateId(),
      type: 'about',
      visible: true,
      title: heading,
      description: extractParagraph(block.content),
      highlights: extractListItems(block.content),
    };
  }

  if (lowerHeading.includes('tech') || lowerHeading.includes('stack') || lowerHeading.includes('built with')) {
    return {
      id: generateId(),
      type: 'tech-stack',
      visible: true,
      title: heading,
      items: extractListItems(block.content).map(name => ({
        id: generateId(),
        name: name.replace(/[*[\]()]/g, '').trim(),
        icon: '',
        category: 'General',
        url: '',
      })),
      displayStyle: 'badges',
    };
  }

  if (lowerHeading.includes('screenshot')) {
    return {
      id: generateId(),
      type: 'screenshots',
      visible: true,
      title: heading,
      screenshots: extractImages(block.content),
      layout: 'gallery',
    };
  }

  if (lowerHeading.includes('demo')) {
    return {
      id: generateId(),
      type: 'demo',
      visible: true,
      title: heading,
      description: extractParagraph(block.content),
      demoType: 'gif',
      url: '',
      thumbnailUrl: '',
    };
  }

  // Default: custom section
  return {
    id: generateId(),
    type: 'custom',
    visible: true,
    title: heading,
    content: block.content,
  };
}

// ─── Extraction Helpers ──────────────────────────────────────────────────────

function extractBlockquote(content: string): string {
  const match = content.match(/^>\s*(.+)$/m);
  return match ? match[1].trim() : '';
}

function extractListItems(content: string): string[] {
  const items: string[] = [];
  const regex = /^[-*]\s+(.+)$/gm;
  let match;
  while ((match = regex.exec(content)) !== null) {
    items.push(match[1].trim());
  }
  return items;
}

function extractCodeBlocks(content: string): string[] {
  const blocks: string[] = [];
  const regex = /```[\w]*\n([\s\S]*?)```/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    blocks.push(match[1].trim());
  }
  return blocks;
}

function extractParagraph(content: string): string {
  const lines = content.split('\n');
  const paragraphLines: string[] = [];
  for (const line of lines) {
    if (line.startsWith('#') || line.startsWith('```') || line.startsWith('-') || line.startsWith('*') || line.startsWith('>')) break;
    if (line.trim()) paragraphLines.push(line.trim());
  }
  return paragraphLines.join(' ');
}

function extractChecklistItems(content: string): { id: string; text: string; completed: boolean }[] {
  const items: { id: string; text: string; completed: boolean }[] = [];
  const regex = /^-\s+\[([ x])\]\s+(.+)$/gm;
  let match;
  while ((match = regex.exec(content)) !== null) {
    items.push({
      id: generateId(),
      text: match[2].trim(),
      completed: match[1] === 'x',
    });
  }
  return items;
}

function extractFAQItems(content: string): { id: string; question: string; answer: string }[] {
  const items: { id: string; question: string; answer: string }[] = [];
  const regex = /<summary><strong>(.+?)<\/strong><\/summary>\s*([\s\S]*?)(?=<\/details>)/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    items.push({
      id: generateId(),
      question: match[1].trim(),
      answer: match[2].trim(),
    });
  }
  return items;
}

function extractEmoji(text: string): string {
  const match = text.match(/^([\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}])/u);
  return match ? match[1] : '';
}

function extractBoldText(text: string): string {
  const match = text.match(/\*\*(.+?)\*\*/);
  return match ? match[1] : '';
}

function removeBoldAndEmoji(text: string): string {
  return text
    .replace(/^[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]\s*/u, '')
    .replace(/\*\*(.+?)\*\*\s*[-—]\s*/, '')
    .trim();
}

function detectLicenseType(content: string): 'MIT' | 'Apache-2.0' | 'GPL-3.0' | 'BSD-2-Clause' | 'BSD-3-Clause' | 'ISC' | 'MPL-2.0' | 'LGPL-3.0' | 'Unlicense' | 'custom' {
  const lower = content.toLowerCase();
  if (lower.includes('mit')) return 'MIT';
  if (lower.includes('apache')) return 'Apache-2.0';
  if (lower.includes('gpl')) return 'GPL-3.0';
  if (lower.includes('bsd-2')) return 'BSD-2-Clause';
  if (lower.includes('bsd-3') || lower.includes('bsd')) return 'BSD-3-Clause';
  if (lower.includes('isc')) return 'ISC';
  if (lower.includes('mpl')) return 'MPL-2.0';
  if (lower.includes('lgpl')) return 'LGPL-3.0';
  if (lower.includes('unlicense')) return 'Unlicense';
  return 'MIT';
}

function extractEmail(content: string): string {
  const match = content.match(/[\w.+-]+@[\w-]+\.[\w.]+/);
  return match ? match[0] : '';
}

function extractImages(content: string): { id: string; url: string; caption: string; alt: string }[] {
  const images: { id: string; url: string; caption: string; alt: string }[] = [];
  const regex = /!\[([^\]]*)\]\(([^)]+)\)/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    images.push({
      id: generateId(),
      url: match[2],
      caption: match[1] || '',
      alt: match[1] || 'Screenshot',
    });
  }
  return images;
}

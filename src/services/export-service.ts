// ─── Export Service ──────────────────────────────────────────────────────────
// Handles exporting README to various formats.

import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import type { Section } from '../types/sections';
import { sectionsToMarkdown } from '../markdown/generator';

export function exportAsMarkdown(sections: Section[], filename: string = 'README.md'): void {
  const markdown = sectionsToMarkdown(sections);
  const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
  saveAs(blob, filename);
}

export function exportAsJSON(sections: Section[], projectName: string): void {
  const template = {
    name: projectName,
    version: '1.0',
    exportedAt: new Date().toISOString(),
    sections,
  };
  const json = JSON.stringify(template, null, 2);
  const blob = new Blob([json], { type: 'application/json;charset=utf-8' });
  saveAs(blob, `${projectName.toLowerCase().replace(/\s+/g, '-')}-readme-template.json`);
}

export async function exportAsZip(sections: Section[], projectName: string): Promise<void> {
  const zip = new JSZip();
  const markdown = sectionsToMarkdown(sections);

  zip.file('README.md', markdown);

  const template = {
    name: projectName,
    version: '1.0',
    exportedAt: new Date().toISOString(),
    sections,
  };
  zip.file('readme-template.json', JSON.stringify(template, null, 2));

  const content = await zip.generateAsync({ type: 'blob' });
  saveAs(content, `${projectName.toLowerCase().replace(/\s+/g, '-')}-readme.zip`);
}

export function getMarkdownString(sections: Section[]): string {
  return sectionsToMarkdown(sections);
}

export function copyToClipboard(sections: Section[]): Promise<void> {
  const markdown = sectionsToMarkdown(sections);
  return navigator.clipboard.writeText(markdown);
}

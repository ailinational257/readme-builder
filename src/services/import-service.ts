// ─── Import Service ──────────────────────────────────────────────────────────
// Handles importing README from various sources.

import type { Section } from '../types/sections';
import { markdownToSections } from '../markdown/parser';

export interface ImportResult {
  success: boolean;
  sections: Section[];
  projectName: string;
  error?: string;
}

/**
 * Import from a markdown file upload.
 */
export function importFromMarkdownFile(file: File): Promise<ImportResult> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const markdown = event.target?.result as string;
        const sections = markdownToSections(markdown);
        const nameMatch = markdown.match(/^#\s+(.+)$/m);
        resolve({
          success: true,
          sections,
          projectName: nameMatch ? nameMatch[1].trim() : file.name.replace('.md', ''),
        });
      } catch {
        resolve({
          success: false,
          sections: [],
          projectName: '',
          error: 'Failed to parse markdown file',
        });
      }
    };
    reader.onerror = () => {
      resolve({
        success: false,
        sections: [],
        projectName: '',
        error: 'Failed to read file',
      });
    };
    reader.readAsText(file);
  });
}

/**
 * Import from a JSON template file.
 */
export function importFromJSONFile(file: File): Promise<ImportResult> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (json.sections && Array.isArray(json.sections)) {
          resolve({
            success: true,
            sections: json.sections as Section[],
            projectName: json.name || 'Imported Project',
          });
        } else {
          resolve({
            success: false,
            sections: [],
            projectName: '',
            error: 'Invalid template format',
          });
        }
      } catch {
        resolve({
          success: false,
          sections: [],
          projectName: '',
          error: 'Failed to parse JSON file',
        });
      }
    };
    reader.onerror = () => {
      resolve({
        success: false,
        sections: [],
        projectName: '',
        error: 'Failed to read file',
      });
    };
    reader.readAsText(file);
  });
}

/**
 * Import from a GitHub URL (service layer ready for real API integration).
 * Currently mocked to demonstrate the architecture.
 */
export async function importFromGitHub(url: string): Promise<ImportResult> {
  // Extract owner/repo from URL
  const match = url.match(/github\.com\/([^/]+)\/([^/]+)/);
  if (!match) {
    return {
      success: false,
      sections: [],
      projectName: '',
      error: 'Invalid GitHub URL. Expected format: https://github.com/owner/repo',
    };
  }

  const [, owner, repo] = match;

  try {
    // Attempt to fetch the raw README from GitHub
    const rawUrl = `https://raw.githubusercontent.com/${owner}/${repo}/main/README.md`;
    const response = await fetch(rawUrl);

    if (!response.ok) {
      // Try 'master' branch
      const masterUrl = `https://raw.githubusercontent.com/${owner}/${repo}/master/README.md`;
      const masterResponse = await fetch(masterUrl);

      if (!masterResponse.ok) {
        return {
          success: false,
          sections: [],
          projectName: repo,
          error: `Could not find README.md in ${owner}/${repo}`,
        };
      }

      const markdown = await masterResponse.text();
      const sections = markdownToSections(markdown);
      return { success: true, sections, projectName: repo };
    }

    const markdown = await response.text();
    const sections = markdownToSections(markdown);
    return { success: true, sections, projectName: repo };
  } catch {
    return {
      success: false,
      sections: [],
      projectName: repo,
      error: 'Failed to fetch README from GitHub. Check the URL and try again.',
    };
  }
}

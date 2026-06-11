// ─── Markdown Preview Panel ──────────────────────────────────────────────────
// Renders the generated markdown using react-markdown with GFM support.

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { useReadmeStore } from '../store/readme-store';

export function MarkdownPreviewPanel() {
  const getMarkdown = useReadmeStore(s => s.getMarkdown);
  const markdown = getMarkdown();

  if (!markdown.trim()) {
    return (
      <div className="flex-1 flex items-center justify-center text-[var(--color-text-tertiary)] text-sm">
        No content to preview. Add sections to get started.
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-3xl mx-auto py-8 px-8">
        <div className="markdown-preview">
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
            {markdown}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

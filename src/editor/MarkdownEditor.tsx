// ─── Markdown Editor (Monaco) ────────────────────────────────────────────────
// Wraps @monaco-editor/react with bidirectional sync to the store.

import { useRef, useCallback, useEffect, useState } from 'react';
import Editor, { type OnMount } from '@monaco-editor/react';
import type { editor } from 'monaco-editor';
import { useReadmeStore } from '../store/readme-store';
import { useUIStore } from '../store/ui-store';

export function MarkdownEditor() {
  const sections = useReadmeStore(s => s.sections);
  const getMarkdown = useReadmeStore(s => s.getMarkdown);
  const setFromMarkdown = useReadmeStore(s => s.setFromMarkdown);
  const resolvedTheme = useUIStore(s => s.resolvedTheme);

  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const isInternalUpdate = useRef(false);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [editorValue, setEditorValue] = useState(() => getMarkdown());

  // Sync from store → editor when sections change externally
  useEffect(() => {
    if (isInternalUpdate.current) {
      isInternalUpdate.current = false;
      return;
    }
    const newMd = getMarkdown();
    setEditorValue(newMd);
  }, [sections, getMarkdown]);

  const handleEditorMount: OnMount = useCallback((editor) => {
    editorRef.current = editor;
    editor.updateOptions({
      minimap: { enabled: false },
      lineNumbers: 'on',
      wordWrap: 'on',
      fontSize: 13,
      fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
      padding: { top: 16, bottom: 16 },
      scrollBeyondLastLine: false,
      renderLineHighlight: 'line',
      smoothScrolling: true,
      cursorBlinking: 'smooth',
      cursorSmoothCaretAnimation: 'on',
      bracketPairColorization: { enabled: true },
    });
  }, []);

  const handleEditorChange = useCallback((value: string | undefined) => {
    if (!value) return;
    setEditorValue(value);

    // Debounced sync to store
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      isInternalUpdate.current = true;
      setFromMarkdown(value);
    }, 500);
  }, [setFromMarkdown]);

  return (
    <div className="flex-1 h-full">
      <Editor
        height="100%"
        language="markdown"
        theme={resolvedTheme === 'dark' ? 'vs-dark' : 'vs'}
        value={editorValue}
        onChange={handleEditorChange}
        onMount={handleEditorMount}
        options={{
          minimap: { enabled: false },
          lineNumbers: 'on',
          wordWrap: 'on',
          fontSize: 13,
          padding: { top: 16, bottom: 16 },
          scrollBeyondLastLine: false,
        }}
        loading={
          <div className="flex items-center justify-center h-full text-[var(--color-text-tertiary)]">
            Loading editor...
          </div>
        }
      />
    </div>
  );
}

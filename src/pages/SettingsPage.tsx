// ─── Settings Page ─────────────────────────────────────────────────────────────

import { ArrowLeft, Save, Trash2, Moon, Sun, Monitor, Palette, LayoutTemplate } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useReadmeStore } from '../store/readme-store';
import { useUIStore } from '../store/ui-store';
import { TopNav } from '../components/layout/TopNav';

export function SettingsPage() {
  const navigate = useNavigate();
  const projectName = useReadmeStore(s => s.projectName);
  const setProjectName = useReadmeStore(s => s.setProjectName);
  const reset = useReadmeStore(s => s.reset);
  
  const theme = useUIStore(s => s.theme);
  const setTheme = useUIStore(s => s.setTheme);

  return (
    <div className="h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] flex flex-col font-sans overflow-hidden">
      <TopNav />
      
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-6 py-12">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => navigate('/builder')}
              className="p-2 rounded-lg border border-[var(--color-border)] hover:bg-[var(--color-bg-hover)] hover:border-[var(--color-border-strong)] transition-all"
              aria-label="Back to Builder"
            >
              <ArrowLeft size={18} className="text-[var(--color-text-secondary)]" />
            </button>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Project Settings</h1>
              <p className="text-sm text-[var(--color-text-tertiary)] mt-1">Manage your README workspace and preferences.</p>
            </div>
          </div>

          <div className="space-y-8 animate-fade-in">
            {/* General */}
            <section className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-xl overflow-hidden">
              <div className="px-6 py-4 border-b border-[var(--color-border)] flex items-center gap-2">
                <LayoutTemplate size={16} className="text-[var(--color-text-tertiary)]" />
                <h2 className="text-sm font-semibold">General</h2>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <label className="text-sm font-medium text-[var(--color-text-secondary)] mb-2 block">Project Name</label>
                  <input
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    className="w-full max-w-md px-3 py-2 bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-lg text-sm outline-none focus:border-[var(--color-accent-primary)] focus:ring-1 focus:ring-[var(--color-accent-primary-muted)] transition-all"
                  />
                  <p className="text-xs text-[var(--color-text-tertiary)] mt-2">
                    This is used for the default export filename and local storage.
                  </p>
                </div>
              </div>
            </section>

            {/* Appearance */}
            <section className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-xl overflow-hidden">
              <div className="px-6 py-4 border-b border-[var(--color-border)] flex items-center gap-2">
                <Palette size={16} className="text-[var(--color-text-tertiary)]" />
                <h2 className="text-sm font-semibold">Appearance</h2>
              </div>
              <div className="p-6">
                <label className="text-sm font-medium text-[var(--color-text-secondary)] mb-3 block">Theme</label>
                <div className="grid grid-cols-3 gap-3 max-w-md">
                  {(['dark', 'light', 'system'] as const).map(t => (
                    <button
                      key={t}
                      onClick={() => setTheme(t)}
                      className={`flex flex-col items-center justify-center gap-2 p-4 border rounded-xl transition-all ${
                        theme === t
                          ? 'border-[var(--color-accent-primary)] bg-[var(--color-accent-primary-muted)] text-[var(--color-accent-primary)]'
                          : 'border-[var(--color-border)] bg-[var(--color-bg-surface)] hover:bg-[var(--color-bg-hover)] text-[var(--color-text-secondary)]'
                      }`}
                    >
                      {t === 'dark' ? <Moon size={20} /> : t === 'light' ? <Sun size={20} /> : <Monitor size={20} />}
                      <span className="text-xs font-medium capitalize">{t}</span>
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* Data Management */}
            <section className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-xl overflow-hidden">
              <div className="px-6 py-4 border-b border-[var(--color-border)] flex items-center gap-2">
                <Save size={16} className="text-[var(--color-text-tertiary)]" />
                <h2 className="text-sm font-semibold">Data Management</h2>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-[var(--color-text-primary)]">Reset Workspace</h3>
                    <p className="text-xs text-[var(--color-text-tertiary)] mt-1 max-w-md">
                      Clear all sections and start from scratch. This action cannot be undone.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      if (confirm('Are you sure you want to reset your project? This will delete all current sections.')) {
                        reset();
                        navigate('/builder');
                      }
                    }}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[var(--color-accent-error)] bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-lg hover:bg-[#F85149]/10 hover:border-[var(--color-accent-error)]/30 transition-colors"
                  >
                    <Trash2 size={16} />
                    Reset Workspace
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

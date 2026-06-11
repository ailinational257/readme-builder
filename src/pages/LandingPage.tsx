// ─── Landing Page ────────────────────────────────────────────────────────────
// Marketing landing page for README Forge.

import { useNavigate } from 'react-router-dom';
import {
  FileText,
  Eye,
  Code,
  LayoutTemplate,
  Shield,
  GripVertical,
  Download,
  ArrowRight,
  Sparkles,
  GitFork,
  ChevronDown,
  Zap,
  Palette,
  Terminal,
  Brain,
  User,
  Rocket,
} from 'lucide-react';

const FEATURES = [
  { icon: Palette, title: 'Visual Builder', description: 'Drag, drop, and customize sections with an intuitive visual editor. No markdown knowledge required.' },
  { icon: Eye, title: 'Live Preview', description: 'See exactly how your README will look on GitHub in real-time as you make changes.' },
  { icon: Code, title: 'Markdown Editor', description: 'Switch to raw markdown editing with full syntax support and instant synchronization.' },
  { icon: LayoutTemplate, title: 'Templates', description: 'Start from professionally designed templates for developer tools, SaaS products, and portfolios.' },
  { icon: Shield, title: 'Badge Builder', description: 'Add shields.io badges with a visual picker. Choose from dozens of pre-built badge presets.' },
  { icon: GripVertical, title: 'Drag & Drop', description: 'Reorder sections effortlessly with drag and drop. Visual insertion indicators guide placement.' },
  { icon: Download, title: 'Export System', description: 'Export as Markdown, JSON template, or ZIP archive. Copy to clipboard with one click.' },
];

const TEMPLATES = [
  { id: 'developer', name: 'Developer Project', description: 'Libraries, frameworks, and developer tools', icon: Terminal, sections: 5, color: '#238636' },
  { id: 'open-source', name: 'Open Source', description: 'Community-driven projects with contribution guides', icon: GitFork, sections: 7, color: '#1F6FEB' },
  { id: 'portfolio', name: 'Portfolio / Profile', description: 'Personal profile READMEs and project showcases', icon: User, sections: 5, color: '#8B5CF6' },
  { id: 'saas', name: 'SaaS Product', description: 'Product documentation with features and FAQ', icon: Rocket, sections: 6, color: '#D29922' },
  { id: 'cli', name: 'CLI Tool', description: 'Command-line tool documentation', icon: Terminal, sections: 5, color: '#F85149' },
  { id: 'ai-project', name: 'AI / ML Project', description: 'Machine learning and AI project documentation', icon: Brain, sections: 6, color: '#238636' },
];

const EXAMPLES = [
  { title: 'Developer', description: 'A comprehensive library README with badges, features, installation, and usage examples.', gradient: 'from-[#238636] to-[#1a6b2b]' },
  { title: 'Open Source', description: 'Community project with roadmap, contributing guidelines, and contributor credits.', gradient: 'from-[#1F6FEB] to-[#1558c0]' },
  { title: 'Portfolio', description: 'Personal GitHub profile README with tech stack, projects, and social links.', gradient: 'from-[#8B5CF6] to-[#6d3fd4]' },
  { title: 'SaaS', description: 'Product landing with feature grid, demo video, FAQ, and getting started guide.', gradient: 'from-[#D29922] to-[#a87a1b]' },
];

const FAQS = [
  { q: 'Is README Forge free to use?', a: 'Yes! README Forge is completely free and open source. You can use it to create unlimited README files.' },
  { q: 'Do I need to know Markdown?', a: 'Not at all. The visual builder lets you create professional READMEs without writing any markdown. However, you can switch to the markdown editor at any time for fine-tuning.' },
  { q: 'Can I import an existing README?', a: 'Yes. You can import from a markdown file, JSON template, or directly from a GitHub repository URL.' },
  { q: 'Where is my data stored?', a: 'Everything is stored locally in your browser. No data is sent to any server. Your projects persist between sessions via localStorage.' },
  { q: 'What export formats are available?', a: 'You can export as README.md, JSON template (for reuse), ZIP archive (with both), or copy the raw markdown to your clipboard.' },
];

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] overflow-y-auto overflow-x-hidden">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg-primary)]/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--color-accent-primary)] to-[#1a6b2b] flex items-center justify-center shadow-sm">
              <Sparkles size={16} className="text-white" />
            </div>
            <span className="text-sm font-bold text-[var(--color-text-primary)] tracking-tight">README Forge</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-[var(--color-text-secondary)]">
            <a href="#features" className="hover:text-[var(--color-text-primary)] transition-colors">Features</a>
            <a href="#templates" className="hover:text-[var(--color-text-primary)] transition-colors">Templates</a>
            <a href="#examples" className="hover:text-[var(--color-text-primary)] transition-colors">Examples</a>
            <a href="#faq" className="hover:text-[var(--color-text-primary)] transition-colors">FAQ</a>
          </div>
          <button
            onClick={() => navigate('/builder')}
            className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium bg-[var(--color-accent-primary)] text-white rounded-lg hover:bg-[var(--color-accent-primary-hover)] transition-all shadow-sm"
          >
            Start Building
            <ArrowRight size={14} />
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="landing-gradient pt-28 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--color-accent-primary-muted)] border border-[var(--color-accent-primary)]/20 text-xs font-medium text-[var(--color-accent-primary)] mb-6 animate-fade-in">
            <Zap size={12} />
            Open Source & Free Forever
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-[var(--color-text-primary)] tracking-tight leading-[1.1] mb-5 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Build Beautiful GitHub<br />
            <span className="bg-gradient-to-r from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)] bg-clip-text text-transparent">READMEs Visually</span>
          </h1>
          <p className="text-lg md:text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto mb-8 animate-fade-in-up leading-relaxed" style={{ animationDelay: '0.2s' }}>
            Create, customize, preview, and export professional GitHub README files without writing markdown manually.
          </p>
          <div className="flex items-center justify-center gap-3 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <button
              onClick={() => navigate('/builder')}
              className="flex items-center gap-2 px-6 py-3 text-sm font-semibold bg-[var(--color-accent-primary)] text-white rounded-xl hover:bg-[var(--color-accent-primary-hover)] transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              <Sparkles size={16} />
              Start Building
            </button>
            <a
              href="#templates"
              className="flex items-center gap-2 px-6 py-3 text-sm font-semibold text-[var(--color-text-primary)] bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-xl hover:bg-[var(--color-bg-hover)] hover:border-[var(--color-border-strong)] transition-all hover:-translate-y-0.5"
            >
              <LayoutTemplate size={16} />
              View Templates
            </a>
          </div>

          {/* Hero mockup */}
          <div className="mt-14 relative animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] shadow-xl overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[var(--color-border)] bg-[var(--color-bg-tertiary)]">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#F85149]/60" />
                  <div className="w-3 h-3 rounded-full bg-[#D29922]/60" />
                  <div className="w-3 h-3 rounded-full bg-[#238636]/60" />
                </div>
                <span className="text-xs text-[var(--color-text-tertiary)] ml-2 font-mono">README.md — README Forge</span>
              </div>
              <div className="p-6 md:p-8 text-left">
                <div className="flex items-start gap-4 md:gap-8">
                  {/* Sidebar mock */}
                  <div className="hidden md:block w-48 shrink-0 space-y-2">
                    <div className="text-[10px] uppercase tracking-wider text-[var(--color-text-tertiary)] font-medium mb-2">Sections</div>
                    {['Header', 'Features', 'Installation', 'Usage', 'License'].map((s, i) => (
                      <div key={s} className="flex items-center gap-2 px-2.5 py-1.5 rounded-md bg-[var(--color-bg-surface)] border border-[var(--color-border)] text-xs text-[var(--color-text-secondary)]" style={{ animationDelay: `${0.5 + i * 0.05}s` }}>
                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-primary)]" />
                        {s}
                      </div>
                    ))}
                  </div>
                  {/* Preview mock */}
                  <div className="flex-1 min-w-0">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)] mb-3" />
                    <div className="h-6 w-3/4 rounded bg-[var(--color-bg-surface)] mb-2" />
                    <div className="h-3 w-full rounded bg-[var(--color-bg-surface)] mb-1.5" />
                    <div className="h-3 w-5/6 rounded bg-[var(--color-bg-surface)] mb-4" />
                    <div className="flex gap-2 mb-4">
                      <div className="h-5 w-24 rounded-full bg-[var(--color-accent-primary)]/20" />
                      <div className="h-5 w-20 rounded-full bg-[var(--color-accent-secondary)]/20" />
                      <div className="h-5 w-16 rounded-full bg-[var(--color-accent-warning)]/20" />
                    </div>
                    <div className="h-px bg-[var(--color-border)] my-4" />
                    <div className="h-4 w-1/3 rounded bg-[var(--color-bg-surface)] mb-3" />
                    <div className="grid grid-cols-2 gap-2">
                      {[1, 2, 3, 4].map(i => (
                        <div key={i} className="p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-primary)]">
                          <div className="h-3 w-3/4 rounded bg-[var(--color-bg-surface)] mb-1.5" />
                          <div className="h-2 w-full rounded bg-[var(--color-bg-surface)]" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Glow effect behind */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[var(--color-accent-primary)]/10 via-transparent to-[var(--color-accent-secondary)]/10 blur-3xl scale-110" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-3">Everything you need to craft the perfect README</h2>
            <p className="text-[var(--color-text-secondary)] max-w-xl mx-auto">A complete toolkit for building professional GitHub documentation, from visual editing to one-click export.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="feature-card group" style={{ animationDelay: `${i * 0.05}s` }}>
                  <div className="w-10 h-10 rounded-xl bg-[var(--color-accent-primary-muted)] flex items-center justify-center mb-3 group-hover:bg-[var(--color-accent-primary)]/20 transition-colors">
                    <Icon size={20} className="text-[var(--color-accent-primary)]" />
                  </div>
                  <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-1.5">{feature.title}</h3>
                  <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Templates */}
      <section id="templates" className="py-20 px-6 bg-[var(--color-bg-secondary)]/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-3">Start with a Template</h2>
            <p className="text-[var(--color-text-secondary)] max-w-xl mx-auto">Choose from professionally designed templates and customize to match your project.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {TEMPLATES.map((template) => {
              const Icon = template.icon;
              return (
                <div
                  key={template.id}
                  className="template-card group"
                  onClick={() => navigate('/builder')}
                >
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${template.color}20` }}>
                        <Icon size={20} style={{ color: template.color }} />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">{template.name}</h3>
                        <p className="text-[10px] text-[var(--color-text-tertiary)]">{template.sections} sections</p>
                      </div>
                    </div>
                    <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">{template.description}</p>
                  </div>
                  <div className="px-5 py-3 border-t border-[var(--color-border)] bg-[var(--color-bg-primary)]/30 flex items-center justify-between">
                    <span className="text-[10px] text-[var(--color-text-tertiary)]">Click to use template</span>
                    <ArrowRight size={12} className="text-[var(--color-text-tertiary)] group-hover:text-[var(--color-accent-primary)] transition-colors" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Examples */}
      <section id="examples" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-3">See What You Can Build</h2>
            <p className="text-[var(--color-text-secondary)] max-w-xl mx-auto">Real-world examples of README files created with README Forge.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {EXAMPLES.map((example) => (
              <div
                key={example.title}
                className="group relative overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] hover:border-[var(--color-border-strong)] transition-all cursor-pointer hover:-translate-y-1 hover:shadow-lg"
                onClick={() => navigate('/builder')}
              >
                <div className={`h-32 bg-gradient-to-br ${example.gradient} flex items-center justify-center`}>
                  <FileText size={32} className="text-white/40" />
                </div>
                <div className="p-5">
                  <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-1.5">{example.title}</h3>
                  <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">{example.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 px-6 bg-[var(--color-bg-secondary)]/50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-3">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <details key={i} className="group border border-[var(--color-border)] rounded-xl bg-[var(--color-bg-secondary)] overflow-hidden">
                <summary className="flex items-center justify-between px-5 py-4 cursor-pointer text-sm font-medium text-[var(--color-text-primary)] hover:bg-[var(--color-bg-hover)] transition-colors">
                  {faq.q}
                  <ChevronDown size={16} className="text-[var(--color-text-tertiary)] group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-5 pb-4 text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="p-10 rounded-2xl border border-[var(--color-border)] bg-gradient-to-b from-[var(--color-bg-secondary)] to-[var(--color-bg-primary)] relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-accent-primary)]/5 to-[var(--color-accent-secondary)]/5" />
            <div className="relative">
              <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-3">Ready to Build Your README?</h2>
              <p className="text-[var(--color-text-secondary)] mb-6">Start creating beautiful, professional GitHub documentation in minutes.</p>
              <button
                onClick={() => navigate('/builder')}
                className="inline-flex items-center gap-2 px-8 py-3 text-sm font-semibold bg-[var(--color-accent-primary)] text-white rounded-xl hover:bg-[var(--color-accent-primary-hover)] transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                <Sparkles size={16} />
                Start Building — It's Free
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--color-border)] py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[var(--color-accent-primary)] to-[#1a6b2b] flex items-center justify-center">
              <Sparkles size={12} className="text-white" />
            </div>
            <span className="text-xs font-semibold text-[var(--color-text-primary)]">README Forge</span>
            <span className="text-xs text-[var(--color-text-tertiary)]">· Open Source</span>
          </div>
          <div className="flex items-center gap-6 text-xs text-[var(--color-text-tertiary)]">
            <a href="https://github.com/snowieedev/readme-builder" target="_blank" rel="noopener" className="hover:text-[var(--color-text-secondary)] transition-colors flex items-center gap-1">
              <GitFork size={12} />
              GitHub
            </a>
            <a href="#" className="hover:text-[var(--color-text-secondary)] transition-colors">Documentation</a>
            <a href="#" className="hover:text-[var(--color-text-secondary)] transition-colors">Changelog</a>
            <a href="#" className="hover:text-[var(--color-text-secondary)] transition-colors">MIT License</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

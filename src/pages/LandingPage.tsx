// ─── Landing Page ────────────────────────────────────────────────────────────
// Premium minimal landing page for README Forge.
// Design language: Clean, modern, minimal, readable

import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import {
  FileText,
  Eye,
  GripVertical,
  Download,
  ArrowRight,
  ArrowUpRight,
  GitFork,
  Terminal,
  User,
  Rocket,
  Brain,
  Monitor,
  Blocks,
  Copy,
  Moon,
  Zap,
  Globe,
  Star,
  Heart,
  Check,
} from 'lucide-react';
import logoImg from '../assets/logo.png';

/* ─── Data ─────────────────────────────────────────────────────────────────── */

const STATS = [
  { label: 'Templates', value: '120+', mono: '0x78' },
  { label: 'Developers', value: '10K+', mono: '0x2710' },
  { label: 'READMEs Generated', value: '250K+', mono: '0x3D090' },
  { label: 'Open Source', value: '100%', mono: '0xFF' },
];

const TEMPLATES = [
  { id: 'developer', name: 'Developer Portfolio', tags: ['profile', 'minimal'], icon: User, popular: true },
  { id: 'open-source', name: 'Open Source Project', tags: ['docs', 'community'], icon: GitFork, popular: true },
  { id: 'startup', name: 'Startup Landing', tags: ['product', 'saas'], icon: Rocket, popular: false },
  { id: 'ai-project', name: 'AI / ML Project', tags: ['research', 'data'], icon: Brain, popular: false },
  { id: 'student', name: 'Student Profile', tags: ['education', 'simple'], icon: FileText, popular: false },
  { id: 'frontend', name: 'Frontend Developer', tags: ['ui/ux', 'react'], icon: Monitor, popular: true },
  { id: 'backend', name: 'Backend Developer', tags: ['api', 'system'], icon: Terminal, popular: false },
  { id: 'fullstack', name: 'Full Stack Showcase', tags: ['comprehensive'], icon: Blocks, popular: false },
];

const FEATURES = [
  { icon: Eye, title: 'Live Preview', description: 'See changes instantly while editing. What you see is what you get.', size: 'wide' },
  { icon: GripVertical, title: 'Drag & Drop Builder', description: 'Build without touching markdown. Visual section reordering.', size: 'normal' },
  { icon: User, title: 'GitHub Profile Templates', description: 'Ready-made profile layouts.', size: 'normal' },
  { icon: GitFork, title: 'Project README Templates', description: 'Generate project documentation quickly with structured templates.', size: 'tall' },
  { icon: Download, title: 'Markdown Export', description: 'Export clean, standards-compliant markdown instantly.', size: 'normal' },
  { icon: Copy, title: 'One Click Copy', description: 'Copy generated markdown to clipboard.', size: 'normal' },
  { icon: Monitor, title: 'Responsive Design', description: 'Looks great on every screen size and device.', size: 'wide' },
  { icon: Blocks, title: 'Custom Sections', description: 'Add badges, skills, projects, social links and more.', size: 'normal' },
  { icon: Globe, title: 'Open Source', description: 'Transparent and community driven. MIT licensed.', size: 'normal' },
  { icon: Moon, title: 'Dark Mode', description: 'Built-in dark theme support.', size: 'normal' },
  { icon: Zap, title: 'Fast Performance', description: 'Lightweight and optimized. No bloat.', size: 'normal' },
  { icon: Terminal, title: 'No Login Required', description: 'Start building immediately. Zero friction.', size: 'normal' },
];

const COMMUNITY_FREE = [
  'All templates',
  'Unlimited README generation',
  'Markdown export',
  'Dark mode',
  'Open source',
  'Community support',
];

const PRO_FEATURES = [
  'Cloud sync',
  'Template marketplace',
  'Team collaboration',
  'AI assistance',
  'Advanced exports',
];

/* ─── Intersection Observer Hook ───────────────────────────────────────────── */

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('revealed');
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useReveal();
  return (
    <div
      ref={ref}
      className={`reveal-element ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ─── ASCII Decorations ────────────────────────────────────────────────────── */

function AsciiLabel({ children }: { children: string }) {
  return (
    <span className="inline-block font-mono text-[11px] tracking-[0.2em] uppercase text-black/40 select-none">
      ┌ {children} ┐
    </span>
  );
}

function AsciiDivider() {
  return (
    <div className="font-mono text-[10px] text-white/20 select-none overflow-hidden whitespace-nowrap my-1">
      ─────────────────────────────────────────────────────────────────────────────────────────
    </div>
  );
}

function SectionLabel({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="font-mono text-[12px] font-medium tracking-[0.25em] uppercase text-black">
        {children}
      </span>
      <span className="flex-1 h-px bg-black/10" />
    </div>
  );
}

/* ─── Component ────────────────────────────────────────────────────────────── */

export function LandingPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'editor' | 'preview' | 'export'>('editor');

  return (
    <div className="h-screen overflow-y-auto overflow-x-hidden font-['Inter',sans-serif] antialiased bg-white selection:bg-black selection:text-white">

      {/* ── Styles ─────────────────────────────────────────────────────────── */}
      <style>{`
        .reveal-element {
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .reveal-element.revealed {
          opacity: 1;
          transform: translateY(0);
        }
        .paper-bg {
          background-color: #F5F3EF;
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.015'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }
        .warm-bg {
          background-color: #EAE6DF;
        }
        .grid-bg {
          background-image:
            linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        .bento-feature {
          border: 1px solid #E5E5E5;
          transition: all 0.25s ease;
        }
        .bento-feature:hover {
          border-color: #000;
          background-color: #FAFAFA;
          transform: translateY(-4px);
          box-shadow: 4px 4px 0px 0px rgba(0,0,0,0.9);
        }
        .landing-card {
          border: 1px solid #E5E5E5;
          transition: all 0.25s ease;
        }
        .landing-card:hover {
          border-color: #000;
          transform: translateY(-4px);
          box-shadow: 4px 4px 0px 0px rgba(0,0,0,0.9);
        }
        .community-arrow {
          transition: transform 0.25s ease;
          display: inline-flex;
        }
        .community-link:hover .community-arrow {
          transform: translateX(4px);
        }
        .dotted-underline {
          text-decoration: none;
          background-image: url("data:image/svg+xml,%3Csvg width='6' height='3' viewBox='0 0 6 3' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1' cy='1.5' r='1' fill='%23888'/%3E%3C/svg%3E");
          background-repeat: repeat-x;
          background-position: bottom;
          background-size: 6px 3px;
          padding-bottom: 3px;
        }
        .tab-active {
          background: #000;
          color: #fff;
        }
        .tab-inactive {
          background: #F5F5F5;
          color: #000;
          border: 1px solid #E5E5E5;
        }
        .tab-inactive:hover {
          background: #EAEAEA;
        }
      `}</style>

      {/* ── Navigation ─────────────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-black/10">
        <div className="max-w-[1400px] mx-auto px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            {/* Logo */}
            <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate('/')}>
              <img src={logoImg} alt="README Forge" className="h-8 w-auto object-contain" style={{ imageRendering: 'auto' }} />
              <span className="text-[15px] font-bold tracking-tight text-black">
                README Forge
              </span>
            </div>
            {/* Nav Links beside logo */}
            <div className="hidden sm:flex items-center gap-6 text-[14px] font-medium text-black/60">
              <a href="#features" className="hover:text-black transition-colors">Features</a>
              <a href="#templates" className="hover:text-black transition-colors">Templates</a>
              <a href="https://github.com/snowieedev/readme-builder" target="_blank" rel="noreferrer" className="hover:text-black transition-colors">GitHub</a>
              <a href="#support" className="hover:text-black transition-colors">Support</a>
            </div>
          </div>
          
          <button
            onClick={() => navigate('/builder')}
            className="flex items-center gap-1.5 px-5 py-2 text-[14px] font-medium bg-black text-white hover:bg-black/80 transition-colors"
          >
            Start Building
            <ArrowRight size={14} />
          </button>
        </div>
      </nav>

      {/* ── Hero Section ───────────────────────────────────────────────────── */}
      <section className="pt-16 bg-white border-b border-black/10">
        <div className="max-w-[1400px] mx-auto px-8 pt-20 pb-16">
          <Reveal>
            <AsciiLabel>README FORGE — v1.0</AsciiLabel>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="mt-6 text-[42px] md:text-[52px] lg:text-[60px] font-bold tracking-[-0.03em] leading-[1.1] text-black">
              Build Beautiful GitHub README.
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-8 max-w-2xl">
              <p className="text-[17px] leading-[1.8] text-black font-['IBM_Plex_Sans',sans-serif]">
                Create professional GitHub READMEs and developer showcases in minutes. No coding required. No markdown headaches. Just build, customize, and export.
              </p>
            </div>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <button
                onClick={() => navigate('/builder')}
                className="flex items-center gap-2 px-6 py-3 text-[15px] font-medium bg-black text-white hover:bg-black/80 transition-colors"
              >
                Start Building
                <ArrowRight size={16} />
              </button>
              <a
                href="#templates"
                className="flex items-center gap-2 px-6 py-3 text-[15px] font-medium text-black border border-black/20 hover:bg-black/5 hover:border-black/40 transition-colors"
              >
                Browse Templates
              </a>
            </div>
          </Reveal>

          {/* Technical Metadata Strip */}
          <Reveal delay={400}>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-5">
              {['OPEN SOURCE', 'FREE FOREVER', 'NO LOGIN REQUIRED', 'MARKDOWN EXPORT'].map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[11px] font-normal tracking-[0.15em] text-black px-4 py-2 border border-black/10 bg-black/[0.02]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Stats — Bento Grid ─────────────────────────────────────────────── */}
      <section className="paper-bg border-b border-black/10">
        <div className="max-w-[1400px] mx-auto px-8 py-16">
          <Reveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-black/10 border border-black/10 overflow-hidden">
              {STATS.map((stat, i) => (
                <div key={i} className="bg-white p-8 md:p-10 text-center">
                  <div className="font-mono text-[11px] text-black/30 mb-2">{stat.mono}</div>
                  <div className="text-3xl md:text-4xl font-bold tracking-[-0.04em] text-black mb-1">{stat.value}</div>
                  <div className="font-mono text-[11px] font-medium tracking-[0.2em] uppercase text-black/50">{stat.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Templates Showcase ─────────────────────────────────────────────── */}
      <section id="templates" className="bg-white border-b border-black/10">
        <div className="max-w-[1400px] mx-auto px-8 py-24">
          <Reveal>
            <SectionLabel>TEMPLATES</SectionLabel>
          </Reveal>

          <Reveal delay={100}>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14">
              <div>
                <h2 className="text-[34px] md:text-[40px] font-bold tracking-[-0.03em] text-black leading-[1.15]">
                  Professional Templates.<br />
                  Ready to Use.
                </h2>
              </div>
              <p className="text-[15px] text-black max-w-sm font-['IBM_Plex_Sans',sans-serif] leading-relaxed">
                Start with expertly designed templates and customize every detail to match your personal brand.
              </p>
            </div>
          </Reveal>

          {/* Bento Template Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-black/10 border border-black/10 overflow-hidden mb-10">
            {TEMPLATES.map((template, i) => {
              const Icon = template.icon;
              return (
                <Reveal key={template.id} delay={i * 50}>
                  <div
                    className="bg-white p-8 hover:bg-black/[0.02] transition-all cursor-pointer group h-full"
                    onClick={() => navigate('/builder')}
                    style={{ transition: 'all 0.25s ease' }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '4px 4px 0px 0px rgba(0,0,0,0.9)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                  >
                    <div className="flex justify-between items-start mb-8">
                      <div className="w-10 h-10 border border-black/10 flex items-center justify-center group-hover:border-black transition-colors">
                        <Icon size={18} className="text-black/50 group-hover:text-black transition-colors" />
                      </div>
                      <div className="flex gap-1.5">
                        {template.popular && (
                          <span className="font-mono text-[10px] font-medium px-2.5 py-1 bg-black text-white">
                            POPULAR
                          </span>
                        )}
                      </div>
                    </div>
                    <h3 className="text-[15px] font-bold text-black mb-3 group-hover:underline underline-offset-4">{template.name}</h3>
                    <div className="flex gap-1.5 flex-wrap">
                      {template.tags.map(tag => (
                        <span key={tag} className="font-mono text-[11px] text-black/40 border border-black/10 px-2 py-0.5">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={200}>
            <button
              onClick={() => navigate('/builder')}
              className="flex items-center gap-2 font-mono text-[13px] font-medium text-black/50 hover:text-black transition-colors tracking-wide"
            >
              BROWSE ALL TEMPLATES <ArrowUpRight size={14} />
            </button>
          </Reveal>
        </div>
      </section>

      {/* ── Features — Bento Grid ──────────────────────────────────────────── */}
      <section id="features" className="paper-bg border-b border-black/10">
        <div className="max-w-[1400px] mx-auto px-8 py-24">
          <Reveal>
            <SectionLabel>FEATURES</SectionLabel>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="text-[34px] md:text-[40px] font-bold tracking-[-0.03em] text-black leading-[1.15] mb-4">
              Everything You Need.<br />
              Nothing You Don't.
            </h2>
            <p className="text-[15px] text-black max-w-md font-['IBM_Plex_Sans',sans-serif] leading-relaxed mb-14">
              A precise, powerful toolkit for creating stunning GitHub documentation without friction.
            </p>
          </Reveal>

          {/* Bento Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {FEATURES.map((feature, i) => {
              const Icon = feature.icon;
              const isWide = feature.size === 'wide';
              const isTall = feature.size === 'tall';
              const isLivePreview = isWide && i === 0;
              const isProjectReadme = isTall;

              return (
                <Reveal
                  key={i}
                  delay={i * 40}
                  className={`${isWide ? 'md:col-span-2' : ''} ${isTall ? 'md:row-span-2' : ''}`}
                >
                  <div className={`bento-feature bg-white p-7 h-full flex flex-col ${isLivePreview ? 'min-h-[420px]' : ''} ${isProjectReadme ? 'min-h-[360px]' : ''}`}>
                    <div className="flex items-start justify-between mb-5">
                      <div className="w-9 h-9 border border-black/10 flex items-center justify-center">
                        <Icon size={16} className="text-black" />
                      </div>
                      <span className="font-mono text-[10px] text-black/30 mt-1">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <h3 className="text-[15px] font-bold text-black mb-2">{feature.title}</h3>
                    <p className="text-[13px] text-black/60 leading-relaxed font-['IBM_Plex_Sans',sans-serif]">{feature.description}</p>

                    {/* Live Preview Card — Working Tabs */}
                    {isLivePreview && (
                      <div className="mt-6 flex-1 flex flex-col">
                        <div className="flex gap-1 mb-0">
                          {(['editor', 'preview', 'export'] as const).map((tab) => (
                            <button
                              key={tab}
                              onClick={() => setActiveTab(tab)}
                              className={`font-mono text-[10px] px-4 py-2 font-medium uppercase tracking-wider transition-colors ${
                                activeTab === tab ? 'tab-active' : 'tab-inactive'
                              }`}
                            >
                              {tab}
                            </button>
                          ))}
                        </div>
                        <div className="flex-1 bg-black/[0.03] border border-black/10 overflow-hidden">
                          {activeTab === 'editor' && (
                            <div className="p-0 h-full font-mono text-[11px] text-black/70 leading-[1.8] bg-[#1e1e1e] text-[#d4d4d4]" style={{ minHeight: '220px' }}>
                              <div className="flex items-center gap-2 px-4 py-2 bg-[#252526] border-b border-[#3c3c3c]">
                                <span className="w-2 h-2 rounded-full bg-[#f44747]"></span>
                                <span className="w-2 h-2 rounded-full bg-[#e2b93d]"></span>
                                <span className="w-2 h-2 rounded-full bg-[#89d185]"></span>
                                <span className="ml-2 text-[10px] text-[#888]">README.md</span>
                              </div>
                              <div className="p-4">
                                <div><span className="text-[#569cd6]">#</span> <span className="text-[#ce9178]">My Project</span></div>
                                <div className="mt-1"><span className="text-[#6a9955]">{'>'} A modern toolkit for developers</span></div>
                                <div className="mt-2"><span className="text-[#569cd6]">##</span> <span className="text-[#ce9178]">Installation</span></div>
                                <div className="mt-1"><span className="text-[#d4d4d4]">```bash</span></div>
                                <div><span className="text-[#dcdcaa]">npm install</span> <span className="text-[#ce9178]">my-project</span></div>
                                <div><span className="text-[#d4d4d4]">```</span></div>
                                <div className="mt-2"><span className="text-[#569cd6]">##</span> <span className="text-[#ce9178]">Features</span></div>
                                <div><span className="text-[#d4d4d4]">- ⚡ Fast</span></div>
                                <div><span className="text-[#d4d4d4]">- 🔒 Secure</span></div>
                                <div><span className="text-[#d4d4d4]">- 🎨 Beautiful</span></div>
                              </div>
                            </div>
                          )}
                          {activeTab === 'preview' && (
                            <div className="p-0 h-full bg-white" style={{ minHeight: '220px' }}>
                              <div className="px-6 py-4 border-b border-black/5 flex items-center gap-2">
                                <FileText size={14} className="text-black/40" />
                                <span className="text-[12px] font-medium text-black/60">README.md</span>
                              </div>
                              <div className="p-6 text-[13px] leading-[1.8] text-black/80 font-['IBM_Plex_Sans',sans-serif]">
                                <h3 className="text-[20px] font-bold text-black mb-1 pb-2 border-b border-black/10">My Project</h3>
                                <p className="text-black/50 italic mb-3">A modern toolkit for developers</p>
                                <h4 className="text-[16px] font-bold text-black mt-4 mb-2 pb-1 border-b border-black/10">Installation</h4>
                                <div className="bg-black/[0.04] border border-black/10 p-3 font-mono text-[12px] mb-3">
                                  npm install my-project
                                </div>
                                <h4 className="text-[16px] font-bold text-black mt-4 mb-2 pb-1 border-b border-black/10">Features</h4>
                                <ul className="list-disc ml-5 space-y-1">
                                  <li>⚡ Fast</li>
                                  <li>🔒 Secure</li>
                                  <li>🎨 Beautiful</li>
                                </ul>
                              </div>
                            </div>
                          )}
                          {activeTab === 'export' && (
                            <div className="p-0 h-full bg-[#FAFAF8]" style={{ minHeight: '220px' }}>
                              <div className="px-6 py-4 border-b border-black/5 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <Download size={14} className="text-black/40" />
                                  <span className="text-[12px] font-medium text-black/60">Export Options</span>
                                </div>
                              </div>
                              <div className="p-6 space-y-4">
                                <div className="flex items-center justify-between p-4 border border-black/10 bg-white hover:bg-black/[0.02] cursor-pointer transition-colors">
                                  <div className="flex items-center gap-3">
                                    <FileText size={18} className="text-black" />
                                    <div>
                                      <div className="text-[13px] font-bold text-black">Markdown (.md)</div>
                                      <div className="text-[11px] text-black/50">Raw markdown format</div>
                                    </div>
                                  </div>
                                  <Download size={14} className="text-black/40" />
                                </div>
                                <div className="flex items-center justify-between p-4 border border-black/10 bg-white hover:bg-black/[0.02] cursor-pointer transition-colors">
                                  <div className="flex items-center gap-3">
                                    <Copy size={18} className="text-black" />
                                    <div>
                                      <div className="text-[13px] font-bold text-black">Copy to Clipboard</div>
                                      <div className="text-[11px] text-black/50">One-click copy</div>
                                    </div>
                                  </div>
                                  <Copy size={14} className="text-black/40" />
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Project README Templates — Large ASCII Art */}
                    {isProjectReadme && (
                      <div className="mt-6 font-mono text-[11px] text-black/25 leading-[1.5] select-none flex-1 flex flex-col justify-center">
                        <pre className="text-center whitespace-pre">{`
┌─────────────────────────────────────┐
│                                     │
│   ╔═══════════════════════════╗     │
│   ║   ## Project Title        ║     │
│   ║   Description goes here   ║     │
│   ╚═══════════════════════════╝     │
│                                     │
│   ┌─────────┐  ┌─────────────┐     │
│   │ Install │  │   Usage     │     │
│   │ ─────── │  │ ─────────── │     │
│   │ npm i   │  │ import pkg  │     │
│   │ yarn add│  │ pkg.init()  │     │
│   └─────────┘  └─────────────┘     │
│                                     │
│   ┌───────────────────────────┐     │
│   │   ## API Reference        │     │
│   │   \`\`\`typescript           │     │
│   │   function build(): void  │     │
│   │   \`\`\`                     │     │
│   └───────────────────────────┘     │
│                                     │
└─────────────────────────────────────┘
`}</pre>
                      </div>
                    )}

                    {/* Responsive Design Card — Second wide card */}
                    {isWide && i !== 0 && (
                      <div className="mt-4 flex gap-3">
                        <div className="flex-1 h-8 bg-black/[0.04] border border-black/10 flex items-center justify-center font-mono text-[9px] text-black/30">desktop</div>
                        <div className="w-16 h-8 bg-black/[0.04] border border-black/10 flex items-center justify-center font-mono text-[9px] text-black/30">tablet</div>
                        <div className="w-10 h-8 bg-black/[0.04] border border-black/10 flex items-center justify-center font-mono text-[9px] text-black/30">mobile</div>
                      </div>
                    )}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Free Forever ───────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-black/10">
        <div className="max-w-[1400px] mx-auto px-8 py-24">
          <Reveal>
            <SectionLabel>OPEN SOURCE</SectionLabel>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="text-[34px] md:text-[40px] font-bold tracking-[-0.03em] text-black leading-[1.15] mb-4">
              Free Forever.<br />
              No Catch.
            </h2>
          </Reveal>

          <Reveal delay={150}>
            <p className="text-[15px] text-black max-w-md font-['IBM_Plex_Sans',sans-serif] leading-relaxed mb-12">
              Core README Builder will always remain free and open source.
            </p>
          </Reveal>

          <Reveal delay={200}>
            <div className="flex justify-center">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-px bg-black/10 border border-black/10 overflow-hidden max-w-4xl w-full">
                {/* Community — takes 3 cols */}
                <div className="md:col-span-3 bg-white p-10">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-[18px] font-bold text-black">Community Version</h3>
                    <span className="font-mono text-[10px] font-medium px-2.5 py-1 bg-black text-white">CURRENT</span>
                  </div>
                  <p className="font-mono text-[12px] text-black/40 tracking-wide mb-8">FREE FOREVER</p>
                  <ul className="space-y-4">
                    {COMMUNITY_FREE.map((item) => (
                      <li key={item} className="flex items-center gap-3 text-[15px] font-['IBM_Plex_Sans',sans-serif] text-black">
                        <Check size={14} className="text-black shrink-0" strokeWidth={3} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pro — takes 2 cols */}
                <div className="md:col-span-2 bg-black/[0.02] p-10 relative">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-[18px] font-bold text-black/30">Future Pro</h3>
                    <span className="font-mono text-[10px] font-medium px-2.5 py-1 border border-black/15 text-black/30">SOON</span>
                  </div>
                  <p className="font-mono text-[12px] text-black/20 tracking-wide mb-8">OPTIONAL PREMIUM</p>
                  <ul className="space-y-4 opacity-50">
                    {PRO_FEATURES.map((item) => (
                      <li key={item} className="flex items-center gap-3 text-[15px] font-['IBM_Plex_Sans',sans-serif] text-black/50">
                        <div className="w-3.5 h-3.5 border border-black/20 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Community / Support ────────────────────────────────────────────── */}
      <section id="support" className="paper-bg border-b border-black/10">
        <div className="max-w-[1400px] mx-auto px-8 py-24">
          <Reveal>
            <SectionLabel>COMMUNITY</SectionLabel>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="text-[34px] md:text-[40px] font-bold tracking-[-0.03em] text-black leading-[1.15] mb-14 text-center">
              Built by Developers.<br />
              Powered by Community.
            </h2>
          </Reveal>

          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-black/10 border border-black/10 overflow-hidden max-w-4xl w-full">
              <Reveal delay={150}>
                <div className="bg-white p-10 h-full flex flex-col">
                  <div className="w-12 h-12 border border-black/10 flex items-center justify-center mb-6">
                    <Star size={20} className="text-black" />
                  </div>
                  <h3 className="text-[18px] font-bold text-black mb-3">Star it on GitHub</h3>
                  <p className="text-[15px] text-black/70 mb-10 leading-relaxed font-['IBM_Plex_Sans',sans-serif] flex-grow">
                    If README Forge helped you, consider starring the repository and sharing it with other developers.
                  </p>
                  <a
                    href="https://github.com/snowieedev/readme-builder"
                    target="_blank"
                    rel="noreferrer"
                    className="community-link flex items-center justify-center gap-2 w-full px-5 py-3 bg-black text-white text-[14px] font-medium hover:bg-black/80 transition-colors"
                  >
                    <GitFork size={16} />
                    Star on GitHub
                    <span className="community-arrow"><ArrowUpRight size={14} /></span>
                  </a>
                </div>
              </Reveal>

              <Reveal delay={200}>
                <div className="bg-white p-10 h-full flex flex-col">
                  <div className="w-12 h-12 border border-black/10 flex items-center justify-center mb-6">
                    <Heart size={20} className="text-black" />
                  </div>
                  <h3 className="text-[18px] font-bold text-black mb-3">Support Development</h3>
                  <p className="text-[15px] text-black/70 mb-10 leading-relaxed font-['IBM_Plex_Sans',sans-serif] flex-grow">
                    Help improve templates, features, and future updates by contributing to the project.
                  </p>
                  <a
                    href="https://github.com/snowieedev/readme-builder"
                    target="_blank"
                    rel="noreferrer"
                    className="community-link flex items-center justify-center gap-2 w-full px-5 py-3 text-black border border-black/20 text-[14px] font-medium hover:bg-black/5 hover:border-black/40 transition-colors"
                  >
                    Support Project
                    <span className="community-arrow"><ArrowUpRight size={14} /></span>
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ──────────────────────────────────────────────────────── */}
      <section className="bg-black text-white border-b border-white/10">
        <div className="max-w-[1400px] mx-auto px-8 py-28">
          <Reveal>
            <div className="max-w-3xl">
              <AsciiDivider />
              <h2 className="text-[38px] md:text-[48px] font-bold tracking-[-0.03em] leading-[1.1] mt-8 mb-6 text-white">
                Build Your README Today.
              </h2>
              <p className="text-[17px] text-white/70 mb-10 max-w-lg font-['IBM_Plex_Sans',sans-serif] leading-relaxed">
                Create beautiful GitHub profiles and project documentation in minutes. Open source. Free forever.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => navigate('/builder')}
                  className="flex items-center gap-2 px-7 py-3.5 text-[15px] font-medium bg-white text-black hover:bg-white/90 transition-colors"
                >
                  Start Building
                  <ArrowRight size={16} />
                </button>
                <a
                  href="#templates"
                  className="flex items-center gap-2 px-7 py-3.5 text-[15px] font-medium text-white border border-white/20 hover:bg-white/10 hover:border-white/40 transition-colors"
                >
                  Browse Templates
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer className="bg-black text-white">
        <div className="max-w-[1400px] mx-auto px-8 py-14">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-14">
            <div>
              <h4 className="font-mono text-[11px] font-medium tracking-[0.2em] uppercase text-white/40 mb-5">Product</h4>
              <ul className="space-y-3 text-[14px] text-white/60">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#templates" className="hover:text-white transition-colors">Templates</a></li>
                <li><button onClick={() => navigate('/builder')} className="hover:text-white transition-colors">Builder</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-mono text-[11px] font-medium tracking-[0.2em] uppercase text-white/40 mb-5">Resources</h4>
              <ul className="space-y-3 text-[14px] text-white/60">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="https://github.com/snowieedev/readme-builder" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub</a></li>
                <li><a href="#support" className="hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-mono text-[11px] font-medium tracking-[0.2em] uppercase text-white/40 mb-5">Community</h4>
              <ul className="space-y-3 text-[14px] text-white/60">
                <li><a href="#" className="hover:text-white transition-colors">Issues</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Discussions</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contributions</a></li>
              </ul>
            </div>
            <div className="flex flex-col items-start sm:items-end">
              <div className="flex items-center gap-2.5 mb-3">
                <img src={logoImg} alt="README Forge" className="h-7 w-auto object-contain" style={{ imageRendering: 'auto' }} />
                <span className="text-[14px] font-bold tracking-tight text-white">README Forge</span>
              </div>
              <p className="font-mono text-[11px] text-white/30">
                MIT License
              </p>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="font-mono text-[12px] text-white/40">
              README Forge © 2026
            </p>
            <p className="text-[14px] text-white/50 font-['IBM_Plex_Sans',sans-serif]">
              Built by{' '}
              <a
                href="https://github.com/snowieedev"
                target="_blank"
                rel="noreferrer"
                className="dotted-underline text-white/70 hover:text-white transition-colors"
              >
                Piyush
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

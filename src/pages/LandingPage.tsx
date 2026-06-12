// ─── Landing Page ────────────────────────────────────────────────────────────
// Premium editorial-tech landing page for README Forge.
// Design language: GitHub simplicity × Linear refinement × Editorial typography

import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
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
    <span className="inline-block font-mono text-[10px] tracking-[0.2em] uppercase text-neutral-400 select-none">
      ┌ {children} ┐
    </span>
  );
}

function AsciiDivider() {
  return (
    <div className="font-mono text-[10px] text-neutral-300 select-none overflow-hidden whitespace-nowrap opacity-40 my-1">
      ─────────────────────────────────────────────────────────────────────────────────────────
    </div>
  );
}

function SectionLabel({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="font-mono text-[11px] font-medium tracking-[0.25em] uppercase text-neutral-500">
        {children}
      </span>
      <span className="flex-1 h-px bg-neutral-200" />
    </div>
  );
}

/* ─── Component ────────────────────────────────────────────────────────────── */

export function LandingPage() {
  const navigate = useNavigate();

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
          transition: border-color 0.2s ease, background-color 0.2s ease;
        }
        .bento-feature:hover {
          border-color: #000;
          background-color: #FAFAFA;
        }
      `}</style>

      {/* ── Navigation ─────────────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-neutral-200">
        <div className="max-w-[1200px] mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-7 h-7 bg-black text-white flex items-center justify-center rounded-[4px]">
              <Blocks size={14} strokeWidth={2.5} />
            </div>
            <span className="text-[13px] font-semibold tracking-tight text-black font-['IBM_Plex_Sans',sans-serif]">
              README Forge
            </span>
          </div>
          
          <div className="hidden sm:flex items-center gap-7 text-[13px] font-medium text-neutral-500">
            <a href="#features" className="hover:text-black transition-colors">Features</a>
            <a href="#templates" className="hover:text-black transition-colors">Templates</a>
            <a href="https://github.com/snowieedev/readme-builder" target="_blank" rel="noreferrer" className="hover:text-black transition-colors">GitHub</a>
            <a href="#support" className="hover:text-black transition-colors">Support</a>
          </div>
          
          <button
            onClick={() => navigate('/builder')}
            className="flex items-center gap-1.5 px-4 py-[7px] text-[13px] font-medium bg-black text-white rounded-[4px] hover:bg-neutral-800 transition-colors"
          >
            Start Building
            <ArrowRight size={14} />
          </button>
        </div>
      </nav>

      {/* ── Hero Section ───────────────────────────────────────────────────── */}
      <section className="pt-14 bg-white border-b border-neutral-200">
        <div className="max-w-[1200px] mx-auto px-6 pt-20 pb-16">
          <Reveal>
            <AsciiLabel>README FORGE — v1.0</AsciiLabel>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="mt-6 text-[64px] md:text-[96px] lg:text-[112px] font-black tracking-[-0.06em] leading-[0.9] text-black font-['Inter',sans-serif]">
              <span className="text-neutral-400 block">Build Beautiful GitHub</span>
              <span className="text-black block">README.</span>
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-10 max-w-xl">
              <p className="text-[16px] leading-[1.7] text-neutral-500 font-['IBM_Plex_Sans',sans-serif]">
                Create professional GitHub READMEs and developer showcases in minutes. No coding required. No markdown headaches. Just build, customize, and export.
              </p>
            </div>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <button
                onClick={() => navigate('/builder')}
                className="flex items-center gap-2 px-6 py-3 text-[14px] font-medium bg-black text-white rounded-[4px] hover:bg-neutral-800 transition-colors"
              >
                Start Building
                <ArrowRight size={16} />
              </button>
              <a
                href="#templates"
                className="flex items-center gap-2 px-6 py-3 text-[14px] font-medium text-black border border-neutral-300 rounded-[4px] hover:bg-neutral-50 hover:border-neutral-400 transition-colors"
              >
                Browse Templates
              </a>
            </div>
          </Reveal>

          {/* Technical Metadata Strip */}
          <Reveal delay={400}>
            <div className="mt-12 flex flex-wrap items-center gap-4">
              {['OPEN SOURCE', 'FREE FOREVER', 'NO LOGIN REQUIRED', 'MARKDOWN EXPORT'].map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[10px] font-medium tracking-[0.15em] text-neutral-400 px-3 py-1.5 border border-neutral-200 rounded-[2px] bg-neutral-50"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Stats — Bento Grid ─────────────────────────────────────────────── */}
      <section className="paper-bg border-b border-neutral-200">
        <div className="max-w-[1200px] mx-auto px-6 py-16">
          <Reveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-neutral-300 border border-neutral-300 rounded-[4px] overflow-hidden">
              {STATS.map((stat, i) => (
                <div key={i} className="bg-white p-6 md:p-8 text-center">
                  <div className="font-mono text-[10px] text-neutral-400 mb-2">{stat.mono}</div>
                  <div className="text-3xl md:text-4xl font-black tracking-[-0.04em] text-black mb-1">{stat.value}</div>
                  <div className="font-mono text-[10px] font-medium tracking-[0.2em] uppercase text-neutral-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Templates Showcase ─────────────────────────────────────────────── */}
      <section id="templates" className="bg-white border-b border-neutral-200">
        <div className="max-w-[1200px] mx-auto px-6 py-20">
          <Reveal>
            <SectionLabel>TEMPLATES</SectionLabel>
          </Reveal>

          <Reveal delay={100}>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
              <div>
                <h2 className="text-4xl md:text-5xl font-black tracking-[-0.04em] text-black leading-[1.1]">
                  Professional Templates.<br />
                  <span className="text-neutral-400">Ready to Use.</span>
                </h2>
              </div>
              <p className="text-[14px] text-neutral-500 max-w-sm font-['IBM_Plex_Sans',sans-serif] leading-relaxed">
                Start with expertly designed templates and customize every detail to match your personal brand.
              </p>
            </div>
          </Reveal>

          {/* Bento Template Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-neutral-200 border border-neutral-200 rounded-[4px] overflow-hidden mb-10">
            {TEMPLATES.map((template, i) => {
              const Icon = template.icon;
              return (
                <Reveal key={template.id} delay={i * 50}>
                  <div
                    className="bg-white p-6 hover:bg-neutral-50 transition-colors cursor-pointer group h-full"
                    onClick={() => navigate('/builder')}
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-9 h-9 border border-neutral-200 rounded-[4px] flex items-center justify-center group-hover:border-black transition-colors">
                        <Icon size={16} className="text-neutral-500 group-hover:text-black transition-colors" />
                      </div>
                      <div className="flex gap-1.5">
                        {template.popular && (
                          <span className="font-mono text-[9px] font-medium px-2 py-0.5 bg-black text-white rounded-[2px]">
                            POPULAR
                          </span>
                        )}
                      </div>
                    </div>
                    <h3 className="text-[15px] font-semibold text-black mb-2 group-hover:underline underline-offset-4">{template.name}</h3>
                    <div className="flex gap-1.5 flex-wrap">
                      {template.tags.map(tag => (
                        <span key={tag} className="font-mono text-[10px] text-neutral-400 border border-neutral-200 px-2 py-0.5 rounded-[2px]">
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
              className="flex items-center gap-2 font-mono text-[12px] font-medium text-neutral-500 hover:text-black transition-colors tracking-wide"
            >
              BROWSE ALL TEMPLATES <ArrowUpRight size={14} />
            </button>
          </Reveal>
        </div>
      </section>

      {/* ── Features — Bento Grid ──────────────────────────────────────────── */}
      <section id="features" className="paper-bg border-b border-neutral-200">
        <div className="max-w-[1200px] mx-auto px-6 py-20">
          <Reveal>
            <SectionLabel>FEATURES</SectionLabel>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="text-4xl md:text-5xl font-black tracking-[-0.04em] text-black leading-[1.1] mb-4">
              Everything You Need.<br />
              <span className="text-neutral-400">Nothing You Don't.</span>
            </h2>
            <p className="text-[14px] text-neutral-500 max-w-md font-['IBM_Plex_Sans',sans-serif] leading-relaxed mb-12">
              A precise, powerful toolkit for creating stunning GitHub documentation without friction.
            </p>
          </Reveal>

          {/* Bento Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {FEATURES.map((feature, i) => {
              const Icon = feature.icon;
              const isWide = feature.size === 'wide';
              const isTall = feature.size === 'tall';
              return (
                <Reveal
                  key={i}
                  delay={i * 40}
                  className={`${isWide ? 'md:col-span-2' : ''} ${isTall ? 'md:row-span-2' : ''}`}
                >
                  <div className={`bento-feature bg-white rounded-[6px] p-6 h-full flex flex-col`}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-8 h-8 border border-neutral-200 rounded-[4px] flex items-center justify-center">
                        <Icon size={16} className="text-black" />
                      </div>
                      <span className="font-mono text-[9px] text-neutral-400 mt-1">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <h3 className="text-[15px] font-semibold text-black mb-1.5">{feature.title}</h3>
                    <p className="text-[13px] text-neutral-500 leading-relaxed font-['IBM_Plex_Sans',sans-serif] flex-grow">{feature.description}</p>
                    {isTall && (
                      <div className="mt-6 font-mono text-[10px] text-neutral-300 leading-[1.6] select-none">
                        ┌──────────┐<br />
                        │ ## Title │<br />
                        │ Content  │<br />
                        │ ---      │<br />
                        │ ## API   │<br />
                        │ ```code  │<br />
                        │ ```      │<br />
                        └──────────┘
                      </div>
                    )}
                    {isWide && i === 0 && (
                      <div className="mt-4 flex gap-2">
                        <span className="font-mono text-[9px] px-2 py-1 bg-neutral-100 text-neutral-500 rounded-[2px] border border-neutral-200">editor</span>
                        <span className="font-mono text-[9px] px-2 py-1 bg-black text-white rounded-[2px]">preview</span>
                        <span className="font-mono text-[9px] px-2 py-1 bg-neutral-100 text-neutral-500 rounded-[2px] border border-neutral-200">export</span>
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
      <section className="bg-white border-b border-neutral-200">
        <div className="max-w-[1200px] mx-auto px-6 py-20">
          <Reveal>
            <SectionLabel>OPEN SOURCE</SectionLabel>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="text-4xl md:text-5xl font-black tracking-[-0.04em] text-black leading-[1.1] mb-4">
              Free Forever.<br />
              <span className="text-neutral-400">No Catch.</span>
            </h2>
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-5 gap-px bg-neutral-200 border border-neutral-200 rounded-[4px] overflow-hidden max-w-4xl">
              {/* Community — takes 3 cols */}
              <div className="md:col-span-3 bg-white p-8">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-bold text-black">Community Version</h3>
                  <span className="font-mono text-[9px] font-medium px-2 py-0.5 bg-black text-white rounded-[2px]">CURRENT</span>
                </div>
                <p className="font-mono text-[11px] text-neutral-400 tracking-wide mb-6">FREE FOREVER</p>
                <ul className="space-y-3">
                  {COMMUNITY_FREE.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-[14px] font-['IBM_Plex_Sans',sans-serif] text-neutral-700">
                      <Check size={14} className="text-black shrink-0" strokeWidth={3} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pro — takes 2 cols */}
              <div className="md:col-span-2 bg-neutral-50 p-8 relative">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-bold text-neutral-400">Future Pro</h3>
                  <span className="font-mono text-[9px] font-medium px-2 py-0.5 border border-neutral-300 text-neutral-400 rounded-[2px]">SOON</span>
                </div>
                <p className="font-mono text-[11px] text-neutral-300 tracking-wide mb-6">OPTIONAL PREMIUM</p>
                <ul className="space-y-3 opacity-50">
                  {PRO_FEATURES.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-[14px] font-['IBM_Plex_Sans',sans-serif] text-neutral-500">
                      <div className="w-3.5 h-3.5 border border-neutral-300 rounded-sm shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          <Reveal delay={300}>
            <p className="mt-8 font-mono text-[11px] text-neutral-400 tracking-wide">
              ── Core README Builder will always remain free and open source.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Community / Support ────────────────────────────────────────────── */}
      <section id="support" className="paper-bg border-b border-neutral-200">
        <div className="max-w-[1200px] mx-auto px-6 py-20">
          <Reveal>
            <SectionLabel>COMMUNITY</SectionLabel>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="text-4xl md:text-5xl font-black tracking-[-0.04em] text-black leading-[1.1] mb-12">
              Built by Developers.<br />
              <span className="text-neutral-400">Powered by Community.</span>
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-neutral-300 border border-neutral-300 rounded-[4px] overflow-hidden max-w-3xl">
            <Reveal delay={150}>
              <div className="bg-white p-8 h-full flex flex-col">
                <div className="w-10 h-10 border border-neutral-200 rounded-[4px] flex items-center justify-center mb-5">
                  <Star size={18} className="text-black" />
                </div>
                <h3 className="text-lg font-bold text-black mb-2">Star it on GitHub</h3>
                <p className="text-[14px] text-neutral-500 mb-8 leading-relaxed font-['IBM_Plex_Sans',sans-serif] flex-grow">
                  If README Forge helped you, consider starring the repository and sharing it with other developers.
                </p>
                <a
                  href="https://github.com/snowieedev/readme-builder"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-5 py-2.5 bg-black text-white text-[13px] font-medium rounded-[4px] hover:bg-neutral-800 transition-colors"
                >
                  <GitFork size={16} />
                  Star on GitHub
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="bg-white p-8 h-full flex flex-col">
                <div className="w-10 h-10 border border-neutral-200 rounded-[4px] flex items-center justify-center mb-5">
                  <Heart size={18} className="text-black" />
                </div>
                <h3 className="text-lg font-bold text-black mb-2">Support Development</h3>
                <p className="text-[14px] text-neutral-500 mb-8 leading-relaxed font-['IBM_Plex_Sans',sans-serif] flex-grow">
                  Help improve templates, features, and future updates by contributing to the project.
                </p>
                <a
                  href="https://github.com/snowieedev/readme-builder"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-5 py-2.5 text-black border border-neutral-300 text-[13px] font-medium rounded-[4px] hover:bg-neutral-50 hover:border-neutral-400 transition-colors"
                >
                  Support Project
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Final CTA ──────────────────────────────────────────────────────── */}
      <section className="bg-black text-white border-b border-neutral-800">
        <div className="max-w-[1200px] mx-auto px-6 py-24">
          <Reveal>
            <div className="max-w-3xl">
              <AsciiDivider />
              <h2 className="text-5xl md:text-7xl font-black tracking-[-0.05em] leading-[0.95] mt-8 mb-6">
                Build Your<br />README Today.
              </h2>
              <p className="text-[16px] text-neutral-500 mb-10 max-w-lg font-['IBM_Plex_Sans',sans-serif] leading-relaxed">
                Create beautiful GitHub profiles and project documentation in minutes. Open source. Free forever.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => navigate('/builder')}
                  className="flex items-center gap-2 px-7 py-3.5 text-[14px] font-medium bg-white text-black rounded-[4px] hover:bg-neutral-200 transition-colors"
                >
                  Start Building
                  <ArrowRight size={16} />
                </button>
                <a
                  href="#templates"
                  className="flex items-center gap-2 px-7 py-3.5 text-[14px] font-medium text-white border border-neutral-700 rounded-[4px] hover:bg-neutral-900 hover:border-neutral-600 transition-colors"
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
        <div className="max-w-[1200px] mx-auto px-6 py-12">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="font-mono text-[10px] font-medium tracking-[0.2em] uppercase text-neutral-500 mb-4">Product</h4>
              <ul className="space-y-2.5 text-[13px] text-neutral-400">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#templates" className="hover:text-white transition-colors">Templates</a></li>
                <li><button onClick={() => navigate('/builder')} className="hover:text-white transition-colors">Builder</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-mono text-[10px] font-medium tracking-[0.2em] uppercase text-neutral-500 mb-4">Resources</h4>
              <ul className="space-y-2.5 text-[13px] text-neutral-400">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="https://github.com/snowieedev/readme-builder" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub</a></li>
                <li><a href="#support" className="hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-mono text-[10px] font-medium tracking-[0.2em] uppercase text-neutral-500 mb-4">Community</h4>
              <ul className="space-y-2.5 text-[13px] text-neutral-400">
                <li><a href="#" className="hover:text-white transition-colors">Issues</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Discussions</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contributions</a></li>
              </ul>
            </div>
            <div className="flex flex-col items-start sm:items-end">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 bg-white text-black flex items-center justify-center rounded-[4px]">
                  <Blocks size={14} strokeWidth={2.5} />
                </div>
                <span className="text-[13px] font-semibold tracking-tight">README Forge</span>
              </div>
              <p className="font-mono text-[10px] text-neutral-600">
                MIT License
              </p>
            </div>
          </div>

          <div className="border-t border-neutral-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="font-mono text-[11px] text-neutral-600">
              README Forge © 2026
            </p>
            <p className="text-[12px] text-neutral-600 flex items-center gap-1 font-['IBM_Plex_Sans',sans-serif]">
              Built with <Heart size={12} className="text-neutral-400" fill="currentColor" /> for the open-source community.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

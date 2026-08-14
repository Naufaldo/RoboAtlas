import React from 'react';
import Link from 'next/link';
import {
  Bot,
  Compass,
  Navigation,
  Cpu,
  MapPin,
  Layers,
  RotateCcw,
  Users,
  ArrowRight,
  Sparkles,
  BookOpen,
  Code2,
  Sliders,
  CheckCircle2,
  Terminal,
  Zap,
} from 'lucide-react';
import { HeroCanvasPreview } from '@/components/simulation/HeroCanvasPreview';
import { DOMAINS, ALGORITHMS } from '@/lib/navigation/curriculum';

const iconMap: Record<string, React.ElementType> = {
  Compass,
  MapPin,
  Layers,
  RotateCcw,
  Navigation,
  Cpu,
  Users,
};

export default function HomePage() {
  const learningPillars = [
    { step: '01', title: 'Concept', desc: 'Intuitive physical principles without dense jargon.' },
    { step: '02', title: 'Mathematics', desc: 'Rigorous KaTeX equations with every variable defined.' },
    { step: '03', title: 'Algorithm', desc: 'Clean pseudocode detailing execution logic step-by-step.' },
    { step: '04', title: 'Simulation', desc: 'Deterministic 60 FPS Canvas simulators running in-browser.' },
    { step: '05', title: 'TypeScript Code', desc: 'Framework-agnostic pure TypeScript algorithms.' },
    { step: '06', title: 'Experiment', desc: 'Manipulate noise, obstacles, and control gains in real time.' },
  ];

  return (
    <div className="flex flex-col items-center w-full">
      {/* 1. Hero Section */}
      <section className="relative w-full overflow-hidden pt-12 pb-16 md:py-20 border-b border-slate-800/80 bg-radial-gradient">
        {/* Glow background accents */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Text */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Next-Generation Robotics Textbook + Simulator</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-100 leading-tight">
                Learn Robotics by <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500">Seeing It Work.</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Interactive explanations, mathematics, algorithms, and simulations for autonomous mobile robotics.
                Execute algorithms step-by-step with zero backend required.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/learn"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-mono font-semibold text-sm shadow-lg shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5"
                >
                  <BookOpen className="w-4 h-4" />
                  Start Learning
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>

                <Link
                  href="/algorithms"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-mono text-sm transition-all"
                >
                  <Cpu className="w-4 h-4 text-cyan-400" />
                  Explore Algorithms
                </Link>
              </div>

              {/* Tech Badges */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 100% Client-Side
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Pure TypeScript
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> KaTeX Mathematics
                </span>
              </div>
            </div>

            {/* Right Interactive Hero Simulation */}
            <div className="lg:col-span-6 w-full">
              <HeroCanvasPreview />
            </div>
          </div>
        </div>
      </section>

      {/* 2. The 6-Step Learning Flow */}
      <section className="w-full py-16 border-b border-slate-800/80 bg-slate-950/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400">
              The Educational Methodology
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-100 mt-1">
              From Mathematical Theory to Running Code
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Every topic follows a disciplined educational structure designed for engineering students and researchers.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {learningPillars.map((pillar) => (
              <div
                key={pillar.step}
                className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-[11px] font-mono font-bold text-cyan-400">
                    {pillar.step}
                  </span>
                  <h3 className="text-sm font-semibold text-slate-100 mt-1">
                    {pillar.title}
                  </h3>
                </div>
                <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Seven Core Domains Grid */}
      <section className="w-full py-20 border-b border-slate-800/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-400">
                Curriculum Structure
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-100 mt-1">
                7 Core Robotics Domains
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Comprehensive coverage from kinematics to decentralized swarm formations.
              </p>
            </div>

            <Link
              href="/learn"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 font-medium"
            >
              <span>View full curriculum</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DOMAINS.map((domain) => {
              const Icon = iconMap[domain.iconName] || Navigation;
              return (
                <Link
                  key={domain.slug}
                  href={`/learn/${domain.slug}`}
                  className="group relative p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900/90 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 group-hover:scale-105 transition-transform">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                        {domain.milestone}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                      {domain.title}
                    </h3>
                    <p className="text-xs font-mono text-cyan-400/80 mt-0.5">
                      {domain.subtitle}
                    </p>

                    <p className="text-xs text-slate-400 mt-3 leading-relaxed line-clamp-3">
                      {domain.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400 group-hover:text-cyan-400 transition-colors">
                    <span>Explore domain</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Featured Algorithms Teaser */}
      <section className="w-full py-16 bg-slate-950/60 border-b border-slate-800/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-400">
                Algorithm Matrix
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-slate-100 mt-1">
                Classical & Modern Planners
              </h2>
            </div>
            <Link
              href="/algorithms"
              className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
            >
              <span>View all {ALGORITHMS.length} algorithms</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {ALGORITHMS.slice(0, 4).map((algo) => (
              <div
                key={algo.id}
                className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-400">
                      {algo.category}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      {algo.difficulty}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-100">{algo.name}</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {algo.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-500">{algo.milestone}</span>
                  <Link
                    href={`/learn/${algo.categorySlug}`}
                    className="text-xs font-mono text-cyan-400 hover:text-cyan-300"
                  >
                    Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Academic Attribution & Open Source Reference */}
      <section className="w-full py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-3">
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-400">
                  Academic Inspiration & Attribution
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-100">
                  Inspired by PythonRobotics by Atsushi Sakai
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  RoboAtlas is built as an independent, interactive TypeScript web platform inspired by the curriculum breadth of Atsushi Sakai’s renowned <em>PythonRobotics</em> repository and classical robotics papers. All educational explanations and browser simulations are engineered from first principles.
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
                <a
                  href="https://github.com/AtsushiSakai/PythonRobotics"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono text-center border border-slate-700 transition-colors"
                >
                  GitHub / PythonRobotics ↗
                </a>
                <a
                  href="https://atsushisakai.github.io/PythonRobotics/index.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 text-xs font-mono text-center border border-cyan-500/30 transition-colors"
                >
                  PythonRobotics Textbook ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

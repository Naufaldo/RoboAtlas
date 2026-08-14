'use client';

import React from 'react';
import Link from 'next/link';
import {
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
  CheckCircle2,
} from 'lucide-react';
import { HeroCanvasPreview } from '@/components/simulation/HeroCanvasPreview';
import { DOMAINS, ALGORITHMS } from '@/lib/navigation/curriculum';
import { useLanguage } from '@/lib/i18n/LanguageContext';

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
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center w-full">
      {/* 1. Hero Section */}
      <section className="relative w-full overflow-hidden pt-10 pb-16 md:pt-16 md:pb-24 border-b border-slate-200 dark:border-slate-800/80">
        {/* Glow ambient background */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-blue-600/10 blur-[110px] rounded-full pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Text */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-300 text-xs font-mono shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
                <span>{t.hero.tag}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 leading-[1.12]">
                {t.hero.title1}{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-teal-400 to-blue-600 dark:from-cyan-400 dark:via-teal-300 dark:to-blue-500">
                  {t.hero.titleHighlight}
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                {t.hero.description}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-1">
                <Link
                  href="/learn"
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-mono font-bold text-sm shadow-xl shadow-cyan-500/20 transition-all transform hover:-translate-y-0.5"
                >
                  <BookOpen className="w-4 h-4" />
                  {t.hero.ctaCurriculum}
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>

                <Link
                  href="/algorithms"
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white dark:bg-slate-900/90 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 font-mono text-sm transition-all hover:border-cyan-500/40 shadow-sm"
                >
                  <Cpu className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
                  {t.hero.ctaAlgorithms}
                </Link>
              </div>

              {/* Feature Highlights */}
              <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-5 text-xs font-mono text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400" /> {t.hero.clientSide}
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400" /> {t.hero.zeroBackend}
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400" /> {t.hero.katexMath}
                </span>
              </div>
            </div>

            {/* Right Hero Simulator Canvas */}
            <div className="lg:col-span-6 w-full">
              <HeroCanvasPreview />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Educational Methodology Strip */}
      <section className="w-full py-16 border-b border-slate-200 dark:border-slate-800/80 bg-slate-100/50 dark:bg-slate-950/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-600 dark:text-cyan-400 font-semibold">
              {t.methodology.tag}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 mt-1.5">
              {t.methodology.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2">
              {t.methodology.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {t.methodology.steps.map((pillar) => (
              <div
                key={pillar.step}
                className="p-4 rounded-xl glass-panel glass-panel-hover flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400 px-1.5 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
                      {pillar.step}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-3">{pillar.title}</h3>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Seven Core Domains Grid */}
      <section className="w-full py-20 border-b border-slate-200 dark:border-slate-800/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-600 dark:text-cyan-400 font-semibold">
                {t.domainsSection.tag}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 mt-1">
                {t.domainsSection.title}
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                {t.domainsSection.subtitle}
              </p>
            </div>

            <Link
              href="/learn"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 font-semibold"
            >
              <span>{t.domainsSection.viewAll}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DOMAINS.map((domain) => {
              const Icon = iconMap[domain.iconName] || Navigation;
              return (
                <Link
                  key={domain.slug}
                  href={`/learn/${domain.slug}`}
                  className="group relative p-6 rounded-2xl glass-panel glass-panel-hover flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/15 to-blue-600/15 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 group-hover:scale-105 transition-transform shadow-sm">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800/80 text-cyan-700 dark:text-cyan-300 border border-slate-300 dark:border-slate-700">
                        {domain.milestone}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
                      {domain.title}
                    </h3>
                    <p className="text-xs font-mono text-cyan-600 dark:text-cyan-400/80 mt-0.5">
                      {domain.subtitle}
                    </p>

                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-3 leading-relaxed line-clamp-3">
                      {domain.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    <span className="font-medium">{t.domainsSection.exploreDomain}</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Featured Algorithms Matrix Teaser */}
      <section className="w-full py-16 bg-slate-100/60 dark:bg-slate-950/50 border-b border-slate-200 dark:border-slate-800/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-600 dark:text-cyan-400 font-semibold">
                {t.algorithmMatrix.tag}
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mt-1">
                {t.algorithmMatrix.title}
              </h2>
            </div>
            <Link
              href="/algorithms"
              className="text-xs font-mono text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 flex items-center gap-1 font-semibold"
            >
              <span>{t.algorithmMatrix.viewAll} ({ALGORITHMS.length})</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {ALGORITHMS.slice(0, 4).map((algo) => (
              <div
                key={algo.id}
                className="p-5 rounded-2xl glass-panel glass-panel-hover flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 font-medium">
                      {algo.category}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                      {algo.difficulty}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">{algo.name}</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                    {algo.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800/60 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-500">{algo.milestone}</span>
                  <Link
                    href={`/learn/${algo.categorySlug}`}
                    className="text-xs font-mono text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 font-medium flex items-center gap-1"
                  >
                    <span>{t.algorithmMatrix.details}</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Academic Attribution & Open Source Inspiration */}
      <section className="w-full py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl glass-panel border border-slate-200 dark:border-slate-800 p-8 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-3">
                <span className="text-xs font-mono uppercase tracking-widest text-cyan-600 dark:text-cyan-400 font-semibold">
                  {t.attribution.tag}
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100">
                  {t.attribution.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {t.attribution.description}
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
                <a
                  href="https://github.com/AtsushiSakai/PythonRobotics"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-mono text-center border border-slate-300 dark:border-slate-700 hover:border-cyan-500/40 transition-all font-medium shadow-sm"
                >
                  {t.attribution.githubLink}
                </a>
                <a
                  href="https://atsushisakai.github.io/PythonRobotics/index.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 text-xs font-mono text-center border border-cyan-500/30 transition-all font-medium"
                >
                  {t.attribution.textbookLink}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

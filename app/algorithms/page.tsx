'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { ALGORITHMS } from '@/lib/navigation/curriculum';
import { MathBlock } from '@/components/mathematics/MathBlock';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Cpu, Search, Filter, ArrowRight, Sparkles } from 'lucide-react';

export default function AlgorithmsPage() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');

  const categories = ['All', 'Path Planning', 'Localization', 'Control', 'SLAM', 'Multi-Agent'];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredAlgorithms = useMemo(() => {
    return ALGORITHMS.filter((algo) => {
      const matchesSearch =
        algo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        algo.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        algo.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCat =
        selectedCategory === 'All' || algo.category === selectedCategory;

      const matchesDiff =
        selectedDifficulty === 'All' || algo.difficulty === selectedDifficulty;

      return matchesSearch && matchesCat && matchesDiff;
    });
  }, [searchQuery, selectedCategory, selectedDifficulty]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800/80 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-300 text-xs font-mono mb-3">
          <Cpu className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
          <span>{t.algorithmMatrix.tag}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
          {t.algorithmMatrix.title}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-2xl leading-relaxed">
          Filter and explore robotics algorithms across planning, state estimation, tracking control, and swarm coordination with theoretical formulations and classical papers.
        </p>
      </div>

      {/* Search & Filters Bar */}
      <div className="p-5 rounded-2xl glass-panel space-y-4 shadow-xl">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder={t.algorithmMatrix.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-300 dark:border-slate-700/60 text-xs font-mono text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors shadow-inner"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-200 dark:border-slate-800/80 text-xs font-mono">
          {/* Category Filter */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-slate-600 dark:text-slate-400 mr-1 flex items-center gap-1 font-semibold">
              <Filter className="w-3 h-3 text-cyan-500 dark:text-cyan-400" /> {t.algorithmMatrix.category}:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  selectedCategory === cat
                    ? 'bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border border-cyan-500/40 font-semibold shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60 border border-transparent'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Difficulty Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-600 dark:text-slate-400 mr-1 font-semibold">{t.algorithmMatrix.difficulty}:</span>
            {difficulties.map((diff) => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  selectedDifficulty === diff
                    ? 'bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border border-cyan-500/40 font-semibold shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60 border border-transparent'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Algorithms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredAlgorithms.map((algo) => (
          <div
            key={algo.id}
            className="p-6 rounded-2xl glass-panel glass-panel-hover flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-mono px-2.5 py-0.5 rounded-md bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-500/25 font-semibold">
                    {algo.category}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800">
                    {algo.levelTitle}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full font-semibold ${
                      algo.difficulty === 'Beginner'
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                        : algo.difficulty === 'Intermediate'
                        ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30'
                        : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/30'
                    }`}
                  >
                    {algo.difficulty}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                    {algo.milestone}
                  </span>
                </div>
              </div>

              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">{algo.name}</h2>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                {algo.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mt-3.5">
                {algo.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Formulation */}
              {algo.keyEquation && (
                <div className="mt-4">
                  <MathBlock latex={algo.keyEquation} title={t.algorithmMatrix.coreMath} />
                </div>
              )}

              {algo.paperRef && (
                <div className="mt-3 text-[11px] font-mono text-slate-600 dark:text-slate-400 bg-slate-100/70 dark:bg-slate-950/70 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800/80">
                  <strong className="text-cyan-600 dark:text-cyan-400 font-semibold">{t.algorithmMatrix.classicalPaper}</strong> {algo.paperRef}
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
                <span>{t.algorithmMatrix.deterministicSim}</span>
              </span>
              <Link
                href={algo.path}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 font-mono text-xs font-semibold border border-cyan-500/30 transition-all shadow-sm"
              >
                <span>{t.algorithmMatrix.studyAlgorithm}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filteredAlgorithms.length === 0 && (
        <div className="text-center py-16 rounded-2xl glass-panel text-slate-500 dark:text-slate-400 font-mono text-xs">
          {t.algorithmMatrix.noResults}
        </div>
      )}
    </div>
  );
}

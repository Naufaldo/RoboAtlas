'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { DOMAINS } from '@/lib/navigation/curriculum';
import { MASTER_CURRICULUM_LEVELS } from '@/lib/navigation/master-curriculum-levels';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import {
  Compass,
  MapPin,
  Layers,
  RotateCcw,
  Navigation,
  Cpu,
  Users,
  ArrowRight,
  BookOpen,
  GraduationCap,
  Sparkles,
  Clock,
  Filter,
  CheckCircle2,
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Compass,
  MapPin,
  Layers,
  RotateCcw,
  Navigation,
  Cpu,
  Users,
};

export default function LearnPage() {
  const { locale, t } = useLanguage();
  const isId = locale === 'id';

  const [activeTab, setActiveTab] = useState<'levels' | 'domains'>('levels');
  const [selectedTier, setSelectedTier] = useState<string>('All');

  const tiers = [
    { key: 'All', labelEn: 'All 21 Levels (0–20)', labelId: 'Semua 21 Level (0–20)' },
    { key: 'Foundations', labelEn: 'Tier 1: Foundations (0–4)', labelId: 'Tier 1: Fondasi (0–4)' },
    { key: 'Core Autonomy', labelEn: 'Tier 2: Core Autonomy (5–8)', labelId: 'Tier 2: Otonomi Utama (5–8)' },
    { key: 'Spatial Intelligence', labelEn: 'Tier 3: Spatial Intelligence & SLAM (9–12)', labelId: 'Tier 3: Kecerdasan Spasial (9–12)' },
    { key: 'Advanced Embodiments', labelEn: 'Tier 4: Advanced & Swarms (13–20)', labelId: 'Tier 4: Spesialisasi & Kawanan (13–20)' },
  ];

  const filteredLevels = useMemo(() => {
    if (selectedTier === 'All') return MASTER_CURRICULUM_LEVELS;
    return MASTER_CURRICULUM_LEVELS.filter((l) => l.tier === selectedTier);
  }, [selectedTier]);

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800/80 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-300 text-xs font-mono mb-3">
          <BookOpen className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
          <span>{isId ? 'RoboAtlas Master Curriculum v1.0' : 'RoboAtlas Master Curriculum v1.0'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
          {isId ? 'Kurikulum Master Robotika Otonom (Level 0 – 20)' : 'Autonomous Robotics Master Curriculum (Levels 0 – 20)'}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-3xl leading-relaxed font-sans">
          {isId
            ? 'Struktur kurikulum komprehensif 21 jenjang pembelajaran yang menyintesis literatur Elements of Robotics, Foundations of Robotics, dan Planning Algorithms. Dari intuisi fisik hingga manipulasi, SLAM, dan kecerdasan kawanan.'
            : 'A comprehensive 21-level learning hierarchy synthesizing classical textbooks into progressive interactive tiers. From physical intuition to manipulation, SLAM, and swarm intelligence.'}
        </p>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 mt-6">
          <button
            onClick={() => setActiveTab('levels')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-mono text-xs transition-all ${
              activeTab === 'levels'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 border border-slate-200 dark:border-slate-800'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>{isId ? 'Jalur Belajar Berjenjang (Level 0–20)' : '21-Level Curriculum Map (0–20)'}</span>
          </button>

          <button
            onClick={() => setActiveTab('domains')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-mono text-xs transition-all ${
              activeTab === 'domains'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 border border-slate-200 dark:border-slate-800'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>{isId ? 'Laboratorium Domain' : 'Domain Laboratories'}</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: PROGRESSIVE LEVELS (0–20) */}
      {activeTab === 'levels' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Tier Filter Bar */}
          <div className="p-3.5 rounded-xl glass-panel flex items-center gap-2 flex-wrap text-xs font-mono">
            <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5 font-semibold mr-1">
              <Filter className="w-3.5 h-3.5 text-cyan-500" />
              <span>{isId ? 'Kategori Jenjang:' : 'Curriculum Tiers:'}</span>
            </span>
            {tiers.map((tItem) => (
              <button
                key={tItem.key}
                onClick={() => setSelectedTier(tItem.key)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  selectedTier === tItem.key
                    ? 'bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border border-cyan-500/40 font-semibold shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60 border border-transparent'
                }`}
              >
                {isId ? tItem.labelId : tItem.labelEn}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {filteredLevels.map((level) => (
              <div
                key={level.id}
                className="p-5 sm:p-6 rounded-2xl glass-panel border border-slate-200 dark:border-slate-800 transition-all hover:border-cyan-500/40 shadow-lg space-y-4"
              >
                {/* Level Header */}
                <div className="flex items-start justify-between flex-wrap gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30 font-mono text-xs font-bold">
                        Level {level.level}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800">
                        {level.tier}
                      </span>
                      <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 font-mono">
                        {isId ? level.titleId : level.titleEn}
                      </h2>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans leading-relaxed">
                      {isId ? level.descriptionId : level.descriptionEn}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 text-xs font-mono text-slate-500 dark:text-slate-400 flex-shrink-0">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>~{level.estimatedHours} {isId ? 'jam' : 'hrs'}</span>
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700">
                      {level.badge}
                    </span>
                  </div>
                </div>

                {/* Modules Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2 border-t border-slate-200 dark:border-slate-800/80">
                  {level.modules.map((m) => (
                    <Link
                      key={m.id}
                      href={m.href}
                      className="p-3.5 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all group flex flex-col justify-between"
                    >
                      <div className="space-y-1">
                        <span className="text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors block">
                          {isId ? m.titleId : m.titleEn}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500 block">
                          {m.topicsCount} {isId ? 'topik pembelajaran' : 'core topics'}
                        </span>
                      </div>

                      <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-cyan-600 dark:text-cyan-400 pt-2 border-t border-slate-100 dark:border-slate-800/60">
                        <span>{isId ? 'Buka Laboratorium' : 'Launch Lab'}</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 2: DOMAIN LABORATORIES */}
      {activeTab === 'domains' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
          {DOMAINS.map((domain) => {
            const Icon = iconMap[domain.iconName] || Navigation;
            return (
              <div
                key={domain.slug}
                className="p-6 rounded-2xl glass-panel glass-panel-hover flex flex-col justify-between shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/15 to-blue-600/15 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800/80 text-cyan-700 dark:text-cyan-300 border border-slate-300 dark:border-slate-700">
                      {domain.levelBadge}
                    </span>
                  </div>

                  <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">{domain.title}</h2>
                  <p className="text-xs font-mono text-cyan-600 dark:text-cyan-400/80 mb-2">{domain.subtitle}</p>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">{domain.description}</p>

                  {/* Topics list */}
                  <div className="mt-4 space-y-1.5 pt-3.5 border-t border-slate-200 dark:border-slate-800/80">
                    <span className="text-[11px] font-mono font-semibold text-slate-800 dark:text-slate-200">
                      {t.domainsSection.keyTopics}
                    </span>
                    <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1.5">
                      {domain.topics.map((top) => (
                        <li key={top.title} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 dark:bg-cyan-400 flex-shrink-0" />
                          <span>{top.title}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{domain.status}</span>
                  </span>
                  <Link
                    href={`/learn/${domain.slug}`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 hover:bg-cyan-500/20 font-mono text-xs font-semibold border border-cyan-500/30 transition-all shadow-sm"
                  >
                    <span>{t.domainsSection.openDomain}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

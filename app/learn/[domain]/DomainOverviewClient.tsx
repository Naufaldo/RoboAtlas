'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { DomainRegistryItem, LessonRegistryItem } from '@/lib/curriculum/registry';
import {
  Compass,
  Grid,
  Box,
  Cpu,
  Navigation,
  Activity,
  MapPin,
  Layers,
  Users,
  ArrowRight,
  BookOpen,
  Sparkles,
  Clock,
  CheckCircle2,
  Sliders,
  ChevronRight,
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Compass,
  Grid,
  Box,
  Cpu,
  Navigation,
  Activity,
  MapPin,
  Layers,
  Users,
};

interface DomainOverviewClientProps {
  domain: DomainRegistryItem;
  lessons: LessonRegistryItem[];
}

export function DomainOverviewClient({
  domain,
  lessons,
}: DomainOverviewClientProps) {
  const { locale } = useLanguage();
  const isId = locale === 'id';

  const Icon = iconMap[domain.iconName] || Compass;
  const totalMinutes = lessons.reduce((acc, l) => acc + l.estimatedMinutes, 0);

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      {/* Domain Hero Header */}
      <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-300 text-xs font-mono">
            <Icon className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
            <span>{domain.levelRange}</span>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
            <span className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              {lessons.length} {isId ? 'Modul MDX' : 'MDX Modules'}
            </span>
            <span className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-1">
              <Clock className="w-3 h-3 text-cyan-500" />
              <span>{Math.round(totalMinutes / 60 * 10) / 10} {isId ? 'Jam' : 'Hours'}</span>
            </span>
          </div>
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 font-mono tracking-tight">
            {isId ? domain.titleId : domain.titleEn}
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-3xl leading-relaxed font-sans">
            {isId ? domain.descriptionId : domain.descriptionEn}
          </p>
        </div>

        <div className="pt-2 flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800/80">
          <span className="text-cyan-600 dark:text-cyan-400 font-bold uppercase">{isId ? 'Target Robot:' : 'Embodiment:'}</span>
          <span>{domain.primaryEmbodiment}</span>
        </div>
      </div>

      {/* Structured Modules & Topics List (Single Source of Truth) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-cyan-500" />
            <h2 className="text-base font-bold font-mono text-slate-900 dark:text-slate-100">
              {isId ? 'Daftar Modul & Materi Pembelajaran' : 'Curriculum Modules & Lessons'}
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            {isId ? 'Pilih materi untuk mulai belajar' : 'Select a lesson to begin learning'}
          </span>
        </div>

        {lessons.length === 0 ? (
          <div className="p-8 rounded-2xl glass-panel border border-slate-200 dark:border-slate-800 text-center space-y-2">
            <p className="text-sm font-mono text-slate-400">
              {isId ? 'Materi untuk domain ini sedang disiapkan.' : 'Lessons for this domain are coming soon.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {lessons.map((lesson, idx) => {
              const href = `/learn/${lesson.domain}/${lesson.slug}`;
              const title = isId ? lesson.titleId : lesson.titleEn;

              return (
                <div
                  key={lesson.id}
                  className="group p-5 sm:p-6 rounded-2xl glass-panel border border-slate-200 dark:border-slate-800/80 hover:border-cyan-500/40 transition-all hover:shadow-lg space-y-3"
                >
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-500 font-mono text-xs font-bold">
                        {idx + 1}
                      </span>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-semibold">
                        Level {lesson.level}
                      </span>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                          lesson.difficulty === 'Beginner'
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
                            : lesson.difficulty === 'Intermediate'
                            ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20'
                            : 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20'
                        }`}
                      >
                        {lesson.difficulty}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs font-mono text-slate-500 dark:text-slate-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{lesson.estimatedMinutes} min</span>
                      </span>
                      {lesson.interactive && (
                        <span className="flex items-center gap-1 text-cyan-600 dark:text-cyan-400">
                          <Sliders className="w-3.5 h-3.5" />
                          <span>Lab 60FPS</span>
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1.5 flex-1">
                      <Link
                        href={href}
                        className="text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-cyan-500 transition-colors font-mono block"
                      >
                        {title}
                      </Link>

                      {lesson.prerequisites && lesson.prerequisites.length > 0 && (
                        <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-500 dark:text-slate-400 flex-wrap">
                          <span>{isId ? 'Prasyarat:' : 'Prerequisites:'}</span>
                          {lesson.prerequisites.map((req) => (
                            <span
                              key={req}
                              className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-400"
                            >
                              {req}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <Link
                      href={href}
                      className="flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono font-bold bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30 group-hover:border-cyan-500/60 transition-all"
                    >
                      <span>{isId ? 'Buka Materi' : 'Start Lesson'}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

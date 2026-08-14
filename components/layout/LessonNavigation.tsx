'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { ArrowLeft, ArrowRight, Sparkles, BookOpen, CheckSquare } from 'lucide-react';

export interface LessonNavigationProps {
  prevLesson?: {
    title: string;
    href: string;
    domain?: string;
  };
  nextLesson?: {
    title: string;
    href: string;
    domain?: string;
  };
  suggestedExperiments?: string[];
  simulationChallenge?: string;
}

export function LessonNavigation({
  prevLesson,
  nextLesson,
  suggestedExperiments,
}: LessonNavigationProps) {
  const { locale } = useLanguage();
  const isId = locale === 'id';

  return (
    <div className="space-y-6 pt-6 border-t border-slate-200 dark:border-slate-800/80 my-8">
      {/* Interactive Experiments Checklist */}
      {suggestedExperiments && suggestedExperiments.length > 0 && (
        <div className="p-5 rounded-2xl glass-panel border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-mono text-xs font-bold">
            <Sparkles className="w-4 h-4" />
            <span>{isId ? 'Eksperimen yang Disarankan (Interactive Challenges):' : 'Suggested Interactive Experiments:'}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans text-slate-700 dark:text-slate-300">
            {suggestedExperiments.map((exp, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800"
              >
                <CheckSquare className="w-4 h-4 text-cyan-500 flex-shrink-0 mt-0.5" />
                <span>{exp}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Prev / Next Navigation Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {prevLesson ? (
          <Link
            href={prevLesson.href}
            className="group flex flex-col p-4 rounded-2xl glass-panel border border-slate-200 dark:border-slate-800 hover:border-cyan-500/40 transition-all text-left"
          >
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-500 dark:text-slate-400 mb-1">
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
              <span>{isId ? 'Pelajaran Sebelumnya' : 'Previous Lesson'}</span>
            </div>
            <span className="font-mono text-xs text-cyan-600 dark:text-cyan-400">{prevLesson.domain}</span>
            <strong className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
              {prevLesson.title}
            </strong>
          </Link>
        ) : (
          <div className="hidden sm:block" />
        )}

        {nextLesson ? (
          <Link
            href={nextLesson.href}
            className="group flex flex-col p-4 rounded-2xl glass-panel border border-slate-200 dark:border-slate-800 hover:border-cyan-500/40 transition-all text-right sm:text-right"
          >
            <div className="flex items-center justify-end gap-1.5 text-[11px] font-mono text-slate-500 dark:text-slate-400 mb-1">
              <span>{isId ? 'Pelajaran Selanjutnya' : 'Next Lesson'}</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </div>
            <span className="font-mono text-xs text-cyan-600 dark:text-cyan-400">{nextLesson.domain}</span>
            <strong className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
              {nextLesson.title}
            </strong>
          </Link>
        ) : (
          <div className="hidden sm:block" />
        )}
      </div>
    </div>
  );
}

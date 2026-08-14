'use client';

import React from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Compass, Target, HelpCircle, Sparkles, CheckCircle2 } from 'lucide-react';

export interface LessonOrientationProps {
  domain: string;
  lessonTitle: string;
  estimatedMinutes?: number;
  learningObjectives: string[];
  whyItMatters: string;
}

export function LessonOrientation({
  domain,
  lessonTitle,
  estimatedMinutes = 15,
  learningObjectives,
  whyItMatters,
}: LessonOrientationProps) {
  const { locale } = useLanguage();
  const isId = locale === 'id';

  return (
    <div className="rounded-2xl glass-panel p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-lg space-y-4 my-6">
      {/* Top Meta Bar: Where am I? */}
      <div className="flex items-center justify-between flex-wrap gap-2 text-xs font-mono">
        <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-bold">
          <Compass className="w-4 h-4" />
          <span>{domain}</span>
          <span className="text-slate-400 dark:text-slate-600">/</span>
          <span className="text-slate-900 dark:text-slate-100">{lessonTitle}</span>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
          <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            ⏱️ {estimatedMinutes} {isId ? 'menit belajar' : 'min study'}
          </span>
          <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-semibold">
            {isId ? 'Ramah Pemula' : 'Learner-First'}
          </span>
        </div>
      </div>

      {/* Grid: What am I learning? & Why does it matter? */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-200 dark:border-slate-800/80 text-xs">
        {/* Objectives */}
        <div className="space-y-2 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80">
          <h4 className="font-mono font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 text-xs">
            <Target className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>{isId ? 'Apa yang Akan Dipelajari? (Objectives)' : 'What You Will Learn:'}</span>
          </h4>
          <ul className="space-y-1.5 text-slate-600 dark:text-slate-300 font-sans">
            {learningObjectives.map((obj, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>{obj}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Why it matters */}
        <div className="space-y-2 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80">
          <h4 className="font-mono font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 text-xs">
            <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
            <span>{isId ? 'Mengapa Ini Penting? (Why It Matters)' : 'Why It Matters in Robotics:'}</span>
          </h4>
          <p className="text-slate-600 dark:text-slate-300 font-sans leading-relaxed text-xs sm:text-sm">
            {whyItMatters}
          </p>
        </div>
      </div>
    </div>
  );
}

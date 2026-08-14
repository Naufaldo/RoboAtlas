'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Compass, Target, HelpCircle, CheckCircle2, Clock, PlayCircle, BookOpen, Layers } from 'lucide-react';

export interface LessonOrientationProps {
  domain: string;
  lessonTitle: string;
  difficulty?: string;
  estimatedMinutes?: number;
  learningObjectives: string[];
  whyItMatters: string;
  progressionSteps?: { step: number; name: string }[];
}

export function LessonOrientation({
  domain,
  lessonTitle,
  difficulty = 'Beginner',
  estimatedMinutes = 35,
  learningObjectives,
  whyItMatters,
  progressionSteps,
}: LessonOrientationProps) {
  const { locale } = useLanguage();
  const isId = locale === 'id';

  const [activeStep, setActiveStep] = useState<number>(2); // Default to interactive lab step

  const defaultSteps = [
    {
      step: 1,
      name: isId ? 'Konsep & Intuisi' : 'Concept & Intuition',
    },
    {
      step: 2,
      name: isId ? 'Model Matematika & Formulasi' : 'Math Model & Formulations',
    },
    {
      step: 3,
      name: isId ? 'Simulasi Lab Interaktif' : 'Interactive Lab Simulation',
    },
    {
      step: 4,
      name: isId ? 'Implementasi & Aplikasi Robot' : 'TypeScript & Robot Applications',
    },
  ];

  const stepsToRender = progressionSteps && progressionSteps.length > 0 ? progressionSteps : defaultSteps;

  return (
    <div className="rounded-3xl glass-panel p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-md space-y-6 my-6">
      {/* Top Meta Bar: Where am I? + Calm Badges */}
      <div className="flex items-center justify-between flex-wrap gap-3 text-xs font-mono">
        <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-semibold">
          <Compass className="w-4 h-4 text-cyan-500" />
          <span className="uppercase tracking-wider">{domain}</span>
          <span className="text-slate-400 dark:text-slate-600">/</span>
          <span className="text-slate-900 dark:text-slate-100 font-bold">{lessonTitle}</span>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 flex items-center gap-1.5 font-mono">
            <Clock className="w-3.5 h-3.5 text-cyan-500" />
            <span>~{estimatedMinutes} {isId ? 'menit belajar' : 'min study'}</span>
          </span>

          <span
            className={`px-2.5 py-1 rounded-full font-mono text-[11px] font-semibold border ${
              difficulty === 'Beginner'
                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                : difficulty === 'Intermediate'
                ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30'
                : 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30'
            }`}
          >
            {difficulty}
          </span>
        </div>
      </div>

      {/* 4-Stage Learning Progress Stepper (Section 19) */}
      <div className="pt-3 border-t border-slate-200 dark:border-slate-800/80">
        <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mb-2 font-medium">
          {isId ? 'Alur Belajar Pelajaran (Learning Progression):' : 'Lesson Learning Progression:'}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {stepsToRender.map((s, idx) => (
            <div
              key={s.step}
              onClick={() => setActiveStep(idx)}
              className={`p-2.5 rounded-xl border text-xs font-mono transition-all cursor-pointer flex items-center gap-2 ${
                activeStep === idx
                  ? 'bg-cyan-500/15 border-cyan-500/40 text-cyan-700 dark:text-cyan-300 font-bold shadow-sm'
                  : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex-shrink-0">
                0{s.step}
              </span>
              <span className="truncate text-[11px]">{s.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Grid: What am I learning? & Why does it matter? */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1 text-xs">
        {/* Objectives (Section 17) */}
        <div className="space-y-2 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80">
          <h4 className="font-mono font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 text-xs">
            <Target className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>{isId ? 'Target Pembelajaran (What You Will Learn):' : 'Learning Objectives:'}</span>
          </h4>
          <ul className="space-y-1.5 text-slate-600 dark:text-slate-300 font-sans">
            {learningObjectives.map((obj, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">{obj}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Why it matters */}
        <div className="space-y-2 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80">
          <h4 className="font-mono font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 text-xs">
            <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
            <span>{isId ? 'Mengapa Ini Penting di Robotika?' : 'Why It Matters in Robotics:'}</span>
          </h4>
          <p className="text-slate-600 dark:text-slate-300 font-sans leading-relaxed text-xs sm:text-sm">
            {whyItMatters}
          </p>
        </div>
      </div>
    </div>
  );
}

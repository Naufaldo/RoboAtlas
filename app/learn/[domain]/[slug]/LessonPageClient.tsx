'use client';

import React from 'react';
import Link from 'next/link';
import { LessonContent } from '@/lib/mdx/content';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { MdxArticle } from '@/components/mdx/MdxArticle';
import { LessonOrientation } from '@/components/layout/LessonOrientation';
import { LessonNavigation } from '@/components/layout/LessonNavigation';
import { AcademicReferences } from '@/components/educational/AcademicReferences';
import {
  Compass,
  BookOpen,
  Clock,
  ArrowLeft,
  GraduationCap,
  Sparkles,
  Layers,
  CheckCircle2,
} from 'lucide-react';

interface LessonPageClientProps {
  domain: string;
  slug: string;
  enLesson: LessonContent | null;
  idLesson: LessonContent | null;
}

export function LessonPageClient({
  domain,
  slug,
  enLesson,
  idLesson,
}: LessonPageClientProps) {
  const { locale } = useLanguage();
  const isId = locale === 'id';

  const activeLesson = (isId ? idLesson : enLesson) || enLesson || idLesson;

  if (!activeLesson) {
    return (
      <div className="max-w-4xl mx-auto py-16 text-center space-y-4">
        <h1 className="text-2xl font-bold font-mono text-slate-100">Lesson Not Found</h1>
        <Link href="/learn" className="text-cyan-400 font-mono text-sm underline">
          Return to Curriculum
        </Link>
      </div>
    );
  }

  const { frontmatter, content } = activeLesson;

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      {/* Top Breadcrumb & Navigation */}
      <div className="flex items-center justify-between flex-wrap gap-3 border-b border-slate-200 dark:border-slate-800/80 pb-4">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
          <Link href="/learn" className="hover:text-cyan-500 transition-colors flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{isId ? 'Kurikulum' : 'Curriculum'}</span>
          </Link>
          <span>/</span>
          <Link href={`/learn/${domain}`} className="hover:text-cyan-500 transition-colors uppercase">
            {domain}
          </Link>
          <span>/</span>
          <span className="text-slate-900 dark:text-slate-200 font-semibold">{frontmatter.slug}</span>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30 flex items-center gap-1 font-semibold">
            <Clock className="w-3.5 h-3.5" />
            <span>~{frontmatter.estimatedMinutes} {isId ? 'menit' : 'mins'}</span>
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800">
            {frontmatter.difficulty}
          </span>
        </div>
      </div>

      {/* Lesson Orientation Card */}
      <LessonOrientation
        domain={domain.toUpperCase()}
        lessonTitle={frontmatter.title}
        estimatedMinutes={frontmatter.estimatedMinutes}
        learningObjectives={
          isId
            ? [
                'Memahami intuisi fisik dan representasi geometris konsep.',
                'Menurunkan formulasi matematis KaTeX langkah demi langkah.',
                'Melakukan eksperimen langsung pada simulator interaktif di browser.',
                'Menghubungkan teori ke implementasi nyata pada berbagai platform robot fisik.',
              ]
            : [
                'Understand the physical intuition and geometric representation.',
                'Derive KaTeX mathematical formulations step-by-step.',
                'Perform live experiments in the in-browser interactive simulator.',
                'Connect theoretical concepts to real-world multi-platform robot implementations.',
              ]
        }
        whyItMatters={
          isId
            ? 'Menjembatani persamaan teoritis di buku teks dengan komputasi motor numerik pada robot nyata.'
            : 'Bridges theoretical textbook equations with real-time numeric motor commands in physical autonomous robots.'
        }
      />

      {/* Main Rendered MDX Content */}
      <article className="p-6 sm:p-10 rounded-3xl glass-panel border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
        <MdxArticle content={content} />
      </article>

      {/* Literature References */}
      <AcademicReferences />

      {/* Next Step Navigation */}
      <LessonNavigation
        prevLesson={{
          title: isId ? 'Kembali ke Domain' : 'Back to Domain',
          href: `/learn/${domain}`,
          domain: domain.toUpperCase(),
        }}
        nextLesson={{
          title: isId ? 'Buka Lab Algoritma' : 'Explore Algorithm Lab',
          href: '/algorithms',
          domain: 'ALGORITHMS',
        }}
        suggestedExperiments={[
          isId
            ? 'Ubah parameter pada simulator di atas untuk melihat respon dinamika robot.'
            : 'Tweak parameters in the interactive simulator above to observe motion changes.',
          isId
            ? 'Cermati telemetri numerik untuk memvalidasi penurunan rumus matematika.'
            : 'Inspect numerical telemetry to validate the mathematical derivations.',
        ]}
      />
    </div>
  );
}

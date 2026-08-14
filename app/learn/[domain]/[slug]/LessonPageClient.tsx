'use client';

import React, { useState } from 'react';
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
  ListTree,
  ChevronRight,
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

  const [outlineOpen, setOutlineOpen] = useState(false);

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

  // Extract H2 headings for the contextual outline (Section 14)
  const headings = content
    .split('\n')
    .filter((line) => line.startsWith('## '))
    .map((line) => line.replace('## ', '').trim());

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16">
      {/* Top Breadcrumb Trail (Section 15) */}
      <div className="flex items-center justify-between flex-wrap gap-3 border-b border-slate-200 dark:border-slate-800/80 pb-4">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
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
        </nav>

        {/* Outline toggle button for mobile / desktop */}
        {headings.length > 0 && (
          <button
            onClick={() => setOutlineOpen(!outlineOpen)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-mono bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-cyan-500/40 transition-all"
          >
            <ListTree className="w-3.5 h-3.5 text-cyan-500" />
            <span>{isId ? 'Daftar Isi' : 'Lesson Outline'}</span>
          </button>
        )}
      </div>

      {/* Collapsible Lesson Outline Bar (Section 14) */}
      {outlineOpen && headings.length > 0 && (
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/90 border border-cyan-500/30 text-xs font-mono space-y-2 shadow-lg animate-fade-in">
          <div className="font-bold text-cyan-600 dark:text-cyan-400 flex items-center gap-1.5">
            <ListTree className="w-4 h-4" />
            <span>{isId ? 'Navigasi Bab Pelajaran:' : 'Lesson Sections:'}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 pt-1">
            {headings.map((h, idx) => (
              <div
                key={idx}
                className="flex items-center gap-1.5 p-2 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-cyan-500/50"
              >
                <ChevronRight className="w-3.5 h-3.5 text-cyan-500 flex-shrink-0" />
                <span className="truncate">{h}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Calm Lesson Header & Orientation (Sections 16, 17, 18, 19) */}
      <LessonOrientation
        domain={domain.toUpperCase()}
        lessonTitle={frontmatter.title}
        difficulty={frontmatter.difficulty}
        estimatedMinutes={frontmatter.estimatedMinutes}
        learningObjectives={
          isId
            ? [
                'Memahami intuisi fisik dan representasi geometris konsep robotika.',
                'Menurunkan formulasi matematis KaTeX dan satuan dimensi langkah demi langkah.',
                'Melakukan eksperimen langsung pada simulator interaktif 60 FPS di browser.',
                'Menghubungkan model matematika ke implementasi nyata pada robot fisik.',
              ]
            : [
                'Understand physical intuition and coordinate representations in robotics.',
                'Derive KaTeX mathematical formulations and dimensional units step-by-step.',
                'Run live step-by-step simulations in the 60 FPS in-browser laboratory.',
                'Connect theoretical models to real-world multi-platform physical robots.',
              ]
        }
        whyItMatters={
          isId
            ? 'Menjembatani persamaan teoritis di buku teks dengan komputasi motor numerik pada robot nyata.'
            : 'Bridges theoretical textbook equations with real-time numeric motor commands in physical autonomous robots.'
        }
      />

      {/* Main Rendered MDX Content with Reading Column Focus (Sections 9, 10) */}
      <article className="p-6 sm:p-10 rounded-3xl glass-panel border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
        <MdxArticle content={content} />
      </article>

      {/* Literature References */}
      <AcademicReferences />

      {/* Next Step Navigation */}
      <LessonNavigation
        prevLesson={{
          title: isId ? 'Kembali ke Kurikulum' : 'Back to Curriculum',
          href: '/learn',
        }}
        nextLesson={{
          title: isId ? 'Laboratorium Simulasi' : 'Interactive Labs',
          href: '/labs',
        }}
        simulationChallenge={
          isId
            ? 'Uji parameter pada simulator di atas dan amati konvergensi grafiknya.'
            : 'Adjust the simulator parameters above to observe real-time dynamic convergence.'
        }
      />
    </div>
  );
}

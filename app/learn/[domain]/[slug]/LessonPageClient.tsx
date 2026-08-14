'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { LessonContent } from '@/lib/mdx/content';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { MdxArticle } from '@/components/mdx/MdxArticle';
import { LessonOrientation } from '@/components/layout/LessonOrientation';
import { LessonNavigation } from '@/components/layout/LessonNavigation';
import { AcademicReferences } from '@/components/educational/AcademicReferences';
import { LearningSidebar, SectionHeading } from '@/components/layout/LearningSidebar';
import { getLessonPedagogy } from '@/lib/curriculum/lesson-metadata';
import {
  Compass,
  ArrowLeft,
  ListTree,
  Sliders,
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

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

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
  const headings: SectionHeading[] = content
    .split('\n')
    .filter((line) => line.startsWith('## '))
    .map((line) => {
      const title = line.replace('## ', '').trim();
      const id = title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');
      return { id, title, level: 2 };
    });

  // Dynamic pedagogical objectives and context tailored per lesson
  const pedagogy = getLessonPedagogy(frontmatter.slug, isId);

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-16">
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

        {/* Mobile / Tablet Drawer Trigger (Section 14) */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-cyan-500/40 transition-all"
          >
            <ListTree className="w-3.5 h-3.5 text-cyan-500" />
            <span>{isId ? 'Navigasi & Daftar Isi' : 'Navigation & Outline'}</span>
          </button>
        </div>
      </div>

      {/* Main 2-Column Responsive Layout (Main Content + Contextual Learning Sidebar) */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Main Reading Column Focus (Sections 9, 10) */}
        <div className="flex-1 min-w-0 space-y-8 w-full">
          {/* Dynamic Tailored Lesson Orientation Card (Sections 16, 17, 18, 19) */}
          <LessonOrientation
            domain={domain.toUpperCase()}
            lessonTitle={frontmatter.title}
            difficulty={frontmatter.difficulty}
            estimatedMinutes={frontmatter.estimatedMinutes}
            learningObjectives={pedagogy.learningObjectives}
            whyItMatters={pedagogy.whyItMatters}
            progressionSteps={pedagogy.progressionSteps}
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
              title: isId ? 'Kembali ke Kurikulum' : 'Back to Curriculum',
              href: '/learn',
            }}
            nextLesson={{
              title: isId ? 'Laboratorium Simulasi' : 'Interactive Labs',
              href: '/labs',
            }}
            simulationChallenge={
              isId
                ? 'Uji parameter pada simulator di atas dan amati konvergensi grafiknya secara langsung.'
                : 'Adjust the simulator parameters above to observe real-time dynamic convergence.'
            }
          />
        </div>

        {/* Desktop Sticky Learning Sidebar (Section 14: Contextual Outline + Master Levels) */}
        <div className="hidden lg:block">
          <LearningSidebar
            currentDomain={domain}
            currentSlug={frontmatter.slug}
            headings={headings}
          />
        </div>
      </div>

      {/* Mobile Slide-Over Drawer for Learning Sidebar */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-slate-950/80 backdrop-blur-sm flex justify-end p-4">
          <div className="w-full max-w-sm h-full overflow-y-auto">
            <LearningSidebar
              currentDomain={domain}
              currentSlug={frontmatter.slug}
              headings={headings}
              isMobileOpen={true}
              onCloseMobile={() => setMobileSidebarOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

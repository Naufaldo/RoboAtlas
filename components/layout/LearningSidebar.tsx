'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { MASTER_CURRICULUM_LEVELS } from '@/lib/navigation/master-curriculum-levels';
import {
  ListTree,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Layers,
  Sparkles,
  Compass,
  Cpu,
  GraduationCap,
  Sliders,
  X,
} from 'lucide-react';

export interface SectionHeading {
  id: string;
  title: string;
  level: number;
}

interface LearningSidebarProps {
  currentDomain: string;
  currentSlug: string;
  headings: SectionHeading[];
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export function LearningSidebar({
  currentDomain,
  currentSlug,
  headings,
  isMobileOpen = false,
  onCloseMobile,
}: LearningSidebarProps) {
  const { locale } = useLanguage();
  const isId = locale === 'id';

  const [activeTab, setActiveTab] = useState<'outline' | 'curriculum'>('outline');
  const [activeSectionId, setActiveSectionId] = useState<string>('');

  // Scrollspy to detect active section in viewport
  useEffect(() => {
    if (headings.length === 0) return;

    const handleScroll = () => {
      const scrollY = window.scrollY + 160;
      let current = headings[0]?.id || '';

      for (const h of headings) {
        const el = document.getElementById(h.id);
        if (el) {
          const top = el.offsetTop;
          if (scrollY >= top) {
            current = h.id;
          }
        }
      }
      setActiveSectionId(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [headings]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <aside className="w-full lg:w-72 flex-shrink-0">
      <div className="sticky top-20 rounded-3xl glass-panel border border-slate-200 dark:border-slate-800 p-4 space-y-4 shadow-xl">
        {/* Header Tabs */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800/80 pb-3">
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900/80 p-1 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs font-mono w-full">
            <button
              onClick={() => setActiveTab('outline')}
              className={`flex-1 py-1.5 px-2 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'outline'
                  ? 'bg-white dark:bg-slate-800 text-cyan-600 dark:text-cyan-400 font-bold shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <ListTree className="w-3.5 h-3.5" />
              <span>{isId ? 'Bab' : 'Outline'}</span>
            </button>

            <button
              onClick={() => setActiveTab('curriculum')}
              className={`flex-1 py-1.5 px-2 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'curriculum'
                  ? 'bg-white dark:bg-slate-800 text-cyan-600 dark:text-cyan-400 font-bold shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{isId ? 'Kurikulum' : 'Levels'}</span>
            </button>
          </div>

          {onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="lg:hidden ml-2 p-1.5 rounded-xl text-slate-400 hover:text-slate-200 bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Tab 1: Lesson Outline (Section 14) */}
        {activeTab === 'outline' && (
          <div className="space-y-1.5 max-h-[calc(100vh-240px)] overflow-y-auto pr-1 text-xs font-mono scrollbar-thin">
            <div className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider px-2 font-bold mb-2">
              {isId ? 'Daftar Isi Pelajaran' : 'Lesson Content Sections'}
            </div>

            {headings.length === 0 ? (
              <p className="text-[11px] text-slate-400 px-2 py-4 italic">
                {isId ? 'Tidak ada sub-bab terdeteksi.' : 'No sub-sections detected.'}
              </p>
            ) : (
              headings.map((h, idx) => {
                const isActive = activeSectionId === h.id;
                return (
                  <button
                    key={idx}
                    onClick={() => scrollToSection(h.id)}
                    className={`w-full text-left p-2 rounded-xl flex items-start gap-2 transition-all ${
                      isActive
                        ? 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 font-bold border border-cyan-500/30'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900/60 hover:text-slate-900 dark:hover:text-slate-200 border border-transparent'
                    }`}
                  >
                    <span
                      className={`w-4 h-4 rounded-md flex items-center justify-center text-[9px] flex-shrink-0 mt-0.5 ${
                        isActive
                          ? 'bg-cyan-500 text-slate-950 font-bold'
                          : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <span className="leading-tight line-clamp-2 text-[11px]">{h.title}</span>
                  </button>
                );
              })
            )}

            {/* Quick anchors */}
            <div className="pt-3 mt-3 border-t border-slate-200 dark:border-slate-800/80 space-y-1 text-[11px]">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="w-full text-left px-2 py-1 text-slate-500 hover:text-cyan-500 flex items-center gap-1.5"
              >
                <ChevronRight className="w-3 h-3 text-cyan-500" />
                <span>{isId ? 'Kembali ke Atas' : 'Back to Top'}</span>
              </button>
              <Link
                href="/labs"
                className="w-full text-left px-2 py-1 text-slate-500 hover:text-cyan-500 flex items-center gap-1.5"
              >
                <Sliders className="w-3 h-3 text-cyan-500" />
                <span>{isId ? 'Laboratorium Simulasi' : 'Interactive Labs'}</span>
              </Link>
            </div>
          </div>
        )}

        {/* Tab 2: Full Master Curriculum Levels (Section 14 & 18) */}
        {activeTab === 'curriculum' && (
          <div className="space-y-3 max-h-[calc(100vh-240px)] overflow-y-auto pr-1 text-xs font-mono scrollbar-thin">
            <div className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider px-2 font-bold">
              {isId ? 'Pohon Kurikulum Lengkap' : 'Full Curriculum Progression'}
            </div>

            {MASTER_CURRICULUM_LEVELS.map((lvl) => {
              const hasCurrentLesson = lvl.modules.some((m) => m.href.includes(currentSlug));

              return (
                <div
                  key={lvl.id}
                  className={`p-2.5 rounded-2xl border transition-all ${
                    hasCurrentLesson
                      ? 'bg-cyan-500/5 border-cyan-500/30'
                      : 'bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5 text-[11px]">
                    <span className="font-bold text-slate-900 dark:text-slate-200 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-cyan-500" />
                      <span>Level {lvl.level}</span>
                    </span>
                    <span className="text-[10px] text-slate-500">{lvl.badge}</span>
                  </div>

                  <div className="space-y-1">
                    {lvl.modules.map((mod) => {
                      const isCurrent = mod.href.includes(currentSlug);
                      return (
                        <Link
                          key={mod.id}
                          href={mod.href}
                          onClick={onCloseMobile}
                          className={`p-1.5 rounded-xl flex items-center justify-between gap-2 text-[11px] transition-all ${
                            isCurrent
                              ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-200/60 dark:hover:bg-slate-800/60'
                          }`}
                        >
                          <span className="truncate">{isId ? mod.titleId : mod.titleEn}</span>
                          {mod.isInteractive && (
                            <span
                              className={`text-[9px] px-1 rounded flex-shrink-0 ${
                                isCurrent ? 'bg-slate-950/20 text-slate-950' : 'bg-cyan-500/10 text-cyan-500'
                              }`}
                            >
                              SIM
                            </span>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </aside>
  );
}

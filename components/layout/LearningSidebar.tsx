'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import {
  ListTree,
  ChevronRight,
  Sparkles,
  Compass,
  Sliders,
  X,
  BookOpen,
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
    <aside className="w-full lg:w-64 flex-shrink-0">
      <div className="sticky top-20 rounded-2xl glass-panel border border-slate-200 dark:border-slate-800 p-4 space-y-3.5 shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800/80 pb-3">
          <div className="flex items-center gap-2">
            <ListTree className="w-4 h-4 text-cyan-500" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
              {isId ? 'Daftar Bab Materi' : 'On This Page'}
            </span>
          </div>

          {isMobileOpen && onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Section Headings Scrollspy List */}
        <div className="space-y-1 max-h-[calc(100vh-16rem)] overflow-y-auto pr-1">
          {headings.length === 0 ? (
            <p className="text-xs font-mono text-slate-500 py-2">
              {isId ? 'Membaca dokumen...' : 'Reading article...'}
            </p>
          ) : (
            headings.map((heading, idx) => {
              const isActive = activeSectionId === heading.id;

              return (
                <button
                  key={heading.id || idx}
                  onClick={() => scrollToSection(heading.id)}
                  className={`w-full text-left flex items-start gap-2 px-2.5 py-1.5 rounded-xl text-xs font-mono transition-all ${
                    isActive
                      ? 'bg-cyan-500/15 text-cyan-600 dark:text-cyan-300 border border-cyan-500/40 font-semibold shadow-sm shadow-cyan-500/10'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${
                      isActive ? 'bg-cyan-500' : 'bg-slate-400 dark:bg-slate-600'
                    }`}
                  />
                  <span className="truncate leading-relaxed">{heading.title}</span>
                </button>
              );
            })
          )}
        </div>

        {/* Domain Shortcut */}
        <div className="pt-3 border-t border-slate-200 dark:border-slate-800/80">
          <Link
            href={`/learn/${currentDomain}`}
            className="flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400 hover:text-cyan-500 transition-colors"
          >
            <span>{isId ? 'Kembali ke Ikhtisar Domain' : 'Back to Domain Hub'}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </aside>
  );
}

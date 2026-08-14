'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DOMAIN_REGISTRY, LESSON_REGISTRY } from '@/lib/curriculum/registry';
import { useLanguage } from '@/lib/i18n/LanguageContext';
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
  ChevronDown,
  ChevronRight,
  BookOpen,
  Sliders,
  Sparkles,
  CheckCircle2,
  GraduationCap,
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

export function Sidebar() {
  const pathname = usePathname();
  const { locale, t } = useLanguage();
  const isId = locale === 'id';

  // Parse current active domain and slug from pathname: e.g. /learn/control/pure-pursuit-path-tracking
  const pathParts = pathname.split('/').filter(Boolean); // ['learn', 'control', 'slug']
  const currentDomainSlug = pathParts[1] || '';
  const currentLessonSlug = pathParts[2] || '';

  const [expandedDomain, setExpandedDomain] = useState<string>(
    currentDomainSlug || 'fundamentals'
  );

  return (
    <aside className="w-full lg:w-72 flex-shrink-0">
      <div className="sticky top-20 rounded-2xl glass-panel p-4 shadow-xl border border-slate-200 dark:border-slate-800 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800/80">
          <Link
            href="/learn"
            className="flex items-center gap-2 group"
          >
            <div className="w-6 h-6 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-500 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="text-xs font-mono font-bold text-slate-900 dark:text-slate-100 group-hover:text-cyan-500 transition-colors block">
                {isId ? 'Kurikulum Master' : 'Master Curriculum'}
              </span>
              <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 block">
                Level 0 – 20 • 28 {isId ? 'Materi' : 'Lessons'}
              </span>
            </div>
          </Link>
        </div>

        {/* Domain Navigation & MDX Lesson Tree */}
        <nav className="space-y-1.5 max-h-[calc(100vh-14rem)] overflow-y-auto pr-1">
          {DOMAIN_REGISTRY.map((domain) => {
            const Icon = iconMap[domain.iconName] || Compass;
            const isCurrentDomain = currentDomainSlug === domain.slug;
            const isExpanded = expandedDomain === domain.slug || isCurrentDomain;
            const domainLessons = LESSON_REGISTRY.filter((l) => l.domain === domain.slug);

            return (
              <div key={domain.slug} className="space-y-1">
                {/* Domain Header / Accordion Button */}
                <div
                  className={`group flex items-center justify-between px-3 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                    isCurrentDomain
                      ? 'bg-cyan-500/15 text-cyan-600 dark:text-cyan-300 border border-cyan-500/40 font-semibold'
                      : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-900/60 border border-transparent'
                  }`}
                  onClick={() => setExpandedDomain(isExpanded && !isCurrentDomain ? '' : domain.slug)}
                >
                  <Link
                    href={`/learn/${domain.slug}`}
                    className="flex items-center gap-2 truncate flex-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Icon
                      className={`w-3.5 h-3.5 flex-shrink-0 ${
                        isCurrentDomain ? 'text-cyan-500' : 'text-slate-400 dark:text-slate-500'
                      }`}
                    />
                    <span className="truncate">{isId ? domain.titleId : domain.titleEn}</span>
                  </Link>

                  <button
                    type="button"
                    onClick={() => setExpandedDomain(isExpanded ? '' : domain.slug)}
                    className="p-1 hover:text-cyan-500 transition-colors"
                  >
                    {isExpanded ? (
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    )}
                  </button>
                </div>

                {/* Sub-item Lessons List under this domain */}
                {isExpanded && domainLessons.length > 0 && (
                  <div className="pl-4 pr-1 py-1 space-y-1 border-l-2 border-cyan-500/20 ml-3">
                    {domainLessons.map((lesson) => {
                      const lessonHref = `/learn/${domain.slug}/${lesson.slug}`;
                      const isLessonActive = currentLessonSlug === lesson.slug;
                      const title = isId ? lesson.titleId : lesson.titleEn;

                      return (
                        <Link
                          key={lesson.id}
                          href={lessonHref}
                          className={`group/item flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[11px] font-mono transition-all ${
                            isLessonActive
                              ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm shadow-cyan-500/20'
                              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900/60'
                          }`}
                        >
                          <div className="flex items-center gap-1.5 truncate">
                            <span
                              className={`text-[9px] px-1 py-0.2 rounded font-bold ${
                                isLessonActive
                                  ? 'bg-slate-950 text-cyan-300'
                                  : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                              }`}
                            >
                              L{lesson.level}
                            </span>
                            <span className="truncate">{title}</span>
                          </div>

                          {lesson.interactive && (
                            <Sliders
                              className={`w-3 h-3 flex-shrink-0 ${
                                isLessonActive ? 'text-slate-950' : 'text-cyan-500 opacity-60 group-hover/item:opacity-100'
                              }`}
                            />
                          )}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Quick Links Footer */}
        <div className="pt-3 border-t border-slate-200 dark:border-slate-800/80 space-y-2 text-xs font-mono">
          <Link
            href="/labs"
            className="flex items-center justify-between px-3 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/15 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 font-bold transition-all"
          >
            <div className="flex items-center gap-2">
              <Sliders className="w-3.5 h-3.5" />
              <span>{isId ? 'Laboratorium Simulasi' : 'Interactive Labs'}</span>
            </div>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400">
              18 Labs
            </span>
          </Link>
        </div>
      </div>
    </aside>
  );
}

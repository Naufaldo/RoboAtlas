'use client';

import React from 'react';
import Link from 'next/link';
import { DOMAINS } from '@/lib/navigation/curriculum';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import {
  Compass,
  MapPin,
  Layers,
  RotateCcw,
  Navigation,
  Cpu,
  Users,
  ArrowRight,
  BookOpen,
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Compass,
  MapPin,
  Layers,
  RotateCcw,
  Navigation,
  Cpu,
  Users,
};

export default function LearnPage() {
  const { t } = useLanguage();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800/80 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-300 text-xs font-mono mb-3">
          <BookOpen className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
          <span>{t.domainsSection.tag}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
          {t.domainsSection.title}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-2xl leading-relaxed">
          {t.domainsSection.subtitle}
        </p>
      </div>

      {/* Domain Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {DOMAINS.map((domain) => {
          const Icon = iconMap[domain.iconName] || Navigation;
          return (
            <div
              key={domain.slug}
              className="p-6 rounded-2xl glass-panel glass-panel-hover flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/15 to-blue-600/15 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800/80 text-cyan-700 dark:text-cyan-300 border border-slate-300 dark:border-slate-700">
                    {domain.milestone}
                  </span>
                </div>

                <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">{domain.title}</h2>
                <p className="text-xs font-mono text-cyan-600 dark:text-cyan-400/80 mb-2">{domain.subtitle}</p>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{domain.description}</p>

                {/* Topics list */}
                <div className="mt-4 space-y-1.5 pt-3.5 border-t border-slate-200 dark:border-slate-800/80">
                  <span className="text-[11px] font-mono font-semibold text-slate-800 dark:text-slate-200">
                    {t.domainsSection.keyTopics}
                  </span>
                  <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1.5">
                    {domain.topics.map((t) => (
                      <li key={t.title} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 dark:bg-cyan-400 flex-shrink-0" />
                        <span>{t.title}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                  {domain.status}
                </span>
                <Link
                  href={`/learn/${domain.slug}`}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 hover:bg-cyan-500/20 font-mono text-xs font-semibold border border-cyan-500/30 transition-all shadow-sm"
                >
                  <span>{t.domainsSection.openDomain}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

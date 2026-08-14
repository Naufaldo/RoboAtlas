'use client';

import React from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { BookOpen, ExternalLink, Bookmark, GraduationCap } from 'lucide-react';

export interface ReferenceItem {
  id: number;
  authors: string;
  title: string;
  publisher: string;
  year: number;
  chapterCoverage: string;
  doiOrUrl?: string;
}

export interface AcademicReferencesProps {
  references?: ReferenceItem[];
}

const DEFAULT_REFERENCES: ReferenceItem[] = [
  {
    id: 1,
    authors: 'Mordechai Ben-Ari & Francesco Mondada',
    title: 'Elements of Robotics',
    publisher: 'Springer Open',
    year: 2018,
    chapterCoverage: 'Ch. 1–5: Introduction, Reactive Vehicles, Sensors, Odometry, and Spatial Control.',
    doiOrUrl: 'https://doi.org/10.1007/978-3-319-62533-1',
  },
  {
    id: 2,
    authors: 'Deepak Herath & David St-Onge',
    title: 'Foundations of Robotics: A Multidisciplinary Approach with Python and ROS',
    publisher: 'Springer',
    year: 2022,
    chapterCoverage: 'Ch. 2, 4–6: Planar/Spatial Transformations, Jacobians, Manipulators, and Dynamics.',
    doiOrUrl: 'https://doi.org/10.1007/978-981-19-1983-1',
  },
  {
    id: 3,
    authors: 'Steven M. LaValle',
    title: 'Planning Algorithms',
    publisher: 'Cambridge University Press',
    year: 2006,
    chapterCoverage: 'Ch. 2, 14: Discrete Graph Search, C-Space, and Trajectory Planning.',
    doiOrUrl: 'https://planning.cs.uiuc.edu/',
  },
];

export function AcademicReferences({ references = DEFAULT_REFERENCES }: AcademicReferencesProps) {
  const { locale } = useLanguage();
  const isId = locale === 'id';

  return (
    <div className="rounded-2xl glass-panel border border-slate-200 dark:border-slate-800 p-5 sm:p-6 space-y-4 my-8 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2 text-xs font-mono border-b border-slate-200 dark:border-slate-800/80 pb-3">
        <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-bold">
          <GraduationCap className="w-4 h-4" />
          <span>{isId ? 'Daftar Referensi & Literatur Akademik' : 'Academic Literature & Textbook References'}</span>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
          Peer-Reviewed & Open Access
        </span>
      </div>

      {/* Reference List Cards */}
      <div className="space-y-3">
        {references.map((ref) => (
          <div
            key={ref.id}
            className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 space-y-1.5 text-xs font-sans hover:border-cyan-500/30 transition-all"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2 font-mono text-[11px] text-cyan-600 dark:text-cyan-400 font-bold">
                <span className="px-1.5 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
                  [{ref.id}]
                </span>
                <span>{ref.authors} ({ref.year})</span>
              </div>

              {ref.doiOrUrl && (
                <a
                  href={ref.doiOrUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 font-mono text-[10px] text-slate-500 hover:text-cyan-500 transition-colors"
                >
                  <span>DOI / Link</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>

            <h4 className="font-semibold text-slate-900 dark:text-slate-100 text-xs sm:text-sm">
              <em>{ref.title}</em>. {ref.publisher}.
            </h4>

            <p className="text-slate-500 dark:text-slate-400 text-[11px] font-mono flex items-center gap-1.5 pt-1">
              <Bookmark className="w-3 h-3 text-emerald-500 flex-shrink-0" />
              <span>{ref.chapterCoverage}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

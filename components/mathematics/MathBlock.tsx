'use client';

import React, { useMemo } from 'react';
import katex from 'katex';
import { Info } from 'lucide-react';

interface MathBlockProps {
  latex: string;
  displayMode?: boolean;
  explanation?: string;
  title?: string;
  className?: string;
}

export function MathBlock({
  latex,
  displayMode = true,
  explanation,
  title,
  className = '',
}: MathBlockProps) {
  const html = useMemo(() => {
    try {
      return katex.renderToString(latex, {
        displayMode,
        throwOnError: false,
        output: 'htmlAndMathml',
      });
    } catch (err) {
      console.error('KaTeX rendering error:', err);
      return `<span class="text-rose-500 font-mono text-xs">[Math Render Error: ${latex}]</span>`;
    }
  }, [latex, displayMode]);

  if (!displayMode) {
    return (
      <span
        className={`inline-block mx-1 font-mono text-cyan-600 dark:text-cyan-300 font-semibold ${className}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return (
    <div
      className={`my-3 p-3.5 sm:p-4 rounded-xl bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm backdrop-blur-sm transition-all hover:border-cyan-500/40 w-full overflow-hidden ${className}`}
    >
      {title && (
        <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-slate-200 dark:border-slate-800/80">
          <span className="text-[11px] sm:text-xs font-mono font-bold text-cyan-700 dark:text-cyan-400 uppercase tracking-wider truncate">
            {title}
          </span>
          <span className="text-[10px] text-slate-500 font-mono flex-shrink-0">KaTeX</span>
        </div>
      )}

      {/* Touch-scrollable mathematical display container */}
      <div className="w-full overflow-x-auto scrollbar-thin py-2 text-slate-900 dark:text-slate-100 text-sm sm:text-base md:text-lg flex justify-start sm:justify-center px-1">
        <div
          className="inline-block min-w-max"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>

      {explanation && (
        <div className="mt-2.5 pt-2 border-t border-slate-200 dark:border-slate-800/60 flex items-start gap-2 text-[11px] sm:text-xs text-slate-600 dark:text-slate-400">
          <Info className="w-3.5 h-3.5 mt-0.5 text-cyan-600 dark:text-cyan-400 flex-shrink-0" />
          <span>{explanation}</span>
        </div>
      )}
    </div>
  );
}

export function InlineMath({ latex }: { latex: string }) {
  return <MathBlock latex={latex} displayMode={false} />;
}

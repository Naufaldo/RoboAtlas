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
      return `<span class="text-rose-400 font-mono text-xs">[Math Render Error: ${latex}]</span>`;
    }
  }, [latex, displayMode]);

  if (!displayMode) {
    return (
      <span
        className={`inline-block mx-1 font-mono text-cyan-300 ${className}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return (
    <div
      className={`my-4 p-4 rounded-xl bg-slate-900/90 border border-slate-800 shadow-md backdrop-blur-sm transition-all hover:border-slate-700 ${className}`}
    >
      {title && (
        <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800/80">
          <span className="text-xs font-mono font-medium text-cyan-400 uppercase tracking-wider">
            {title}
          </span>
          <span className="text-[10px] text-slate-500 font-mono">KaTeX Rendered</span>
        </div>
      )}

      <div
        className="overflow-x-auto py-2 text-slate-100 flex justify-center text-base sm:text-lg"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      {explanation && (
        <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-start gap-2 text-xs text-slate-400">
          <Info className="w-3.5 h-3.5 mt-0.5 text-cyan-400 flex-shrink-0" />
          <span>{explanation}</span>
        </div>
      )}
    </div>
  );
}

export function InlineMath({ latex }: { latex: string }) {
  return <MathBlock latex={latex} displayMode={false} />;
}

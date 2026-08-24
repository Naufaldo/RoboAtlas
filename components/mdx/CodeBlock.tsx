'use client';

import React, { useState } from 'react';
import { Check, Copy, Terminal } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

interface CodeBlockProps {
  code: string;
  language?: string;
}

export function CodeBlock({ code, language = 'text' }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const { locale } = useLanguage();
  const isId = locale === 'id';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore clipboard error
    }
  };

  return (
    <div className="my-6 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-900/95 dark:bg-slate-950 text-slate-100 shadow-xl">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-800/80 dark:bg-slate-900/90 border-b border-slate-700/60 dark:border-slate-800 text-xs font-mono">
        <div className="flex items-center gap-2 text-cyan-400">
          <Terminal className="w-3.5 h-3.5 text-cyan-400" />
          <span className="uppercase font-bold tracking-wider text-[11px]">
            {language}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-700/60 hover:bg-slate-700 text-slate-300 hover:text-white transition-all text-[11px]"
          title={isId ? 'Salin Kode' : 'Copy Code'}
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-emerald-400" />
              <span className="text-emerald-400 font-semibold">
                {isId ? 'Tersalin!' : 'Copied!'}
              </span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3 text-slate-400" />
              <span>{isId ? 'Salin' : 'Copy'}</span>
            </>
          )}
        </button>
      </div>

      {/* Code content */}
      <div className="p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed text-slate-200 bg-slate-950/70">
        <pre className="m-0 font-mono">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import { MathBlock } from '@/components/mathematics/MathBlock';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Code2, ArrowDown, Cpu, Sparkles } from 'lucide-react';

export interface VariableMapping {
  mathSymbol: string;
  codeIdentifier: string;
  explanation: string;
}

export interface MathCodeBridgeProps {
  title: string;
  mathLatex: string;
  codeSnippet: string;
  language?: string;
  explanation: string;
  mappings: VariableMapping[];
}

export function MathCodeBridge({
  title,
  mathLatex,
  codeSnippet,
  language = 'typescript',
  explanation,
  mappings,
}: MathCodeBridgeProps) {
  const { locale } = useLanguage();
  const isId = locale === 'id';

  return (
    <div className="rounded-2xl glass-panel border border-slate-200 dark:border-slate-800 p-5 sm:p-6 space-y-5 my-6 shadow-xl">
      {/* Title */}
      <div className="flex items-center justify-between flex-wrap gap-2 text-xs font-mono border-b border-slate-200 dark:border-slate-800/80 pb-3">
        <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-bold">
          <Code2 className="w-4 h-4" />
          <span>{title}</span>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 font-semibold">
          {isId ? 'Jembatan Matematika ↔ Kode' : 'Math ↔ Code Bridge'}
        </span>
      </div>

      {/* 2-Column or Stacked Math vs Code Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        {/* Left: Mathematical Formulation */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 space-y-2">
          <strong className="text-[11px] font-mono uppercase text-cyan-600 dark:text-cyan-400 block">
            {isId ? '1. Formulasi Matematika Teoretis:' : '1. Theoretical Mathematics:'}
          </strong>
          <div className="py-2">
            <MathBlock latex={mathLatex} displayMode={true} />
          </div>
        </div>

        {/* Right: Runtime TypeScript Implementation */}
        <div className="p-4 rounded-xl bg-slate-900 text-slate-100 border border-slate-800 space-y-2 font-mono text-xs">
          <strong className="text-[11px] uppercase text-emerald-400 block flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5" />
            <span>{isId ? '2. Implementasi Runtime TypeScript:' : '2. Runtime TypeScript Code:'}</span>
          </strong>
          <pre className="p-3 rounded-lg bg-slate-950/80 text-emerald-300 overflow-x-auto text-[11px] leading-relaxed border border-slate-800/80">
            <code>{codeSnippet}</code>
          </pre>
        </div>
      </div>

      {/* Pedagogical Explanation */}
      <div className="p-3.5 rounded-xl bg-cyan-500/5 dark:bg-cyan-950/20 border border-cyan-500/20 text-xs font-sans text-slate-700 dark:text-slate-300 leading-relaxed">
        <strong className="text-cyan-700 dark:text-cyan-400 font-mono block text-xs uppercase mb-1">
          {isId ? 'Korelasi Langsung Matematika ke Kode:' : 'Direct Math-to-Code Mapping:'}
        </strong>
        {explanation}
      </div>

      {/* Variable Mapping Table */}
      <div className="space-y-2">
        <strong className="text-xs font-mono font-bold text-slate-900 dark:text-slate-100 block">
          {isId ? 'Pemetaan Simbol Matematika ke Variabel Kode:' : 'Mathematical Symbol to Code Identifier Mapping:'}
        </strong>
        <div className="overflow-x-auto scrollbar-thin rounded-xl border border-slate-200 dark:border-slate-800">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-900/90 text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800">
                <th className="py-2 px-3">{isId ? 'Simbol Matematika' : 'Math Symbol'}</th>
                <th className="py-2 px-3">{isId ? 'Identifier Kode (TS)' : 'Code Variable (TS)'}</th>
                <th className="py-2 px-3">{isId ? 'Penjelasan Operasi' : 'Operation Meaning'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800/60 bg-white dark:bg-slate-950/60 text-slate-600 dark:text-slate-300">
              {mappings.map((m, idx) => (
                <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-900/40">
                  <td className="py-2 px-3 font-bold text-cyan-600 dark:text-cyan-400">{m.mathSymbol}</td>
                  <td className="py-2 px-3 font-bold text-emerald-600 dark:text-emerald-400 font-mono">{m.codeIdentifier}</td>
                  <td className="py-2 px-3 text-[11px] sm:text-xs">{m.explanation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

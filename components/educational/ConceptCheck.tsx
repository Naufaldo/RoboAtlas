'use client';

import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, XCircle, RefreshCcw, Sparkles } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
}

export interface ConceptCheckProps {
  id: string;
  question: string;
  options: QuizOption[];
  hint?: string;
}

export function ConceptCheck({ id, question, options, hint }: ConceptCheckProps) {
  const { locale } = useLanguage();
  const isId = locale === 'id';

  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleSelect = (optionId: string) => {
    if (!hasSubmitted) {
      setSelectedOptionId(optionId);
    }
  };

  const handleSubmit = () => {
    if (selectedOptionId) {
      setHasSubmitted(true);
    }
  };

  const handleReset = () => {
    setSelectedOptionId(null);
    setHasSubmitted(false);
  };

  const selectedOption = options.find((o) => o.id === selectedOptionId);

  return (
    <div className="rounded-2xl glass-panel border border-slate-200 dark:border-slate-800 p-5 sm:p-6 space-y-4 my-6 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2 text-xs font-mono border-b border-slate-200 dark:border-slate-800/80 pb-3">
        <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-bold">
          <HelpCircle className="w-4 h-4" />
          <span>{isId ? 'Uji Pemahaman Konsep (Concept Check)' : 'Concept Check & Quiz'}</span>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 font-semibold">
          {isId ? 'Interaktif' : 'Interactive Check'}
        </span>
      </div>

      {/* Question */}
      <p className="font-semibold text-slate-900 dark:text-slate-100 text-xs sm:text-sm font-sans leading-relaxed">
        {question}
      </p>

      {/* Options */}
      <div className="space-y-2">
        {options.map((opt) => {
          const isSelected = selectedOptionId === opt.id;
          let optionStyles = 'border-slate-200 dark:border-slate-800 hover:border-cyan-500/50 bg-white dark:bg-slate-950/60 text-slate-700 dark:text-slate-300';

          if (hasSubmitted) {
            if (opt.isCorrect) {
              optionStyles = 'border-emerald-500/80 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-semibold';
            } else if (isSelected && !opt.isCorrect) {
              optionStyles = 'border-rose-500/80 bg-rose-500/10 text-rose-700 dark:text-rose-300 font-semibold';
            } else {
              optionStyles = 'opacity-50 border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 text-slate-500';
            }
          } else if (isSelected) {
            optionStyles = 'border-cyan-500 bg-cyan-500/15 text-cyan-800 dark:text-cyan-200 font-semibold shadow-sm';
          }

          return (
            <button
              key={opt.id}
              onClick={() => handleSelect(opt.id)}
              disabled={hasSubmitted}
              className={`w-full text-left p-3.5 rounded-xl border text-xs font-sans transition-all flex items-start justify-between gap-3 ${optionStyles}`}
            >
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full border flex-shrink-0 flex items-center justify-center font-mono text-[10px] font-bold mt-0.5">
                  {opt.id}
                </span>
                <span>{opt.text}</span>
              </div>

              {hasSubmitted && opt.isCorrect && (
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
              )}
              {hasSubmitted && isSelected && !opt.isCorrect && (
                <XCircle className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
              )}
            </button>
          );
        })}
      </div>

      {/* Feedback & Actions */}
      <div className="pt-2 flex items-center justify-between flex-wrap gap-2 text-xs font-mono">
        {!hasSubmitted ? (
          <button
            onClick={handleSubmit}
            disabled={!selectedOptionId}
            className={`px-4 py-2 rounded-xl font-bold transition-all ${
              selectedOptionId
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed border border-slate-300 dark:border-slate-700'
            }`}
          >
            {isId ? 'Periksa Jawaban' : 'Submit Answer'}
          </button>
        ) : (
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 transition-colors"
          >
            <RefreshCcw className="w-3.5 h-3.5" />
            {isId ? 'Coba Lagi' : 'Try Again'}
          </button>
        )}

        {hint && !hasSubmitted && (
          <span className="text-[11px] text-slate-500 italic">💡 {hint}</span>
        )}
      </div>

      {/* Explanation Box when submitted */}
      {hasSubmitted && selectedOption && (
        <div
          className={`p-3.5 rounded-xl border text-xs font-sans leading-relaxed animate-fadeIn ${
            selectedOption.isCorrect
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-800 dark:text-emerald-200'
              : 'bg-amber-500/10 border-amber-500/30 text-amber-800 dark:text-amber-200'
          }`}
        >
          <strong className="block font-mono text-[11px] uppercase mb-1 font-bold">
            {selectedOption.isCorrect
              ? (isId ? '✅ Jawaban Benar!' : '✅ Correct Answer!')
              : (isId ? '⚠️ Belum Tepat' : '⚠️ Incorrect')}
          </strong>
          {selectedOption.explanation}
        </div>
      )}
    </div>
  );
}

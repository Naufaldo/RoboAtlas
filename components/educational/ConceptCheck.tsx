'use client';

import React, { useState, useEffect } from 'react';
import { HelpCircle, CheckCircle2, XCircle, RefreshCcw, Sparkles, AlertCircle } from 'lucide-react';
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

  // Reset selection and submission state whenever the quiz ID or options change
  useEffect(() => {
    setSelectedOptionId(null);
    setHasSubmitted(false);
  }, [id]);

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
  const isSelectedCorrect = Boolean(
    selectedOption &&
      (selectedOption.isCorrect === true ||
        String(selectedOption.isCorrect).toLowerCase() === 'true')
  );

  return (
    <div
      id={id}
      className="rounded-2xl glass-panel border border-slate-200 dark:border-slate-800 p-5 sm:p-6 space-y-4 my-6 shadow-xl transition-all"
    >
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2 text-xs font-mono border-b border-slate-200 dark:border-slate-800/80 pb-3">
        <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-bold">
          <HelpCircle className="w-4 h-4" />
          <span>{isId ? 'Uji Pemahaman Konsep (Concept Check)' : 'Concept Check & Quiz'}</span>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 font-semibold">
          {isId ? 'Evaluasi Pemahaman' : 'Interactive Assessment'}
        </span>
      </div>

      {/* Question */}
      <p className="font-semibold text-slate-900 dark:text-slate-100 text-sm sm:text-base font-sans leading-relaxed">
        {question}
      </p>

      {/* Options */}
      <div className="space-y-2.5">
        {options.map((opt) => {
          const isSelected = selectedOptionId === opt.id;
          const isOptCorrect =
            opt.isCorrect === true || String(opt.isCorrect).toLowerCase() === 'true';

          let optionStyles =
            'border-slate-200 dark:border-slate-800 hover:border-cyan-500/50 bg-white dark:bg-slate-950/60 text-slate-700 dark:text-slate-300';

          if (hasSubmitted) {
            if (isOptCorrect) {
              optionStyles =
                'border-emerald-500/80 bg-emerald-500/15 text-emerald-800 dark:text-emerald-200 font-semibold shadow-sm ring-1 ring-emerald-500/40';
            } else if (isSelected && !isOptCorrect) {
              optionStyles =
                'border-rose-500/80 bg-rose-500/15 text-rose-800 dark:text-rose-200 font-semibold shadow-sm ring-1 ring-rose-500/40';
            } else {
              optionStyles =
                'opacity-40 border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 text-slate-500';
            }
          } else if (isSelected) {
            optionStyles =
              'border-cyan-500 bg-cyan-500/15 text-cyan-900 dark:text-cyan-100 font-semibold shadow-md ring-1 ring-cyan-500/50';
          }

          return (
            <button
              key={opt.id}
              onClick={() => handleSelect(opt.id)}
              disabled={hasSubmitted}
              type="button"
              className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm font-sans transition-all flex items-start justify-between gap-3 ${optionStyles}`}
            >
              <div className="flex items-start gap-3">
                <span
                  className={`w-6 h-6 rounded-full border flex-shrink-0 flex items-center justify-center font-mono text-xs font-bold mt-0.5 transition-colors ${
                    hasSubmitted && isOptCorrect
                      ? 'bg-emerald-500 text-slate-950 border-emerald-500'
                      : hasSubmitted && isSelected && !isOptCorrect
                      ? 'bg-rose-500 text-white border-rose-500'
                      : isSelected
                      ? 'bg-cyan-500 text-slate-950 border-cyan-500 font-extrabold'
                      : 'border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {opt.id}
                </span>
                <span className="leading-relaxed pt-0.5">{opt.text}</span>
              </div>

              {hasSubmitted && isOptCorrect && (
                <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-bold flex-shrink-0 mt-0.5">
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="hidden sm:inline">{isId ? 'Jawaban Benar' : 'Correct'}</span>
                </div>
              )}
              {hasSubmitted && isSelected && !isOptCorrect && (
                <div className="flex items-center gap-1 text-rose-600 dark:text-rose-400 text-xs font-mono font-bold flex-shrink-0 mt-0.5">
                  <XCircle className="w-5 h-5" />
                  <span className="hidden sm:inline">{isId ? 'Pilihan Anda' : 'Your Choice'}</span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Feedback & Actions */}
      <div className="pt-2 flex items-center justify-between flex-wrap gap-3 text-xs font-mono">
        {!hasSubmitted ? (
          <button
            onClick={handleSubmit}
            disabled={!selectedOptionId}
            type="button"
            className={`px-5 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 ${
              selectedOptionId
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-md shadow-cyan-500/20 active:scale-95'
                : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed border border-slate-300 dark:border-slate-700'
            }`}
          >
            <span>{isId ? 'Periksa Jawaban' : 'Submit Answer'}</span>
          </button>
        ) : (
          <button
            onClick={handleReset}
            type="button"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 transition-colors font-bold shadow-sm active:scale-95"
          >
            <RefreshCcw className="w-3.5 h-3.5" />
            <span>{isId ? 'Coba Pertanyaan Lain' : 'Try Again'}</span>
          </button>
        )}

        {hint && !hasSubmitted && (
          <span className="text-xs text-slate-500 italic flex items-center gap-1.5">
            <span>💡</span>
            <span>{hint}</span>
          </span>
        )}
      </div>

      {/* Explanation Box when submitted */}
      {hasSubmitted && selectedOption && (
        <div
          className={`p-4 rounded-xl border text-xs sm:text-sm font-sans leading-relaxed animate-fadeIn space-y-1.5 shadow-md ${
            isSelectedCorrect
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-900 dark:text-emerald-100'
              : 'bg-rose-500/10 border-rose-500/30 text-rose-900 dark:text-rose-100'
          }`}
        >
          <div className="flex items-center gap-2 font-mono text-xs uppercase font-bold">
            {isSelectedCorrect ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span className="text-emerald-600 dark:text-emerald-400">
                  {isId ? 'Tepat Sekali! Pemahaman Anda Benar.' : 'Correct! Outstanding concept mastery.'}
                </span>
              </>
            ) : (
              <>
                <AlertCircle className="w-4 h-4 text-rose-500" />
                <span className="text-rose-600 dark:text-rose-400">
                  {isId ? 'Belum Tepat. Perhatikan Penjelasan Berikut:' : 'Incorrect. Review the explanation below:'}
                </span>
              </>
            )}
          </div>
          <p className="leading-relaxed">
            {selectedOption.explanation ||
              (isSelectedCorrect
                ? isId
                  ? 'Jawaban yang Anda pilih sesuai dengan prinsip fisika dan formulasi matematis modul ini.'
                  : 'Your selection aligns perfectly with the physics principles of this module.'
                : isId
                ? 'Pilihan tersebut kurang tepat. Silakan tinjau kembali rumus penurunan di atas atau klik opsi yang ditandai hijau.'
                : 'This choice is not correct. Review the mathematical derivation above or check the green highlighted option.')}
          </p>
        </div>
      )}
    </div>
  );
}

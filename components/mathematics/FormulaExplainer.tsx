'use client';

import React, { useState } from 'react';
import { MathBlock } from './MathBlock';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import {
  HelpCircle,
  Lightbulb,
  Table as TableIcon,
  Calculator,
  Compass,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Cpu,
  Layers,
} from 'lucide-react';

export interface VariableItem {
  symbol: string;
  name: string;
  unit: string;
  meaning: string;
}

export interface DerivationStep {
  step: string;
  latex?: string;
  explanation: string;
}

export interface CalculatorParam {
  key: string;
  label: string;
  unit: string;
  default: number;
  min: number;
  max: number;
  step?: number;
}

export interface FormulaExplainerProps {
  id: string;
  title: string;
  latex: string;
  meaning: string;
  whyExplanation: string;
  variables: VariableItem[];
  derivationSteps?: DerivationStep[];
  numericalExample?: {
    inputs: Record<string, number>;
    calculationSteps: string[];
    result: string;
  };
  roboticsApplication: string;
  calculator?: {
    params: CalculatorParam[];
    calculate: (inputs: Record<string, number>) => {
      steps: string[];
      result: string;
    };
  };
  className?: string;
}

export function FormulaExplainer({
  id,
  title,
  latex,
  meaning,
  whyExplanation,
  variables,
  derivationSteps,
  numericalExample,
  roboticsApplication,
  calculator,
  className = '',
}: FormulaExplainerProps) {
  const { locale } = useLanguage();
  const isId = locale === 'id';

  const [showDerivation, setShowDerivation] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);

  // Dynamic calculator state
  const [calcInputs, setCalcInputs] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    if (calculator) {
      calculator.params.forEach((p) => {
        initial[p.key] = p.default;
      });
    }
    return initial;
  });

  const handleParamChange = (key: string, val: number) => {
    setCalcInputs((prev) => ({ ...prev, [key]: val }));
  };

  const calculatedOutput = calculator ? calculator.calculate(calcInputs) : null;

  return (
    <div
      id={id}
      className={`rounded-2xl glass-panel border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden transition-all hover:border-cyan-500/40 my-6 ${className}`}
    >
      {/* 1. Header & Title */}
      <div className="px-4 py-3 bg-slate-100/90 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800/80 flex items-center justify-between flex-wrap gap-2 text-xs font-mono text-slate-800 dark:text-slate-200">
        <div className="flex items-center gap-2 font-bold text-cyan-700 dark:text-cyan-400">
          <Lightbulb className="w-4 h-4" />
          <span>{title}</span>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 font-semibold">
          {isId ? 'Standar Penjelasan Matematis' : 'Mathematical Standard'}
        </span>
      </div>

      <div className="p-4 sm:p-6 space-y-6">
        {/* 2. Formula LaTeX Display */}
        <div className="w-full">
          <MathBlock latex={latex} displayMode={true} />
        </div>

        {/* 3. Plain Language Meaning */}
        <div className="p-4 rounded-xl bg-cyan-500/5 dark:bg-cyan-950/20 border border-cyan-500/20 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
          <strong className="text-cyan-700 dark:text-cyan-400 font-mono block text-xs uppercase mb-1">
            {isId ? 'Arti Intuitif (Meaning):' : 'Intuitive Meaning:'}
          </strong>
          {meaning}
        </div>

        {/* 4. Why is it like that? (Physical reasoning) */}
        <div className="space-y-1.5 text-xs font-sans">
          <h4 className="font-mono font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
            <span>{isId ? 'Mengapa Formulanya Seperti Itu? (Why?):' : 'Why Is It Like That? (Physical Reasoning):'}</span>
          </h4>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-xs sm:text-sm">
            {whyExplanation}
          </p>
        </div>

        {/* 5. Variable Glossary Table */}
        <div className="space-y-2">
          <h4 className="text-xs font-mono font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
            <TableIcon className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>{isId ? 'Daftar Variabel & Dimensi Satuan:' : 'Variables & Dimensional Units:'}</span>
          </h4>

          <div className="overflow-x-auto scrollbar-thin rounded-xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left text-xs font-mono border-collapse">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-900/90 text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800">
                  <th className="py-2 px-3">{isId ? 'Simbol' : 'Symbol'}</th>
                  <th className="py-2 px-3">{isId ? 'Nama Besaran' : 'Quantity'}</th>
                  <th className="py-2 px-3">{isId ? 'Satuan (Unit)' : 'Unit'}</th>
                  <th className="py-2 px-3">{isId ? 'Peran Fisik dalam Robot' : 'Physical Meaning'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800/60 bg-white dark:bg-slate-950/60 text-slate-600 dark:text-slate-300">
                {variables.map((v) => (
                  <tr key={v.symbol} className="hover:bg-slate-50 dark:hover:bg-slate-900/40">
                    <td className="py-2.5 px-3 font-bold text-cyan-600 dark:text-cyan-400">{v.symbol}</td>
                    <td className="py-2.5 px-3">{v.name}</td>
                    <td className="py-2.5 px-3 text-emerald-600 dark:text-emerald-400 font-semibold">{v.unit}</td>
                    <td className="py-2.5 px-3 text-[11px] sm:text-xs">{v.meaning}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 6. Step-by-Step Derivation (Collapsible) */}
        {derivationSteps && derivationSteps.length > 0 && (
          <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
            <button
              onClick={() => setShowDerivation(!showDerivation)}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-900 flex items-center justify-between text-xs font-mono text-slate-800 dark:text-slate-200 font-bold transition-colors"
            >
              <div className="flex items-center gap-2">
                <Compass className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                <span>{isId ? 'Penurunan Rumus Langkah demi Langkah (Derivation)' : 'Step-by-Step Mathematical Derivation'}</span>
              </div>
              {showDerivation ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showDerivation && (
              <div className="p-4 space-y-4 bg-white dark:bg-slate-950 text-xs font-mono border-t border-slate-200 dark:border-slate-800">
                {derivationSteps.map((step, idx) => (
                  <div key={idx} className="space-y-1.5 pb-3 border-b border-slate-100 dark:border-slate-900 last:border-0 last:pb-0">
                    <span className="text-cyan-600 dark:text-cyan-400 font-bold block">
                      {idx + 1}. {step.step}
                    </span>
                    <p className="text-slate-600 dark:text-slate-400 font-sans text-xs">
                      {step.explanation}
                    </p>
                    {step.latex && (
                      <div className="py-1">
                        <MathBlock latex={step.latex} displayMode={true} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 7. Numerical Example & Interactive Calculator */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Static Numerical Example */}
          {numericalExample && (
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2 text-xs font-mono">
              <strong className="text-slate-900 dark:text-slate-100 block font-bold text-xs uppercase text-cyan-700 dark:text-cyan-400">
                {isId ? 'Contoh Perhitungan Angka:' : 'Worked Numerical Example:'}
              </strong>
              <div className="space-y-1 text-slate-600 dark:text-slate-300">
                {Object.entries(numericalExample.inputs).map(([k, v]) => (
                  <div key={k} className="flex justify-between">
                    <span>{k}:</span>
                    <strong className="text-cyan-600 dark:text-cyan-400">{v}</strong>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-1 text-slate-600 dark:text-slate-300">
                {numericalExample.calculationSteps.map((s, idx) => (
                  <div key={idx} className="text-[11px] text-slate-500">{s}</div>
                ))}
              </div>

              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex justify-between font-bold text-emerald-600 dark:text-emerald-400">
                <span>{isId ? 'Hasil Akhir:' : 'Final Result:'}</span>
                <span>{numericalExample.result}</span>
              </div>
            </div>
          )}

          {/* Interactive Live Calculator */}
          {calculator && (
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3 text-xs font-mono">
              <div className="flex items-center justify-between">
                <strong className="text-amber-600 dark:text-amber-400 block font-bold text-xs uppercase flex items-center gap-1.5">
                  <Calculator className="w-3.5 h-3.5" />
                  <span>{isId ? 'Kalkulator Parameter Interaktif:' : 'Interactive Live Calculator:'}</span>
                </strong>
              </div>

              <div className="space-y-3">
                {calculator.params.map((param) => (
                  <div key={param.key} className="space-y-1">
                    <div className="flex justify-between text-[11px] text-slate-700 dark:text-slate-300">
                      <span>{param.label}:</span>
                      <strong className="text-cyan-600 dark:text-cyan-400">
                        {calcInputs[param.key]} {param.unit}
                      </strong>
                    </div>
                    <input
                      type="range"
                      min={param.min}
                      max={param.max}
                      step={param.step || 0.1}
                      value={calcInputs[param.key]}
                      onChange={(e) => handleParamChange(param.key, parseFloat(e.target.value))}
                      className="w-full accent-cyan-500 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none"
                    />
                  </div>
                ))}
              </div>

              {calculatedOutput && (
                <div className="mt-3 pt-2.5 border-t border-slate-200 dark:border-slate-800 space-y-1">
                  {calculatedOutput.steps.map((s, idx) => (
                    <div key={idx} className="text-[11px] text-slate-500 dark:text-slate-400">{s}</div>
                  ))}
                  <div className="pt-1.5 flex justify-between font-bold text-emerald-600 dark:text-emerald-400 text-xs">
                    <span>{isId ? 'Hasil Live:' : 'Live Output:'}</span>
                    <span>{calculatedOutput.result}</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* 8. Robotics Real-world Application */}
        <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs font-sans space-y-1">
          <strong className="font-mono font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>{isId ? 'Aplikasi di Robotika Nyata & Batasan (Application):' : 'Real-World Robotics Application & Limitations:'}</span>
          </strong>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-xs">
            {roboticsApplication}
          </p>
        </div>
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import { LocalizationSimulator } from '@/components/simulation/LocalizationSimulator';
import { MathBlock } from '@/components/mathematics/MathBlock';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { MapPin, Sparkles, BookOpen } from 'lucide-react';

export default function LocalizationPage() {
  const { locale } = useLanguage();
  const isId = locale === 'id';

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800/80 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-300 text-xs font-mono mb-3">
          <MapPin className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
          <span>{isId ? 'Milestone 5 • Laboratorium Domain' : 'Milestone 5 • Domain Laboratory'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
          {isId ? 'Lokalisasi Robot & Estimasi Status' : 'Robot Localization & State Estimation'}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-3xl leading-relaxed">
          {isId
            ? 'Estimasi pose sejati robot dari pengukuran sensor ber-noise dan odometri yang melayang (drift) menggunakan Filter Bayesian Rekursif dan Monte Carlo Particle Filter (MCL).'
            : 'Estimate true robot poses from noisy sensor measurements and drifting dead-reckoning odometry using recursive Bayesian filtering and Monte Carlo Particle Filters (MCL).'}
        </p>
      </div>

      {/* 1. Interactive Simulator Module */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-mono font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
            <span>{isId ? 'Simulator Filter Partikel Monte Carlo Interaktif' : 'Interactive Monte Carlo Particle Filter Sandbox'}</span>
          </h2>
          <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/20">
            Bayesian Sensor Fusion
          </span>
        </div>
        <LocalizationSimulator />
      </div>

      {/* 2. Mathematical Rigor & KaTeX */}
      <div className="p-6 rounded-2xl glass-panel space-y-6">
        <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-mono text-sm font-bold border-b border-slate-200 dark:border-slate-800/80 pb-3">
          <BookOpen className="w-4 h-4" />
          <span>{isId ? 'Persamaan Filter Bayes Rekursif' : 'Recursive Bayesian Filter Equations'}</span>
        </div>

        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
            1. {isId ? 'Langkah Prediksi Gerak & Pembaruan Pengukuran' : 'Prediction Step & Measurement Update'}
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
            {isId
              ? 'Keyakinan probabilitas bel(x_t) terhadap status robot x_t yang dikondisikan pada kontrol u_1:t dan sensor z_1:t:'
              : 'The probability belief state bel(x_t) conditioned on control inputs u_1:t and measurements z_1:t:'}
          </p>
          <div className="mt-3">
            <MathBlock
              latex="\overline{\text{bel}}(x_t) = \int p(x_t \mid u_t, x_{t-1})\, \text{bel}(x_{t-1})\, dx_{t-1}"
              title={isId ? 'Langkah Prediksi (Chapman-Kolmogorov)' : 'Prediction Step (Chapman-Kolmogorov Motion Update)'}
            />
          </div>
          <div className="mt-3">
            <MathBlock
              latex="\text{bel}(x_t) = \eta \cdot p(z_t \mid x_t)\, \overline{\text{bel}}(x_t)"
              title={isId ? 'Langkah Pembaruan Bobot Sensor (Aturan Bayes)' : 'Measurement Update (Bayes Rule Weighting)'}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

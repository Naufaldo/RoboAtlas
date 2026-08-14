'use client';

import React from 'react';
import { MappingSimulator } from '@/components/simulation/MappingSimulator';
import { MathBlock } from '@/components/mathematics/MathBlock';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Layers, Sparkles, BookOpen } from 'lucide-react';

export default function MappingPage() {
  const { locale } = useLanguage();
  const isId = locale === 'id';

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800/80 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-300 text-xs font-mono mb-3">
          <Layers className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
          <span>{isId ? 'Milestone 7 • Laboratorium Domain' : 'Milestone 7 • Domain Laboratory'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
          {isId ? 'Pemetaan Grid Okupansi & Model Spasial' : 'Occupancy Grid Mapping & Spatial Models'}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-3xl leading-relaxed">
          {isId
            ? 'Bangun peta spasial metrik dari aliran pengukuran sensor jarak kontinu. Perbarui probabilitas okupansi setiap sel grid menggunakan representasi Log-Odds.'
            : 'Construct metric spatial maps from continuous range sensor measurements. Update individual cell occupancy probabilities using Log-Odds representations.'}
        </p>
      </div>

      {/* 1. Interactive Simulator Module */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-mono font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
            <span>{isId ? 'Simulator Grid Okupansi Log-Odds Interaktif' : 'Interactive Log-Odds Occupancy Grid Sandbox'}</span>
          </h2>
          <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/20">
            360° LiDAR Raycaster
          </span>
        </div>
        <MappingSimulator />
      </div>

      {/* 2. Mathematical Rigor */}
      <div className="p-6 rounded-2xl glass-panel space-y-6">
        <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-mono text-sm font-bold border-b border-slate-200 dark:border-slate-800/80 pb-3">
          <BookOpen className="w-4 h-4" />
          <span>{isId ? 'Matematika Pemetaan Bayesian Log-Odds' : 'Log-Odds Bayesian Mapping Mathematics'}</span>
        </div>

        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
            1. {isId ? 'Formulasi Rasio Log-Odds' : 'Log-Odds Ratio Formulation'}
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
            {isId
              ? 'Mencegah underflow numerik dengan menyimpan rasio log-odds l_t(m_i) untuk setiap sel grid m_i:'
              : 'Avoid numerical underflow by storing the log-odds ratio l_t(m_i) for each grid cell m_i:'}
          </p>
          <div className="mt-3">
            <MathBlock
              latex="l_t(m_i) = l_{t-1}(m_i) + \text{inv\_sensor}(m_i, x_t, z_t) - l_0"
              title={isId ? 'Pembaruan Log-Odds Aditif Sensor' : 'Additive Log-Odds Measurement Update'}
            />
          </div>
          <div className="mt-3">
            <MathBlock
              latex="p(m_i) = 1 - \frac{1}{1 + \exp(l_t(m_i))}"
              title={isId ? 'Konversi Kembali ke Probabilitas Okupansi' : 'Recovery of Posterior Occupancy Probability'}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

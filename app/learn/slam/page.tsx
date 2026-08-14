'use client';

import React from 'react';
import { SlamSimulator } from '@/components/simulation/SlamSimulator';
import { MathBlock } from '@/components/mathematics/MathBlock';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { RotateCcw, Sparkles, BookOpen } from 'lucide-react';

export default function SlamPage() {
  const { locale } = useLanguage();
  const isId = locale === 'id';

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800/80 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-300 text-xs font-mono mb-3">
          <RotateCcw className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
          <span>{isId ? 'Milestone 7 • Laboratorium Domain' : 'Milestone 7 • Domain Laboratory'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
          {isId ? 'SLAM (Lokalisasi & Pemetaan Simultan)' : 'Simultaneous Localization & Mapping (SLAM)'}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-3xl leading-relaxed">
          {isId
            ? 'Pecahkan dilema ayam-dan-telur dalam robotika: lakukan registrasi pemindaian laser berurutan untuk membangun peta global sekaligus melacak drift pose menggunakan Iterative Closest Point (ICP).'
            : 'Solve the fundamental chicken-or-egg problem of robotics: register successive laser scans to construct global maps while tracking pose drift using Iterative Closest Point (ICP).'}
        </p>
      </div>

      {/* 1. Interactive Simulator Module */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-mono font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
            <span>{isId ? 'Simulator Pencocokan Pindaian ICP Interaktif' : 'Interactive ICP Scan Matching Workstation'}</span>
          </h2>
          <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/20">
            SVD Rigid Alignment
          </span>
        </div>
        <SlamSimulator />
      </div>

      {/* 2. Mathematical Rigor */}
      <div className="p-6 rounded-2xl glass-panel space-y-6">
        <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-mono text-sm font-bold border-b border-slate-200 dark:border-slate-800/80 pb-3">
          <BookOpen className="w-4 h-4" />
          <span>{isId ? 'Optimasi Iterative Closest Point (ICP)' : 'Iterative Closest Point (ICP) Optimization'}</span>
        </div>

        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
            1. {isId ? 'Fungsi Biaya Euclidean Point-to-Point' : 'Point-to-Point Euclidean Cost Function'}
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
            {isId
              ? 'Mencari matriks rotasi optimal R dalam SO(2) dan translasi t yang meminimalkan total selisih kuadrat titik terdekat:'
              : 'Find the optimal rotation matrix R in SO(2) and translation vector t that minimize:'}
          </p>
          <div className="mt-3">
            <MathBlock
              latex="E(R, t) = \sum_{i=1}^{N} \left\| q_i - (R\, p_i + t) \right\|^2"
              title={isId ? 'Objektif Registrasi Pindaian Kuadrat Terkecil' : 'Least-Squares Scan Registration Objective'}
            />
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
            2. {isId ? 'Solusi Bentuk Tertutup SVD' : 'Closed-Form SVD Solution'}
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
            {isId
              ? 'Dari matriks kovarians silang H antara korespondensi titik terpusat:'
              : 'From the cross-covariance matrix H between centered point correspondences:'}
          </p>
          <div className="mt-3">
            <MathBlock
              latex="R = V U^T, \quad t = \bar{q} - R\, \bar{p}"
              title={isId ? 'Pembaruan Transformasi Kaku Optimal' : 'Optimal Rigid Transformation Update'}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

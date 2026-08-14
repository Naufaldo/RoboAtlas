'use client';

import React from 'react';
import { ControlSimulator } from '@/components/simulation/ControlSimulator';
import { MathBlock } from '@/components/mathematics/MathBlock';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Cpu, Sparkles, BookOpen } from 'lucide-react';

export default function ControlPage() {
  const { locale } = useLanguage();
  const isId = locale === 'id';

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800/80 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-300 text-xs font-mono mb-3">
          <Cpu className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
          <span>{isId ? 'Milestone 6 • Laboratorium Domain' : 'Milestone 6 • Domain Laboratory'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
          {isId ? 'Kendali Umpan Balik & Pelacakan Jalur Robot' : 'Robot Feedback Control & Path Tracking'}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-3xl leading-relaxed">
          {isId
            ? 'Eksekusi hukum kendali pelacakan trajektori geometris dan kinematik. Bandingkan geometri titik pandang depan Pure Pursuit dengan umpan balik kesalahan cross-track kemudi Stanley.'
            : 'Execute geometric and kinematic trajectory tracking control laws. Compare the lookahead geometry of Pure Pursuit against Stanley steering cross-track error feedback.'}
        </p>
      </div>

      {/* 1. Interactive Simulator Module */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-mono font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
            <span>{isId ? 'Simulator Kemudi Pelacak Jalur Interaktif' : 'Interactive Path Tracking Steering Sandbox'}</span>
          </h2>
          <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/20">
            Pure Pursuit & Stanley
          </span>
        </div>
        <ControlSimulator />
      </div>

      {/* 2. Mathematical Rigor */}
      <div className="p-6 rounded-2xl glass-panel space-y-6">
        <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-mono text-sm font-bold border-b border-slate-200 dark:border-slate-800/80 pb-3">
          <BookOpen className="w-4 h-4" />
          <span>{isId ? 'Formulasi Kendali Kemudi' : 'Steering Control Formulations'}</span>
        </div>

        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
            1. {isId ? 'Hukum Kendali Geometris Pure Pursuit' : 'Pure Pursuit Geometric Control Law'}
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
            {isId
              ? 'Menghitung sudut kemudi delta menuju titik target pada jarak lookahead L_f dengan sudut relatif alpha:'
              : 'Computes steering angle delta targeting a goal point at lookahead distance L_f with relative angle alpha:'}
          </p>
          <div className="mt-3">
            <MathBlock
              latex="\delta = \arctan\left( \frac{2 L \sin\alpha}{L_f} \right)"
              title={isId ? 'Hukum Kemudi Kurvatur Pure Pursuit' : 'Pure Pursuit Curvature Steering Law'}
            />
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
            2. {isId ? 'Kendali Sumbu Roda Depan Stanley' : 'Stanley Controller Front-Axle Steering'}
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
            {isId
              ? 'Mengeliminasi kesalahan heading theta_e dan kesalahan cross-track e(t) dengan umpan balik non-linear bergantung kecepatan:'
              : 'Eliminates heading error theta_e and cross-track error e(t) with velocity-dependent proportional feedback:'}
          </p>
          <div className="mt-3">
            <MathBlock
              latex="\delta(t) = \theta_e(t) + \arctan\left( \frac{k \cdot e(t)}{v(t)} \right)"
              title={isId ? 'Hukum Kendali Non-Linear Cross-Track Stanley' : 'Stanley Non-Linear Cross-Track Control Law'}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { LocalizationSimulator } from '@/components/simulation/LocalizationSimulator';
import { MathBlock } from '@/components/mathematics/MathBlock';
import { MapPin, Sparkles, BookOpen, Code2 } from 'lucide-react';

export default function LocalizationPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-slate-800/80 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
          <MapPin className="w-3.5 h-3.5 text-cyan-400" />
          <span>Milestone 5 • Domain Laboratory</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-100">
          Robot Localization & State Estimation
        </h1>
        <p className="text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">
          Estimate true robot poses from noisy sensor measurements and drifting dead-reckoning odometry using recursive Bayesian filtering and Monte Carlo Particle Filters (MCL).
        </p>
      </div>

      {/* 1. Interactive Simulator Module */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-mono font-bold text-slate-100 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Interactive Monte Carlo Particle Filter Sandbox</span>
          </h2>
          <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/20">
            Bayesian Sensor Fusion
          </span>
        </div>
        <LocalizationSimulator />
      </div>

      {/* 2. Mathematical Rigor & KaTeX */}
      <div className="p-6 rounded-2xl glass-panel space-y-6">
        <div className="flex items-center gap-2 text-cyan-400 font-mono text-sm font-bold border-b border-slate-800/80 pb-3">
          <BookOpen className="w-4 h-4" />
          <span>Recursive Bayesian Filter Equations</span>
        </div>

        <div>
          <h3 className="text-sm font-bold text-slate-200">1. Bayes Filter Prediction & Measurement Update</h3>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
            The probability belief state bel(x_t) conditioned on control inputs u_1:t and measurements z_1:t:
          </p>
          <div className="mt-3">
            <MathBlock
              latex="\overline{\text{bel}}(x_t) = \int p(x_t \mid u_t, x_{t-1})\, \text{bel}(x_{t-1})\, dx_{t-1}"
              title="Prediction Step (Chapman-Kolmogorov Motion Update)"
            />
          </div>
          <div className="mt-3">
            <MathBlock
              latex="\text{bel}(x_t) = \eta \cdot p(z_t \mid x_t)\, \overline{\text{bel}}(x_t)"
              title="Measurement Update (Bayes Rule Weighting)"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

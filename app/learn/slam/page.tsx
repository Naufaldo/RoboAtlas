import React from 'react';
import { SlamSimulator } from '@/components/simulation/SlamSimulator';
import { MathBlock } from '@/components/mathematics/MathBlock';
import { RotateCcw, Sparkles, BookOpen, Code2 } from 'lucide-react';

export default function SlamPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-slate-800/80 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
          <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
          <span>Milestone 7 • Domain Laboratory</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-100">
          Simultaneous Localization & Mapping (SLAM)
        </h1>
        <p className="text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">
          Solve the fundamental chicken-or-egg problem of robotics: register successive laser scans to construct global maps while tracking pose drift using Iterative Closest Point (ICP).
        </p>
      </div>

      {/* 1. Interactive Simulator Module */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-mono font-bold text-slate-100 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Interactive ICP Scan Matching Workstation</span>
          </h2>
          <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/20">
            SVD Rigid Alignment
          </span>
        </div>
        <SlamSimulator />
      </div>

      {/* 2. Mathematical Rigor */}
      <div className="p-6 rounded-2xl glass-panel space-y-6">
        <div className="flex items-center gap-2 text-cyan-400 font-mono text-sm font-bold border-b border-slate-800/80 pb-3">
          <BookOpen className="w-4 h-4" />
          <span>Iterative Closest Point (ICP) Optimization</span>
        </div>

        <div>
          <h3 className="text-sm font-bold text-slate-200">1. Point-to-Point Euclidean Cost Function</h3>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
            Find the optimal rotation matrix R in SO(2) and translation vector t that minimize:
          </p>
          <div className="mt-3">
            <MathBlock
              latex="E(R, t) = \sum_{i=1}^{N} \left\| q_i - (R\, p_i + t) \right\|^2"
              title="Least-Squares Scan Registration Objective"
            />
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold text-slate-200">2. Closed-Form SVD Solution</h3>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
            From the cross-covariance matrix H between centered point correspondences:
          </p>
          <div className="mt-3">
            <MathBlock
              latex="R = V U^T, \quad t = \bar{q} - R\, \bar{p}"
              title="Optimal Rigid Transformation Update"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

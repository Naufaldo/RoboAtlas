import React from 'react';
import { ControlSimulator } from '@/components/simulation/ControlSimulator';
import { MathBlock } from '@/components/mathematics/MathBlock';
import { Cpu, Sparkles, BookOpen, Code2 } from 'lucide-react';

export default function ControlPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-slate-800/80 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
          <Cpu className="w-3.5 h-3.5 text-cyan-400" />
          <span>Milestone 6 • Domain Laboratory</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-100">
          Robot Feedback Control & Path Tracking
        </h1>
        <p className="text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">
          Execute geometric and kinematic trajectory tracking control laws. Compare the lookahead geometry of Pure Pursuit against Stanley steering cross-track error feedback.
        </p>
      </div>

      {/* 1. Interactive Simulator Module */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-mono font-bold text-slate-100 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Interactive Path Tracking Steering Sandbox</span>
          </h2>
          <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/20">
            Pure Pursuit & Stanley
          </span>
        </div>
        <ControlSimulator />
      </div>

      {/* 2. Mathematical Rigor */}
      <div className="p-6 rounded-2xl glass-panel space-y-6">
        <div className="flex items-center gap-2 text-cyan-400 font-mono text-sm font-bold border-b border-slate-800/80 pb-3">
          <BookOpen className="w-4 h-4" />
          <span>Steering Control Formulations</span>
        </div>

        <div>
          <h3 className="text-sm font-bold text-slate-200">1. Pure Pursuit Geometric Control Law</h3>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
            Computes the steering angle $\delta$ targeting a goal point $(g_x, g_y)$ at lookahead distance $L_f$ with angle $\alpha$:
          </p>
          <div className="mt-3">
            <MathBlock
              latex="\delta = \arctan\left( \frac{2 L \sin\alpha}{L_f} \right)"
              title="Pure Pursuit Curvature Steering Law"
            />
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold text-slate-200">2. Stanley Controller Front-Axle Steering</h3>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
            Eliminates heading error $\theta_e$ and cross-track error $e(t)$ with velocity-dependent proportional feedback:
          </p>
          <div className="mt-3">
            <MathBlock
              latex="\delta(t) = \theta_e(t) + \arctan\left( \frac{k \cdot e(t)}{v(t)} \right)"
              title="Stanley Non-Linear Cross-Track Control Law"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

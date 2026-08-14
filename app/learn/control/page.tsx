import React from 'react';
import { MathBlock } from '@/components/mathematics/MathBlock';
import { Cpu } from 'lucide-react';
import Link from 'next/link';

export default function ControlPage() {
  return (
    <div className="space-y-10 max-w-4xl">
      <div className="border-b border-slate-800 pb-6">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
          <Cpu className="w-4 h-4" />
          <span>Domain 06 / Milestone 6</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-100">
          Robot Control & Path Tracking
        </h1>
        <p className="text-sm text-slate-400 mt-2 leading-relaxed">
          Geometric and optimal trajectory tracking controllers: Pure Pursuit, Stanley Cross-Track Controller, PID feedback, and Linear Quadratic Regulators (LQR).
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <span className="text-cyan-400 font-mono text-base">1.</span> Mathematical Formulations
        </h2>

        <MathBlock
          title="Pure Pursuit Geometric Steering Law"
          latex={`\\delta = \\arctan\\left(\\frac{2 L \\sin\\alpha}{L_f}\\right)`}
          explanation="Computes steering angle δ from wheelbase L, lookahead distance L_f, and angle α between robot heading and lookahead point vector."
        />

        <MathBlock
          title="Stanley Cross-Track Error Steering Control"
          latex={`\\delta(t) = \\theta_e(t) + \\arctan\\left(\\frac{k \\cdot e_{ct}(t)}{v(t)}\\right)`}
          explanation="Where θ_e is orientation error relative to path tangent, e_ct is perpendicular cross-track distance error, and v is forward speed."
        />
      </section>

      <section className="pt-6 border-t border-slate-800 flex items-center justify-between">
        <Link href="/learn/localization" className="text-xs font-mono text-slate-400 hover:text-slate-200">
          ← Localization
        </Link>
        <Link
          href="/learn/mapping"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 text-xs font-mono font-medium border border-cyan-500/30 transition-colors"
        >
          <span>Next: Mapping</span>
          <span>→</span>
        </Link>
      </section>
    </div>
  );
}

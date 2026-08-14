import React from 'react';
import { MathBlock } from '@/components/mathematics/MathBlock';
import { RotateCcw } from 'lucide-react';
import Link from 'next/link';

export default function SlamPage() {
  return (
    <div className="space-y-10 max-w-4xl">
      <div className="border-b border-slate-800 pb-6">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
          <RotateCcw className="w-4 h-4" />
          <span>Domain 04 / Milestone 7</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-100">
          Simultaneous Localization & Mapping (SLAM)
        </h1>
        <p className="text-sm text-slate-400 mt-2 leading-relaxed">
          Iterative Closest Point (ICP) scan matching, Rao-Blackwellized FastSLAM particle filtering, and nonlinear pose-graph optimization.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <span className="text-cyan-400 font-mono text-base">1.</span> Mathematical Formulations
        </h2>

        <MathBlock
          title="Iterative Closest Point (ICP) Optimization Objective"
          latex={`\\arg\\min_{R, t} \\sum_{i=1}^{N} \\| R p_i + t - q_i \\|^2`}
          explanation="Finds the optimal rotation R in SO(2) and translation vector t aligning source point cloud p_i with closest target points q_i using SVD."
        />
      </section>

      <section className="pt-6 border-t border-slate-800 flex items-center justify-between">
        <Link href="/learn/mapping" className="text-xs font-mono text-slate-400 hover:text-slate-200">
          ← Mapping
        </Link>
        <Link
          href="/learn/multi-agent"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 text-xs font-mono font-medium border border-cyan-500/30 transition-colors"
        >
          <span>Next: Multi-Agent Robotics</span>
          <span>→</span>
        </Link>
      </section>
    </div>
  );
}

import React from 'react';
import { MathBlock } from '@/components/mathematics/MathBlock';
import { Layers } from 'lucide-react';
import Link from 'next/link';

export default function MappingPage() {
  return (
    <div className="space-y-10 max-w-4xl">
      <div className="border-b border-slate-800 pb-6">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
          <Layers className="w-4 h-4" />
          <span>Domain 03 / Milestone 7</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-100">
          Mapping & Spatial Representations
        </h1>
        <p className="text-sm text-slate-400 mt-2 leading-relaxed">
          Probabilistic Occupancy Grids, Log-Odds inverse sensor models, Euclidean Distance Transforms (EDT), and Costmaps for collision checking.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <span className="text-cyan-400 font-mono text-base">1.</span> Mathematical Formulations
        </h2>

        <MathBlock
          title="Log-Odds Recursive Grid Cell Update"
          latex={`l_t(m_i) = l_{t-1}(m_i) + \\log\\left(\\frac{p(m_i \\mid z_t)}{1 - p(m_i \\mid z_t)}\\right) - l_0`}
          explanation="Replaces continuous multiplication of probabilities with fast, numerically stable integer/float addition per cell."
        />
      </section>

      <section className="pt-6 border-t border-slate-800 flex items-center justify-between">
        <Link href="/learn/control" className="text-xs font-mono text-slate-400 hover:text-slate-200">
          ← Control
        </Link>
        <Link
          href="/learn/slam"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 text-xs font-mono font-medium border border-cyan-500/30 transition-colors"
        >
          <span>Next: SLAM</span>
          <span>→</span>
        </Link>
      </section>
    </div>
  );
}

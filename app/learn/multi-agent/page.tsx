import React from 'react';
import { MathBlock } from '@/components/mathematics/MathBlock';
import { Users } from 'lucide-react';
import Link from 'next/link';

export default function MultiAgentPage() {
  return (
    <div className="space-y-10 max-w-4xl">
      <div className="border-b border-slate-800 pb-6">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
          <Users className="w-4 h-4" />
          <span>Domain 07 / Milestone 8</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-100">
          Multi-Agent Robotics & Swarms
        </h1>
        <p className="text-sm text-slate-400 mt-2 leading-relaxed">
          Distributed swarm coordination, algebraic graph Laplacian consensus protocols, virtual leader-follower structures, and flocking dynamics.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <span className="text-cyan-400 font-mono text-base">1.</span> Mathematical Formulations
        </h2>

        <MathBlock
          title="Continuous-Time Graph Laplacian Consensus Dynamics"
          latex={`\\dot{x}_i(t) = -\\sum_{j \\in \\mathcal{N}_i} a_{ij} (x_i(t) - x_j(t)) = -[L x(t)]_i`}
          explanation="Where L = D - A is the graph Laplacian matrix (Degree matrix minus Adjacency matrix) ensuring state synchronization across connected network topologies."
        />

        <MathBlock
          title="Virtual Rigid Structure Formation Geometry"
          latex={`x_{i}^{\\text{des}}(t) = x_{\\text{leader}}(t) + R(\\theta_{\\text{leader}}(t)) \\cdot d_i`}
          explanation="Preserves relative formation offset vector d_i transformed by the leader's instantaneous pose and heading."
        />
      </section>

      <section className="pt-6 border-t border-slate-800 flex items-center justify-between">
        <Link href="/learn/slam" className="text-xs font-mono text-slate-400 hover:text-slate-200">
          ← SLAM
        </Link>
        <Link
          href="/algorithms"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 text-xs font-mono font-medium border border-cyan-500/30 transition-colors"
        >
          <span>Explore Algorithm Laboratory</span>
          <span>→</span>
        </Link>
      </section>
    </div>
  );
}

'use client';

import React from 'react';
import { MultiAgentSimulator } from '@/components/simulation/MultiAgentSimulator';
import { MathBlock } from '@/components/mathematics/MathBlock';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Users, Sparkles, BookOpen } from 'lucide-react';

export default function MultiAgentPage() {
  const { locale } = useLanguage();
  const isId = locale === 'id';

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800/80 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-300 text-xs font-mono mb-3">
          <Users className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
          <span>{isId ? 'Milestone 8 • Laboratorium Domain' : 'Milestone 8 • Domain Laboratory'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
          {isId ? 'Robotika Multi-Agent & Kecerdasan Kawanan (Swarm)' : 'Multi-Agent Robotics & Swarm Intelligence'}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-3xl leading-relaxed">
          {isId
            ? 'Koordinasikan tim robot otonom terdistribusi. Simulasikan protokol konsensus Graph Laplacian, pemeliharaan formasi leader-follower, dan dinamika kawanan Reynolds Boids.'
            : 'Coordinate distributed teams of autonomous robots. Simulate Graph Laplacian consensus protocols, leader-follower formation maintenance, and Reynolds flocking dynamics.'}
        </p>
      </div>

      {/* 1. Interactive Simulator Module */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-mono font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
            <span>{isId ? 'Simulator Koordinasi Kawanan Interaktif' : 'Interactive Swarm Coordination Workstation'}</span>
          </h2>
          <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/20">
            Decentralized Mesh Protocol
          </span>
        </div>
        <MultiAgentSimulator />
      </div>

      {/* 2. Mathematical Rigor */}
      <div className="p-6 rounded-2xl glass-panel space-y-6">
        <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-mono text-sm font-bold border-b border-slate-200 dark:border-slate-800/80 pb-3">
          <BookOpen className="w-4 h-4" />
          <span>{isId ? 'Dinamika Konsensus Graph Laplacian' : 'Graph Laplacian Consensus Dynamics'}</span>
        </div>

        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
            1. {isId ? 'Protokol Konsensus Linier Terdistribusi' : 'Distributed Linear Consensus Protocol'}
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
            {isId
              ? 'Untuk graf jaringan komunikasi G = (V, E) dengan matriks Laplacian L = D - A:'
              : 'For a communication network graph G = (V, E) with Graph Laplacian matrix L = D - A:'}
          </p>
          <div className="mt-3">
            <MathBlock
              latex="\dot{x}_i(t) = -\sum_{j \in \mathcal{N}_i} a_{ij} \big( x_i(t) - x_j(t) \big)"
              title={isId ? 'Protokol Konsensus Rendezvous Waktu Kontinu' : 'Continuous-Time Rendezvous Consensus Protocol'}
            />
          </div>
          <div className="mt-3">
            <MathBlock
              latex="\dot{\mathbf{x}}(t) = -\mathcal{L}\, \mathbf{x}(t)"
              title={isId ? 'Representasi Status Diferensial Matriks Global' : 'Global Matrix Differential State Representation'}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

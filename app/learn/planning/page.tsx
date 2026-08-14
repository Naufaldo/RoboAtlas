'use client';

import React from 'react';
import { PathPlanningSimulator } from '@/components/simulation/PathPlanningSimulator';
import { MathBlock } from '@/components/mathematics/MathBlock';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Navigation, Sparkles, BookOpen, Code2 } from 'lucide-react';

export default function PlanningPage() {
  const { locale } = useLanguage();
  const isId = locale === 'id';

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Title Header */}
      <div className="border-b border-slate-200 dark:border-slate-800/80 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-300 text-xs font-mono mb-3">
          <Navigation className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
          <span>{isId ? 'Milestone 2–4 • Laboratorium Domain' : 'Milestone 2–4 • Domain Laboratory'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
          {isId ? 'Perencanaan Jalur & Pencarian Heuristik' : 'Path Planning & Heuristic Search'}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-3xl leading-relaxed">
          {isId
            ? 'Pelajari algoritma penelusuran graf optimal, estimasi heuristik admisibel, dan perutean kontinu termasuk Dijkstra, A* Search, dan varian multi-arah.'
            : 'Explore optimal graph traversal, admissible heuristic estimation, and continuous trajectory generation algorithms including Dijkstra and A* Search.'}
        </p>
      </div>

      {/* 1. Interactive Simulator Module */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-mono font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
            <span>{isId ? 'Simulator Interaktif Perencanaan Jalur Grid' : 'Interactive Grid Path Planning Sandbox'}</span>
          </h2>
          <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/20">
            A* & Dijkstra Engines
          </span>
        </div>
        <PathPlanningSimulator />
      </div>

      {/* 2. Mathematical Rigor & KaTeX Formulations */}
      <div className="p-6 rounded-2xl glass-panel space-y-6">
        <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-mono text-sm font-bold border-b border-slate-200 dark:border-slate-800/80 pb-3">
          <BookOpen className="w-4 h-4" />
          <span>{isId ? 'Fungsi Evaluasi & Kriteria Admisibilitas' : 'Evaluation Function & Admissibility Criteria'}</span>
        </div>

        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
            1. {isId ? 'Fungsi Prioritas Node A*' : 'A* Node Evaluation Function'}
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
            {isId
              ? 'Algoritma A* memperluas simpul graf yang meminimalkan total estimasi biaya f(n) dari start ke goal melalui node n:'
              : 'A* expands graph nodes minimizing the total estimated cost f(n) from start to goal through node n:'}
          </p>
          <div className="mt-3">
            <MathBlock
              latex="f(n) = g(n) + h(n)"
              title={isId ? 'Fungsi Prioritas Evaluasi A*' : 'A* Node Priority Function'}
            />
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
            2. {isId ? 'Heuristik Admisibel & Konsisten' : 'Admissible & Consistent Heuristics'}
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
            {isId
              ? 'Untuk menjamin optimalitas pada grid 8-arah dengan pergerakan diagonal, digunakan jarak Octile:'
              : 'For optimality guarantee in 8-connected planar grid graphs with diagonal movements, Octile distance is applied:'}
          </p>
          <div className="mt-3">
            <MathBlock
              latex="h_{octile}(n) = (\Delta x + \Delta y) + (\sqrt{2} - 2)\min(\Delta x, \Delta y)"
              title={isId ? 'Heuristik Jarak Octile (Admisibel pada Grid 8-Arah)' : 'Octile Distance Heuristic'}
            />
          </div>
        </div>
      </div>

      {/* 3. Pure TypeScript Engine */}
      <div className="p-6 rounded-2xl glass-panel space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800/80 pb-3">
          <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-mono text-sm font-bold">
            <Code2 className="w-4 h-4" />
            <span>{isId ? 'Pseudocode Algoritma A*' : 'Algorithm Pseudocode'}</span>
          </div>
          <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">Time Complexity: O((V + E) log V)</span>
        </div>

        <pre className="p-4 rounded-xl bg-slate-100 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 overflow-x-auto leading-relaxed">
{`function A_Star(start, goal, heuristic):
    openSet = PriorityQueue()
    openSet.insert(start, priority=h(start, goal))
    gScore[start] = 0
    
    while openSet is not empty:
        current = openSet.pop_min()
        if current == goal:
            return reconstruct_path(cameFrom, current)
            
        for neighbor in neighbors(current):
            tentative_g = gScore[current] + cost(current, neighbor)
            if tentative_g < gScore.get(neighbor, infinity):
                cameFrom[neighbor] = current
                gScore[neighbor] = tentative_g
                fScore = tentative_g + heuristic(neighbor, goal)
                openSet.insert_or_update(neighbor, priority=fScore)
                
    return failure  // No path exists`}
        </pre>
      </div>
    </div>
  );
}

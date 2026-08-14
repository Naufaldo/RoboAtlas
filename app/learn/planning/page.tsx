'use client';

import React from 'react';
import { PathPlanningSimulator } from '@/components/simulation/PathPlanningSimulator';
import { FormulaExplainer } from '@/components/mathematics/FormulaExplainer';
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

      {/* 2. Formula Explainer for A* Evaluation Function */}
      <FormulaExplainer
        id="formula-astar"
        title={isId ? 'Fungsi Evaluasi Biaya Node A*' : 'A* Node Cost Evaluation Function'}
        latex="f(n) = g(n) + h(n)"
        meaning={
          isId
            ? 'Total estimasi biaya rute f(n) yang melewati simpul n tersusun atas biaya aktual yang sudah ditempuh g(n) ditambah estimasi biaya sisa ke tujuan h(n).'
            : 'Total estimated path cost f(n) through node n equals known accumulated cost from start g(n) plus estimated remaining cost to goal h(n).'
        }
        whyExplanation={
          isId
            ? 'Dijkstra hanya melihat g(n) sehingga mencari ke segala arah secara membabi buta. Greedy Best-First hanya melihat h(n) sehingga bisa terjebak jalur sub-optimal. Menggabungkan g(n) dan h(n) mengarahkan pencarian langsung ke arah tujuan secara terfokus sekaligus MENJAMIN jalur terpendek optimal (asalkan h(n) admisibel).'
            : 'Dijkstra only minimizes past cost g(n), blindly expanding in circles. Greedy Best-First only minimizes h(n), prone to sub-optimal traps. Combining g(n) + h(n) directs search toward the goal while strictly guaranteeing shortest path optimality (when h is admissible).'
        }
        variables={[
          { symbol: 'f(n)', name: 'Total Priority Cost', unit: 'cost units / m', meaning: isId ? 'Kunci prioritas antrean untuk ekspansi node berikutnya' : 'Priority key in min-heap open queue' },
          { symbol: 'g(n)', name: 'Known Path Cost', unit: 'cost units / m', meaning: isId ? 'Biaya riil dari titik start ke node n' : 'Exact cumulative cost paid from start to node n' },
          { symbol: 'h(n)', name: 'Heuristic Estimate', unit: 'cost units / m', meaning: isId ? 'Estimasi jarak sisa dari node n ke titik tujuan goal' : 'Underestimated distance from node n to goal' },
        ]}
        numericalExample={{
          inputs: { 'g(current)': 14.5, 'h(current)': 8.2 },
          calculationSteps: [
            'f(current) = g(current) + h(current)',
            'f(current) = 14.5 + 8.2 = 22.7',
          ],
          result: 'f(n) = 22.7',
        }}
        roboticsApplication={
          isId
            ? 'Algoritma standar industri navigasi perutean grid 2D pada robot vacuum, AGV gudang, dan game AI.'
            : 'Standard global planner in mobile robotics (ROS Nav2 Grid Planner, automated warehouse fleets).'
        }
        calculator={{
          params: [
            { key: 'g', label: 'Accumulated Cost g(n)', unit: 'm', default: 12.0, min: 0.0, max: 50.0, step: 0.5 },
            { key: 'h', label: 'Heuristic Estimate h(n)', unit: 'm', default: 9.5, min: 0.0, max: 50.0, step: 0.5 },
          ],
          calculate: (inputs) => {
            const { g, h } = inputs;
            const f = g + h;
            return {
              steps: [
                `f(n) = ${g} + ${h} = ${f.toFixed(2)}`,
              ],
              result: `f(n) = ${f.toFixed(2)}`,
            };
          },
        }}
      />

      {/* 3. Heuristic Formula Explainer */}
      <FormulaExplainer
        id="formula-octile-heuristic"
        title={isId ? 'Heuristik Jarak Octile (Grid 8-Arah)' : 'Octile Distance Heuristic (8-Connected Grid)'}
        latex="h_{octile}(n) = (\Delta x + \Delta y) + (\sqrt{2} - 2)\min(\Delta x, \Delta y)"
        meaning={
          isId
            ? 'Heuristik admisibel dan konsisten yang menghitung jarak terpendek pada grid 2D dengan pergerakan 8-arah (horizontal, vertikal, diagonal).'
            : 'Admissible and consistent heuristic measuring shortest distance on an 8-connected grid with diagonal traversal.'
        }
        whyExplanation={
          isId
            ? 'Jarak Manhattan mengabaikan langkah diagonal sehingga melebih-lebihkan biaya (overestimate/tidak admisibel). Jarak Euclidean memotong lurus dan meremehkan kisi. Jarak Octile mengombinasikan langkah diagonal (bobot sqrt(2)) dan langkah ortogonal (bobot 1) secara presisi.'
            : 'Manhattan distance ignores diagonal cuts, causing overestimation. Euclidean distance assumes continuous motion, underestimating grid steps. Octile precisely counts diagonal steps (cost √2) and straight steps (cost 1).'
        }
        variables={[
          { symbol: 'Δx', name: 'Horizontal Separation', unit: 'grid cells', meaning: isId ? '|x_goal - x_n|' : 'Absolute horizontal grid distance' },
          { symbol: 'Δy', name: 'Vertical Separation', unit: 'grid cells', meaning: isId ? '|y_goal - y_n|' : 'Absolute vertical grid distance' },
          { symbol: 'h_octile', name: 'Octile Heuristic', unit: 'cost units', meaning: isId ? 'Estimasi jarak optimal admisibel' : 'Admissible distance estimate' },
        ]}
        roboticsApplication={
          isId
            ? 'Dipakai pada perencana jalur ROS Nav2 Costmap 2D untuk menjamin pencarian jalur tercepat tanpa distorsi grid.'
            : 'Used in 2D costmap planners to ensure diagonal-aware path optimality without metric distortion.'
        }
      />
    </div>
  );
}

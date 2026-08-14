'use client';

import React from 'react';
import { PathPlanningSimulator } from '@/components/simulation/PathPlanningSimulator';
import { FormulaExplainer } from '@/components/mathematics/FormulaExplainer';
import { LessonOrientation } from '@/components/layout/LessonOrientation';
import { LessonNavigation } from '@/components/layout/LessonNavigation';
import { MathCodeBridge } from '@/components/educational/MathCodeBridge';
import { AcademicReferences } from '@/components/educational/AcademicReferences';
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

      {/* Lesson Orientation Card */}
      <LessonOrientation
        domain={isId ? 'Perencanaan Jalur' : 'Path Planning'}
        lessonTitle={isId ? 'Pencarian Grid Optimal: Dijkstra & A*' : 'Optimal Grid Search: Dijkstra & A*'}
        estimatedMinutes={20}
        learningObjectives={[
          isId ? 'Memahami konsep graf grid 2D dengan tetangga 4-arah vs 8-arah' : 'Understand 2D grid graphs with 4-connectivity vs 8-connectivity',
          isId ? 'Membedakan ekspansi buta Dijkstra dengan pencarian terarah A*' : 'Differentiate blind Dijkstra expansion from goal-directed A*',
          isId ? 'Menghitung fungsi evaluasi biaya f(n) = g(n) + h(n)' : 'Compute node cost evaluation functions f(n) = g(n) + h(n)',
          isId ? 'Membuktikan syarat admisibilitas heuristik untuk jaminan rute terpendek' : 'Verify heuristic admissibility conditions for shortest-path optimality',
        ]}
        whyItMatters={
          isId
            ? 'Tanpa perencana jalur global, robot akan menabrak rintangan atau tersesat dalam labirin tanpa mengetahui jalur tercepat menuju tujuan.'
            : 'Without a global path planner, autonomous robots would collide with obstacles or wander aimlessly without finding optimal paths.'
        }
      />

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

      {/* 3. Section 38 Math <-> Code Bridge Component */}
      <MathCodeBridge
        title={isId ? 'Jembatan Evaluasi Biaya Node A* ke Kode TypeScript' : 'A* Node Evaluation Math-to-Code Bridge'}
        mathLatex="f(n) = g(n) + h(n)"
        codeSnippet={`// TypeScript implementation of A* node expansion
const tentativeG = current.g + moveCost;
const hCost = heuristic(neighbor, goal);
const fCost = tentativeG + hCost;

openSet.push({
  node: neighbor,
  g: tentativeG,
  h: hCost,
  f: fCost,
  parent: current
});`}
        explanation={
          isId
            ? 'Baris kode "const fCost = tentativeG + hCost;" mengimplementasikan fungsi evaluasi matematis secara langsung satu-ke-satu. Nilai fCost kemudian digunakan sebagai kunci prioritas pada Min-Heap antrean terbuka (openSet).'
            : 'The code statement "const fCost = tentativeG + hCost;" implements the mathematical formula in exact 1-to-1 parity. The calculated fCost key orders the min-heap priority queue.'
        }
        mappings={[
          { mathSymbol: 'f(n)', codeIdentifier: 'fCost', explanation: isId ? 'Total skor prioritas node dalam antrean terbuka' : 'Total priority score in the open queue' },
          { mathSymbol: 'g(n)', codeIdentifier: 'tentativeG', explanation: isId ? 'Biaya jalur terakumulasi dari titik awal start' : 'Cumulative cost from start' },
          { mathSymbol: 'h(n)', codeIdentifier: 'hCost', explanation: isId ? 'Estimasi jarak heuristik (Octile/Euclidean) ke goal' : 'Heuristic estimate distance to goal' },
        ]}
      />

      {/* 4. Section 39 Academic References */}
      <AcademicReferences
        references={[
          {
            id: 1,
            authors: 'Steven M. LaValle',
            title: 'Planning Algorithms',
            publisher: 'Cambridge University Press',
            year: 2006,
            chapterCoverage: 'Chapter 2.2: Discrete Planning, Graph Search, and Shortest Paths.',
            doiOrUrl: 'https://planning.cs.uiuc.edu/',
          },
          {
            id: 2,
            authors: 'Peter E. Hart, Nils J. Nilsson, & Bertram Raphael',
            title: 'A Formal Basis for the Heuristic Determination of Minimum Cost Paths',
            publisher: 'IEEE Transactions on Systems Science and Cybernetics',
            year: 1968,
            chapterCoverage: 'Original proof of A* optimality and admissibility theorem.',
            doiOrUrl: 'https://doi.org/10.1109/TSSC.1968.300136',
          },
        ]}
      />

      {/* Next Steps Navigation */}
      <LessonNavigation
        prevLesson={{
          domain: isId ? 'Fondasi Robotika' : 'Robotics Foundations',
          title: isId ? 'Dasar-Dasar Matematika & Kinematika' : 'Fundamentals & Kinematics',
          href: '/learn/fundamentals',
        }}
        nextLesson={{
          domain: isId ? 'Lokalisasi Robot' : 'Robot Localization',
          title: isId ? 'Filter Partikel Monte Carlo (MCL)' : 'Monte Carlo Particle Filter (MCL)',
          href: '/learn/localization',
        }}
        suggestedExperiments={[
          isId ? 'Gambar dinding rintangan berbentuk huruf U dan amati bagaimana A* menghindari jebakan lokal' : 'Draw a U-shaped obstacle barrier to observe how A* avoids local minima traps',
          isId ? 'Bandingkan jumlah node yang dieksplorasi antara Dijkstra dan A* pada rintangan yang sama' : 'Compare total explored node count between Dijkstra and A* on identical obstacle layouts',
          isId ? 'Coba ubah tipe heuristik dari Octile ke Manhattan pada simulator' : 'Switch heuristic mode between Octile, Euclidean, and Manhattan in the simulator',
        ]}
      />
    </div>
  );
}

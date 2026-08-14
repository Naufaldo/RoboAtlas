import React from 'react';
import { MathBlock, InlineMath } from '@/components/mathematics/MathBlock';
import { Navigation, Cpu, Sparkles, BookOpen, Layers } from 'lucide-react';
import Link from 'next/link';

export default function PathPlanningPage() {
  return (
    <div className="space-y-10 max-w-4xl">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
          <Navigation className="w-4 h-4" />
          <span>Domain 05 / Milestone 2 - 4</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-100">
          Path Planning & Trajectory Generation
        </h1>
        <p className="text-sm text-slate-400 mt-2 leading-relaxed">
          From deterministic grid searches (Dijkstra, A*) and dynamic replanners (D* Lite) to high-dimensional sampling trees (RRT, RRT*) and reactive physics-based potential fields.
        </p>
      </div>

      {/* 1. Problem Formulation */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <span className="text-cyan-400 font-mono text-base">1.</span> What Problem Does Path Planning Solve?
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed">
          Given a known map of obstacles <InlineMath latex="\mathcal{C}_{\text{obs}}" />, a starting configuration <InlineMath latex="\mathbf{q}_{\text{start}}" />, and a target goal configuration <InlineMath latex="\mathbf{q}_{\text{goal}}" />, compute a collision-free path <InlineMath latex="\tau: [0, 1] \to \mathcal{C}_{\text{free}}" /> that minimizes a cost functional (distance, traversal time, or energy).
        </p>
      </section>

      {/* 2. Mathematical Models */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <span className="text-cyan-400 font-mono text-base">2.</span> Mathematical Formulations
        </h2>

        <MathBlock
          title="A* Evaluation Function"
          latex={`f(n) = g(n) + h(n)`}
          explanation="Where g(n) is the exact accumulated cost from start to node n, and h(n) is an admissible heuristic estimating cost from n to goal."
        />

        <MathBlock
          title="Artificial Potential Field (APF) Gradient Force"
          latex={`F_{\\text{net}}(q) = -\\nabla U_{\\text{att}}(q) - \\nabla U_{\\text{rep}}(q) = -k_{\\text{att}} (q - q_{\\text{goal}}) + k_{\\text{rep}} \\left(\\frac{1}{d(q)} - \\frac{1}{d_0}\\right) \\frac{1}{d^2(q)} \\nabla d(q)`}
          explanation="Combines attractive parabolic potential well toward goal with repulsive hyperbolic barrier around obstacles."
        />

        <MathBlock
          title="RRT* Asymptotic Near-Neighbor Rewiring Radius"
          latex={`r_n = \\gamma_{\\text{RRT}^*} \\left( \\frac{\\log n}{n} \\right)^{1/d}`}
          explanation="Shrinking ball radius ensuring asymptotic optimality with probability 1 as number of sampled nodes n approaches infinity."
        />
      </section>

      {/* 3. Pseudocode: A* Search */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <span className="text-cyan-400 font-mono text-base">3.</span> A* Algorithm Pseudocode
        </h2>
        <div className="rounded-xl bg-slate-950 border border-slate-800 p-4 font-mono text-xs overflow-x-auto text-slate-300">
          <pre>{`function A_Star(Grid, start, goal, heuristic):
  openSet = PriorityQueue()
  openSet.insert(start, priority = 0)
  cameFrom = Map()
  gScore = Map(default = INFINITY)
  gScore[start] = 0

  while openSet is not empty:
    current = openSet.popLowest()
    if current == goal:
      return reconstructPath(cameFrom, current)

    for neighbor in getNeighbors(Grid, current):
      tentative_g = gScore[current] + cost(current, neighbor)
      if tentative_g < gScore[neighbor]:
        cameFrom[neighbor] = current
        gScore[neighbor] = tentative_g
        fScore = tentative_g + heuristic(neighbor, goal)
        openSet.insertOrUpdate(neighbor, priority = fScore)

  return failure (no path)`}</pre>
        </div>
      </section>

      {/* 4. Complexity & Tradeoffs */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <span className="text-cyan-400 font-mono text-base">4.</span> Complexity & Tradeoff Matrix
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs font-mono border-collapse border border-slate-800 rounded-xl">
            <thead>
              <tr className="bg-slate-900 text-cyan-400 text-left border-b border-slate-800">
                <th className="p-3">Algorithm</th>
                <th className="p-3">Time Complexity</th>
                <th className="p-3">Space Complexity</th>
                <th className="p-3">Optimality</th>
                <th className="p-3">Continuous Space</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300">
              <tr>
                <td className="p-3 font-semibold text-slate-100">Dijkstra</td>
                <td className="p-3">O(|E| + |V| log |V|)</td>
                <td className="p-3">O(|V|)</td>
                <td className="p-3 text-emerald-400">Guaranteed</td>
                <td className="p-3 text-slate-500">Requires Discretization</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-100">A* Search</td>
                <td className="p-3">O(|E|) with good h(n)</td>
                <td className="p-3">O(|V|)</td>
                <td className="p-3 text-emerald-400">Guaranteed (Admissible h)</td>
                <td className="p-3 text-slate-500">Requires Discretization</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-100">RRT</td>
                <td className="p-3">O(n log n)</td>
                <td className="p-3">O(n)</td>
                <td className="p-3 text-amber-400">Feasible Only</td>
                <td className="p-3 text-emerald-400">Native C-Space</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-100">RRT*</td>
                <td className="p-3">O(n log n)</td>
                <td className="p-3">O(n)</td>
                <td className="p-3 text-emerald-400">Asymptotically Optimal</td>
                <td className="p-3 text-emerald-400">Native C-Space</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. Navigation */}
      <section className="pt-6 border-t border-slate-800 flex items-center justify-between">
        <Link href="/learn/fundamentals" className="text-xs font-mono text-slate-400 hover:text-slate-200">
          ← Fundamentals
        </Link>
        <Link
          href="/learn/localization"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 text-xs font-mono font-medium border border-cyan-500/30 transition-colors"
        >
          <span>Next: Localization (EKF & Particles)</span>
          <span>→</span>
        </Link>
      </section>
    </div>
  );
}

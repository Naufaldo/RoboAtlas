import React from 'react';
import { PathPlanningSimulator } from '@/components/simulation/PathPlanningSimulator';
import { MathBlock } from '@/components/mathematics/MathBlock';
import { Navigation, Sparkles, BookOpen, Code2, Cpu } from 'lucide-react';

export default function PlanningPage() {
  return (
    <div className="space-y-8">
      {/* Title Header */}
      <div className="border-b border-slate-800/80 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
          <Navigation className="w-3.5 h-3.5 text-cyan-400" />
          <span>Milestone 2–4 • Domain Laboratory</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-100">
          Path Planning & Heuristic Search
        </h1>
        <p className="text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">
          Explore optimal graph traversal, admissible heuristic estimation, and continuous trajectory generation algorithms including Dijkstra and A* Search.
        </p>
      </div>

      {/* 1. Interactive Simulator Module */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-mono font-bold text-slate-100 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Interactive Grid Path Planning Sandbox</span>
          </h2>
          <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/20">
            A* & Dijkstra Engines
          </span>
        </div>
        <PathPlanningSimulator />
      </div>

      {/* 2. Mathematical Rigor & KaTeX Formulations */}
      <div className="p-6 rounded-2xl glass-panel space-y-6">
        <div className="flex items-center gap-2 text-cyan-400 font-mono text-sm font-bold border-b border-slate-800/80 pb-3">
          <BookOpen className="w-4 h-4" />
          <span>Evaluation Function & Admissibility Criteria</span>
        </div>

        <div>
          <h3 className="text-sm font-bold text-slate-200">1. A* Evaluation Function</h3>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
            A* expands graph nodes minimizing the total estimated cost $f(n)$ from start to goal through node $n$:
          </p>
          <div className="mt-3">
            <MathBlock
              latex="f(n) = g(n) + h(n)"
              title="A* Node Priority Function"
            />
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold text-slate-200">2. Admissible & Consistent Heuristics</h3>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
            For optimality guarantee in 8-connected planar grid graphs with diagonal movements:
          </p>
          <div className="mt-3">
            <MathBlock
              latex="h_{octile}(n) = (\Delta x + \Delta y) + (\sqrt{2} - 2)\min(\Delta x, \Delta y)"
              title="Octile Distance Heuristic (Admissible on 8-Way Grids)"
            />
          </div>
        </div>
      </div>

      {/* 3. Pure TypeScript Engine */}
      <div className="p-6 rounded-2xl glass-panel space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-sm font-bold">
            <Code2 className="w-4 h-4" />
            <span>Algorithm Pseudocode</span>
          </div>
          <span className="text-[10px] font-mono text-slate-400">Time Complexity: O((V + E) log V)</span>
        </div>

        <pre className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed">
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

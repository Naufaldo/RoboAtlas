'use client';

import React, { useState, useMemo } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Compass, Sparkles, RotateCcw, Zap, Layers } from 'lucide-react';

export function AStarVsDijkstraSimulator() {
  const { locale } = useLanguage();
  const isId = locale === 'id';

  const GRID_SIZE = 16;
  const [heuristicType, setHeuristicType] = useState<'dijkstra' | 'manhattan' | 'euclidean' | 'octile'>('euclidean');

  // Start & Goal
  const start = { r: 2, c: 2 };
  const goal = { r: 13, c: 13 };

  // Fixed Wall Obstacles
  const obstacles = useMemo(() => {
    const set = new Set<string>();
    for (let r = 4; r <= 11; r++) set.add(`${r},7`);
    for (let c = 7; c <= 12; c++) set.add(`4,${c}`);
    for (let r = 8; r <= 14; r++) set.add(`${r},11`);
    return set;
  }, []);

  // Heuristic calculator
  const calcHeuristic = (r1: number, c1: number, r2: number, c2: number, type: string) => {
    const dr = Math.abs(r1 - r2);
    const dc = Math.abs(c1 - c2);
    if (type === 'dijkstra') return 0;
    if (type === 'manhattan') return (dr + dc) * 10;
    if (type === 'euclidean') return Math.hypot(dr, dc) * 10;
    // Octile
    return 10 * (dr + dc) + (14 - 2 * 10) * Math.min(dr, dc);
  };

  // Run Search Algorithm
  const { visitedOrder, path, expandedCount, pathCost } = useMemo(() => {
    const startKey = `${start.r},${start.c}`;
    const goalKey = `${goal.r},${goal.c}`;

    const gScore = new Map<string, number>();
    const fScore = new Map<string, number>();
    const parent = new Map<string, string>();
    const closed = new Set<string>();
    const openSet: { key: string; r: number; c: number; f: number }[] = [];

    gScore.set(startKey, 0);
    const h0 = calcHeuristic(start.r, start.c, goal.r, goal.c, heuristicType);
    fScore.set(startKey, h0);
    openSet.push({ key: startKey, r: start.r, c: start.c, f: h0 });

    const visited: string[] = [];

    while (openSet.length > 0) {
      openSet.sort((a, b) => a.f - b.f);
      const current = openSet.shift()!;

      if (closed.has(current.key)) continue;
      closed.add(current.key);
      visited.push(current.key);

      if (current.key === goalKey) break;

      // 8-connected neighbors
      const dr = [-1, 1, 0, 0, -1, -1, 1, 1];
      const dc = [0, 0, -1, 1, -1, 1, -1, 1];

      for (let i = 0; i < 8; i++) {
        const nr = current.r + dr[i];
        const nc = current.c + dc[i];
        const nKey = `${nr},${nc}`;

        if (nr < 0 || nr >= GRID_SIZE || nc < 0 || nc >= GRID_SIZE) continue;
        if (obstacles.has(nKey) || closed.has(nKey)) continue;

        const moveCost = i < 4 ? 10 : 14; // straight=10, diag=14
        const tentativeG = (gScore.get(current.key) ?? Infinity) + moveCost;

        if (tentativeG < (gScore.get(nKey) ?? Infinity)) {
          parent.set(nKey, current.key);
          gScore.set(nKey, tentativeG);
          const h = calcHeuristic(nr, nc, goal.r, goal.c, heuristicType);
          const f = tentativeG + h;
          fScore.set(nKey, f);
          openSet.push({ key: nKey, r: nr, c: nc, f });
        }
      }
    }

    // Reconstruct Path
    const pathList: string[] = [];
    let curr: string | undefined = goalKey;
    if (closed.has(goalKey)) {
      while (curr) {
        pathList.push(curr);
        curr = parent.get(curr);
      }
      pathList.reverse();
    }

    return {
      visitedOrder: visited,
      path: new Set(pathList),
      expandedCount: closed.size,
      pathCost: gScore.get(goalKey) ?? 0,
    };
  }, [heuristicType, obstacles]);

  return (
    <div className="p-6 rounded-3xl glass-panel border border-slate-200 dark:border-slate-800 space-y-4 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-slate-200 dark:border-slate-800/80">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-500">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 font-mono">
              {isId ? 'Laboratorium Komparasi: A* vs Dijkstra' : 'Search Algorithm Comparison: A* vs Dijkstra'}
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-sans">
              {isId
                ? 'Pilih fungsi heuristik h(n) untuk melihat bagaimana pemandu target memangkas jumlah simpul yang dieksplorasi.'
                : 'Select heuristic h(n) to observe how goal biasing reduces the search wavefront count.'}
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setHeuristicType('dijkstra')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all border ${
              heuristicType === 'dijkstra'
                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-slate-500'
            }`}
          >
            Dijkstra (h=0)
          </button>

          <button
            onClick={() => setHeuristicType('euclidean')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all border ${
              heuristicType === 'euclidean'
                ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md'
                : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-slate-500'
            }`}
          >
            A* (Euclidean)
          </button>

          <button
            onClick={() => setHeuristicType('manhattan')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all border ${
              heuristicType === 'manhattan'
                ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md'
                : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-slate-500'
            }`}
          >
            A* (Manhattan)
          </button>
        </div>
      </div>

      {/* Grid Canvas */}
      <div className="flex justify-center p-2 rounded-2xl bg-slate-950 border border-slate-800">
        <div
          className="grid gap-1"
          style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))` }}
        >
          {Array.from({ length: GRID_SIZE }).map((_, r) =>
            Array.from({ length: GRID_SIZE }).map((_, c) => {
              const key = `${r},${c}`;
              const isStart = r === start.r && c === start.c;
              const isGoal = r === goal.r && c === goal.c;
              const isObs = obstacles.has(key);
              const isPath = path.has(key);
              const isVisited = !isPath && visitedOrder.includes(key);

              let cellStyle = 'bg-slate-900/60 border-slate-800';
              if (isObs) cellStyle = 'bg-slate-700 border-slate-600';
              else if (isStart) cellStyle = 'bg-cyan-500 border-cyan-400 font-bold text-slate-950';
              else if (isGoal) cellStyle = 'bg-emerald-500 border-emerald-400 font-bold text-slate-950';
              else if (isPath) cellStyle = 'bg-amber-400 border-amber-300 shadow-md shadow-amber-500/20';
              else if (isVisited) cellStyle = 'bg-cyan-950/70 border-cyan-900/50';

              return (
                <div
                  key={key}
                  className={`w-6 h-6 sm:w-7 sm:h-7 rounded-md border flex items-center justify-center text-[9px] font-mono transition-all ${cellStyle}`}
                >
                  {isStart ? 'S' : isGoal ? 'G' : ''}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Telemetry Comparison Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
        <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <span className="text-[10px] text-cyan-400 block uppercase font-bold">
            {isId ? 'Simpul Diekspansi (Expanded Nodes)' : 'Expanded Node Count'}
          </span>
          <strong className="text-xl font-bold text-cyan-400">{expandedCount}</strong>
          <span className="text-slate-400 text-[11px] block">
            {heuristicType === 'dijkstra'
              ? (isId ? 'Gelombang menyebar ke segala arah' : 'Uniform 360° blind wavefront')
              : (isId ? 'Fokus terarah ke target (Goal-biased)' : 'Narrow goal-directed search cone')}
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <span className="text-[10px] text-amber-400 block uppercase font-bold">
            {isId ? 'Biaya Jalur Optimal (Path Cost g)' : 'Optimal Path Cost (g)'}
          </span>
          <strong className="text-xl font-bold text-amber-400">{pathCost}</strong>
          <span className="text-slate-400 text-[11px] block">
            {isId ? 'Biaya langkah (Lurus: 10, Diagonal: 14)' : 'Unit cost (Straight: 10, Diagonal: 14)'}
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <span className="text-[10px] text-emerald-400 block uppercase font-bold">
            {isId ? 'Karakter Heuristik h(n)' : 'Heuristic Character'}
          </span>
          <strong className="text-sm font-bold text-emerald-400 uppercase">{heuristicType}</strong>
          <span className="text-slate-400 text-[11px] block">
            {heuristicType === 'dijkstra' ? 'h(n) = 0 (Admisibel)' : 'h(n) ≤ h*(n) (Konsisten & Optimal)'}
          </span>
        </div>
      </div>
    </div>
  );
}

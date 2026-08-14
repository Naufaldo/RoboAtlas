'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw, StepForward, Navigation, Sliders, CheckCircle2, ShieldAlert } from 'lucide-react';

interface GridCell {
  r: number;
  c: number;
}

export function PathPlanningSimulator() {
  const ROWS = 16;
  const COLS = 26;

  const [grid, setGrid] = useState<number[][]>(() => {
    // 0: empty, 1: wall, 2: start, 3: goal
    const g = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
    // Default obstacle cluster
    for (let r = 3; r < 13; r++) g[r][10] = 1;
    for (let c = 10; c < 18; c++) g[12][c] = 1;
    g[8][4] = 2; // Start
    g[8][20] = 3; // Goal
    return g;
  });

  const [algorithm, setAlgorithm] = useState<'astar' | 'dijkstra'>('astar');
  const [heuristicType, setHeuristicType] = useState<'euclidean' | 'manhattan' | 'octile'>('octile');
  const [allowDiagonal, setAllowDiagonal] = useState(true);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawMode, setDrawMode] = useState<1 | 0>(1); // 1 = wall, 0 = erase

  const [exploredCells, setExploredCells] = useState<GridCell[]>([]);
  const [finalPath, setFinalPath] = useState<GridCell[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchStats, setSearchStats] = useState<{
    exploredCount: number;
    pathLength: number;
    cost: number;
    found: boolean;
  }>({
    exploredCount: 0,
    pathLength: 0,
    cost: 0,
    found: false,
  });

  // Find start and goal
  const getStartGoal = useCallback(() => {
    let start: GridCell = { r: 8, c: 4 };
    let goal: GridCell = { r: 8, c: 20 };
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (grid[r][c] === 2) start = { r, c };
        if (grid[r][c] === 3) goal = { r, c };
      }
    }
    return { start, goal };
  }, [grid, ROWS, COLS]);

  const heuristic = useCallback(
    (a: GridCell, b: GridCell) => {
      const dr = Math.abs(a.r - b.r);
      const dc = Math.abs(a.c - b.c);
      if (heuristicType === 'manhattan') return dr + dc;
      if (heuristicType === 'euclidean') return Math.hypot(dr, dc);
      // Octile
      return (dr + dc) + (Math.SQRT2 - 2) * Math.min(dr, dc);
    },
    [heuristicType]
  );

  const runPlanner = useCallback(() => {
    const { start, goal } = getStartGoal();

    // Priority Queue implementation
    interface NodeRecord {
      cell: GridCell;
      g: number;
      f: number;
      parent?: NodeRecord;
    }

    const openSet: NodeRecord[] = [];
    const closedSet = new Set<string>();
    const key = (c: GridCell) => `${c.r},${c.c}`;

    const startNode: NodeRecord = {
      cell: start,
      g: 0,
      f: algorithm === 'astar' ? heuristic(start, goal) : 0,
    };
    openSet.push(startNode);

    const explored: GridCell[] = [];
    let pathFound = false;
    let finalNode: NodeRecord | undefined;

    while (openSet.length > 0) {
      // Sort openSet by f-score
      openSet.sort((a, b) => a.f - b.f);
      const current = openSet.shift()!;
      const cKey = key(current.cell);

      if (closedSet.has(cKey)) continue;
      closedSet.add(cKey);
      explored.push(current.cell);

      if (current.cell.r === goal.r && current.cell.c === goal.c) {
        pathFound = true;
        finalNode = current;
        break;
      }

      // Neighbors
      const dirs = allowDiagonal
        ? [
            { r: -1, c: 0, cost: 1 },
            { r: 1, c: 0, cost: 1 },
            { r: 0, c: -1, cost: 1 },
            { r: 0, c: 1, cost: 1 },
            { r: -1, c: -1, cost: Math.SQRT2 },
            { r: -1, c: 1, cost: Math.SQRT2 },
            { r: 1, c: -1, cost: Math.SQRT2 },
            { r: 1, c: 1, cost: Math.SQRT2 },
          ]
        : [
            { r: -1, c: 0, cost: 1 },
            { r: 1, c: 0, cost: 1 },
            { r: 0, c: -1, cost: 1 },
            { r: 0, c: 1, cost: 1 },
          ];

      for (const d of dirs) {
        const nr = current.cell.r + d.r;
        const nc = current.cell.c + d.c;

        if (nr < 0 || nr >= ROWS || nc < 0 || nc >= COLS) continue;
        if (grid[nr][nc] === 1) continue; // wall
        if (closedSet.has(`${nr},${nc}`)) continue;

        const gScore = current.g + d.cost;
        const hScore = algorithm === 'astar' ? heuristic({ r: nr, c: nc }, goal) : 0;
        const fScore = gScore + hScore;

        openSet.push({
          cell: { r: nr, c: nc },
          g: gScore,
          f: fScore,
          parent: current,
        });
      }
    }

    // Reconstruct path
    const path: GridCell[] = [];
    let curr = finalNode;
    while (curr) {
      path.unshift(curr.cell);
      curr = curr.parent;
    }

    setExploredCells(explored);
    setFinalPath(path);
    setSearchStats({
      exploredCount: explored.length,
      pathLength: path.length,
      cost: finalNode ? Number(finalNode.g.toFixed(2)) : 0,
      found: pathFound,
    });
  }, [algorithm, allowDiagonal, getStartGoal, grid, heuristic, ROWS, COLS]);

  // Handle cell click / drag
  const handleCellClick = (r: number, c: number) => {
    if (grid[r][c] === 2 || grid[r][c] === 3) return; // don't overwrite start/goal
    const next = grid.map((row) => [...row]);
    next[r][c] = next[r][c] === 1 ? 0 : 1;
    setGrid(next);
  };

  const clearWalls = () => {
    const next = grid.map((row) =>
      row.map((cell) => (cell === 1 ? 0 : cell))
    );
    setGrid(next);
    setExploredCells([]);
    setFinalPath([]);
  };

  const resetAll = () => {
    const g = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
    for (let r = 3; r < 13; r++) g[r][10] = 1;
    for (let c = 10; c < 18; c++) g[12][c] = 1;
    g[8][4] = 2;
    g[8][20] = 3;
    setGrid(g);
    setExploredCells([]);
    setFinalPath([]);
  };

  const exploredSet = new Set(exploredCells.map((c) => `${c.r},${c.c}`));
  const pathSet = new Set(finalPath.map((c) => `${c.r},${c.c}`));

  return (
    <div className="rounded-2xl glass-panel border border-slate-800/90 overflow-hidden shadow-2xl space-y-0">
      {/* Top Header & Telemetry */}
      <div className="px-4 py-3 bg-slate-900/80 border-b border-slate-800/80 flex items-center justify-between flex-wrap gap-2 text-xs font-mono">
        <div className="flex items-center gap-2 text-cyan-400 font-bold">
          <Navigation className="w-4 h-4" />
          <span>Interactive Grid Search Sandbox (A* & Dijkstra)</span>
        </div>

        <div className="flex items-center gap-4 text-[11px] text-slate-300">
          <span>
            Explored Nodes: <strong className="text-cyan-400">{searchStats.exploredCount}</strong>
          </span>
          <span>
            Path Steps: <strong className="text-emerald-400">{searchStats.pathLength}</strong>
          </span>
          <span>
            Total Cost: <strong className="text-amber-400">{searchStats.cost}</strong>
          </span>
        </div>
      </div>

      {/* Grid Canvas Interactive Board */}
      <div className="p-4 bg-[#050811] flex justify-center overflow-x-auto">
        <div className="inline-grid gap-[3px] bg-slate-950 p-2 rounded-xl border border-slate-800 select-none shadow-inner"
          style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}
        >
          {grid.map((row, r) =>
            row.map((cell, c) => {
              const k = `${r},${c}`;
              const isStart = cell === 2;
              const isGoal = cell === 3;
              const isWall = cell === 1;
              const isPath = pathSet.has(k) && !isStart && !isGoal;
              const isExplored = exploredSet.has(k) && !isPath && !isStart && !isGoal;

              let bg = 'bg-slate-900/80 hover:bg-slate-800 border-slate-800/50';
              if (isWall) bg = 'bg-slate-700/90 border-slate-600 shadow-md';
              else if (isStart) bg = 'bg-cyan-500 shadow-lg shadow-cyan-500/50 text-slate-950 font-bold border-cyan-400 animate-pulse';
              else if (isGoal) bg = 'bg-emerald-500 shadow-lg shadow-emerald-500/50 text-slate-950 font-bold border-emerald-400 animate-pulse';
              else if (isPath) bg = 'bg-emerald-400 shadow-md shadow-emerald-500/40 border-emerald-300';
              else if (isExplored) bg = 'bg-cyan-950/80 border-cyan-800/60';

              return (
                <div
                  key={k}
                  onClick={() => handleCellClick(r, c)}
                  className={`w-5 h-5 sm:w-6 sm:h-6 rounded-md border flex items-center justify-center text-[10px] cursor-pointer transition-all ${bg}`}
                  title={`[${r}, ${c}]`}
                >
                  {isStart && 'S'}
                  {isGoal && 'G'}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Control Toolbar */}
      <div className="p-4 bg-slate-900/90 border-t border-slate-800 space-y-3 text-xs font-mono">
        <div className="flex items-center justify-between flex-wrap gap-3">
          {/* Planner Select */}
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Algorithm:</span>
            <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800">
              <button
                onClick={() => setAlgorithm('astar')}
                className={`px-3 py-1 rounded transition-all ${
                  algorithm === 'astar'
                    ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                A* Search
              </button>
              <button
                onClick={() => setAlgorithm('dijkstra')}
                className={`px-3 py-1 rounded transition-all ${
                  algorithm === 'dijkstra'
                    ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Dijkstra
              </button>
            </div>

            {algorithm === 'astar' && (
              <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800 text-[11px]">
                <span className="text-slate-500 px-1">Heuristic:</span>
                {(['octile', 'euclidean', 'manhattan'] as const).map((h) => (
                  <button
                    key={h}
                    onClick={() => setHeuristicType(h)}
                    className={`px-2 py-0.5 rounded capitalize transition-all ${
                      heuristicType === h
                        ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {h}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Diagonal Toggle */}
          <label className="flex items-center gap-2 cursor-pointer text-slate-300">
            <input
              type="checkbox"
              checked={allowDiagonal}
              onChange={(e) => setAllowDiagonal(e.target.checked)}
              className="accent-cyan-500 w-4 h-4 rounded cursor-pointer"
            />
            <span>Allow 8-Way Diagonal</span>
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-1 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <button
              onClick={runPlanner}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/20 transition-all transform hover:-translate-y-0.5"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              Find Optimal Path
            </button>

            <button
              onClick={clearWalls}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
            >
              Clear Walls
            </button>

            <button
              onClick={resetAll}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Map
            </button>
          </div>

          <div className="text-[11px] text-slate-500">
            💡 Click any grid cell to toggle wall obstacle
          </div>
        </div>
      </div>
    </div>
  );
}

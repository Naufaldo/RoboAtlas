'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw, Compass, Sparkles, Layers, Sliders, Activity } from 'lucide-react';
import { InlineMath } from '@/components/mathematics/MathBlock';

type CellState = 'unknown' | 'free' | 'obstacle';

interface Point {
  r: number;
  c: number;
}

export function AutonomousExplorationSimulator() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isRunning, setIsRunning] = useState(true);
  const [strategy, setStrategy] = useState<'lags' | 'nf' | 'mi'>('lags');
  const [sensorRadius, setSensorRadius] = useState(6);

  const gridSize = 28;

  // Initialize maze map layout
  const initMap = useCallback((): { grid: CellState[][]; obstacles: boolean[][] } => {
    const grid: CellState[][] = Array.from({ length: gridSize }, () =>
      new Array(gridSize).fill('unknown')
    );

    const obstacles: boolean[][] = Array.from({ length: gridSize }, () =>
      new Array(gridSize).fill(false)
    );

    // Outer border walls
    for (let i = 0; i < gridSize; i++) {
      obstacles[0][i] = true;
      obstacles[gridSize - 1][i] = true;
      obstacles[i][0] = true;
      obstacles[i][gridSize - 1] = true;
    }

    // Inner room partitions
    for (let i = 4; i < 24; i++) {
      if (i !== 10 && i !== 11) obstacles[9][i] = true; // Horizontal wall 1
      if (i !== 18 && i !== 19) obstacles[18][i] = true; // Horizontal wall 2
    }
    for (let i = 4; i < 24; i++) {
      if (i !== 6 && i !== 22) obstacles[i][14] = true; // Vertical divider
    }

    return { grid, obstacles };
  }, [gridSize]);

  const [mapData, setMapData] = useState(initMap);
  const [robotPos, setRobotPos] = useState<Point>({ r: 4, c: 4 });
  const [pathHistory, setPathHistory] = useState<Point[]>([{ r: 4, c: 4 }]);
  const [frontiers, setFrontiers] = useState<Point[]>([]);
  const [exploredPct, setExploredPct] = useState(0);
  const [mapEntropy, setMapEntropy] = useState(1.0);

  const handleReset = () => {
    const fresh = initMap();
    setMapData(fresh);
    setRobotPos({ r: 4, c: 4 });
    setPathHistory([{ r: 4, c: 4 }]);
    setFrontiers([]);
    setExploredPct(0);
    setMapEntropy(1.0);
  };

  // Perform Raycast Sensor Scan around robot
  const performScan = useCallback(
    (pos: Point, currGrid: CellState[][], obstacles: boolean[][]) => {
      const updated = currGrid.map((row) => [...row]);
      const numRays = 72;

      for (let i = 0; i < numRays; i++) {
        const angle = (i / numRays) * 2 * Math.PI;
        for (let dist = 1; dist <= sensorRadius; dist++) {
          const rr = Math.round(pos.r + dist * Math.sin(angle));
          const cc = Math.round(pos.c + dist * Math.cos(angle));

          if (rr < 0 || rr >= gridSize || cc < 0 || cc >= gridSize) break;

          if (obstacles[rr][cc]) {
            updated[rr][cc] = 'obstacle';
            break; // Laser stops at obstacle
          } else {
            updated[rr][cc] = 'free';
          }
        }
      }
      updated[pos.r][pos.c] = 'free';
      return updated;
    },
    [gridSize, sensorRadius]
  );

  // Extract Frontier Points (Free cells adjacent to Unknown cells)
  const extractFrontiers = useCallback(
    (grid: CellState[][]): Point[] => {
      const found: Point[] = [];
      const dr = [-1, 1, 0, 0];
      const dc = [0, 0, -1, 1];

      for (let r = 1; r < gridSize - 1; r++) {
        for (let c = 1; c < gridSize - 1; c++) {
          if (grid[r][c] === 'free') {
            let hasUnknownNeighbor = false;
            for (let k = 0; k < 4; k++) {
              const nr = r + dr[k];
              const nc = c + dc[k];
              if (grid[nr][nc] === 'unknown') {
                hasUnknownNeighbor = true;
                break;
              }
            }
            if (hasUnknownNeighbor) {
              found.push({ r, c });
            }
          }
        }
      }
      return found;
    },
    [gridSize]
  );

  // Main Exploration Step Loop
  useEffect(() => {
    let animId: number;
    let lastStep = performance.now();

    const render = (time: number) => {
      if (isRunning && time - lastStep > 120) {
        lastStep = time;

        // 1. Scan at current robot position
        const newGrid = performScan(robotPos, mapData.grid, mapData.obstacles);
        const newFrontiers = extractFrontiers(newGrid);

        // 2. Compute metrics
        let freeCount = 0;
        let unknownCount = 0;
        for (let r = 0; r < gridSize; r++) {
          for (let c = 0; c < gridSize; c++) {
            if (newGrid[r][c] === 'free') freeCount++;
            else if (newGrid[r][c] === 'unknown') unknownCount++;
          }
        }
        const totalNavigable = gridSize * gridSize - 100;
        const coverage = Math.min(100, Math.round((freeCount / totalNavigable) * 100));
        setExploredPct(coverage);
        setMapEntropy(Math.max(0, unknownCount / (gridSize * gridSize)));
        setFrontiers(newFrontiers);

        // 3. Select Next Target Frontier based on Selected Algorithm
        if (newFrontiers.length > 0) {
          let chosen = newFrontiers[0];

          if (strategy === 'nf') {
            // Nearest Frontier (Yamauchi 1997)
            let minDist = Infinity;
            for (const f of newFrontiers) {
              const d = Math.hypot(f.r - robotPos.r, f.c - robotPos.c);
              if (d < minDist) {
                minDist = d;
                chosen = f;
              }
            }
          } else if (strategy === 'mi') {
            // Maximum Mutual Information (Shannon Gain)
            let maxGain = -Infinity;
            for (const f of newFrontiers) {
              const d = Math.hypot(f.r - robotPos.r, f.c - robotPos.c);
              // Count unknown neighbors within local radius
              let localUnknown = 0;
              for (let dr = -3; dr <= 3; dr++) {
                for (let dc = -3; dc <= 3; dc++) {
                  const nr = f.r + dr;
                  const nc = f.c + dc;
                  if (nr >= 0 && nr < gridSize && nc >= 0 && nc < gridSize && newGrid[nr][nc] === 'unknown') {
                    localUnknown++;
                  }
                }
              }
              const score = localUnknown / (1 + d * 0.2);
              if (score > maxGain) {
                maxGain = score;
                chosen = f;
              }
            }
          } else {
            // LAGS: Local-and-Global Strategy (Feng et al. 2023)
            // Balances high local information with clearing legacy small pockets
            let bestScore = -Infinity;
            for (const f of newFrontiers) {
              const d = Math.hypot(f.r - robotPos.r, f.c - robotPos.c);
              let localUnknown = 0;
              for (let dr = -2; dr <= 2; dr++) {
                for (let dc = -2; dc <= 2; dc++) {
                  const nr = f.r + dr;
                  const nc = f.c + dc;
                  if (nr >= 0 && nr < gridSize && nc >= 0 && nc < gridSize && newGrid[nr][nc] === 'unknown') {
                    localUnknown++;
                  }
                }
              }
              // LAGS penalizes leaving nearby small pockets behind
              const scoreLocal = localUnknown / 15;
              const scoreGlobal = 1 / (1 + d);
              const totalScore = scoreLocal * 0.6 + scoreGlobal * 0.4;
              if (totalScore > bestScore) {
                bestScore = totalScore;
                chosen = f;
              }
            }
          }

          // Step robot toward chosen frontier
          const dr = Math.sign(chosen.r - robotPos.r);
          const dc = Math.sign(chosen.c - robotPos.c);
          const nextR = robotPos.r + dr;
          const nextC = robotPos.c + dc;

          if (!mapData.obstacles[nextR][nextC]) {
            setRobotPos({ r: nextR, c: nextC });
            setPathHistory((prev) => [...prev.slice(-100), { r: nextR, c: nextC }]);
          } else if (!mapData.obstacles[robotPos.r + dr][robotPos.c]) {
            setRobotPos({ r: robotPos.r + dr, c: robotPos.c });
            setPathHistory((prev) => [...prev.slice(-100), { r: robotPos.r + dr, c: robotPos.c }]);
          } else if (!mapData.obstacles[robotPos.r][robotPos.c + dc]) {
            setRobotPos({ r: robotPos.r, c: robotPos.c + dc });
            setPathHistory((prev) => [...prev.slice(-100), { r: robotPos.r, c: robotPos.c + dc }]);
          }
        }

        setMapData((prev) => ({ ...prev, grid: newGrid }));
      }

      // Draw onto Canvas
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          const width = canvas.width;
          const height = canvas.height;
          const cellW = width / gridSize;
          const cellH = height / gridSize;

          ctx.fillStyle = '#030712';
          ctx.fillRect(0, 0, width, height);

          // Draw Grid Cells
          for (let r = 0; r < gridSize; r++) {
            for (let c = 0; c < gridSize; c++) {
              const state = mapData.grid[r][c];
              const isWall = mapData.obstacles[r][c];

              if (isWall) {
                ctx.fillStyle = '#1e293b'; // Obstacle
              } else if (state === 'free') {
                ctx.fillStyle = '#0f172a'; // Free explored space
              } else {
                ctx.fillStyle = '#020617'; // Unknown fog of war
              }
              ctx.fillRect(c * cellW, r * cellH, cellW - 0.5, cellH - 0.5);
            }
          }

          // Draw Trajectory Trail (Cyan line)
          if (pathHistory.length > 1) {
            ctx.strokeStyle = 'rgba(6, 182, 212, 0.4)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo((pathHistory[0].c + 0.5) * cellW, (pathHistory[0].r + 0.5) * cellH);
            for (let i = 1; i < pathHistory.length; i++) {
              ctx.lineTo((pathHistory[i].c + 0.5) * cellW, (pathHistory[i].r + 0.5) * cellH);
            }
            ctx.stroke();
          }

          // Draw Active Frontiers (Glowing Amber dots)
          for (const f of frontiers) {
            ctx.fillStyle = '#f59e0b';
            ctx.beginPath();
            ctx.arc((f.c + 0.5) * cellW, (f.r + 0.5) * cellH, cellW * 0.4, 0, Math.PI * 2);
            ctx.fill();
          }

          // Draw Robot Sensor FOV Circle
          ctx.strokeStyle = 'rgba(16, 185, 129, 0.25)';
          ctx.fillStyle = 'rgba(16, 185, 129, 0.06)';
          ctx.beginPath();
          ctx.arc((robotPos.c + 0.5) * cellW, (robotPos.r + 0.5) * cellH, sensorRadius * cellW, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();

          // Draw Robot (Emerald marker)
          ctx.fillStyle = '#10b981';
          ctx.beginPath();
          ctx.arc((robotPos.c + 0.5) * cellW, (robotPos.r + 0.5) * cellH, cellW * 0.6, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [isRunning, strategy, robotPos, mapData, performScan, extractFrontiers, gridSize, pathHistory, frontiers]);

  return (
    <div className="my-6 rounded-2xl glass-panel p-5 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Compass className="w-4 h-4" />
            </span>
            <h3 className="font-mono font-bold text-slate-900 dark:text-slate-100 text-sm">
              Autonomous Exploration & LAGS Local-Global Strategy
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Minimizes Shannon map entropy <InlineMath latex="H(m)" /> and maximizes Mutual Information Gain <InlineMath latex="I(m, x)" /> while eliminating regional legacy dead-ends.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Strategy Selector */}
          <select
            value={strategy}
            onChange={(e) => setStrategy(e.target.value as any)}
            className="px-2.5 py-1.5 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs border border-slate-700"
          >
            <option value="lags">LAGS (Local-Global / MDPI 2023)</option>
            <option value="mi">Max Mutual Information (MI)</option>
            <option value="nf">Nearest Frontier (NF 1997)</option>
          </select>

          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all shadow-sm ${
              isRunning
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
            }`}
          >
            {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isRunning ? 'Pause' : 'Explore'}</span>
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs border border-slate-700 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Map</span>
          </button>
        </div>
      </div>

      {/* Canvas Viewport & Metrics */}
      <div className="relative w-full aspect-square max-h-[440px] bg-slate-950 rounded-xl overflow-hidden border border-slate-800 shadow-inner flex items-center justify-center">
        <canvas
          ref={canvasRef}
          width={560}
          height={560}
          className="w-full h-full object-contain"
        />

        {/* Live Metrics HUD */}
        <div className="absolute top-3 right-3 p-3 rounded-xl bg-slate-950/85 backdrop-blur-md border border-slate-800 text-[10px] font-mono space-y-1.5 text-slate-300">
          <div className="flex items-center justify-between gap-4">
            <span className="text-slate-400">Coverage:</span>
            <span className="text-emerald-400 font-bold">{exploredPct}%</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-slate-400">Map Entropy <InlineMath latex="H(m)" />:</span>
            <span className="text-cyan-400 font-bold">{mapEntropy.toFixed(3)}</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-slate-400">Active Frontiers:</span>
            <span className="text-amber-400 font-bold">{frontiers.length}</span>
          </div>
          <div className="flex items-center justify-between gap-4 pt-1 border-t border-slate-800">
            <span className="text-slate-400">Path Steps:</span>
            <span className="text-slate-200 font-bold">{pathHistory.length}</span>
          </div>
        </div>
      </div>

      {/* Sensor Range Slider */}
      <div className="flex items-center justify-between gap-4 pt-2 border-t border-slate-200 dark:border-slate-800 text-xs font-mono">
        <div className="flex items-center gap-2 text-slate-400">
          <span>LiDAR FOV Radius:</span>
          <span className="text-cyan-400 font-bold">{sensorRadius} cells</span>
        </div>
        <input
          type="range"
          min="4"
          max="10"
          step="1"
          value={sensorRadius}
          onChange={(e) => setSensorRadius(parseInt(e.target.value))}
          className="w-48 accent-cyan-500"
        />
      </div>
    </div>
  );
}

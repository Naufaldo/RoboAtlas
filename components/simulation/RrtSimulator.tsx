'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Play, Pause, RotateCcw, StepForward, GitFork, CheckCircle2 } from 'lucide-react';

interface RRTNode {
  x: number;
  y: number;
  parent: number | null;
  cost: number;
}

interface Obstacle {
  x: number;
  y: number;
  radius: number;
}

export function RrtSimulator() {
  const { locale } = useLanguage();
  const isId = locale === 'id';

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [isRunning, setIsRunning] = useState(false);
  const [useRRTStar, setUseRRTStar] = useState(true);
  const [nodes, setNodes] = useState<RRTNode[]>([
    { x: 50, y: 50, parent: null, cost: 0 },
  ]);
  const [path, setPath] = useState<number[]>([]);
  const [iterations, setIterations] = useState(0);

  const start = { x: 60, y: 60 };
  const goal = { x: 540, y: 320, radius: 25 };

  const obstacles: Obstacle[] = [
    { x: 200, y: 120, radius: 45 },
    { x: 220, y: 280, radius: 55 },
    { x: 380, y: 180, radius: 60 },
    { x: 420, y: 320, radius: 35 },
  ];

  const STEP_SIZE = 25;
  const REWIRE_RADIUS = 50;

  // Collision checking with circular obstacles
  const isSegmentValid = useCallback((x1: number, y1: number, x2: number, y2: number) => {
    for (const obs of obstacles) {
      // Distance from point to line segment
      const dx = x2 - x1;
      const dy = y2 - y1;
      const lenSq = dx * dx + dy * dy;
      if (lenSq === 0) continue;

      let t = ((obs.x - x1) * dx + (obs.y - y1) * dy) / lenSq;
      t = Math.max(0, Math.min(1, t));

      const closestX = x1 + t * dx;
      const closestY = y1 + t * dy;

      const distSq = (obs.x - closestX) ** 2 + (obs.y - closestY) ** 2;
      if (distSq < (obs.radius + 8) ** 2) {
        return false; // Collision
      }
    }
    return true;
  }, [obstacles]);

  // Single step of RRT / RRT*
  const stepRRT = useCallback(() => {
    setNodes((prevNodes) => {
      // 1. Goal bias sampling
      let randX: number;
      let randY: number;
      if (Math.random() < 0.15) {
        randX = goal.x;
        randY = goal.y;
      } else {
        randX = Math.random() * 600;
        randY = Math.random() * 380;
      }

      // 2. Find nearest node
      let nearestIdx = 0;
      let minDistSq = Infinity;
      prevNodes.forEach((node, idx) => {
        const dSq = (node.x - randX) ** 2 + (node.y - randY) ** 2;
        if (dSq < minDistSq) {
          minDistSq = dSq;
          nearestIdx = idx;
        }
      });

      const nearest = prevNodes[nearestIdx];
      const dist = Math.sqrt(minDistSq);
      if (dist === 0) return prevNodes;

      // 3. Steer towards sample
      const newX = nearest.x + ((randX - nearest.x) / dist) * Math.min(STEP_SIZE, dist);
      const newY = nearest.y + ((randY - nearest.y) / dist) * Math.min(STEP_SIZE, dist);

      if (!isSegmentValid(nearest.x, nearest.y, newX, newY)) {
        return prevNodes;
      }

      let bestParent = nearestIdx;
      let bestCost = nearest.cost + Math.hypot(newX - nearest.x, newY - nearest.y);

      // 4. If RRT*, find best parent in radius
      if (useRRTStar) {
        prevNodes.forEach((node, idx) => {
          const d = Math.hypot(node.x - newX, node.y - newY);
          if (d <= REWIRE_RADIUS && isSegmentValid(node.x, node.y, newX, newY)) {
            const cost = node.cost + d;
            if (cost < bestCost) {
              bestCost = cost;
              bestParent = idx;
            }
          }
        });
      }

      const newNode: RRTNode = {
        x: newX,
        y: newY,
        parent: bestParent,
        cost: bestCost,
      };

      const updatedNodes = [...prevNodes, newNode];
      const newIdx = updatedNodes.length - 1;

      // 5. If RRT*, rewire neighbors
      if (useRRTStar) {
        updatedNodes.forEach((node, idx) => {
          if (idx === bestParent || idx === newIdx) return;
          const d = Math.hypot(node.x - newX, node.y - newY);
          if (d <= REWIRE_RADIUS && isSegmentValid(newX, newY, node.x, node.y)) {
            if (newNode.cost + d < node.cost) {
              node.parent = newIdx;
              node.cost = newNode.cost + d;
            }
          }
        });
      }

      // 6. Check if reached goal
      if (Math.hypot(newX - goal.x, newY - goal.y) < goal.radius) {
        // Trace back path
        const reconstructed: number[] = [];
        let curr: number | null = newIdx;
        while (curr !== null) {
          reconstructed.push(curr);
          curr = updatedNodes[curr].parent;
        }
        setPath(reconstructed.reverse());
        setIsRunning(false);
      }

      return updatedNodes;
    });

    setIterations((i) => i + 1);
  }, [goal, isSegmentValid, useRRTStar]);

  // Timer loop when running
  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      stepRRT();
    }, 40);
    return () => clearInterval(interval);
  }, [isRunning, stepRRT]);

  const handleReset = () => {
    setIsRunning(false);
    setNodes([{ x: start.x, y: start.y, parent: null, cost: 0 }]);
    setPath([]);
    setIterations(0);
  };

  // Render Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#070a13';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Obstacles
    obstacles.forEach((obs) => {
      ctx.fillStyle = '#1e293b';
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(obs.x, obs.y, obs.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    });

    // RRT Tree Edges
    ctx.strokeStyle = 'rgba(6, 182, 212, 0.4)';
    ctx.lineWidth = 1.2;
    nodes.forEach((node) => {
      if (node.parent !== null) {
        const p = nodes[node.parent];
        if (p) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(node.x, node.y);
          ctx.stroke();
        }
      }
    });

    // Start Marker
    ctx.fillStyle = '#10b981';
    ctx.beginPath();
    ctx.arc(start.x, start.y, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Goal Region
    ctx.fillStyle = 'rgba(245, 158, 11, 0.2)';
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(goal.x, goal.y, goal.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Final Path
    if (path.length > 1) {
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 4;
      ctx.beginPath();
      for (let i = 0; i < path.length; i++) {
        const node = nodes[path[i]];
        if (node) {
          if (i === 0) ctx.moveTo(node.x, node.y);
          else ctx.lineTo(node.x, node.y);
        }
      }
      ctx.stroke();
    }
  }, [nodes, path, obstacles, start, goal]);

  return (
    <div className="p-6 rounded-3xl glass-panel border border-slate-200 dark:border-slate-800 space-y-4 shadow-xl">
      {/* Top Header */}
      <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-slate-200 dark:border-slate-800/80">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-500">
            <GitFork className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 font-mono">
              {useRRTStar ? 'RRT* (Optimal Rewiring) Simulator' : 'RRT (Rapidly-exploring Random Trees) Simulator'}
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-sans">
              {isId
                ? 'Simulasi penumbuhan pohon ruang konfigurasi 2D dengan penghindaran rintangan dan optimasi jalur.'
                : 'Interactive 2D configuration space random tree expansion with obstacle avoidance and rewiring.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setUseRRTStar(!useRRTStar)}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all border ${
              useRRTStar
                ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40 shadow-sm'
                : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-700'
            }`}
          >
            {useRRTStar ? 'Mode: RRT* (Optimal)' : 'Mode: Standard RRT'}
          </button>
        </div>
      </div>

      {/* Main Canvas View */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-800/80 bg-slate-950 flex justify-center">
        <canvas ref={canvasRef} width={600} height={380} className="w-full max-w-2xl h-auto" />
      </div>

      {/* Control Toolbar */}
      <div className="flex items-center justify-between flex-wrap gap-3 pt-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
              isRunning
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
            }`}
          >
            {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isRunning ? (isId ? 'Jeda' : 'Pause') : (isId ? 'Mulai Ekspansi' : 'Run Tree')}</span>
          </button>

          <button
            onClick={stepRRT}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-800 disabled:opacity-50"
          >
            <StepForward className="w-3.5 h-3.5" />
            <span>{isId ? 'Langkah' : 'Step'}</span>
          </button>

          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-800"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{isId ? 'Reset' : 'Reset'}</span>
          </button>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
          <span>{isId ? 'Node Pohon' : 'Tree Nodes'}: <strong className="text-cyan-400">{nodes.length}</strong></span>
          <span>{isId ? 'Iterasi' : 'Iterations'}: <strong className="text-cyan-400">{iterations}</strong></span>
          {path.length > 0 && (
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> {isId ? 'Jalur Ditemukan!' : 'Goal Reached!'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

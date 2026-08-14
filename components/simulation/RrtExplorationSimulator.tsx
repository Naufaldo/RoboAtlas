'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Sparkles, RotateCcw, Play, Pause, Compass, Sliders } from 'lucide-react';

interface RrtNode {
  x: number;
  y: number;
  parentId: number | null;
  cost: number;
}

export function RrtExplorationSimulator() {
  const { locale } = useLanguage();
  const isId = locale === 'id';

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Parameters
  const [goalBias, setGoalBias] = useState(0.12); // 12%
  const [stepSize, setStepSize] = useState(20);
  const [maxIterations, setMaxIterations] = useState(400);
  const [isStarMode, setIsStarMode] = useState(true); // RRT* vs standard RRT
  const [isRunning, setIsRunning] = useState(true);

  // State
  const start = { x: 50, y: 150 };
  const goal = { x: 540, y: 150 };
  const goalRadius = 25;

  const obstacles = [
    { x: 160, y: 40, w: 60, h: 140 },
    { x: 280, y: 120, w: 60, h: 160 },
    { x: 400, y: 40, w: 60, h: 140 },
  ];

  const [nodes, setNodes] = useState<RrtNode[]>([
    { x: start.x, y: start.y, parentId: null, cost: 0 },
  ]);
  const [goalNodeIndex, setGoalNodeIndex] = useState<number | null>(null);

  // Collision Check
  const checkCollision = useCallback((x1: number, y1: number, x2: number, y2: number) => {
    const steps = 15;
    for (let i = 0; i <= steps; i++) {
      const px = x1 + (x2 - x1) * (i / steps);
      const py = y1 + (y2 - y1) * (i / steps);

      for (const obs of obstacles) {
        if (px >= obs.x && px <= obs.x + obs.w && py >= obs.y && py <= obs.y + obs.h) {
          return true; // collision
        }
      }
    }
    return false;
  }, [obstacles]);

  // Step Algorithm
  const stepRrt = useCallback(() => {
    setNodes((prevNodes) => {
      if (prevNodes.length >= maxIterations) return prevNodes;

      // 1. Sample random target or bias to goal
      let sampleX = Math.random() * 580 + 10;
      let sampleY = Math.random() * 280 + 10;
      if (Math.random() < goalBias) {
        sampleX = goal.x;
        sampleY = goal.y;
      }

      // 2. Find Nearest Neighbor
      let nearestIdx = 0;
      let minDist = Infinity;
      prevNodes.forEach((node, idx) => {
        const d = Math.hypot(node.x - sampleX, node.y - sampleY);
        if (d < minDist) {
          minDist = d;
          nearestIdx = idx;
        }
      });

      const nearest = prevNodes[nearestIdx];

      // 3. Steer towards sample by stepSize
      const angle = Math.atan2(sampleY - nearest.y, sampleX - nearest.x);
      const dist = Math.min(stepSize, minDist);
      const newX = nearest.x + Math.cos(angle) * dist;
      const newY = nearest.y + Math.sin(angle) * dist;

      // 4. Collision check
      if (checkCollision(nearest.x, nearest.y, newX, newY)) {
        return prevNodes;
      }

      const newNode: RrtNode = {
        x: newX,
        y: newY,
        parentId: nearestIdx,
        cost: nearest.cost + dist,
      };

      // RRT* Rewiring
      if (isStarMode) {
        const searchRadius = 40;
        let bestParent = nearestIdx;
        let minCost = nearest.cost + dist;

        prevNodes.forEach((node, idx) => {
          const d = Math.hypot(node.x - newX, node.y - newY);
          if (d <= searchRadius && !checkCollision(node.x, node.y, newX, newY)) {
            if (node.cost + d < minCost) {
              minCost = node.cost + d;
              bestParent = idx;
            }
          }
        });

        newNode.parentId = bestParent;
        newNode.cost = minCost;
      }

      const nextList = [...prevNodes, newNode];

      // Check if reached goal
      if (Math.hypot(newX - goal.x, newY - goal.y) <= goalRadius) {
        setGoalNodeIndex(nextList.length - 1);
      }

      return nextList;
    });
  }, [checkCollision, goal.x, goal.y, goalBias, isStarMode, maxIterations, stepSize]);

  // Simulation interval
  useEffect(() => {
    if (!isRunning || nodes.length >= maxIterations) return;
    const timer = setInterval(() => {
      stepRrt();
    }, 16);
    return () => clearInterval(timer);
  }, [isRunning, nodes.length, maxIterations, stepRrt]);

  // Render Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.fillStyle = '#070a13';
    ctx.fillRect(0, 0, width, height);

    // Technical Grid
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.08)';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 25) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += 25) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Draw Obstacles (Dark Slate Boxes with Cyan borders)
    ctx.fillStyle = 'rgba(30, 41, 59, 0.85)';
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;
    obstacles.forEach((obs) => {
      ctx.fillRect(obs.x, obs.y, obs.w, obs.h);
      ctx.strokeRect(obs.x, obs.y, obs.w, obs.h);
    });

    // Draw RRT Tree Branches
    ctx.strokeStyle = 'rgba(6, 182, 212, 0.35)';
    ctx.lineWidth = 1.2;
    nodes.forEach((node) => {
      if (node.parentId !== null) {
        const parent = nodes[node.parentId];
        if (parent) {
          ctx.beginPath();
          ctx.moveTo(parent.x, parent.y);
          ctx.lineTo(node.x, node.y);
          ctx.stroke();
        }
      }
    });

    // Goal Region Circle
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.arc(goal.x, goal.y, goalRadius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);

    // Highlight Final Extracted Path (Amber solid path)
    if (goalNodeIndex !== null) {
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 4;
      ctx.beginPath();
      let currIdx: number | null = goalNodeIndex;
      let first = true;
      while (currIdx !== null) {
        const n: RrtNode | undefined = nodes[currIdx];
        if (!n) break;
        if (first) {
          ctx.moveTo(n.x, n.y);
          first = false;
        } else {
          ctx.lineTo(n.x, n.y);
        }
        currIdx = n.parentId;
      }
      ctx.stroke();
    }

    // Start & Goal Markers
    ctx.fillStyle = '#06b6d4';
    ctx.beginPath();
    ctx.arc(start.x, start.y, 7, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#10b981';
    ctx.beginPath();
    ctx.arc(goal.x, goal.y, 8, 0, Math.PI * 2);
    ctx.fill();
  }, [nodes, obstacles, goalNodeIndex, start.x, start.y, goal.x, goal.y]);

  return (
    <div className="p-6 rounded-3xl glass-panel border border-slate-200 dark:border-slate-800 space-y-4 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-slate-200 dark:border-slate-800/80">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-500">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 font-mono">
              {isId ? 'Laboratorium Perencanaan Berbasis Sampel RRT & RRT*' : 'Sampling-Based Motion Planning: RRT & RRT* Lab'}
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-sans">
              {isId
                ? 'Amati pertumbuhan pohon acak, rewiring optimalitas asimtotik RRT*, dan bias target (Goal Bias).'
                : 'Observe random uniform tree growth, RRT* asymptotic rewiring, and goal-biasing convergence.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsStarMode(!isStarMode)}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all border ${
              isStarMode
                ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md'
                : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-slate-500'
            }`}
          >
            {isStarMode ? 'Mode: RRT* (Optimal)' : 'Mode: RRT (Standar)'}
          </button>

          <button
            onClick={() => setIsRunning(!isRunning)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono bg-cyan-500/15 border border-cyan-500/40 text-cyan-400 font-bold"
          >
            {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isRunning ? 'Pause' : 'Play'}</span>
          </button>

          <button
            onClick={() => {
              setNodes([{ x: start.x, y: start.y, parentId: null, cost: 0 }]);
              setGoalNodeIndex(null);
            }}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-mono bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-400 hover:text-slate-200"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Main Canvas View */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-800/80 bg-slate-950 flex justify-center">
        <canvas ref={canvasRef} width={600} height={300} className="w-full max-w-2xl h-auto" />
      </div>

      {/* Telemetry Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
        <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-400 block uppercase">
            {isId ? 'Jumlah Cabang Pohon' : 'Tree Nodes Count'}
          </span>
          <strong className="text-lg font-bold text-cyan-400">{nodes.length}</strong>
          <span className="text-[10px] text-slate-500 block">Maksimum {maxIterations} iterasi</span>
        </div>

        <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-400 block uppercase">
            {isId ? 'Status Target' : 'Goal Status'}
          </span>
          <strong
            className={`text-lg font-bold ${goalNodeIndex !== null ? 'text-emerald-400' : 'text-amber-400'}`}
          >
            {goalNodeIndex !== null ? (isId ? '✓ Jalur Ditemukan' : '✓ Path Connected') : (isId ? 'Eksplorasi...' : 'Exploring...')}
          </strong>
          <span className="text-[10px] text-slate-500 block">
            {goalNodeIndex !== null ? `Cost: ${nodes[goalNodeIndex].cost.toFixed(1)} px` : '-'}
          </span>
        </div>

        <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-400 block uppercase">
            {isId ? 'Bias Target (Goal Bias)' : 'Goal Sampling Bias'}
          </span>
          <strong className="text-lg font-bold text-purple-400">{(goalBias * 100).toFixed(0)}%</strong>
          <span className="text-[10px] text-slate-500 block">Peluang sampel diarahkan ke goal</span>
        </div>
      </div>

      {/* Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
        <div className="space-y-1.5 p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="flex justify-between">
            <span className="text-slate-400">{isId ? 'Bias Target (Goal Bias):' : 'Goal Bias:'}</span>
            <strong className="text-purple-400">{(goalBias * 100).toFixed(0)}%</strong>
          </div>
          <input
            type="range"
            min="0.0"
            max="0.35"
            step="0.02"
            value={goalBias}
            onChange={(e) => setGoalBias(parseFloat(e.target.value))}
            className="w-full accent-purple-500"
          />
        </div>

        <div className="space-y-1.5 p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="flex justify-between">
            <span className="text-slate-400">{isId ? 'Panjang Langkah (Step Size Δq):' : 'Step Size (Δq):'}</span>
            <strong className="text-cyan-400">{stepSize} px</strong>
          </div>
          <input
            type="range"
            min="10"
            max="35"
            step="2"
            value={stepSize}
            onChange={(e) => setStepSize(parseInt(e.target.value))}
            className="w-full accent-cyan-500"
          />
        </div>
      </div>
    </div>
  );
}

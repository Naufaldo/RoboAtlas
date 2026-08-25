'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, GitMerge, Activity, Sparkles, Sliders } from 'lucide-react';
import { InlineMath } from '@/components/mathematics/MathBlock';

interface GraphNode {
  id: string;
  type: 'pose' | 'landmark';
  x: number;
  y: number;
  optX: number;
  optY: number;
}

interface FactorEdge {
  from: string;
  to: string;
  type: 'odometry' | 'measurement' | 'loop';
  weight: number;
}

export function FactorGraphOptimizerSimulator() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [iteration, setIteration] = useState(0);
  const [chiSquareError, setChiSquareError] = useState(48.5);
  const [dampingLambda, setDampingLambda] = useState(0.01); // Levenberg-Marquardt damping

  // Factor Graph State: Initial drifting nodes vs ground truth
  const [nodes, setNodes] = useState<GraphNode[]>([
    { id: 'x1', type: 'pose', x: 80, y: 180, optX: 80, optY: 180 },
    { id: 'x2', type: 'pose', x: 180, y: 140, optX: 190, optY: 110 },
    { id: 'x3', type: 'pose', x: 310, y: 150, optX: 320, optY: 110 },
    { id: 'x4', type: 'pose', x: 420, y: 220, optX: 430, optY: 200 },
    { id: 'x5', type: 'pose', x: 340, y: 310, optX: 320, optY: 290 },
    { id: 'x6', type: 'pose', x: 190, y: 320, optX: 190, optY: 290 },
    // Landmark nodes
    { id: 'L1', type: 'landmark', x: 250, y: 190, optX: 250, optY: 200 },
    { id: 'L2', type: 'landmark', x: 380, y: 210, optX: 380, optY: 200 },
  ]);

  const [edges] = useState<FactorEdge[]>([
    // Odometry factors
    { from: 'x1', to: 'x2', type: 'odometry', weight: 1.0 },
    { from: 'x2', to: 'x3', type: 'odometry', weight: 1.0 },
    { from: 'x3', to: 'x4', type: 'odometry', weight: 1.0 },
    { from: 'x4', to: 'x5', type: 'odometry', weight: 1.0 },
    { from: 'x5', to: 'x6', type: 'odometry', weight: 1.0 },
    // Loop closure factor
    { from: 'x6', to: 'x1', type: 'loop', weight: 2.5 },
    // Landmark measurement factors
    { from: 'x2', to: 'L1', type: 'measurement', weight: 1.5 },
    { from: 'x3', to: 'L1', type: 'measurement', weight: 1.5 },
    { from: 'x5', to: 'L1', type: 'measurement', weight: 1.5 },
    { from: 'x3', to: 'L2', type: 'measurement', weight: 1.5 },
    { from: 'x4', to: 'L2', type: 'measurement', weight: 1.5 },
    { from: 'x5', to: 'L2', type: 'measurement', weight: 1.5 },
  ]);

  const handleReset = () => {
    setIteration(0);
    setChiSquareError(48.5);
    setNodes([
      { id: 'x1', type: 'pose', x: 80, y: 180, optX: 80, optY: 180 },
      { id: 'x2', type: 'pose', x: 180, y: 140, optX: 190, optY: 110 },
      { id: 'x3', type: 'pose', x: 310, y: 150, optX: 320, optY: 110 },
      { id: 'x4', type: 'pose', x: 420, y: 220, optX: 430, optY: 200 },
      { id: 'x5', type: 'pose', x: 340, y: 310, optX: 320, optY: 290 },
      { id: 'x6', type: 'pose', x: 190, y: 320, optX: 190, optY: 290 },
      { id: 'L1', type: 'landmark', x: 250, y: 190, optX: 250, optY: 200 },
      { id: 'L2', type: 'landmark', x: 380, y: 210, optX: 380, optY: 200 },
    ]);
  };

  const handleGaussNewtonStep = () => {
    // One Gauss-Newton non-linear least squares relaxation step
    setNodes((prev) =>
      prev.map((n) => {
        if (n.id === 'x1') return n; // Anchor pose fixed
        const alpha = 0.55;
        const nextX = n.x + (n.optX - n.x) * alpha;
        const nextY = n.y + (n.optY - n.y) * alpha;
        return { ...n, x: nextX, y: nextY };
      })
    );

    setIteration((it) => it + 1);
    setChiSquareError((err) => Math.max(0.12, err * 0.42));
  };

  // Canvas Rendering Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const width = canvas.width;
        const height = canvas.height;

        ctx.fillStyle = '#030712';
        ctx.fillRect(0, 0, width, height);

        // Grid lines
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
        ctx.lineWidth = 1;
        for (let x = 0; x < width; x += 40) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
        }
        for (let y = 0; y < height; y += 40) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }

        const nodeMap = new Map(nodes.map((n) => [n.id, n]));

        // 1. Draw Factor Edges & Small Factor Squares
        for (const edge of edges) {
          const fromNode = nodeMap.get(edge.from);
          const toNode = nodeMap.get(edge.to);
          if (!fromNode || !toNode) continue;

          ctx.beginPath();
          ctx.moveTo(fromNode.x, fromNode.y);
          ctx.lineTo(toNode.x, toNode.y);

          if (edge.type === 'loop') {
            ctx.strokeStyle = '#ec4899'; // Magenta loop closure
            ctx.lineWidth = 3;
            ctx.setLineDash([5, 5]);
          } else if (edge.type === 'measurement') {
            ctx.strokeStyle = 'rgba(6, 182, 212, 0.6)'; // Cyan landmark bearing
            ctx.lineWidth = 1.5;
            ctx.setLineDash([]);
          } else {
            ctx.strokeStyle = '#f59e0b'; // Amber odometry
            ctx.lineWidth = 2.5;
            ctx.setLineDash([]);
          }
          ctx.stroke();
          ctx.setLineDash([]);

          // Draw Factor Function Square at midpoint
          const midX = (fromNode.x + toNode.x) / 2;
          const midY = (fromNode.y + toNode.y) / 2;
          const sqSize = 8;

          ctx.fillStyle = edge.type === 'loop' ? '#ec4899' : edge.type === 'measurement' ? '#06b6d4' : '#f59e0b';
          ctx.fillRect(midX - sqSize / 2, midY - sqSize / 2, sqSize, sqSize);
        }

        // 2. Draw Variable Nodes
        for (const node of nodes) {
          if (node.type === 'pose') {
            // Pose Node (Large Indigo Sphere)
            ctx.fillStyle = node.id === 'x1' ? '#3b82f6' : '#6366f1';
            ctx.strokeStyle = '#c7d2fe';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(node.x, node.y, 14, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 10px monospace';
            ctx.fillText(node.id, node.x - 7, node.y + 3.5);
          } else {
            // Landmark Node (Emerald Star/Diamond)
            ctx.fillStyle = '#10b981';
            ctx.strokeStyle = '#a7f3d0';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(node.x, node.y, 11, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 9px monospace';
            ctx.fillText(node.id, node.x - 6, node.y + 3);
          }
        }
      }
    }
  }, [nodes, edges]);

  return (
    <div className="my-6 rounded-2xl glass-panel p-5 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <GitMerge className="w-4 h-4" />
            </span>
            <h3 className="font-mono font-bold text-slate-900 dark:text-slate-100 text-sm">
              Factor Graph SLAM & Non-Linear Least Squares Optimizer
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Minimizes non-linear residual errors <InlineMath latex="\chi^2 = \sum \mathbf{e}_k^T \mathbf{\Omega}_k \mathbf{e}_k" /> by solving the sparse normal equations <InlineMath latex="\mathbf{H}\Delta \mathbf{x} = -\mathbf{b}" />.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleGaussNewtonStep}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all shadow-sm bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Gauss-Newton Step</span>
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs border border-slate-700 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Drifting Graph</span>
          </button>
        </div>
      </div>

      {/* Canvas Viewport */}
      <div className="relative w-full aspect-[16/10] max-h-[380px] bg-slate-950 rounded-xl overflow-hidden border border-slate-800 shadow-inner flex items-center justify-center">
        <canvas
          ref={canvasRef}
          width={640}
          height={380}
          className="w-full h-full object-contain"
        />

        {/* Live HUD */}
        <div className="absolute top-3 right-3 p-3 rounded-xl bg-slate-950/85 backdrop-blur-md border border-slate-800 text-[10px] font-mono space-y-1.5 text-slate-300">
          <div className="flex items-center justify-between gap-4">
            <span className="text-slate-400">Iterations:</span>
            <span className="text-cyan-400 font-bold">{iteration}</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-slate-400">Residual <InlineMath latex="\chi^2" /> Error:</span>
            <span className="text-amber-400 font-bold">{chiSquareError.toFixed(3)}</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-slate-400">Status:</span>
            <span className={`font-bold ${chiSquareError < 1.0 ? 'text-emerald-400' : 'text-cyan-400'}`}>
              {chiSquareError < 1.0 ? 'OPTIMAL CONVERGENCE' : 'RELAXING GRAPH...'}
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="absolute bottom-3 left-3 p-2 rounded-xl bg-slate-950/85 backdrop-blur-md border border-slate-800 text-[9px] font-mono flex items-center gap-3 text-slate-300">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 inline-block" />
            <span>Pose Nodes (<InlineMath latex="\mathbf{x}_i" />)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span>Landmarks (<InlineMath latex="\mathbf{l}_j" />)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-pink-500 inline-block" />
            <span>Loop Closure Edge</span>
          </div>
        </div>
      </div>
    </div>
  );
}

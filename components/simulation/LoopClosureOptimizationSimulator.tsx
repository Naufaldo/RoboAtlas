'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw, Link2, Sparkles, Sliders, CheckCircle2 } from 'lucide-react';
import { InlineMath } from '@/components/mathematics/MathBlock';

interface PoseNode {
  trueX: number;
  trueY: number;
  estX: number;
  estY: number;
  optX: number;
  optY: number;
}

interface LoopEdge {
  from: number;
  to: number;
}

export function LoopClosureOptimizationSimulator() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isRunning, setIsRunning] = useState(true);
  const [driftRate, setDriftRate] = useState(0.08); // Drift multiplier
  const [isLoopClosed, setIsLoopClosed] = useState(false);
  const [isOptimized, setIsOptimized] = useState(false);
  const [optIterations, setOptIterations] = useState(0);

  const [nodes, setNodes] = useState<PoseNode[]>([]);
  const [loopEdges, setLoopEdges] = useState<LoopEdge[]>([]);

  // Reset trajectory
  const handleReset = useCallback(() => {
    setNodes([]);
    setLoopEdges([]);
    setIsLoopClosed(false);
    setIsOptimized(false);
    setOptIterations(0);
  }, []);

  // Run Non-linear Least-Squares Pose Graph Relaxation Step (Gauss-Newton simulation)
  const optimizeGraphStep = useCallback(() => {
    setNodes((prevNodes) => {
      if (prevNodes.length < 5 || loopEdges.length === 0) return prevNodes;

      const updated = prevNodes.map((n) => ({ ...n }));
      const alpha = 0.35; // Relaxation step size

      // 1. Enforce sequential odometry edges
      for (let i = 1; i < updated.length; i++) {
        const dxTrue = updated[i].trueX - updated[i - 1].trueX;
        const dyTrue = updated[i].trueY - updated[i - 1].trueY;

        const targetX = updated[i - 1].optX + dxTrue;
        const targetY = updated[i - 1].optY + dyTrue;

        updated[i].optX += (targetX - updated[i].optX) * alpha;
        updated[i].optY += (targetY - updated[i].optY) * alpha;
      }

      // 2. Enforce Loop Closure Constraints
      for (const edge of loopEdges) {
        const fromNode = updated[edge.from];
        const toNode = updated[edge.to];

        const dx = toNode.optX - fromNode.optX;
        const dy = toNode.optY - fromNode.optY;

        // Pull the entire loop back towards the origin node
        for (let i = edge.from; i <= edge.to; i++) {
          const ratio = (i - edge.from) / (edge.to - edge.from);
          updated[i].optX -= dx * ratio * alpha;
          updated[i].optY -= dy * ratio * alpha;
        }
      }

      return updated;
    });

    setOptIterations((prev) => prev + 1);
    setIsOptimized(true);
  }, [loopEdges]);

  // Main Trajectory Generation Loop
  useEffect(() => {
    let animId: number;
    let t = 0;

    const render = () => {
      if (isRunning && !isLoopClosed) {
        t += 0.04;
        // Rectangular racetrack loop trajectory
        const loopTime = 12.0; // seconds for full circuit
        const phase = (t % loopTime) / loopTime;
        const angle = phase * 2 * Math.PI;

        const trueX = 5.5 * Math.sin(angle);
        const trueY = 3.5 * Math.sin(2 * angle); // Figure-8 or racetrack

        setNodes((prev) => {
          if (prev.length > 120) {
            // Loop completed, detect loop closure edge!
            setIsLoopClosed(true);
            setLoopEdges([{ from: 0, to: prev.length - 1 }]);
            return prev;
          }

          // Accumulate open-loop odometry drift error
          const driftMagnitude = prev.length * driftRate * 0.05;
          const estX = trueX + Math.sin(t * 1.5) * driftMagnitude;
          const estY = trueY + (prev.length * 0.03 * driftRate * 3);

          return [
            ...prev,
            {
              trueX,
              trueY,
              estX,
              estY,
              optX: estX,
              optY: estY,
            },
          ];
        });
      }

      // Draw onto Canvas
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          const width = canvas.width;
          const height = canvas.height;

          ctx.fillStyle = '#030712';
          ctx.fillRect(0, 0, width, height);

          const worldExtent = 18;
          const toCanvasX = (wx: number) => width / 2 + (wx / worldExtent) * width;
          const toCanvasY = (wy: number) => height / 2 - (wy / worldExtent) * height;

          // Background Grid
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
          ctx.lineWidth = 1;
          for (let g = -8; g <= 8; g += 4) {
            ctx.beginPath();
            ctx.moveTo(toCanvasX(g), 0);
            ctx.lineTo(toCanvasX(g), height);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(0, toCanvasY(g));
            ctx.lineTo(width, toCanvasY(g));
            ctx.stroke();
          }

          // 1. Draw Ground Truth Trajectory (Green dashed)
          if (nodes.length > 1) {
            ctx.strokeStyle = 'rgba(16, 185, 129, 0.4)';
            ctx.lineWidth = 2;
            ctx.setLineDash([4, 4]);
            ctx.beginPath();
            ctx.moveTo(toCanvasX(nodes[0].trueX), toCanvasY(nodes[0].trueY));
            for (let i = 1; i < nodes.length; i++) {
              ctx.lineTo(toCanvasX(nodes[i].trueX), toCanvasY(nodes[i].trueY));
            }
            ctx.stroke();
            ctx.setLineDash([]);
          }

          // 2. Draw Drifting Odometry Trajectory (Red)
          if (nodes.length > 1 && !isOptimized) {
            ctx.strokeStyle = '#f43f5e';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(toCanvasX(nodes[0].estX), toCanvasY(nodes[0].estY));
            for (let i = 1; i < nodes.length; i++) {
              ctx.lineTo(toCanvasX(nodes[i].estX), toCanvasY(nodes[i].estY));
            }
            ctx.stroke();
          }

          // 3. Draw Optimized Pose Graph Trajectory (Cyan)
          if (isOptimized && nodes.length > 1) {
            ctx.strokeStyle = '#06b6d4';
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.moveTo(toCanvasX(nodes[0].optX), toCanvasY(nodes[0].optY));
            for (let i = 1; i < nodes.length; i++) {
              ctx.lineTo(toCanvasX(nodes[i].optX), toCanvasY(nodes[i].optY));
            }
            ctx.stroke();
          }

          // 4. Draw Loop Closure Edges (Gold Glowing Links)
          for (const edge of loopEdges) {
            const nA = nodes[edge.from];
            const nB = nodes[edge.to];
            if (nA && nB) {
              const xA = toCanvasX(isOptimized ? nA.optX : nA.estX);
              const yA = toCanvasY(isOptimized ? nA.optY : nA.estY);
              const xB = toCanvasX(isOptimized ? nB.optX : nB.estX);
              const yB = toCanvasY(isOptimized ? nB.optY : nB.estY);

              ctx.strokeStyle = '#f59e0b';
              ctx.lineWidth = 3;
              ctx.beginPath();
              ctx.moveTo(xA, yA);
              ctx.lineTo(xB, yB);
              ctx.stroke();

              // Highlight Loop Nodes
              ctx.fillStyle = '#f59e0b';
              ctx.beginPath();
              ctx.arc(xA, yA, 6, 0, Math.PI * 2);
              ctx.arc(xB, yB, 6, 0, Math.PI * 2);
              ctx.fill();
            }
          }

          // 5. Draw Pose Graph Nodes
          for (let i = 0; i < nodes.length; i += 4) {
            const n = nodes[i];
            const px = toCanvasX(isOptimized ? n.optX : n.estX);
            const py = toCanvasY(isOptimized ? n.optY : n.estY);
            ctx.fillStyle = isOptimized ? '#06b6d4' : '#f43f5e';
            ctx.beginPath();
            ctx.arc(px, py, 3, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [isRunning, isLoopClosed, isOptimized, driftRate, nodes, loopEdges]);

  return (
    <div className="my-6 rounded-2xl glass-panel p-5 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Link2 className="w-4 h-4" />
            </span>
            <h3 className="font-mono font-bold text-slate-900 dark:text-slate-100 text-sm">
              Pose Graph SLAM & Loop Closure Optimization
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Detects loop closure constraints <InlineMath latex="\mathbf{z}_{ij}" /> across submaps and minimizes non-linear error <InlineMath latex="\min \sum \mathbf{e}_{ij}^T \mathbf{\Omega}_{ij} \mathbf{e}_{ij}" /> to eliminate open-loop drift.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={optimizeGraphStep}
            disabled={!isLoopClosed}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all shadow-sm ${
              isLoopClosed
                ? 'bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40'
                : 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Optimize Graph ({optIterations}x)</span>
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs border border-slate-700 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Re-run Loop</span>
          </button>
        </div>
      </div>

      {/* Canvas Viewport */}
      <div className="relative w-full aspect-[16/10] max-h-[460px] bg-slate-950 rounded-xl overflow-hidden border border-slate-800 shadow-inner flex items-center justify-center">
        <canvas
          ref={canvasRef}
          width={640}
          height={400}
          className="w-full h-full object-contain"
        />

        {/* Status Overlay */}
        <div className="absolute top-3 right-3 p-3 rounded-xl bg-slate-950/85 backdrop-blur-md border border-slate-800 text-[10px] font-mono space-y-1.5 text-slate-300">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span>Ground Truth Trajectory</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span>Drifting Odometry Trajectory</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span>Loop Closure Edge Constraint</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 inline-block" />
            <span>Optimized Factor Graph</span>
          </div>
          <div className="pt-1 border-t border-slate-800 flex justify-between text-slate-400">
            <span>Status:</span>
            <span className={isLoopClosed ? 'text-amber-400 font-bold' : 'text-slate-400'}>
              {isLoopClosed ? (isOptimized ? 'Optimized' : 'Loop Closed (Ready to Optimize)') : 'Tracking...'}
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-200 dark:border-slate-800 text-xs font-mono">
        <div className="space-y-1">
          <div className="flex justify-between text-slate-400">
            <span>Odometry Drift Rate:</span>
            <span className="text-cyan-400 font-bold">{(driftRate * 100).toFixed(0)}%</span>
          </div>
          <input
            type="range"
            min="0.02"
            max="0.2"
            step="0.02"
            value={driftRate}
            onChange={(e) => {
              setDriftRate(parseFloat(e.target.value));
              handleReset();
            }}
            className="w-full accent-cyan-500"
          />
        </div>

        <div className="flex items-center justify-between text-slate-400 pt-3">
          <span>Pose Nodes: <strong className="text-slate-200">{nodes.length} nodes</strong></span>
          <span>Loop Constraints: <strong className="text-amber-400">{loopEdges.length} detected</strong></span>
        </div>
      </div>
    </div>
  );
}

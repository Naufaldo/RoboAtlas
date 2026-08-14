'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw, StepForward, Activity, Sliders, CheckCircle2 } from 'lucide-react';
import { wrapToPi } from '@/lib/math/vector2d';

interface Point {
  x: number;
  y: number;
}

export function SlamSimulator() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [iteration, setIteration] = useState(0);
  const [meanError, setMeanError] = useState(0);
  const [noiseLevel, setNoiseLevel] = useState(2);
  const [isConverged, setIsConverged] = useState(false);

  // Reference Point Cloud (Reference scan in Cyan)
  const targetCloud = useRef<Point[]>([]);
  // Current Point Cloud (Shifted/Rotated scan in Amber)
  const currentCloud = useRef<Point[]>([]);
  const initialOffset = useRef<{ dx: number; dy: number; dtheta: number }>({
    dx: 45,
    dy: -30,
    dtheta: 0.35,
  });

  const resetScans = useCallback(() => {
    // Generate a geometric room shape / polygon outline scan
    const pts: Point[] = [];
    // Wall 1
    for (let x = 120; x <= 400; x += 15) pts.push({ x, y: 70 });
    // Wall 2 (diagonal corner)
    for (let i = 0; i <= 8; i++) pts.push({ x: 400 + i * 8, y: 70 + i * 12 });
    // Wall 3
    for (let y = 170; y <= 260; y += 15) pts.push({ x: 460, y });
    // Obstacle block
    for (let x = 180; x <= 260; x += 12) pts.push({ x, y: 190 });
    for (let y = 190; y <= 240; y += 12) pts.push({ x: 180, y });

    targetCloud.current = pts;

    // Apply rigid transformation + noise to generate current scan
    const { dx, dy, dtheta } = initialOffset.current;
    const transformed: Point[] = pts.map((p) => {
      const cosT = Math.cos(dtheta);
      const sinT = Math.sin(dtheta);
      const cx = 260;
      const cy = 160;
      const relX = p.x - cx;
      const relY = p.y - cy;

      return {
        x: cx + (relX * cosT - relY * sinT) + dx + (Math.random() - 0.5) * noiseLevel,
        y: cy + (relX * sinT + relY * cosT) + dy + (Math.random() - 0.5) * noiseLevel,
      };
    });

    currentCloud.current = transformed;
    setIteration(0);
    setIsConverged(false);
    calculateError(transformed, pts);
  }, [noiseLevel]);

  const calculateError = (curr: Point[], target: Point[]) => {
    let totalDist = 0;
    for (const p of curr) {
      let minDist = Infinity;
      for (const q of target) {
        const d = Math.hypot(p.x - q.x, p.y - q.y);
        if (d < minDist) minDist = d;
      }
      totalDist += minDist;
    }
    const err = totalDist / curr.length;
    setMeanError(Number(err.toFixed(2)));
    if (err < 1.5) setIsConverged(true);
  };

  useEffect(() => {
    resetScans();
  }, [resetScans]);

  // Single step of ICP (Iterative Closest Point using SVD Closed Form)
  const stepICP = () => {
    const target = targetCloud.current;
    const curr = currentCloud.current;
    if (curr.length === 0 || target.length === 0) return;

    // 1. Find Closest Point correspondences (nearest neighbors)
    const correspondences: { p: Point; q: Point }[] = [];
    for (const p of curr) {
      let minDist = Infinity;
      let closestPt = target[0];
      for (const q of target) {
        const d = Math.hypot(p.x - q.x, p.y - q.y);
        if (d < minDist) {
          minDist = d;
          closestPt = q;
        }
      }
      correspondences.push({ p, q: closestPt });
    }

    // 2. Compute Centroids
    let meanPx = 0, meanPy = 0;
    let meanQx = 0, meanQy = 0;
    for (const { p, q } of correspondences) {
      meanPx += p.x; meanPy += p.y;
      meanQx += q.x; meanQy += q.y;
    }
    const N = correspondences.length;
    meanPx /= N; meanPy /= N;
    meanQx /= N; meanQy /= N;

    // 3. Compute 2D Cross-Covariance Matrix H
    let H11 = 0, H12 = 0, H21 = 0, H22 = 0;
    for (const { p, q } of correspondences) {
      const px = p.x - meanPx;
      const py = p.y - meanPy;
      const qx = q.x - meanQx;
      const qy = q.y - meanQy;

      H11 += px * qx;
      H12 += px * qy;
      H21 += py * qx;
      H22 += py * qy;
    }

    // Optimal 2D rotation angle: theta = atan2(H12 - H21, H11 + H22)
    const dTheta = Math.atan2(H12 - H21, H11 + H22);
    const cosT = Math.cos(dTheta);
    const sinT = Math.sin(dTheta);

    // Optimal translation: t = meanQ - R * meanP
    const tx = meanQx - (meanPx * cosT - meanPy * sinT);
    const ty = meanQy - (meanPx * sinT + meanPy * cosT);

    // Apply transformation to current cloud
    const updated = curr.map((p) => ({
      x: p.x * cosT - p.y * sinT + tx,
      y: p.x * sinT + p.y * cosT + ty,
    }));

    currentCloud.current = updated;
    setIteration((prev) => prev + 1);
    calculateError(updated, target);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Grid
    ctx.strokeStyle = 'rgba(51, 65, 85, 0.2)';
    ctx.lineWidth = 1;
    for (let x = 0; x < canvas.width; x += 30) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += 30) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    const target = targetCloud.current;
    const curr = currentCloud.current;

    // Correspondence lines (faint yellow vectors)
    if (curr.length > 0 && target.length > 0) {
      for (const p of curr) {
        let minDist = Infinity;
        let closest = target[0];
        for (const q of target) {
          const d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < minDist) {
            minDist = d;
            closest = q;
          }
        }

        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(closest.x, closest.y);
        ctx.strokeStyle = 'rgba(251, 191, 36, 0.25)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    // Reference Target Cloud (Cyan)
    for (const p of target) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#06b6d4';
      ctx.fill();
    }

    // Current Source Cloud (Amber)
    for (const p of curr) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = isConverged ? '#10b981' : '#f59e0b';
      ctx.fill();
      ctx.strokeStyle = '#090d16';
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }, [iteration, meanError, isConverged]);

  return (
    <div className="rounded-2xl glass-panel border border-slate-800/90 overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="px-4 py-3 bg-slate-900/80 border-b border-slate-800/80 flex items-center justify-between flex-wrap gap-2 text-xs font-mono">
        <div className="flex items-center gap-2 text-cyan-400 font-bold">
          <Activity className="w-4 h-4" />
          <span>Iterative Closest Point (ICP) Scan Matching</span>
        </div>

        <div className="flex items-center gap-4 text-[11px] text-slate-300">
          <span>
            Iteration: <strong className="text-cyan-400">{iteration}</strong>
          </span>
          <span>
            Mean Error: <strong className={isConverged ? 'text-emerald-400' : 'text-amber-400'}>{meanError} px</strong>
          </span>
          {isConverged && (
            <span className="flex items-center gap-1 text-emerald-400 font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" /> Converged!
            </span>
          )}
        </div>
      </div>

      {/* Canvas */}
      <div className="relative aspect-[16/9] w-full max-h-[340px] bg-[#050811]">
        <canvas ref={canvasRef} width={520} height={320} className="w-full h-full block" />

        <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md px-3 py-2 rounded-lg border border-slate-800 text-[10px] font-mono space-y-1 text-slate-300">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#06b6d4]" />
            <span>Reference Scan (Target)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]" />
            <span>Shifted Scan (Source)</span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="p-4 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between flex-wrap gap-3 text-xs font-mono">
        <div className="flex items-center gap-2">
          <button
            onClick={stepICP}
            disabled={isConverged}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold transition-all ${
              isConverged
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-lg shadow-cyan-500/20'
            }`}
          >
            <StepForward className="w-4 h-4" />
            Step ICP Iteration
          </button>

          <button
            onClick={resetScans}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Scramble Offset
          </button>
        </div>

        <div className="text-[11px] text-slate-400">
          Each iteration solves for optimal 2D rotation $R$ and translation $t$ to minimize Point-to-Point Euclidean error.
        </div>
      </div>
    </div>
  );
}

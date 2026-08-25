'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw, Sparkles, Sliders, ChevronRight, CheckCircle2 } from 'lucide-react';
import { InlineMath } from '@/components/mathematics/MathBlock';

interface Point {
  x: number;
  y: number;
  cluster: number;
}

interface Centroid {
  x: number;
  y: number;
  prevX?: number;
  prevY?: number;
  color: string;
}

const CLUSTER_COLORS = [
  '#06b6d4', // Cyan
  '#10b981', // Emerald
  '#f59e0b', // Amber
  '#f43f5e', // Rose
  '#8b5cf6', // Purple
  '#3b82f6', // Blue
];

export function KMeansClusteringSimulator() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [numK, setNumK] = useState(3);
  const [iteration, setIteration] = useState(0);
  const [costJ, setCostJ] = useState(0);
  const [isConverged, setIsConverged] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  const [points, setPoints] = useState<Point[]>([]);
  const [centroids, setCentroids] = useState<Centroid[]>([]);

  // Generate Point Clusters around random seed centers
  const generateNewPoints = useCallback((kCount: number) => {
    const newPoints: Point[] = [];
    const seedCenters = [
      { x: -5, y: 4, spread: 1.4, count: 40 },
      { x: 5, y: 5, spread: 1.2, count: 45 },
      { x: 0, y: -5, spread: 1.6, count: 50 },
      { x: -6, y: -4, spread: 1.3, count: 35 },
      { x: 6, y: -4, spread: 1.5, count: 40 },
    ].slice(0, kCount);

    for (let c = 0; c < seedCenters.length; c++) {
      const center = seedCenters[c];
      for (let i = 0; i < center.count; i++) {
        // Box-Muller Gaussian random scatter
        const u1 = Math.random();
        const u2 = Math.random();
        const randStd = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
        const randStd2 = Math.sqrt(-2.0 * Math.log(u1)) * Math.sin(2.0 * Math.PI * u2);

        newPoints.push({
          x: center.x + randStd * center.spread,
          y: center.y + randStd2 * center.spread,
          cluster: -1,
        });
      }
    }

    // Initialize Random Centroids
    const initialCentroids: Centroid[] = [];
    for (let k = 0; k < kCount; k++) {
      const randIdx = Math.floor(Math.random() * newPoints.length);
      initialCentroids.push({
        x: newPoints[randIdx].x + (Math.random() - 0.5) * 2,
        y: newPoints[randIdx].y + (Math.random() - 0.5) * 2,
        color: CLUSTER_COLORS[k % CLUSTER_COLORS.length],
      });
    }

    setPoints(newPoints);
    setCentroids(initialCentroids);
    setIteration(0);
    setIsConverged(false);
    setCostJ(0);
  }, []);

  // Initialize on mount or K change
  useEffect(() => {
    generateNewPoints(numK);
  }, [numK, generateNewPoints]);

  // Execute 1 Step of K-Means (Assignment -> Centroid Update)
  const stepKMeans = useCallback(() => {
    if (points.length === 0 || centroids.length === 0) return;

    let totalDistSq = 0;
    const updatedPoints = points.map((pt) => {
      let minDistSq = Infinity;
      let assignedCluster = 0;

      for (let k = 0; k < centroids.length; k++) {
        const dSq = (pt.x - centroids[k].x) ** 2 + (pt.y - centroids[k].y) ** 2;
        if (dSq < minDistSq) {
          minDistSq = dSq;
          assignedCluster = k;
        }
      }

      totalDistSq += minDistSq;
      return { ...pt, cluster: assignedCluster };
    });

    // Compute new centroids
    let maxShift = 0;
    const updatedCentroids = centroids.map((cent, k) => {
      const clusterMembers = updatedPoints.filter((p) => p.cluster === k);
      if (clusterMembers.length === 0) return cent;

      const sumX = clusterMembers.reduce((acc, p) => acc + p.x, 0);
      const sumY = clusterMembers.reduce((acc, p) => acc + p.y, 0);
      const newX = sumX / clusterMembers.length;
      const newY = sumY / clusterMembers.length;

      const shift = Math.sqrt((newX - cent.x) ** 2 + (newY - cent.y) ** 2);
      if (shift > maxShift) maxShift = shift;

      return {
        ...cent,
        prevX: cent.x,
        prevY: cent.y,
        x: newX,
        y: newY,
      };
    });

    setPoints(updatedPoints);
    setCentroids(updatedCentroids);
    setCostJ(totalDistSq);
    setIteration((prev) => prev + 1);

    if (maxShift < 0.01) {
      setIsConverged(true);
      setIsAutoPlaying(false);
    }
  }, [points, centroids]);

  // Auto-play timer
  useEffect(() => {
    if (!isAutoPlaying || isConverged) return;

    const timer = setInterval(() => {
      stepKMeans();
    }, 450);

    return () => clearInterval(timer);
  }, [isAutoPlaying, isConverged, stepKMeans]);

  // Canvas Rendering Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear background
    ctx.fillStyle = '#030712';
    ctx.fillRect(0, 0, width, height);

    const worldExtent = 18; // -9m to +9m
    const toCanvasX = (wx: number) => width / 2 + (wx / worldExtent) * width;
    const toCanvasY = (wy: number) => height / 2 - (wy / worldExtent) * height;

    // Coordinate Grid
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

    // Draw Points
    for (const pt of points) {
      const color = pt.cluster >= 0 ? CLUSTER_COLORS[pt.cluster % CLUSTER_COLORS.length] : '#64748b';
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(toCanvasX(pt.x), toCanvasY(pt.y), 3.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Draw Centroids (Diamonds with Glow)
    for (let k = 0; k < centroids.length; k++) {
      const cent = centroids[k];
      const cx = toCanvasX(cent.x);
      const cy = toCanvasY(cent.y);

      // Trailing path from previous iteration
      if (cent.prevX !== undefined && cent.prevY !== undefined) {
        ctx.strokeStyle = `${cent.color}66`;
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(toCanvasX(cent.prevX), toCanvasY(cent.prevY));
        ctx.lineTo(cx, cy);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Outer glow
      ctx.strokeStyle = cent.color;
      ctx.fillStyle = `${cent.color}33`;
      ctx.lineWidth = 2;

      // Draw Diamond
      const size = 10;
      ctx.beginPath();
      ctx.moveTo(cx, cy - size);
      ctx.lineTo(cx + size, cy);
      ctx.lineTo(cx, cy + size);
      ctx.lineTo(cx - size, cy);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Inner dot
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(cx, cy, 2.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }, [points, centroids]);

  return (
    <div className="my-6 rounded-2xl glass-panel p-5 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Sparkles className="w-4 h-4" />
            </span>
            <h3 className="font-mono font-bold text-slate-900 dark:text-slate-100 text-sm">
              k-Means 2D Point Cloud Clustering
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Minimizes within-cluster variance <InlineMath latex="J = \sum_{k=1}^K \sum_{\mathbf{p}_i \in C_k} \|\mathbf{p}_i - \boldsymbol{\mu}_k\|^2" /> to segment distinct obstacle bodies.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            disabled={isConverged}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all shadow-sm ${
              isConverged
                ? 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                : isAutoPlaying
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
            }`}
          >
            {isAutoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isAutoPlaying ? 'Pause' : 'Auto Converge'}</span>
          </button>

          <button
            onClick={stepKMeans}
            disabled={isConverged || isAutoPlaying}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 font-mono text-xs font-bold border border-cyan-500/30 transition-all disabled:opacity-40"
          >
            <span>Step 1x</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => generateNewPoints(numK)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs border border-slate-700 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reseed</span>
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

        {/* Live Metrics */}
        <div className="absolute top-3 right-3 p-2.5 rounded-xl bg-slate-950/80 backdrop-blur-md border border-slate-800 text-[10px] font-mono space-y-1 text-slate-300">
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Iteration:</span>
            <span className="text-cyan-400 font-bold">{iteration}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Objective Cost (<InlineMath latex="J" />):</span>
            <span className="text-amber-400 font-bold">{costJ.toFixed(1)}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Status:</span>
            <span className={isConverged ? 'text-emerald-400 font-bold flex items-center gap-1' : 'text-cyan-400'}>
              {isConverged ? <><CheckCircle2 className="w-3 h-3" /> Converged</> : 'Iterating...'}
            </span>
          </div>
        </div>
      </div>

      {/* Cluster K Slider */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-200 dark:border-slate-800 text-xs font-mono">
        <div className="space-y-1">
          <div className="flex justify-between text-slate-400">
            <span>Cluster Count (<InlineMath latex="K" />):</span>
            <span className="text-cyan-400 font-bold">{numK} clusters</span>
          </div>
          <input
            type="range"
            min="2"
            max="5"
            step="1"
            value={numK}
            onChange={(e) => setNumK(parseInt(e.target.value))}
            className="w-full accent-cyan-500"
          />
        </div>

        <div className="flex items-center justify-between text-slate-400 pt-3">
          <span>Points in Cloud: <strong className="text-slate-200">{points.length} points</strong></span>
          <span className="text-[11px] text-cyan-400">Voronoi Partitioning Active</span>
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw, StepForward, Activity, Sliders, CheckCircle2 } from 'lucide-react';
import { wrapToPi } from '@/lib/math/vector2d';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useTheme } from '@/lib/theme/ThemeContext';

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

  const { theme } = useTheme();
  const { locale } = useLanguage();
  const isId = locale === 'id';

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

    // Initial mean error
    let sumErr = 0;
    for (let i = 0; i < pts.length; i++) {
      sumErr += Math.hypot(pts[i].x - transformed[i].x, pts[i].y - transformed[i].y);
    }
    setMeanError(Number((sumErr / pts.length).toFixed(2)));
  }, [noiseLevel]);

  useEffect(() => {
    resetScans();
  }, [resetScans]);

  // Execute 1 Step of ICP Scan Matching
  const stepICP = useCallback(() => {
    if (isConverged) return;

    const target = targetCloud.current;
    const curr = currentCloud.current;
    const N = curr.length;

    // 1. Point Correspondences (Nearest Neighbor)
    const correspondences: { p: Point; q: Point }[] = [];
    let totalErr = 0;

    for (let i = 0; i < N; i++) {
      const p = curr[i];
      let bestDist = Infinity;
      let closestQ = target[0];

      for (let j = 0; j < target.length; j++) {
        const q = target[j];
        const d = Math.hypot(p.x - q.x, p.y - q.y);
        if (d < bestDist) {
          bestDist = d;
          closestQ = q;
        }
      }

      correspondences.push({ p, q: closestQ });
      totalErr += bestDist;
    }

    const currentMeanErr = totalErr / N;
    setMeanError(Number(currentMeanErr.toFixed(2)));

    if (currentMeanErr < 2.2 || iteration >= 18) {
      setIsConverged(true);
      return;
    }

    // 2. Compute Centroids
    let pMeanX = 0, pMeanY = 0;
    let qMeanX = 0, qMeanY = 0;
    for (const pair of correspondences) {
      pMeanX += pair.p.x;
      pMeanY += pair.p.y;
      qMeanX += pair.q.x;
      qMeanY += pair.q.y;
    }
    pMeanX /= N;
    pMeanY /= N;
    qMeanX /= N;
    qMeanY /= N;

    // 3. Compute 2D SVD / Covariance Alignment
    // H = sum((p - pMean) * (q - qMean)^T)
    let sxx = 0, sxy = 0, syx = 0, syy = 0;
    for (const pair of correspondences) {
      const px = pair.p.x - pMeanX;
      const py = pair.p.y - pMeanY;
      const qx = pair.q.x - qMeanX;
      const qy = pair.q.y - qMeanY;

      sxx += px * qx;
      sxy += px * qy;
      syx += py * qx;
      syy += py * qy;
    }

    // Optimal 2D rotation angle: theta = atan2(sxy - syx, sxx + syy)
    const dTheta = Math.atan2(sxy - syx, sxx + syy);
    const cosT = Math.cos(dTheta);
    const sinT = Math.sin(dTheta);

    // Optimal translation: t = qMean - R * pMean
    const tx = qMeanX - (pMeanX * cosT - pMeanY * sinT);
    const ty = qMeanY - (pMeanX * sinT + pMeanY * cosT);

    // 4. Update Current Scan Points
    for (let i = 0; i < N; i++) {
      const p = curr[i];
      const newX = (p.x * cosT - p.y * sinT) + tx;
      const newY = (p.x * sinT + p.y * cosT) + ty;
      p.x = newX;
      p.y = newY;
    }

    setIteration((prev) => prev + 1);
  }, [isConverged, iteration]);

  // RENDER CANVAS
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const isLight = theme === 'light';

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background
    ctx.fillStyle = isLight ? '#f1f5f9' : '#050811';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Grid
    ctx.strokeStyle = isLight ? 'rgba(203, 213, 225, 0.6)' : 'rgba(51, 65, 85, 0.25)';
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

    // Draw Correspondence Lines
    if (target.length > 0 && curr.length > 0 && !isConverged) {
      for (let i = 0; i < curr.length; i++) {
        const p = curr[i];
        let bestDist = Infinity;
        let closestQ = target[0];
        for (let j = 0; j < target.length; j++) {
          const q = target[j];
          const d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < bestDist) {
            bestDist = d;
            closestQ = q;
          }
        }
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(closestQ.x, closestQ.y);
        ctx.strokeStyle = isLight ? 'rgba(100, 116, 139, 0.35)' : 'rgba(148, 163, 184, 0.25)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    // Reference Target Cloud (Cyan)
    for (const p of target) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = isLight ? '#0284c7' : '#06b6d4';
      ctx.fill();
    }

    // Current Source Cloud (Amber / Emerald when converged)
    for (const p of curr) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = isConverged ? '#10b981' : '#f59e0b';
      ctx.fill();
      ctx.strokeStyle = isLight ? '#ffffff' : '#090d16';
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }, [iteration, meanError, isConverged, theme]);

  return (
    <div className="rounded-2xl glass-panel border border-slate-200 dark:border-slate-800/90 overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="px-4 py-3 bg-slate-100/90 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800/80 flex items-center justify-between flex-wrap gap-2 text-xs font-mono text-slate-800 dark:text-slate-200">
        <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-bold">
          <Activity className="w-4 h-4" />
          <span>{isId ? 'Simulator Pencocokan Pindaian ICP (Iterative Closest Point)' : 'Iterative Closest Point (ICP) Scan Matching'}</span>
        </div>

        <div className="flex items-center gap-4 text-[11px]">
          <span>
            {isId ? 'Iterasi:' : 'Iteration:'} <strong className="text-cyan-600 dark:text-cyan-400">{iteration}</strong>
          </span>
          <span>
            {isId ? 'Rata-rata Error:' : 'Mean Error:'} <strong className={isConverged ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}>{meanError} px</strong>
          </span>
          {isConverged && (
            <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" /> {isId ? 'Konvergen!' : 'Converged!'}
            </span>
          )}
        </div>
      </div>

      {/* Canvas */}
      <div className="relative aspect-[16/9] w-full max-h-[340px] bg-[#f1f5f9] dark:bg-[#050811]">
        <canvas ref={canvasRef} width={520} height={320} className="w-full h-full block" />

        <div className="absolute top-3 right-3 bg-white/90 dark:bg-slate-950/80 backdrop-blur-md px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 text-[10px] font-mono space-y-1 text-slate-700 dark:text-slate-300">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0284c7] dark:bg-[#06b6d4]" />
            <span>{isId ? 'Pindaian Referensi (Target)' : 'Reference Scan (Target)'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]" />
            <span>{isId ? 'Pindaian Bergeser (Source)' : 'Shifted Scan (Source)'}</span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="p-4 bg-slate-50 dark:bg-slate-900/90 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between flex-wrap gap-3 text-xs font-mono">
        <div className="flex items-center gap-2">
          <button
            onClick={stepICP}
            disabled={isConverged}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold transition-all ${
              isConverged
                ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed border border-slate-300 dark:border-slate-700'
                : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-lg shadow-cyan-500/20'
            }`}
          >
            <StepForward className="w-4 h-4" />
            {isId ? 'Langkah Iterasi ICP' : 'Step ICP Iteration'}
          </button>

          <button
            onClick={resetScans}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            {isId ? 'Acak Posisi Pindaian' : 'Scramble Offset'}
          </button>
        </div>

        <div className="text-[11px] text-slate-500 dark:text-slate-400">
          {isId ? 'Setiap iterasi menghitung rotasi R dan translasi t optimal yang meminimalkan error Euclidean.' : 'Each iteration solves for optimal 2D rotation R and translation t to minimize Point-to-Point Euclidean error.'}
        </div>
      </div>
    </div>
  );
}

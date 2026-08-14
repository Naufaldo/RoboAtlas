'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Compass, Sparkles, RefreshCw, ArrowUpRight } from 'lucide-react';

export interface VectorVisualizerProps {
  initialVx?: number;
  initialVy?: number;
}

export function VectorVisualizer({
  initialVx = 3.0,
  initialVy = 2.0,
}: VectorVisualizerProps) {
  const { locale } = useLanguage();
  const isId = locale === 'id';

  const [vx, setVx] = useState<number>(initialVx);
  const [vy, setVy] = useState<number>(initialVy);
  const [showComponents, setShowComponents] = useState<boolean>(true);
  const [showAngleArc, setShowAngleArc] = useState<boolean>(true);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const magnitude = Math.hypot(vx, vy);
  const angleRad = Math.atan2(vy, vx);
  const angleDeg = (angleRad * 180) / Math.PI;

  const unitVx = magnitude > 0 ? vx / magnitude : 0;
  const unitVy = magnitude > 0 ? vy / magnitude : 0;

  // Render Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const originX = width / 2;
    const originY = height / 2;
    const pixelsPerUnit = 38;

    ctx.clearRect(0, 0, width, height);

    // Background
    ctx.fillStyle = '#090d16';
    ctx.fillRect(0, 0, width, height);

    // Grid
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    for (let x = originX % pixelsPerUnit; x < width; x += pixelsPerUnit) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = originY % pixelsPerUnit; y < height; y += pixelsPerUnit) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, originY);
    ctx.lineTo(width, originY);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(originX, 0);
    ctx.lineTo(originX, height);
    ctx.stroke();

    // Origin point
    ctx.fillStyle = '#94a3b8';
    ctx.beginPath();
    ctx.arc(originX, originY, 4, 0, Math.PI * 2);
    ctx.fill();

    const targetX = originX + vx * pixelsPerUnit;
    const targetY = originY - vy * pixelsPerUnit;

    // Component Triangle
    if (showComponents && (vx !== 0 || vy !== 0)) {
      // Horizontal vx (Cyan)
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(originX, originY);
      ctx.lineTo(targetX, originY);
      ctx.stroke();

      // Horizontal arrow
      if (Math.abs(vx) > 0.4) {
        const hDir = vx >= 0 ? 1 : -1;
        ctx.fillStyle = '#06b6d4';
        ctx.beginPath();
        ctx.moveTo(targetX, originY);
        ctx.lineTo(targetX - 8 * hDir, originY - 4);
        ctx.lineTo(targetX - 8 * hDir, originY + 4);
        ctx.closePath();
        ctx.fill();
      }

      // Vertical vy (Emerald)
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(targetX, originY);
      ctx.lineTo(targetX, targetY);
      ctx.stroke();

      // Vertical arrow
      if (Math.abs(vy) > 0.4) {
        const vDir = vy >= 0 ? -1 : 1;
        ctx.fillStyle = '#10b981';
        ctx.beginPath();
        ctx.moveTo(targetX, targetY);
        ctx.lineTo(targetX - 4, targetY - 8 * vDir);
        ctx.lineTo(targetX + 4, targetY - 8 * vDir);
        ctx.closePath();
        ctx.fill();
      }
    }

    // Angle Arc
    if (showAngleArc && magnitude > 0.5) {
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(originX, originY, 28, 0, -angleRad, angleRad < 0);
      ctx.stroke();

      ctx.font = '10px monospace';
      ctx.fillStyle = '#f59e0b';
      ctx.fillText(`${angleDeg.toFixed(0)}°`, originX + 34 * Math.cos(-angleRad / 2), originY + 34 * Math.sin(-angleRad / 2));
    }

    // Main Vector Arrow (Bold Blue)
    if (magnitude > 0) {
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(originX, originY);
      ctx.lineTo(targetX, targetY);
      ctx.stroke();

      // Arrowhead
      const headlen = 14;
      const angle = Math.atan2(targetY - originY, targetX - originX);
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.moveTo(targetX, targetY);
      ctx.lineTo(targetX - headlen * Math.cos(angle - Math.PI / 7), targetY - headlen * Math.sin(angle - Math.PI / 7));
      ctx.lineTo(targetX - headlen * Math.cos(angle + Math.PI / 7), targetY - headlen * Math.sin(angle + Math.PI / 7));
      ctx.closePath();
      ctx.fill();
    }
  }, [vx, vy, showComponents, showAngleArc, magnitude, angleRad, angleDeg]);

  return (
    <div className="p-5 rounded-2xl glass-panel border border-slate-200 dark:border-slate-800 space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <ArrowUpRight className="w-5 h-5 text-cyan-500" />
          <h3 className="text-sm font-mono font-bold text-slate-900 dark:text-slate-100">
            {isId ? 'Laboratorium Vektor & Teorema Pythagoras' : 'Vector Decomposition & Pythagorean Laboratory'}
          </h3>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono">
          <button
            onClick={() => setShowComponents(!showComponents)}
            className={`px-2.5 py-1 rounded-lg border transition-all ${
              showComponents
                ? 'bg-cyan-500/15 border-cyan-500/30 text-cyan-700 dark:text-cyan-300'
                : 'border-slate-300 dark:border-slate-700 text-slate-500'
            }`}
          >
            {isId ? 'Komponen vx, vy' : 'Components vx, vy'}
          </button>
          <button
            onClick={() => {
              setVx(3.0);
              setVy(2.0);
            }}
            className="p-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-500 hover:text-slate-900 dark:hover:text-slate-100"
            title="Reset"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Canvas */}
      <div className="relative rounded-xl overflow-hidden border border-slate-700/60 bg-slate-950 flex justify-center">
        <canvas
          ref={canvasRef}
          width={520}
          height={320}
          className="w-full max-w-[520px] h-auto"
        />
      </div>

      {/* Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs pt-1">
        <div className="space-y-1.5 bg-slate-50 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <label className="text-cyan-600 dark:text-cyan-400 font-semibold">
              v_x Component (m/s)
            </label>
            <span className="text-slate-900 dark:text-slate-100 font-bold">{vx.toFixed(1)}</span>
          </div>
          <input
            type="range"
            min="-5.0"
            max="5.0"
            step="0.1"
            value={vx}
            onChange={(e) => setVx(parseFloat(e.target.value))}
            className="w-full accent-cyan-500 cursor-pointer"
          />
        </div>

        <div className="space-y-1.5 bg-slate-50 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <label className="text-emerald-600 dark:text-emerald-400 font-semibold">
              v_y Component (m/s)
            </label>
            <span className="text-slate-900 dark:text-slate-100 font-bold">{vy.toFixed(1)}</span>
          </div>
          <input
            type="range"
            min="-5.0"
            max="5.0"
            step="0.1"
            value={vy}
            onChange={(e) => setVy(parseFloat(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer"
          />
        </div>
      </div>

      {/* Magnitude & Unit Vector Readouts */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 font-mono text-xs">
        <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
          <span className="text-[10px] text-slate-500 block">Magnitude ||v|| (Pythagoras)</span>
          <span className="text-sm sm:text-base font-bold text-cyan-600 dark:text-cyan-400">
            sqrt({vx.toFixed(1)}² + {vy.toFixed(1)}²) = {magnitude.toFixed(2)}
          </span>
        </div>
        <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
          <span className="text-[10px] text-slate-500 block">Orientation theta (atan2)</span>
          <span className="text-sm sm:text-base font-bold text-amber-600 dark:text-amber-400">
            {angleDeg.toFixed(1)}° ({angleRad.toFixed(2)} rad)
          </span>
        </div>
        <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 col-span-2 sm:col-span-1">
          <span className="text-[10px] text-slate-500 block">Normalized Unit Vector v_hat</span>
          <span className="text-xs sm:text-sm font-bold text-emerald-600 dark:text-emerald-400">
            [{unitVx.toFixed(2)}, {unitVy.toFixed(2)}]ᵀ
          </span>
        </div>
      </div>
    </div>
  );
}

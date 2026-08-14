'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Sparkles, RefreshCw, Layers } from 'lucide-react';

export function DotProductExplorer() {
  const { locale } = useLanguage();
  const isId = locale === 'id';

  const [angleA, setAngleA] = useState<number>(30);
  const [angleB, setAngleB] = useState<number>(75);
  const [magA, setMagA] = useState<number>(3.5);
  const [magB, setMagB] = useState<number>(4.0);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const radA = (angleA * Math.PI) / 180;
  const radB = (angleB * Math.PI) / 180;

  const ax = magA * Math.cos(radA);
  const ay = magA * Math.sin(radA);
  const bx = magB * Math.cos(radB);
  const by = magB * Math.sin(radB);

  // Dot product
  const dotProduct = ax * bx + ay * by;
  const diffAngleDeg = Math.abs(angleA - angleB);
  const cosTheta = Math.cos(((angleA - angleB) * Math.PI) / 180);

  // Projection of a onto b
  const projScalar = magB > 0 ? dotProduct / magB : 0;

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
    const pixelsPerUnit = 32;

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
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, originY);
    ctx.lineTo(width, originY);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(originX, 0);
    ctx.lineTo(originX, height);
    ctx.stroke();

    const pAx = originX + ax * pixelsPerUnit;
    const pAy = originY - ay * pixelsPerUnit;
    const pBx = originX + bx * pixelsPerUnit;
    const pBy = originY - by * pixelsPerUnit;

    // Unit vector of B
    const unitBx = magB > 0 ? bx / magB : 0;
    const unitBy = magB > 0 ? by / magB : 0;
    const pProjX = originX + projScalar * unitBx * pixelsPerUnit;
    const pProjY = originY - projScalar * unitBy * pixelsPerUnit;

    // Projection Dotted Line from A to B-line
    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(pAx, pAy);
    ctx.lineTo(pProjX, pProjY);
    ctx.stroke();
    ctx.setLineDash([]);

    // Projection Shadow vector on B
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(originX, originY);
    ctx.lineTo(pProjX, pProjY);
    ctx.stroke();

    // Vector B (Cyan)
    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.moveTo(originX, originY);
    ctx.lineTo(pBx, pBy);
    ctx.stroke();

    // Vector A (Emerald)
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.moveTo(originX, originY);
    ctx.lineTo(pAx, pAy);
    ctx.stroke();

    // Labels
    ctx.font = 'bold 12px monospace';
    ctx.fillStyle = '#10b981';
    ctx.fillText('a', pAx + 8, pAy - 4);

    ctx.fillStyle = '#06b6d4';
    ctx.fillText('b', pBx + 8, pBy - 4);

    ctx.fillStyle = '#f59e0b';
    ctx.fillText('proj_b(a)', pProjX + 6, pProjY + 14);
  }, [ax, ay, bx, by, magB, projScalar]);

  return (
    <div className="p-5 rounded-2xl glass-panel border border-slate-200 dark:border-slate-800 space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-cyan-500" />
          <h3 className="text-sm font-mono font-bold text-slate-900 dark:text-slate-100">
            {isId ? 'Laboratorium Perkalian Titik (Dot Product) & Proyeksi' : 'Dot Product & Vector Projection Laboratory'}
          </h3>
        </div>
        <button
          onClick={() => {
            setAngleA(30);
            setAngleB(75);
            setMagA(3.5);
            setMagB(4.0);
          }}
          className="p-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-500 hover:text-slate-900 dark:hover:text-slate-100"
          title="Reset"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
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

      {/* Angle Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs pt-1">
        <div className="space-y-1.5 bg-slate-50 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <label className="text-emerald-600 dark:text-emerald-400 font-semibold">
              Vector a Angle (θ_a)
            </label>
            <span className="text-slate-900 dark:text-slate-100 font-bold">{angleA}°</span>
          </div>
          <input
            type="range"
            min="0"
            max="360"
            step="5"
            value={angleA}
            onChange={(e) => setAngleA(parseFloat(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer"
          />
        </div>

        <div className="space-y-1.5 bg-slate-50 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <label className="text-cyan-600 dark:text-cyan-400 font-semibold">
              Vector b Angle (θ_b)
            </label>
            <span className="text-slate-900 dark:text-slate-100 font-bold">{angleB}°</span>
          </div>
          <input
            type="range"
            min="0"
            max="360"
            step="5"
            value={angleB}
            onChange={(e) => setAngleB(parseFloat(e.target.value))}
            className="w-full accent-cyan-500 cursor-pointer"
          />
        </div>
      </div>

      {/* Analytical Telemetry */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 font-mono text-xs">
        <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
          <span className="text-[10px] text-slate-500 block">Algebraic Sum: ax*bx + ay*by</span>
          <span className="text-base font-bold text-cyan-600 dark:text-cyan-400">
            {dotProduct.toFixed(2)}
          </span>
        </div>
        <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
          <span className="text-[10px] text-slate-500 block">Geometric: ||a|| ||b|| cos(θ)</span>
          <span className="text-base font-bold text-emerald-600 dark:text-emerald-400">
            {magA.toFixed(1)} × {magB.toFixed(1)} × {cosTheta.toFixed(2)} = {dotProduct.toFixed(2)}
          </span>
        </div>
        <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
          <span className="text-[10px] text-slate-500 block">Physical Meaning</span>
          <span
            className={`text-xs font-bold ${
              dotProduct > 0.1
                ? 'text-emerald-500'
                : Math.abs(dotProduct) <= 0.1
                ? 'text-amber-500'
                : 'text-rose-500'
            }`}
          >
            {dotProduct > 0.1
              ? isId ? 'Searah (Forward Motion)' : 'Aligned (Forward)'
              : Math.abs(dotProduct) <= 0.1
              ? isId ? 'Tegak Lurus (Orthogonal / 90°)' : 'Orthogonal (Perpendicular)'
              : isId ? 'Berlawanan Arah (Opposing)' : 'Opposing (Backward)'}
          </span>
        </div>
      </div>
    </div>
  );
}

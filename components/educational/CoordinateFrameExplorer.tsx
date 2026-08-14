'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Compass, Move, RefreshCw, Eye } from 'lucide-react';

export interface CoordinateFrameExplorerProps {
  initialX?: number;
  initialY?: number;
  showPolar?: boolean;
}

export function CoordinateFrameExplorer({
  initialX = 3,
  initialY = 2,
  showPolar = true,
}: CoordinateFrameExplorerProps) {
  const { locale } = useLanguage();
  const isId = locale === 'id';

  const [point, setPoint] = useState<{ x: number; y: number }>({ x: initialX, y: initialY });
  const [isDragging, setIsDragging] = useState(false);
  const [showGrid, setShowGrid] = useState(true);
  const [showComponents, setShowComponents] = useState(true);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const r = Math.hypot(point.x, point.y);
  const thetaRad = Math.atan2(point.y, point.x);
  const thetaDeg = (thetaRad * 180) / Math.PI;

  const handlePointer = useCallback(
    (clientX: number, clientY: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;

      const mouseX = (clientX - rect.left) * scaleX;
      const mouseY = (clientY - rect.top) * scaleY;

      const originX = canvas.width / 2;
      const originY = canvas.height / 2;
      const pixelsPerUnit = 40;

      const worldX = Math.round(((mouseX - originX) / pixelsPerUnit) * 10) / 10;
      const worldY = Math.round(((originY - mouseY) / pixelsPerUnit) * 10) / 10;

      // Clamping within visible range
      const clampedX = Math.max(-5, Math.min(5, worldX));
      const clampedY = Math.max(-5, Math.min(5, worldY));

      setPoint({ x: clampedX, y: clampedY });
    },
    []
  );

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
    const pixelsPerUnit = 40;

    ctx.clearRect(0, 0, width, height);

    // Background
    ctx.fillStyle = '#090d16';
    ctx.fillRect(0, 0, width, height);

    // Grid
    if (showGrid) {
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
    }

    // Axes
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 2;

    // X Axis
    ctx.beginPath();
    ctx.moveTo(0, originY);
    ctx.lineTo(width, originY);
    ctx.stroke();

    // Y Axis
    ctx.beginPath();
    ctx.moveTo(originX, 0);
    ctx.lineTo(originX, height);
    ctx.stroke();

    // Origin Circle
    ctx.fillStyle = '#94a3b8';
    ctx.beginPath();
    ctx.arc(originX, originY, 4, 0, Math.PI * 2);
    ctx.fill();

    // Axes labels
    ctx.font = '11px monospace';
    ctx.fillStyle = '#64748b';
    ctx.fillText('X (m)', width - 35, originY - 8);
    ctx.fillText('Y (m)', originX + 8, 15);
    ctx.fillText('O (0,0)', originX - 38, originY + 16);

    const px = originX + point.x * pixelsPerUnit;
    const py = originY - point.y * pixelsPerUnit;

    // Component Projections
    if (showComponents) {
      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 1.5;

      // Projection to X axis
      ctx.beginPath();
      ctx.moveTo(px, originY);
      ctx.lineTo(px, py);
      ctx.stroke();

      // Projection to Y axis
      ctx.beginPath();
      ctx.moveTo(originX, py);
      ctx.lineTo(px, py);
      ctx.stroke();

      ctx.setLineDash([]);
    }

    // Radius Vector Line
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(originX, originY);
    ctx.lineTo(px, py);
    ctx.stroke();

    // Point P
    ctx.fillStyle = '#06b6d4';
    ctx.beginPath();
    ctx.arc(px, py, 9, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Label on Point
    ctx.font = 'bold 12px monospace';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`P(${point.x.toFixed(1)}, ${point.y.toFixed(1)})`, px + 12, py - 8);
  }, [point, showGrid, showComponents]);

  return (
    <div className="p-5 rounded-2xl glass-panel border border-slate-200 dark:border-slate-800 space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Compass className="w-5 h-5 text-cyan-500" />
          <h3 className="text-sm font-mono font-bold text-slate-900 dark:text-slate-100">
            {isId ? 'Laboratorium Bidang Koordinat 2D' : '2D Coordinate Plane Laboratory'}
          </h3>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono">
          <button
            onClick={() => setShowGrid(!showGrid)}
            className={`px-2.5 py-1 rounded-lg border transition-all ${
              showGrid
                ? 'bg-cyan-500/15 border-cyan-500/30 text-cyan-700 dark:text-cyan-300'
                : 'border-slate-300 dark:border-slate-700 text-slate-500'
            }`}
          >
            Grid
          </button>
          <button
            onClick={() => setShowComponents(!showComponents)}
            className={`px-2.5 py-1 rounded-lg border transition-all ${
              showComponents
                ? 'bg-cyan-500/15 border-cyan-500/30 text-cyan-700 dark:text-cyan-300'
                : 'border-slate-300 dark:border-slate-700 text-slate-500'
            }`}
          >
            {isId ? 'Proyeksi Sumbu' : 'Axis Projections'}
          </button>
          <button
            onClick={() => setPoint({ x: 3, y: 2 })}
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
          height={360}
          className="w-full max-w-[520px] h-auto cursor-crosshair touch-none"
          onMouseDown={(e) => {
            setIsDragging(true);
            handlePointer(e.clientX, e.clientY);
          }}
          onMouseMove={(e) => {
            if (isDragging) handlePointer(e.clientX, e.clientY);
          }}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onTouchStart={(e) => {
            setIsDragging(true);
            if (e.touches[0]) handlePointer(e.touches[0].clientX, e.touches[0].clientY);
          }}
          onTouchMove={(e) => {
            if (isDragging && e.touches[0]) handlePointer(e.touches[0].clientX, e.touches[0].clientY);
          }}
          onTouchEnd={() => setIsDragging(false)}
        />
        <div className="absolute bottom-2 left-2 text-[10px] font-mono text-slate-400 bg-slate-900/80 px-2 py-1 rounded backdrop-blur border border-slate-800 pointer-events-none flex items-center gap-1.5">
          <Move className="w-3 h-3 text-cyan-400" />
          <span>{isId ? 'Klik & geser titik P pada bidang' : 'Click & drag point P on grid'}</span>
        </div>
      </div>

      {/* Numerical Telemetry Readouts */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-mono text-xs">
        <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
          <span className="text-[10px] text-slate-500 block">X Coordinate</span>
          <span className="text-base font-bold text-cyan-600 dark:text-cyan-400">
            {point.x >= 0 ? `+${point.x.toFixed(2)}` : point.x.toFixed(2)} m
          </span>
        </div>
        <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
          <span className="text-[10px] text-slate-500 block">Y Coordinate</span>
          <span className="text-base font-bold text-cyan-600 dark:text-cyan-400">
            {point.y >= 0 ? `+${point.y.toFixed(2)}` : point.y.toFixed(2)} m
          </span>
        </div>
        <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
          <span className="text-[10px] text-slate-500 block">Distance r (Norm)</span>
          <span className="text-base font-bold text-emerald-600 dark:text-emerald-400">
            {r.toFixed(2)} m
          </span>
        </div>
        <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
          <span className="text-[10px] text-slate-500 block">Angle theta (θ)</span>
          <span className="text-base font-bold text-indigo-600 dark:text-indigo-400">
            {thetaDeg.toFixed(1)}° ({thetaRad.toFixed(2)} rad)
          </span>
        </div>
      </div>
    </div>
  );
}

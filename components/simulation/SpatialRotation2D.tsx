'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { RotateCw, RotateCcw, Compass, Sparkles } from 'lucide-react';

export function SpatialRotation2D() {
  const { locale } = useLanguage();
  const isId = locale === 'id';

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [thetaDeg, setThetaDeg] = useState(45);
  const [point, setPoint] = useState({ x: 120, y: 50 });
  const [isDragging, setIsDragging] = useState(false);

  const thetaRad = (thetaDeg * Math.PI) / 180;
  const cosT = Math.cos(thetaRad);
  const sinT = Math.sin(thetaRad);

  // Matrix multiplication: [x', y']^T = R(theta) * [x, y]^T
  const rotatedX = point.x * cosT - point.y * sinT;
  const rotatedY = point.x * sinT + point.y * cosT;

  // Render 60 FPS Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const originX = width / 2;
    const originY = height / 2;

    // Background
    ctx.fillStyle = '#070a13';
    ctx.fillRect(0, 0, width, height);

    // Technical grid
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

    // World Axes (X: Red, Y: Green)
    ctx.strokeStyle = 'rgba(239, 68, 68, 0.5)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(originX - 160, originY);
    ctx.lineTo(originX + 160, originY);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(16, 185, 129, 0.5)';
    ctx.beginPath();
    ctx.moveTo(originX, originY - 140);
    ctx.lineTo(originX, originY + 140);
    ctx.stroke();

    // Rotated Frame Axes (X': Amber, Y': Purple)
    const axisLen = 130;
    const rotAxisX = { x: originX + axisLen * cosT, y: originY - axisLen * sinT };
    const rotAxisY = { x: originX - axisLen * sinT, y: originY - axisLen * cosT };

    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(originX, originY);
    ctx.lineTo(rotAxisX.x, rotAxisX.y);
    ctx.stroke();

    ctx.strokeStyle = '#a855f7';
    ctx.beginPath();
    ctx.moveTo(originX, originY);
    ctx.lineTo(rotAxisY.x, rotAxisY.y);
    ctx.stroke();

    // Rotation Arc
    ctx.strokeStyle = 'rgba(6, 182, 212, 0.6)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.arc(originX, originY, 45, 0, -thetaRad, thetaRad < 0);
    ctx.stroke();
    ctx.setLineDash([]);

    // Vector to Original Point (P)
    const origCanvasX = originX + point.x;
    const origCanvasY = originY - point.y;

    ctx.strokeStyle = 'rgba(148, 163, 184, 0.6)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(originX, originY);
    ctx.lineTo(origCanvasX, origCanvasY);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = '#94a3b8';
    ctx.beginPath();
    ctx.arc(origCanvasX, origCanvasY, 6, 0, Math.PI * 2);
    ctx.fill();

    // Vector to Rotated Point (P')
    const rotCanvasX = originX + rotatedX;
    const rotCanvasY = originY - rotatedY;

    ctx.strokeStyle = '#22d3ee';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(originX, originY);
    ctx.lineTo(rotCanvasX, rotCanvasY);
    ctx.stroke();

    ctx.fillStyle = '#22d3ee';
    ctx.beginPath();
    ctx.arc(rotCanvasX, rotCanvasY, 7, 0, Math.PI * 2);
    ctx.fill();

    // Labels
    ctx.fillStyle = '#f8fafc';
    ctx.font = '10px JetBrains Mono';
    ctx.fillText('P (Original)', origCanvasX + 8, origCanvasY - 6);
    ctx.fillStyle = '#22d3ee';
    ctx.font = 'bold 11px JetBrains Mono';
    ctx.fillText("P' (Rotated)", rotCanvasX + 8, rotCanvasY - 6);
  }, [cosT, sinT, thetaRad, point, rotatedX, rotatedY]);

  // Canvas interaction
  const handleInteraction = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * canvas.width;
    const y = ((clientY - rect.top) / rect.height) * canvas.height;

    const originX = canvas.width / 2;
    const originY = canvas.height / 2;

    setPoint({
      x: Math.round(x - originX),
      y: Math.round(-(y - originY)),
    });
  };

  return (
    <div className="p-6 rounded-3xl glass-panel border border-slate-200 dark:border-slate-800 space-y-4 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-slate-200 dark:border-slate-800/80">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-500">
            <RotateCw className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 font-mono">
              {isId ? 'Laboratorium Rotasi Spasial 2D & Matriks SO(2)' : '2D Spatial Rotation & SO(2) Matrix Laboratory'}
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-sans">
              {isId
                ? 'Tarik titik P atau ubah sudut θ untuk mengamati perkalian matriks rotasi R(θ) secara real-time.'
                : 'Drag point P or adjust angle θ to watch the rotation matrix transformation R(θ) in real-time.'}
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setThetaDeg(45);
            setPoint({ x: 120, y: 50 });
          }}
          className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-mono bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-400 hover:text-slate-200"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Main Canvas View */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-800/80 bg-slate-950 flex justify-center">
        <canvas
          ref={canvasRef}
          width={600}
          height={320}
          className="w-full max-w-2xl h-auto cursor-crosshair touch-none"
          onMouseDown={(e) => {
            setIsDragging(true);
            handleInteraction(e.clientX, e.clientY);
          }}
          onMouseMove={(e) => {
            if (isDragging) handleInteraction(e.clientX, e.clientY);
          }}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onTouchStart={(e) => {
            setIsDragging(true);
            handleInteraction(e.touches[0].clientX, e.touches[0].clientY);
          }}
          onTouchMove={(e) => {
            if (isDragging) handleInteraction(e.touches[0].clientX, e.touches[0].clientY);
          }}
          onTouchEnd={() => setIsDragging(false)}
        />
      </div>

      {/* Matrix Transformation HUD Display */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
        <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-500 block uppercase tracking-wider">{isId ? 'Persamaan Matriks Rotasi R(θ)' : 'Rotation Matrix R(θ)'}</span>
          <div className="flex items-center gap-3 pt-1 text-cyan-400 font-bold">
            <div className="text-xl font-light text-slate-500">[</div>
            <div className="space-y-0.5">
              <div className="flex gap-4">
                <span>{cosT.toFixed(3)}</span>
                <span>{(-sinT).toFixed(3)}</span>
              </div>
              <div className="flex gap-4">
                <span>{sinT.toFixed(3)}</span>
                <span>{cosT.toFixed(3)}</span>
              </div>
            </div>
            <div className="text-xl font-light text-slate-500">]</div>
            <span className="text-slate-400 font-normal">×</span>
            <div className="text-xl font-light text-slate-500">[</div>
            <div className="space-y-0.5 text-slate-200">
              <div>{point.x}</div>
              <div>{point.y}</div>
            </div>
            <div className="text-xl font-light text-slate-500">]</div>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-500 block uppercase tracking-wider">{isId ? "Hasil Koordinat Terotasi P'" : "Rotated Coordinates P'"}</span>
          <div className="flex items-center gap-4 pt-1">
            <div>
              <span className="text-[10px] text-slate-500 block">x&apos;</span>
              <strong className="text-cyan-400 font-bold text-base">{rotatedX.toFixed(2)}</strong>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block">y&apos;</span>
              <strong className="text-cyan-400 font-bold text-base">{rotatedY.toFixed(2)}</strong>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block">{isId ? 'Magnitudo ||P||' : 'Norm ||P||'}</span>
              <strong className="text-emerald-400 font-bold text-base">{Math.hypot(point.x, point.y).toFixed(2)}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Slider */}
      <div className="space-y-1.5 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs font-mono">
        <div className="flex justify-between">
          <span className="text-slate-500">{isId ? 'Sudut Rotasi (θ):' : 'Rotation Angle (θ):'}</span>
          <strong className="text-cyan-400">{thetaDeg}° ({thetaRad.toFixed(2)} rad)</strong>
        </div>
        <input
          type="range"
          min="-180"
          max="180"
          step="1"
          value={thetaDeg}
          onChange={(e) => setThetaDeg(parseInt(e.target.value))}
          className="w-full accent-cyan-500"
        />
      </div>
    </div>
  );
}

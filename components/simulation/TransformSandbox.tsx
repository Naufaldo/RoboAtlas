'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Compass, RotateCw, Sliders, Sparkles, Layers, Move } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useTheme } from '@/lib/theme/ThemeContext';

export function TransformSandbox() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [tx, setTx] = useState(240);
  const [ty, setTy] = useState(150);
  const [thetaDeg, setThetaDeg] = useState(35);
  const [pxLocal, setPxLocal] = useState(45);
  const [pyLocal, setPyLocal] = useState(30);
  const { theme } = useTheme();

  const thetaRad = (thetaDeg * Math.PI) / 180;
  const cosT = Math.cos(thetaRad);
  const sinT = Math.sin(thetaRad);

  // Global point p_W = T_R^W * p_R
  const pxWorld = tx + pxLocal * cosT - pyLocal * sinT;
  const pyWorld = ty + pxLocal * sinT + pyLocal * cosT;

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

    // 1. World Coordinate Frame {W} at (40, 40)
    const wx0 = 40, wy0 = 40;
    // World X_w
    ctx.beginPath();
    ctx.moveTo(wx0, wy0);
    ctx.lineTo(wx0 + 60, wy0);
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2.5;
    ctx.stroke();
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 10px JetBrains Mono, monospace';
    ctx.fillText('X_w', wx0 + 65, wy0 + 3);

    // World Y_w
    ctx.beginPath();
    ctx.moveTo(wx0, wy0);
    ctx.lineTo(wx0, wy0 + 60);
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2.5;
    ctx.stroke();
    ctx.fillText('Y_w', wx0 - 5, wy0 + 72);

    ctx.beginPath();
    ctx.arc(wx0, wy0, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#38bdf8';
    ctx.fill();
    ctx.fillText('{W}', wx0 - 20, wy0 - 8);

    // 2. Translation Vector t from {W} to {R}
    ctx.beginPath();
    ctx.moveTo(wx0, wy0);
    ctx.lineTo(tx, ty);
    ctx.strokeStyle = isLight ? 'rgba(100, 116, 139, 0.4)' : 'rgba(148, 163, 184, 0.35)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);
    ctx.stroke();
    ctx.setLineDash([]);

    // 3. Robot Coordinate Frame {R} at (tx, ty)
    ctx.save();
    ctx.translate(tx, ty);
    ctx.rotate(thetaRad);

    // Robot Frame X_r
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(65, 0);
    ctx.strokeStyle = '#00f2fe';
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.fillStyle = '#00f2fe';
    ctx.fillText('X_r', 70, 4);

    // Robot Frame Y_r
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -65);
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.fillStyle = '#10b981';
    ctx.fillText('Y_r', -6, -72);

    // Robot Chassis Box
    ctx.fillStyle = isLight ? 'rgba(6, 182, 212, 0.15)' : 'rgba(6, 182, 212, 0.1)';
    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.roundRect(-22, -18, 44, 36, 6);
    ctx.fill();
    ctx.stroke();

    // Local Point P in Robot Frame
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(pxLocal, -pyLocal);
    ctx.strokeStyle = 'rgba(245, 158, 11, 0.5)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([3, 3]);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.beginPath();
    ctx.arc(pxLocal, -pyLocal, 5, 0, Math.PI * 2);
    ctx.fillStyle = '#f59e0b';
    ctx.fill();

    ctx.restore();

    // Point P label in World Frame
    ctx.fillStyle = '#f59e0b';
    ctx.font = 'bold 11px JetBrains Mono, monospace';
    ctx.fillText(`P (${pxWorld.toFixed(0)}, ${pyWorld.toFixed(0)})_w`, pxWorld + 8, pyWorld - 8);

    // Origin of {R}
    ctx.beginPath();
    ctx.arc(tx, ty, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#00f2fe';
    ctx.fill();
    ctx.fillText(`{R} (${tx}, ${ty})`, tx - 25, ty + 24);
  }, [tx, ty, thetaDeg, thetaRad, pxLocal, pyLocal, pxWorld, pyWorld, theme]);

  return (
    <div className="rounded-2xl glass-panel border border-slate-200 dark:border-slate-800/90 overflow-hidden shadow-2xl space-y-0">
      {/* Header */}
      <div className="px-4 py-3 bg-slate-100/90 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800/80 flex items-center justify-between flex-wrap gap-2 text-xs font-mono text-slate-800 dark:text-slate-200">
        <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-bold">
          <Compass className="w-4 h-4" />
          <span>SE(2) Homogeneous Transformation Matrix Inspector</span>
        </div>
        <div className="text-[11px] text-slate-500 dark:text-slate-400">
          p^W = T_R^W · p^R
        </div>
      </div>

      {/* Main Interactive Canvas */}
      <div className="relative aspect-[16/9] w-full max-h-[300px] bg-[#f1f5f9] dark:bg-[#050811]">
        <canvas ref={canvasRef} width={520} height={300} className="w-full h-full block" />
      </div>

      {/* Homogeneous Transformation Matrix Display & Sliders */}
      <div className="p-4 bg-slate-50 dark:bg-slate-900/90 border-t border-slate-200 dark:border-slate-800 space-y-4 text-xs font-mono">
        {/* Live Matrix Rendering */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          <div className="md:col-span-6 bg-white dark:bg-slate-950 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-inner">
            <span className="text-[10px] uppercase font-bold text-cyan-600 dark:text-cyan-400 block mb-1.5">
              Live Homogeneous Transformation Matrix T_R^W:
            </span>
            <div className="grid grid-cols-3 gap-2 text-center text-xs font-semibold py-1 bg-slate-50 dark:bg-slate-900/60 rounded-lg p-2 border border-slate-200 dark:border-slate-800">
              <span className="text-cyan-600 dark:text-cyan-300">{cosT.toFixed(3)}</span>
              <span className="text-cyan-600 dark:text-cyan-300">{(-sinT).toFixed(3)}</span>
              <span className="text-emerald-600 dark:text-emerald-400">{tx}</span>
              <span className="text-cyan-600 dark:text-cyan-300">{sinT.toFixed(3)}</span>
              <span className="text-cyan-600 dark:text-cyan-300">{cosT.toFixed(3)}</span>
              <span className="text-emerald-600 dark:text-emerald-400">{ty}</span>
              <span className="text-slate-400">0</span>
              <span className="text-slate-400">0</span>
              <span className="text-slate-400">1</span>
            </div>
          </div>

          <div className="md:col-span-6 bg-white dark:bg-slate-950 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-inner space-y-1 text-[11px]">
            <span className="text-[10px] uppercase font-bold text-amber-600 dark:text-amber-400 block mb-1">
              Point Coordinate Transformation:
            </span>
            <div className="flex justify-between text-slate-600 dark:text-slate-300">
              <span>Local in Frame &#123;R&#125;:</span>
              <strong className="text-amber-500">[{pxLocal}, {pyLocal}, 1]^T</strong>
            </div>
            <div className="flex justify-between text-slate-600 dark:text-slate-300">
              <span>Global in World &#123;W&#125;:</span>
              <strong className="text-emerald-600 dark:text-emerald-400">
                [{pxWorld.toFixed(1)}, {pyWorld.toFixed(1)}, 1]^T
              </strong>
            </div>
          </div>
        </div>

        {/* Sliders */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-white dark:bg-slate-950/60 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <div className="flex justify-between text-[11px] text-slate-600 dark:text-slate-400">
              <span>Translation X (t_x):</span>
              <span className="text-cyan-600 dark:text-cyan-400 font-bold">{tx} px</span>
            </div>
            <input
              type="range"
              min={100}
              max={380}
              value={tx}
              onChange={(e) => setTx(parseInt(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none"
            />
          </div>

          <div className="bg-white dark:bg-slate-950/60 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <div className="flex justify-between text-[11px] text-slate-600 dark:text-slate-400">
              <span>Translation Y (t_y):</span>
              <span className="text-cyan-600 dark:text-cyan-400 font-bold">{ty} px</span>
            </div>
            <input
              type="range"
              min={70}
              max={230}
              value={ty}
              onChange={(e) => setTy(parseInt(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none"
            />
          </div>

          <div className="bg-white dark:bg-slate-950/60 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <div className="flex justify-between text-[11px] text-slate-600 dark:text-slate-400">
              <span>Rotation Angle (θ):</span>
              <span className="text-amber-600 dark:text-amber-400 font-bold">{thetaDeg}°</span>
            </div>
            <input
              type="range"
              min={-180}
              max={180}
              value={thetaDeg}
              onChange={(e) => setThetaDeg(parseInt(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

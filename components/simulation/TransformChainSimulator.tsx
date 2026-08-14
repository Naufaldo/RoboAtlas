'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Layers, ArrowRightLeft, RotateCcw, Sparkles } from 'lucide-react';

export function TransformChainSimulator() {
  const { locale } = useLanguage();
  const isId = locale === 'id';

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Transform 1: Translation (dx, dy)
  const [t1_dx, setT1_dx] = useState(100);
  const [t1_dy, setT1_dy] = useState(40);

  // Transform 2: Rotation (theta in degrees)
  const [t2_theta, setT2_theta] = useState(60);

  // Mode: Order 1 (T1 then T2 -> Translate then Rotate) vs Order 2 (T2 then T1 -> Rotate then Translate)
  const [showBoth, setShowBoth] = useState(true);

  // Calculate Order A: Translate then Rotate (T_rot * T_trans)
  const thetaRad = (t2_theta * Math.PI) / 180;
  const cosT = Math.cos(thetaRad);
  const sinT = Math.sin(thetaRad);

  // Case A: Translate by (dx, dy) in world, then rotate locally by theta
  // Resulting pose: pos = (dx, dy), orientation = theta
  const poseA = { x: t1_dx, y: t1_dy, theta: thetaRad };

  // Case B: Rotate by theta first, then translate by (dx, dy) in rotated frame
  // Resulting pos in world = R(theta) * (dx, dy) = (dx*cos - dy*sin, dx*sin + dy*cos)
  const poseB = {
    x: t1_dx * cosT - t1_dy * sinT,
    y: t1_dx * sinT + t1_dy * cosT,
    theta: thetaRad,
  };

  // Render Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const originX = width / 2 - 40;
    const originY = height / 2 + 40;

    ctx.fillStyle = '#070a13';
    ctx.fillRect(0, 0, width, height);

    // Grid
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

    // World Frame {W} at Origin
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(originX, originY);
    ctx.lineTo(originX + 50, originY);
    ctx.stroke();

    ctx.strokeStyle = '#10b981';
    ctx.beginPath();
    ctx.moveTo(originX, originY);
    ctx.lineTo(originX, originY - 50);
    ctx.stroke();

    ctx.fillStyle = '#f8fafc';
    ctx.font = '10px JetBrains Mono';
    ctx.fillText('{W} Origin', originX - 35, originY + 18);

    // Draw Function for a Coordinate Frame
    const drawFrame = (x: number, y: number, theta: number, colorX: string, colorY: string, label: string) => {
      const cx = originX + x;
      const cy = originY - y;
      const len = 45;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(-theta);

      // X axis
      ctx.strokeStyle = colorX;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(len, 0);
      ctx.stroke();

      // Y axis
      ctx.strokeStyle = colorY;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, -len);
      ctx.stroke();

      // Center
      ctx.fillStyle = colorX;
      ctx.beginPath();
      ctx.arc(0, 0, 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      ctx.fillStyle = colorX;
      ctx.font = 'bold 11px JetBrains Mono';
      ctx.fillText(label, cx + 8, cy - 8);
    };

    // Trace from origin to Frame A (Cyan)
    ctx.strokeStyle = 'rgba(6, 182, 212, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(originX, originY);
    ctx.lineTo(originX + poseA.x, originY - poseA.y);
    ctx.stroke();

    // Trace from origin to Frame B (Amber)
    ctx.strokeStyle = 'rgba(245, 158, 11, 0.4)';
    ctx.beginPath();
    ctx.moveTo(originX, originY);
    ctx.lineTo(originX + poseB.x, originY - poseB.y);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw Frame A: Translate then Rotate
    drawFrame(poseA.x, poseA.y, poseA.theta, '#22d3ee', '#06b6d4', 'A: Trans -> Rot');

    // Draw Frame B: Rotate then Translate
    if (showBoth) {
      drawFrame(poseB.x, poseB.y, poseB.theta, '#f59e0b', '#d97706', 'B: Rot -> Trans');
    }
  }, [poseA, poseB, showBoth]);

  return (
    <div className="p-6 rounded-3xl glass-panel border border-slate-200 dark:border-slate-800 space-y-4 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-slate-200 dark:border-slate-800/80">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-500">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 font-mono">
              {isId ? 'Laboratorium Komposisi Transformasi & Sifat Non-Komutatif' : 'Transform Composition & Non-Commutativity Lab'}
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-sans">
              {isId
                ? 'Bandingkan posisi akhir antara (Translasi lalu Rotasi) vs (Rotasi lalu Translasi) untuk melihat mengapa T₁T₂ ≠ T₂T₁.'
                : 'Compare final pose between (Translate then Rotate) vs (Rotate then Translate) to see why T1 * T2 != T2 * T1.'}
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setT1_dx(100);
            setT1_dy(40);
            setT2_theta(60);
          }}
          className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-mono bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-400 hover:text-slate-200"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Main Canvas View */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-800/80 bg-slate-950 flex justify-center">
        <canvas ref={canvasRef} width={600} height={320} className="w-full max-w-2xl h-auto" />
      </div>

      {/* Comparison HUD Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
        <div className="p-3.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 space-y-1">
          <span className="text-[10px] text-cyan-400 font-bold block uppercase tracking-wider">
            {isId ? 'Urutan A: Translasi Lalu Rotasi' : 'Order A: Translate -> Rotate'}
          </span>
          <div className="text-slate-200">
            Pose: <strong className="text-cyan-400">({poseA.x.toFixed(1)}, {poseA.y.toFixed(1)})</strong>, θ = <strong className="text-cyan-400">{t2_theta}°</strong>
          </div>
          <p className="text-[11px] text-slate-400">Translasi terjadi pada kerangka acuan dunia tetap.</p>
        </div>

        <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-1">
          <span className="text-[10px] text-amber-400 font-bold block uppercase tracking-wider">
            {isId ? 'Urutan B: Rotasi Lalu Translasi' : 'Order B: Rotate -> Translate'}
          </span>
          <div className="text-slate-200">
            Pose: <strong className="text-amber-400">({poseB.x.toFixed(1)}, {poseB.y.toFixed(1)})</strong>, θ = <strong className="text-amber-400">{t2_theta}°</strong>
          </div>
          <p className="text-[11px] text-slate-400">Translasi terotasi mengikuti orientasi lokal yang baru.</p>
        </div>
      </div>

      {/* Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
        <div className="space-y-1 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
          <div className="flex justify-between">
            <span className="text-slate-500">{isId ? 'Translasi (dx, dy):' : 'Translation (dx, dy):'}</span>
            <strong className="text-cyan-400">({t1_dx}, {t1_dy}) px</strong>
          </div>
          <input
            type="range"
            min="20"
            max="160"
            step="5"
            value={t1_dx}
            onChange={(e) => setT1_dx(parseInt(e.target.value))}
            className="w-full accent-cyan-500"
          />
        </div>

        <div className="space-y-1 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
          <div className="flex justify-between">
            <span className="text-slate-500">{isId ? 'Sudut Rotasi (θ):' : 'Rotation Angle (θ):'}</span>
            <strong className="text-amber-400">{t2_theta}°</strong>
          </div>
          <input
            type="range"
            min="-180"
            max="180"
            step="5"
            value={t2_theta}
            onChange={(e) => setT2_theta(parseInt(e.target.value))}
            className="w-full accent-amber-500"
          />
        </div>
      </div>
    </div>
  );
}

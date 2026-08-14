'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Play, Pause, RotateCcw, Activity, Layers } from 'lucide-react';

export function NumericalDiscretizationSimulator() {
  const { locale } = useLanguage();
  const isId = locale === 'id';

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Time step delta t
  const [dtChoice, setDtChoice] = useState<0.01 | 0.05 | 0.15 | 0.28>(0.05);
  const [method, setMethod] = useState<'euler' | 'midpoint' | 'rk4'>('euler');
  const [isPlaying, setIsPlaying] = useState(true);

  // Harmonic oscillator: d^2 x / dt^2 = -omega^2 * x (Analytical: x(t) = cos(omega*t))
  const omega = 2.0;

  // Numerical trajectory vs Analytical True trajectory
  const [numHistory, setNumHistory] = useState<{ t: number; x: number }[]>([
    { t: 0, x: 1.0 },
  ]);
  const [trueHistory, setTrueHistory] = useState<{ t: number; x: number }[]>([
    { t: 0, x: 1.0 },
  ]);
  const [simState, setSimState] = useState({ t: 0, x: 1.0, v: 0 });

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setSimState((prev) => {
        const dt = dtChoice;
        const nextT = prev.t + dt;

        let nextX = prev.x;
        let nextV = prev.v;

        const f = (x: number, v: number) => ({ dx: v, dv: -omega * omega * x });

        if (method === 'euler') {
          // Forward Euler: x[k+1] = x[k] + dt * v[k], v[k+1] = v[k] - dt * omega^2 * x[k]
          const deriv = f(prev.x, prev.v);
          nextX = prev.x + dt * deriv.dx;
          nextV = prev.v + dt * deriv.dv;
        } else if (method === 'midpoint') {
          // Midpoint / Heun
          const k1 = f(prev.x, prev.v);
          const midX = prev.x + 0.5 * dt * k1.dx;
          const midV = prev.v + 0.5 * dt * k1.dv;
          const k2 = f(midX, midV);
          nextX = prev.x + dt * k2.dx;
          nextV = prev.v + dt * k2.dv;
        } else {
          // RK4
          const k1 = f(prev.x, prev.v);
          const k2 = f(prev.x + 0.5 * dt * k1.dx, prev.v + 0.5 * dt * k1.dv);
          const k3 = f(prev.x + 0.5 * dt * k2.dx, prev.v + 0.5 * dt * k2.dv);
          const k4 = f(prev.x + dt * k3.dx, prev.v + dt * k3.dv);

          nextX = prev.x + (dt / 6) * (k1.dx + 2 * k2.dx + 2 * k3.dx + k4.dx);
          nextV = prev.v + (dt / 6) * (k1.dv + 2 * k2.dv + 2 * k3.dv + k4.dv);
        }

        const analyticalX = Math.cos(omega * nextT);

        setNumHistory((h) => {
          const next = [...h, { t: nextT, x: nextX }];
          if (next.length > 200) next.shift();
          return next;
        });

        setTrueHistory((h) => {
          const next = [...h, { t: nextT, x: analyticalX }];
          if (next.length > 200) next.shift();
          return next;
        });

        return { t: nextT, x: nextX, v: nextV };
      });
    }, 40);

    return () => clearInterval(interval);
  }, [isPlaying, dtChoice, method]);

  // Current Error
  const trueX = Math.cos(omega * simState.t);
  const currentError = Math.abs(simState.x - trueX);

  // Render Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerY = height / 2;

    ctx.fillStyle = '#070a13';
    ctx.fillRect(0, 0, width, height);

    // Technical Grid
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

    // Zero Axis
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.3)';
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(width, centerY);
    ctx.stroke();

    const scaleY = 70;

    // Draw True Analytical Trajectory (Dashed Cyan)
    if (trueHistory.length > 1) {
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      trueHistory.forEach((pt, idx) => {
        const px = (idx / trueHistory.length) * width;
        const py = centerY - pt.x * scaleY;
        if (idx === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      });
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Draw Numerical Integration Result (Solid Amber or Red if diverging)
    if (numHistory.length > 1) {
      ctx.strokeStyle = currentError > 0.4 ? '#ef4444' : '#f59e0b';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      numHistory.forEach((pt, idx) => {
        const px = (idx / numHistory.length) * width;
        const py = centerY - pt.x * scaleY;
        if (idx === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      });
      ctx.stroke();
    }

    // Legend
    ctx.fillStyle = '#06b6d4';
    ctx.font = '11px JetBrains Mono';
    ctx.fillText('--- Analytical True (Exact)', 20, 25);

    ctx.fillStyle = currentError > 0.4 ? '#ef4444' : '#f59e0b';
    ctx.fillText(`── Numerical Integration (${method.toUpperCase()})`, 20, 42);
  }, [numHistory, trueHistory, currentError, method]);

  return (
    <div className="p-6 rounded-3xl glass-panel border border-slate-200 dark:border-slate-800 space-y-4 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-slate-200 dark:border-slate-800/80">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-500">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 font-mono">
              {isId ? 'Laboratorium Diskritisasi Waktu: Euler vs RK4' : 'Discrete-Time Numerical Integration Lab'}
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-sans">
              {isId
                ? 'Pilih metode integrasi dan perbesar langkah waktu Δt untuk melihat akumulasi galat dan divergensi energi numerik.'
                : 'Select integration solver and increase timestep Δt to watch numerical energy drift and instability explode.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono bg-cyan-500/15 border border-cyan-500/40 text-cyan-400 font-bold"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isPlaying ? 'Pause' : 'Play'}</span>
          </button>

          <button
            onClick={() => {
              setSimState({ t: 0, x: 1.0, v: 0 });
              setNumHistory([{ t: 0, x: 1.0 }]);
              setTrueHistory([{ t: 0, x: 1.0 }]);
            }}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-mono bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-400 hover:text-slate-200"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Main Canvas View */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-800/80 bg-slate-950 flex justify-center">
        <canvas ref={canvasRef} width={600} height={260} className="w-full max-w-2xl h-auto" />
      </div>

      {/* Numerical Error Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
        <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <span className="text-[10px] text-cyan-400 block uppercase font-bold">
            {isId ? 'Galat Mutlak (|x_num - x_true|)' : 'Absolute Error (|x_num - x_true|)'}
          </span>
          <strong className={`text-xl font-bold ${currentError > 0.4 ? 'text-red-400' : 'text-emerald-400'}`}>
            {currentError.toFixed(4)}
          </strong>
          <span className="text-[10px] text-slate-500 block">
            {currentError > 0.4 ? (isId ? '⚠️ Drift energi numerik' : '⚠️ Energy divergence') : (isId ? '✓ Presisi tinggi' : '✓ Highly accurate')}
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <span className="text-[10px] text-amber-400 block uppercase font-bold">
            {isId ? 'Orde Konvergensi Matematis' : 'Mathematical Order'}
          </span>
          <strong className="text-xl font-bold text-amber-400">
            {method === 'euler' ? 'O(Δt) [Orde 1]' : method === 'midpoint' ? 'O(Δt²) [Orde 2]' : 'O(Δt⁴) [Orde 4]'}
          </strong>
          <span className="text-[10px] text-slate-500 block">Pemotongan Deret Taylor</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <span className="text-[10px] text-purple-400 block uppercase font-bold">
            {isId ? 'Langkah Waktu (Timestep Δt)' : 'Timestep (Δt)'}
          </span>
          <strong className="text-xl font-bold text-purple-400">{dtChoice} s</strong>
          <span className="text-[10px] text-slate-500 block">Frekuensi Integrasi: {(1 / dtChoice).toFixed(0)} Hz</span>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex flex-wrap gap-4 pt-2">
        <div className="space-y-1 flex-1 min-w-[200px]">
          <span className="text-[11px] text-slate-400 font-mono block">
            {isId ? 'Metode Integrasi Solver:' : 'Integration Solver:'}
          </span>
          <div className="flex gap-2">
            {(['euler', 'midpoint', 'rk4'] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMethod(m)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all border ${
                  method === m
                    ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md'
                    : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-slate-500'
                }`}
              >
                {m.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1 flex-1 min-w-[200px]">
          <span className="text-[11px] text-slate-400 font-mono block">
            {isId ? 'Pilihan Timestep Δt:' : 'Timestep Selection (Δt):'}
          </span>
          <div className="flex gap-2">
            {([0.01, 0.05, 0.15, 0.28] as const).map((dt) => (
              <button
                key={dt}
                onClick={() => setDtChoice(dt)}
                className={`px-2.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all border ${
                  dtChoice === dt
                    ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                    : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-slate-500'
                }`}
              >
                {dt}s
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Sliders, RotateCcw, Activity, CheckCircle2 } from 'lucide-react';

export function PidTuningSimulator() {
  const { locale } = useLanguage();
  const isId = locale === 'id';

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [kp, setKp] = useState(3.5);
  const [ki, setKi] = useState(0.8);
  const [kd, setKd] = useState(1.2);

  // Compute numerical step response simulation
  const simulationData = useMemo(() => {
    const dt = 0.02;
    const totalTime = 8.0;
    const steps = Math.floor(totalTime / dt);

    const setpoint = 1.0;
    let pos = 0.0;
    let vel = 0.0;
    let integralError = 0.0;
    let prevError = setpoint - pos;

    const mass = 1.0;
    const damping = 0.5;

    const times: number[] = [];
    const positions: number[] = [];
    const controls: number[] = [];

    for (let i = 0; i <= steps; i++) {
      const t = i * dt;
      const error = setpoint - pos;
      integralError += error * dt;
      const derivativeError = (error - prevError) / dt;
      prevError = error;

      // PID Control law
      let u = kp * error + ki * integralError + kd * derivativeError;
      // Clamp control effort
      u = Math.max(-10, Math.min(10, u));

      // Plant dynamics: m * a + b * v = u
      const accel = (u - damping * vel) / mass;
      vel += accel * dt;
      pos += vel * dt;

      times.push(t);
      positions.push(pos);
      controls.push(u);
    }

    // Compute key control metrics
    const maxPos = Math.max(...positions);
    const overshootPercent = Math.max(0, ((maxPos - setpoint) / setpoint) * 100);
    const finalPos = positions[positions.length - 1];
    const steadyStateError = Math.abs(setpoint - finalPos);

    return {
      times,
      positions,
      controls,
      overshootPercent,
      steadyStateError,
    };
  }, [kp, ki, kd]);

  // Render 60 FPS Step Response Graph
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.fillStyle = '#070a13';
    ctx.fillRect(0, 0, width, height);

    // Padding
    const padL = 40;
    const padR = 20;
    const padT = 30;
    const padB = 40;

    const graphW = width - padL - padR;
    const graphH = height - padT - padB;

    // Grid lines
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.1)';
    ctx.lineWidth = 1;

    for (let t = 0; t <= 8; t += 1) {
      const x = padL + (t / 8) * graphW;
      ctx.beginPath();
      ctx.moveTo(x, padT);
      ctx.lineTo(x, height - padB);
      ctx.stroke();

      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px JetBrains Mono';
      ctx.fillText(`${t}s`, x - 8, height - padB + 16);
    }

    // Setpoint Reference Line (y = 1.0)
    const setpointY = height - padB - (1.0 / 1.6) * graphH;
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(padL, setpointY);
    ctx.lineTo(width - padR, setpointY);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = '#f59e0b';
    ctx.font = 'bold 10px JetBrains Mono';
    ctx.fillText('Target (r=1.0)', padL + 6, setpointY - 6);

    // Response Trajectory Line
    ctx.strokeStyle = '#22d3ee';
    ctx.lineWidth = 2.5;
    ctx.beginPath();

    simulationData.positions.forEach((pos, idx) => {
      const t = simulationData.times[idx];
      const x = padL + (t / 8) * graphW;
      const y = height - padB - (pos / 1.6) * graphH;

      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
  }, [simulationData]);

  const handleReset = () => {
    setKp(3.5);
    setKi(0.8);
    setKd(1.2);
  };

  return (
    <div className="p-6 rounded-3xl glass-panel border border-slate-200 dark:border-slate-800 space-y-5 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-slate-200 dark:border-slate-800/80">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-500">
            <Sliders className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 font-mono">
              {isId ? 'Simulator Tuning Kendali PID & Respon Transien' : 'PID Feedback Control & Transient Step Response Simulator'}
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-sans">
              {isId
                ? 'Eksplorasi pengaruh penguatan Kp, Ki, Kd terhadap lonjakan (overshoot) dan waktu pemulihan sistem robotik.'
                : 'Interactive PID gain tuning (Kp, Ki, Kd) demonstrating overshoot, damping, and steady-state recovery.'}
            </p>
          </div>
        </div>

        <button
          onClick={handleReset}
          className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-mono bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-cyan-500/40 transition-all"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Canvas */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-800/80 bg-slate-950 flex justify-center">
        <canvas ref={canvasRef} width={600} height={260} className="w-full max-w-2xl h-auto" />
      </div>

      {/* Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-mono">
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
          <span className="text-[10px] text-slate-500 block">{isId ? 'Lonjakan (Overshoot)' : 'Overshoot'}</span>
          <strong className="text-amber-400 font-bold">{simulationData.overshootPercent.toFixed(1)}%</strong>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
          <span className="text-[10px] text-slate-500 block">{isId ? 'Galat Keadaan Tunak' : 'Steady-State Error'}</span>
          <strong className="text-emerald-400 font-bold">{simulationData.steadyStateError.toFixed(4)}</strong>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 col-span-2 sm:col-span-1">
          <span className="text-[10px] text-slate-500 block">{isId ? 'Kondisi Sistem' : 'System Stability'}</span>
          <strong className="text-cyan-400 font-bold">
            {simulationData.overshootPercent > 50 ? (isId ? 'Kurang Teredam (Underdamped)' : 'Underdamped') : (isId ? 'Stabil (Stable)' : 'Stable')}
          </strong>
        </div>
      </div>

      {/* PID Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
        <div className="space-y-1.5 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
          <div className="flex justify-between">
            <span className="text-slate-500">Proportional (Kp):</span>
            <strong className="text-cyan-400">{kp.toFixed(1)}</strong>
          </div>
          <input
            type="range"
            min="0"
            max="10"
            step="0.1"
            value={kp}
            onChange={(e) => setKp(parseFloat(e.target.value))}
            className="w-full accent-cyan-500"
          />
        </div>

        <div className="space-y-1.5 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
          <div className="flex justify-between">
            <span className="text-slate-500">Integral (Ki):</span>
            <strong className="text-emerald-400">{ki.toFixed(2)}</strong>
          </div>
          <input
            type="range"
            min="0"
            max="5"
            step="0.05"
            value={ki}
            onChange={(e) => setKi(parseFloat(e.target.value))}
            className="w-full accent-emerald-500"
          />
        </div>

        <div className="space-y-1.5 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
          <div className="flex justify-between">
            <span className="text-slate-500">Derivative (Kd):</span>
            <strong className="text-purple-400">{kd.toFixed(2)}</strong>
          </div>
          <input
            type="range"
            min="0"
            max="4"
            step="0.05"
            value={kd}
            onChange={(e) => setKd(parseFloat(e.target.value))}
            className="w-full accent-purple-500"
          />
        </div>
      </div>
    </div>
  );
}

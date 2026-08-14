'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Cpu, RotateCcw, Play, Pause, Sliders } from 'lucide-react';

export function StateSpaceSimulator() {
  const { locale } = useLanguage();
  const isId = locale === 'id';

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // System Physical Parameters (Mass-Spring-Damper)
  const [mass, setMass] = useState(1.0); // kg
  const [springK, setSpringK] = useState(4.0); // N/m
  const [dampingC, setDampingC] = useState(0.8); // Ns/m

  // State Feedback Gains u = -K1*x - K2*x_dot
  const [gainK1, setGainK1] = useState(2.0);
  const [gainK2, setGainK2] = useState(1.5);
  const [useFeedback, setUseFeedback] = useState(true);

  const [isPlaying, setIsPlaying] = useState(true);

  // State: x = [position, velocity]
  const [state, setState] = useState({ x: 80, xDot: 0 });
  const [trajectory, setTrajectory] = useState<{ x: number; xDot: number }[]>([]);

  // Simulation Loop (RK4 integration)
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setState((prev) => {
        const dt = 0.03;

        // Dynamics: x_ddot = (u - k*x - c*x_dot) / m
        const getDerivatives = (pos: number, vel: number) => {
          const u = useFeedback ? -(gainK1 * pos + gainK2 * vel) : 0;
          const accel = (u - springK * pos - dampingC * vel) / mass;
          return { dPos: vel, dVel: accel };
        };

        // RK4 Integration
        const k1 = getDerivatives(prev.x, prev.xDot);
        const k2 = getDerivatives(prev.x + 0.5 * dt * k1.dPos, prev.xDot + 0.5 * dt * k1.dVel);
        const k3 = getDerivatives(prev.x + 0.5 * dt * k2.dPos, prev.xDot + 0.5 * dt * k2.dVel);
        const k4 = getDerivatives(prev.x + dt * k3.dPos, prev.xDot + dt * k3.dVel);

        const newPos = prev.x + (dt / 6) * (k1.dPos + 2 * k2.dPos + 2 * k3.dPos + k4.dPos);
        const newVel = prev.xDot + (dt / 6) * (k1.dVel + 2 * k2.dVel + 2 * k3.dVel + k4.dVel);

        setTrajectory((hist) => {
          const next = [...hist, { x: newPos, xDot: newVel }];
          if (next.length > 250) next.shift();
          return next;
        });

        return { x: newPos, xDot: newVel };
      });
    }, 30);

    return () => clearInterval(interval);
  }, [isPlaying, mass, springK, dampingC, gainK1, gainK2, useFeedback]);

  // Render Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.fillStyle = '#070a13';
    ctx.fillRect(0, 0, width, height);

    // Split Canvas: Left = Physical Mass-Spring-Damper, Right = Phase Portrait (x vs x_dot)
    const midX = width / 2;

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

    // Divider
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.2)';
    ctx.beginPath();
    ctx.moveTo(midX, 0);
    ctx.lineTo(midX, height);
    ctx.stroke();

    // 1. LEFT SIDE: Physical System
    const leftOriginY = height / 2;
    const wallX = 30;
    const massX = wallX + 110 + state.x;

    // Wall
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(wallX - 10, leftOriginY - 50, 10, 100);

    // Spring Coils
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(wallX, leftOriginY - 15);
    const coils = 8;
    const springLen = massX - wallX;
    for (let i = 0; i <= coils; i++) {
      const px = wallX + (springLen / coils) * i;
      const py = leftOriginY - 15 + (i % 2 === 0 ? -12 : 12);
      ctx.lineTo(px, py);
    }
    ctx.lineTo(massX, leftOriginY - 15);
    ctx.stroke();

    // Damper Piston
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2;
    ctx.strokeRect(wallX + 15, leftOriginY + 15, 45, 14);
    ctx.beginPath();
    ctx.moveTo(wallX, leftOriginY + 22);
    ctx.lineTo(wallX + 15, leftOriginY + 22);
    ctx.moveTo(wallX + 35, leftOriginY + 22);
    ctx.lineTo(massX, leftOriginY + 22);
    ctx.stroke();

    // Mass Block
    ctx.fillStyle = '#0284c7';
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;
    ctx.fillRect(massX, leftOriginY - 30, 60, 60);
    ctx.strokeRect(massX, leftOriginY - 30, 60, 60);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 11px JetBrains Mono';
    ctx.fillText(`m=${mass}kg`, massX + 8, leftOriginY + 5);

    // 2. RIGHT SIDE: Phase Portrait (x on X-axis, x_dot on Y-axis)
    const phaseCenterX = midX + (width - midX) / 2;
    const phaseCenterY = height / 2;

    // Phase Axes
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.4)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(midX + 20, phaseCenterY);
    ctx.lineTo(width - 20, phaseCenterY);
    ctx.moveTo(phaseCenterX, 20);
    ctx.lineTo(phaseCenterX, height - 20);
    ctx.stroke();

    ctx.fillStyle = 'rgba(148, 163, 184, 0.8)';
    ctx.font = '10px JetBrains Mono';
    ctx.fillText('x (Pos)', width - 45, phaseCenterY - 6);
    ctx.fillText('ẋ (Vel)', phaseCenterX + 6, 25);

    // Phase Trajectory Spiral
    if (trajectory.length > 1) {
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2;
      ctx.beginPath();
      trajectory.forEach((pt, idx) => {
        const px = phaseCenterX + pt.x * 0.8;
        const py = phaseCenterY - pt.xDot * 0.4;
        if (idx === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      });
      ctx.stroke();
    }

    // Current State Dot in Phase Plane
    const currPx = phaseCenterX + state.x * 0.8;
    const currPy = phaseCenterY - state.xDot * 0.4;
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.arc(currPx, currPy, 5, 0, Math.PI * 2);
    ctx.fill();
  }, [state, trajectory, mass]);

  return (
    <div className="p-6 rounded-3xl glass-panel border border-slate-200 dark:border-slate-800 space-y-4 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-slate-200 dark:border-slate-800/80">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-500">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 font-mono">
              {isId ? 'Laboratorium Ruang Status & Umpan Balik Status Penuh' : 'State-Space Dynamics & State-Feedback Lab'}
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-sans">
              {isId
                ? 'Sistem massa-pegas-redaman: amati lintasan spiral pada diagram fase (Phase Portrait) menuju titik kesetimbangan origin (0, 0).'
                : 'Mass-spring-damper dynamics: observe the phase portrait spiral converging to equilibrium origin (0, 0).'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setUseFeedback(!useFeedback)}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all border ${
              useFeedback
                ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md'
                : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-slate-500'
            }`}
          >
            {useFeedback ? (isId ? 'Kontrol: Aktif (u = -Kx)' : 'Control: Active (u = -Kx)') : (isId ? 'Kontrol: Terbuka (u = 0)' : 'Open-Loop (u = 0)')}
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono bg-cyan-500/15 border border-cyan-500/40 text-cyan-400 font-bold"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isPlaying ? 'Pause' : 'Play'}</span>
          </button>

          <button
            onClick={() => {
              setState({ x: 80, xDot: 0 });
              setTrajectory([]);
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
        <canvas ref={canvasRef} width={600} height={280} className="w-full max-w-2xl h-auto" />
      </div>

      {/* State Vector HUD */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
        <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <span className="text-[10px] text-cyan-400 block uppercase font-bold">
            {isId ? 'Status Posisi x₁ (x)' : 'State Position x1 (x)'}
          </span>
          <strong className="text-xl font-bold text-cyan-400">{state.x.toFixed(2)} mm</strong>
          <span className="text-[10px] text-slate-500 block">Deviasi dari posisi rileks (0)</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <span className="text-[10px] text-amber-400 block uppercase font-bold">
            {isId ? 'Status Kecepatan x₂ (ẋ)' : 'State Velocity x2 (ẋ)'}
          </span>
          <strong className="text-xl font-bold text-amber-400">{state.xDot.toFixed(2)} mm/s</strong>
          <span className="text-[10px] text-slate-500 block">Turunan posisi terhadap waktu</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <span className="text-[10px] text-emerald-400 block uppercase font-bold">
            {isId ? 'Matriks Sistem A' : 'System Matrix A'}
          </span>
          <div className="text-[11px] text-emerald-300 font-mono">
            [ 0, 1 ] <br />
            [ -{(springK / mass).toFixed(1)}, -{(dampingC / mass).toFixed(1)} ]
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Activity, Cpu, Sliders, Sparkles } from 'lucide-react';
import { InlineMath } from '@/components/mathematics/MathBlock';

export function NumericalIntegrationSimulator() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isRunning, setIsRunning] = useState(true);
  const [dt, setDt] = useState(0.08); // Integration step size h in seconds
  const [activeMethod, setActiveMethod] = useState<'all' | 'euler' | 'symplectic' | 'rk4'>('all');

  // Pendulum states: [theta, omega]
  const [eulerState, setEulerState] = useState({ theta: 1.2, omega: 0.0 });
  const [symplecticState, setSymplecticState] = useState({ theta: 1.2, omega: 0.0 });
  const [rk4State, setRk4State] = useState({ theta: 1.2, omega: 0.0 });

  // Historical energy logs for plotting
  const [historyEuler, setHistoryEuler] = useState<number[]>([]);
  const [historySymplectic, setHistorySymplectic] = useState<number[]>([]);
  const [historyRk4, setHistoryRk4] = useState<number[]>([]);

  const g = 9.81;
  const L = 1.0;

  // Derivative function f([theta, omega]) = [omega, -(g/L)*sin(theta)]
  const deriv = (theta: number, omega: number) => {
    return { dTheta: omega, dOmega: -(g / L) * Math.sin(theta) };
  };

  const getEnergy = (theta: number, omega: number) => {
    return 0.5 * (L * omega) ** 2 - g * L * Math.cos(theta);
  };

  const handleReset = () => {
    setEulerState({ theta: 1.2, omega: 0.0 });
    setSymplecticState({ theta: 1.2, omega: 0.0 });
    setRk4State({ theta: 1.2, omega: 0.0 });
    setHistoryEuler([]);
    setHistorySymplectic([]);
    setHistoryRk4([]);
  };

  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();

    const render = (time: number) => {
      const elapsed = (time - lastTime) / 1000;
      lastTime = time;

      if (isRunning) {
        // 1. Explicit Euler step
        setEulerState((prev) => {
          const d = deriv(prev.theta, prev.omega);
          const nextTheta = prev.theta + dt * d.dTheta;
          const nextOmega = prev.omega + dt * d.dOmega;
          setHistoryEuler((h) => [...h.slice(-100), getEnergy(nextTheta, nextOmega)]);
          return { theta: Math.max(-10, Math.min(10, nextTheta)), omega: Math.max(-20, Math.min(20, nextOmega)) };
        });

        // 2. Symplectic / Semi-Implicit Euler step
        setSymplecticState((prev) => {
          const dOmega = -(g / L) * Math.sin(prev.theta);
          const nextOmega = prev.omega + dt * dOmega;
          const nextTheta = prev.theta + dt * nextOmega; // uses updated omega
          setHistorySymplectic((h) => [...h.slice(-100), getEnergy(nextTheta, nextOmega)]);
          return { theta: nextTheta, omega: nextOmega };
        });

        // 3. 4th-Order Runge-Kutta (RK4) step
        setRk4State((prev) => {
          const k1 = deriv(prev.theta, prev.omega);
          const k2 = deriv(prev.theta + 0.5 * dt * k1.dTheta, prev.omega + 0.5 * dt * k1.dOmega);
          const k3 = deriv(prev.theta + 0.5 * dt * k2.dTheta, prev.omega + 0.5 * dt * k2.dOmega);
          const k4 = deriv(prev.theta + dt * k3.dTheta, prev.omega + dt * k3.dOmega);

          const nextTheta = prev.theta + (dt / 6) * (k1.dTheta + 2 * k2.dTheta + 2 * k3.dTheta + k4.dTheta);
          const nextOmega = prev.omega + (dt / 6) * (k1.dOmega + 2 * k2.dOmega + 2 * k3.dOmega + k4.dOmega);
          setHistoryRk4((h) => [...h.slice(-100), getEnergy(nextTheta, nextOmega)]);
          return { theta: nextTheta, omega: nextOmega };
        });
      }

      // Draw onto Canvas
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          const width = canvas.width;
          const height = canvas.height;

          ctx.fillStyle = '#030712';
          ctx.fillRect(0, 0, width, height);

          // Split Viewport: Left = Physical Pendulums, Right = Energy vs Time Curve
          const splitX = 300;

          // 1. Draw Physical Pendulums
          const pivotX = 150;
          const pivotY = 120;
          const armPixelLen = 110;

          // Pivot base
          ctx.fillStyle = '#334155';
          ctx.fillRect(pivotX - 30, pivotY - 8, 60, 8);

          // Draw RK4 Pendulum (Emerald - Reference Ground Truth)
          if (activeMethod === 'all' || activeMethod === 'rk4') {
            const rkX = pivotX + armPixelLen * Math.sin(rk4State.theta);
            const rkY = pivotY + armPixelLen * Math.cos(rk4State.theta);
            ctx.strokeStyle = '#10b981';
            ctx.lineWidth = 3.5;
            ctx.beginPath();
            ctx.moveTo(pivotX, pivotY);
            ctx.lineTo(rkX, rkY);
            ctx.stroke();
            ctx.fillStyle = '#10b981';
            ctx.beginPath();
            ctx.arc(rkX, rkY, 10, 0, Math.PI * 2);
            ctx.fill();
          }

          // Draw Symplectic Pendulum (Cyan)
          if (activeMethod === 'all' || activeMethod === 'symplectic') {
            const symX = pivotX + armPixelLen * Math.sin(symplecticState.theta);
            const symY = pivotY + armPixelLen * Math.cos(symplecticState.theta);
            ctx.strokeStyle = '#06b6d4';
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.moveTo(pivotX, pivotY);
            ctx.lineTo(symX, symY);
            ctx.stroke();
            ctx.fillStyle = '#06b6d4';
            ctx.beginPath();
            ctx.arc(symX, symY, 8, 0, Math.PI * 2);
            ctx.fill();
          }

          // Draw Explicit Euler Pendulum (Red/Orange - High Drift)
          if (activeMethod === 'all' || activeMethod === 'euler') {
            const euX = pivotX + armPixelLen * Math.sin(eulerState.theta);
            const euY = pivotY + armPixelLen * Math.cos(eulerState.theta);
            ctx.strokeStyle = '#ef4444';
            ctx.lineWidth = 2;
            ctx.setLineDash([4, 4]);
            ctx.beginPath();
            ctx.moveTo(pivotX, pivotY);
            ctx.lineTo(euX, euY);
            ctx.stroke();
            ctx.setLineDash([]);
            ctx.fillStyle = '#ef4444';
            ctx.beginPath();
            ctx.arc(euX, euY, 6, 0, Math.PI * 2);
            ctx.fill();
          }

          // Divider
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(splitX, 20);
          ctx.lineTo(splitX, height - 20);
          ctx.stroke();

          // 2. Right Pane: Real-Time Total Energy Plot E(t)
          const plotX = splitX + 30;
          const plotY = 60;
          const plotW = width - splitX - 50;
          const plotH = 240;

          ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
          ctx.strokeRect(plotX, plotY, plotW, plotH);

          ctx.fillStyle = '#94a3b8';
          ctx.font = '10px monospace';
          ctx.fillText('Total Mechanical Energy E(t)', plotX, plotY - 10);

          // Energy baseline
          const baselineY = plotY + plotH / 2;
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
          ctx.setLineDash([2, 2]);
          ctx.beginPath();
          ctx.moveTo(plotX, baselineY);
          ctx.lineTo(plotX + plotW, baselineY);
          ctx.stroke();
          ctx.setLineDash([]);

          // Draw RK4 Energy (Flat constant)
          if (historyRk4.length > 1) {
            ctx.strokeStyle = '#10b981';
            ctx.lineWidth = 2;
            ctx.beginPath();
            for (let i = 0; i < historyRk4.length; i++) {
              const px = plotX + (i / 100) * plotW;
              const py = baselineY - (historyRk4[i] + 3.5) * 12;
              if (i === 0) ctx.moveTo(px, py);
              else ctx.lineTo(px, py);
            }
            ctx.stroke();
          }

          // Draw Symplectic Energy (Stable oscillation)
          if (historySymplectic.length > 1) {
            ctx.strokeStyle = '#06b6d4';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            for (let i = 0; i < historySymplectic.length; i++) {
              const px = plotX + (i / 100) * plotW;
              const py = baselineY - (historySymplectic[i] + 3.5) * 12;
              if (i === 0) ctx.moveTo(px, py);
              else ctx.lineTo(px, py);
            }
            ctx.stroke();
          }

          // Draw Explicit Euler Energy (Exploding drift!)
          if (historyEuler.length > 1) {
            ctx.strokeStyle = '#ef4444';
            ctx.lineWidth = 2;
            ctx.beginPath();
            for (let i = 0; i < historyEuler.length; i++) {
              const px = plotX + (i / 100) * plotW;
              const py = baselineY - (historyEuler[i] + 3.5) * 12;
              if (i === 0) ctx.moveTo(px, py);
              else ctx.lineTo(px, py);
            }
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [isRunning, dt, activeMethod, eulerState, symplecticState, rk4State]);

  return (
    <div className="my-6 rounded-2xl glass-panel p-5 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Cpu className="w-4 h-4" />
            </span>
            <h3 className="font-mono font-bold text-slate-900 dark:text-slate-100 text-sm">
              Numerical Stability: Explicit Euler vs Symplectic vs Runge-Kutta (RK4)
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Compare numerical stiffness, truncation error <InlineMath latex="\mathcal{O}(\Delta t^4)" />, and energy conservation across integration methods.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Method Filter */}
          <div className="flex items-center bg-slate-900 rounded-xl p-1 border border-slate-800 text-xs font-mono">
            <button
              onClick={() => setActiveMethod('all')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                activeMethod === 'all' ? 'bg-cyan-500/20 text-cyan-400 font-bold' : 'text-slate-400'
              }`}
            >
              All Solvers
            </button>
            <button
              onClick={() => setActiveMethod('rk4')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                activeMethod === 'rk4' ? 'bg-emerald-500/20 text-emerald-400 font-bold' : 'text-slate-400'
              }`}
            >
              RK4
            </button>
            <button
              onClick={() => setActiveMethod('euler')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                activeMethod === 'euler' ? 'bg-red-500/20 text-red-400 font-bold' : 'text-slate-400'
              }`}
            >
              Euler
            </button>
          </div>

          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all shadow-sm ${
              isRunning
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
            }`}
          >
            {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isRunning ? 'Pause' : 'Simulate'}</span>
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs border border-slate-700 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Canvas Viewport */}
      <div className="relative w-full aspect-[16/10] max-h-[380px] bg-slate-950 rounded-xl overflow-hidden border border-slate-800 shadow-inner flex items-center justify-center">
        <canvas
          ref={canvasRef}
          width={640}
          height={380}
          className="w-full h-full object-contain"
        />

        {/* Legend */}
        <div className="absolute bottom-3 left-3 p-2.5 rounded-xl bg-slate-950/85 backdrop-blur-md border border-slate-800 text-[10px] font-mono flex items-center gap-4 text-slate-300">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span>RK4 (<InlineMath latex="\mathcal{O}(h^4)" />)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 inline-block" />
            <span>Symplectic Euler</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />
            <span>Explicit Euler (<InlineMath latex="\mathcal{O}(h)" /> Drift)</span>
          </div>
        </div>
      </div>

      {/* Step Size Slider */}
      <div className="flex items-center justify-between gap-4 pt-2 border-t border-slate-200 dark:border-slate-800 text-xs font-mono">
        <div className="flex items-center gap-2 text-slate-400">
          <span>Integration Timestep (<InlineMath latex="h = \Delta t" />):</span>
          <span className={`font-bold ${dt > 0.12 ? 'text-red-400' : 'text-cyan-400'}`}>
            {dt.toFixed(3)} s ({dt > 0.12 ? 'Stiff / Unstable for Euler!' : 'Stable'})
          </span>
        </div>
        <input
          type="range"
          min="0.01"
          max="0.25"
          step="0.005"
          value={dt}
          onChange={(e) => setDt(parseFloat(e.target.value))}
          className="w-56 accent-cyan-500"
        />
      </div>
    </div>
  );
}

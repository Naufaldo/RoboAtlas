'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Activity, ShieldAlert, Sparkles } from 'lucide-react';
import { InlineMath } from '@/components/mathematics/MathBlock';

export function LeggedZmpSimulator() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isRunning, setIsRunning] = useState(true);
  const [stepSpeed, setStepSpeed] = useState(1.2); // Hz
  const [stepLength, setStepLength] = useState(0.4); // meters
  const [comHeight, setComHeight] = useState(0.8); // z_c in meters

  // Dynamic Walk State
  const [phase, setPhase] = useState(0); // 0 to 2*PI
  const [comX, setComX] = useState(0);
  const [comAcc, setComAcc] = useState(0);
  const [zmpX, setZmpX] = useState(0);
  const [isStable, setIsStable] = useState(true);

  const handleReset = () => {
    setPhase(0);
    setComX(0);
    setComAcc(0);
    setZmpX(0);
    setIsStable(true);
  };

  const handlePush = () => {
    // Apply lateral disturbance impulse
    setComAcc((prev) => prev + 3.5);
  };

  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();

    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;

      if (isRunning) {
        setPhase((prevPhase) => {
          const nextPhase = prevPhase + stepSpeed * Math.PI * 2 * dt;

          // LIPM harmonic oscillation for CoM
          const omega = Math.sqrt(9.81 / comHeight);
          const x = (stepLength / 2) * Math.sin(nextPhase);
          const acc = -(stepLength / 2) * (stepSpeed * Math.PI * 2) ** 2 * Math.sin(nextPhase);

          // Zero Moment Point (ZMP) Formula
          const zmp = x - (comHeight / 9.81) * acc;

          setComX(x);
          setComAcc(acc);
          setZmpX(zmp);

          // Support polygon footprint limits [-0.25m, +0.25m]
          const footMargin = 0.22;
          setIsStable(Math.abs(zmp) <= footMargin);

          return nextPhase;
        });
      }

      // Draw onto Canvas
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          const width = canvas.width;
          const height = canvas.height;
          const scale = width / 1.6; // pixels per meter

          ctx.fillStyle = '#030712';
          ctx.fillRect(0, 0, width, height);

          // Ground Horizon
          const groundY = height * 0.78;
          ctx.strokeStyle = '#334155';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(0, groundY);
          ctx.lineTo(width, groundY);
          ctx.stroke();

          const cx = width / 2;

          // 1. Draw Support Polygon Footprint (Cyan Box on Ground)
          const footW = 0.44 * scale;
          const footH = 10;
          ctx.fillStyle = isStable ? 'rgba(6, 182, 212, 0.2)' : 'rgba(239, 68, 68, 0.25)';
          ctx.strokeStyle = isStable ? '#06b6d4' : '#ef4444';
          ctx.lineWidth = 2;
          ctx.fillRect(cx - footW / 2, groundY, footW, footH);
          ctx.strokeRect(cx - footW / 2, groundY, footW, footH);

          // 2. Draw Legged Robot Inverted Pendulum
          const comPx = cx + comX * scale;
          const comPy = groundY - comHeight * scale * 0.7;

          // Leg Link
          ctx.strokeStyle = '#94a3b8';
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.moveTo(cx, groundY);
          ctx.lineTo(comPx, comPy);
          ctx.stroke();

          // Center of Mass (CoM - Emerald Sphere)
          ctx.fillStyle = '#10b981';
          ctx.strokeStyle = '#34d399';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(comPx, comPy, 14, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = '#ffffff';
          ctx.font = '9px monospace';
          ctx.fillText('CoM', comPx - 8, comPy + 3);

          // 3. Draw Zero Moment Point (ZMP - Amber Spark on Ground)
          const zmpPx = cx + zmpX * scale;
          ctx.fillStyle = isStable ? '#f59e0b' : '#ef4444';
          ctx.beginPath();
          ctx.arc(zmpPx, groundY, 7, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = '#f59e0b';
          ctx.lineWidth = 1.5;
          ctx.setLineDash([4, 4]);
          ctx.beginPath();
          ctx.moveTo(comPx, comPy);
          ctx.lineTo(zmpPx, groundY);
          ctx.stroke();
          ctx.setLineDash([]);

          ctx.fillStyle = '#f59e0b';
          ctx.font = '10px monospace';
          ctx.fillText('ZMP', zmpPx - 8, groundY + 22);
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [isRunning, stepSpeed, stepLength, comHeight, comX, zmpX, isStable]);

  return (
    <div className="my-6 rounded-2xl glass-panel p-5 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Activity className="w-4 h-4" />
            </span>
            <h3 className="font-mono font-bold text-slate-900 dark:text-slate-100 text-sm">
              Zero Moment Point (ZMP) & Linear Inverted Pendulum (LIPM) Simulator
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Maintains bipedal dynamic balance by keeping <InlineMath latex="x_{\text{ZMP}} = x_{\text{CoM}} - \frac{z_c}{g}\ddot{x}_{\text{CoM}}" /> inside the support polygon.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePush}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-red-500/20 text-red-400 border border-red-500/30 font-mono text-xs font-bold hover:bg-red-500/30 transition-all"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Push Perturbation</span>
          </button>
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all shadow-sm ${
              isRunning
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
            }`}
          >
            {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isRunning ? 'Pause' : 'Walk'}</span>
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
      <div className="relative w-full aspect-[16/9] max-h-[380px] bg-slate-950 rounded-xl overflow-hidden border border-slate-800 shadow-inner flex items-center justify-center">
        <canvas
          ref={canvasRef}
          width={640}
          height={360}
          className="w-full h-full object-contain"
        />

        {/* Live Stability HUD */}
        <div className="absolute top-3 right-3 p-3 rounded-xl bg-slate-950/85 backdrop-blur-md border border-slate-800 text-[10px] font-mono space-y-1.5 text-slate-300">
          <div className="flex items-center justify-between gap-4">
            <span className="text-slate-400">Balance State:</span>
            <span className={`font-bold ${isStable ? 'text-emerald-400' : 'text-red-400 animate-pulse'}`}>
              {isStable ? 'DYNAMICALLY STABLE' : 'TIPPING HAZARD'}
            </span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-slate-400">CoM Position (<InlineMath latex="x" />):</span>
            <span className="text-cyan-400 font-bold">{comX.toFixed(3)} m</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-slate-400">ZMP Coordinate:</span>
            <span className="text-amber-400 font-bold">{zmpX.toFixed(3)} m</span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-200 dark:border-slate-800 text-xs font-mono">
        <div className="space-y-1">
          <div className="flex justify-between text-slate-400">
            <span>Walking Cadence (<InlineMath latex="f_{\text{step}}" />):</span>
            <span className="text-cyan-400 font-bold">{stepSpeed.toFixed(1)} Hz</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="2.5"
            step="0.1"
            value={stepSpeed}
            onChange={(e) => setStepSpeed(parseFloat(e.target.value))}
            className="w-full accent-cyan-500"
          />
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-slate-400">
            <span>CoM Inverted Pendulum Height (<InlineMath latex="z_c" />):</span>
            <span className="text-amber-400 font-bold">{comHeight.toFixed(2)} m</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="1.2"
            step="0.05"
            value={comHeight}
            onChange={(e) => setComHeight(parseFloat(e.target.value))}
            className="w-full accent-amber-500"
          />
        </div>
      </div>
    </div>
  );
}

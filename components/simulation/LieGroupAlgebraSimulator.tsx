'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Box, Sparkles, Activity, Layers } from 'lucide-react';
import { InlineMath } from '@/components/mathematics/MathBlock';

export function LieGroupAlgebraSimulator() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isRunning, setIsRunning] = useState(true);
  const [omegaX, setOmegaX] = useState(0.4);
  const [omegaY, setOmegaY] = useState(0.6);
  const [omegaZ, setOmegaZ] = useState(0.5);
  const [timeStep, setTimeStep] = useState(0);

  // Compute Axis-Angle & Matrix Exponential via Rodrigues Formula
  const theta = Math.sqrt(omegaX * omegaX + omegaY * omegaY + omegaZ * omegaZ);
  const ux = theta > 1e-6 ? omegaX / theta : 0;
  const uy = theta > 1e-6 ? omegaY / theta : 0;
  const uz = theta > 1e-6 ? omegaZ / theta : 1;

  // Compute 3x3 Rotation Matrix R = exp([omega]_x)
  const c = Math.cos(theta);
  const s = Math.sin(theta);
  const v = 1 - c;

  const R = [
    [c + ux * ux * v, ux * uy * v - uz * s, ux * uz * v + uy * s],
    [uy * ux * v + uz * s, c + uy * uy * v, uy * uz * v - ux * s],
    [uz * ux * v - uy * s, uz * uy * v + ux * s, c + uz * uz * v],
  ];

  const handleReset = () => {
    setOmegaX(0.4);
    setOmegaY(0.6);
    setOmegaZ(0.5);
    setTimeStep(0);
  };

  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();

    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;

      if (isRunning) {
        setTimeStep((t) => t + dt);
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

          // Center coordinate
          const cx = width / 2;
          const cy = height / 2;

          // 1. Draw Lie Group SO(3) Manifold Sphere
          const sphereRadius = 120;
          ctx.strokeStyle = 'rgba(6, 182, 212, 0.2)';
          ctx.fillStyle = 'rgba(6, 182, 212, 0.03)';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(cx, cy, sphereRadius, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();

          // Sphere Latitude & Longitude Geodesics
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
          ctx.beginPath();
          ctx.ellipse(cx, cy, sphereRadius, sphereRadius * 0.35, 0, 0, Math.PI * 2);
          ctx.stroke();
          ctx.beginPath();
          ctx.ellipse(cx, cy, sphereRadius * 0.35, sphereRadius, 0, 0, Math.PI * 2);
          ctx.stroke();

          // 2. Draw Tangent Space Plane at Identity I (Top of sphere)
          const tangentY = cy - sphereRadius;
          ctx.strokeStyle = 'rgba(245, 158, 11, 0.6)';
          ctx.fillStyle = 'rgba(245, 158, 11, 0.08)';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(cx - 100, tangentY);
          ctx.lineTo(cx + 100, tangentY);
          ctx.stroke();

          // Tangent space marker
          ctx.fillStyle = '#f59e0b';
          ctx.beginPath();
          ctx.arc(cx, tangentY, 5, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = '#f59e0b';
          ctx.font = '10px monospace';
          ctx.fillText('Identity I', cx + 8, tangentY - 8);
          ctx.fillText('Tangent Space so(3)', cx - 110, tangentY - 8);

          // 3. Draw Tangent Vector omega on tangent plane
          const vecPxX = cx + omegaX * 70;
          const vecPxY = tangentY - omegaY * 35;
          ctx.strokeStyle = '#38bdf8';
          ctx.fillStyle = '#38bdf8';
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.moveTo(cx, tangentY);
          ctx.lineTo(vecPxX, vecPxY);
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(vecPxX, vecPxY, 4, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillText('ω ∈ so(3)', vecPxX + 6, vecPxY - 4);

          // 4. Draw Exponential Map Geodesic Arc exp([omega]_x) onto Manifold Point R
          const rotAngle = (timeStep * 0.8) % (Math.PI * 2);
          const targetPxX = cx + Math.sin(theta + rotAngle * 0.5) * sphereRadius * 0.85;
          const targetPxY = cy + Math.cos(theta + rotAngle * 0.5) * sphereRadius * 0.85;

          ctx.strokeStyle = '#10b981';
          ctx.lineWidth = 2;
          ctx.setLineDash([4, 4]);
          ctx.beginPath();
          ctx.moveTo(cx, tangentY);
          ctx.quadraticCurveTo(cx + 40, cy - 60, targetPxX, targetPxY);
          ctx.stroke();
          ctx.setLineDash([]);

          // 5. Draw 3D Transformed Coordinate Frame at R on Manifold
          ctx.save();
          ctx.translate(targetPxX, targetPxY);

          // Frame X-Axis (Red)
          const axisLen = 35;
          ctx.strokeStyle = '#ef4444';
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(R[0][0] * axisLen, R[1][0] * axisLen);
          ctx.stroke();

          // Frame Y-Axis (Green)
          ctx.strokeStyle = '#22c55e';
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(R[0][1] * axisLen, R[1][1] * axisLen);
          ctx.stroke();

          // Frame Z-Axis (Blue)
          ctx.strokeStyle = '#3b82f6';
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(R[0][2] * axisLen, R[1][2] * axisLen);
          ctx.stroke();

          // Manifold point marker
          ctx.fillStyle = '#10b981';
          ctx.beginPath();
          ctx.arc(0, 0, 6, 0, Math.PI * 2);
          ctx.fill();

          ctx.restore();

          ctx.fillStyle = '#10b981';
          ctx.font = '11px monospace';
          ctx.fillText('R = exp([ω]x) ∈ SO(3)', targetPxX + 12, targetPxY + 4);
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [isRunning, omegaX, omegaY, omegaZ, theta, ux, uy, uz, R, timeStep]);

  return (
    <div className="my-6 rounded-2xl glass-panel p-5 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Box className="w-4 h-4" />
            </span>
            <h3 className="font-mono font-bold text-slate-900 dark:text-slate-100 text-sm">
              Lie Groups SO(3) & Lie Algebra so(3) Exponential Map Simulator
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Maps vector <InlineMath latex="\boldsymbol{\omega} \in \mathbb{R}^3" /> in tangent space <InlineMath latex="\mathfrak{so}(3)" /> to rotation matrix <InlineMath latex="\mathbf{R} \in SO(3)" /> via Rodrigues formula <InlineMath latex="\exp([\boldsymbol{\omega}]_\times)" />.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all shadow-sm ${
              isRunning
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
            }`}
          >
            {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isRunning ? 'Pause' : 'Flow'}</span>
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
      <div className="relative w-full aspect-[16/10] max-h-[400px] bg-slate-950 rounded-xl overflow-hidden border border-slate-800 shadow-inner flex items-center justify-center">
        <canvas
          ref={canvasRef}
          width={640}
          height={400}
          className="w-full h-full object-contain"
        />

        {/* Live Matrix HUD */}
        <div className="absolute top-3 right-3 p-3 rounded-xl bg-slate-950/85 backdrop-blur-md border border-slate-800 text-[10px] font-mono space-y-1.5 text-slate-300">
          <div className="text-cyan-400 font-bold border-b border-slate-800 pb-1">
            Rotation Matrix <InlineMath latex="\mathbf{R} \in SO(3)" />:
          </div>
          <div className="font-mono text-slate-300 leading-tight">
            [{R[0].map((v) => v.toFixed(2)).join(', ')}]<br />
            [{R[1].map((v) => v.toFixed(2)).join(', ')}]<br />
            [{R[2].map((v) => v.toFixed(2)).join(', ')}]
          </div>
          <div className="pt-1 border-t border-slate-800 flex justify-between gap-3 text-slate-400">
            <span>Angle <InlineMath latex="\theta = \|\boldsymbol{\omega}\|" />:</span>
            <span className="text-amber-400 font-bold">{theta.toFixed(3)} rad</span>
          </div>
        </div>
      </div>

      {/* Tangent Vector Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-200 dark:border-slate-800 text-xs font-mono">
        <div className="space-y-1">
          <div className="flex justify-between text-slate-400">
            <span><InlineMath latex="\omega_x" /> (Roll Twist):</span>
            <span className="text-cyan-400 font-bold">{omegaX.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min="-1.5"
            max="1.5"
            step="0.05"
            value={omegaX}
            onChange={(e) => setOmegaX(parseFloat(e.target.value))}
            className="w-full accent-cyan-500"
          />
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-slate-400">
            <span><InlineMath latex="\omega_y" /> (Pitch Twist):</span>
            <span className="text-cyan-400 font-bold">{omegaY.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min="-1.5"
            max="1.5"
            step="0.05"
            value={omegaY}
            onChange={(e) => setOmegaY(parseFloat(e.target.value))}
            className="w-full accent-cyan-500"
          />
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-slate-400">
            <span><InlineMath latex="\omega_z" /> (Yaw Twist):</span>
            <span className="text-cyan-400 font-bold">{omegaZ.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min="-1.5"
            max="1.5"
            step="0.05"
            value={omegaZ}
            onChange={(e) => setOmegaZ(parseFloat(e.target.value))}
            className="w-full accent-cyan-500"
          />
        </div>
      </div>
    </div>
  );
}

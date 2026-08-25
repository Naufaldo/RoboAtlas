'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Anchor, Waves, Activity } from 'lucide-react';
import { InlineMath } from '@/components/mathematics/MathBlock';

export function MarineHydrodynamicsSimulator() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isRunning, setIsRunning] = useState(true);
  const [ballastTrim, setBallastTrim] = useState(0); // -100 (heavy sink) to +100 (buoyant float)
  const [thrustRPM, setThrustRPM] = useState(60); // % forward thruster
  const [pitchAngle, setPitchAngle] = useState(0); // -25 to +25 deg
  const [oceanCurrent, setOceanCurrent] = useState(0.2); // m/s horizontal drift

  // AUV State
  const [auvState, setAuvState] = useState({
    x: 0,
    depth: 15, // meters depth
    vx: 0,
    vz: 0,
    pitch: 0,
  });

  const handleReset = () => {
    setBallastTrim(0);
    setThrustRPM(60);
    setPitchAngle(0);
    setOceanCurrent(0.2);
    setAuvState({ x: 0, depth: 15, vx: 0, vz: 0, pitch: 0 });
  };

  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();

    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;

      if (isRunning) {
        setAuvState((prev) => {
          const mass = 45; // kg
          const addedMassZ = 20; // kg hydrodynamic added mass
          const effectiveMassZ = mass + addedMassZ;

          // Net buoyancy force (N)
          const netBuoyancy = ballastTrim * 0.4; // +/- 40 N

          // Forward thrust along vehicle pitch
          const targetPitchRad = (pitchAngle * Math.PI) / 180;
          const maxThrustN = 80;
          const thrust = (thrustRPM / 100) * maxThrustN;

          const thrustX = thrust * Math.cos(targetPitchRad);
          const thrustZ = thrust * Math.sin(targetPitchRad); // positive down

          // Quadratic hydrodynamic drag
          const dragCoeffX = 12.0;
          const dragCoeffZ = 25.0;

          const relativeVx = prev.vx - oceanCurrent;
          const dragX = -0.5 * dragCoeffX * relativeVx * Math.abs(relativeVx);
          const dragZ = -0.5 * dragCoeffZ * prev.vz * Math.abs(prev.vz);

          const ax = (thrustX + dragX) / mass;
          const az = (thrustZ - netBuoyancy + dragZ) / effectiveMassZ;

          let nextVx = prev.vx + ax * dt;
          let nextVz = prev.vz + az * dt;

          let nextX = prev.x + nextVx * dt;
          let nextDepth = prev.depth + nextVz * dt;

          // Depth limits (0m surface to 40m seabed)
          if (nextDepth < 1.0) {
            nextDepth = 1.0;
            nextVz = 0;
          }
          if (nextDepth > 38.0) {
            nextDepth = 38.0;
            nextVz = 0;
          }

          if (nextX > 50) nextX = -50;
          if (nextX < -50) nextX = 50;

          return {
            x: nextX,
            depth: nextDepth,
            vx: nextVx,
            vz: nextVz,
            pitch: targetPitchRad,
          };
        });
      }

      // Draw onto Canvas
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          const width = canvas.width;
          const height = canvas.height;

          // Ocean Gradient (Surface blue to deep abyss)
          const grad = ctx.createLinearGradient(0, 0, 0, height);
          grad.addColorStop(0, '#0369a1');
          grad.addColorStop(0.3, '#0c4a6e');
          grad.addColorStop(1, '#020617');
          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, width, height);

          // Water depth grid lines
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
          ctx.lineWidth = 1;
          for (let d = 0; d <= 40; d += 10) {
            const y = (d / 40) * height;
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();

            ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
            ctx.font = '10px monospace';
            ctx.fillText(`${d}m`, 8, y - 4);
          }

          // AUV Position in Canvas
          const cx = width / 2;
          const cy = (auvState.depth / 40) * height;

          // Draw AUV Body
          ctx.save();
          ctx.translate(cx, cy);
          ctx.rotate(auvState.pitch);

          // Torpedo Hull
          ctx.fillStyle = '#f59e0b'; // Yellow Submarine
          ctx.strokeStyle = '#d97706';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.ellipse(0, 0, 42, 16, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();

          // Conning Tower / Sensor Dome
          ctx.fillStyle = '#0f172a';
          ctx.beginPath();
          ctx.arc(15, -12, 8, Math.PI, 0);
          ctx.fill();

          // Tail Fins & Propeller
          ctx.fillStyle = '#64748b';
          ctx.fillRect(-45, -12, 8, 24);

          // Thruster Bubbles Stream
          if (thrustRPM > 10) {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
            for (let b = 0; b < 4; b++) {
              ctx.beginPath();
              ctx.arc(-55 - b * 10, (Math.random() - 0.5) * 6, 2 + Math.random() * 2, 0, Math.PI * 2);
              ctx.fill();
            }
          }

          ctx.restore();

          // Force Vectors (Buoyancy Upward Cyan, Gravity Downward Red)
          ctx.strokeStyle = '#06b6d4';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(cx, cy - 25 - ballastTrim * 0.2);
          ctx.stroke();

          ctx.strokeStyle = '#ef4444';
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(cx, cy + 25);
          ctx.stroke();
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [isRunning, ballastTrim, thrustRPM, pitchAngle, oceanCurrent, auvState]);

  return (
    <div className="my-6 rounded-2xl glass-panel p-5 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Waves className="w-4 h-4" />
            </span>
            <h3 className="font-mono font-bold text-slate-900 dark:text-slate-100 text-sm">
              6-DOF Marine Hydrodynamics & Fossen Underwater Equation Simulator
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Balancing hydrostatic buoyancy <InlineMath latex="B = \rho g V" />, gravitational weight <InlineMath latex="W = mg" />, and quadratic drag <InlineMath latex="F_D = \frac{1}{2}\rho C_D A v^2" />.
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
            <span>{isRunning ? 'Pause' : 'Dive AUV'}</span>
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

        {/* Live Subsea HUD */}
        <div className="absolute top-3 right-3 p-3 rounded-xl bg-slate-950/85 backdrop-blur-md border border-slate-800 text-[10px] font-mono space-y-1.5 text-slate-300">
          <div className="flex items-center justify-between gap-4">
            <span className="text-slate-400">Current Depth (Z):</span>
            <span className="text-cyan-400 font-bold">{auvState.depth.toFixed(1)} m</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-slate-400">Surge Velocity (<InlineMath latex="u" />):</span>
            <span className="text-emerald-400 font-bold">{auvState.vx.toFixed(2)} m/s</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-slate-400">Heave Velocity (<InlineMath latex="w" />):</span>
            <span className="text-amber-400 font-bold">{auvState.vz.toFixed(2)} m/s</span>
          </div>
        </div>
      </div>

      {/* Control Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-200 dark:border-slate-800 text-xs font-mono">
        <div className="space-y-1">
          <div className="flex justify-between text-slate-400">
            <span>Ballast Buoyancy Trim (<InlineMath latex="\Delta B" />):</span>
            <span className="text-cyan-400 font-bold">
              {ballastTrim > 0 ? `+${ballastTrim} (Float)` : ballastTrim < 0 ? `${ballastTrim} (Sink)` : '0 (Neutral)'}
            </span>
          </div>
          <input
            type="range"
            min="-100"
            max="100"
            step="5"
            value={ballastTrim}
            onChange={(e) => setBallastTrim(parseInt(e.target.value))}
            className="w-full accent-cyan-500"
          />
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-slate-400">
            <span>Dive Plane Pitch Angle (<InlineMath latex="\theta_{\text{trim}}" />):</span>
            <span className="text-amber-400 font-bold">{pitchAngle}°</span>
          </div>
          <input
            type="range"
            min="-25"
            max="25"
            step="1"
            value={pitchAngle}
            onChange={(e) => setPitchAngle(parseInt(e.target.value))}
            className="w-full accent-amber-500"
          />
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Wind, Shield, Activity, Sliders } from 'lucide-react';
import { InlineMath } from '@/components/mathematics/MathBlock';

export function QuadrotorDynamicsSimulator() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isRunning, setIsRunning] = useState(true);
  const [throttle, setThrottle] = useState(50); // % thrust (50% = hover)
  const [rollCommand, setRollCommand] = useState(0); // -30 to +30 deg
  const [pitchCommand, setPitchCommand] = useState(0); // -30 to +30 deg
  const [windDisturbance, setWindDisturbance] = useState(0); // m/s

  // State: position & velocity in 2.5D canvas
  const [quadState, setQuadState] = useState({
    x: 0,
    y: 0, // altitude
    vx: 0,
    vy: 0,
    roll: 0, // rad
    omega: 0,
  });

  const handleReset = () => {
    setThrottle(50);
    setRollCommand(0);
    setPitchCommand(0);
    setWindDisturbance(0);
    setQuadState({ x: 0, y: 0, vx: 0, vy: 0, roll: 0, omega: 0 });
  };

  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();

    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;

      if (isRunning) {
        setQuadState((prev) => {
          const mass = 1.2; // kg
          const g = 9.81;
          const maxThrust = mass * g * 2.0; // 2:1 thrust-to-weight
          const currentThrust = (throttle / 100) * maxThrust;

          // Simple PD attitude controller toward rollCommand
          const targetRoll = (rollCommand * Math.PI) / 180;
          const rollError = targetRoll - prev.roll;
          const torque = 8.0 * rollError - 2.5 * prev.omega;
          const inertia = 0.02;

          const nextOmega = prev.omega + (torque / inertia) * dt;
          const nextRoll = prev.roll + nextOmega * dt;

          // Linear acceleration in world frame
          const thrustX = currentThrust * Math.sin(nextRoll);
          const thrustY = currentThrust * Math.cos(nextRoll);

          const dragX = -0.5 * prev.vx + windDisturbance * 0.8;
          const dragY = -0.3 * prev.vy;

          const ax = (thrustX + dragX) / mass;
          const ay = (thrustY - mass * g + dragY) / mass;

          let nextVx = prev.vx + ax * dt;
          let nextVy = prev.vy + ay * dt;

          let nextX = prev.x + nextVx * dt;
          let nextY = prev.y + nextVy * dt;

          // Altitude floor constraint
          if (nextY < -2.5) {
            nextY = -2.5;
            nextVy = 0;
          }
          if (nextY > 3.0) {
            nextY = 3.0;
            nextVy = 0;
          }
          if (nextX < -5.0) nextX = -5.0;
          if (nextX > 5.0) nextX = 5.0;

          return {
            x: nextX,
            y: nextY,
            vx: nextVx,
            vy: nextVy,
            roll: nextRoll,
            omega: nextOmega,
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
          const cx = width / 2 + (quadState.x / 5.0) * (width * 0.4);
          const cy = height / 2 - (quadState.y / 3.0) * (height * 0.35);

          ctx.fillStyle = '#030712';
          ctx.fillRect(0, 0, width, height);

          // Grid & Ground Horizon
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
          ctx.lineWidth = 1;
          for (let y = 0; y < height; y += 40) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
          }
          for (let x = 0; x < width; x += 40) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
          }

          // Ground line
          const groundY = height / 2 - (-2.5 / 3.0) * (height * 0.35);
          ctx.strokeStyle = '#334155';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(0, groundY);
          ctx.lineTo(width, groundY);
          ctx.stroke();

          // Draw Quadrotor
          ctx.save();
          ctx.translate(cx, cy);
          ctx.rotate(-quadState.roll);

          const armLen = 50;

          // Quadrotor Carbon Fiber Arms
          ctx.strokeStyle = '#94a3b8';
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.moveTo(-armLen, 0);
          ctx.lineTo(armLen, 0);
          ctx.stroke();

          // Central Avionics Hub
          ctx.fillStyle = '#0f172a';
          ctx.strokeStyle = '#06b6d4';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(0, 0, 14, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();

          // Left Rotor & Thrust Vector
          const leftThrustLen = (throttle / 100) * 45 * (1 - (rollCommand / 60));
          ctx.strokeStyle = '#10b981';
          ctx.fillStyle = '#10b981';
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.moveTo(-armLen, 0);
          ctx.lineTo(-armLen, -leftThrustLen);
          ctx.stroke();

          ctx.fillStyle = '#38bdf8';
          ctx.fillRect(-armLen - 15, -4, 30, 4);

          // Right Rotor & Thrust Vector
          const rightThrustLen = (throttle / 100) * 45 * (1 + (rollCommand / 60));
          ctx.strokeStyle = '#10b981';
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.moveTo(armLen, 0);
          ctx.lineTo(armLen, -rightThrustLen);
          ctx.stroke();

          ctx.fillStyle = '#38bdf8';
          ctx.fillRect(armLen - 15, -4, 30, 4);

          ctx.restore();

          // Gravity Vector from Center
          ctx.strokeStyle = '#ef4444';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(cx, cy + 35);
          ctx.stroke();

          ctx.fillStyle = '#ef4444';
          ctx.font = '10px monospace';
          ctx.fillText('mg', cx + 6, cy + 30);
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [isRunning, throttle, rollCommand, pitchCommand, windDisturbance, quadState]);

  return (
    <div className="my-6 rounded-2xl glass-panel p-5 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Wind className="w-4 h-4" />
            </span>
            <h3 className="font-mono font-bold text-slate-900 dark:text-slate-100 text-sm">
              6-DOF Multirotor Flight Dynamics & Differential Thrust Simulator
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Control rotor speeds <InlineMath latex="\omega_1, \omega_2, \omega_3, \omega_4" /> to generate total thrust <InlineMath latex="F = \sum k_f \omega_i^2" /> and roll torque <InlineMath latex="\tau_x = L k_f (\omega_4^2 - \omega_2^2)" />.
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
            <span>{isRunning ? 'Pause' : 'Fly Drone'}</span>
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

        {/* Live Flight Telemetry HUD */}
        <div className="absolute top-3 right-3 p-3 rounded-xl bg-slate-950/85 backdrop-blur-md border border-slate-800 text-[10px] font-mono space-y-1.5 text-slate-300">
          <div className="flex items-center justify-between gap-4">
            <span className="text-slate-400">Altitude (Z):</span>
            <span className="text-cyan-400 font-bold">{(quadState.y + 2.5).toFixed(2)} m</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-slate-400">Roll Tilt (<InlineMath latex="\phi" />):</span>
            <span className="text-amber-400 font-bold">{((quadState.roll * 180) / Math.PI).toFixed(1)}°</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-slate-400">Climb Velocity (<InlineMath latex="v_z" />):</span>
            <span className="text-emerald-400 font-bold">{quadState.vy.toFixed(2)} m/s</span>
          </div>
        </div>
      </div>

      {/* Control Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-200 dark:border-slate-800 text-xs font-mono">
        <div className="space-y-1">
          <div className="flex justify-between text-slate-400">
            <span>Collective Throttle (% Thrust):</span>
            <span className="text-cyan-400 font-bold">{throttle}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            value={throttle}
            onChange={(e) => setThrottle(parseInt(e.target.value))}
            className="w-full accent-cyan-500"
          />
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-slate-400">
            <span>Roll Tilt Command (<InlineMath latex="\phi_{\text{cmd}}" />):</span>
            <span className="text-amber-400 font-bold">{rollCommand}°</span>
          </div>
          <input
            type="range"
            min="-30"
            max="30"
            step="1"
            value={rollCommand}
            onChange={(e) => setRollCommand(parseInt(e.target.value))}
            className="w-full accent-amber-500"
          />
        </div>
      </div>
    </div>
  );
}

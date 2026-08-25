'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Radio, Sliders, Activity, Sparkles, Navigation } from 'lucide-react';
import { InlineMath } from '@/components/mathematics/MathBlock';

interface Point2D {
  x: number;
  y: number;
}

export function SensorFusionSimulator() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isRunning, setIsRunning] = useState(true);
  const [showOdom, setShowOdom] = useState(true);
  const [showGps, setShowGps] = useState(true);
  const [showFused, setShowFused] = useState(true);
  const [gpsNoise, setGpsNoise] = useState(14); // pixels
  const [wheelDriftRate, setWheelDriftRate] = useState(0.04);

  // States
  const [timeStep, setTimeStep] = useState(0);
  const [truePose, setTruePose] = useState({ x: 320, y: 190, theta: 0 });
  const [odomPose, setOdomPose] = useState({ x: 320, y: 190, theta: 0 });
  const [fusedPose, setFusedPose] = useState({ x: 320, y: 190, theta: 0 });

  const [truePath, setTruePath] = useState<Point2D[]>([]);
  const [odomPath, setOdomPath] = useState<Point2D[]>([]);
  const [fusedPath, setFusedPath] = useState<Point2D[]>([]);
  const [gpsFixes, setGpsFixes] = useState<Point2D[]>([]);

  const handleReset = () => {
    setTimeStep(0);
    setTruePose({ x: 320, y: 190, theta: 0 });
    setOdomPose({ x: 320, y: 190, theta: 0 });
    setFusedPose({ x: 320, y: 190, theta: 0 });
    setTruePath([]);
    setOdomPath([]);
    setFusedPath([]);
    setGpsFixes([]);
  };

  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();
    let gpsTimer = 0;

    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;

      if (isRunning) {
        setTimeStep((t) => t + dt);
        gpsTimer += dt;

        // Ground Truth Circular Trajectory
        const speed = 70;
        const omega = 0.45;
        const nTheta = truePose.theta + omega * dt;
        const nX = 320 + 130 * Math.cos(nTheta);
        const nY = 190 + 90 * Math.sin(nTheta);

        setTruePose({ x: nX, y: nY, theta: nTheta });
        setTruePath((p) => [...p.slice(-140), { x: nX, y: nY }]);

        // 1. Wheel Odometry Drift Model
        setOdomPose((prev) => {
          const odomTheta = prev.theta + (omega + wheelDriftRate) * dt;
          const odomV = speed * (1 + wheelDriftRate * 0.5);
          const oX = prev.x + odomV * Math.cos(odomTheta) * dt;
          const oY = prev.y + odomV * Math.sin(odomTheta) * dt;
          setOdomPath((p) => [...p.slice(-140), { x: oX, y: oY }]);
          return { x: oX, y: oY, theta: odomTheta };
        });

        // 2. GPS Measurement Fix (Every 0.4s)
        let currentGps: Point2D | null = null;
        if (gpsTimer > 0.4) {
          gpsTimer = 0;
          const gx = nX + (Math.random() - 0.5) * 2 * gpsNoise;
          const gy = nY + (Math.random() - 0.5) * 2 * gpsNoise;
          currentGps = { x: gx, y: gy };
          setGpsFixes((g) => [...g.slice(-25), currentGps!]);
        }

        // 3. Fused State (Complementary Kalman Fusion)
        setFusedPose((prev) => {
          // Prediction from odometry motion
          let fx = prev.x + speed * Math.cos(nTheta) * dt;
          let fy = prev.y + speed * Math.sin(nTheta) * dt;

          // GPS Measurement Correction
          if (currentGps) {
            const K = 0.25; // Kalman gain weight
            fx = fx + K * (currentGps.x - fx);
            fy = fy + K * (currentGps.y - fy);
          }

          setFusedPath((p) => [...p.slice(-140), { x: fx, y: fy }]);
          return { x: fx, y: fy, theta: nTheta };
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

          // Grid lines
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
          ctx.lineWidth = 1;
          for (let x = 0; x < width; x += 40) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
          }
          for (let y = 0; y < height; y += 40) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
          }

          // 1. Draw Ground Truth Path (Solid Slate)
          if (truePath.length > 1) {
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(truePath[0].x, truePath[0].y);
            for (let i = 1; i < truePath.length; i++) {
              ctx.lineTo(truePath[i].x, truePath[i].y);
            }
            ctx.stroke();
          }

          // 2. Draw Wheel Odometry Path (Red - Drifting)
          if (showOdom && odomPath.length > 1) {
            ctx.strokeStyle = '#ef4444';
            ctx.lineWidth = 2;
            ctx.setLineDash([3, 3]);
            ctx.beginPath();
            ctx.moveTo(odomPath[0].x, odomPath[0].y);
            for (let i = 1; i < odomPath.length; i++) {
              ctx.lineTo(odomPath[i].x, odomPath[i].y);
            }
            ctx.stroke();
            ctx.setLineDash([]);
          }

          // 3. Draw GPS Fixes (Amber Crosses)
          if (showGps) {
            ctx.strokeStyle = '#f59e0b';
            ctx.lineWidth = 1.5;
            for (const fix of gpsFixes) {
              ctx.beginPath();
              ctx.moveTo(fix.x - 4, fix.y - 4);
              ctx.lineTo(fix.x + 4, fix.y + 4);
              ctx.moveTo(fix.x + 4, fix.y - 4);
              ctx.lineTo(fix.x - 4, fix.y + 4);
              ctx.stroke();
            }
          }

          // 4. Draw Fused Estimate Path (Emerald - High Precision)
          if (showFused && fusedPath.length > 1) {
            ctx.strokeStyle = '#10b981';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(fusedPath[0].x, fusedPath[0].y);
            for (let i = 1; i < fusedPath.length; i++) {
              ctx.lineTo(fusedPath[i].x, fusedPath[i].y);
            }
            ctx.stroke();
          }

          // Draw Robot Bodies
          // True Robot (White)
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(truePose.x, truePose.y, 8, 0, Math.PI * 2);
          ctx.fill();

          // Fused Estimated Robot (Emerald Ring)
          if (showFused) {
            ctx.strokeStyle = '#10b981';
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.arc(fusedPose.x, fusedPose.y, 12, 0, Math.PI * 2);
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [isRunning, showOdom, showGps, showFused, gpsNoise, wheelDriftRate, truePose]);

  const odomError = Math.hypot(odomPose.x - truePose.x, odomPose.y - truePose.y);
  const fusedError = Math.hypot(fusedPose.x - truePose.x, fusedPose.y - truePose.y);

  return (
    <div className="my-6 rounded-2xl glass-panel p-5 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Radio className="w-4 h-4" />
            </span>
            <h3 className="font-mono font-bold text-slate-900 dark:text-slate-100 text-sm">
              Multi-Sensor Fusion: Wheel Odometry + IMU + GPS Simulator
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Fuses high-rate dead-reckoning motion prediction with noisy absolute GPS corrections via Kalman update <InlineMath latex="\hat{\mathbf{x}}_k = \hat{\mathbf{x}}_k^- + \mathbf{K}_k(\mathbf{z}_k - \mathbf{H}\hat{\mathbf{x}}_k^-)" />.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Sensor Toggles */}
          <div className="flex items-center bg-slate-900 rounded-xl p-1 border border-slate-800 text-xs font-mono">
            <button
              onClick={() => setShowOdom(!showOdom)}
              className={`px-2 py-1 rounded-lg transition-all ${
                showOdom ? 'bg-red-500/20 text-red-400 font-bold' : 'text-slate-500'
              }`}
            >
              Odometry
            </button>
            <button
              onClick={() => setShowGps(!showGps)}
              className={`px-2 py-1 rounded-lg transition-all ${
                showGps ? 'bg-amber-500/20 text-amber-400 font-bold' : 'text-slate-500'
              }`}
            >
              GPS Fixes
            </button>
            <button
              onClick={() => setShowFused(!showFused)}
              className={`px-2 py-1 rounded-lg transition-all ${
                showFused ? 'bg-emerald-500/20 text-emerald-400 font-bold' : 'text-slate-500'
              }`}
            >
              Fused Filter
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
            <span>{isRunning ? 'Pause' : 'Drive'}</span>
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

        {/* Live HUD */}
        <div className="absolute top-3 right-3 p-3 rounded-xl bg-slate-950/85 backdrop-blur-md border border-slate-800 text-[10px] font-mono space-y-1.5 text-slate-300">
          <div className="flex items-center justify-between gap-4">
            <span className="text-slate-400">Pure Odometry Drift:</span>
            <span className="text-red-400 font-bold">{odomError.toFixed(1)} px</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-slate-400">Fused Kalman Error:</span>
            <span className="text-emerald-400 font-bold">{fusedError.toFixed(1)} px</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-slate-400">Drift Reduction:</span>
            <span className="text-cyan-400 font-bold">
              {odomError > 0 ? `${((1 - fusedError / odomError) * 100).toFixed(0)}%` : '100%'}
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="absolute bottom-3 left-3 p-2.5 rounded-xl bg-slate-950/85 backdrop-blur-md border border-slate-800 text-[10px] font-mono flex items-center gap-3 text-slate-300">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-white inline-block" />
            <span>Ground Truth</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />
            <span>Odometry (Drifting)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span>GPS Fixes</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span>Fused State</span>
          </div>
        </div>
      </div>

      {/* Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-200 dark:border-slate-800 text-xs font-mono">
        <div className="space-y-1">
          <div className="flex justify-between text-slate-400">
            <span>Wheel Systematic Slip / Drift Rate:</span>
            <span className="text-red-400 font-bold">{(wheelDriftRate * 100).toFixed(1)}%</span>
          </div>
          <input
            type="range"
            min="0.01"
            max="0.12"
            step="0.005"
            value={wheelDriftRate}
            onChange={(e) => setWheelDriftRate(parseFloat(e.target.value))}
            className="w-full accent-red-500"
          />
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-slate-400">
            <span>GPS Multipath Noise Variance (<InlineMath latex="\sigma_{\text{gps}}" />):</span>
            <span className="text-amber-400 font-bold">{gpsNoise} px</span>
          </div>
          <input
            type="range"
            min="4"
            max="30"
            step="1"
            value={gpsNoise}
            onChange={(e) => setGpsNoise(parseInt(e.target.value))}
            className="w-full accent-amber-500"
          />
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Play, Pause, RotateCcw, Compass, Gauge, Sliders, Activity } from 'lucide-react';
import { wrapToPi } from '@/lib/math/vector2d';

export function KinematicsSimulator() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isRunning, setIsRunning] = useState(true);
  const [vL, setVL] = useState(2.0); // left wheel velocity
  const [vR, setVR] = useState(1.4); // right wheel velocity
  const [wheelbase, setWheelbase] = useState(30); // distance between wheels
  const [wheelRadius, setWheelRadius] = useState(10);
  const [showAxes, setShowAxes] = useState(true);

  const state = useRef({
    x: 260,
    y: 180,
    theta: -Math.PI / 4,
    trail: [] as { x: number; y: number }[],
  });

  const reset = useCallback(() => {
    state.current = {
      x: 260,
      y: 180,
      theta: -Math.PI / 4,
      trail: [],
    };
  }, []);

  // Kinematic parameters derived
  const v = (vR + vL) / 2;
  const omega = (vR - vL) / wheelbase;
  const turningRadius = Math.abs(omega) > 0.001 ? Math.abs(v / omega) : Infinity;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let lastFrame = performance.now();

    const render = (time: number) => {
      const dt = Math.min((time - lastFrame) / 1000, 0.1);
      lastFrame = time;

      const robot = state.current;

      if (isRunning) {
        // Forward Kinematics integration (Unicycle model)
        const linearVel = (vR + vL) / 2;
        const angularVel = (vR - vL) / wheelbase;

        robot.theta = wrapToPi(robot.theta + angularVel * dt * 25);
        robot.x += Math.cos(robot.theta) * linearVel * dt * 50;
        robot.y += Math.sin(robot.theta) * linearVel * dt * 50;

        // Wrap around canvas boundaries
        if (robot.x < 20) robot.x = canvas.width - 20;
        if (robot.x > canvas.width - 20) robot.x = 20;
        if (robot.y < 20) robot.y = canvas.height - 20;
        if (robot.y > canvas.height - 20) robot.y = 20;

        robot.trail.push({ x: robot.x, y: robot.y });
        if (robot.trail.length > 250) robot.trail.shift();
      }

      // Drawing
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Tech Grid
      ctx.strokeStyle = 'rgba(51, 65, 85, 0.25)';
      ctx.lineWidth = 1;
      const gridSize = 25;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // World Coordinate Axes (origin at top-left)
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.4)';
      ctx.lineWidth = 2;
      // World X
      ctx.beginPath();
      ctx.moveTo(25, 25);
      ctx.lineTo(65, 25);
      ctx.stroke();
      ctx.fillStyle = '#38bdf8';
      ctx.font = '10px JetBrains Mono, monospace';
      ctx.fillText('X_w', 70, 28);
      // World Y
      ctx.beginPath();
      ctx.moveTo(25, 25);
      ctx.lineTo(25, 65);
      ctx.stroke();
      ctx.fillText('Y_w', 20, 78);

      // Trajectory Trail
      if (robot.trail.length > 1) {
        ctx.beginPath();
        ctx.moveTo(robot.trail[0].x, robot.trail[0].y);
        for (let i = 1; i < robot.trail.length; i++) {
          ctx.lineTo(robot.trail[i].x, robot.trail[i].y);
        }
        ctx.strokeStyle = 'rgba(6, 182, 212, 0.6)';
        ctx.lineWidth = 2.5;
        ctx.stroke();
      }

      // Robot Chassis
      ctx.save();
      ctx.translate(robot.x, robot.y);
      ctx.rotate(robot.theta);

      // Chassis circle
      const r = wheelbase / 2;
      ctx.beginPath();
      ctx.arc(0, 0, r + 4, 0, Math.PI * 2);
      ctx.fillStyle = '#090d16';
      ctx.fill();
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Left wheel (top in local frame)
      ctx.fillStyle = vL > 0 ? '#38bdf8' : '#f43f5e';
      ctx.fillRect(-wheelRadius / 2, -r - 5, wheelRadius, 5);
      // Right wheel (bottom in local frame)
      ctx.fillStyle = vR > 0 ? '#38bdf8' : '#f43f5e';
      ctx.fillRect(-wheelRadius / 2, r, wheelRadius, 5);

      // Local Robot Coordinate Axes (X_r in cyan, Y_r in emerald)
      if (showAxes) {
        // Robot Local X axis (heading vector)
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(r + 20, 0);
        ctx.strokeStyle = '#00f2fe';
        ctx.lineWidth = 2.5;
        ctx.stroke();

        // Arrowhead
        ctx.beginPath();
        ctx.moveTo(r + 20, 0);
        ctx.lineTo(r + 14, -4);
        ctx.lineTo(r + 14, 4);
        ctx.fillStyle = '#00f2fe';
        ctx.fill();

        // Robot Local Y axis (lateral vector)
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -(r + 16));
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [isRunning, vL, vR, wheelbase, wheelRadius, showAxes]);

  return (
    <div className="rounded-2xl glass-panel border border-slate-800/90 overflow-hidden shadow-2xl">
      {/* Top Header & Telemetry */}
      <div className="px-4 py-3 bg-slate-900/80 border-b border-slate-800/80 flex items-center justify-between flex-wrap gap-2 text-xs font-mono">
        <div className="flex items-center gap-2 text-cyan-400 font-bold">
          <Compass className="w-4 h-4" />
          <span>SE(2) Forward Kinematics Sandbox</span>
        </div>

        <div className="flex items-center gap-4 text-[11px] text-slate-300">
          <span>
            Linear v: <strong className="text-cyan-400">{v.toFixed(2)} m/s</strong>
          </span>
          <span>
            Angular ω: <strong className="text-emerald-400">{omega.toFixed(2)} rad/s</strong>
          </span>
          <span>
            Radius R:{' '}
            <strong className="text-amber-400">
              {turningRadius === Infinity ? '∞ (Straight)' : `${turningRadius.toFixed(1)} px`}
            </strong>
          </span>
        </div>
      </div>

      {/* Canvas */}
      <div className="relative aspect-[16/9] w-full max-h-[340px] bg-[#050811]">
        <canvas ref={canvasRef} width={520} height={320} className="w-full h-full block" />

        {/* Legend */}
        <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800 text-[10px] font-mono space-y-1 text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-0.5 bg-[#00f2fe]" />
            <span>Robot X_r (Heading)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-0.5 bg-[#10b981]" />
            <span>Robot Y_r (Lateral)</span>
          </div>
        </div>
      </div>

      {/* Controls & Sliders */}
      <div className="p-4 bg-slate-900/90 border-t border-slate-800 space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          {/* Left Wheel Slider */}
          <div className="space-y-1.5 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
            <div className="flex justify-between">
              <span className="text-slate-400">Left Wheel Velocity (v_L):</span>
              <span className="text-cyan-400 font-bold">{vL.toFixed(1)} m/s</span>
            </div>
            <input
              type="range"
              min={-3}
              max={5}
              step={0.1}
              value={vL}
              onChange={(e) => setVL(parseFloat(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg appearance-none"
            />
          </div>

          {/* Right Wheel Slider */}
          <div className="space-y-1.5 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
            <div className="flex justify-between">
              <span className="text-slate-400">Right Wheel Velocity (v_R):</span>
              <span className="text-cyan-400 font-bold">{vR.toFixed(1)} m/s</span>
            </div>
            <input
              type="range"
              min={-3}
              max={5}
              step={0.1}
              value={vR}
              onChange={(e) => setVR(parseFloat(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg appearance-none"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-between pt-1 flex-wrap gap-2 text-xs font-mono">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-semibold transition-all ${
                isRunning
                  ? 'bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20'
                  : 'bg-cyan-500/15 text-cyan-300 border-cyan-500/40 hover:bg-cyan-500/25'
              }`}
            >
              {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              {isRunning ? 'Pause' : 'Simulate'}
            </button>

            <button
              onClick={reset}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Pose
            </button>

            {/* Quick Motion Presets */}
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-[10px]">
              <span className="text-slate-500 px-1">Presets:</span>
              <button
                onClick={() => {
                  setVL(2.5);
                  setVR(2.5);
                }}
                className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
              >
                Straight
              </button>
              <button
                onClick={() => {
                  setVL(-2);
                  setVR(2);
                }}
                className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
              >
                Spin in Place
              </button>
              <button
                onClick={() => {
                  setVL(1.2);
                  setVR(2.8);
                }}
                className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
              >
                Circle Left
              </button>
            </div>
          </div>

          <button
            onClick={() => setShowAxes(!showAxes)}
            className={`px-2.5 py-1.5 rounded-lg border transition-colors ${
              showAxes
                ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30'
                : 'bg-slate-800 text-slate-500 border-slate-700'
            }`}
          >
            Toggle Frame Axes
          </button>
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Play, Pause, RotateCcw, Crosshair, Radio, Eye } from 'lucide-react';
import { vecNorm, wrapToPi } from '@/lib/math/vector2d';

interface Obstacle {
  x: number;
  y: number;
  radius: number;
}

export function HeroCanvasPreview() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isRunning, setIsRunning] = useState(true);
  const [showRays, setShowRays] = useState(true);
  const [telemetry, setTelemetry] = useState({
    x: 100,
    y: 100,
    theta: 0,
    v: 1.2,
    omega: 0.0,
    distToGoal: 0,
  });

  // State inside ref to avoid re-binding loop
  const simState = useRef({
    robot: {
      x: 120,
      y: 160,
      theta: 0.2,
      radius: 16,
      speed: 1.8,
    },
    goal: { x: 380, y: 160 },
    obstacles: [
      { x: 260, y: 120, radius: 28 },
      { x: 260, y: 220, radius: 24 },
      { x: 180, y: 70, radius: 20 },
    ] as Obstacle[],
    trail: [] as { x: number; y: number }[],
    rays: [] as { x1: number; y1: number; x2: number; y2: number; hit: boolean }[],
    targetWaypoints: [
      { x: 420, y: 140 },
      { x: 380, y: 280 },
      { x: 140, y: 260 },
      { x: 120, y: 100 },
    ],
    wpIndex: 0,
  });

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    simState.current.goal = { x, y };
  };

  const resetSim = useCallback(() => {
    simState.current.robot = {
      x: 100,
      y: 180,
      theta: 0,
      radius: 16,
      speed: 1.8,
    };
    simState.current.goal = { x: 400, y: 180 };
    simState.current.trail = [];
    simState.current.wpIndex = 0;
  }, []);

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

      const state = simState.current;
      const { robot, goal, obstacles } = state;

      if (isRunning) {
        // Simple Pure Pursuit / Kinematic guidance towards current goal
        const dx = goal.x - robot.x;
        const dy = goal.y - robot.y;
        const dist = Math.hypot(dx, dy);

        if (dist < 20) {
          // Switch to next waypoint
          state.wpIndex = (state.wpIndex + 1) % state.targetWaypoints.length;
          state.goal = { ...state.targetWaypoints[state.wpIndex] };
        } else {
          const targetAngle = Math.atan2(dy, dx);
          const angleDiff = wrapToPi(targetAngle - robot.theta);

          // P-controller on heading
          const kP = 3.5;
          const omega = Math.max(-2.5, Math.min(2.5, angleDiff * kP));

          robot.theta = wrapToPi(robot.theta + omega * dt);
          robot.x += Math.cos(robot.theta) * robot.speed * 60 * dt;
          robot.y += Math.sin(robot.theta) * robot.speed * 60 * dt;

          // Add trail
          if (state.trail.length === 0 || vecNorm({ x: state.trail[state.trail.length - 1].x - robot.x, y: state.trail[state.trail.length - 1].y - robot.y }) > 4) {
            state.trail.push({ x: robot.x, y: robot.y });
            if (state.trail.length > 80) state.trail.shift();
          }

          // Compute LiDAR rays
          const numRays = 16;
          const maxRange = 120;
          const rays = [];

          for (let i = 0; i < numRays; i++) {
            const rayAngle = robot.theta - Math.PI / 3 + (i * (2 * Math.PI / 3)) / (numRays - 1);
            let rayDist = maxRange;
            let hit = false;

            // Check obstacle collision along ray
            for (const obs of obstacles) {
              const ox = obs.x - robot.x;
              const oy = obs.y - robot.y;
              const rCos = Math.cos(rayAngle);
              const rSin = Math.sin(rayAngle);
              const proj = ox * rCos + oy * rSin;

              if (proj > 0 && proj < rayDist) {
                const perpSq = ox * ox + oy * oy - proj * proj;
                if (perpSq < obs.radius * obs.radius) {
                  const dHit = proj - Math.sqrt(Math.max(0, obs.radius * obs.radius - perpSq));
                  if (dHit > 0 && dHit < rayDist) {
                    rayDist = dHit;
                    hit = true;
                  }
                }
              }
            }

            rays.push({
              x1: robot.x,
              y1: robot.y,
              x2: robot.x + Math.cos(rayAngle) * rayDist,
              y2: robot.y + Math.sin(rayAngle) * rayDist,
              hit,
            });
          }
          state.rays = rays;

          setTelemetry({
            x: Math.round(robot.x),
            y: Math.round(robot.y),
            theta: Number(robot.theta.toFixed(2)),
            v: Number(robot.speed.toFixed(1)),
            omega: Number(omega.toFixed(2)),
            distToGoal: Math.round(dist),
          });
        }
      }

      // --- Drawing Canvas ---
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Grid Background
      ctx.strokeStyle = 'rgba(51, 65, 85, 0.3)';
      ctx.lineWidth = 1;
      const gridSize = 30;
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

      // 2. Trajectory Trail
      if (state.trail.length > 1) {
        ctx.beginPath();
        ctx.moveTo(state.trail[0].x, state.trail[0].y);
        for (let i = 1; i < state.trail.length; i++) {
          ctx.lineTo(state.trail[i].x, state.trail[i].y);
        }
        ctx.strokeStyle = 'rgba(6, 182, 212, 0.4)';
        ctx.lineWidth = 2.5;
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // 3. Sensor Rays
      if (showRays && state.rays.length > 0) {
        for (const ray of state.rays) {
          ctx.beginPath();
          ctx.moveTo(ray.x1, ray.y1);
          ctx.lineTo(ray.x2, ray.y2);
          ctx.strokeStyle = ray.hit ? 'rgba(244, 63, 94, 0.7)' : 'rgba(34, 211, 238, 0.25)';
          ctx.lineWidth = 1.2;
          ctx.stroke();

          if (ray.hit) {
            ctx.beginPath();
            ctx.arc(ray.x2, ray.y2, 3, 0, Math.PI * 2);
            ctx.fillStyle = '#f43f5e';
            ctx.fill();
          }
        }
      }

      // 4. Obstacles
      for (const obs of obstacles) {
        // Glow effect
        const grad = ctx.createRadialGradient(obs.x, obs.y, 5, obs.x, obs.y, obs.radius);
        grad.addColorStop(0, 'rgba(51, 65, 85, 0.9)');
        grad.addColorStop(1, 'rgba(30, 41, 59, 0.95)');

        ctx.beginPath();
        ctx.arc(obs.x, obs.y, obs.radius, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.strokeStyle = 'rgba(148, 163, 184, 0.4)';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Cross pattern in obstacle
        ctx.beginPath();
        ctx.moveTo(obs.x - 6, obs.y);
        ctx.lineTo(obs.x + 6, obs.y);
        ctx.moveTo(obs.x, obs.y - 6);
        ctx.lineTo(obs.x, obs.y + 6);
        ctx.strokeStyle = 'rgba(148, 163, 184, 0.3)';
        ctx.stroke();
      }

      // 5. Goal Target
      ctx.beginPath();
      ctx.arc(goal.x, goal.y, 8, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(16, 185, 129, 0.2)';
      ctx.fill();
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(goal.x, goal.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#10b981';
      ctx.fill();

      // 6. Robot Chassis & Coordinate Frame
      ctx.save();
      ctx.translate(robot.x, robot.y);
      ctx.rotate(robot.theta);

      // Chassis circle
      ctx.beginPath();
      ctx.arc(0, 0, robot.radius, 0, Math.PI * 2);
      ctx.fillStyle = '#0f172a';
      ctx.fill();
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Wheels
      ctx.fillStyle = '#64748b';
      ctx.fillRect(-6, -robot.radius - 2, 12, 4);
      ctx.fillRect(-6, robot.radius - 2, 12, 4);

      // Heading indicator (arrow)
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(robot.radius + 6, 0);
      ctx.strokeStyle = '#22d3ee';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // X-axis (red/cyan) & Y-axis (green)
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, -10);
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [isRunning, showRays]);

  return (
    <div className="relative w-full rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl overflow-hidden group">
      {/* Top HUD bar */}
      <div className="px-4 py-2.5 bg-slate-900/90 border-b border-slate-800/80 flex items-center justify-between flex-wrap gap-2 text-xs font-mono text-slate-300">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isRunning ? 'bg-cyan-400' : 'bg-amber-400'} opacity-75`}></span>
            <span className={`relative inline-flex rounded-full h-2 w-2 ${isRunning ? 'bg-cyan-500' : 'bg-amber-500'}`}></span>
          </span>
          <span className="font-semibold text-cyan-400">SE(2) Kinematic Simulator</span>
          <span className="text-slate-500 hidden sm:inline">| Pure Pursuit & LiDAR</span>
        </div>

        <div className="flex items-center gap-3 text-[11px] text-slate-400">
          <span>x: <strong className="text-slate-200">{telemetry.x}</strong></span>
          <span>y: <strong className="text-slate-200">{telemetry.y}</strong></span>
          <span>θ: <strong className="text-slate-200">{telemetry.theta} rad</strong></span>
          <span className="hidden md:inline">dist: <strong className="text-emerald-400">{telemetry.distToGoal}px</strong></span>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="relative aspect-[16/9] w-full max-h-[380px] cursor-crosshair">
        <canvas
          ref={canvasRef}
          width={520}
          height={320}
          onClick={handleCanvasClick}
          className="w-full h-full block"
        />

        {/* Floating click instruction */}
        <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-mono text-slate-400 border border-slate-800 pointer-events-none flex items-center gap-1.5">
          <Crosshair className="w-3 h-3 text-cyan-400" />
          <span>Click anywhere to redirect robot waypoint</span>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="px-4 py-3 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between flex-wrap gap-2 text-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 transition-colors font-mono font-medium"
          >
            {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            {isRunning ? 'Pause' : 'Play'}
          </button>
          <button
            onClick={resetSim}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors font-mono"
            title="Reset Robot & Path"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
          <button
            onClick={() => setShowRays(!showRays)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-mono transition-colors ${
              showRays
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            LiDAR Rays
          </button>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
          <Eye className="w-3.5 h-3.5 text-cyan-400" />
          <span>60 FPS Client-Side Engine</span>
        </div>
      </div>
    </div>
  );
}

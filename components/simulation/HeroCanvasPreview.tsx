'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Crosshair,
  Radio,
  Sliders,
  Sparkles,
  Gauge,
  Compass,
  Zap,
  Layers,
} from 'lucide-react';
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
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [currentScenario, setCurrentScenario] = useState<'arena' | 'corridor' | 'slalom'>('arena');
  const [telemetry, setTelemetry] = useState({
    x: 120,
    y: 160,
    theta: 0.2,
    v: 1.8,
    omega: 0.0,
    distToGoal: 0,
    fps: 60,
  });

  const simState = useRef({
    robot: {
      x: 100,
      y: 160,
      theta: 0,
      radius: 16,
      baseSpeed: 1.8,
    },
    goal: { x: 420, y: 160 },
    obstacles: [
      { x: 260, y: 110, radius: 28 },
      { x: 260, y: 220, radius: 26 },
      { x: 170, y: 65, radius: 20 },
      { x: 380, y: 260, radius: 22 },
    ] as Obstacle[],
    trail: [] as { x: number; y: number }[],
    rays: [] as { x1: number; y1: number; x2: number; y2: number; hit: boolean }[],
    waypoints: [
      { x: 440, y: 120 },
      { x: 400, y: 270 },
      { x: 150, y: 260 },
      { x: 100, y: 100 },
    ],
    wpIndex: 0,
  });

  const loadScenario = (scenario: 'arena' | 'corridor' | 'slalom') => {
    setCurrentScenario(scenario);
    simState.current.trail = [];
    simState.current.wpIndex = 0;

    if (scenario === 'arena') {
      simState.current.robot = { x: 100, y: 160, theta: 0, radius: 16, baseSpeed: 1.8 };
      simState.current.obstacles = [
        { x: 260, y: 110, radius: 28 },
        { x: 260, y: 220, radius: 26 },
        { x: 170, y: 65, radius: 20 },
        { x: 380, y: 260, radius: 22 },
      ];
      simState.current.waypoints = [
        { x: 440, y: 120 },
        { x: 400, y: 270 },
        { x: 150, y: 260 },
        { x: 100, y: 100 },
      ];
      simState.current.goal = { ...simState.current.waypoints[0] };
    } else if (scenario === 'corridor') {
      simState.current.robot = { x: 70, y: 160, theta: 0, radius: 16, baseSpeed: 2.0 };
      simState.current.obstacles = [
        { x: 200, y: 80, radius: 45 },
        { x: 200, y: 240, radius: 45 },
        { x: 340, y: 80, radius: 45 },
        { x: 340, y: 240, radius: 45 },
      ];
      simState.current.waypoints = [
        { x: 460, y: 160 },
        { x: 70, y: 160 },
      ];
      simState.current.goal = { ...simState.current.waypoints[0] };
    } else {
      // Slalom
      simState.current.robot = { x: 60, y: 160, theta: 0, radius: 16, baseSpeed: 2.2 };
      simState.current.obstacles = [
        { x: 160, y: 160, radius: 25 },
        { x: 260, y: 160, radius: 25 },
        { x: 360, y: 160, radius: 25 },
      ];
      simState.current.waypoints = [
        { x: 160, y: 90 },
        { x: 260, y: 230 },
        { x: 360, y: 90 },
        { x: 460, y: 160 },
        { x: 360, y: 230 },
        { x: 260, y: 90 },
        { x: 160, y: 230 },
        { x: 60, y: 160 },
      ];
      simState.current.goal = { ...simState.current.waypoints[0] };
    }
  };

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
    loadScenario(currentScenario);
  }, [currentScenario]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let lastFrame = performance.now();
    let frameCount = 0;
    let lastFpsUpdate = performance.now();

    const render = (time: number) => {
      const dt = Math.min((time - lastFrame) / 1000, 0.1) * speedMultiplier;
      lastFrame = time;

      frameCount++;
      if (time - lastFpsUpdate > 500) {
        lastFpsUpdate = time;
        frameCount = 0;
      }

      const state = simState.current;
      const { robot, goal, obstacles } = state;

      if (isRunning) {
        const dx = goal.x - robot.x;
        const dy = goal.y - robot.y;
        const dist = Math.hypot(dx, dy);

        if (dist < 22) {
          state.wpIndex = (state.wpIndex + 1) % state.waypoints.length;
          state.goal = { ...state.waypoints[state.wpIndex] };
        } else {
          const targetAngle = Math.atan2(dy, dx);
          const angleDiff = wrapToPi(targetAngle - robot.theta);

          const kP = 3.6;
          const omega = Math.max(-2.8, Math.min(2.8, angleDiff * kP));

          robot.theta = wrapToPi(robot.theta + omega * dt);
          robot.x += Math.cos(robot.theta) * robot.baseSpeed * 60 * dt;
          robot.y += Math.sin(robot.theta) * robot.baseSpeed * 60 * dt;

          if (
            state.trail.length === 0 ||
            vecNorm({
              x: state.trail[state.trail.length - 1].x - robot.x,
              y: state.trail[state.trail.length - 1].y - robot.y,
            }) > 3.5
          ) {
            state.trail.push({ x: robot.x, y: robot.y });
            if (state.trail.length > 90) state.trail.shift();
          }

          // LiDAR Raycasting
          const numRays = 18;
          const maxRange = 130;
          const rays = [];

          for (let i = 0; i < numRays; i++) {
            const rayAngle =
              robot.theta - Math.PI / 3 + (i * (2 * Math.PI / 3)) / (numRays - 1);
            let rayDist = maxRange;
            let hit = false;

            for (const obs of obstacles) {
              const ox = obs.x - robot.x;
              const oy = obs.y - robot.y;
              const rCos = Math.cos(rayAngle);
              const rSin = Math.sin(rayAngle);
              const proj = ox * rCos + oy * rSin;

              if (proj > 0 && proj < rayDist) {
                const perpSq = ox * ox + oy * oy - proj * proj;
                if (perpSq < obs.radius * obs.radius) {
                  const dHit =
                    proj - Math.sqrt(Math.max(0, obs.radius * obs.radius - perpSq));
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
            v: Number((robot.baseSpeed * speedMultiplier).toFixed(1)),
            omega: Number(omega.toFixed(2)),
            distToGoal: Math.round(dist),
            fps: 60,
          });
        }
      }

      // Render
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Grid
      ctx.strokeStyle = 'rgba(51, 65, 85, 0.25)';
      ctx.lineWidth = 1;
      const gridSize = 28;
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

      // Trail
      if (state.trail.length > 1) {
        ctx.beginPath();
        ctx.moveTo(state.trail[0].x, state.trail[0].y);
        for (let i = 1; i < state.trail.length; i++) {
          ctx.lineTo(state.trail[i].x, state.trail[i].y);
        }
        ctx.strokeStyle = 'rgba(6, 182, 212, 0.45)';
        ctx.lineWidth = 2.5;
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Sensor Rays
      if (showRays && state.rays.length > 0) {
        for (const ray of state.rays) {
          ctx.beginPath();
          ctx.moveTo(ray.x1, ray.y1);
          ctx.lineTo(ray.x2, ray.y2);
          ctx.strokeStyle = ray.hit
            ? 'rgba(244, 63, 94, 0.85)'
            : 'rgba(34, 211, 238, 0.25)';
          ctx.lineWidth = 1.2;
          ctx.stroke();

          if (ray.hit) {
            ctx.beginPath();
            ctx.arc(ray.x2, ray.y2, 3.5, 0, Math.PI * 2);
            ctx.fillStyle = '#f43f5e';
            ctx.fill();
          }
        }
      }

      // Obstacles
      for (const obs of obstacles) {
        const grad = ctx.createRadialGradient(obs.x, obs.y, 4, obs.x, obs.y, obs.radius);
        grad.addColorStop(0, '#1e293b');
        grad.addColorStop(1, '#0f172a');

        ctx.beginPath();
        ctx.arc(obs.x, obs.y, obs.radius, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.strokeStyle = 'rgba(148, 163, 184, 0.4)';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(obs.x - 6, obs.y);
        ctx.lineTo(obs.x + 6, obs.y);
        ctx.moveTo(obs.x, obs.y - 6);
        ctx.lineTo(obs.x, obs.y + 6);
        ctx.strokeStyle = 'rgba(148, 163, 184, 0.3)';
        ctx.stroke();
      }

      // Goal Waypoint
      ctx.beginPath();
      ctx.arc(goal.x, goal.y, 10, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(16, 185, 129, 0.15)';
      ctx.fill();
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(goal.x, goal.y, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = '#10b981';
      ctx.fill();

      // Robot
      ctx.save();
      ctx.translate(robot.x, robot.y);
      ctx.rotate(robot.theta);

      ctx.beginPath();
      ctx.arc(0, 0, robot.radius, 0, Math.PI * 2);
      ctx.fillStyle = '#090d16';
      ctx.fill();
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Wheels
      ctx.fillStyle = '#64748b';
      ctx.fillRect(-7, -robot.radius - 2.5, 14, 5);
      ctx.fillRect(-7, robot.radius - 2.5, 14, 5);

      // Orientation Heading
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(robot.radius + 6, 0);
      ctx.strokeStyle = '#22d3ee';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [isRunning, showRays, speedMultiplier]);

  return (
    <div className="relative w-full rounded-2xl bg-slate-950 border border-slate-800/90 shadow-2xl overflow-hidden glass-panel">
      {/* Top HUD */}
      <div className="px-4 py-3 bg-slate-900/80 border-b border-slate-800/80 flex items-center justify-between flex-wrap gap-2 text-xs font-mono text-slate-300">
        <div className="flex items-center gap-2">
          <span className="flex h-2.5 w-2.5 relative">
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full ${
                isRunning ? 'bg-cyan-400' : 'bg-amber-400'
              } opacity-75`}
            ></span>
            <span
              className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                isRunning ? 'bg-cyan-500' : 'bg-amber-500'
              }`}
            ></span>
          </span>
          <span className="font-bold text-cyan-400">Pure Pursuit & LiDAR Kinematics</span>
        </div>

        {/* Scenario Switcher */}
        <div className="flex items-center gap-1 bg-slate-950/70 p-1 rounded-lg border border-slate-800 text-[11px]">
          <span className="text-slate-500 px-1.5 hidden sm:inline">Map:</span>
          {(['arena', 'corridor', 'slalom'] as const).map((sc) => (
            <button
              key={sc}
              onClick={() => loadScenario(sc)}
              className={`px-2 py-0.5 rounded capitalize transition-all ${
                currentScenario === sc
                  ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {sc}
            </button>
          ))}
        </div>
      </div>

      {/* Main Canvas Viewport */}
      <div className="relative aspect-[16/9] w-full max-h-[360px] cursor-crosshair bg-[#060911]">
        <canvas
          ref={canvasRef}
          width={520}
          height={320}
          onClick={handleCanvasClick}
          className="w-full h-full block"
        />

        <div className="absolute top-3 left-3 bg-slate-900/85 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-mono text-slate-300 border border-slate-700/60 pointer-events-none flex items-center gap-1.5 shadow-md">
          <Crosshair className="w-3.5 h-3.5 text-cyan-400" />
          <span>Click anywhere on canvas to direct robot</span>
        </div>
      </div>

      {/* Telemetry Dashboard Strip */}
      <div className="grid grid-cols-4 border-t border-slate-800/80 bg-slate-900/40 text-center py-2 px-3 divide-x divide-slate-800/60 text-xs font-mono">
        <div>
          <span className="text-[10px] text-slate-500 block">Position (X, Y)</span>
          <span className="text-slate-200 font-semibold">{telemetry.x}, {telemetry.y}</span>
        </div>
        <div>
          <span className="text-[10px] text-slate-500 block">Heading (θ)</span>
          <span className="text-slate-200 font-semibold">{telemetry.theta} rad</span>
        </div>
        <div>
          <span className="text-[10px] text-slate-500 block">Speed (v)</span>
          <span className="text-cyan-400 font-semibold">{telemetry.v} m/s</span>
        </div>
        <div>
          <span className="text-[10px] text-slate-500 block">Target Distance</span>
          <span className="text-emerald-400 font-semibold">{telemetry.distToGoal} px</span>
        </div>
      </div>

      {/* Interactive Controls Toolbar */}
      <div className="px-4 py-3 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between flex-wrap gap-3 text-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-mono font-semibold transition-all ${
              isRunning
                ? 'bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20'
                : 'bg-cyan-500/15 text-cyan-300 border-cyan-500/40 hover:bg-cyan-500/25 shadow-lg shadow-cyan-500/10'
            }`}
          >
            {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            {isRunning ? 'Pause' : 'Resume'}
          </button>

          <button
            onClick={resetSim}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors font-mono"
            title="Reset Robot & Waypoints"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>

          <button
            onClick={() => setShowRays(!showRays)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-mono transition-all ${
              showRays
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                : 'bg-slate-800/60 text-slate-500 border-slate-700'
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            LiDAR Rays
          </button>
        </div>

        {/* Speed Toggle */}
        <div className="flex items-center gap-1.5 bg-slate-950/80 p-1 rounded-lg border border-slate-800 font-mono text-[11px]">
          <span className="text-slate-500 px-1">Speed:</span>
          {[1, 1.5, 2].map((s) => (
            <button
              key={s}
              onClick={() => setSpeedMultiplier(s)}
              className={`px-2 py-0.5 rounded transition-colors ${
                speedMultiplier === s
                  ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {s}x
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

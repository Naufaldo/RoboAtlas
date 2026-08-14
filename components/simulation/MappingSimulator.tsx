'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw, Layers, Sliders, Radio, Sparkles } from 'lucide-react';
import { wrapToPi } from '@/lib/math/vector2d';

const OBSTACLES = [
  { x: 130, y: 90, r: 24 },
  { x: 380, y: 100, r: 30 },
  { x: 260, y: 220, r: 28 },
  { x: 100, y: 240, r: 20 },
  { x: 420, y: 230, r: 25 },
];

export function MappingSimulator() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isRunning, setIsRunning] = useState(true);
  const [numRays, setNumRays] = useState(36);
  const [lidarRange, setLidarRange] = useState(130);

  const GRID_SIZE = 10;
  const GRID_COLS = 52;
  const GRID_ROWS = 32;

  const obstacles = OBSTACLES;

  // Log-odds grid: 0 = unknown (P=0.5), positive = occupied (P > 0.5), negative = free (P < 0.5)
  const logOddsGrid = useRef<Float32Array>(new Float32Array(GRID_COLS * GRID_ROWS));

  const state = useRef({
    robot: { x: 260, y: 160, theta: 0 },
    trail: [] as { x: number; y: number }[],
    rays: [] as { x1: number; y1: number; x2: number; y2: number; hit: boolean }[],
  });

  const reset = useCallback(() => {
    logOddsGrid.current.fill(0);
    state.current.robot = { x: 260, y: 160, theta: 0 };
    state.current.trail = [];
    state.current.rays = [];
  }, []);

  useEffect(() => {
    reset();
  }, [reset]);

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

      const s = state.current;
      const { robot } = s;
      const grid = logOddsGrid.current;

      if (isRunning) {
        // Patrol in an S-curve loop
        const t = time * 0.0008;
        const targetX = 260 + 160 * Math.sin(t);
        const targetY = 160 + 80 * Math.cos(2 * t);

        const dx = targetX - robot.x;
        const dy = targetY - robot.y;
        const targetHeading = Math.atan2(dy, dx);
        const headingDiff = wrapToPi(targetHeading - robot.theta);

        robot.theta = wrapToPi(robot.theta + headingDiff * 4 * dt);
        robot.x += Math.cos(robot.theta) * 45 * dt;
        robot.y += Math.sin(robot.theta) * 45 * dt;

        s.trail.push({ x: robot.x, y: robot.y });
        if (s.trail.length > 150) s.trail.shift();

        // 360 Degree LiDAR Raycasting & Inverse Sensor Model
        const l_occ = 0.85; // log odds increment for hit
        const l_free = -0.4; // log odds decrement for free ray cells
        const rays = [];

        for (let i = 0; i < numRays; i++) {
          const angle = robot.theta + (i * 2 * Math.PI) / numRays;
          let hitDist = lidarRange;
          let hit = false;

          // Wall boundary checks
          if (Math.cos(angle) > 0) {
            const d = (canvas.width - 15 - robot.x) / Math.cos(angle);
            if (d > 0 && d < hitDist) {
              hitDist = d;
              hit = true;
            }
          } else if (Math.cos(angle) < 0) {
            const d = (15 - robot.x) / Math.cos(angle);
            if (d > 0 && d < hitDist) {
              hitDist = d;
              hit = true;
            }
          }

          if (Math.sin(angle) > 0) {
            const d = (canvas.height - 15 - robot.y) / Math.sin(angle);
            if (d > 0 && d < hitDist) {
              hitDist = d;
              hit = true;
            }
          } else if (Math.sin(angle) < 0) {
            const d = (15 - robot.y) / Math.sin(angle);
            if (d > 0 && d < hitDist) {
              hitDist = d;
              hit = true;
            }
          }

          // Obstacle raycasting
          for (const obs of OBSTACLES) {
            const ox = obs.x - robot.x;
            const oy = obs.y - robot.y;
            const rCos = Math.cos(angle);
            const rSin = Math.sin(angle);
            const proj = ox * rCos + oy * rSin;

            if (proj > 0 && proj < hitDist) {
              const perpSq = ox * ox + oy * oy - proj * proj;
              if (perpSq < obs.r * obs.r) {
                const dHit = proj - Math.sqrt(Math.max(0, obs.r * obs.r - perpSq));
                if (dHit > 0 && dHit < hitDist) {
                  hitDist = dHit;
                  hit = true;
                }
              }
            }
          }

          const endX = robot.x + Math.cos(angle) * hitDist;
          const endY = robot.y + Math.sin(angle) * hitDist;
          rays.push({ x1: robot.x, y1: robot.y, x2: endX, y2: endY, hit });

          // Update Log-Odds Grid along ray path (Bresenham/DDA sampling)
          const steps = Math.floor(hitDist / GRID_SIZE);
          for (let step = 1; step < steps; step++) {
            const sampleX = robot.x + Math.cos(angle) * step * GRID_SIZE;
            const sampleY = robot.y + Math.sin(angle) * step * GRID_SIZE;
            const gc = Math.floor(sampleX / GRID_SIZE);
            const gr = Math.floor(sampleY / GRID_SIZE);
            if (gc >= 0 && gc < GRID_COLS && gr >= 0 && gr < GRID_ROWS) {
              const idx = gr * GRID_COLS + gc;
              grid[idx] = Math.max(-4.0, grid[idx] + l_free * 0.35);
            }
          }

          // Mark endpoint occupied
          if (hit) {
            const gc = Math.floor(endX / GRID_SIZE);
            const gr = Math.floor(endY / GRID_SIZE);
            if (gc >= 0 && gc < GRID_COLS && gr >= 0 && gr < GRID_ROWS) {
              const idx = gr * GRID_COLS + gc;
              grid[idx] = Math.min(5.0, grid[idx] + l_occ * 0.5);
            }
          }
        }
        s.rays = rays;
      }

      // Drawing
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Render Occupancy Grid Cells
      for (let r = 0; r < GRID_ROWS; r++) {
        for (let c = 0; c < GRID_COLS; c++) {
          const l = grid[r * GRID_COLS + c];
          if (Math.abs(l) < 0.05) {
            // Unknown (unexplored)
            ctx.fillStyle = '#060913';
          } else if (l < 0) {
            // Free space (electric dark blue)
            const alpha = Math.min(0.6, Math.abs(l) / 4.0);
            ctx.fillStyle = `rgba(14, 165, 233, ${alpha * 0.4})`;
          } else {
            // Occupied (white/cyan)
            const alpha = Math.min(1.0, l / 3.0);
            ctx.fillStyle = `rgba(241, 245, 249, ${alpha})`;
          }
          ctx.fillRect(c * GRID_SIZE, r * GRID_SIZE, GRID_SIZE, GRID_SIZE);
        }
      }

      // Grid Lines
      ctx.strokeStyle = 'rgba(51, 65, 85, 0.15)';
      ctx.lineWidth = 0.8;
      for (let x = 0; x < canvas.width; x += GRID_SIZE) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += GRID_SIZE) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Ground truth obstacles (faint outline)
      for (const obs of OBSTACLES) {
        ctx.beginPath();
        ctx.arc(obs.x, obs.y, obs.r, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(100, 116, 139, 0.4)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // LiDAR Rays
      for (const ray of s.rays) {
        ctx.beginPath();
        ctx.moveTo(ray.x1, ray.y1);
        ctx.lineTo(ray.x2, ray.y2);
        ctx.strokeStyle = ray.hit ? 'rgba(244, 63, 94, 0.7)' : 'rgba(6, 182, 212, 0.2)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Robot
      ctx.beginPath();
      ctx.arc(robot.x, robot.y, 12, 0, Math.PI * 2);
      ctx.fillStyle = '#090d16';
      ctx.fill();
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(robot.x, robot.y);
      ctx.lineTo(robot.x + Math.cos(robot.theta) * 18, robot.y + Math.sin(robot.theta) * 18);
      ctx.strokeStyle = '#00f2fe';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [isRunning, lidarRange, numRays]);

  return (
    <div className="rounded-2xl glass-panel border border-slate-800/90 overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="px-4 py-3 bg-slate-900/80 border-b border-slate-800/80 flex items-center justify-between flex-wrap gap-2 text-xs font-mono">
        <div className="flex items-center gap-2 text-cyan-400 font-bold">
          <Layers className="w-4 h-4" />
          <span>Log-Odds Occupancy Grid Mapping Laboratory</span>
        </div>

        <div className="flex items-center gap-4 text-[11px] text-slate-300">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 bg-slate-100 rounded-sm" /> Occupied ($P \to 1.0$)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 bg-sky-600/40 rounded-sm" /> Free ($P \to 0.0$)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 bg-[#060913] border border-slate-800 rounded-sm" /> Unknown ($P = 0.5$)
          </span>
        </div>
      </div>

      {/* Canvas */}
      <div className="relative aspect-[16/9] w-full max-h-[340px] bg-[#060913]">
        <canvas ref={canvasRef} width={520} height={320} className="w-full h-full block" />
      </div>

      {/* Controls */}
      <div className="p-4 bg-slate-900/90 border-t border-slate-800 space-y-3 text-xs font-mono">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800 space-y-1.5">
            <div className="flex justify-between text-slate-300">
              <span>LiDAR Ray Count:</span>
              <span className="text-cyan-400 font-bold">{numRays} rays / 360°</span>
            </div>
            <input
              type="range"
              min={12}
              max={72}
              step={6}
              value={numRays}
              onChange={(e) => setNumRays(parseInt(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg appearance-none"
            />
          </div>

          <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800 space-y-1.5">
            <div className="flex justify-between text-slate-300">
              <span>Max Sensor Range:</span>
              <span className="text-emerald-400 font-bold">{lidarRange} px</span>
            </div>
            <input
              type="range"
              min={80}
              max={200}
              step={10}
              value={lidarRange}
              onChange={(e) => setLidarRange(parseInt(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg appearance-none"
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-1 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-semibold transition-all ${
                isRunning
                  ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                  : 'bg-cyan-500/15 text-cyan-300 border-cyan-500/40'
              }`}
            >
              {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              {isRunning ? 'Pause' : 'Resume'}
            </button>

            <button
              onClick={reset}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Clear Grid Map
            </button>
          </div>

          <div className="text-[11px] text-slate-400">
            Log-odds Bayesian updates transform continuous sensor beams into discrete spatial probabilities.
          </div>
        </div>
      </div>
    </div>
  );
}

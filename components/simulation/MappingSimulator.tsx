'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw, Layers, Sliders, Radio, Sparkles } from 'lucide-react';
import { wrapToPi } from '@/lib/math/vector2d';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useTheme } from '@/lib/theme/ThemeContext';

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

  const { theme } = useTheme();
  const { locale } = useLanguage();
  const isId = locale === 'id';

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
    const isLight = theme === 'light';

    const render = (time: number) => {
      const dt = Math.min((time - lastFrame) / 1000, 0.1);
      lastFrame = time;

      const s = state.current;
      const { robot } = s;

      if (isRunning) {
        // Move robot in smooth figure-8 trajectory
        const speed = 40;
        const omega = 0.45;
        robot.theta = wrapToPi(robot.theta + omega * dt);
        robot.x += speed * Math.cos(robot.theta) * dt;
        robot.y += speed * Math.sin(robot.theta) * dt;

        // Keep inside bounds
        if (robot.x < 50) robot.x = 50;
        if (robot.x > 470) robot.x = 470;
        if (robot.y < 50) robot.y = 50;
        if (robot.y > 270) robot.y = 270;

        // Perform 360-degree LiDAR raycasting & Log-Odds updates
        const rays = [];
        const lOcc = 0.85; // log-odds evidence for hit cell
        const lFree = -0.4; // log-odds evidence for passed cells

        for (let i = 0; i < numRays; i++) {
          const rayAngle = (i / numRays) * 2 * Math.PI;
          let rayDist = lidarRange;
          let hit = false;

          for (const obs of obstacles) {
            const ox = obs.x - robot.x;
            const oy = obs.y - robot.y;
            const rCos = Math.cos(rayAngle);
            const rSin = Math.sin(rayAngle);
            const proj = ox * rCos + oy * rSin;

            if (proj > 0 && proj < rayDist) {
              const perpSq = ox * ox + oy * oy - proj * proj;
              if (perpSq < obs.r * obs.r) {
                const dHit = proj - Math.sqrt(Math.max(0, obs.r * obs.r - perpSq));
                if (dHit > 0 && dHit < rayDist) {
                  rayDist = dHit;
                  hit = true;
                }
              }
            }
          }

          // Wall boundary checks
          const endX = robot.x + Math.cos(rayAngle) * rayDist;
          const endY = robot.y + Math.sin(rayAngle) * rayDist;

          rays.push({
            x1: robot.x,
            y1: robot.y,
            x2: endX,
            y2: endY,
            hit,
          });

          // Bresenham-like ray marching on the log-odds grid
          const steps = Math.floor(rayDist / (GRID_SIZE * 0.7));
          for (let step = 1; step <= steps; step++) {
            const frac = step / steps;
            const mx = robot.x + (endX - robot.x) * frac;
            const my = robot.y + (endY - robot.y) * frac;

            const gc = Math.floor(mx / GRID_SIZE);
            const gr = Math.floor(my / GRID_SIZE);

            if (gc >= 0 && gc < GRID_COLS && gr >= 0 && gr < GRID_ROWS) {
              const idx = gr * GRID_COLS + gc;
              if (step === steps && hit) {
                logOddsGrid.current[idx] = Math.min(
                  5.0,
                  logOddsGrid.current[idx] + lOcc
                );
              } else {
                logOddsGrid.current[idx] = Math.max(
                  -5.0,
                  logOddsGrid.current[idx] + lFree
                );
              }
            }
          }
        }
        s.rays = rays;
      }

      // RENDER
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background
      ctx.fillStyle = isLight ? '#f1f5f9' : '#060913';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 1. Draw Occupancy Grid Probability Heatmap
      for (let r = 0; r < GRID_ROWS; r++) {
        for (let c = 0; c < GRID_COLS; c++) {
          const idx = r * GRID_COLS + c;
          const lVal = logOddsGrid.current[idx];

          if (Math.abs(lVal) > 0.05) {
            // P = 1 - 1 / (1 + exp(l))
            const p = 1 - 1 / (1 + Math.exp(lVal));

            if (p > 0.6) {
              // Occupied (White/Slate)
              const alpha = Math.min(1.0, (p - 0.5) * 2);
              ctx.fillStyle = isLight ? `rgba(15, 23, 42, ${alpha})` : `rgba(248, 250, 252, ${alpha * 0.9})`;
              ctx.fillRect(c * GRID_SIZE, r * GRID_SIZE, GRID_SIZE, GRID_SIZE);
            } else if (p < 0.4) {
              // Free (Sky blue tint)
              const alpha = Math.min(0.7, (0.5 - p) * 1.5);
              ctx.fillStyle = isLight ? `rgba(2, 132, 199, ${alpha * 0.25})` : `rgba(14, 165, 233, ${alpha * 0.25})`;
              ctx.fillRect(c * GRID_SIZE, r * GRID_SIZE, GRID_SIZE, GRID_SIZE);
            }
          }
        }
      }

      // 2. Draw Real Obstacles (Outlines)
      for (const obs of obstacles) {
        ctx.beginPath();
        ctx.arc(obs.x, obs.y, obs.r, 0, Math.PI * 2);
        ctx.strokeStyle = isLight ? 'rgba(71, 85, 105, 0.4)' : 'rgba(148, 163, 184, 0.3)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // 3. Draw Active LiDAR Rays
      for (const ray of s.rays) {
        ctx.beginPath();
        ctx.moveTo(ray.x1, ray.y1);
        ctx.lineTo(ray.x2, ray.y2);
        ctx.strokeStyle = ray.hit
          ? 'rgba(244, 63, 94, 0.7)'
          : isLight
          ? 'rgba(2, 132, 199, 0.25)'
          : 'rgba(6, 182, 212, 0.2)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Robot
      ctx.beginPath();
      ctx.arc(robot.x, robot.y, 12, 0, Math.PI * 2);
      ctx.fillStyle = isLight ? '#ffffff' : '#090d16';
      ctx.fill();
      ctx.strokeStyle = isLight ? '#0284c7' : '#06b6d4';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(robot.x, robot.y);
      ctx.lineTo(robot.x + Math.cos(robot.theta) * 18, robot.y + Math.sin(robot.theta) * 18);
      ctx.strokeStyle = isLight ? '#0284c7' : '#00f2fe';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [isRunning, lidarRange, numRays, theme]);

  return (
    <div className="rounded-2xl glass-panel border border-slate-200 dark:border-slate-800/90 overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="px-4 py-3 bg-slate-100/90 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800/80 flex items-center justify-between flex-wrap gap-2 text-xs font-mono text-slate-800 dark:text-slate-200">
        <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-bold">
          <Layers className="w-4 h-4" />
          <span>{isId ? 'Laboratorium Pemetaan Grid Okupansi Log-Odds' : 'Log-Odds Occupancy Grid Mapping Laboratory'}</span>
        </div>

        <div className="flex items-center gap-3 text-[11px] text-slate-700 dark:text-slate-300">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 bg-slate-800 dark:bg-slate-100 rounded-sm" /> {isId ? 'Terisi (P -> 1)' : 'Occupied (P -> 1)'}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 bg-sky-500/40 rounded-sm" /> {isId ? 'Bebas (P -> 0)' : 'Free (P -> 0)'}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 bg-slate-300 dark:bg-[#060913] border border-slate-400 dark:border-slate-800 rounded-sm" /> {isId ? 'Tidak Diketahui (P = 0.5)' : 'Unknown (P = 0.5)'}
          </span>
        </div>
      </div>

      {/* Canvas */}
      <div className="relative aspect-[16/9] w-full max-h-[340px] bg-[#f1f5f9] dark:bg-[#060913]">
        <canvas ref={canvasRef} width={520} height={320} className="w-full h-full block" />
      </div>

      {/* Controls */}
      <div className="p-4 bg-slate-50 dark:bg-slate-900/90 border-t border-slate-200 dark:border-slate-800 space-y-3 text-xs font-mono">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-slate-950/60 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1.5">
            <div className="flex justify-between text-slate-700 dark:text-slate-300">
              <span>{isId ? 'Jumlah Sinar LiDAR:' : 'LiDAR Ray Count:'}</span>
              <span className="text-cyan-600 dark:text-cyan-400 font-bold">{numRays} rays / 360°</span>
            </div>
            <input
              type="range"
              min={12}
              max={72}
              step={6}
              value={numRays}
              onChange={(e) => setNumRays(parseInt(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none"
            />
          </div>

          <div className="bg-white dark:bg-slate-950/60 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1.5">
            <div className="flex justify-between text-slate-700 dark:text-slate-300">
              <span>{isId ? 'Jarak Maksimum Sensor:' : 'Max Sensor Range:'}</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">{lidarRange} px</span>
            </div>
            <input
              type="range"
              min={80}
              max={200}
              step={10}
              value={lidarRange}
              onChange={(e) => setLidarRange(parseInt(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none"
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-1 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-semibold transition-all ${
                isRunning
                  ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30'
                  : 'bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border-cyan-500/40'
              }`}
            >
              {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              {isRunning ? (isId ? 'Jeda' : 'Pause') : (isId ? 'Lanjutkan' : 'Resume')}
            </button>

            <button
              onClick={reset}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              {isId ? 'Bersihkan Peta Grid' : 'Clear Grid Map'}
            </button>
          </div>

          <div className="text-[11px] text-slate-500 dark:text-slate-400">
            {isId ? 'Pembaruan Bayesian log-odds mengubah berkas sinar sensor menjadi probabilitas spasial.' : 'Log-odds Bayesian updates transform continuous sensor beams into discrete spatial probabilities.'}
          </div>
        </div>
      </div>
    </div>
  );
}

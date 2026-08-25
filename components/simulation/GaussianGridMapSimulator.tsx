'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw, Sparkles, Layers, Sliders, Info, ShieldAlert } from 'lucide-react';
import { InlineMath } from '@/components/mathematics/MathBlock';

interface Obstacle {
  x: number;
  y: number;
  r: number;
}

export function GaussianGridMapSimulator() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isRunning, setIsRunning] = useState(true);
  const [sigma, setSigma] = useState(0.8); // Gaussian kernel standard deviation
  const [kernelRadius, setKernelRadius] = useState(3); // Grid cells to propagate kernel
  const [numRays, setNumRays] = useState(36); // LiDAR beam count
  const [maxRange, setMaxRange] = useState(12.0); // meters

  // Robot State
  const [robotPose, setRobotPose] = useState<{ x: number; y: number; theta: number }>({
    x: 0,
    y: 0,
    theta: 0,
  });

  // Grid Map parameters
  const gridSize = 60; // 60x60 grid cells
  const cellSize = 0.5; // 0.5 meter per cell
  const halfExtent = (gridSize * cellSize) / 2; // 15m to -15m

  // Grid Density 2D Array
  const gridDensityRef = useRef<Float32Array>(new Float32Array(gridSize * gridSize));

  // Default Obstacles in World Coordinates
  const [obstacles, setObstacles] = useState<Obstacle[]>([
    { x: 5, y: 5, r: 1.8 },
    { x: -6, y: 4, r: 2.0 },
    { x: -5, y: -6, r: 1.5 },
    { x: 6, y: -5, r: 2.2 },
    { x: 0, y: 8, r: 1.2 },
  ]);

  // Clear Map
  const handleClearMap = () => {
    gridDensityRef.current.fill(0);
  };

  // Convert World (x, y) to Grid Indices (col, row)
  const worldToGrid = useCallback((wx: number, wy: number) => {
    const col = Math.floor((wx + halfExtent) / cellSize);
    const row = Math.floor((wy + halfExtent) / cellSize);
    return { col, row };
  }, [halfExtent, cellSize]);

  // Main Raycast & Gaussian Kernel Deposit Function
  const updateGaussianGrid = useCallback((rx: number, ry: number, rTheta: number) => {
    const grid = gridDensityRef.current;

    for (let i = 0; i < numRays; i++) {
      const angle = rTheta + (i * 2 * Math.PI) / numRays;
      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);

      // Raycast against obstacles
      let closestDist = maxRange;

      for (const obs of obstacles) {
        // Line-circle intersection
        const dx = obs.x - rx;
        const dy = obs.y - ry;
        const proj = dx * cosA + dy * sinA;
        if (proj > 0) {
          const perpSq = dx * dx + dy * dy - proj * proj;
          if (perpSq < obs.r * obs.r) {
            const halfChord = Math.sqrt(obs.r * obs.r - perpSq);
            const hitDist = proj - halfChord;
            if (hitDist > 0 && hitDist < closestDist) {
              closestDist = hitDist;
            }
          }
        }
      }

      // If ray hit an obstacle within maxRange, deposit Gaussian kernel
      if (closestDist < maxRange - 0.1) {
        const hitX = rx + closestDist * cosA;
        const hitY = ry + closestDist * sinA;
        const { col: centerCol, row: centerRow } = worldToGrid(hitX, hitY);

        const twoSigmaSq = 2 * sigma * sigma;

        for (let dr = -kernelRadius; dr <= kernelRadius; dr++) {
          for (let dc = -kernelRadius; dc <= kernelRadius; dc++) {
            const c = centerCol + dc;
            const r = centerRow + dr;

            if (c >= 0 && c < gridSize && r >= 0 && r < gridSize) {
              const cellX = -halfExtent + (c + 0.5) * cellSize;
              const cellY = -halfExtent + (r + 0.5) * cellSize;
              const distSq = (cellX - hitX) ** 2 + (cellY - hitY) ** 2;

              // Gaussian probability density value
              const kernelVal = Math.exp(-distSq / twoSigmaSq);
              const idx = r * gridSize + c;
              grid[idx] = Math.min(1.0, grid[idx] + kernelVal * 0.08);
            }
          }
        }
      }
    }
  }, [numRays, maxRange, obstacles, sigma, kernelRadius, worldToGrid, halfExtent, cellSize]);

  // Animation Loop
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();

    const render = (time: number) => {
      const dt = Math.min(0.05, (time - lastTime) / 1000);
      lastTime = time;

      if (isRunning) {
        setRobotPose((prev) => {
          // Circular trajectory with gentle steering
          const speed = 1.2;
          const turnRate = 0.5;
          const newTheta = prev.theta + turnRate * dt;
          const newX = prev.x + speed * Math.cos(newTheta) * dt;
          const newY = prev.y + speed * Math.sin(newTheta) * dt;

          // Boundary bouncing
          const bound = 9.0;
          let clampedX = newX;
          let clampedY = newY;
          if (Math.abs(clampedX) > bound) clampedX = Math.sign(clampedX) * bound;
          if (Math.abs(clampedY) > bound) clampedY = Math.sign(clampedY) * bound;

          updateGaussianGrid(clampedX, clampedY, newTheta);
          return { x: clampedX, y: clampedY, theta: newTheta };
        });
      }

      // Draw onto Canvas
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          const width = canvas.width;
          const height = canvas.height;

          // Clear background
          ctx.fillStyle = '#030712'; // dark-950
          ctx.fillRect(0, 0, width, height);

          // World to Canvas coordinate mapper
          const scale = width / (gridSize * cellSize);
          const toCanvasX = (wx: number) => width / 2 + wx * scale;
          const toCanvasY = (wy: number) => height / 2 - wy * scale;

          // Draw Grid Cell Heatmap
          const grid = gridDensityRef.current;
          const cellPixelSize = cellSize * scale;

          for (let r = 0; r < gridSize; r++) {
            for (let c = 0; c < gridSize; c++) {
              const val = grid[r * gridSize + c];
              if (val > 0.01) {
                const wx = -halfExtent + c * cellSize;
                const wy = -halfExtent + (r + 1) * cellSize;
                const cx = toCanvasX(wx);
                const cy = toCanvasY(wy);

                // Heatmap Color Gradient: Dark Cyan (0) -> Emerald (0.3) -> Gold (0.7) -> Intense Red (1.0)
                let rCol = 6, gCol = 182, bCol = 212, alpha = val * 0.9;
                if (val > 0.7) {
                  rCol = 239; gCol = 68; bCol = 68; // Rose / Red
                } else if (val > 0.35) {
                  rCol = 245; gCol = 158; bCol = 11; // Amber / Gold
                } else if (val > 0.15) {
                  rCol = 16; gCol = 185; bCol = 129; // Emerald
                }

                ctx.fillStyle = `rgba(${rCol}, ${gCol}, ${bCol}, ${alpha})`;
                ctx.fillRect(cx, cy, cellPixelSize, cellPixelSize);
              }
            }
          }

          // Subtle Coordinate Grid Lines
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
          ctx.lineWidth = 1;
          for (let g = -10; g <= 10; g += 5) {
            ctx.beginPath();
            ctx.moveTo(toCanvasX(g), 0);
            ctx.lineTo(toCanvasX(g), height);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(0, toCanvasY(g));
            ctx.lineTo(width, toCanvasY(g));
            ctx.stroke();
          }

          // Draw Obstacles (Ground Truth)
          for (const obs of obstacles) {
            ctx.strokeStyle = 'rgba(244, 63, 94, 0.5)';
            ctx.fillStyle = 'rgba(244, 63, 94, 0.15)';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.arc(toCanvasX(obs.x), toCanvasY(obs.y), obs.r * scale, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
          }

          // Draw Robot
          const robX = toCanvasX(robotPose.x);
          const robY = toCanvasY(robotPose.y);
          const robRadius = 0.6 * scale;

          // LiDAR Range Circle
          ctx.strokeStyle = 'rgba(6, 182, 212, 0.15)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(robX, robY, maxRange * scale, 0, Math.PI * 2);
          ctx.stroke();

          // Robot Body
          ctx.fillStyle = '#06b6d4'; // Cyan
          ctx.beginPath();
          ctx.arc(robX, robY, robRadius, 0, Math.PI * 2);
          ctx.fill();

          // Heading Pointer
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.moveTo(robX, robY);
          ctx.lineTo(
            robX + Math.cos(robotPose.theta) * (robRadius + 8),
            robY - Math.sin(robotPose.theta) * (robRadius + 8)
          );
          ctx.stroke();
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [isRunning, robotPose, obstacles, maxRange, cellSize, gridSize, halfExtent, updateGaussianGrid]);

  return (
    <div className="my-6 rounded-2xl glass-panel p-5 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Layers className="w-4 h-4" />
            </span>
            <h3 className="font-mono font-bold text-slate-900 dark:text-slate-100 text-sm">
              Gaussian Grid Map & Kernel Density Estimation (KDE)
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Deposits continuous 2D Gaussian probability kernels <InlineMath latex="P(x, y) = \frac{1}{2\pi\sigma^2}\exp\left(-\frac{d^2}{2\sigma^2}\right)" /> onto grid cells to model sensor hit uncertainty.
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
            <span>{isRunning ? 'Pause' : 'Drive'}</span>
          </button>
          <button
            onClick={handleClearMap}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs border border-slate-700 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Map</span>
          </button>
        </div>
      </div>

      {/* Canvas Viewport */}
      <div className="relative w-full aspect-[16/10] max-h-[460px] bg-slate-950 rounded-xl overflow-hidden border border-slate-800 shadow-inner flex items-center justify-center">
        <canvas
          ref={canvasRef}
          width={640}
          height={400}
          className="w-full h-full object-contain"
        />

        {/* Legend Overlay */}
        <div className="absolute top-3 right-3 p-2.5 rounded-xl bg-slate-950/80 backdrop-blur-md border border-slate-800 text-[10px] font-mono space-y-1 text-slate-300">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-sm bg-rose-500 inline-block" />
            <span>Peak Density (Obstacle Core)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-sm bg-amber-500 inline-block" />
            <span>Mid Density (<InlineMath latex="\sigma" /> boundary)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-sm bg-cyan-500 inline-block" />
            <span>Low Uncertainty Tail</span>
          </div>
        </div>
      </div>

      {/* Parameter Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-200 dark:border-slate-800 text-xs font-mono">
        <div className="space-y-1">
          <div className="flex justify-between text-slate-400">
            <span>Gaussian Sigma (<InlineMath latex="\sigma" />):</span>
            <span className="text-cyan-400 font-bold">{sigma.toFixed(2)} m</span>
          </div>
          <input
            type="range"
            min="0.2"
            max="2.0"
            step="0.1"
            value={sigma}
            onChange={(e) => setSigma(parseFloat(e.target.value))}
            className="w-full accent-cyan-500"
          />
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-slate-400">
            <span>Kernel Radius:</span>
            <span className="text-cyan-400 font-bold">{kernelRadius} cells</span>
          </div>
          <input
            type="range"
            min="1"
            max="6"
            step="1"
            value={kernelRadius}
            onChange={(e) => setKernelRadius(parseInt(e.target.value))}
            className="w-full accent-cyan-500"
          />
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-slate-400">
            <span>LiDAR Beam Count:</span>
            <span className="text-cyan-400 font-bold">{numRays} rays</span>
          </div>
          <input
            type="range"
            min="12"
            max="72"
            step="6"
            value={numRays}
            onChange={(e) => setNumRays(parseInt(e.target.value))}
            className="w-full accent-cyan-500"
          />
        </div>
      </div>
    </div>
  );
}

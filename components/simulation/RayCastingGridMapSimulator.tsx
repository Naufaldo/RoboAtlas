'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw, Crosshair, Sliders, Layers, Info } from 'lucide-react';
import { InlineMath } from '@/components/mathematics/MathBlock';

export function RayCastingGridMapSimulator() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isAutoSpin, setIsAutoSpin] = useState(true);
  const [laserAngle, setLaserAngle] = useState(0); // in degrees
  const [lFree, setLFree] = useState(-0.4); // Log-odds decrement
  const [lOcc, setLOcc] = useState(1.2); // Log-odds increment
  const [showRays, setShowRays] = useState(true);
  const [robotPos, setRobotPos] = useState({ x: 0, y: 0 });

  // 40x40 Discrete Grid
  const gridSize = 40;
  const cellSize = 0.5; // meters
  const halfExtent = (gridSize * cellSize) / 2; // 10m to -10m

  // Grid log-odds array
  const logOddsRef = useRef<Float32Array>(new Float32Array(gridSize * gridSize));

  // Default Obstacles (Boxes / Circles)
  const obstacles = [
    { x: 4, y: 3, r: 1.5 },
    { x: -5, y: 4, r: 1.8 },
    { x: -4, y: -4, r: 1.4 },
    { x: 5, y: -4, r: 1.6 },
    { x: 0, y: 6, r: 1.2 },
  ];

  // Reset Map
  const handleResetMap = () => {
    logOddsRef.current.fill(0);
  };

  // Convert World (x, y) to Grid Coordinate (col, row)
  const worldToGrid = useCallback((wx: number, wy: number) => {
    const col = Math.floor((wx + halfExtent) / cellSize);
    const row = Math.floor((wy + halfExtent) / cellSize);
    return { col, row };
  }, [halfExtent, cellSize]);

  // Bresenham Integer Raycasting Line Traversal
  const bresenhamRaycast = useCallback(
    (c0: number, r0: number, c1: number, r1: number, isHit: boolean) => {
      const grid = logOddsRef.current;
      let x0 = c0;
      let y0 = r0;
      const x1 = c1;
      const y1 = r1;

      const dx = Math.abs(x1 - x0);
      const dy = Math.abs(y1 - y0);
      const sx = x0 < x1 ? 1 : -1;
      const sy = y0 < y1 ? 1 : -1;
      let err = dx - dy;

      while (true) {
        // Is this the endpoint?
        const isEnd = x0 === x1 && y0 === y1;

        if (x0 >= 0 && x0 < gridSize && y0 >= 0 && y0 < gridSize) {
          const idx = y0 * gridSize + x0;
          if (isEnd && isHit) {
            // Obstacle hit: Add lOcc
            grid[idx] = Math.min(5.0, grid[idx] + lOcc * 0.1);
          } else if (!isEnd) {
            // Free space: Subtract lFree (clamped to min -5.0)
            grid[idx] = Math.max(-5.0, grid[idx] + lFree * 0.05);
          }
        }

        if (isEnd) break;
        const e2 = 2 * err;
        if (e2 > -dy) {
          err -= dy;
          x0 += sx;
        }
        if (e2 < dx) {
          err += dx;
          y0 += sy;
        }
      }
    },
    [lFree, lOcc, gridSize]
  );

  // Cast 360 Degree Beams
  const castAllRays = useCallback(
    (rx: number, ry: number, baseAngleRad: number) => {
      const numBeams = 32;
      const maxDist = 9.0;
      const { col: rCol, row: rRow } = worldToGrid(rx, ry);

      for (let b = 0; b < numBeams; b++) {
        const angle = baseAngleRad + (b * 2 * Math.PI) / numBeams;
        const cosA = Math.cos(angle);
        const sinA = Math.sin(angle);

        let hitDist = maxDist;
        let isHit = false;

        for (const obs of obstacles) {
          const dx = obs.x - rx;
          const dy = obs.y - ry;
          const proj = dx * cosA + dy * sinA;
          if (proj > 0) {
            const perpSq = dx * dx + dy * dy - proj * proj;
            if (perpSq < obs.r * obs.r) {
              const halfChord = Math.sqrt(obs.r * obs.r - perpSq);
              const d = proj - halfChord;
              if (d > 0 && d < hitDist) {
                hitDist = d;
                isHit = true;
              }
            }
          }
        }

        const endX = rx + hitDist * cosA;
        const endY = ry + hitDist * sinA;
        const { col: eCol, row: eRow } = worldToGrid(endX, endY);

        bresenhamRaycast(rCol, rRow, eCol, eRow, isHit);
      }
    },
    [obstacles, worldToGrid, bresenhamRaycast]
  );

  // Animation Loop
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();

    const render = (time: number) => {
      const dt = Math.min(0.05, (time - lastTime) / 1000);
      lastTime = time;

      if (isAutoSpin) {
        setLaserAngle((prev) => (prev + 40 * dt) % 360);
      }

      // Execute Raycast
      const angleRad = (laserAngle * Math.PI) / 180;
      castAllRays(robotPos.x, robotPos.y, angleRad);

      // Draw onto Canvas
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          const width = canvas.width;
          const height = canvas.height;

          // Clear background
          ctx.fillStyle = '#030712';
          ctx.fillRect(0, 0, width, height);

          // World to Canvas mapper
          const scale = width / (gridSize * cellSize);
          const toCanvasX = (wx: number) => width / 2 + wx * scale;
          const toCanvasY = (wy: number) => height / 2 - wy * scale;

          // Render Grid Cells with Log-Odds & Probability
          const grid = logOddsRef.current;
          const cellPixel = cellSize * scale;

          for (let r = 0; r < gridSize; r++) {
            for (let c = 0; c < gridSize; c++) {
              const l = grid[r * gridSize + c];
              if (Math.abs(l) > 0.05) {
                // Log-odds to probability: p = 1 - 1 / (1 + exp(l))
                const p = 1 - 1 / (1 + Math.exp(l));
                const wx = -halfExtent + c * cellSize;
                const wy = -halfExtent + (r + 1) * cellSize;
                const cx = toCanvasX(wx);
                const cy = toCanvasY(wy);

                if (p > 0.55) {
                  // Occupied (Amber to Orange)
                  const alpha = Math.min(1.0, (p - 0.5) * 2);
                  ctx.fillStyle = `rgba(245, 158, 11, ${alpha * 0.9})`;
                } else {
                  // Free Space (Cyan)
                  const alpha = Math.min(1.0, (0.5 - p) * 2);
                  ctx.fillStyle = `rgba(6, 182, 212, ${alpha * 0.7})`;
                }

                ctx.fillRect(cx, cy, cellPixel, cellPixel);
              }
            }
          }

          // Grid wireframe
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
          ctx.lineWidth = 1;
          for (let i = 0; i <= gridSize; i += 5) {
            const wx = -halfExtent + i * cellSize;
            ctx.beginPath();
            ctx.moveTo(toCanvasX(wx), 0);
            ctx.lineTo(toCanvasX(wx), height);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(0, toCanvasY(wx));
            ctx.lineTo(width, toCanvasY(wx));
            ctx.stroke();
          }

          // Draw Obstacles (Ground Truth)
          for (const obs of obstacles) {
            ctx.strokeStyle = 'rgba(244, 63, 94, 0.4)';
            ctx.fillStyle = 'rgba(244, 63, 94, 0.15)';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.arc(toCanvasX(obs.x), toCanvasY(obs.y), obs.r * scale, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
          }

          // Draw Laser Rays
          if (showRays) {
            const numBeams = 32;
            const maxDist = 9.0;
            for (let b = 0; b < numBeams; b++) {
              const a = angleRad + (b * 2 * Math.PI) / numBeams;
              const cosA = Math.cos(a);
              const sinA = Math.sin(a);

              let hitDist = maxDist;
              for (const obs of obstacles) {
                const dx = obs.x - robotPos.x;
                const dy = obs.y - robotPos.y;
                const proj = dx * cosA + dy * sinA;
                if (proj > 0) {
                  const perpSq = dx * dx + dy * dy - proj * proj;
                  if (perpSq < obs.r * obs.r) {
                    const d = proj - Math.sqrt(obs.r * obs.r - perpSq);
                    if (d > 0 && d < hitDist) hitDist = d;
                  }
                }
              }

              ctx.strokeStyle = 'rgba(6, 182, 212, 0.25)';
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(toCanvasX(robotPos.x), toCanvasY(robotPos.y));
              ctx.lineTo(toCanvasX(robotPos.x + hitDist * cosA), toCanvasY(robotPos.y + hitDist * sinA));
              ctx.stroke();
            }
          }

          // Draw Robot
          const robX = toCanvasX(robotPos.x);
          const robY = toCanvasY(robotPos.y);
          ctx.fillStyle = '#06b6d4';
          ctx.beginPath();
          ctx.arc(robX, robY, 8, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(robX, robY);
          ctx.lineTo(robX + Math.cos(angleRad) * 16, robY - Math.sin(angleRad) * 16);
          ctx.stroke();
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [isAutoSpin, laserAngle, robotPos, showRays, obstacles, cellSize, gridSize, halfExtent, castAllRays]);

  return (
    <div className="my-6 rounded-2xl glass-panel p-5 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Crosshair className="w-4 h-4" />
            </span>
            <h3 className="font-mono font-bold text-slate-900 dark:text-slate-100 text-sm">
              Ray Casting Grid Map & Bresenham Line Traversal
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Traces laser rays across discrete pixels using Bresenham algorithm, applying <InlineMath latex="-l_{\text{free}}" /> to traversed cells and <InlineMath latex="+l_{\text{occ}}" /> to collision points.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAutoSpin(!isAutoSpin)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all shadow-sm ${
              isAutoSpin
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
            }`}
          >
            {isAutoSpin ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isAutoSpin ? 'Pause Rotation' : 'Spin Scanner'}</span>
          </button>
          <button
            onClick={handleResetMap}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs border border-slate-700 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Clear Grid</span>
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

        {/* Legend */}
        <div className="absolute top-3 right-3 p-2.5 rounded-xl bg-slate-950/80 backdrop-blur-md border border-slate-800 text-[10px] font-mono space-y-1 text-slate-300">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-sm bg-amber-500 inline-block" />
            <span>Occupied Cell (<InlineMath latex="+l_{\text{occ}}" />)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-sm bg-cyan-500 inline-block" />
            <span>Free Space Cell (<InlineMath latex="-l_{\text{free}}" />)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-sm bg-slate-900 border border-slate-700 inline-block" />
            <span>Unknown Prior (<InlineMath latex="l_0 = 0" />)</span>
          </div>
        </div>
      </div>

      {/* Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-200 dark:border-slate-800 text-xs font-mono">
        <div className="space-y-1">
          <div className="flex justify-between text-slate-400">
            <span>Occupied Increment (<InlineMath latex="l_{\text{occ}}" />):</span>
            <span className="text-amber-400 font-bold">+{lOcc.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min="0.4"
            max="3.0"
            step="0.2"
            value={lOcc}
            onChange={(e) => setLOcc(parseFloat(e.target.value))}
            className="w-full accent-amber-500"
          />
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-slate-400">
            <span>Free Space Decrement (<InlineMath latex="l_{\text{free}}" />):</span>
            <span className="text-cyan-400 font-bold">{lFree.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min="-1.5"
            max="-0.1"
            step="0.1"
            value={lFree}
            onChange={(e) => setLFree(parseFloat(e.target.value))}
            className="w-full accent-cyan-500"
          />
        </div>

        <div className="flex items-center justify-between pt-3">
          <span className="text-slate-400">Display Ray Beams:</span>
          <button
            onClick={() => setShowRays(!showRays)}
            className={`px-3 py-1 rounded-lg border text-xs font-mono font-bold transition-all ${
              showRays
                ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40'
                : 'bg-slate-800 text-slate-500 border-slate-700'
            }`}
          >
            {showRays ? 'Active' : 'Hidden'}
          </button>
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw, Radio, Sliders, Layers } from 'lucide-react';
import { InlineMath } from '@/components/mathematics/MathBlock';

export function LidarToGridMapSimulator() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isRunning, setIsRunning] = useState(true);
  const [noiseStd, setNoiseStd] = useState(0.05); // Sensor Gaussian range noise
  const [cellResolution, setCellResolution] = useState(0.4); // Cell size in meters
  const [angularSteps, setAngularSteps] = useState(60); // Beams per scan

  // Robot State
  const [robotPose, setRobotPose] = useState<{ x: number; y: number; theta: number }>({
    x: 0,
    y: 0,
    theta: 0,
  });

  const gridSize = 50;
  const halfExtent = (gridSize * cellResolution) / 2;

  // Grid Hit Accumulator Map
  const hitCountGridRef = useRef<Int32Array>(new Int32Array(gridSize * gridSize));

  // Default Obstacle Boundaries (Walls & Boxes)
  const obstacles = [
    { x: 4, y: 4, r: 1.8 },
    { x: -5, y: 5, r: 2.0 },
    { x: -5, y: -5, r: 1.6 },
    { x: 5, y: -4, r: 1.9 },
  ];

  const handleReset = () => {
    hitCountGridRef.current.fill(0);
  };

  // Convert World (x, y) to Grid Cell Index (col, row)
  const worldToGrid = useCallback(
    (wx: number, wy: number) => {
      const col = Math.floor((wx + halfExtent) / cellResolution);
      const row = Math.floor((wy + halfExtent) / cellResolution);
      return { col, row };
    },
    [halfExtent, cellResolution]
  );

  // Animation Loop
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();

    const render = (time: number) => {
      const dt = Math.min(0.05, (time - lastTime) / 1000);
      lastTime = time;

      if (isRunning) {
        setRobotPose((prev) => {
          const speed = 1.0;
          const turnRate = 0.4;
          const newTheta = prev.theta + turnRate * dt;
          const newX = 4.5 * Math.cos(newTheta * 0.7);
          const newY = 4.5 * Math.sin(newTheta * 0.7);

          // LiDAR Scan & Grid Cell Accumulation
          const maxRange = 10.0;
          const grid = hitCountGridRef.current;

          for (let i = 0; i < angularSteps; i++) {
            const beamAngle = newTheta + (i * 2 * Math.PI) / angularSteps;
            const cosA = Math.cos(beamAngle);
            const sinA = Math.sin(beamAngle);

            let hitDist = maxRange;
            let isHit = false;

            for (const obs of obstacles) {
              const dx = obs.x - newX;
              const dy = obs.y - newY;
              const proj = dx * cosA + dy * sinA;
              if (proj > 0) {
                const perpSq = dx * dx + dy * dy - proj * proj;
                if (perpSq < obs.r * obs.r) {
                  const d = proj - Math.sqrt(obs.r * obs.r - perpSq);
                  if (d > 0 && d < hitDist) {
                    hitDist = d;
                    isHit = true;
                  }
                }
              }
            }

            if (isHit && hitDist < maxRange - 0.2) {
              // Add Gaussian sensor range noise: r = r + N(0, noiseStd^2)
              const noisyDist = hitDist + (Math.random() - 0.5) * 2 * noiseStd;
              const globalHitX = newX + noisyDist * cosA;
              const globalHitY = newY + noisyDist * sinA;

              const { col, row } = worldToGrid(globalHitX, globalHitY);
              if (col >= 0 && col < gridSize && row >= 0 && row < gridSize) {
                const idx = row * gridSize + col;
                grid[idx] = Math.min(255, grid[idx] + 1);
              }
            }
          }

          return { x: newX, y: newY, theta: newTheta };
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

          const scale = width / (gridSize * cellResolution);
          const toCanvasX = (wx: number) => width / 2 + wx * scale;
          const toCanvasY = (wy: number) => height / 2 - wy * scale;

          // Draw Grid Cells by Accumulated Hit Count
          const grid = hitCountGridRef.current;
          const cellPixel = cellResolution * scale;

          for (let r = 0; r < gridSize; r++) {
            for (let c = 0; c < gridSize; c++) {
              const count = grid[r * gridSize + c];
              if (count > 0) {
                const wx = -halfExtent + c * cellResolution;
                const wy = -halfExtent + (r + 1) * cellResolution;
                const cx = toCanvasX(wx);
                const cy = toCanvasY(wy);

                // Intensity based on hit count
                const intensity = Math.min(1.0, count / 15);
                ctx.fillStyle = `rgba(245, 158, 11, ${0.2 + intensity * 0.8})`;
                ctx.fillRect(cx, cy, cellPixel, cellPixel);
              }
            }
          }

          // Draw Grid Lines
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

          // Obstacles (Ground Truth outlines)
          for (const obs of obstacles) {
            ctx.strokeStyle = 'rgba(244, 63, 94, 0.4)';
            ctx.fillStyle = 'rgba(244, 63, 94, 0.1)';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.arc(toCanvasX(obs.x), toCanvasY(obs.y), obs.r * scale, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
          }

          // Draw Robot & Scanning Rays
          const robX = toCanvasX(robotPose.x);
          const robY = toCanvasY(robotPose.y);

          // Robot Body
          ctx.fillStyle = '#06b6d4';
          ctx.beginPath();
          ctx.arc(robX, robY, 8, 0, Math.PI * 2);
          ctx.fill();

          // Laser Heading
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(robX, robY);
          ctx.lineTo(
            robX + Math.cos(robotPose.theta) * 16,
            robY - Math.sin(robotPose.theta) * 16
          );
          ctx.stroke();
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [isRunning, noiseStd, cellResolution, angularSteps, obstacles, gridSize, halfExtent, worldToGrid]);

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
              LiDAR to Grid Map Conversion & Accumulation
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Converts raw polar coordinates <InlineMath latex="(r_i, \theta_i)" /> to global Cartesian points <InlineMath latex="(x_W, y_W)" /> and bins hits into discrete spatial cells.
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
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs border border-slate-700 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Grid</span>
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

        {/* Live Metrics */}
        <div className="absolute top-3 right-3 p-2.5 rounded-xl bg-slate-950/80 backdrop-blur-md border border-slate-800 text-[10px] font-mono space-y-1 text-slate-300">
          <div className="text-cyan-400 font-bold">Transformation Pipeline:</div>
          <div>1. <InlineMath latex="x_L = r \cos\theta, y_L = r \sin\theta" /></div>
          <div>2. <InlineMath latex="\mathbf{P}_W = \mathbf{R}\mathbf{P}_L + \mathbf{t}_{\text{robot}}" /></div>
          <div>3. <InlineMath latex="c = \lfloor(x_W - x_0)/\Delta x\rfloor" /></div>
        </div>
      </div>

      {/* Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-200 dark:border-slate-800 text-xs font-mono">
        <div className="space-y-1">
          <div className="flex justify-between text-slate-400">
            <span>Range Noise Std (<InlineMath latex="\sigma_r" />):</span>
            <span className="text-cyan-400 font-bold">{(noiseStd * 100).toFixed(0)} cm</span>
          </div>
          <input
            type="range"
            min="0.01"
            max="0.25"
            step="0.02"
            value={noiseStd}
            onChange={(e) => setNoiseStd(parseFloat(e.target.value))}
            className="w-full accent-cyan-500"
          />
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-slate-400">
            <span>Grid Resolution (<InlineMath latex="\Delta x" />):</span>
            <span className="text-cyan-400 font-bold">{cellResolution.toFixed(2)} m</span>
          </div>
          <input
            type="range"
            min="0.2"
            max="0.8"
            step="0.05"
            value={cellResolution}
            onChange={(e) => {
              setCellResolution(parseFloat(e.target.value));
              handleReset();
            }}
            className="w-full accent-cyan-500"
          />
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-slate-400">
            <span>Scan Angular Beams:</span>
            <span className="text-cyan-400 font-bold">{angularSteps} beams</span>
          </div>
          <input
            type="range"
            min="24"
            max="120"
            step="12"
            value={angularSteps}
            onChange={(e) => setAngularSteps(parseInt(e.target.value))}
            className="w-full accent-cyan-500"
          />
        </div>
      </div>
    </div>
  );
}

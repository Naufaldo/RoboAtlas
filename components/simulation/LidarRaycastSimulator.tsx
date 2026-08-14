'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Compass, RotateCcw, Sparkles, Sliders } from 'lucide-react';

export function LidarRaycastSimulator() {
  const { locale } = useLanguage();
  const isId = locale === 'id';

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Robot Position and Ray count
  const [robotPos, setRobotPos] = useState({ x: 300, y: 160 });
  const [rayCount, setRayCount] = useState(36); // 36 rays (every 10 degrees)
  const [maxRange, setMaxRange] = useState(180);
  const [noiseStd, setNoiseStd] = useState(1.5); // Gaussian noise standard dev
  const [isDragging, setIsDragging] = useState(false);

  // Fixed Map Obstacle Polygons (List of line segments [p1, p2])
  const obstacles = [
    // Box 1
    { x1: 80, y1: 60, x2: 180, y2: 60 },
    { x1: 180, y1: 60, x2: 180, y2: 140 },
    { x1: 180, y1: 140, x2: 80, y2: 140 },
    { x1: 80, y1: 140, x2: 80, y2: 60 },

    // Box 2
    { x1: 420, y1: 80, x2: 520, y2: 80 },
    { x1: 520, y1: 80, x2: 520, y2: 240 },
    { x1: 520, y1: 240, x2: 420, y2: 240 },
    { x1: 420, y1: 240, x2: 420, y2: 80 },

    // Wall Segment
    { x1: 140, y1: 220, x2: 260, y2: 260 },
  ];

  // Line segment intersection helper
  const lineIntersect = (
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    x3: number,
    y3: number,
    x4: number,
    y4: number
  ): { x: number; y: number; dist: number } | null => {
    const denom = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);
    if (denom === 0) return null;

    const ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denom;
    const ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denom;

    if (ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1) {
      const ix = x1 + ua * (x2 - x1);
      const iy = y1 + ua * (y2 - y1);
      const dist = Math.hypot(ix - x1, iy - y1);
      return { x: ix, y: iy, dist };
    }
    return null;
  };

  // Render Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.fillStyle = '#070a13';
    ctx.fillRect(0, 0, width, height);

    // Technical Grid
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.08)';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 25) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += 25) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Draw Obstacle Walls (Cyan Solid Outlines)
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 3;
    obstacles.forEach((obs) => {
      ctx.beginPath();
      ctx.moveTo(obs.x1, obs.y1);
      ctx.lineTo(obs.x2, obs.y2);
      ctx.stroke();
    });

    // Cast LiDAR Rays (360 degrees)
    const angleStep = (Math.PI * 2) / rayCount;
    const detectedPoints: { x: number; y: number }[] = [];

    for (let i = 0; i < rayCount; i++) {
      const angle = i * angleStep;
      const rayEndX = robotPos.x + Math.cos(angle) * maxRange;
      const rayEndY = robotPos.y + Math.sin(angle) * maxRange;

      let closestHit: { x: number; y: number; dist: number } | null = null;

      for (const obs of obstacles) {
        const hit = lineIntersect(
          robotPos.x,
          robotPos.y,
          rayEndX,
          rayEndY,
          obs.x1,
          obs.y1,
          obs.x2,
          obs.y2
        );
        if (hit && (!closestHit || hit.dist < closestHit.dist)) {
          closestHit = hit;
        }
      }

      if (closestHit) {
        // Add random Gaussian noise
        const noise = (Math.random() - 0.5) * 2 * noiseStd;
        const noisyDist = Math.max(5, closestHit.dist + noise);
        const hitX = robotPos.x + Math.cos(angle) * noisyDist;
        const hitY = robotPos.y + Math.sin(angle) * noisyDist;

        // Laser beam line
        ctx.strokeStyle = 'rgba(239, 68, 68, 0.4)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(robotPos.x, robotPos.y);
        ctx.lineTo(hitX, hitY);
        ctx.stroke();

        detectedPoints.push({ x: hitX, y: hitY });
      } else {
        // Free ray (no obstacle hit)
        ctx.strokeStyle = 'rgba(16, 185, 129, 0.12)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(robotPos.x, robotPos.y);
        ctx.lineTo(rayEndX, rayEndY);
        ctx.stroke();
      }
    }

    // Render Point Cloud Hits (Glowing Amber Dots)
    detectedPoints.forEach((p) => {
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
      ctx.fill();
    });

    // Draw Robot Body at robotPos
    ctx.fillStyle = '#0f172a';
    ctx.strokeStyle = '#22d3ee';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(robotPos.x, robotPos.y, 14, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // LiDAR Spinner Puck
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(robotPos.x, robotPos.y, 4, 0, Math.PI * 2);
    ctx.fill();
  }, [robotPos, rayCount, maxRange, noiseStd]);

  const handleInteraction = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * canvas.width;
    const y = ((clientY - rect.top) / rect.height) * canvas.height;
    setRobotPos({ x: Math.max(30, Math.min(570, x)), y: Math.max(30, Math.min(290, y)) });
  };

  return (
    <div className="p-6 rounded-3xl glass-panel border border-slate-200 dark:border-slate-800 space-y-4 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-slate-200 dark:border-slate-800/80">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-500">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 font-mono">
              {isId ? 'Laboratorium Raycasting LiDAR 2D & Ekstraksi Point Cloud' : '2D LiDAR Raycasting & Point Cloud Extraction Lab'}
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-sans">
              {isId
                ? 'Geser robot di dalam peta untuk memancarkan sinar laser 360° dan mengekstrak titik pantulan rintangan point cloud.'
                : 'Drag the robot around the map to emit 360° laser rays and observe live point cloud reflection extraction.'}
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setRobotPos({ x: 300, y: 160 });
            setRayCount(36);
            setMaxRange(180);
          }}
          className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-mono bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-400 hover:text-slate-200"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Main Canvas View */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-800/80 bg-slate-950 flex justify-center">
        <canvas
          ref={canvasRef}
          width={600}
          height={320}
          className="w-full max-w-2xl h-auto cursor-crosshair touch-none"
          onMouseDown={(e) => {
            setIsDragging(true);
            handleInteraction(e.clientX, e.clientY);
          }}
          onMouseMove={(e) => {
            if (isDragging) handleInteraction(e.clientX, e.clientY);
          }}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onTouchStart={(e) => {
            setIsDragging(true);
            handleInteraction(e.touches[0].clientX, e.touches[0].clientY);
          }}
          onTouchMove={(e) => {
            if (isDragging) handleInteraction(e.touches[0].clientX, e.touches[0].clientY);
          }}
          onTouchEnd={() => setIsDragging(false)}
        />
      </div>

      {/* Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
        <div className="space-y-1.5 p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="flex justify-between">
            <span className="text-slate-400">{isId ? 'Jumlah Sinar Laser (Ray Count):' : 'LiDAR Laser Ray Count:'}</span>
            <strong className="text-cyan-400">{rayCount} rays (Δθ = {(360 / rayCount).toFixed(1)}°)</strong>
          </div>
          <input
            type="range"
            min="12"
            max="72"
            step="4"
            value={rayCount}
            onChange={(e) => setRayCount(parseInt(e.target.value))}
            className="w-full accent-cyan-500"
          />
        </div>

        <div className="space-y-1.5 p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="flex justify-between">
            <span className="text-slate-400">{isId ? 'Jangkauan Maksimum Sensor:' : 'Maximum Range (r_max):'}</span>
            <strong className="text-amber-400">{maxRange} px</strong>
          </div>
          <input
            type="range"
            min="80"
            max="260"
            step="10"
            value={maxRange}
            onChange={(e) => setMaxRange(parseInt(e.target.value))}
            className="w-full accent-amber-500"
          />
        </div>
      </div>
    </div>
  );
}

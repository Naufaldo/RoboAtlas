'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Layers, Move, Sparkles, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface Obstacle {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function CspaceInflationSimulator() {
  const { locale } = useLanguage();
  const isId = locale === 'id';

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [robotRadius, setRobotRadius] = useState(25);
  const [robotPos, setRobotPos] = useState({ x: 100, y: 180 });
  const [isDragging, setIsDragging] = useState(false);

  const obstacles: Obstacle[] = [
    { x: 180, y: 80, width: 90, height: 160 },
    { x: 360, y: 150, width: 110, height: 140 },
  ];

  // Collision check between circular robot and rectangular obstacle
  const checkCollision = (rx: number, ry: number, radius: number) => {
    for (const obs of obstacles) {
      // Find closest point on rectangle to circle center
      const closestX = Math.max(obs.x, Math.min(rx, obs.x + obs.width));
      const closestY = Math.max(obs.y, Math.min(ry, obs.y + obs.height));

      const dx = rx - closestX;
      const dy = ry - closestY;

      if (dx * dx + dy * dy < radius * radius) {
        return true;
      }
    }
    return false;
  };

  const isInCollision = checkCollision(robotPos.x, robotPos.y, robotRadius);

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

    // Technical grid
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

    // 1. Draw Inflated C-Space Obstacles C_obs (Minkowski Sum: W_obs + Circle(r))
    obstacles.forEach((obs) => {
      ctx.fillStyle = 'rgba(6, 182, 212, 0.18)';
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.7)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);

      // Rounded rectangle representing Minkowski sum
      const x = obs.x - robotRadius;
      const y = obs.y - robotRadius;
      const w = obs.width + 2 * robotRadius;
      const h = obs.height + 2 * robotRadius;
      const r = robotRadius;

      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + w - r, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + r);
      ctx.lineTo(x + w, y + h - r);
      ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      ctx.lineTo(x + r, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - r);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.closePath();

      ctx.fill();
      ctx.stroke();
      ctx.setLineDash([]);
    });

    // 2. Draw Original Physical Obstacles W_obs
    obstacles.forEach((obs) => {
      ctx.fillStyle = '#1e293b';
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 2;
      ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
      ctx.strokeRect(obs.x, obs.y, obs.width, obs.height);

      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px JetBrains Mono';
      ctx.fillText('W_obs', obs.x + 8, obs.y + 16);
    });

    // 3. Draw Robot Footprint
    ctx.fillStyle = isInCollision ? 'rgba(239, 68, 68, 0.35)' : 'rgba(16, 185, 129, 0.35)';
    ctx.strokeStyle = isInCollision ? '#ef4444' : '#10b981';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(robotPos.x, robotPos.y, robotRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Robot center point (Point robot in C-space!)
    ctx.fillStyle = isInCollision ? '#ef4444' : '#10b981';
    ctx.beginPath();
    ctx.arc(robotPos.x, robotPos.y, 4, 0, Math.PI * 2);
    ctx.fill();
  }, [robotRadius, robotPos, isInCollision, obstacles]);

  // Drag interaction
  const handleInteraction = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * canvas.width;
    const y = ((clientY - rect.top) / rect.height) * canvas.height;
    setRobotPos({ x: Math.round(x), y: Math.round(y) });
  };

  return (
    <div className="p-6 rounded-3xl glass-panel border border-slate-200 dark:border-slate-800 space-y-4 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-slate-200 dark:border-slate-800/80">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-500">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 font-mono">
              {isId ? 'Simulator Inflasi Ruang Konfigurasi (C-Space)' : 'Configuration Space (C-Space) Minkowski Inflation'}
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-sans">
              {isId
                ? 'Geser radius robot dan amati bagaimana rintangan fisik membesar (Minkowski Sum) menjadi rintangan C-Space.'
                : 'Adjust robot radius and observe how physical obstacles inflate (Minkowski Sum) into C-Space obstacles.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className={`px-2.5 py-1 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 border ${
            isInCollision
              ? 'bg-rose-500/20 text-rose-400 border-rose-500/40'
              : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
          }`}>
            {isInCollision ? <ShieldAlert className="w-3.5 h-3.5" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
            <span>{isInCollision ? (isId ? 'Tabrakan Terdeteksi' : 'Collision in C_obs') : (isId ? 'Ruang Bebas (C_free)' : 'Free Space (C_free)')}</span>
          </span>
        </div>
      </div>

      {/* Canvas */}
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

      {/* Slider */}
      <div className="space-y-1.5 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs font-mono">
        <div className="flex justify-between">
          <span className="text-slate-500">{isId ? 'Radius Geometri Robot (Inflasi Minkowski r):' : 'Robot Footprint Radius (Minkowski r):'}</span>
          <strong className="text-cyan-400">{robotRadius} px</strong>
        </div>
        <input
          type="range"
          min="10"
          max="45"
          step="1"
          value={robotRadius}
          onChange={(e) => setRobotRadius(parseInt(e.target.value))}
          className="w-full accent-cyan-500"
        />
      </div>
    </div>
  );
}

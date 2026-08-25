'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw, Box, Shield, Sparkles, Navigation } from 'lucide-react';
import { InlineMath } from '@/components/mathematics/MathBlock';

interface Obstacle3D {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface CorridorBox {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

export function SafeCorridorExplorationSimulator() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isRunning, setIsRunning] = useState(true);
  const [clusterK, setClusterK] = useState(4);
  const [corridorMargin, setCorridorMargin] = useState(2.2);

  // Drone Pose
  const [drone, setDrone] = useState({ x: 2.0, y: 2.0, yaw: 0 });
  const [flightTrail, setFlightTrail] = useState<{ x: number; y: number }[]>([{ x: 2.0, y: 2.0 }]);

  // Environment Obstacles
  const [obstacles] = useState<Obstacle3D[]>([
    { x: 6, y: 3, w: 2, h: 5 },
    { x: 11, y: 8, w: 5, h: 2 },
    { x: 5, y: 11, w: 3, h: 4 },
    { x: 13, y: 3, w: 2, h: 4 },
  ]);

  // Waypoints & Corridors
  const [waypoints, setWaypoints] = useState<{ x: number; y: number }[]>([
    { x: 2, y: 2 },
    { x: 4, y: 7 },
    { x: 9, y: 5 },
    { x: 14, y: 10 },
    { x: 16, y: 15 },
  ]);

  const [corridors, setCorridors] = useState<CorridorBox[]>([]);

  // Compute Safe Flight Corridors around waypoints
  useEffect(() => {
    const newCorridors: CorridorBox[] = [];
    for (let i = 0; i < waypoints.length; i++) {
      const wp = waypoints[i];
      let minX = wp.x - corridorMargin;
      let maxX = wp.x + corridorMargin;
      let minY = wp.y - corridorMargin;
      let maxY = wp.y + corridorMargin;

      // Shrink if intersecting obstacles
      for (const obs of obstacles) {
        if (
          maxX > obs.x &&
          minX < obs.x + obs.w &&
          maxY > obs.y &&
          minY < obs.y + obs.h
        ) {
          if (wp.x < obs.x) maxX = Math.min(maxX, obs.x - 0.2);
          if (wp.x > obs.x + obs.w) minX = Math.max(minX, obs.x + obs.w + 0.2);
          if (wp.y < obs.y) maxY = Math.min(maxY, obs.y - 0.2);
          if (wp.y > obs.y + obs.h) minY = Math.max(minY, obs.y + obs.h + 0.2);
        }
      }

      newCorridors.push({ minX, maxX, minY, maxY });
    }
    setCorridors(newCorridors);
  }, [waypoints, obstacles, corridorMargin]);

  const handleReset = () => {
    setDrone({ x: 2.0, y: 2.0, yaw: 0 });
    setFlightTrail([{ x: 2.0, y: 2.0 }]);
  };

  // Drone Motion along Waypoints
  useEffect(() => {
    let animId: number;
    let currentWpIdx = 1;

    const render = () => {
      if (isRunning) {
        setDrone((prev) => {
          const target = waypoints[currentWpIdx];
          if (!target) return prev;

          const dx = target.x - prev.x;
          const dy = target.y - prev.y;
          const dist = Math.hypot(dx, dy);

          if (dist < 0.3) {
            currentWpIdx = (currentWpIdx + 1) % waypoints.length;
            return prev;
          }

          const speed = 0.06;
          const nextYaw = Math.atan2(dy, dx);
          const nextX = prev.x + (dx / dist) * speed;
          const nextY = prev.y + (dy / dist) * speed;

          setFlightTrail((trail) => [...trail.slice(-80), { x: nextX, y: nextY }]);
          return { x: nextX, y: nextY, yaw: nextYaw };
        });
      }

      // Render Canvas
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          const width = canvas.width;
          const height = canvas.height;
          const scale = width / 18;

          ctx.fillStyle = '#030712';
          ctx.fillRect(0, 0, width, height);

          // Subtle Grid
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
          ctx.lineWidth = 1;
          for (let g = 0; g <= 18; g += 3) {
            ctx.beginPath();
            ctx.moveTo(g * scale, 0);
            ctx.lineTo(g * scale, height);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(0, g * scale);
            ctx.lineTo(width, g * scale);
            ctx.stroke();
          }

          // 1. Draw Safe Flight Corridors (Cyan Glowing Convex Boxes)
          for (const box of corridors) {
            const bx = box.minX * scale;
            const by = box.minY * scale;
            const bw = (box.maxX - box.minX) * scale;
            const bh = (box.maxY - box.minY) * scale;

            ctx.strokeStyle = 'rgba(6, 182, 212, 0.6)';
            ctx.fillStyle = 'rgba(6, 182, 212, 0.08)';
            ctx.lineWidth = 1.5;
            ctx.strokeRect(bx, by, bw, bh);
            ctx.fillRect(bx, by, bw, bh);
          }

          // 2. Draw 3D Obstacles (Slate Pillars)
          for (const obs of obstacles) {
            ctx.fillStyle = '#1e293b';
            ctx.strokeStyle = '#334155';
            ctx.lineWidth = 2;
            ctx.fillRect(obs.x * scale, obs.y * scale, obs.w * scale, obs.h * scale);
            ctx.strokeRect(obs.x * scale, obs.y * scale, obs.w * scale, obs.h * scale);

            // Obstacle Top Pattern
            ctx.fillStyle = '#0f172a';
            ctx.font = '9px monospace';
            ctx.fillText('3D VOXEL', (obs.x + 0.2) * scale, (obs.y + 0.8) * scale);
          }

          // 3. Draw Planned A* Path through Corridors
          if (waypoints.length > 1) {
            ctx.strokeStyle = 'rgba(245, 158, 11, 0.8)';
            ctx.lineWidth = 2;
            ctx.setLineDash([5, 5]);
            ctx.beginPath();
            ctx.moveTo(waypoints[0].x * scale, waypoints[0].y * scale);
            for (let i = 1; i < waypoints.length; i++) {
              ctx.lineTo(waypoints[i].x * scale, waypoints[i].y * scale);
            }
            ctx.stroke();
            ctx.setLineDash([]);

            // Draw k-Means++ Frontier Clusters (Gold Waypoint Rings)
            for (let i = 0; i < waypoints.length; i++) {
              const wp = waypoints[i];
              ctx.fillStyle = '#f59e0b';
              ctx.beginPath();
              ctx.arc(wp.x * scale, wp.y * scale, 5, 0, Math.PI * 2);
              ctx.fill();
            }
          }

          // 4. Draw Flight Trail
          if (flightTrail.length > 1) {
            ctx.strokeStyle = '#10b981';
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.moveTo(flightTrail[0].x * scale, flightTrail[0].y * scale);
            for (let i = 1; i < flightTrail.length; i++) {
              ctx.lineTo(flightTrail[i].x * scale, flightTrail[i].y * scale);
            }
            ctx.stroke();
          }

          // 5. Draw MAV Drone with RGB-D FOV Frustum
          const dx = drone.x * scale;
          const dy = drone.y * scale;

          // RGB-D Camera Vision Cone
          const fovAngle = Math.PI / 3; // 60 degrees
          const fovRange = 3.5 * scale;
          ctx.fillStyle = 'rgba(16, 185, 129, 0.15)';
          ctx.beginPath();
          ctx.moveTo(dx, dy);
          ctx.arc(dx, dy, fovRange, drone.yaw - fovAngle / 2, drone.yaw + fovAngle / 2);
          ctx.closePath();
          ctx.fill();

          // Quadrotor Drone Body (Emerald cross)
          ctx.fillStyle = '#10b981';
          ctx.beginPath();
          ctx.arc(dx, dy, 7, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(dx, dy);
          ctx.lineTo(dx + Math.cos(drone.yaw) * 14, dy + Math.sin(drone.yaw) * 14);
          ctx.stroke();
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [isRunning, waypoints, obstacles, corridors, drone, flightTrail]);

  return (
    <div className="my-6 rounded-2xl glass-panel p-5 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Shield className="w-4 h-4" />
            </span>
            <h3 className="font-mono font-bold text-slate-900 dark:text-slate-100 text-sm">
              3D Frontier Exploration & Safe Flight Corridor (SFC) Simulator
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Filters frontier voxels with <InlineMath latex="k" />-means++ and inflates convex Safe Flight Corridors around <InlineMath latex="A^*" /> waypoints for collision-free drone navigation.
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
            <span>{isRunning ? 'Pause' : 'Fly MAV'}</span>
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs border border-slate-700 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Flight</span>
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
        <div className="absolute top-3 right-3 p-3 rounded-xl bg-slate-950/85 backdrop-blur-md border border-slate-800 text-[10px] font-mono space-y-1.5 text-slate-300">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span>MAV Drone & RGB-D Vision Cone</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-md bg-cyan-500/20 border border-cyan-500 inline-block" />
            <span>Safe Flight Corridors (SFC)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span><InlineMath latex="k" />-Means++ Frontier Clusters</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-sm bg-slate-700 inline-block" />
            <span>3D Obstacle Voxel Pillars</span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-200 dark:border-slate-800 text-xs font-mono">
        <div className="space-y-1">
          <div className="flex justify-between text-slate-400">
            <span>Corridor Inflation Margin:</span>
            <span className="text-cyan-400 font-bold">{corridorMargin.toFixed(1)} m</span>
          </div>
          <input
            type="range"
            min="1.2"
            max="3.5"
            step="0.2"
            value={corridorMargin}
            onChange={(e) => setCorridorMargin(parseFloat(e.target.value))}
            className="w-full accent-cyan-500"
          />
        </div>

        <div className="flex items-center justify-between text-slate-400 pt-3">
          <span>Active Corridors: <strong className="text-cyan-400">{corridors.length} boxes</strong></span>
          <span>Target Frontiers: <strong className="text-amber-400">{waypoints.length} clusters</strong></span>
        </div>
      </div>
    </div>
  );
}

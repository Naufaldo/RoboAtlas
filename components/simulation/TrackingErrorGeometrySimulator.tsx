'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Navigation, RotateCcw, Compass, Crosshair } from 'lucide-react';

export function TrackingErrorGeometrySimulator() {
  const { locale } = useLanguage();
  const isId = locale === 'id';

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Robot Pose: position (x, y) and heading theta
  const [robotPos, setRobotPos] = useState({ x: 260, y: 110 });
  const [robotTheta, setRobotTheta] = useState(25); // degrees
  const [isDragging, setIsDragging] = useState(false);

  // Curved Reference Path defined by cubic bezier / polynomial
  // P0(60, 220), P1(200, 220), P2(360, 80), P3(540, 80)
  const pathPoints = [
    { x: 50, y: 220 },
    { x: 150, y: 220 },
    { x: 250, y: 190 },
    { x: 350, y: 130 },
    { x: 450, y: 90 },
    { x: 550, y: 90 },
  ];

  // Find closest point on path to robotPos
  let closestPoint = pathPoints[0];
  let minDistance = Infinity;
  let pathTangent = { x: 1, y: 0 };
  let pathHeadingRad = 0;

  for (let i = 0; i < pathPoints.length - 1; i++) {
    const p1 = pathPoints[i];
    const p2 = pathPoints[i + 1];

    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const segLenSq = dx * dx + dy * dy;

    // Project robot onto segment p1-p2
    const u = Math.max(0, Math.min(1, ((robotPos.x - p1.x) * dx + (robotPos.y - p1.y) * dy) / segLenSq));
    const projX = p1.x + u * dx;
    const projY = p1.y + u * dy;

    const dist = Math.hypot(robotPos.x - projX, robotPos.y - projY);
    if (dist < minDistance) {
      minDistance = dist;
      closestPoint = { x: projX, y: projY };
      const len = Math.hypot(dx, dy);
      pathTangent = { x: dx / len, y: dy / len };
      pathHeadingRad = Math.atan2(-dy, dx); // Canvas inverted Y
    }
  }

  // Cross-track lateral error with sign (using 2D cross product: (robot - closest) x tangent)
  const toRobotX = robotPos.x - closestPoint.x;
  const toRobotY = -(robotPos.y - closestPoint.y); // math coords
  const crossProduct = toRobotX * -pathTangent.y - toRobotY * pathTangent.x;
  const e_lat = (crossProduct >= 0 ? 1 : -1) * minDistance;

  // Heading error e_theta = theta_robot - theta_path
  const thetaRobotRad = (robotTheta * Math.PI) / 180;
  let e_theta_rad = thetaRobotRad - pathHeadingRad;
  while (e_theta_rad > Math.PI) e_theta_rad -= 2 * Math.PI;
  while (e_theta_rad < -Math.PI) e_theta_rad += 2 * Math.PI;
  const e_theta_deg = (e_theta_rad * 180) / Math.PI;

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

    // Draw Reference Path (Emerald Solid Line)
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(pathPoints[0].x, pathPoints[0].y);
    for (let i = 1; i < pathPoints.length; i++) {
      ctx.lineTo(pathPoints[i].x, pathPoints[i].y);
    }
    ctx.stroke();

    // Path Label
    ctx.fillStyle = '#10b981';
    ctx.font = 'bold 11px JetBrains Mono';
    ctx.fillText('Reference Path (r_path)', 60, 245);

    // Closest Point (P_closest)
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.arc(closestPoint.x, closestPoint.y, 6, 0, Math.PI * 2);
    ctx.fill();

    // Tangent Vector on Path (t_hat)
    const tLen = 40;
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(closestPoint.x, closestPoint.y);
    ctx.lineTo(closestPoint.x + pathTangent.x * tLen, closestPoint.y + pathTangent.y * tLen);
    ctx.stroke();

    // Cross-track Error Line (Dashed Red Line)
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(closestPoint.x, closestPoint.y);
    ctx.lineTo(robotPos.x, robotPos.y);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw Robot Chassis at robotPos
    ctx.save();
    ctx.translate(robotPos.x, robotPos.y);
    ctx.rotate(-thetaRobotRad); // Canvas inverted Y

    // Chassis Box
    ctx.fillStyle = '#1e293b';
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;
    ctx.fillRect(-20, -14, 40, 28);
    ctx.strokeRect(-20, -14, 40, 28);

    // Heading Arrow
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(32, 0);
    ctx.stroke();

    ctx.fillStyle = '#38bdf8';
    ctx.beginPath();
    ctx.arc(0, 0, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();

    // Error Label on Dashed Line
    const midX = (closestPoint.x + robotPos.x) / 2;
    const midY = (closestPoint.y + robotPos.y) / 2;
    ctx.fillStyle = '#ef4444';
    ctx.font = 'bold 11px JetBrains Mono';
    ctx.fillText(`e_lat = ${Math.abs(e_lat).toFixed(1)} px`, midX + 8, midY - 6);
  }, [robotPos, thetaRobotRad, closestPoint, pathTangent, e_lat]);

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
            <Crosshair className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 font-mono">
              {isId ? 'Laboratorium Geometri Galat Pelacakan Jalur (e_lat & e_θ)' : 'Path Tracking Error Geometry Laboratory'}
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-sans">
              {isId
                ? 'Geser posisi robot atau putar sudut heading untuk melihat proyeksi galat lateral (cross-track) dan galat heading secara real-time.'
                : 'Drag the robot or adjust heading angle to observe cross-track lateral error and heading error in real-time.'}
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setRobotPos({ x: 260, y: 110 });
            setRobotTheta(25);
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
          height={300}
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

      {/* Telemetry Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
        <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <span className="text-[10px] text-red-400 font-bold block uppercase tracking-wider">
            {isId ? 'Galat Samping Lateral (Cross-Track Error e_lat)' : 'Cross-Track Lateral Error (e_lat)'}
          </span>
          <div className="flex items-baseline gap-2">
            <strong className="text-xl font-bold text-red-400">{e_lat.toFixed(2)}</strong>
            <span className="text-slate-400">px ({e_lat >= 0 ? (isId ? 'Kiri Jalur' : 'Left of path') : (isId ? 'Kanan Jalur' : 'Right of path')})</span>
          </div>
          <p className="text-[11px] text-slate-500">Jarak ortogonal tegak lurus dari bodi robot ke titik jalur terdekat.</p>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <span className="text-[10px] text-cyan-400 font-bold block uppercase tracking-wider">
            {isId ? 'Galat Orientasi Arah (Heading Error e_θ)' : 'Heading Alignment Error (e_θ)'}
          </span>
          <div className="flex items-baseline gap-2">
            <strong className="text-xl font-bold text-cyan-400">{e_theta_deg.toFixed(1)}°</strong>
            <span className="text-slate-400">({(e_theta_rad).toFixed(2)} rad)</span>
          </div>
          <p className="text-[11px] text-slate-500">Selisih sudut arah robot terhadap garis singgung lintasan jalur.</p>
        </div>
      </div>

      {/* Heading Slider */}
      <div className="space-y-1.5 p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs font-mono">
        <div className="flex justify-between">
          <span className="text-slate-400">{isId ? 'Orientasi Sudut Robot (θ_robot):' : 'Robot Heading Angle (θ_robot):'}</span>
          <strong className="text-cyan-400">{robotTheta}°</strong>
        </div>
        <input
          type="range"
          min="-180"
          max="180"
          step="1"
          value={robotTheta}
          onChange={(e) => setRobotTheta(parseInt(e.target.value))}
          className="w-full accent-cyan-500"
        />
      </div>
    </div>
  );
}

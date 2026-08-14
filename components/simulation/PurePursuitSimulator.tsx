'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Navigation, Play, Pause, RotateCcw, Sliders, Activity } from 'lucide-react';

export function PurePursuitSimulator() {
  const { locale } = useLanguage();
  const isId = locale === 'id';

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Controller Parameters
  const [lookaheadLd, setLookaheadLd] = useState(55); // pixels
  const [speed, setSpeed] = useState(1.6);
  const [wheelbase, setWheelbase] = useState(32);
  const [isPlaying, setIsPlaying] = useState(true);

  // Robot State
  const [robotState, setRobotState] = useState({
    x: 60,
    y: 200,
    theta: 0, // radians
  });

  // Reference Waypoint Path (S-curve)
  const path = [
    { x: 50, y: 200 },
    { x: 130, y: 200 },
    { x: 220, y: 150 },
    { x: 310, y: 90 },
    { x: 420, y: 90 },
    { x: 500, y: 170 },
    { x: 560, y: 170 },
  ];

  // Simulation Loop
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setRobotState((prev) => {
        // Find lookahead point: first path point at distance >= Ld from robot
        let targetPt = path[path.length - 1];
        let found = false;

        for (let i = 0; i < path.length; i++) {
          const d = Math.hypot(path[i].x - prev.x, path[i].y - prev.y);
          if (d >= lookaheadLd) {
            targetPt = path[i];
            found = true;
            break;
          }
        }

        // Angle alpha from vehicle heading to lookahead point
        const dx = targetPt.x - prev.x;
        const dy = -(targetPt.y - prev.y); // math coords (Y up)
        const angleToTarget = Math.atan2(dy, dx);
        let alpha = angleToTarget - prev.theta;

        while (alpha > Math.PI) alpha -= 2 * Math.PI;
        while (alpha < -Math.PI) alpha += 2 * Math.PI;

        // Pure Pursuit Steering Curvature: kappa = 2*sin(alpha) / Ld
        const kappa = (2 * Math.sin(alpha)) / lookaheadLd;
        // Steering angle delta = atan(kappa * L)
        const delta = Math.atan(kappa * wheelbase);

        // Bicycle/Unicycle motion integration
        const dt = 0.5;
        const v = speed;
        const omega = (v / wheelbase) * Math.tan(delta);

        let newTheta = prev.theta + omega * dt;
        let newX = prev.x + v * Math.cos(prev.theta) * dt;
        let newY = prev.y - v * Math.sin(prev.theta) * dt; // canvas coords (Y down)

        // Loop back to start if reaching end
        if (newX > 570 || Math.hypot(newX - path[path.length - 1].x, newY - path[path.length - 1].y) < 15) {
          return { x: 50, y: 200, theta: 0 };
        }

        return { x: newX, y: newY, theta: newTheta };
      });
    }, 30);

    return () => clearInterval(interval);
  }, [isPlaying, lookaheadLd, speed, wheelbase]);

  // Find current lookahead point for rendering
  let lookaheadPt = path[path.length - 1];
  for (let i = 0; i < path.length; i++) {
    const d = Math.hypot(path[i].x - robotState.x, path[i].y - robotState.y);
    if (d >= lookaheadLd) {
      lookaheadPt = path[i];
      break;
    }
  }

  const dx = lookaheadPt.x - robotState.x;
  const dy = -(lookaheadPt.y - robotState.y);
  const angleToTarget = Math.atan2(dy, dx);
  let alpha = angleToTarget - robotState.theta;
  while (alpha > Math.PI) alpha -= 2 * Math.PI;
  while (alpha < -Math.PI) alpha += 2 * Math.PI;
  const curvature = (2 * Math.sin(alpha)) / lookaheadLd;
  const steerDeltaDeg = (Math.atan(curvature * wheelbase) * 180) / Math.PI;

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
    ctx.moveTo(path[0].x, path[0].y);
    for (let i = 1; i < path.length; i++) {
      ctx.lineTo(path[i].x, path[i].y);
    }
    ctx.stroke();

    // Draw Path Waypoints
    path.forEach((pt) => {
      ctx.fillStyle = '#047857';
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 4, 0, Math.PI * 2);
      ctx.fill();
    });

    // Draw Lookahead Circle around Robot
    ctx.strokeStyle = 'rgba(6, 182, 212, 0.35)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.arc(robotState.x, robotState.y, lookaheadLd, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);

    // Line from robot to Lookahead Point (Amber line)
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(robotState.x, robotState.y);
    ctx.lineTo(lookaheadPt.x, lookaheadPt.y);
    ctx.stroke();

    // Lookahead Target Point (P_lookahead)
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.arc(lookaheadPt.x, lookaheadPt.y, 6, 0, Math.PI * 2);
    ctx.fill();

    // Draw Robot Vehicle Chassis
    ctx.save();
    ctx.translate(robotState.x, robotState.y);
    ctx.rotate(-robotState.theta);

    // Chassis Body
    ctx.fillStyle = '#1e293b';
    ctx.strokeStyle = '#22d3ee';
    ctx.lineWidth = 2;
    ctx.fillRect(-18, -12, 36, 24);
    ctx.strokeRect(-18, -12, 36, 24);

    // Heading Arrow
    ctx.strokeStyle = '#22d3ee';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(26, 0);
    ctx.stroke();

    // Wheels
    ctx.fillStyle = '#64748b';
    ctx.fillRect(-16, -15, 10, 4);
    ctx.fillRect(-16, 11, 10, 4);
    ctx.fillRect(8, -15, 10, 4);
    ctx.fillRect(8, 11, 10, 4);

    ctx.restore();
  }, [robotState, lookaheadLd, lookaheadPt]);

  return (
    <div className="p-6 rounded-3xl glass-panel border border-slate-200 dark:border-slate-800 space-y-4 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-slate-200 dark:border-slate-800/80">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-500">
            <Navigation className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 font-mono">
              {isId ? 'Laboratorium Kendali Pelacakan Pure Pursuit' : 'Pure Pursuit Path Tracking Laboratory'}
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-sans">
              {isId
                ? 'Ubah jarak lookahead (L_d) untuk melihat perbedaan antara respons agresif (L_d kecil) vs lintasan halus (L_d besar).'
                : 'Adjust the lookahead distance (L_d) to observe aggressive tracking (small L_d) vs smooth cornering (large L_d).'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono bg-cyan-500/15 border border-cyan-500/40 text-cyan-400 font-bold hover:bg-cyan-500/25"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isPlaying ? 'Pause' : 'Play'}</span>
          </button>

          <button
            onClick={() => {
              setRobotState({ x: 50, y: 200, theta: 0 });
              setLookaheadLd(55);
              setSpeed(1.6);
            }}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-mono bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-400 hover:text-slate-200"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Main Canvas View */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-800/80 bg-slate-950 flex justify-center">
        <canvas ref={canvasRef} width={600} height={280} className="w-full max-w-2xl h-auto" />
      </div>

      {/* Telemetry Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
        <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-400 block uppercase">
            {isId ? 'Jarak Lookahead (L_d)' : 'Lookahead Distance (L_d)'}
          </span>
          <strong className="text-lg font-bold text-cyan-400">{lookaheadLd} px</strong>
          <p className="text-[10px] text-slate-500">
            {lookaheadLd < 45 ? (isId ? '⚠️ Agresif / Osilasi' : '⚠️ Aggressive / Oscillatory') : (isId ? '✓ Halus & Stabil' : '✓ Smooth & Stable')}
          </p>
        </div>

        <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-400 block uppercase">
            {isId ? 'Sudut Kemudi (δ_steer)' : 'Steering Angle (δ_steer)'}
          </span>
          <strong className="text-lg font-bold text-amber-400">{steerDeltaDeg.toFixed(1)}°</strong>
          <p className="text-[10px] text-slate-500">δ = atan(2L·sin(α) / L_d)</p>
        </div>

        <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-400 block uppercase">
            {isId ? 'Kurvatur Belok (κ)' : 'Curvature (κ)'}
          </span>
          <strong className="text-lg font-bold text-emerald-400">{curvature.toFixed(4)}</strong>
          <p className="text-[10px] text-slate-500">Radius R = {(1 / (Math.abs(curvature) || 0.001)).toFixed(0)} px</p>
        </div>
      </div>

      {/* Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
        <div className="space-y-1.5 p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="flex justify-between">
            <span className="text-slate-400">{isId ? 'Jarak Lookahead (L_d):' : 'Lookahead Distance (L_d):'}</span>
            <strong className="text-cyan-400">{lookaheadLd} px</strong>
          </div>
          <input
            type="range"
            min="25"
            max="120"
            step="5"
            value={lookaheadLd}
            onChange={(e) => setLookaheadLd(parseInt(e.target.value))}
            className="w-full accent-cyan-500"
          />
        </div>

        <div className="space-y-1.5 p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="flex justify-between">
            <span className="text-slate-400">{isId ? 'Kecepatan Kendaraan (v):' : 'Forward Speed (v):'}</span>
            <strong className="text-emerald-400">{speed.toFixed(1)} px/step</strong>
          </div>
          <input
            type="range"
            min="0.5"
            max="3.5"
            step="0.1"
            value={speed}
            onChange={(e) => setSpeed(parseFloat(e.target.value))}
            className="w-full accent-emerald-500"
          />
        </div>
      </div>
    </div>
  );
}

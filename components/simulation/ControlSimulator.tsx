'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw, Cpu, Sliders, Activity } from 'lucide-react';
import { wrapToPi } from '@/lib/math/vector2d';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useTheme } from '@/lib/theme/ThemeContext';

export function ControlSimulator() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isRunning, setIsRunning] = useState(true);
  const [controller, setController] = useState<'pure_pursuit' | 'stanley'>('pure_pursuit');
  const [lookaheadDist, setLookaheadDist] = useState(38);
  const [stanleyGain, setStanleyGain] = useState(1.4);
  const [speed, setSpeed] = useState(2.2);
  const [trackShape, setTrackShape] = useState<'lemniscate' | 'racetrack' | 'scurve'>('lemniscate');

  const { theme } = useTheme();
  const { locale } = useLanguage();
  const isId = locale === 'id';

  const [telemetry, setTelemetry] = useState({
    crossTrackError: 0,
    headingError: 0,
    steeringAngle: 0,
  });

  const state = useRef({
    robot: { x: 260, y: 160, theta: 0 },
    wheelbase: 22,
    trail: [] as { x: number; y: number }[],
    errorHistory: [] as number[],
  });

  // Generate track path points
  const generateTrack = useCallback(() => {
    const points: { x: number; y: number }[] = [];
    const N = 200;

    if (trackShape === 'lemniscate') {
      // Figure-8 Infinity loop
      const a = 180;
      const b = 90;
      for (let i = 0; i < N; i++) {
        const t = (i / N) * 2 * Math.PI;
        const scale = 2 / (3 - Math.cos(2 * t));
        const x = 260 + a * scale * Math.cos(t);
        const y = 160 + b * scale * (Math.sin(2 * t) / 2);
        points.push({ x, y });
      }
    } else if (trackShape === 'racetrack') {
      // Oval
      for (let i = 0; i < N; i++) {
        const t = (i / N) * 2 * Math.PI;
        const x = 260 + 170 * Math.cos(t);
        const y = 160 + 90 * Math.sin(t);
        points.push({ x, y });
      }
    } else {
      // S-curve
      for (let i = 0; i < N; i++) {
        const t = (i / N) * 2 * Math.PI;
        const x = 70 + (i / N) * 380;
        const y = 160 + 80 * Math.sin(t);
        points.push({ x, y });
      }
    }
    return points;
  }, [trackShape]);

  const reset = useCallback(() => {
    const track = generateTrack();
    state.current.robot = {
      x: track[0].x,
      y: track[0].y,
      theta: 0,
    };
    state.current.trail = [];
    state.current.errorHistory = [];
  }, [generateTrack]);

  useEffect(() => {
    reset();
  }, [trackShape, reset]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let lastTime = performance.now();
    const track = generateTrack();

    const isLight = theme === 'light';

    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;

      const { robot, wheelbase, trail } = state.current;

      if (isRunning && track.length > 0) {
        // Find closest point on track
        let closestIdx = 0;
        let minDistSq = Infinity;
        for (let i = 0; i < track.length; i++) {
          const d2 =
            (track[i].x - robot.x) ** 2 + (track[i].y - robot.y) ** 2;
          if (d2 < minDistSq) {
            minDistSq = d2;
            closestIdx = i;
          }
        }

        const closestPt = track[closestIdx];
        const nextIdx = (closestIdx + 1) % track.length;
        const pathAngle = Math.atan2(
          track[nextIdx].y - closestPt.y,
          track[nextIdx].x - closestPt.x
        );

        let delta = 0; // steering angle command
        let eCross = 0;
        let eHeading = wrapToPi(pathAngle - robot.theta);

        if (controller === 'pure_pursuit') {
          // Find lookahead target point
          let targetIdx = closestIdx;
          for (let i = 0; i < track.length; i++) {
            const idx = (closestIdx + i) % track.length;
            const dist = Math.hypot(track[idx].x - robot.x, track[idx].y - robot.y);
            if (dist >= lookaheadDist) {
              targetIdx = idx;
              break;
            }
          }

          const targetPt = track[targetIdx];
          const alpha = wrapToPi(
            Math.atan2(targetPt.y - robot.y, targetPt.x - robot.x) - robot.theta
          );

          // Pure Pursuit steering law: delta = atan2(2 * L * sin(alpha), L_f)
          delta = Math.atan2(2 * wheelbase * Math.sin(alpha), lookaheadDist);
          eCross = Math.sqrt(minDistSq);
        } else {
          // Stanley Controller: delta = e_theta + atan(k * e_y / (v + 0.1))
          const dx = robot.x - closestPt.x;
          const dy = robot.y - closestPt.y;
          // Cross product to get signed lateral error
          const cross = Math.cos(pathAngle) * dy - Math.sin(pathAngle) * dx;
          eCross = cross;

          delta = eHeading + Math.atan((stanleyGain * eCross) / (speed * 15 + 0.1));
        }

        // Clamp steering angle
        const maxSteer = Math.PI / 4.5;
        delta = Math.max(-maxSteer, Math.min(maxSteer, delta));

        // Kinematic bicycle update
        const v = speed * 45;
        robot.theta = wrapToPi(robot.theta + (v / wheelbase) * Math.tan(delta) * dt);
        robot.x += v * Math.cos(robot.theta) * dt;
        robot.y += v * Math.sin(robot.theta) * dt;

        trail.push({ x: robot.x, y: robot.y });
        if (trail.length > 180) trail.shift();

        setTelemetry({
          crossTrackError: Number(Math.abs(eCross).toFixed(2)),
          headingError: Number(((eHeading * 180) / Math.PI).toFixed(1)),
          steeringAngle: Number(((delta * 180) / Math.PI).toFixed(1)),
        });
      }

      // RENDER
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background
      ctx.fillStyle = isLight ? '#f1f5f9' : '#050811';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Grid
      ctx.strokeStyle = isLight ? 'rgba(203, 213, 225, 0.6)' : 'rgba(51, 65, 85, 0.25)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw Reference Track
      if (track.length > 1) {
        ctx.beginPath();
        ctx.moveTo(track[0].x, track[0].y);
        for (let i = 1; i < track.length; i++) {
          ctx.lineTo(track[i].x, track[i].y);
        }
        if (trackShape !== 'scurve') ctx.closePath();
        ctx.strokeStyle = isLight ? '#0284c7' : '#06b6d4';
        ctx.lineWidth = 4;
        ctx.stroke();

        ctx.strokeStyle = isLight ? 'rgba(2, 132, 199, 0.15)' : 'rgba(6, 182, 212, 0.2)';
        ctx.lineWidth = 14;
        ctx.stroke();
      }

      // Draw Robot Trail
      if (trail.length > 1) {
        ctx.beginPath();
        ctx.moveTo(trail[0].x, trail[0].y);
        for (let i = 1; i < trail.length; i++) {
          ctx.lineTo(trail[i].x, trail[i].y);
        }
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 2;
        ctx.setLineDash([3, 3]);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Draw Robot Vehicle
      ctx.save();
      ctx.translate(robot.x, robot.y);
      ctx.rotate(robot.theta);

      // Chassis
      ctx.fillStyle = isLight ? '#ffffff' : '#0f172a';
      ctx.strokeStyle = isLight ? '#0284c7' : '#22d3ee';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.roundRect(-wheelbase / 2 - 4, -12, wheelbase + 8, 24, 4);
      ctx.fill();
      ctx.stroke();

      // Rear Wheels
      ctx.fillStyle = isLight ? '#475569' : '#64748b';
      ctx.fillRect(-wheelbase / 2 - 2, -15, 8, 4);
      ctx.fillRect(-wheelbase / 2 - 2, 11, 8, 4);

      // Front Steered Wheels
      const steer = (telemetry.steeringAngle * Math.PI) / 180;
      ctx.save();
      ctx.translate(wheelbase / 2, -13);
      ctx.rotate(steer);
      ctx.fillRect(-4, -2, 8, 4);
      ctx.restore();

      ctx.save();
      ctx.translate(wheelbase / 2, 13);
      ctx.rotate(steer);
      ctx.fillRect(-4, -2, 8, 4);
      ctx.restore();

      // Heading indicator
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(wheelbase / 2 + 8, 0);
      ctx.strokeStyle = '#f43f5e';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [isRunning, controller, lookaheadDist, stanleyGain, speed, trackShape, generateTrack, telemetry.steeringAngle, theme]);

  return (
    <div className="rounded-2xl glass-panel border border-slate-200 dark:border-slate-800/90 overflow-hidden shadow-2xl space-y-0">
      {/* Top Header & Telemetry */}
      <div className="px-4 py-3 bg-slate-100/90 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800/80 flex items-center justify-between flex-wrap gap-2 text-xs font-mono text-slate-800 dark:text-slate-200">
        <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-bold">
          <Cpu className="w-4 h-4" />
          <span>{isId ? 'Simulator Kemudi Pelacak Jalur (Pure Pursuit vs Stanley)' : 'Steering Path Tracking Simulator (Pure Pursuit vs Stanley)'}</span>
        </div>

        <div className="flex items-center gap-4 text-[11px]">
          <span>
            {isId ? 'Error Cross-Track:' : 'Cross-Track Err:'} <strong className="text-amber-600 dark:text-amber-400">{telemetry.crossTrackError} px</strong>
          </span>
          <span>
            {isId ? 'Sudut Kemudi δ:' : 'Steer δ:'} <strong className="text-cyan-600 dark:text-cyan-400">{telemetry.steeringAngle}°</strong>
          </span>
        </div>
      </div>

      {/* Canvas Viewport */}
      <div className="relative aspect-[16/9] w-full max-h-[320px] bg-[#f1f5f9] dark:bg-[#050811]">
        <canvas ref={canvasRef} width={520} height={320} className="w-full h-full block" />
      </div>

      {/* Control Toolbar */}
      <div className="p-4 bg-slate-50 dark:bg-slate-900/90 border-t border-slate-200 dark:border-slate-800 space-y-3 text-xs font-mono">
        <div className="flex items-center justify-between flex-wrap gap-3">
          {/* Controller Type */}
          <div className="flex items-center gap-2">
            <span className="text-slate-600 dark:text-slate-400">{isId ? 'Pelacak:' : 'Tracker:'}</span>
            <div className="flex bg-slate-200 dark:bg-slate-950 p-1 rounded-lg border border-slate-300 dark:border-slate-800">
              <button
                onClick={() => setController('pure_pursuit')}
                className={`px-3 py-1 rounded transition-all ${
                  controller === 'pure_pursuit'
                    ? 'bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 font-bold border border-cyan-500/40'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                Pure Pursuit (Lookahead)
              </button>
              <button
                onClick={() => setController('stanley')}
                className={`px-3 py-1 rounded transition-all ${
                  controller === 'stanley'
                    ? 'bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 font-bold border border-cyan-500/40'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                Stanley Controller
              </button>
            </div>
          </div>

          {/* Track Shape */}
          <div className="flex items-center gap-1.5 bg-slate-200 dark:bg-slate-950 p-1 rounded-lg border border-slate-300 dark:border-slate-800 text-[11px]">
            <span className="text-slate-500 px-1">{isId ? 'Bentuk Trek:' : 'Track:'}</span>
            {(['lemniscate', 'racetrack', 'scurve'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTrackShape(t)}
                className={`px-2 py-0.5 rounded capitalize transition-all ${
                  trackShape === t
                    ? 'bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 font-semibold border border-cyan-500/30'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Sliders */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          {controller === 'pure_pursuit' ? (
            <div className="bg-white dark:bg-slate-950/60 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1.5">
              <div className="flex justify-between text-slate-700 dark:text-slate-300">
                <span>{isId ? 'Jarak Lookahead (L_f):' : 'Lookahead Distance (L_f):'}</span>
                <span className="text-amber-600 dark:text-amber-400 font-bold">{lookaheadDist} px</span>
              </div>
              <input
                type="range"
                min={20}
                max={70}
                step={2}
                value={lookaheadDist}
                onChange={(e) => setLookaheadDist(parseInt(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none"
              />
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-950/60 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1.5">
              <div className="flex justify-between text-slate-700 dark:text-slate-300">
                <span>{isId ? 'Gain Cross-Track Stanley (k):' : 'Stanley Cross-Track Gain (k):'}</span>
                <span className="text-cyan-600 dark:text-cyan-400 font-bold">{stanleyGain.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min={0.5}
                max={3.0}
                step={0.1}
                value={stanleyGain}
                onChange={(e) => setStanleyGain(parseFloat(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none"
              />
            </div>
          )}

          <div className="bg-white dark:bg-slate-950/60 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1.5">
            <div className="flex justify-between text-slate-700 dark:text-slate-300">
              <span>{isId ? 'Kecepatan Maju (v):' : 'Velocity (v):'}</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">{speed.toFixed(1)} m/s</span>
            </div>
            <input
              type="range"
              min={1.0}
              max={4.0}
              step={0.2}
              value={speed}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none"
            />
          </div>
        </div>

        {/* Action Toolbar */}
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
              {isId ? 'Reset Kendaraan' : 'Reset Vehicle'}
            </button>
          </div>

          <div className="text-[11px] text-slate-500 dark:text-slate-400">
            {isId ? 'Kendali kemudi meminimalkan kesalahan lateral dan heading secara adaptif.' : 'Geometric steering continuously minimizes lateral error and heading error.'}
          </div>
        </div>
      </div>
    </div>
  );
}

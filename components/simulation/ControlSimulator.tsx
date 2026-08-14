'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw, Cpu, Sliders, Activity } from 'lucide-react';
import { wrapToPi } from '@/lib/math/vector2d';

export function ControlSimulator() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isRunning, setIsRunning] = useState(true);
  const [controller, setController] = useState<'pure_pursuit' | 'stanley'>('pure_pursuit');
  const [lookaheadDist, setLookaheadDist] = useState(38);
  const [stanleyGain, setStanleyGain] = useState(1.4);
  const [speed, setSpeed] = useState(2.2);
  const [trackShape, setTrackShape] = useState<'lemniscate' | 'racetrack' | 'scurve'>('lemniscate');

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
    let lastFrame = performance.now();
    const track = generateTrack();

    const render = (time: number) => {
      const dt = Math.min((time - lastFrame) / 1000, 0.1);
      lastFrame = time;

      const s = state.current;
      const { robot, wheelbase } = s;

      let targetPoint = track[0];
      let crossTrackErr = 0;
      let headingErr = 0;
      let deltaSteer = 0;

      if (isRunning) {
        // Find closest point on path
        let minDist = Infinity;
        let closestIdx = 0;
        for (let i = 0; i < track.length; i++) {
          const d = Math.hypot(track[i].x - robot.x, track[i].y - robot.y);
          if (d < minDist) {
            minDist = d;
            closestIdx = i;
          }
        }

        const closestPt = track[closestIdx];
        const nextPt = track[(closestIdx + 1) % track.length];
        const pathHeading = Math.atan2(nextPt.y - closestPt.y, nextPt.x - closestPt.x);

        // Cross-track error vector (signed distance)
        const dx = robot.x - closestPt.x;
        const dy = robot.y - closestPt.y;
        crossTrackErr = -Math.sin(pathHeading) * dx + Math.cos(pathHeading) * dy;
        headingErr = wrapToPi(robot.theta - pathHeading);

        if (controller === 'pure_pursuit') {
          // Pure Pursuit: Find lookahead target point
          let lookaheadIdx = closestIdx;
          for (let i = 0; i < track.length; i++) {
            const idx = (closestIdx + i) % track.length;
            const d = Math.hypot(track[idx].x - robot.x, track[idx].y - robot.y);
            if (d >= lookaheadDist) {
              lookaheadIdx = idx;
              break;
            }
          }
          targetPoint = track[lookaheadIdx];

          const alpha = wrapToPi(
            Math.atan2(targetPoint.y - robot.y, targetPoint.x - robot.x) - robot.theta
          );
          deltaSteer = Math.atan2(2 * wheelbase * Math.sin(alpha), lookaheadDist);
        } else {
          // Stanley Controller: delta = (theta_path - theta_robot) + atan2(k * e_ct, v)
          const thetaError = wrapToPi(pathHeading - robot.theta);
          const ctCorrection = Math.atan2(stanleyGain * -crossTrackErr, speed * 25);
          deltaSteer = wrapToPi(thetaError + ctCorrection);
        }

        // Steering limits
        deltaSteer = Math.max(-0.65, Math.min(0.65, deltaSteer));

        // Bicycle kinematic model integration
        robot.theta = wrapToPi(robot.theta + ((speed * 30) / wheelbase) * Math.tan(deltaSteer) * dt);
        robot.x += Math.cos(robot.theta) * speed * 30 * dt;
        robot.y += Math.sin(robot.theta) * speed * 30 * dt;

        s.trail.push({ x: robot.x, y: robot.y });
        if (s.trail.length > 200) s.trail.shift();

        s.errorHistory.push(Math.abs(crossTrackErr));
        if (s.errorHistory.length > 80) s.errorHistory.shift();

        setTelemetry({
          crossTrackError: Number(crossTrackErr.toFixed(2)),
          headingError: Number(headingErr.toFixed(2)),
          steeringAngle: Number(((deltaSteer * 180) / Math.PI).toFixed(1)),
        });
      }

      // Drawing
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Grid
      ctx.strokeStyle = 'rgba(51, 65, 85, 0.2)';
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

      // Reference Track
      ctx.beginPath();
      ctx.moveTo(track[0].x, track[0].y);
      for (let i = 1; i < track.length; i++) {
        ctx.lineTo(track[i].x, track[i].y);
      }
      if (trackShape !== 'scurve') ctx.closePath();
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.4)';
      ctx.lineWidth = 4;
      ctx.stroke();

      // Robot Trajectory Trail (cyan)
      if (s.trail.length > 1) {
        ctx.beginPath();
        ctx.moveTo(s.trail[0].x, s.trail[0].y);
        for (let i = 1; i < s.trail.length; i++) {
          ctx.lineTo(s.trail[i].x, s.trail[i].y);
        }
        ctx.strokeStyle = '#06b6d4';
        ctx.lineWidth = 2.5;
        ctx.stroke();
      }

      // Pure Pursuit Lookahead Circle & Target Vector
      if (controller === 'pure_pursuit') {
        ctx.beginPath();
        ctx.arc(robot.x, robot.y, lookaheadDist, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(251, 191, 36, 0.35)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([3, 3]);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.beginPath();
        ctx.moveTo(robot.x, robot.y);
        ctx.lineTo(targetPoint.x, targetPoint.y);
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(targetPoint.x, targetPoint.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#f59e0b';
        ctx.fill();
      }

      // Robot Vehicle
      ctx.save();
      ctx.translate(robot.x, robot.y);
      ctx.rotate(robot.theta);

      // Chassis
      ctx.fillStyle = '#090d16';
      ctx.strokeStyle = '#00f2fe';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(-wheelbase / 2, -10, wheelbase + 6, 20, 4);
      ctx.fill();
      ctx.stroke();

      // Front steering wheel
      ctx.save();
      ctx.translate(wheelbase / 2, 0);
      ctx.rotate(deltaSteer);
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(-6, -3, 12, 6);
      ctx.restore();

      // Rear fixed wheel
      ctx.fillStyle = '#64748b';
      ctx.fillRect(-wheelbase / 2 - 4, -3, 8, 6);

      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [isRunning, controller, generateTrack, lookaheadDist, speed, stanleyGain, trackShape]);

  return (
    <div className="rounded-2xl glass-panel border border-slate-800/90 overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="px-4 py-3 bg-slate-900/80 border-b border-slate-800/80 flex items-center justify-between flex-wrap gap-2 text-xs font-mono">
        <div className="flex items-center gap-2 text-cyan-400 font-bold">
          <Cpu className="w-4 h-4" />
          <span>Path Tracking Controller Sandbox</span>
        </div>

        <div className="flex items-center gap-4 text-[11px] text-slate-300">
          <span>
            Cross-Track e_ct:{' '}
            <strong className={Math.abs(telemetry.crossTrackError) < 4 ? 'text-emerald-400' : 'text-rose-400'}>
              {telemetry.crossTrackError} px
            </strong>
          </span>
          <span>
            Heading Error: <strong className="text-cyan-400">{telemetry.headingError} rad</strong>
          </span>
          <span>
            Steer δ: <strong className="text-amber-400">{telemetry.steeringAngle}°</strong>
          </span>
        </div>
      </div>

      {/* Canvas */}
      <div className="relative aspect-[16/9] w-full max-h-[340px] bg-[#050811]">
        <canvas ref={canvasRef} width={520} height={320} className="w-full h-full block" />
      </div>

      {/* Controls */}
      <div className="p-4 bg-slate-900/90 border-t border-slate-800 space-y-3 text-xs font-mono">
        <div className="flex items-center justify-between flex-wrap gap-3">
          {/* Controller Type */}
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Tracker:</span>
            <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800">
              <button
                onClick={() => setController('pure_pursuit')}
                className={`px-3 py-1 rounded transition-all ${
                  controller === 'pure_pursuit'
                    ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Pure Pursuit (Lookahead)
              </button>
              <button
                onClick={() => setController('stanley')}
                className={`px-3 py-1 rounded transition-all ${
                  controller === 'stanley'
                    ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Stanley Controller
              </button>
            </div>
          </div>

          {/* Track Shape */}
          <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800 text-[11px]">
            <span className="text-slate-500 px-1">Track:</span>
            {(['lemniscate', 'racetrack', 'scurve'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTrackShape(t)}
                className={`px-2 py-0.5 rounded capitalize transition-all ${
                  trackShape === t
                    ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30'
                    : 'text-slate-400 hover:text-slate-200'
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
            <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800 space-y-1.5">
              <div className="flex justify-between text-slate-300">
                <span>Lookahead Distance (L_f):</span>
                <span className="text-amber-400 font-bold">{lookaheadDist} px</span>
              </div>
              <input
                type="range"
                min={20}
                max={70}
                step={2}
                value={lookaheadDist}
                onChange={(e) => setLookaheadDist(parseInt(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg appearance-none"
              />
            </div>
          ) : (
            <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800 space-y-1.5">
              <div className="flex justify-between text-slate-300">
                <span>Stanley Cross-Track Gain (k):</span>
                <span className="text-cyan-400 font-bold">{stanleyGain.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min={0.5}
                max={3.0}
                step={0.1}
                value={stanleyGain}
                onChange={(e) => setStanleyGain(parseFloat(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg appearance-none"
              />
            </div>
          )}

          <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800 space-y-1.5">
            <div className="flex justify-between text-slate-300">
              <span>Velocity (v):</span>
              <span className="text-emerald-400 font-bold">{speed.toFixed(1)} m/s</span>
            </div>
            <input
              type="range"
              min={1.0}
              max={4.0}
              step={0.2}
              value={speed}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg appearance-none"
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
                  ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                  : 'bg-cyan-500/15 text-cyan-300 border-cyan-500/40'
              }`}
            >
              {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              {isRunning ? 'Pause' : 'Resume'}
            </button>

            <button
              onClick={reset}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Vehicle
            </button>
          </div>

          <div className="text-[11px] text-slate-400">
            Geometric steering continuously minimizes lateral error $e_y$ and heading error $e_\theta$.
          </div>
        </div>
      </div>
    </div>
  );
}

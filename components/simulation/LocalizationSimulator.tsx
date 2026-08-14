'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw, MapPin, Sliders, Radio, Eye } from 'lucide-react';
import { wrapToPi } from '@/lib/math/vector2d';

interface Landmark {
  id: number;
  x: number;
  y: number;
}

interface Particle {
  x: number;
  y: number;
  theta: number;
  w: number;
}

const LANDMARKS: Landmark[] = [
  { id: 1, x: 80, y: 70 },
  { id: 2, x: 440, y: 70 },
  { id: 3, x: 440, y: 250 },
  { id: 4, x: 80, y: 250 },
  { id: 5, x: 260, y: 160 },
];

export function LocalizationSimulator() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isRunning, setIsRunning] = useState(true);
  const [numParticles, setNumParticles] = useState(300);
  const [sensorNoise, setSensorNoise] = useState(5);
  const [motionNoise, setMotionNoise] = useState(0.08);

  const landmarks = LANDMARKS;

  const state = useRef({
    trueRobot: { x: 120, y: 160, theta: 0 },
    deadReckoning: { x: 120, y: 160, theta: 0 },
    particles: [] as Particle[],
    trueTrail: [] as { x: number; y: number }[],
    drTrail: [] as { x: number; y: number }[],
    estimatedPose: { x: 120, y: 160, theta: 0 },
  });

  const reset = useCallback(() => {
    const particles: Particle[] = [];
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * 460 + 30,
        y: Math.random() * 260 + 30,
        theta: (Math.random() - 0.5) * 2 * Math.PI,
        w: 1 / numParticles,
      });
    }

    state.current = {
      trueRobot: { x: 120, y: 160, theta: 0 },
      deadReckoning: { x: 120, y: 160, theta: 0 },
      particles,
      trueTrail: [],
      drTrail: [],
      estimatedPose: { x: 120, y: 160, theta: 0 },
    };
  }, [numParticles]);

  useEffect(() => {
    reset();
  }, [numParticles, reset]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let lastFrame = performance.now();

    const render = (time: number) => {
      const dt = Math.min((time - lastFrame) / 1000, 0.1);
      lastFrame = time;

      const s = state.current;
      const { trueRobot, deadReckoning, particles } = s;

      if (isRunning) {
        // Robot moves in an elliptical path
        const v = 50;
        const omega = 0.45;

        // 1. True robot kinematics
        trueRobot.theta = wrapToPi(trueRobot.theta + omega * dt);
        trueRobot.x += Math.cos(trueRobot.theta) * v * dt;
        trueRobot.y += Math.sin(trueRobot.theta) * v * dt;

        s.trueTrail.push({ x: trueRobot.x, y: trueRobot.y });
        if (s.trueTrail.length > 180) s.trueTrail.shift();

        // 2. Dead reckoning odometry (accumulates wheel drift error)
        const drV = v * (1 + (Math.random() - 0.5) * motionNoise * 2);
        const drOmega = omega * (1 + (Math.random() - 0.5) * motionNoise * 3);
        deadReckoning.theta = wrapToPi(deadReckoning.theta + drOmega * dt);
        deadReckoning.x += Math.cos(deadReckoning.theta) * drV * dt;
        deadReckoning.y += Math.sin(deadReckoning.theta) * drV * dt;

        s.drTrail.push({ x: deadReckoning.x, y: deadReckoning.y });
        if (s.drTrail.length > 180) s.drTrail.shift();

        // 3. Motion Update on Particles (predict step)
        for (const p of particles) {
          const pV = v * (1 + (Math.random() - 0.5) * motionNoise * 4);
          const pOmega = omega * (1 + (Math.random() - 0.5) * motionNoise * 4);
          p.theta = wrapToPi(p.theta + pOmega * dt);
          p.x += Math.cos(p.theta) * pV * dt;
          p.y += Math.sin(p.theta) * pV * dt;
        }

        // 4. Sensor Measurement & Particle Weighting (update step)
        // Measure range to each visible landmark
        const maxRange = 220;
        const measurements: { id: number; r: number }[] = [];

        for (const lm of landmarks) {
          const d = Math.hypot(lm.x - trueRobot.x, lm.y - trueRobot.y);
          if (d < maxRange) {
            // Add sensor noise
            measurements.push({
              id: lm.id,
              r: d + (Math.random() - 0.5) * sensorNoise,
            });
          }
        }

        if (measurements.length > 0) {
          let totalWeight = 0;
          for (const p of particles) {
            let weight = 1.0;
            for (const m of measurements) {
              const lm = landmarks.find((l) => l.id === m.id)!;
              const expectedDist = Math.hypot(lm.x - p.x, lm.y - p.y);
              const error = Math.abs(m.r - expectedDist);
              // Gaussian likelihood
              const likelihood = Math.exp(-(error * error) / (2 * sensorNoise * sensorNoise));
              weight *= Math.max(0.0001, likelihood);
            }
            p.w = weight;
            totalWeight += weight;
          }

          // Normalize
          if (totalWeight > 0) {
            for (const p of particles) p.w /= totalWeight;
          }

          // Low-variance systematic resampling
          const newParticles: Particle[] = [];
          const N = particles.length;
          const r0 = (Math.random() / N);
          let c = particles[0].w;
          let i = 0;

          for (let m = 0; m < N; m++) {
            const u = r0 + m / N;
            while (u > c && i < N - 1) {
              i++;
              c += particles[i].w;
            }
            // Add slight jitter
            newParticles.push({
              x: particles[i].x + (Math.random() - 0.5) * 4,
              y: particles[i].y + (Math.random() - 0.5) * 4,
              theta: wrapToPi(particles[i].theta + (Math.random() - 0.5) * 0.1),
              w: 1 / N,
            });
          }
          s.particles = newParticles;
        }

        // Weighted Average Estimated Pose
        let avgX = 0;
        let avgY = 0;
        for (const p of s.particles) {
          avgX += p.x;
          avgY += p.y;
        }
        s.estimatedPose = {
          x: avgX / s.particles.length,
          y: avgY / s.particles.length,
          theta: trueRobot.theta,
        };
      }

      // Drawing
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Grid
      ctx.strokeStyle = 'rgba(51, 65, 85, 0.25)';
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

      // Landmarks
      for (const lm of landmarks) {
        ctx.beginPath();
        ctx.arc(lm.x, lm.y, 8, 0, Math.PI * 2);
        ctx.fillStyle = '#f59e0b';
        ctx.fill();
        ctx.strokeStyle = '#d97706';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = '#fef3c7';
        ctx.font = 'bold 9px monospace';
        ctx.fillText(`L${lm.id}`, lm.x - 5, lm.y + 18);
      }

      // Particle Cloud (amber dots)
      for (const p of s.particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(251, 191, 36, 0.65)';
        ctx.fill();
      }

      // Dead Reckoning Drift Trail (Red dashed)
      if (s.drTrail.length > 1) {
        ctx.beginPath();
        ctx.moveTo(s.drTrail[0].x, s.drTrail[0].y);
        for (let i = 1; i < s.drTrail.length; i++) {
          ctx.lineTo(s.drTrail[i].x, s.drTrail[i].y);
        }
        ctx.strokeStyle = 'rgba(244, 63, 94, 0.5)';
        ctx.lineWidth = 2;
        ctx.setLineDash([3, 3]);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // True Robot Trail (Cyan Solid)
      if (s.trueTrail.length > 1) {
        ctx.beginPath();
        ctx.moveTo(s.trueTrail[0].x, s.trueTrail[0].y);
        for (let i = 1; i < s.trueTrail.length; i++) {
          ctx.lineTo(s.trueTrail[i].x, s.trueTrail[i].y);
        }
        ctx.strokeStyle = 'rgba(6, 182, 212, 0.7)';
        ctx.lineWidth = 2.5;
        ctx.stroke();
      }

      // Sensor Beams from True Robot to Landmarks
      for (const lm of landmarks) {
        const d = Math.hypot(lm.x - trueRobot.x, lm.y - trueRobot.y);
        if (d < 220) {
          ctx.beginPath();
          ctx.moveTo(trueRobot.x, trueRobot.y);
          ctx.lineTo(lm.x, lm.y);
          ctx.strokeStyle = 'rgba(245, 158, 11, 0.35)';
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      }

      // Dead Reckoning Ghost Robot (Red outline)
      ctx.beginPath();
      ctx.arc(deadReckoning.x, deadReckoning.y, 14, 0, Math.PI * 2);
      ctx.strokeStyle = '#f43f5e';
      ctx.lineWidth = 2;
      ctx.setLineDash([2, 2]);
      ctx.stroke();
      ctx.setLineDash([]);

      // True Robot (Cyan)
      ctx.beginPath();
      ctx.arc(trueRobot.x, trueRobot.y, 14, 0, Math.PI * 2);
      ctx.fillStyle = '#090d16';
      ctx.fill();
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Heading arrow
      ctx.beginPath();
      ctx.moveTo(trueRobot.x, trueRobot.y);
      ctx.lineTo(
        trueRobot.x + Math.cos(trueRobot.theta) * 20,
        trueRobot.y + Math.sin(trueRobot.theta) * 20
      );
      ctx.strokeStyle = '#00f2fe';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [isRunning, landmarks, motionNoise, sensorNoise]);

  return (
    <div className="rounded-2xl glass-panel border border-slate-800/90 overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="px-4 py-3 bg-slate-900/80 border-b border-slate-800/80 flex items-center justify-between flex-wrap gap-2 text-xs font-mono">
        <div className="flex items-center gap-2 text-cyan-400 font-bold">
          <MapPin className="w-4 h-4" />
          <span>Monte Carlo Particle Filter (MCL) State Estimator</span>
        </div>

        <div className="flex items-center gap-4 text-[11px]">
          <span className="text-cyan-400">● True Robot Pose</span>
          <span className="text-rose-400">◌ Odometry Drift</span>
          <span className="text-amber-400">✦ {numParticles} Particle Cloud</span>
        </div>
      </div>

      {/* Canvas */}
      <div className="relative aspect-[16/9] w-full max-h-[340px] bg-[#050811]">
        <canvas ref={canvasRef} width={520} height={320} className="w-full h-full block" />
      </div>

      {/* Controls */}
      <div className="p-4 bg-slate-900/90 border-t border-slate-800 space-y-3 text-xs font-mono">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800 space-y-1.5">
            <div className="flex justify-between text-slate-300">
              <span>Particle Count (M):</span>
              <span className="text-amber-400 font-bold">{numParticles}</span>
            </div>
            <input
              type="range"
              min={100}
              max={600}
              step={50}
              value={numParticles}
              onChange={(e) => setNumParticles(parseInt(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg appearance-none"
            />
          </div>

          <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800 space-y-1.5">
            <div className="flex justify-between text-slate-300">
              <span>Sensor Range Noise (σ):</span>
              <span className="text-cyan-400 font-bold">{sensorNoise} px</span>
            </div>
            <input
              type="range"
              min={1}
              max={15}
              step={1}
              value={sensorNoise}
              onChange={(e) => setSensorNoise(parseInt(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg appearance-none"
            />
          </div>
        </div>

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
              Scramble Particles
            </button>
          </div>

          <div className="text-[11px] text-slate-400">
            Beacon triangulation collapses particle uncertainty into the true belief state.
          </div>
        </div>
      </div>
    </div>
  );
}

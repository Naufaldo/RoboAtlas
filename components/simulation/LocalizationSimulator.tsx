'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw, MapPin, Sliders, Radio, Eye } from 'lucide-react';
import { wrapToPi } from '@/lib/math/vector2d';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useTheme } from '@/lib/theme/ThemeContext';

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

  const { theme } = useTheme();
  const { locale } = useLanguage();
  const isId = locale === 'id';

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
  }, [reset]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let lastTime = performance.now();
    const isLight = theme === 'light';

    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;

      const s = state.current;
      const { trueRobot, deadReckoning } = s;

      if (isRunning) {
        // True robot moves on an oval path
        const v = 55; // pixels/s
        const omega = 0.5; // rad/s

        // True motion update
        trueRobot.theta = wrapToPi(trueRobot.theta + omega * dt);
        trueRobot.x += v * Math.cos(trueRobot.theta) * dt;
        trueRobot.y += v * Math.sin(trueRobot.theta) * dt;

        // Dead reckoning has systematic and random drift
        const drOmega = omega * 1.06 + (Math.random() - 0.5) * motionNoise;
        const drV = v * 0.96 + (Math.random() - 0.5) * (motionNoise * 20);
        deadReckoning.theta = wrapToPi(deadReckoning.theta + drOmega * dt);
        deadReckoning.x += drV * Math.cos(deadReckoning.theta) * dt;
        deadReckoning.y += drV * Math.sin(deadReckoning.theta) * dt;

        s.trueTrail.push({ x: trueRobot.x, y: trueRobot.y });
        if (s.trueTrail.length > 150) s.trueTrail.shift();

        s.drTrail.push({ x: deadReckoning.x, y: deadReckoning.y });
        if (s.drTrail.length > 150) s.drTrail.shift();

        // 1. Motion Predict for Particles
        for (const p of s.particles) {
          const pV = v + (Math.random() - 0.5) * (motionNoise * 40);
          const pW = omega + (Math.random() - 0.5) * (motionNoise * 1.5);
          p.theta = wrapToPi(p.theta + pW * dt);
          p.x += pV * Math.cos(p.theta) * dt;
          p.y += pV * Math.sin(p.theta) * dt;
        }

        // 2. Sensor Measurement Update (Range to landmarks)
        const trueMeasurements: number[] = [];
        for (const lm of landmarks) {
          const dist = Math.hypot(lm.x - trueRobot.x, lm.y - trueRobot.y);
          trueMeasurements.push(dist + (Math.random() - 0.5) * sensorNoise);
        }

        // Weight particles by Gaussian likelihood of range
        let totalW = 0;
        for (const p of s.particles) {
          let likelihood = 1.0;
          for (let i = 0; i < landmarks.length; i++) {
            const lm = landmarks[i];
            const pDist = Math.hypot(lm.x - p.x, lm.y - p.y);
            const error = pDist - trueMeasurements[i];
            // Gaussian probability
            likelihood *= Math.exp(-(error * error) / (2 * sensorNoise * sensorNoise));
          }
          p.w = likelihood + 1e-10;
          totalW += p.w;
        }

        // Normalize weights
        for (const p of s.particles) {
          p.w /= totalW;
        }

        // 3. Low-variance Resampling
        const newParticles: Particle[] = [];
        const r = Math.random() / s.particles.length;
        let c = s.particles[0].w;
        let idx = 0;

        for (let m = 0; m < s.particles.length; m++) {
          const u = r + m / s.particles.length;
          while (u > c && idx < s.particles.length - 1) {
            idx++;
            c += s.particles[idx].w;
          }
          const base = s.particles[idx];
          // Add small jitter
          newParticles.push({
            x: base.x + (Math.random() - 0.5) * 3,
            y: base.y + (Math.random() - 0.5) * 3,
            theta: wrapToPi(base.theta + (Math.random() - 0.5) * 0.1),
            w: 1 / s.particles.length,
          });
        }
        s.particles = newParticles;
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

      // Landmarks (Beacons)
      for (const lm of landmarks) {
        ctx.beginPath();
        ctx.arc(lm.x, lm.y, 8, 0, Math.PI * 2);
        ctx.fillStyle = '#f59e0b';
        ctx.fill();
        ctx.strokeStyle = '#d97706';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = isLight ? '#78350f' : '#fef3c7';
        ctx.font = 'bold 9px monospace';
        ctx.fillText(`L${lm.id}`, lm.x - 5, lm.y + 18);
      }

      // Particle Cloud (amber dots)
      for (const p of s.particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = isLight ? 'rgba(217, 119, 6, 0.65)' : 'rgba(251, 191, 36, 0.65)';
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
        ctx.strokeStyle = isLight ? 'rgba(2, 132, 199, 0.7)' : 'rgba(6, 182, 212, 0.7)';
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
          ctx.strokeStyle = isLight ? 'rgba(217, 119, 6, 0.35)' : 'rgba(245, 158, 11, 0.35)';
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
      ctx.fillStyle = isLight ? '#ffffff' : '#090d16';
      ctx.fill();
      ctx.strokeStyle = isLight ? '#0284c7' : '#06b6d4';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Heading arrow
      ctx.beginPath();
      ctx.moveTo(trueRobot.x, trueRobot.y);
      ctx.lineTo(
        trueRobot.x + Math.cos(trueRobot.theta) * 20,
        trueRobot.y + Math.sin(trueRobot.theta) * 20
      );
      ctx.strokeStyle = isLight ? '#0284c7' : '#00f2fe';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [isRunning, landmarks, motionNoise, sensorNoise, theme]);

  return (
    <div className="rounded-2xl glass-panel border border-slate-200 dark:border-slate-800/90 overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="px-4 py-3 bg-slate-100/90 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800/80 flex items-center justify-between flex-wrap gap-2 text-xs font-mono text-slate-800 dark:text-slate-200">
        <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-bold">
          <MapPin className="w-4 h-4" />
          <span>{isId ? 'Estimator Status Filter Partikel Monte Carlo (MCL)' : 'Monte Carlo Particle Filter (MCL) State Estimator'}</span>
        </div>

        <div className="flex items-center gap-3 text-[11px]">
          <span className="text-cyan-600 dark:text-cyan-400 font-semibold">{isId ? '● Pose Sejati' : '● True Pose'}</span>
          <span className="text-rose-600 dark:text-rose-400 font-semibold">{isId ? '◌ Drift Odometri' : '◌ Odometry Drift'}</span>
          <span className="text-amber-600 dark:text-amber-400 font-semibold">✦ {numParticles} {isId ? 'Partikel' : 'Particles'}</span>
        </div>
      </div>

      {/* Canvas */}
      <div className="relative aspect-[16/9] w-full max-h-[340px] bg-[#f1f5f9] dark:bg-[#050811]">
        <canvas ref={canvasRef} width={520} height={320} className="w-full h-full block" />
      </div>

      {/* Controls */}
      <div className="p-4 bg-slate-50 dark:bg-slate-900/90 border-t border-slate-200 dark:border-slate-800 space-y-3 text-xs font-mono">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-slate-950/60 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1.5">
            <div className="flex justify-between text-slate-700 dark:text-slate-300">
              <span>{isId ? 'Jumlah Partikel (M):' : 'Particle Count (M):'}</span>
              <span className="text-amber-600 dark:text-amber-400 font-bold">{numParticles}</span>
            </div>
            <input
              type="range"
              min={100}
              max={600}
              step={50}
              value={numParticles}
              onChange={(e) => setNumParticles(parseInt(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none"
            />
          </div>

          <div className="bg-white dark:bg-slate-950/60 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1.5">
            <div className="flex justify-between text-slate-700 dark:text-slate-300">
              <span>{isId ? 'Noise Jarak Sensor (σ):' : 'Sensor Range Noise (σ):'}</span>
              <span className="text-cyan-600 dark:text-cyan-400 font-bold">{sensorNoise} px</span>
            </div>
            <input
              type="range"
              min={1}
              max={15}
              step={1}
              value={sensorNoise}
              onChange={(e) => setSensorNoise(parseInt(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none"
            />
          </div>
        </div>

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
              {isId ? 'Acak Ulang Partikel' : 'Scramble Particles'}
            </button>
          </div>

          <div className="text-[11px] text-slate-500 dark:text-slate-400">
            {isId ? 'Triangulasi suar memperbarui bobot partikel hingga mengerucut pada pose sejati.' : 'Beacon triangulation collapses particle uncertainty into the true belief state.'}
          </div>
        </div>
      </div>
    </div>
  );
}

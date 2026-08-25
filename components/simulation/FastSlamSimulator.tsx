'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw, Sparkles, Layers, Sliders, AlertTriangle } from 'lucide-react';
import { InlineMath } from '@/components/mathematics/MathBlock';

interface Landmark {
  id: number;
  x: number;
  y: number;
}

interface ParticleLandmark {
  muX: number;
  muY: number;
  sxx: number;
  syy: number;
  sxy: number;
  observed: boolean;
}

interface FastSlamParticle {
  x: number;
  y: number;
  theta: number;
  weight: number;
  history: { x: number; y: number }[];
  landmarks: ParticleLandmark[];
}

export function FastSlamSimulator() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isRunning, setIsRunning] = useState(true);
  const [particleCount, setParticleCount] = useState(30);
  const [sensorNoise, setSensorNoise] = useState(0.15); // meters
  const [motionNoise, setMotionNoise] = useState(0.05);
  const [sensorRange, setSensorRange] = useState(7.0);

  // Ground Truth State
  const [trueRobot, setTrueRobot] = useState({ x: 0, y: 0, theta: 0 });

  // Known Map Landmarks (Positions are initially unknown to particles!)
  const groundTruthLandmarks: Landmark[] = [
    { id: 0, x: 4.5, y: 4.0 },
    { id: 1, x: -4.5, y: 4.5 },
    { id: 2, x: -4.0, y: -4.0 },
    { id: 3, x: 4.0, y: -4.5 },
    { id: 4, x: 0.0, y: 6.0 },
    { id: 5, x: 0.0, y: -5.5 },
  ];

  // Initialize Particles
  const initParticles = useCallback((count: number): FastSlamParticle[] => {
    return Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 0.4,
      y: (Math.random() - 0.5) * 0.4,
      theta: (Math.random() - 0.5) * 0.1,
      weight: 1 / count,
      history: [],
      landmarks: groundTruthLandmarks.map(() => ({
        muX: 0,
        muY: 0,
        sxx: 99.0,
        syy: 99.0,
        sxy: 0.0,
        observed: false,
      })),
    }));
  }, [groundTruthLandmarks]);

  const [particles, setParticles] = useState<FastSlamParticle[]>([]);

  useEffect(() => {
    setParticles(initParticles(particleCount));
  }, [particleCount, initParticles]);

  const handleReset = () => {
    setTrueRobot({ x: 0, y: 0, theta: 0 });
    setParticles(initParticles(particleCount));
  };

  const handleKidnap = () => {
    setTrueRobot({ x: 2.0, y: -3.0, theta: Math.PI / 2 });
  };

  // FastSLAM 1.0 Algorithm Execution Loop
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();

    const render = (time: number) => {
      const dt = Math.min(0.05, (time - lastTime) / 1000);
      lastTime = time;

      if (isRunning) {
        const v = 1.3;
        const omega = 0.45;

        // 1. Move Ground Truth Robot
        let nextTrueX = 0, nextTrueY = 0, nextTrueTheta = 0;
        setTrueRobot((prev) => {
          nextTrueTheta = prev.theta + omega * dt;
          nextTrueX = prev.x + v * Math.cos(prev.theta) * dt;
          nextTrueY = prev.y + v * Math.sin(prev.theta) * dt;
          return { x: nextTrueX, y: nextTrueY, theta: nextTrueTheta };
        });

        // 2. Measure Visible Landmarks
        const observations: { id: number; r: number; phi: number }[] = [];
        for (const lm of groundTruthLandmarks) {
          const dx = lm.x - nextTrueX;
          const dy = lm.y - nextTrueY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < sensorRange) {
            const noisyR = dist + (Math.random() - 0.5) * sensorNoise;
            let noisyBearing = Math.atan2(dy, dx) - nextTrueTheta + (Math.random() - 0.5) * 0.1;
            while (noisyBearing > Math.PI) noisyBearing -= 2 * Math.PI;
            while (noisyBearing < -Math.PI) noisyBearing += 2 * Math.PI;
            observations.push({ id: lm.id, r: noisyR, phi: noisyBearing });
          }
        }

        // 3. FastSLAM Particle Propagation & Per-Particle EKF Landmark Updates
        setParticles((prevParticles) => {
          const updated = prevParticles.map((p) => {
            // Propagate motion model: x_t^{[m]} ~ p(x_t | u_t, x_{t-1}^{[m]})
            const noisyV = v + (Math.random() - 0.5) * motionNoise * 3;
            const noisyOmega = omega + (Math.random() - 0.5) * motionNoise * 2;
            const newTheta = p.theta + noisyOmega * dt;
            const newX = p.x + noisyV * Math.cos(p.theta) * dt;
            const newY = p.y + noisyV * Math.sin(p.theta) * dt;

            const newHistory = [...p.history.slice(-25), { x: newX, y: newY }];
            const newLandmarks = p.landmarks.map((l) => ({ ...l }));
            let weightMult = 1.0;

            for (const obs of observations) {
              const lm = newLandmarks[obs.id];

              if (!lm.observed) {
                // Initialize landmark estimate
                const lAngle = newTheta + obs.phi;
                lm.muX = newX + obs.r * Math.cos(lAngle);
                lm.muY = newY + obs.r * Math.sin(lAngle);
                lm.sxx = sensorNoise * sensorNoise * 2;
                lm.syy = sensorNoise * sensorNoise * 2;
                lm.sxy = 0;
                lm.observed = true;
              } else {
                // EKF Measurement Update for landmark k
                const dx = lm.muX - newX;
                const dy = lm.muY - newY;
                const q = Math.max(0.01, dx * dx + dy * dy);
                const estR = Math.sqrt(q);
                let estPhi = Math.atan2(dy, dx) - newTheta;
                while (estPhi > Math.PI) estPhi -= 2 * Math.PI;
                while (estPhi < -Math.PI) estPhi += 2 * Math.PI;

                // Residual y = z - z_hat
                const yR = obs.r - estR;
                let yPhi = obs.phi - estPhi;
                while (yPhi > Math.PI) yPhi -= 2 * Math.PI;
                while (yPhi < -Math.PI) yPhi += 2 * Math.PI;

                // Measurement Jacobian H_k
                const H00 = dx / estR;
                const H01 = dy / estR;
                const H10 = -dy / q;
                const H11 = dx / q;

                // Innovation Covariance S_k (2x2)
                const S00 = H00 * (lm.sxx * H00 + lm.sxy * H01) + H01 * (lm.sxy * H00 + lm.syy * H01) + sensorNoise * sensorNoise;
                const S11 = H10 * (lm.sxx * H10 + lm.sxy * H11) + H11 * (lm.sxy * H10 + lm.syy * H11) + (sensorNoise * 0.5) ** 2;

                // Kalman Gain K
                const K00 = (lm.sxx * H00 + lm.sxy * H01) / S00;
                const K10 = (lm.sxy * H00 + lm.syy * H01) / S00;
                const K01 = (lm.sxx * H10 + lm.sxy * H11) / S11;
                const K11 = (lm.sxy * H10 + lm.syy * H11) / S11;

                // Update Landmark Mean
                lm.muX += K00 * yR + K01 * yPhi;
                lm.muY += K10 * yR + K11 * yPhi;

                // Update Landmark Covariance
                lm.sxx *= (1 - K00 * H00);
                lm.syy *= (1 - K11 * H11);

                // Calculate Importance Likelihood Weight
                const expTerm = -0.5 * (yR * yR / S00 + yPhi * yPhi / S11);
                weightMult *= Math.exp(Math.max(-20, expTerm)) / Math.sqrt(S00 * S11);
              }
            }

            return {
              x: newX,
              y: newY,
              theta: newTheta,
              weight: p.weight * Math.max(1e-5, weightMult),
              history: newHistory,
              landmarks: newLandmarks,
            };
          });

          // Normalize weights
          const totalWeight = updated.reduce((sum, p) => sum + p.weight, 0);
          if (totalWeight > 0) {
            for (const p of updated) p.weight /= totalWeight;
          }

          // Systematic Resampling if N_eff < M/2
          const nEff = 1 / updated.reduce((sum, p) => sum + p.weight * p.weight, 0);
          if (nEff < particleCount / 2) {
            const resampled: FastSlamParticle[] = [];
            const step = 1 / particleCount;
            let r = Math.random() * step;
            let c = updated[0].weight;
            let idx = 0;

            for (let m = 0; m < particleCount; m++) {
              const u = r + m * step;
              while (u > c && idx < particleCount - 1) {
                idx++;
                c += updated[idx].weight;
              }
              const parent = updated[idx];
              resampled.push({
                x: parent.x + (Math.random() - 0.5) * 0.05,
                y: parent.y + (Math.random() - 0.5) * 0.05,
                theta: parent.theta + (Math.random() - 0.5) * 0.02,
                weight: 1 / particleCount,
                history: [...parent.history],
                landmarks: parent.landmarks.map((l) => ({ ...l })),
              });
            }
            return resampled;
          }

          return updated;
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

          const worldExtent = 18;
          const toCanvasX = (wx: number) => width / 2 + (wx / worldExtent) * width;
          const toCanvasY = (wy: number) => height / 2 - (wy / worldExtent) * height;

          // Subtle Coordinate Grid
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
          ctx.lineWidth = 1;
          for (let g = -8; g <= 8; g += 4) {
            ctx.beginPath();
            ctx.moveTo(toCanvasX(g), 0);
            ctx.lineTo(toCanvasX(g), height);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(0, toCanvasY(g));
            ctx.lineTo(width, toCanvasY(g));
            ctx.stroke();
          }

          // Draw True Ground Truth Landmarks (Gold Stars)
          for (const lm of groundTruthLandmarks) {
            const lx = toCanvasX(lm.x);
            const ly = toCanvasY(lm.y);

            ctx.strokeStyle = '#f59e0b';
            ctx.fillStyle = 'rgba(245, 158, 11, 0.2)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(lx, ly, 8, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = '#f59e0b';
            ctx.font = '10px monospace';
            ctx.fillText(`LM${lm.id}`, lx + 12, ly + 4);
          }

          // Draw Particle Landmarks from the Highest-Weighted Particle
          if (particles.length > 0) {
            const bestParticle = [...particles].sort((a, b) => b.weight - a.weight)[0];
            for (let i = 0; i < bestParticle.landmarks.length; i++) {
              const lm = bestParticle.landmarks[i];
              if (lm.observed) {
                const cx = toCanvasX(lm.muX);
                const cy = toCanvasY(lm.muY);
                const rX = Math.min(30, Math.max(3, 3 * Math.sqrt(lm.sxx) * (width / worldExtent)));
                const rY = Math.min(30, Math.max(3, 3 * Math.sqrt(lm.syy) * (height / worldExtent)));

                ctx.strokeStyle = '#10b981';
                ctx.fillStyle = 'rgba(16, 185, 129, 0.15)';
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.ellipse(cx, cy, rX, rY, 0, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();

                ctx.fillStyle = '#10b981';
                ctx.beginPath();
                ctx.arc(cx, cy, 3, 0, Math.PI * 2);
                ctx.fill();
              }
            }
          }

          // Draw Particles (Cyan cloud + trajectory paths)
          for (const p of particles) {
            const px = toCanvasX(p.x);
            const py = toCanvasY(p.y);

            // Particle position
            ctx.fillStyle = 'rgba(6, 182, 212, 0.75)';
            ctx.beginPath();
            ctx.arc(px, py, 2.5, 0, Math.PI * 2);
            ctx.fill();

            // Heading pointer
            ctx.strokeStyle = 'rgba(6, 182, 212, 0.4)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(px + Math.cos(p.theta) * 8, py - Math.sin(p.theta) * 8);
            ctx.stroke();
          }

          // Draw Ground Truth Robot (Emerald)
          const trueX = toCanvasX(trueRobot.x);
          const trueY = toCanvasY(trueRobot.y);
          ctx.fillStyle = '#10b981';
          ctx.beginPath();
          ctx.arc(trueX, trueY, 7, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(trueX, trueY);
          ctx.lineTo(trueX + Math.cos(trueRobot.theta) * 14, trueY - Math.sin(trueRobot.theta) * 14);
          ctx.stroke();
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [isRunning, particleCount, sensorNoise, motionNoise, sensorRange, groundTruthLandmarks, particles]);

  return (
    <div className="my-6 rounded-2xl glass-panel p-5 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Sparkles className="w-4 h-4" />
            </span>
            <h3 className="font-mono font-bold text-slate-900 dark:text-slate-100 text-sm">
              FastSLAM 1.0 Rao-Blackwellized Particle Filtering Simulator
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Decomposes full SLAM into <InlineMath latex="M" /> particle trajectories, each maintaining <InlineMath latex="K" /> independent 2x2 EKF landmark Gaussian estimates with live uncertainty ellipses.
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
            onClick={handleKidnap}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 font-mono text-xs border border-rose-500/30 transition-all"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Kidnap Robot</span>
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs border border-slate-700 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
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
            <span>Ground Truth Robot</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 inline-block" />
            <span>Particles (<InlineMath latex="M = {particleCount}" />)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span>Ground Truth Landmarks</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/50 border border-emerald-400 inline-block" />
            <span>Per-Particle Landmark EKF Ellipses</span>
          </div>
        </div>
      </div>

      {/* Interactive Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-200 dark:border-slate-800 text-xs font-mono">
        <div className="space-y-1">
          <div className="flex justify-between text-slate-400">
            <span>Particle Count (<InlineMath latex="M" />):</span>
            <span className="text-cyan-400 font-bold">{particleCount} particles</span>
          </div>
          <input
            type="range"
            min="10"
            max="60"
            step="5"
            value={particleCount}
            onChange={(e) => setParticleCount(parseInt(e.target.value))}
            className="w-full accent-cyan-500"
          />
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-slate-400">
            <span>Sensor Range:</span>
            <span className="text-cyan-400 font-bold">{sensorRange.toFixed(1)} m</span>
          </div>
          <input
            type="range"
            min="4.0"
            max="12.0"
            step="1.0"
            value={sensorRange}
            onChange={(e) => setSensorRange(parseFloat(e.target.value))}
            className="w-full accent-cyan-500"
          />
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-slate-400">
            <span>Measurement Noise:</span>
            <span className="text-cyan-400 font-bold">{sensorNoise.toFixed(2)} m</span>
          </div>
          <input
            type="range"
            min="0.05"
            max="0.4"
            step="0.05"
            value={sensorNoise}
            onChange={(e) => setSensorNoise(parseFloat(e.target.value))}
            className="w-full accent-cyan-500"
          />
        </div>
      </div>
    </div>
  );
}

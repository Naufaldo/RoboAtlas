'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw, Crosshair, Sliders, Layers, Sparkles } from 'lucide-react';
import { InlineMath } from '@/components/mathematics/MathBlock';

interface Landmark {
  id: number;
  x: number;
  y: number;
}

export function EkfLocalizationSimulator() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isRunning, setIsRunning] = useState(true);
  const [qNoise, setQNoise] = useState(0.04); // Process noise
  const [rNoise, setRNoise] = useState(0.15); // Measurement noise
  const [sensorRange, setSensorRange] = useState(8.0); // max range to landmark

  // Ground Truth State
  const [truePose, setTruePose] = useState({ x: 0, y: 0, theta: 0 });

  // Dead Reckoning Ghost Pose (Drifting)
  const [drPose, setDrPose] = useState({ x: 0, y: 0, theta: 0 });

  // EKF Estimated State & Covariance
  const [ekfState, setEkfState] = useState({ x: 0, y: 0, theta: 0 });
  const [covariance, setCovariance] = useState([
    [0.2, 0, 0],
    [0, 0.2, 0],
    [0, 0, 0.05],
  ]);

  // Known Landmarks
  const [landmarks] = useState<Landmark[]>([
    { id: 1, x: 5, y: 5 },
    { id: 2, x: -5, y: 5 },
    { id: 3, x: -5, y: -5 },
    { id: 4, x: 5, y: -5 },
    { id: 5, x: 0, y: 7 },
  ]);

  const handleReset = () => {
    setTruePose({ x: 0, y: 0, theta: 0 });
    setDrPose({ x: 0, y: 0, theta: 0 });
    setEkfState({ x: 0, y: 0, theta: 0 });
    setCovariance([
      [0.2, 0, 0],
      [0, 0.2, 0],
      [0, 0, 0.05],
    ]);
  };

  // EKF Prediction & Update Loop
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();

    const render = (time: number) => {
      const dt = Math.min(0.05, (time - lastTime) / 1000);
      lastTime = time;

      if (isRunning) {
        // Commanded velocities
        const v = 1.4; // m/s
        const omega = 0.5; // rad/s

        // 1. Update Ground Truth
        setTruePose((prev) => {
          const nextTheta = prev.theta + omega * dt;
          const nextX = prev.x + v * Math.cos(prev.theta) * dt;
          const nextY = prev.y + v * Math.sin(prev.theta) * dt;
          return { x: nextX, y: nextY, theta: nextTheta };
        });

        // 2. Update Dead Reckoning (with systematic drift noise)
        setDrPose((prev) => {
          const noisyV = v + (Math.random() - 0.5) * qNoise * 3;
          const noisyOmega = omega + (Math.random() - 0.45) * qNoise * 1.5; // Slight bias drift
          const nextTheta = prev.theta + noisyOmega * dt;
          const nextX = prev.x + noisyV * Math.cos(prev.theta) * dt;
          const nextY = prev.y + noisyV * Math.sin(prev.theta) * dt;
          return { x: nextX, y: nextY, theta: nextTheta };
        });

        // 3. EKF Filter Execution
        setEkfState((prevEkf) => {
          let currX = prevEkf.x + v * Math.cos(prevEkf.theta) * dt;
          let currY = prevEkf.y + v * Math.sin(prevEkf.theta) * dt;
          let currTheta = prevEkf.theta + omega * dt;

          // Motion Jacobian F
          const F = [
            [1, 0, -v * dt * Math.sin(prevEkf.theta)],
            [0, 1, v * dt * Math.cos(prevEkf.theta)],
            [0, 0, 1],
          ];

          // Covariance Prediction: Sigma_bar = F * Sigma * F^T + Q
          const Q = [
            [qNoise * dt, 0, 0],
            [0, qNoise * dt, 0],
            [0, 0, (qNoise * 0.5) * dt],
          ];

          let P = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
          ];

          // P = F * Sigma * F^T
          for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
              let sum = 0;
              for (let k = 0; k < 3; k++) {
                for (let l = 0; l < 3; l++) {
                  sum += F[i][k] * covariance[k][l] * F[j][l];
                }
              }
              P[i][j] = sum + Q[i][j];
            }
          }

          // EKF Measurement Update for visible landmarks
          for (const lm of landmarks) {
            const dx = lm.x - truePose.x;
            const dy = lm.y - truePose.y;
            const trueDist = Math.sqrt(dx * dx + dy * dy);

            if (trueDist < sensorRange) {
              // Simulated Noisy Measurement: z = [r, phi]
              const noisyR = trueDist + (Math.random() - 0.5) * rNoise;
              const trueBearing = Math.atan2(dy, dx) - truePose.theta;
              const noisyBearing = trueBearing + (Math.random() - 0.5) * (rNoise * 0.5);

              // Predicted Measurement from EKF state
              const estDx = lm.x - currX;
              const estDy = lm.y - currY;
              const estQ = estDx * estDx + estDy * estDy;
              const estR = Math.sqrt(estQ);
              let estBearing = Math.atan2(estDy, estDx) - currTheta;
              // Normalize angle
              while (estBearing > Math.PI) estBearing -= 2 * Math.PI;
              while (estBearing < -Math.PI) estBearing += 2 * Math.PI;

              // Measurement Jacobian H (2x3)
              const H = [
                [-estDx / estR, -estDy / estR, 0],
                [estDy / estQ, -estDx / estQ, -1],
              ];

              // Innovation y = z - h(x)
              let yR = noisyR - estR;
              let yBearing = noisyBearing - estBearing;
              while (yBearing > Math.PI) yBearing -= 2 * Math.PI;
              while (yBearing < -Math.PI) yBearing += 2 * Math.PI;

              // S = H * P * H^T + R
              const S00 = H[0][0] * (P[0][0] * H[0][0] + P[0][1] * H[0][1]) + H[0][1] * (P[1][0] * H[0][0] + P[1][1] * H[0][1]) + rNoise * rNoise;
              const S11 = H[1][0] * (P[0][0] * H[1][0] + P[0][1] * H[1][1]) + H[1][1] * (P[1][0] * H[1][0] + P[1][1] * H[1][1]) + P[2][2] + (rNoise * 0.5) ** 2;

              // Simplified diagonal inversion Kalman Gain K (3x2)
              const K00 = (P[0][0] * H[0][0] + P[0][1] * H[0][1]) / S00;
              const K10 = (P[1][0] * H[0][0] + P[1][1] * H[0][1]) / S00;
              const K01 = (P[0][0] * H[1][0] + P[0][1] * H[1][1]) / S11;
              const K11 = (P[1][0] * H[1][0] + P[1][1] * H[1][1]) / S11;
              const K21 = -P[2][2] / S11;

              // Update State
              currX += K00 * yR + K01 * yBearing;
              currY += K10 * yR + K11 * yBearing;
              currTheta += K21 * yBearing;

              // Update Covariance: P = (I - K*H) * P
              P[0][0] *= (1 - K00 * H[0][0]);
              P[1][1] *= (1 - K11 * H[1][1]);
              P[2][2] *= (1 + K21);
            }
          }

          setCovariance(P);
          return { x: currX, y: currY, theta: currTheta };
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

          // Background Grid
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

          // Draw Landmarks
          for (const lm of landmarks) {
            const lx = toCanvasX(lm.x);
            const ly = toCanvasY(lm.y);

            // Landmark star/circle
            ctx.strokeStyle = '#f59e0b';
            ctx.fillStyle = 'rgba(245, 158, 11, 0.2)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(lx, ly, 7, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();

            // Landmark ID label
            ctx.fillStyle = '#f59e0b';
            ctx.font = '10px monospace';
            ctx.fillText(`L${lm.id}`, lx + 10, ly + 4);

            // Laser beam lines from robot to landmark
            const dx = lm.x - truePose.x;
            const dy = lm.y - truePose.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < sensorRange) {
              ctx.strokeStyle = 'rgba(245, 158, 11, 0.35)';
              ctx.setLineDash([4, 4]);
              ctx.beginPath();
              ctx.moveTo(toCanvasX(truePose.x), toCanvasY(truePose.y));
              ctx.lineTo(lx, ly);
              ctx.stroke();
              ctx.setLineDash([]);
            }
          }

          // 1. Draw Dead Reckoning Ghost Robot (Red dashed)
          const drX = toCanvasX(drPose.x);
          const drY = toCanvasY(drPose.y);
          ctx.strokeStyle = '#f43f5e';
          ctx.lineWidth = 1.5;
          ctx.setLineDash([3, 3]);
          ctx.beginPath();
          ctx.arc(drX, drY, 8, 0, Math.PI * 2);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(drX, drY);
          ctx.lineTo(drX + Math.cos(drPose.theta) * 14, drY - Math.sin(drPose.theta) * 14);
          ctx.stroke();
          ctx.setLineDash([]);

          // 2. Draw EKF 3-Sigma Covariance Uncertainty Ellipse
          const ekfX = toCanvasX(ekfState.x);
          const ekfY = toCanvasY(ekfState.y);

          const sxx = Math.max(0.001, covariance[0][0]);
          const syy = Math.max(0.001, covariance[1][1]);
          const sxy = covariance[0][1];

          // Eigenvalues for ellipse semi-axes
          const trace = sxx + syy;
          const det = sxx * syy - sxy * sxy;
          const disc = Math.sqrt(Math.max(0, (trace / 2) ** 2 - det));
          const l1 = Math.max(0.001, trace / 2 + disc);
          const l2 = Math.max(0.001, trace / 2 - disc);
          const semiMajor = 3 * Math.sqrt(l1) * (width / worldExtent);
          const semiMinor = 3 * Math.sqrt(l2) * (height / worldExtent);
          const tiltAngle = 0.5 * Math.atan2(2 * sxy, sxx - syy);

          ctx.save();
          ctx.translate(ekfX, ekfY);
          ctx.rotate(-tiltAngle);
          ctx.strokeStyle = '#06b6d4';
          ctx.fillStyle = 'rgba(6, 182, 212, 0.15)';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.ellipse(0, 0, Math.min(60, semiMajor), Math.min(60, semiMinor), 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
          ctx.restore();

          // Draw EKF Estimate Robot (Cyan)
          ctx.fillStyle = '#06b6d4';
          ctx.beginPath();
          ctx.arc(ekfX, ekfY, 7, 0, Math.PI * 2);
          ctx.fill();

          // 3. Draw Ground Truth Robot (Emerald)
          const trueX = toCanvasX(truePose.x);
          const trueY = toCanvasY(truePose.y);
          ctx.fillStyle = '#10b981';
          ctx.beginPath();
          ctx.arc(trueX, trueY, 7, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(trueX, trueY);
          ctx.lineTo(trueX + Math.cos(truePose.theta) * 14, trueY - Math.sin(truePose.theta) * 14);
          ctx.stroke();
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [isRunning, qNoise, rNoise, sensorRange, truePose, drPose, covariance, landmarks]);

  return (
    <div className="my-6 rounded-2xl glass-panel p-5 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Crosshair className="w-4 h-4" />
            </span>
            <h3 className="font-mono font-bold text-slate-900 dark:text-slate-100 text-sm">
              Extended Kalman Filter (EKF) 2D Localization
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Fuses non-linear unicycle motion prediction with landmark range-bearing observations to bound odometry drift within a 2D <InlineMath latex="3\sigma" /> confidence ellipse.
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
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs border border-slate-700 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Pose</span>
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
            <span>Ground Truth Pose</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 border border-dashed border-rose-300 inline-block" />
            <span>Drifting Odometry (No Correction)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 inline-block" />
            <span>EKF Estimate & <InlineMath latex="3\sigma" /> Ellipse</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span>Known Map Landmarks (<InlineMath latex="L_1 \dots L_5" />)</span>
          </div>
        </div>
      </div>

      {/* Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-200 dark:border-slate-800 text-xs font-mono">
        <div className="space-y-1">
          <div className="flex justify-between text-slate-400">
            <span>Process Noise (<InlineMath latex="\mathbf{Q}" />):</span>
            <span className="text-cyan-400 font-bold">{qNoise.toFixed(3)}</span>
          </div>
          <input
            type="range"
            min="0.01"
            max="0.15"
            step="0.01"
            value={qNoise}
            onChange={(e) => setQNoise(parseFloat(e.target.value))}
            className="w-full accent-cyan-500"
          />
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-slate-400">
            <span>Sensor Noise (<InlineMath latex="\mathbf{R}" />):</span>
            <span className="text-cyan-400 font-bold">{rNoise.toFixed(2)} m</span>
          </div>
          <input
            type="range"
            min="0.05"
            max="0.5"
            step="0.05"
            value={rNoise}
            onChange={(e) => setRNoise(parseFloat(e.target.value))}
            className="w-full accent-cyan-500"
          />
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-slate-400">
            <span>Landmark Sensor Range:</span>
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
      </div>
    </div>
  );
}

'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Activity, MoveRight, Radio, RotateCcw, Sparkles } from 'lucide-react';

export function BayesianFilterSimulator() {
  const { locale } = useLanguage();
  const isId = locale === 'id';

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // State: 1D robot position Gaussian distribution N(mu, sigma^2)
  const [mu, setMu] = useState(25.0);
  const [sigmaSq, setSigmaSq] = useState(16.0);
  const [stepState, setStepState] = useState<'ready' | 'predicted' | 'corrected'>('ready');
  const [lastMeasurement, setLastMeasurement] = useState<number | null>(null);
  const [kalmanGain, setKalmanGain] = useState<number | null>(null);

  const motionStep = 15.0; // Commanded delta x
  const motionVarianceQ = 8.0; // Prediction noise variance Q
  const sensorVarianceR = 6.0; // Measurement noise variance R

  // 1. Prediction Step: mu_bar = mu + u, sigma_bar^2 = sigma^2 + Q
  const handlePredict = useCallback(() => {
    setMu((prevMu) => prevMu + motionStep);
    setSigmaSq((prevSigmaSq) => prevSigmaSq + motionVarianceQ);
    setStepState('predicted');
  }, [motionStep, motionVarianceQ]);

  // 2. Correction Step: K = sigma_bar^2 / (sigma_bar^2 + R)
  const handleCorrect = useCallback(() => {
    // Generate simulated noisy measurement near ground truth
    const truePos = mu + (Math.random() - 0.5) * 4;
    const z = truePos + (Math.random() - 0.5) * Math.sqrt(sensorVarianceR);

    const K = sigmaSq / (sigmaSq + sensorVarianceR);
    const newMu = mu + K * (z - mu);
    const newSigmaSq = (1 - K) * sigmaSq;

    setLastMeasurement(z);
    setKalmanGain(K);
    setMu(newMu);
    setSigmaSq(newSigmaSq);
    setStepState('corrected');
  }, [mu, sigmaSq, sensorVarianceR]);

  const handleReset = () => {
    setMu(25.0);
    setSigmaSq(16.0);
    setStepState('ready');
    setLastMeasurement(null);
    setKalmanGain(null);
  };

  // Render 60 FPS Gaussian PDF Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.fillStyle = '#070a13';
    ctx.fillRect(0, 0, width, height);

    const padL = 40;
    const padR = 20;
    const padT = 30;
    const padB = 40;

    const minX = 0;
    const maxX = 100;
    const toCanvasX = (x: number) => padL + ((x - minX) / (maxX - minX)) * (width - padL - padR);
    const baseY = height - padB;

    // Axis
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.3)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(padL, baseY);
    ctx.lineTo(width - padR, baseY);
    ctx.stroke();

    // Axis ticks
    ctx.fillStyle = '#94a3b8';
    ctx.font = '10px JetBrains Mono';
    for (let x = 0; x <= 100; x += 20) {
      const cx = toCanvasX(x);
      ctx.beginPath();
      ctx.moveTo(cx, baseY);
      ctx.lineTo(cx, baseY + 5);
      ctx.stroke();
      ctx.fillText(`${x}m`, cx - 8, baseY + 18);
    }

    // Draw Belief Gaussian PDF Curve
    const sigma = Math.sqrt(sigmaSq);
    ctx.strokeStyle = stepState === 'predicted' ? '#38bdf8' : '#22d3ee';
    ctx.lineWidth = 2.5;
    ctx.beginPath();

    for (let px = padL; px <= width - padR; px += 2) {
      const x = minX + ((px - padL) / (width - padL - padR)) * (maxX - minX);
      const exponent = -((x - mu) ** 2) / (2 * sigmaSq);
      const pdf = (1 / (sigma * Math.sqrt(2 * Math.PI))) * Math.exp(exponent);

      // Scale PDF
      const cy = baseY - pdf * 1200;
      if (px === padL) ctx.moveTo(px, cy);
      else ctx.lineTo(px, cy);
    }
    ctx.stroke();

    // Fill under curve
    ctx.fillStyle = 'rgba(6, 182, 212, 0.15)';
    ctx.lineTo(width - padR, baseY);
    ctx.lineTo(padL, baseY);
    ctx.closePath();
    ctx.fill();

    // Draw Measurement Landmark (if available)
    if (lastMeasurement !== null) {
      const zX = toCanvasX(lastMeasurement);
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(zX, padT);
      ctx.lineTo(zX, baseY);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = '#f59e0b';
      ctx.font = 'bold 10px JetBrains Mono';
      ctx.fillText(`Sensor: ${lastMeasurement.toFixed(1)}m`, zX - 25, padT - 8);
    }

    // Mean Marker
    const meanX = toCanvasX(mu);
    ctx.fillStyle = '#10b981';
    ctx.beginPath();
    ctx.arc(meanX, baseY, 6, 0, Math.PI * 2);
    ctx.fill();
  }, [mu, sigmaSq, stepState, lastMeasurement]);

  return (
    <div className="p-6 rounded-3xl glass-panel border border-slate-200 dark:border-slate-800 space-y-4 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-slate-200 dark:border-slate-800/80">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-500">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 font-mono">
              {isId ? 'Simulator Siklus Filter Bayesian & Kalman 1D' : '1D Recursive Bayesian & Kalman Filter Simulator'}
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-sans">
              {isId
                ? 'Amati siklus Prediksi (kurva melebar / ketidakpastian naik) lalu Koreksi (fusi sensor mengasah kurva posterior).'
                : 'Experience the two-step cycle: Predict (uncertainty expands) -> Update (sensor fusion sharpens belief).'}
            </p>
          </div>
        </div>

        <button
          onClick={handleReset}
          className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-mono bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-400 hover:text-slate-200"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Canvas View */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-800/80 bg-slate-950 flex justify-center">
        <canvas ref={canvasRef} width={600} height={260} className="w-full max-w-2xl h-auto" />
      </div>

      {/* State Telemetry Dashboard */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
        <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <span className="text-[10px] text-slate-500 block">{isId ? 'Estimasi Rata-rata (μ)' : 'Estimated Mean (μ)'}</span>
          <strong className="text-cyan-400 font-bold">{mu.toFixed(2)} m</strong>
        </div>

        <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <span className="text-[10px] text-slate-500 block">{isId ? 'Variansi / Galat (σ²)' : 'Variance (σ²)'}</span>
          <strong className="text-amber-400 font-bold">{sigmaSq.toFixed(2)} m²</strong>
        </div>

        <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <span className="text-[10px] text-slate-500 block">{isId ? 'Standar Deviasi (σ)' : 'Std Deviation (σ)'}</span>
          <strong className="text-emerald-400 font-bold">±{Math.sqrt(sigmaSq).toFixed(2)} m</strong>
        </div>

        <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <span className="text-[10px] text-slate-500 block">{isId ? 'Penguatan Kalman (K)' : 'Kalman Gain (K)'}</span>
          <strong className="text-indigo-400 font-bold">{kalmanGain !== null ? kalmanGain.toFixed(3) : '—'}</strong>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 pt-1">
        <button
          onClick={handlePredict}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono font-bold bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20 hover:bg-cyan-400 transition-all"
        >
          <MoveRight className="w-4 h-4" />
          <span>{isId ? '1. Langkah Prediksi Gerak (+15m)' : '1. Motion Predict (+15m)'}</span>
        </button>

        <button
          onClick={handleCorrect}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono font-bold bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 hover:bg-amber-400 transition-all"
        >
          <Radio className="w-4 h-4" />
          <span>{isId ? '2. Langkah Koreksi Sensor' : '2. Sensor Update (Fuse)'}</span>
        </button>
      </div>
    </div>
  );
}
